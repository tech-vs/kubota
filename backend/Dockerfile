FROM python:3.10-buster

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

EXPOSE 8000

RUN chmod +x start.sh
RUN chmod -R +x /app/