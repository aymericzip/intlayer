# syntax=docker/dockerfile:1.26.0
#
# Build context MUST be the monorepo root:
#   docker build -f apps/backend/Dockerfile -t intlayer/backend .
#
# The image does not build the monorepo. Every `@intlayer/*` package the backend
# depends on is published, so `prepareStandaloneWorkspace.ts` rewrites the
# `workspace:` ranges to a registry tag and bun installs them like any consumer
# would. Only the private `@utils/*` build-config packages stay linked locally.
#
# Layer order is chosen so that editing backend sources reuses the dependency
# layers: manifests are copied first, sources last.

ARG NODE_VERSION=26
ARG BUN_VERSION=1.3.14
# Registry tag used for the published @intlayer/* packages. Override with
# `--build-arg INTLAYER_TAG=9.3.2` to pin an exact release.
ARG INTLAYER_TAG=latest

# ---------------------------------------------------------------------------
# Stage 1 — toolchain shared by the dependency and build stages
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS toolchain

ARG BUN_VERSION
RUN npm install -g bun@${BUN_VERSION}

ENV CI=true
# Puppeteer must never download its own Chromium: the runner uses the system one.
ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /workspace

# ---------------------------------------------------------------------------
# Stage 2 — manifests only, so both installs below share one cached layer
# ---------------------------------------------------------------------------
FROM toolchain AS manifests

ARG INTLAYER_TAG

COPY docker/scripts/prepareStandaloneWorkspace.ts docker/scripts/
COPY utils utils
COPY package.json package.json
COPY apps/backend/package.json apps/backend/package.json

RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/backend --tag "${INTLAYER_TAG}"

# ---------------------------------------------------------------------------
# Stage 3 — full dependency tree, used to build
# ---------------------------------------------------------------------------
FROM manifests AS deps

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --ignore-scripts

# ---------------------------------------------------------------------------
# Stage 4 — production-only dependency tree, copied into the runner
# ---------------------------------------------------------------------------
FROM manifests AS prod-deps

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --production --ignore-scripts

# The backend only ever indexes the English documentation (see
# src/utils/AI/askDocQuestion). @intlayer/docs ships every locale, so drop the
# rest — it is by far the largest chunk of the runtime dependency tree.
RUN set -eux; \
    docs_dir="$(cd apps/backend && bun -e \
      "console.log(require('node:path').dirname(require.resolve('@intlayer/docs/package.json')))")"; \
    for content_dir in docs blog frequent_questions legal; do \
      [ -d "$docs_dir/$content_dir" ] || continue; \
      find "$docs_dir/$content_dir" -mindepth 1 -maxdepth 1 -type d \
        ! -name en -exec rm -rf {} +; \
    done

# ---------------------------------------------------------------------------
# Stage 5 — build the backend bundle
# ---------------------------------------------------------------------------
FROM deps AS builder

ARG INTLAYER_TAG

COPY apps/backend apps/backend

# The COPY above restores the committed manifest, so re-apply the rewrite. The
# script is idempotent and leaves the already-installed node_modules alone.
RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/backend --tag "${INTLAYER_TAG}"

WORKDIR /workspace/apps/backend

ENV NODE_ENV=production

RUN bun run build:ci

# ---------------------------------------------------------------------------
# Stage 6 — runtime
# ---------------------------------------------------------------------------
FROM oven/bun:${BUN_VERSION}-alpine AS runner

# System deps for headless Chromium (Puppeteer)
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  font-noto-emoji \
  fontconfig \
  udev

ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_CACHE_DIR=/home/app/.cache/puppeteer
ENV TMPDIR=/workspace/apps/backend/tmp

RUN addgroup -S app && adduser -S app -G app

# Production node_modules plus the manifests that describe them. This stage
# carries no application sources, no dev dependencies and no build toolchain.
COPY --from=prod-deps --chown=app:app /workspace /workspace
COPY --from=builder --chown=app:app /workspace/apps/backend/dist /workspace/apps/backend/dist

RUN mkdir -p /workspace/apps/backend/tmp /home/app/.cache/puppeteer && \
    chown -R app:app /workspace/apps/backend/tmp /home/app/.cache

WORKDIR /workspace/apps/backend

USER app

# Expose the API port
EXPOSE 3100

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=5 \
  CMD bun -e "const r = await fetch('http://localhost:3100/health'); process.exit(r.ok ? 0 : 1)"

CMD ["bun", "dist/esm/index.mjs"]
