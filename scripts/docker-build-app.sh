#!/usr/bin/env bash
set -euo pipefail

# Usage: scripts/docker-build-website.sh [--env-file path] [extra docker args...]

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/apps/website/.env.development.local"

if [[ ${1:-} == "--env-file" ]]; then
  shift
  ENV_FILE="$1"
  shift || true
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Env file not found: $ENV_FILE" >&2
  echo "Create it or pass --env-file <path>" >&2
  exit 1
fi

# List of build args supported by apps/website/Dockerfile
SUPPORTED_KEYS=(
  NEXT_PUBLIC_DOMAIN
  NEXT_PUBLIC_URL
  NEXT_PUBLIC_EDITOR_URL
  NEXT_PUBLIC_CMS_URL
  NEXT_PUBLIC_BACKEND_DOMAIN
  NEXT_PUBLIC_BACKEND_URL
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
  INTLAYER_BACKEND_URL
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID
  NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID
  NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID
  NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID
)

set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a

BUILD_ARGS=()
PASSED_KEYS=()
for key in "${SUPPORTED_KEYS[@]}"; do
  eval "val=\"\${$key-}\""
  if [[ -n "$val" ]]; then
    # Rewrite localhost references so the build container can reach the host on macOS/Windows
    # and environments where localhost isn't reachable from within the build context.
    val="${val//localhost/host.docker.internal}"
    val="${val//127.0.0.1/host.docker.internal}"
    BUILD_ARGS+=(--build-arg "$key=$val")
    PASSED_KEYS+=("$key")
  fi
done

echo "Passing build args for keys: ${PASSED_KEYS[*]}" >/dev/stderr

docker build \
  --network=host \
  --progress=plain \
  -t intlayer-app \
  -f "${ROOT_DIR}/apps/app/Dockerfile" \
  "${BUILD_ARGS[@]}" \
  "$@" \
  "$ROOT_DIR"


