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
