from django.conf import settings
from django.db import migrations, models
from django.contrib.auth.hashers import make_password

'''
admin 
1234
Administrator

operator
1234
Operator

manager
1234
Manager
'''

def migrate_account_data(apps, schema_editor):
    Account = apps.get_model('account', 'User')
    user_data = [
        {
            'username': 'admin',
            'password': '1234',
            'role': 'Administrator',
        },
        {
            'username': 'operator',
            'password': '1234',
            'role': 'Operator',
        },
        {
            'username': 'manager',
            'password': '1234',
            'role': 'Manager',
        },
    ]
    
    account_list = []
    for data in user_data:
        account_list.append(Account(username=data['username'], password=make_password(data['password']), role=data['role']))
    
    Account.objects.bulk_create(account_list)


class Migration(migrations.Migration):
    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(migrate_account_data),
    ]
