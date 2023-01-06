# Generated by Django 4.1.3 on 2023-01-06 10:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pallet', '0004_alter_pallet_pallet_alter_pallet_skewer'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='last_approve_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approve_doc', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='document',
            name='loading_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='loading_doc', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='document',
            name='remark_reject',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='pallet',
            name='packing_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='document',
            name='status',
            field=models.CharField(choices=[('loading', 'Loading'), ('wait_approve', 'Wait Aprrove'), ('leader_approved', 'Leader Approved'), ('clerk_approved', 'Clerk Approved'), ('engineer_approved', 'Engineer Approved'), ('manager_approved', 'Manager Approved'), ('reject', 'Reject'), ('approved', 'Approved')], default='loading', max_length=100),
        ),
    ]
