FROM intlayer-build AS builder

# Create app directory
WORKDIR /workspace

RUN npm install -g pnpm@10.12.1

# Copy all content from
COPY . ./apps/website

# Install workspace dependencies for the website package only
RUN pnpm install --frozen-lockfile --filter "./apps/website"

# Build the website package
RUN pnpm --filter "./apps/website" run build

# Remove all .ts and .tsx and .map files by ignoring node_modules
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.map" -not -path "*/node_modules/*" -delete 

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup -S app && adduser -S app -G app

# Set the working directory to the built website
WORKDIR /workspace/apps/website

# Ensure non-root user owns the application files
RUN chown -R app:app /workspace

USER app

# Expose the Next.js port (defaults to 3000)
EXPOSE 3000

CMD ["pnpm", "start"] 