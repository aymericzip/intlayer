#!/usr/bin/env bash
set -e

# If run manually (workflow_dispatch) or via a tag push, always proceed
if [ "$EVENT_NAME" = "workflow_dispatch" ] || [ "$REF_TYPE" = "tag" ]; then
  echo "Triggered manually ($EVENT_NAME) or via tag ($REF_TYPE), proceeding..."
  CURR_VERSION=$(jq -r '.version // empty' package.json)
  echo "changed=true" >> "${GITHUB_OUTPUT:-/dev/null}"
  echo "version=$CURR_VERSION" >> "${GITHUB_OUTPUT:-/dev/null}"
  exit 0
fi

# In a push event, resolve the previous commit before the push
if [ -n "$BEFORE_SHA" ] && [ "$BEFORE_SHA" != "0000000000000000000000000000000000000000" ]; then
  if git rev-parse --verify "$BEFORE_SHA" >/dev/null 2>&1; then
    PREV_COMMIT="$BEFORE_SHA"
  else
    git fetch origin "$BEFORE_SHA" --depth=1 2>/dev/null || true
    if git rev-parse --verify "$BEFORE_SHA" >/dev/null 2>&1; then
      PREV_COMMIT="$BEFORE_SHA"
    else
      PREV_COMMIT="HEAD~1"
    fi
  fi
else
  PREV_COMMIT="HEAD~1"
fi

if ! git rev-parse --verify "$PREV_COMMIT" >/dev/null 2>&1; then
  PREV_COMMIT="HEAD~1"
fi

PREV_VERSION=$(git show "$PREV_COMMIT:package.json" 2>/dev/null | jq -r '.version // empty' || echo "")
CURR_VERSION=$(jq -r '.version // empty' package.json)

echo "Previous version: '$PREV_VERSION'"
echo "Current version:  '$CURR_VERSION'"

if [ -n "$CURR_VERSION" ] && [ "$PREV_VERSION" != "$CURR_VERSION" ]; then
  echo "Version changed from '$PREV_VERSION' to '$CURR_VERSION'. Triggering workflow."
  echo "changed=true" >> "${GITHUB_OUTPUT:-/dev/null}"
  echo "version=$CURR_VERSION" >> "${GITHUB_OUTPUT:-/dev/null}"
else
  echo "Version has not changed. Skipping workflow."
  echo "changed=false" >> "${GITHUB_OUTPUT:-/dev/null}"
  echo "version=$CURR_VERSION" >> "${GITHUB_OUTPUT:-/dev/null}"
fi
