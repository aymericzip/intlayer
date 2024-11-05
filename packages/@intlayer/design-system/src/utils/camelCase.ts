export const sentenceToCamelCase = (string: string): string => {
  const sentence = string
    .split(' ')
    .map(
      (word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
    )
    .join('');

  return `${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
};

export const camelCaseToSentence = (string: string): string => {
  const result = string.replace(/([A-Z])/g, ' $1');
  return result.toLowerCase().trim();
};
