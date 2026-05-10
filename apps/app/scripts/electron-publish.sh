#!/usr/bin/env bash
set -e

# Load env vars from .env.local then .env, skipping comments and empty lines
load_env() {
  local file="$1"
  [ -f "$file" ] || return 0
  while IFS= read -r line || [ -n "$line" ]; do
    [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue
    export "$line"
  done < "$file"
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

load_env .env
load_env .env.local

if [ -z "$GH_TOKEN" ]; then
  echo "Error: GH_TOKEN is not set in .env or .env.local" >&2
  exit 1
fi

electron-vite build && electron-builder --publish always
