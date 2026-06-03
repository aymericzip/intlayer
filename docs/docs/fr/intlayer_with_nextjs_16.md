---
createdAt: 2024-12-06
updatedAt: 2026-05-31
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
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajouter la commande init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Ajout de la mention de `x-default` dans l'objet `alternates`"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Historique initial"
---

# Traduisez votre site Next.js 16 avec Intlayer | Internationalisation (i18n)

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">
  
<iframe title="La meilleure solution i18n pour Next.js ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Voir le [Modèle d'Application](https://github.com/aymericzip/intlayer-next-16-template) sur GitHub.

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

Installez les paquets nécessaires avec npm :

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
bun x intlayer init
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **next-intlayer**

Le package qui intègre Intlayer avec Next.js. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation dans Next.js. De plus, il inclut le plugin Next.js pour intégrer Intlayer avec [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), ainsi qu'un proxy pour détecter la langue préférée de l'utilisateur, gérer les cookies et gérer la redirection des URL.

</Step>

<Step number={2} title="Configurez votre projet">

Voici la structure finale que nous allons obtenir :

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Layout de locale pour le fournisseur Intlayer
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Layout racine pour le style et les fournisseurs globaux
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Si vous ne souhaitez pas de routage par locale, intlayer peut être utilisé comme un simple fournisseur / hook. Consultez [ce guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_no_locale_path.md) pour plus de détails.

Créez un fichier de configuration pour configurer les langues de votre application :

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
};

export default config;
```

> Grâce à ce fichier de configuration, vous pouvez configurer des URLs localisées, la redirection proxy, les noms de cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={3} title="Intégrer Intlayer dans votre configuration Next.js">

Configurez votre environnement Next.js pour utiliser Intlayer :

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* options de configuration ici */
};

export default withIntlayer(nextConfig);
```

> Le plugin Next.js `withIntlayer()` est utilisé pour intégrer Intlayer avec Next.js. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer dans les environnements [Webpack](https://webpack.js.org/) ou [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). De plus, il fournit des alias pour optimiser les performances et garantit la compatibilité avec les composants serveur.

> La fonction `withIntlayer()` est une fonction asynchrone (promise). Elle permet de préparer les dictionnaires Intlayer avant le début de la compilation. Si vous souhaitez l'utiliser avec d'autres plugins, vous pouvez l'attendre avec `await`. Exemple :
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Si vous souhaitez l'utiliser de manière synchrone, vous pouvez utiliser la fonction `withIntlayerSync()`. Exemple :
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer détecte automatiquement si votre projet utilise **webpack** ou **Turbopack** en fonction des drapeaux de ligne de commande `--webpack`, `--turbo` ou `--turbopack`, ainsi que de votre version actuelle de **Next.js**.
>
> Depuis `next>=16`, si vous utilisez **Rspack**, vous devez explicitement forcer Intlayer à utiliser la configuration webpack en désactivant Turbopack :
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Définir les routes dynamiques des locales">

Supprimez tout le contenu de `RootLayout` et remplacez-le par le code suivant :

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Vous pouvez toujours envelopper les enfants avec d'autres fournisseurs, comme `next-themes`, `react-query`, `framer-motion`, etc.
  <>{children}</>
);

export default RootLayout;
```

> Garder le composant `RootLayout` vide permet de définir les attributs [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) et [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) sur la balise `<html>`.

Pour implémenter le routage dynamique, fournissez le chemin pour la locale en ajoutant un nouveau layout dans votre répertoire `[locale]` :

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Le segment de chemin `[locale]` est utilisé pour définir la locale. Exemple : `/en-US/about` fera référence à `en-US` et `/fr/about` à `fr`.

> À ce stade, vous rencontrerez l'erreur : `Error: Missing <html> and <body> tags in the root layout.`. Cela est attendu car le fichier `/app/page.tsx` n'est plus utilisé et peut être supprimé. À la place, le segment de chemin `[locale]` activera la page `/app/[locale]/page.tsx`. Par conséquent, les pages seront accessibles via des chemins comme `/en`, `/fr`, `/es` dans votre navigateur. Pour définir la locale par défaut comme page racine, référez-vous à la configuration du `proxy` à l'étape 7.

Ensuite, implémentez la fonction `generateStaticParams` dans le Layout de votre application.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Ligne à insérer

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Reste du code */
};

export default LocaleLayout;
```

> `generateStaticParams` garantit que votre application pré-construit les pages nécessaires pour toutes les locales, réduisant ainsi le calcul à l'exécution et améliorant l'expérience utilisateur. Pour plus de détails, consultez la [documentation Next.js sur generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).
>
> Intlayer fonctionne avec `export const dynamic = 'force-static';` pour s'assurer que les pages sont pré-construites pour toutes les locales.

</Step>

<Step number={5} title="Déclarez Votre Contenu">

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./src`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Pour plus de détails, référez-vous à la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={6} title="Utiliser le contenu dans votre code">

Accédez à vos dictionnaires de contenu dans toute votre application :

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>{" "}
      {/* Affiche le texte principal de la section "getStarted" */}
      <code>{content.getStarted.pageLink}</code>{" "}
      {/* Affiche le lien de la page dans un élément code */}
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

- **`IntlayerClientProvider`** est utilisé pour fournir la locale aux composants côté client. Il peut être placé dans n'importe quel composant parent, y compris le layout. Cependant, il est recommandé de le placer dans un layout car Next.js partage le code du layout entre les pages, ce qui le rend plus efficace. En utilisant `IntlayerClientProvider` dans le layout, vous évitez de le réinitialiser pour chaque page, améliorant ainsi les performances et maintenant un contexte de localisation cohérent dans toute votre application.
- **`IntlayerServerProvider`** est utilisé pour fournir la locale aux enfants côté serveur. Il ne peut pas être défini dans le layout.

> La mise en page (layout) et la page ne peuvent pas partager un contexte serveur commun car le système de contexte serveur est basé sur un magasin de données par requête (via le mécanisme de [cache de React](https://react.dev/reference/react/cache)), ce qui entraîne la recréation de chaque "contexte" pour différents segments de l'application. Placer le provider dans une mise en page partagée briserait cette isolation, empêchant la bonne propagation des valeurs du contexte serveur à vos composants serveur.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Crée la déclaration de contenu associée

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Créer la déclaration de contenu associée

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Si vous souhaitez utiliser votre contenu dans un attribut de type `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous devez appeler la valeur de la fonction, comme ceci :

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useIntlayer.md).

> Si votre application existe déjà, vous pouvez utiliser le [Compilateur Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md), ainsi que la [commande d'extraction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md), pour transformer des milliers de composants en une seconde.

</Step>

<Step number={7} title="Configurer le proxy pour la détection de la langue" isOptional={true}>

Configurez un proxy pour détecter la langue préférée de l'utilisateur :

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Le `intlayerProxy` est utilisé pour détecter la locale préférée de l'utilisateur et le rediriger vers l'URL appropriée comme spécifié dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md). De plus, il permet de sauvegarder la locale préférée de l'utilisateur dans un cookie.

> Si vous avez besoin de chaîner plusieurs proxies ensemble (par exemple, `intlayerProxy` avec une authentification ou des proxies personnalisés), Intlayer fournit désormais un helper appelé `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Internationalisation de vos métadonnées" isOptional={true}>

Dans le cas où vous souhaitez internationaliser vos métadonnées, telles que le titre de votre page, vous pouvez utiliser la fonction `generateMetadata` fournie par Next.js. À l'intérieur, vous pouvez récupérer le contenu depuis la fonction `getIntlayer` pour traduire vos métadonnées.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Généré par create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Génère un objet contenant toutes les URL pour chaque locale.
   *
   * Exemple :
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Retourne
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Reste du code
````

> Notez que la fonction `getIntlayer` importée depuis `next-intlayer` retourne votre contenu enveloppé dans un `IntlayerNode`, permettant l'intégration avec l'éditeur visuel. En revanche, la fonction `getIntlayer` importée depuis `intlayer` retourne votre contenu directement sans propriétés supplémentaires.

Alternativement, vous pouvez utiliser la fonction `getTranslation` pour déclarer vos métadonnées. Cependant, il est recommandé d'utiliser des fichiers de déclaration de contenu afin d'automatiser la traduction de vos métadonnées et d'externaliser le contenu à un moment donné.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Reste du code
```

> En savoir plus sur l'optimisation des métadonnées [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... Reste du code
```

> En savoir plus sur l'optimisation des métadonnées [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Internationalisation de votre sitemap.xml et robots.txt" isOptional={true}>

Pour internationaliser votre `sitemap.xml` et `robots.txt`, vous pouvez utiliser la fonction `getMultilingualUrls` fournie par Intlayer. Cette fonction vous permet de générer des URLs multilingues pour votre sitemap.

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Règles pour les robots d'indexation
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Interdire l'accès aux pages de connexion et d'inscription dans toutes les langues
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Règles pour le fichier robots.txt
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // Autoriser tous les agents utilisateurs
    allow: ["/"], // Autoriser l'accès à la racine
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Interdire l'accès aux pages de connexion et d'inscription dans toutes les langues
  },
  host: "https://example.com", // Hôte du site
  sitemap: `https://example.com/sitemap.xml`, // Emplacement du sitemap
});

export default robots;
```

> En savoir plus sur l'optimisation du sitemap [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). En savoir plus sur l'optimisation du fichier robots.txt [dans la documentation officielle de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Changer la langue de votre contenu" isOptional={true}>

Pour changer la langue de votre contenu dans Next.js, la méthode recommandée est d'utiliser le composant `Link` pour rediriger les utilisateurs vers la page localisée appropriée. Le composant `Link` permet le préchargement de la page, ce qui aide à éviter un rechargement complet de la page.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Garantira que le bouton "retour" du navigateur redirigera vers la page précédente
          >
            <span>
              {/* Locale - par exemple FR */}
              {localeItem}
            </span>
            <span>
              {/* Langue dans sa propre locale - par exemple Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Langue dans la locale courante - par exemple Francés avec la locale courante définie sur Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par exemple French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Une autre manière est d'utiliser la fonction `setLocale` fournie par le hook `useLocale`. Cette fonction ne permettra pas le préchargement de la page. Voir la [documentation du hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useLocale.md) pour plus de détails.

> Vous pouvez également définir une fonction dans l'option `onLocaleChange` pour déclencher une fonction personnalisée lorsque la locale change.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Reste du code

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Passer au français</button>
);
```

> Références de la documentation :
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useLocale.md)
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Création d'un composant Link localisé" isOptional={true}>

Pour garantir que la navigation de votre application respecte la langue actuelle, vous pouvez créer un composant `Link` personnalisé. Ce composant préfixe automatiquement les URL internes avec la langue courante. Par exemple, lorsqu'un utilisateur francophone clique sur un lien vers la page "À propos", il est redirigé vers `/fr/about` au lieu de `/about`.

Ce comportement est utile pour plusieurs raisons :

- **SEO et expérience utilisateur** : Les URL localisées aident les moteurs de recherche à indexer correctement les pages spécifiques à une langue et fournissent aux utilisateurs du contenu dans leur langue préférée.
- **Cohérence** : En utilisant un lien localisé dans toute votre application, vous garantissez que la navigation reste dans la langue actuelle, évitant ainsi des changements de langue inattendus.
  /// **Maintenabilité** : Centraliser la logique de localisation dans un seul composant simplifie la gestion des URL, rendant votre base de code plus facile à maintenir et à étendre au fur et à mesure que votre application grandit.

Voici l'implémentation d'un composant `Link` localisé en TypeScript :

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Fonction utilitaire pour vérifier si une URL donnée est externe.
 * Si l'URL commence par http:// ou https://, elle est considérée comme externe.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un composant Link personnalisé qui adapte l'attribut href en fonction de la locale actuelle.
 * Pour les liens internes, il utilise `getLocalizedUrl` pour préfixer l'URL avec la locale (par exemple, /fr/about).
 * Cela garantit que la navigation reste dans le même contexte de locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Si le lien est interne et qu'un href valide est fourni, obtenir l'URL localisée.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Comment ça fonctionne

- **Détection des liens externes** :  
  La fonction d'assistance `checkIsExternalLink` détermine si une URL est externe. Les liens externes ne sont pas modifiés car ils n'ont pas besoin d'être localisés.

- **Récupération de la locale courante** :  
  Le hook `useLocale` fournit la locale actuelle (par exemple, `fr` pour le français).

- **Localisation de l'URL** :  
  Pour les liens internes (c'est-à-dire non externes), `getLocalizedUrl` est utilisé pour préfixer automatiquement l'URL avec la locale courante. Cela signifie que si votre utilisateur est en français, passer `/about` comme `href` sera transformé en `/fr/about`.

- **Retour du lien** :  
  Le composant retourne un élément `<a>` avec l'URL localisée, garantissant que la navigation est cohérente avec la locale.

En intégrant ce composant `Link` dans toute votre application, vous maintenez une expérience utilisateur cohérente et adaptée à la langue, tout en bénéficiant d'une meilleure optimisation SEO et d'une meilleure utilisabilité.

</Step>

<Step number={12} title="Obtenir la locale actuelle dans les Server Actions" isOptional={true}>

Si vous avez besoin de la locale active à l'intérieur d'une Server Action (par exemple, pour localiser des emails ou exécuter une logique sensible à la langue), appelez `getLocale` depuis `next-intlayer/server` :

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
> 1. Tout d'abord, il vérifie les en-têtes de la requête pour une valeur de locale qui pourrait avoir été définie par le proxy
> 2. Si aucune locale n'est trouvée dans les en-têtes, il recherche une locale stockée dans les cookies
> 3. Si aucun cookie n'est trouvé, il tente de détecter la langue préférée de l'utilisateur à partir des paramètres de son navigateur
> 4. En dernier recours, il revient à la locale par défaut configurée dans l'application
>
> Cela garantit que la locale la plus appropriée est sélectionnée en fonction du contexte disponible.

</Step>

<Step number={13} title="Optimisez la taille de votre bundle" isOptional={true}>

Lors de l'utilisation de `next-intlayer`, les dictionnaires sont inclus par défaut dans le bundle de chaque page. Pour optimiser la taille du bundle, Intlayer propose un plugin SWC optionnel qui remplace intelligemment les appels à `useIntlayer` en utilisant des macros. Cela garantit que les dictionnaires ne sont inclus que dans les bundles des pages qui les utilisent réellement.

Pour activer cette optimisation, installez le package `@intlayer/swc`. Une fois installé, `next-intlayer` détectera automatiquement et utilisera le plugin :

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

> Remarque : Cette optimisation est uniquement disponible pour Next.js 13 et versions supérieures.

> Note : Ce package n’est pas installé par défaut car les plugins SWC sont encore expérimentaux sur Next.js. Cela pourrait changer à l’avenir.
>
> Note : Si vous définissez l'option comme `importMode: 'dynamic'` ou `importMode: 'fetch'` (dans la configuration des dictionnaires), elle reposera sur Suspense, vous devrez donc envelopper vos appels `useIntlayer` dans une limite `Suspense`. Cela signifie que vous ne pourrez pas utiliser `useIntlayer` directement au niveau supérieur de votre composant Page / Layout.

</Step>

<Step number={14} title="Extraire le contenu de vos composants" isOptional={true}>

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
 <Tab value='Commande d'extraction'>

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
 <Tab value='Compilateur Babel'>

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
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Surveiller les modifications des dictionnaires avec Turbopack

Lorsque vous utilisez Turbopack comme serveur de développement avec la commande `next dev`, les modifications des dictionnaires ne sont pas détectées automatiquement par défaut.

Cette limitation survient parce que Turbopack ne peut pas exécuter les plugins webpack en parallèle pour surveiller les modifications dans vos fichiers de contenu. Pour contourner ce problème, vous devez utiliser la commande `intlayer watch` afin d’exécuter simultanément le serveur de développement et le surveillant de build Intlayer.

```json5 fileName="package.json"
{
  // ... Vos configurations package.json existantes
  "scripts": {
    // ... Vos configurations de scripts existantes
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Si vous utilisez next-intlayer@<=6.x.x, vous devez conserver le flag `--turbopack` pour que l'application Next.js 16 fonctionne correctement avec Turbopack. Nous recommandons d'utiliser next-intlayer@>=7.x.x pour éviter cette limitation.

### Configurer TypeScript

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

![Autocomplétion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Erreur de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes dans votre fichier `.gitignore` :

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
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension Intlayer pour VS Code](https://intlayer.org/doc/vs-code-extension).

### Aller plus loin

Pour aller plus loin, vous pouvez implémenter l’[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).
