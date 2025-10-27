type FlatType = string | number | boolean | object | null | undefined;

type RecursiveType =
  | FlatType
  | { [key: string]: RecursiveType }
  | Array<RecursiveType>;

type VerifyIdenticObjectFormatResult = {
  isIdentic: boolean;
  error?: string;
};

/**
 * Verifies that two objects have identical structure (same keys, array lengths, and types)
 * but not necessarily the same values.
 * Useful for validating translations maintain the same format as the original.
 *
 * @param object - The object to verify
 * @param expectedFormat - The expected format to compare against
 * @param path - Current path in the object tree (for error messages)
 * @returns true if structures match, throws error with details if they don't
 */
export const verifyIdenticObjectFormat = (
  object: RecursiveType,
  expectedFormat: RecursiveType,
  path: string = 'root'
): VerifyIdenticObjectFormatResult => {
  // Check if both are null or undefined
  if (expectedFormat === null || expectedFormat === undefined) {
    if (expectedFormat !== object) {
      return {
        isIdentic: false,
        error: `Type mismatch at ${path}: expected ${expectedFormat === null ? 'null' : 'undefined'}, got ${object === null ? 'null' : typeof object}`,
      };
    }
    return {
      isIdentic: true,
    };
  }

  // Get the type of both values
  const expectedType = Array.isArray(expectedFormat)
    ? 'array'
    : typeof expectedFormat;
  const objectType = Array.isArray(object) ? 'array' : typeof object;

  // Check if types match
  if (expectedType !== objectType) {
    return {
      isIdentic: false,
      error: `Type mismatch at ${path}: expected ${expectedType}, got ${objectType}`,
    };
  }

  // Handle arrays
  if (Array.isArray(expectedFormat) && Array.isArray(object)) {
    if (expectedFormat.length !== object.length) {
      return {
        isIdentic: false,
        error: `Array length mismatch at ${path}: expected ${expectedFormat.length} elements, got ${object.length}`,
      };
    }

    // Recursively check each element
    for (let i = 0; i < expectedFormat.length; i++) {
      const result = verifyIdenticObjectFormat(
        object[i],
        expectedFormat[i],
        `${path}[${i}]`
      );
      if (!result.isIdentic) {
        return result;
      }
    }

    return {
      isIdentic: true,
    };
  }

  // Handle objects (excluding null and arrays)
  if (
    typeof expectedFormat === 'object' &&
    typeof object === 'object' &&
    expectedFormat !== null &&
    object !== null
  ) {
    const expectedKeys = Object.keys(expectedFormat);
    const objectKeys = Object.keys(object);

    // Check if number of keys match
    if (expectedKeys.length !== objectKeys.length) {
      return {
        isIdentic: false,
        error: `Object keys count mismatch at ${path}: expected ${expectedKeys.length} keys, got ${objectKeys.length}`,
      };
    }

    // Check if keys match and are in the same order
    for (let i = 0; i < expectedKeys.length; i++) {
      if (expectedKeys[i] !== objectKeys[i]) {
        return {
          isIdentic: false,
          error: `Object keys mismatch at ${path}: expected key "${expectedKeys[i]}" at position ${i}, got "${objectKeys[i]}"`,
        };
      }
    }

    // Recursively check each property
    for (const key of expectedKeys) {
      const result = verifyIdenticObjectFormat(
        (object as Record<string, RecursiveType>)[key],
        (expectedFormat as Record<string, RecursiveType>)[key],
        `${path}.${key}`
      );
      if (!result.isIdentic) {
        return result;
      }
    }

    return {
      isIdentic: true,
    };
  }

  // For primitive types (string, number, boolean), just verify they're the same type
  // We don't check the actual values as per requirements
  return {
    isIdentic: true,
  };
};
