---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Comment traduire votre Next.js 15 avec next-i18next – guide i18n 2025
description: Un guide pratique et prêt pour la production pour internationaliser une application Next.js 15 App Router avec i18next/next-i18next et l'améliorer avec Intlayer.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Traduisez votre site Next.js 15 utilisant next-i18next avec Intlayer | Internationalisation (i18n)

### À qui s'adresse ce guide

- **Junior** : Suivez les étapes exactes et copiez les blocs de code. Vous obtiendrez une application multilingue fonctionnelle.
- **Intermédiaire** : Utilisez les checklists et les conseils de bonnes pratiques pour éviter les pièges courants.
- **Senior** : Parcourez la structure générale, les sections SEO et automatisation ; vous y trouverez des valeurs par défaut pertinentes et des points d'extension.

### Ce que vous allez construire

- Projet App Router avec des routes localisées (ex. : `/`, `/fr/...`)
- Configuration i18n avec locales, locale par défaut, support RTL
- Initialisation i18n côté serveur et un provider côté client
- Traductions avec namespaces chargées à la demande
- SEO avec `hreflang`, `sitemap` localisé, `robots`
- Middleware pour le routage selon la locale
- Intégration Intlayer pour automatiser les workflows de traduction (tests, remplissage IA, synchronisation JSON)

> Note : next-i18next est construit sur i18next. Ce guide utilise les primitives i18next compatibles avec next-i18next dans l’App Router, tout en gardant une architecture simple et prête pour la production.
> Pour une comparaison plus large, voir [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Structure du projet

Installez les dépendances next-i18next :

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

Commencez avec une structure claire. Gardez les messages séparés par locale et namespace.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Checklist (intermédiaire/senior) :

- Gardez un JSON par namespace et par locale
- Ne centralisez pas trop les messages ; utilisez des namespaces petits, spécifiques à une page ou une fonctionnalité
- Évitez d’importer toutes les locales en même temps ; chargez uniquement ce dont vous avez besoin

---

## 2) Installer les dépendances

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Si vous prévoyez d'utiliser les APIs ou la configuration interop de next-i18next, ajoutez également :

```bash
pnpm add next-i18next
```

---

## 3) Configuration i18n principale

Définissez les locales, la locale par défaut, les langues RTL, et les helpers pour les chemins/URLs localisés.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Note importante : Si vous utilisez `next-i18next.config.js`, assurez-vous qu'il soit aligné avec `i18n.config.ts` pour éviter toute dérive.

---

## 4) Initialisation i18n côté serveur

Initialisez i18next sur le serveur avec un backend dynamique qui importe uniquement le JSON de locale/espace de noms requis.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Charger les ressources JSON depuis src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Note intermédiaire : Gardez la liste des namespaces courte par page pour limiter la charge. Évitez les bundles globaux « attrape-tout ».

---

## 5) Fournisseur client pour les composants React

Encapsulez les composants client avec un provider qui reflète la configuration serveur et charge uniquement les namespaces demandés.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Astuce pour débutant : Vous n'avez pas besoin de transmettre tous les messages au client. Commencez uniquement avec les namespaces de la page.

---

## 6) Mise en page et routes localisées

Définissez la langue et la direction, et pré-générez les routes par locale pour favoriser le rendu statique.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Exemple de page avec utilisation serveur + client

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Forcer le rendu statique pour la page
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Traductions (un JSON par namespace sous `src/locales/...`):

```json fileName="src/locales/en/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

Composant client (charge uniquement le namespace requis) :

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Assurez-vous que la page/le provider inclut uniquement les namespaces dont vous avez besoin (par exemple, `about`).
> Si vous utilisez React < 19, mémoïsez les formateurs lourds comme `Intl.NumberFormat`.

Composant serveur synchrone intégré sous une frontière client :

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO : Métadonnées, Hreflang, Sitemap, Robots

La traduction du contenu est un moyen d'améliorer la portée. Configurez soigneusement le SEO multilingue.

Bonnes pratiques :

- Définir `lang` et `dir` à la racine
- Ajouter `alternates.languages` pour chaque locale (+ `x-default`)
- Lister les URLs traduites dans `sitemap.xml` et utiliser `hreflang`
- Exclure les zones privées localisées (ex. `/fr/admin`) dans `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importer le bon bundle JSON depuis src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>À propos</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware pour le routage des locales

Détecte la locale et redirige vers une route localisée si elle est manquante.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // exclure les fichiers avec extensions

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Correspond à tous les chemins sauf ceux commençant par ces préfixes et les fichiers avec une extension
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Performance et bonnes pratiques DX

- **Définir les attributs html `lang` et `dir`** : Fait dans `src/app/[locale]/layout.tsx`.
- **Diviser les messages par namespace** : Garder les bundles petits (`common.json`, `about.json`, etc.).
- **Minimiser la charge côté client** : Sur les pages, passer uniquement les namespaces nécessaires au provider.
- **Préférer les pages statiques** : Utiliser `export const dynamic = 'force-static'` et `generateStaticParams` par locale.
- **Synchroniser les composants serveur** : Passer des chaînes/formatages pré-calculés au lieu d'appels asynchrones au moment du rendu.
- **Mémoriser les opérations lourdes** : Surtout dans le code client pour les anciennes versions de React.
- **Cache et headers** : Préférer le statique ou `revalidate` plutôt que le rendu dynamique quand c'est possible.

---

## 11) Tests et CI

- Ajouter des tests unitaires pour les composants utilisant `t` afin de garantir que les clés existent.
- Valider que chaque namespace possède les mêmes clés dans toutes les locales.
- Remonter les clés manquantes lors du CI avant le déploiement.

Intlayer automatisera une grande partie de cela (voir section suivante).

---

## 12) Ajouter Intlayer par-dessus (automatisation)

Intlayer vous aide à garder les traductions JSON synchronisées, à tester les clés manquantes, et à les compléter avec l'IA si désiré.

Installez les dépendances intlayer :

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Ajouter des scripts dans le package :

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Flux courants :

- `pnpm i18n:test` en CI pour échouer la build en cas de clés manquantes
- `pnpm i18n:fill` localement pour proposer des traductions AI pour les clés nouvellement ajoutées

> Vous pouvez fournir des arguments CLI ; consultez la [documentation CLI d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).

---

## 13) Dépannage

- **Clés introuvables** : Assurez-vous que la page/le provider liste les bons namespaces et que le fichier JSON existe sous `src/locales/<locale>/<namespace>.json`.
- **Mauvaise langue/flash d’anglais** : Vérifiez la détection de la locale dans `middleware.ts` et la propriété `lng` du provider.
- **Problèmes de mise en page RTL** : Vérifiez que `dir` est dérivé de `isRtl(locale)` et que votre CSS respecte `[dir="rtl"]`.
- **Alternatives SEO manquantes** : Confirmez que `alternates.languages` inclut toutes les locales ainsi que `x-default`.
- **Bundles trop volumineux** : Scindez davantage les namespaces et évitez d’importer l’arborescence complète des `locales` côté client.

---

## 14) Et ensuite

- Ajouter plus de locales et de namespaces à mesure que les fonctionnalités évoluent
- Localiser les pages d’erreur, les emails et le contenu généré par API
- Étendre les workflows Intlayer pour ouvrir automatiquement des PRs pour les mises à jour de traduction

Si vous préférez un starter, essayez le template : `https://github.com/aymericzip/intlayer-next-i18next-template`.
