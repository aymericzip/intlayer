import { SHA3, enc } from 'crypto-js';

export const getFileHash = (filePath: string) => {
  const hash = SHA3(filePath);

  return hash
    .toString(enc.Base64)
    .replace(/[^A-Z\d]/gi, '')
    .substring(0, 20);
};
