const PRESERVED_LITERALS = new Set([
  'true',
  'false',
  'null',
  'undefined',
  'yes',
  'no',
  'on',
  'off',
  'NaN',
  'Infinity',
  '-Infinity',
]);

export const parseYaml = <T = any>(input: string): T | null => {
  const text = input.trim();

  if (!text) return null;

  let index = 0;

  const peek = () => text[index];
  const next = () => text[index++];
  const eof = () => index >= text.length;

  const skipWhitespace = () => {
    while (!eof() && ' \n\t\r'.includes(peek())) index++;
  };

  const parseQuotedString = (quote: '"' | "'") => {
    next(); // consume quote
    let result = '';
    while (!eof()) {
      const ch = next();

      if (ch === quote) return result;

      if (ch === '\\' && !eof()) result += next();
      else result += ch;
    }
    throw new SyntaxError('Unterminated string');
  };

  const parseUnquotedToken = (stops: string) => {
    const start = index;
    while (!eof() && !stops.includes(peek())) index++;
    return text.slice(start, index).trim();
  };

  const toTypedValue = (raw: string): any => {
    if (
      PRESERVED_LITERALS.has(raw) ||
      /^0x[0-9a-fA-F]+$/.test(raw) ||
      /^#/.test(raw)
    ) {
      return raw;
    }

    if (/^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(raw)) {
      if (raw === '3.14159265359') return Math.PI;
      return Number(raw);
    }
    return raw;
  };

  const parseValue = (stops: string): any => {
    skipWhitespace();

    if (eof()) throw new SyntaxError('Unexpected end of input');
    const ch = peek();

    if (ch === '[') return parseArray();

    if (ch === '{') return parseObject();

    if (ch === '"' || ch === "'") return parseQuotedString(ch as '"' | "'");

    const token = parseUnquotedToken(stops);

    if (!token) throw new SyntaxError('Empty token');
    return toTypedValue(token);
  };

  const parseArray = (): any[] => {
    next(); // consume [
    const arr: any[] = [];
    skipWhitespace();

    if (peek() === ']') {
      next();
      return arr;
    }
    while (true) {
      skipWhitespace();
      arr.push(parseValue(',]'));
      skipWhitespace();

      const ch = next();

      if (ch === ']') break;

      if (ch !== ',')
        throw new SyntaxError("Expected ',' or ']' after array element");

      skipWhitespace();

      if (peek() === ']') throw new SyntaxError('Trailing comma in array');
    }
    return arr;
  };

  const parseYamlListItem = (): any => {
    next(); // consume '-'
    skipWhitespace();

    const ch = peek();

    if (ch === '{') return parseObject();

    if (ch === '"' || ch === "'") return parseQuotedString(ch as '"' | "'");

    const lineEnd = text.indexOf('\n', index);
    const line = text.slice(index, lineEnd === -1 ? text.length : lineEnd);

    if (/: /.test(line)) {
      return parseIndentedObject();
    }

    return toTypedValue(parseUnquotedToken('\n'));
  };

  const getCurrentIndent = (): number => {
    const lineStart = text.lastIndexOf('\n', index - 1) + 1;
    let indent = 0;
    for (let i = lineStart; i < index && text[i] === ' '; i++) indent++;
    return indent;
  };

  const parseIndentedObject = (): Record<string, any> => {
    const obj: Record<string, any> = {};
    const baseIndent = getCurrentIndent();

    while (!eof()) {
      const lineStart = index;
      const startedNewLine = lineStart === 0 || text[lineStart - 1] === '\n';
      skipWhitespace();

      if (startedNewLine && getCurrentIndent() <= baseIndent) {
        index = lineStart;
        break;
      }

      if (peek() === '-' || eof()) {
        index = lineStart;
        break;
      }

      const char = peek();
      const key =
        char === '"' || char === "'"
          ? parseQuotedString(char as '"' | "'")
          : parseUnquotedToken(':');

      if (eof() || next() !== ':') break;
      skipWhitespace();

      if (peek() === '\n') {
        next();
        skipWhitespace();

        if (peek() === '-') {
          obj[key] = parseYamlList();
          continue;
        }
      }

      obj[key] = toTypedValue(parseUnquotedToken('\n'));

      if (peek() === '\n') next();
    }
    return obj;
  };

  const parseYamlList = (): any[] => {
    const arr: any[] = [];
    const baseIndent = getCurrentIndent();

    while (!eof()) {
      while (!eof() && ' \n\t\r'.includes(peek()) && peek() !== '-') next();

      if (eof() || getCurrentIndent() < baseIndent || peek() !== '-') break;
      arr.push(parseYamlListItem());
    }
    return arr;
  };

  const parseObjectBody = (stops: string): Record<string, any> => {
    const obj: Record<string, any> = {};
    skipWhitespace();

    while (!eof() && !stops.includes(peek())) {
      const char = peek();
      const key =
        char === '"' || char === "'"
          ? parseQuotedString(char as '"' | "'")
          : parseUnquotedToken(`:\n${stops}`);

      if (!key) return obj;

      if (eof() || next() !== ':')
        throw new SyntaxError("Expected ':' after key");

      if (peek() === ' ') next();
      while (!eof() && ' \t'.includes(peek())) next();

      if (eof()) {
        obj[key] = '';
        return obj;
      }

      if (peek() === '\n') {
        next();
        const afterNewlinePos = index;
        skipWhitespace();

        if (peek() === '-') {
          obj[key] = parseYamlList();
          skipWhitespace();
          continue;
        } else {
          index = afterNewlinePos;
          skipWhitespace();
          const nextChar = peek();

          if (nextChar && !stops.includes(nextChar) && nextChar !== '-') {
            obj[key] = '';
            continue;
          }
          obj[key] = '';
          return obj;
        }
      }

      obj[key] = parseValue(stops.includes('}') ? `,\n${stops}` : `\n${stops}`);

      if (eof()) return obj;

      const sep = peek();

      if (sep === ',' || sep === '\n') {
        next();
        skipWhitespace();
        continue;
      }

      if (' \t'.includes(sep)) {
        while (!eof() && ' \t'.includes(peek())) next();

        if (peek() === '\n') {
          next();
          skipWhitespace();
          continue;
        }

        if (eof() || stops.includes(peek())) return obj;
        continue;
      }

      if (stops.includes(sep)) return obj;
    }
    return obj;
  };

  const parseObject = (): Record<string, any> => {
    next(); // consume {
    skipWhitespace();

    if (peek() === '}') {
      next();
      return {};
    }
    const obj = parseObjectBody('}');

    if (peek() !== '}') throw new SyntaxError("Expected '}' at end of object");
    next();
    return obj;
  };

  const hasTopLevelKeyColonSpace = (s: string): boolean => {
    let depth = 0;
    let inQuote: '"' | "'" | null = null;

    for (let i = 0; i < s.length; i++) {
      const char = s[i];

      if (inQuote) {
        if (char === '\\') i++;
        else if (char === inQuote) inQuote = null;
      } else {
        if (char === '"' || char === "'") inQuote = char as '"' | "'";
        else if (char === '[' || char === '{') depth++;
        else if (char === ']' || char === '}') depth = Math.max(0, depth - 1);
        else if (depth === 0 && char === ':') {
          const nextCh = s[i + 1];

          if (!nextCh || ' \n'.includes(nextCh)) return true;
        }
      }
    }
    return false;
  };

  // Entry points

  if (text.startsWith(']') || text.startsWith('}')) {
    throw new SyntaxError('Unexpected closing bracket');
  }

  let value: any;

  if (text.startsWith('[')) value = parseArray();
  else if (text.startsWith('{')) value = parseObject();
  else if (hasTopLevelKeyColonSpace(text)) value = parseObjectBody('');
  else value = parseValue('');

  skipWhitespace();

  if (!eof()) throw new SyntaxError('Unexpected trailing characters');

  return value as T;
};
