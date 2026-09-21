#!/bin/sh
# Intlayer installer — https://intlayer.org/install.sh
#
# Usage:
#   curl -fsSL https://intlayer.org/install.sh | sh
#   curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
#   curl -fsSL https://intlayer.org/install.sh | INTLAYER_MODE=desktop sh
#
# Also reachable from the CLI, which downloads and runs this very script:
#   npx intlayer init infra
#
# Three setups, chosen interactively when no mode is given:
#
#   desktop  Desktop app (Tauri) — installs the dashboard as a native app on
#            this machine. It stays connected to the Intlayer Cloud
#            (intlayer.org); nothing to host.
#   docker   All-in-one container — dashboard + API + MongoDB + Redis + MinIO
#            + Chromium in a single Docker container. Quick self-host trials.
#   compose  Docker Compose stack — one process per container (app, backend,
#            mongo, redis, minio). Production self-hosting, scalable, each
#            datastore replaceable by a managed offering.
#
# The self-host modes deliberately do not start anything: first-run setup
# needs a working mailer, so they end by telling you what to fill in and
# printing the command to run. Reference: https://intlayer.org/doc/self-hosting
set -eu

# ------------------------------------------------------------------ settings
MODE="${INTLAYER_MODE:-}"

# docker (all-in-one)
IMAGE="${INTLAYER_IMAGE:-ghcr.io/aymericzip/intlayer-selfhost:latest}"
NAME="${INTLAYER_CONTAINER_NAME:-intlayer}"
DATA_VOLUME="${INTLAYER_DATA_VOLUME:-intlayer-data}"
ENV_FILE="${INTLAYER_ENV_FILE:-./intlayer.env}"

APP_PORT="${INTLAYER_APP_PORT:-3000}"
API_PORT="${INTLAYER_API_PORT:-3100}"
S3_PORT="${INTLAYER_S3_PORT:-9000}"
CONSOLE_PORT="${INTLAYER_CONSOLE_PORT:-9001}"

# compose
COMPOSE_DIR="${INTLAYER_COMPOSE_DIR:-./intlayer}"
COMPOSE_REF="${INTLAYER_COMPOSE_REF:-main}"
COMPOSE_BASE_URL="${INTLAYER_COMPOSE_BASE_URL:-https://raw.githubusercontent.com/aymericzip/intlayer/${COMPOSE_REF}/docker/selfhost}"

# desktop
RELEASES_API="https://api.github.com/repos/aymericzip/intlayer/releases/latest"
RELEASES_PAGE="https://github.com/aymericzip/intlayer/releases/latest"
DOWNLOAD_DIR="${INTLAYER_DOWNLOAD_DIR:-${HOME}/Downloads}"

log()  { printf '\033[0;36m▸\033[0m %s\n' "$1"; }
warn() { printf '\033[0;33m!\033[0m %s\n' "$1" >&2; }
die()  { printf '\033[0;31m✗ %s\033[0m\n' "$1" >&2; exit 1; }

# Prompts read from the terminal rather than stdin: when the installer is piped
# from curl, stdin is the script itself.
has_tty() { ( : < /dev/tty ) 2>/dev/null; }

ask() {
  has_tty || return 1
  printf '\033[0;36m?\033[0m %s [y/N] ' "$1"
  read -r reply < /dev/tty || return 1
  case "$reply" in
    [yY] | [yY][eE][sS]) return 0 ;;
    *) return 1 ;;
  esac
}

# ------------------------------------------------------------------ arguments
while [ $# -gt 0 ]; do
  case "$1" in
    --mode) [ $# -ge 2 ] || die "--mode needs a value: desktop | docker | compose"; MODE="$2"; shift 2 ;;
    --mode=*) MODE="${1#--mode=}"; shift ;;
    desktop | docker | compose) MODE="$1"; shift ;;
    -h | --help)
      cat <<EOF
Usage: curl -fsSL https://intlayer.org/install.sh | sh -s -- [--mode <mode>]

Modes (asked interactively when omitted):
  desktop   Native desktop app, connected to the Intlayer Cloud
  docker    All-in-one self-host container (app + API + MongoDB + Redis + MinIO)
  compose   Docker Compose stack, one container per service

Docs: https://intlayer.org/doc/self-hosting
EOF
      exit 0
      ;;
    *) die "Unknown argument: $1 (expected --mode desktop | docker | compose)" ;;
  esac
done

# ------------------------------------------------------------ mode selection
choose_mode() {
  has_tty || die \
    "No terminal to prompt on. Pick a mode explicitly: curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker"

  cat > /dev/tty <<EOF

  How do you want to run Intlayer?

    1) Desktop app        Native app on this machine, connected to the
                          Intlayer Cloud (intlayer.org). Nothing to host.
    2) All-in-one Docker  Dashboard + API + MongoDB + Redis + MinIO in one
                          container. Quickest way to self-host.
    3) Docker Compose     One container per service. Scalable self-hosting,
                          each datastore replaceable by a managed one.

EOF
  while :; do
    printf '\033[0;36m?\033[0m Choice [1-3]: ' > /dev/tty
    read -r choice < /dev/tty || die "Aborted."
    case "$choice" in
      1) MODE=desktop; return ;;
      2) MODE=docker; return ;;
      3) MODE=compose; return ;;
      *) printf '  Please answer 1, 2 or 3.\n' > /dev/tty ;;
    esac
  done
}

[ -n "$MODE" ] || choose_mode

case "$MODE" in
  desktop | docker | compose) ;;
  *) die "Unknown mode '$MODE' (expected desktop | docker | compose)" ;;
esac

# ------------------------------------------------------------- prerequisites
# Docker is the only requirement of the self-host modes — every runtime
# dependency (Bun, MongoDB, Redis, MinIO, Chromium) ships inside the images.
install_docker() {
  case "$(uname -s)" in
    Linux)
      ask "Install Docker now using the official script (get.docker.com)?" || return 1
      log "Installing Docker — this needs root and may prompt for your password"
      curl -fsSL https://get.docker.com | sh
      ;;
    Darwin)
      command -v brew >/dev/null 2>&1 || return 1
      ask "Install Docker Desktop now with Homebrew?" || return 1
      log "Installing Docker Desktop via Homebrew"
      brew install --cask docker
      warn "Docker Desktop installed. Launch it once so the daemon starts, then re-run this installer."
      exit 0
      ;;
    *)
      return 1
      ;;
  esac
}

require_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    warn "Docker was not found on this machine."
    install_docker || die \
      "Docker is required. Install it and re-run this installer: https://docs.docker.com/get-docker/"
    command -v docker >/dev/null 2>&1 || die \
      "Docker is still not on PATH. Open a new shell and re-run this installer."
  fi

  docker info >/dev/null 2>&1 || die \
    "Docker is installed but the daemon is not running. Start Docker Desktop / the docker service and retry."

  log "Docker $(docker version --format '{{.Server.Version}}' 2>/dev/null || echo detected) is ready"
}

require_compose() {
  docker compose version >/dev/null 2>&1 || die \
    "Docker Compose v2 is required (the 'docker compose' plugin). See https://docs.docker.com/compose/install/"
}

# --------------------------------------------------------------- secrets
gen() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex "$1"
  else
    # Fallback without openssl: read /dev/urandom, keep hex chars only.
    LC_ALL=C tr -dc 'a-f0-9' < /dev/urandom | head -c "$(( $1 * 2 ))"
  fi
}

# ============================================================== desktop mode
# Downloads the latest desktop build from the GitHub release that
# .github/workflows/tauri-app-release.yaml publishes, picking the asset that
# matches this OS and CPU. The app talks to the Intlayer Cloud out of the box.
run_desktop() {
  os="$(uname -s)"
  arch="$(uname -m)"

  log "Looking up the latest desktop release"
  release_json="$(curl -fsSL "$RELEASES_API")" \
    || die "Could not reach the GitHub releases API. Download the app manually: ${RELEASES_PAGE}"
  assets="$(printf '%s\n' "$release_json" | grep '"browser_download_url"' | sed 's/.*"browser_download_url": *"\([^"]*\)".*/\1/')"

  case "$os" in
    Darwin)
      case "$arch" in
        arm64 | aarch64) pattern='_aarch64\.dmg$' ;;
        *) pattern='_x64\.dmg$' ;;
      esac
      ;;
    Linux)
      case "$arch" in
        x86_64 | amd64) ;;
        *) die "No Linux build is published for ${arch} yet. See ${RELEASES_PAGE}" ;;
      esac
      if command -v dpkg >/dev/null 2>&1; then
        pattern='_amd64\.deb$'
      elif command -v rpm >/dev/null 2>&1; then
        pattern='\.x86_64\.rpm$'
      else
        pattern='_amd64\.AppImage$'
      fi
      ;;
    *)
      die "The desktop installer supports macOS and Linux from this script. On Windows, download the .exe installer: ${RELEASES_PAGE}"
      ;;
  esac

  url="$(printf '%s\n' "$assets" | grep -E "$pattern" | head -n 1 || true)"
  [ -n "$url" ] || die "No ${os}/${arch} build in the latest release. See ${RELEASES_PAGE}"

  file="${DOWNLOAD_DIR}/$(basename "$url")"
  mkdir -p "$DOWNLOAD_DIR"
  log "Downloading $(basename "$url")"
  curl -fL --progress-bar "$url" -o "$file"

  case "$file" in
    *.dmg)
      log "Opening the disk image — drag Intlayer to Applications"
      open "$file"
      ;;
    *.deb)
      log "Installing with dpkg (needs sudo)"
      sudo dpkg -i "$file" || sudo apt-get install -f -y
      ;;
    *.rpm)
      log "Installing with rpm (needs sudo)"
      sudo rpm -Uvh "$file"
      ;;
    *.AppImage)
      chmod +x "$file"
      log "AppImage ready: $file"
      ;;
  esac

  cat <<EOF

  Intlayer desktop is installed. It signs in to the Intlayer Cloud
  (https://app.intlayer.org) — no server to run.

  To self-host instead, re-run this installer with --mode docker or
  --mode compose.

EOF
}

# =============================================================== docker mode
run_docker() {
  require_docker

  if [ -f "$ENV_FILE" ]; then
    log "Keeping the existing $ENV_FILE (delete it to regenerate)"
  else
    log "Writing $ENV_FILE"

    AUTH_SECRET="$(gen 32)"
    S3_SECRET="$(gen 16)"

    cat > "$ENV_FILE" <<ENV_EOF
# Intlayer self-hosting — environment file
#
# Generated by https://intlayer.org/install.sh
# Fill in every value marked TODO, then start the container with the command
# the installer printed. Reference: https://intlayer.org/doc/self-hosting
#
# Note: this file is read by \`docker run --env-file\`, which does not strip
# quotes and treats everything after \`=\` as the value. Write bare values, and
# keep comments on their own lines.

# --- Transactional email (required, pick ONE) --------------------------------
# First-run setup enforces email verification, so a mailer must work before you
# can sign in. Configure either Resend or an SMTP relay. When MAIL_SMTP_HOST is
# set, SMTP is used and RESEND_API_KEY is ignored.
#
# Option A — Resend (https://resend.com)
# TODO
RESEND_API_KEY=
#
# Option B — SMTP relay (uncomment and fill in)
# MAIL_SMTP_HOST=smtp.example.com
# MAIL_SMTP_PORT=587
# MAIL_SMTP_SECURE=false
# MAIL_SMTP_USER=
# MAIL_SMTP_PASSWORD=
#
# Sender for either option. Accepts a bare address or "Name <email>".
# MAIL_FROM=Intlayer <no-reply@example.com>

# --- Generated secrets -------------------------------------------------------
# Keep these. Rotating BETTER_AUTH_SECRET invalidates every session; rotating
# S3_SECRET_ACCESS_KEY orphans the objects already stored in MinIO.
BETTER_AUTH_SECRET=${AUTH_SECRET}
S3_SECRET_ACCESS_KEY=${S3_SECRET}

# --- Self-hosted mode --------------------------------------------------------
# Turns off cloud-only endpoints in the API: Stripe billing, subscriptions,
# affiliate and promo-code programs, and the reviewer marketplace.
SELF_HOSTED=true

# --- Optional: external MongoDB ----------------------------------------------
# The image runs its own MongoDB under /data/mongo. Point this at a managed
# cluster (Atlas, DocumentDB…) to use it instead of the bundled one.
# MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer

# --- Optional: AI features ---------------------------------------------------
# Enables AI-assisted translation and content audit.
# OPENAI_API_KEY=

# --- Optional: OAuth providers -----------------------------------------------
# GITHUB_CLIENT_ID=
# GITHUB_CLIENT_SECRET=
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# GITLAB_CLIENT_ID=
# GITLAB_CLIENT_SECRET=
# MICROSOFT_CLIENT_ID=
# MICROSOFT_CLIENT_SECRET=
ENV_EOF

    chmod 600 "$ENV_FILE" 2>/dev/null || true
  fi

  log "Pulling $IMAGE"
  docker pull "$IMAGE"

  cat <<EOF

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ${ENV_FILE}

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.

  2. Start Intlayer:

       docker run -d --name ${NAME} \\
         --restart unless-stopped \\
         -p ${APP_PORT}:3000 \\
         -p ${API_PORT}:3100 \\
         -p ${S3_PORT}:9000 \\
         -p ${CONSOLE_PORT}:9001 \\
         -v ${DATA_VOLUME}:/data \\
         --env-file ${ENV_FILE} \\
         ${IMAGE}

  Then open http://localhost:${APP_PORT} — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker logs -f ${NAME}
    Stop      docker rm -f ${NAME}
    Upgrade   re-run this installer, then recreate the container

EOF
}

# ============================================================== compose mode
# Downloads docker/selfhost/docker-compose.yml and its .env.template from the
# repository, fills the generated secrets into .env and pulls the images.
run_compose() {
  require_docker
  require_compose

  mkdir -p "$COMPOSE_DIR"
  log "Fetching docker-compose.yml into $COMPOSE_DIR"
  curl -fsSL "${COMPOSE_BASE_URL}/docker-compose.yml" -o "${COMPOSE_DIR}/docker-compose.yml"

  if [ -f "${COMPOSE_DIR}/.env" ]; then
    log "Keeping the existing ${COMPOSE_DIR}/.env (delete it to regenerate)"
  else
    log "Writing ${COMPOSE_DIR}/.env"
    curl -fsSL "${COMPOSE_BASE_URL}/.env.template" -o "${COMPOSE_DIR}/.env"

    AUTH_SECRET="$(gen 32)"
    S3_SECRET="$(gen 16)"
    # The template ships the secrets blank; fill them in place.
    sed -i.bak \
      -e "s|^BETTER_AUTH_SECRET=.*|BETTER_AUTH_SECRET=${AUTH_SECRET}|" \
      -e "s|^S3_SECRET_ACCESS_KEY=.*|S3_SECRET_ACCESS_KEY=${S3_SECRET}|" \
      "${COMPOSE_DIR}/.env"
    rm -f "${COMPOSE_DIR}/.env.bak"
    chmod 600 "${COMPOSE_DIR}/.env" 2>/dev/null || true
  fi

  log "Pulling images"
  ( cd "$COMPOSE_DIR" && docker compose pull )

  cat <<EOF

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ${COMPOSE_DIR}/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.

  2. Start the stack:

       cd ${COMPOSE_DIR} && docker compose up -d

  Then open http://localhost:${APP_PORT} — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d

EOF
}

case "$MODE" in
  desktop) run_desktop ;;
  docker)  run_docker ;;
  compose) run_compose ;;
esac
