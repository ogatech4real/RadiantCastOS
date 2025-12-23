from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    api_base_url: str = "http://api:8000"
    router_service_token: str = "change-me-long-random"

    station_slugs: str = "demo-fm"  # comma-separated
    hls_root: str = "/hls"

    live_source_url: str = "http://icecast:8001/live"
    autodj_source_url: str = "http://icecast:8001/autodj"
    fallback_source_url: str = "lavfi:sine=frequency=440:sample_rate=44100"

    hls_segment_seconds: int = 4
    hls_list_size: int = 6

    silence_db: str = "-45dB"
    silence_min_seconds: float = 3.0
    silence_failover_seconds: float = 6.0

    poll_seconds: float = 2.0
    max_concurrent_stations: int = 10

    router_http_host: str = "0.0.0.0"
    router_http_port: int = 9102

    class Config:
        env_file = ".env"
        case_sensitive = False

    def slugs(self) -> list[str]:
        return [s.strip() for s in (self.station_slugs or "").split(",") if s.strip()]

settings = Settings()
