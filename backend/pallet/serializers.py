from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import QuestionType, NWGW


class NoneSerializer(serializers.Serializer):
    pass


class PartDetailSerializer(serializers.Serializer):
    prod_seq = serializers.CharField(required=False)
    id_no = serializers.CharField()


class PalletCreateSerializer(serializers.Serializer):
    pallet_skewer = serializers.CharField()
    part_list = PartDetailSerializer(many=True)
    question_type = serializers.ChoiceField(choices=QuestionType.choices)
    nw_gw = serializers.ChoiceField(choices=NWGW.choices)

    def validate(self, attrs):
        pallet_skewer = attrs.pop('pallet_skewer')
        if pallet_skewer:
            temp_s = pallet_skewer[-8:]
            temp_s = pallet_skewer.replace(temp_s, '')
            attrs['pallet'] = temp_s[:2]
            attrs['skewer'] = temp_s[2:]
            attrs['pallet_string'] = pallet_skewer
        return attrs


class SectionDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    no = serializers.IntegerField()
    is_submit = serializers.BooleanField()


class PalletListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    pallet = serializers.CharField()
    skewer = serializers.CharField()
    section_list = serializers.SerializerMethodField()

    def get_section_list(self, obj):
        if obj.section_list.exists():
            return SectionDetailSerializer(obj.section_list.all(), many=True).data
        return []


class QuestionListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    text = serializers.CharField()
    status = serializers.BooleanField()
    type = serializers.ChoiceField(choices=QuestionType.choices)


class QuestionCheckSerializer(serializers.Serializer):
    status = serializers.BooleanField()
