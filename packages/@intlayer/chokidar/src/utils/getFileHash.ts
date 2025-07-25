import crypto from 'crypto-js';

export const getFileHash = (filePath: string) => {
  const hash = crypto.SHA3(filePath);

  return hash
    .toString(crypto.enc.Base64)
    .replace(/[^A-Z\d]/gi, '')
    .substring(0, 20);
};
