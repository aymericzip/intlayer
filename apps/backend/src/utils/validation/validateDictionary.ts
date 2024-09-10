/* eslint-disable sonarjs/no-unused-collection */
/* eslint-disable sonarjs/cognitive-complexity */
import { findProjects } from '@services/project.service';
import { validateArray } from './validateArray';
import type { Dictionary } from '@/types/dictionary.types';

type DictionaryFields = (keyof Dictionary)[];

const defaultFieldsToCheck = ['projectIds'] satisfies DictionaryFields;

type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

/**
 * Validates an dictionary object.
 * @param dictionary The dictionary object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateDictionary = async (
  dictionary: Partial<Dictionary>,
  fieldsToCheck = defaultFieldsToCheck
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Define the fields to validate
  const fieldsToValidate = new Set<FieldsToCheck>(fieldsToCheck);

  const projects = await findProjects({
    ids: dictionary.projectIds as unknown as string[],
  });

  // Validate each field
  for (const field of fieldsToValidate) {
    const value = dictionary[field];

    // Initialize error array for the field
    errors[field] = [];

    if (field === 'projectIds') {
      const projectsErrors = validateArray<string>(
        value as unknown as string[],
        'Project',
        'string',
        (value) => {
          const projectErrors: string[] = [];

          if (typeof value !== 'string') {
            projectErrors.push('Project id must be a string');
          }

          if (!value) {
            projectErrors.push('Project id is required');
          }

          if (!projects) {
            projectErrors.push('Project not found');
          }

          return projectsErrors;
        }
      );
    }

    // Remove the error field if there are no errors
    if (errors[field].length === 0) {
      delete errors[field];
    }
  }

  return errors;
};
