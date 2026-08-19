#\!/bin/sh
# Intlayer self-host installer — https://intlayer.org/install.sh
#
# Usage:
#   curl -fsSL https://intlayer.org/install.sh | sh
#
# Stands up a complete, offline-capable Intlayer instance from the all-in-one
# image (dashboard + API + MongoDB + Redis + MinIO). Re-running upgrades in place.
set -eu

# ------------------------------------------------------------------ settings
IMAGE="${INTLAYER_IMAGE:-ghcr.io/aymericzip/intlayer-selfhost:latest}"
NAME="${INTLAYER_CONTAINER_NAME:-intlayer}"
DATA_VOLUME="${INTLAYER_DATA_VOLUME:-intlayer-data}"
ENV_FILE="${INTLAYER_ENV_FILE:-./intlayer.env}"

APP_PORT="${INTLAYER_APP_PORT:-3000}"
API_PORT="${INTLAYER_API_PORT:-3100}"
S3_PORT="${INTLAYER_S3_PORT:-9000}"
CONSOLE_PORT="${INTLAYER_CONSOLE_PORT:-9001}"

log()  { printf '\033[0;36m▸\033[0m %s\n' "$1"; }
warn() { printf '\033[0;33m\!\033[0m %s\n' "$1" >&2; }
die()  { printf '\033[0;31m✗ %s\033[0m\n' "$1" >&2; exit 1; }

# ------------------------------------------------------------- preconditions
command -v docker >/dev/null 2>&1 || die \
  "Docker is required. Install Docker Desktop: https://docs.docker.com/get-docker/"

docker info >/dev/null 2>&1 || die \
  "Docker is installed but not running. Start Docker Desktop / the docker daemon and retry."

# ----------------------------------------------------- secrets (generated once)
gen() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex "$1"
  else
    # Fallback without openssl: read /dev/urandom, keep hex chars only.
    LC_ALL=C tr -dc 'a-f0-9' < /dev/urandom | head -c "$(( $1 * 2 ))"
  fi
}

if [ -f "$ENV_FILE" ]; then
  log "Reusing existing secrets from $ENV_FILE"
else
  log "Generating secrets into $ENV_FILE"
  {
    echo "BETTER_AUTH_SECRET=$(gen 32)"
    echo "S3_SECRET_ACCESS_KEY=$(gen 16)"
  } > "$ENV_FILE"
  chmod 600 "$ENV_FILE" 2>/dev/null || true
fi

# ------------------------------------------------------------- pull & (re)run
log "Pulling $IMAGE"
docker pull "$IMAGE"

if docker ps -a --format '{{.Names}}' | grep -qx "$NAME"; then
  log "Removing previous container (upgrade)"
  docker rm -f "$NAME" >/dev/null 2>&1 || true
fi

log "Starting Intlayer"
docker run -d --name "$NAME" \
  --restart unless-stopped \
  -p "${APP_PORT}:3000" \
  -p "${API_PORT}:3100" \
  -p "${S3_PORT}:9000" \
  -p "${CONSOLE_PORT}:9001" \
  -v "${DATA_VOLUME}:/data" \
  --env-file "$ENV_FILE" \
  "$IMAGE" >/dev/null

# ------------------------------------------------------------------- summary
cat <<EOF

  Intlayer is starting up (first boot initialises the datastores — give it a minute).

    Dashboard   http://localhost:${APP_PORT}
    API         http://localhost:${API_PORT}
    MinIO       http://localhost:${CONSOLE_PORT}

  Secrets saved to ${ENV_FILE} (keep this file — it holds your auth secret).
  Logs      docker logs -f ${NAME}
  Stop      docker rm -f ${NAME}
  Upgrade   re-run this installer

EOF
