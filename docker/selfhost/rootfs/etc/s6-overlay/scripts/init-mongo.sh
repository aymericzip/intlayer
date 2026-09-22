#!/command/with-contenv bash
# One-shot: initiate the single-node replica set "rs0" (see init-mongo.mjs).
# NODE_PATH lets the script import the backend's bundled `mongodb` driver.
set -euo pipefail

export NODE_PATH=/workspace/apps/backend/node_modules
exec bun /etc/s6-overlay/scripts/init-mongo.mjs
