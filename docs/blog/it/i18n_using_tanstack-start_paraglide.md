---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n con Paraglide JS: Guida alla configurazione 2026"
description: "Traduci la tua app TanStack Start con Paraglide JS: strategia URL, riscrittura del router, middleware SSR, hreflang, sitemap e robots.txt, oltre a dati reali di benchmark."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Internazionalizzazione
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
    changes: "Versione iniziale"
author: aymericzip
---

# Come internazionalizzare la tua applicazione TanStack Start usando Paraglide JS nel 2026

## Indice dei contenuti

<TOC/>

## Cos'è Paraglide JS?

**Paraglide JS** (di inlang) è una libreria i18n **basata su compilatore**. Invece di distribuire un runtime che cerca le chiavi in un oggetto JSON, compila ogni messaggio in una funzione JavaScript tipizzata (`m.about_title()`). I messaggi non utilizzati possono essere rimossi dal bundler (tree-shaking), e un refuso in una chiave diventa un errore di compilazione.

Paraglide è l'approccio i18n utilizzato negli esempi ufficiali di TanStack Router, e si integra con TanStack Start attraverso tre elementi:

- un **plugin Vite** che compila i messaggi e il runtime in `src/paraglide`;
- un **middleware server** che risolve la lingua di ogni richiesta;
- una **riscrittura del router** che mappa gli URL localizzati (`/fr/about`) al tuo albero delle route (`/about`), eliminando la necessità di un segmento `$locale`.

Questa guida configura tutti e tre questi aspetti, per poi trattare tutto ciò che Paraglide lascia a te: `lang` e `dir`, selettore di lingua, metadati tradotti, `canonical`, `hreflang` con `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, pre-rendering e pagine 404 localizzate.

> Cerchi un altro stack?

- [guida TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_use-intl.md)
- [guida TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_lingui.md)
- [guida TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)

> Vuoi confrontare i due approcci basati su compilatore? Leggi [Intlayer è più leggero di Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/is_intlayer_lighter_than_paraglide.md).

> Per capire da dove vengono queste librerie, leggi la storia dell'i18n in JavaScript.

- [La storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md)

## Cosa dice il benchmark su Paraglide con TanStack Start

Il [benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) esegue la stessa app TanStack Start di 10 pagine e 10 lingue con ciascuna delle principali librerie e misura ciò che il browser scarica effettivamente.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Dati principali per `@inlang/paraglide-js@2.15.1`, misurati il 26-09-2026 (gzip):

| Configurazione          | Dimensione libreria | JS per pagina | Perdita altre lingue | Perdita altre pagine | Caricamento pagina |
| :---------------------- | ------------------: | ------------: | -------------------: | -------------------: | -----------------: |
| Nessuna i18n (app base) |                   - |      111.0 KB |                   0% |                   0% |            15.7 ms |
| Paraglide JS            |              1.8 KB |      125.1 KB |                49.7% |                   0% |            22.1 ms |
| `react-intlayer`        |              4.5 KB |      126.8 KB |                   0% |                   0% |            14.8 ms |
| `use-intl`              |             75.9 KB |      128.7 KB |                   0% |                   0% |            17.4 ms |
| Lingui                  |             56.7 KB |      120.2 KB |                 8.6% |                   0% |            21.9 ms |

Punti chiave da considerare:

- **Il runtime è minuscolo e le pagine non hanno perdite.** Il runtime viene generato in base alla tua configurazione e i messaggi vengono importati solo dove vengono utilizzati.
- **Le lingue non utilizzate trapelano (leak).** Ciascuna funzione di messaggio contiene tutte le lingue, quindi circa la metà delle stringhe tradotte inviate a una pagina appartiene a lingue che il visitatore non usa. Più lingue aggiungi, maggiore diventa questa quota.
- **Il caricamento della pagina è il più lento del gruppo**, in parte perché la lingua viene risolta tramite strategie a ogni chiamata anziché essere letta da un contesto React.

> Consulta i dati completi: [Report del benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) e il [repository del benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Confronto delle funzionalità su TanStack Start

Come si confronta Paraglide JS con le altre librerie comunemente utilizzate su TanStack Start:

| Funzionalità                          | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                      | Lingui                           |
| ------------------------------------- | ------------------------------------ | ----------------------- | --------------------------------- | -------------------------------- |
| **Traduzioni vicino ai componenti**   | ✅ Co-locate                         | ❌ JSON centralizzato   | ❌ Un file JSON per lingua        | ⚠️ Testo sorgente nei componenti |
| **Integrazione TypeScript**           | ✅ Tipi generati automaticamente     | ✅ Tramite `AppConfig`  | ✅ Funzioni messaggio tipizzate   | ⚠️ Solo macro                    |
| **Rilevamento traduzioni mancanti**   | ✅ Errori di tipo e avvisi di build  | ⚠️ Fallback a runtime   | ⚠️ Fallback alla lingua di base   | ⚠️ Fallback al testo sorgente    |
| **Contenuto ricco (JSX, Markdown)**   | ✅ Supporto diretto                  | ⚠️ Tag tramite `t.rich` | ⚠️ Stringhe                       | ✅ JSX dentro `<Trans>`          |
| **Routing localizzato**               | ✅ Integrato                         | ❌ Manuale `{-$locale}` | ✅ `urlPatterns` + rewrite router | ❌ Manuale `{-$locale}`          |
| **Cambio lingua senza ricaricamento** | ✅ Sì                                | ✅ Sì                   | ❌ Ricaricamento completo pagina  | ✅ Sì                            |
| **Pluralizzazione**                   | ✅ Basata su enumerazione            | ✅ ICU                  | ✅ Varianti                       | ✅ ICU                           |
| **ICU MessageFormat**                 | ✅ Tramite `format: "icu"`           | ✅ Nativo               | ⚠️ Tramite plugin inlang          | ✅ Nativo                        |
| **Formati di contenuto**              | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ JSON inlang                    | ✅ PO, JSON, CSV                 |
| **Traduzione con IA**                 | ✅ Provider e chiave propri          | ❌ No                   | ❌ No                             | ❌ No                            |
| **Editor visuale / CMS**              | ✅ Editor locale + CMS opzionale     | ❌ Piattaforme esterne  | ⚠️ App ecosistema inlang          | ❌ Piattaforme esterne           |
| **Helper SEO (hreflang, sitemap)**    | ✅ Integrati                         | ❌ Manuale              | ⚠️ URL localizzati, resto manuale | ❌ Manuale                       |
| **Dimensione runtime (gzip, bench)**  | 4.5 KB                               | 75.9 KB                 | 1.8 KB                            | 56.7 KB                          |
| **Leak, miglior setup (lingua/pag)**  | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                        | 8.6% / 0%                        |
| **Traduzioni mancanti in CI**         | ✅ `npx intlayer test`               | ⚠️ Non integrato        | ⚠️ Non integrato                  | ✅ `lingui compile --strict`     |

> Le dimensioni del runtime e i dati di leak provengono dal [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md). Il leak è misurato sulla migliore configurazione di ciascuna libreria.

> Altre guide su TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)

## Buone pratiche da seguire

- **Imposta `lang` e `dir` su `<html>`** dalla lingua risolta, sul server.
- **Mantieni un URL per lingua** con una strategia a prefisso (`/fr/about`), in modo che ogni versione linguistica sia indicizzabile.
- **Metti `url` al primo posto nella strategia della lingua**, così l'URL è l'unica fonte di verità e i crawler ottengono la pagina richiesta.
- **Usa chiavi di messaggio piatte e descrittive** (`about_title`) che si mappano chiaramente ai nomi delle funzioni.
- **Effettua il commit dei tuoi file `messages/*.json`, non della cartella generata `src/paraglide`**, per evitare conflitti di merge sui file generati.
- **Traduci i metadati** e dichiara `canonical`, `hreflang` e `x-default` su ogni pagina.
- **Genera una sitemap multilingue e robots.txt**, ed esegui il pre-rendering di ogni lingua.
- **Usa veri link per il selettore di lingua**, così i crawler scoprono tutte le lingue.

- [internazionalizzazione e SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md)
- [guida hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/hreflang_guide_multilingual_seo.md)

## Guida passo-passo per configurare Paraglide JS in un'applicazione TanStack Start

Ecco la struttura del progetto che creeremo:

```bash
.
├── project.inlang
│   └── settings.json          # Lingue e formato dei messaggi
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generato, ignorato da git
    ├── server.ts              # Middleware Paraglide
    ├── router.tsx             # Riscrittura URL
    ├── i18n
    │   ├── config.ts          # URL del sito, helper
    │   └── seo.ts             # Builder per head()
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / e /fr
        ├── about.tsx          # /about e /fr/about
        ├── $.tsx              # 404 localizzato
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Nota che non c'è alcuna cartella `$locale`: la riscrittura del router rimuove il prefisso prima della corrispondenza delle route.

<Steps>
<Step number={1} title="Installa le dipendenze">

Inizia da un progetto TanStack Start, quindi inizializza Paraglide. Il comando init crea `project.inlang/settings.json`, un primo file `messages/en.json` e installa il pacchetto.

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

- **@inlang/paraglide-js**: il compilatore e il relativo plugin Vite. Non c'è alcun pacchetto runtime da installare: il runtime viene generato direttamente nel tuo progetto.

</Step>
<Step number={2} title="Configura le tue lingue">

`project.inlang/settings.json` è l'unica fonte di verità per le lingue. Il plugin del formato dei messaggi legge un file JSON per ciascuna lingua.

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
<Step number={3} title="Configura il plugin Vite e la strategia URL">

Il plugin compila i messaggi a ogni modifica. Tre opzioni sono importanti per TanStack Start:

- **`strategy`**: l'elenco ordinato dei punti da cui leggere la lingua. `url` per primo rende l'URL l'unica fonte di verità. `cookie` e `preferredLanguage` vengono utilizzati dal middleware quando l'URL non specifica una lingua.
- **`urlPatterns`**: come una lingua viene mappata a un URL. Le lingue non predefinite sono elencate per prime, poiché il primo pattern corrispondente ha la precedenza. Qui la lingua predefinita rimane senza prefisso (`/about`), mentre le altre lingue ricevono il prefisso (`/fr/about`).
- **`outputStructure: "message-modules"`**: un modulo per messaggio, che consente al bundler di escludere i messaggi non importati da una pagina.

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

Aggiungi la cartella generata a `.gitignore`. Viene ricreata sia durante `dev` che durante `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Crea i file di traduzione">

Ogni chiave diventa una funzione esportata da `src/paraglide/messages`. Chiavi piatte in snake_case producono i nomi di funzione più puliti. Le variabili usano segnaposto `{name}`.

<Tabs group="locale">
 <Tab value='en' label='Inglese'>

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
 <Tab value='fr' label='Francese'>

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

I plurali utilizzano la sintassi delle varianti del formato messaggi inlang:

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
<Step number={5} title="Aggiungi il middleware server">

Il middleware risolve la lingua di ogni richiesta tramite la tua strategia e la rende disponibile a `getLocale()` per l'intero rendering sul server, attraverso uno scope `AsyncLocalStorage`. Questo rende sicure le richieste simultanee in lingue diverse.

In TanStack Start, racchiudi l'entry server predefinito:

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
<Step number={6} title="Riscrivi gli URL localizzati nel router">

L'opzione `rewrite` di TanStack Router traduce gli URL ai confini del router:

- **input**: `/fr/about` viene de-localizzato in `/about` prima del matching delle route, consentendo a una singola route `about.tsx` di servire ogni lingua;
- **output**: ogni `href` generato (link, reindirizzamenti, navigazione) viene localizzato per la lingua attiva, così `<Link to="/about">` renderizza `/fr/about` su una pagina francese.

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

> Poiché i link vengono localizzati dalla riscrittura, non serve un componente personalizzato `LocalizedLink`: usa il componente `Link` standard di TanStack Router.

</Step>
<Step number={7} title="Crea il documento root">

`getLocale()` restituisce la lingua risolta dal middleware sul server e la lingua dall'URL nel browser, garantendo che `lang` e `dir` siano identici sia nell'HTML del server che dopo l'idratazione.

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
<Step number={8} title="Utilizza le traduzioni nelle tue pagine">

I messaggi sono semplici funzioni: importa `m`, chiama la funzione e passa le variabili come oggetto. Tutto è tipizzato, incluse le variabili.

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

> Una funzione di messaggio accetta anche una lingua esplicita: `m.about_title({}, { locale: "fr" })`. Questo è utile nel codice server che genera una lingua diversa da quella della richiesta, come per le email.

</Step>
<Step number={9} title="Cambia la lingua dei tuoi contenuti" isOptional={true}>

Renderizza il selettore come **link** con `localizeHref`, in modo che i crawler scoprano tutte le lingue. `setLocale` memorizza la scelta nel cookie e ricarica la pagina nella nuova lingua: un ricaricamento completo è il comportamento previsto in Paraglide, poiché le funzioni di messaggio leggono la lingua a ogni chiamata anziché sottoscriversi a uno stato React.

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
<Step number={10} title="Internazionalizza i tuoi metadati" isOptional={true}>

Ogni versione linguistica può posizionarsi autonomamente sui motori di ricerca, a patto che ogni pagina esponga:

- un `<title>` e una `description` **tradotti**;
- un URL **canonical** che punta a se stesso;
- un alternativo **`hreflang` per ogni lingua**, più **`x-default`**;
- tag **Open Graph** `og:locale`, `og:locale:alternate` e `og:url`;
- **JSON-LD** con `inLanguage`.

`localizeUrl` di Paraglide crea gli URL alternativi a partire dai tuoi `urlPatterns`, evitando qualsiasi discrepanza con il routing reale:

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
<Step number={11} title="Internazionalizza la tua sitemap" isOptional={true}>

Una sitemap multilingue elenca ogni URL per ogni lingua, e ogni voce dichiara tutti i suoi alternativi tramite `xhtml:link`:

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
<Step number={12} title="Internazionalizza il tuo robots.txt" isOptional={true}>

Le route private esistono in tutte le lingue, pertanto le regole `Disallow` devono coprire ogni percorso localizzato. Rimuovi `public/robots.txt` se il template iniziale ne ha creato uno, quindi servilo da una route:

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
<Step number={13} title="Esegui il pre-rendering di ogni lingua" isOptional={true}>

Elenca il percorso localizzato di ciascuna pagina in modo che TanStack Start effettui il pre-rendering di tutte le versioni linguistiche. `localizeHref` è codice generato privo di dipendenze dal browser, quindi può essere eseguito in `vite.config.ts`, ma il file esiste solo dopo una prima compilazione. Elencare i percorsi manualmente, come illustrato sotto, evita questo problema di ordine di esecuzione:

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

Poiché il selettore renderizza link reali, `crawlLinks: true` individua anche le pagine che potresti aver dimenticato di elencare.

</Step>
<Step number={14} title="Gestisci pagine 404 localizzate" isOptional={true}>

Con la riscrittura, `/fr/does-not-exist` viene mappato come `/does-not-exist`, e `getLocale()` restituisce comunque `fr`, quindi il `notFoundComponent` root del passaggio 7 renderizza in francese. Una route catch-all garantisce che anche i percorsi profondi raggiungano questa logica. Contrassegna la pagina con `noindex`: React 19 sposta automaticamente il `<meta>` nell'`<head>`.

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
<Step number={15} title="Accedi alla lingua nelle Server Function" isOptional={true}>

Le server function vengono eseguite all'interno dello scope del middleware di Paraglide, quindi `getLocale()` funziona anche al loro interno:

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
<Step number={16} title="Confronto con Intlayer" isOptional={true}>

Non esiste un adapter diretto da Paraglide a Intlayer, poiché entrambi seguono lo stesso principio: compilare i contenuti in fase di build e distribuire il minor runtime possibile. Le differenze risiedono in ciò che raggiunge il browser e nel modo in cui i contenuti sono organizzati:

- **Lingue**: Intlayer carica [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) per lingua (0% di leak di lingua nel benchmark), mentre ciascuna funzione di messaggio di Paraglide include tutte le lingue (49.7%).
- **Organizzazione dei contenuti**: i contenuti possono trovarsi in file `.content.ts` accanto a ciascun componente, oppure in file centralizzati. Vedi [i18n per componente vs centralizzato](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/per-component_vs_centralized_i18n.md).
- **Cambio lingua**: i contenuti vengono letti da un contesto React, quindi il cambio di lingua riesegue il render senza dover ricaricare la pagina.
- **Codice generato**: non viene generato nulla all'interno di `src`, quindi non c'è nulla da rigenerare prima di un commit.

Se provieni da un'altra libreria invece che da Paraglide, gli [adapter di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) mantengono le API di `use-intl`, `next-intl`, `react-i18next`, `react-intl` o Lingui sostituendo semplicemente il runtime sottostante.

Vedi [Intlayer è più leggero di Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/is_intlayer_lighter_than_paraglide.md) e la [guida Intlayer per TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="Automatizza le tue traduzioni con Intlayer" isOptional={true}>

Paraglide renderizza le traduzioni, ma non ti aiuta a **produrle**. Intlayer è **gratuito** e **open source**, e i suoi strumenti risultano utili anche in un progetto basato su Paraglide:

- **Traduci con l'IA** usando la tua chiave API e il provider che preferisci. Vedi [auto-riempimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md) e la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).
- **Mantieni i tuoi file JSON** come unica fonte di verità con il [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md).
- **Verifica le traduzioni mancanti** in CI. Vedi [testare le tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md).
- **Analizza il tuo sito distribuito** per individuare tag `hreflang` mancanti, canonical errati e leak di lingua con il [comando scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/scan.md).

</Step>
</Steps>

## Domande Frequenti

<FAQ>

<Question title="Paraglide JS è una buona scelta per TanStack Start?">

È un'opzione solida: è utilizzata negli esempi ufficiali di TanStack Router, ha il runtime più compatto del [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md) (~1.8 KB gzip) e i messaggi sono completamente tipizzati. I compromessi principali sono che ogni funzione di messaggio include tutte le lingue (inviando circa la metà delle stringhe tradotte a visitatori di altre lingue) e che il cambio di lingua comporta il ricaricamento della pagina.

</Question>
<Question title="Serve un segmento di route $locale con Paraglide?">

No. La riscrittura (`rewrite`) del router rimuove il prefisso della lingua prima del matching della route e lo riapplica ai link generati, consentendo a un unico file `about.tsx` di servire `/about`, `/fr/about` ed `/es/about`.

</Question>
<Question title="Perché il cambio di lingua ricarica la pagina?">

Le funzioni di messaggio leggono la lingua al momento della chiamata e non sono sottoscritte a uno stato React. `setLocale` ricarica quindi la pagina per impostazione predefinita, in modo che ogni messaggio venga renderizzato nuovamente nella nuova lingua. È possibile passare `{ reload: false }`, ma in tal caso dovrai gestire manualmente il re-render dell'albero dei componenti.

</Question>
<Question title="È consigliabile committare la cartella generata src/paraglide?">

È preferibile non farlo. La cartella viene rigenerata a ogni `dev` e `build`, e committarla può provocare conflitti di merge su file generati automaticamente. Effettua invece il commit di `messages/*.json` e `project.inlang/settings.json`.

</Question>
<Question title="Come si aggiungono i tag hreflang con Paraglide?">

Usa `localizeUrl` per creare un URL assoluto per ciascuna lingua nella funzione `head()` della route, e aggiungi un tag `x-default` che punta alla lingua di base. Il passaggio 10 fornisce un helper riutilizzabile, e il passaggio 11 aggiunge gli stessi collegamenti alternativi alla sitemap.

</Question>
<Question title="Paraglide supporta il tree-shaking delle traduzioni inutilizzate?">

I **messaggi** non utilizzati vengono rimossi quando si usa `outputStructure: "message-modules"`, evitando perdite di contenuti tra pagine diverse. Le **lingue** non utilizzate, invece, non vengono rimosse: ogni funzione di messaggio include tutte le traduzioni, motivo per cui il benchmark registra una dispersione (leak) di lingua del 49.7%.

</Question>
<Question title="È possibile migrare da Paraglide a Intlayer?">

Sì. Entrambe le soluzioni sono basate su compilatore, quindi il modello concettuale è molto simile. Puoi mantenere i tuoi file JSON con il [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md), e successivamente sostituire le chiamate `m.key()` con `useIntlayer`, pagina per pagina. Consulta la [guida Intlayer per TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md).

</Question>

</FAQ>
