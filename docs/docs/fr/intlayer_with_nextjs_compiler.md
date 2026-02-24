---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Comment rendre multilingue (i18n) une application Next.js existante a posteriori (guide i18n 2026)
description: Découvrez comment rendre votre application Next.js existante multilingue avec le compilateur Intlayer. Suivez la documentation pour internationaliser (i18n) et la traduire avec l'IA.
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
  - environnement
  - nextjs
  - compilateur
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Première version
---

# Comment rendre multilingue (i18n) une application Next.js existante a posteriori (guide i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">
  
<iframe title="La meilleure solution i18n pour Next.js ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
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

Si vous avez déjà essayé d'ajouter plusieurs langues à une application conçue pour une seule, vous connaissez la difficulté. Ce n'est pas seulement « dur » — c'est fastidieux. Vous devez parcourir chaque fichier, débusquer chaque chaîne de texte et les déplacer dans des fichiers de dictionnaire séparés.

Ensuite vient la partie risquée : remplacer tout ce texte par des hooks de code sans casser votre mise en page ou votre logique. C'est le genre de travail qui suspend le développement de nouvelles fonctionnalités pendant des semaines et ressemble à une refonte sans fin.

## Qu'est-ce que le Compilateur Intlayer ?

Le **Compilateur Intlayer** a été conçu pour vous épargner ce travail manuel fastidieux. Au lieu d'extraire manuellement les chaînes, le compilateur le fait pour vous. Il scanne votre code, repère le texte et utilise l'IA pour générer les dictionnaires en arrière-plan.
Ensuite, il modifie votre code pendant la compilation pour injecter les hooks i18n nécessaires. En gros, vous continuez à coder votre application comme si elle était monolingue, et le compilateur se charge de la transformation multilingue automatiquement.

> Doc Compilateur : https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md

### Limites

Puisque le compilateur effectue une analyse et une transformation du code (insertion de hooks et génération de dictionnaires) au moment de la **compilation**, il peut **ralentir le processus de build** de votre application.

Pour atténuer cet impact pendant le développement, vous pouvez configurer le compilateur pour fonctionner en mode [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md) ou le désactiver lorsqu'il n'est pas nécessaire.

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js

### Étape 1 : Installer les dépendances

Installez les packages nécessaires via npm :

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **next-intlayer**

  Le package qui intègre Intlayer à Next.js. Il fournit les context providers et les hooks pour l'internationalisation de Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi qu'un proxy pour détecter la locale préférée de l'utilisateur, gérer les cookies et rediriger les URL.

### Étape 2 : Configurer votre projet

Créez un fichier de configuration pour définir les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
    enabled: true, // Peut être défini sur 'build-only' pour limiter l'impact en mode dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Pas de préfixe comp-
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Peut être défini sur 'build-only' pour limiter l'impact en mode dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Pas de préfixe comp-
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Peut être défini sur 'build-only' pour limiter l'impact en mode dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Pas de préfixe comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Cette app est une application de cartographie",
  },
};

module.exports = config;
```

> **Remarque** : Assurez-vous d'avoir défini votre `OPEN_AI_API_KEY` dans vos variables d'environnement.

> Grâce à ce fichier de configuration, vous pouvez paramétrer des URL localisées, une redirection proxy, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs d'Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation sur la configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 3 : Intégrer Intlayer dans la configuration Next.js

Configurez votre projet Next.js pour utiliser Intlayer :

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* options de configuration ici */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* options de configuration ici */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* options de configuration ici */
};

module.exports = withIntlayer(nextConfig);
```

> Le plugin Next.js `withIntlayer()` est utilisé pour intégrer Intlayer avec Next.js. Il s'occupe de la construction des fichiers de déclaration de contenu et les surveille en mode de développement. Il définit les variables d'environnement d'Intlayer au sein des environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et garantir la compatibilité avec les composants serveur.

### Étape 4 : Définir des routes dynamiques localisées

Supprimez tout de `RootLayout` et remplacez-le par le code suivant :

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Étape 5 : Déclarer votre contenu (Automatisé)

Avec le compilateur activé, vous **n'avez plus besoin** de déclarer manuellement les dictionnaires de contenu (comme les fichiers `.content.ts`).

À la place, vous pouvez écrire votre contenu directement dans votre code en tant que chaînes de caractères. Intlayer analysera votre code, générera les traductions en utilisant le fournisseur d'IA configuré et remplacera les chaînes par du contenu localisé lors de la compilation.

### Étape 6 : Utiliser le contenu dans votre code

Rédigez simplement vos composants avec des chaînes de caractères codées en dur dans votre langue par défaut. Le compilateur s'occupe du reste.

Exemple de ce à quoi pourrait ressembler votre page :

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const PageContent: FC = () => {
  return (
    <>
      <p>Commencez en éditant</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>Commencez en éditant</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { IntlayerServerProvider, getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>Commencez en éditant</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** est utilisé pour fournir la locale aux composants côté client.
- **`IntlayerServerProvider`** est utilisé pour fournir la locale aux enfants serveurs.

### (Optionnel) Étape 7 : Configurer le Proxy pour la Détection de Locale

Mettez en place le proxy pour détecter la locale préférée de l'utilisateur :

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy` est utilisé pour détecter la locale préférée de l'utilisateur et le rediriger vers l'URL appropriée telle que spécifiée dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md). De plus, il permet de sauvegarder la locale préférée de l'utilisateur dans un cookie.

### (Optionnel) Étape 8 : Changer la langue de votre contenu

Pour changer la langue de votre contenu dans Next.js, la méthode recommandée est d'utiliser le composant `Link` pour rediriger les utilisateurs vers la page localisée appropriée. Le composant `Link` permet le prefetch de la page, ce qui aide à éviter un rechargement complet de la page.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

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

### (Optionnel) Étape 9 : Récupérer la locale courante dans les Actions Serveur

Si vous avez besoin de la locale active dans une Action Serveur (par ex., pour localiser des e-mails ou exécuter une logique tenant compte de la locale), appelez `getLocale` depuis `next-intlayer/server` :

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Faire quelque chose avec la locale
};
```

> La fonction `getLocale` suit une stratégie en cascade pour déterminer la locale de l'utilisateur :
>
> 1. D'abord, elle vérifie les en-têtes de la requête pour une valeur de locale qui pourrait avoir été définie par le proxy.
> 2. Si aucune locale n'est trouvée dans les en-têtes, elle cherche une locale stockée dans les cookies.
> 3. Si aucun cookie n'est trouvé, elle tente de détecter la langue préférée de l'utilisateur à partir des paramètres de son navigateur.
> 4. En dernier recours, elle utilise par défaut la locale configurée pour l'application.
>
> Cela garantit que la locale la plus appropriée est sélectionnée en fonction du contexte disponible.

### (Optionnel) Étape 10 : Optimisez la taille de votre bundle

Lors de l'utilisation de `next-intlayer`, les dictionnaires sont par défaut inclus dans le bundle pour chaque page. Pour optimiser la taille du bundle, Intlayer fournit un plugin SWC optionnel qui remplace intelligemment les appels à `useIntlayer` via des macros. Cela garantit que les dictionnaires ne sont inclus que dans les bundles des pages qui les utilisent réellement.

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

### Survoler les changements des dictionnaires via Turbopack

Si le développement requiert que le serveur gère des changements avec Turbopack de concert avec la commande `next dev`, les modifications au sein du dictionnaire échapperont à la détection par défaut.

Cette limite découle du fait que Turbopack ne prend pas en charge l'exécution parallèle des plugins webpack pour surveiller ces révisions au sein des fichiers de contenus locaux. Pour contourner la situation, l'opérateur recourt nécessairement à la commande `intlayer watch`, lançant tant le serveur pour la configuration que la commande d'observation attitrée, ce conjointement.

```json5 fileName="package.json"
{
  // ... Vos configurations existantes de package.json
  "scripts": {
    // ... Vos configurations existantes de scripts
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Si vous utilisez next-intlayer@<=6.x.x, vous devez conserver le drapeau `--turbopack` pour que l'application Next.js 16 fonctionne correctement avec Turbopack. Nous recommandons l'utilisation de next-intlayer@>=7.x.x pour éviter cette restriction.

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

Pour aller plus loin, vous pouvez utiliser un [éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser le tout via le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
