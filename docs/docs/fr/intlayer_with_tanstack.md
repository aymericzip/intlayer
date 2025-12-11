---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Comment traduire votre Tanstack Start – guide i18n 2025
description: Apprenez à ajouter l'internationalisation (i18n) à votre application Tanstack Start en utilisant Intlayer. Suivez ce guide complet pour rendre votre application multilingue avec un routage sensible à la locale.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Routage par locale
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.4.0
    date: 2025-12-11
    changes: Ajout de validatePrefix et étape 14 : gestion des pages 404 avec routes localisées.
  - version: 7.3.9
    date: 2025-12-05
    changes: Ajout de l’étape 13 : récupération de la locale dans vos server actions (optionnel)
  - version: 5.8.1
    date: 2025-09-09
    changes: Ajout pour Tanstack Start
---

# Traduire votre Tanstack Start avec Intlayer | Internationalisation (i18n)

## Table des matières

<TOC/>

Ce guide montre comment intégrer **Intlayer** pour une internationalisation fluide dans les projets Tanstack Start avec un routage sensible à la locale, la prise en charge de TypeScript et des pratiques de développement modernes.

## Qu'est-ce qu'Intlayer ?

**Intlayer** est une bibliothèque d'internationalisation (i18n) innovante et open-source, conçue pour simplifier la prise en charge multilingue dans les applications web modernes.

Avec Intlayer, vous pouvez :

- **Gérer facilement les traductions** en utilisant des dictionnaires déclaratifs au niveau des composants.
- **Localiser dynamiquement les métadonnées**, les routes et le contenu.
- **Assurer la prise en charge de TypeScript** avec des types générés automatiquement, améliorant l'autocomplétion et la détection d'erreurs.
- **Bénéficier de fonctionnalités avancées**, telles que la détection et le changement dynamique de la locale.
- **Activer un routage sensible à la locale** avec le système de routage basé sur les fichiers de Tanstack Start.

---

## Guide étape par étape pour configurer Intlayer dans une application Tanstack Start

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="La meilleure solution i18n pour Tanstack Start ? Découvrez Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Comment internationaliser votre application en utilisant Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Voir le [Template d'application](https://github.com/aymericzip/intlayer-tanstack-start-template) sur GitHub.

### Étape 1 : Créer le projet

Commencez par créer un nouveau projet TanStack Start en suivant le guide [Démarrer un nouveau projet](https://tanstack.com/start/latest/docs/framework/react/quick-start) sur le site de TanStack Start.

### Étape 2 : Installer les packages Intlayer

Installez les packages nécessaires en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  Le package principal qui fournit des outils d'internationalisation pour la gestion de la configuration, la traduction, la [déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md), la transpilation, et les [commandes CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

- **react-intlayer**
  Le package qui intègre Intlayer avec une application React. Il fournit des fournisseurs de contexte et des hooks pour l'internationalisation dans React.

- **vite-intlayer**
  Comprend le plugin Vite pour intégrer Intlayer avec le [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), ainsi que des middlewares pour détecter la locale préférée de l'utilisateur, gérer les cookies, et gérer la redirection des URL.

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

> Grâce à ce fichier de configuration, vous pouvez configurer les URL localisées, la redirection via middleware, les noms des cookies, l'emplacement et l'extension de vos déclarations de contenu, désactiver les logs Intlayer dans la console, et bien plus encore. Pour une liste complète des paramètres disponibles, consultez la [documentation de configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

### Étape 4 : Intégrer Intlayer dans votre configuration Vite

Ajoutez le plugin intlayer dans votre configuration :

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    viteReact(),
    intlayer(), // To add
  ],
});

export default config;
```

> Le plugin Vite `intlayer()` est utilisé pour intégrer Intlayer avec Vite. Il assure la construction des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

### Étape 5 : Créez les composants de mise en page

Configurez votre mise en page racine et les mises en page spécifiques aux locales :

#### Mise en page racine

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Étape 6 : Déclarez votre contenu

Créez et gérez vos déclarations de contenu pour stocker les traductions :

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        fr: "À propos",
        en: "About",
        es: "Acerca de",
      }),
      home: t({
        fr: "Accueil",
        en: "Home",
        es: "Inicio",
      }),
    },
    meta: {
      description: t({
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
      }),
    },
    title: t({
      fr: "Bienvenue à Intlayer + TanStack Router",
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Vos déclarations de contenu peuvent être définies n'importe où dans votre application dès qu'elles sont incluses dans le répertoire `contentDir` (par défaut, `./app`). Et elles doivent correspondre à l'extension de fichier des déclarations de contenu (par défaut, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Pour plus de détails, référez-vous à la [documentation des déclarations de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md).

### Étape 7 : Créez des composants et hooks sensibles à la locale

Créez un composant `LocalizedLink` pour une navigation sensible à la locale :

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Utilitaire principal
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Helpers
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

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

- Supprimer le préfixe `{-$locale}` inutile de l'URL.
- Injecter le paramètre de locale dans l'URL pour garantir que l'utilisateur est directement redirigé vers la route localisée.

Ensuite, nous pouvons créer un hook `useLocalizedNavigate` pour la navigation programmatique :

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

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

### Étape 8 : Utilisez Intlayer dans vos pages

Accédez à vos dictionnaires de contenu dans toute votre application :

#### Page d'accueil localisée

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
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

> Pour en savoir plus sur le hook `useIntlayer`, consultez la [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md).

### Étape 9 : Créer un composant de changement de langue

Créez un composant pour permettre aux utilisateurs de changer de langue :

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import { useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

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
          >
            <span>
              {/* Locale - ex. FR */}
              {localeEl}
            </span>
            <span>
              {/* Langue dans sa propre locale - ex. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Langue dans la locale courante - ex. Francés avec la locale courante définie sur Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Langue en anglais - ex. French */}
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

### Étape 10 : Ajouter la gestion des attributs HTML (Optionnel)

Créez un hook pour gérer les attributs lang et dir du HTML :

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
// src/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Ensuite, utilisez-le dans votre composant racine :

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importer le hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // ajouter cette ligne

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### Étape 11 : Ajouter un middleware (Optionnel)

Vous pouvez également utiliser le `intlayerProxy` pour ajouter un routage côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences linguistiques du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

> Notez que pour utiliser le `intlayerProxy` en production, vous devez déplacer le paquet `vite-intlayer` de `devDependencies` vers `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Le proxy doit être placé avant le serveur si vous utilisez Nitro
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
  ],
});
```

---

### Étape 12 : Internationaliser vos métadonnées (Optionnel)

Vous pouvez également utiliser le hook `getIntlayer` pour accéder à vos dictionnaires de contenu dans toute votre application :

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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

### Étape 13 : Récupérer la locale dans vos actions serveur (Optionnel)

Vous voudrez peut-être accéder à la locale actuelle depuis l'intérieur de vos actions serveur ou points de terminaison API.
Vous pouvez le faire en utilisant l'assistant `getLocale` de `intlayer`.

Voici un exemple utilisant les fonctions serveur de TanStack Start :

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Récupérer le cookie depuis la requête (défaut : 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Récupérer l'en-tête depuis la requête (défaut : 'x-intlayer-locale')
    getHeader: (name) => getRequestHeader(name),
    // Repli utilisant la négociation Accept-Language
    getAllHeaders: async () => {
      const headers = getRequestHeaders();
      const result: Record<string, string> = {};

      // Convertir les TypedHeaders en un simple Record<string, string>
      for (const [key, value] of headers.entries()) {
        result[key] = value;
      }

      return result;
    },
  });

  // Récupérer du contenu en utilisant getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Étape 14 : Gérer les pages non trouvées (Optionnel)

Lorsqu'un utilisateur visite une page inexistante, vous pouvez afficher une page personnalisée de non trouvée et le préfixe de locale peut affecter la façon dont la page de non trouvée est déclenchée.

#### Comprendre la gestion des 404 de TanStack Router avec les préfixes de locale

Dans TanStack Router, la gestion des pages 404 avec des routes localisées nécessite une approche multicouche :

1. **Route 404 dédiée** : Une route spécifique pour afficher l'interface utilisateur 404
2. **Validation au niveau de la route** : Valide les préfixes de locale et redirige ceux qui sont invalides vers 404
3. **Route catch-all** : Capture tous les chemins non correspondants dans le segment de locale

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

```tsx fileName="src/routes/__root.tsx"
import { createRootRoute } from "@tanstack/react-router";

// La route racine sert de mise en page de niveau supérieur
// Elle ne gère pas les 404 directement - c'est délégué aux routes enfants
// Cela garde la racine simple et permet aux routes conscientes de la locale de gérer leur propre logique 404
export const Route = createRootRoute({
  component: Outlet,
});
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad s'exécute avant que la route ne soit rendue (à la fois sur le serveur et le client)
  // C'est l'endroit idéal pour valider le préfixe de locale
  beforeLoad: ({ params }) => {
    // Obtenir la locale depuis les paramètres de route (pas depuis les en-têtes du serveur, car beforeLoad s'exécute à la fois sur le client et le serveur)
    const localeParam = params.locale;

    // validatePrefix vérifie si la locale est valide selon votre configuration intlayer
    // Retourne : { isValid: boolean, localePrefix: string }
    // - isValid: true si le préfixe correspond à une locale configurée (ou est vide lorsque le préfixe est optionnel)
    // - localePrefix: le préfixe validé ou le préfixe de locale par défaut pour les redirections
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (isValid) {
      // La locale est valide, permettre à la route de se rendre normalement
      return;
    }

    // Préfixe de locale invalide (p. ex., /xyz/about où "xyz" n'est pas une locale valide)
    // Rediriger vers la page 404 avec un préfixe de locale valide
    // Cela garantit que la page 404 est toujours correctement localisée
    throw redirect({
      to: "/{-$locale}/404",
      params: { locale: localePrefix },
    });
  },
  component: RouteComponent,
  // notFoundComponent est appelé lorsqu'une route enfant n'existe pas
  // p. ex., /en/page-inexistante déclenche ceci dans la mise en page /en
  notFoundComponent: NotFoundLayout,
});

function RouteComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    // Envelopper tout le segment de locale avec IntlayerProvider
    // Revient à defaultLocale lorsque le paramètre locale est undefined (mode préfixe optionnel)
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}

// NotFoundLayout enveloppe le composant 404 avec IntlayerProvider
// Cela garantit que les traductions fonctionnent toujours sur la page 404
function NotFoundLayout() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <NotFoundComponent />
      {/* Inclure LocaleSwitcher pour que les utilisateurs puissent changer de langue même sur 404 */}
      <LocaleSwitcher />
    </IntlayerProvider>
  );
}
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// La route $ (splat/catch-all) correspond à tout chemin qui ne correspond pas à d'autres routes
// p. ex., /en/quelque/chemin/profond/imbriqué/invalide
// Cela garantit que TOUS les chemins non correspondants dans une locale affichent la page 404
// Sans cela, les chemins profonds non correspondants pourraient afficher une page blanche ou une erreur
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Étape 15 : Configurer TypeScript (Optionnel)

Intlayer utilise l'augmentation de module pour bénéficier de TypeScript et renforcer votre base de code.

Assurez-vous que votre configuration TypeScript inclut les types générés automatiquement :

```json5 fileName="tsconfig.json"
{
  // ... vos configurations existantes
  include: [
    // ... vos inclusions existantes
    ".intlayer/**/*.ts", // Inclure les types générés automatiquement
  ],
}
```

---

### Configuration Git

Il est recommandé d'ignorer les fichiers générés par Intlayer. Cela vous permet d'éviter de les committer dans votre dépôt Git.

Pour ce faire, vous pouvez ajouter les instructions suivantes à votre fichier `.gitignore` :

```plaintext fileName=".gitignore"
# Ignorer les fichiers générés par Intlayer
.intlayer
```

---

## Extension VS Code

Pour améliorer votre expérience de développement avec Intlayer, vous pouvez installer l’**extension officielle Intlayer pour VS Code**.

[Installer depuis le Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Cette extension offre :

- **Autocomplétion** pour les clés de traduction.
- **Détection d’erreurs en temps réel** pour les traductions manquantes.
- **Aperçus en ligne** du contenu traduit.
- **Actions rapides** pour créer et mettre à jour facilement les traductions.

Pour plus de détails sur l'utilisation de l'extension, consultez la [documentation de l'extension VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Aller plus loin

Pour aller plus loin, vous pouvez implémenter l’[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) ou externaliser votre contenu en utilisant le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md).

---

## Références de la documentation

- [Documentation Intlayer](https://intlayer.org)
- [Documentation Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md)
- [Déclaration de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/get_started.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md)

Ce guide complet fournit tout ce dont vous avez besoin pour intégrer Intlayer avec Tanstack Start afin de créer une application entièrement internationalisée avec un routage sensible à la locale et une prise en charge de TypeScript.
