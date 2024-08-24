import { validateString } from './validateString';

/**
 * Validates a email field.
 * @param value The value to validate.
 * @param entityName The name of the entity being validated.
 * @param minLength The minimum length of the string.
 * @param maxLength The maximum length of the string.
 * @returns An array of validation errors.
 */
export const validateEmail = (
  value: unknown,
  entityName = 'Email',
  minLength = 6,
  maxLength = 100
): string[] => {
  const errors = validateString(value, entityName, minLength, maxLength);

  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;

  if (typeof value === 'string' && !emailRegex.test(value)) {
    errors.push(`${entityName} must be a valid email address.`);
  }

  return errors;
};
