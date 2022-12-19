from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from pallet.models import DocStatus, QuestionType
from pallet.serializers import PalletPartListSerializer, QuestionListSerializer, PalletListSerializer, PartSerializer


class NoneSerializer(serializers.Serializer):
    pass


class DocNoGenSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    doc_no = serializers.CharField()
    delivery_date = serializers.CharField()
    status = serializers.ChoiceField(choices=DocStatus.choices)
    ref_do_no = serializers.CharField(allow_null=True)
    total_qty = serializers.CharField(allow_null=True)
    invoice_no = serializers.CharField(allow_null=True)
    round = serializers.CharField(allow_null=True)
    customer_name = serializers.CharField(allow_null=True)
    address = serializers.CharField(allow_null=True)
    question_type = serializers.ChoiceField(choices=QuestionType.choices, allow_null=True)
    pallet_part_list = serializers.SerializerMethodField()

    def get_pallet_part_list(self, obj):
        pallet_list = obj.pallet_list.all().prefetch_related('palletpart_set')
        pallet_part_list = []
        if pallet_list:
            for pallet in pallet_list:
                pallet_part_list += PalletPartListSerializer(pallet.palletpart_set.all(), many=True).data
            return pallet_part_list
        return []


class DocUpdateSerializer(serializers.Serializer):
    ref_do_no = serializers.CharField(required=False)
    total_qty = serializers.CharField(required=False)
    invoice_no = serializers.CharField(required=False)
    round = serializers.CharField(required=False)
    customer_name = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    question_type = serializers.ChoiceField(choices=QuestionType.choices, required=False)
    status = serializers.ChoiceField(choices=DocStatus.choices, required=False)


class PartItemSerializer(serializers.Serializer):
    plan_prod_finish_ym = serializers.CharField(max_length=255)
    model_code = serializers.CharField(max_length=255)
    model_name = serializers.CharField(max_length=255)
    serial_no = serializers.CharField(max_length=255)
    country_code = serializers.CharField(max_length=255)
    country_name = serializers.CharField(max_length=255)
    distributor_code = serializers.CharField(max_length=255)
    distributor_name = serializers.CharField(max_length=255)


class LoadingPalletSerializer(serializers.Serializer):
    is_send_approve = serializers.BooleanField(default=False)
    pallet_id = serializers.IntegerField()


class DocDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    doc_no = serializers.CharField()
    delivery_date = serializers.CharField()
    status = serializers.ChoiceField(choices=DocStatus.choices)
    ref_do_no = serializers.CharField(allow_null=True)
    total_qty = serializers.CharField(allow_null=True)
    invoice_no = serializers.CharField(allow_null=True)
    round = serializers.CharField(allow_null=True)
    customer_name = serializers.CharField(allow_null=True)
    address = serializers.CharField(allow_null=True)
    question_type = serializers.ChoiceField(choices=QuestionType.choices, allow_null=True)
    pallet_list = serializers.SerializerMethodField()

    def get_pallet_list(self, obj):
        pallet_list = obj.pallet_list.all().prefetch_related('part_list', 'palletquestion_set')
        data = []
        if pallet_list:
            for pallet in pallet_list:
                data.append({
                    'pallet': PalletListSerializer(pallet).data,
                    'part_list': PartSerializer(pallet.part_list.all(), many=True).data,
                    'question_list': QuestionListSerializer(pallet.palletquestion_set.all(), many=True).data,
                })
            return data
        return []


class QuestionCheckSerializer(serializers.Serializer):
    status = serializers.BooleanField()