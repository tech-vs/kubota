FROM python:3.10.8-buster

WORKDIR /app

COPY . /app

ARG HTTP_PROXY=172.20.176.9:8080
ARG HTTPS_PROXY=172.20.176.9:8080
ADD proxy.conf /etc/apt/apt.conf.d/
ADD odbcinst.ini /etc/
RUN apt-get update -y
RUN apt-get install -y apt-utils
RUN apt-get install -y unixodbc
RUN apt-get install -y unixodbc-dev
RUN apt-get install -y freetds-dev
RUN apt-get install -y freetds-bin
RUN apt-get install -y tdsodbc


RUN pip install --upgrade pip
# RUN pip install poetry
# RUN poetry config virtualenvs.create false
# RUN poetry install --no-dev
RUN pip install -r requirements.txt

EXPOSE 4200

RUN chmod +x start.sh
RUN chmod -R +x /app/