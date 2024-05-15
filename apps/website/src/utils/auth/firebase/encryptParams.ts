import { AES, enc } from 'crypto-js';

type EncryptedData = { data: string };

const isDevelopment = process.env.NODE_ENV === 'development';

export const encryptParams = (
  params: Record<string, unknown>
): EncryptedData => {
  if (isDevelopment) {
    return {
      data: JSON.stringify(params),
    };
  }

  const stringifiedParams = JSON.stringify(params);

  const encryptedParams = AES.encrypt(
    stringifiedParams,
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY!
  ).toString();

  return {
    data: encryptedParams,
  };
};

export const decryptParams = (encryptedParams: EncryptedData) => {
  if (isDevelopment) {
    if (typeof encryptedParams.data === 'string') {
      return JSON.parse(encryptedParams.data);
    }

    return encryptedParams.data;
  }

  const encryptedData = encryptedParams.data;

  const bytes = AES.decrypt(
    encryptedData,
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY!
  );

  const decryptedParams = bytes.toString(enc.Utf8);

  return JSON.parse(decryptedParams);
};
