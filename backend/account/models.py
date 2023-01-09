from django.contrib.auth.models import AbstractUser
from django.db import models

from utils.models import CommonInfoModel


class Role(models.TextChoices):
    OPERATOR = 'Operator'
    LEADER = 'Leader'
    CLERK = 'Clerk'
    ENGINEER = 'Engineer'
    MANAGER = 'Manager'
    SAP_OPERATOR = 'SAP_Operator'
    ADMINISTRATOR = 'Administrator'


class User(AbstractUser, CommonInfoModel):
    role = models.CharField(max_length=255, choices=Role.choices, default=Role.ADMINISTRATOR)

    def __str__(self):
        return self.username
