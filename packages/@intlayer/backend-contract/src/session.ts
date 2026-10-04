import type { Locale } from '@intlayer/types/allLocales';
import { z } from 'zod/mini';
import { dateTimeSchema, typedStringSchema } from './common';
import { organizationSchema } from './organization';
import { environmentSchema, projectSchema } from './project';
import { userSchema } from './user';

/** Named groupings of privileges granted to a user. */
export const rolesSchema = z.enum([
  'user',
  'admin',
  'org_admin',
  'org_user',
  'project_admin',
  'project_user',
  'project_reviewer',
]);

/** Protected resources and the actions performed on them. */
type Resource = 'organization' | 'project' | 'dictionary' | 'tag' | 'user';
type Action = 'read' | 'write' | 'admin';

/** `resource:action` unit checked at runtime (ex: `project:write`). */
export type Permission = `${Resource}:${Action}`;

const allowedEnvironmentIdsSchema = z.nullable(z.array(z.nullable(z.string())));

/** better-auth session record (token excluded from the API shape). */
export const sessionDataSchema = z.looseObject({
  id: z.string(),
  userId: z.string(),
  expiresAt: dateTimeSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  ipAddress: z.optional(z.nullable(z.string())),
  userAgent: z.optional(z.nullable(z.string())),
  activeOrganizationId: z.optional(z.nullable(z.string())),
  activeProjectId: z.optional(z.nullable(z.string())),
  activeEnvironmentId: z.optional(z.nullable(z.string())),
  locale: z.optional(typedStringSchema<Locale>()),
});

/** Session as returned to the dashboard (`get-session`). */
export const sessionSchema = z.looseObject({
  session: sessionDataSchema,
  user: userSchema,
  organization: z.optional(z.nullable(organizationSchema)),
  project: z.optional(z.nullable(projectSchema)),
  environment: z.optional(z.nullable(environmentSchema)),
  id: z.optional(z.string()),
  permissions: z.array(typedStringSchema<Permission>()),
  roles: z.array(rolesSchema),
  authType: z.nullable(z.enum(['session', 'oauth2'])),
  locale: z.optional(typedStringSchema<Locale>()),
  /** null = unrestricted; [] = none; array = allowed ids (null item = production). */
  allowedEnvironmentIds: z.optional(allowedEnvironmentIdsSchema),
  /** null = unrestricted; [] = none; array = allowed locales. */
  allowedLocales: z.optional(z.nullable(z.array(typedStringSchema<Locale>()))),
});

export type Roles = z.output<typeof rolesSchema>;
export type SessionDataAPI = z.output<typeof sessionDataSchema>;
export type SessionAPI = z.output<typeof sessionSchema>;
