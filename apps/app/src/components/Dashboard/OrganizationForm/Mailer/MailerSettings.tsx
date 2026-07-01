import {
  useSession,
  useUpdateOrganizationMailerConfig,
} from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import {
  Form,
  FormButton,
  FormCheckbox,
  FormInput,
  FormInputPassword,
  FormSwitchSelector,
  useForm,
} from '@intlayer/design-system/form';
import { H3, H4 } from '@intlayer/design-system/headers';
import { MaxHeightSmoother } from '@intlayer/design-system/max-height-smoother';
import { Mail } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/v4';

/**
 * Builds the mailer configuration form schema.
 *
 * Secrets are optional: when a Resend API key is already stored (`hasApiKey`),
 * the admin may leave the field blank to keep it unchanged. SMTP auth is
 * optional, so no password is ever required.
 *
 * @param hasApiKey - Whether a Resend API key is already stored.
 */
const useMailerConfigSchema = (hasApiKey: boolean) => {
  const content = useIntlayer('mailer-settings');

  return z
    .object({
      isActive: z.boolean(),
      provider: z.enum(['resend', 'smtp']),
      fromName: z.string().optional(),
      fromEmail: z.string().optional(),
      resendApiKey: z.string().optional(),
      smtpHost: z.string().optional(),
      smtpPort: z.coerce.number().int().positive().optional(),
      smtpSecure: z.boolean().optional(),
      smtpUser: z.string().optional(),
      smtpPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (!data.isActive) {
        return;
      }

      if (
        !data.fromEmail ||
        !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.fromEmail)
      ) {
        ctx.addIssue({
          code: 'custom',
          message: content.fromEmailInvalid.value,
          path: ['fromEmail'],
        });
      }

      if (data.provider === 'resend' && !hasApiKey && !data.resendApiKey) {
        ctx.addIssue({
          code: 'custom',
          message: content.apiKeyRequired.value,
          path: ['resendApiKey'],
        });
      }

      if (data.provider === 'smtp' && !data.smtpHost) {
        ctx.addIssue({
          code: 'custom',
          message: content.smtpHostRequired.value,
          path: ['smtpHost'],
        });
      }
    });
};

type MailerConfigFormData = z.infer<ReturnType<typeof useMailerConfigSchema>>;

export const MailerSettings: FC = () => {
  const { session } = useSession();
  const { organization, roles } = session ?? {};
  const isOrganizationAdmin =
    !!roles?.includes('org_admin') || !!roles?.includes('admin');

  const mailerConfig = organization?.mailerConfig;
  const hasApiKey = Boolean(mailerConfig?.resend?.hasApiKey);
  const hasPassword = Boolean(mailerConfig?.smtp?.hasPassword);

  const {
    title,
    description,
    enabledLabel,
    providerTypeLabel,
    providerTypeOptions,
    fromNameLabel,
    fromNamePlaceholder,
    fromEmailLabel,
    fromEmailPlaceholder,
    resendConfig,
    smtpConfig,
    secretConfiguredPlaceholder,
    saveButton,
  } = useIntlayer('mailer-settings');

  const MailerConfigSchema = useMailerConfigSchema(hasApiKey);

  const { mutate: updateMailerConfig, isPending } =
    useUpdateOrganizationMailerConfig();

  const { form, isSubmitting } = useForm(MailerConfigSchema, {
    defaultValues: {
      isActive: mailerConfig?.isActive ?? false,
      provider: mailerConfig?.provider ?? 'resend',
      fromName: mailerConfig?.fromName ?? '',
      fromEmail: mailerConfig?.fromEmail ?? '',
      resendApiKey: '',
      smtpHost: mailerConfig?.smtp?.host ?? '',
      smtpPort: mailerConfig?.smtp?.port,
      smtpSecure: mailerConfig?.smtp?.secure ?? false,
      smtpUser: mailerConfig?.smtp?.user ?? '',
      smtpPassword: '',
    },
  });

  const formValues = form.watch();
  const [isActive, setIsActive] = useState(Boolean(formValues.isActive));
  const provider = (formValues.provider as 'resend' | 'smtp') ?? 'resend';

  const onSubmitSuccess = async (data: MailerConfigFormData) => {
    updateMailerConfig({
      isActive: data.isActive,
      provider: data.provider,
      fromName: data.fromName?.trim() || undefined,
      fromEmail: data.fromEmail?.trim() || undefined,
      resend:
        data.provider === 'resend'
          ? { apiKey: data.resendApiKey?.trim() || undefined }
          : undefined,
      smtp:
        data.provider === 'smtp'
          ? {
              host: data.smtpHost?.trim() || undefined,
              port: data.smtpPort,
              secure: data.smtpSecure,
              user: data.smtpUser?.trim() || undefined,
              password: data.smtpPassword?.trim() || undefined,
            }
          : undefined,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Mail className="size-5" />
          <H3 className="mb-0">{title}</H3>
        </div>
        <p className="text-neutral text-sm dark:text-neutral-dark">
          {description}
        </p>
      </div>

      <Form
        schema={MailerConfigSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="size-full"
        {...form}
      >
        <Container border borderColor="text" className="p-4" roundedSize="2xl">
          <FormCheckbox
            name="isActive"
            color="text"
            inputLabel={enabledLabel}
            disabled={!isOrganizationAdmin}
            onChange={() => setIsActive((prev) => !prev)}
          />
        </Container>

        <MaxHeightSmoother isHidden={!isActive}>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <span className="font-medium text-sm">{providerTypeLabel}</span>
              <FormSwitchSelector
                name="provider"
                className="mt-2"
                size="sm"
                color="text"
                disabled={!isOrganizationAdmin}
                choices={[
                  { value: 'resend', content: providerTypeOptions.resend },
                  { value: 'smtp', content: providerTypeOptions.smtp },
                ]}
              />
            </div>

            <FormInput
              name="fromName"
              label={fromNameLabel}
              placeholder={fromNamePlaceholder.value}
              disabled={!isOrganizationAdmin}
            />
            <FormInput
              name="fromEmail"
              type="email"
              label={fromEmailLabel}
              placeholder={fromEmailPlaceholder.value}
              disabled={!isOrganizationAdmin}
            />

            {provider === 'resend' && (
              <Container
                border
                borderColor="text"
                className="p-4"
                roundedSize="2xl"
              >
                <H4 className="mb-4">{resendConfig.title}</H4>
                <FormInputPassword
                  name="resendApiKey"
                  label={resendConfig.apiKeyLabel}
                  placeholder={
                    hasApiKey
                      ? secretConfiguredPlaceholder.value
                      : resendConfig.apiKeyPlaceholder.value
                  }
                  autoComplete="new-password"
                  disabled={!isOrganizationAdmin}
                />
              </Container>
            )}

            {provider === 'smtp' && (
              <Container
                border
                borderColor="text"
                className="flex flex-col gap-4 p-4"
                roundedSize="2xl"
              >
                <H4 className="mb-0">{smtpConfig.title}</H4>
                <FormInput
                  name="smtpHost"
                  label={smtpConfig.hostLabel}
                  placeholder={smtpConfig.hostPlaceholder.value}
                  disabled={!isOrganizationAdmin}
                />
                <FormInput
                  name="smtpPort"
                  type="number"
                  label={smtpConfig.portLabel}
                  placeholder="587"
                  disabled={!isOrganizationAdmin}
                />
                <FormInput
                  name="smtpUser"
                  label={smtpConfig.userLabel}
                  placeholder={smtpConfig.userPlaceholder.value}
                  autoComplete="off"
                  disabled={!isOrganizationAdmin}
                />
                <FormInputPassword
                  name="smtpPassword"
                  label={smtpConfig.passwordLabel}
                  placeholder={
                    hasPassword ? secretConfiguredPlaceholder.value : undefined
                  }
                  autoComplete="new-password"
                  disabled={!isOrganizationAdmin}
                />
                <FormCheckbox
                  name="smtpSecure"
                  color="text"
                  inputLabel={smtpConfig.secureLabel}
                  disabled={!isOrganizationAdmin}
                />
              </Container>
            )}
          </div>
        </MaxHeightSmoother>

        <FormButton
          className="mt-6 w-full"
          type="submit"
          color="text"
          disabled={!isOrganizationAdmin}
          isLoading={isSubmitting || isPending}
          label={saveButton.ariaLabel.value}
        >
          {saveButton.text}
        </FormButton>
      </Form>
    </div>
  );
};
