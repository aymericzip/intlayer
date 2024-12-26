import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import { Organization, OrganizationAPI } from '@/types/organization.types';

/**
 * Maps an organization to an API response.
 * @param organization - The organization to map.
 * @param isOrganizationAdmin - Whether the user is an admin of the organization.
 * @returns The organization mapped to an API response.
 */
export const mapOrganizationToAPI = (
  organization: Organization,
  isOrganizationAdmin: boolean | null
): OrganizationAPI => {
  const organizationObject =
    ensureMongoDocumentToObject<Organization>(organization);

  if (isOrganizationAdmin) {
    return organizationObject;
  }

  const { adminsIds, ...organizationAPI } = organizationObject;
  return organizationAPI;
};
