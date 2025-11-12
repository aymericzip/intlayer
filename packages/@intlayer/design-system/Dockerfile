# syntax=docker/dockerfile:1.19.0

FROM oven/bun:1.3.2-alpine AS builder

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
    --exclude=packages/next-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/preact-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/astro-intlayer \
    --exclude=packages/next-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/intlayer-editor \
    --exclude=docs/assets \
    --exclude=docs/docs \
    --exclude=docs/blog \
    --exclude=docs/frequent_questions \
    --exclude=docs/legal \
    --exclude=apps/website \
    --exclude=plugins \
    --exclude=examples \
    . .
    

# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN bun install --ignore-scripts --filter=./packages/@intlayer/design-system

# Install intlayer-cli
RUN bun add -g intlayer-cli@latest

# Build every package in the workspace (uses the root "build" script)
RUN bun x turbo run build:ci --filter=./packages/@intlayer/design-system

# Set working directory to the design-system package and run Storybook
WORKDIR /workspace/packages/@intlayer/design-system

# Build the Intlayer dictionaries
RUN bun run build:intlayer

# Build Storybook
# RUN bun run build:storybook

ENV NODE_ENV=production

# Expose Storybook port
EXPOSE 6006

# Start Storybook in dev mode
CMD ["bun", "start"]