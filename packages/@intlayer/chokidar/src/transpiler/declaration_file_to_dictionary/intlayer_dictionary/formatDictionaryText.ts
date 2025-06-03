const isDevelopment = process.env.NODE_ENV === 'development';

export const formatDictionaryText = (dictionary: object) =>
  isDevelopment
    ? JSON.stringify(dictionary, null, 2)
    : JSON.stringify(dictionary);
