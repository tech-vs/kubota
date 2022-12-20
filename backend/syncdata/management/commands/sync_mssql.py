from django.conf import settings
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist

import pyodbc
from syncdata.models import PSETSDataUpload, LogSyncData


class Command(BaseCommand):

    def handle(self, *args, **options):
        results = []
        cnxn = "Driver={FreeTDS};TDS_VERSION=7.3;Server=172.20.176.4,1433;Database=ADJ;UID=kuet\\administrator;PWD=keT2402D0main"
        with pyodbc.connect(cnxn) as db:
            cursor = db.cursor()
            cursor.execute("SELECT ID as ID_NO, \
                ID#, \
                MODELNAME, \
                DELIVERY_DATE, \
                DELIVERY_TIME, \
                ITEM#, \
                PROD_SEQ, \
                PALLET#, \
                SKEWER# \
                FROM PSE_Ts_DataUpload")
            columns = [column[0].replace('#', '_sharp').lower() for column in cursor.description]
            for row in cursor.fetchall():
                results.append(dict(zip(columns, row)))
        
        psetsdata_list = []
        count_create = 0
        for result in results:
            id_no = result.get('id_no', None)
            try:
                PSETSDataUpload.objects.get(id_no=id_no)
            except ObjectDoesNotExist:
                psetsdata_list.append(
                    PSETSDataUpload(**result)
                )
                count_create += 1
        PSETSDataUpload.objects.bulk_create(psetsdata_list)
        LogSyncData.objects.create(table='PSETSDataUpload', detail={'row_created': count_create})
        print(f'mssql "PSETSDataUpload" create = {count_create} row Done')
