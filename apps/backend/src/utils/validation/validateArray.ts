type ElementType = 'string' | 'number' | 'boolean' | 'object' | 'array';
type ElementValidator<T> = (value: T) => boolean;

/**
 * Validates a email field.
 * @param value The value to validate.
 * @param entityName The name of the entity being validated.
 * @param minLength The minimum length of the string.
 * @param maxLength The maximum length of the string.
 * @returns An array of validation errors.
 */
export const validateArray = <T = unknown>(
  value: T[],
  entityName = 'Array',
  elementType?: ElementType,
  elementValidator?: ElementValidator<T>,
  minLength = 0,
  maxLength = undefined
): string[] => {
  const errors = [];

  if (!Array.isArray(value)) {
    errors.push(`${entityName} must be an array.`);
  } else if (minLength && value.length < minLength) {
    errors.push(`${entityName} must be at least ${minLength} items long.`);
  } else if (maxLength && value.length > maxLength) {
    errors.push(`${entityName} must be at most ${maxLength} items long.`);
  } else if (elementType) {
    const isValid = value.some((element) => typeof element !== elementType);

    if (!isValid) {
      errors.push(`${entityName} must contain only ${elementType} elements.`);
    }
  } else if (elementValidator) {
    const isValid = value.every(elementValidator);

    if (!isValid) {
      errors.push(`${entityName} must contain only valid elements.`);
    }
  }

  return errors;
};
