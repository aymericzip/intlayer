'use client';

import {
  Container,
  Form,
  H3,
  H4,
  MaxHeightSmoother,
  useForm,
} from '@intlayer/design-system';
import {
  useSession,
  useUpdateOrganization,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';
import { z } from 'zod/v4';

// Define SSO config schema - avoiding .default() to prevent value/defaultValue conflicts
const useSSOConfigSchema = () => {
  return z.object({
    enabled: z.boolean(),
    providerType: z.enum(['saml', 'oidc']).optional(),
    domains: z.string().optional(), // Will be converted to array
    samlConfig: z
      .object({
        idpEntityId: z.string().optional(),
        idpSSOUrl: z.url().optional().or(z.literal('')),
        idpCertificate: z.string().optional(),
      })
      .optional(),
    oidcConfig: z
      .object({
        issuer: z.url().optional().or(z.literal('')),
        clientId: z.string().optional(),
        clientSecret: z.string().optional(),
      })
      .optional(),
    enforceSSO: z.boolean(),
    allowPasswordLogin: z.boolean(),
  });
};

type SSOFormData = z.infer<ReturnType<typeof useSSOConfigSchema>>;

// Default values for SSO form
const defaultSSOValues: SSOFormData = {
  enabled: false,
  providerType: undefined,
  domains: '',
  samlConfig: undefined,
  oidcConfig: undefined,
  enforceSSO: false,
  allowPasswordLogin: true,
};

export const SSOSettings: FC = () => {
  const { session } = useSession();
  const { organization, roles } = session ?? {};
  const isOrganizationAdmin = roles?.includes('org_admin');

  const SSOConfigSchema = useSSOConfigSchema();
  const { mutate: updateOrganization, isPending } = useUpdateOrganization();

  const { form, isSubmitting } = useForm(SSOConfigSchema, {
    defaultValues: defaultSSOValues,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [providerType, setProviderType] = useState<'saml' | 'oidc' | undefined>(
    undefined
  );

  const {
    title,
    description,
    enabledLabel,
    providerTypeLabel,
    providerTypeOptions,
    domainsLabel,
    domainsPlaceholder,
    domainsDescription,
    samlConfig: samlConfigContent,
    oidcConfig: oidcConfigContent,
    advancedSettings,
    saveButton,
  } = useIntlayer('sso-settings');

  // Subscribe to form changes
  useEffect(() => {
    const subscription = form.watch((values) => {
      setSsoEnabled(Boolean(values.enabled));
      setProviderType(values.providerType as 'saml' | 'oidc' | undefined);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmitSuccess = (data: SSOFormData) => {
    // Convert domains string to array
    const domainsArray = data.domains
      ? data.domains
          .split(',')
          .map((d) => d.trim())
          .filter(Boolean)
      : [];

    updateOrganization({
      ssoConfig: {
        enabled: data.enabled,
        providerType: data.providerType,
        domains: domainsArray,
        samlConfig:
          data.providerType === 'saml'
            ? {
                idpEntityId: data.samlConfig?.idpEntityId ?? '',
                idpSSOUrl: data.samlConfig?.idpSSOUrl ?? '',
                idpCertificate: data.samlConfig?.idpCertificate ?? '',
              }
            : undefined,
        oidcConfig:
          data.providerType === 'oidc'
            ? {
                issuer: data.oidcConfig?.issuer ?? '',
                clientId: data.oidcConfig?.clientId ?? '',
                clientSecret: data.oidcConfig?.clientSecret ?? '',
              }
            : undefined,
        enforceSSO: data.enforceSSO,
        allowPasswordLogin: data.allowPasswordLogin,
      },
    });
  };

  useEffect(() => {
    if (organization?.ssoConfig) {
      const ssoConfig = organization.ssoConfig;
      const formValues = {
        enabled: ssoConfig.enabled ?? false,
        providerType: ssoConfig.providerType,
        domains: ssoConfig.domains?.join(', ') ?? '',
        samlConfig: ssoConfig.samlConfig,
        oidcConfig: ssoConfig.oidcConfig,
        enforceSSO: ssoConfig.enforceSSO ?? false,
        allowPasswordLogin: ssoConfig.allowPasswordLogin ?? true,
      };
      form.reset(formValues);
      // Also sync local state
      setSsoEnabled(formValues.enabled);
      setProviderType(formValues.providerType as 'saml' | 'oidc' | undefined);
    }
  }, [form.reset, organization]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <H3 className="mb-2">{title}</H3>
        <p className="text-neutral text-sm dark:text-neutral-dark">
          {description}
        </p>
      </div>

      <Form
        schema={SSOConfigSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="size-full"
        {...form}
      >
        {/* Enable SSO Checkbox */}
        <Container border borderColor="text" className="p-4" roundedSize="2xl">
          <Form.Checkbox
            name="enabled"
            inputLabel={enabledLabel}
            disabled={!isOrganizationAdmin}
          />
        </Container>

        {ssoEnabled && (
          <>
            {/* Provider Type */}
            <div className="mt-4">
              <span className="font-medium text-sm">{providerTypeLabel}</span>
              <Form.SwitchSelector
                name="providerType"
                className="mt-2"
                size="sm"
                color="text"
                disabled={!isOrganizationAdmin}
                choices={[
                  { value: 'saml', content: providerTypeOptions.saml },
                  { value: 'oidc', content: providerTypeOptions.oidc },
                ]}
              />
            </div>

            {/* Domains */}
            <div className="mt-4">
              <Form.Input
                name="domains"
                label={domainsLabel}
                placeholder={domainsPlaceholder.value}
                disabled={!isOrganizationAdmin}
              />
              <p className="mt-1 text-neutral text-xs dark:text-neutral-dark">
                {domainsDescription}
              </p>
            </div>

            {/* SAML Configuration */}
            {providerType === 'saml' && (
              <Container
                border
                borderColor="text"
                className="mt-6 p-4"
                roundedSize="2xl"
              >
                <H4 className="mb-4">{samlConfigContent.title}</H4>
                <div className="flex flex-col gap-4">
                  <Form.Input
                    name="samlConfig.idpEntityId"
                    label={samlConfigContent.idpEntityIdLabel}
                    placeholder={samlConfigContent.idpEntityIdPlaceholder.value}
                    disabled={!isOrganizationAdmin}
                  />
                  <Form.Input
                    name="samlConfig.idpSSOUrl"
                    label={samlConfigContent.idpSSOUrlLabel}
                    placeholder={samlConfigContent.idpSSOUrlPlaceholder.value}
                    disabled={!isOrganizationAdmin}
                  />
                  <Form.AutoSizedTextArea
                    name="samlConfig.idpCertificate"
                    label={samlConfigContent.idpCertificateLabel}
                    placeholder={
                      samlConfigContent.idpCertificatePlaceholder.value
                    }
                    rows={10}
                    disabled={!isOrganizationAdmin}
                  />
                </div>
              </Container>
            )}

            {/* OIDC Configuration */}
            {providerType === 'oidc' && (
              <Container
                border
                borderColor="text"
                className="mt-6 p-4"
                roundedSize="2xl"
              >
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
                    placeholder={
                      oidcConfigContent.clientSecretPlaceholder.value
                    }
                    type="password"
                    disabled={!isOrganizationAdmin}
                  />
                </div>
              </Container>
            )}

            {/* Advanced Settings */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="font-medium text-sm dark:text-primary-dark"
                color="text"
              >
                {showAdvanced ? '▼' : '▶'} {advancedSettings.title}
              </button>
              <MaxHeightSmoother isHidden={!showAdvanced} minHeight={0}>
                <Container
                  border
                  borderColor="text"
                  className="mt-4 flex flex-col gap-4 p-4"
                  roundedSize="2xl"
                >
                  {/* Enforce SSO */}
                  <div>
                    <Form.Checkbox
                      name="enforceSSO"
                      inputLabel={advancedSettings.enforceSSOLabel}
                      disabled={!isOrganizationAdmin}
                    />
                    <p className="ml-6 text-neutral text-xs dark:text-neutral-dark">
                      {advancedSettings.enforceSSODescription}
                    </p>
                  </div>

                  {/* Allow Password Login */}
                  <div>
                    <Form.Checkbox
                      name="allowPasswordLogin"
                      inputLabel={advancedSettings.allowPasswordLoginLabel}
                      disabled={!isOrganizationAdmin}
                    />
                    <p className="ml-6 text-neutral text-xs dark:text-neutral-dark">
                      {advancedSettings.allowPasswordLoginDescription}
                    </p>
                  </div>
                </Container>
              </MaxHeightSmoother>
            </div>
          </>
        )}

        <Form.Button
          className="mt-6 w-full"
          type="submit"
          color="text"
          disabled={!isOrganizationAdmin}
          isLoading={isSubmitting || isPending}
          label={saveButton.ariaLabel.value}
        >
          {saveButton.text}
        </Form.Button>
      </Form>
    </div>
  );
};
