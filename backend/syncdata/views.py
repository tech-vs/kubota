from rest_framework.filters import SearchFilter
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .syncdata import sync_data_mssql
from .models import (
    PSETSDataUpload
)
class SyncMSSQLViewSet(viewsets.GenericViewSet):
    
    action_serializers = {
        'list': None,
        'pse_ts_data_upload': None,
    }

    permission_classes_action = {
        'list': [AllowAny],
        'pse_ts_data_upload': [AllowAny],
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
        return Response({'status': 'ok'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'], url_path='pse-ts-data-upload')
    def pse_ts_data_upload(self, request, *args, **kwargs):
        results = sync_data_mssql()
        # psetsdata_list = []
        # for result in results:
        #     psetsdata_list.append(
        #         PSETSDataUpload(
        #                 prod_seq=result.get('Prod_Seq', None),
        #                 delivery_date=result.get('Delivery_Date', None),
        #                 pallet=result.get('Pallet#', None),
        #                 skewer=result.get('Skewer#', None),
        #         )
        #     )
        
        # PSETSDataUpload.objects.bulk_create(psetsdata_list)
        return Response(status=status.HTTP_200_OK)
