import { Locales } from 'intlayer';
import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

const localeValues = Object.values(Locales) as [string, ...string[]];

export const useConfigFormSchema = () => {
  const {
    localesRequired,
    defaultLocaleRequired,
    invalidUrl,
    defaultLocaleNotInLocales,
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
        .string()
        .url({ error: invalidUrl.value })
        .optional()
        .or(z.literal('')),
      cmsURL: z
        .string()
        .url({ error: invalidUrl.value })
        .optional()
        .or(z.literal('')),
    })
    .refine((data) => data.locales.includes(data.defaultLocale), {
      message: defaultLocaleNotInLocales.value,
      path: ['defaultLocale'],
    });
};

export type ConfigFormData = z.infer<ReturnType<typeof useConfigFormSchema>>;
