---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n con Lingui: Guida completa alla configurazione 2026"
description: "Traduci la tua app TanStack Start con Lingui: macro, cataloghi PO, SSR, routing delle lingue, hreflang, sitemap e robots.txt, oltre a dati reali di benchmark sulle dimensioni del bundle."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Internazionalizzazione
  - i18n
  - SEO
  - File PO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versione iniziale"
author: aymericzip
---

# Come internazionalizzare la tua applicazione TanStack Start usando Lingui nel 2026

## Indice

<TOC/>

## Cos'è Lingui?

**Lingui** è una libreria di i18n costruita attorno a **macro** ed **estrazione dei messaggi**. Scrivi il testo sorgente direttamente nei tuoi componenti (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` raccoglie ogni messaggio nei cataloghi (file PO per impostazione predefinita), i traduttori li compilano e il plugin Vite li compila in JavaScript compatto. I messaggi utilizzano ICU MessageFormat, quindi i plurali e i select sono supportati.

TanStack Start non include un livello di i18n integrato, quindi questa guida integra Lingui da zero:

- **Macro compilate da Babel** tramite `@rolldown/plugin-babel` (necessario con `@vitejs/plugin-react` v6 e Vite 8).
- **Routing delle lingue** con un segmento opzionale `{-$locale}` (`/about`, `/fr/about`).
- **Un catalogo per lingua, caricato su richiesta**, e un'istanza `I18n` per ogni render in modo che le richieste SSR simultanee non condividano mai una lingua.
- **SEO multilingue completo**: `<title>` e descrizione tradotti, URL canonico, `hreflang` con `x-default`, impostazioni locali Open Graph, JSON-LD, sitemap, `robots.txt`, pre-rendering e pagine 404 localizzate.

> Cerchi un altro stack?

- [guida a TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_use-intl.md)
- [guida a TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_paraglide.md)
- [guida a TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)

> Usi Next.js?

- [guida a Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_nextjs_lingui.md)

> Vuoi confrontare le librerie?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer.md)

> Per capire da dove vengono queste librerie, leggi la storia dell'i18n in JavaScript.

- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)

## Cosa dice il benchmark su Lingui in TanStack Start

Il [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) esegue la stessa applicazione TanStack Start con 10 pagine e 10 lingue con tutte le principali librerie e misura ciò che il browser scarica effettivamente.

- [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Dati principali per `@lingui/core@6.6.0`, misurati il 2026-09-26 (gzip):

| Configurazione                          | Dimensione libreria | JS per pagina | Perdita altre lingue | Perdita altre pagine |
| :-------------------------------------- | ------------------: | ------------: | -------------------: | -------------------: |
| Nessuna i18n (app base)                 |                   - |      111.0 KB |                   0% |                   0% |
| Lingui (configurazione di questa guida) |             56.7 KB |      115.2 KB |                 9.3% |                   0% |
| `@intlayer/lingui` (compat)             |              9.8 KB |      136.7 KB |                 9.9% |                   0% |
| `react-intlayer` (Intlayer nativo)      |              4.5 KB |      126.8 KB |                   0% |                   0% |

Cosa tenere a mente:

- **Carica un solo catalogo per lingua, su richiesta.** In questo modo le pagine mantengono una dimensione vicina a quella dell'app di base.
- **Il runtime rimane pesante** (~57 KB gzip). L'adattatore di compatibilità `@intlayer/lingui` (passaggio 16) mantiene le tue macro e riduce il runtime a ~10 KB.

> Consulta i dati completi: [report di benchmark su TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) e il [repository del benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [report di benchmark su TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)

## Confronto delle funzionalità su TanStack Start

Come si posiziona Lingui rispetto alle altre librerie comunemente utilizzate su TanStack Start:

| Funzionalità                                           | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                           | Lingui                           |
| ------------------------------------------------------ | ------------------------------------ | ----------------------- | -------------------------------------- | -------------------------------- |
| **Traduzioni vicine ai componenti**                    | ✅ Colocate                          | ❌ JSON centralizzato   | ❌ Un file JSON per lingua             | ⚠️ Testo sorgente nei componenti |
| **Integrazione TypeScript**                            | ✅ Tipi generati automaticamente     | ✅ Tramite `AppConfig`  | ✅ Funzioni messaggio tipizzate        | ⚠️ Solo macro                    |
| **Rilevamento traduzioni mancanti**                    | ✅ Errori di tipo e avvisi di build  | ⚠️ Fallback a runtime   | ⚠️ Fallback alla lingua di base        | ⚠️ Fallback al testo sorgente    |
| **Contenuto ricco (JSX, Markdown)**                    | ✅ Supporto diretto                  | ⚠️ Tag tramite `t.rich` | ⚠️ Stringhe                            | ✅ JSX dentro `<Trans>`          |
| **Routing localizzato**                                | ✅ Integrato                         | ❌ `{-$locale}` manuale | ✅ `urlPatterns` + riscrittura router  | ❌ `{-$locale}` manuale          |
| **Cambio lingua senza ricaricamento**                  | ✅ Sì                                | ✅ Sì                   | ❌ Ricaricamento completo della pagina | ✅ Sì                            |
| **Pluralizzazione**                                    | ✅ Basata su enumerazione            | ✅ ICU                  | ✅ Varianti                            | ✅ ICU                           |
| **ICU MessageFormat**                                  | ✅ Tramite `format: "icu"`           | ✅ Nativo               | ⚠️ Tramite plugin inlang               | ✅ Nativo                        |
| **Formati di contenuto**                               | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ inlang JSON                         | ✅ PO, JSON, CSV                 |
| **Traduzione AI**                                      | ✅ Provider e chiave personali       | ❌ No                   | ❌ No                                  | ❌ No                            |
| **Editor visuale / CMS**                               | ✅ Editor locale + CMS opzionale     | ❌ Piattaforme esterne  | ⚠️ App dell'ecosistema inlang          | ❌ Piattaforme esterne           |
| **Helper SEO (hreflang, sitemap)**                     | ✅ Integrati                         | ❌ Manuale              | ⚠️ URL localizzati, resto manuale      | ❌ Manuale                       |
| **Dimensione runtime (gzip, benchmark)**               | 4.5 KB                               | 75.9 KB                 | 1.8 KB                                 | 56.7 KB                          |
| **Perdita, migliore configurazione (lingua / pagina)** | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                             | 8.6% / 0%                        |
| **Traduzioni mancanti in CI**                          | ✅ `npx intlayer test`               | ⚠️ Non integrato        | ⚠️ Non integrato                       | ✅ `lingui compile --strict`     |

> Le dimensioni del runtime e i dati di perdita provengono dal [benchmark di TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md). La perdita è misurata sulla migliore configurazione di ciascuna libreria.

- [benchmark di TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)

> Altre guide su TanStack Start:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)

## Buone pratiche da seguire

- **Imposta `lang` e `dir` su `<html>`** a partire dalla lingua della rotta, in modo che siano corretti nell'HTML del server.
- **Mantieni un URL per lingua** con un prefisso, in modo che ogni versione linguistica sia indicizzabile.
- **Crea un'istanza `I18n` per lingua**, non modificare mai un'istanza globale durante l'SSR: due richieste simultanee sovrascriverebbero a vicenda la propria lingua.
- **Carica solo il catalogo attivo**, non importare mai tutti i cataloghi nel codice client.
- **Scegli uno stile di macro** (`useLingui` + `t` nei componenti, `msg` per descrittori lazy) e mantienilo con coerenza. Mescolare `t`, `i18n._`, `i18n.t` e `<Trans>` rende il codice più difficile da leggere per le persone e gli assistenti AI.
- **Esegui `lingui extract` nella CI** in modo che nessun nuovo messaggio venga rilasciato non tradotto.
- **Traduci i tuoi metadati** e dichiara `canonical`, `hreflang` e `x-default` su ogni pagina.
- **Genera una sitemap multilingue e robots.txt**, e pre-renderizza ogni lingua.
- **Usa link reali per il selettore di lingua**, in modo che i crawler scoprano ogni lingua.

- [internazionalizzazione e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md)
- [guida a hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md)

## Guida passo dopo passo per configurare Lingui in un'applicazione TanStack Start

Ecco la struttura del progetto che creeremo:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generato da `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Middleware di richiesta (reindirizzamento lingua)
    ├── i18n
    │   ├── config.ts           # Lingue, helper URL
    │   ├── lingui.ts           # Caricatore cataloghi, istanze I18n
    │   ├── negotiateLocale.ts  # Parsing di Accept-Language
    │   └── seo.ts              # Costruttore di head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Layout lingua + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # 404 localizzato
```

<Steps>
<Step number={1} title="Installa le dipendenze">

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

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider` e le macro (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: `lingui extract` per raccogliere i messaggi nei cataloghi.
- **@lingui/vite-plugin**: compila i cataloghi `.po` all'importazione, eliminando la necessità di `lingui compile`.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: trasformano le macro in fase di compilazione.

</Step>
<Step number={2} title="Centralizza la configurazione delle lingue">

La lingua predefinita rimane senza prefisso (`/about`), le altre lingue hanno un prefisso (`/fr/about`).

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
<Step number={3} title="Configura Lingui">

La configurazione di Lingui riutilizza lo stesso elenco di lingue, in modo che i cataloghi, il router e la sitemap non siano mai in disaccordo.

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

Aggiungi gli script di estrazione:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` fallisce nella CI quando un componente contiene un messaggio che non è stato estratto e committato.

</Step>
<Step number={4} title="Configura Vite">

Con `@vitejs/plugin-react` v6, Babel non è più integrato. `@rolldown/plugin-babel` esegue il plugin macro di Lingui e `linguiTransformerBabelPreset` elabora solo i file che importano una macro, mantenendo le build veloci.

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
<Step number={5} title="Carica i cataloghi per lingua">

Il template literal in `import()` consente a Vite di emettere **un chunk per catalogo** e il plugin Lingui vi compila il file `.po`. Un visitatore francese scarica esclusivamente il catalogo francese.

I messaggi compilati sono dati semplici, quindi possono essere restituiti da un loader di rotta, serializzati nell'HTML e riutilizzati durante l'idratazione.

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

Affinché TypeScript accetti l'importazione dei file `.po`, dichiara il modulo una volta:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Crea il documento radice">

La rotta radice legge il parametro opzionale della lingua per impostare `lang` e `dir` sull'elemento `<html>` renderizzato dal server.

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
<Step number={7} title="Crea la rotta di layout per le lingue">

La cartella `{-$locale}` crea un segmento di percorso opzionale: `/about` e `/fr/about` corrispondono entrambi a `/{-$locale}/about`. Il layout rifiuta i prefissi sconosciuti, carica il catalogo della lingua corrente e fornisce un'istanza `I18n` dedicata.

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
<Step number={8} title="Utilizza le traduzioni nelle tue pagine">

Scrivi il testo sorgente nel componente. Le macro lo trasformano in ID di messaggio in fase di compilazione e `lingui extract` lo individua.

- `<Trans>` per contenuti JSX, inclusi elementi nidificati;
- `useLingui().t` per stringhe (attributi, props);
- `<Plural>` per i plurali ICU.

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

> L'`import()` dinamico di un catalogo viene memorizzato nella cache dal sistema di moduli, quindi chiamare `loadI18n` in diversi loader non scarica il catalogo due volte.

</Step>
<Step number={9} title="Estrai e traduci i tuoi messaggi">

Esegui l'estrazione. Lingui scrive ogni messaggio nel catalogo di ciascuna lingua:

```bash
npm run i18n:extract
```

Poi traduci il `msgstr` di ciascuna voce:

<Tabs group="locale">
 <Tab value='fr' label='Francese'>

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
 <Tab value='es' label='Spagnolo'>

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

> Per impostazione predefinita, gli ID dei messaggi sono hash del testo sorgente: la modifica del testo inglese crea un nuovo messaggio. Usa ID espliciti (`<Trans id="about.title">About us</Trans>`) per i testi che cambiano spesso.

</Step>
<Step number={10} title="Crea un componente di link localizzato" isOptional={true}>

Ogni rotta si trova sotto `{-$locale}`, quindi i link devono includere il parametro della lingua corrente.

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
<Step number={11} title="Cambia la lingua dei tuoi contenuti" isOptional={true}>

Renderizza il selettore sotto forma di **link**, in modo che i crawler trovino ogni versione linguistica. `to="."` mantiene la pagina corrente e sostituisce il parametro della lingua. Il loader del layout della lingua recupera quindi il nuovo catalogo.

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
<Step number={12} title="Internazionalizza i tuoi metadati" isOptional={true}>

Ciascuna versione linguistica può posizionarsi autonomamente sui motori di ricerca, a condizione che ogni pagina fornisca un `<title>` e una descrizione tradotti, un canonico autoreferenziale, un `hreflang` per lingua più `x-default`, impostazioni locali Open Graph e JSON-LD con `inLanguage`. I metadati vengono tradotti nel loader (passaggio 8) e questo helper costruisce il resto:

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
<Step number={13} title="Internazionalizza la sitemap e robots.txt" isOptional={true}>

La sitemap elenca ogni URL di ogni lingua e ciascuna voce dichiara tutti i suoi alternativi con `xhtml:link`. `robots.txt` blocca le rotte private in ogni lingua e punta alla sitemap. Rimuovi `public/robots.txt` se lo starter ne ha creato uno.

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
<Step number={14} title="Pre-renderizza ogni lingua" isOptional={true}>

Elenca tutti i percorsi localizzati in modo che TanStack Start pre-renderizzi tutte le versioni linguistiche in fase di build:

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
<Step number={15} title="Reindirizza i visitatori alla prima visita e gestisci le pagine 404" isOptional={true}>

Un middleware di richiesta invia un visitatore che atterra su `/` alla sua lingua preferita (prima il cookie, poi `Accept-Language`). I deep link non vengono mai reindirizzati, in modo che i crawler e gli URL condivisi ricevano sempre la pagina richiesta.

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

Per le pagine 404, una rotta catch-all renderizza il componente `notFoundComponent` localizzato del layout. Contrassegnalo con `noindex`: React 19 sposta automaticamente il `<meta>` nell'`<head>`.

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
<Step number={16} title="Mantieni le tue macro e riduci il runtime con Intlayer" isOptional={true}>

L'adattatore di compatibilità [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md) mantiene il codice sorgente intatto: le macro compilano esattamente come prima e le chiamate risultanti a `i18n._()`, `useLingui()` e `<Trans>` vengono gestite dai dizionari compilati di Intlayer. Nel benchmark, la dimensione del runtime scende da **~56.7 KB a ~9.8 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md)

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

Aggiungi il plugin dopo la trasformazione delle macro, in modo che crei gli alias di `@lingui/core` e `@lingui/react` verso l'adattatore:

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

I cataloghi vengono sincronizzati con il [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) (cataloghi JSON) o il [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) (cataloghi PO). Consulta la configurazione completa nella [guida alla compatibilità con Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md) e un confronto dettagliato in [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer-lingui.md).

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md)
- [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md)
- [guida alla compatibilità con Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/lingui_vs_intlayer-lingui.md)

</Step>
<Step number={17} title="Automatizza le tue traduzioni con Intlayer" isOptional={true}>

Lingui estrae i messaggi, ma compilare a mano dozzine di cataloghi richiede la maggior parte del tempo. Intlayer è **gratuito** e **open source**, e i suoi strumenti funzionano perfettamente a fianco di Lingui:

- **Traduci con l'AI** usando la tua chiave API e il tuo provider. Consulta [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md) e la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).
- **Mantieni i tuoi file PO** come unica fonte di verità con il [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md).
- **Verifica le traduzioni mancanti** nella CI. Consulta [testare le tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md).
- **Esegui un audit del sito distribuito** per individuare `hreflang` mancanti, canonical errati e perdite di lingue con il [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/scan.md).

</Step>
</Steps>

## Domande frequenti

<FAQ>

<Question title="Lingui funziona con TanStack Start?">

Sì. Lingui non dispone di un'integrazione dedicata per TanStack Start, ma il suo plugin Vite e il plugin macro Babel funzionano così come sono. I due aspetti chiave da configurare correttamente sono l'esecuzione delle macro tramite `@rolldown/plugin-babel` (Vite 8 e `@vitejs/plugin-react` v6 non includono più Babel) e la creazione di un'istanza `I18n` per ciascuna lingua anziché attivarne una globale durante l'SSR.

</Question>
<Question title="Perché non usare l'oggetto globale i18n di @lingui/core?">

Sul server, un singolo processo renderizza molte richieste contemporaneamente. Chiamare `i18n.activate("fr")` su un oggetto condiviso cambierebbe la lingua di un'altra richiesta renderizzata in inglese in parallelo. `setupI18n` crea un'istanza isolata per ogni lingua, garantendo la sicurezza concorrente.

</Question>
<Question title="È necessario eseguire lingui compile?">

No. `@lingui/vite-plugin` compila i cataloghi `.po` al momento dell'importazione. Devi solo eseguire `lingui extract` per raccogliere i nuovi messaggi.

</Question>
<Question title="Come faccio a tradurre il titolo della pagina e la meta descrizione con Lingui?">

Dichiarali con la macro `msg` e traducili nel loader della rotta con ``i18n._(msg`...`)``. Il loader restituisce stringhe semplici, quindi `head()` rimane sincrono e i valori vengono serializzati per l'idratazione. Il passaggio 8 e il passaggio 12 mostrano la configurazione completa.

</Question>
<Question title="Quanto pesa Lingui in un bundle TanStack Start?">

Il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) misura circa 56.7 KB gzip per il runtime. Con un catalogo per lingua caricato su richiesta, le pagine pesano circa 115 KB rispetto a 111 KB senza i18n. L'importazione statica di tutti i cataloghi aumenta il peso a circa 152 KB.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md)

</Question>
<Question title="Posso mantenere le macro di Lingui e migrare a Intlayer?">

Sì. L'adattatore [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md) mantiene le macro e sostituisce il runtime. Puoi quindi migrare i componenti a `useIntlayer` uno alla volta. Consulta gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/lingui.md)
- [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md)

</Question>

</FAQ>
