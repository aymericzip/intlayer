/**
 * Checks if a string is empty or contains only whitespace.
 *
 * @param value - The value to check
 * @returns True if the value is not a string or is empty/whitespace only
 *
 * @example
 * ```ts
 * isStringEmpty('') // true
 * isStringEmpty('   ') // true
 * isStringEmpty('hello') // false
 * isStringEmpty(123) // true (not a string)
 * isStringEmpty(null) // true
 * ```
 */
export const isStringEmpty = (value: unknown): boolean => {
  if (typeof value !== 'string') {
    return true;
  }

  return value.trim().length === 0;
};

/**
 * Checks if an array is empty or not an array.
 *
 * @param value - The value to check
 * @returns True if the value is not an array or is an empty array
 *
 * @example
 * ```ts
 * isArrayEmpty([]) // true
 * isArrayEmpty([1, 2, 3]) // false
 * isArrayEmpty('not array') // true
 * isArrayEmpty(null) // true
 * ```
 */
export const isArrayEmpty = (value: unknown): boolean => {
  if (!Array.isArray(value)) {
    return true;
  }

  return value.length === 0;
};

/**
 * Checks if an object is empty (has no own enumerable properties) or not a plain object.
 *
 * @param value - The value to check
 * @returns True if the value is not a plain object or has no own enumerable properties
 *
 * @example
 * ```ts
 * isObjectEmpty({}) // true
 * isObjectEmpty({ key: 'value' }) // false
 * isObjectEmpty([]) // true (array is not a plain object)
 * isObjectEmpty(null) // true
 * ```
 */
export const isObjectEmpty = (value: unknown): boolean => {
  if (
    value == null ||
    typeof value !== 'object' ||
    value.constructor !== Object
  ) {
    return true;
  }

  return Object.keys(value).length === 0;
};

/**
 * Checks if a number is null, undefined, or NaN.
 *
 * @param value - The value to check
 * @returns True if the value is null, undefined, NaN, or not a number
 *
 * @example
 * ```ts
 * isNumberEmpty(null) // true
 * isNumberEmpty(undefined) // true
 * isNumberEmpty(NaN) // true
 * isNumberEmpty(0) // false
 * isNumberEmpty(123) // false
 * isNumberEmpty('123') // true (string, not number)
 * ```
 */
export const isNumberEmpty = (value: unknown): boolean => {
  if (typeof value !== 'number') {
    return true;
  }

  return Number.isNaN(value);
};

/**
 * Checks if a value is null or undefined.
 *
 * @param value - The value to check
 * @returns True if the value is null or undefined
 *
 * @example
 * ```ts
 * isNullish(null) // true
 * isNullish(undefined) // true
 * isNullish(0) // false
 * isNullish('') // false
 * isNullish(false) // false
 * ```
 */
export const isNullish = (value: unknown): value is null | undefined => {
  return value == null;
};

/**
 * Checks if a Map or Set is empty or not a Map/Set.
 *
 * @param value - The value to check
 * @returns True if the value is not a Map/Set or is empty
 *
 * @example
 * ```ts
 * isCollectionEmpty(new Map()) // true
 * isCollectionEmpty(new Set()) // true
 * isCollectionEmpty(new Map([['key', 'value']])) // false
 * isCollectionEmpty('not a collection') // true
 * ```
 */
export const isCollectionEmpty = (value: unknown): boolean => {
  if (!(value instanceof Map) && !(value instanceof Set)) {
    return true;
  }

  return value.size === 0;
};

/**
 * Type guard to check if a value has a non-empty length property.
 * Useful for arrays, strings, and array-like objects.
 *
 * @param value - The value to check
 * @returns True if the value has a length property greater than 0
 *
 * @example
 * ```ts
 * hasLength('hello') // true
 * hasLength([1, 2, 3]) // true
 * hasLength('') // false
 * hasLength([]) // false
 * hasLength(null) // false
 * ```
 */
export const hasLength = (
  value: unknown
): value is { length: number } & unknown => {
  return (
    value != null &&
    typeof value === 'object' &&
    'length' in value &&
    typeof (value as any).length === 'number' &&
    (value as any).length > 0
  );
};

/**
 * Type guard to check if a value has a non-empty size property.
 * Useful for Maps, Sets, and similar collection objects.
 *
 * @param value - The value to check
 * @returns True if the value has a size property greater than 0
 *
 * @example
 * ```ts
 * hasSize(new Map([['key', 'value']])) // true
 * hasSize(new Set([1, 2, 3])) // true
 * hasSize(new Map()) // false
 * hasSize(new Set()) // false
 * ```
 */
export const hasSize = (
  value: unknown
): value is { size: number } & unknown => {
  return (
    value != null &&
    typeof value === 'object' &&
    'size' in value &&
    typeof (value as any).size === 'number' &&
    (value as any).size > 0
  );
};

/**
 * Checks if a value is null, undefined, or empty based on its type.
 *
 * @param value - The value to check
 * @returns True if the value is considered empty, false otherwise
 *
 * @example
 * ```ts
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('') // true
 * isEmpty(' ') // true (whitespace only)
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(0) // false (numbers are not considered empty unless null/undefined)
 * isEmpty('hello') // false
 * ```
 */
export const isEmpty = (value: unknown): boolean => {
  if (isNullish(value)) {
    return true;
  }

  if (isStringEmpty(value)) {
    return true;
  }

  if (isArrayEmpty(value)) {
    return true;
  }

  if (isObjectEmpty(value)) {
    return true;
  }

  if (isNumberEmpty(value)) {
    return true;
  }

  return false;
};
