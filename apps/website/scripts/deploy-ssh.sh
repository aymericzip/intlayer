#!/usr/bin/env bash
# Deploy Next.js standalone build to remote server via tar+SSH.
# No docker, no npm install on server — only bun (single binary) needed.
# Uses tar to preserve bun's symlink structure in node_modules correctly.
#
# Usage:
#   ./scripts/deploy-ssh.sh
#   SERVER=user@host ./scripts/deploy-ssh.sh
set -euo pipefail

# ── Config ────────────────────────────────────────────────────────────────────
SERVER="${SERVER:-root@47.110.181.91}"
REMOTE_DIR="/app"
SSH_OPTS="-o ServerAliveInterval=30 -o ServerAliveCountMax=20 -o ConnectTimeout=30 -o TCPKeepAlive=yes"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
MONOREPO_ROOT="$(cd "$WEBSITE_DIR/../.." && pwd)"
DOCS_DIR="$MONOREPO_ROOT/docs"
STANDALONE_DIR="$WEBSITE_DIR/.next/standalone"

# ── Preflight ─────────────────────────────────────────────────────────────────
if [[ ! -f "$STANDALONE_DIR/apps/website/server.js" ]]; then
  echo "ERROR: standalone build not found. Run: bun run next build"
  exit 1
fi
if [[ ! -d "$DOCS_DIR/dist" ]]; then
  echo "ERROR: docs/dist not found. Run: bun x turbo run build --filter=./docs"
  exit 1
fi

# ── Stage into a temp dir (preserves symlinks as-is) ─────────────────────────
STAGING=$(mktemp -d)
trap 'rm -rf "$STAGING"' EXIT

echo "Staging..."

cp -a "$STANDALONE_DIR/."                      "$STAGING/"
cp -a "$WEBSITE_DIR/.next/static/."            "$STAGING/apps/website/.next/static/"
mkdir -p "$STAGING/apps/website/public"
cp -a "$WEBSITE_DIR/public/."                  "$STAGING/apps/website/public/"
mkdir -p "$STAGING/docs"
cp -a "$DOCS_DIR/dist"                         "$STAGING/docs/"
cp    "$DOCS_DIR/package.json"                 "$STAGING/docs/"
cp -a "$DOCS_DIR/blog"                         "$STAGING/docs/"
cp -a "$DOCS_DIR/docs"                         "$STAGING/docs/"
cp -a "$DOCS_DIR/frequent_questions"           "$STAGING/docs/"
cp -a "$DOCS_DIR/legal"                        "$STAGING/docs/"

STAGED_BYTES=$(( $(du -sk "$STAGING" | cut -f1) * 1024 ))
echo "Staged: $(du -sh "$STAGING" | cut -f1)"

# ── Write bootstrap into staging so it's part of the tar ─────────────────────
cat > "$STAGING/_bootstrap.sh" << BOOTSTRAP_EOF
#!/usr/bin/env bash
set -e
export PATH="\$HOME/.bun/bin:\$PATH"

if ! command -v bun &>/dev/null; then
  echo "[deploy] Installing bun..."
  curl -fsSL https://bun.sh/install | bash
  export PATH="\$HOME/.bun/bin:\$PATH"
fi

pkill -TERM -f "apps/website/server.js" 2>/dev/null || true
sleep 1

if [[ ! -f "$REMOTE_DIR/.env" ]]; then
  cat > "$REMOTE_DIR/.env" << 'ENV'
NODE_ENV=production
HOSTNAME=0.0.0.0
PORT=3000
# INTLAYER_CLIENT_ID=
# INTLAYER_CLIENT_SECRET=
# INTLAYER_BACKEND_URL=
# OPENAI_API_KEY=
ENV
  echo "[deploy] Created $REMOTE_DIR/.env — fill in secrets."
fi

cd "$REMOTE_DIR"
set -o allexport; source .env; set +o allexport
nohup bun apps/website/server.js >> /var/log/website.log 2>&1 &
echo "[deploy] Started PID \$!"

sleep 3
if pgrep -f "apps/website/server.js" &>/dev/null; then
  echo "[deploy] App running on port \${PORT:-3000}"
else
  echo "[deploy] FAILED — last 30 lines:"
  tail -30 /var/log/website.log
  exit 1
fi
BOOTSTRAP_EOF
chmod +x "$STAGING/_bootstrap.sh"

# ── Stream tar over SSH (single connection: upload + extract + start) ─────────
echo ""
echo "Uploading + deploying on $SERVER ..."

REMOTE_CMD="set -e; mkdir -p '$REMOTE_DIR' && tar --warning=no-unknown-keyword -xhC '$REMOTE_DIR' && bash '$REMOTE_DIR/_bootstrap.sh' && rm -f '$REMOTE_DIR/_bootstrap.sh'"

if command -v pv &>/dev/null; then
  COPYFILE_DISABLE=1 tar -cC "$STAGING" . \
    | pv -s "$STAGED_BYTES" -N upload \
    | ssh $SSH_OPTS "$SERVER" "$REMOTE_CMD"
else
  echo "(install pv for a live progress bar: brew install pv)"
  COPYFILE_DISABLE=1 tar -cC "$STAGING" . \
    | ssh $SSH_OPTS "$SERVER" "$REMOTE_CMD"
fi

echo ""
echo "Done. Tail logs:  ssh $SERVER 'tail -f /var/log/website.log'"
