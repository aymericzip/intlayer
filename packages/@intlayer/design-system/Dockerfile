# syntax=docker/dockerfile:1.19.0

########################
# 1) Build stage
########################
FROM node:22-alpine AS builder

RUN npm install -g bun@1.3.2

WORKDIR /workspace

# Now copy the rest of the monorepo, excluding heavy/irrelevant folders
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

# Install only what's needed for the design-system package
RUN bun install --ignore-scripts --filter=./packages/@intlayer/design-system

# CLI you rely on
RUN bun add -g intlayer-cli@latest

# Build the filtered workspace (CI-safe)
RUN bun x turbo run build:ci --filter=./packages/@intlayer/design-system

# Build dictionaries then Storybook
WORKDIR /workspace/packages/@intlayer/design-system

# Build the intlayer package
RUN bun run build:intlayer

# Build Storybook
RUN bun run build:storybook

########################
# 2) Runtime
########################
FROM node:22-alpine

WORKDIR /www

RUN npm install -g serve

# Copy the built static site
COPY --from=builder /workspace/packages/@intlayer/design-system/storybook-static .

EXPOSE 6006

# -f foreground, -p port, -h doc root
CMD ["serve", ".", "-l", "6006"]
