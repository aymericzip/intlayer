# syntax=docker/dockerfile:1.26.0
#
# Build context MUST be the monorepo root:
#   docker build -f apps/app/Dockerfile -t intlayer/app .
#
# The image does not build the monorepo. Every `@intlayer/*` package the
# dashboard depends on is published, so `prepareStandaloneWorkspace.ts` rewrites
# the `workspace:` ranges to a registry tag and bun installs them like any
# consumer would. Only the private `@utils/*` build-config packages stay linked.
#
# Layer order is chosen so that editing application sources reuses the
# dependency layer: manifests are copied first, sources last.

ARG NODE_VERSION=26
ARG BUN_VERSION=1.3.14
# Registry tag used for the published @intlayer/* packages. Override with
# `--build-arg INTLAYER_TAG=9.3.2` to pin an exact release.
ARG INTLAYER_TAG=latest

# ---------------------------------------------------------------------------
# Stage 1 — dependencies (invalidated only by manifest changes)
# ---------------------------------------------------------------------------
# Use node because of a bun issue blocking at `Creating an optimized production build ...`
# https://github.com/oven-sh/bun/issues/17136
# https://github.com/oven-sh/bun/issues/4795
FROM node:${NODE_VERSION}-alpine AS deps

ARG BUN_VERSION
ARG INTLAYER_TAG

RUN npm install -g bun@${BUN_VERSION}

RUN apk add --no-cache build-base zlib-dev autoconf automake

ENV CI=true
# No transitive dependency may pull its own Chromium into this image.
ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /workspace

COPY docker/scripts docker/scripts
COPY utils utils
COPY package.json package.json
COPY apps/app/package.json apps/app/package.json

# @intlayer/backend is consumed for its types only (every import in src is an
# `import type`), and vite erases those. Dropping it keeps the whole backend
# runtime tree — puppeteer, mongoose, aws-sdk — out of the build.
RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/app --tag "${INTLAYER_TAG}" --drop @intlayer/backend

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install

# intlayer.config.ts addresses the design system by its monorepo path
# (`../../packages/@intlayer/design-system/dist`); point that path at the
# installed package.
RUN sh docker/scripts/linkWorkspacePackages.sh apps/app design-system

# ---------------------------------------------------------------------------
# Stage 2 — build the SSR bundle
# ---------------------------------------------------------------------------
FROM deps AS builder

ARG INTLAYER_TAG

COPY apps/app apps/app

# The COPY above restores the committed manifest, so re-apply the rewrite. The
# script is idempotent and leaves the already-installed node_modules alone.
RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/app --tag "${INTLAYER_TAG}" --drop @intlayer/backend

WORKDIR /workspace/apps/app

ENV NODE_ENV=production

RUN bun run build && bun scripts/generate-sw.ts && bun run preserve

# ---------------------------------------------------------------------------
# Stage 3 — runtime. Nitro bundles every dependency, so only .output ships.
# ---------------------------------------------------------------------------
FROM oven/bun:${BUN_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder --chown=app:app /workspace/apps/app/.output ./.output

USER app

# Expose the API port (defaults to 3100 via .env, can be overridden)
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:3000/health'); process.exit(r.ok ? 0 : 1)"

CMD ["bun", "run", ".output/server/index.mjs"]
