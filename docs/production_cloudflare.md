# Cloudflare hardened posture (recommended)

## Recommended posture
1) **DNS + TLS**
   - Proxy your domains through Cloudflare.
   - Use TLS Full (strict).

2) **WAF + Rate limiting**
   - Rate limit sensitive endpoints (auth, station management).
   - Bot protection + IP reputation.

3) **JWT verification**
   - Keep JWT verification in the API (Supabase JWKS validation).
   - Optional edge JWT rejection via Cloudflare Worker, but do not remove API validation.

4) **Lock down internal endpoints**
   - Control plane `/metrics` is protected by the router service token.
   - Router `:9102/metrics` should be private-only in production.

5) **HLS caching**
   - Cache `.ts` segments aggressively.
   - Keep `.m3u8` playlist TTL short.
