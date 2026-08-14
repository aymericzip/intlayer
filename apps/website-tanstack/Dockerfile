# syntax=docker/dockerfile:1.26.0
#
# Build context MUST be the monorepo root:
#   docker build -f apps/website-tanstack/Dockerfile -t intlayer/website-tanstack .
#
# The image does not build the monorepo. Every `@intlayer/*` package this app
# depends on is published, so `prepareStandaloneWorkspace.ts` rewrites the
# `workspace:` ranges to a registry tag and bun installs them like any consumer
# would. Only the private `@utils/*` build-config packages stay linked.
#
# The build arguments live in the builder stage on purpose: changing a public
# URL must not invalidate the dependency layer.

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
COPY apps/website-tanstack/package.json apps/website-tanstack/package.json

RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/website-tanstack --tag "${INTLAYER_TAG}"

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install

# intlayer.config.ts addresses the design system by its monorepo path
# (`../../packages/@intlayer/design-system/dist`); point that path at the
# installed package.
RUN sh docker/scripts/linkWorkspacePackages.sh apps/website-tanstack design-system

# ---------------------------------------------------------------------------
# Stage 2 — build the SSR bundle
# ---------------------------------------------------------------------------
FROM deps AS builder

ARG INTLAYER_TAG

ARG INTLAYER_CLIENT_ID
ARG INTLAYER_CLIENT_SECRET
ARG VITE_DOMAIN
ARG VITE_URL
ARG VITE_EDITOR_URL
ARG VITE_CMS_URL
ARG VITE_BACKEND_DOMAIN
ARG VITE_BACKEND_URL
ARG VITE_ENABLE_SERVICE_WORKER
ARG INTLAYER_BACKEND_URL

ENV INTLAYER_CLIENT_ID=${INTLAYER_CLIENT_ID}
ENV INTLAYER_CLIENT_SECRET=${INTLAYER_CLIENT_SECRET}
ENV VITE_DOMAIN=${VITE_DOMAIN}
ENV VITE_URL=${VITE_URL}
ENV VITE_EDITOR_URL=${VITE_EDITOR_URL}
ENV VITE_CMS_URL=${VITE_CMS_URL}
ENV VITE_BACKEND_DOMAIN=${VITE_BACKEND_DOMAIN}
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_ENABLE_SERVICE_WORKER=${VITE_ENABLE_SERVICE_WORKER}
ENV INTLAYER_BACKEND_URL=${INTLAYER_BACKEND_URL}

# src/utils/agentSkills.ts imports `.agents/skills/*/SKILL.md` to publish
# /.well-known/agent-skills/, so the directory must be in the build.
COPY .agents .agents

COPY apps/website-tanstack apps/website-tanstack

# The COPY above restores the committed manifest, so re-apply the rewrite. The
# script is idempotent and leaves the already-installed node_modules alone.
RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/website-tanstack --tag "${INTLAYER_TAG}"

WORKDIR /workspace/apps/website-tanstack

ENV NODE_ENV=production

# (Note: postbuild script in package.json will auto-trigger generate-sw.ts)
RUN bun run build && bun scripts/baidu-push.ts
# && bun run preserve ## preserve clean cloudflare cache

# Nitro bundles every JS dependency, but @intlayer/docs reads its markdown off
# the filesystem at request time via existsSync/readFile, so the package itself
# must sit next to the server bundle. Resolve it rather than hardcoding a path,
# because bun may hoist it to either node_modules root.
RUN set -eux; \
    docs_dir="$(bun -e \
      "console.log(require('node:path').dirname(require.resolve('@intlayer/docs/package.json')))")"; \
    mkdir -p .output/server/node_modules/@intlayer; \
    cp -RL "${docs_dir}" .output/server/node_modules/@intlayer/docs

# ---------------------------------------------------------------------------
# Stage 3 — runtime
# ---------------------------------------------------------------------------
FROM oven/bun:${BUN_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Nitro bundles all JS dependencies, and the builder already vendored
# @intlayer/docs into .output/server/node_modules — only .output is needed.
COPY --from=builder --chown=appuser:appgroup /workspace/apps/website-tanstack/.output ./.output

USER appuser

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:3000/api/health'); process.exit(r.ok ? 0 : 1)"

CMD ["bun", "run", ".output/server/index.mjs"]
