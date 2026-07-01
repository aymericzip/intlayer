import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Plan } from './plan.types';
import type { User } from './user.types';

/**
 * Note: SSO configuration is managed entirely by better-auth's SSO plugin.
 * The organization only stores a reference to whether SSO is enabled
 * and the domain for SSO provider lookup.
 * See: https://www.better-auth.com/docs/plugins/sso
 */

export type OrganizationCreationData = {
  name: Organization['name'];
};

/** Supported transactional email providers for a per-organization mailer. */
export type MailerProvider = 'resend' | 'smtp';

/**
 * Per-organization mailer configuration.
 *
 * The same shape is used both for the stored document and for API responses,
 * which keeps `Organization` structurally assignable to `OrganizationAPI`.
 * The two representations differ only in which optional fields are populated:
 *
 * - Stored: secrets (`resend.apiKey`, `smtp.password`) hold the encrypted value
 *   (see `@utils/crypto/encryption`); the `has*` flags are absent.
 * - API: `mapOrganizationToAPI` strips the secrets and sets the `has*` flags so
 *   the dashboard can indicate that a value is configured without exposing it.
 */
export type OrganizationMailerConfig = {
  /** Whether org-scoped emails should use this mailer instead of the default. */
  isActive: boolean;
  /** Which provider to send through. */
  provider: MailerProvider;
  /** Display name used in the `From` header (e.g. "Acme"). */
  fromName?: string;
  /** Sender address used in the `From` header (e.g. "no-reply@acme.com"). */
  fromEmail?: string;
  /** Resend-specific settings. */
  resend?: {
    /** Encrypted API key. Present only on the stored document, never in API responses. */
    apiKey?: string;
    /** API-only flag: whether a Resend API key is currently stored. */
    hasApiKey?: boolean;
  };
  /** SMTP-specific settings. */
  smtp?: {
    host?: string;
    port?: number;
    /** Whether to use an implicit TLS connection (usually port 465). */
    secure?: boolean;
    user?: string;
    /** Encrypted password. Present only on the stored document, never in API responses. */
    password?: string;
    /** API-only flag: whether an SMTP password is currently stored. */
    hasPassword?: boolean;
  };
};

/**
 * Client-facing mailer configuration. Structurally identical to
 * {@link OrganizationMailerConfig}; secrets are stripped at runtime by
 * `mapOrganizationToAPI` and replaced by the `has*` flags.
 */
export type OrganizationMailerConfigAPI = OrganizationMailerConfig;

/**
 * Payload accepted when updating a mailer configuration.
 *
 * Secrets are plaintext and optional: an omitted or empty secret means "keep
 * the value already stored", so the dashboard never has to round-trip it.
 */
export type OrganizationMailerConfigInput = {
  isActive: boolean;
  provider: MailerProvider;
  fromName?: string;
  fromEmail?: string;
  resend?: {
    apiKey?: string;
  };
  smtp?: {
    host?: string;
    port?: number;
    secure?: boolean;
    user?: string;
    password?: string;
  };
};

export type OrganizationData = {
  name: string;
  membersIds: User['id'][];
  adminsIds: User['id'][];
  /** Whether SSO is configured for this organization (managed by better-auth) */
  ssoEnabled: boolean;
  /** Primary domain for this organization (used for SSO provider lookup) */
  domain: string;
  /**
   * Optional per-organization transactional mailer. When active, org-scoped
   * emails (invites, access keys, reviewer, subscription…) are sent through it.
   * Secrets are stored encrypted; see {@link OrganizationMailerConfig}.
   */
  mailerConfig?: OrganizationMailerConfig;
};

export type Organization = OrganizationData & {
  id: Types.ObjectId;
  creatorId: User['id'];
  plan?: Plan;
  createdAt: number;
  updatedAt: number;
};

export type OrganizationAPI = ObjectIdToString<Organization>;

export type OrganizationSchema = RenameId<Organization>;
export type OrganizationModelType = Model<Organization>;
export type OrganizationDocument = Document<unknown, {}, Organization> &
  Organization;
