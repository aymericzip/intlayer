'use client';

import { useAuth } from '@intlayer/design-system';
import type { FC } from 'react';
import { NoOrganizationView } from './NoOrganizationView';
import { OrganizationEditionForm } from './OrganizationEditionForm';

export const OrganizationForm: FC = () => {
  const { session } = useAuth();
  const { organization } = session ?? {};

  if (!organization) {
    return <NoOrganizationView />;
  }

  return <OrganizationEditionForm />;
};
