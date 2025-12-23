FROM python:3.12-slim

WORKDIR /app

RUN adduser --disabled-password --gecos "" appuser

RUN pip install --no-cache-dir -U pip

COPY pyproject.toml /app/pyproject.toml
RUN pip install --no-cache-dir .

COPY app /app/app
COPY alembic.ini /app/alembic.ini

USER appuser

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers"]
