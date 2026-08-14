# syntax=docker/dockerfile:1.26.0
#
# Build context MUST be the monorepo root:
#   docker build -f apps/showcase/Dockerfile -t intlayer/showcase .
#
# The image does not build the monorepo. Every `@intlayer/*` package the
# showcase depends on is published, so `prepareStandaloneWorkspace.ts` rewrites
# the `workspace:` ranges to a registry tag and bun installs them like any
# consumer would.

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

ENV CI=true
# No transitive dependency may pull its own Chromium into this image.
ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /workspace

COPY docker/scripts docker/scripts
COPY utils utils
COPY package.json package.json
COPY apps/showcase/package.json apps/showcase/package.json

RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/showcase --tag "${INTLAYER_TAG}"

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install

# ---------------------------------------------------------------------------
# Stage 2 — build the SSR bundle
# ---------------------------------------------------------------------------
FROM deps AS builder

ARG INTLAYER_TAG

COPY apps/showcase apps/showcase

# The COPY above restores the committed manifest, so re-apply the rewrite. The
# script is idempotent and leaves the already-installed node_modules alone.
RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/showcase --tag "${INTLAYER_TAG}"

WORKDIR /workspace/apps/showcase

ENV NODE_ENV=production

RUN bun run build && bun run preserve

# ---------------------------------------------------------------------------
# Stage 3 — runtime. Nitro bundles every dependency, so only .output ships.
# ---------------------------------------------------------------------------
FROM oven/bun:${BUN_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder --chown=appuser:appgroup /workspace/apps/showcase/.output ./.output

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:3000/'); process.exit(r.ok ? 0 : 1)" && \
      bun -e "const r = await fetch('http://localhost:3000/doc/environment/nextjs'); process.exit(r.ok ? 0 : 1)"

# Start the showcase server
CMD ["bun", "run", ".output/server/index.mjs"]
