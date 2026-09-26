import { navigatePath } from '@intlayer/core/messageFormat';

type PlainObject = Record<string, unknown>;

export const isDefined = <T>(value: T | null | undefined): value is T | null =>
  typeof value !== 'undefined';

export const isDefinedAndNotNull = <T>(
  value: T | null | undefined
): value is T => typeof value !== 'undefined' && value !== null;

export const isObject = (value: unknown): value is PlainObject =>
  typeof value === 'object' && value !== null;

export const isDict = (value: unknown): value is PlainObject =>
  isObject(value) && !Array.isArray(value);

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isFunction = (
  value: unknown
): value is (...args: unknown[]) => unknown => typeof value === 'function';

/** Deep structural equality over plain objects and arrays. */
export const equals = (first: unknown, second: unknown): boolean => {
  if (first === second) return true;
  if (!isObject(first) || !isObject(second)) return false;
  if (Array.isArray(first) !== Array.isArray(second)) return false;

  const firstKeys = Object.keys(first);
  if (firstKeys.length !== Object.keys(second).length) return false;

  return firstKeys.every(
    (key) => Object.hasOwn(second, key) && equals(first[key], second[key])
  );
};

/** Merges `source` into `target` recursively, returning a new object. */
export const mergeDeep = <T>(target: T, source: unknown): T => {
  if (!isDict(target) || !isDict(source)) return source as T;

  const output: PlainObject = { ...target };

  for (const [key, value] of Object.entries(source)) {
    output[key] =
      isDict(value) && isDict(output[key])
        ? mergeDeep(output[key], value)
        : value;
  }

  return output as T;
};

/**
 * Reads a dotted key, trying the flat key first (`{ 'a.b': … }`) like
 * ngx-translate.
 */
export const getValue = (target: unknown, key: string): unknown =>
  key ? navigatePath(target, key) : undefined;

/** Returns a copy of `target` with `value` written at the dotted `key`. */
export const insertValue = <T>(
  target: Readonly<T>,
  key: string,
  value: unknown
): T => {
  const [head, ...rest] = key.split('.');
  const source: PlainObject = isDict(target) ? target : {};

  return {
    ...source,
    [head as string]: rest.length
      ? insertValue(source[head as string] ?? {}, rest.join('.'), value)
      : value,
  } as T;
};
