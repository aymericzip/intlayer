import { Button, Container, H4 } from '@intlayer/design-system';
import { Trash2 } from 'lucide-react';
import type { FC } from 'react';

interface CurrentProviderInfoProps {
  existingProvider: any;
  existingProviderType: string;
  isOrganizationAdmin: boolean;
  handleDeleteProvider: () => void;
  isPendingDelete: boolean;
  removeSSOProvider: any;
}

export const CurrentProviderInfo: FC<CurrentProviderInfoProps> = ({
  existingProvider,
  existingProviderType,
  isOrganizationAdmin,
  handleDeleteProvider,
  isPendingDelete,
  removeSSOProvider,
}) => (
  <Container
    border
    borderColor="text"
    className="mt-4 bg-card p-4"
    roundedSize="2xl"
  >
    <div className="flex items-center justify-between">
      <div>
        <H4 className="mb-1">Current SSO Provider</H4>
        <p className="text-neutral text-sm dark:text-neutral-dark">
          <strong>Type:</strong>{' '}
          {existingProviderType === 'saml' ? 'SAML 2.0' : 'OIDC'}
          <br />
          <strong>Domain:</strong> {existingProvider.domain}
          <br />
          <strong>Provider ID:</strong> {existingProvider.providerId}
        </p>
      </div>
      <Button
        variant="outline"
        color="error"
        Icon={Trash2}
        onClick={handleDeleteProvider}
        isLoading={isPendingDelete}
        disabled={!isOrganizationAdmin}
        label={removeSSOProvider.label.value}
      >
        {removeSSOProvider.text}
      </Button>
    </div>
  </Container>
);
