FROM tiangolo/uvicorn-gunicorn-fastapi
COPY ../../logging/requirements.txt /data/
RUN pip3 install -r /data/requirements.txt
COPY ../../logging /data/
WORKDIR /data/src
CMD [ "uvicorn", "main:app" ]
