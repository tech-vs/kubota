from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from syncdata.models import (
    PSETSDataUpload,
    ProdInfoHistory,
)

from pallet.models import Pallet, Question, QuestionType, Section, PalletStatus
from pallet.serializers import (NoneSerializer, PalletCreateSerializer,
                          PalletListSerializer, QuestionCheckSerializer,
                          QuestionListSerializer, SectionDetailSerializer)


class PalletViewSet(viewsets.GenericViewSet):
    queryset = Pallet.objects.all()

    action_serializers = {
        'create': PalletCreateSerializer,
        'list': PalletListSerializer
    }

    permission_classes_action = {
        'list': [AllowAny],
        'create': [AllowAny],
    }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True).data
        response = self.get_paginated_response(serializer).data
        response['total'] = int(len(self.get_queryset()))
        return Response(response, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        part_list = data.pop('part_list', [])
        question_type = data.pop('question_type', None)
        pallet_string = data.pop('pallet_string', None)
        nw_gw = data.pop('nw_gw', None)
        pallet = None

        pallet_skewer_check = {
            'pallet_sharp': data.get('pallet', ''),
            'skewer_sharp': data.get('skewer', ''),
        }

        date = Pallet.get_date_from_pallet_string(pallet_string)

        check_item = []
        domestic_fail_text = ''
        part_to_set_list = []
        ## prepare part_list to compare and set to pallet
        for part in part_list:
            prod_seq = part.pop('prod_seq', '')
            part_item = ProdInfoHistory.objects.filter(**part).first()
            if part_item:
                part_to_set_list.append((prod_seq, part_item))
        if len(part_to_set_list) != 4:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        if question_type == QuestionType.EXPORT:
            #logic check part_list export
            for part in part_list:
                if part_list[0].get('id_no', '') == part.get('id_no', ''):
                    check_item.append(True)
        if question_type == QuestionType.DOMESTIC:
            # logic check part_list domestic
            check_dict_list = [{'delivery_date': date, **pallet_skewer_check, 'prod_seq': part_item[0], 'item_sharp': part_item[1].model_name} for part_item in part_to_set_list]
            for check in check_dict_list:
                if PSETSDataUpload.objects.filter(**check).exists():
                    check_item.append(True)
                else:
                    domestic_fail_text += f"item_sharp = {check.get('item_sharp', '')} ไม่มีในระบบ ,"

        if check_item.count(True) == 4:
            pallet, is_created = Pallet.objects.get_or_create(
                **data,
                pallet_string=pallet_string,
                internal_pallet_no=Pallet.generate_internal_pallet_no(),
                nw_gw=nw_gw,
                question_type=question_type,
            )
            pallet.set([part_item[1] for part_item in part_to_set_list])
            if not is_created:
                return Response({'detail': 'pallet-skewer นี้มีการเรียกใช้ไปแล้ว'}, status=status.HTTP_400_BAD_REQUEST)
            pallet.generate_question(question_type)
        else:
            return Response({'detail': f'item_sharp ไม่ตรงกัน {domestic_fail_text}'}, status=status.HTTP_400_BAD_REQUEST)
                
        response = PalletListSerializer(pallet).data
        return Response(response, status=status.HTTP_201_CREATED)


class PalletListQuestionViewSet(viewsets.GenericViewSet):
    queryset = Pallet.objects.all().prefetch_related('section_list')
    lookup_field = None
    action_serializers = {
        'list': QuestionListSerializer,
        'retrieve': NoneSerializer,
    }

    permission_classes_action = {
        'list': [AllowAny],
        'retrieve': [AllowAny],
    }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pallet = None

    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        self.pallet = Pallet.objects.filter(id=kwargs.get('pallet_id', -1)).prefetch_related('section_list').first()
        self.section = int(kwargs.get('section_no', 0))
        if self.pallet is None or self.section == 0:
            raise NotFound

    def list(self, request, *args, **kwargs):
        section = self.pallet.section_list.filter(no=self.section).first()
        question_data = []
        if section:
            question_data = section.question_list.all()
        response = self.get_serializer(question_data, many=True).data
        return Response(response, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        section = self.pallet.section_list.filter(no=self.section).first()
        if section:
            if section.question_list.filter(status=False).exists():
                return Response({'detail': 'ไม่สามารถ submit ได้เนื่องจากมีคำถามที่ยังไม่ยอมรับ'}, status=status.HTTP_400_BAD_REQUEST)
            section.is_submit = True
            section.save()
        if self.pallet.section_list.filter(is_submit=True).count() == 2:
            self.pallet.packing_status = True
            self.pallet.status = PalletStatus.FINISH_PACK
            self.pallet.packing_datetime = timezone.now()
            self.pallet.save()
        response = SectionDetailSerializer(section).data
        return Response(response, status=status.HTTP_200_OK)


class QuestionViewSet(viewsets.GenericViewSet):
    queryset = Question.objects.all()
    lookup_field = 'id'
    action_serializers = {
        'partial_update': QuestionCheckSerializer,
    }

    permission_classes_action = {
        'partial_update': [AllowAny],
    }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def partial_update(self, request, *args, **kwargs):
        question = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        for field, value in data.items():
            setattr(question, field, value)

        question.save()
        response = QuestionListSerializer(question).data
        return Response(response, status=status.HTTP_200_OK)
