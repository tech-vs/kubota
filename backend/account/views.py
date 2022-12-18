from rest_framework.filters import SearchFilter
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import (
    LoginSerializer,
    UserSerializer,
    UserCreateSerializer,
    UserChangePasswordSerializer,
)
from pallet.serializers import NoneSerializer
from .helpers import get_token

class AuthViewSet(viewsets.GenericViewSet):
    
    action_serializers = {
        'list': NoneSerializer,
        'create': LoginSerializer,
    }

    permission_classes_action = {
        'list': [AllowAny],
        'create': [AllowAny],
    }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def list(self, request, *args, **kwargs):
        return Response({'status': 'ok'}, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


class UserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all().order_by('-created_at')
    lookup_field = 'id'
    filter_backends = [SearchFilter]
    search_fields = ['first_name', 'last_name']
    
    action_serializers = {
        'create': UserCreateSerializer,
        'partial_update': UserChangePasswordSerializer,
        'profile': UserSerializer,
        'list': UserSerializer,
    }

    permission_classes_action = {
        'create': [AllowAny],
        'profile': [IsAuthenticated],
        'partial_update': [IsAuthenticated],
        'list': [AllowAny],
        'destroy': [AllowAny],
    }

    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            if self.action in self.action_serializers:
                return self.action_serializers[self.action]
        return super().get_serializer_class()
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        password = data.pop('password', None)
        user = User.objects.create(**data)
        user.set_password(password)
        user.save()
        response = get_token(user)
        return Response(response, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['GET'], url_path='profile')
    def profile(self, request, *args, **kwargs):
        user = self.request.user
        response = self.get_serializer(user).data
        return Response(response, status=status.HTTP_200_OK)

    # def retrieve(self, request, *args, **kwargs):
    #     # user = self.get_object()
    #     user = self.request.user
    #     response = self.get_serializer(user).data
    #     return Response(response, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        # user = self.get_object()
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        
        password = data.pop('password', None)
        user.set_password(password)
        user.save()
        response = UserSerializer(user).data
        return Response(response, status=status.HTTP_200_OK)
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True).data
        response = self.get_paginated_response(serializer).data
        response['total'] = int(len(self.get_queryset()))
        return Response(response, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        if user:
            user.delete()
            return Response(status=status.HTTP_200_OK)
        return Response({'detail': 'Cannot delete because of this user has been already used'}, status=status.HTTP_400_BAD_REQUEST)