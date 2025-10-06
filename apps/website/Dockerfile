# syntax=docker/dockerfile:1.19.0

FROM node:24-alpine AS builder

RUN npm install -g pnpm@10.17.1

ARG INTLAYER_CLIENT_ID
ARG INTLAYER_CLIENT_SECRET
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_EDITOR_URL
ARG NEXT_PUBLIC_CMS_URL
ARG NEXT_PUBLIC_BACKEND_DOMAIN
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_GITHUB_URL
ARG ENABLE_SERVICE_WORKER
ARG NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
ARG INTLAYER_BACKEND_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID
ARG NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID
ARG NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID
ARG NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID
ARG NEXT_PUBLIC_PRODUCTHUNT_TOKEN

ENV INTLAYER_CLIENT_ID=${INTLAYER_CLIENT_ID}
ENV INTLAYER_CLIENT_SECRET=${INTLAYER_CLIENT_SECRET}
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_EDITOR_URL=${NEXT_PUBLIC_EDITOR_URL}
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}
ENV NEXT_PUBLIC_BACKEND_DOMAIN=${NEXT_PUBLIC_BACKEND_DOMAIN}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_GITHUB_URL=${NEXT_PUBLIC_GITHUB_URL}
ENV ENABLE_SERVICE_WORKER=${ENABLE_SERVICE_WORKER}
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=${NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
ENV INTLAYER_BACKEND_URL=${INTLAYER_BACKEND_URL}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID=${NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID}
ENV NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID=${NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID}
ENV NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID=${NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID}
ENV NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=${NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID}
ENV NEXT_PUBLIC_PRODUCTHUNT_TOKEN=${NEXT_PUBLIC_PRODUCTHUNT_TOKEN}
ENV CI=true

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
    --exclude=packages/pnext-intlayer \
    --exclude=packages/angular-intlayer \
    --exclude=packages/vite-intlayer \
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/astro-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/lynx-intlayer \
    --exclude=packages/intlayer-editor \
    --exclude=packages/@intlayer/design-system/*.stories.* \
    --exclude=docs/assets \
    --exclude=examples \
    --exclude=plugins \
    . .

# Installer toutes les dépendances (dev + prod) (frozen for reproducible builds)
RUN pnpm install --frozen-lockfile

# Build every package in the workspace (uses the root "build" script)
RUN npx turbo run build:ci --filter=./apps/website

# Set working directory to the website package and build it
WORKDIR /workspace/apps/website

ENV NODE_ENV=production

# Build the Next.js website
RUN pnpm run build

WORKDIR /workspace

# Remove .ts, .tsx and .map files only within src/** directories, ignoring node_modules, so configuration files like intlayer.config.ts are kept
RUN find . -path "*/src/*" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.map" \) -not -path "*/node_modules/*" -delete

# Remove all dev dependencies
# RUN CI=true pnpm prune --prod


WORKDIR /workspace/apps/website

# Create and use a non-root user for security
RUN addgroup -S app && adduser -S app -G app && chown -R app:app ./.next

USER app

# Expose the API port (defaults to 3100 via .env, can be overridden)
EXPOSE 3000

CMD ["pnpm", "start"] 