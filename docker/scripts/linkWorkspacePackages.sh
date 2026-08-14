#!/bin/sh
# Recreates the monorepo `packages/@intlayer/<name>` directories as symlinks to
# the registry-installed copies of those packages.
#
# Several application configuration files address workspace packages by their
# monorepo path rather than by package name — for instance
# `contentDir: ['./src', '../../packages/@intlayer/design-system/dist']` in
# `intlayer.config.ts`. Those paths do not exist in an image that installs the
# published packages from npm instead of building the monorepo, so this script
# bridges them without requiring the application sources to change.
#
# Usage:
#   sh docker/scripts/linkWorkspacePackages.sh <workspace-dir> <package-name>...
#
# Example:
#   sh docker/scripts/linkWorkspacePackages.sh apps/website design-system

set -eu

if [ "$#" -lt 2 ]; then
  echo "usage: $0 <workspace-dir> <package-name>..." >&2
  exit 1
fi

workspace_dir="$1"
shift
root_dir="$(pwd)"

for package_name in "$@"; do
  # Resolve from inside the workspace so bun follows the same lookup order the
  # application does at build time (workspace node_modules, then hoisted root).
  package_dir="$(
    cd "$root_dir/$workspace_dir" && bun -e \
      "console.log(require('node:path').dirname(require.resolve('@intlayer/${package_name}/package.json')))"
  )"

  link_path="$root_dir/packages/@intlayer/$package_name"

  mkdir -p "$(dirname "$link_path")"
  rm -rf "$link_path"
  ln -s "$package_dir" "$link_path"

  echo "[link-workspace-packages] packages/@intlayer/$package_name -> $package_dir"
done
