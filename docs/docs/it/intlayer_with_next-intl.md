---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Come tradurre il tuo Next.js 15 usando next-intl – guida i18n 2025
description: Scopri come rendere il tuo sito Next.js 15 App Router multilingue. Segui la documentazione per internazionalizzare (i18n) e tradurlo.
keywords:
  - Internazionalizzazione
  - Documentazione
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

# Traduci il tuo sito Next.js 15 usando next-intl con Intlayer | Internazionalizzazione (i18n)

Questa guida ti accompagna attraverso le best practice di next-intl in un'app Next.js 15 (App Router) e mostra come sovrapporre Intlayer per una gestione robusta delle traduzioni e automazione.

Vedi il confronto in [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md).

- Per i junior: segui le sezioni passo-passo per ottenere un'app multilingue funzionante.
- Per gli sviluppatori di livello medio: presta attenzione all'ottimizzazione del payload e alla separazione server/client.
- Per i senior: nota la generazione statica, il middleware, l'integrazione SEO e i hook di automazione.

Cosa tratteremo:

- Configurazione e struttura dei file
- Ottimizzazione del caricamento dei messaggi
- Uso di componenti client e server
- Metadata, sitemap, robots per SEO
- Middleware per il routing delle localizzazioni
- Aggiungere Intlayer sopra (CLI e automazione)

## Configura la tua applicazione usando next-intl

Installa le dipendenze di next-intl -

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash packageManager="bun"
bun add next-intl
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

#### Configurazione e caricamento dei contenuti

Carica solo i namespace di cui le tue rotte hanno bisogno e valida le localizzazioni in anticipo. Mantieni i componenti server sincroni quando possibile e invia al client solo i messaggi necessari.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Carica solo i namespace di cui il tuo layout/pagine hanno bisogno
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

  // Imposta la locale attiva per questa richiesta di rendering server (RSC)
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

  // I messaggi vengono caricati lato server. Invia al client solo ciò che è necessario.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traduzioni/formatting strettamente lato server
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

### Utilizzo in un componente client

Prendiamo un esempio di un componente client che rende un contatore.

**Traduzioni (forma riutilizzata; caricale nei messaggi next-intl come preferisci)**

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
    "label": "Contatore",
    "increment": "Incrementa"
  }
}
```

**Componente client**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Ambito direttamente all'oggetto annidato
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

> Non dimenticare di aggiungere il messaggio "about" nei messaggi client della pagina
> (includi solo i namespace di cui il tuo client ha effettivamente bisogno).

### Utilizzo in un componente server

Questo componente UI è un componente server e può essere renderizzato sotto un componente client (pagina → client → server). Mantienilo sincrono passando stringhe pre-calcolate.

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

Note:

- Calcola `formattedCount` lato server (es. `const initialFormattedCount = format.number(0)`).
- Evita di passare funzioni o oggetti non serializzabili ai componenti server.

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

// ... Resto del codice della pagina
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
      changeFrequency: "mensile",
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

### Middleware per il routing della localizzazione

Aggiungi un middleware per gestire il rilevamento della lingua e il routing:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Escludi API, internals di Next e risorse statiche
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Best practices

- **Imposta html `lang` e `dir`**: In `src/app/[locale]/layout.tsx`, calcola `dir` tramite `getLocaleDirection(locale)` e imposta `<html lang={locale} dir={dir}>`.
- **Dividi i messaggi per namespace**: Organizza i JSON per locale e namespace (es. `common.json`, `about.json`).
- **Minimizza il payload client**: Nelle pagine, invia solo i namespace necessari a `NextIntlClientProvider` (es. `pick(messages, ['common', 'about'])`).
- **Preferisci pagine statiche**: Esporta `export const dynamic = 'force-static'` e genera parametri statici per tutte le `locales`.
- **Componenti server sincroni**: Passa stringhe precomputate (etichette tradotte, numeri formattati) invece di chiamate async o funzioni non serializzabili.

## Implementa Intlayer sopra next-intl

Installa le dipendenze di intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

Crea il file di configurazione di intlayer:

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
    // Mantieni la struttura delle cartelle per namespace sincronizzata con Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Aggiungi gli script in `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Note:

- `intlayer fill`: utilizza il tuo provider AI per completare le traduzioni mancanti in base alle localizzazioni configurate.
- `intlayer test`: verifica la presenza di traduzioni mancanti o non valide (usalo in CI).

Puoi configurare argomenti e provider; vedi [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).
