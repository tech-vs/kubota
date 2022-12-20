from django_filters.rest_framework import FilterSet
from django_filters import filters

from pallet.models import PalletStatus, DocStatus, QuestionType


class PalletLoadingFilter(FilterSet):
    internal_pallet_no = filters.CharFilter(field_name='internal_pallet_no')
    status = filters.ChoiceFilter(choices=PalletStatus.choices, field_name='status')
    question_type = filters.ChoiceFilter(choices=QuestionType.choices, field_name='question_type')


class PalletPartListFilter(FilterSet):
    internal_pallet_no = filters.CharFilter(field_name='pallet__internal_pallet_no')
    status = filters.ChoiceFilter(choices=PalletStatus.choices, field_name='pallet__status')
    packing_status = filters.BooleanFilter(field_name='pallet__packing_status')


class DocumentListFilter(FilterSet):
    status = filters.ChoiceFilter(choices=DocStatus.choices, field_name='status')
