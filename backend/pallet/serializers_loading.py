from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from pallet.models import DocStatus, QuestionType


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


class DocUpdateSerializer(serializers.Serializer):
    ref_do_no = serializers.CharField(required=False)
    total_qty = serializers.CharField(required=False)
    invoice_no = serializers.CharField(required=False)
    round = serializers.CharField(required=False)
    customer_name = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    question_type = serializers.ChoiceField(choices=QuestionType.choices)


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


# class SectionDetailSerializer(serializers.Serializer):
#     id = serializers.IntegerField()
#     no = serializers.IntegerField()
#     is_submit = serializers.BooleanField()


# class PalletListSerializer(serializers.Serializer):
#     id = serializers.IntegerField()
#     pallet = serializers.CharField()
#     skewer = serializers.CharField()
#     section_list = serializers.SerializerMethodField()

#     def get_section_list(self, obj):
#         if obj.section_list.exists():
#             return SectionDetailSerializer(obj.section_list.all(), many=True).data
#         return []


# class QuestionListSerializer(serializers.Serializer):
#     id = serializers.IntegerField()
#     text = serializers.CharField()
#     status = serializers.BooleanField()
#     type = serializers.ChoiceField(choices=QuestionType.choices)


class QuestionCheckSerializer(serializers.Serializer):
    status = serializers.BooleanField()