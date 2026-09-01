---
createdAt: 2026-01-10
updatedAt: 2026-08-29
title: "Next.js i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Next.js multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compilateur
  - IA
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Première version"
author: aymericzip
---

# Comment rendre multilingue (i18n) une application Next.js existante (guide i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">

<iframe title="La meilleure solution i18n pour Next.js ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Voir [Modèle d'Application](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) sur GitHub.

## Table des Matières

<TOC/>

## Pourquoi est-il difficile d'internationaliser une application existante ?

Si vous avez déjà essayé d'ajouter plusieurs langues à une application conçue pour une seule, vous connaissez la difficulté. Ce n'est pas seulement « dur », c'est fastidieux. Vous devez parcourir chaque fichier, débusquer chaque chaîne de texte et les déplacer dans des fichiers de dictionnaire séparés.

Ensuite vient la partie risquée : remplacer tout ce texte par des hooks de code sans casser votre mise en page ou votre logique. C'est le genre de travail qui suspend le développement de nouvelles fonctionnalités pendant des semaines et ressemble à une refonte sans fin.

## Qu'est-ce que le Compilateur Intlayer ?

Le **Compilateur Intlayer** a été conçu pour vous épargner ce travail manuel fastidieux. Au lieu d'extraire manuellement les chaînes, le compilateur le fait pour vous. Il scanne votre code, repère le texte et utilise l'IA pour générer les dictionnaires en arrière-plan.
Ensuite, il modifie votre code pendant la compilation pour injecter les hooks i18n nécessaires. En gros, vous continuez à coder votre application comme si elle était monolingue, et le compilateur se charge de la transformation multilingue automatiquement.

> Doc Compilateur : [https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md)

### Limites

Puisque le compilateur effectue une analyse et une transformation du code (insertion de hooks et génération de dictionnaires) au moment de la **compilation**, il peut **ralentir le processus de build** de votre application.

Pour atténuer cet impact pendant le développement, vous pouvez configurer le compilateur pour fonctionner en mode [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) ou le désactiver lorsqu'il n'est pas nécessaire.

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js

<Steps>
<Step number={1} title="Installer les dépendances">

Installez les packages nécessaires via npm :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **next-intlayer**

  Le package qui intègre Intlayer à Next.js. Il fournit les context providers et les hooks pour l'internationalisation de Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi qu'un proxy pour détecter la locale préférée de l'utilisateur, gérer les cookies et rediriger les URL.

</Step>
<Step number={2} title="Configurer votre projet">

Créez un fichier de configuration pour définir les langues de votre application :

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * Indique si le compilateur doit être activé.
     */
    enabled: true,

    /**
     * Répertoire de sortie pour les dictionnaires optimisés.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Insérer uniquement le contenu dans le fichier généré, sans clé.
     */
    noMetadata: false,

    /**
     * Préfixe de clé de dictionnaire
     */
    dictionaryKeyPrefix: "", // Supprimer le préfixe de base

    /**
     * Indique si les composants doivent être sauvegardés après avoir été transformés.
     * De cette façon, le compilateur peut être exécuté une seule fois pour transformer l'application, puis il peut être supprimé.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Cette app est une application de cartographie",
  },
};

export default config;
```

> **Remarque** : Assurez-vous d'avoir votre `OPEN_AI_API_KEY` défini dans vos variables d'environnement.

> Grâce à ce fichier de configuration, vous pouvez paramétrer des URL localisées, une redirection proxy, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs d'Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation sur la configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>
<Step number={3} title="Intégrer Intlayer dans votre configuration Next.js">

Configurez votre projet Next.js pour utiliser Intlayer :

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* options de configuration ici */};

export default withIntlayer(nextConfig);
```

> Le plugin Next.js `withIntlayer()` est utilisé pour intégrer Intlayer avec Next.js. Il s'occupe de la construction des fichiers de déclaration de contenu et les surveille en mode de développement. Il définit les variables d'environnement d'Intlayer au sein des environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et garantir la compatibilité avec les composants serveur.

</Step>
<Step number={4} title="Configurer Babel">

Le compilateur Intlayer nécessite Babel pour extraire et optimiser votre contenu. Mettez à jour votre `babel.config.js` (ou `babel.config.json`) pour inclure les plugins Intlayer :

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

</Step>
<Step number={5} title="Détecter la locale dans vos pages">

Supprimez tout de `RootLayout` et remplacez-le par le code suivant :

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>
<Step number={6} title="Compiler vos composants">

Avec le compilateur activé, vous **n'avez plus besoin** de déclarer manuellement les dictionnaires de contenu (comme les fichiers `.content.ts`).

À la place, vous pouvez écrire votre contenu directement dans votre code en tant que chaînes de caractères. Intlayer analysera votre code, générera les traductions en utilisant le fournisseur d'IA configuré et remplacera les chaînes par du contenu localisé lors de la compilation.

Rédigez simplement vos composants avec des chaînes de caractères codées en dur dans votre langue par défaut. Le compilateur s'occupe du reste.

Exemple de ce à quoi pourrait ressembler votre page :

<Tabs>
<Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Commencez par éditer</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

</Tab>
<Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      es: {
        getStartedByEditing: "Comience editando",
      },
    }
  }
}
```

</Tab>
</Tabs>
<Tabs>
<Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerProvider`** est monté une seule fois, dans la layout racine. Il fournit la locale aux composants serveur et client, de sorte que les pages ne s'enveloppent plus elles-mêmes.
- Sans un segment de chemin `[locale]`, la locale provient toujours de la requête — l'en-tête `x-intlayer-locale` défini par le proxy Intlayer, puis le cookie de locale — que les hooks serveur lisent d'eux-mêmes quand le provider n'a pas encore été exécuté.

</Tab>
<Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerClientProvider`** est utilisé pour fournir la locale aux composants côté client.
- **`IntlayerServerProvider`** est utilisé pour fournir la locale aux enfants serveurs.

  > Le layout et la page ne peuvent pas partager un contexte serveur commun car le système de contexte serveur est basé sur un magasin de données par requête (via le mécanisme de [cache de React](https://react.dev/reference/react/cache)), ce qui entraîne la recréation de chaque « contexte » pour différents segments de l'application. Placer le fournisseur dans un layout partagé briserait cette isolation, empêchant la propagation correcte des valeurs du contexte serveur vers vos composants serveur.

</Tab>
</Tabs>
</Step>
<Step number={7} title="Remplir les traductions manquantes" isOptional={true}>

Intlayer fournit un outil CLI pour vous aider à remplir les traductions manquantes. Vous pouvez utiliser la commande `intlayer` pour tester et remplir les traductions manquantes de votre code.

```bash packageManager="npm"
npx intlayer test         # Tester s'il y a des traductions manquantes
```

```bash packageManager="yarn"
yarn intlayer test         # Tester s'il y a des traductions manquantes
```

```bash packageManager="pnpm"
pnpm intlayer test         # Tester s'il y a des traductions manquantes
```

```bash packageManager="bun"
bun x intlayer test         # Tester s'il y a des traductions manquantes
```

```bash packageManager="npm"
npx intlayer fill         # Remplir les traductions manquantes
```

```bash packageManager="yarn"
yarn intlayer fill         # Remplir les traductions manquantes
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Remplir les traductions manquantes
```

```bash packageManager="bun"
bun x intlayer fill         # Remplir les traductions manquantes
```

> Pour plus de détails, consultez la [documentation CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/ci.md)

</Step>
<Step number={8} title="Configurer le Proxy pour la Détection de Locale" isOptional={true}>

Mettez en place le proxy pour détecter la locale préférée de l'utilisateur :

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` est utilisé pour détecter la locale préférée de l'utilisateur et le rediriger vers l'URL appropriée telle que spécifiée dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md). De plus, il permet de sauvegarder la locale préférée de l'utilisateur dans un cookie.

> Depuis Intlayer v9, ce middleware respecte l'option `routing.enableProxy` (`true` par défaut). Définissez `routing.enableProxy: false` dans votre configuration pour le transformer en pass-through sans supprimer ce fichier. Voir les [notes de version v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/releases/v9.md).

</Step>
<Step number={9} title="Changer la langue de votre contenu" isOptional={true}>

Pour changer la langue de votre contenu dans Next.js, la méthode recommandée est d'utiliser le composant `Link` pour rediriger les utilisateurs vers la page localisée appropriée. Le composant `Link` permet le prefetch de la page, ce qui aide à éviter un rechargement complet de la page.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - ex: FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre Locale - ex: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la Locale actuelle - ex: Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - ex: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Une façon alternative d'utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction ne permet pas de pré-fetcher la page. Consultez la [documentation du hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useLocale.md) pour plus de détails.

</Step>
<Step number={10} title="Optimisez la taille de votre bundle" isOptional={true}>

Lors de l'utilisation de `next-intlayer`, les dictionnaires sont par défaut inclus dans le bundle pour chaque page. Pour optimiser la taille du bundle, Intlayer fournit un plugin SWC optionnel qui remplace intelligemment les appels à `useIntlayer` via des macros. Cela garantit que les dictionnaires ne sont inclus que dans les bundles des pages qui les utilisent réellement.

Le plugin `@intlayer/babel` intègre déjà l'optimisation du bundling (voir `babel.config.js`). Cependant, le plugin `@intlayer/swc` est plus performant. Si vous supprimez le plugin `@intlayer/babel`, vous pouvez utiliser le plugin `@intlayer/swc`.

Pour activer cette optimisation, installez le paquet `@intlayer/swc`. Une fois installé, `next-intlayer` détectera et utilisera automatiquement le plugin :

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Note : Cette optimisation n'est disponible que pour Next.js 13 et les versions ultérieures.

> Note : Ce package n'est pas installé par défaut, car les plugins SWC sont encore expérimentaux dans Next.js. Cela pourrait changer à l'avenir.

> Note : Si vous définissez l'option comme `importMode: 'dynamic'` ou `importMode: 'fetch'` (dans la configuration de `dictionary`), elle s'appuiera sur Suspense, de sorte que vous devrez envelopper vos appels à `useIntlayer` dans une frontière `Suspense`. Cela signifie que vous ne pourrez pas utiliser `useIntlayer` directement au niveau le plus haut de votre composant Page / Layout.

</Step>
<Step number={11} title="Extraire le contenu de vos composants" isOptional={true}>

Si vous avez une base de code existante, transformer des milliers de fichiers peut prendre beaucoup de temps.

Pour faciliter ce processus, Intlayer propose un [compilateur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) / [extracteur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md) pour transformer vos composants et extraire le contenu.

Pour le configurer, vous pouvez ajouter une section `compiler` dans votre fichier `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Reste de votre configuration
  compiler: {
    /**
     * Indique si le compilateur doit être activé.
     */
    enabled: true,

    /**
     * Définit le chemin des fichiers de sortie
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indique si les composants doivent être sauvegardés après avoir été transformés.
     * De cette façon, le compilateur peut être exécuté une seule fois pour transformer l'application, puis il peut être supprimé.
     */
    saveComponents: false,

    /**
     * Préfixe de clé de dictionnaire
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
<Tab value='Extract command'>

Exécutez l'extracteur pour transformer vos composants et extraire le contenu

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

</Tab>
<Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extraire le contenu des composants dans les dictionnaires
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # Ou npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Ou pnpm run dev
```

```bash packageManager="yarn"
yarn build # Ou yarn dev
```

```bash packageManager="bun"
bun run build # Ou bun run dev
```

</Tab>
</Tabs>
</Step>
</Steps>

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour tirer parti des avantages de TypeScript et renforcer votre base de code.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types autogénérés.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations existantes de TypeScript
  "include": [
    // ... Vos configurations existantes de TypeScript
    ".intlayer/**/*.ts", // Inclure les types auto-générés
  ],
}
```

### Configuration de Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commiter dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**Extension Intlayer VS Code** officielle.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **L'autocomplétion** pour les clés de traduction.
- **La détection en temps réel des erreurs** pour les traductions manquantes.
- **Des aperçus en ligne** du contenu traduit.
- **Des actions rapides** pour faciliter la création et la mise à jour des traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'Extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

### Aller plus loin

Pour aller plus loin, vous pouvez installer l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu via le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application Next.js ?">

Le champ `i18n` de `next.config.js` ne s'applique pas à l'App Router, la couche de localisation est donc toujours un choix de bibliothèque :

- **`next-intl`**, **`next-i18next` / `i18next`** et **`react-intl`** : des catalogues JSON ou ICU chargés par espace de noms, avec des clés écrites à la main à chaque appel.
- **`Lingui`** : piloté par l'extraction, avec des messages ICU compilés au moment du build.
- **`Intlayer`** : contenu compilé à partir de vos composants au moment du build, entièrement typé, avec traduction par IA, un éditeur visuel et un CMS.

Ce guide utilise la configuration avec compilateur, où vous continuez d'écrire des chaînes simples dans vos composants et où les dictionnaires sont générés pour vous. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle Next.js ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Les Server Components résolvent leur contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md).

</Question>

<Question title="Puis-je migrer depuis `next-intl`, `next-i18next` ou `i18next` sans réécrire mes composants ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_next-intl_to_intlayer.md) ou le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `next-intl`, `react-i18next` et `react-intl`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des composants.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non, et c'est ce que ce guide met en place. Vous écrivez vos composants avec des chaînes simples dans votre locale par défaut, et le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) analyse le code source à chaque build, extrait le texte destiné aux utilisateurs et génère les dictionnaires, de sorte qu'il n'y a aucune clé à créer ou à maintenir à la main.

Deux limites méritent d'être connues. Le compilateur fonctionne par analyse statique : les chaînes qui n'existent qu'à l'exécution, comme les codes d'erreur d'API ou les champs de CMS, restent hors de portée et nécessitent encore un dictionnaire déclaré. Et il doit distinguer le texte destiné aux utilisateurs de la logique applicative comme `className="active"` ou un code de statut, ce qui nécessite quelques annotations dans une grande base de code.

Si vous préférez garder le contrôle, `npx intlayer extract` effectue la même extraction une seule fois, sur les fichiers que vous choisissez, et écrit un fichier `.content` à côté de chaque composant pour que vous le relisiez. Voir la [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md).

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Dois-je utiliser le compilateur ou déclarer mon contenu moi-même ?">

Utilisez le compilateur lorsque vous voulez ajouter l'i18n à une base de code existante avec le moins de perturbation : vos composants restent tels quels et les dictionnaires suivent. Déclarez le contenu vous-même, comme le montre le [guide Next.js standard](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md), lorsque vous voulez un contrôle explicite sur les clés, la structure et la réutilisation. Les deux peuvent coexister dans la même couche de dictionnaires.

</Question>

<Question title="Pourquoi dois-je configurer Babel ?">

L'étape 4 le couvre. Le compilateur lit vos composants via une transformation Babel, Next.js a donc besoin d'un `babel.config.js` pour que la passe d'extraction s'exécute. `npx intlayer init --interactive` l'échafaude pour vous lorsque vous choisissez la configuration avec compilateur.

</Question>

<Question title="Qu'advient-il des chaînes que le compilateur ne peut pas voir ?">

Elles restent non traduites, car le compilateur fonctionne par analyse statique. Tout ce qui est assemblé à l'exécution, comme un message d'erreur d'API, un champ de CMS ou une chaîne construite par concaténation, doit être déclaré dans un fichier de contenu de la manière habituelle. Lancez `npx intlayer test` pour trouver ce qui manque.

</Question>

<Question title="Comment remplir les traductions manquantes ?">

L'étape 7 le couvre. `npx intlayer fill` envoie le contenu extrait au LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution à ce qui a changé sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Comment la locale est-elle détectée ?">

L'étape 5 la lit dans vos pages et l'étape 8 ajoute le proxy qui la résout à partir de l'URL, d'un cookie ou de l'en-tête `Accept-Language`. `routing.mode` décide si la locale apparaît dans le chemin. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et le texte enrichi ?">

Oui : les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md), le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) et les [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Comment les traducteurs peuvent-ils modifier le contenu sans toucher au code ?">

Via l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), qui tourne sur votre propre infrastructure et permet à quiconque de modifier le texte sur place sur l'application en cours d'exécution, ou le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), qui externalise le contenu afin qu'il puisse changer sans déploiement.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le CMS hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
