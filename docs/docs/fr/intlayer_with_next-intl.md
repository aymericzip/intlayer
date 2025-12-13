---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Comment traduire votre Next.js 15 avec next-intl – guide i18n 2025
description: Découvrez comment rendre votre site Next.js 15 App Router multilingue. Suivez la documentation pour internationaliser (i18n) et traduire votre application.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Traduisez votre site Next.js 15 utilisant next-intl avec Intlayer | Internationalisation (i18n)

Ce guide vous accompagne à travers les bonnes pratiques de next-intl dans une application Next.js 15 (App Router), et montre comment superposer Intlayer pour une gestion robuste des traductions et une automatisation efficace.

Consultez la comparaison dans [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md).

- Pour les débutants : suivez les sections étape par étape pour obtenir une application multilingue fonctionnelle.
- Pour les développeurs intermédiaires : faites attention à l’optimisation du payload et à la séparation serveur/client.
- Pour les seniors : notez la génération statique, le middleware, l’intégration SEO et les hooks d’automatisation.

Ce que nous allons couvrir :

- Configuration et structure des fichiers
- Optimisation du chargement des messages
- Utilisation des composants client et serveur
- Métadonnées, sitemap, robots pour le SEO
- Middleware pour le routage des locales
- Ajout d’Intlayer par-dessus (CLI et automatisation)

## Configurez votre application avec next-intl

Installez les dépendances next-intl :

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Configuration et chargement du contenu

Chargez uniquement les namespaces dont vos routes ont besoin et validez les locales dès le début. Gardez les composants serveur synchrones lorsque c’est possible et envoyez uniquement les messages nécessaires au client.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Charger uniquement les namespaces dont vos layouts/pages ont besoin
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Définir la locale active de la requête pour ce rendu serveur (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Les messages sont chargés côté serveur. Envoyer uniquement ce qui est nécessaire au client.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traductions/formatage strictement côté serveur
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Utilisation dans un composant client

Prenons un exemple d'un composant client affichant un compteur.

**Traductions (forme réutilisée ; chargez-les dans les messages next-intl comme vous préférez)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Composant client**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Portée directement sur l'objet imbriqué
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> N'oubliez pas d'ajouter le message "about" dans les messages client de la page
> (n'incluez que les namespaces dont votre client a réellement besoin).

### Utilisation dans un composant serveur

Ce composant UI est un composant serveur et peut être rendu sous un composant client (page → client → serveur). Gardez-le synchrone en passant des chaînes pré-calculées.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

Notes :

- Calculez `formattedCount` côté serveur (par exemple, `const initialFormattedCount = format.number(0)`).
  /// Évitez de passer des fonctions ou des objets non sérialisables dans les composants serveur.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Reste du code de la page
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### Middleware pour le routage des locales

Ajoutez un middleware pour gérer la détection de la locale et le routage :

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Ignorer l'API, les internals de Next et les assets statiques
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Bonnes pratiques

- **Définir les attributs html `lang` et `dir`** : Dans `src/app/[locale]/layout.tsx`, calculez `dir` via `getLocaleDirection(locale)` et définissez `<html lang={locale} dir={dir}>`.
- **Séparer les messages par namespace** : Organisez les fichiers JSON par locale et namespace (par exemple, `common.json`, `about.json`).
- **Minimiser la charge côté client** : Sur les pages, envoyer uniquement les namespaces requis à `NextIntlClientProvider` (par exemple, `pick(messages, ['common', 'about'])`).
- **Préférer les pages statiques** : Exporter `export const dynamic = 'force-static'` et générer des paramètres statiques pour toutes les `locales`.
- **Composants serveur synchrones** : Passer des chaînes pré-calculées (labels traduits, nombres formatés) plutôt que des appels asynchrones ou des fonctions non sérialisables.

## Implémenter Intlayer par-dessus next-intl

Installer les dépendances d'intlayer :

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

Créer le fichier de configuration intlayer :

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // Gardez votre structure de dossiers par namespace synchronisée avec Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Ajoutez les scripts dans `package.json` :

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Notes :

- `intlayer fill` : utilise votre fournisseur d'IA pour remplir les traductions manquantes en fonction des locales configurées.
- `intlayer test` : vérifie les traductions manquantes ou invalides (à utiliser en CI).

Vous pouvez configurer les arguments et les fournisseurs ; voir [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).
