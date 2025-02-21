'use client';

import { useForm, Button, H3 } from '@intlayer/design-system';
import { Plus } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useOrganizationSchema } from './useOrganizationFormSchema';

type NoOrganizationViewProps = {
  onClickCreateOrganization: () => void;
};

export const NoOrganizationView: FC<NoOrganizationViewProps> = ({
  onClickCreateOrganization,
}) => {
  const OrganizationSchema = useOrganizationSchema();
  const { isSubmitting } = useForm(OrganizationSchema);
  const {
    createOrganizationButton,
    createOrganizationTitle,
    createOrganizationDescription,
  } = useIntlayer('organization-form');

  return (
    <div className="flex size-full max-w-[400px] flex-1 flex-col items-center justify-center gap-3">
      <H3>{createOrganizationTitle}</H3>
      <span className="text-neutral dark:text-neutral-dark mb-3 text-sm">
        {createOrganizationDescription}
      </span>
      <Button
        color="text"
        isLoading={isSubmitting}
        label={createOrganizationButton.ariaLabel.value}
        isFullWidth={false}
        variant="outline"
        onClick={onClickCreateOrganization}
        Icon={Plus}
      >
        {createOrganizationButton.text}
      </Button>
    </div>
  );
};
