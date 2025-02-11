FROM python:3.9

WORKDIR /code

COPY requirements.txt /code/

RUN pip install --no-cache-dir -r requirements.txt

COPY main.py /code/

CMD ["fastapi", "run", "main.py", "--port", "80"]