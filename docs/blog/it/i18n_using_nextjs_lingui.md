---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "i18n in Next.js 16 con Lingui: Guida alla configurazione con App Router"
description: "Configura Lingui in Next.js 16 App Router: Server Components, macro SWC, routing proxy, generateMetadata, hreflang, sitemap e robots.txt, con dati di benchmark."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Internazionalizzazione
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versione iniziale"
author: aymericzip
---

# Come internazionalizzare la tua applicazione Next.js usando Lingui nel 2026

## Indice

<TOC/>

## Cos'è Lingui?

**Lingui** è una libreria di internazionalizzazione (i18n) basata su **macro** ed **estrazione dei messaggi**. Scrivi il testo di origine nei tuoi componenti (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` raccoglie ogni messaggio nei cataloghi (file PO per impostazione predefinita) e un loader li compila in JavaScript compatto. I messaggi utilizzano ICU MessageFormat e Lingui supporta i **React Server Components** nell'App Router.

Questa guida illustra la configurazione di Lingui in un progetto **Next.js 16 App Router**, con:

- **Macro compilate tramite SWC**, preservando la velocità di Turbopack.
- **Server e Client Components** che condividono la stessa API `Trans` e `useLingui`.
- **Routing dei percorsi localizzati** tramite `proxy.ts`: `/about` per la lingua predefinita, `/fr/about` per le altre e rilevamento della lingua alla prima visita.
- **Rendering statico** di ogni lingua tramite `generateStaticParams`.
- **SEO multilingue completo**: `generateMetadata` tradotto, canonical, `hreflang` con `x-default`, impostazioni locali Open Graph, JSON-LD, `sitemap.ts`, `robots.ts` e pagine 404 localizzate.

> Cerchi un'altra libreria? Consulta la [guida a next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-intl.md), la [guida a next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-i18next.md) o la [guida a Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md).

> Usi TanStack Start? Consulta la [guida a TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_lingui.md). Vuoi confrontare le librerie? Leggi [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer.md) e [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md).

## Cosa dice il benchmark su Lingui in Next.js

Il [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md) esegue la stessa applicazione Next.js con 10 pagine e 10 lingue con tutte le principali librerie e misura ciò che il browser scarica effettivamente.

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Dati principali per `@lingui/core@6.6.0` su Next.js 16, misurati il 2026-09-26 (gzip):

| Configurazione                    | Dimensione libreria | JS per pagina | Perdita altre lingue | Perdita altre pagine |
| :-------------------------------- | ------------------: | ------------: | -------------------: | -------------------: |
| Nessuna i18n (app base)           |                   - |      141.0 KB |                   0% |                   0% |
| Lingui, un catalogo per lingua    |             72.1 KB |      145.4 KB |                 2.8% |                89.9% |
| `@intlayer/lingui` (compat)       |             10.7 KB |      221.6 KB |                  50% |                  90% |
| `next-intlayer` (Intlayer nativo) |              4.9 KB |      141.5 KB |                   0% |                   0% |

Cosa tenere a mente:

- **Un singolo catalogo per lingua perde comunque i messaggi delle altre pagine** verso il provider client. Mantieni quanto più testo possibile nei Server Components, che inviano HTML renderizzato e non cataloghi.
- **Il runtime di Lingui pesa circa 72 KB gzip.** L'adattatore di compatibilità `@intlayer/lingui` riduce il runtime a circa 11 KB, ma in questo benchmark la configurazione compatibile Next.js invia comunque interi cataloghi alla pagina. L'API nativa `next-intlayer` è la configurazione che mantiene le dimensioni dell'app base.

> Consulta i dati completi: [Rapporto benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md) e il [repository del benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Confronto delle funzionalità su Next.js

Come si confronta Lingui con `next-intl` e Intlayer sulle funzionalità comunemente necessarie in un progetto Next.js App Router:

| Funzionalità                         | `next-intlayer` (Intlayer)                        | Lingui                                                            | `next-intl`                                 |
| ------------------------------------ | ------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------- |
| **Traduzioni vicine ai componenti**  | ✅ Contenuto co-locato con ogni componente        | ⚠️ Testo sorgente nei componenti, cataloghi centralizzati         | ❌ JSON centralizzato                       |
| **Integrazione TypeScript**          | ✅ Tipi rigorosi generati automaticamente         | ⚠️ Macro tipizzate, cataloghi di messaggi non tipizzati           | ✅ Buona, tramite estensione `AppConfig`    |
| **Rilevamento traduzioni mancanti**  | ✅ Errori TypeScript e avvisi in fase di build    | ⚠️ Fallback a runtime al testo sorgente                           | ⚠️ Fallback a runtime                       |
| **Contenuto ricco (JSX, Markdown)**  | ✅ Supporto diretto                               | ✅ JSX all'interno di `<Trans>`, nessun supporto Markdown         | ⚠️ Tag tramite `t.rich`, nessun Markdown    |
| **Traduzione AI**                    | ✅ Provider e chiave API propri, con contesto app | ❌ No                                                             | ❌ No                                       |
| **Editor visuale / CMS**             | ✅ Editor visuale locale + CMS opzionale          | ❌ Tramite piattaforme esterne                                    | ❌ Tramite piattaforme esterne              |
| **Routing localizzato**              | ✅ Integrato                                      | ❌ Scrivi il tuo `proxy.ts`                                       | ✅ Segmento `[locale]` integrato            |
| **Pluralizzazione**                  | ✅ Basata su enumerazione                         | ✅ ICU, macro `<Plural>`                                          | ✅ ICU                                      |
| **Formati di contenuto**             | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`  | ✅ PO, JSON, CSV                                                  | ✅ `.json`, `.js`, `.ts`                    |
| **ICU MessageFormat**                | ✅ Tramite `format: "icu"`                        | ✅ Nativo                                                         | ✅ Nativo                                   |
| **Helper SEO (hreflang, sitemap)**   | ✅ Helper per metadata, sitemap e robots.txt      | ❌ Manuale                                                        | ✅ Buono                                    |
| **Server Components**                | ✅ Accesso diretto in qualsiasi Server Component  | ⚠️ `setI18n` in ogni layout e pagina                              | ⚠️ `await getTranslations()` per componente |
| **Tree-shaking per componente**      | ✅ In fase di build (Babel / SWC)                 | ⚠️ Un catalogo per lingua, l'estrattore per pagina è sperimentale | ⚠️ Manuale, con `pick()` per route          |
| **Dimensione runtime (gzip, bench)** | 4.9 KB                                            | 72.1 KB                                                           | 14.7 KB                                     |
| **Traduzioni mancanti in CI**        | ✅ `npx intlayer test`                            | ✅ `lingui compile --strict`                                      | ⚠️ Non integrato                            |
| **Ecosistema / community**           | ⚠️ Più piccolo, in rapida crescita                | ✅ Maturo                                                         | ✅ Ampio                                    |

> Le dimensioni del runtime provengono dal [benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md). Per una discussione dettagliata, leggi [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer.md).

> Altre guide Next.js: [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-intl.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-i18next.md) e [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md).

## Pratiche consigliate da seguire

- **Imposta `lang` e `dir` su `<html>`** nel layout `[locale]`.
- **Preferisci i Server Components** per il testo: eseguono il rendering dell'HTML sul server e non richiedono il catalogo sul client.
- **Chiama `initLingui(locale)` in ogni layout e pagina.** I layout non vengono renderizzati nuovamente durante la navigazione, quindi una pagina non può fare affidamento sul fatto che il layout abbia impostato la lingua.
- **Mantieni un URL per lingua** ed esegui il pre-rendering di ogni lingua con `generateStaticParams`.
- **Traduci i tuoi metadati** in `generateMetadata`, con `canonical`, `hreflang` e `x-default`.
- **Genera una sitemap multilingue e un file robots.txt** con le convenzioni `sitemap.ts` e `robots.ts`.
- **Usa collegamenti reali per il selettore di lingua**, in modo che i crawler possano scoprire tutte le versioni linguistiche.
- **Esegui `lingui extract` nella pipeline CI** in modo che nessun nuovo messaggio venga rilasciato senza traduzione.

> Consulta la nostra guida su [internazionalizzazione e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md), la [guida su hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md) e il [confronto SEO multilingue in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/nextjs-multilingual-seo-comparison.md).

## Guida passo dopo passo per configurare Lingui in un'applicazione Next.js

Ecco la struttura del progetto che creeremo:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Routing e rilevamento della lingua
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Generato da `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Lingue, helper per URL
    │   ├── appRouterI18n.ts        # Cataloghi e istanze solo server
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Builder per generateMetadata
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
            │   └── page.tsx        # 404 localizzato per percorsi sconosciuti
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Installa le dipendenze">

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

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider`, `setI18n` per Server Components e le macro (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: compila le macro all'interno della pipeline SWC di Next.js.
- **@lingui/loader**: compila i cataloghi `.po` all'importazione, rendendo superfluo `lingui compile`.
- **@lingui/cli**: `lingui extract` per raccogliere i messaggi nei cataloghi.

> `@lingui/swc-plugin` è un plugin WebAssembly associato alla versione SWC di Next.js. Se la build fallisce dopo un aggiornamento di Next.js, aggiorna il plugin alla versione indicata come compatibile nel suo README.

</Step>
<Step number={2} title="Centralizza la configurazione delle lingue">

Un singolo file definisce le lingue e gli helper per gli URL. Routing, metadati, sitemap e Lingui leggono tutti da qui.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
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

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
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
<Step number={3} title="Configura Lingui e Next.js">

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

Il plugin SWC compila le macro e il loader compila i file `.po`, sia per Turbopack (predefinito in Next.js 16) che per webpack:

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

Aggiungi gli script di estrazione:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Carica i cataloghi e crea le istanze server">

I Server Components non dispongono del contesto React, quindi Lingui fornisce `setI18n` per registrare l'istanza per il render corrente. Questo modulo carica ogni catalogo **una sola volta per processo server** e crea un'istanza `I18n` per ogni lingua. Essendo `server-only`, i cataloghi delle altre lingue non raggiungono mai il bundle client.

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
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Affinché TypeScript accetti l'importazione dei file `.po`, dichiara il modulo una volta:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Crea il provider client">

I Client Components leggono le traduzioni da un contesto React. Il provider riceve il catalogo della lingua attiva dal layout server e crea la propria istanza una sola volta.

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
<Step number={6} title="Definisci le route dinamiche per le lingue">

Il segmento `[locale]` contiene il layout radice. `generateStaticParams` pre-renderizza ogni lingua in fase di build e `dynamicParams = false` restituisce un errore 404 per qualsiasi altro prefisso.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
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

> Il provider client riceve l'intero catalogo della lingua attiva. Questo è ciò che il benchmark definisce come "perdita altre pagine". Mantenere il testo nei Server Components riduce ciò di cui il client ha effettivamente bisogno. Per applicazioni di grandi dimensioni, l'estrattore per pagina sperimentale di Lingui (`experimental.extractor` in `lingui.config.ts`) suddivide i cataloghi per punto di ingresso.

</Step>
<Step number={7} title="Utilizza le traduzioni nei Server Components">

I Server Components utilizzano le stesse macro dei Client Components. `initLingui` deve essere eseguito anche nella pagina, poiché un layout non viene ri-renderizzato quando si naviga tra le sue pagine.

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
<Step number={8} title="Utilizza le traduzioni nei Client Components">

I Client Components utilizzano le stesse importazioni. Le macro leggono l'istanza da `LinguiClientProvider`.

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
<Step number={9} title="Estrai e traduci i tuoi messaggi">

Esegui l'estrazione. Lingui scrive ogni messaggio trovato in `src` nel catalogo di ciascuna lingua:

```bash
npm run i18n:extract
```

Quindi traduci il campo `msgstr` di ciascuna voce:

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

> I segnaposto `<0>` mantengono gli elementi JSX di un tag `<Trans>` al loro posto, consentendo ai traduttori di spostarli senza toccare il markup.

</Step>
<Step number={10} title="Configura il proxy per il routing delle lingue" isOptional={true}>

Next.js 16 ha rinominato `middleware.ts` in `proxy.ts`. Il proxy implementa la strategia del prefisso solo quando necessario:

- `/fr/about` viene servito così com'è;
- `/en/about` reindirizza a `/about`, in modo che la lingua predefinita abbia un singolo URL;
- `/about` viene riscritto internamente in `/en/about`, senza modificare l'URL visibile;
- una prima visita su `/` reindirizza alla lingua preferita (prima controlla il cookie, poi `Accept-Language`).

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
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
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

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Cambia la lingua dei tuoi contenuti" isOptional={true}>

`usePathname` restituisce l'URL visto dal browser (`/about` o `/fr/about`). Rimuovi la lingua dal prefisso, quindi crea il link per ogni lingua. Il selettore renderizza link HTML reali, consentendo ai crawler di raggiungere ogni versione linguistica, mentre il cookie memorizza la scelta esplicita.

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
<Step number={12} title="Crea un componente Link localizzato" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Funziona anche dai Server Components, poiché viene renderizzato all'interno di `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Internazionalizza i tuoi metadati" isOptional={true}>

Ogni versione linguistica può posizionarsi autonomamente nei motori di ricerca, a condizione che ogni pagina fornisca:

- un `title` e una `description` **tradotti**;
- un URL **canonical** che punti a se stesso;
- un alternativo **`hreflang` per ogni lingua**, oltre a **`x-default`**;
- campi **Open Graph** `locale`, `alternateLocale` e `url`;
- **JSON-LD** con `inLanguage`.

`generateMetadata` viene eseguito all'esterno dell'albero React, quindi utilizza direttamente l'istanza server con la macro `msg`:

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
  /** Path without locale prefix, e.g. "/about" */
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

// ... page component from step 7
```

Il markup JSON-LD viene renderizzato dalla pagina stessa. I file di pagina possono esportare solo campi speciali di Next.js, quindi mantieni il componente in un file separato:

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
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Internazionalizza la tua sitemap" isOptional={true}>

La convenzione `sitemap.ts` supporta `alternates.languages`, che Next.js renderizza come alternativi `xhtml:link`. Elenca ogni URL per ogni lingua:

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
<Step number={15} title="Internazionalizza il tuo robots.txt" isOptional={true}>

I percorsi privati esistono in ogni lingua, quindi `disallow` deve coprire ogni percorso localizzato:

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
<Step number={16} title="Gestisci le pagine 404 localizzate" isOptional={true}>

`not-found.tsx` viene renderizzato all'interno del layout `[locale]`, quindi ha accesso al provider client. La route catch-all reindirizza ad esso i percorsi sconosciuti all'interno di una lingua. Next.js aggiunge automaticamente `noindex` alle risposte 404.

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

// /fr/does/not/exist → localized not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Accedi alla lingua nelle Server Actions" isOptional={true}>

Le Server Actions non ricevono i parametri di route. L'approccio più affidabile consiste nell'inviare la lingua con il modulo, dalla pagina che la conosce:

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
<Step number={18} title="Mantieni le tue macro e riduci il runtime con Intlayer" isOptional={true}>

L'adattatore di compatibilità [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md) mantiene il codice sorgente intatto: le macro vengono compilate come prima e le conseguenti chiamate a `i18n._()`, `useLingui()` e `<Trans>` vengono gestite dai dizionari Intlayer. Nel benchmark Next.js, il runtime scende da **~72.1 KB a ~10.7 KB** gzip.

Su Next.js, l'adattatore viene collegato creando un alias per `@lingui/core` e `@lingui/react` verso `@intlayer/lingui` in `next.config.ts` (webpack e Turbopack) e avvolgendo la configurazione con `withIntlayer` da `next-intlayer/server`. Mantieni `@lingui/swc-plugin` in modo che le macro vengano comunque compilate per prime. La configurazione completa è disponibile nella [guida alla compatibilità di Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md).

Come mostrato nella tabella del benchmark, l'adattatore riduce il runtime ma non ancora il catalogo inviato a ogni pagina su Next.js. È ideale come soluzione ponte per la migrazione: una volta in esecuzione, puoi spostare i componenti uno alla volta verso l'API nativa `useIntlayer`, che invia solo il contenuto renderizzato da ciascun componente. Consulta la [guida a Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer-lingui.md) e tutti gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md).

</Step>
<Step number={19} title="Automatizza le tue traduzioni usando Intlayer" isOptional={true}>

Lingui estrae i messaggi, ma compilare decine di cataloghi a mano richiede la maggior parte del tempo. Intlayer è **gratuito** e **open source**, e i suoi strumenti funzionano perfettamente insieme a Lingui:

- **Traduci con l'IA** utilizzando la tua chiave API e il tuo provider preferito. Consulta [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md) e la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).
- **Mantieni i tuoi file PO** come fonte di verità con il [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md).
- **Verifica le traduzioni mancanti** nella pipeline CI. Consulta [testare le traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md).
- **Analizza il tuo sito pubblicato** per individuare tag `hreflang` mancanti, canonical errati e perdite di lingua con il [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/scan.md).

</Step>
</Steps>

## Domande frequenti

<FAQ>

<Question title="Lingui supporta Next.js App Router e i Server Components?">

Sì. `@lingui/react` supporta i React Server Components. I Server Components registrano l'istanza con `setI18n` da `@lingui/react/server`, i Client Components la leggono da `I18nProvider`, ed entrambi utilizzano le stesse macro `Trans` e `useLingui`.

</Question>
<Question title="Perché devo chiamare initLingui in ogni pagina e layout?">

I Server Components non hanno contesto, quindi l'istanza viene registrata per singolo render. I layout vengono preservati durante le navigazioni e non vengono renderizzati nuovamente, quindi una pagina non può fare affidamento sul layout per impostare la lingua. Chiamare `initLingui(locale)` all'inizio di ogni layout e pagina li mantiene indipendenti.

</Question>
<Question title="Dovrei usare il plugin SWC o Babel con Next.js?">

Usa `@lingui/swc-plugin`. Mantiene la pipeline SWC e Turbopack. L'aggiunta di una configurazione Babel disabilita SWC in Next.js e rallenta le build. L'unico vincolo è mantenere la versione del plugin compatibile con la versione di SWC della tua release di Next.js.

</Question>
<Question title="Come traduco generateMetadata con Lingui?">

Ottieni l'istanza server con `getI18nInstance(locale)` e traduci i descrittori dichiarati con la macro `msg`: ``i18n._(msg`About us`)``. Restituisci `alternates.canonical`, `alternates.languages` con `x-default` e `openGraph.locale`. Il passaggio 13 fornisce un helper riutilizzabile.

</Question>
<Question title="Quanto pesa Lingui nel bundle di Next.js?">

Il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md) misura circa 72 KB gzip per il runtime. Con un catalogo per lingua, le pagine pesano circa 145 KB rispetto ai 141 KB senza i18n, ma ogni pagina riceve comunque i messaggi delle altre pagine attraverso il provider client.

</Question>
<Question title="Lingui, next-intl o next-i18next: quale scegliere per Next.js?">

Lingui è adatto ai team che preferiscono scrivere il testo sorgente nei componenti e lavorare con file PO e traduttori. next-intl è ideale per i team che preferiscono cataloghi JSON e un'API `t("key")` strettamente integrata con Next.js. next-i18next offre l'ecosistema di plugin i18next. Consulta [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md) e il [benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md).

</Question>
<Question title="Posso migrare da Lingui a Intlayer senza riscrivere i miei componenti?">

Sì. L'adattatore [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md) mantiene le macro e sostituisce il runtime; successivamente puoi migrare i componenti a `useIntlayer` progressivamente. Consulta gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md).

</Question>

</FAQ>
