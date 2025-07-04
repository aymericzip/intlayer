FROM intlayer-build AS builder

# Create app directory
WORKDIR /workspace

RUN npm install -g pnpm@10.12.1

# Copy all content from
COPY . ./apps/backend

# Install workspace dependencies for the backend package only
RUN pnpm install --frozen-lockfile --filter "./apps/backend"

# Build the backend package
RUN pnpm --filter "@intlayer/backend" run build

# Remove all .ts and .tsx and .map files by ignoring node_modules
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.map" -not -path "*/node_modules/*" -delete 

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app


USER app

# Expose the API port (defaults to 3100 via .env, can be overridden)
EXPOSE 3100

CMD ["node", "dist/esm/index.mjs"] 