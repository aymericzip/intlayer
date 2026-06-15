import type { ProjectConfiguration } from '@intlayer/backend';
import {
  usePushProjectConfiguration,
  useSession,
} from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import {
  Form,
  FormButton,
  FormInput,
  FormInputPassword,
  FormSwitchSelector,
  useForm,
} from '@intlayer/design-system/form';
import { H3, H4 } from '@intlayer/design-system/headers';
import { MaxHeightSmoother } from '@intlayer/design-system/max-height-smoother';
import { AiProviders } from '@intlayer/types/config';
import { Save, Waypoints } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { z } from 'zod';

/**
 * Builds the validation schema for the OpenRouter settings form.
 *
 * When the override is enabled and no key is already stored, an API key must be
 * provided. The base URL, when present, must be a valid http(s) URL.
 *
 * @param hasConfiguredKey - Whether an OpenRouter API key is already stored on
 * the project (in which case the field may be left empty to keep it).
 */
const useOpenRouterSchema = (hasConfiguredKey: boolean) => {
  const { apiKey, invalidUrl } = useIntlayer('openrouter-settings');

  return z
    .object({
      enabled: z.boolean(),
      apiKey: z.string().optional(),
      model: z.string().optional(),
      baseURL: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (!data.enabled) return;

      if (!hasConfiguredKey && !data.apiKey?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: apiKey.required.value,
          path: ['apiKey'],
        });
      }

      if (data.baseURL?.trim() && !/^https?:\/\//.test(data.baseURL.trim())) {
        ctx.addIssue({
          code: 'custom',
          message: invalidUrl.value,
          path: ['baseURL'],
        });
      }
    });
};

type OpenRouterFormData = z.infer<ReturnType<typeof useOpenRouterSchema>>;

/**
 * Project-scoped settings card that overrides the project AI configuration to
 * route every AI feature through the project owner's OpenRouter account.
 *
 * Persists `configuration.ai = { provider: 'openrouter', apiKey, model, baseURL }`
 * via {@link usePushProjectConfiguration}, which preserves the stored API key
 * when the field is left empty (the session only exposes a masked key).
 */
export const OpenRouterSettings: FC = () => {
  const { session } = useSession();
  const { project } = session ?? {};
  const isProjectAdmin =
    session?.roles?.includes('project_admin') ||
    session?.roles?.includes('admin');
  const { mutate: pushProjectConfiguration, isPending: isUpdating } =
    usePushProjectConfiguration();

  const aiConfig = project?.configuration?.ai;
  const isOpenRouter = aiConfig?.provider === AiProviders.OPENROUTER;
  const hasConfiguredKey = isOpenRouter && Boolean(aiConfig?.apiKey);

  const {
    title,
    description,
    enableToggle,
    apiKey: apiKeyContent,
    model: modelContent,
    baseURL: baseURLContent,
    saveButton,
  } = useIntlayer('openrouter-settings');

  const schema = useOpenRouterSchema(hasConfiguredKey);

  const defaultValues: OpenRouterFormData = {
    enabled: isOpenRouter,
    apiKey: '',
    model: isOpenRouter ? (aiConfig?.model ?? '') : '',
    baseURL: isOpenRouter ? (aiConfig?.baseURL ?? '') : '',
  };

  const { form } = useForm(schema as any, { defaultValues });

  useEffect(() => {
    form.reset({
      enabled: isOpenRouter,
      apiKey: '',
      model: isOpenRouter ? (aiConfig?.model ?? '') : '',
      baseURL: isOpenRouter ? (aiConfig?.baseURL ?? '') : '',
    });
  }, [isOpenRouter, aiConfig?.model, aiConfig?.baseURL]);

  const isEnabled = Boolean(form.watch('enabled'));

  const handleSave = (data: OpenRouterFormData) => {
    const baseConfig = (project?.configuration ?? {}) as ProjectConfiguration;

    let nextConfiguration: ProjectConfiguration;

    if (data.enabled) {
      const trimmedKey = data.apiKey?.trim();

      nextConfiguration = {
        ...baseConfig,
        ai: {
          ...baseConfig.ai,
          provider: AiProviders.OPENROUTER,
          model: data.model?.trim() || undefined,
          baseURL: data.baseURL?.trim() || undefined,
          // Only send a new key when the user typed one; otherwise leave it
          // empty so the backend preserves the stored (real) key. Never send
          // back the masked key exposed in the session.
          apiKey: trimmedKey || undefined,
        },
      };
    } else if (isOpenRouter) {
      // Disabling removes the OpenRouter override; leave any other provider
      // configuration untouched.
      const { ai: _ai, ...rest } = baseConfig;
      nextConfiguration = rest;
    } else {
      nextConfiguration = baseConfig;
    }

    pushProjectConfiguration(nextConfiguration);
  };

  return (
    <Form
      schema={schema as any}
      onSubmitSuccess={handleSave}
      className="flex w-full flex-col gap-8"
      {...form}
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Waypoints className="size-5" />
          <H3 className="mb-0">{title}</H3>
        </div>
        <p className="text-neutral text-sm dark:text-neutral-dark">
          {description}
        </p>
      </div>

      <Container
        roundedSize="2xl"
        border
        borderColor="text"
        className="flex flex-col gap-4 px-6 py-4"
      >
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <H4>{enableToggle.label}</H4>
            <p className="max-w-md text-neutral text-sm">
              {enableToggle.description}
            </p>
          </div>
          <div className="flex-0">
            <FormSwitchSelector
              name="enabled"
              disabled={!isProjectAdmin}
              color="text"
              size="sm"
            />
          </div>
        </div>

        <MaxHeightSmoother isHidden={!isEnabled}>
          <div className="flex flex-col gap-4 pt-2">
            <div>
              <FormInputPassword
                name="apiKey"
                label={apiKeyContent.label.value}
                placeholder={apiKeyContent.placeholder.value}
                autoComplete="new-password"
                disabled={!isProjectAdmin}
              />
              {hasConfiguredKey && (
                <p className="mt-1 text-neutral text-xs dark:text-neutral-dark">
                  {apiKeyContent.configuredHint}
                </p>
              )}
            </div>

            <FormInput
              name="model"
              label={modelContent.label.value}
              placeholder={modelContent.placeholder.value}
              disabled={!isProjectAdmin}
            />

            <FormInput
              name="baseURL"
              label={baseURLContent.label.value}
              placeholder={baseURLContent.placeholder.value}
              disabled={!isProjectAdmin}
            />
          </div>
        </MaxHeightSmoother>
      </Container>

      {isProjectAdmin && (
        <div className="flex justify-end border-neutral/30 border-t border-dotted pt-3">
          <FormButton
            type="submit"
            label={saveButton.ariaLabel.value}
            color="text"
            isLoading={isUpdating}
            disabled={!isProjectAdmin}
            isFullWidth={false}
            Icon={Save}
          >
            {saveButton.text}
          </FormButton>
        </div>
      )}
    </Form>
  );
};
