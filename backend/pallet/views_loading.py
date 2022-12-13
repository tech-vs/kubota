from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from syncdata.models import PSETSDataUpload

from pallet.models import Pallet, Document, DocumentPallet, PalletStatus, DocStatus
from pallet.serializers_loading import (
    NoneSerializer,
    DocNoGenSerializer,
    PalletItemFromPSETSDataUploadSerializer,
    LoadingPalletSerializer,
)


class LoadingViewSet(viewsets.GenericViewSet):
    queryset = Pallet.objects.all()
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['internal_pallet_no']
    filterset_fields = ['status']

    action_serializers = {
        'list':  PalletItemFromPSETSDataUploadSerializer,
        'gen_doc': DocNoGenSerializer,
        'submit':  LoadingPalletSerializer,
    }

    permission_classes_action = {
        'list': [AllowAny],
        'gen_doc': [AllowAny],
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

    @action(detail=False, methods=['GET'], url_path='gen-doc')
    def gen_doc(self, request, *args, **kwargs):
        doc = Document.generate_doc_object()
        response = self.get_serializer(doc).data
        return Response(response, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'], url_path='submit')
    def submit(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        pallet_id = data.pop('pallet_id', -1)
        is_send_approve = data.pop('is_send_approve', False)
        
        pallet = self.get_queryset().filter(id=pallet_id).first()
        doc = Document.objects.last()
        
        if pallet is None or doc is None:
            return Response({'detail': f'ไม่พบ doc ที่กำลังใช้หรือ pallet_id: {pallet_id}'}, status=status.HTTP_400_BAD_REQUEST)
        
        doc_pallet, is_created = DocumentPallet.objects.get_or_create(defaults={**data}, document=doc, pallet=pallet)
        if not is_created:
            return Response({'detail': 'pallet-skewer นี้มีการเรียกโหลดไปแล้ว'}, status=status.HTTP_400_BAD_REQUEST)
        
        pallet.status = PalletStatus.SHIPPED
        pallet.save()

        if is_send_approve and doc:
            doc.status = DocStatus.WAIT_APRROVE
            doc.save()
        return Response({}, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        item_list = []
        pallet = None
        if queryset:
            pallet = queryset.first()
            item_list = PSETSDataUpload.objects.filter(pallet_sharp=pallet.pallet, skewer_sharp=pallet.skewer)[:4]
        item_list = self.get_serializer(item_list, many=True).data
        response = {
            'pallet_id': pallet.id if pallet else 0,
            'item_list': item_list,
        }
        return Response(response, status=status.HTTP_200_OK)

    # def create(self, request, *args, **kwargs):
    #     response = {}
    #     return Response(response, status=status.HTTP_201_CREATED)