import { getOrganizationById } from '@services/organization.service';
import { validateArray } from './validateArray';
import { validateString } from './validateString';
import type { Tag } from '@/types/tag.types';

export type TagFields = (keyof Tag)[];

const defaultFieldsToCheck: TagFields = ['name'];

type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 50;

export const MEMBERS_MIN_LENGTH = 1;

/**
 * Validates an tag object.
 * @param tag The tag object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateTag = async (
  tag: Partial<Tag>,
  fieldsToCheck = defaultFieldsToCheck
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Define the fields to validate
  const fieldsToValidate = new Set<FieldsToCheck>(fieldsToCheck);

  const organization = await getOrganizationById(tag.organizationId ?? '');

  // Validate each field
  for (const field of fieldsToValidate) {
    const value = tag[field];

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

    if (field === 'organizationId') {
      const organizationErrors: string[] = [];

      if (typeof value !== 'string') {
        organizationErrors.push('Organization id must be a string');
      }

      if (!value) {
        organizationErrors.push('Organization id is required');
      }

      if (!organization) {
        organizationErrors.push('Organization not found');
      }

      if (organizationErrors.length > 0) {
        errors[field] = organizationErrors;
      }
    }

    // Remove the error field if there are no errors
    if (errors[field].length === 0) {
      delete errors[field];
    }
  }

  return errors;
};
