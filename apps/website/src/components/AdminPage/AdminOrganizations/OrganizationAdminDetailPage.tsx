'use client';

import { OrganizationForm } from '@components/Dashboard/OrganizationForm';
import { Loader } from '@intlayer/design-system';
import {
  useGetOrganizations,
  useSelectOrganization,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useEffect } from 'react';

export const OrganizationAdminDetailPage = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const { data, isLoading } = useGetOrganizations({
    ids: organizationId,
    fetchAll: 'true',
  } as any);
  const { mutate: selectOrganization, isPending } = useSelectOrganization();
  const { noOrganizationFound } = useIntlayer('organization-admin-page');

  const organization = (data?.data ?? [])[0];

  useEffect(() => {
    if (organization) {
      selectOrganization(organization.id);
    }
  }, [organization, selectOrganization]);

  return (
    <Loader isLoading={isLoading || isPending}>
      {organization ? (
        <OrganizationForm />
      ) : (
        <div className="py-12 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            {noOrganizationFound}
          </p>
        </div>
      )}
    </Loader>
  );
};

export default OrganizationAdminDetailPage;
