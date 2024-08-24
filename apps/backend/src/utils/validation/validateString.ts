/**
 * Validates a string field.
 * @param value The value to validate.
 * @param entityName The name of the entity being validated.
 * @param minLength The minimum length of the string.
 * @param maxLength The maximum length of the string.
 * @returns An array of validation errors.
 */
export const validateString = (
  value: unknown,
  entityName: string,
  minLength?: number,
  maxLength?: number
): string[] => {
  const errors: string[] = [];

  if (typeof value !== 'string') {
    errors.push(`${entityName} must be a string.`);
  } else if (minLength && value.length < minLength) {
    errors.push(`${entityName} must be at least ${minLength} characters long.`);
  } else if (maxLength && value.length > maxLength) {
    errors.push(`${entityName} must be at most ${maxLength} characters long.`);
  }

  return errors;
};
