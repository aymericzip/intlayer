# Sourced (not executed) by every s6 service that talks to the bundled MinIO.
#
# Resolves the S3 credentials at runtime so none is baked into the image:
#  - S3_ACCESS_KEY_ID defaults to "intlayer"
#  - S3_SECRET_ACCESS_KEY comes from the environment (`-e` / `--env-file`) or,
#    when unset, from a random secret generated on first boot and persisted in
#    the data volume, so MinIO keeps accepting it across container recreation.

S3_CREDENTIALS_SECRET_FILE=/data/.s3-secret-access-key

export S3_ACCESS_KEY_ID="${S3_ACCESS_KEY_ID:-intlayer}"

if [ -z "${S3_SECRET_ACCESS_KEY:-}" ]; then
  if [ ! -s "${S3_CREDENTIALS_SECRET_FILE}" ]; then
    mkdir -p "$(dirname "${S3_CREDENTIALS_SECRET_FILE}")"
    temporary_secret_file="$(mktemp "${S3_CREDENTIALS_SECRET_FILE}.XXXXXX")"
    head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n' >"${temporary_secret_file}"
    chmod 600 "${temporary_secret_file}"
    # -n: if another service won the race, keep its secret
    mv -n "${temporary_secret_file}" "${S3_CREDENTIALS_SECRET_FILE}"
    rm -f "${temporary_secret_file}"
  fi
  S3_SECRET_ACCESS_KEY="$(cat "${S3_CREDENTIALS_SECRET_FILE}")"
  export S3_SECRET_ACCESS_KEY
fi
