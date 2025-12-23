from prometheus_client import Counter, Gauge, Histogram

ROUTER_STATION_SWITCHES = Counter("radiantcastos_router_station_switch_total", "Station source switches", ["station_id"])
ROUTER_STATION_RUNNING = Gauge("radiantcastos_router_station_running", "Station router task running", ["station_id"])
ROUTER_LOOP_LATENCY = Histogram("radiantcastos_router_loop_latency_seconds", "Router loop latency", ["station_id"])
