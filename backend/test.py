# import pyodbc
# cnxn = "Driver={FreeTDS};TDS_VERSION=7.3;Server=172.20.176.4,1433;Database=ADJ;UID=kuet\\administrator;PWD=keT2402D0main"

# results = []
# with pyodbc.connect(cnxn) as db:
#     cursor = db.cursor()
#     cursor.execute("SELECT Delivery_Date, Prod_Seq, Pallet#, Skewer# FROM PSE_Ts_DataUpload")
#     columns = [column[0] for column in cursor.description]
#     for row in cursor.fetchall():
#         results.append(dict(zip(columns, row)))

# print(results)

# import pyodbc
# cnxn = "Driver={Oracle};Host=172.20.176.72:1521;Service Name=PRDACT;User ID=STDADMIN;Password=STDADMIN"
# # cnxn = "Driver={Oracle};DSN=oracle db;User ID=STDADMIN;Password=STDADMIN"

# results = []
# with pyodbc.connect(cnxn) as db:
#     cursor = db.cursor()
#     cursor.execute("SELECT * FROM HOLD_SEQUENCE")
#     columns = [column[0] for column in cursor.description]
#     for row in cursor.fetchall():
#         results.append(dict(zip(columns, row)))

# print(results)

import cx_Oracle

results = []
with cx_Oracle.connect(user="STDADMIN", password="STDADMIN", dsn="172.20.176.72/PRDACT") as db:
    cursor = db.cursor()
    cursor.execute("SELECT ROWID FROM PROD_RESULT")
    columns = [column[0] for column in cursor.description]
    print(columns)
    for row in cursor.fetchone():
        print(type(row))
        results.append(dict(zip(columns, row)))

# print(type(results[0].values()))