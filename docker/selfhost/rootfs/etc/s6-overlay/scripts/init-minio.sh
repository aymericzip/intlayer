#!/command/with-contenv bash
# One-shot: wait for MinIO, then create the bucket and grant anonymous download so
# avatars / screenshots are publicly readable via S3_PUBLIC_URL. Idempotent.
set -euo pipefail

echo "[init-minio] waiting for minio to become live..."
until curl -sf http://127.0.0.1:9000/minio/health/live >/dev/null; do
  sleep 1
done

mc alias set local http://127.0.0.1:9000 "${S3_ACCESS_KEY_ID}" "${S3_SECRET_ACCESS_KEY}"
mc mb --ignore-existing "local/${S3_BUCKET_NAME}"
mc anonymous set download "local/${S3_BUCKET_NAME}"

echo "[init-minio] bucket '${S3_BUCKET_NAME}' ready."
