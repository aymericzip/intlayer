# syntax=docker/dockerfile:1.7-labs

FROM node:24-alpine AS builder

RUN npm install -g pnpm@10.17.1

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=packages/@intlayer/mcp \
    --exclude=packages/@intlayer/webpack \
    --exclude=packages/@intlayer/swc \
    --exclude=packages/intlayer-cli \
    --exclude=packages/react-scripts-intlayer \
    --exclude=packages/vue-intlayer \
    --exclude=packages/solid-intlayer \
    --exclude=packages/svelte-intlayer \
    --exclude=packages/pnext-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/astro-intlayer \
    --exclude=packages/next-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/intlayer-editor \
    --exclude=docs/assets \
    --exclude=apps/website \
    --exclude=examples \
    . .

# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN pnpm install --frozen-lockfile

# Install intlayer-cli
RUN npm install -g intlayer-cli@latest

# Build every package in the workspace (uses the root "build" script)
RUN npx turbo run build:ci --filter=./packages/@intlayer/design-system

# Set working directory to the design-system package and run Storybook
WORKDIR /workspace/packages/@intlayer/design-system

# Build the Intlayer dictionaries
RUN pnpm run build:intlayer

# Build Storybook
RUN pnpm run build:storybook

ENV NODE_ENV=production

# Expose Storybook port
EXPOSE 6006

# Start Storybook in dev mode
CMD ["pnpm", "start"]