# syntax=docker/dockerfile:1.23.0

# FROM oven/bun:1.3.2-alpine AS builder
# Use node because of bun issue blocking at `Creating an optimized production build ...`
# https://github.com/oven-sh/bun/issues/17136
# https://github.com/oven-sh/bun/issues/4795
FROM node:26-alpine AS builder

RUN npm install -g bun@1.3.14

RUN apk add --no-cache build-base zlib-dev autoconf automake

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=packages/@intlayer/doc \
    --exclude=packages/@intlayer/vue-compiler \
    --exclude=packages/@intlayer/svelte-compiler \
    --exclude=packages/@intlayer/swc \
    --exclude=packages/@intlayer/lsp \
    --exclude=packages/@intlayer/chrome-extension \
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

# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN bun install

# Build every package in the workspace (uses the root "build" script)
RUN bun x turbo run build:ci --filter=./apps/app

# Set working directory to the app package and build it
WORKDIR /workspace/apps/app

ENV NODE_ENV=production

# Build the app
RUN bun run build && bun scripts/generate-sw.ts && bun run preserve

# Runner — use oven/bun base image to avoid npm install overhead
FROM oven/bun:1.3.14-alpine AS runner

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
