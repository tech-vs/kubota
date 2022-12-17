from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import QuestionType, NWGW, PalletStatus


class NoneSerializer(serializers.Serializer):
    pass


class PartDetailSerializer(serializers.Serializer):
    prod_seq = serializers.CharField(required=False)
    id_no = serializers.CharField()


class PalletCreateSerializer(serializers.Serializer):
    pallet_skewer = serializers.CharField(required=False)
    part_list = PartDetailSerializer(many=True)
    question_type = serializers.ChoiceField(choices=QuestionType.choices)
    nw_gw = serializers.ChoiceField(choices=NWGW.choices, required=False)

    def validate(self, attrs):
        pallet_skewer = attrs.pop('pallet_skewer', None)
        if pallet_skewer:
            temp_s = pallet_skewer[-8:]
            temp_s = pallet_skewer.replace(temp_s, '')
            attrs['pallet'] = temp_s[:2]
            attrs['skewer'] = temp_s[2:]
            attrs['pallet_string'] = pallet_skewer
        return attrs


class PalletPackingDoneSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    pallet = serializers.CharField()
    skewer = serializers.CharField()
    internal_pallet_no = serializers.CharField()
    status = serializers.ChoiceField(choices=PalletStatus.choices)
    packing_datetime = serializers.DateTimeField()


class PalletListSerializer(serializers.Serializer):
    pallet_id = serializers.IntegerField(source='id')
    pallet = serializers.CharField()
    skewer = serializers.CharField()
    internal_pallet_no = serializers.CharField()
    status = serializers.ChoiceField(choices=PalletStatus.choices)


class QuestionListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    text = serializers.CharField()
    status = serializers.BooleanField()
    type = serializers.ChoiceField(choices=QuestionType.choices)


class QuestionCheckSerializer(serializers.Serializer):
    status = serializers.BooleanField()


class PartSerializer(serializers.Serializer):
    id_no = serializers.CharField()
    plan_prod_finish_ym = serializers.CharField()
    model_code = serializers.CharField()
    model_name = serializers.CharField()
    serial_no = serializers.CharField()
    country_code = serializers.CharField()
    country_name = serializers.CharField()
    distributor_code = serializers.CharField()
    distributor_name = serializers.CharField()


class PalletPartListSerializer(serializers.Serializer):
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret = {
            **PalletListSerializer(instance.pallet).data,
            **PartSerializer(instance.part).data
        }
        return ret
