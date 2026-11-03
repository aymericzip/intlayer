import { type Dictionary, t } from 'intlayer';

const serverComponentContent = {
  key: 'server-component-example',
  content: {
    description: t({
      en: 'This is a server component that uses Intlayer for internationalization. It renders on the server and can access translations directly.',
      es: 'Este es un componente servidor que usa Intlayer para internacionalización. Se renderiza en el servidor y puede acceder a las traducciones directamente.',
      fr: "Ceci est un composant serveur qui utilise Intlayer pour l'internationalisation. Il se rend sur le serveur et peut accéder aux traductions directement.",
    }),
    feature1: t({
      en: 'Server-side rendering',
      es: 'Renderizado del lado del servidor',
      fr: 'Rendu côté serveur',
    }),
    feature2: t({
      en: 'Direct translation access',
      es: 'Acceso directo a las traducciones',
      fr: 'Accès direct aux traductions',
    }),
    feature3: t({
      en: 'SEO optimized',
      es: 'Optimizado para SEO',
      fr: 'Optimisé pour le SEO',
    }),
    features: t({
      en: 'Features:',
      es: 'Características:',
      fr: 'Fonctionnalités :',
    }),
    title: t({
      en: 'Server Component Example',
      es: 'Ejemplo de componente servidor',
      fr: 'Exemple de composant serveur',
    }),
  },
} satisfies Dictionary;

export default serverComponentContent;
