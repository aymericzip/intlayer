export const extractErrorMessage = (error: any): string => {
  const pickFieldsFromObject = (value: unknown): string | undefined => {
    if (!value || typeof value !== 'object') return undefined;
    const obj = value as Record<string, unknown>;

    const message = typeof obj.message === 'string' ? obj.message : undefined;
    const title = typeof obj.title === 'string' ? obj.title : undefined;
    const code = typeof obj.code === 'string' ? obj.code : undefined;

    if (message) return message;
    if (title && code) return `${title} (${code})`;
    if (title) return title;
    if (code) return code;
    return undefined;
  };

  const tryParseJsonString = (maybeJson: string): string | undefined => {
    try {
      const parsed = JSON.parse(maybeJson);
      const picked = pickFieldsFromObject(parsed);
      if (picked) return picked;
      if (typeof parsed === 'string') return parsed;
      return undefined;
    } catch {
      return undefined;
    }
  };

  if (typeof error === 'string') {
    return tryParseJsonString(error) ?? error;
  }

  if (error && typeof error === 'object') {
    if (typeof (error as any).message === 'string') {
      const fromMessage = tryParseJsonString((error as any).message);
      if (fromMessage) return fromMessage;
      return (error as any).message;
    }

    const fromObject = pickFieldsFromObject(error);
    if (fromObject) return fromObject;

    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }

  return 'An unknown error occurred';
};
