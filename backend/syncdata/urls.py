from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    MasterLoadingViewSet
)

app_name = 'syncdata'

router = DefaultRouter()
router.register(r'master-loading', MasterLoadingViewSet, basename='master-loading')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('master-upload/', MasterLoadingViewSet.as_view({'post': 'upload'}))
# ]

urlpatterns = router.urls