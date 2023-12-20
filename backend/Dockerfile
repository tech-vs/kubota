FROM python:3.10.8-buster

WORKDIR /app

COPY . /app

ARG HTTP_PROXY=172.20.176.9:8080
ARG HTTPS_PROXY=172.20.176.9:8080
ADD proxy.conf /etc/apt/apt.conf.d/
ADD odbcinst.ini /etc/
RUN apt-get update -y
RUN apt-get install -y alien
RUN apt-get install -y libaio1
RUN apt-get install -y apt-utils
RUN apt-get install -y unixodbc
RUN apt-get install -y unixodbc-dev
RUN apt-get install -y freetds-dev
RUN apt-get install -y freetds-bin
RUN apt-get install -y tdsodbc
RUN apt-get install -y build-essential 
RUN apt-get install -y libpq-dev
RUN alien -i oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm
ENV ORACLE_HOME /usr/lib/oracle/12.2/client64
ENV LD_LIBRARY_PATH /usr/lib/oracle/12.2/client64/lib
ENV ORACLE_SID asdb
# RUN export DOCKER_DEFAULT_PLATFORM=linux/amd64

RUN pip install --upgrade pip
RUN pip install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org pip setuptools

# RUN pip install poetry
# RUN poetry config virtualenvs.create false
# RUN poetry install --no-dev
RUN pip install -r requirements.txt
RUN pip uninstall psycopg2
RUN pip install psycopg2-binary --no-binary psycopg2-binary
EXPOSE 4200

RUN chmod +x start.sh
RUN chmod -R +x /app/
