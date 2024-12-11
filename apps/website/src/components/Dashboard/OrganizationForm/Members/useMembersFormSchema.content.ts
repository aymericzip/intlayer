import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'members-form-schema',
  content: {
    requiredErrorMember: t({
      en: 'Please add at least one member to the project',
      fr: 'Veuillez ajouter au moins un membre au projet',
      es: 'Por favor, agregue al menos un miembro al proyecto',
    }),

    requiredErrorAdmin: t({
      en: 'Please add at least one admin to the project',
      fr: 'Veuillez ajouter au moins un administrateur au projet',
      es: 'Por favor, agregue al menos un administrador al proyecto',
    }),
  },
} satisfies DeclarationContent;

export default content;
