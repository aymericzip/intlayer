import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import {
  useDeleteSSOProvider,
  useListSSOProviders,
  useRegisterSSO,
  useSession,
} from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import { Form, useForm } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { MaxHeightSmoother } from '@intlayer/design-system/max-height-smoother';
import { Shield } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/v4';
import { CurrentProviderInfo } from './CurrentProviderInfo';
import { OIDCConfigForm } from './OIDCConfigForm';
import { SAMLConfigForm } from './SAMLConfigForm';

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
  const content = useIntlayer('sso-settings');

  return z
    .discriminatedUnion('enabled', [
      // State: SSO is Enabled (Fields are required)
      z.object({
        enabled: z.literal(true),
        providerType: z.enum(['saml', 'oidc']),
        domain: z.string().min(1, content.domainIsRequired.value),
        samlConfig: z
          .object({
            issuer: z.string().optional(),
            entryPoint: z.string().optional(),
            cert: z.string().optional(),
          })
          .optional(),
        oidcConfig: z
          .object({
            issuer: z.string().optional(),
            clientId: z.string().optional(),
            clientSecret: z.string().optional(),
          })
          .optional(),
      }),
      // State: SSO is Disabled (Fields are not required)
      z.object({
        enabled: z.literal(false),
        providerType: z.enum(['saml', 'oidc']).optional(),
        domain: z.string().optional(),
        samlConfig: z.any().optional(),
        oidcConfig: z.any().optional(),
      }),
    ])
    .superRefine((data, ctx) => {
      if (data.enabled) {
        if (data.providerType === 'oidc') {
          if (!data.oidcConfig?.issuer) {
            ctx.addIssue({
              code: 'custom',
              message: content.issuerIsRequired.value,
              path: ['oidcConfig', 'issuer'],
            });
          } else if (!/^https?:\/\//.test(data.oidcConfig.issuer)) {
            ctx.addIssue({
              code: 'custom',
              message: content.invalidUrl.value,
              path: ['oidcConfig', 'issuer'],
            });
          }

          if (!data.oidcConfig?.clientId) {
            ctx.addIssue({
              code: 'custom',
              message: content.clientIdIsRequired.value,
              path: ['oidcConfig', 'clientId'],
            });
          }

          if (!data.oidcConfig?.clientSecret) {
            ctx.addIssue({
              code: 'custom',
              message: content.clientSecretIsRequired.value,
              path: ['oidcConfig', 'clientSecret'],
            });
          }
        }

        if (data.providerType === 'saml') {
          if (!data.samlConfig?.issuer) {
            ctx.addIssue({
              code: 'custom',
              message: content.issuerIsRequired.value,
              path: ['samlConfig', 'issuer'],
            });
          }

          if (!data.samlConfig?.entryPoint) {
            ctx.addIssue({
              code: 'custom',
              message: content.entryPointIsRequired.value,
              path: ['samlConfig', 'entryPoint'],
            });
          } else if (!/^https?:\/\//.test(data.samlConfig.entryPoint)) {
            ctx.addIssue({
              code: 'custom',
              message: content.invalidUrl.value,
              path: ['samlConfig', 'entryPoint'],
            });
          }

          if (!data.samlConfig?.cert) {
            ctx.addIssue({
              code: 'custom',
              message: content.certificateIsRequired.value,
              path: ['samlConfig', 'cert'],
            });
          }
        }
      }
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
  const isOrganizationAdmin =
    !!roles?.includes('org_admin') || !!roles?.includes('admin');

  const SSOConfigSchema = useSSOConfigSchema();
  const { mutate: registerSSO, isPending: isPendingRegisterSSO } =
    useRegisterSSO();
  const { mutate: deleteSSOProvider, isPending: isPendingDelete } =
    useDeleteSSOProvider();
  const { data: ssoProvidersData, isLoading: isLoadingProviders } =
    useListSSOProviders();

  const { form, isSubmitting } = useForm(SSOConfigSchema as any, {
    defaultValues: defaultSSOValues,
  });

  const {
    title,
    description,
    enabledLabel,
    providerTypeLabel,
    providerTypeOptions,
    domainsLabel,
    domainsPlaceholder,
    domainsDescription,
    saveButton,
  } = useIntlayer('sso-settings');

  // Get existing SSO provider for this organization
  const existingProvider = (ssoProvidersData?.data as SSOProvider[])?.find(
    (provider) => provider.organizationId === organization?.id
  );

  // Derive state from form values instead of using effects
  const formValues = form.watch();
  const [isSsoEnabled, setIsSsoEnabled] = useState(Boolean(formValues.enabled));

  const providerType = (formValues.providerType as 'saml' | 'oidc') ?? 'oidc';

  // Set enabled to true if there's an existing provider (only once on mount)
  useEffect(() => {
    if (existingProvider && !formValues.enabled) {
      form.reset({ ...formValues, enabled: true });
      setIsSsoEnabled(true);
    }
  }, [existingProvider?.id]); // Only depend on the provider ID, not the whole object

  // Handle form submission - register SSO provider with better-auth
  const onSubmitSuccess = async (data: SSOFormData) => {
    if (!organization?.id) return;

    if (!data.enabled) {
      if (existingProvider) {
        await new Promise<void>((resolve, reject) => {
          deleteSSOProvider(
            { providerId: existingProvider.providerId },
            {
              onSuccess: () => {
                form.reset(defaultSSOValues);
                setIsSsoEnabled(false);
                resolve();
              },
              onError: (e: Error) => reject(e),
            }
          );
        });
      }
      return;
    }

    const providerId = `${organization.id}-${data.providerType}`;

    const registrationData: any = {
      providerId,
      domain: data.domain?.toLowerCase().trim(),
      organizationId: organization.id,
    };

    if (data.providerType === 'oidc' && data.oidcConfig) {
      registrationData.issuer = data.oidcConfig.issuer;
      registrationData.oidcConfig = {
        clientId: data.oidcConfig.clientId,
        clientSecret: data.oidcConfig.clientSecret,
      };
    } else if (data.providerType === 'saml' && data.samlConfig) {
      const backendURL = editor?.backendURL ?? BACKEND_URL;
      registrationData.issuer = data.samlConfig.issuer;
      registrationData.samlConfig = {
        entryPoint: data.samlConfig.entryPoint,
        cert: data.samlConfig.cert,
        callbackUrl: `${backendURL}/api/auth/sso/saml2/sp/acs/${providerId}`,
        spMetadata: {},
      };
    }

    if (!registrationData.issuer) return;

    try {
      if (existingProvider) {
        await new Promise<void>((resolve, reject) => {
          deleteSSOProvider(
            { providerId: existingProvider.providerId },
            { onSuccess: () => resolve(), onError: (e: Error) => reject(e) }
          );
        });
      }

      registerSSO(registrationData);
    } catch {
      // Error toast already shown globally by ReactQueryProvider
    }
  };

  // Handle delete SSO provider
  const handleDeleteProvider = () => {
    if (!existingProvider) return;

    deleteSSOProvider(
      { providerId: existingProvider.providerId },
      {
        onSuccess: () => {
          form.reset(defaultSSOValues);
          setIsSsoEnabled(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Shield className="size-5" />
          <H3 className="mb-0">{title}</H3>
        </div>
        <p className="text-neutral text-sm dark:text-neutral-dark">
          {description}
        </p>
      </div>

      <Form
        schema={SSOConfigSchema as any}
        onSubmitSuccess={onSubmitSuccess}
        className="size-full"
        {...form}
      >
        {/* Enable SSO Checkbox */}
        <Loader isLoading={isLoadingProviders}>
          <Container
            border
            borderColor="text"
            className="p-4"
            roundedSize="2xl"
          >
            <Form.Checkbox
              name="enabled"
              color="text"
              inputLabel={enabledLabel}
              disabled={!isOrganizationAdmin}
              onChange={() => {
                setIsSsoEnabled((prev) => !prev);
              }}
            />
          </Container>
          <MaxHeightSmoother isHidden={!isSsoEnabled}>
            {/* Show existing provider info */}
            {existingProvider && (
              <CurrentProviderInfo
                existingProvider={existingProvider}
                existingProviderType={providerType}
                isOrganizationAdmin={isOrganizationAdmin}
                handleDeleteProvider={handleDeleteProvider}
                isPendingDelete={isPendingDelete}
              />
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
                  <SAMLConfigForm isOrganizationAdmin={isOrganizationAdmin} />
                )}

                {/* OIDC Configuration */}
                {providerType === 'oidc' && (
                  <OIDCConfigForm isOrganizationAdmin={isOrganizationAdmin} />
                )}
              </>
            )}
          </MaxHeightSmoother>
        </Loader>

        <Form.Button
          className="mt-6 w-full"
          type="submit"
          color="text"
          disabled={!isOrganizationAdmin || isLoadingProviders}
          isLoading={isSubmitting || isPendingRegisterSSO}
          label={saveButton.ariaLabel.value}
        >
          {saveButton.text}
        </Form.Button>
      </Form>
    </div>
  );
};
