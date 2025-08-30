import type { Dictionary } from '@/types/dictionary.types';
import { findProjects } from '@services/project.service';
import { validateArray } from './validateArray';

export type DictionaryFields = (keyof Dictionary)[];

const defaultFieldsToCheck: DictionaryFields = ['projectIds'];

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

  const dictionaryJSON = JSON.parse(JSON.stringify(dictionary));

  const projects = await findProjects({
    _id: dictionary.projectIds as unknown as string[],
  });

  // Validate each field
  for (const field of fieldsToValidate) {
    const value = dictionaryJSON[field];

    // Initialize error array for the field
    errors[field] = [];

    if (field === 'projectIds') {
      const projectsErrors: string[] = validateArray<string>(
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
