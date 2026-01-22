/**
 * Check if a value is a complex object (not a primitive)
 * Used to determine if values need to be wrapped in fragments
 */
const isComplexValue = (value: any): boolean => {
  return (
    value !== null &&
    value !== undefined &&
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    typeof value !== 'boolean'
  );
};

/**
 * Core logic for splitting insertion strings and joining with values.
 * Returns an array of parts that can be wrapped by framework-specific Fragment implementations.
 *
 * @param template - The template string with {{ placeholder }} syntax
 * @param values - Map of placeholder names to their replacement values
 * @returns Object with `isSimple` flag and `parts` array
 *
 * @example
 * ```ts
 * const result = splitInsertionTemplate('Hello {{ name }}!', { name: 'World' });
 * // { isSimple: true, parts: 'Hello World!' }
 *
 * const result = splitInsertionTemplate('Hello {{ name }}!', { name: <Component /> });
 * // { isSimple: false, parts: ['Hello ', <Component />, '!'] }
 * ```
 */
export const splitInsertionTemplate = <T = any>(
  template: string,
  values: Record<string, T>
): { isSimple: boolean; parts: string | T[] } => {
  // Check if any value is a complex object (React/Vue node, etc.)
  const hasComplexValue = Object.values(values).some(isComplexValue);

  if (!hasComplexValue) {
    // Simple string replacement
    const result = template.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, key) => {
      const trimmedKey = key.trim();
      return (values[trimmedKey] ?? '').toString();
    });
    return { isSimple: true, parts: result };
  }

  // Split the template by placeholders while keeping the structure
  const parts: any[] = [];
  let lastIndex = 0;
  const regex = /\{\{\s*(.*?)\s*\}\}/g;
  let match: RegExpExecArray | null = regex.exec(template);

  while (match !== null) {
    // Add text before the placeholder
    if (match.index > lastIndex) {
      parts.push(template.substring(lastIndex, match.index));
    }

    // Add the replaced value
    const key = match[1].trim();
    const value = values[key];
    if (value !== undefined && value !== null) {
      parts.push(value);
    }

    lastIndex = match.index + match[0].length;
    match = regex.exec(template);
  }

  // Add remaining text
  if (lastIndex < template.length) {
    parts.push(template.substring(lastIndex));
  }

  return { isSimple: false, parts };
};
