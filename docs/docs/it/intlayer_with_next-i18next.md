---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Come tradurre la tua Next.js 15 usando next-i18next – guida i18n 2026
description: Una guida pratica e pronta per la produzione per internazionalizzare un'app Next.js 15 App Router con i18next/next-i18next e migliorarla con Intlayer.
keywords:
  - Internazionalizzazione
  - Documentazione
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

# Traduci il tuo sito Next.js 15 usando next-i18next con Intlayer | Internazionalizzazione (i18n)

### A chi è rivolta questa guida

- **Junior**: Segui esattamente i passaggi e copia i blocchi di codice. Otterrai un'app multilingue funzionante.
- **Mid-level**: Usa le checklist e i suggerimenti sulle best practice per evitare errori comuni.
- **Senior**: Dai una rapida occhiata alla struttura generale, alle sezioni SEO e automazione; troverai impostazioni predefinite sensate e punti di estensione.

### Cosa costruirai

- Progetto App Router con rotte localizzate (es. `/`, `/fr/...`)
- Configurazione i18n con locali, locale predefinito, supporto RTL
- Inizializzazione i18n lato server e un provider client
- Traduzioni con namespace caricate su richiesta
- SEO con `hreflang`, `sitemap` localizzato, `robots`
- Middleware per il routing delle localizzazioni
- Integrazione Intlayer per automatizzare i flussi di lavoro di traduzione (test, completamento AI, sincronizzazione JSON)

> Nota: next-i18next è costruito sopra i18next. Questa guida utilizza le primitive di i18next compatibili con next-i18next nell'App Router, mantenendo l'architettura semplice e pronta per la produzione.
> Per un confronto più ampio, vedi [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Struttura del progetto

Installa le dipendenze di next-i18next -

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="bun"
bun add next-i18next i18next react-i18next i18next-resources-to-backend
```

Inizia con una struttura chiara. Mantieni i messaggi suddivisi per locale e namespace.

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

Checklist (mid/senior):

- Mantieni un JSON per namespace per locale
- Non centralizzare eccessivamente i messaggi; usa namespace piccoli, limitati a pagina/funzione
- Evita di importare tutte le locale contemporaneamente; carica solo ciò di cui hai bisogno

---

## 2) Installa le dipendenze

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Se prevedi di utilizzare le API o l'interoperabilità di configurazione di next-i18next, aggiungi anche:

```bash
pnpm add next-i18next
```

---

## 3) Configurazione core di i18n

Definisci le locale, la locale predefinita, RTL e gli helper per percorsi/URL localizzati.

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

Nota senior: Se usi `next-i18next.config.js`, mantienilo allineato con `i18n.config.ts` per evitare discrepanze.

---

## 4) Inizializzazione i18n lato server

Inizializza i18next sul server con un backend dinamico che importa solo il JSON della locale/namespace richiesti.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Carica le risorse JSON da src/locales/<locale>/<namespace>.json
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

Nota intermedia: Mantieni la lista dei namespace breve per pagina per limitare il payload. Evita bundle globali “catch-all”.

---

## 5) Provider client per componenti React

Avvolgi i componenti client con un provider che rispecchia la configurazione server e carica solo i namespace richiesti.

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

Suggerimento per principianti: Non è necessario passare tutti i messaggi al client. Inizia solo con i namespace della pagina.

---

## 6) Layout e rotte localizzate

Imposta la lingua e la direzione, e pre-generare le rotte per locale per favorire il rendering statico.

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

## 7) Pagina di esempio con utilizzo server + client

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Forza il rendering statico per la pagina
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

Traduzioni (un file JSON per namespace sotto `src/locales/...`):

```json fileName="src/locales/it/about.json"
{
  "title": "Informazioni",
  "description": "Descrizione della pagina Informazioni",
  "counter": {
    "label": "Contatore",
    "increment": "Incrementa"
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

Componente client (carica solo il namespace richiesto):

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

> Assicurati che la pagina/provider includa solo i namespace di cui hai bisogno (es. `about`).
> Se usi React < 19, memorizza in cache formatter pesanti come `Intl.NumberFormat`.

Componente server sincrono incorporato sotto un confine client:

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

## 8) SEO: Metadata, Hreflang, Sitemap, Robots

La traduzione dei contenuti è un mezzo per migliorare la portata. Configura accuratamente la SEO multilingue.

Best practice:

- Imposta `lang` e `dir` alla radice
- Aggiungi `alternates.languages` per ogni locale (+ `x-default`)
- Elenca gli URL tradotti in `sitemap.xml` e usa `hreflang`
- Escludi aree private localizzate (es. `/fr/admin`) in `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa il bundle JSON corretto da src/locales
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
  return <h1>About</h1>;
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

## 9) Middleware per il routing della locale

Rileva la locale e reindirizza a un percorso localizzato se mancante.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // esclude i file con estensioni

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
    // Corrisponde a tutti i percorsi tranne quelli che iniziano con questi e i file con un'estensione
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Performance e best practice per DX

- **Imposta `lang` e `dir` nell'html**: Fatto in `src/app/[locale]/layout.tsx`.
- **Dividi i messaggi per namespace**: Mantieni i bundle piccoli (`common.json`, `about.json`, ecc.).
- **Minimizza il payload client**: Nelle pagine, passa solo i namespace necessari al provider.
- **Preferisci pagine statiche**: Usa `export const dynamic = 'force-static'` e `generateStaticParams` per ogni locale.
- **Sincronizza i componenti server**: Passa stringhe/formatting precomputati invece di chiamate async al momento del render.
- **Memoizza operazioni pesanti**: Specialmente nel codice client per versioni più vecchie di React.
- **Cache e headers**: Preferisci rendering statico o `revalidate` rispetto a rendering dinamico quando possibile.

---

## 11) Testing e CI

- Aggiungi test unitari per i componenti che usano `t` per assicurarti che le chiavi esistano.
- Verifica che ogni namespace abbia le stesse chiavi tra le diverse localizzazioni.
- Rileva le chiavi mancanti durante la CI prima del deploy.

Intlayer automatizzerà gran parte di questo (vedi sezione successiva).

---

## 12) Aggiungere Intlayer sopra (automazione)

Intlayer ti aiuta a mantenere sincronizzate le traduzioni JSON, testare le chiavi mancanti e completare con AI quando desiderato.

Installa le dipendenze di intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
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
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Aggiungi gli script nel package:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Flussi comuni:

- `pnpm i18n:test` in CI per far fallire le build in caso di chiavi mancanti
- `pnpm i18n:fill` in locale per proporre traduzioni AI per le chiavi appena aggiunte

> Puoi fornire argomenti CLI; consulta la [documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

---

## 13) Risoluzione dei problemi

- **Chiavi non trovate**: Assicurati che la pagina/provider elenchi i namespace corretti e che il file JSON esista sotto `src/locales/<locale>/<namespace>.json`.
- **Lingua errata/flash di inglese**: Controlla due volte il rilevamento della locale in `middleware.ts` e il provider `lng`.
- **Problemi di layout RTL**: Verifica che `dir` derivi da `isRtl(locale)` e che il tuo CSS rispetti `[dir="rtl"]`.
- **Mancanza di alternate SEO**: Conferma che `alternates.languages` includa tutte le localizzazioni e `x-default`.
- **Bundle troppo grandi**: Suddividi ulteriormente i namespace ed evita di importare interi alberi `locales` sul client.

---

## 14) Cosa c’è dopo

- Aggiungi più localizzazioni e namespace man mano che le funzionalità crescono
- Localizza pagine di errore, email e contenuti generati da API
- Estendi i workflow di Intlayer per aprire automaticamente PR per aggiornamenti di traduzione

Se preferisci un punto di partenza, prova il template: `https://github.com/aymericzip/intlayer-next-i18next-template`.
