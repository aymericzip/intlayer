#!/usr/bin/env bash
set -e

# Resolves the registries a self-host container image is published under.
#
# GHCR always works via the built-in GITHUB_TOKEN. Docker Hub is optional and
# only added when both secrets are configured, so no job fails just because the
# credentials are absent.
#
# Runs in every job that needs the list (per-platform build + manifest merge):
# a job output would be dropped by GitHub Actions because DOCKERHUB_USERNAME is
# a secret ("Skip output since it may contain secret").
#
# Inputs (env):
#   IMAGE_NAME          published image name: cms-frontend / cms-backend / cms-all
#   GITHUB_REPOSITORY_OWNER, DOCKERHUB_USERNAME, DOCKERHUB_TOKEN
# Outputs:
#   ghcr_image=ghcr.io/<owner>/intlayer/<name>
#   dockerhub=true|false
#   images=<comma-separated image names>  (adds <DOCKERHUB_USERNAME>/<name>)

if [ -z "${IMAGE_NAME:-}" ]; then
  echo "::error::IMAGE_NAME is required" >&2
  exit 1
fi

ghcr_image="ghcr.io/${GITHUB_REPOSITORY_OWNER}/intlayer/${IMAGE_NAME}"
images="${ghcr_image}"

if [ -n "$DOCKERHUB_USERNAME" ] && [ -n "$DOCKERHUB_TOKEN" ]; then
  echo "dockerhub=true" >> "${GITHUB_OUTPUT:-/dev/null}"
  images="${images},${DOCKERHUB_USERNAME}/${IMAGE_NAME}"
else
  echo "dockerhub=false" >> "${GITHUB_OUTPUT:-/dev/null}"
  echo "::warning::DOCKERHUB_USERNAME / DOCKERHUB_TOKEN not set — pushing to GHCR only."
fi

echo "ghcr_image=${ghcr_image}" >> "${GITHUB_OUTPUT:-/dev/null}"
echo "images=${images}" >> "${GITHUB_OUTPUT:-/dev/null}"
