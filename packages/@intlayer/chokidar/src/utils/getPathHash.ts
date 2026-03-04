import crypto from 'node:crypto';

export const getPathHash = (filePath: string) =>
  crypto
    .createHash('sha3-256')
    .update(filePath)
    .digest('base64')
    .replace(/[^A-Z\d]/gi, '')
    .substring(0, 20);
