---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n TanStack Start avec use-intl : Guide de configuration complet 2026"
description: "Traduisez votre application TanStack Start avec use-intl : routage par locale, messages typés, SSR, hreflang, sitemap et robots.txt, ainsi que de véritables données de benchmark de taille de bundle."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Internationalisation
  - i18n
  - SEO
  - Sitemap
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Version initiale"
author: aymericzip
---

# Comment internationaliser votre application TanStack Start avec use-intl en 2026

## Table des matières

<TOC/>

## Qu'est-ce que use-intl ?

**use-intl** est le cœur agnostique de framework de `next-intl`. Il expose les mêmes API `useTranslations`, `useFormatter` et `IntlProvider`, la prise en charge d'ICU MessageFormat et une intégration TypeScript solide, sans aucune dépendance envers Next.js. Cela en fait l'un des choix les plus courants pour traduire une application **TanStack Start**, et c'est la bibliothèque que les assistants IA suggèrent le plus souvent pour cette stack.

TanStack Start n'intègre pas de couche i18n native. Le routage, la détection de la locale, les métadonnées SEO et la génération du sitemap vous incombent. Ce guide couvre l'ensemble de ces aspects, de bout en bout :

- **Routage prenant en compte la locale** avec un segment optionnel `{-$locale}` (`/about`, `/fr/about`).
- **Chargement des messages par route** afin qu'une page ne télécharge que les espaces de noms (namespaces) et la locale qu'elle affiche.
- **Rendu côté serveur et hydratation** sans incohérence de texte.
- **SEO multilingue complet** : `<title>` et description traduits, URL canonique, balises alternatives `hreflang` avec `x-default`, locales Open Graph, JSON-LD, sitemap avec alternatives `xhtml:link`, `robots.txt` et pré-rendu de chaque locale.

> Vous cherchez une autre stack ?

- [guide TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_paraglide.md)
- [guide TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_lingui.md)
- [guide TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md)

> Vous utilisez plutôt Next.js ? Consultez le [guide next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-intl.md).

- [guide next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-intl.md)

> Pour comprendre d'où viennent ces bibliothèques, lisez l'histoire de l'i18n en JavaScript.

- [L'histoire de l'i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)

## Ce que dit le benchmark à propos de use-intl sur TanStack Start

Le [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) exécute la même application TanStack Start de 10 pages et 10 locales avec chaque bibliothèque majeure et mesure ce que le navigateur télécharge réellement.

- [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Chiffres clés pour `use-intl@4.14.2`, mesurés le 2026-09-26 (gzip) :

| Configuration                     | Taille de la bibliothèque | JS par page | Fuite autre locale | Fuite autre page |
| :-------------------------------- | ------------------------: | ----------: | -----------------: | ---------------: |
| Sans i18n (app de base)           |                         - |    111.0 KB |                 0% |               0% |
| `use-intl` (setup de ce guide)    |                   75.9 KB |    128.7 KB |                 0% |               0% |
| `@intlayer/use-intl` (compat)     |                    6.7 KB |    129.4 KB |                 0% |               0% |
| `react-intlayer` (Intlayer natif) |                    4.5 KB |    126.8 KB |                 0% |               0% |

Ce qu'il faut retenir :

- **Séparez les messages par page et chargez-les par locale.** Cela élimine les deux fuites, et c'est ce que mettent en œuvre les étapes ci-dessous.
- **Le runtime lui-même reste lourd** (~76 KB gzip), car le parser ICU est envoyé au client. L'adaptateur de compatibilité `@intlayer/use-intl` (étape 17) conserve exactement la même API avec un runtime de ~7 KB.

> Consultez les données complètes : [Rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) et le [dépôt du benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)

## Comparaison des fonctionnalités sur TanStack Start

Comment `use-intl` se positionne face aux autres bibliothèques couramment utilisées sur TanStack Start :

| Fonctionnalité                              | `react-intlayer` (Intlayer)            | `use-intl`              | Paraglide JS                             | Lingui                              |
| ------------------------------------------- | -------------------------------------- | ----------------------- | ---------------------------------------- | ----------------------------------- |
| **Traductions proches des composants**      | ✅ Co-localisées                       | ❌ JSON centralisé      | ❌ Un fichier JSON par locale            | ⚠️ Texte source dans les composants |
| **Intégration TypeScript**                  | ✅ Types auto-générés                  | ✅ Via `AppConfig`      | ✅ Fonctions de message typées           | ⚠️ Macros uniquement                |
| **Détection des traductions manquantes**    | ✅ Erreurs de type et alertes de build | ⚠️ Fallback au runtime  | ⚠️ Repli sur la locale de base           | ⚠️ Repli sur le texte source        |
| **Contenu riche (JSX, Markdown)**           | ✅ Prise en charge directe             | ⚠️ Balises via `t.rich` | ⚠️ Chaînes de caractères                 | ✅ JSX dans `<Trans>`               |
| **Routage localisé**                        | ✅ Intégré                             | ❌ Manuel `{-$locale}`  | ✅ `urlPatterns` + réécriture du routeur | ❌ Manuel `{-$locale}`              |
| **Changement de locale sans rechargement**  | ✅ Oui                                 | ✅ Oui                  | ❌ Rechargement complet de la page       | ✅ Oui                              |
| **Pluralisation**                           | ✅ Basée sur l'énumération             | ✅ ICU                  | ✅ Variantes                             | ✅ ICU                              |
| **ICU MessageFormat**                       | ✅ Via `format: "icu"`                 | ✅ Natif                | ⚠️ Via un plugin inlang                  | ✅ Natif                            |
| **Formats de contenu**                      | ✅ `.ts`, `.json`, `.md`, `.yaml`...   | ⚠️ `.json`              | ⚠️ JSON inlang                           | ✅ PO, JSON, CSV                    |
| **Traduction par IA**                       | ✅ Votre propre fournisseur et clé     | ❌ Non                  | ❌ Non                                   | ❌ Non                              |
| **Éditeur visuel / CMS**                    | ✅ Éditeur local + CMS optionnel       | ❌ Plateformes externes | ⚠️ Applications de l'écosystème inlang   | ❌ Plateformes externes             |
| **Aides SEO (hreflang, sitemap)**           | ✅ Intégrées                           | ❌ Manuel               | ⚠️ URLs localisées, reste manuel         | ❌ Manuel                           |
| **Taille du runtime (gzip, benchmark)**     | 4.5 KB                                 | 75.9 KB                 | 1.8 KB                                   | 56.7 KB                             |
| **Fuite, meilleure config (locale / page)** | 0% / 0%                                | 0% / 0%                 | 49.7% / 0%                               | 8.6% / 0%                           |
| **Traductions manquantes dans le CI**       | ✅ `npx intlayer test`                 | ⚠️ Non intégré          | ⚠️ Non intégré                           | ✅ `lingui compile --strict`        |

> Les chiffres de taille de runtime et de fuite proviennent du [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md). La fuite est mesurée sur la meilleure configuration de chaque bibliothèque.

- [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)

> Autres guides TanStack Start :

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md)

## Bonnes pratiques à respecter

- **Définissez `lang` et `dir` sur `<html>`** pour l'accessibilité, les lecteurs d'écran et les moteurs de recherche.
- **Conservez une URL par locale.** Utilisez un préfixe de locale (`/fr/about`) plutôt qu'un basculement uniquement par cookie, afin que chaque page traduite puisse être explorée et partagée.
- **Séparez les messages par espace de noms (namespace)** (`common`, `home`, `about`) et chargez-les par route.
- **Ne chargez que la locale active.** N'importez jamais l'ensemble des fichiers de locale dans un module envoyé au client.
- **Fixez le fuseau horaire** dans `IntlProvider`. Sinon, les dates sont formatées dans le fuseau horaire du serveur lors du SSR et dans celui du visiteur lors de l'hydratation, ce qui provoque des erreurs d'hydratation (hydration mismatches).
- **Traduisez vos métadonnées**, et déclarez `canonical`, `hreflang` et `x-default` sur chaque page.
- **Générez un sitemap multilingue et un robots.txt**, et pré-rendez chaque locale.
- **Utilisez de vrais liens pour le sélecteur de langue**, pas un simple `<select>`, afin que les robots d'indexation puissent découvrir toutes les langues.
- **Typez vos messages** pour qu'une clé manquante échoue dès la compilation.

- [l'internationalisation et le SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md)
- [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md)

## Guide étape par étape pour configurer use-intl dans une application TanStack Start

Voici la structure de projet que nous allons créer :

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="Installer les dépendances">

Commencez à partir d'un projet TanStack Start, puis ajoutez `use-intl` :

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl** : fournit `IntlProvider`, `useTranslations`, `useFormatter` et `createTranslator` (utilisable en dehors de React, par exemple dans `head()`).

</Step>
<Step number={2} title="Centraliser la configuration de vos locales">

Créez une source unique de vérité pour vos locales et vos fonctions utilitaires d'URL. Tous les autres fichiers (routes, SEO, sitemap, pré-rendu) importeront depuis ici, donc ajouter une locale se résume à modifier une seule ligne.

La locale par défaut reste sans préfixe (`/about`), les autres locales sont préfixées (`/fr/about`). Il s'agit de la stratégie « selon les besoins » (as-needed) : une URL par page et par locale, et des URL courtes pour votre audience principale.

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
<Step number={3} title="Créer vos fichiers de traduction">

Organisez les messages par locale et par espace de noms (namespace). `common` contient ce dont chaque page a besoin (navigation, pied de page), et chaque page a son propre fichier, y compris pour ses métadonnées.

use-intl utilise **ICU MessageFormat**, les pluriels, sélections et arguments formatés se trouvent donc directement dans le message.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Créez `home.json` de la même manière, avec un objet `metadata` et le contenu de la page.

</Step>
<Step number={4} title="Charger les messages par namespace et par locale">

Ce chargeur est le fichier le plus important pour les performances. `import.meta.glob` indique à Vite d'émettre **un chunk par fichier JSON**. Une route qui demande `["about"]` en français télécharge `messages/fr/about.json` et rien d'autre, ce qui permet au benchmark d'atteindre 0% de fuite de locale et 0% de fuite de page.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Typer vos messages">

L'augmentation de module vous offre l'autocomplétion sur `useTranslations("about")` et `t("counter.label")`, ainsi qu'une erreur de compilation pour toute faute de frappe ou clé supprimée.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Assurez-vous que `resolveJsonModule` est activé dans votre fichier `tsconfig.json`.

</Step>
<Step number={6} title="Créer le document racine">

La route racine affiche `<html>`. Elle lit le paramètre de locale optionnel pour définir `lang` et `dir`, garantissant ainsi que les attributs sont corrects dans le HTML rendu côté serveur, avant même que le JavaScript ne s'exécute.

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
  // strict: false reads params from whichever route is matched
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
<Step number={7} title="Créer la route de layout pour la locale">

Le dossier `{-$locale}` crée un segment d'URL **optionnel** : `/about` et `/fr/about` correspondent tous deux à `/{-$locale}/about`. Ce layout :

1. Rejette les préfixes non pris en charge (`/xx/about` → 404).
2. Charge le namespace `common` pour la locale actuelle uniquement.
3. Fournit les messages via `IntlProvider`.

Le résultat du loader est sérialisé dans le HTML et réutilisé lors de l'hydratation, ce qui évite au client de télécharger `common.json` une seconde fois. `staleTime: Infinity` le conserve en cache lors des navigations côté client.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` ne fusionne pas les messages d'un provider parent. L'étape suivante ajoute un petit composant qui s'en charge, afin que chaque page puisse ajouter son propre namespace par-dessus `common`.

</Step>
<Step number={8} title="Délimiter la portée des messages de la page">

Chaque page charge son propre namespace dans son loader, puis enveloppe son contenu avec `ScopedMessages`, qui fusionne le namespace de la page avec les messages parents.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Utiliser les traductions dans vos pages">

Le loader de la page récupère le namespace `about` pour la locale actuelle, `head()` génère des métadonnées traduites et complètes pour le SEO à partir de celui-ci (voir étape 13), et le composant affiche le contenu.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Utiliser les traductions et formateurs dans les composants">

Tout composant situé sous les providers peut appeler `useTranslations` et `useFormatter`. Les pluriels sont résolus par ICU, et les nombres sont formatés selon la locale active.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Créer un composant Link localisé" isOptional={true}>

Chaque route vit sous `{-$locale}`, un lien doit donc transmettre le paramètre de locale actuel. Ce wrapper conserve le typage de `to` de TanStack Router et injecte automatiquement la locale pour vous.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Changer la langue de votre contenu" isOptional={true}>

Affichez le sélecteur sous forme de **liens**, et non d'un élément `<select>`. Les liens peuvent être explorés par les moteurs de recherche pour découvrir toutes les versions linguistiques, et ils fonctionnent sans JavaScript. `to="."` conserve la page actuelle et remplace uniquement le paramètre de locale. Le cookie mémorise le choix explicite pour le middleware de redirection de l'étape 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
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
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
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
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="Internationaliser vos métadonnées" isOptional={true}>

C'est ici que l'i18n porte ses fruits : chaque version linguistique peut se positionner de manière indépendante. Chaque page doit exposer :

- un `<title>` et une `description` **traduits** ;
- une URL **canonique** pointant vers elle-même (et non vers la locale par défaut) ;
- une alternative **`hreflang` par locale**, plus **`x-default`** pour les langues non prises en charge ;
- les balises **Open Graph** `og:locale`, `og:locale:alternate` et `og:url`, utilisées par les aperçus sociaux ;
- un bloc **JSON-LD** avec `inLanguage`, qui aide les moteurs de recherche et assistants IA à attribuer la langue de la page.

Un helper unique génère l'ensemble de ces éléments pour garder vos pages concises :

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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
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

Utilisez-le dans le `head()` de chaque page, comme illustré à l'étape 9. Pour la page d'accueil, passez `path: "/"`.

</Step>
<Step number={14} title="Internationaliser votre sitemap" isOptional={true}>

Un sitemap multilingue liste **chaque URL de chaque locale**, et chaque entrée déclare toutes ses alternatives avec `xhtml:link`. Google utilise ces annotations exactement comme les balises `hreflang` de la page, ce qui en fait un filet de sécurité fiable lorsqu'une page est rarement explorée.

Les routes serveur de TanStack Start vous permettent de le servir directement depuis une route de fichier :

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

</Step>
<Step number={15} title="Internationaliser votre robots.txt" isOptional={true}>

Les routes privées existent dans toutes les langues, les règles `Disallow` doivent donc couvrir chaque préfixe. Supprimez `public/robots.txt` si le starter en a créé un, puis servez-le depuis une route :

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

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
<Step number={16} title="Rediriger les nouveaux visiteurs vers leur langue" isOptional={true}>

Un middleware de requête redirige un visiteur arrivant sur `/` vers sa langue préférée, en se basant d'abord sur le cookie de locale, puis sur l'en-tête `Accept-Language`. Seule l'URL `/` est redirigée : les liens profonds ne sont jamais modifiés, de sorte que les URL partagées et les robots d'indexation reçoivent toujours exactement la page demandée.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

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

> Un visiteur qui choisit explicitement l'anglais dans le sélecteur reçoit `locale=en` dans le cookie, de sorte qu'il n'est plus jamais redirigé. Sur un déploiement entièrement statique (étape 18), `/` est servi comme un fichier et ce middleware ne s'exécute pas, ce qui convient parfaitement : la page reste accessible et le sélecteur fait le reste.

</Step>
<Step number={17} title="Conserver l'API use-intl et réduire le runtime avec Intlayer" isOptional={true}>

Le benchmark montre que la partie la plus lourde d'une configuration use-intl est le runtime lui-même (~76 KB gzip). L'adaptateur de compatibilité [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) expose la **même API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, pluriels ICU, `t.rich`), mais la sert à partir de dictionnaires Intlayer compilés : **~6.7 KB au lieu de ~75.9 KB**, 0% de fuite de locale et 0% de fuite de page, sans aucune modification de vos composants.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md)

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Le plugin Vite crée un alias de `use-intl` vers l'adaptateur, afin que les imports existants continuent de fonctionner :

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Vos fichiers JSON restent la source de vérité grâce au [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md) :

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md)

> L'adaptateur constitue également une voie de migration fluide : une fois en place, vous pouvez migrer vos composants un par un vers l'API native `useIntlayer`. Consultez le [guide Intlayer pour TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

- [guide Intlayer pour TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md)

</Step>
<Step number={18} title="Pré-rendre chaque locale" isOptional={true}>

Le HTML statique est la page la plus rapide à servir et la plus facile à indexer. Listez chaque chemin localisé afin que TanStack Start pré-rende toutes les versions linguistiques au moment du build, ainsi que le sitemap et les fichiers robots :

```ts fileName="vite.config.ts"
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
  ],
});
```

Comme le sélecteur de locale affiche de vrais liens, `crawlLinks: true` découvre également les pages que vous auriez oublié de lister.

</Step>
<Step number={19} title="Gérer les pages 404 localisées" isOptional={true}>

Le layout de l'étape 7 déclenche déjà `notFound()` pour les préfixes de locale inconnus. Ajoutez une route catch-all pour que les chemins inconnus au sein d'une locale affichent également la 404 localisée, et marquez-la avec `noindex` : React 19 hisse automatiquement la balise `<meta>` dans `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Accéder à la locale dans les fonctions serveur" isOptional={true}>

Les fonctions serveur ne reçoivent pas les paramètres de route. Lisez le cookie de locale, et rabattez-vous sur l'en-tête `Accept-Language`, pour envoyer un e-mail localisé ou enregistrer une préférence linguistique :

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Pour traduire à l'intérieur de la fonction serveur, combinez-la avec `loadMessages` et `createTranslator` de `use-intl`.

</Step>
<Step number={21} title="Automatiser vos traductions avec Intlayer" isOptional={true}>

use-intl affiche les traductions, mais ne vous aide pas à les **produire**. Intlayer est **gratuit** et **open source**, et comble ce manque même si vous conservez use-intl :

- **Testez les traductions manquantes** dans la CI ou les tests unitaires. Voir [tester vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md).
- **Traduisez avec l'IA** en utilisant votre propre clé d'API et fournisseur : `npx intlayer fill` traduit les clés manquantes avec le contexte de votre application. Voir [remplissage automatique](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md) et la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).
- **Conservez vos fichiers JSON** comme source de vérité avec le [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md).
- **Éditez le contenu visuellement** avec l'[éditeur visuel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) et le [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md), pour permettre aux non-développeurs de mettre à jour les traductions.
- **Donnez du contexte à votre agent IA** avec le [serveur MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/mcp_server.md) et les [skills d'agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/agent_skills.md).
- **Analysez votre site déployé** pour détecter les balises `hreflang` manquantes, les mauvaises balises canoniques et les fuites de locale avec la [commande scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/scan.md).

Pour découvrir toutes les fonctionnalités, consultez [l'intérêt d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md).

- [l'intérêt d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md)

</Step>
</Steps>

## Foire aux questions

<FAQ>

<Question title="use-intl est-il un bon choix pour TanStack Start ?">

Oui, si vous souhaitez l'API de `next-intl` en dehors de Next.js. Il vous apporte les messages ICU, les formateurs et un bon support TypeScript, tout en évitant les contraintes spécifiques à Next.js telles que `setRequestLocale`. Le compromis réside dans le poids : le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) mesure ~76 KB gzip pour le runtime, et une configuration naïve envoie chaque locale et chaque page au navigateur. Chargez les namespaces par route et par locale, comme expliqué dans ce guide, pour éviter les fuites.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md)

</Question>
<Question title="Quelle est la différence entre use-intl et next-intl ?">

`use-intl` est le cœur de `next-intl`. `next-intl` ajoute par-dessus des intégrations pour Next.js : un middleware, des helpers de navigation, `getTranslations` pour les Server Components et la configuration de requête. Sur TanStack Start, vous utilisez `use-intl` directement et implémentez le routage avec TanStack Router, comme montré ci-dessus.

</Question>
<Question title="Dois-je utiliser un préfixe de locale ou un cookie pour stocker la langue ?">

Utilisez un préfixe dans l'URL. Chaque version linguistique dispose ainsi de sa propre URL que les moteurs de recherche peuvent indexer et que les utilisateurs peuvent partager. Un cookie reste utile pour mémoriser un choix explicite, ce que fait le middleware de redirection de l'étape 16.

</Question>
<Question title="Pourquoi ai-je des erreurs d'hydratation lors du formatage des dates ?">

Le serveur et le navigateur formatent les dates dans des fuseaux horaires différents. Passez un `timeZone` explicite à `IntlProvider` (ou le fuseau horaire du visiteur stocké dans un cookie), afin que les deux côtés produisent le même texte.

</Question>
<Question title="Comment réduire la taille du bundle de use-intl ?">

Tout d'abord, séparez les messages par namespace et chargez-les par route et par locale avec `import.meta.glob`, ce qui élimine les fuites de locale et de page. Ensuite, si la taille du runtime est importante pour vous, passez à l'adaptateur [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) : même API, ~6.7 KB au lieu de ~75.9 KB dans le benchmark.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md)

</Question>
<Question title="Comment traduire le titre et la méta description avec use-intl ?">

Appelez `createTranslator` dans la fonction `head()` de la route avec les messages retournés par le loader de route, puis renvoyez `title`, `description`, ainsi que les liens canoniques et `hreflang`. L'étape 13 fournit un helper réutilisable.

</Question>
<Question title="Puis-je migrer progressivement de use-intl vers Intlayer ?">

Oui. Installez d'abord l'adaptateur de compatibilité (étape 17) : vos composants continuent d'appeler `useTranslations`, désormais alimenté par Intlayer. Ensuite, déplacez les composants un par un vers `useIntlayer`, et déclarez le contenu à côté d'eux. Consultez les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) et le [guide Intlayer pour TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

- [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md)
- [guide Intlayer pour TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md)

</Question>

</FAQ>
