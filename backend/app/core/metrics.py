from prometheus_client import Counter, Histogram

REQUESTS_TOTAL = Counter("radiantcastos_http_requests_total", "Total HTTP requests", ["method", "path", "status"])
REQUEST_LATENCY = Histogram("radiantcastos_http_request_latency_seconds", "HTTP request latency", ["method", "path"])
