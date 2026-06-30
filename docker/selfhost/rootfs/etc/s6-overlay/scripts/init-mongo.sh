#!/command/with-contenv bash
# One-shot: wait for mongod, then initiate the single-node replica set "rs0" and
# wait until this node is the writable primary. Idempotent across restarts.
set -euo pipefail

echo "[init-mongo] waiting for mongod to accept connections..."
until mongosh --quiet --host 127.0.0.1 --eval "db.adminCommand('ping').ok" 2>/dev/null | grep -q 1; do
  sleep 1
done

echo "[init-mongo] ensuring replica set rs0 is initiated..."
mongosh --quiet --host 127.0.0.1 --eval '
  try {
    rs.status();
    print("[init-mongo] replica set already initiated");
  } catch (err) {
    rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "127.0.0.1:27017" }] });
    print("[init-mongo] replica set initiated");
  }
'

echo "[init-mongo] waiting for a writable primary..."
until mongosh --quiet --host 127.0.0.1 --eval "db.hello().isWritablePrimary" 2>/dev/null | grep -q true; do
  sleep 1
done

echo "[init-mongo] ready."
