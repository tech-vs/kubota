#!/bin/sh

set -ex
 
docker exec -i django python manage.py sync_mssql
docker exec -i django python manage.py sync_oracle
docker exec -i django python manage.py sync_ms_packing_style