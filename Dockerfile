############################
# 1️⃣ Builder stage        #
############################
FROM node:20-alpine AS builder

RUN npm install -g pnpm@10.12.1

# Create app directory
WORKDIR /workspace

# Copy the rest of the source code
COPY . .

# Install workspace dependencies (frozen for reproducible builds)
RUN pnpm install --frozen-lockfile --filter '!./examples/**'  --filter '!./apps/website/**'

# Remove all .ts and .tsx and .map files by ignoring node_modules
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.map" -not -path "*/node_modules/*" -delete 

# Build every package in the workspace (uses the root "build" script)
RUN pnpm run build
