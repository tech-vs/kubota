from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
# from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from syncdata.models import PSETSDataUpload

from pallet.models import Pallet, Document, DocumentPallet, PalletStatus, DocStatus, QuestionType
from pallet.serializers_loading import (
    NoneSerializer,
    DocNoGenSerializer,
    LoadingPalletSerializer,
    DocUpdateSerializer,
    PartItemSerializer,
    DocDetailSerializer,
    PalletPartLoadingSerializer,
)
from pallet.filters import PalletLoadingFilter, DocumentListFilter
from syncdata.models import MasterLoading, MSPackingStyle


class LoadingViewSet(viewsets.GenericViewSet):
    queryset = Pallet.objects.all().prefetch_related('palletpart_set', 'part_list')
    filter_backends = [DjangoFilterBackend]
    filterset_class = PalletLoadingFilter
    permission_classes = (AllowAny,)

    action_serializers = {
        'list':  PartItemSerializer,
        'submit':  LoadingPalletSerializer,
    }

    permission_classes_action = {
        'list': [AllowAny],
        'submit': [AllowAny],
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

    @action(detail=False, methods=['POST'], url_path='submit')
    def submit(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        pallet_id = data.pop('pallet_id', -1)
        is_send_approve = data.pop('is_send_approve', False)
        
        pallet = self.get_queryset().filter(id=pallet_id).first()
        doc = Document.objects.filter(status=DocStatus.LOADING).last()
        
        if pallet is None or doc is None:
            return Response({'detail': f'ไม่พบ doc ที่กำลังใช้หรือ pallet_id: {pallet_id}'}, status=status.HTTP_400_BAD_REQUEST)
        if pallet:
            doc_pallet, is_created = DocumentPallet.objects.get_or_create(document=doc, pallet=pallet)
        if not is_created:
            return Response({'detail': 'pallet-skewer นี้มีการเรียกโหลดไปแล้ว'}, status=status.HTTP_400_BAD_REQUEST)
        
        pallet.status = PalletStatus.SHIPPED
        pallet.save()

        if is_send_approve and doc:
            doc.status = DocStatus.WAIT_APRROVE
            doc.save()

        nw_gw = {}
        if pallet.question_type == QuestionType.EXPORT:
            # print('export')
            nw_gw['nw_gw'] = pallet.nw_gw
        # print(nw_gw)
        # print(pallet.part_list.all())
        response = PalletPartLoadingSerializer(pallet.part_list.all(), context=nw_gw, many=True).data
        return Response(response, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        pallet = self.filter_queryset(self.get_queryset()).first()
        if not pallet or not self.request.query_params.get('internal_pallet_no', None):
            return Response("ไม่พบ Internal Pallet No. นี้")
        item_list  = pallet.part_list.all()
        for item in item_list:
            # print(f'item = {item.serial_no}')
            serial_no = str(item.serial_no).strip()
            if MasterLoading.objects.filter(serial_no=serial_no).exists():
                # print('stop')
                return Response({'detail': 'Pallet นี้อยู่ใน List Stopshipment'}, status=status.HTTP_400_BAD_REQUEST)
        response = {
            'pallet_id': pallet.id if pallet else 0,
            'item_list': self.get_serializer(item_list, many=True).data,
        }
        return Response(response, status=status.HTTP_200_OK)


class DocumentViewSet(viewsets.GenericViewSet):
    queryset = Document.objects.all()
    lookup_field = 'id'
    filter_backends = [DjangoFilterBackend]
    filterset_class = DocumentListFilter
    permission_classes = (AllowAny,)
    action_serializers = {
        'partial_update': DocUpdateSerializer,
        'gen_doc': DocNoGenSerializer,
        'list': DocNoGenSerializer,
        'retrieve': DocDetailSerializer,
    }

    permission_classes_action = {
        'partial_update': [AllowAny],
        'gen_doc': [AllowAny],
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

    def partial_update(self, request, *args, **kwargs):
        question = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        for field, value in data.items():
            setattr(question, field, value)

        question.save()
        response = DocNoGenSerializer(question).data
        return Response(response, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], url_path='gen-doc')
    def gen_doc(self, request, *args, **kwargs):
        doc = Document.generate_doc_object()
        response = self.get_serializer(doc).data
        return Response(response, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True).data
        response = self.get_paginated_response(serializer).data
        response['total'] = int(len(self.get_queryset()))
        return Response(response, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        doc = self.get_object()
        response = self.get_serializer(doc).data
        return Response(response, status=status.HTTP_200_OK)
