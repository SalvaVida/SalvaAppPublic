FROM python:3-alpine3.11

WORKDIR /home/apps

COPY . ./

ENV PYTHONUNBUFFERED=1

RUN apk add --update --no-cache postgresql-client jpeg-dev
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev

RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt
# RUN python src/manage.py migrate

EXPOSE 8000

CMD ["python", "src/manage.py", "runserver", "0.0.0.0:8000"]
