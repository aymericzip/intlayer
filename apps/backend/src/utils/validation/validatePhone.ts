import { validateString } from './validateString';

/**
 * Validates a email field.
 * @param value The value to validate.
 * @param entityName The name of the entity being validated.
 * @param minLength The minimum length of the string.
 * @param maxLength The maximum length of the string.
 * @returns An array of validation errors.
 */
export const validatePhone = (
  value: unknown,
  entityName = 'Phone',
  minLength = 6,
  maxLength = 20
): string[] => {
  const errors = validateString(value, entityName, minLength, maxLength);

  const phoneRegex = /^\+?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6}$/;

  if (typeof value === 'string' && !phoneRegex.test(value)) {
    errors.push(`${entityName} must be a valid phone number.`);
  }

  return errors;
};
