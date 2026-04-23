# syntax=docker/dockerfile:1.23.0

# FROM oven/bun:1.3.2-alpine AS builder
# Use node because of bun issue blocking at `Creating an optimized production build ...`
# https://github.com/oven-sh/bun/issues/17136
# https://github.com/oven-sh/bun/issues/4795
FROM node:22-alpine AS builder

# RUN apk add --no-cache wget

RUN npm install -g bun@1.3.13


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
    --exclude=apps/showcase \
    --exclude=plugins \
    --exclude=docs/assets \
    --exclude=examples \
    --exclude=**/*.stories.* \
    . .

# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN bun install

# Build every package in the workspace (uses the root "build" script)
RUN bun x turbo run build:ci --filter=./apps/doc

# Set working directory to the doc package and build it
WORKDIR /workspace/apps/doc

ENV NODE_ENV=production

# Build the doc app
RUN bun run build && bun scripts/generate-sw.ts

# @intlayer/docs reads legal markdown files from the filesystem at runtime.
# Nitro resolves baseDir to .output/server/ via the package.json it generates
# there, so the files must live at .output/server/legal/{locale}/*.md
RUN cp -r /workspace/docs/docs /workspace/docs/legal /workspace/docs/blog /workspace/docs/frequent_questions /workspace/apps/doc/.output/server/

# Runner — use official bun image (same as apps/app which works correctly)
FROM oven/bun:1.3.13-alpine AS runner

RUN apk add --no-cache wget

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder --chown=app:app /workspace/apps/doc/.output ./.output

USER app

EXPOSE 3000

# Use 127.0.0.1 to avoid IPv6/IPv4 mismatch on Alpine (localhost may resolve to ::1)
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:3000/ > /dev/null || exit 1

CMD ["bun", "run", ".output/server/index.mjs"]
