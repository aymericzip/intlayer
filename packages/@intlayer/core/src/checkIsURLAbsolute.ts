export const checkIsURLAbsolute = (url: string): boolean =>
  /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
