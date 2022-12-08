from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    AuthViewSet,
    UserViewSet,
)

app_name = 'account'

router = DefaultRouter()
# router.register(r'', AuthViewSet, basename='auth')
# router.register(r'user', UserView, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
    path('health/', AuthViewSet.as_view({'get': 'list'})),
    path('login/', AuthViewSet.as_view({'post': 'create'})),
    path('register/', UserViewSet.as_view({'post': 'create'})),
    path('user/', UserViewSet.as_view({'get': 'list'})),
    path('profile/', UserViewSet.as_view({'get': 'retrieve'})),
    path('delete/<int:id>/', UserViewSet.as_view({'delete': 'destroy'})),
    path('change-password/', UserViewSet.as_view({'patch': 'partial_update'})),
]