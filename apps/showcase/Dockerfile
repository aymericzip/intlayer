# syntax=docker/dockerfile:1.28.0


FROM oven/bun:1.4.4-alpine AS builder


# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
# Remove directories to keep the image slim
COPY \
    --exclude=**/*.stories.* \
    --exclude=apps/app \
    --exclude=apps/backend \
    --exclude=apps/marketplace \
    --exclude=apps/vscode-extension \
    --exclude=apps/website \
    --exclude=compat \
    --exclude=docs/assets \
    --exclude=examples \
    --exclude=packages/@intlayer/chrome-extension \
    --exclude=packages/@intlayer/lsp \
    --exclude=packages/@intlayer/swc \
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
    --exclude=packages/nuxt-intlayer \
    --exclude=packages/preact-intlayer \
    --exclude=packages/react-native-intlayer \
    --exclude=packages/react-scripts-intlayer \
    --exclude=packages/remix-intlayer \
    --exclude=packages/solid-intlayer \
    --exclude=packages/svelte-intlayer \
    --exclude=packages/vanilla-intlayer \
    --exclude=packages/vue-intlayer \
    --exclude=plugins \
    . .

# Install all dependencies (dev + prod) (frozen for reproducible builds)
RUN bun install

# Build every package in the workspace (uses the root "build" script)
RUN bun x turbo run build:ci --filter=./apps/showcase

# Set working directory to the showcase package and build it
WORKDIR /workspace/apps/showcase

ENV NODE_ENV=production

# Build the showcase app
RUN bun run build


# Runner
FROM oven/bun:1.4.4-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy ONLY the built output from the builder stage
COPY --from=builder --chown=appuser:appgroup /workspace/apps/showcase/.output ./.output

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD bun -e "const r = await fetch('http://localhost:3000/'); process.exit(r.ok ? 0 : 1)" && \
      bun -e "const r = await fetch('http://localhost:3000/doc/environment/nextjs'); process.exit(r.ok ? 0 : 1)"

# Start the showcase server
CMD ["bun", "run", ".output/server/index.mjs"]