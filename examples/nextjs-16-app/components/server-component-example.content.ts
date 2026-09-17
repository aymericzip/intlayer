import { type Dictionary, t } from 'intlayer';

const serverComponentContent = {
  key: 'server-component-example',
  content: {
    title: t({
      en: 'Server Component Example',
      fr: 'Exemple de composant serveur',
      es: 'Ejemplo de componente servidor',
    }),
    description: t({
      en: 'This is a server component that uses Intlayer for internationalization. It renders on the server and can access translations directly.',
      fr: "Ceci est un composant serveur qui utilise Intlayer pour l'internationalisation. Il se rend sur le serveur et peut accéder aux traductions directement.",
      es: 'Este es un componente servidor que usa Intlayer para internacionalización. Se renderiza en el servidor y puede acceder a las traducciones directamente.',
    }),
    features: t({
      en: 'Features:',
      fr: 'Fonctionnalités :',
      es: 'Características:',
    }),
    feature1: t({
      en: 'Server-side rendering',
      fr: 'Rendu côté serveur',
      es: 'Renderizado del lado del servidor',
    }),
    feature2: t({
      en: 'Direct translation access',
      fr: 'Accès direct aux traductions',
      es: 'Acceso directo a las traducciones',
    }),
    feature3: t({
      en: 'SEO optimized',
      fr: 'Optimisé pour le SEO',
      es: 'Optimizado para SEO',
    }),
  },
} satisfies Dictionary;

export default serverComponentContent;
