from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = ('id', 'username', 'role',)
    search_fields = ('username',)
    list_filter = ('role',)
    list_editable = ('role',)
