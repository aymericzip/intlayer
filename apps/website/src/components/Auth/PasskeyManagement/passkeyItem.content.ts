import { type DeclarationContent, t } from 'intlayer';

const passkeyItemContent = {
  key: 'passkey-item',
  content: {
    createdAt: t({
      en: 'Created',
      fr: 'Créée le',
      es: 'Creada el',
    }),
    deleteButton: t({
      en: 'Delete',
      fr: 'Supprimer',
      es: 'Eliminar',
    }),
    confirmDelete: t({
      en: 'Confirm',
      fr: 'Confirmer',
      es: 'Confirmar',
    }),
    cancelButton: t({
      en: 'Cancel',
      fr: 'Annuler',
      es: 'Cancelar',
    }),
  },
} satisfies DeclarationContent;

export default passkeyItemContent;
