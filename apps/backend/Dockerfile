# syntax=docker/dockerfile:1.20.0

FROM node:22-alpine AS builder

RUN npm install -g bun@1.3.3

RUN apk add --no-cache curl

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=packages/@intlayer/babel \
    --exclude=packages/@intlayer/vue-compiler \
    --exclude=packages/@intlayer/svelte-compiler \
    --exclude=packages/@intlayer/swc \
    --exclude=packages/@intlayer/webpack \
    --exclude=packages/@intlayer/editor \
    --exclude=packages/@intlayer/editor-react \
    --exclude=packages/@intlayer/mcp \
    --exclude=packages/intlayer-cli \
    --exclude=packages/next-intlayer \
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
    --exclude=packages/astro-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/@intlayer/design-system \
    --exclude=packages/intlayer-editor \
    --exclude=plugins \
    --exclude=docs/assets \
    --exclude=docs/blog \
    --exclude=docs/frequent_questions \
    --exclude=docs/legal \
    --exclude=examples \
    --exclude=apps/website \
    --exclude=**/*.stories.* \
    . .

COPY docs/docs/en/                 docs/docs/en/
COPY docs/blog/en/                 docs/blog/en/
COPY docs/frequent_questions/en/   docs/frequent_questions/en/
COPY docs/legal/en/                docs/legal/en/

# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN bun install --ignore-scripts --filter=./apps/backend

# Build every package in the workspace (uses the root "build" script)
RUN bun x turbo run build:ci --filter=./apps/backend

# Remove all dev dependencies
# RUN CI=true bun pm prune --production

# Remove .ts, .tsx and .map files only within src/** directories, ignoring node_modules, so configuration files like intlayer.config.ts are kept
RUN find . -path "*/src/*" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.map" \) -not -path "*/node_modules/*" -delete


ENV NODE_ENV=production

# Create and use a non-root user for security
RUN addgroup -S app && adduser -S app -G app

RUN chown -R app:app /workspace/apps/backend

WORKDIR /workspace/apps/backend

USER app

# Expose the API port
EXPOSE 3100

HEALTHCHECK --interval=120s --timeout=10s --start-period=120s --retries=3 \
  CMD \
    curl -f http://localhost:3100/ || exit 1


CMD ["node", "dist/esm/index.mjs"] 