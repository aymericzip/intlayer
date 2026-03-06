# syntax=docker/dockerfile:1.21.0

FROM node:22-alpine AS builder

RUN npm install -g bun@1.3.10

# System deps for wget (healthcheck) + headless Chromium (Puppeteer)
RUN apk add --no-cache \
  wget \
  chromium \
  nss \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  font-noto-emoji \
  udev

# Tell Puppeteer to use system Chromium instead of downloading its own
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_CACHE_DIR=/home/app/.cache/puppeteer
ENV TMPDIR=/workspace/apps/backend/tmp

# Create app directory
WORKDIR /workspace

# Copy the monorepo, excluding packages not needed by the backend
COPY \
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
    --exclude=packages/express-intlayer \
    --exclude=packages/hono-intlayer \
    --exclude=packages/adonis-intlayer \
    --exclude=plugins \
    --exclude=docs/assets \
    --exclude=docs/blog \
    --exclude=docs/frequent_questions \
    --exclude=docs/legal \
    --exclude=examples \
    --exclude=apps/website \
    --exclude=apps/showcase \
    --exclude=apps/app \
    --exclude=**/*.stories.* \
    . .

COPY docs/docs/en/                 docs/docs/en/
COPY docs/blog/en/                 docs/blog/en/
COPY docs/frequent_questions/en/   docs/frequent_questions/en/
COPY docs/legal/en/                docs/legal/en/

# Install all dependencies (dev + prod) for the backend filter
RUN bun install --ignore-scripts --filter=./apps/backend

# Build every package needed by the backend
RUN bun x turbo run build:ci --filter=./apps/backend

# Strip source files to keep the image slim
RUN find . -path "*/src/*" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.map" \) -not -path "*/node_modules/*" -delete

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S app && adduser -S app -G app

RUN mkdir -p /workspace/apps/backend/tmp /home/app/.cache/puppeteer && \
    chown -R app:app /workspace/apps/backend /home/app/.cache

WORKDIR /workspace/apps/backend

USER app

# Expose the API port
EXPOSE 3100

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:3100/ > /dev/null || exit 1

CMD ["bun", "dist/esm/index.mjs"]