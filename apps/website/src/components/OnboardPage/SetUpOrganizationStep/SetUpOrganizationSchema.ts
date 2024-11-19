import { t } from 'next-intlayer';
import { z } from 'zod';

export const getSetUpOrganizationSchema = () => {
  const requiredErrorOrganizationId = t({
    en: 'Please select an organization',
    fr: 'Veuillez sélectionner une organisation',
    es: 'Por favor, seleccione una organización',
  });

  return z.object({
    organizationId: z.string({
      required_error: requiredErrorOrganizationId,
      invalid_type_error: requiredErrorOrganizationId,
    }),
  });
};

export type SetUpOrganization = z.infer<
  ReturnType<typeof getSetUpOrganizationSchema>
>;
