from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Pallet, Document, DocStatus


class NoneSerializer(serializers.Serializer):
    pass


class DocNoGenSerializer(serializers.Serializer):
    doc_no = serializers.CharField()
    delivery_date = serializers.CharField()
    status = serializers.ChoiceField(choices=DocStatus.choices)


class PalletItemFromPSETSDataUploadSerializer(serializers.Serializer):
    pallet_skewer = serializers.SerializerMethodField()
    item_sharp = serializers.CharField()
    prod_seq = serializers.CharField()
    modelname = serializers.CharField()
    serial_no = serializers.CharField()

    def get_pallet_skewer(self, obj):
        return f'{obj.pallet_sharp}-{obj.skewer_sharp}'


class LoadingPalletSerializer(serializers.Serializer):
    is_send_approve = serializers.BooleanField(default=False)
    pallet_id = serializers.IntegerField()
    ref_do_no = serializers.CharField(max_length=255)
    total_qty = serializers.CharField(max_length=255)
    invoice_no = serializers.CharField(max_length=255)
    round = serializers.CharField(max_length=255)
    customer_name = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)


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