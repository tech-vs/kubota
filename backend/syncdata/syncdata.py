import pyodbc
import pytz
from typing import List
import cx_Oracle
from syncdata.models import PSETSDataUpload, ProdInfoHistory
from django.utils import timezone



# results = []
def sync_data_mssql():
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
    
    # psetsdata_list = []
    count_create = 0
    count_update = 0
    for result in results:
        id_no = result.pop('id_no', None)
        _, is_create = PSETSDataUpload.objects.update_or_create(id_no=id_no, defaults={**result})
        if is_create:
            count_create += 1
        else:
            count_update += 1
        # psetsdata_list.append(
        #     PSETSDataUpload(**result)
        # )
    # PSETSDataUpload.objects.bulk_create(psetsdata_list)
    print(f'create = {count_create} row & update = {count_update} row Done')


def sync_data_oracle() -> str:
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

    # prodinfohistory_list = []
    for result in results:
        id_no = result.pop('id_no', None)
        print(id_no)
        plan_prod_finish_ym = result.pop('plan_prod_finish_ym', None)
        ProdInfoHistory.objects.update_or_create(
            id_no=id_no,
            plan_prod_finish_ym=plan_prod_finish_ym,
            defaults={**result}
        )
        # prodinfohistory_list.append(
        #     ProdInfoHistory(**result)
        # )
    # ProdInfoHistory.objects.bulk_create(prodinfohistory_list)
    return 'Done'

def update_data_oracle(increase: int = 1) -> str:
    tz = pytz.timezone('Asia/Bangkok')
    now = timezone.localtime(timezone=tz)
    actual_monthly_seq = increase
    with cx_Oracle.connect(user="STDADMIN", password="STDADMIN", dsn="172.20.176.72/PRDACT") as db:
        cursor = db.cursor()
        cursor.execute("select ACTUAL_RUNNING_SEQ from MS_ACTUAL_MONTHLY_SEQ where STATION_NO = '700602' and TO_CHAR(actual_work_MONTH,'mm/YY') = TO_CHAR(SYSDATE,'mm/YY')")
        row = cursor.fetchone()
        if row:
            actual_monthly_seq += row[0]
            cursor.execute("update MS_ACTUAL_MONTHLY_SEQ set ACTUAL_RUNNING_SEQ = :1, UPDATE_DATE = :2 where STATION_NO = :3 and TO_CHAR(actual_work_MONTH,'mm/YY') = TO_CHAR(SYSDATE,'mm/YY')", [actual_monthly_seq, "SYSDATE", "700602"])
        else:
            cursor.execute("insert into MS_ACTUAL_MONTHLY_SEQ(STATION_NO, ACTUAL_WORK_MONTH, ACTUAL_RUNNING_SEQ, CREATE_DATE, CREATE_BY, UPDATE_DATE, UPDATE_BY) values (:1, :2, :3, :4, :5, :6, :7)", ["700602", "SYSDATE", actual_monthly_seq, "SYSDATE", "380", "SYSDATE", "380"])
        db.commit()
    return 'Done'


# select *from MS_PACKING_STYLE where MODEL_CODE = '1J49500000' and PACKING_STYLE_CODE = '0173'
# select *from MS_PACKING_STYLE where MODEL_CODE = '1J49500000' and PACKING_STYLE_CODE = '0473'
