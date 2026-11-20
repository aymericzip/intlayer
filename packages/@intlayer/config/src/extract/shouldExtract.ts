/** SVG path commands, numbers, separators and exponents only. */
const SVG_PATH_DATA_REGEX = /^[MmZzLlHhVvCcSsQqTtAa\d\s.,eE+-]+$/;

/**
 * JS/TS keywords that join code fragments; a template made of placeholders and
 * only these (`{{name}} as {{alias}}`) is generated code, not text.
 */
const CODE_CONNECTOR_KEYWORDS = new Set<string>([
  'as',
  'from',
  'import',
  'export',
  'require',
  'extends',
  'implements',
  'typeof',
  'instanceof',
  'keyof',
]);

/** Generated statements and comments (`import x from 'y';`, `/** … *\/`). */
const CODE_STATEMENT_REGEX =
  /^(?:\/\*|\/\/|(?:import|export|const|let|var)\s|module\.exports\b|require\()/;

/** A string ending in a CSS rule block (`selector { prop: value; }`). */
const CSS_RULE_REGEX = /\S\s+\{[^{}]*\}\s*$/;

/** A whole value wrapped in a CSS function (`calc(100% + 4px)`, `inset(0 4px)`). */
const CSS_FUNCTION_VALUE_REGEX =
  /^-?[a-z][a-z-]*\([^()]*(\([^()]*\)[^()]*)*\)$/;

/** A number with a CSS unit (`200ms`, `1.5rem`, `-2px`, `50%`). */
const CSS_LENGTH_TOKEN_REGEX =
  /^-?\d*\.?\d+(?:px|r?em|ms|s|%|v[hw]|dv[hw]|deg|fr|ch)$/;

/** A lowercase CSS keyword, number, hex color or function (`ease-in-out`, `#fff`). */
const CSS_VALUE_TOKEN_REGEX =
  /^(?:-?\d*\.?\d+[a-z%]*|[a-z][a-z-]*|#[\da-f]{3,8}|[a-z-]+\([^()]*\)),?$/i;

/**
 * Checks whether the given text should be extracted as a translatable string.
 *
 * Proper nouns and brand names cannot be told apart from labels here; exclude
 * them with the comment directives read by `getExtractionIgnoreDirectives`.
 *
 * Filters out:
 * - Empty strings
 * - Emails
 * - One or two character strings
 * - Strings without letters and SVG path data (`viewBox`, `d`)
 * - All-uppercase strings: acronyms, tickers, constants (`MAJ BTC MTACP`)
 * - Uncapitalized strings of 2 words or fewer (likely technical terms)
 * - Generated code (`import x from 'y';`, `{{name}} as {{alias}}`, comments)
 * - CSS rules, shorthand values and function values (`calc(…)`, `a { b: c; }`)
 * - Dynamic content patterns like Vue bindings (`v-`) or object patterns (`{`)
 */
export const shouldExtract = (text: string): boolean => {
  const trimmed = text.trim();

  if (!trimmed) return false;

  // Ignore emails
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;

  // Ignore dynamic content patterns, but allow {{placeholder}} which is intlayer's insertion format
  if (
    (trimmed.startsWith('{') && !trimmed.startsWith('{{')) ||
    trimmed.startsWith('v-')
  )
    return false;

  // Ignore one or two character strings (`'L' : 'M'`, `px`, `OK`)
  if (trimmed.length <= 2) return false;

  // Ignore strings without any letter (`0 0 24 24`, `100%`, `12:30`)
  // (`{{placeholder}}` insertions do not count: `0 0 {{width}} {{height}}`)
  const withoutPlaceholders = trimmed.replace(/\{\{[^}]*\}\}/g, '');
  if (!/\p{L}/u.test(withoutPlaceholders)) return false;

  // Ignore all-uppercase strings: acronyms, tickers, constants (`MAJ BTC MTACP`)
  // (scripts without case, like CJK, have no `\p{Lu}` and are unaffected)
  if (
    /\p{Lu}/u.test(withoutPlaceholders) &&
    !/\p{Ll}/u.test(withoutPlaceholders)
  )
    return false;

  // Ignore SVG path data (`M5 46C5 21.1 25.1 1 50 1H295Z`)
  if (/^[Mm]\s*[\d.-]/.test(trimmed) && SVG_PATH_DATA_REGEX.test(trimmed))
    return false;

  // Ignore explicit code patterns (markers)
  if (
    trimmed.includes('=>') ||
    trimmed.includes(');') ||
    trimmed.includes('(){') ||
    trimmed.includes('==') ||
    trimmed.includes('window.') ||
    trimmed.startsWith('(function') ||
    trimmed.startsWith('function(') ||
    trimmed.endsWith(';') ||
    CODE_STATEMENT_REGEX.test(trimmed)
  ) {
    return false;
  }

  // Ignore CSS (`[data-x]::selection { color: red; }`, `calc(100% + {{x}})`)
  if (
    trimmed.includes('!important') ||
    CSS_FUNCTION_VALUE_REGEX.test(trimmed) ||
    (CSS_RULE_REGEX.test(withoutPlaceholders) &&
      /[:;]/.test(withoutPlaceholders))
  )
    return false;

  // Ignore CSS shorthand values (`width 200ms ease-in-out`, `1px solid #ccc`)
  const valueTokens = trimmed.split(/\s+/);
  if (
    valueTokens.length > 1 &&
    valueTokens.some((token) =>
      CSS_LENGTH_TOKEN_REGEX.test(token.replace(/,$/, ''))
    ) &&
    valueTokens.every(
      (token) =>
        CSS_VALUE_TOKEN_REGEX.test(token) && token === token.toLowerCase()
    )
  )
    return false;

  // Ignore templates whose only words are code keywords (`{{name}} as {{alias}}`)
  const staticWords = trimmed
    .replace(/\{\{[^}]*\}\}/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  if (
    trimmed.includes('{{') &&
    staticWords.every((word) => CODE_CONNECTOR_KEYWORDS.has(word))
  )
    return false;

  // Heuristic: check for characters that are common in code but rare in natural text.
  // Whitelist: letters, numbers, spaces, and frequent text symbols (including punctuation, braces, and technical symbols)
  const nonTextualRegex =
    /[^\p{L}\p{N}\s.,!?;:'"()[\]{}–—/«»„“\p{Sc}%&*+#@^_+=<>/~]/gu;
  const nonTextualMatches = trimmed.match(nonTextualRegex) || [];

  // If a string contains a high density of truly exceptional symbols (like |, \, etc.),
  // it is highly likely to be code or complex technical data.
  if (nonTextualMatches.length > 5) return false;

  const wordCount = trimmed.split(/\s+/).length;

  // Ignore CSS/Tailwind utility class strings. A string whose tokens all look
  // like CSS utility classes (lowercase, optional responsive/state prefix like
  // "sm:" or "hover:", optional hyphenated suffix like "-4" or "-full") and
  // where at least one token contains a hyphen is almost certainly a className
  // value, not translatable text. Tailwind arbitrary values (`border-[1.3px]`,
  // `[corner-shape:squircle]`, `supports-[…]:`) are reduced to `x` first.
  const cssClassTokenRegex =
    /^!?([a-z0-9*@-]+:)*-?[a-z][a-z0-9.-]*(\/[a-z0-9.]+)?!?$/;
  const toCssClassToken = (token: string): string =>
    token.replace(/\[[^\]]*\]/g, 'x');
  if (wordCount > 1) {
    const tokens = trimmed.split(/\s+/);
    if (
      tokens.every((token) =>
        cssClassTokenRegex.test(toCssClassToken(token))
      ) &&
      tokens.some((token) => token.includes('-'))
    ) {
      return false;
    }
  }

  // Check if starts with a capital letter (including after an opening parenthesis/quote)
  const isCapitalized = /^['"([]*\p{Lu}/u.test(trimmed);

  // Single capitalized words ("Save", "Settings") are extracted. Proper nouns
  // ("John", "Intlayer") are excluded with the `intlayer-ignore-line` /
  // `intlayer-ignore-next-line` comment directives (see `ignoreDirectives`).

  // Ignore technical identifiers (one word strings with camelCase, kebab-case, snake_case etc.)
  if (wordCount === 1) {
    // CamelCase or internal capitals (like camelCaseProperty or CamelCaseProperty)
    if (/[a-z]\p{Lu}/u.test(trimmed)) return false;
    // kebab-case or snake_case
    if (trimmed.includes('-') || trimmed.includes('_')) return false;
  }

  // We usually want to extract full sentences or labels, not single/short technical words.
  // Extract if capitalized, or if it contains more than 2 words.
  if (!isCapitalized && wordCount <= 2) return false;

  return true;
};
