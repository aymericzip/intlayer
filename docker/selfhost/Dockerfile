# syntax=docker/dockerfile:1.23.0
#
# Intlayer self-hosting — single all-in-one image.
# Bundles the dashboard (app), the API (backend) and the datastores
# (MongoDB, Redis, MinIO) into one container, supervised by s6-overlay.
#
# Build context MUST be the monorepo root:
#   docker build -f docker/selfhost/Dockerfile -t intlayer/selfhost .
#
# NOTE: this is a "batteries-included, one box" image meant for quick self-host
# trials. For production prefer one-process-per-container (see ___self-hosting-plan.md).

# ---------------------------------------------------------------------------
# Stage 1 — backend builder (mirrors apps/backend/Dockerfile build logic)
# ---------------------------------------------------------------------------
FROM node:26-alpine AS backend-builder

RUN npm install -g bun@1.3.14
RUN apk add --no-cache build-base zlib-dev autoconf automake

WORKDIR /workspace

COPY \
    --exclude=packages/@intlayer/vue-compiler \
    --exclude=packages/@intlayer/svelte-compiler \
    --exclude=packages/@intlayer/lsp \
    --exclude=packages/@intlayer/swc \
    --exclude=packages/@intlayer/webpack \
    --exclude=packages/@intlayer/editor \
    --exclude=packages/@intlayer/editor-react \
    --exclude=packages/intlayer-cli \
    --exclude=packages/next-intlayer \
    --exclude=packages/react-scripts-intlayer \
    --exclude=packages/react-intlayer \
    --exclude=packages/vue-intlayer \
    --exclude=packages/solid-intlayer \
    --exclude=packages/svelte-intlayer \
    --exclude=packages/preact-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/vite-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/astro-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/lit-intlayer \
    --exclude=packages/vanilla-intlayer \
    --exclude=packages/@intlayer/design-system \
    --exclude=packages/intlayer-editor \
    --exclude=packages/express-intlayer \
    --exclude=packages/hono-intlayer \
    --exclude=packages/adonis-intlayer \
    --exclude=plugins \
    --exclude=compat \
    --exclude=docs/assets \
    --exclude=docs/blog \
    --exclude=docs/frequent_questions \
    --exclude=docs/legal \
    --exclude=examples \
    --exclude=apps/website \
    --exclude=apps/website-tanstack \
    --exclude=apps/showcase \
    --exclude=apps/app \
    --exclude=**/*.stories.* \
    . .

COPY docs/docs/en/                 docs/docs/en/
COPY docs/blog/en/                 docs/blog/en/
COPY docs/frequent_questions/en/   docs/frequent_questions/en/
COPY docs/legal/en/                docs/legal/en/

RUN bun install --ignore-scripts --filter=./apps/backend
RUN bun x turbo run build:ci --filter=./apps/backend

# Strip source files to reduce the size of the artifacts copied into the runner.
RUN find . -path "*/src/*" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.map" \) -not -path "*/node_modules/*" -delete

# ---------------------------------------------------------------------------
# Stage 2 — app builder (mirrors apps/app/Dockerfile build logic)
# ---------------------------------------------------------------------------
FROM node:26-alpine AS app-builder

RUN npm install -g bun@1.3.14
RUN apk add --no-cache build-base zlib-dev autoconf automake

WORKDIR /workspace

# VITE_* vars are inlined at build time. Defaults target the all-in-one image
# reached on localhost; override with --build-arg for a custom host/domain.
ARG VITE_BACKEND_URL=http://localhost:3100
ARG VITE_DOMAIN=localhost
ARG VITE_SITE_URL=http://localhost:3000
ARG VITE_IDE_URL=http://localhost:3000
# Self-hosted mode: disables cloud-only features (Stripe billing, pricing pages,
# reviewer marketplace, PostHog/Ahrefs analytics). Vite inlines it into the bundle.
ARG VITE_SELF_HOSTED=true
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_DOMAIN=${VITE_DOMAIN}
ENV VITE_SITE_URL=${VITE_SITE_URL}
ENV VITE_IDE_URL=${VITE_IDE_URL}
ENV VITE_SELF_HOSTED=${VITE_SELF_HOSTED}

COPY \
    --exclude=packages/@intlayer/doc \
    --exclude=packages/@intlayer/vue-compiler \
    --exclude=packages/@intlayer/svelte-compiler \
    --exclude=packages/@intlayer/swc \
    --exclude=packages/@intlayer/lsp \
    --exclude=packages/intlayer-cli \
    --exclude=packages/react-scripts-intlayer \
    --exclude=packages/vue-intlayer \
    --exclude=packages/intlayer-editor \
    --exclude=packages/solid-intlayer \
    --exclude=packages/svelte-intlayer \
    --exclude=packages/preact-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/astro-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/lit-intlayer \
    --exclude=packages/vanilla-intlayer \
    --exclude=packages/express-intlayer \
    --exclude=packages/hono-intlayer \
    --exclude=packages/adonis-intlayer \
    --exclude=apps/website \
    --exclude=apps/website-tanstack \
    --exclude=apps/showcase \
    --exclude=docs/assets \
    --exclude=examples \
    --exclude=plugins \
    --exclude=compat \
    --exclude=**/*.stories.* \
    . .


RUN bun install 

RUN bun x turbo run build:ci --filter=./apps/app

WORKDIR /workspace/apps/app

ENV NODE_ENV=production

# Build the SSR app + service worker. "preserve" (Cloudflare cache purge) is
# intentionally skipped — it is a cloud-deploy concern, not a self-host one.
RUN bun run build && bun scripts/generate-sw.ts

# ---------------------------------------------------------------------------
# Stage 3 — runtime: glibc base with mongo + redis + minio + bun + chromium + s6
# ---------------------------------------------------------------------------
FROM debian:bookworm-slim AS runner

ENV DEBIAN_FRONTEND=noninteractive

ARG S6_OVERLAY_VERSION=3.2.1.0
ARG MINIO_RELEASE=RELEASE.2025-04-22T22-12-26Z
ARG MC_RELEASE=RELEASE.2025-04-16T18-13-26Z

# Base OS deps + headless Chromium (for Puppeteer) + MongoDB + Redis.
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
      ca-certificates curl gnupg xz-utils unzip bash procps tini \
      redis-server \
      chromium fonts-freefont-ttf fonts-noto-color-emoji fontconfig \
      libnss3 libfreetype6 libharfbuzz0b; \
    # MongoDB 7 apt repo, arch-aware. MongoDB publishes arm64 packages only for
    # Ubuntu, not Debian, so pick the matching distro repo per architecture. The
    # Ubuntu 22.04 (jammy) arm64 build runs fine on Debian bookworm (glibc 2.36,
    # libssl3). amd64 keeps the native Debian bookworm repo.
    arch="$(dpkg --print-architecture)"; \
    case "$arch" in \
      amd64) mongo_repo="deb [ arch=amd64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" ;; \
      arm64) mongo_repo="deb [ arch=arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" ;; \
      *) echo "unsupported arch: $arch"; exit 1 ;; \
    esac; \
    curl -fsSL https://pgp.mongodb.com/server-7.0.asc \
      | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg; \
    echo "$mongo_repo" > /etc/apt/sources.list.d/mongodb-org-7.0.list; \
    apt-get update; \
    apt-get install -y --no-install-recommends mongodb-org-server mongodb-mongosh; \
    rm -rf /var/lib/apt/lists/*

# Bun runtime (the app + backend are executed with bun)
RUN curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr/local bash \
    && bun --version

# MinIO server + client (mc), arch-aware
RUN set -eux; \
    case "$(dpkg --print-architecture)" in \
      amd64) MINIO_ARCH=amd64 ;; \
      arm64) MINIO_ARCH=arm64 ;; \
      *) echo "unsupported arch"; exit 1 ;; \
    esac; \
    curl -fsSL "https://dl.min.io/server/minio/release/linux-${MINIO_ARCH}/archive/minio.${MINIO_RELEASE}" -o /usr/local/bin/minio; \
    curl -fsSL "https://dl.min.io/client/mc/release/linux-${MINIO_ARCH}/archive/mc.${MC_RELEASE}" -o /usr/local/bin/mc; \
    chmod +x /usr/local/bin/minio /usr/local/bin/mc

# s6-overlay (multi-process supervisor), arch-aware
RUN set -eux; \
    case "$(dpkg --print-architecture)" in \
      amd64) S6_ARCH=x86_64 ;; \
      arm64) S6_ARCH=aarch64 ;; \
      *) echo "unsupported arch"; exit 1 ;; \
    esac; \
    curl -fsSL "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz" -o /tmp/s6-noarch.tar.xz; \
    curl -fsSL "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz" -o /tmp/s6-arch.tar.xz; \
    tar -C / -Jxpf /tmp/s6-noarch.tar.xz; \
    tar -C / -Jxpf /tmp/s6-arch.tar.xz; \
    rm -f /tmp/s6-noarch.tar.xz /tmp/s6-arch.tar.xz

# Puppeteer → system Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_CACHE_DIR=/root/.cache/puppeteer

# ---- Runtime configuration (override at `docker run` with -e) ----------------
ENV NODE_ENV=production \
    VITE_SELF_HOSTED=true \
    DOMAIN=localhost \
    APP_URL=http://localhost:3000 \
    BACKEND_URL=http://localhost:3100 \
    MONGODB_URI=mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0 \
    REDIS_URL=redis://127.0.0.1:6379 \
    S3_ENDPOINT=http://127.0.0.1:9000 \
    S3_PUBLIC_URL=http://localhost:9000/intlayer \
    S3_BUCKET_NAME=intlayer \
    S3_ACCESS_KEY_ID=intlayer \
    S3_SECRET_ACCESS_KEY=intlayer-secret \
    TMPDIR=/workspace/apps/backend/tmp

# Built artifacts
COPY --from=backend-builder /workspace /workspace
COPY --from=app-builder /workspace/apps/app/.output /app/.output

# s6 service definitions (run scripts, oneshots, init scripts)
COPY docker/selfhost/rootfs /

# Data dirs, tmp dirs, mark scripts executable, and wire s6 service graph.
RUN set -eux; \
    mkdir -p /data/mongo /data/redis /data/minio /workspace/apps/backend/tmp /root/.cache/puppeteer; \
    chmod +x \
      /etc/s6-overlay/s6-rc.d/mongod/run \
      /etc/s6-overlay/s6-rc.d/redis/run \
      /etc/s6-overlay/s6-rc.d/minio/run \
      /etc/s6-overlay/s6-rc.d/backend/run \
      /etc/s6-overlay/s6-rc.d/app/run \
      /etc/s6-overlay/scripts/init-mongo.sh \
      /etc/s6-overlay/scripts/init-minio.sh; \
    # init-mongo depends on mongod ; init-minio depends on minio
    mkdir -p /etc/s6-overlay/s6-rc.d/init-mongo/dependencies.d; \
    touch    /etc/s6-overlay/s6-rc.d/init-mongo/dependencies.d/mongod; \
    mkdir -p /etc/s6-overlay/s6-rc.d/init-minio/dependencies.d; \
    touch    /etc/s6-overlay/s6-rc.d/init-minio/dependencies.d/minio; \
    # backend depends on a ready replica set, redis and the minio bucket
    mkdir -p /etc/s6-overlay/s6-rc.d/backend/dependencies.d; \
    touch    /etc/s6-overlay/s6-rc.d/backend/dependencies.d/init-mongo \
             /etc/s6-overlay/s6-rc.d/backend/dependencies.d/redis \
             /etc/s6-overlay/s6-rc.d/backend/dependencies.d/init-minio; \
    # app starts after backend
    mkdir -p /etc/s6-overlay/s6-rc.d/app/dependencies.d; \
    touch    /etc/s6-overlay/s6-rc.d/app/dependencies.d/backend; \
    # register every service in the default "user" bundle
    mkdir -p /etc/s6-overlay/s6-rc.d/user/contents.d; \
    touch    /etc/s6-overlay/s6-rc.d/user/contents.d/mongod \
             /etc/s6-overlay/s6-rc.d/user/contents.d/redis \
             /etc/s6-overlay/s6-rc.d/user/contents.d/minio \
             /etc/s6-overlay/s6-rc.d/user/contents.d/init-mongo \
             /etc/s6-overlay/s6-rc.d/user/contents.d/init-minio \
             /etc/s6-overlay/s6-rc.d/user/contents.d/backend \
             /etc/s6-overlay/s6-rc.d/user/contents.d/app

# Persist datastores across container recreation
VOLUME ["/data"]

# app (3000), api (3100), minio S3 (9000), minio console (9001)
EXPOSE 3000 3100 9000 9001

# Wait longer than a normal service: first boot initiates the replica set,
# creates the bucket, then boots two bun servers.
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=5 \
  CMD bash -c 'curl -sf http://localhost:3100/health >/dev/null && curl -sf http://localhost:3000/healthz >/dev/null'

ENV S6_KEEP_ENV=1 \
    S6_BEHAVIOUR_IF_STAGE2_FAILS=2 \
    S6_CMD_WAIT_FOR_SERVICES_MAXTIME=0

ENTRYPOINT ["/init"]
