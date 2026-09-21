import { AiProviders } from '@intlayer/types/config';
import { Locales } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

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
      locales: z.array(z.enum(localeValues)).check(
        z.minLength(1, {
          error: localesRequired.value,
        })
      ),
      defaultLocale: z.enum(localeValues, {
        error: () => defaultLocaleRequired.value,
      }),
      applicationURL: z.union([
        z.optional(z.url({ error: invalidUrl.value })),
        z.literal(''),
      ]),
      cmsURL: z.union([
        z.optional(z.url({ error: invalidUrl.value })),
        z.literal(''),
      ]),
      // AI Configuration
      aiProvider: z.optional(z.enum(aiProviderValues)),
      aiModel: z.union([z.optional(z.string()), z.literal('')]),
      aiTemperature: z.optional(
        z
          .number()
          .check(
            z.minimum(0, { error: invalidTemperature.value }),
            z.maximum(2, { error: invalidTemperature.value })
          )
      ),
      aiApiKey: z.union([z.optional(z.string()), z.literal('')]),
      aiApplicationContext: z.union([z.optional(z.string()), z.literal('')]),
    })
    .check(
      z.refine((data) => data.locales.includes(data.defaultLocale), {
        message: defaultLocaleNotInLocales.value,
        path: ['defaultLocale'],
      })
    );
};

export type ConfigFormData = z.infer<ReturnType<typeof useConfigFormSchema>>;
