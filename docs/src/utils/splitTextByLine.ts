export const splitTextByLines = (text: string): string[] => {
  const splittedText = text.match(/[^\n]*\n|[^\n]*$/g) ?? [];

  if (splittedText.length > 0 && splittedText.at(-1) === '') {
    splittedText.pop();
  }

  return splittedText;
};
