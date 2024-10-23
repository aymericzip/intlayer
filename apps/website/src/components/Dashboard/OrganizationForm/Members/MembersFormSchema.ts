import { t } from 'next-intlayer';
import { z } from 'zod';

export const getOrganizationMembersSchema = () => {
  const requiredErrorMember = t({
    en: 'Please add at least one member to the project',
    fr: 'Veuillez ajouter au moins un membre au projet',
    es: 'Por favor, agregue al menos un miembro al proyecto',
  });

  const requiredErrorAdmin = t({
    en: 'Please add at least one admin to the project',
    fr: 'Veuillez ajouter au moins un administrateur au projet',
    es: 'Por favor, agregue al menos un administrador al proyecto',
  });

  return z.object({
    membersIds: z.array(z.string()).min(1, { message: requiredErrorMember }),
    adminsIds: z.array(z.string()).min(1, { message: requiredErrorAdmin }),
  });
};

export type OrganizationMembersFormData = z.infer<
  ReturnType<typeof getOrganizationMembersSchema>
>;
