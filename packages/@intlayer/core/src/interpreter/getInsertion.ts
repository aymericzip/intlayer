import type { InsertionContent } from '../transpiler';

/**
 * Allow to insert values in a string.
 *
 * Usage:
 *
 * ```ts
 * const content = getInsertion('Hello {{name}}!', {
 *  name: 'John',
 * });
 * // 'Hello John!'
 * ```
 *
 */
export const getInsertion = (
  content: string,
  values: { [K in InsertionContent['fields'][number]]: string }
) => content.replace(/\{\{(.*?)\}\}/g, (_, key) => values[key] ?? '');
