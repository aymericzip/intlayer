# syntax=docker/dockerfile:1.26.0
#
# Build context MUST be the monorepo root:
#   docker build -f apps/website/Dockerfile -t intlayer/website .
#
# The image does not build the monorepo. Every `@intlayer/*` package the website
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
COPY apps/website/package.json apps/website/package.json

RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/website --tag "${INTLAYER_TAG}"

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install

# intlayer.config.ts addresses the design system by its monorepo path
# (`../../packages/@intlayer/design-system/dist`); point that path at the
# installed package.
RUN sh docker/scripts/linkWorkspacePackages.sh apps/website design-system

# ---------------------------------------------------------------------------
# Stage 2 — build the standalone Next.js server
# ---------------------------------------------------------------------------
FROM deps AS builder

ARG INTLAYER_TAG

ARG INTLAYER_CLIENT_ID
ARG INTLAYER_CLIENT_SECRET
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_EDITOR_URL
ARG NEXT_PUBLIC_CMS_URL
ARG NEXT_PUBLIC_BACKEND_DOMAIN
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ARG NEXT_PUBLIC_ENABLE_SERVICE_WORKER
ARG INTLAYER_BACKEND_URL

ENV INTLAYER_CLIENT_ID=${INTLAYER_CLIENT_ID}
ENV INTLAYER_CLIENT_SECRET=${INTLAYER_CLIENT_SECRET}
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_EDITOR_URL=${NEXT_PUBLIC_EDITOR_URL}
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}
ENV NEXT_PUBLIC_BACKEND_DOMAIN=${NEXT_PUBLIC_BACKEND_DOMAIN}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
ENV NEXT_PUBLIC_ENABLE_SERVICE_WORKER=${NEXT_PUBLIC_ENABLE_SERVICE_WORKER}
ENV INTLAYER_BACKEND_URL=${INTLAYER_BACKEND_URL}

# src/utils/agentSkills.ts imports `.agents/skills/*/SKILL.md` to publish
# /.well-known/agent-skills/, so the directory must be in the build.
COPY .agents .agents

COPY apps/website apps/website

# The COPY above restores the committed manifest, so re-apply the rewrite. The
# script is idempotent and leaves the already-installed node_modules alone.
RUN bun docker/scripts/prepareStandaloneWorkspace.ts \
      --workspace apps/website --tag "${INTLAYER_TAG}"

WORKDIR /workspace/apps/website

ENV NODE_ENV=production

RUN bun run --bun next build && bun scripts/generate-sw.ts && bun scripts/baidu-push.ts && bun run preserve

# @intlayer/docs is a serverExternalPackage whose entry reads markdown off the
# filesystem at request time. Next's file tracing follows requires, not runtime
# readFile calls, so the markdown would be missing from the standalone output.
# Copy the resolved package over its own traced location — computed rather than
# hardcoded, because bun may hoist it to either node_modules root.
RUN set -eux; \
    docs_dir="$(bun -e \
      "console.log(require('node:path').dirname(require.resolve('@intlayer/docs/package.json')))")"; \
    relative_dir="${docs_dir#/workspace/}"; \
    target_dir=".next/standalone/${relative_dir}"; \
    mkdir -p "${target_dir}"; \
    cp -RL "${docs_dir}/." "${target_dir}/"

# ---------------------------------------------------------------------------
# Stage 3 — runtime
# ---------------------------------------------------------------------------
FROM oven/bun:${BUN_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Turbopack SSR resolves module paths with a /ROOT/ prefix that maps to the
# standalone root. Symlinking /ROOT -> /app lets find-up locate package.json
# when searching up from the traced module paths.
RUN ln -s /app /ROOT

# Copy only the standalone output and necessary static files from builder.
# In a monorepo standalone build, static/public files live under apps/website/
# to match where server.js (running from __dirname) expects them.
COPY --from=builder --chown=appuser:appgroup /workspace/apps/website/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /workspace/apps/website/public ./apps/website/public
COPY --from=builder --chown=appuser:appgroup /workspace/apps/website/.next/static ./apps/website/.next/static

USER appuser

EXPOSE 3000

# Use bun (always present) to make the HTTP request — avoids BusyBox wget edge cases.
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:3000/api/health'); process.exit(r.ok ? 0 : 1)"

# Execute the standalone server
CMD ["bun", "apps/website/server.js"]
