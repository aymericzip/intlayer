# vite-intlayer : Package NPM pour internationaliser (i18n) une application Vite

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React et Express.js.

**Le package `vite-intlayer`** vous permet d'internationaliser votre application Vite. Il inclut le plugin Vite pour configurer les variables d'environnement dans le [bundler Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). Il fournit également un middleware pour détecter la langue préférée de l'utilisateur et le rediriger vers l'URL appropriée, comme spécifié dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/fr/configuration.md).

## Pourquoi internationaliser votre application Vite ?

Internationaliser votre application Vite est essentiel pour servir efficacement un public mondial. Cela permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

## Configuration

Le package `vite-intlayer` fonctionne parfaitement avec le [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/index.md), et le [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/index.md). Consultez la documentation correspondante pour plus d'informations.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Exemple d'utilisation

Voici un exemple d'intégration des plugins dans votre configuration Vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> Le plugin Vite `intlayerPlugin()` est utilisé pour intégrer Intlayer avec Vite. Il garantit la création des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans l'application Vite. De plus, il fournit des alias pour optimiser les performances.

> Le `intLayerMiddlewarePlugin()` ajoute un routage côté serveur à votre application. Ce plugin détectera automatiquement la langue actuelle en fonction de l'URL et définira le cookie de langue approprié. Si aucune langue n'est spécifiée, le plugin déterminera la langue la plus appropriée en fonction des préférences linguistiques du navigateur de l'utilisateur. Si aucune langue n'est détectée, il redirigera vers la langue par défaut.

## Maîtriser l'internationalisation de votre application Vite

Intlayer offre de nombreuses fonctionnalités pour vous aider à internationaliser votre application Vite.

**Pour en savoir plus sur ces fonctionnalités, consultez le guide [Internationalisation (i18n) avec Intlayer, Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_vite+react.md) pour les applications Vite et React.**
