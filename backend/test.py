import pyodbc

cnxn = "Driver={FreeTDS};TDS_VERSION=7.3;Server=172.20.176.4,1433;Database=ADJ;UID=kuet\\administrator;PWD=keT2402D0main"

with pyodbc.connect(cnxn) as db:
    cursor = db.cursor()
    cursor.execute("SELECT Delivery_Date, Prod_Seq, Pallet#, Skewer# FROM PSE_Ts_DataUpload")
    for row in cursor:
        print(row)