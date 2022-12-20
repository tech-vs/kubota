#!/bin/sh

set -ex
 
python manage.py sync_mssql
python manage.py sync_oracle
