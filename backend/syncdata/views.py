import pandas as pd
from pathlib import Path

from concurrent.futures import ThreadPoolExecutor
from rest_framework.filters import SearchFilter
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from django.db import transaction

from syncdata.serializers import FileSerializer
from syncdata.models import (
    MasterLoading,
)
from syncdata.master_loading import insert_data

def run_insert_data(df: pd.DataFrame):
    with ThreadPoolExecutor(max_workers=4) as executor:
        executor.submit(insert_data, df)

# fs = FileSystemStorage(location='tmp/')

class MasterLoadingViewSet(viewsets.GenericViewSet):
    queryset = MasterLoading.objects.all()
    # permission_classes = (AllowAny,)
    action_serializers = {
        'upload': FileSerializer,
    }

    # permission_classes_action = {
    #     'upload': [AllowAny],
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

    @action(detail=False, methods=['POST'], url_path='upload')
    def upload(self, request, *args, **kwargs):
        file = request.FILES['file']
        if file.content_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            df = pd.read_excel(file.read(), engine='openpyxl', sheet_name=0, skiprows=1, dtype=str)  # XLSX
            df = df.where(pd.notnull(df), '')
        elif file.content_type == 'application/vnd.ms-excel':
            df = pd.read_excel(file.read(), sheet_name=0, skiprows=1, dtype=str)  # XLS
            df = df.where(pd.notnull(df), '')
        else:
            raise Exception("File not supported")
        run_insert_data(df)
        return Response({'detail': 'Master Loading Done'}, status=status.HTTP_200_OK)
