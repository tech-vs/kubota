FROM python:3.10-buster

WORKDIR /app

COPY . /app

ARG HTTP_PROXY=172.20.176.9:8080
ARG HTTPS_PROXY=172.20.176.9:8080
RUN pip install --upgrade pip
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

EXPOSE 8000

RUN chmod +x start.sh
RUN chmod -R +x /app/