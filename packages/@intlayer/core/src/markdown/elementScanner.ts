/**
 * Lean, non-backtracking element scanner for HTML blocks, custom components, and self-closing tags.
 */

const findTagEnd = (source: string, from: number): number => {
  const len = source.length;
  let pos = from;
  while (pos < len) {
    const code = source.charCodeAt(pos);
    if (code === 62) return pos; // '>'
    if (code === 34 || code === 39) {
      // '"' or "'"
      let cur = pos + 1;
      while (
        cur < len &&
        source.charCodeAt(cur) !== code &&
        source.charCodeAt(cur) !== 10
      )
        cur++;
      pos = source.charCodeAt(cur) === code ? cur + 1 : pos + 1;
      continue;
    }
    pos++;
  }
  return -1;
};

const findTag = (
  source: string,
  needle: string,
  from: number,
  caseInsensitive: boolean
): number => {
  if (!caseInsensitive) return source.indexOf(needle, from);
  const nLen = needle.length;
  const max = source.length - nLen;
  let pos = from;
  while (pos <= max) {
    const idx = source.indexOf('<', pos);
    if (idx === -1 || idx > max) return -1;
    if (source.slice(idx, idx + nLen).toLowerCase() === needle) return idx;
    pos = idx + 1;
  }
  return -1;
};

const makeMatch = (
  source: string,
  end: number,
  tagName: string,
  attrs?: string,
  content?: string
): RegExpMatchArray => {
  const result = [
    source.slice(0, end),
    tagName,
    attrs,
    content,
  ] as unknown as RegExpMatchArray;
  result.index = 0;
  result.input = source;
  return result;
};

/** ASCII letter or digit — the characters a tag name is built from. */
const isNameChar = (code: number): boolean =>
  (code >= 97 && code <= 122) ||
  (code >= 65 && code <= 90) ||
  (code >= 48 && code <= 57);

const skipLeadingSpaces = (source: string): number => {
  let i = 0;
  while (source.charCodeAt(i) === 32) i++;
  return source.charCodeAt(i) === 60 ? i : -1;
};

export const matchElement = (
  source: string,
  customComponent: boolean
): RegExpMatchArray | null => {
  const bracket = skipLeadingSpaces(source);
  if (bracket === -1) return null;

  const nameStart = bracket + 1;
  let nameEnd = nameStart;
  const first = source.charCodeAt(nameStart);

  if (customComponent) {
    if (first < 65 || first > 90) return null; // [A-Z]
    while (nameEnd < source.length && isNameChar(source.charCodeAt(nameEnd)))
      nameEnd++;
  } else {
    if (!((first >= 65 && first <= 90) || (first >= 97 && first <= 122)))
      return null;
    while (nameEnd < source.length) {
      const c = source.charCodeAt(nameEnd);
      if (c === 32 || c === 9 || c === 10 || c === 13 || c === 62 || c === 47)
        break;
      nameEnd++;
    }
  }

  const tagName = source.slice(nameStart, nameEnd);
  const openTagEnd = findTagEnd(source, nameEnd);
  if (openTagEnd === -1) return null;
  if (!customComponent && source.charCodeAt(openTagEnd - 1) === 47) return null;

  let contentStart = openTagEnd + 1;
  if (source.charCodeAt(contentStart) === 10) contentStart++;

  const openTag = `<${tagName}`;
  const closeTag = `</${tagName}`;
  const openTagLower = openTag.toLowerCase();
  const closeTagLower = closeTag.toLowerCase();

  let depth = 1;
  let cursor = contentStart;
  const len = source.length;
  let contentEnd = -1;
  let end = -1;

  while (cursor < len) {
    const openIdx = findTag(
      source,
      customComponent ? openTag : openTagLower,
      cursor,
      !customComponent
    );
    const closeIdx = findTag(
      source,
      customComponent ? closeTag : closeTagLower,
      cursor,
      !customComponent
    );

    if (closeIdx === -1) return null;

    if (openIdx !== -1 && openIdx < closeIdx) {
      const next = source.charCodeAt(openIdx + openTag.length);
      if (
        next === 32 ||
        next === 9 ||
        next === 10 ||
        next === 13 ||
        next === 62 ||
        next === 47
      ) {
        const nestedEnd = findTagEnd(source, openIdx + openTag.length);
        if (nestedEnd === -1) return null;
        depth++;
        cursor = nestedEnd + 1;
      } else {
        cursor = openIdx + 1;
      }
      continue;
    }

    if (source.charCodeAt(closeIdx + closeTag.length) !== 62) {
      cursor = closeIdx + 1;
      continue;
    }

    const closeTagEnd = closeIdx + closeTag.length + 1;
    depth--;

    if (depth > 0) {
      cursor = closeTagEnd;
      continue;
    }

    // (?!</\1>)
    if (
      findTag(
        source,
        customComponent ? closeTag : closeTagLower,
        closeTagEnd,
        !customComponent
      ) === closeTagEnd &&
      source.charCodeAt(closeTagEnd + closeTag.length) === 62
    ) {
      depth = 1;
      cursor = closeTagEnd;
      continue;
    }

    contentEnd = closeIdx;
    end = closeTagEnd;
    break;
  }

  if (end === -1) return null;
  while (source.charCodeAt(end) === 10) end++;

  return makeMatch(
    source,
    end,
    tagName,
    source.slice(nameEnd, openTagEnd),
    source.slice(contentStart, contentEnd)
  );
};

export const matchSelfClosingElement = (
  source: string
): RegExpMatchArray | null => {
  const bracket = skipLeadingSpaces(source);
  if (bracket === -1) return null;

  const nameStart = bracket + 1;
  const first = source.charCodeAt(nameStart);
  if (!((first >= 65 && first <= 90) || (first >= 97 && first <= 122)))
    return null;

  let nameEnd = nameStart + 1;
  while (
    nameEnd < source.length &&
    (isNameChar(source.charCodeAt(nameEnd)) ||
      source.charCodeAt(nameEnd) === 58) /* : */
  )
    nameEnd++;

  const c = source.charCodeAt(nameEnd);
  const hasAttrs = c === 32 || c === 9 || c === 10 || c === 13;
  let tagEnd: number;

  if (hasAttrs) {
    tagEnd = findTagEnd(source, nameEnd);
    if (tagEnd === -1) return null;
  } else {
    tagEnd = source.charCodeAt(nameEnd) === 47 ? nameEnd + 1 : nameEnd;
    if (source.charCodeAt(tagEnd) !== 62) return null;
  }

  const tagName = source.slice(nameStart, nameEnd);
  const closeTag = `</${tagName.toLowerCase()}>`;
  const tailStart = tagEnd + 1;

  if (
    source.slice(tailStart, tailStart + closeTag.length).toLowerCase() ===
    closeTag
  ) {
    return null;
  }

  let end = tailStart;
  let scan = tailStart;
  while (scan < source.length) {
    const sc = source.charCodeAt(scan);
    if (sc !== 32 && sc !== 9 && sc !== 10 && sc !== 13) break;
    scan++;
    if (source.charCodeAt(scan - 1) === 10) end = scan;
  }

  return makeMatch(
    source,
    end,
    tagName,
    hasAttrs ? source.slice(nameEnd + 1, tagEnd) : undefined,
    end > tailStart ? source.slice(tailStart, end) : undefined
  );
};

export const matchHtmlBlockElement = (source: string) =>
  matchElement(source, false);
export const matchCustomComponent = (source: string) =>
  matchElement(source, true);
export const startsWithHtmlBlockElement = (source: string) =>
  matchHtmlBlockElement(source) !== null;
export const startsWithSelfClosingElement = (source: string) =>
  matchSelfClosingElement(source) !== null;
export const startsWithCustomComponent = (source: string) =>
  matchCustomComponent(source) !== null;
export const startsWithElement = (source: string) =>
  startsWithHtmlBlockElement(source) || startsWithSelfClosingElement(source);
