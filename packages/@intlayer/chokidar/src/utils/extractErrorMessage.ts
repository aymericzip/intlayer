export const extractErrorMessage = (error: unknown): string => {
  const trimToSingleLine = (text: string): string =>
    text
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean)[0] ?? text.trim();

  const looksLikeJson = (value: string): boolean => {
    const s = value.trim();
    if (!s) return false;
    const first = s[0];
    return first === '{' || first === '[' || first === '"';
  };

  const sanitizeUnexpectedTokenMessage = (text: string): string => {
    // If the text mentions an invalid JSON parse, try to extract the meaningful part
    const t = text.trim();
    if (/Unexpected token/i.test(t) && /not valid JSON/i.test(t)) {
      const quoted = t.match(/"([^"]+)"/);
      if (quoted && quoted[1]) return quoted[1];
      // Fallback: drop the leading parser error description
      const afterColon = t.split(':').slice(1).join(':').trim();
      if (afterColon) return afterColon;
    }
    return t;
  };

  const pickFieldsFromObject = (
    value: unknown,
    seen: Set<unknown>
  ): string | undefined => {
    if (!value || typeof value !== 'object') return undefined;
    if (seen.has(value)) return undefined;
    seen.add(value);

    const obj = value as Record<string, unknown>;

    // Check for message first (highest priority)
    if (typeof obj.message === 'string' && obj.message.trim()) {
      return obj.message;
    }

    // Check for error_description
    if (
      typeof obj.error_description === 'string' &&
      obj.error_description.trim()
    ) {
      return obj.error_description;
    }

    // Check for error
    if (typeof obj.error === 'string' && obj.error.trim()) {
      return obj.error;
    }

    // Handle title and code combination
    const title = typeof obj.title === 'string' ? obj.title.trim() : '';
    const code = typeof obj.code === 'string' ? obj.code.trim() : '';

    if (title && code) {
      return `${title} (${code})`;
    }

    if (title) {
      return title;
    }

    if (code) {
      return code;
    }

    // Check for statusText
    if (typeof obj.statusText === 'string' && obj.statusText.trim()) {
      return obj.statusText;
    }

    // Common nested structures (Axios/Fetch-like)
    const response = obj.response as Record<string, unknown> | undefined;
    if (response && typeof response === 'object') {
      const data = response.data as unknown;
      const fromData = pickFieldsFromObject(data, seen);
      if (fromData) return fromData;
    }

    const data = obj.data as unknown;
    const fromData = pickFieldsFromObject(data, seen);
    if (fromData) return fromData;

    // Nested cause chain
    const cause = (obj as { cause?: unknown }).cause;
    const fromCause =
      pickFieldsFromObject(cause, seen) ??
      (typeof (cause as any)?.message === 'string'
        ? (cause as any).message
        : undefined);
    if (fromCause) return fromCause;

    // Arrays of errors
    const errors = obj.errors as unknown;
    if (Array.isArray(errors)) {
      for (const item of errors) {
        const fromItem = pickFieldsFromObject(item, seen);
        if (fromItem) return fromItem;
        if (typeof (item as any)?.message === 'string')
          return (item as any).message;
      }
    }

    return undefined;
  };

  const tryParseJsonString = (maybeJson: string): string | undefined => {
    if (!looksLikeJson(maybeJson)) return undefined;
    try {
      const parsed = JSON.parse(maybeJson);
      const picked = pickFieldsFromObject(parsed, new Set());
      if (picked) return picked;
      if (typeof parsed === 'string') return parsed;
      return undefined;
    } catch {
      return undefined;
    }
  };

  if (typeof error === 'string') {
    const cleaned = sanitizeUnexpectedTokenMessage(error);
    return tryParseJsonString(cleaned) ?? trimToSingleLine(cleaned);
  }

  if (error && typeof error === 'object') {
    // Native Error instance
    if (error instanceof Error) {
      const cleaned = sanitizeUnexpectedTokenMessage(error.message);
      const fromMessage = tryParseJsonString(cleaned);
      if (fromMessage) return trimToSingleLine(fromMessage);
      // Dive into cause when present
      const fromCause = extractErrorMessage(error.cause as unknown);
      if (fromCause && fromCause !== 'An unknown error occurred')
        return trimToSingleLine(fromCause);
      return trimToSingleLine(cleaned);
    }

    // Generic object
    const seen = new Set<unknown>();
    const fromObject = pickFieldsFromObject(error, seen);
    if (fromObject) {
      const cleaned = sanitizeUnexpectedTokenMessage(fromObject);
      return tryParseJsonString(cleaned) ?? trimToSingleLine(cleaned);
    }

    try {
      const serialized = JSON.stringify(error);
      return trimToSingleLine(serialized);
    } catch {
      return trimToSingleLine(String(error));
    }
  }

  return 'An unknown error occurred';
};
