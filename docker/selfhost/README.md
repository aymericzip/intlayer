# Intlayer self-host — all-in-one image

A single container bundling the **dashboard (app)**, the **API (backend)** and the
**datastores (MongoDB, Redis, MinIO)**, supervised by [s6-overlay](https://github.com/just-containers/s6-overlay).

> This is the quick-trial "one box" image. For production, prefer one process per
> container — see [`___self-hosting-plan.md`](../../___self-hosting-plan.md).

## Build

Build from the **monorepo root** (the build context must be the repo root):

```sh
docker build -f docker/selfhost/Dockerfile -t intlayer/selfhost .
```

The browser-facing `VITE_*` values are inlined at build time. To point the
dashboard at a non-localhost host, pass build args:

```sh
docker build -f docker/selfhost/Dockerfile \
  --build-arg VITE_BACKEND_URL=https://api.example.com \
  --build-arg VITE_DOMAIN=example.com \
  --build-arg VITE_SITE_URL=https://example.com \
  -t intlayer/selfhost .
```

## Run

```sh
docker run -d --name intlayer \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  -e BETTER_AUTH_SECRET="$(openssl rand -hex 32)" \
  -e S3_SECRET_ACCESS_KEY="$(openssl rand -hex 16)" \
  intlayer/selfhost
```

| Port | Service           |
| ---- | ----------------- |
| 3000 | Dashboard (app)   |
| 3100 | API (backend)     |
| 9000 | MinIO S3 endpoint |
| 9001 | MinIO console     |

All state lives under `/data` (`/data/mongo`, `/data/redis`, `/data/minio`) — mount
a volume there to persist across container recreation.

## Supervised services (s6)

Boot order is enforced through s6 dependencies:

```
mongod ─▶ init-mongo (rs.initiate rs0) ─┐
redis ──────────────────────────────────┼─▶ backend ─▶ app
minio ─▶ init-minio (create bucket) ─────┘
```

Long-running services (`mongod`, `redis`, `minio`, `backend`, `app`) auto-restart on
exit, so the backend recovers if a datastore is briefly unavailable on first boot.

## Configuration

Datastore wiring is baked in (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, …) and points
at the in-container services. Override any of them, plus the optional integrations,
with `-e` at `docker run`:

- **Secrets to set:** `BETTER_AUTH_SECRET`, `S3_SECRET_ACCESS_KEY`.
- **Optional features (blank ⇒ disabled):** `OPENAI_API_KEY`, `STRIPE_*`,
  `RESEND_API_KEY`, OAuth (`GITHUB_*`, `GOOGLE_*`, …).

## ⚠️ Known blockers (image builds & pushes, but is not yet fully bootable)

The image is buildable and publishable today, but end-to-end boot still depends on
three code fixes tracked in [`___self-hosting-plan.md`](../../___self-hosting-plan.md):

1. **MongoDB** — `apps/backend/src/utils/mongoDB/connectDB.ts` still hardcodes the
   Atlas `mongodb+srv://` URI; it must honour `MONGODB_URI` for the in-container
   Mongo to be used.
2. **Mail** — `email.service.tsx` is hardcoded to Resend; a self-host needs the
   SMTP/`MAIL_*` abstraction (or an SMTP service) for verification/invite emails.
3. **CORS** — `apps/backend/src/utils/cors.ts` whitelists only `*.intlayer.org`; it
   must trust `APP_URL` so the dashboard can send auth cookies.

The runtime env here is already wired so the image works as soon as those land.
