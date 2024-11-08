import {
  Organization,
  OrganizationAPI,
  OrganizationDocument,
} from '@/types/organization.types';

/**
 * Maps an organization to an API response.
 * @param organization - The organization to map.
 * @param isOrganizationAdmin - Whether the user is an admin of the organization.
 * @returns The organization mapped to an API response.
 */
export const mapOrganizationToAPI = (
  organization: Organization,
  isOrganizationAdmin: boolean
): OrganizationAPI => {
  let organizationObject: Organization = organization;

  // If the organization is a mongoose document, convert it to an object
  if (typeof (organization as OrganizationDocument).toObject === 'function') {
    organizationObject = (organization as OrganizationDocument).toObject();
  }

  if (isOrganizationAdmin) {
    return organizationObject;
  }

  const { adminsIds, ...organizationAPI } = organizationObject;
  return organizationAPI;
};
