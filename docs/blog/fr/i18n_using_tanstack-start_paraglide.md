---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "i18n TanStack Start avec Paraglide JS : Guide de configuration 2026"
description: "Traduisez votre application TanStack Start avec Paraglide JS : stratégie d'URL, réécriture de routeur, middleware SSR, hreflang, sitemap, robots.txt et données réelles de benchmark."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Internationalisation
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Version initiale"
author: aymericzip
---

# Comment internationaliser votre application TanStack Start avec Paraglide JS en 2026

## Table des matières

<TOC/>

## Qu'est-ce que Paraglide JS ?

**Paraglide JS** (développé par inlang) est une bibliothèque d'internationalisation (i18n) **basée sur un compilateur**. Au lieu d'embarquer un runtime qui recherche des clés dans un objet JSON, elle compile chaque message en une fonction JavaScript typée (`m.about_title()`). Les messages inutilisés peuvent être éliminés par le bundler, et une faute de frappe dans une clé devient une erreur de compilation.

Paraglide est l'approche i18n utilisée dans les exemples officiels de TanStack Router, et elle s'intègre à TanStack Start via trois éléments principaux :

- un **plugin Vite** qui compile les messages et le runtime dans `src/paraglide` ;
- un **middleware serveur** qui résout la locale de chaque requête ;
- une **réécriture de routeur** qui mappe les URL localisées (`/fr/about`) vers votre arbre de routes (`/about`), vous évitant ainsi d'avoir recours à un segment `$locale`.

Ce guide configure ces trois éléments, puis aborde tout ce que Paraglide vous laisse gérer : `lang` et `dir`, sélecteur de langue, métadonnées traduites, `canonical`, `hreflang` avec `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, pré-rendu et pages 404 localisées.

> Vous recherchez une autre stack ? Consultez le [guide TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_use-intl.md), le [guide TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_lingui.md) ou le [guide TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

> Vous souhaitez comparer les deux approches basées sur un compilateur ? Lisez [Intlayer est-il plus léger que Paraglide ?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_intlayer_lighter_than_paraglide.md).

## Ce que révèlent les benchmarks sur Paraglide avec TanStack Start

Le [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) exécute la même application TanStack Start de 10 pages et 10 locales avec chaque bibliothèque majeure, et mesure ce que le navigateur télécharge réellement.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Chiffres clés pour `@inlang/paraglide-js@2.15.1`, mesurés le 26-09-2026 (gzip) :

| Configuration           | Taille de la bibliothèque | JS par page | Fuite autres locales | Fuite autres pages | Chargement de la page |
| :---------------------- | ------------------------: | ----------: | -------------------: | -----------------: | --------------------: |
| Sans i18n (app de base) |                         - |    111.0 KB |                   0% |                 0% |               15.7 ms |
| Paraglide JS            |                    1.8 KB |    125.1 KB |                49.7% |                 0% |               22.1 ms |
| `react-intlayer`        |                    4.5 KB |    126.8 KB |                   0% |                 0% |               14.8 ms |
| `use-intl`              |                   75.9 KB |    128.7 KB |                   0% |                 0% |               17.4 ms |
| Lingui                  |                   56.7 KB |    120.2 KB |                 8.6% |                 0% |               21.9 ms |

Ce qu'il faut retenir :

- **Le runtime est minuscule et les pages ne fuient pas.** Le runtime est généré sur mesure pour votre configuration, et les messages sont importés là où ils sont utilisés.
- **Les locales fuient.** Chaque fonction de message contient toutes les locales, de sorte qu'environ la moitié des chaînes traduites envoyées à une page correspondent à des langues que le visiteur n'utilise pas. Plus vous ajoutez de locales, plus cette part augmente.
- **Le chargement de la page est le plus lent du groupe**, en partie parce que la locale est résolue via des stratégies à chaque appel plutôt que lue depuis un contexte React.

> Consultez les données complètes : [Rapport de benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md), et le [dépôt de benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Comparatif des fonctionnalités sur TanStack Start

Comment Paraglide JS se compare aux autres bibliothèques couramment utilisées sur TanStack Start :

| Fonctionnalité                              | `react-intlayer` (Intlayer)             | `use-intl`              | Paraglide JS                             | Lingui                              |
| ------------------------------------------- | --------------------------------------- | ----------------------- | ---------------------------------------- | ----------------------------------- |
| **Traductions proches des composants**      | ✅ Colocalisées                         | ❌ JSON centralisé      | ❌ Un fichier JSON par locale            | ⚠️ Texte source dans les composants |
| **Intégration TypeScript**                  | ✅ Types auto-générés                   | ✅ Via `AppConfig`      | ✅ Fonctions de message typées           | ⚠️ Macros uniquement                |
| **Détection des traductions manquantes**    | ✅ Erreurs de types et alertes de build | ⚠️ Fallback au runtime  | ⚠️ Repli sur la locale de base           | ⚠️ Repli sur le texte source        |
| **Contenu riche (JSX, Markdown)**           | ✅ Support direct                       | ⚠️ Balises via `t.rich` | ⚠️ Chaînes simples                       | ✅ JSX dans `<Trans>`               |
| **Routage localisé**                        | ✅ Intégré                              | ❌ `{-$locale}` manuel  | ✅ `urlPatterns` + réécriture de routeur | ❌ `{-$locale}` manuel              |
| **Changement de locale sans rechargement**  | ✅ Oui                                  | ✅ Oui                  | ❌ Rechargement complet de la page       | ✅ Oui                              |
| **Pluralisation**                           | ✅ Basée sur l'énumération              | ✅ ICU                  | ✅ Variantes                             | ✅ ICU                              |
| **MessageFormat ICU**                       | ✅ Via `format: "icu"`                  | ✅ Natif                | ⚠️ Via un plugin inlang                  | ✅ Natif                            |
| **Formats de contenu**                      | ✅ `.ts`, `.json`, `.md`, `.yaml`...    | ⚠️ `.json`              | ⚠️ JSON inlang                           | ✅ PO, JSON, CSV                    |
| **Traduction par IA**                       | ✅ Votre propre fournisseur et clé      | ❌ Non                  | ❌ Non                                   | ❌ Non                              |
| **Éditeur visuel / CMS**                    | ✅ Éditeur local + CMS optionnel        | ❌ Plateformes externes | ⚠️ Applications de l'écosystème inlang   | ❌ Plateformes externes             |
| **Outils SEO (hreflang, sitemap)**          | ✅ Intégrés                             | ❌ Manuel               | ⚠️ URL localisées, le reste manuel       | ❌ Manuel                           |
| **Taille runtime (gzip, benchmark)**        | 4.5 KB                                  | 75.9 KB                 | 1.8 KB                                   | 56.7 KB                             |
| **Fuite, meilleure config (locale / page)** | 0% / 0%                                 | 0% / 0%                 | 49.7% / 0%                               | 8.6% / 0%                           |
| **Traductions manquantes en CI**            | ✅ `npx intlayer test`                  | ⚠️ Non intégré          | ⚠️ Non intégré                           | ✅ `lingui compile --strict`        |

> La taille du runtime et les chiffres de fuite proviennent du [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md). La fuite est mesurée sur la configuration optimale de chaque bibliothèque.

> Autres guides TanStack Start : [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_lingui.md), [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_use-intl.md) et [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

## Bonnes pratiques à respecter

- **Définissez `lang` et `dir` sur `<html>`** à partir de la locale résolue, côté serveur.
- **Conservez une URL par langue** avec une stratégie de préfixe (`/fr/about`), afin que chaque version linguistique soit indexable.
- **Placez `url` en premier dans votre stratégie de locale**, afin que l'URL soit la source de vérité et que les robots d'indexation reçoivent la page demandée.
- **Utilisez des clés de message plates et descriptives** (`about_title`) qui correspondent proprement à des noms de fonctions.
- **Versionnez vos fichiers `messages/*.json`, et non le dossier généré `src/paraglide`**, pour éviter les conflits de fusion sur les fichiers générés.
- **Traduisez vos métadonnées**, et déclarez `canonical`, `hreflang` et `x-default` sur chaque page.
- **Générez un sitemap multilingue et un robots.txt**, et pré-rendez chaque locale.
- **Utilisez de véritables liens pour le sélecteur de langue**, afin que les robots d'indexation découvrent toutes les langues.

> Consultez notre guide sur l'[internationalisation et le SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md) ainsi que le [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md).

## Guide étape par étape pour configurer Paraglide JS dans une application TanStack Start

Voici la structure de projet que nous allons créer :

```bash
.
├── project.inlang
│   └── settings.json          # Locales and message format
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generated, git-ignored
    ├── server.ts              # Paraglide middleware
    ├── router.tsx             # URL rewrite
    ├── i18n
    │   ├── config.ts          # Site URL, helpers
    │   └── seo.ts             # head() builder
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / and /fr
        ├── about.tsx          # /about and /fr/about
        ├── $.tsx              # Localized 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Remarquez l'absence de dossier `$locale` : la réécriture du routeur retire le préfixe avant la correspondance des routes.

<Steps>
<Step number={1} title="Installer les dépendances">

Commencez à partir d'un projet TanStack Start, puis initialisez Paraglide. La commande d'initialisation crée `project.inlang/settings.json`, un premier fichier `messages/en.json` et installe le paquet.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js** : le compilateur et son plugin Vite. Il n'y a aucun paquet runtime à installer : le runtime est généré directement dans votre projet.

</Step>
<Step number={2} title="Configurer vos locales">

`project.inlang/settings.json` constitue l'unique source de vérité pour les langues gérées. Le plugin de format de message lit un fichier JSON par locale.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Configurer le plugin Vite et la stratégie d'URL">

Le plugin compile les messages à chaque modification. Trois options sont particulièrement importantes pour TanStack Start :

- **`strategy`** : la liste ordonnée des sources permettant de déterminer la locale. Placer `url` en premier fait de l'URL la source de vérité. `cookie` et `preferredLanguage` sont utilisés par le middleware lorsque l'URL ne permet pas de trancher.
- **`urlPatterns`** : la façon dont une locale est associée à une URL. Les locales non par défaut sont listées en premier, car le premier motif correspondant est appliqué. Ici, la locale par défaut ne comporte pas de préfixe (`/about`), tandis que les autres sont préfixées (`/fr/about`).
- **`outputStructure: "message-modules"`** : un module par message, ce qui permet au bundler d'éliminer les messages qu'une page n'importe pas.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Ajoutez le dossier généré à `.gitignore`. Il est reconstruit lors de `dev` et `build` :

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Créer vos fichiers de traduction">

Chaque clé devient une fonction exportée depuis `src/paraglide/messages`. Des clés plates en snake_case offrent les noms de fonctions les plus lisibles. Les variables utilisent des espaces réservés `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Les pluriels utilisent la syntaxe de variantes du format de message inlang :

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Ajouter le middleware serveur">

Le middleware résout la locale de chaque requête selon votre stratégie, et la rend accessible via `getLocale()` pendant toute la durée du rendu côté serveur, à travers un scope `AsyncLocalStorage`. C'est ce qui garantit la sécurité des requêtes concurrentes dans différentes langues.

Dans TanStack Start, enveloppez le point d'entrée serveur par défaut :

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Réécrire les URL localisées dans le routeur">

L'option `rewrite` de TanStack Router traduit les URL aux limites du routeur :

- **entrée (input)** : `/fr/about` est dé-localisé en `/about` avant la mise en correspondance, de sorte qu'une unique route `about.tsx` gère toutes les langues ;
- **sortie (output)** : chaque `href` généré (liens, redirections, navigation) est localisé pour la locale active, si bien que `<Link to="/about">` génère `/fr/about` sur une page en français.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Parce que les liens sont automatiquement localisés par la réécriture, vous n'avez pas besoin d'un composant personnalisé `LocalizedLink` : utilisez le composant `Link` habituel de TanStack Router.

</Step>
<Step number={7} title="Créer le document racine">

`getLocale()` renvoie la locale résolue par le middleware sur le serveur, et la locale extraite de l'URL dans le navigateur, garantissant ainsi que `lang` et `dir` restent identiques dans le HTML serveur et après hydratation.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

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

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Utiliser les traductions dans vos pages">

Les messages sont de simples fonctions : importez `m`, appelez la fonction et transmettez les variables sous forme d'objet. Tout est typé, y compris les variables.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Une fonction de message accepte également une locale explicite : `m.about_title({}, { locale: "fr" })`. C'est utile dans le code serveur qui génère une langue différente de celle de la requête en cours, comme pour l'envoi d'e-mails.

</Step>
<Step number={9} title="Changer la langue de votre contenu" isOptional={true}>

Affichez le sélecteur sous forme de **liens** avec `localizeHref`, afin que les robots d'indexation découvrent chaque langue. `setLocale` enregistre le choix dans un cookie et recharge la page dans la nouvelle langue : un rechargement complet est le comportement prévu par Paraglide, car les fonctions de message lisent la locale à chaque appel au lieu de s'abonner à un état React.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Internationaliser vos métadonnées" isOptional={true}>

Chaque version linguistique peut se positionner de façon autonome dans les moteurs de recherche, à condition que chaque page fournisse :

- un `<title>` et une `description` **traduits** ;
- une URL **canonique** pointant vers elle-même ;
- une balise alternative **`hreflang` par locale**, plus **`x-default`** ;
- les balises **Open Graph** `og:locale`, `og:locale:alternate` et `og:url` ;
- des données structurées **JSON-LD** avec `inLanguage`.

La fonction `localizeUrl` de Paraglide construit les URL alternatives à partir de vos `urlPatterns`, ce qui évite toute divergence avec le routage réel :

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
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
        href: getAbsoluteUrl(path, baseLocale),
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
<Step number={11} title="Internationaliser votre sitemap" isOptional={true}>

Un sitemap multilingue énumère chaque URL pour chaque locale, et chaque entrée déclare toutes ses alternatives à l'aide de `xhtml:link` :

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
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
<Step number={12} title="Internationaliser votre robots.txt" isOptional={true}>

Les routes privées existent dans toutes les langues, les règles `Disallow` doivent donc couvrir chaque chemin localisé. Supprimez `public/robots.txt` si le starter en a créé un, puis servez-le depuis une route :

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
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
<Step number={13} title="Pré-rendre chaque locale" isOptional={true}>

Listez le chemin localisé de chaque page afin que TanStack Start pré-rende l'ensemble des versions linguistiques. `localizeHref` est du code généré sans dépendance au navigateur, il peut donc s'exécuter dans `vite.config.ts`, mais le fichier n'existe qu'après une première compilation. Énumérer les chemins manuellement, comme ci-dessous, permet d'éviter ce problème d'ordre :

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Comme le sélecteur affiche de véritables liens, `crawlLinks: true` découvre également les pages que vous auriez oublié de lister.

</Step>
<Step number={14} title="Gérer les pages 404 localisées" isOptional={true}>

Grâce à la réécriture, `/fr/does-not-exist` correspond à `/does-not-exist`, et `getLocale()` renvoie toujours `fr`, de sorte que le `notFoundComponent` racine de l'étape 7 s'affiche en français. Une route catch-all garantit que les chemins profonds y parviennent également. Marquez la page avec `noindex` : React 19 hisse la balise `<meta>` dans le `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Accéder à la locale dans les Server Functions" isOptional={true}>

Les fonctions serveur s'exécutent dans le contexte du middleware Paraglide, donc `getLocale()` y fonctionne également :

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Comparer avec Intlayer" isOptional={true}>

Il n'existe pas d'adaptateur direct pour passer de Paraglide à Intlayer, car les deux reposent sur la même idée : compiler le contenu au moment du build et embarquer le runtime le plus léger possible. Les différences se situent au niveau de ce qui parvient au navigateur et de l'organisation des contenus :

- **Locales** : Intlayer charge des [dictionnaires dynamiques](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dynamic_dictionaries/index.md) par langue (0 % de fuite de locale dans le benchmark), tandis que chaque fonction de message Paraglide embarque toutes les langues (49.7 %).
- **Organisation du contenu** : le contenu peut être placé dans des fichiers `.content.ts` à côté de chaque composant ou dans des fichiers centralisés. Voir [i18n par composant vs centralisée](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/per-component_vs_centralized_i18n.md).
- **Changement de locale** : le contenu est lu depuis un contexte React, de sorte que le changement de langue re-rend les composants sans rechargement de page.
- **Code généré** : rien n'est généré dans le dossier `src`, il n'y a donc rien à régénérer avant un commit.

Si vous venez d'une autre bibliothèque plutôt que de Paraglide, les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md) conservent l'API de `use-intl`, `next-intl`, `react-i18next`, `react-intl` ou Lingui tout en remplaçant le runtime.

Consultez [Intlayer est-il plus léger que Paraglide ?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/is_intlayer_lighter_than_paraglide.md) et le [guide TanStack Start pour Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="Automatiser vos traductions avec Intlayer" isOptional={true}>

Paraglide affiche les traductions, mais il ne vous aide pas à les **produire**. Intlayer est **gratuit** et **open source**, et son outillage vous aide même sur un projet Paraglide :

- **Traduisez avec l'IA** en utilisant votre propre clé d'API et fournisseur. Consultez le [remplissage automatique](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md) et la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).
- **Conservez vos fichiers JSON** comme source de vérité grâce au [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md).
- **Testez les traductions manquantes** en CI. Consultez [tester vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md).
- **Analysez votre site déployé** à la recherche de balises `hreflang` manquantes, de mauvaises URL canoniques et de fuites de locales grâce à la [commande scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/scan.md).

</Step>
</Steps>

## Foire aux questions

<FAQ>

<Question title="Paraglide JS est-il un bon choix pour TanStack Start ?">

C'est un choix solide : il est utilisé dans les exemples officiels de TanStack Router, possède le plus petit runtime du [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/tanstack.md) (~1.8 KB gzip), et les messages sont entièrement typés. Les compromis sont que chaque fonction de message contient toutes les langues, ce qui fait fuiter environ la moitié des chaînes traduites vers des visiteurs d'autres langues, et que changer de langue recharge la page.

</Question>
<Question title="Ai-je besoin d'un segment de route $locale avec Paraglide ?">

Non. La fonction `rewrite` du routeur supprime le préfixe de locale avant la correspondance des routes et l'ajoute de nouveau aux liens générés, de sorte qu'un simple `about.tsx` dessert `/about`, `/fr/about` et `/es/about`.

</Question>
<Question title="Pourquoi changer de langue recharge-t-il la page ?">

Les fonctions de message lisent la langue au moment où elles sont appelées ; elles ne sont pas abonnées à un état React. `setLocale` recharge donc la page par défaut afin que chaque message soit re-rendu dans la nouvelle langue. Vous pouvez passer `{ reload: false }`, mais vous devrez alors re-rendre l'arbre de composants vous-même.

</Question>
<Question title="Dois-je versionner le dossier généré src/paraglide ?">

Il est préférable de ne pas le faire. Le dossier est régénéré à chaque exécution de `dev` et `build`, et le versionner entraîne des conflits de fusion sur des fichiers générés. Versionnez plutôt `messages/*.json` et `project.inlang/settings.json`.

</Question>
<Question title="Comment ajouter des balises hreflang avec Paraglide ?">

Utilisez `localizeUrl` pour construire une URL absolue par langue dans le `head()` de la route, et ajoutez une balise `x-default` pointant vers la langue de base. L'étape 10 fournit un helper réutilisable, et l'étape 11 ajoute ces mêmes alternatives au sitemap.

</Question>
<Question title="Paraglide élimine-t-il les traductions inutilisées par tree-shaking ?">

Les **messages** inutilisés sont éliminés lorsque vous utilisez `outputStructure: "message-modules"`, évitant ainsi la fuite du contenu d'autres pages. Les **locales** inutilisées ne le sont pas : chaque fonction de message contient toutes les traductions, c'est pourquoi le benchmark mesure une fuite de locale de 49.7 %.

</Question>
<Question title="Puis-je migrer de Paraglide vers Intlayer ?">

Oui. Les deux reposent sur un compilateur, le modèle mental est donc très proche. Conservez vos fichiers JSON avec le [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-json.md), puis remplacez les appels `m.key()` par `useIntlayer`, page par page. Consultez le [guide TanStack Start pour Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_tanstack.md).

</Question>

</FAQ>
