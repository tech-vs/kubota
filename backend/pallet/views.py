from django.utils import timezone
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from syncdata.models import (
    PSETSDataUpload,
    ProdInfoHistory,
)

from pallet.models import (
    Pallet,
    QuestionType,
    PalletStatus,
    PalletQuestion,
    PalletPart,
    PalletStatus,
    NWGW
)
from pallet.serializers import (NoneSerializer, PalletCreateSerializer,
                          PalletListSerializer, QuestionCheckSerializer,
                          QuestionListSerializer, PalletPackingDoneSerializer,
                          PalletPartListSerializer, PalletRepackSerializer)
from pallet.filters import PalletPartListFilter
from syncdata.syncdata import update_data_oracle
'''
test rebase ei
'''

class PalletViewSet(viewsets.GenericViewSet):
    queryset = Pallet.objects.all().prefetch_related('part_list', 'question_list')
    # permission_classes = (AllowAny,)
    lookup_field = 'id'

    action_serializers = {
        'create': PalletCreateSerializer,
        'repack': PalletRepackSerializer,
    }

    # permission_classes_action = {
    #     'create': [AllowAny],
    #     'repack': [AllowAny],
    # }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    # def get_permissions(self):
    #     try:
    #         return [permission() for permission in self.permission_classes_action[self.action]]
    #     except KeyError:
    #         return [permission() for permission in self.permission_classes]

    @action(detail=True, methods=['PATCH'], url_path='repack')
    def repack(self, request, *args, **kwargs):
        pallet = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        data['packing_status'] = False

        for field, value in data.items():
            setattr(pallet, field, value)

        pallet.save()
        response = PalletListSerializer(pallet).data
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
        part_to_set_list = []
        prod_seq_fail_text = ''
        check_duplicate_id_no = []
        ## prepare part_list to compare and set to pallet
        if question_type == QuestionType.DOMESTIC and Pallet.objects.filter(pallet_string=pallet_string).exclude(status=PalletStatus.REPACK).exists():
            return Response("Pallet No นี้ทำการ pack ไปแล้ว", status=status.HTTP_400_BAD_REQUEST)
        if question_type == QuestionType.DOMESTIC and not PSETSDataUpload.objects.filter(pallet_sharp=data.get('pallet', ''), skewer_sharp=data.get('skewer', ''), delivery_date=date).exists():
            return Response("Pallet ไม่ตรงกับข้อมูลในระบบ", status=status.HTTP_400_BAD_REQUEST)
        for part in part_list:
            prod_seq = part.pop('prod_seq', '')
            part_item = ProdInfoHistory.objects.filter(**part).first()
            if part_item:
                part_to_set_list.append((prod_seq, part_item))
                check_duplicate_id_no.append(part_item.id_no)
        if len(part_to_set_list) != 4 and nw_gw != NWGW.UNIT1:
            return Response("Part มีไม่ครบ 4", status=status.HTTP_400_BAD_REQUEST)
        if PalletPart.objects.filter(part__id_no__in=check_duplicate_id_no).exclude(pallet__status=PalletStatus.REPACK).exists():
            return Response("ID No ที่ใส่มามีการนำใส่ pallet ไปแล้ว", status=status.HTTP_400_BAD_REQUEST)
        
        if question_type == QuestionType.EXPORT:
            #logic check part_list export
            for part_item in part_to_set_list:
                if part_to_set_list[0][1].model_code == part_item[1].model_code:
                    check_item.append(True)
                else:
                    return Response("Model Code ไม่ตรงกันในทุก Part", status=status.HTTP_400_BAD_REQUEST)
        if question_type == QuestionType.DOMESTIC:
            # logic check part_list domestic
            check_dict_list = [{'delivery_date': date, **pallet_skewer_check, 'prod_seq': part_item[0], 'item_sharp': part_item[1].model_code} for part_item in part_to_set_list]
            for check in check_dict_list:
                if PSETSDataUpload.objects.filter(**check).exists():
                    check_item.append(True)
                else:
                    prod_seq_fail_text += f"Part ใน Sequence {check.get('prod_seq', '')} ไม่ตรงกับข้อมูลในระบบ, "
            if prod_seq_fail_text:
                return Response(prod_seq_fail_text, status=status.HTTP_400_BAD_REQUEST)

        if check_item.count(True) == 4:
            pallet = Pallet.objects.create(
                **data,
                pallet_string=pallet_string,
                nw_gw=nw_gw,
                question_type=question_type,
                internal_pallet_no=Pallet.generate_internal_pallet_no(),
                packing_by=request.user
            )
            PalletPart.objects.bulk_create([PalletPart(pallet=pallet, part=part_item[1]) for part_item in part_to_set_list])
            pallet.generate_question(question_type)
        response = PalletListSerializer(pallet).data

        for part in part_list:
            update_data_oracle(part.get('id_no', ''))
        return Response(response, status=status.HTTP_201_CREATED)


class PalletListQuestionViewSet(viewsets.GenericViewSet):
    queryset = Pallet.objects.all().prefetch_related('palletquestion_set')
    lookup_field = None
    # permission_classes = (AllowAny,)
    action_serializers = {
        'list': QuestionListSerializer,
        'retrieve': NoneSerializer,
    }

    # permission_classes_action = {
    #     'list': [AllowAny],
    #     'retrieve': [AllowAny],
    # }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    # def get_permissions(self):
    #     try:
    #         return [permission() for permission in self.permission_classes_action[self.action]]
    #     except KeyError:
    #         return [permission() for permission in self.permission_classes]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pallet = None

    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        self.pallet = Pallet.objects.filter(id=kwargs.get('pallet_id', -1)).prefetch_related('palletquestion_set').first()
        self.section = int(kwargs.get('section_no', 0))
        if self.pallet is None or self.section == 0:
            raise NotFound

    def list(self, request, *args, **kwargs):
        question_data = self.pallet.palletquestion_set.filter(section=self.section)
        response = self.get_serializer(question_data, many=True).data
        return Response(response, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        can_submit = self.pallet.can_submit_section(self.section)
        if not can_submit:
            return Response({'detail': 'ไม่สามารถ submit ได้เนื่องจากมีคำถามที่ยังไม่ยอมรับ'}, status=status.HTTP_400_BAD_REQUEST)
        if not self.pallet.palletquestion_set.filter(Q(section=1) | Q(section=2), Q(status=False)).exists():
            self.pallet.packing_status = True
            self.pallet.status = PalletStatus.FINISH_PACK
            self.pallet.packing_datetime = timezone.now()
            self.pallet.save()
        response = PalletPackingDoneSerializer(self.pallet).data
        return Response(response, status=status.HTTP_200_OK)


class QuestionViewSet(viewsets.GenericViewSet):
    queryset = PalletQuestion.objects.all()
    # permission_classes = (AllowAny,)
    lookup_field = 'id'
    action_serializers = {
        'partial_update': QuestionCheckSerializer,
    }

    # permission_classes_action = {
    #     'partial_update': [AllowAny],
    # }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    # def get_permissions(self):
    #     try:
    #         return [permission() for permission in self.permission_classes_action[self.action]]
    #     except KeyError:
    #         return [permission() for permission in self.permission_classes]

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


class PalletPartViewSet(viewsets.GenericViewSet):
    queryset = PalletPart.objects.all().select_related('pallet', 'part')
    lookup_url_kwarg = 'pallet_id'
    filter_backends = [DjangoFilterBackend]
    filterset_class = PalletPartListFilter
    # permission_classes = (AllowAny,)

    action_serializers = {
        'list': PalletPartListSerializer,
        'retrieve': PalletListSerializer,
    }

    # permission_classes_action = {
    #     'list': [AllowAny],
    #     'retrieve': [AllowAny],
    # }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    # def get_permissions(self):
    #     try:
    #         return [permission() for permission in self.permission_classes_action[self.action]]
    #     except KeyError:
    #         return [permission() for permission in self.permission_classes]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        # page = self.paginate_queryset(queryset)
        response = self.get_serializer(queryset, many=True).data
        # response = self.get_paginated_response(serializer).data
        # response['total'] = int(len(self.get_queryset()))
        return Response(response, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        pallet = Pallet.objects.filter(id=kwargs.get('pallet_id', -1)).prefetch_related('palletquestion_set', 'palletpart_set').first()
        response = self.get_serializer(pallet).data
        if pallet:
            question_list = []
            if pallet.status == PalletStatus.FINISH_PACK:
                question_list = pallet.palletquestion_set.filter(section__in=[1,2])
            elif pallet.status == PalletStatus.SHIPPED:
                question_list = pallet.palletquestion_set.all()
            response['part_list'] = PalletPartListSerializer(pallet.palletpart_set.all(), many=True).data
            response['question_list'] = QuestionListSerializer(question_list, many=True).data
        return Response(response, status=status.HTTP_200_OK)
