from django_filters.rest_framework import FilterSet
from django_filters import filters

from pallet.models import PalletStatus


class PalletLoadingFilter(FilterSet):
    internal_pallet_no = filters.CharFilter(field_name='internal_pallet_no')
    status = filters.ChoiceFilter(choices=PalletStatus.choices, field_name='status')


class PalletPartListFilter(FilterSet):
    internal_pallet_no = filters.CharFilter(field_name='pallet__internal_pallet_no')
    status = filters.ChoiceFilter(choices=PalletStatus.choices, field_name='pallet__status')
