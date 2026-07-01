import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import type {
  Organization,
  OrganizationAPI,
  OrganizationMailerConfig,
} from '@/types/organization.types';

/**
 * Redacts a stored mailer configuration for client responses.
 *
 * Secrets (Resend API key, SMTP password) are removed and replaced with a
 * boolean flag indicating whether a value is currently stored.
 *
 * @param mailerConfig - The stored mailer configuration, if any.
 * @returns The redacted, client-safe mailer configuration, or `undefined`.
 */
const redactMailerConfig = (
  mailerConfig?: OrganizationMailerConfig
): OrganizationMailerConfig | undefined => {
  if (!mailerConfig) {
    return undefined;
  }

  return {
    isActive: mailerConfig.isActive,
    provider: mailerConfig.provider,
    fromName: mailerConfig.fromName,
    fromEmail: mailerConfig.fromEmail,
    resend: {
      hasApiKey: Boolean(mailerConfig.resend?.apiKey),
    },
    smtp: {
      host: mailerConfig.smtp?.host,
      port: mailerConfig.smtp?.port,
      secure: mailerConfig.smtp?.secure,
      user: mailerConfig.smtp?.user,
      hasPassword: Boolean(mailerConfig.smtp?.password),
    },
  };
};

/**
 * Maps an organization to an API response.
 *
 * Mailer secrets are stripped here so that they never leave the backend, even
 * though the organization is embedded in the session and returned by several
 * endpoints.
 *
 * @param organization - The organization to map.
 * @returns The organization mapped to an API response.
 */
export const mapOrganizationToAPI = <
  T extends Organization | OrganizationAPI | null,
>(
  organization?: T
): T extends null ? null : OrganizationAPI => {
  if (!organization) {
    return null as any;
  }

  const organizationObject = ensureMongoDocumentToObject(
    organization
  ) as Organization;

  const { mailerConfig, ...rest } = organizationObject;

  return {
    ...rest,
    ...(mailerConfig ? { mailerConfig: redactMailerConfig(mailerConfig) } : {}),
  } as any;
};

export const mapOrganizationsToAPI = (
  organizations: (Organization | OrganizationAPI)[]
): OrganizationAPI[] =>
  organizations.map(mapOrganizationToAPI).filter(Boolean) as OrganizationAPI[];
