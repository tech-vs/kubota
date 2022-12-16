from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    SyncMSSQLViewSet
)

app_name = 'syncdata'

router = DefaultRouter()
router.register(r'mssql', SyncMSSQLViewSet, basename='mssql')

urlpatterns = [
    path('', include(router.urls)),
]