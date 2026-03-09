import { getOrganizationById } from '@services/organization.service';
import { z } from 'zod';
import type { Tag } from '@/types/tag.types';

export type TagFields = (keyof Tag)[];

const defaultFieldsToCheck: TagFields = ['name'];

export type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

export const KEY_MIN_LENGTH = 4;
export const KEY_MAX_LENGTH = 20;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 50;

const tagZodSchema = z.object({
  key: z
    .string({
      message: 'Key must be a string.',
    })
    .min(
      KEY_MIN_LENGTH,
      `Key must be at least ${KEY_MIN_LENGTH} characters long.`
    )
    .max(
      KEY_MAX_LENGTH,
      `Key must be at most ${KEY_MAX_LENGTH} characters long.`
    ),
  name: z
    .string({
      message: 'Name must be a string.',
    })
    .min(
      NAME_MIN_LENGTH,
      `Name must be at least ${NAME_MIN_LENGTH} characters long.`
    )
    .max(
      NAME_MAX_LENGTH,
      `Name must be at most ${NAME_MAX_LENGTH} characters long.`
    ),
  organizationId: z.string({
    message: 'Organization id must be a string',
  }),
});

/**
 * Validates a tag object.
 * @param tag The tag object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateTag = async (
  tag: Partial<Tag>,
  fieldsToCheck = defaultFieldsToCheck
): Promise<ValidationErrors> => {
  const mask = fieldsToCheck.reduce(
    (acc, curr) => {
      acc[curr as string] = true;
      return acc;
    },
    {} as Record<string, true>
  );

  const schema = tagZodSchema.pick(mask as any);
  const parsed = schema.safeParse(tag);

  const errors: ValidationErrors = parsed.success
    ? {}
    : (parsed.error.flatten().fieldErrors as ValidationErrors);

  if (
    fieldsToCheck.includes('organizationId') &&
    tag.organizationId &&
    !errors.organizationId
  ) {
    try {
      const organization = await getOrganizationById(
        tag.organizationId.toString()
      );
      if (!organization) {
        errors.organizationId = ['Organization not found'];
      }
    } catch (e) {
      errors.organizationId = ['Organization not found'];
    }
  }

  return errors;
};
