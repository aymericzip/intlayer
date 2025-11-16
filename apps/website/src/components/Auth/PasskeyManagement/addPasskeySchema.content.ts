import { type DeclarationContent, t } from 'intlayer';

const addPasskeySchemaContent = {
  key: 'add-passkey-schema',
  content: {
    nameInput: {
      error: t({
        en: 'Name is required',
        fr: 'Le nom est requis',
        es: 'El nombre es obligatorio',
      }),
    },
  },
} satisfies DeclarationContent;

export default addPasskeySchemaContent;
