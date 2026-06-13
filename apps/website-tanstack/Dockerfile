# syntax=docker/dockerfile:1.23.0


# FROM oven/bun:1.3.2-alpine AS builder
# Use node because of bun issue blocking at `Creating an optimized production build ...`
# https://github.com/oven-sh/bun/issues/17136
# https://github.com/oven-sh/bun/issues/4795
FROM node:26-alpine AS builder

RUN npm install -g bun@1.3.14

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
ENV CI=true

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
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
    --exclude=apps/app \
    --exclude=apps/showcase \
    --exclude=apps/website \
    --exclude=docs/assets \
    --exclude=examples \
    --exclude=plugins \
    --exclude=compat \
    --exclude=**/*.stories.* \
    . .

# Install all dependencies (dev + prod)
RUN bun install

# Build workspace package dependencies (packages/* and docs) that this app depends on
RUN bun x turbo run build:ci --filter=./packages/** --filter=./docs

# Set working directory to the tanstack website package and build it
WORKDIR /workspace/apps/website-tanstack

ENV NODE_ENV=production

# Build the React Router website 
# (Note: postbuild script in package.json will auto-trigger generate-sw.ts)
RUN bun run build && bun scripts/baidu-push.ts 
# && bun run preserve ## preserve clean cloudflare cache

# ---------------------------------------------------------
# Runner Stage
# ---------------------------------------------------------
FROM node:26-alpine AS runner

RUN npm install -g bun@1.3.14

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Nitro bundles all JS dependencies — only the .output dir is needed.
# @intlayer/docs is an exception: docs.entry.mjs reads markdown files from the
# filesystem at runtime via existsSync/readFile, so the package must be present
# alongside the server bundle for those paths to resolve correctly.
COPY --from=builder --chown=appuser:appgroup /workspace/apps/website-tanstack/.output ./.output
COPY --from=builder --chown=appuser:appgroup /workspace/docs ./.output/server/node_modules/@intlayer/docs

USER appuser

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:3000/api/health'); process.exit(r.ok ? 0 : 1)"

CMD ["bun", "run", ".output/server/index.mjs"]