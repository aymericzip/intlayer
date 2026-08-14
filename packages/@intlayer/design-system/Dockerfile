# syntax=docker/dockerfile:1.26.0
#
# Storybook for the design system.
#
# Build context MUST be the monorepo root:
#   docker build -f packages/@intlayer/design-system/Dockerfile -t intlayer/design-system .
#
# The image does not build the monorepo. Every `@intlayer/*` package the design
# system depends on is published, so `prepareStandaloneWorkspace.ts` rewrites the
# `workspace:` ranges to a registry tag and bun installs them like any consumer
# would. Only the private `@utils/*` build-config packages stay linked.

ARG NODE_VERSION=26
ARG BUN_VERSION=1.3.14
# Registry tag used for the published @intlayer/* packages. Override with
# `--build-arg INTLAYER_TAG=9.3.2` to pin an exact release.
ARG INTLAYER_TAG=latest

# ---------------------------------------------------------------------------
# Stage 1 — dependencies (invalidated only by manifest changes)
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS deps

ARG BUN_VERSION
ARG INTLAYER_TAG

RUN npm install -g bun@${BUN_VERSION}

ENV CI=true
ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /workspace

COPY docker/scripts/prepareStandaloneWorkspace.ts docker/scripts/
COPY utils utils
COPY package.json package.json
COPY packages/@intlayer/design-system/package.json packages/@intlayer/design-system/package.json

# @intlayer/backend is consumed for its types only, and the bundler erases
# those. Dropping it keeps the whole backend runtime tree — puppeteer, mongoose,
# aws-sdk — out of the Storybook build.
RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace packages/@intlayer/design-system --tag "${INTLAYER_TAG}" \
      --drop @intlayer/backend

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install

# ---------------------------------------------------------------------------
# Stage 2 — build the static Storybook site
# ---------------------------------------------------------------------------
FROM deps AS builder

ARG INTLAYER_TAG

COPY packages/@intlayer/design-system packages/@intlayer/design-system

# The COPY above restores the committed manifest, so re-apply the rewrite. The
# script is idempotent and leaves the already-installed node_modules alone.
RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace packages/@intlayer/design-system --tag "${INTLAYER_TAG}" \
      --drop @intlayer/backend

WORKDIR /workspace/packages/@intlayer/design-system

# Build the package itself, then its dictionaries, then Storybook.
RUN bun run build:ci

RUN bun x intlayer build

ENV STORYBOOK_TELEMETRY=false
ENV STORYBOOK_STATIC=true
RUN bun x storybook build --disable-telemetry

# ---------------------------------------------------------------------------
# Stage 3 — runtime: a static file server and nothing else
# ---------------------------------------------------------------------------
FROM oven/bun:${BUN_VERSION}-alpine AS runner

WORKDIR /www

RUN addgroup -S app && adduser -S app -G app

# Install the static file server into the image rather than resolving it with
# `bun x` at start-up: the container then boots without touching the network.
RUN BUN_INSTALL=/usr/local bun install -g serve

COPY --from=builder --chown=app:app \
     /workspace/packages/@intlayer/design-system/storybook-static .

USER app

EXPOSE 6006

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:6006/'); process.exit(r.ok ? 0 : 1)"

# -l port, "." doc root
CMD ["serve", ".", "-l", "6006"]
