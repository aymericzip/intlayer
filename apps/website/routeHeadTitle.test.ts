/* @vitest-environment node */
import { globSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * The only keys TanStack Router reads from a route `head()` result. Anything
 * else — `title` in particular — is dropped without a warning, and the page
 * then inherits the title of the nearest ancestor route, shipping a duplicate
 * `<title>`. The page title belongs in `meta` as `{ title }`.
 *
 * The mistake type-checks, so this test is the only thing that catches it.
 */
const SUPPORTED_HEAD_KEYS = new Set(['meta', 'links', 'scripts', 'styles']);

type ScanState =
  | 'code'
  | 'singleQuote'
  | 'doubleQuote'
  | 'template'
  | 'lineComment'
  | 'blockComment';

/**
 * Blanks out string, template and comment contents so brace depth and property
 * names can be scanned without a full parser. Lengths are not preserved; only
 * the remaining code characters matter here.
 */
const stripLiterals = (source: string): string => {
  let state: ScanState = 'code';
  let output = '';

  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    const next = source[index + 1];

    if (state === 'code') {
      if (char === '\\') continue;
      if (char === "'") state = 'singleQuote';
      else if (char === '"') state = 'doubleQuote';
      else if (char === '`') state = 'template';
      else if (char === '/' && next === '/') state = 'lineComment';
      else if (char === '/' && next === '*') state = 'blockComment';
      else output += char;
      continue;
    }

    if (char === '\\') {
      index++;
      continue;
    }
    if (state === 'singleQuote' && char === "'") state = 'code';
    else if (state === 'doubleQuote' && char === '"') state = 'code';
    else if (state === 'template' && char === '`') state = 'code';
    else if (state === 'lineComment' && char === '\n') {
      state = 'code';
      output += char;
    } else if (state === 'blockComment' && char === '*' && next === '/') {
      state = 'code';
      index++;
    }
  }

  return output;
};

/**
 * Returns the source of the object literal that starts at `openIndex`, which
 * must point at its opening brace.
 */
const readObjectLiteral = (source: string, openIndex: number): string => {
  let depth = 0;

  for (let index = openIndex; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}') {
      depth--;
      if (depth === 0) return source.slice(openIndex, index + 1);
    }
  }

  return source.slice(openIndex);
};

/** Property names declared directly on an object literal, nesting excluded. */
const getTopLevelKeys = (objectLiteral: string): string[] => {
  const keys: string[] = [];
  let depth = 0;
  let identifier = '';
  let isValuePosition = false;

  /** Records the pending identifier when it sits where a key would. */
  const flush = () => {
    if (!isValuePosition && identifier) keys.push(identifier);
    identifier = '';
  };

  for (const char of objectLiteral) {
    if (/[\w$]/.test(char)) {
      identifier += char;
      continue;
    }

    if (char === '{' || char === '[' || char === '(') {
      depth++;
      identifier = '';
    } else if (char === '}' || char === ']' || char === ')') {
      if (depth === 1 && char === '}') flush();
      depth--;
      identifier = '';
      isValuePosition = false;
    } else if (depth !== 1) {
      identifier = '';
    } else if (char === ':') {
      // Also matches a ternary's colon, which `flush` ignores as a value.
      flush();
      isValuePosition = true;
    } else if (char === ',') {
      flush();
      isValuePosition = false;
    } else {
      identifier = '';
    }
  }

  return keys;
};

/** Every object literal a route's `head()` returns, implicit returns included. */
const getHeadReturnObjects = (source: string): string[] => {
  const headIndex = source.indexOf('head:');
  if (headIndex === -1) return [];

  const arrowIndex = source.indexOf('=>', headIndex);
  if (arrowIndex === -1) return [];

  const bodyIndex = source.indexOf('{', arrowIndex);
  if (bodyIndex === -1) return [];

  // `head: () => ({ … })` returns the object the body opens with; a block body
  // returns it from one or more `return` statements instead.
  const isImplicitReturn = source
    .slice(arrowIndex + 2, bodyIndex)
    .trim()
    .endsWith('(');
  if (isImplicitReturn) return [readObjectLiteral(source, bodyIndex)];

  const body = readObjectLiteral(source, bodyIndex);
  const returns: string[] = [];

  for (
    let index = body.indexOf('return {');
    index !== -1;
    index = body.indexOf('return {', index + 1)
  ) {
    returns.push(readObjectLiteral(body, body.indexOf('{', index)));
  }

  return returns;
};

describe('route head()', () => {
  const routeFiles = globSync('src/routes/**/*.tsx');

  it('finds the route files', () => {
    expect(routeFiles.length).toBeGreaterThan(10);
  });

  it.each(routeFiles)('%s returns only keys TanStack reads', (routeFile) => {
    const source = stripLiterals(readFileSync(routeFile, 'utf8'));

    const unsupportedKeys = getHeadReturnObjects(source)
      .flatMap(getTopLevelKeys)
      .filter((key) => !SUPPORTED_HEAD_KEYS.has(key));

    expect(unsupportedKeys).toEqual([]);
  });
});
