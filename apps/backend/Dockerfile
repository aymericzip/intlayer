FROM intlayer-build AS builder

# Create app directory
WORKDIR /workspace

RUN npm install -g pnpm@10.12.1

# Copy all content from
COPY . ./apps/backend

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup -S app && adduser -S app -G app

RUN chown -R app:app /workspace/apps/backend

WORKDIR /workspace/apps/backend


USER app

# Expose the API port (defaults to 3100 via .env, can be overridden)
EXPOSE 3100

CMD ["node", "dist/esm/index.mjs"] 