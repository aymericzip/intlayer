#!/usr/bin/env bash
set -e

# Resolves the image names the self-host container is published under.
#
# GHCR always works via the built-in GITHUB_TOKEN. Docker Hub is optional and
# only added when both secrets are configured, so no job fails just because the
# credentials are absent.
#
# Runs in every job that needs the list (per-platform build + manifest merge):
# a job output would be dropped by GitHub Actions because DOCKERHUB_USERNAME is
# a secret ("Skip output since it may contain secret").
#
# Inputs (env): GHCR_IMAGE, DOCKERHUB_USERNAME, DOCKERHUB_TOKEN
# Outputs: dockerhub=true|false, images=<comma-separated image names>

images="${GHCR_IMAGE}"

if [ -n "$DOCKERHUB_USERNAME" ] && [ -n "$DOCKERHUB_TOKEN" ]; then
  echo "dockerhub=true" >> "${GITHUB_OUTPUT:-/dev/null}"
  images="${images},${DOCKERHUB_USERNAME}/intlayer-selfhost"
else
  echo "dockerhub=false" >> "${GITHUB_OUTPUT:-/dev/null}"
  echo "::warning::DOCKERHUB_USERNAME / DOCKERHUB_TOKEN not set — pushing to GHCR only."
fi

echo "images=${images}" >> "${GITHUB_OUTPUT:-/dev/null}"
