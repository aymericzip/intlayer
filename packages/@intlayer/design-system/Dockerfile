# syntax=docker/dockerfile:1.28.0

# Builder stage
FROM oven/bun:1.4.4-alpine AS builder

# Put the repo in /workspace
WORKDIR /workspace

COPY \
  --exclude=apps \
  --exclude=compat \
  --exclude=docs/assets \
  --exclude=docs/blog \
  --exclude=docs/docs \
  --exclude=docs/frequent_questions \
  --exclude=docs/legal \
  --exclude=examples \
  --exclude=packages/@intlayer/chrome-extension \
  --exclude=packages/@intlayer/lsp \
  --exclude=packages/@intlayer/swc \
  --exclude=packages/@intlayer/webpack \
  --exclude=packages/adonis-intlayer \
  --exclude=packages/angular-intlayer \
  --exclude=packages/astro-intlayer \
  --exclude=packages/elysia-intlayer \
  --exclude=packages/eslint-plugin-intlayer \
  --exclude=packages/express-intlayer \
  --exclude=packages/hono-intlayer \
  --exclude=packages/intlayer-cli \
  --exclude=packages/intlayer-editor \
  --exclude=packages/lit-intlayer \
  --exclude=packages/lynx-intlayer \
  --exclude=packages/next-intlayer \
  --exclude=packages/nuxt-intlayer \
  --exclude=packages/preact-intlayer \
  --exclude=packages/react-native-intlayer \
  --exclude=packages/react-scripts-intlayer \
  --exclude=packages/solid-intlayer \
  --exclude=packages/svelte-intlayer \
  --exclude=packages/vanilla-intlayer \
  --exclude=packages/vue-intlayer \
  --exclude=plugins \
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

ENV STORYBOOK_TELEMETRY=false
ENV STORYBOOK_STATIC=true
RUN bun x storybook build --disable-telemetry

# Runner — static file serving with `serve`
FROM oven/bun:1.4.4-alpine AS runner

WORKDIR /www

# Install `serve` locally so startup needs no network fetch
RUN bun add serve@14

# Copy the built static site
COPY --from=builder --chown=bun:bun /workspace/packages/@intlayer/design-system/storybook-static ./public

# Drop root privileges — bun user ships with the base image
USER bun

EXPOSE 6006

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:6006/'); process.exit(r.ok ? 0 : 1)"

# --bun: the image has no node binary, run serve on the bun runtime
CMD ["bun", "x", "--bun", "serve", "public", "-l", "6006"]
