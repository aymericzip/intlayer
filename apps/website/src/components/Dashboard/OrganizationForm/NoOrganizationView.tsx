'use client';

import { useForm, Button, H3 } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { getOrganizationSchema } from './OrganizationFormSchema';

type NoOrganizationViewProps = {
  onClickCreateOrganization: () => void;
};

export const NoOrganizationView: FC<NoOrganizationViewProps> = ({
  onClickCreateOrganization,
}) => {
  const SignInSchema = getOrganizationSchema();
  const { isSubmitting } = useForm(SignInSchema);
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
      >
        {createOrganizationButton.text}
      </Button>
    </div>
  );
};
