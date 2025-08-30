import type { User, UserAPI } from '@/types/user.types';
import { validateEmail } from './validateEmail';
import { validatePhone } from './validatePhone';
import { validateString } from './validateString';

export type UserFields = (keyof User)[];

const defaultFieldsToCheck: UserFields = ['name', 'phone', 'email', 'phone'];

export type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;
export const NAMES_MIN_LENGTH = 4;
export const NAMES_MAX_LENGTH = 100;

/**
 * Validates an user object.
 * @param user The user object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateUser = (
  user: Partial<User | UserAPI>,
  fieldsToCheck = defaultFieldsToCheck
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Define the fields to validate
  const fieldsToValidate = new Set<FieldsToCheck>(fieldsToCheck);

  const userJson = JSON.parse(JSON.stringify(user));

  // Validate each field
  for (const field of fieldsToValidate) {
    const value = userJson[field];

    // Initialize error array for the field
    errors[field] = [];

    // Check for name validity
    if (field === 'name') {
      const nameErrors = validateString(
        value,
        `User ${field}`,
        NAMES_MIN_LENGTH,
        NAMES_MAX_LENGTH
      );

      if (nameErrors.length > 0) {
        errors[field] = nameErrors;
      }
    }

    // Check for email validity
    if (field === 'email') {
      const emailErrors = validateEmail(value, 'User Email');

      if (emailErrors.length > 0) {
        errors[field] = emailErrors;
      }
    }

    if (field === 'phone') {
      const phoneErrors = validatePhone(value, 'User Phone', 8, 20);

      if (phoneErrors.length > 0) {
        errors[field] = phoneErrors;
      }
    }

    // Remove the error field if there are no errors
    if (errors[field].length === 0) {
      delete errors[field];
    }
  }

  return errors;
};
