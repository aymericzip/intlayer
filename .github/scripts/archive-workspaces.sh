#!/usr/bin/env bash
set -euo pipefail

case "$BUILD_CONTEXT" in
  browser) directories=(packages/@intlayer/chrome-extension) ;;
  npm|release) directories=(packages docs plugins compat utils) ;;
  china|tauri|vscode)
    case "$BUILD_CONTEXT" in
      china) filters=(--filter=website-tanstack^... --filter=./docs) ;;
      tauri) filters=(--filter=app^...) ;;
      vscode) filters=(--filter=intlayer-vs-code-extension^...) ;;
    esac
    bun run turbo run build:ci "${filters[@]}" --dry=json > "$RUNNER_TEMP/workspace-graph.json"
    jq -er '[.tasks[].directory] | unique | .[]' "$RUNNER_TEMP/workspace-graph.json" > "$RUNNER_TEMP/workspace-directories"
    directories=()
    while IFS= read -r directory; do
      directories+=("$directory")
    done < "$RUNNER_TEMP/workspace-directories"
    ;;
  *) echo "Unknown build context: $BUILD_CONTEXT" >&2; exit 1 ;;
esac

find "${directories[@]}" -type d \( -name node_modules -o -name .turbo \) -prune -o \
  -type d \( -name dist -o -name build -o -name lib \) -prune -print0 |
  tar -czf "$RUNNER_TEMP/packages.tar.gz" --null -T -
