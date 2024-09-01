FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

COPY . /app/
WORKDIR /app


COPY requirements.txt /app/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt



CMD ["python","manage.py","runserver","0.0.0.0:8000"]