import { getOrganizationById } from '@services/organization.service';
import { z } from 'zod';
import type { Project, ProjectAPI } from '@/types/project.types';

export type ProjectFields = (keyof Project)[];

const defaultFieldsToCheck: ProjectFields = [
  'name',
  'membersIds',
  'adminsIds',
  'organizationId',
];

export type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 100;

export const MEMBERS_MIN_LENGTH = 1;

const projectZodSchema = z.object({
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
 * Validates a project object.
 * @param project The project object to validate.
 * @param fieldsToCheck The fields to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateProject = async (
  project: Partial<Project | ProjectAPI>,
  fieldsToCheck = defaultFieldsToCheck
): Promise<ValidationErrors> => {
  const mask = fieldsToCheck.reduce(
    (acc, curr) => {
      acc[curr as string] = true;
      return acc;
    },
    {} as Record<string, true>
  );

  const schema = projectZodSchema.pick(mask as any);
  const parsed = schema.safeParse(project);

  const errors: ValidationErrors = parsed.success
    ? {}
    : (parsed.error.flatten().fieldErrors as ValidationErrors);

  // Async validations
  if (
    fieldsToCheck.includes('organizationId') ||
    fieldsToCheck.includes('membersIds') ||
    fieldsToCheck.includes('adminsIds')
  ) {
    try {
      if (
        fieldsToCheck.includes('organizationId') &&
        project.organizationId &&
        !errors.organizationId
      ) {
        // Only run DB check if Zod passed the basic string presence checks
        const organization = await getOrganizationById(
          project.organizationId.toString()
        );
        if (!organization) {
          errors.organizationId = ['Organization not found'];
        }
      }

      if (project.organizationId) {
        const organization = await getOrganizationById(
          project.organizationId.toString()
        );
        if (organization) {
          const orgMembers = organization.membersIds.map(String);

          if (fieldsToCheck.includes('membersIds') && project.membersIds) {
            const invalidMembers = project.membersIds.filter(
              (id) => !orgMembers.includes(String(id))
            );
            if (invalidMembers.length > 0) {
              errors.membersIds = errors.membersIds || [];
              errors.membersIds.push('Members must contain valid elements.');
            }
          }

          if (fieldsToCheck.includes('adminsIds') && project.adminsIds) {
            const invalidAdmins = project.adminsIds.filter(
              (id) => !orgMembers.includes(String(id))
            );
            if (invalidAdmins.length > 0) {
              errors.adminsIds = errors.adminsIds || [];
              errors.adminsIds.push('Members must contain valid elements.');
            }
          }
        }
      } else if (
        fieldsToCheck.includes('membersIds') ||
        fieldsToCheck.includes('adminsIds')
      ) {
        if (fieldsToCheck.includes('membersIds')) {
          errors.membersIds = errors.membersIds || [];
          errors.membersIds.push(
            'Organization id is required to validate project members'
          );
        }
        if (fieldsToCheck.includes('adminsIds')) {
          errors.adminsIds = errors.adminsIds || [];
          errors.adminsIds.push(
            'Organization id is required to validate project members'
          );
        }
      }
    } catch (e) {
      if (fieldsToCheck.includes('organizationId') && project.organizationId) {
        errors.organizationId = ['Organization not found'];
      }
    }
  }

  // Final cleanup of empty error arrays (in case of manual manipulation)
  for (const key of Object.keys(errors)) {
    if (errors[key as keyof ValidationErrors]?.length === 0) {
      delete errors[key as keyof ValidationErrors];
    }
  }

  return errors;
};
