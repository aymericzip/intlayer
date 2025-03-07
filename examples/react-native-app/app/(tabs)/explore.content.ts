import { t, type Dictionary } from 'intlayer';

const tabTwoScreenContent = {
  key: 'tab-two-screen',
  content: {
    title: t({
      en: 'Explore',
      fr: 'Explorer',
      es: 'Explorar',
    }),
    description: t({
      en: 'This app includes example code to help you get started.',
      fr: "Cette application inclut du code d'exemple pour vous aider à démarrer.",
      es: 'Esta aplicación incluye código de ejemplo para ayudarte a empezar.',
    }),
    collapsibles: {
      fileBasedRouting: {
        title: t({
          en: 'File-based routing',
          fr: 'Routage basé sur les fichiers',
          es: 'Enrutamiento basado en archivos',
        }),
        description1: t({
          en: 'This app has two screens: ',
          fr: 'Cette application contient deux écrans : ',
          es: 'Esta aplicación tiene dos pantallas: ',
        }),
        description2: t({
          en: 'The layout file in app/(tabs)/_layout.tsx sets up the tab navigator.',
          fr: 'Le fichier de mise en page app/(tabs)/_layout.tsx configure le navigateur à onglets.',
          es: 'El archivo de diseño en app/(tabs)/_layout.tsx configura el navegador de pestañas.',
        }),
        learnMore: t({
          en: 'Learn more',
          fr: 'En savoir plus',
          es: 'Aprende más',
        }),
      },
      androidIosWebSupport: {
        title: t({
          en: 'Android, iOS, and web support',
          fr: "Prise en charge d'Android, d'iOS et du Web",
          es: 'Compatibilidad con Android, iOS y la web',
        }),
        description: t({
          en: 'You can open this project on Android, iOS, and the web. To open the web version, press w in the terminal running this project.',
          fr: 'Vous pouvez ouvrir ce projet sur Android, iOS et le Web. Pour ouvrir la version Web, appuyez sur w dans le terminal exécutant ce projet.',
          es: 'Puedes abrir este proyecto en Android, iOS y la web. Para abrir la versión web, presiona w en la terminal que ejecuta este proyecto.',
        }),
      },
      images: {
        title: t({
          en: 'Images',
          fr: 'Images',
          es: 'Imágenes',
        }),
        description1: t({
          en: 'For static images, you can use the @2x and @3x suffixes to provide files for different screen densities.',
          fr: 'Pour les images statiques, vous pouvez utiliser les suffixes @2x et @3x pour fournir des fichiers adaptés à différentes densités d’écran.',
          es: 'Para las imágenes estáticas, puedes usar los sufijos @2x y @3x para proporcionar archivos para diferentes densidades de pantalla.',
        }),
        learnMore: t({
          en: 'Learn more',
          fr: 'En savoir plus',
          es: 'Aprende más',
        }),
      },
      customFonts: {
        title: t({
          en: 'Custom fonts',
          fr: 'Polices personnalisées',
          es: 'Fuentes personalizadas',
        }),
        description1: t({
          en: 'Open app/_layout.tsx to see how to load custom fonts such as this one.',
          fr: 'Ouvrez app/_layout.tsx pour voir comment charger des polices personnalisées comme celle-ci.',
          es: 'Abre app/_layout.tsx para ver cómo cargar fuentes personalizadas como esta.',
        }),
        learnMore: t({
          en: 'Learn more',
          fr: 'En savoir plus',
          es: 'Aprende más',
        }),
      },
      lightDarkMode: {
        title: t({
          en: 'Light and dark mode components',
          fr: 'Composants en mode clair et sombre',
          es: 'Componentes en modo claro y oscuro',
        }),
        description: t({
          en: "This template has light and dark mode support. The useColorScheme() hook lets you inspect what the user's current color scheme is, and so you can adjust UI colors accordingly.",
          fr: 'Ce modèle prend en charge les modes clair et sombre. Le hook useColorScheme() vous permet de connaître le mode actuel de l’utilisateur et donc d’ajuster les couleurs de l’interface en conséquence.',
          es: 'Esta plantilla tiene soporte para modo claro y oscuro. El hook useColorScheme() te permite verificar el modo de color actual del usuario y ajustar los colores de la interfaz en consecuencia.',
        }),
        learnMore: t({
          en: 'Learn more',
          fr: 'En savoir plus',
          es: 'Aprende más',
        }),
      },
      animations: {
        title: t({
          en: 'Animations',
          fr: 'Animations',
          es: 'Animaciones',
        }),
        description1: t({
          en: 'This template includes an example of an animated component. The components/HelloWave.tsx component uses the powerful react-native-reanimated library to create a waving hand animation.',
          fr: 'Ce modèle inclut un exemple de composant animé. Le composant components/HelloWave.tsx utilise la puissante bibliothèque react-native-reanimated pour créer une animation de main qui salue.',
          es: 'Esta plantilla incluye un ejemplo de un componente animado. El componente components/HelloWave.tsx usa la poderosa biblioteca react-native-reanimated para crear una animación de mano saludando.',
        }),
        description2: t({
          en: 'The components/ParallaxScrollView.tsx component provides a parallax effect for the header image.',
          fr: "Le composant components/ParallaxScrollView.tsx fournit un effet de parallaxe pour l'image d'en-tête.",
          es: 'El componente components/ParallaxScrollView.tsx proporciona un efecto de paralaje para la imagen de encabezado.',
        }),
      },
    },
  },
} satisfies Dictionary;

export default tabTwoScreenContent;
