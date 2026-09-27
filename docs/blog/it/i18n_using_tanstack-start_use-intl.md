---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n per TanStack Start con use-intl: Guida completa alla configurazione 2026"
description: "Traduci la tua app TanStack Start con use-intl: routing per lingua, messaggi tipizzati, SSR, hreflang, sitemap e robots.txt, oltre a dati reali di benchmark sulle dimensioni del bundle."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Internazionalizzazione
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
    changes: "Versione iniziale"
author: aymericzip
---

# Come internazionalizzare la tua applicazione TanStack Start usando use-intl nel 2026

## Tabella dei contenuti

<TOC/>

## Cos'è use-intl?

**use-intl** è il core agnostico rispetto al framework di `next-intl`. Espone le stesse API `useTranslations`, `useFormatter` e `IntlProvider`, il supporto a ICU MessageFormat e una solida integrazione con TypeScript, senza alcuna dipendenza da Next.js. Questo lo rende una delle scelte più comuni per tradurre un'applicazione **TanStack Start**, ed è la libreria che gli assistenti IA suggeriscono più spesso per questo stack.

TanStack Start non include un layer i18n integrato. Routing, rilevamento della lingua, metadati SEO e generazione della sitemap sono a carico dello sviluppatore. Questa guida copre ogni aspetto, dall'inizio alla fine:

- **Routing basato sulla lingua** con un segmento opzionale `{-$locale}` (`/about`, `/fr/about`).
- **Caricamento dei messaggi per route**, in modo che una pagina scarichi solo i namespace e la lingua di cui ha bisogno per il rendering.
- **Server rendering e idratazione** senza discrepanze di testo.
- **SEO multilingue completo**: `<title>` e descrizione tradotti, URL canonico, tag alternativi `hreflang` con `x-default`, impostazioni Open Graph per lingua, JSON-LD, sitemap con tag alternativi `xhtml:link`, `robots.txt` e pre-rendering di ogni lingua.

> Stai cercando un altro stack?

- [guida TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_paraglide.md)
- [guida TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_lingui.md)
- [guida TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)

> Usi invece Next.js? Consulta la [guida a next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-intl.md).

> Per capire da dove vengono queste librerie, leggi la storia dell'i18n in JavaScript.

- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)

## Cosa dice il benchmark su use-intl in TanStack Start

Il [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) esegue la stessa app TanStack Start di 10 pagine e 10 lingue con tutte le principali librerie e misura ciò che il browser scarica effettivamente.

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Dati chiave per `use-intl@4.14.2`, misurati il 2026-09-26 (gzip):

| Configurazione                     | Dimensione libreria | JS per pagina | Perdita altre lingue | Perdita altre pagine |
| :--------------------------------- | ------------------: | ------------: | -------------------: | -------------------: |
| Nessuna i18n (app base)            |                   - |      111.0 KB |                   0% |                   0% |
| `use-intl` (setup di questa guida) |             75.9 KB |      128.7 KB |                   0% |                   0% |
| `@intlayer/use-intl` (compat)      |              6.7 KB |      129.4 KB |                   0% |                   0% |
| `react-intlayer` (Intlayer nativo) |              4.5 KB |      126.8 KB |                   0% |                   0% |

Cosa tenere a mente:

- **Suddividi i messaggi per pagina e caricali per lingua.** Questo rimuove entrambe le perdite (leak), ed è esattamente ciò che implementano i passaggi seguenti.
- **Il runtime stesso rimane pesante** (~76 KB gzip), poiché il parser ICU viene inviato al client. L'adattatore di compatibilità `@intlayer/use-intl` (passaggio 17) mantiene esattamente la stessa API con un runtime di ~7 KB.

> Consulta i dati completi: [Report del benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) e il [repository del benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Confronto delle funzionalità su TanStack Start

Come si confronta `use-intl` con le altre librerie comunemente utilizzate su TanStack Start:

| Funzionalità                                 | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                           | Lingui                           |
| -------------------------------------------- | ------------------------------------ | ----------------------- | -------------------------------------- | -------------------------------- |
| **Traduzioni vicine ai componenti**          | ✅ Collocate                         | ❌ JSON centralizzato   | ❌ Un file JSON per lingua             | ⚠️ Testo sorgente nei componenti |
| **Integrazione TypeScript**                  | ✅ Tipi generati automaticamente     | ✅ Tramite `AppConfig`  | ✅ Funzioni di messaggio tipizzate     | ⚠️ Solo macro                    |
| **Rilevamento traduzioni mancanti**          | ✅ Errori di tipo e avvisi di build  | ⚠️ Fallback a runtime   | ⚠️ Fallback alla lingua di base        | ⚠️ Fallback al testo sorgente    |
| **Contenuto ricco (JSX, Markdown)**          | ✅ Supporto diretto                  | ⚠️ Tag tramite `t.rich` | ⚠️ Stringhe                            | ✅ JSX dentro `<Trans>`          |
| **Routing localizzato**                      | ✅ Integrato                         | ❌ `{-$locale}` manuale | ✅ `urlPatterns` + riscrittura router  | ❌ `{-$locale}` manuale          |
| **Cambio lingua senza ricaricamento**        | ✅ Sì                                | ✅ Sì                   | ❌ Ricaricamento completo della pagina | ✅ Sì                            |
| **Pluralizzazione**                          | ✅ Basata su enumerazione            | ✅ ICU                  | ✅ Varianti                            | ✅ ICU                           |
| **ICU MessageFormat**                        | ✅ Tramite `format: "icu"`           | ✅ Nativo               | ⚠️ Tramite plugin inlang               | ✅ Nativo                        |
| **Formati di contenuto**                     | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ inlang JSON                         | ✅ PO, JSON, CSV                 |
| **Traduzione con IA**                        | ✅ Provider e chiave propri          | ❌ No                   | ❌ No                                  | ❌ No                            |
| **Editor visuale / CMS**                     | ✅ Editor locale + CMS opzionale     | ❌ Piattaforme esterne  | ⚠️ App dell'ecosistema inlang          | ❌ Piattaforme esterne           |
| **Helper SEO (hreflang, sitemap)**           | ✅ Integrati                         | ❌ Manuale              | ⚠️ URL localizzati, resto manuale      | ❌ Manuale                       |
| **Dimensione runtime (gzip, benchmark)**     | 4.5 KB                               | 75.9 KB                 | 1.8 KB                                 | 56.7 KB                          |
| **Perdita, miglior setup (lingua / pagina)** | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                             | 8.6% / 0%                        |
| **Traduzioni mancanti in CI**                | ✅ `npx intlayer test`               | ⚠️ Non integrato        | ⚠️ Non integrato                       | ✅ `lingui compile --strict`     |

> I dati sulle dimensioni del runtime e sulle perdite provengono dal [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md). La perdita viene misurata sulla migliore configurazione di ciascuna libreria.

> Altre guide per TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)

## Pratiche consigliate da seguire

- **Imposta `lang` e `dir` su `<html>`** per l'accessibilità, gli screen reader e i motori di ricerca.
- **Mantieni un URL per ogni lingua.** Usa un prefisso per la lingua (`/fr/about`) anziché un cambio basato solo sui cookie, in modo che ogni pagina tradotta sia scansionabile e condivisibile.
- **Suddividi i messaggi per namespace** (`common`, `home`, `about`) e caricali per route.
- **Carica solo la lingua attiva.** Non importare mai tutti i file di lingua in un modulo inviato al client.
- **Fissa il fuso orario** in `IntlProvider`. Altrimenti le date vengono formattate nel fuso orario del server durante l'SSR e nel fuso orario del visitatore durante l'idratazione, causando discrepanze di idratazione (hydration mismatches).
- **Traduci i tuoi metadati**, e dichiara `canonical`, `hreflang` e `x-default` su ogni pagina.
- **Genera una sitemap multilingue e robots.txt**, ed esegui il pre-rendering di ogni lingua.
- **Usa link reali per il selettore di lingua**, non un menu `<select>`, così i crawler possono scoprire tutte le lingue.
- **Tipizza i tuoi messaggi** in modo che una chiave mancante generi un errore in fase di compilazione.

- [internazionalizzazione e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md)
- [guida a hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md)

## Guida passo dopo passo alla configurazione di use-intl in un'applicazione TanStack Start

Ecco la struttura del progetto che andremo a creare:

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
<Step number={1} title="Installa le dipendenze">

Inizia da un progetto TanStack Start, quindi aggiungi `use-intl`:

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

- **use-intl**: fornisce `IntlProvider`, `useTranslations`, `useFormatter` e `createTranslator` (utilizzabile all'esterno di React, ad esempio in `head()`).

</Step>
<Step number={2} title="Centralizza la configurazione delle lingue">

Crea un'unica fonte di verità per le tue lingue e gli helper URL. Ogni altro file (route, SEO, sitemap, pre-rendering) importerà da qui, rendendo l'aggiunta di una lingua un'operazione di una sola riga.

La lingua predefinita rimane senza prefisso (`/about`), le altre lingue sono precedute da prefisso (`/fr/about`). Questa è la strategia "as-needed": un URL per pagina per lingua e URL brevi per il tuo pubblico principale.

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
<Step number={3} title="Crea i file di traduzione">

Organizza i messaggi per lingua e per namespace. `common` contiene ciò di cui ogni pagina ha bisogno (navigazione, piè di pagina), e ogni pagina ottiene il proprio file, inclusi i relativi metadati.

use-intl utilizza **ICU MessageFormat**, quindi plurali, selezioni e argomenti formattati risiedono direttamente nel messaggio.

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

Crea `home.json` allo stesso modo, con un oggetto `metadata` e il contenuto della pagina.

</Step>
<Step number={4} title="Carica i messaggi per namespace e per lingua">

Questo loader è il file più importante per le prestazioni. `import.meta.glob` indica a Vite di generare **un chunk per ciascun file JSON**. Una route che richiede `["about"]` in francese scarica `messages/fr/about.json` e nient'altro, consentendo al benchmark di raggiungere lo 0% di dispersione per lingua e lo 0% per pagina.

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
<Step number={5} title="Tipizza i tuoi messaggi">

L'estensione del modulo (module augmentation) fornisce l'autocompletamento su `useTranslations("about")` e `t("counter.label")`, oltre a un errore di compilazione su qualsiasi refuso o chiave rimossa.

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

Assicurati che `resolveJsonModule` sia abilitato nel tuo `tsconfig.json`.

</Step>
<Step number={6} title="Crea il documento radice">

La route radice esegue il rendering di `<html>`. Legge il parametro di lingua opzionale per impostare `lang` e `dir`, in modo che gli attributi siano corretti nell'HTML renderizzato dal server, prima che venga eseguito qualsiasi codice JavaScript.

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
<Step number={7} title="Crea la route di layout per la lingua">

La cartella `{-$locale}` crea un segmento di percorso **opzionale**: `/about` e `/fr/about` corrispondono entrambi a `/{-$locale}/about`. Questo layout:

1. Rifiuta i prefissi non supportati (`/xx/about` → 404).
2. Carica il namespace `common` solo per la lingua corrente.
3. Fornisce i messaggi tramite `IntlProvider`.

Il risultato del loader viene serializzato nell'HTML e riutilizzato durante l'idratazione, in modo che il client non scarichi `common.json` una seconda volta. `staleTime: Infinity` lo mantiene nella cache durante le navigazioni lato client.

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

> `IntlProvider` non unisce i messaggi di un provider genitore. Il passaggio successivo aggiunge un piccolo componente che lo fa, in modo che ogni pagina possa aggiungere il proprio namespace sopra `common`.

</Step>
<Step number={8} title="Isola l'ambito dei messaggi di pagina">

Ogni pagina carica il proprio namespace nel rispettivo loader, quindi avvolge il suo contenuto con `ScopedMessages`, che unisce il namespace di pagina con i messaggi del genitore.

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
<Step number={9} title="Utilizza le traduzioni nelle tue pagine">

Il loader di pagina recupera il namespace `about` per la lingua corrente, `head()` crea da esso metadati tradotti e completi per la SEO (vedi passaggio 13), e il componente esegue il rendering del contenuto.

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
<Step number={10} title="Usa traduzioni e formattatori nei componenti">

Qualsiasi componente all'interno dei provider può chiamare `useTranslations` e `useFormatter`. I plurali vengono risolti tramite ICU e i numeri vengono formattati in base alla lingua attiva.

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
<Step number={11} title="Crea un componente di link localizzato" isOptional={true}>

Ogni route risiede sotto `{-$locale}`, quindi un link deve trasmettere il parametro della lingua corrente. Questo wrapper mantiene il `to` tipizzato di TanStack Router e inietta la lingua automaticamente.

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
<Step number={12} title="Cambia la lingua dei tuoi contenuti" isOptional={true}>

Esegui il rendering del selettore come **link**, non come un menu `<select>`. I link sono scansionabili, consentendo ai motori di ricerca di trovare ogni versione linguistica, e funzionano senza JavaScript. `to="."` mantiene la pagina corrente e sostituisce solo il parametro della lingua. Il cookie memorizza la scelta esplicita per il middleware di reindirizzamento del passaggio 16.

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
<Step number={13} title="Internazionalizza i tuoi metadati" isOptional={true}>

È qui che l'i18n ripaga gli sforzi: ogni versione linguistica può posizionarsi autonomamente sui motori di ricerca. Ogni pagina deve esporre:

- un `<title>` e una `description` **tradotti**;
- un URL **canonical** che punta a se stesso (non alla lingua predefinita);
- un **`hreflang` alternativo per lingua**, più **`x-default`** per le lingue senza corrispondenza;
- tag **Open Graph** `og:locale`, `og:locale:alternate` e `og:url`, utilizzati dalle anteprime social;
- **JSON-LD** con `inLanguage`, che aiuta i motori di ricerca e gli assistenti IA ad attribuire la lingua corretta alla pagina.

Un singolo helper genera tutto questo, mantenendo snelle le pagine:

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

Usalo nell'`head()` di ciascuna pagina, come mostrato al passaggio 9. Per la home page, passa `path: "/"`.

</Step>
<Step number={14} title="Internazionalizza la tua sitemap" isOptional={true}>

Una sitemap multilingue elenca **ogni URL di ogni lingua**, e ogni voce dichiara tutti i suoi alternativi con `xhtml:link`. Google usa queste annotazioni esattamente come i tag `hreflang` della pagina, rendendole un valido backup quando una pagina viene scansionata raramente.

Le server route di TanStack Start ti consentono di servirla direttamente da un file route:

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
<Step number={15} title="Internazionalizza il tuo file robots.txt" isOptional={true}>

Le route private esistono in ogni lingua, quindi le regole `Disallow` devono coprire tutti i prefissi. Rimuovi `public/robots.txt` se il template iniziale ne ha creato uno, quindi servilo da una route:

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
<Step number={16} title="Reindirizza i nuovi visitatori alla loro lingua" isOptional={true}>

Un middleware di richiesta invia un visitatore che atterra su `/` alla sua lingua preferita, basandosi prima sul cookie della lingua e poi sull'header `Accept-Language`. Solo `/` viene reindirizzato: i deep link non vengono mai toccati, garantendo che gli URL condivisi e i crawler ricevano sempre la pagina richiesta.

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

> Un visitatore che seleziona esplicitamente l'inglese nel selettore riceve `locale=en` nel cookie, evitando qualsiasi reindirizzamento futuro. In una distribuzione completamente statica (passaggio 18), `/` viene servito come file e questo middleware non viene eseguito, il che è normale: la pagina rimane accessibile e il selettore si occupa del resto.

</Step>
<Step number={17} title="Mantieni l'API di use-intl e riduci il runtime con Intlayer" isOptional={true}>

Il benchmark evidenzia che la parte più pesante di un setup use-intl è il runtime stesso (~76 KB gzip). L'adattatore di compatibilità [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) espone la **stessa API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, plurali ICU, `t.rich`), ma la serve da dizionari Intlayer compilati: **~6.7 KB anziché ~75.9 KB**, 0% di perdita per lingua e 0% per pagina, senza alcuna modifica ai componenti.

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

Il plugin Vite crea un alias da `use-intl` all'adattatore, mantenendo funzionanti tutti gli import esistenti:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

I tuoi file JSON rimangono la fonte di verità grazie al [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md):

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

> L'adattatore rappresenta anche un percorso di migrazione graduale: una volta configurato, puoi convertire i componenti uno per uno all'API nativa `useIntlayer`. Consulta la [guida a Intlayer con TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md).

</Step>
<Step number={18} title="Esegui il pre-rendering di ogni lingua" isOptional={true}>

L'HTML statico garantisce la pagina più veloce da servire e la più semplice da indicizzare. Elenca ogni percorso localizzato in modo che TanStack Start esegua il pre-rendering di tutte le versioni linguistiche in fase di build, oltre ai file della sitemap e di robots:

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

Poiché il selettore di lingua esegue il rendering di link reali, l'opzione `crawlLinks: true` rileva automaticamente anche le pagine dimenticate nell'elenco.

</Step>
<Step number={19} title="Gestisci le pagine 404 localizzate" isOptional={true}>

Il layout del passaggio 7 lancia già `notFound()` per prefissi di lingua sconosciuti. Aggiungi una route generica (catch-all) in modo che i percorsi sconosciuti all'interno di una lingua mostrino comunque il 404 localizzato, e contrassegnalo con `noindex`: React 19 sposta automaticamente il tag `<meta>` dentro `<head>`.

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
<Step number={20} title="Accedi alla lingua nelle funzioni server" isOptional={true}>

Le funzioni server non ricevono i parametri della route. Leggi il cookie della lingua e usa come fallback l'header `Accept-Language` per inviare email localizzate o salvare le preferenze dell'utente:

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

Per tradurre all'interno della funzione server, combinala con `loadMessages` e `createTranslator` di `use-intl`.

</Step>
<Step number={21} title="Automatizza le tue traduzioni usando Intlayer" isOptional={true}>

use-intl gestisce il rendering delle traduzioni, ma non ti aiuta a **produrle**. Intlayer è **gratuito** e **open source**, e colma questa lacuna anche se decidi di mantenere use-intl:

- **Testa le traduzioni mancanti** in CI o nei test unitari. Vedi [testare le traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md).
- **Traduci con l'IA** usando la tua chiave API e il tuo provider preferito: `npx intlayer fill` traduce le chiavi mancanti con il contesto della tua applicazione. Vedi [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md) e la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).
- **Mantieni i tuoi file JSON** come fonte di verità grazie al [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md).
- **Modifica i contenuti visivamente** con l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) e il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md), consentendo a chi non è sviluppatore di aggiornare le traduzioni.
- **Fornisci contesto al tuo agente IA** con il [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md) e le [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md).
- **Scansiona il tuo sito distribuito** alla ricerca di `hreflang` mancanti, canonical errati e perdite di lingua con il [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/scan.md).

Per scoprire tutte le funzionalità, consulta [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md).

</Step>
</Steps>

## Domande frequenti

<FAQ>

<Question title="use-intl è una buona scelta per TanStack Start?">

Sì, se desideri l'API di `next-intl` al di fuori di Next.js. Offre messaggi ICU, formattatori e un buon supporto TypeScript, evitando vincoli specifici di Next.js come `setRequestLocale`. Il compromesso riguarda il peso: il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) misura ~76 KB gzip per il runtime, e una configurazione superficiale invia ogni lingua e ogni pagina al browser. Carica i namespace per route e per lingua, come illustrato in questa guida, per evitare dispersioni.

</Question>
<Question title="Qual è la differenza tra use-intl e next-intl?">

`use-intl` è il core di `next-intl`. `next-intl` vi aggiunge sopra integrazioni specifiche per Next.js: un middleware, helper di navigazione, `getTranslations` per Server Components e configurazione delle richieste. Su TanStack Start utilizzi direttamente `use-intl` e implementi il routing con TanStack Router, come mostrato in precedenza.

</Question>
<Question title="Dovrei usare un prefisso di lingua o un cookie per memorizzare la lingua?">

Usa un prefisso nell'URL. In questo modo ogni versione linguistica dispone di un proprio URL indicizzabile dai motori di ricerca e condivisibile dagli utenti. Un cookie rimane comunque utile per memorizzare una scelta esplicita, che è quanto gestito dal middleware di reindirizzamento del passaggio 16.

</Question>
<Question title="Perché si verificano discrepanze di idratazione (hydration mismatches) quando formatto le date?">

Il server e il browser formattano le date in fusi orari differenti. Passa un `timeZone` esplicito a `IntlProvider` (o il fuso orario del visitatore memorizzato in un cookie), in modo che entrambi i lati producano lo stesso testo.

</Question>
<Question title="Come posso ridurre le dimensioni del bundle di use-intl?">

Innanzitutto, suddividi i messaggi per namespace e caricali per route e per lingua con `import.meta.glob`, eliminando le dispersioni per lingua e pagina. Se poi la dimensione del runtime è critica, passa all'adattatore [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md): medesima API, ~6.7 KB invece di ~75.9 KB nel benchmark.

</Question>
<Question title="Come posso tradurre il titolo e la meta descrizione con use-intl?">

Chiama `createTranslator` all'interno della funzione `head()` della route passando i messaggi restituiti dal loader della route, quindi restituisci `title`, `description`, link canonici e link `hreflang`. Il passaggio 13 fornisce un helper riutilizzabile.

</Question>
<Question title="Posso migrare da use-intl a Intlayer progressivamente?">

Sì. Installa prima l'adattatore di compatibilità (passaggio 17): i tuoi componenti continueranno a chiamare `useTranslations`, ora supportato da Intlayer. Successivamente, migra i componenti uno alla volta a `useIntlayer` e dichiara i contenuti accanto ad essi. Consulta gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) e la [guida a Intlayer con TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md).

</Question>

</FAQ>
