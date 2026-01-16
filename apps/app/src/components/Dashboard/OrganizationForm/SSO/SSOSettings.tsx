'use client';

import {
  Button,
  Container,
  Form,
  H3,
  H4,
  Loader,
  useForm,
  useToast,
} from '@intlayer/design-system';
import {
  useDeleteSSOProvider,
  useListSSOProviders,
  useRegisterSSO,
  useSession,
} from '@intlayer/design-system/hooks';
import { Trash2 } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useMemo, useState } from 'react';
import { z } from 'zod/v4';

// SSO Provider type from better-auth
type SSOProvider = {
  id: string;
  providerId: string;
  issuer: string;
  domain: string;
  oidcConfig?: string;
  samlConfig?: string;
  organizationId?: string;
  userId: string;
};

// Define SSO config schema for registration
const useSSOConfigSchema = () => {
  return z.object({
    enabled: z.boolean(),
    providerType: z.enum(['saml', 'oidc']),
    domain: z.string().min(1, 'Domain is required'),
    samlConfig: z
      .object({
        issuer: z.string().min(1),
        entryPoint: z.url(),
        cert: z.string().min(1),
      })
      .optional(),
    oidcConfig: z
      .object({
        issuer: z.url(),
        clientId: z.string().min(1),
        clientSecret: z.string().min(1),
      })
      .optional(),
  });
};

type SSOFormData = z.infer<ReturnType<typeof useSSOConfigSchema>>;

// Default values for SSO form
const defaultSSOValues: Partial<SSOFormData> = {
  enabled: false,
  providerType: 'oidc',
  domain: '',
  samlConfig: undefined,
  oidcConfig: undefined,
};

export const SSOSettings: FC = () => {
  const { session } = useSession();
  const { organization, roles } = session ?? {};
  const isOrganizationAdmin = roles?.includes('org_admin');
  const { toast } = useToast();

  const SSOConfigSchema = useSSOConfigSchema();
  const { mutate: registerSSO, isPending: isPendingRegisterSSO } =
    useRegisterSSO();
  const { mutate: deleteSSOProvider, isPending: isPendingDelete } =
    useDeleteSSOProvider();
  const { data: ssoProvidersData, isLoading: isLoadingProviders } =
    useListSSOProviders();

  const { form, isSubmitting } = useForm(SSOConfigSchema, {
    defaultValues: defaultSSOValues,
  });

  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [providerType, setProviderType] = useState<'saml' | 'oidc'>('oidc');

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
    saveButton,
    removeSSOProvider,
  } = useIntlayer('sso-settings');

  // Get existing SSO provider for this organization
  const existingProvider = useMemo(() => {
    if (!ssoProvidersData?.data || !organization?.id) return null;
    return (ssoProvidersData.data as SSOProvider[]).find(
      (provider) => provider.organizationId === organization.id
    );
  }, [ssoProvidersData?.data, organization?.id]);

  // Subscribe to form changes for enabled and provider type
  useEffect(() => {
    const subscription = form.watch((values) => {
      setSsoEnabled(Boolean(values.enabled));
      if (values.providerType) {
        setProviderType(values.providerType as 'saml' | 'oidc');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Set enabled to true if there's an existing provider
  useEffect(() => {
    if (existingProvider) {
      form.setValue('enabled', true);
      setSsoEnabled(true);
    }
  }, [existingProvider, form]);

  // Handle form submission - register SSO provider with better-auth
  const onSubmitSuccess = async (data: SSOFormData) => {
    if (!organization?.id) {
      toast({
        title: 'Error',
        description: 'Organization not found',
        variant: 'error',
      });
      return;
    }

    // Generate a unique provider ID for this organization
    const providerId = `${organization.id}-${data.providerType}`;

    try {
      // If there's an existing provider, delete it first
      if (existingProvider) {
        await new Promise<void>((resolve, reject) => {
          deleteSSOProvider(
            { providerId: existingProvider.providerId },
            {
              onSuccess: () => resolve(),
              onError: (error: Error) => reject(error),
            }
          );
        });
      }

      // Register the new SSO provider
      const registrationData: any = {
        providerId,
        domain: data.domain.toLowerCase().trim(),
        organizationId: organization.id,
      };

      if (data.providerType === 'oidc' && data.oidcConfig) {
        registrationData.issuer = data.oidcConfig.issuer;
        registrationData.oidcConfig = {
          clientId: data.oidcConfig.clientId,
          clientSecret: data.oidcConfig.clientSecret,
        };
      } else if (data.providerType === 'saml' && data.samlConfig) {
        registrationData.issuer = data.samlConfig.issuer;
        registrationData.samlConfig = {
          entryPoint: data.samlConfig.entryPoint,
          cert: data.samlConfig.cert,
        };
      }

      registerSSO(registrationData, {
        onSuccess: () => {
          toast({
            title: 'SSO Configured',
            description: 'SSO provider has been registered successfully',
            variant: 'success',
          });
        },
        onError: (error: Error) => {
          toast({
            title: 'Error',
            description: error.message || 'Failed to register SSO provider',
            variant: 'error',
          });
        },
      });
    } catch (err) {
      toast({
        title: 'Error',
        description:
          err instanceof Error
            ? err.message
            : 'Failed to configure SSO provider',
        variant: 'error',
      });
    }
  };

  // Handle delete SSO provider
  const handleDeleteProvider = () => {
    if (!existingProvider) return;

    deleteSSOProvider(
      { providerId: existingProvider.providerId },
      {
        onSuccess: () => {
          toast({
            title: 'SSO Removed',
            description: 'SSO provider has been removed successfully',
            variant: 'success',
          });
          // Reset form
          form.reset(defaultSSOValues);
        },
        onError: (error: Error) => {
          toast({
            title: 'Error',
            description: error.message || 'Failed to remove SSO provider',
            variant: 'error',
          });
        },
      }
    );
  };

  // Determine provider type from existing provider
  const existingProviderType = existingProvider?.samlConfig ? 'saml' : 'oidc';

  if (isLoadingProviders) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader />
      </div>
    );
  }

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
            {/* Show existing provider info */}
            {existingProvider && (
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
                      <strong>Provider ID:</strong>{' '}
                      {existingProvider.providerId}
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
            )}

            {/* Show registration form only if no existing provider */}
            {!existingProvider && (
              <>
                {/* Provider Type */}
                <div className="mt-4">
                  <span className="font-medium text-sm">
                    {providerTypeLabel}
                  </span>
                  <Form.SwitchSelector
                    name="providerType"
                    className="mt-2"
                    size="sm"
                    color="text"
                    disabled={!isOrganizationAdmin}
                    choices={[
                      { value: 'oidc', content: providerTypeOptions.oidc },
                      { value: 'saml', content: providerTypeOptions.saml },
                    ]}
                  />
                </div>

                {/* Domain */}
                <div className="mt-4">
                  <Form.Input
                    name="domain"
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
                        name="samlConfig.issuer"
                        label={samlConfigContent.idpEntityIdLabel}
                        placeholder={
                          samlConfigContent.idpEntityIdPlaceholder.value
                        }
                        disabled={!isOrganizationAdmin}
                      />
                      <Form.Input
                        name="samlConfig.entryPoint"
                        label={samlConfigContent.idpSSOUrlLabel}
                        placeholder={
                          samlConfigContent.idpSSOUrlPlaceholder.value
                        }
                        disabled={!isOrganizationAdmin}
                      />
                      <Form.AutoSizedTextArea
                        name="samlConfig.cert"
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
                        placeholder={
                          oidcConfigContent.clientIdPlaceholder.value
                        }
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
              </>
            )}
          </>
        )}

        <Form.Button
          className="mt-6 w-full"
          type="submit"
          color="text"
          disabled={!isOrganizationAdmin}
          isLoading={isSubmitting || isPendingRegisterSSO}
          label={saveButton.ariaLabel.value}
        >
          {saveButton.text}
        </Form.Button>
      </Form>
    </div>
  );
};
