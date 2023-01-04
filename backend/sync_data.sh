#!/bin/sh

set -ex
 
docker exec -it django python manage.py sync_mssql
docker exec -it django python manage.py sync_oracle
docker exec -it django python manage.py sync_ms_packing_style