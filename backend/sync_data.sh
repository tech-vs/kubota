#!/bin/sh

set -ex
 
python manage.py sync_mssql
python manage.py sync_oracle
python manage.py sync_ms_packing_style