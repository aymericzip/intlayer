# syntax=docker/dockerfile:1.7-labs

FROM node:24-alpine AS builder

RUN npm install -g pnpm@10.12.1

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=packages/@intlayer/babel \
    --exclude=packages/@intlayer/mcp \
    --exclude=packages/intlayer-cli \
    --exclude=packages/react-scripts-intlayer \
    --exclude=packages/vue-intlayer \
    --exclude=packages/solid-intlayer \
    --exclude=packages/svelte-intlayer \
    --exclude=packages/preact-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/vite-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/intlayer-editor \
    --exclude=docs/assets \
    --exclude=docs/tools \
    --exclude=examples \
    . .

# Installer toutes les dépendances (dev + prod) (frozen for reproducible builds)
RUN pnpm install --frozen-lockfile

# Build every package in the workspace (uses the root "build" script)
RUN pnpm run build

# Set working directory to the website package and build it
WORKDIR /workspace/apps/website

ENV NODE_ENV=production

RUN pnpm build


WORKDIR /workspace

# Remove all .ts and .tsx and .map files by ignoring node_modules
RUN find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.map" \) -not -path "*/node_modules/*" -delete 

# Remove all dev dependencies
RUN pnpm prune --prod


# Create and use a non-root user for security
RUN addgroup -S app && adduser -S app -G app && chown -R app:app /workspace/apps/website/.next

USER app

WORKDIR /workspace/apps/website

# Expose the API port (defaults to 3100 via .env, can be overridden)
EXPOSE 3100

CMD ["npm", "start"] 