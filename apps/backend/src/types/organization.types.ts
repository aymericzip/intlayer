import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Plan } from './plan.types';
import type { User } from './user.types';

/**
 * SSO Provider Type - defines the type of SSO provider
 */
export type SSOProviderType = 'saml' | 'oidc';

/**
 * SAML Configuration for SSO
 */
export type SAMLConfig = {
  /** The URL where the IdP receives SAML requests */
  idpEntityId: string;
  /** The URL where the IdP sends SAML responses (SSO URL) */
  idpSSOUrl: string;
  /** The IdP's public certificate for signature verification (PEM format) */
  idpCertificate: string;
  /** Optional: IdP Single Logout URL */
  idpSLOUrl?: string;
};

/**
 * OIDC Configuration for SSO
 */
export type OIDCConfig = {
  /** The OIDC issuer URL (e.g., https://accounts.google.com) */
  issuer: string;
  /** OAuth2 Client ID */
  clientId: string;
  /** OAuth2 Client Secret */
  clientSecret: string;
  /** OAuth2 scopes to request */
  scopes?: string[];
  /** Optional: Authorization endpoint override */
  authorizationEndpoint?: string;
  /** Optional: Token endpoint override */
  tokenEndpoint?: string;
  /** Optional: User info endpoint override */
  userinfoEndpoint?: string;
};

/**
 * SSO Configuration for an Organization
 */
export type SSOConfig = {
  /** Whether SSO is enabled for this organization */
  enabled: boolean;
  /** The type of SSO provider */
  providerType?: SSOProviderType;
  /** Unique provider ID for this organization's SSO */
  providerId?: string;
  /** Domain(s) associated with this SSO provider (e.g., 'company.com') */
  domains?: string[];
  /** SAML-specific configuration */
  samlConfig?: SAMLConfig;
  /** OIDC-specific configuration */
  oidcConfig?: OIDCConfig;
  /** Whether to enforce SSO for all users in this organization */
  enforceSSO?: boolean;
  /** Whether to allow users to bypass SSO with password login */
  allowPasswordLogin?: boolean;
};

export type OrganizationCreationData = {
  name: Organization['name'];
  ssoConfig?: SSOConfig;
};

export type OrganizationData = {
  name: string;
  membersIds: User['id'][];
  adminsIds: User['id'][];
  ssoConfig?: SSOConfig;
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
