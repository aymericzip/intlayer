import { AiProviders } from '@intlayer/types';
import { Locales } from 'intlayer';
import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

const localeValues = Object.values(Locales) as [string, ...string[]];
const aiProviderValues = Object.values(AiProviders) as [string, ...string[]];

export const useConfigFormSchema = () => {
  const {
    localesRequired,
    defaultLocaleRequired,
    invalidUrl,
    defaultLocaleNotInLocales,
    invalidTemperature,
  } = useIntlayer('config-form-schema');

  return z
    .object({
      locales: z.array(z.enum(localeValues)).min(1, {
        error: localesRequired.value,
      }),
      defaultLocale: z.enum(localeValues, {
        error: () => defaultLocaleRequired.value,
      }),
      applicationURL: z
        .url({ error: invalidUrl.value })
        .optional()
        .or(z.literal('')),
      cmsURL: z.url({ error: invalidUrl.value }).optional().or(z.literal('')),
      // AI Configuration
      aiProvider: z.enum(aiProviderValues).optional(),
      aiModel: z.string().optional().or(z.literal('')),
      aiTemperature: z
        .number()
        .min(0, { error: invalidTemperature.value })
        .max(2, { error: invalidTemperature.value })
        .optional(),
      aiApiKey: z.string().optional().or(z.literal('')),
      aiApplicationContext: z.string().optional().or(z.literal('')),
    })
    .refine((data) => data.locales.includes(data.defaultLocale), {
      message: defaultLocaleNotInLocales.value,
      path: ['defaultLocale'],
    });
};

export type ConfigFormData = z.infer<ReturnType<typeof useConfigFormSchema>>;
