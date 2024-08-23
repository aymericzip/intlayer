import { OrganizationModel } from '@models/organization.model';
import type { Organization } from '@schemas/organization.type';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import type { Request, Response } from 'express';
import {
  getOrganizationFiltersAndPagination,
  type OrganizationFilters,
} from '../utils/filtersAndPagination/getOrganizationFiltersAndPagination';

export const getOrganizations = async (
  req: Request<FiltersAndPagination<OrganizationFilters>>,
  res: Response
) => {
  // Get the filters and pagination from the request
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getOrganizationFiltersAndPagination(req);

  // Get the organizations from the database
  const organizations = await OrganizationModel.find(filters)
    .skip(skip)
    .limit(pageSize);

  // Get the total number of organizations
  const totalItems = await OrganizationModel.countDocuments(filters);

  // Return the formatted organization
  return res.status(200).json({
    success: true,
    data: organizations,
    page,
    page_size: pageSize,
    total_pages: getNumberOfPages(totalItems),
    total_items: totalItems,
  });
};

export const addOrganization = async (req: Request, res: Response) => {
  const organization: Organization = req.body;

  const organizations = await OrganizationModel.create(organization);

  return res.status(200).json(organizations);
};

export const updateOrganization = async (req: Request, res: Response) => {
  const organization: Organization | null = req.body;

  if (!organization)
    return res.status(400).json({ error: 'Organization not found' });

  const organizations = await OrganizationModel.updateOne(
    { _id: organization._id },
    organization
  );

  return res.status(200).json(organizations);
};

export const deleteOrganization = async (req: Request, res: Response) => {
  const organizationId = req.params.organizationId;

  const organizations = await OrganizationModel.deleteOne({
    _id: organizationId,
  });

  return res.status(200).json(organizations);
};
