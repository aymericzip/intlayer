import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto-js';

export const getFileHash = (filePath: string) => {
  const hash = crypto.SHA3(filePath);

  return hash
    .toString(crypto.enc.Base64)
    .replace(/[^A-Z\d]/gi, '')
    .substring(0, 20);
};

export const transformToCamelCase = (string: string): string => {
  // Split the string into words using a regex that finds spaces, hyphens, and underscores
  const words = string.split(/[\s\-_]+/);

  // Transform each word except the first to have its first letter uppercase
  const camelCasedWords = words.map((word, index) => {
    if (index === 0) {
      return word[0].toUpperCase() + word.slice(1);
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together
  return camelCasedWords.join('');
};

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
