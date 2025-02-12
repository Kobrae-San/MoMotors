FROM python:3.13.2

WORKDIR /usr/src/app

RUN pip install poetry

COPY pyproject.toml ./

RUN poetry lock

RUN poetry install --no-root

COPY . .

EXPOSE 3003

CMD ["poetry", "run", "fastapi", "dev", "main.py", "--host", "0.0.0.0", "--port", "3003"]
