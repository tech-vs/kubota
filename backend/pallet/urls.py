from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    PalletViewSet,
    PalletListQuestionViewSet,
    QuestionViewSet,
)
from .views_loading import (
    LoadingViewSet,
)

app_name = 'pallet'

router = DefaultRouter()
router.register(r'', PalletViewSet, basename='pallet')
router.register(r'loading', LoadingViewSet, basename='loading')
# router.register(r'doc', ApproveViewSet, basename='')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pallet_id>/section/<int:section_no>/question/', PalletListQuestionViewSet.as_view({'get': 'list'})),
    path('<int:pallet_id>/section/<int:section_no>/submit/', PalletListQuestionViewSet.as_view({'get': 'retrieve'})),
    path('question/<int:id>/status/', QuestionViewSet.as_view({'patch': 'partial_update'})),
]