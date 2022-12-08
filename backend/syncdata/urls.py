from django.urls import path, include
from rest_framework.routers import DefaultRouter

# from .views import (
#     SyncMSSQLViewSet
# )

app_name = 'syncdata'

router = DefaultRouter()
# router.register(r'mssql', SyncMSSQLViewSet, basename='mssql')
# router.register(r'user', UserView, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
    # path('health/', AuthViewSet.as_view({'get': 'list'})),
]