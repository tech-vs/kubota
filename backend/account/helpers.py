from django.utils import timezone
from rest_framework_simplejwt.tokens import AccessToken


def get_token(user):
    access_token = AccessToken.for_user(user)
    now = timezone.now()
    return {
        'token': str(access_token),
        'expires_at': int((now + access_token.lifetime).timestamp()),
        'username': user.username,
        'role': user.role,
    }