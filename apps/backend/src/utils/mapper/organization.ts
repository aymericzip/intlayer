import type { Organization, OrganizationAPI } from '@/types/organization.types';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';

/**
 * Maps an organization to an API response.
 * @param organization - The organization to map.
 * @param isOrganizationAdmin - Whether the user is an admin of the organization.
 * @returns The organization mapped to an API response.
 */
export const mapOrganizationToAPI = (
  organization: Organization
): OrganizationAPI => {
  const organizationObject =
    ensureMongoDocumentToObject<Organization>(organization);

  const { adminsIds, ...organizationAPI } = organizationObject;

  return organizationAPI as unknown as OrganizationAPI;
};
