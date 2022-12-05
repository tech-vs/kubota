#!/bin/sh

set -ex

python manage.py migrate --noinput
python manage.py collectstatic --noinput
# python manage.py initadmin

# gunicorn -b :8000 -w 4 bosch.wsgi
python manage.py runserver