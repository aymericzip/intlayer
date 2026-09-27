---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n Next.js 16 avec Lingui : Guide de configuration pour l'App Router"
description: "Configurez Lingui dans l'App Router de Next.js 16 : Server Components, macros SWC, routage par proxy, generateMetadata, hreflang, sitemap et robots.txt, avec données de benchmark."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Internationalisation
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Version initiale"
author: aymericzip
---

# Comment internationaliser votre application Next.js avec Lingui en 2026

## Table des matières

<TOC/>

## Qu'est-ce que Lingui ?

**Lingui** est une bibliothèque d'internationalisation conçue autour des **macros** et de **l'extraction de messages**. Vous écrivez le texte source directement dans vos composants (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` rassemble chaque message dans des catalogues (fichiers PO par défaut), et un chargeur les compile en JavaScript compact. Les messages utilisent le format ICU MessageFormat, et Lingui prend en charge les **React Server Components** dans l'App Router.

Ce guide configure Lingui dans un projet **Next.js 16 App Router**, avec :

- **Des macros compilées par SWC**, afin que Turbopack conserve toute sa rapidité.
- **Des Server et Client Components** partageant la même API `Trans` et `useLingui`.
- **Un routage par locale** via `proxy.ts` : `/about` pour la locale par défaut, `/fr/about` pour les autres, et détection de la langue lors de la première visite.
- **Un rendu statique** de chaque locale avec `generateStaticParams`.
- **Un SEO multilingue complet** : `generateMetadata` traduit, canonical, `hreflang` avec `x-default`, locales Open Graph, JSON-LD, `sitemap.ts`, `robots.ts` et pages 404 localisées.

> Vous recherchez une autre bibliothèque ?

- [guide next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-intl.md)
- [guide next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-i18next.md)
- [guide Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)

> Vous utilisez TanStack Start ?

- [guide TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_tanstack-start_lingui.md)

> Vous comparez les bibliothèques ?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md)

> Pour comprendre d'où viennent ces bibliothèques, lisez l'histoire de l'i18n en JavaScript.

- [L'histoire de l'i18n en JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/history_of_i18n.md)

## Ce que dit le benchmark à propos de Lingui sur Next.js

Le [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md) exécute la même application Next.js de 10 pages et 10 locales avec chaque bibliothèque majeure et mesure ce que le navigateur télécharge réellement.

- [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Chiffres clés pour `@lingui/core@6.6.0` sur Next.js 16, mesurés le 2026-09-26 (gzip) :

| Configuration                      | Taille de la bibliothèque | JS par page | Fuite autre locale | Fuite autre page |
| :--------------------------------- | ------------------------: | ----------: | -----------------: | ---------------: |
| Sans i18n (app de base)            |                         - |    141.0 Ko |                 0% |               0% |
| Lingui, un catalogue par locale    |                   72.1 Ko |    145.4 Ko |               2.8% |            89.9% |
| `@intlayer/lingui` (compatibilité) |                   10.7 Ko |    221.6 Ko |                50% |              90% |
| `next-intlayer` (Intlayer natif)   |                    4.9 Ko |    141.5 Ko |                 0% |               0% |

Ce qu'il faut retenir :

- **Un catalogue unique par locale transmet tout de même les messages des autres pages** au provider client. Conservez autant de texte que possible dans les Server Components, qui envoient du HTML rendu et non des catalogues.
- **Le runtime Lingui pèse environ 72 Ko gzip.** L'adaptateur de compatibilité `@intlayer/lingui` réduit le runtime à environ 11 Ko, mais dans ce benchmark, la configuration de compatibilité Next.js envoie toujours des catalogues entiers à la page. L'API native `next-intlayer` est la configuration qui reste à la taille de l'application de base.

> Consultez l'ensemble des données : [Rapport de benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md), et le [dépôt du benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Rapport de benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md)

## Comparaison des fonctionnalités sur Next.js

Comment Lingui se compare à `next-intl` et Intlayer sur les fonctionnalités dont un projet Next.js App Router a généralement besoin :

| Fonctionnalité                           | `next-intlayer` (Intlayer)                                  | Lingui                                                             | `next-intl`                                |
| ---------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| **Traductions proches des composants**   | ✅ Contenu colocalisé avec chaque composant                 | ⚠️ Texte source dans les composants, catalogues centralisés        | ❌ JSON centralisé                         |
| **Intégration TypeScript**               | ✅ Types stricts générés automatiquement                    | ⚠️ Macros typées, catalogues de messages non typés                 | ✅ Bonne, via augmentation d'`AppConfig`   |
| **Détection des traductions manquantes** | ✅ Erreurs TypeScript et avertissements au build            | ⚠️ Repli à l'exécution sur le texte source                         | ⚠️ Repli à l'exécution                     |
| **Contenu riche (JSX, Markdown)**        | ✅ Prise en charge directe                                  | ✅ JSX dans `<Trans>`, pas de Markdown                             | ⚠️ Balises via `t.rich`, pas de Markdown   |
| **Traduction par IA**                    | ✅ Votre propre fournisseur et clé API, avec contexte d'app | ❌ Non                                                             | ❌ Non                                     |
| **Éditeur visuel / CMS**                 | ✅ Éditeur visuel local + CMS optionnel                     | ❌ Via des plateformes externes                                    | ❌ Via des plateformes externes            |
| **Routage localisé**                     | ✅ Intégré                                                  | ❌ Écrivez votre propre `proxy.ts`                                 | ✅ Segment `[locale]` intégré              |
| **Pluralisation**                        | ✅ Basée sur l'énumération                                  | ✅ ICU, macro `<Plural>`                                           | ✅ ICU                                     |
| **Formats de contenu**                   | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`            | ✅ PO, JSON, CSV                                                   | ✅ `.json`, `.js`, `.ts`                   |
| **ICU MessageFormat**                    | ✅ Via `format: "icu"`                                      | ✅ Natif                                                           | ✅ Natif                                   |
| **Aides SEO (hreflang, sitemap)**        | ✅ Aides pour métadonnées, sitemap et robots.txt            | ❌ Manuel                                                          | ✅ Bon                                     |
| **Server Components**                    | ✅ Accès direct dans tout Server Component                  | ⚠️ `setI18n` dans chaque layout et page                            | ⚠️ `await getTranslations()` par composant |
| **Tree-shaking par composant**           | ✅ Au moment du build (Babel / SWC)                         | ⚠️ Un catalogue par locale, l'extracteur par page est expérimental | ⚠️ Manuel, avec `pick()` par route         |
| **Taille du runtime (gzip, benchmark)**  | 4.9 Ko                                                      | 72.1 Ko                                                            | 14.7 Ko                                    |
| **Traductions manquantes en CI**         | ✅ `npx intlayer test`                                      | ✅ `lingui compile --strict`                                       | ⚠️ Non intégré                             |
| **Écosystème / communauté**              | ⚠️ Plus modeste, en forte croissance                        | ✅ Mature                                                          | ✅ Élevé                                   |

> Les tailles de runtime proviennent du [benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md). Pour une analyse détaillée, lisez [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer.md).

- [benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer.md)

> Autres guides Next.js :

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)

## Pratiques à suivre

- **Définissez `lang` et `dir` sur `<html>`** dans le layout `[locale]`.
- **Privilégiez les Server Components** pour le texte : ils effectuent le rendu HTML sur le serveur et n'ont pas besoin du catalogue côté client.
- **Appelez `initLingui(locale)` dans chaque layout et page.** Les layouts ne se réaffichent pas lors de la navigation, une page ne peut donc pas se reposer sur le fait que son layout ait défini la locale.
- **Conservez une URL par locale** et pré-rendez chaque locale avec `generateStaticParams`.
- **Traduisez vos métadonnées** dans `generateMetadata`, avec `canonical`, `hreflang` et `x-default`.
- **Générez un sitemap multilingue et un robots.txt** avec les conventions `sitemap.ts` et `robots.ts`.
- **Utilisez de vrais liens pour le sélecteur de langue**, afin que les robots d'indexation découvrent chaque langue.
- **Exécutez `lingui extract` en CI** pour qu'aucun nouveau message ne soit déployé sans traduction.

- [l'internationalisation et le SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md)
- [guide hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/hreflang_guide_multilingual_seo.md)
- [comparaison SEO multilingue Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/nextjs-multilingual-seo-comparison.md)

## Guide pas à pas pour configurer Lingui dans une application Next.js

Voici la structure de projet que nous allons créer :

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Routage et détection de la locale
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Généré par `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Locales, helpers d'URL
    │   ├── appRouterI18n.ts        # Catalogues et instances réservés au serveur
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Constructeur generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # 404 localisée pour les chemins inconnus
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Installer les dépendances">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react** : runtime, `I18nProvider`, `setI18n` pour les Server Components, et les macros (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin** : compile les macros dans le pipeline SWC de Next.js.
- **@lingui/loader** : compile les catalogues `.po` à l'importation, de sorte que `lingui compile` n'est pas nécessaire.
- **@lingui/cli** : `lingui extract` pour rassembler les messages dans les catalogues.

> `@lingui/swc-plugin` est un plugin WebAssembly lié à la version SWC de Next.js. Si le build échoue après une mise à niveau de Next.js, mettez à jour le plugin vers la version indiquée comme compatible dans son README.

</Step>
<Step number={2} title="Centraliser votre configuration de locales">

Un fichier unique définit les locales et les helpers d'URL. Le routage, les métadonnées, le sitemap et Lingui lisent tous depuis celui-ci.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Origine publique, utilisée pour les URL canoniques, le hreflang et le sitemap. */
export const siteUrl = "https://example.com";

/** Cookie stockant la locale explicitement choisie par le visiteur. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph attend des codes `langue_TERRITOIRE`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, la locale par défaut n'a pas de préfixe. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Configurer Lingui et Next.js">

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

Le plugin SWC compile les macros, et le chargeur compile les fichiers `.po`, à la fois pour Turbopack (par défaut dans Next.js 16) et webpack :

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
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

</Step>
<Step number={4} title="Charger les catalogues et créer les instances serveur">

Les Server Components n'ont pas de contexte React, Lingui fournit donc `setI18n` pour enregistrer l'instance pour le rendu en cours. Ce module charge chaque catalogue **une fois par processus serveur** et crée une instance `I18n` par locale. Il est `server-only` : les catalogues des autres locales n'atteignent jamais le bundle client.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Enregistre l'instance pour le rendu actuel du Server Component.
 * Appelez-la dans chaque layout et page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Pour que TypeScript accepte l'importation `.po`, déclarez le module une fois :

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Créer le provider client">

Les Client Components lisent les traductions depuis un contexte React. Le provider reçoit le catalogue de la locale active depuis le layout serveur, et crée sa propre instance une seule fois.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Définir les routes de locale dynamiques">

Le segment `[locale]` contient le layout racine. `generateStaticParams` pré-rend chaque locale au moment du build, et `dynamicParams = false` renvoie une 404 pour tout autre préfixe.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Préfixes inconnus (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Résout les URL canoniques et Open Graph relatives
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Le provider client reçoit l'intégralité du catalogue de la locale active. C'est ce que le benchmark mesure sous l'appellation « fuite autre page ». Conserver le texte dans les Server Components limite ce dont le client a réellement besoin. Pour les grandes applications, l'extracteur par page expérimental de Lingui (`experimental.extractor` dans `lingui.config.ts`) découpe les catalogues par point d'entrée.

</Step>
<Step number={7} title="Utiliser les traductions dans les Server Components">

Les Server Components utilisent les mêmes macros que les Client Components. `initLingui` doit également s'exécuter dans la page, car un layout ne se réaffiche pas lors de la navigation entre ses pages.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Utiliser les traductions dans les Client Components">

Les Client Components utilisent les mêmes imports. Les macros lisent l'instance depuis `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Extraire et traduire vos messages">

Lancez l'extraction. Lingui écrit chaque message trouvé dans `src` dans le catalogue de chaque locale :

```bash
npm run i18n:extract
```

Puis traduisez le `msgstr` de chaque entrée :

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Les balises `<0>` maintiennent les éléments JSX d'un `<Trans>` en place, permettant aux traducteurs de les déplacer sans toucher au balisage.

</Step>
<Step number={10} title="Configurer le proxy pour le routage par locale" isOptional={true}>

Next.js 16 a renommé `middleware.ts` en `proxy.ts`. Le proxy implémente la stratégie de préfixe « selon le besoin » :

- `/fr/about` est servi tel quel ;
- `/en/about` redirige vers `/about`, afin que la locale par défaut ait une URL unique ;
- `/about` est réécrit en interne vers `/en/about`, sans modifier l'URL ;
- une première visite sur `/` redirige vers la langue préférée (cookie d'abord, puis `Accept-Language`).

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: une seule URL pour la locale par défaut
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // Première visite sur "/" : envoyer le visiteur vers sa langue
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → servi par /en/about, URL inchangée
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Ignorer les routes d'API, les fichiers internes de Next.js et les fichiers statiques (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Changer la langue de votre contenu" isOptional={true}>

`usePathname` renvoie l'URL vue par le navigateur (`/about` ou `/fr/about`). Supprimez la locale, puis construisez le lien de chaque langue. Le sélecteur affiche de vrais liens afin que les robots puissent atteindre chaque version linguistique, et le cookie mémorise le choix explicite.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="Créer un composant de lien localisé" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Chemin sans préfixe de locale, ex. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Il fonctionne également depuis les Server Components, car il effectue son rendu à l'intérieur de `LinguiClientProvider` :

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Internationaliser vos métadonnées" isOptional={true}>

Chaque version linguistique peut se positionner de manière autonome, à condition que chaque page expose :

- un `title` et une `description` **traduits** ;
- une URL **canonical** pointant vers elle-même ;
- un alternatif **`hreflang` par locale**, ainsi que **`x-default`** ;
- la `locale`, l'`alternateLocale` et l'`url` **Open Graph** ;
- du **JSON-LD** avec `inLanguage`.

`generateMetadata` s'exécute en dehors de l'arbre React, il utilise donc directement l'instance serveur avec la macro `msg` :

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Chemin sans préfixe de locale, ex. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... composant de page de l'étape 7
```

Le JSON-LD est rendu par la page elle-même. Les fichiers de page ne pouvant exporter que des champs Next.js, conservez le composant dans son propre fichier :

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// Dans AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Internationaliser votre sitemap" isOptional={true}>

La convention `sitemap.ts` prend en charge `alternates.languages`, que Next.js affiche sous forme d'alternatives `xhtml:link`. Listez chaque URL de chaque locale :

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="Internationaliser votre robots.txt" isOptional={true}>

Les routes privées existent dans chaque langue, `disallow` doit donc couvrir chaque chemin localisé :

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Gérer les pages 404 localisées" isOptional={true}>

`not-found.tsx` s'affiche à l'intérieur du layout `[locale]`, il a donc accès au provider client. La route fourre-tout lui transmet les chemins inconnus à l'intérieur d'une locale. Next.js ajoute automatiquement `noindex` aux réponses 404.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → not-found.tsx localisé
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Accéder à la locale dans les Server Actions" isOptional={true}>

Les Server Actions ne reçoivent pas les paramètres de route. L'approche la plus fiable consiste à transmettre la locale avec le formulaire, depuis la page qui la connaît :

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Conserver vos macros, réduire le runtime avec Intlayer" isOptional={true}>

L'adaptateur de compatibilité [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md) conserve votre code source intact : les macros se compilent comme auparavant, et les appels résultants à `i18n._()`, `useLingui()` et `<Trans>` sont alimentés par les dictionnaires Intlayer. Dans le benchmark Next.js, le runtime passe de **~72,1 Ko à ~10,7 Ko** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md)

Sur Next.js, l'adaptateur se configure en créant des alias de `@lingui/core` et `@lingui/react` vers `@intlayer/lingui` dans `next.config.ts` (webpack et Turbopack), et en enveloppant la configuration avec `withIntlayer` de `next-intlayer/server`. Conservez `@lingui/swc-plugin` pour que les macros continuent de se compiler en premier. La configuration complète se trouve dans le [guide de compatibilité Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md).

- [guide de compatibilité Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md)

Comme le montre le tableau du benchmark, l'adaptateur réduit la taille du runtime mais pas encore le catalogue envoyé à chaque page sur Next.js. Il est particulièrement recommandé comme passerelle de migration : une fois configuré, migrez vos composants progressivement vers l'API native `useIntlayer`, qui n'envoie que le contenu que chaque composant affiche. Consultez le [guide Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer-lingui.md) et tous les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md).

- [guide Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/lingui_vs_intlayer-lingui.md)
- [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md)

</Step>
<Step number={19} title="Automatiser vos traductions avec Intlayer" isOptional={true}>

Lingui extrait les messages, mais renseigner des dizaines de catalogues manuellement représente la majeure partie du travail. Intlayer est **gratuit** et **open source**, et ses outils fonctionnent en complément de Lingui :

- **Traduire avec l'IA** en utilisant votre propre clé API et fournisseur. Consultez [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md) et le [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).
- **Conserver vos fichiers PO** comme source de vérité avec le [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/plugins/sync-po.md).
- **Tester les traductions manquantes** en CI. Consultez [tester vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md).
- **Auditer votre site déployé** pour détecter les `hreflang` manquants, les mauvaises balises canoniques et les fuites de locale avec la [commande scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/scan.md).

</Step>
</Steps>

## Foire aux questions

<FAQ>

<Question title="Lingui prend-il en charge l'App Router de Next.js et les Server Components ?">

Oui. `@lingui/react` prend en charge les React Server Components. Les Server Components enregistrent l'instance avec `setI18n` de `@lingui/react/server`, les Client Components la lisent depuis `I18nProvider`, et les deux utilisent les mêmes macros `Trans` et `useLingui`.

</Question>
<Question title="Pourquoi dois-je appeler initLingui dans chaque page et layout ?">

Les Server Components n'ont pas de contexte, l'instance est donc enregistrée par rendu. Les layouts sont conservés lors des navigations et ne se réaffichent pas, une page ne peut donc pas compter sur son layout pour définir la locale. Appeler `initLingui(locale)` en haut de chaque layout et page les maintient indépendants.

</Question>
<Question title="Dois-je utiliser le plugin SWC ou Babel avec Next.js ?">

Utilisez `@lingui/swc-plugin`. Il préserve le pipeline SWC et Turbopack. Ajouter une configuration Babel désactive SWC dans Next.js et ralentit les builds. La seule contrainte est de maintenir la version du plugin compatible avec la version SWC de votre version de Next.js.

</Question>
<Question title="Comment traduire generateMetadata avec Lingui ?">

Récupérez l'instance serveur avec `getI18nInstance(locale)` et traduisez les descripteurs déclarés avec la macro `msg` : ``i18n._(msg`About us`)``. Renvoyez `alternates.canonical`, `alternates.languages` avec `x-default`, et `openGraph.locale`. L'étape 13 fournit un helper réutilisable.

</Question>
<Question title="Quel est le poids de Lingui dans un bundle Next.js ?">

Le [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md) mesure environ 72 Ko gzip pour le runtime. Avec un catalogue par locale, les pages pèsent environ 145 Ko contre 141 Ko sans i18n, mais chaque page reçoit tout de même les messages des autres pages via le provider client.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md)

</Question>
<Question title="Lingui, next-intl ou next-i18next : lequel choisir pour Next.js ?">

Lingui convient aux équipes qui aiment écrire le texte source dans les composants et travailler avec des fichiers PO et des traducteurs. next-intl convient aux équipes qui préfèrent les catalogues JSON et une API `t("key")` étroitement intégrée à Next.js. next-i18next apporte l'écosystème de plugins i18next. Consultez [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md) et le [benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md).

- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md)
- [benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/benchmark/nextjs.md)

</Question>
<Question title="Puis-je migrer de Lingui vers Intlayer sans réécrire mes composants ?">

Oui. L'adaptateur [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md) conserve les macros et remplace le runtime, vous permettant ensuite de migrer vos composants vers `useIntlayer` progressivement. Consultez les [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/lingui.md)
- [adaptateurs de compatibilité](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compat/index.md)

</Question>

</FAQ>
