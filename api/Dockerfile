FROM python:3.9

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./main.py .

EXPOSE 3000

CMD ["fastapi", "run", "main.py", "--port", "3000"]