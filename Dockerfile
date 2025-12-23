# RadiantCastOS – Control Plane API (Fly GitHub deploy)
FROM python:3.12-slim

WORKDIR /app

RUN adduser --disabled-password --gecos "" appuser
RUN pip install --no-cache-dir -U pip

# Install backend deps
COPY backend/pyproject.toml /app/pyproject.toml
RUN pip install --no-cache-dir .

# Copy backend code
COPY backend/app /app/app
COPY backend/alembic.ini /app/alembic.ini

USER appuser

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers"]
