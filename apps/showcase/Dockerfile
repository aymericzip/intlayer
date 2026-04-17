# syntax=docker/dockerfile:1.23.0


# FROM oven/bun:1.3.2-alpine AS builder
# Use node because of bun issue blocking at `Creating an optimized production build ...`
# https://github.com/oven-sh/bun/issues/17136
# https://github.com/oven-sh/bun/issues/4795
FROM node:22-alpine AS builder

# RUN apk add --no-cache wget

RUN npm install -g bun@1.3.12


# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=packages/@intlayer/mcp \
    --exclude=packages/@intlayer/doc \
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
    --exclude=apps/website \
        --exclude=apps/app \
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
RUN bun x turbo run build:ci --filter=./apps/showcase

# Set working directory to the showcase package and build it
WORKDIR /workspace/apps/showcase

ENV NODE_ENV=production

# Build the showcase app
RUN bun run build


# Runner
FROM node:22-alpine AS runner

RUN npm install -g bun@1.3.12 

RUN apk add --no-cache wget

WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy ONLY the built output from the builder stage
COPY --from=builder --chown=appuser:appgroup /workspace/apps/showcase/.output ./.output

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD \
    wget -qO- http://localhost:3000/ > /dev/null || exit 1 && \
    wget -qO- http://localhost:3000/doc/environment/nextjs > /dev/null || exit 1


# Start the showcase server
CMD ["bun", "run", ".output/server/index.mjs"]