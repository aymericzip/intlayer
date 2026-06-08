import { type Dictionary, t } from 'intlayer';

const clientComponentContent = {
  key: 'client-component-example',
  content: {
    title: t({
      en: 'Client Component Example',
      fr: 'Exemple de composant client',
      es: 'Ejemplo de componente cliente',
    }),
    content: t({
      en: 'This is a client component that uses Intlayer for internationalization.',
      fr: "Ceci est un composant client qui utilise Intlayer pour l'internationalisation.",
      es: 'Este es un componente cliente que usa Intlayer para internacionalización.',
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
