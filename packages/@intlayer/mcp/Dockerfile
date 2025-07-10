# syntax=docker/dockerfile:1.7-labs

FROM node:24-alpine AS builder

RUN npm install -g pnpm@10.12.1

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=packages/@intlayer/babel \
    --exclude=packages/@intlayer/swc \
    --exclude=packages/@intlayer/webpack \
    --exclude=packages/@intlayer/editor \
    --exclude=packages/@intlayer/editor-react \
    --exclude=packages/intlayer-cli \
    --exclude=packages/next-intlayer \
    --exclude=packages/react-scripts-intlayer \
    --exclude=packages/react-intlayer \
    --exclude=packages/vue-intlayer \
    --exclude=packages/solid-intlayer \
    --exclude=packages/svelte-intlayer \
    --exclude=packages/preact-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/vite-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/@intlayer/design-system \
    --exclude=packages/intlayer-editor \
    --exclude=docs/assets \
    --exclude=examples \
    --exclude=apps/website \
    . .

# Installer toutes les dépendances (dev + prod) (frozen for reproducible builds)
RUN pnpm install --frozen-lockfile

# Build every package in the workspace (uses the root "build" script)
RUN pnpm run build

# Remove all dev dependencies
RUN pnpm prune --prod

# Remove .ts, .tsx and .map files only within src/** directories, ignoring node_modules, so configuration files like intlayer.config.ts are kept
RUN find . -path "*/src/*" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.map" \) -not -path "*/node_modules/*" -delete


ENV NODE_ENV=production

# Create and use a non-root user for security
RUN addgroup -S app && adduser -S app -G app

RUN chown -R app:app /workspace/packages/@intlayer/mcp

WORKDIR /workspace/packages/@intlayer/mcp

USER app

# Expose the API port (defaults to 3100 via .env, can be overridden)
EXPOSE 3100


CMD ["npm", "run", "start"] 