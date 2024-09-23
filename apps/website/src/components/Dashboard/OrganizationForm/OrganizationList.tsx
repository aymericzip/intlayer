import type { Organization } from '@intlayer/backend';
import { Button, useAuth, useToast } from '@intlayer/design-system';
import { useSelectOrganization } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type OrganizationListProps = {
  organizations: Organization[];
};

export const OrganizationList: FC<OrganizationListProps> = ({
  organizations,
}) => {
  const { selectOrganization } = useSelectOrganization();
  const { toast } = useToast();
  const { checkSession } = useAuth();
  const { selectOrganizationToasts } = useIntlayer('organization-form');
  const router = useRouter();

  const handleSelectOrganization = (organizationId: string) => {
    selectOrganization(organizationId)
      .then(async () => {
        toast({
          title: selectOrganizationToasts.organizationSelected.title.value,
          description:
            selectOrganizationToasts.organizationSelected.description.value,
          variant: 'success',
        });

        await checkSession();

        router.push(PagesRoutes.Dashboard_Projects);
      })
      .catch((error) => {
        toast({
          title:
            selectOrganizationToasts.organizationSelectionFailed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  return (
    <div className="w-full max-w-[350px]">
      {organizations.map((organization) => (
        <div
          className="border-neutral dark:border-neutral-dark flex w-full flex-col gap-3 rounded-lg border p-6"
          key={String(organization._id)}
        >
          <h2 className="font-bold">{organization.name}</h2>
          <Button
            onClick={() => handleSelectOrganization(String(organization._id))}
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
