from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .helpers import get_token
from .models import User, Role


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['username'], password=attrs['password'])
        print(f'user {user}')
        if not user:
            raise ValidationError('Your authentication information is incorrect. Please try again.')
        
        data = get_token(user)
        return data


class UserCreateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=120)
    # first_name = serializers.CharField(max_length=150, allow_blank=True, required=False)
    # last_name = serializers.CharField(max_length=150, allow_blank=True, required=False)
    email = serializers.EmailField(max_length=120, required=False)
    role = serializers.ChoiceField(choices=Role.choices, required=False)

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError('Username is exist.')
        return username


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=120)
    email = serializers.EmailField(max_length=120, required=False)


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()   
    role = serializers.ChoiceField(choices=Role.choices)
    email = serializers.EmailField()
