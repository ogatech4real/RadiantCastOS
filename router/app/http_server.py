import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path in ("/healthz", "/readyz"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
            return
        if self.path == "/metrics":
            data = generate_latest()
            self.send_response(200)
            self.send_header("Content-Type", CONTENT_TYPE_LATEST)
            self.end_headers()
            self.wfile.write(data)
            return
        self.send_response(404)
        self.end_headers()

def start_http_server(host: str, port: int):
    def run():
        httpd = HTTPServer((host, port), Handler)
        httpd.serve_forever()
    t = threading.Thread(target=run, daemon=True)
    t.start()
