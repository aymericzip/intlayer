# syntax=docker/dockerfile:1.23.0


# FROM oven/bun:1.3.2-alpine AS builder
# Use node because of bun issue blocking at `Creating an optimized production build ...`
# https://github.com/oven-sh/bun/issues/17136
# https://github.com/oven-sh/bun/issues/4795
FROM node:22-alpine AS builder

# RUN apk add --no-cache wget

RUN npm install -g bun@1.3.12

ARG INTLAYER_CLIENT_ID
ARG INTLAYER_CLIENT_SECRET
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_EDITOR_URL
ARG NEXT_PUBLIC_CMS_URL
ARG NEXT_PUBLIC_BACKEND_DOMAIN
ARG NEXT_PUBLIC_BACKEND_URL
ARG ENABLE_SERVICE_WORKER
ARG NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
ARG INTLAYER_BACKEND_URL

ARG NEXT_PUBLIC_PRODUCTHUNT_TOKEN
ARG NEXT_PUBLIC_SCANNER_API_URL

ENV INTLAYER_CLIENT_ID=${INTLAYER_CLIENT_ID}
ENV INTLAYER_CLIENT_SECRET=${INTLAYER_CLIENT_SECRET}
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_EDITOR_URL=${NEXT_PUBLIC_EDITOR_URL}
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}
ENV NEXT_PUBLIC_BACKEND_DOMAIN=${NEXT_PUBLIC_BACKEND_DOMAIN}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV ENABLE_SERVICE_WORKER=${ENABLE_SERVICE_WORKER}
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=${NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
ENV INTLAYER_BACKEND_URL=${INTLAYER_BACKEND_URL}
ENV NEXT_PUBLIC_PRODUCTHUNT_TOKEN=${NEXT_PUBLIC_PRODUCTHUNT_TOKEN}
ENV NEXT_PUBLIC_SCANNER_API_URL=${NEXT_PUBLIC_SCANNER_API_URL}
ENV CI=true

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=packages/@intlayer/mcp \
    --exclude=packages/@intlayer/vue-compiler \
    --exclude=packages/@intlayer/svelte-compiler \
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
    --exclude=apps/doc \
    --exclude=plugins \
    --exclude=docs/assets \
    --exclude=examples \
    --exclude=plugins \
    --exclude=**/*.stories.* \
    . .


# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN bun install

# Build every package in the workspace (uses the root "build" script)
RUN bun x turbo run build:ci --filter=./apps/website

# Set working directory to the website package and build it
WORKDIR /workspace/apps/website

ENV NODE_ENV=production

# Build the Next.js website
RUN bun run --bun next build && bun scripts/generate-sw.ts

# Runner
FROM node:22-alpine AS runner

RUN npm install -g bun@1.3.12 

RUN apk add --no-cache wget

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the standalone output and necessary static files from builder
COPY --from=builder --chown=appuser:appgroup /workspace/apps/website/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /workspace/apps/website/public ./public
COPY --from=builder --chown=appuser:appgroup /workspace/apps/website/.next/static ./.next/static

USER appuser

EXPOSE 3000

# Functional healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

# Execute the standalone server
CMD ["bun", "apps/website/server.js"]