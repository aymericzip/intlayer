/**
 * Full connection string override. Self-hosted deployments set it to reach a
 * plain `mongodb://` server (the bundled `mongod`, or a Compose service) — the
 * SRV form below only resolves against DNS-backed clusters such as Atlas.
 */
const MONGODB_URI_ENVIRONMENT_VARIABLE = 'MONGODB_URI';

/**
 * Resolves the MongoDB connection string.
 *
 * `MONGODB_URI` wins when set. Otherwise the URI is assembled from the Atlas
 * credentials (`DB_ID` / `DB_MDP` / `DB_CLUSTER`), which is what the cloud
 * deployment provides.
 *
 * Read on every call rather than cached at import time because `index.ts`
 * loads the `.env` files after the module graph is evaluated.
 */
export const getMongoDBUri = (): string => {
  const explicitUri = process.env[MONGODB_URI_ENVIRONMENT_VARIABLE]?.trim();

  if (explicitUri) return explicitUri;

  return `mongodb+srv://${process.env.DB_ID}:${process.env.DB_MDP}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
};
