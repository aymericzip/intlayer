import { findProjects } from '@services/project.service';
import { z } from 'zod';
import type { Dictionary } from '@/types/dictionary.types';

export type DictionaryFields = (keyof Dictionary)[];

const defaultFieldsToCheck: DictionaryFields = ['projectIds'];

export type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

const dictionaryZodSchema = z.object({
  projectIds: z
    .array(
      z.string({
        message: 'Project id must be a string',
      })
    )
    .min(1, 'Project id is required'),
});

/**
 * Validates an dictionary object.
 * @param dictionary The dictionary object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateDictionary = async (
  dictionary: Partial<Dictionary>,
  fieldsToCheck = defaultFieldsToCheck
): Promise<ValidationErrors> => {
  const mask = fieldsToCheck.reduce(
    (acc, curr) => {
      acc[curr as string] = true;
      return acc;
    },
    {} as Record<string, true>
  );

  const schema = dictionaryZodSchema.pick(mask as any);
  const parsed = schema.safeParse(dictionary);

  const errors: ValidationErrors = parsed.success
    ? {}
    : (parsed.error.flatten().fieldErrors as ValidationErrors);

  if (
    fieldsToCheck.includes('projectIds') &&
    dictionary.projectIds &&
    !errors.projectIds
  ) {
    try {
      const projects = await findProjects({
        _id: dictionary.projectIds as unknown as string[],
      });

      if (!projects || projects.length !== dictionary.projectIds.length) {
        errors.projectIds = errors.projectIds || [];
        errors.projectIds.push('Project not found'); // Some or all projects were not found
      }
    } catch (e) {
      errors.projectIds = errors.projectIds || [];
      errors.projectIds.push('Project not found');
    }
  }

  return errors;
};
