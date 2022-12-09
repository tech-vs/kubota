import pyodbc
from typing import List
import cx_Oracle
from syncdata.models import PSETSDataUpload, ProdInfoHistory
cnxn = "Driver={FreeTDS};TDS_VERSION=7.3;Server=172.20.176.4,1433;Database=ADJ;UID=kuet\\administrator;PWD=keT2402D0main"

# results = []
def sync_data_mssql() -> List[dict]:
    results = []
    with pyodbc.connect(cnxn) as db:
        cursor = db.cursor()
        cursor.execute("SELECT ID as ID_NO, \
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
    for result in results:
        psetsdata_list.append(
            PSETSDataUpload(**result)
        )
    PSETSDataUpload.objects.bulk_create(psetsdata_list)
    return results


def sync_data_oracle() -> List[dict]:
    results = []
    with cx_Oracle.connect(user="STDADMIN", password="STDADMIN", dsn="172.20.176.72/PRDACT") as db:
        cursor = db.cursor()
        cursor.execute("SELECT ID_NO\
        , PLAN_PROD_FINISH_YM\
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
    for result in results:
        prodinfohistory_list.append(
            ProdInfoHistory(**result)
        )
    ProdInfoHistory.objects.bulk_create(prodinfohistory_list)
    return results
