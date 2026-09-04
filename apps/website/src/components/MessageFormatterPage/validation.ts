import type { FormatterDialect, SyntaxValidationResult } from './types';

/**
 * Validates ICU MessageFormat syntax.
 */
export const validateICUMessage = (text: string): SyntaxValidationResult => {
  if (!text.trim()) {
    return { isValid: true };
  }

  // 1. Check for unclosed single quotes (which cause the rest of message to be literal)
  const singleQuotesCount = (text.match(/'/g) || []).length;
  // If odd number of single quotes, there's likely an unclosed single quote
  if (singleQuotesCount % 2 !== 0) {
    return {
      isValid: false,
      errorMessage:
        "Unclosed single quote detected. In ICU MessageFormat, use double single-quotes ('') to output a literal apostrophe, or close the quote.",
    };
  }

  // 2. Check balanced braces while taking quotes into account
  let depth = 0;
  let inQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === "'") {
      // Check for doubled quote ''
      if (i + 1 < text.length && text[i + 1] === "'") {
        i++; // skip next quote
        continue;
      }
      inQuote = !inQuote;
      continue;
    }

    if (!inQuote) {
      if (char === '{') {
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth < 0) {
          return {
            isValid: false,
            errorMessage: 'Unexpected closing brace "}" without opening brace.',
          };
        }
      }
    }
  }

  if (depth > 0) {
    return {
      isValid: false,
      errorMessage: `Unclosed curly brace "{" detected (${depth} unclosed brace${depth > 1 ? 's' : ''}).`,
    };
  }

  // 3. Validate plural statement requires 'other' clause
  if (/,\s*plural\s*,/i.test(text)) {
    if (!/\bother\s*\{/i.test(text)) {
      return {
        isValid: false,
        errorMessage:
          'ICU plural requires an "other" case: {count, plural, one {...} other {...}}.',
      };
    }
  }

  // 4. Validate select statement requires 'other' clause
  if (/,\s*select\s*,/i.test(text)) {
    if (!/\bother\s*\{/i.test(text)) {
      return {
        isValid: false,
        errorMessage:
          'ICU select requires an "other" fallback branch: {gender, select, male {...} female {...} other {...}}.',
      };
    }
  }

  // 5. Validate selectordinal requires 'other' clause
  if (/,\s*selectordinal\s*,/i.test(text)) {
    if (!/\bother\s*\{/i.test(text)) {
      return {
        isValid: false,
        errorMessage:
          'ICU selectordinal requires an "other" branch: {rank, selectordinal, one {#st} other {#th}}.',
      };
    }
  }

  return { isValid: true };
};

/**
 * Validates i18next syntax (double curly braces and optional JSON structure).
 */
export const validateI18nextMessage = (
  text: string
): SyntaxValidationResult => {
  const trimmed = text.trim();
  if (!trimmed) {
    return { isValid: true };
  }

  // If JSON dictionary
  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    try {
      JSON.parse(trimmed);
    } catch (e: unknown) {
      return {
        isValid: false,
        errorMessage: `Invalid JSON syntax: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  // Check balanced double curly braces {{ ... }}
  const openCount = (text.match(/\{\{/g) || []).length;
  const closeCount = (text.match(/\}\}/g) || []).length;

  if (openCount !== closeCount) {
    return {
      isValid: false,
      errorMessage: `Mismatched double braces: found ${openCount} opening "{{", but ${closeCount} closing "}}".`,
    };
  }

  // Check for unclosed $t(...)
  const nestingOpen = (text.match(/\$t\(/g) || []).length;
  const nestingClose = (text.match(/\$t\([^)]*\)/g) || []).length;
  if (nestingOpen !== nestingClose) {
    return {
      isValid: false,
      errorMessage: 'Unclosed $t(...) nesting reference.',
    };
  }

  return { isValid: true };
};

/**
 * Validates Vue i18n syntax.
 */
export const validateVueI18nMessage = (
  text: string
): SyntaxValidationResult => {
  const trimmed = text.trim();
  if (!trimmed) {
    return { isValid: true };
  }

  // If JSON dictionary
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      JSON.parse(trimmed);
    } catch (e: unknown) {
      return {
        isValid: false,
        errorMessage: `Invalid JSON syntax: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  // Check balanced single curly braces (excluding escaped literal braces {'{'} or {'}'})
  const clean = text.replace(/\{\s*['"](?:\{|\})['"]\s*\}/g, '');
  const openCount = (clean.match(/\{/g) || []).length;
  const closeCount = (clean.match(/\}/g) || []).length;

  if (openCount !== closeCount) {
    return {
      isValid: false,
      errorMessage: `Mismatched braces: found ${openCount} opening "{", but ${closeCount} closing "}".`,
    };
  }

  // Check pipe delimiter
  if (text.includes('|')) {
    const parts = text.split('|');
    if (parts.some((p) => p.trim().length === 0)) {
      return {
        isValid: false,
        errorMessage:
          'Empty plural choice segment detected around "|" pipe delimiter.',
      };
    }
  }

  return { isValid: true };
};

/**
 * Validates GNU Gettext PO message entry.
 */
export const validatePOMessage = (text: string): SyntaxValidationResult => {
  const trimmed = text.trim();
  if (!trimmed) {
    return { isValid: true };
  }

  // Check matching quotes
  const quoteCount = (text.match(/"/g) || []).length;
  if (quoteCount % 2 !== 0) {
    return {
      isValid: false,
      errorMessage: 'Mismatched double quotes in PO string.',
    };
  }

  // Check required msgid if it is a PO block
  if (text.includes('msgstr') && !text.includes('msgid')) {
    return {
      isValid: false,
      errorMessage: 'PO file entry requires a "msgid" before "msgstr".',
    };
  }

  // Check plural matching
  if (text.includes('msgid_plural') && !text.includes('msgstr[')) {
    return {
      isValid: false,
      errorMessage:
        'When "msgid_plural" is defined, indexed plural translations like "msgstr[0]" and "msgstr[1]" are required.',
    };
  }

  return { isValid: true };
};

/**
 * Dispatches validation to dialect validator.
 */
export const validateMessageSyntax = (
  text: string,
  dialect: FormatterDialect
): SyntaxValidationResult => {
  switch (dialect) {
    case 'icu':
      return validateICUMessage(text);
    case 'i18next':
      return validateI18nextMessage(text);
    case 'vue-i18n':
      return validateVueI18nMessage(text);
    case 'po':
      return validatePOMessage(text);
    default:
      return { isValid: true };
  }
};
