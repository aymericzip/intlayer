import type {
  AddOrganizationBody,
  AddOrganizationResult,
  DeleteOrganizationParam,
  DeleteOrganizationResult,
  GetOrganizationParam,
  GetOrganizationResult,
  GetOrganizationsParams,
  GetOrganizationsResult,
  UpdateOrganizationBody,
  UpdateOrganizationResult,
} from '@controllers/organization.controller';

const ORGANIZATION_API_ROUTE = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization`;

/**
 * Retrieves a list of organizations based on filters and pagination.
 * @param filters - Filters and pagination options.
 */
const getOrganizations = async (
  filters?: GetOrganizationsParams
): Promise<GetOrganizationsResult> => {
  const params = new URLSearchParams(filters);

  const response = await fetch(
    `${ORGANIZATION_API_ROUTE}?${params.toString()}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  return response.json();
};

/**
 * Retrieves an organization by its ID.
 * @param organizationId - Organization ID.
 */
const getOrganization = async (
  organizationId: GetOrganizationParam['organizationId']
): Promise<GetOrganizationResult> => {
  const response = await fetch(`${ORGANIZATION_API_ROUTE}/${organizationId}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};

/**
 * Adds a new organization to the database.
 * @param organization - Organization data.
 */
const addOrganization = async (
  organization: AddOrganizationBody
): Promise<AddOrganizationResult> => {
  const response = await fetch(ORGANIZATION_API_ROUTE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(organization),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Updates an existing organization in the database.
 * @param organization - Updated organization data.
 */
const updateOrganization = async (
  organization: UpdateOrganizationBody
): Promise<UpdateOrganizationResult> => {
  const response = await fetch(ORGANIZATION_API_ROUTE, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(organization),
    credentials: 'include',
  });
  return response.json();
};

/**
 * Deletes an organization from the database by its ID.
 * @param organizationId - Organization ID.
 */
const deleteOrganization = async (
  organizationId: DeleteOrganizationParam['organizationId']
): Promise<DeleteOrganizationResult> => {
  const response = await fetch(ORGANIZATION_API_ROUTE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: organizationId }),
    credentials: 'include',
  });
  return response.json();
};

export const organizationAPI = {
  getOrganizations,
  getOrganization,
  addOrganization,
  updateOrganization,
  deleteOrganization,
};
