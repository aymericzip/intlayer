---
createdAt: 2026-01-10
updatedAt: 2026-08-29
title: "Next.js 16 i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application Next.js 16 multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 8.0.0
    date: 2026-01-10
    changes: "Version initiale"
author: aymericzip
---

# Traduisez votre site Next.js 16 (sans [locale] dans le chemin des pages) avec Intlayer | Internationalisation (i18n)

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">

<iframe title="La meilleure solution i18n pour Next.js ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démonstration CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Voir [Application Template](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) sur GitHub.

## Table des matières

<TOC/>

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `next-intl` ou `i18next`, Intlayer est une solution dotée d'optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Support complet de Next.js">

Intlayer est optimisé pour fonctionner avec les **composants serveur** pour un rendu efficace et est entièrement compatible avec [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Il ne bloque pas le rendu statique et propose un middleware ainsi que toutes les fonctionnalités nécessaires à l'internationalisation à l'échelle (i18n).

> Intlayer est compatible avec Next.js 12, 13, 14, 15 et 16. Si vous utilisez le routeur de pages Next.js, vous pouvez vous référer à ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_page_router.md).
> Le routage local est utile pour le référencement, la taille du bundle et les performances. Si vous n'en avez pas besoin, vous pouvez vous référer à ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_no_locale_path.md).
> Pour Next.js 12, 13, 14 et 15 avec App Router, reportez-vous à ce [guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Taille du bundle">

Au lieu de charger de lourds fichiers JSON dans vos pages, ne chargez que le contenu strictement nécessaire. Intlayer vous aide à **réduire la taille de votre bundle et de vos pages jusqu'à 50 %**.

</Accordion>

<Accordion header="Maintenabilité">

Déclarer le contenu directement au plus près de vos composants **facilite la maintenance** des applications de grande envergure. Vous pouvez dupliquer ou supprimer le dossier d'une fonctionnalité sans le fardeau mental de devoir passer en revue toute votre base de code de contenu. De plus, Intlayer est **entièrement typé** pour garantir l'exactitude de vos traductions.

</Accordion>

<Accordion header="Prêt pour les agents IA">

La colocalisation du contenu **réduit le contexte nécessaire** aux grands modèles de langage (LLM). Intlayer est également livré avec une suite d'outils, tels qu'une **CLI** pour vérifier les traductions manquantes, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** et des **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)**, afin de rendre l'expérience développeur (DX) encore plus fluide pour les agents IA.

</Accordion>

<Accordion header="Automatisation">

Automatisez les traductions dans votre pipeline CI/CD en utilisant le LLM de votre choix au coût de votre propre fournisseur d'IA. Intlayer propose également un **compilateur** pour automatiser l'extraction de contenu, ainsi qu'une [plateforme web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) pour vous aider à **traduire en arrière-plan**.

</Accordion>

<Accordion header="Performances">

Associer de gros fichiers JSON à vos composants peut ralentir les performances et impacter la réactivité. Intlayer optimise le chargement du contenu directement au moment du **build**.

</Accordion>

<Accordion header="Collaboration avec les non-développeurs">

Bien plus qu'une simple solution i18n, Intlayer propose un **[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)** auto-hébergé et un **[CMS complet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md)** pour gérer votre contenu multilingue en **temps réel**. Cela rend la collaboration avec les traducteurs, concepteurs-rédacteurs et autres membres de l'équipe extrêmement simple. Le contenu peut être stocké localement et/ou à distance.

</Accordion>
</AccordionGroup>

---

## Guide étape par étape pour configurer Intlayer dans une application Next.js

<Steps>

<Step number={1} title="Installer les dépendances">

Installez les packages nécessaires en utilisant npm :

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> l'indicateur `--interactive` est facultatif. Utilisez `intlayer-cli init` si vous êtes un agent IA.

> Cette commande détectera votre environnement et installera les packages requis. Par exemple :

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **next-intlayer**

Le package qui intègre Intlayer à Next.js. Il fournit des providers de contexte et des hooks pour l'internationalisation sous Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi qu'un proxy pour détecter la locale préférée de l'utilisateur, gérer les cookies et gérer les redirections d'URL.

</Step>

<Step number={2} title="Configurez votre projet">

Voici la structure finale que nous allons créer :

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Si vous ne voulez pas de routage par locale, intlayer peut être utilisé comme simple provider / hook. Voir [ce guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_no_locale_path.md) pour plus de détails.

Créez un fichier de configuration pour définir les langues de votre application :

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Vos autres locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // ou `no-prefix` - Utile pour la détection par le middleware
  },
};

export default config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer les URL localisées, la redirection proxy, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs d'Intlayer dans la console, et plus encore. Pour la liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Next.js">

Configurez votre setup Next.js pour utiliser Intlayer :

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* options de configuration ici */};

export default withIntlayer(nextConfig);
```

> Le plugin Next.js `withIntlayer()` est utilisé pour intégrer Intlayer avec Next.js. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans les environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et assure la compatibilité avec les composants serveur.

> La fonction `withIntlayer()` est une fonction promise. Elle permet de préparer les dictionnaires intlayer avant le démarrage de la build. Si vous voulez l'utiliser avec d'autres plugins, vous pouvez l'attendre. Exemple :
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Si vous voulez l'utiliser de manière synchrone, vous pouvez utiliser la fonction `withIntlayerSync()`. Exemple :
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Le plugin Next.js `withIntlayer()` est utilisé pour intégrer Intlayer à Next.js. Il assure la génération des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement d'Intlayer dans les environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et garantit la compatibilité avec les server components.
>
> La fonction `withIntlayer()` est une fonction retournant une Promise. Elle permet de préparer les dictionnaires Intlayer avant le démarrage de la build. Si vous souhaitez l'utiliser avec d'autres plugins, vous pouvez l'awaiter. Exemple:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Si vous souhaitez l'utiliser de manière synchrone, vous pouvez utiliser la fonction `withIntlayerSync()`. Exemple :
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer détecte automatiquement si votre projet utilise **webpack** ou **Turbopack** en se basant sur les options de ligne de commande `--webpack`, `--turbo` ou `--turbopack`, ainsi que sur votre **version de Next.js**.
>
> Depuis `next>=16`, si vous utilisez **Rspack**, vous devez explicitement forcer Intlayer à utiliser la configuration webpack en désactivant Turbopack :
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Définir des routes locales dynamiques">

Retirez tout le contenu de `RootLayout` et remplacez-le par le code suivant :

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

> Un seul `IntlayerProvider` couvre les deux moitiés de l'arborescence : il initialise le contexte serveur délimité à la requête lu par les hooks serveur, et monte le fournisseur client pour que les composants client reçoivent la même locale.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
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

 </Tab>
</Tabs>

</Step>

<Step number={5} title="Déclarez votre contenu">

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      fr: "Le titre de mon projet",
      en: "My Project Title",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "fr": "Le Titre de mon Projet",
        "en": "My Project Title",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        fr: "Commencez par éditer",
        en: "Get started by editing",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "fr": "Commencez par éditer",
        "en": "Get started by editing",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Pour plus de détails, consultez la [documentation sur les déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={6} title="Utiliser le contenu dans votre code">

Accédez à vos dictionnaires de contenu partout dans votre application :

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** est monté une seule fois, dans la mise en page racine. Il fournit la locale aux composants serveur et client, de sorte que les pages ne s'enveloppent plus elles-mêmes.
- Sans un segment de chemin `[locale]`, la locale provient toujours de la requête — l'en-tête `x-intlayer-locale` défini par le proxy Intlayer, puis le cookie de locale — que les hooks serveur lisent d'eux-mêmes quand le fournisseur n'a pas s'exécuté.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { NextPage } from "next";
import { getLocale } from "intlayer";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Attendre les en-têtes et les cookies dans Next.js 15+
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // Vérifier d'abord le cookie intlayer (par défaut : 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // Ensuite vérifier l'en-tête intlayer (par défaut : 'x-intlayer-locale')
    // Et enfin vérifier l'en-tête accept-language ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** est utilisé pour fournir la locale aux composants côté client. Il peut être placé dans n'importe quel composant parent, y compris le layout. Cependant, il est recommandé de le placer dans un layout car Next.js partage le code des layouts entre les pages, ce qui le rend plus efficace. En utilisant `IntlayerClientProvider` dans le layout, vous évitez de le réinitialiser pour chaque page, améliorez les performances et maintenez un contexte de localisation cohérent dans toute votre application.
- **`IntlayerServerProvider`** est utilisé pour fournir la locale aux enfants côté serveur. Il ne peut pas être défini dans le layout.

> Le layout et la page ne peuvent pas partager un même contexte serveur, car le système de contextes serveur est basé sur un magasin de données par requête (via le mécanisme [le cache de React](https://react.dev/reference/react/cache)), ce qui fait que chaque "contexte" est recréé pour différents segments de l'application. Placer le provider dans un layout partagé briserait cette isolation, empêchant la bonne propagation des valeurs du contexte serveur vers vos composants serveur.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Créer la déclaration de contenu associée

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Créer une déclaration de contenu associée

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` est le chemin d'import isomorphe : la condition d'export `react-server` fournit aux composants serveur l'implémentation ambient-locale, tandis que les composants clients obtiennent celle basée sur le contexte. Le même appel fonctionne des deux côtés.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crée la déclaration de contenu associée

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

</Tab>
</Tabs>

> Si vous souhaitez utiliser votre contenu dans un attribut de type `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous pouvez utiliser la valeur de la fonction, par exemple :

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Configurer le proxy pour la détection de la locale" isOptional={true}>

Configurez le proxy pour détecter la locale préférée de l'utilisateur :

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Le `intlayerProxy` sert à détecter la locale préférée de l'utilisateur et à le rediriger vers l'URL appropriée, comme indiqué dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md). De plus, il permet d'enregistrer la locale préférée de l'utilisateur dans un cookie.

> Depuis Intlayer v9, ce middleware respecte l'option `routing.enableProxy` (`true` par défaut). Définissez `routing.enableProxy: false` dans votre configuration pour le transformer en pass-through sans supprimer ce fichier. Voir les [notes de version v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/releases/v9.md).

> Si vous devez chaîner plusieurs proxies (par exemple `intlayerProxy` avec une authentification ou des proxies personnalisés), Intlayer fournit désormais un helper appelé `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Changer la langue de votre contenu" isOptional={true}>

Pour changer la langue de votre contenu dans Next.js, la méthode recommandée est d'utiliser le composant `Link` pour rediriger les utilisateurs vers la page localisée appropriée. Le composant `Link` permet le préchargement (prefetch) de la page, ce qui aide à éviter un rechargement complet de la page.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
              {/* Locale - ex. FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre Locale - ex. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale courante - ex. "Francés" lorsque la locale courante est Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - p.ex. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Une autre façon est d'utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction n'autorisera pas le préchargement de la page. Consultez la [documentation du hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useLocale.md) pour plus de détails.

> Références de la documentation :
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Obtenir la locale courante dans les Server Actions" isOptional={true}>

Si vous avez besoin de la locale active à l'intérieur d'une Server Action (par ex., pour localiser des e-mails ou exécuter une logique dépendante de la locale), appelez `getLocale` depuis `next-intlayer/server` :

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
> 1. D'abord, elle vérifie les en-têtes de la requête pour une valeur de locale qui peut avoir été définie par le proxy
> 2. Si aucune locale n'est trouvée dans les en-têtes, elle recherche une locale stockée dans les cookies
> 3. Si aucun cookie n'est trouvé, elle tente de détecter la langue préférée de l'utilisateur à partir des paramètres du navigateur
> 4. En dernier recours, elle revient à la locale par défaut configurée de l'application
>
> Cela garantit que la locale la plus appropriée est sélectionnée en fonction du contexte disponible.

</Step>

<Step number={10} title="Optimisez la taille de votre bundle" isOptional={true}>

Lors de l'utilisation de `next-intlayer`, les dictionnaires sont inclus dans le bundle pour chaque page par défaut. Pour optimiser la taille du bundle, Intlayer fournit un plugin SWC optionnel qui remplace intelligemment les appels à `useIntlayer` en utilisant des macros. Cela garantit que les dictionnaires ne sont inclus que dans les bundles des pages qui les utilisent réellement.

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

> Remarque : Cette optimisation n'est disponible que pour Next.js 13 et versions supérieures.

> Remarque : Ce package n'est pas installé par défaut car les plugins SWC sont encore expérimentaux sur Next.js. Cela peut changer à l'avenir.

> Remarque : Si vous définissez l'option sur `importMode: 'dynamic'` ou `importMode: 'fetch'` (dans la configuration `dictionary`), cela reposera sur Suspense, vous devrez donc envelopper vos appels `useIntlayer` dans une frontière `Suspense`. Cela signifie que vous ne pourrez pas utiliser `useIntlayer` directement au niveau supérieur de votre composant Page / Layout.

</Step>

</Steps>

### Surveiller les modifications des dictionnaires sur Turbopack

Lorsque vous utilisez Turbopack comme serveur de développement avec la commande `next dev`, les modifications du dictionnaire ne seront pas détectées automatiquement par défaut.

Cette limitation survient parce que Turbopack ne peut pas exécuter les plugins webpack en parallèle pour surveiller les changements de vos fichiers de contenu. Pour contourner cela, vous devrez utiliser la commande `intlayer watch` afin d'exécuter simultanément le serveur de développement et le watcher de build d'Intlayer.

```json5 fileName="package.json"
{
  // ... Vos configurations existantes de package.json
  "scripts": {
    // ... Vos configurations de scripts existantes
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Si vous utilisez next-intlayer@<=6.x.x, vous devez conserver le flag `--turbopack` pour que l'application Next.js 16 fonctionne correctement avec Turbopack. Nous recommandons d'utiliser next-intlayer@>=7.x.x pour éviter cette limitation.

### Configurer TypeScript

Intlayer utilise le module augmentation pour bénéficier des avantages de TypeScript et renforcer votre codebase.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement.

```json5 fileName="tsconfig.json"
{
  // ... Vos configurations TypeScript existantes
  "include": [
    // ... Vos configurations TypeScript existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les inclure dans votre dépôt Git.

Pour cela, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

### Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code Extension**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus intégrés** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application Next.js ?">

Le champ `i18n` de `next.config.js` ne s'applique pas à l'App Router, la couche de localisation est donc toujours un choix de bibliothèque :

- **`next-intl`**, **`next-i18next` / `i18next`** et **`react-intl`** : des catalogues JSON ou ICU chargés par espace de noms.
- **`Lingui`** : piloté par l'extraction, avec des messages ICU compilés au moment du build.
- **`Intlayer`** : contenu déclaré à côté de chaque composant et compilé par composant, entièrement typé, avec traduction par IA, un éditeur visuel et un CMS.

Ce guide couvre la configuration sans locale dans le chemin. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md).

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

Non. Lancez `npx intlayer extract` et Intlayer lit vos composants, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une.

Pour un pipeline entièrement automatisé, le [compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) fait la même chose au moment du build : il analyse votre code source JSX, TSX, Vue et Svelte à chaque changement, génère les dictionnaires et les garde synchronisés via le remplacement de module à chaud, de sorte qu'il n'y a plus aucune clé à maintenir à la main.

Deux limites méritent d'être connues avant d'activer le compilateur. Il fonctionne par analyse statique : les chaînes qui n'existent qu'à l'exécution, comme les codes d'erreur d'API ou les champs de CMS, restent hors de portée. Et il doit distinguer le texte destiné aux utilisateurs de la logique applicative comme `className="active"` ou un code de statut, ce qui nécessite quelques annotations dans une grande base de code. La [commande extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md) évite les deux en vous gardant dans la boucle.

</Question>

<Question title="Quels outils d'éditeur et d'agent IA sont disponibles ?">

Cinq éléments, tous optionnels :

- **[Extension VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/vs_code_extension.md)** : passez d'une clé `useIntlayer` au fichier de contenu qui la déclare, extrayez du contenu depuis un composant, et lancez build, fill, test, push et pull depuis la palette de commandes ou un onglet Intlayer dédié.
- **[Serveur LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/lsp.md)** : la même connaissance dans tout éditeur qui parle LSP, avec aller à la définition, rechercher toutes les références, aperçus au survol d'une valeur traduite, autocomplétion des clés et des champs, et un avertissement lorsqu'une clé n'est déclarée nulle part. Il résout aussi les appels `i18next`, `react-i18next`, `next-intl` et `use-intl`, ce qui aide pendant la migration.
- **[Serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md)** : expose la documentation et la CLI d'Intlayer à Cursor, VS Code, Claude Desktop, Claude Code et ChatGPT, afin qu'un assistant réponde à partir de la documentation actuelle au lieu de deviner, et puisse exécuter lui-même des commandes telles que `intlayer fill`.
- **[Compétences d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md)** : des compétences ciblées telles que `intlayer-config`, `intlayer-cli` et `intlayer-content`, plus une par framework, qui apprennent à un agent votre configuration de routage et les types de nœuds de contenu.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/eslint.md)** : `no-raw-text` signale les chaînes codées en dur, avec d'autres règles pour les clés de dictionnaire statiques et le contenu inutilisé.

</Question>

<Question title="Pourquoi servir mon application sans locale dans l'URL ?">

Parce que la locale ne fait pas toujours partie de l'identité de la page. Un tableau de bord authentifié, un outil interne ou une application derrière une connexion n'ont aucune raison d'exposer `/fr/` dans chaque URL : la langue est une préférence utilisateur, pas un document différent. Retirer le préfixe garde aussi vos routes, vos liens et vos analyses sur un seul ensemble de chemins.

</Question>

<Question title="Quelles sont les conséquences SEO de l'absence de locale dans l'URL ?">

Elles sont réelles, choisissez donc délibérément. Sans URL distincte par langue, les moteurs de recherche n'ont aucune page séparée à indexer pour chaque locale, `hreflang` n'a rien vers quoi pointer, et un crawler ne voit que la langue que votre détection par défaut lui sert. C'est acceptable pour du contenu derrière une connexion, qui n'est de toute façon pas indexé, et un mauvais choix pour un site marketing public ou de la documentation. Si le trafic organique par langue compte, utilisez plutôt la configuration préfixée du [guide Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md).

</Question>

<Question title="Quelle est la différence entre les modes `no-prefix` et `search-params` ?">

`"no-prefix"` maintient la locale entièrement hors de l'URL et la résout à partir d'un cookie, d'un en-tête ou d'un domaine, si bien que chaque langue partage une seule adresse. `"search-params"` la place dans la chaîne de requête sous la forme `/dashboard?locale=fr`, ce qui donne quand même à chaque langue une URL distincte, partageable et enregistrable dans les favoris sans changer votre arbre de routes. Préférez `"search-params"` lorsque vous voulez des liens partageables par langue.

</Question>

<Question title="Comment la locale est-elle détectée alors ?">

À partir des sources listées dans `routing.storage`, par défaut un cookie d'abord, puis l'en-tête `Accept-Language`, en se repliant sur votre locale par défaut. L'étape 7 ajoute le proxy qui l'applique. Une langue que l'utilisateur choisit explicitement est persistée, elle survit donc à la visite suivante. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Puis-je plutôt associer chaque langue à son propre domaine ?">

Oui, et c'est l'option à envisager lorsque vous avez retiré le préfixe pour des raisons cosmétiques mais que vous voulez quand même le SEO. `routing.domains` associe une locale à un nom d'hôte, si bien que le domaine identifie la langue, aucun préfixe n'est ajouté au chemin, et chaque langue obtient une URL indexable vers laquelle `hreflang` peut pointer.

</Question>

<Question title="Comment traduire l'application automatiquement avec l'IA ?">

Lancez `npx intlayer fill`. Il remplit les traductions manquantes avec le LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API, et `--git-diff` limite l'exécution au contenu modifié sur la branche. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

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
