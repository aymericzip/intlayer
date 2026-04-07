---
createdAt: 2025-03-25
updatedAt: 2026-03-29
title: i18n Tanstack Start - Comment traduire une application Tanstack Start en utilisant Solid.js en 2026
description: Apprenez à ajouter l'internationalisation (i18n) à votre application Tanstack Start en utilisant Intlayer et Solid.js. Suivez ce guide complet pour rendre votre application multilingue avec un routage tenant compte de la localisation.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Routage de localisation
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Ajouté pour Tanstack Start Solid.js"
---

# Traduisez votre site web Tanstack Start avec Solid.js en utilisant Intlayer | Internationalisation (i18n)

## Table des matières

<TOC/>

Ce guide démontre comment intégrer **Intlayer** pour une internationalisation fluide dans les projets Tanstack Start avec Solid.js, le routage tenant compte de la localisation, le support TypeScript et les pratiques de développement modernes.

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source conçue pour simplifier le support multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer le support TypeScript** avec des types autogénérés, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées**, comme la détection et le changement dynamique de langue.
- **Activer le routage tenant compte de la localisation** avec le système de routage basé sur les fichiers de Tanstack Start.

---

## Guide étape par étape pour configurer Intlayer dans une application Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Vidéo" value="video">
  
<iframe title="La meilleure solution i18n pour Tanstack Start ? Découvrez Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application en utilisant Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Voir le [Modèle d'Application](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) sur GitHub.

### Étape 1 : Créer le projet

Commencez par créer un nouveau projet TanStack Start en suivant le guide [Démarrer un nouveau projet](https://tanstack.com/start/latest/docs/framework/solid/quick-start) sur le site web de TanStack Start.

### Étape 2 : Installer les packages Intlayer

Installez les packages nécessaires en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md), la transpilation et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).

- **solid-intlayer**
  Le package qui intègre Intlayer avec une application Solid. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation Solid.

- **vite-intlayer**
  Inclut le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi qu'un middleware pour détecter la langue préférée de l'utilisateur, gérer les cookies et gérer la redirection d'URL.

### Étape 3 : Configuration de votre projet

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

> Grâce à ce fichier de configuration, vous pouvez configurer des URL localisées, la redirection du middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et plus encore. Pour une liste complète des paramètres disponibles, reportez-vous à la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 4 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration :

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> Le plugin Vite `intlayer()` est utilisé pour intégrer Intlayer avec Vite. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

### Étape 5 : Créer l'affichage racine (Root Layout)

Configurez votre affichage racine pour supporter l'internationalisation en utilisant `useParams` pour détecter la langue actuelle et en définissant les attributs `lang` et `dir` sur la balise `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>
            {props.children}
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

### Étape 6 : Créer la mise en page de la langue (Optionnel)

Créez une mise en page qui gère le préfixe de la langue et effectue la validation. Cette mise en page garantira que seules les langues valides sont traitées.

> Cette étape est facultative si vous n'avez pas besoin de valider le préfixe de la langue au niveau de la route.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Valider le préfixe de la langue
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Ici, `{-$locale}` est un paramètre de route dynamique qui est remplacé par la langue actuelle. Cette notation rend le segment optionnel, lui permettant de fonctionner avec des modes de routage tels que `'prefix-no-default'`, etc.

> Sachez que ce segment peut causer des problèmes si vous utilisez plusieurs segments dynamiques dans la même route (par exemple, `/{-$locale}/autre-chemin/$unAutreCheminDynamique/...`).
> Pour le mode `'prefix-all'`, vous préférerez peut-être remplacer le segment par `$locale`.
> Pour le mode `'no-prefix'` ou `'search-params'`, vous pouvez supprimer complètement le segment.

### Étape 7 : Déclarer votre contenu

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
        es: "Este es un exemple de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application tant qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./app`). Et qu'elles correspondent à l'extension du fichier de déclaration de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Pour plus de détails, reportez-vous à la [documentation sur la déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md).

### Étape 8 : Créer des composants et des hooks tenant compte de la langue

Créez un composant `LocalizedLink` pour une navigation tenant compte de la langue :

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Ce composant a deux objectifs :

- Supprimer le préfixe inutile `{-$locale}` de l'URL.
- Injecter le paramètre de langue dans l'URL pour garantir que l'utilisateur est directement redirigé vers la route localisée.

Ensuite, nous pouvons créer un hook `useLocalizedNavigate` pour la navigation programmatique :

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

### Étape 9 : Utiliser Intlayer dans vos pages

Accédez à vos dictionnaires de contenu partout dans votre application :

#### Page d'accueil localisée

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> Dans Solid, `useIntlayer` retourne une fonction **accesseur** (par exemple, `content()`). Vous devez appeler cette fonction pour accéder au contenu réactif.
>
> Pour en savoir plus sur le hook `useIntlayer`, reportez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useIntlayer.md).

### Étape 10 : Créer un composant de changement de langue (Locale Switcher)

Créez un composant pour permettre aux utilisateurs de changer de langue :

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> Dans Solid, `locale` provenant de `useLocale` est un **accesseur de signal**. Utilisez `locale()` (avec parenthèses) pour lire sa valeur actuelle de manière réactive.
>
> Pour en savoir plus sur le hook `useLocale`, reportez-vous à la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useLocale.md).

### Étape 11 : Gestion des attributs HTML

Comme vu à l'étape 5, vous pouvez gérer les attributs `lang` et `dir` de la balise `html` en utilisant `useParams` dans votre composant racine. Cela garantit que les attributs corrects sont définis sur le serveur et le client.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Étape 12 : Ajouter un middleware (Optionnel)

Vous pouvez également utiliser `intlayerProxy` pour ajouter un routage côté serveur à votre application. Ce plugin détectera automatiquement la langue actuelle en fonction de l'URL et définira le cookie de langue approprié. Si aucune langue n'est spécifiée, le plugin déterminera la langue la plus appropriée en fonction des préférences linguistiques du navigateur de l'utilisateur. Si aucune langue n'est détectée, il redirigera vers la langue par défaut.

> Notez que pour utiliser `intlayerProxy` en production, vous devez déplacer le package `vite-intlayer` de `devDependencies` vers `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Le proxy doit être placé avant le serveur si vous utilisez Nitro
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Étape 13 : Internationaliser vos métadonnées (Optionnel)

Vous pouvez également utiliser la fonction `getIntlayer` pour accéder à vos dictionnaires de contenu à l'intérieur du chargeur `head` pour des métadonnées tenant compte de la localisation :

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Étape 13 : Récupérer la langue dans vos actions serveur (Optionnel)

Vous voudrez peut-être accéder à la langue actuelle depuis vos actions serveur ou vos points de terminaison d'API.
Vous pouvez le faire en utilisant l'utilitaire `getLocale` d'`intlayer`.

Voici un exemple utilisant les fonctions serveur de TanStack Start :

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Récupérer le cookie de la requête (par défaut : 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Récupérer l'en-tête de la requête (par défaut : 'x-intlayer-locale')
    // Repli en utilisant la négociation Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Récupérer du contenu en utilisant getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Étape 14 : Gérer les pages non trouvées (Optionnel)

Lorsqu'un utilisateur visite une page inexistante, vous pouvez afficher une page 404 personnalisée et le préfixe de langue peut impacter la manière dont la page non trouvée est déclenchée.

#### Comprendre la gestion 404 de TanStack Router avec les préfixes de langue

Dans TanStack Router, la gestion des pages 404 avec des routes localisées nécessite une approche à plusieurs niveaux :

1. **Route 404 dédiée** : Une route spécifique pour afficher l'interface 404.
2. **Validation au niveau de la route** : Valide les préfixes de langue et redirige les préfixes invalides vers la page 404.
3. **Route fourre-tout (Catch-all)** : Capture tous les chemins non correspondants à l'intérieur du segment de langue.

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Cela crée une route dédiée /[locale]/404
// Elle est utilisée à la fois comme route directe et importée en tant que composant dans d'autres fichiers
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Exporté séparément pour pouvoir être réutilisé dans notFoundComponent et les routes fourre-tout
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad s'exécute avant le rendu de la route (sur le serveur et le client)
  // C'est l'endroit idéal pour valider le préfixe de langue
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix vérifie si la langue est valide selon votre configuration intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Préfixe de langue invalide - rediriger vers la page 404 avec un préfixe de langue valide
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent est appelé lorsqu'une route enfant n'existe pas
  // par exemple, /en/page-inexistante déclenche cela à l'intérieur de la mise en page /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// La route $ (splat/catch-all) correspond à n'importe quel chemin qui ne correspond pas aux autres routes
// par exemple, /en/certains/chemins/profondément/imbriqués/invalides
// Cela garantit que TOUS les chemins non correspondants à l'intérieur d'une langue affichent la page 404
// Sans cela, les chemins profonds non correspondants pourraient afficher une page blanche ou une erreur
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### (Optionnel) Étape 15 : Extraire le contenu de vos composants

Si vous avez une base de code existante, transformer des milliers de fichiers peut prendre du temps.

Pour faciliter ce processus, Intlayer propose un [compilateur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md) / [extracteur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/extract.md) pour transformer vos composants et extraire le contenu.

Pour le configurer, vous pouvez ajouter une section `compiler` dans votre fichier `intlayer.config.ts` :

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Reste de votre config
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
     * Indique si les composants doivent être enregistrés après avoir été transformés.
     *
     * - Si `true`, le compilateur réécrira le fichier du composant sur le disque. Ainsi, la transformation sera permanente, et le compilateur ignorera la transformation pour le prochain processus. De cette façon, le compilateur peut transformer l'application, puis il peut être supprimé.
     *
     * - Si `false`, le compilateur injectera l'appel de fonction `useIntlayer()` dans le code de la sortie de construction uniquement, et gardera la base de code intacte. La transformation se fera uniquement en mémoire.
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Reste de votre config
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
     * Indique si les composants doivent être enregistrés après avoir été transformés.
     *
     * - Si `true`, le compilateur réécrira le fichier du composant sur le disque. Ainsi, la transformation sera permanente, et le compilateur ignorera la transformation pour le prochain processus. De cette façon, le compilateur peut transformer l'application, puis il peut être supprimé.
     *
     * - Si `false`, le compilateur injectera l'appel de fonction `useIntlayer()` dans le code de la sortie de construction uniquement, et gardera la base de code intacte. La transformation se fera uniquement en mémoire.
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Reste de votre config
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
     * Indique si les composants doivent être enregistrés après avoir été transformés.
     *
     * - Si `true`, le compilateur réécrira le fichier du composant sur le disque. Ainsi, la transformation sera permanente, et le compilateur ignorera la transformation pour le prochain processus. De cette façon, le compilateur peut transformer l'application, puis il peut être supprimé.
     *
     * - Si `false`, le compilateur injectera l'appel de fonction `useIntlayer()` dans le code de la sortie de construction uniquement, et gardera la base de code intacte. La transformation se fera uniquement en mémoire.
     */
    saveComponents: false,

    /**
     * Préfixe de clé de dictionnaire
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
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

Mettez à jour votre `vite.config.ts` pour inclure le plugin `intlayerCompiler` :

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
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

---

### Étape 16 : Générer un Sitemap (Optionnel)

Intlayer est livré avec un générateur de sitemap intégré pour vous aider à créer facilement un sitemap pour votre application. Il gère les routes localisées et ajoute les métadonnées nécessaires pour les moteurs de recherche.

> Le sitemap généré par Intlayer prend en charge l'espace de noms `xhtml:link` (Hreflang XML Extensions). Contrairement aux générateurs de sitemap par défaut qui ne répertorient que les URL brutes, Intlayer crée automatiquement les liens bidirectionnels requis entre toutes les versions linguistiques d'une page (par exemple, `/about`, `/about?lang=fr` et `/about?lang=es`). Cela garantit que les moteurs de recherche indexent et servent correctement la bonne version linguistique au bon public.

Pour l'utiliser, vous devez d'abord configurer votre fichier `vite.config.ts` pour activer le pré-rendu de vos routes localisées et désactiver la génération de sitemap par défaut de TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
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
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

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

---

### Étape 17 : Configurer TypeScript (Optionnel)

Intlayer utilise l'augmentation de module pour bénéficier des avantages de TypeScript et rendre votre base de code plus robuste.

Assurez-vous que votre configuration TypeScript inclut les types autogénérés :

```json5 fileName="tsconfig.json"
{
  // ... vos configurations existantes
  include: [
    // ... vos inclusions existantes
    ".intlayer/**/*.ts", // Inclure les types auto-générés
  ],
}
```

---

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les commettre dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

## Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l'**extension officielle Intlayer VS Code**.

[Installer depuis le VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension fournit :

- **Autocomplétion** pour les clés de traduction.
- **Détection des erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, reportez-vous à la [documentation de l'extension Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Aller plus loin

Pour aller plus loin, vous pouvez implémenter l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---

## Références de la documentation

- [Documentation Intlayer](https://intlayer.org)
- [Documentation Tanstack Start](https://tanstack.com/start/latest)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/solid-intlayer/useLocale.md)
- [Déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)
