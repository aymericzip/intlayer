# Intlayer self-host — all-in-one image

A single container bundling the **dashboard (app)**, the **API (backend)** and the
supporting **datastores it can host locally (Redis, MinIO)**, supervised by
[s6-overlay](https://github.com/just-containers/s6-overlay).

> This is the quick-trial "one box" image, meant to be reached from the **same
> host** on `http://localhost:3000`. For production, prefer one process per
> container — see [`___self-hosting-plan.md`](../../___self-hosting-plan.md).

## What you need to provide

The image is batteries-included **except for MongoDB**: the backend connects to a
MongoDB **Atlas** cluster over `mongodb+srv://` (see
`apps/backend/src/utils/mongoDB/connectDB.ts`). Create a free cluster at
[mongodb.com/atlas](https://www.mongodb.com/atlas) and provide its credentials via
`DB_ID` / `DB_MDP` / `DB_CLUSTER`.

You also need:

- `BETTER_AUTH_SECRET` — 32-byte secret for session signing.
- `S3_SECRET_ACCESS_KEY` — secret for the bundled MinIO.
- `RESEND_API_KEY` — required to complete first-run setup, because account
  creation sends a **mandatory** email-verification link
  (`requireEmailVerification: true`). Get a key at
  [resend.com](https://resend.com). After the first admin signs in, each
  organization can switch to its own SMTP/Resend mailer from the dashboard.

## Build

Build from the **monorepo root** (the build context must be the repo root):

```sh
docker build -f docker/selfhost/Dockerfile -t intlayer/selfhost .
```

> The browser-facing `VITE_*` values are inlined at **build time** and default to
> `localhost`. The published image is therefore only reachable from the same host —
> see [Limitations](#limitations).

## Run

```sh
docker run -d --name intlayer \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  -e DB_ID="<atlas-user>" \
  -e DB_MDP="<atlas-password>" \
  -e DB_CLUSTER="<cluster>.xxxxx.mongodb.net" \
  -e BETTER_AUTH_SECRET="$(openssl rand -hex 32)" \
  -e S3_SECRET_ACCESS_KEY="$(openssl rand -hex 16)" \
  -e RESEND_API_KEY="<your-resend-key>" \
  intlayer/selfhost
```

Then open **http://localhost:3000**. On a fresh instance you are redirected to the
`/init` page to create the first account, which is automatically promoted to super
admin. Confirm the verification email (delivered via Resend), then sign in.

| Port | Service           |
| ---- | ----------------- |
| 3000 | Dashboard (app)   |
| 3100 | API (backend)     |
| 9000 | MinIO S3 endpoint |
| 9001 | MinIO console     |

Local state (Redis, MinIO) lives under `/data` (`/data/redis`, `/data/minio`) —
mount a volume there to persist across container recreation. MongoDB state lives in
your Atlas cluster, not in the container.

## Supervised services (s6)

Boot order is enforced through s6 dependencies:

```
redis ──────────────────────────┐
minio ─▶ init-minio (bucket) ────┴─▶ backend ─▶ app
```

Long-running services (`redis`, `minio`, `backend`, `app`) auto-restart on exit, so
the backend recovers if a datastore is briefly unavailable on first boot.

> The image also starts a local `mongod` (`/data/mongo`) for convenience, but the
> backend does **not** use it — it connects to your Atlas cluster via `DB_*`. See
> [Limitations](#limitations).

## Configuration

Local datastore wiring is baked in (`REDIS_URL`, `S3_ENDPOINT`, …) and points at the
in-container services. Override any of them, plus the optional integrations, with
`-e` at `docker run`:

- **Required:** `DB_ID`, `DB_MDP`, `DB_CLUSTER`, `BETTER_AUTH_SECRET`,
  `S3_SECRET_ACCESS_KEY`, `RESEND_API_KEY`.
- **Optional features (blank ⇒ disabled):** `OPENAI_API_KEY`, `STRIPE_*`,
  OAuth (`GITHUB_*`, `GOOGLE_*`, …).

## Limitations

- **MongoDB is not self-contained.** The backend only speaks `mongodb+srv://`
  (Atlas), so you must supply an external cluster via `DB_*`. The bundled `mongod`
  is currently unused; a future change to `connectDB` (accepting a plain
  `mongodb://` URI) would let the in-container Mongo be used and make the image
  fully offline.
- **No custom domain.** All `VITE_*` browser URLs are inlined at build time and the
  published image ships with `localhost` values, so the dashboard must be reached at
  `http://localhost:3000`. Serving it on a public domain would require rebuilding the
  image with the target URLs baked in and is not supported out of the box.
- **Email delivery depends on Resend.** Without `RESEND_API_KEY`, the mandatory
  first-run verification email is never delivered and setup cannot be completed.
