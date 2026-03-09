import { z } from 'zod';
import type { Organization, OrganizationAPI } from '@/types/organization.types';

export type OrganizationFields = (keyof Organization)[];

const defaultFieldsToCheck: OrganizationFields = [
  'name',
  'membersIds',
  'adminsIds',
];

export type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 100;

export const MEMBERS_MIN_LENGTH = 1;

const organizationZodSchema = z.object({
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
  membersIds: z
    .array(
      z.string({
        message: 'Members must contain only string elements.',
      })
    )
    .min(
      MEMBERS_MIN_LENGTH,
      `Members must be at least ${MEMBERS_MIN_LENGTH} items long.`
    ),
  adminsIds: z
    .array(
      z.string({
        message: 'Members must contain only string elements.',
      })
    )
    .min(
      MEMBERS_MIN_LENGTH,
      `Members must be at least ${MEMBERS_MIN_LENGTH} items long.`
    ),
});

/**
 * Validates an organization object.
 * @param organization The organization object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateOrganization = (
  organization: Partial<Organization | OrganizationAPI>,
  fieldsToCheck = defaultFieldsToCheck
): ValidationErrors => {
  const mask = fieldsToCheck.reduce(
    (acc, curr) => {
      acc[curr as string] = true;
      return acc;
    },
    {} as Record<string, true>
  );

  const schema = organizationZodSchema.pick(mask as any);
  const parsed = schema.safeParse(organization);

  if (parsed.success) {
    return {};
  }

  return parsed.error.flatten().fieldErrors as ValidationErrors;
};
