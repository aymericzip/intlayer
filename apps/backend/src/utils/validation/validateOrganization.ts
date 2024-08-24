import type { Organization } from '@schemas/organization.type';
import { validateString } from './validateString';

type OrganizationFields = (keyof Organization)[];

const defaultFieldsToCheck: OrganizationFields = ['name'];

type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 100;

/**
 * Validates an organization object.
 * @param organization The organization object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateOrganization = (
  organization: Partial<Organization>,
  fieldsToCheck = defaultFieldsToCheck
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Define the fields to validate
  const fieldsToValidate = new Set<FieldsToCheck>(fieldsToCheck);

  // Validate each field
  for (const field of fieldsToValidate) {
    const value = organization[field];

    // Initialize error array for the field
    errors[field] = [];

    // Check for name validity
    if (field === 'name') {
      const nameErrors = validateString(
        value,
        'Name',
        NAME_MIN_LENGTH,
        NAME_MAX_LENGTH
      );

      if (nameErrors.length > 0) {
        errors[field] = nameErrors;
      }
    }

    // Remove the error field if there are no errors
    if (errors[field].length === 0) {
      delete errors[field];
    }
  }

  return errors;
};
