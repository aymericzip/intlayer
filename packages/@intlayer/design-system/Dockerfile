# syntax=docker/dockerfile:1.20.0

########################
# 1) Build stage
########################
FROM node:22-alpine AS builder

RUN npm install -g bun@1.3.3

RUN apk add --no-cache nodejs npm

# Put the repo in /workspace
WORKDIR /workspace

# Now copy the rest of the monorepo, excluding heavy/irrelevant folders
COPY \
  --exclude=packages/@intlayer/mcp \
  --exclude=packages/@intlayer/ai \
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
  --exclude=plugins \
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
RUN bun install

# CLI you rely on
RUN bun add -g intlayer-cli@latest

# Build the filtered workspace (CI-safe)
RUN bun x turbo run build:ci --filter=./packages/@intlayer/design-system

# Build dictionaries then Storybook
WORKDIR /workspace/packages/@intlayer/design-system

# Build the intlayer dictionaries (optional if turbo already did what you need)
RUN bun x intlayer build

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD \
    curl -f http://localhost:6006/ || exit 1



# Build Storybook to a deterministic path to simplify the copy in the next stage
ENV STORYBOOK_TELEMETRY=false
ENV STORYBOOK_STATIC=true
RUN bun x storybook build --disable-telemetry

########################
# 2) Runtime
########################
FROM node:22-alpine

RUN npm install -g bun@1.3.3
RUN apk add --no-cache curl

WORKDIR /www


# Copy the built static site
COPY --from=builder /workspace/packages/@intlayer/design-system/storybook-static .

EXPOSE 6006

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD \
    curl -f http://localhost:6006/ || exit 1

# -f foreground, -p port, -h doc root
CMD ["bun", "x", "serve", ".", "-l", "6006"]
