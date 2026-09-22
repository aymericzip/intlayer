// One-shot: wait for mongod, initiate the single-node replica set "rs0", then
// wait until this node is the writable primary. Idempotent across restarts.
//
// Uses the `mongodb` driver already shipped with the backend (resolved through
// NODE_PATH by init-mongo.sh) instead of mongosh, which weighs ~280 MB.
import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://127.0.0.1:27017/?directConnection=true';
const REPLICA_SET_CONFIG = {
  _id: 'rs0',
  members: [{ _id: 0, host: '127.0.0.1:27017' }],
};
const RETRY_DELAY_MS = 1_000;

const log = (message) => console.log(`[init-mongo] ${message}`);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectWhenReady = async () => {
  for (;;) {
    const client = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: RETRY_DELAY_MS,
    });
    try {
      await client.connect();
      await client.db('admin').command({ ping: 1 });
      return client;
    } catch {
      await client.close().catch(() => undefined);
      await sleep(RETRY_DELAY_MS);
    }
  }
};

log('waiting for mongod to accept connections...');
const client = await connectWhenReady();
const admin = client.db('admin');

log('ensuring replica set rs0 is initiated...');
try {
  await admin.command({ replSetGetStatus: 1 });
  log('replica set already initiated');
} catch (error) {
  if (error?.codeName !== 'NotYetInitialized') throw error;
  await admin.command({ replSetInitiate: REPLICA_SET_CONFIG });
  log('replica set initiated');
}

log('waiting for a writable primary...');
for (;;) {
  const hello = await admin.command({ hello: 1 }).catch(() => ({}));
  if (hello.isWritablePrimary) break;
  await sleep(RETRY_DELAY_MS);
}

await client.close();
log('ready.');
