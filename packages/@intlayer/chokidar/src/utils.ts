import crypto from 'crypto-js';

export const getFileHash = (filePath: string) => {
  const hash = crypto.SHA3(filePath);

  return hash
    .toString(crypto.enc.Base64)
    .replace(/[^A-Z\d]/gi, '')
    .substring(0, 20);
};

export const kebabCaseToCamelCase = (name: string): string => {
  return name
    .split(/[^a-zA-Z0-9]+/) // Split on any non-alphanumeric character
    .filter(Boolean) // Remove any empty strings
    .map((word) => {
      // Convert the entire word to lowercase first
      const lowerWord = word.toLowerCase();

      // Capitalize the first character
      let capitalized = lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);

      // Capitalize any letter that follows a number
      capitalized = capitalized.replace(
        /(\d)([a-z])/g,
        (_, number, char) => number + char.toUpperCase()
      );

      return capitalized;
    })
    .join(''); // Concatenate all parts into a single string
};

export const sortAlphabetically = (a: string, b: string) => a.localeCompare(b);
