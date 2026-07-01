import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'node:crypto';

/**
 * Symmetric encryption helpers used to store third-party secrets (e.g. a
 * per-organization mailer API key or SMTP password) at rest.
 *
 * The encryption key is derived from `BETTER_AUTH_SECRET`, which is already
 * required to run the backend. This keeps self-hosted setups zero-config: no
 * additional environment variable is needed to enable encrypted secrets.
 */

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 12;
/** Fixed salt for key derivation — the entropy comes from `BETTER_AUTH_SECRET`. */
const KEY_DERIVATION_SALT = 'intlayer.secret.encryption.v1';
/** Version prefix so the payload format can evolve without ambiguity. */
const PAYLOAD_VERSION = 'v1';

/**
 * Derives a 32-byte AES key from the server secret.
 *
 * @returns The derived symmetric key.
 * @throws If `BETTER_AUTH_SECRET` is not defined.
 */
const getEncryptionKey = (): Buffer => {
  const secret = process.env.BETTER_AUTH_SECRET;

  if (!secret) {
    throw new Error(
      'BETTER_AUTH_SECRET must be defined to encrypt/decrypt secrets'
    );
  }

  return scryptSync(secret, KEY_DERIVATION_SALT, KEY_LENGTH);
};

/**
 * Whether a string looks like a payload produced by {@link encryptSecret}.
 *
 * @param value - The value to test.
 * @returns `true` when the value uses the encrypted payload format.
 */
export const isEncryptedSecret = (value: string): boolean =>
  value.startsWith(`${PAYLOAD_VERSION}:`);

/**
 * Encrypts a plaintext secret using AES-256-GCM.
 *
 * @param plainText - The secret to encrypt.
 * @returns A self-describing payload `v1:<ivHex>:<tagHex>:<cipherHex>`.
 */
export const encryptSecret = (plainText: string): string => {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getEncryptionKey(), iv);

  const cipherText = Buffer.concat([
    cipher.update(plainText, 'utf8'),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    PAYLOAD_VERSION,
    iv.toString('hex'),
    authTag.toString('hex'),
    cipherText.toString('hex'),
  ].join(':');
};

/**
 * Decrypts a payload produced by {@link encryptSecret}.
 *
 * @param payload - The encrypted payload.
 * @returns The original plaintext secret.
 * @throws If the payload is malformed or authentication fails.
 */
export const decryptSecret = (payload: string): string => {
  const [version, ivHex, authTagHex, cipherTextHex] = payload.split(':');

  if (version !== PAYLOAD_VERSION || !ivHex || !authTagHex || !cipherTextHex) {
    throw new Error('Invalid encrypted secret payload');
  }

  const decipher = createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    Buffer.from(ivHex, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

  const plainText = Buffer.concat([
    decipher.update(Buffer.from(cipherTextHex, 'hex')),
    decipher.final(),
  ]);

  return plainText.toString('utf8');
};
