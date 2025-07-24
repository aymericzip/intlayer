import type { Organization, OrganizationAPI } from '@/types/organization.types';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';

/**
 * Maps an organization to an API response.
 * @param organization - The organization to map.
 * @param  - Whether the user is an admin of the organization.
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

  const organizationObject = ensureMongoDocumentToObject(organization);

  return organizationObject as any;
};

export const mapOrganizationsToAPI = (
  organizations: (Organization | OrganizationAPI)[]
): OrganizationAPI[] =>
  organizations.map(mapOrganizationToAPI).filter(Boolean) as OrganizationAPI[];
