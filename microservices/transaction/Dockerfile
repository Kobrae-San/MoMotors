FROM python:3.13.2-alpine3.21

WORKDIR /usr/src/app

RUN pip install poetry --no-cache-dir

COPY pyproject.toml ./

RUN poetry lock --no-cache

RUN poetry install --no-root --no-cache

COPY . .

EXPOSE 3001

CMD ["poetry", "run", "fastapi", "dev", "main.py", "--host", "0.0.0.0", "--port", "3001"]
