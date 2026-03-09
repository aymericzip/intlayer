import { z } from 'zod';
import type { User, UserAPI } from '@/types/user.types';

export type UserFields = (keyof User)[];

const defaultFieldsToCheck: UserFields = ['name', 'email', 'phone'];

export type FieldsToCheck = (typeof defaultFieldsToCheck)[number];
type ValidationErrors = Partial<
  Record<(typeof defaultFieldsToCheck)[number], string[]>
>;

export const NAMES_MIN_LENGTH = 4;
export const NAMES_MAX_LENGTH = 100;

const userZodSchema = z.object({
  name: z
    .string({
      message: 'User Name must be a string.',
    })
    .min(
      NAMES_MIN_LENGTH,
      `User Name must be at least ${NAMES_MIN_LENGTH} characters long.`
    )
    .max(
      NAMES_MAX_LENGTH,
      `User Name must be at most ${NAMES_MAX_LENGTH} characters long.`
    ),
  email: z
    .string({
      message: 'User Email must be a string.',
    })
    .email('User Email must be a valid email address.'),
  phone: z
    .string({
      message: 'User Phone must be a string.',
    })
    .min(8, 'User Phone must be at least 8 characters long.')
    .max(20, 'User Phone must be at most 20 characters long.')
    .regex(
      /^\+?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6}$/,
      'User Phone must be a valid phone number.'
    ),
});

/**
 * Validates an user object.
 * @param user The user object to validate.
 * @returns An object containing the validation errors for each field.
 */
export const validateUser = (
  user: Partial<User | UserAPI>,
  fieldsToCheck = defaultFieldsToCheck
): ValidationErrors => {
  const mask = fieldsToCheck.reduce(
    (acc, curr) => {
      acc[curr as string] = true;
      return acc;
    },
    {} as Record<string, true>
  );

  const schema = userZodSchema.pick(mask as any);
  const parsed = schema.safeParse(user);

  if (parsed.success) {
    return {};
  }

  return parsed.error.flatten().fieldErrors as ValidationErrors;
};
