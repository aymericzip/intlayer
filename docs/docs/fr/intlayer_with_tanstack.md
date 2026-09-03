---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "TanStack Start i18n - Guide complet pour traduire votre application"
description: "Oubliez i18next. Le guide 2026 pour créer une application TanStack Start multilingue (i18n). Traduisez avec des agents IA et optimisez la taille du bundle, le SEO et les performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Routage par locale
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Comparer les résolutions statique, dynamique et dynamique mise en cache des dictionnaires de métadonnées dans les fonctions head des routes"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Mettre à jour l'utilisation de l'API useIntlayer de Solid pour un accès direct aux propriétés"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Ajouter la commande init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Introduction de validatePrefix et ajout de l'étape 14 ; Gestion des pages 404 avec des routes localisées."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Ajout de l'étape 13 ; Récupérer la locale dans vos server actions (Optionnel)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Ajout de l'étape 13 ; Adapter Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Correction du préfixe par défaut en ajoutant la fonction getPrefix, useLocalizedNavigate, LocaleSwitcher et LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Mise à jour de la documentation"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Ajouté pour Tanstack Start"
author: aymericzip
---

# Traduisez votre site Tanstack Start avec Intlayer | Internationalisation (i18n)

## Table des matières

<TOC/>

Ce guide montre comment intégrer **Intlayer** pour une internationalisation transparente dans les projets Tanstack Start avec un routage tenant compte de la locale, un support TypeScript et des pratiques de développement modernes.

## Pourquoi Intlayer plutôt que des alternatives ?

Par rapport aux solutions principales telles que `react-i18next` ou `next-intl`, ou `paraglide`, Intlayer est une solution qui vient avec des optimisations intégrées telles que :

<AccordionGroup>
<Accordion header="Support complet de TanStack Start">

Intlayer est entièrement optimisé pour TanStack Start, offrant un **routage multilingue**, la **gestion des cookies**, la **génération de sitemap**, le **chargement dynamique de contenu** et toutes les fonctionnalités nécessaires pour mettre à l'échelle votre internationalisation (i18n).

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

## Guide étape par étape pour configurer Intlayer dans une application Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">

<iframe title="La meilleure solution i18n pour Tanstack Start ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Démo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Voir le [Modèle d'Application](https://github.com/aymericzip/intlayer-tanstack-start-template) sur GitHub.

<Steps>

<Step number={1} title="Créer le projet">

Commencez par créer un nouveau projet TanStack Start en suivant le guide [Démarrer un nouveau projet](https://tanstack.com/start/latest/docs/framework/react/quick-start) sur le site de TanStack Start.

</Step>

<Step number={2} title="Installer les paquets Intlayer">

Installez les paquets nécessaires en utilisant votre gestionnaire de paquets préféré :

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Le paquet principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **react-intlayer**
  Le paquet qui intègre Intlayer avec l'application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation React.

- **vite-intlayer**
  Comprend le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la locale préférée de l'utilisateur, gérer les cookies et gérer la redirection d'URL.

</Step>

<Step number={3} title="Configuration de votre projet">

Créez un fichier de configuration pour configurer les langues de votre application :

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Via ce fichier de configuration, vous pouvez configurer les URL localisées, la redirection du middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, reportez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Step>

<Step number={4} title="Intégrer Intlayer dans votre configuration Vite">

Ajoutez le plugin intlayer dans votre configuration :

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Le plugin Vite `intlayer()` est utilisé pour intégrer Intlayer avec Vite. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

</Step>

<Step number={5} title="Créer le Layout Racine">

Configurez votre layout racine pour supporter l'internationalisation en utilisant `useParams` pour détecter la locale actuelle et en définissant les attributs `lang` et `dir` sur la balise `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>

<Step number={6} title="Créer le Layout de Locale">

Créez un layout qui gère le préfixe de locale et effectue la validation.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Valider le préfixe de locale
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> Ici, `{-$locale}` est un paramètre de route dynamique qui est remplacé par la locale actuelle. Cette notation rend le slot optionnel, lui permettant de fonctionner avec des modes de routage tels que `'prefix-no-default'`, etc.

> Soyez conscient que ce slot peut causer des problèmes si vous utilisez plusieurs segments dynamiques dans la même route (ex: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Pour le mode `'prefix-all'`, vous préférerez peut-être passer le slot en `$locale` à la place.
> Pour les modes `'no-prefix'` ou `'search-params'`, vous pouvez supprimer complètement le slot.

</Step>

<Step number={7} title="Déclarer votre contenu">

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./app`). Et correspondent à l'extension de fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Pour plus de détails, reportez-vous à la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

</Step>

<Step number={7} title="Créer des composants et hooks tenant compte de la locale">

Créez un composant `LocalizedLink` pour une navigation tenant compte de la locale :

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Ce composant a deux objectifs :

- Supprimer le préfixe inutile `{-$locale}` de l'URL.
- Injecter le paramètre de locale dans l'URL pour s'assurer que l'utilisateur est directement redirigé vers la route localisée.

Ensuite, nous pouvons créer un hook `useLocalizedNavigate` pour la navigation programmatique :

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="Utiliser Intlayer dans vos pages">

> Utilisez **`useIntlayer`** par défaut : c'est la manière recommandée de lire du contenu dans vos composants, et le compilateur le résout vers la locale rendue. Ne recourez à `getIntlayer` / `getIntlayerAsync` qu'en dehors de l'arbre React : le `head` des routes, les loaders et les server functions.

Accédez à vos dictionnaires de contenu dans toute votre application :

#### Page d'accueil localisée

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Si vous souhaitez utiliser votre contenu dans un attribut `string`, tel que `alt`, `title`, `href`, `aria-label`, etc., vous pouvez utiliser la valeur de la fonction, comme :
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Créer un composant Locale Switcher">

Créez un composant pour permettre aux utilisateurs de changer de langue :

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Locale - par ex. FR */}
              {localeEl}
            </span>
            <span>
              {/* Langue dans sa propre locale - par ex. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Langue dans la locale actuelle - par ex. Francés avec la locale actuelle définie sur Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - par ex. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Pour en savoir plus sur le hook `useLocale`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="Gestion des attributs HTML">

Comme vu à l'étape 5, vous pouvez gérer les attributs `lang` et `dir` de la balise `html` en utilisant `useParams` dans votre composant racine. Cela garantit que les attributs corrects sont définis sur le serveur et le client.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

</Step>

<Step number={11} title="Ajouter un middleware">

Vous pouvez également utiliser `intlayerProxy` pour ajouter du routing côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences linguistiques du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

> Notez que pour utiliser `intlayerProxy` en production, vous devez passer le package `vite-intlayer` de `devDependencies` à `dependencies`.

> Depuis Intlayer v9, `intlayerProxy()` est fourni directement dans le plugin `intlayer()` et activé par défaut via l'option `routing.enableProxy` (`true` par défaut). L'enregistrer séparément comme montré ci-dessous est maintenant optionnel : il est conservé pour la compatibilité rétroactive et pour les configurations qui doivent contrôler l'ordre des plugins. Définissez `routing.enableProxy: false` pour désactiver. Consultez les [notes de version v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

</Step>

<Step number={12} title="Internationaliser vos métadonnées">

<Tabs>

<Tab label="Résolution statique" value="static">

`getIntlayer` se résout de façon synchrone par rapport au dictionnaire **fusionné**, celui qui contient chaque locale déclarée. `head` reste synchrone et rien n'est attendu, mais tout le dictionnaire multilingue est inclus dans le chunk de route envoyé au navigateur.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Le chemin pour cette route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Lien canonique : Points vers la page localisée actuelle
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang : Indiquer à Google toutes les versions localisées
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default : Pour les utilisateurs dans les langues non correspondantes
        // Définir la locale de secours par défaut (généralement votre langue principale)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

Meilleur pour les petits dictionnaires de métadonnées, une poignée de locales, ou lors du prototypage.

</Tab>

<Tab label="Résolution dynamique" value="dynamic">

`getIntlayerAsync` (disponible à partir de **v9.4**) se comporte comme `getIntlayer`, mais le plugin de build la pointe vers le chunk par locale dans `.intlayer/dynamic_dictionaries/` au lieu du dictionnaire fusionné. Une page envoie donc uniquement la locale qu'elle affiche. Parce que ce chunk est chargé à la demande, `head` devient `async` :

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Le chemin pour cette route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Lien canonique : Points vers la page localisée actuelle
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang : Indiquer à Google toutes les versions localisées
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default : Pour les utilisateurs dans les langues non correspondantes
        // Définir la locale de secours par défaut (généralement votre langue principale)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> Si un `head` lit plusieurs dictionnaires, résolvez-les avec `Promise.all` : attendre chaque `getIntlayerAsync` sur sa propre ligne chaîne les requêtes au lieu de les exécuter en parallèle.

Le compromis : l'import dynamique est résolu pendant l'exécution de `head`, sur le chemin critique du rendu du document. Sur une route froide, cela retarde le head de quelques millisecondes et peut légèrement dégrader le **LCP**.

</Tab>

<Tab label="Résolution dynamique en cache" value="cached">

Résolvez le dictionnaire dans le `loader` de la route et relisez-le depuis `loaderData` dans `head`. Les loaders des routes correspondantes s'exécutent en parallèle, et `staleTime: Infinity` indique à TanStack Router que le résultat ne devient jamais obsolète, donc le chunk par locale est résolu une fois et servi à partir du cache du routeur après, laissant `head` synchrone.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Résolu en parallèle avec les autres routes correspondantes, hors du chemin critique du head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // Le dictionnaire ne change jamais pour une locale donnée : résoudre le chunk une fois
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Le chemin pour cette route

    return {
      links: [
        // Lien canonique : Points vers la page localisée actuelle
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang : Indiquer à Google toutes les versions localisées
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default : Pour les utilisateurs dans les langues non correspondantes
        // Définir la locale de secours par défaut (généralement votre langue principale)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` peut être appelé avant que le loader ne se termine, donc `loaderData` est typé comme possiblement `undefined`. Conservez le chaînage optionnel, ou retournez un titre de secours.

Vous conservez le chunk par locale sans payer son coût sur le chemin critique du head. Le prix est l'expérience développeur : le contenu doit être transmis explicitement du loader au `head` via `loaderData`.

</Tab>

</Tabs>

### Quelle résolution choisir ?

|                        | Résolution statique   | Résolution dynamique       | Résolution dynamique en cache          |
| ---------------------- | --------------------- | -------------------------- | -------------------------------------- |
| API                    | `getIntlayer`         | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| Signature `head`       | synchrone             | `async`                    | synchrone, lit `loaderData`            |
| Locales livrées        | toute locale déclarée | locale demandée uniquement | locale demandée uniquement             |
| Navigations client     | rien à résoudre       | relancé à chaque match     | servi depuis le cache du routeur       |
| Expérience développeur | la plus simple        | un `await`                 | contenu transmis via `loaderData`      |

</Step>

<Step number={13} title="Récupérer la locale dans vos server actions">

Vous voudrez peut-être accéder à la locale actuelle depuis vos server actions ou endpoints API.
Vous pouvez le faire en utilisant l'helper `getLocale` de `intlayer`.

Voici un exemple utilisant les server functions de TanStack Start :

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Obtenez le cookie de la requête (par défaut : 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Obtenez l'en-tête de la requête (par défaut : 'x-intlayer-locale')
    // Secours utilisant la négociation Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Récupérez du contenu en utilisant getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={14} title="Gérer les pages non trouvées">

Lorsqu'un utilisateur visite une page inexistante, vous pouvez afficher une page 404 personnalisée, et le préfixe de locale peut influencer la manière dont la page non trouvée est déclenchée.

#### Comprendre la gestion des 404 de TanStack Router avec les préfixes de locale

Dans TanStack Router, la gestion des pages 404 avec des routes localisées nécessite une approche à plusieurs niveaux :

1. **Route 404 dédiée** : Une route spécifique pour afficher l'interface utilisateur 404
2. **Validation au niveau de la route** : Valide les préfixes de locale et redirige ceux qui sont invalides vers la page 404
3. **Route catch-all** : Capture tous les chemins non correspondants dans le segment de la locale

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Ceci crée une route dédiée /[locale]/404
// Elle est utilisée à la fois comme route directe et importée comme composant dans d'autres fichiers
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Exporté séparément pour pouvoir être réutilisé dans notFoundComponent et les routes catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad s'exécute avant que la route ne soit rendue (sur le serveur et le client)
  // C'est l'endroit idéal pour valider le préfixe de locale
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix vérifie si la locale est valide selon votre configuration intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Préfixe de locale invalide - rediriger vers la page 404 avec un préfixe de locale valide
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent est appelé lorsqu'une route enfant n'existe pas
  // ex: /fr/page-inexistante déclenche cela au sein du layout /fr
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// La route $ (splat/catch-all) correspond à tout chemin qui ne correspond pas aux autres routes
// ex: /fr/certains/chemins/tres/profonds/invalides
// Cela garantit que TOUS les chemins non correspondants au sein d'une locale affichent la page 404
// Sans cela, les chemins profonds non correspondants pourraient afficher une page vide ou une erreur
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="Extraire le contenu de vos composants" isOptional={true}>

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
     *
     * - Si `true`, le compilateur réécrira le fichier du composant sur le disque. La transformation sera donc permanente, et le compilateur sautera la transformation pour le prochain processus. De cette façon, le compilateur peut transformer l'application, puis il peut être supprimé.
     *
     * - Si `false`, le compilateur injectera l'appel de fonction `useIntlayer()` dans le code dans la sortie de build uniquement, et gardera la base de code intacte. La transformation sera effectuée uniquement en mémoire.
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
 <Tab value="Commande d'extraction">

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
 <Tab value="Compilateur Babel">

> Depuis la v9, `intlayerCompiler` est inclus dans le plugin `intlayer`. Vous n'avez donc pas besoin de l'ajouter manuellement.

Mettez à jour votre fichier `vite.config.ts` pour inclure le plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Ajoute le plugin du compilateur
  ],
});
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

<Step number={16} title="Pré-rendre & Générer le Sitemap">

Intlayer est livré avec un générateur de sitemap intégré pour vous aider à créer facilement un sitemap pour votre application. Il gère les routes localisées et ajoute les métadonnées nécessaires pour les moteurs de recherche.

> Le sitemap généré par Intlayer prend en charge l'espace de noms `xhtml:link` (Hreflang XML Extensions). Contrairement aux générateurs de sitemap par défaut qui ne répertorient que les URL brutes, Intlayer crée automatiquement les liens bidirectionnels requis entre toutes les versions linguistiques d'une page (par exemple, `/about`, `/about?lang=fr` et `/about?lang=es`). Cela garantit que les moteurs de recherche indexent et servent correctement la bonne version linguistique au bon public.

Pour l'utiliser, vous devez d'abord configurer votre fichier `vite.config.ts` pour activer le pré-rendu de vos routes localisées et désactiver la génération de sitemap par défaut de TanStack Start.

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
// ... autres imports

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... autres plugins
    tanstackStart({
      // ... autres configurations
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Ensuite, créez une route `src/routes/sitemap[.]xml.ts` qui utilise la fonction `generateSitemap` :

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { generateSitemap } from "intlayer";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

</Step>

<Step number={17} title="Configurer TypeScript">

Intlayer utilise l'augmentation de module pour bénéficier des avantages de TypeScript et rendre votre codebase plus robuste.

Assurez-vous que votre configuration TypeScript inclut les types autogénérés :

```json5 fileName="tsconfig.json"
{
  // ... vos configurations existantes
  include: [
    // ... vos includes existants
    ".intlayer/**/*.ts", // Inclure les types auto-générés
  ],
}
```

</Step>

</Steps>

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les valider dans votre référentiel Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

## Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'extension officielle **Intlayer VS Code Extension**.

[Installer depuis la VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection d'erreurs en temps réel** pour les traductions manquantes.
- **Aperçus intégrés** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---

## Références de Documentation

- [Documentation Intlayer](https://intlayer.org)
- [Documentation Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

## Questions fréquentes

<FAQ>

<Question title="Quelles sont les différentes solutions pour internationaliser une application TanStack Start ?">

TanStack Start ne fournit aucune couche d'i18n propre, le choix est donc une bibliothèque :

- **`i18next` / `react-i18next`** et **`react-intl`** : des catalogues de messages indépendants du framework, câblés manuellement dans le routeur.
- **`Lingui`** : des messages ICU avec une étape de compilation.
- **`Intlayer`** : contenu déclaré à côté de chaque composant et compilé au moment du build, avec des clés typées, un routage sensible à la locale, la génération de sitemap, la traduction par IA, un éditeur visuel et un CMS.

La différence qui compte sur TanStack Start est le routage et le rendu serveur. Intlayer s'intègre au routeur basé sur les fichiers, à la fonction `head` et à la passe de prérendu, au lieu de vous laisser assembler un provider, un détecteur de locale et un sitemap à la main. Voir [pourquoi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md) et le [benchmark i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md).

</Question>

<Question title="Quel poids l'i18n ajoute-t-elle à la taille de mon bundle TanStack Start ?">

Bien moins qu'une configuration basée sur des espaces de noms, car une page ne télécharge jamais un catalogue qu'elle n'affiche pas. Le balisage rendu côté serveur résout son contenu sur le serveur, et le compilateur au moment du build remplace les appels `useIntlayer` par les entrées de dictionnaire exactes qu'un composant utilise, si bien que les clés inutilisées et les langues inutilisées sont éliminées, et les [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) répartissent le reste par locale. Mesuré face aux alternatives habituelles, Intlayer réduit la taille du bundle et des pages jusqu'à 50 %. Voir l'[optimisation du bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/bundle_optimization.md) et le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md).

</Question>

<Question title="Puis-je migrer depuis `react-i18next` ou `react-intl` sans réécrire mes composants ?">

Oui, et il existe deux voies. Vous pouvez migrer le contenu progressivement avec le [guide de migration react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_react-i18next_to_intlayer.md) ou le [guide de migration i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/migration_from_i18next_to_intlayer.md). Ou vous pouvez conserver entièrement votre API actuelle : les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) exposent exactement la même API que `react-i18next`, `react-intl` et `i18next`, mais servie par des dictionnaires Intlayer : seuls les imports changent, pas le code des composants.

</Question>

<Question title="Puis-je conserver mes fichiers de traduction JSON existants ?">

Oui. Le [plugin de synchronisation JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) conserve vos fichiers `/messages/{locale}/{namespace}.json` comme source de vérité et génère les dictionnaires Intlayer à partir d'eux, dans les deux sens. Un [plugin de synchronisation PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) fait de même pour les catalogues gettext, et les [fichiers par locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/per_locale_file.md) permettent de séparer le contenu par langue au lieu de regrouper les locales dans un seul fichier.

</Question>

<Question title="Dois-je déplacer mon contenu clé par clé ?">

Non. Lancez `npx intlayer extract` et Intlayer lit vos composants, en extrait les chaînes destinées aux utilisateurs et écrit un fichier `.content` à côté de chacun, de sorte que vous relisez un diff plutôt que de copier des chaînes dans un catalogue une par une. L'étape 15 de ce guide le détaille.

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

<Question title="Intlayer prend-il en charge le rendu côté serveur et le prérendu dans TanStack Start ?">

Oui. Le contenu se résout pendant le SSR, et le guide couvre la configuration de prérendu qui émet un document statique par route localisée. L'étape 16 montre comment activer `prerender` dans `vite.config.ts` et générer un sitemap localisé à partir de la même table de routes.

</Question>

<Question title="Comment ajouter des balises hreflang et un sitemap localisé ?">

Utilisez la fonction intégrée `generateSitemap` dans une route `src/routes/sitemap[.]xml.ts`. Contrairement à une simple liste d'URL, elle émet l'espace de noms `xhtml:link`, si bien que chaque version linguistique d'une page renvoie de manière bidirectionnelle vers les autres et que les moteurs de recherche indexent la bonne pour chaque public. Les métadonnées `head` localisées sont couvertes à l'étape 12.

</Question>

<Question title="Dois-je mettre la locale dans l'URL ?">

Non. `routing.mode` contrôle le schéma d'URL : `"prefix-no-default"` (la valeur par défaut, `/about` et `/fr/about`), `"prefix-all"` (`/en/about`), `"no-prefix"` (résolue à partir d'un cookie, d'un en-tête ou d'un domaine) ou `"search-params"` (`/about?locale=fr`). Les locales peuvent aussi être associées à des domaines séparés avec `routing.domains`. Voir la [référence de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

</Question>

<Question title="Comment construire un sélecteur de langue qui conserve la route courante ?">

Utilisez `useLocale` avec le composant de lien localisé décrit à l'étape 9. `useLocale` expose la locale active, les locales disponibles et un setter qui persiste le choix, tandis que `getLocalizedUrl` réécrit le chemin actuel dans la langue cible afin que l'utilisateur reste sur la même page au lieu d'atterrir sur la page d'accueil.

</Question>

<Question title="Comment gérer les pages 404 sur les routes localisées ?">

L'étape 14 le couvre. `validatePrefix` vous indique si le segment de locale de l'URL est une locale déclarée, si bien que `/xx/about` renvoie un vrai 404 au lieu d'être traité comme un chemin. Sans lui, un préfixe inconnu se résout silencieusement et les moteurs de recherche indexent une page dupliquée.

</Question>

<Question title="Comment traduire une application TanStack Start automatiquement avec l'IA ?">

Lancez `npx intlayer fill`. La CLI trouve les traductions manquantes et les remplit avec le LLM de votre choix, en utilisant votre propre fournisseur et votre clé d'API. Ajoutez `--git-diff` pour ne traduire que le contenu modifié sur la branche courante, ce qui garde les exécutions CI peu coûteuses. Voir la [commande fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/fill.md) et l'[intégration CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/CI_CD.md).

</Question>

<Question title="Intlayer prend-il en charge les pluriels, le genre et le texte enrichi ?">

Oui. Les déclarations de contenu prennent en charge les [formes plurielles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/plurial.md), le [contenu basé sur le genre](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/gender.md), les conditions, les [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/insertion.md) et le [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md) pour le texte long, avec des [formateurs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/formatters.md) pour les nombres, les dates et les devises.

</Question>

<Question title="Comment les traducteurs peuvent-ils modifier le contenu sans toucher au code ?">

Via l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md), qui tourne sur votre propre infrastructure et permet à quiconque de modifier le texte sur place sur le site en cours d'exécution, ou le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), qui externalise le contenu afin qu'il puisse changer sans déploiement.

</Question>

<Question title="Intlayer est-il gratuit et open source ?">

Oui, sous licence Apache 2.0, usage commercial inclus. Le CMS hébergé est un service payant optionnel qui peut aussi être [auto-hébergé](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/self_hosting.md).

</Question>

</FAQ>
