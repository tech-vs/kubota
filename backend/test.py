# import pyodbc
# cnxn = "Driver={FreeTDS};TDS_VERSION=7.3;Server=172.20.176.4,1433;Database=ADJ;UID=kuet\\administrator;PWD=keT2402D0main"

# results = []
# with pyodbc.connect(cnxn) as db:
#     cursor = db.cursor()
#     cursor.execute("SELECT ID as ID_NO, \
#      DELIVERY_DATE, \
#      DELIVERY_TIME, \
#      KET_DELIVERY, \
#      ROUND_NO#, \
#      SEQ, \
#      ID#, \
#      SERIAL#, \
#      MODELNAME, \
#      LINE_IN_TIME, \
#      ITEM#, \
#      ITEM_DESCRIPTION, \
#      PROD_SEQ, \
#      PO#, \
#      QTY, \
#      PALLET#, \
#      SKEWER#, \
#      DUMMY, \
#      PICK_STATUS, \
#      FINISH_DATE, \
#      ENGINE_STATUS, \
#      PACK_STATUS, \
#      TO_STOCK, \
#      USER_LOGIN, \
#      SERIAL_NO, \
#      SCAN_TIME \
#      FROM PSE_Ts_DataUpload")
#     columns = [column[0] for column in cursor.description]
#     data_type = [{column[0].replace('#', '_sharp').lower(): str(column[1])} for column in cursor.description]
    
#     print(data_type)
#     for row in cursor.fetchall():
#         results.append(dict(zip(columns, row)))

# # print(results[0])
# print(len(results))

import cx_Oracle

results = []
with cx_Oracle.connect(user="STDADMIN", password="STDADMIN", dsn="172.20.176.72/PRDACT") as db:
    cursor = db.cursor()
    # cursor.execute("SELECT ROWID FROM PROD_RESULT")
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
    columns = [column[0] for column in cursor.description]
    data_type = [{column[0].replace('#', '_sharp').lower(): str(column[1])} for column in cursor.description]
    print(data_type)
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))


# print(results[0])
print(len(results))