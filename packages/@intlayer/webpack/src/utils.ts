import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto-js';

/**
 * Set the __dirname global variable to make the config work in both ESM and CJS environments
 */
export const defineDirname = () => {
  const isESModule = typeof import.meta.url === 'string';

  const filename = isESModule
    ? fileURLToPath(import.meta.url)
    : require('url').pathToFileURL(__filename).toString();

  globalThis.__filename = globalThis.__filename ?? filename;
  globalThis.__dirname = globalThis.__dirname ?? path.dirname(__filename);
};

export const getFileHash = (filePath: string) => {
  const hash = crypto.SHA3(filePath);

  return hash
    .toString(crypto.enc.Base64)
    .replace(/[^A-Z\d]/gi, '')
    .substring(0, 20);
};
