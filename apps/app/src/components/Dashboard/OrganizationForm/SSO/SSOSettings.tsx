import { MaxHeightSmoother } from '@intlayer/design-system';
import { Container } from '@intlayer/design-system/container';
import { Form, useForm } from '@intlayer/design-system/form';
import { H3 } from '@intlayer/design-system/headers';
import {
  useDeleteSSOProvider,
  useListSSOProviders,
  useRegisterSSO,
  useSession,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { useToast } from '@intlayer/design-system/toaster';
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
  // Use a union to handle different states
  return z.discriminatedUnion('enabled', [
    // State: SSO is Enabled (Fields are required)
    z.object({
      enabled: z.literal(true),
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
    }),
    // State: SSO is Disabled (Fields are not required)
    z.object({
      enabled: z.literal(false),
      providerType: z.enum(['saml', 'oidc']).optional(),
      domain: z.string().optional(),
      samlConfig: z.any().optional(),
      oidcConfig: z.any().optional(),
    }),
  ]);
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
  const isOrganizationAdmin = !!roles?.includes('org_admin');
  const { toast } = useToast();

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

  const providerType = (formValues.providerType as 'saml' | 'oidc') || 'oidc';
  const [existingProviderType, setExistingProviderType] = useState(
    providerType === 'saml' ? 'saml' : 'oidc'
  );

  // Set enabled to true if there's an existing provider (only once on mount)
  useEffect(() => {
    if (existingProvider && !formValues.enabled) {
      form.reset({ ...formValues, enabled: true });
    }
  }, [existingProvider?.id]); // Only depend on the provider ID, not the whole object

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

    // Prepare registration data
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
      registrationData.issuer = data.samlConfig.issuer;
      registrationData.samlConfig = {
        entryPoint: data.samlConfig.entryPoint,
        cert: data.samlConfig.cert,
      };
    }

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
        schema={SSOConfigSchema as any}
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
              existingProviderType={existingProviderType}
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
                <span className="font-medium text-sm">{providerTypeLabel}</span>
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
                  onChange={(value: 'oidc' | 'saml') => {
                    setExistingProviderType(value);
                  }}
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
              {existingProviderType === 'saml' && (
                <SAMLConfigForm isOrganizationAdmin={isOrganizationAdmin} />
              )}

              {/* OIDC Configuration */}
              {existingProviderType === 'oidc' && (
                <OIDCConfigForm isOrganizationAdmin={isOrganizationAdmin} />
              )}
            </>
          )}
        </MaxHeightSmoother>

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
