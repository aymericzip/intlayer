import { type Dictionary, t } from 'intlayer';

const clientComponentContent = {
  key: 'client-component-example',
  content: {
    content: t({
      en: 'This is a client component that uses Intlayer for internationalization.',
      es: 'Este es un componente cliente que usa Intlayer para internacionalización.',
      fr: "Ceci est un composant client qui utilise Intlayer pour l'internationalisation.",
    }),
    title: t({
      en: 'Client Component Example',
      es: 'Ejemplo de componente cliente',
      fr: 'Exemple de composant client',
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
