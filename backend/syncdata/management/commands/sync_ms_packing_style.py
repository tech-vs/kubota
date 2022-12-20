from django.conf import settings
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist

import cx_Oracle
from syncdata.models import MSPackingStyle, LogSyncData


class Command(BaseCommand):

    def handle(self, *args, **options):
        results = []
        with cx_Oracle.connect(user="STDADMIN", password="STDADMIN", dsn="172.20.176.72/PRDACT") as db:
            cursor = db.cursor()
            cursor.execute("SELECT ROWID as ROW_ID\
            , MODEL_CODE \
            , PACKING_STYLE_CODE \
            , NET_WEIGHT \
            , GROSS_WEIGHT \
            FROM MS_PACKING_STYLE")
            columns = [column[0].lower() for column in cursor.description]
            for row in cursor.fetchall():
                results.append(dict(zip(columns, row)))

        ms_packing_style_list = []
        count_create = 0
        for result in results:
            row_id = result.get('row_id', None)
            try:
                MSPackingStyle.objects.get(row_id=row_id)
            except ObjectDoesNotExist:
                ms_packing_style_list.append(
                    MSPackingStyle(**result)
                )
                count_create += 1
        MSPackingStyle.objects.bulk_create(ms_packing_style_list)
        LogSyncData.objects.create(table='MSPackingStyle', detail={'row_created': count_create})
        return 'Done'
