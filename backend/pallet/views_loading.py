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
    DocRejectSerialier,
)
from pallet.filters import PalletLoadingFilter, DocumentListFilter
from syncdata.models import MasterLoading, MSPackingStyle
from account.models import Role, User
from utils.email import send_email


class LoadingViewSet(viewsets.GenericViewSet):
    queryset = Pallet.objects.all().prefetch_related('palletpart_set', 'part_list')
    filter_backends = [DjangoFilterBackend]
    filterset_class = PalletLoadingFilter
    # permission_classes = (AllowAny,)

    action_serializers = {
        'list':  PartItemSerializer,
        'submit':  LoadingPalletSerializer,
    }

    # permission_classes_action = {
    #     'list': [AllowAny],
    #     'submit': [AllowAny],
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
            doc.operator_approve_name = request.user.get_full_name()
            doc.last_approve_by = request.user
            doc.status = DocStatus.WAIT_APRROVE
            send_email(list(User.objects.filter(role=Role.LEADER).exclude(email__exact='').values_list('email', flat=True)), 'Approve from Operator', f'doc no: {doc.doc_no}')
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
        # print(bool(self.request.query_params.get('internal_pallet_no', '').strip()))
        if not pallet or not self.request.query_params.get('internal_pallet_no', '').strip():
            pallet = None
            return Response("ไม่พบ Internal Pallet No. นี้", status=status.HTTP_400_BAD_REQUEST)
        item_list = []    
        if pallet:
            item_list  = pallet.part_list.all()
            for item in item_list:
                # print(f'item = {item.serial_no}')
                serial_no = str(item.serial_no).strip()
                if MasterLoading.objects.filter(serial_no=serial_no).exists():
                    pallet = None
                # print('stop')
                    return Response("Pallet นี้อยู่ใน List Stopshipment", status=status.HTTP_400_BAD_REQUEST)
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
    # permission_classes = (AllowAny,)
    action_serializers = {
        'partial_update': DocUpdateSerializer,
        'gen_doc': DocNoGenSerializer,
        'list': DocNoGenSerializer,
        'retrieve': DocDetailSerializer,
        'approve': DocNoGenSerializer,
        'reject': DocRejectSerialier,
    }

    # permission_classes_action = {
    #     'partial_update': [AllowAny],
    #     'gen_doc': [AllowAny],
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
        doc = Document.generate_doc_object(request.user)
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

    @action(detail=True, methods=['GET'], url_path='approve')
    def approve(self, request, *args, **kwargs):
        doc = self.get_object()
        if doc:
            if request.user.role == Role.LEADER and doc.status == DocStatus.WAIT_APRROVE:
                doc.leader_approve_name = request.user.get_full_name()
                doc.status = DocStatus.LEADER_APPROVED
                send_email(list(User.objects.filter(role=Role.CLERK).exclude(email__exact='').values_list('email', flat=True)), 'Approve from Leader', f'doc no: {doc.doc_no}')
            elif request.user.role == Role.CLERK and doc.status == DocStatus.LEADER_APPROVED:
                doc.clerk_approve_name = request.user.get_full_name()
                doc.status = DocStatus.CLERK_APPROVED
                send_email(list(User.objects.filter(role=Role.ENGINEER).exclude(email__exact='').values_list('email', flat=True)), 'Approve from Clerk', f'doc no: {doc.doc_no}')
            elif request.user.role == Role.ENGINEER and doc.status == DocStatus.CLERK_APPROVED:
                doc.engineer_approve_name = request.user.get_full_name()
                doc.status = DocStatus.ENGINEER_APPROVED
                send_email(list(User.objects.filter(role=Role.MANAGER).exclude(email__exact='').values_list('email', flat=True)), 'Approve from Engineer', f'doc no: {doc.doc_no}')
            elif request.user.role == Role.MANAGER and doc.status == DocStatus.ENGINEER_APPROVED:
                doc.manager_approve_name = request.user.get_full_name()
                doc.status = DocStatus.MANAGER_APPROVED
            doc.last_approve_by = request.user
            doc.save()
        response = self.get_serializer(doc).data
        return Response(response, status=status.HTTP_200_OK)

    @action(detail=True, methods=['PATCH'], url_path='reject')
    def reject(self, request, *args, **kwargs):
        doc = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        remark = data.pop('remark_reject', '')

        if doc:
            for pallet_id in doc.documentpallet_set.all().values_list('pallet_id', flat=True):
                Pallet.objects.filter(id=pallet_id).update(status=PalletStatus.FINISH_PACK)
            doc.reject_name = request.user.get_full_name()
            doc.reject_role = request.user.role
            doc.status = DocStatus.REJECT
            doc.last_approve_by = request.user
            doc.remark_reject = remark
            send_email(list(User.objects.all().exclude(email__exact='').values_list('email', flat=True)), f'Reject from {request.user.username}', f'Because {remark}')
            doc.save()
        response = self.get_serializer(doc).data
        return Response(response, status=status.HTTP_200_OK)
