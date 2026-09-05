/**
 * Linear scanners for the element rules that used to be backtracking regexes:
 * raw HTML blocks, PascalCase custom components, and self-closing tags.
 *
 * The paired-element regexes expressed "content up to the matching close tag"
 * as `(?:<\1[^>]*?>[\s\S]*?</\1>|(?!<\1\b)[\s\S])*?`. That alternation gives
 * the engine two ways to consume almost every character and was retried at
 * every block boundary, so a document holding many elements cost O(n²). These
 * scanners walk the source once, using `indexOf` (SIMD-backed in V8) to jump
 * between candidate tags and a depth counter to pair them.
 *
 * Captures keep the regexes' shape so rules swap matcher without touching
 * `_parse`: `[full, tagName, attributes, innerContent]`.
 */

const CHAR_TAB = 9;
const CHAR_NEWLINE = 10;
const CHAR_FORM_FEED = 12;
const CHAR_CARRIAGE_RETURN = 13;
const CHAR_SPACE = 32;
const CHAR_QUOTE_DOUBLE = 34;
const CHAR_QUOTE_SINGLE = 39;
const CHAR_SLASH = 47;
const CHAR_COLON = 58;
const CHAR_LT = 60;
const CHAR_GT = 62;
const CHAR_UPPER_A = 65;
const CHAR_UPPER_Z = 90;
const CHAR_LOWER_A = 97;
const CHAR_LOWER_Z = 122;
const CHAR_CASE_OFFSET = 32;

const isWhitespace = (code: number): boolean =>
  code === CHAR_SPACE ||
  code === CHAR_TAB ||
  code === CHAR_NEWLINE ||
  code === CHAR_CARRIAGE_RETURN ||
  code === CHAR_FORM_FEED;

const isLetter = (code: number): boolean =>
  (code >= CHAR_UPPER_A && code <= CHAR_UPPER_Z) ||
  (code >= CHAR_LOWER_A && code <= CHAR_LOWER_Z);

const isDigit = (code: number): boolean => code >= 48 && code <= 57;

/**
 * `indexOf` for a needle that always starts with `<`, optionally
 * case-insensitive. Even case-insensitively the native `indexOf` finds the
 * candidate positions, and only the tail is compared by hand.
 */
const indexOfTag = (
  source: string,
  needle: string,
  from: number,
  caseInsensitive: boolean
): number => {
  if (!caseInsensitive) return source.indexOf(needle, from);

  const needleLength = needle.length;
  const lastStart = source.length - needleLength;
  let position = from;

  while (position <= lastStart) {
    const found = source.indexOf('<', position);
    if (found === -1 || found > lastStart) return -1;

    let matches = true;
    for (let offset = 1; offset < needleLength; offset++) {
      let left = source.charCodeAt(found + offset);
      let right = needle.charCodeAt(offset);
      if (left >= CHAR_UPPER_A && left <= CHAR_UPPER_Z)
        left += CHAR_CASE_OFFSET;
      if (right >= CHAR_UPPER_A && right <= CHAR_UPPER_Z)
        right += CHAR_CASE_OFFSET;
      if (left !== right) {
        matches = false;
        break;
      }
    }

    if (matches) return found;
    position = found + 1;
  }

  return -1;
};

/**
 * Walks an opening tag from its attributes to the closing `>`, mirroring the
 * attribute grammar of the replaced regexes: a quoted value may hold `>` but
 * not span lines, an unclosed quote is read as an ordinary character, and a
 * `<…>` run is skipped whole. Returns -1 when the tag never closes.
 */
const findTagEnd = (source: string, from: number): number => {
  const length = source.length;
  let position = from;

  while (position < length) {
    const code = source.charCodeAt(position);

    if (code === CHAR_GT) return position;

    if (code === CHAR_QUOTE_DOUBLE || code === CHAR_QUOTE_SINGLE) {
      let cursor = position + 1;
      while (cursor < length) {
        const inner = source.charCodeAt(cursor);
        if (inner === code || inner === CHAR_NEWLINE) break;
        cursor++;
      }
      // An unclosed quote falls back to the grammar's lone `["']` alternative,
      // which is what keeps `<Tab label=don't>` parsing.
      position = source.charCodeAt(cursor) === code ? cursor + 1 : position + 1;
      continue;
    }

    if (code === CHAR_LT) {
      let cursor = position + 1;
      while (cursor < length && source.charCodeAt(cursor) !== CHAR_GT) {
        if (source.charCodeAt(cursor) === CHAR_NEWLINE) return -1;
        cursor++;
      }
      if (cursor >= length) return -1;
      position = cursor + 1;
      continue;
    }

    position++;
  }

  return -1;
};

/** The closing tag at `index` is exactly `</tag>`, as the regexes' `</\1>` was. */
const closesExactly = (
  source: string,
  index: number,
  closeTagLength: number
): boolean => source.charCodeAt(index + closeTagLength) === CHAR_GT;

/** Skips `^ *` and returns the position of the element's `<`, or -1. */
const openingBracket = (source: string): number => {
  let position = 0;
  while (source.charCodeAt(position) === CHAR_SPACE) position++;

  return source.charCodeAt(position) === CHAR_LT ? position : -1;
};

const capture = (
  source: string,
  end: number,
  tagName: string,
  attributes: string | undefined,
  content: string | undefined
): RegExpMatchArray => {
  const result = [
    source.slice(0, end),
    tagName,
    attributes,
    content,
  ] as unknown as RegExpMatchArray;

  result.index = 0;
  result.input = source;

  return result;
};

/**
 * Matches a paired element at the start of `source`.
 *
 * `customComponent` restricts the tag to PascalCase and pairs it
 * case-sensitively, which is how the custom-component rule behaves; raw HTML
 * pairs case-insensitively and rejects a self-closing opener outright.
 */
export const matchElement = (
  source: string,
  customComponent: boolean
): RegExpMatchArray | null => {
  const length = source.length;
  const bracket = openingBracket(source);
  if (bracket === -1) return null;

  const nameStart = bracket + 1;
  const first = source.charCodeAt(nameStart);
  let nameEnd = nameStart + 1;

  if (customComponent) {
    // `[A-Z][a-zA-Z0-9]*`
    if (first < CHAR_UPPER_A || first > CHAR_UPPER_Z) return null;
    while (
      isLetter(source.charCodeAt(nameEnd)) ||
      isDigit(source.charCodeAt(nameEnd))
    )
      nameEnd++;
  } else {
    // `[a-zA-Z][^ >/]*`, ended at any whitespace rather than a space alone:
    // the regex only tolerated a newline inside the name because backtracking
    // gave it back, and a forward scan has to stop where the name really ends.
    if (!isLetter(first)) return null;
    while (nameEnd < length) {
      const code = source.charCodeAt(nameEnd);
      if (isWhitespace(code) || code === CHAR_GT || code === CHAR_SLASH) break;
      nameEnd++;
    }
  }

  const tagName = source.slice(nameStart, nameEnd);
  const openTagEnd = findTagEnd(source, nameEnd);
  if (openTagEnd === -1) return null;
  if (!customComponent && source.charCodeAt(openTagEnd - 1) === CHAR_SLASH) {
    return null;
  }

  // `>\n?`
  let contentStart = openTagEnd + 1;
  if (source.charCodeAt(contentStart) === CHAR_NEWLINE) contentStart++;

  const openTag = `<${tagName}`;
  const closeTag = `</${tagName}`;
  const anyCase = !customComponent;

  let depth = 1;
  let cursor = contentStart;
  let contentEnd = -1;
  let end = -1;

  while (cursor < length) {
    const openIndex = indexOfTag(source, openTag, cursor, anyCase);
    const closeIndex = indexOfTag(source, closeTag, cursor, anyCase);

    if (closeIndex === -1) return null;

    if (openIndex !== -1 && openIndex < closeIndex) {
      // A nested opener of the same name. The regexes counted these with
      // `<\1[^>]*?>`, which does not exclude self-closing tags, so nor does this.
      const nestedNameEnd = openIndex + openTag.length;
      const next = source.charCodeAt(nestedNameEnd);

      if (isWhitespace(next) || next === CHAR_GT || next === CHAR_SLASH) {
        const nestedEnd = findTagEnd(source, nestedNameEnd);
        if (nestedEnd === -1) return null;
        depth++;
        cursor = nestedEnd + 1;
      } else {
        cursor = openIndex + 1;
      }
      continue;
    }

    if (!closesExactly(source, closeIndex, closeTag.length)) {
      cursor = closeIndex + 1;
      continue;
    }

    const closeTagEnd = closeIndex + closeTag.length + 1;
    depth--;

    if (depth > 0) {
      cursor = closeTagEnd;
      continue;
    }

    // `(?!</\1>)`: a close immediately followed by another belongs to an outer
    // element, so keep looking for the real one.
    if (
      indexOfTag(source, closeTag, closeTagEnd, anyCase) === closeTagEnd &&
      closesExactly(source, closeTagEnd, closeTag.length)
    ) {
      depth = 1;
      cursor = closeTagEnd;
      continue;
    }

    contentEnd = closeIndex;
    end = closeTagEnd;
    break;
  }

  if (end === -1) return null;

  // `\n*`
  while (source.charCodeAt(end) === CHAR_NEWLINE) end++;

  return capture(
    source,
    end,
    tagName,
    source.slice(nameEnd, openTagEnd),
    source.slice(contentStart, contentEnd)
  );
};

/**
 * Matches a void or self-closing element — `<br>`, `<img src="…"/>` — that is
 * not immediately followed by its own closing tag.
 *
 * Captures `[full, tagName, attributes, trailingBlankLine]`.
 */
export const matchSelfClosingElement = (
  source: string
): RegExpMatchArray | null => {
  const length = source.length;
  const bracket = openingBracket(source);
  if (bracket === -1) return null;

  const nameStart = bracket + 1;
  if (!isLetter(source.charCodeAt(nameStart))) return null;

  // `[a-zA-Z][a-zA-Z0-9:]*`
  let nameEnd = nameStart + 1;
  while (nameEnd < length) {
    const code = source.charCodeAt(nameEnd);
    if (!isLetter(code) && !isDigit(code) && code !== CHAR_COLON) break;
    nameEnd++;
  }

  // `(?:\s+(attributes))?\/?>`: attributes exist only when whitespace follows
  // the name. Without them the tag has to close immediately — otherwise
  // `<https://google.com>` would read as a `<https:>` element instead of
  // falling through to the autolink rule.
  const hasAttributes = isWhitespace(source.charCodeAt(nameEnd));
  let tagEnd: number;

  if (hasAttributes) {
    tagEnd = findTagEnd(source, nameEnd);
    if (tagEnd === -1) return null;
  } else {
    tagEnd = source.charCodeAt(nameEnd) === CHAR_SLASH ? nameEnd + 1 : nameEnd;
    if (source.charCodeAt(tagEnd) !== CHAR_GT) return null;
  }

  const tagName = source.slice(nameStart, nameEnd);
  const closeTag = `</${tagName}`;
  const tailStart = tagEnd + 1;

  // `(?!</\1>)`
  if (
    indexOfTag(source, closeTag, tailStart, true) === tailStart &&
    closesExactly(source, tailStart, closeTag.length)
  ) {
    return null;
  }

  // `(\s*\n)?`: `\s` spans line breaks and the group is greedy, so this takes
  // the whole trailing whitespace run up to and including its final newline.
  let end = tailStart;
  let scan = tailStart;
  while (scan < length && isWhitespace(source.charCodeAt(scan))) {
    scan++;
    if (source.charCodeAt(scan - 1) === CHAR_NEWLINE) end = scan;
  }

  return capture(
    source,
    end,
    tagName,
    // The run reaches the `>`, a trailing `/` included, as the regex captured it.
    hasAttributes ? source.slice(nameEnd + 1, tagEnd) : undefined,
    end > tailStart ? source.slice(tailStart, end) : undefined
  );
};

/** Matcher for the raw HTML block rule. */
export const matchHtmlBlockElement = (
  source: string
): RegExpMatchArray | null => matchElement(source, false);

/** Matcher for the PascalCase custom component rule. */
export const matchCustomComponent = (source: string): RegExpMatchArray | null =>
  matchElement(source, true);

/** Block-syntax probe: does a raw HTML element start the input? */
export const startsWithHtmlBlockElement = (source: string): boolean =>
  matchElement(source, false) !== null;

/** Block-syntax probe: does a self-closing element start the input? */
export const startsWithSelfClosingElement = (source: string): boolean =>
  matchSelfClosingElement(source) !== null;

/** Block-syntax probe: does a custom component start the input? */
export const startsWithCustomComponent = (source: string): boolean =>
  matchElement(source, true) !== null;

/**
 * True when a value opens an element this scanner can read, i.e. it looks like
 * raw HTML. Decides whether an attribute value is itself parsed as markdown.
 */
export const startsWithElement = (source: string): boolean =>
  matchElement(source, false) !== null ||
  matchSelfClosingElement(source) !== null;
