import pyodbc
from typing import List
from syncdata.models import PSETSDataUpload
cnxn = "Driver={FreeTDS};TDS_VERSION=7.3;Server=172.20.176.4,1433;Database=ADJ;UID=kuet\\administrator;PWD=keT2402D0main"

# results = []
def sync_data_mssql() -> List[dict]:
    results = []
    with pyodbc.connect(cnxn) as db:
        cursor = db.cursor()
        cursor.execute("SELECT Delivery_Date, Prod_Seq, Pallet#, Skewer# FROM PSE_Ts_DataUpload")
        columns = [column[0] for column in cursor.description]
        for row in cursor.fetchall():
            results.append(dict(zip(columns, row)))
    
    print(results)
    psetsdata_list = []
    for result in results:
        psetsdata_list.append(
            PSETSDataUpload(
                    prod_seq=result.get('Prod_Seq', None),
                    delivery_date=result.get('Delivery_Date', None),
                    pallet=result.get('Pallet#', None),
                    skewer=result.get('Skewer#', None),
            )
        )
    PSETSDataUpload.objects.bulk_create(psetsdata_list)
    return results
