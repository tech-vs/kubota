from concurrent.futures import ThreadPoolExecutor
from rest_framework.filters import SearchFilter
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .syncdata import (
    sync_data_mssql,
    # sync_data_oracle,
)
from pallet.serializers import NoneSerializer
from .models import (
    PSETSDataUpload,
    ProdInfoHistory,
)

def run_sync_mssql():
    with ThreadPoolExecutor(max_workers=1) as executor:
        executor.submit(sync_data_mssql)


class SyncMSSQLViewSet(viewsets.GenericViewSet):
    
    action_serializers = {
        'list': NoneSerializer,
        'pse_ts_data_upload': NoneSerializer,
        'prod_info_history': NoneSerializer,
    }

    permission_classes_action = {
        'list': [AllowAny],
        'pse_ts_data_upload': [AllowAny],
        'prod_info_history': [AllowAny],
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
        # Create a thread pool with a specified number of threads
        # results = sync_data_mssql()
        run_sync_mssql()
        
        return Response(status=status.HTTP_200_OK)

    # @action(detail=False, methods=['GET'], url_path='prod-info-history')
    # def prod_info_history(self, request, *args, **kwargs):
    #     results = sync_data_oracle()
    #     return Response(status=status.HTTP_200_OK)