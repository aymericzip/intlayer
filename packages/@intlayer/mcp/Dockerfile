# syntax=docker/dockerfile:1.23.0

# FROM oven/bun:1.3.2-alpine AS builder
# Use node because of bun issue blocking at `Creating an optimized production build ...`
# https://github.com/oven-sh/bun/issues/17136
# https://github.com/oven-sh/bun/issues/4795
FROM node:22-alpine AS builder

RUN npm install -g bun@1.3.12

WORKDIR /workspace

COPY \
    --exclude=packages/@intlayer/vue-compiler \
    --exclude=packages/@intlayer/svelte-compiler \
    --exclude=packages/@intlayer/webpack \
    --exclude=packages/@intlayer/editor \
    --exclude=packages/@intlayer/editor-react \
    --exclude=packages/intlayer-cli \
    --exclude=packages/next-intlayer \
    --exclude=packages/astro-intlayer \
    --exclude=packages/react-scripts-intlayer \
    --exclude=packages/react-intlayer \
    --exclude=packages/vue-intlayer \
    --exclude=packages/solid-intlayer \
    --exclude=packages/svelte-intlayer \
    --exclude=packages/next-intlayer \
    --exclude=packages/preact-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/vite-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/lit-intlayer \
    --exclude=packages/vanilla-intlayer \
    --exclude=packages/@intlayer/design-system \
    --exclude=packages/intlayer-editor \
    --exclude=packages/express-intlayer \
    --exclude=packages/hono-intlayer \
    --exclude=packages/adonis-intlayer \
    --exclude=docs/assets \
    --exclude=docs/blog \
    --exclude=docs/frequent_questions \
    --exclude=docs/legal \
    --exclude=examples \
    --exclude=plugins \
    --exclude=apps/website \
    --exclude=apps/showcase \
    --exclude=apps/app \
    --exclude=apps/doc \
    --exclude=**/*.stories.* \
    . .

COPY docs/docs/en/                 docs/docs/en/
COPY docs/blog/en/                 docs/blog/en/
COPY docs/frequent_questions/en/   docs/frequent_questions/en/
COPY docs/legal/en/                docs/legal/en/
    

# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN bun install

# Build every package in the workspace (uses the root "build" script)
RUN bun x turbo run build:ci --filter=./packages/@intlayer/mcp

# Strip source files to reduce image size
RUN find . -path "*/src/*" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.map" \) -not -path "*/node_modules/*" -delete

# Runner — use oven/bun base image to avoid npm install overhead
FROM oven/bun:1.3.12-alpine AS runner

RUN apk add --no-cache wget

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

# Copy workspace structure from builder to preserve monorepo node_modules symlinks
COPY --from=builder --chown=app:app /workspace/node_modules /workspace/node_modules
COPY --from=builder --chown=app:app /workspace/packages/@intlayer /workspace/packages/@intlayer

WORKDIR /workspace/packages/@intlayer/mcp

USER app

# Expose the API port 
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:3000/health > /dev/null || exit 1

CMD ["bun", "run", "start:sse"]
# Option 2: Use stdio transport (alternative)
# CMD ["bun", "run", "start:stdio"]