FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN adduser --disabled-password --gecos "" appuser

RUN pip install --no-cache-dir -U pip

COPY pyproject.toml /app/pyproject.toml
RUN pip install --no-cache-dir .

COPY app /app/app

USER appuser
ENV PYTHONUNBUFFERED=1

EXPOSE 9102

CMD ["python", "-m", "app.router"]
