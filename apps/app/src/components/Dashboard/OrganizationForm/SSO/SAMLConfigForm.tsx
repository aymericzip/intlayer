import { Container } from '@intlayer/design-system/container';
import { Form } from '@intlayer/design-system/form';
import { H4 } from '@intlayer/design-system/headers';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

interface SAMLConfigFormProps {
  isOrganizationAdmin: boolean;
}

export const SAMLConfigForm: FC<SAMLConfigFormProps> = ({
  isOrganizationAdmin,
}) => {
  const { samlConfig: samlConfigContent } = useIntlayer('sso-settings');

  return (
    <Container border borderColor="text" className="mt-6 p-4" roundedSize="2xl">
      <H4 className="mb-4">{samlConfigContent.title}</H4>
      <div className="flex flex-col gap-4">
        <Form.Input
          name="samlConfig.issuer"
          label={samlConfigContent.idpEntityIdLabel}
          placeholder={samlConfigContent.idpEntityIdPlaceholder.value}
          disabled={!isOrganizationAdmin}
        />
        <Form.Input
          name="samlConfig.entryPoint"
          label={samlConfigContent.idpSSOUrlLabel}
          placeholder={samlConfigContent.idpSSOUrlPlaceholder.value}
          disabled={!isOrganizationAdmin}
        />
        <Form.AutoSizedTextArea
          name="samlConfig.cert"
          label={samlConfigContent.idpCertificateLabel}
          placeholder={samlConfigContent.idpCertificatePlaceholder.value}
          rows={10}
          disabled={!isOrganizationAdmin}
        />
      </div>
    </Container>
  );
};
