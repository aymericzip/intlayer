import { Container } from '@intlayer/design-system/container';
import { Form } from '@intlayer/design-system/form';
import { H4 } from '@intlayer/design-system/headers';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

interface OIDCConfigFormProps {
  isOrganizationAdmin: boolean;
}

export const OIDCConfigForm: FC<OIDCConfigFormProps> = ({
  isOrganizationAdmin,
}) => {
  const { oidcConfig: oidcConfigContent } = useIntlayer('sso-settings');

  return (
    <Container border borderColor="text" className="mt-6 p-4" roundedSize="2xl">
      <H4 className="mb-4">{oidcConfigContent.title}</H4>
      <div className="flex flex-col gap-4">
        <Form.Input
          name="oidcConfig.issuer"
          label={oidcConfigContent.issuerLabel}
          placeholder={oidcConfigContent.issuerPlaceholder.value}
          disabled={!isOrganizationAdmin}
        />
        <Form.Input
          name="oidcConfig.clientId"
          label={oidcConfigContent.clientIdLabel}
          placeholder={oidcConfigContent.clientIdPlaceholder.value}
          disabled={!isOrganizationAdmin}
        />
        <Form.Input
          name="oidcConfig.clientSecret"
          label={oidcConfigContent.clientSecretLabel}
          placeholder={oidcConfigContent.clientSecretPlaceholder.value}
          type="password"
          disabled={!isOrganizationAdmin}
        />
      </div>
    </Container>
  );
};
