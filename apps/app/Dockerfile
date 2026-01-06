# syntax=docker/dockerfile:1.20.0


# FROM oven/bun:1.3.2-alpine AS builder
# Use node because of bun issue blocking at `Creating an optimized production build ...`
# https://github.com/oven-sh/bun/issues/17136
# https://github.com/oven-sh/bun/issues/4795
FROM node:22-alpine AS builder

RUN npm install -g bun@1.3.5

RUN apk add --no-cache curl

ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_EDITOR_URL
ARG NEXT_PUBLIC_CMS_URL
ARG NEXT_PUBLIC_BACKEND_DOMAIN
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_GITHUB_URL
ARG NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
ARG INTLAYER_BACKEND_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID
ARG NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID
ARG NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID
ARG NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID

ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_EDITOR_URL=${NEXT_PUBLIC_EDITOR_URL}
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}
ENV NEXT_PUBLIC_BACKEND_DOMAIN=${NEXT_PUBLIC_BACKEND_DOMAIN}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_GITHUB_URL=${NEXT_PUBLIC_GITHUB_URL}
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=${NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
ENV INTLAYER_BACKEND_URL=${INTLAYER_BACKEND_URL}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID=${NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID}
ENV NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=${NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID}
ENV NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID=${NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID}
ENV NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=${NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID}

ENV CI=true

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=packages/@intlayer/mcp \
    --exclude=packages/@intlayer/doc \
    --exclude=packages/@intlayer/vue-compiler \
    --exclude=packages/@intlayer/svelte-compiler \
    --exclude=packages/intlayer-cli \
    --exclude=packages/react-scripts-intlayer \
    --exclude=packages/vue-intlayer \
    --exclude=packages/intlayer-editor \
    --exclude=packages/solid-intlayer \
    --exclude=packages/svelte-intlayer \
    --exclude=packages/preact-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/astro-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/express-intlayer \
    --exclude=apps/website \
    --exclude=plugins \
    --exclude=docs/assets \
    --exclude=examples \
    --exclude=plugins \
    --exclude=**/*.stories.* \
    . .


# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN bun install

# Build every package in the workspace (uses the root "build" script)
RUN bun x turbo run build:ci --filter=./apps/app

# Set working directory to the website package and build it
WORKDIR /workspace/apps/app

ENV NODE_ENV=production

# Build the Next.js website
RUN bun run --bun next build

# Create and use a non-root user for security
RUN addgroup -S app && adduser -S app -G app && chown -R app:app ./.next

USER app

# Expose the API port (defaults to 3000 via .env, can be overridden)
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD \
    curl -f http://localhost:3000/ || exit 1


# Start the app
CMD ["bun", "run", "--bun", "next", "start"] 