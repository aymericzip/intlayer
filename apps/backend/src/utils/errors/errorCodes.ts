import { affiliateErrors } from './affiliate.errors';
import { authErrors } from './auth.errors';
import { billingErrors } from './billing.errors';
import { blogErrors } from './blog.errors';
import { commonErrors } from './common.errors';
import { dictionaryErrors } from './dictionary.errors';
import type { ErrorCode } from './errorCodes.types';
import { gitErrors } from './git.errors';
import { organizationErrors } from './organization.errors';
import { projectErrors } from './project.errors';
import { reviewerErrors } from './reviewer.errors';
import { showcaseErrors } from './showcase.errors';
import { tagErrors } from './tag.errors';
import { userErrors } from './user.errors';

export type { ErrorCode } from './errorCodes.types';

/**
 * Aggregated map of every backend error code, merged from the per-domain
 * `*.errors.ts` files. Each entry carries a localized title/message and an
 * HTTP status code.
 */
export const errorData = {
  ...userErrors,
  ...authErrors,
  ...organizationErrors,
  ...projectErrors,
  ...dictionaryErrors,
  ...billingErrors,
  ...tagErrors,
  ...gitErrors,
  ...showcaseErrors,
  ...affiliateErrors,
  ...reviewerErrors,
  ...blogErrors,
  ...commonErrors,
} satisfies Record<string, ErrorCode>;

export type ErrorCodes = keyof typeof errorData;
