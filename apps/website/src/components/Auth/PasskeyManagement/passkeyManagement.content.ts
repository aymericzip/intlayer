import { type DeclarationContent, t } from 'intlayer';

const passkeyManagementContent = {
  key: 'passkey-management',
  content: {
    title: t({
      en: 'Passkeys',
      fr: 'Clés de sécurité',
      es: 'Llaves de acceso',
    }),
    description: t({
      en: 'Manage your passkeys for secure, passwordless authentication.',
      fr: 'Gérez vos clés de sécurité pour une authentification sécurisée sans mot de passe.',
      es: 'Administre sus llaves de acceso para una autenticación segura sin contraseña.',
    }),
    noPasskeysTitle: t({
      en: 'No passkeys yet',
      fr: 'Aucune clé de sécurité',
      es: 'No hay llaves de acceso todavía',
    }),
    noPasskeysDescription: t({
      en: 'Add your first passkey for secure, passwordless authentication.',
      fr: 'Ajoutez votre première clé de sécurité pour une authentification sécurisée sans mot de passe.',
      es: 'Agregue su primera llave de acceso para una autenticación segura sin contraseña.',
    }),
    addPasskeyButton: t({
      en: 'New Passkey',
      fr: 'Nouvelle clé',
      es: 'Nueva llave',
    }),
  },
} satisfies DeclarationContent;

export default passkeyManagementContent;
