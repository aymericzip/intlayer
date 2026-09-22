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
# Windows users get the same flow from install.ps1:
#   irm https://intlayer.org/install.ps1 | iex
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
# The self-host modes write the environment file through a short wizard
# (domain, mailer, optional integrations) but deliberately do not start
# anything: they end by printing the command to run, so the file can still be
# reviewed first. Reference: https://intlayer.org/doc/self-hosting
set -eu

# ------------------------------------------------------------------ settings
MODE="${INTLAYER_MODE:-}"

# Where docker-compose.yml and .env.template are fetched from (docker/selfhost
# in the repository). Override to test a branch or a local checkout (file://).
SELFHOST_REF="${INTLAYER_SELFHOST_REF:-main}"
SELFHOST_BASE_URL="${INTLAYER_SELFHOST_BASE_URL:-https://raw.githubusercontent.com/aymericzip/intlayer/${SELFHOST_REF}/docker/selfhost}"

# docker (all-in-one)
IMAGE="${INTLAYER_IMAGE:-intlayer/cms-all:latest}"
NAME="${INTLAYER_CONTAINER_NAME:-intlayer}"
DATA_VOLUME="${INTLAYER_DATA_VOLUME:-intlayer-data}"
ENV_FILE="${INTLAYER_ENV_FILE:-./intlayer.env}"

APP_PORT="${INTLAYER_APP_PORT:-3000}"
API_PORT="${INTLAYER_API_PORT:-3100}"
S3_PORT="${INTLAYER_S3_PORT:-9000}"
CONSOLE_PORT="${INTLAYER_CONSOLE_PORT:-9001}"

# compose
COMPOSE_DIR="${INTLAYER_COMPOSE_DIR:-./intlayer}"

# A custom domain needs the dashboard rebuilt with its URLs compiled in. Docker
# can build straight from the repository, no checkout needed.
REPOSITORY_BUILD_CONTEXT="${INTLAYER_BUILD_CONTEXT:-https://github.com/aymericzip/intlayer.git#${SELFHOST_REF}}"
CUSTOM_IMAGE="${INTLAYER_CUSTOM_IMAGE:-intlayer/cms-all:custom}"

# Filled in by the wizard (configure_env_file). Empty means localhost.
PUBLIC_DOMAIN=""
PUBLIC_APP_URL=""
PUBLIC_BACKEND_URL=""
PUBLIC_S3_URL=""
MAILER_CONFIGURED=0
# Compose expands `$VAR` inside .env values (`$$` is a literal `$`);
# `docker run --env-file` does not. Set per mode before writing the file.
ESCAPE_DOLLAR=0

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

# Prints the answer to a free-text question, or the suggestion ($2) when the
# user just presses Enter.
prompt() {
  if [ -n "${2:-}" ]; then
    printf '\033[0;36m?\033[0m %s [%s]: ' "$1" "$2" > /dev/tty
  else
    printf '\033[0;36m?\033[0m %s: ' "$1" > /dev/tty
  fi
  read -r answer < /dev/tty || answer=""
  printf '%s' "${answer:-${2:-}}"
}

# Same as prompt, with the input hidden (API keys, passwords).
prompt_secret() {
  printf '\033[0;36m?\033[0m %s: ' "$1" > /dev/tty
  stty -echo < /dev/tty 2>/dev/null || true
  read -r answer < /dev/tty || answer=""
  stty echo < /dev/tty 2>/dev/null || true
  printf '\n' > /dev/tty
  printf '%s' "$answer"
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

# ------------------------------------------------------------ env file
gen() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex "$1"
  else
    # Fallback without openssl: read /dev/urandom, keep hex chars only.
    LC_ALL=C tr -dc 'a-f0-9' < /dev/urandom | head -c "$(( $1 * 2 ))"
  fi
}

# Sets KEY=value in an env file: replaces the first `KEY=` line, commented out
# or not (the template ships optional keys as `# KEY=example`), or appends it.
# The value goes through the environment, so it is written verbatim.
set_env() {
  value="$3"
  [ "$ESCAPE_DOLLAR" -eq 0 ] || value="$(printf '%s' "$value" | sed 's/\$/$$/g')"
  env_key="$2" env_value="$value" awk '
    BEGIN { pattern = "^#? ?" ENVIRON["env_key"] "=" }
    !done && $0 ~ pattern { print ENVIRON["env_key"] "=" ENVIRON["env_value"]; done = 1; next }
    { print }
    END { if (!done) print ENVIRON["env_key"] "=" ENVIRON["env_value"] }
  ' "$1" > "$1.tmp" && mv "$1.tmp" "$1"
}

# "https://s3.example.org/intlayer" → "https://s3.example.org"
url_origin() {
  case "$1" in
    *://*) printf '%s://' "${1%%://*}"; rest="${1#*://}"; printf '%s' "${rest%%/*}" ;;
    *) printf '%s' "${1%%/*}" ;;
  esac
}

# Reduces "https://www.example.org/" to "example.org". Prints nothing for
# localhost, which is the template default.
normalize_domain() {
  domain="$1"
  domain="${domain#http://}"
  domain="${domain#https://}"
  domain="${domain%%/*}"
  domain="${domain#www.}"
  domain="$(printf '%s' "$domain" | tr '[:upper:]' '[:lower:]')"
  case "$domain" in
    "" | localhost | 127.0.0.1) ;;
    *) printf '%s' "$domain" ;;
  esac
}

# Asks for the domain, the mailer and the optional integrations, and writes the
# answers into the env file. Every answer can be changed in the file afterwards.
configure_env_file() {
  target="$1"

  cat > /dev/tty <<EOF

  Let's fill in $(basename "$target"). Press Enter to accept a suggestion;
  every value can be changed later in the file.

EOF

  # --- Domain: the dashboard, the API and the object storage each get a host.
  PUBLIC_DOMAIN="$(normalize_domain "$(prompt 'Domain Intlayer will be served on (empty = localhost only)')")"

  if [ -n "$PUBLIC_DOMAIN" ]; then
    PUBLIC_APP_URL="$(prompt 'Dashboard URL' "https://cms.${PUBLIC_DOMAIN}")"
    PUBLIC_BACKEND_URL="$(prompt 'API URL' "https://back.${PUBLIC_DOMAIN}")"
    PUBLIC_S3_URL="$(prompt 'Object storage public URL (browser-facing MinIO)' "https://s3.${PUBLIC_DOMAIN}/intlayer")"

    set_env "$target" DOMAIN "$PUBLIC_DOMAIN"
    set_env "$target" APP_URL "$PUBLIC_APP_URL"
    set_env "$target" BACKEND_URL "$PUBLIC_BACKEND_URL"
    set_env "$target" S3_PUBLIC_URL "$PUBLIC_S3_URL"
  fi

  # --- Mailer: first-run setup verifies the first account by email.
  cat > /dev/tty <<EOF

  How should Intlayer send emails? The first account cannot be verified
  without a working mailer.

    1) Resend            API key from resend.com
    2) SMTP relay        Your own SMTP server
    3) Later             Fill in the file by hand before starting

EOF
  mail_from_suggestion="Intlayer <no-reply@${PUBLIC_DOMAIN:-example.com}>"
  while :; do
    case "$(prompt 'Choice [1-3]')" in
      1)
        set_env "$target" RESEND_API_KEY "$(prompt_secret 'Resend API key')"
        set_env "$target" MAIL_FROM "$(prompt 'Sender address' "$mail_from_suggestion")"
        MAILER_CONFIGURED=1
        break
        ;;
      2)
        set_env "$target" MAIL_SMTP_HOST "$(prompt 'SMTP host')"
        smtp_port="$(prompt 'SMTP port' 587)"
        set_env "$target" MAIL_SMTP_PORT "$smtp_port"
        # Port 465 is implicit TLS; 587 / 25 upgrade with STARTTLS.
        case "$smtp_port" in
          465) set_env "$target" MAIL_SMTP_SECURE true ;;
          *) set_env "$target" MAIL_SMTP_SECURE false ;;
        esac
        set_env "$target" MAIL_SMTP_USER "$(prompt 'SMTP user (empty for an unauthenticated relay)')"
        set_env "$target" MAIL_SMTP_PASSWORD "$(prompt_secret 'SMTP password')"
        set_env "$target" MAIL_FROM "$(prompt 'Sender address' "$mail_from_suggestion")"
        MAILER_CONFIGURED=1
        break
        ;;
      3) break ;;
      *) printf '  Please answer 1, 2 or 3.\n' > /dev/tty ;;
    esac
  done

  # --- Optional integrations: blank leaves the feature disabled.
  openai_key="$(prompt_secret 'OpenAI API key, enables AI translation (empty = skip)')"
  [ -z "$openai_key" ] || set_env "$target" OPENAI_API_KEY "$openai_key"
}

# Writes the environment file from the repository template with the secrets
# generated, then runs the wizard when a terminal is available. An existing
# file is never touched, so re-running is an upgrade.
write_env_file() {
  target="$1"

  if [ -f "$target" ]; then
    log "Keeping the existing $target (delete it to regenerate)"
    return
  fi

  log "Writing $target"
  curl -fsSL "${SELFHOST_BASE_URL}/.env.template" -o "$target"

  # The template ships the secrets blank; fill them in place.
  set_env "$target" BETTER_AUTH_SECRET "$(gen 32)"
  set_env "$target" S3_SECRET_ACCESS_KEY "$(gen 16)"
  chmod 600 "$target" 2>/dev/null || true

  if has_tty; then
    configure_env_file "$target"
  else
    warn "No terminal: skipping the setup questions. Edit $target by hand."
  fi
}

print_mailer_reminder() {
  cat <<EOF
     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
EOF
}

# The published dashboard image has http://localhost:3000 compiled in, so a
# custom domain needs an image built with its URLs. Docker builds it straight
# from the repository.
print_custom_domain_notice() {
  cat <<EOF
  Your domain is ${PUBLIC_DOMAIN}. Two things follow from that:

  - The published dashboard image only works on localhost; the command below
    builds one with your URLs compiled in (takes a while, no checkout needed).
  - Route the hosts to the container through your reverse proxy (with TLS):

       ${PUBLIC_APP_URL}  →  port ${APP_PORT}
       ${PUBLIC_BACKEND_URL}  →  port ${API_PORT}
       $(url_origin "$PUBLIC_S3_URL")  →  port ${S3_PORT}

EOF
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

  # The desktop app embeds the dashboard's Node server and starts it with the
  # machine's own `node` binary.
  command -v node >/dev/null 2>&1 || warn \
    "Node.js was not found. The desktop app needs it to start: https://nodejs.org"

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
  write_env_file "$ENV_FILE"

  if [ -n "$PUBLIC_DOMAIN" ]; then
    IMAGE="$CUSTOM_IMAGE"
  else
    log "Pulling $IMAGE"
    docker pull "$IMAGE"
  fi

  step=1
  printf '\n  Everything is installed.\n\n'

  if [ -n "$PUBLIC_DOMAIN" ]; then
    print_custom_domain_notice
    cat <<EOF
  ${step}. Build the image for ${PUBLIC_DOMAIN}:

       docker build -f docker/selfhost/Dockerfile \\
         --build-arg VITE_DOMAIN=${PUBLIC_DOMAIN} \\
         --build-arg VITE_SITE_URL=${PUBLIC_APP_URL} \\
         --build-arg VITE_IDE_URL=${PUBLIC_APP_URL} \\
         --build-arg VITE_BACKEND_URL=${PUBLIC_BACKEND_URL} \\
         -t ${IMAGE} \\
         ${REPOSITORY_BUILD_CONTEXT}

EOF
    step=$((step + 1))
  fi

  if [ "$MAILER_CONFIGURED" -eq 0 ]; then
    cat <<EOF
  ${step}. Configure a mailer in:

       ${ENV_FILE}

$(print_mailer_reminder)

EOF
    step=$((step + 1))
  fi

  cat <<EOF
  ${step}. Start Intlayer:

       docker run -d --name ${NAME} \\
         --restart unless-stopped \\
         -p ${APP_PORT}:3000 \\
         -p ${API_PORT}:3100 \\
         -p ${S3_PORT}:9000 \\
         -p ${CONSOLE_PORT}:9001 \\
         -v ${DATA_VOLUME}:/data \\
         --env-file ${ENV_FILE} \\
         ${IMAGE}

  Then open ${PUBLIC_APP_URL:-http://localhost:${APP_PORT}}
  First boot initialises the datastores, so give it a minute. The first
  account you create becomes the super admin.

    Logs      docker logs -f ${NAME}
    Stop      docker rm -f ${NAME}
    Upgrade   re-run this installer, then recreate the container

EOF
}

# ============================================================== compose mode
# Downloads docker/selfhost/docker-compose.yml from the repository next to the
# generated .env and pulls the images.
run_compose() {
  require_docker
  require_compose

  ESCAPE_DOLLAR=1
  mkdir -p "$COMPOSE_DIR"
  log "Fetching docker-compose.yml into $COMPOSE_DIR"
  curl -fsSL "${SELFHOST_BASE_URL}/docker-compose.yml" -o "${COMPOSE_DIR}/docker-compose.yml"
  write_env_file "${COMPOSE_DIR}/.env"

  compose_command="docker compose"
  upgrade_command="docker compose pull && docker compose up -d"

  if [ -n "$PUBLIC_DOMAIN" ]; then
    # The build override reads DOMAIN / APP_URL / BACKEND_URL from .env and
    # passes them as build args; the context points at the repository so no
    # checkout is needed.
    log "Fetching docker-compose.build.yml (custom domain: images are built, not pulled)"
    curl -fsSL "${SELFHOST_BASE_URL}/docker-compose.build.yml" -o "${COMPOSE_DIR}/docker-compose.build.yml"
    set_env "${COMPOSE_DIR}/.env" INTLAYER_BUILD_CONTEXT "$REPOSITORY_BUILD_CONTEXT"
    compose_command="docker compose -f docker-compose.yml -f docker-compose.build.yml"
    upgrade_command="${compose_command} up -d --build   (rebuilds from the latest ${SELFHOST_REF})"
  else
    log "Pulling images"
    ( cd "$COMPOSE_DIR" && docker compose pull )
  fi

  step=1
  printf '\n  Everything is installed.\n\n'
  [ -z "$PUBLIC_DOMAIN" ] || print_custom_domain_notice

  if [ "$MAILER_CONFIGURED" -eq 0 ]; then
    cat <<EOF
  ${step}. Configure a mailer in:

       ${COMPOSE_DIR}/.env

$(print_mailer_reminder)

EOF
    step=$((step + 1))
  fi

  cat <<EOF
  ${step}. Start the stack${PUBLIC_DOMAIN:+ (the first run builds the images)}:

       cd ${COMPOSE_DIR} && ${compose_command} up -d${PUBLIC_DOMAIN:+ --build}

  Then open ${PUBLIC_APP_URL:-http://localhost:${APP_PORT}}
  First boot initialises the datastores, so give it a minute. The first
  account you create becomes the super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   ${upgrade_command}

EOF
}

case "$MODE" in
  desktop) run_desktop ;;
  docker)  run_docker ;;
  compose) run_compose ;;
esac
