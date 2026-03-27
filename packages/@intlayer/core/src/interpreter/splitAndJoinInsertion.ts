/**
 * Check if a value is a complex object (not a primitive)
 * Used to determine if values need to be wrapped in fragments
 */
const isComplexValue = (value: any): boolean =>
  value != null &&
  typeof value !== 'string' &&
  typeof value !== 'number' &&
  typeof value !== 'boolean';

// Hoisted: replace/split do not suffer from the stateful lastIndex mutation of .exec()
const insertionRegex = /\{\{\s*(.*?)\s*\}\}/g;

export const splitInsertionTemplate = <T = any>(
  template: string,
  values: Record<string, T> = {}
): { isSimple: boolean; parts: string | T[] } => {
  if (!Object.values(values).some(isComplexValue)) {
    return {
      isSimple: true,
      parts: template.replace(insertionRegex, (_, key) =>
        (values[key.trim()] ?? '').toString()
      ),
    };
  }

  const chunks = template.split(insertionRegex);
  const parts: any[] = [];

  for (let i = 0; i < chunks.length; i++) {
    if (i % 2 === 0) {
      if (chunks[i]) parts.push(chunks[i]);
    } else {
      const val = values[chunks[i].trim()];
      if (val != null) parts.push(val);
    }
  }

  return { isSimple: false, parts };
};
