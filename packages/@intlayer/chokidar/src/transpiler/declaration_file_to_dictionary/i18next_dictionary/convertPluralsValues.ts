export const convertPluralsValues = (number: string | number): string => {
  const numberValue = Number(number);

  if (numberValue === 0) return 'zero';
  else if (numberValue === 1) return 'singular';
  else if (numberValue === 2) return 'two';
  else if (numberValue <= 7) return 'few';
  else if (numberValue <= 99) return 'many';
  else return 'other';
};
