---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer et next-intl
description: Intègre Intlayer avec next-intl pour l'internationalisation (i18n) d'une application React
keywords:
  - next-intl
  - Intlayer
  - Internationalisation
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
---

# Next.js Internationalization (i18n) avec next-intl et Intlayer

Les deux frameworks open-source next-intl et Intlayer sont conçus pour les applications Next.js. Ils sont largement utilisés pour gérer les traductions, la localisation et le changement de langue dans les projets logiciels.

Ils partagent trois notions principales :

1. **Déclaration de Contenu** : La méthode pour définir le contenu traduisible de votre application.

   - Appelé `fichier de déclaration de contenu` dans Intlayer, qui peut être un fichier JSON, JS ou TS exportant des données structurées. Consultez la [documentation d’Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/concept/content.md) pour plus d'informations.
   - Appelé `messages` ou `locale messages` dans next-intl, généralement dans des fichiers JSON. Consultez la [documentation de next-intl](https://github.com/amannn/next-intl) pour plus d'informations.

2. **Utilitaires** : Outils pour construire et interpréter des déclarations de contenu dans l'application, comme `useIntlayer()` ou `useLocale()` pour Intlayer, et `useTranslations()` pour next-intl.

3. **Plugins et Middleware** : Fonctionnalités pour gérer la redirection d'URL, l'optimisation des bundles, et plus encore, par exemple, `intlayerMiddleware` pour Intlayer ou [`createMiddleware`](https://github.com/amannn/next-intl) pour next-intl.

## Intlayer vs. next-intl : Différences Clés

Pour une analyse plus approfondie de la façon dont Intlayer se compare à d'autres bibliothèques i18n pour Next.js (comme next-intl), consultez l'[article de blog next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18next_vs_next-intl_vs_intlayer.md).

## Comment Générer des Messages next-intl avec Intlayer

### Pourquoi Utiliser Intlayer avec next-intl ?

Les fichiers de déclaration de contenu d'Intlayer offrent généralement une meilleure expérience développeur. Ils sont plus flexibles et maintenables en raison de deux principales avantages :

1. **Placement Flexible** : Vous pouvez placer un fichier de déclaration de contenu Intlayer n'importe où dans l'arborescence de fichiers de votre application. Cela facilite le renommage ou la suppression de composants sans laisser de fichiers de messages inutilisés ou en suspend.

   Exemples de structures de fichiers :

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Fichier de déclaration de contenu
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Fichier de déclaration de contenu
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Fichier de déclaration de contenu
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Fichier de déclaration de contenu
               └── index.jsx
   ```

2. **Traductions Centralisées** : Intlayer stocke toutes les traductions dans une seule déclaration de contenu, garantissant qu'aucune traduction ne manque. Dans les projets TypeScript, les traductions manquantes sont automatiquement signalées comme des erreurs de type, fournissant un retour immédiat aux développeurs.

### Installation

Pour utiliser Intlayer et next-intl ensemble, installez les deux bibliothèques :

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Configurer Intlayer pour Exporter des Messages next-intl

> **Remarque :** L'exportation de messages d'Intlayer pour next-intl peut introduire de légères différences de structure. Si possible, conservez un flux uniquement Intlayer ou uniquement next-intl afin de simplifier l'intégration. Si vous devez générer des messages next-intl à partir d'Intlayer, suivez les étapes ci-dessous.

Créez ou mettez à jour un fichier `intlayer.config.ts` (ou `.mjs` / `.cjs`) à la racine de votre projet :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // Utiliser la sortie next-intl
    nextIntlMessagesDir: "./intl/messages", // Où sauvegarder les messages next-intl
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### Déclaration de Contenu

Ci-dessous des exemples de fichiers de déclaration de contenu dans plusieurs formats. Intlayer compilera ceux-ci en fichiers de messages que next-intl pourra consommer.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-component",
  "content": {
    "helloWorld": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Construire les Messages next-intl

Pour générer les fichiers de messages pour next-intl, exécutez :

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Cela générera des ressources dans le répertoire `./intl/messages` (comme configuré dans `intlayer.config.*`). La sortie attendue :

```bash
.
└── intl
    └── messages
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Chaque fichier inclut des messages compilés à partir de toutes les déclarations de contenu d'Intlayer. Les clés de niveau supérieur correspondent généralement à vos champs `content.key`.

### Utiliser next-intl dans votre Application Next.js

> Pour plus de détails, consultez la [documentation officielle d'utilisation de next-intl](https://github.com/amannn/next-intl#readme).

1. **Créer un Middleware (optionnel) :**  
   Si vous souhaitez gérer la détection automatique de la locale ou la redirection, utilisez [createMiddleware](https://github.com/amannn/next-intl#createMiddleware) de next-intl.

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **Créer un `layout.tsx` ou `_app.tsx` pour Charger les Messages :**  
   Si vous utilisez le App Router (Next.js 13+), créez un layout :

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';


   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   Si vous utilisez le Pages Router (Next.js 12 ou inférieur), chargez les messages dans `_app.tsx` :

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **Récupérer les Messages Côté Serveur (exemple Pages Router) :**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Utiliser le Contenu dans les Composants Next.js

Une fois les messages chargés dans next-intl, vous pouvez les utiliser dans vos composants via le hook `useTranslations()` :

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' correspond à la clé de contenu dans Intlayer

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**C'est tout !** Chaque fois que vous mettez à jour ou ajoutez de nouveaux fichiers de déclaration de contenu Intlayer, réexécutez la commande `intlayer build` pour régénérer vos messages JSON next-intl. next-intl mettra automatiquement à jour le contenu.
