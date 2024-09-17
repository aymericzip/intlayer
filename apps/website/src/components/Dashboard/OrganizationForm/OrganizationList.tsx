import type { Organization } from '@intlayer/backend';
import { Button } from '@intlayer/design-system';
import { useSelectOrganization } from '@intlayer/design-system/hooks';
import type { FC } from 'react';

type OrganizationListProps = {
  organizations: Organization[];
};

export const OrganizationList: FC<OrganizationListProps> = ({
  organizations,
}) => {
  const { selectOrganization } = useSelectOrganization();

  return (
    <div>
      {organizations.map((organization) => (
        <div className="border-text" key={String(organization._id)}>
          <h2 className="font-bold">{organization.name}</h2>
          <Button
            onClick={() => selectOrganization(organization._id)}
            label="Select"
            color="text"
          >
            Select
          </Button>
        </div>
      ))}
    </div>
  );
};
