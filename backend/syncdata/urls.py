from django.urls import path, include
from rest_framework.routers import DefaultRouter

# from .views import (
#     AuthViewSet,
#     UserViewSet,
# )

app_name = 'account'

router = DefaultRouter()
# router.register(r'', AuthViewSet, basename='auth')
# router.register(r'user', UserView, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
    # path('health/', AuthViewSet.as_view({'get': 'list'})),
]