export const isDefined = <T>(value: T | null | undefined): value is T | null =>
  typeof value !== 'undefined';

export const isDefinedAndNotNull = <T>(
  value: T | null | undefined
): value is T => typeof value !== 'undefined' && value !== null;

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isDict = (value: unknown): value is Record<string, unknown> =>
  isObject(value) && !Array.isArray(value);

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isFunction = (value: unknown): boolean =>
  typeof value === 'function';

export const equals = (o1: unknown, o2: unknown): boolean => {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;

  const keys1 = Object.keys(o1 as object);
  const keys2 = Object.keys(o2 as object);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!Object.hasOwn(o2, key)) return false;
    if (!equals((o1 as any)[key], (o2 as any)[key])) return false;
  }

  return true;
};

export const mergeDeep = (target: any, source: any): any => {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (isDict(source[key])) {
      if (!(key in target)) {
        Object.assign(output, { [key]: source[key] });
      } else {
        output[key] = mergeDeep(target[key], source[key]);
      }
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  }

  return output;
};

export const getValue = (target: unknown, key: string): unknown => {
  if (!target || !key) return undefined;
  const keys = key.split('.');
  let current: any = target;

  for (const k of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[k];
  }

  return current;
};

export const insertValue = <T>(
  target: Readonly<T>,
  key: string,
  value: unknown
): T => {
  const keys = key.split('.');
  const result: any = Array.isArray(target)
    ? [...target]
    : { ...(target as any) };
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    current[k] = current[k] ? { ...current[k] } : {};
    current = current[k];
  }

  current[keys[keys.length - 1]] = value;
  return result;
};
