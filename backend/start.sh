#!/bin/sh

set -ex

python manage.py migrate --noinput
python manage.py collectstatic --noinput
# python manage.py initadmin

gunicorn -b :4200 -w 4 kubota_backend.wsgi
# python manage.py runserver