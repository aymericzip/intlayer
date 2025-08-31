import type { Project, ProjectAPI } from '@/types/project.types';
import { getOrganizationById } from '@services/organization.service';
import { validateArray } from './validateArray';
import { validateString } from './validateString';

export type ProjectFields = (keyof Project)[];

const defaultFieldsToCheck: ProjectFields = [
  'name',
  'membersIds',
  'adminsIds',
  'organizationId',
];

type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 100;

export const MEMBERS_MIN_LENGTH = 1;

/**
 * Validates an project object.
 * @param project The project object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateProject = async (
  project: Partial<Project | ProjectAPI>,
  fieldsToCheck = defaultFieldsToCheck
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Define the fields to validate
  const fieldsToValidate = new Set<FieldsToCheck>(fieldsToCheck);

  const projectJson = JSON.parse(JSON.stringify(project));

  // Validate each field
  for (const field of fieldsToValidate) {
    const value = projectJson[field];

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
      const organization = await getOrganizationById(field);
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

    if (field === 'membersIds' || field === 'adminsIds') {
      if (!project.organizationId) {
        errors[field] = [
          'Organization id is required to validate project members',
        ];
      } else {
        const organization = await getOrganizationById(project.organizationId);
        const membersErrors = validateArray<string>(
          value as unknown as string[],
          'Members',
          'string',
          (item) =>
            (organization?.membersIds as unknown as string[]).includes(item),
          MEMBERS_MIN_LENGTH
        );

        if (membersErrors.length > 0) {
          errors[field] = membersErrors;
        }
      }
    }

    // Remove the error field if there are no errors
    if (errors[field].length === 0) {
      delete errors[field];
    }
  }

  return errors;
};
