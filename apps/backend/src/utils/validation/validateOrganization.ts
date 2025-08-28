import type { Organization, OrganizationAPI } from '@/types/organization.types';
import { validateArray } from './validateArray';
import { validateString } from './validateString';

export type OrganizationFields = (keyof Organization)[];

const defaultFieldsToCheck: OrganizationFields = [
  'name',
  'membersIds',
  'adminsIds',
];

type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 100;

export const MEMBERS_MIN_LENGTH = 1;

/**
 * Validates an organization object.
 * @param organization The organization object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateOrganization = (
  organization: Partial<Organization | OrganizationAPI>,
  fieldsToCheck = defaultFieldsToCheck
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const organizationObject = JSON.parse(JSON.stringify(organization));

  // Define the fields to validate
  const fieldsToValidate = new Set<FieldsToCheck>(fieldsToCheck);

  // Validate each field
  for (const field of fieldsToValidate) {
    const value = organizationObject[field];

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

    if (field === 'membersIds' || field === 'adminsIds') {
      console.log('field', field);
      console.log('value', value);
      console.log('typeof value', typeof value);

      const membersErrors = validateArray<string>(
        value as unknown as string[],
        'Members',
        'string',
        undefined,
        MEMBERS_MIN_LENGTH
      );

      if (membersErrors.length > 0) {
        errors[field] = membersErrors;
      }
    }

    // Remove the error field if there are no errors
    if (errors[field].length === 0) {
      delete errors[field];
    }
  }

  return errors;
};
