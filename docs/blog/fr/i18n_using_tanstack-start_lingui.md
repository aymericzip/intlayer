---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "i18n TanStack Start avec Lingui : Guide de Configuration Complet 2026"
description: "Traduisez votre application TanStack Start avec Lingui : macros, catalogues PO, SSR, routage par locale, hreflang, sitemap et robots.txt, ainsi que des données réelles de benchmark de taille de bundle."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Internationalisation
  - i18n
  - SEO
  - Fichiers PO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Version initiale"
author: aymericzip
---

# Comment internationaliser votre application TanStack Start avec Lingui en 2026

## Table des Matières

<TOC/>

## Qu'est-ce que Lingui ?

**Lingui** est une bibliothèque d'i18n conçue autour des **macros** et de l'**extraction de messages**. Vous écrivez le texte source directement dans vos composants (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` rassemble chaque message dans des catalogues (fichiers PO par défaut), les traducteurs les remplissent, et le plugin Vite les compile en JavaScript compact. Les messages utilisent ICU MessageFormat, donc les pluriels et les sélections sont pris en charge.

TanStack Start n'intègre pas de couche d'i18n par défaut, ce guide configure donc Lingui de zéro :

- **Macros compilées par Babel** via `@rolldown/plugin-babel` (requis avec `@vitejs/plugin-react` v6 et Vite 8).
- **Routage par locale** avec un segment optionnel `{-$locale}` (`/about`, `/fr/about`).
- **Un catalogue par locale, chargé à la demande**, et une instance `I18n` par rendu afin que les requêtes SSR concurrentes ne partagent jamais de locale.
- **SEO multilingue complet** : `<title>` et description traduits, URL canonique, `hreflang` avec `x-default`, locales Open Graph, JSON-LD, sitemap, `robots.txt`, pré-rendu et pages 404 localisées.

> Vous recherchez une autre stack ? Consultez le [guide TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_use-intl.md), le [guide TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_paraglide.md) ou le [guide TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

> Vous utilisez Next.js ? Consultez le [guide Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_nextjs_lingui.md). Vous comparez les bibliothèques ? Lisez [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer.md).

## Ce que dit le benchmark sur Lingui avec TanStack Start

Le [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) exécute la même application TanStack Start de 10 pages et 10 locales avec chaque bibliothèque majeure et mesure ce que le navigateur télécharge réellement.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Chiffres clés pour `@lingui/core@6.6.0`, mesurés le 2026-09-26 (gzip) :

| Configuration                      | Taille de la bibliothèque | JS par page | Fuite d'autres locales | Fuite d'autres pages |
| :--------------------------------- | ------------------------: | ----------: | ---------------------: | -------------------: |
| Sans i18n (application de base)    |                         - |    111.0 KB |                     0% |                   0% |
| Lingui (configuration de ce guide) |                   56.7 KB |    115.2 KB |                   9.3% |                   0% |
| `@intlayer/lingui` (compat)        |                    9.8 KB |    136.7 KB |                   9.9% |                   0% |
| `react-intlayer` (Intlayer natif)  |                    4.5 KB |    126.8 KB |                     0% |                   0% |

Ce qu'il faut retenir :

- **Chargez un catalogue par locale, à la demande.** Cela maintient les pages proches de la taille de l'application de base.
- **Le runtime reste lourd** (~57 KB gzip). L'adaptateur de compatibilité `@intlayer/lingui` (étape 16) conserve vos macros et le réduit à ~10 KB.

> Voir les données complètes : [Rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md), et le [dépôt du benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Comparaison des fonctionnalités sur TanStack Start

Comment Lingui se compare aux autres bibliothèques couramment utilisées sur TanStack Start :

| Fonctionnalité                              | `react-intlayer` (Intlayer)                   | `use-intl`              | Paraglide JS                           | Lingui                              |
| ------------------------------------------- | --------------------------------------------- | ----------------------- | -------------------------------------- | ----------------------------------- |
| **Traductions proches des composants**      | ✅ Colocalisées                               | ❌ JSON centralisé      | ❌ Un fichier JSON par locale          | ⚠️ Texte source dans les composants |
| **Intégration TypeScript**                  | ✅ Types auto-générés                         | ✅ Via `AppConfig`      | ✅ Fonctions de message typées         | ⚠️ Macros uniquement                |
| **Détection des traductions manquantes**    | ✅ Erreurs de type et avertissements de build | ⚠️ Fallback au runtime  | ⚠️ Repli sur la locale de base         | ⚠️ Repli sur le texte source        |
| **Contenu riche (JSX, Markdown)**           | ✅ Support direct                             | ⚠️ Balises via `t.rich` | ⚠️ Chaînes de caractères               | ✅ JSX dans `<Trans>`               |
| **Routage localisé**                        | ✅ Intégré                                    | ❌ `{-$locale}` manuel  | ✅ `urlPatterns` + réécriture routeur  | ❌ `{-$locale}` manuel              |
| **Changement de locale sans rechargement**  | ✅ Oui                                        | ✅ Oui                  | ❌ Rechargement complet de la page     | ✅ Oui                              |
| **Pluralisation**                           | ✅ Basée sur l'énumération                    | ✅ ICU                  | ✅ Variantes                           | ✅ ICU                              |
| **ICU MessageFormat**                       | ✅ Via `format: "icu"`                        | ✅ Natif                | ⚠️ Via un plugin inlang                | ✅ Natif                            |
| **Formats de contenu**                      | ✅ `.ts`, `.json`, `.md`, `.yaml`...          | ⚠️ `.json`              | ⚠️ JSON inlang                         | ✅ PO, JSON, CSV                    |
| **Traduction par IA**                       | ✅ Votre propre fournisseur et clé            | ❌ Non                  | ❌ Non                                 | ❌ Non                              |
| **Éditeur visuel / CMS**                    | ✅ Éditeur local + CMS optionnel              | ❌ Plateformes externes | ⚠️ Applications de l'écosystème inlang | ❌ Plateformes externes             |
| **Aides SEO (hreflang, sitemap)**           | ✅ Intégré                                    | ❌ Manuel               | ⚠️ URLs localisées, reste manuel       | ❌ Manuel                           |
| **Taille du runtime (gzip, benchmark)**     | 4.5 KB                                        | 75.9 KB                 | 1.8 KB                                 | 56.7 KB                             |
| **Fuite, meilleure config (locale / page)** | 0% / 0%                                       | 0% / 0%                 | 49.7% / 0%                             | 8.6% / 0%                           |
| **Traductions manquantes en CI**            | ✅ `npx intlayer test`                        | ⚠️ Non intégré          | ⚠️ Non intégré                         | ✅ `lingui compile --strict`        |

> Les chiffres de taille de runtime et de fuite proviennent du [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md). La fuite est mesurée sur la meilleure configuration de chaque bibliothèque.

> Autres guides TanStack Start : [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_use-intl.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_paraglide.md), et [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

## Bonnes pratiques à suivre

- **Définissez `lang` et `dir` sur `<html>`** à partir de la locale de la route, afin qu'ils soient corrects dans le HTML du serveur.
- **Conservez une URL par locale** avec un préfixe, afin que chaque version linguistique soit indexable.
- **Créez une instance `I18n` par locale**, ne modifiez jamais une instance globale pendant le SSR : deux requêtes concurrentes écraseraient mutuellement leur locale.
- **Chargez uniquement le catalogue actif**, n'importez jamais l'ensemble des catalogues dans le code client.
- **Choisissez un style de macro** (`useLingui` + `t` dans les composants, `msg` pour les descripteurs différés) et tenez-vous-y. Mélanger `t`, `i18n._`, `i18n.t` et `<Trans>` rend le code plus difficile à lire pour les humains et les assistants IA.
- **Exécutez `lingui extract` dans la CI** pour qu'aucun nouveau message ne soit déployé sans traduction.
- **Traduisez vos métadonnées**, et déclarez `canonical`, `hreflang` et `x-default` sur chaque page.
- **Générez un sitemap multilingue et un robots.txt**, et pré-rendez chaque locale.
- **Utilisez de vrais liens pour le sélecteur de langue**, afin que les robots d'indexation découvrent chaque langue.

> Consultez notre guide sur l'[internationalisation et le SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md) et le [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md).

## Guide étape par étape pour configurer Lingui dans une application TanStack Start

Voici la structure de projet que nous allons créer :

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generated by `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Request middleware (locale redirect)
    ├── i18n
    │   ├── config.ts           # Locales, URL helpers
    │   ├── lingui.ts           # Catalog loader, I18n instances
    │   ├── negotiateLocale.ts  # Accept-Language parsing
    │   └── seo.ts              # head() builder
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Locale layout + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Localized 404
```

<Steps>
<Step number={1} title="Installer les dépendances">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react** : runtime, `I18nProvider` et les macros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli** : `lingui extract` pour collecter les messages dans les catalogues.
- **@lingui/vite-plugin** : compile les catalogues `.po` à l'import, `lingui compile` n'est donc pas nécessaire.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel** : transforment les macros au moment du build.

</Step>
<Step number={2} title="Centraliser votre configuration de locale">

La locale par défaut reste sans préfixe (`/about`), les autres locales sont préfixées (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Configurer Lingui">

La configuration Lingui réutilise la même liste de locales, afin que les catalogues, le routeur et le sitemap soient toujours synchronisés.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

Ajoutez les scripts d'extraction :

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` échoue en CI lorsqu'un composant contient un message qui n'a pas été extrait et commité.

</Step>
<Step number={4} title="Configurer Vite">

Avec `@vitejs/plugin-react` v6, Babel n'est plus intégré. `@rolldown/plugin-babel` exécute le plugin de macro Lingui, et `linguiTransformerBabelPreset` traite uniquement les fichiers qui importent une macro, ce qui garantit des builds rapides.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Charger les catalogues par locale">

Le template literal dans `import()` permet à Vite de générer **un chunk par catalogue**, et le plugin Lingui y compile le fichier `.po`. Un visiteur français ne télécharge que le catalogue français.

Les messages compilés sont de simples données, ils peuvent donc être retournés par un loader de route, sérialisés dans le HTML et réutilisés lors de l'hydratation.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Pour que TypeScript accepte l'import `.po`, déclarez le module une fois :

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Créer le document racine">

La route racine lit le paramètre de locale optionnel pour définir `lang` et `dir` sur la balise `<html>` rendue côté serveur.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="Créer la route de layout de locale">

Le dossier `{-$locale}` crée un segment de chemin optionnel : `/about` et `/fr/about` correspondent tous deux à `/{-$locale}/about`. Le layout rejette les préfixes inconnus, charge le catalogue de la locale actuelle et fournit une instance `I18n` dédiée.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Utiliser les traductions dans vos pages">

Écrivez le texte source dans le composant. Les macros le transforment en identifiants de message au moment du build, et `lingui extract` les récupère.

- `<Trans>` pour le contenu JSX, y compris les éléments imbriqués ;
- `useLingui().t` pour les chaînes de caractères (attributs, props) ;
- `<Plural>` pour les pluriels ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> L'`import()` dynamique d'un catalogue est mis en cache par le système de modules, donc appeler `loadI18n` dans plusieurs loaders ne télécharge pas le catalogue deux fois.

</Step>
<Step number={9} title="Extraire et traduire vos messages">

Exécutez l'extraction. Lingui écrit chaque message dans le catalogue de chaque locale :

```bash
npm run i18n:extract
```

Traduisez ensuite le `msgstr` de chaque entrée :

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Par défaut, les identifiants de message sont des hachages du texte source : modifier le texte anglais crée un nouveau message. Utilisez des identifiants explicites (`<Trans id="about.title">About us</Trans>`) pour les textes qui changent souvent.

</Step>
<Step number={10} title="Créer un composant de lien localisé" isOptional={true}>

Chaque route réside sous `{-$locale}`, les liens doivent donc transmettre le paramètre de locale actuelle.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Changer la langue de votre contenu" isOptional={true}>

Affichez le sélecteur sous forme de **liens**, afin que les moteurs de recherche découvrent chaque version linguistique. `to="."` conserve la page actuelle et remplace le paramètre de locale. Le loader du layout de locale récupère ensuite le nouveau catalogue.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="Internationaliser vos métadonnées" isOptional={true}>

Chaque version linguistique peut se positionner de manière autonome, à condition que chaque page expose un `<title>` et une description traduits, une balise canonique auto-référencée, un `hreflang` par locale plus `x-default`, les locales Open Graph, et JSON-LD avec `inLanguage`. Les métadonnées sont traduites dans le loader (étape 8), et cet utilitaire construit le reste :

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={13} title="Internationaliser votre sitemap et robots.txt" isOptional={true}>

Le sitemap liste chaque URL de chaque locale, chaque entrée déclarant toutes ses alternatives avec `xhtml:link`. `robots.txt` bloque les routes privées dans chaque langue et pointe vers le sitemap. Supprimez `public/robots.txt` si le starter en a créé un.

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={14} title="Pré-rendre chaque locale" isOptional={true}>

Listez chaque chemin localisé afin que TanStack Start pré-rende toutes les versions linguistiques au moment du build :

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Rediriger les nouveaux visiteurs et gérer les pages 404" isOptional={true}>

Un middleware de requête redirige un visiteur arrivant sur `/` vers sa langue préférée (le cookie en priorité, puis `Accept-Language`). Les liens profonds ne sont jamais redirigés, garantissant ainsi que les moteurs de recherche et les URLs partagées obtiennent toujours la page demandée.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

Pour les pages 404, une route fourre-tout rend le `notFoundComponent` localisé du layout. Marquez-la avec `noindex` : React 19 hisse la balise `<meta>` dans `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Conserver vos macros, réduire le runtime avec Intlayer" isOptional={true}>

L'adaptateur de compatibilité [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md) conserve votre code source intact : les macros se compilent exactement comme avant, et les appels `i18n._()`, `useLingui()` et `<Trans>` résultants sont pris en charge par les dictionnaires Intlayer compilés. Dans le benchmark, le runtime passe de **~56.7 KB à ~9.8 KB** gzip.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Ajoutez le plugin après la transformation des macros, afin qu'il crée un alias de `@lingui/core` et `@lingui/react` vers l'adaptateur :

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Les catalogues sont synchronisés avec le [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) (catalogues JSON) ou le [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md) (catalogues PO). Retrouvez la configuration complète dans le [guide de compatibilité Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md), ainsi qu'une comparaison côte à côte dans [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer-lingui.md).

</Step>
<Step number={17} title="Automatiser vos traductions avec Intlayer" isOptional={true}>

Lingui extrait les messages, mais remplir des dizaines de catalogues à la main représente la majeure partie du temps passé. Intlayer est **gratuit** et **open source**, et ses outils fonctionnent en harmonie avec Lingui :

- **Traduire avec l'IA** en utilisant votre propre clé API et fournisseur. Voir [auto-remplissage](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md) et la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).
- **Conserver vos fichiers PO** comme source de vérité avec le [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md).
- **Tester les traductions manquantes** en CI. Voir [tester vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md).
- **Auditer votre site déployé** pour détecter les `hreflang` manquants, les URLs canoniques incorrectes et les fuites de locale avec la [commande scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/scan.md).

</Step>
</Steps>

## Foire Aux Questions

<FAQ>

<Question title="Lingui fonctionne-t-il avec TanStack Start ?">

Oui. Lingui ne propose pas d'intégration dédiée à TanStack Start, mais son plugin Vite et son plugin de macros Babel fonctionnent directement. Les deux points essentiels à respecter consistent à exécuter les macros via `@rolldown/plugin-babel` (Vite 8 et `@vitejs/plugin-react` v6 n'incluant plus Babel), et à créer une instance `I18n` par locale plutôt que d'activer une instance globale pendant le SSR.

</Question>
<Question title="Pourquoi ne pas utiliser l'objet i18n global de @lingui/core ?">

Côté serveur, un processus traite de nombreuses requêtes simultanément. Appeler `i18n.activate("fr")` sur un objet partagé changerait la langue d'une requête en cours de rendu en anglais en parallèle. `setupI18n` crée une instance isolée par locale, ce qui est totalement sûr.

</Question>
<Question title="Dois-je exécuter lingui compile ?">

Non. `@lingui/vite-plugin` compile les catalogues `.po` dès qu'ils sont importés. Vous n'avez besoin d'exécuter `lingui extract` que pour collecter de nouveaux messages.

</Question>
<Question title="Comment traduire le titre de la page et la description meta avec Lingui ?">

Déclarez-les avec la macro `msg`, et traduisez-les dans le loader de route avec ``i18n._(msg`...`)``. Le loader retourne de simples chaînes de caractères, ce qui permet à `head()` de rester synchrone et aux valeurs d'être sérialisées pour l'hydratation. L'étape 8 et l'étape 12 présentent la configuration complète.

</Question>
<Question title="Quelle est la taille de Lingui dans un bundle TanStack Start ?">

Le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) mesure ~56.7 KB gzip pour le runtime. Avec un catalogue par locale chargé à la demande, les pages pèsent ~115 KB contre 111 KB sans i18n. Importer statiquement chaque catalogue fait monter la taille à ~152 KB.

</Question>
<Question title="Puis-je conserver les macros Lingui et migrer vers Intlayer ?">

Oui. L'adaptateur [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md) conserve les macros et remplace le runtime. Vous pouvez ensuite migrer vos composants vers `useIntlayer` progressivement. Consultez les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md).

</Question>

</FAQ>
