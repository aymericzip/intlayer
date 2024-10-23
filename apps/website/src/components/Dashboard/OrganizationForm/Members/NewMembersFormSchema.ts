import { t } from 'next-intlayer';
import { z } from 'zod';

export const getOrganizationNewMembersSchema = () => {
  const emailError = t({
    en: 'Please enter a valid email address',
    fr: 'Veuillez entrer une adresse email valide',
    es: 'Por favor, introduzca una dirección de correo electrónico válida',
  });

  return z.object({
    userEmail: z.string().email({ message: emailError }),
  });
};

export type OrganizationNewMembersFormData = z.infer<
  ReturnType<typeof getOrganizationNewMembersSchema>
>;
