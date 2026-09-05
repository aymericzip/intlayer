# syntax=docker/dockerfile:1.26.0

# Builder stage
FROM node:26-alpine AS builder

RUN npm install -g bun@1.4.1

# Put the repo in /workspace
WORKDIR /workspace

COPY \
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
  --exclude=compat \
  --exclude=plugins \
  --exclude=examples \
  --exclude=apps/app \
  --exclude=apps/showcase \
  --exclude=apps/website \
  --exclude=docs/assets \
  --exclude=docs/docs \
  --exclude=docs/blog \
  --exclude=docs/frequent_questions \
  --exclude=docs/legal \
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

# Runner — plain node + serve; no bun needed for static file serving
FROM node:26-alpine AS runner

RUN npm install -g bun@1.4.1

RUN npm install -g serve

WORKDIR /www

# Copy the built static site
COPY --from=builder /workspace/packages/@intlayer/design-system/storybook-static .

# Drop root privileges — node user ships with the base image
RUN chown -R node:node /www
USER node

EXPOSE 6006

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:6006/'); process.exit(r.ok ? 0 : 1)"

# -f foreground, -p port, -h doc root
CMD ["bun", "x", "serve", ".", "-l", "6006"]
