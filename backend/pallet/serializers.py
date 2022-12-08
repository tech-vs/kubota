from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import Pallet, QuestionType

class NoneSerializer(serializers.Serializer):
    pass

class PartDetailSerializer(serializers.Serializer):
    seq_no = serializers.IntegerField()
    part_no = serializers.IntegerField()


class PalletCreateSerializer(serializers.Serializer):
    pallet = serializers.IntegerField()
    skewer = serializers.IntegerField()
    part_list = PartDetailSerializer(many=True)
    question_type = serializers.ChoiceField(choices=QuestionType.choices)


class SectionDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    no = serializers.IntegerField()
    is_submit = serializers.BooleanField()


class PalletListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    pallet = serializers.IntegerField()
    skewer = serializers.IntegerField()
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
