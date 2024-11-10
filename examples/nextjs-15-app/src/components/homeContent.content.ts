import { type DeclarationContent, t } from 'intlayer';

const homeContent = {
  key: 'home-content',
  content: {
    getStartedByEditing: t({
      en: 'Get started by editing',
      fr: 'Commencez par éditer',
      es: 'Comience por editar',
    }),
    welcomeMessage: t({
      en: 'Welcome to our application!',
      fr: 'Bienvenue dans notre application!',
      es: '¡Bienvenido a nuestra aplicación!',
    }),
    introductionText: t({
      en: 'This is the best place to learn and grow.',
      fr: "C'est le meilleur endroit pour apprendre et grandir.",
      es: 'Este es el mejor lugar para aprender y crecer.',
    }),
    footerNote: t({
      en: 'All rights reserved.',
      fr: 'Tous droits réservés.',
      es: 'Todos los derechos reservados.',
    }),
    contactUs: t({
      en: 'Contact Us',
      fr: 'Contactez-nous',
      es: 'Contáctenos',
    }),
    termsOfService: t({
      en: 'Terms of Service',
      fr: "Conditions d'utilisation",
      es: 'Términos de servicio',
    }),
    privacyPolicy: t({
      en: 'Privacy Policy',
      fr: 'Politique de confidentialité',
      es: 'Política de privacidad',
    }),
    exploreFeatures: t({
      en: 'Explore our features',
      fr: 'Découvrez nos fonctionnalités',
      es: 'Explora nuestras características',
    }),
    signUp: t({
      en: 'Sign Up',
      fr: "S'inscrire",
      es: 'Regístrate',
    }),
    logIn: t({
      en: 'Log In',
      fr: 'Se connecter',
      es: 'Iniciar sesión',
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
