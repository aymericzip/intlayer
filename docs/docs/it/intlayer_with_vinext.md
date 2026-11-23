---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Guida completa per tradurre la tua app Next.js su Vite"
description: "Configura Intlayer con vinext, l'API di Next.js su Vite: routing per lingua con proxy.ts, Server e Client Components, metadati localizzati, sitemap e deploy su Cloudflare Workers."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Cronologia iniziale"
author: aymericzip
---

# Traduci il tuo sito vinext con Intlayer

[vinext](https://github.com/cloudflare/vinext) reimplementa l'API di Next.js sopra Vite. La tua directory `app/`, gli import `next/*` e `proxy.ts` continuano a funzionare, ma la build passa da Vite invece che da Turbopack o webpack.

Intlayer si integra in questa configurazione con due pacchetti: `next-intlayer` per gli hook, i provider e il proxy che i tuoi componenti già usano su Next.js, e `vite-intlayer` per la parte di build (compilazione dei dizionari, watch e ottimizzazione del bundle).

> Usi Next.js con la sua toolchain? Segui invece la [guida a Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md).

- [Guida a Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)

## Indice

<TOC/>

## Perché Intlayer rispetto alle alternative?

Rispetto a soluzioni come `next-intl` o `i18next`, Intlayer include ottimizzazioni integrate:

<AccordionGroup>
<Accordion header="Pensato per l'API di Next.js, su Vite">

Lo stesso codice `next-intlayer` funziona su Next.js e su vinext. I Server Components risolvono il contenuto sul server, i Client Components lo leggono tramite il provider e il routing per lingua viene eseguito dal tuo `proxy.ts`. Passare da una toolchain all'altra non tocca i tuoi componenti.

</Accordion>
<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carichi solo il contenuto necessario. Il plugin di Vite sostituisce ogni chiamata a `useIntlayer` con le voci che il componente usa davvero, **riducendo la dimensione del bundle e delle pagine fino al 50%**.

</Accordion>
<Accordion header="Manutenibilità">

Organizzare il contenuto per componente **semplifica la manutenzione** delle applicazioni grandi. Puoi duplicare o eliminare la cartella di una funzionalità senza rivedere tutta la codebase dei contenuti, e Intlayer è **completamente tipizzato** per mantenere i contenuti accurati.

</Accordion>
<Accordion header="Agente AI">

Tenere il contenuto vicino al componente **riduce il contesto necessario** agli LLM. Intlayer include una **CLI** per individuare le traduzioni mancanti, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, un **[server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)** e le **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)
- [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)

</Accordion>
<Accordion header="Automazione">

Traduci nella tua pipeline CI/CD con l'LLM che preferisci, a carico del tuo provider AI. Intlayer offre anche un **compilatore** per automatizzare l'estrazione dei contenuti e una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per **tradurre in background**.

- [Piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

</Accordion>
<Accordion header="Scalare con chi non è sviluppatore">

Intlayer offre un **[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) self-hosted** e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** per gestire i contenuti multilingue in **tempo reale** con traduttori e copywriter. I contenuti possono essere archiviati in locale e/o da remoto.

- [Editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
- [CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Guida passo passo per configurare Intlayer in un'applicazione vinext

<Steps>
<Step number={1} title="Installa le dipendenze">

Parti da un progetto vinext funzionante. Per crearne uno, esegui `npm create vinext-app@latest`. Per migrare un'app Next.js esistente, esegui `npx vinext init`.

Poi installa Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Il pacchetto principale che fornisce gli strumenti di internazionalizzazione: gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), transpilazione e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **next-intlayer**

  Fornisce i provider, gli hook e il proxy per l'API di Next.js. vinext risolve `next/navigation`, `next/headers` e `next/server` verso le proprie implementazioni, quindi `next-intlayer` funziona senza modifiche.

- **vite-intlayer**

  Il plugin di Vite che compila le tue dichiarazioni dei contenuti, le monitora in sviluppo e ottimizza i dizionari nel bundle di produzione. Sostituisce il plugin `withIntlayer()` di Next.js, che vinext non esegue.

</Step>
<Step number={2} title="Configura il progetto">

Scegli se la tua applicazione deve usare percorsi URL localizzati (es. `/en/about`, `/fr/about`) oppure servire i contenuti senza segmento di lingua nel percorso (es. `/about`, rilevando la lingua tramite cookie, header o parametri di query).

<Tabs group="routing-mode">
<Tab label="Con percorso della lingua" value="with-locale-path">

### Architettura

Tutte le pagine localizzate sono annidate sotto un segmento dinamico `[locale]`. È consigliato per la SEO e il rendering statico, perché ogni lingua ha un proprio URL:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Configurazione

Crea un file `intlayer.config.ts` per dichiarare le lingue supportate:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Senza percorso della lingua" value="without-locale-path">

### Architettura

Le route non includono il segmento `[locale]`. Tutte le pagine si trovano direttamente in `src/app/`, e la lingua proviene da cookie, header o parametri di query. È adatto a dashboard e app con autenticazione:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Configurazione

Imposta `routing.mode` su `"search-params"` (es. `/about?locale=fr`) oppure `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> Questo file imposta anche il redirect del proxy, i nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni dei contenuti, i log e altro. Consulta la [documentazione sulla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per l'elenco completo.

- [Documentazione sulla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

</Step>
<Step number={3} title="Integra Intlayer nella configurazione di Vite">

Aggiungi il plugin `intlayer()` accanto a `vinext()` in `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> Il plugin `intlayer()` compila i tuoi dizionari prima dell'avvio della build, monitora i file di contenuto in sviluppo e configura gli alias e le ottimizzazioni usati da `next-intlayer` negli ambienti RSC, SSR e client.

> `intlayer()` include anche un middleware di routing per lingua per il server di sviluppo di Vite. Su vinext, `src/proxy.ts` svolge già questo compito, in sviluppo e nel runtime di produzione, quindi l'opzione `ignore` disattiva quello di Vite per evitare di instradare ogni richiesta due volte.

> Non aggiungere `withIntlayer()` in `next.config.ts`. vinext legge `next.config.ts` per opzioni come `redirects`, `rewrites` e `headers`, ma non esegue i plugin di webpack o Turbopack.

Se distribuisci su Cloudflare Workers, mantieni il plugin `cloudflare()` generato da `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => true } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Definisci le route dinamiche della lingua">

<Tabs group="routing-mode">
<Tab label="Con percorso della lingua" value="with-locale-path">

Rimuovi tutto da `RootLayout` e sostituiscilo con il codice seguente:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Lasciando `RootLayout` vuoto, il layout della lingua può impostare gli attributi [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) sul tag `<html>`.

Aggiungi un layout nella tua directory `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Un singolo `IntlayerProvider` copre entrambe le metà dell'albero: fornisce la lingua ai Server Components e monta il provider client, così i Client Components ricevono la stessa lingua.

> Il segmento `[locale]` contiene la lingua: `/en-US/about` viene risolto in `en-US`, `/fr/about` in `fr`. Il vecchio `src/app/page.tsx` non è più utilizzato e può essere rimosso. Il proxy (passo 7) serve la lingua predefinita alla radice.

> `generateStaticParams` fa sì che vinext pre-renderizzi ogni pagina per ogni lingua. vinext applica anche `dynamicParams`, quindi una lingua sconosciuta restituisce un 404 quando imposti `export const dynamicParams = false`.

</Tab>
<Tab label="Senza percorso della lingua" value="without-locale-path">

Non esiste una directory `[locale]`. Configura `src/app/layout.tsx` per leggere la lingua dalla richiesta e avvolgere la tua applicazione con `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Dichiara i tuoi contenuti">

Crea le dichiarazioni dei contenuti per memorizzare le traduzioni:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        it: "Inizia modificando",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "it": "Inizia modificando",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> Le dichiarazioni dei contenuti possono trovarsi ovunque nella directory `contentDir` (per impostazione predefinita `./src`), purché rispettino l'estensione delle dichiarazioni dei contenuti (per impostazione predefinita `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

- [Documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)

</Step>
<Step number={6} title="Usa i contenuti nel tuo codice">

Accedi ai tuoi dizionari da qualsiasi componente:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` è isomorfico: la condizione di export `react-server`, che vinext applica al suo ambiente RSC, fornisce ai Server Components l'implementazione server, mentre i Client Components ottengono quella basata sul contesto. La stessa chiamata funziona su entrambi i lati.

> Per usare i tuoi contenuti in un attributo di tipo `string`, come `alt`, `title`, `href` o `aria-label`, leggi il suo valore:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Scopri di più nella [documentazione di `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useIntlayer.md).

- [Documentazione di `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useIntlayer.md)

> Se la tua app esiste già, il [compilatore di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) e il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) trasformano migliaia di componenti in un secondo.

- [Compilatore di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md)
- [Comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md)

</Step>
<Step number={7} title="Configura il proxy per il rilevamento della lingua">

vinext esegue `proxy.ts` (e `middleware.ts`) come Next.js 16, in sviluppo e in produzione, anche su Cloudflare Workers. Esporta il proxy di Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` rileva la lingua preferita dell'utente, reindirizza all'URL corrispondente secondo la [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) e salva la lingua in un cookie. Passa inoltre la lingua a `getLocale()` e agli hook server, quindi mantienilo anche con l'architettura senza percorso della lingua.

- [Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

> Per concatenare più proxy (ad esempio `intlayerProxy` con l'autenticazione), usa `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Internazionalizzazione dei metadati" isOptional={true}>

vinext supporta l'API Metadata. Usa `generateMetadata` con `getIntlayer` per tradurre i metadati delle tue pagine:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      it: "La mia app vinext",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      it: "Un'app Next.js che gira su Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> La funzione `getIntlayer` importata da `intlayer` restituisce valori grezzi, pronti per l'oggetto dei metadati. Quella di `next-intlayer` li avvolge per l'editor visuale.

</Step>
<Step number={9} title="Internazionalizzazione di sitemap.xml e robots.txt" isOptional={true}>

`sitemap.ts` e `robots.ts` funzionano come su Next.js. Usa `getMultilingualUrls` per elencare ogni URL localizzato:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="Cambia la lingua dei contenuti" isOptional={true}>

Usa `next/link` per navigare verso la pagina localizzata. vinext mantiene la navigazione lato client e il prefetching, quindi il cambio avviene senza un ricaricamento completo:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Riferimenti alla documentazione:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useLocale.md)
> - [Funzione `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleName.md)
> - [Funzione `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md)
> - [Funzione `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Crea un componente Link localizzato" isOptional={true}>

Un componente `Link` personalizzato antepone la lingua corrente agli URL interni, così un utente francese che clicca su `/about` arriva su `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Ottieni la lingua corrente nelle Server Actions" isOptional={true}>

Chiama `getLocale` da `next-intlayer/server` all'interno di una Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` legge la lingua impostata dal proxy negli header della richiesta, poi il cookie della lingua, poi l'header `Accept-Language` del browser, e infine ripiega sulla lingua predefinita.

</Step>
<Step number={13} title="Distribuisci su Cloudflare Workers" isOptional={true}>

Intlayer compila i dizionari nel bundle in fase di build, quindi nulla legge il file system a runtime e l'app funziona così com'è in workerd. Esegui build e deploy con la CLI di vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Per distribuire altrove (Vercel, Netlify, AWS, Node.js), aggiungi il plugin di Vite [Nitro](https://v3.nitro.build/) accanto a `vinext()`, oppure imposta `output: "standalone"` in `next.config.ts`. La configurazione di Intlayer non cambia.

</Step>
<Step number={14} title="Estrai il contenuto dei tuoi componenti" isOptional={true}>

In una codebase esistente, Intlayer offre un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) e un [estrattore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per spostare le stringhe hardcoded nelle dichiarazioni dei contenuti.

- [Compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md)
- [Estrattore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md)

Abilita il compilatore in `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Esegui l'estrattore per trasformare i tuoi componenti ed estrarre il contenuto:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Vite compiler'>

Il plugin di Vite `intlayer()` include il compilatore. Una volta impostato `compiler.enabled`, avvia il server di sviluppo o la build come al solito:

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Configura TypeScript

Intlayer usa il module augmentation per tipizzare le chiavi e i valori dei contenuti.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Includi i tipi generati nella configurazione di TypeScript:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Configurazione di Git

Ignora i file generati da Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### Estensione VS Code

Installa l'**[estensione VS Code di Intlayer](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** ufficiale per l'autocompletamento delle chiavi, gli errori sulle traduzioni mancanti, le anteprime inline e le azioni rapide. Consulta la [documentazione dell'estensione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md).

- [Documentazione dell'estensione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)

### Per approfondire

Aggiungi l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) oppure esternalizza i tuoi contenuti con il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

- [Editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)

## Domande frequenti

<FAQ>

<Question title="Che cos'è vinext?">

vinext è un plugin di Vite open source, mantenuto da Cloudflare, che reimplementa l'API pubblica di Next.js: App Router e Pages Router, React Server Components, Server Actions, `proxy.ts`, route handler e i moduli `next/*`. Il tuo codice Next.js gira su Vite e si distribuisce in modo nativo su Cloudflare Workers o su altre piattaforme tramite Nitro.

</Question>
<Question title="Cosa cambia rispetto alla configurazione di Next.js?">

Solo l'integrazione con la build. Su Next.js, `withIntlayer()` avvolge `next.config.ts`. Su vinext, invece, il plugin `intlayer()` di `vite-intlayer` va in `vite.config.ts`. Provider, hook, `proxy.ts`, metadati e codice della sitemap restano identici, quindi puoi seguire la [guida a Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md) per tutto ciò che questa pagina non copre.

- [Guida a Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)

</Question>
<Question title="Mi serve la configurazione i18n di Next.js o il plugin SWC?">

No. Il campo `i18n` di `next.config.ts` copre solo i prefissi di lingua del Pages Router su vinext, e Intlayer gestisce il proprio routing tramite `proxy.ts`. Non serve nemmeno il plugin `@intlayer/swc`: il plugin di Vite sostituisce già le chiamate a `useIntlayer`, così ogni pagina include solo i dizionari che usa. Consulta l'[ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md).

- [Ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md)

</Question>
<Question title="Mi serve `intlayer watch` in sviluppo?">

No. Il plugin di Vite `intlayer()` avvia il watcher dei contenuti con `vite dev`, e una modifica ai contenuti aggiorna a caldo solo i componenti che leggono il dizionario modificato.

</Question>
<Question title="Posso migrare da `next-intl` o `i18next` senza riscrivere i miei componenti?">

Sì. Segui la [guida alla migrazione da next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md) o la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md), oppure mantieni la tua API attuale con gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md), che espongono le API di `next-intl`, `react-i18next` e `react-intl` servite dai dizionari di Intlayer.

- [Guida alla migrazione da next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md)
- [Guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md)
- [Adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md)

</Question>
<Question title="Devo inserire la lingua nell'URL, come /fr/about?">

No. `routing.mode` accetta:

- `"prefix-no-default"` (predefinito): `/about` per la lingua predefinita, `/fr/about` per le altre.
- `"prefix-all"`: ogni lingua ha un prefisso, `/en/about` e `/fr/about`.
- `"no-prefix"`: nessuna lingua nel percorso, risolta da cookie o header.
- `"search-params"`: `/about?locale=fr`.

Consulta il [riferimento della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) e l'architettura senza percorso della lingua al passo 2.

- [Riferimento della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)

</Question>
<Question title="Come traduco la mia app automaticamente con l'AI?">

Esegui `npx intlayer fill`. La CLI rileva le traduzioni mancanti e le completa con l'LLM che preferisci, usando il tuo provider e la tua chiave API. Consulta il [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) e l'[integrazione CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md).

- [Comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md)
- [Integrazione CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md)

</Question>
<Question title="Come individuo le traduzioni mancanti prima del rilascio?">

Esegui `npx intlayer test` nella CI. La build fallisce quando a una lingua dichiarata mancano contenuti. L'[estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md) mostra gli stessi errori mentre scrivi, e il [plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md) segnala le stringhe hardcoded.

- [Estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)
- [Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)

</Question>
<Question title="Intlayer è gratuito e open source?">

Sì. Intlayer è open source con licenza Apache 2.0, e la libreria, la CLI, l'editor visuale e il compilatore sono gratuiti, anche per uso commerciale. Il CMS ospitato è un servizio a pagamento opzionale e può anche essere [self-hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

- [Self-hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md)

</Question>

</FAQ>
