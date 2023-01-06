from django.conf import settings
from django.db import migrations, models
from django.contrib.auth.hashers import make_password


def migrate_account_data(apps, schema_editor):
    Account = apps.get_model('account', 'User')
    user_data = [
        {
            'username': 'leader',
            'password': '1234',
            'role': 'Leader',
        },
        {
            'username': 'clerk',
            'password': '1234',
            'role': 'Clerk',
        },
        {
            'username': 'engineer',
            'password': '1234',
            'role': 'Engineer',
        },
    ]
    
    account_list = []
    for data in user_data:
        account_list.append(Account(username=data['username'], password=make_password(data['password']), role=data['role']))
    
    Account.objects.bulk_create(account_list)


class Migration(migrations.Migration):
    dependencies = [
        ('account', '0003_alter_user_role'),
    ]

    operations = [
        migrations.RunPython(migrate_account_data),
    ]
