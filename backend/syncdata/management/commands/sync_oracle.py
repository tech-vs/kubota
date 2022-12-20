from django.conf import settings
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist

import cx_Oracle
from syncdata.models import ProdInfoHistory, LogSyncData


class Command(BaseCommand):

    def handle(self, *args, **options):
        results = []
        with cx_Oracle.connect(user="STDADMIN", password="STDADMIN", dsn="172.20.176.72/PRDACT") as db:
            cursor = db.cursor()
            cursor.execute("SELECT ID_NO\
            , PLAN_PROD_FINISH_YM \
            , p.model_code       \
            , m.model_name       \
            , p.serial_no        \
            , d.country_code     \
            , d.country_name     \
            , p.distributor_code \
            , d.distributor_name \
            FROM \
            prod_info_history p \
            JOIN \
            ms_distributor d \
            ON p.distributor_code = d.distributor_code \
            JOIN \
            ms_model m \
            ON m.model_code       = p.model_code \
            AND m.distributor_code = p.distributor_code")
            columns = [column[0].replace('#', '_sharp').lower() for column in cursor.description]
            for row in cursor.fetchall():
                results.append(dict(zip(columns, row)))

        prodinfohistory_list = []
        count_create = 0
        for result in results:
            id_no = result.get('id_no', None)
            plan_prod_finish_ym = result.get('plan_prod_finish_ym', None)
            try:
                ProdInfoHistory.objects.get(
                    id_no=id_no,
                    plan_prod_finish_ym=plan_prod_finish_ym,
                )
            except ObjectDoesNotExist:
                prodinfohistory_list.append(
                    ProdInfoHistory(**result)
                )
                count_create += 1
        ProdInfoHistory.objects.bulk_create(prodinfohistory_list)
        LogSyncData.objects.create(table='ProdInfoHistory', detail={'row_created': count_create})
        print(f'oracle "ProdInfoHistory" create = {count_create} row Done')
