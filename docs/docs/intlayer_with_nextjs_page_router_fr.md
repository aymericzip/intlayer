# Bien démarrer l'internationalisation (i18n) avec Intlayer et Next.js en utilisant le **Page Router**

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque innovante et open-source pour l'internationalisation (i18n), conçue pour simplifier la prise en charge multilingue dans les applications web modernes. Intlayer s'intègre parfaitement avec le framework **Next.js**, y compris son **Page Router** traditionnel..

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** grâce à des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Bénéficier du support TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection des erreurs.
- **Profiter de fonctionnalités avancées**, telles que la détection et le changement dynamique de langue.

> Remarque : Intlayer est compatible avec Next.js 12, 13, 14 et 15. Si vous utilisez le App Router de Next.js, consultez le [guide App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_14_en.md). Pour Next.js 15, suivez ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_15_en.md).

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js en utilisant le Page Router

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires avec votre gestionnaire de paquets préféré :

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour définir les langues prises en charge par votre application :

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ajoutez vos autres langues ici
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Pour une liste complète des options de configuration disponibles, consultez la [documentation sur la configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_en.md).

### Étape 3 : Intégrer Intlayer à la configuration Next.js

Modifiez votre configuration Next.js pour intégrer Intlayer :

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Votre configuration Next.js existante
};

export default withIntlayer(nextConfig);
```

### Étape 4 : Configurer un middleware pour la détection de langue

Configurez un middleware pour détecter et gérer automatiquement la langue préférée de l'utilisateur :

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Étape 5 : Définir des routes dynamiques par langue

Implémentez un routage dynamique pour servir du contenu localisé en fonction de la langue de l'utilisateur.

1. **Créer des pages spécifiques par langue :**

   Renommez votre fichier principal pour inclure le segment dynamique `[locale]`.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **Mettre à jour `_app.tsx` pour gérer la localisation :**

   Modifiez votre `_app.tsx` pour inclure les fournisseurs d'Intlayer.

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **Configurer `getStaticPaths` et `getStaticProps` :**

   Dans votre fichier `[locale]/index.tsx`, définissez les chemins et les propriétés pour gérer différentes langues.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* Votre contenu ici */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // Ajoutez vos langues ici

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```
