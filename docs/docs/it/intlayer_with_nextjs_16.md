---
createdAt: 2024-12-06
updatedAt: 2026-06-23
title: "Next.js 16 i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione Next.js 16 multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiungi comando init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Aggiunta menzione di `x-default` nell'oggetto `alternates`"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Inizio cronologia"
author: aymericzip
---

# Traduci il tuo sito Next.js 16 usando Intlayer | Internazionalizzazione (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="La migliore soluzione i18n per Next.js? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Vedi [Template Applicazione](https://github.com/aymericzip/intlayer-next-16-template) su GitHub.

## Indice

<TOC/>

## Perché Intlayer rispetto alle alternative?

Rispetto alle soluzioni principali come `next-intl` o `i18next`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>

<Accordion header="Copertura completa di Next.js">

Intlayer è ottimizzato per funzionare con **Componenti server** per un rendering efficiente ed è completamente compatibile con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Non blocca il rendering statico e offre middleware e tutte le funzionalità necessarie per scalare l'internazionalizzazione (i18n).

> Intlayer è compatibile con Next.js 12, 13, 14, 15 e 16. Se stai utilizzando Next.js Pages Router, puoi fare riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Il routing per locale è utile per SEO, dimensioni del pacchetto e prestazioni. Se non ti serve, puoi fare riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Per Next.js 12, 13, 14 e 15 con App Router, fare riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre le dimensioni del bundle e della pagina fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

L'ambito del contenuto dell'applicazione **facilita la manutenzione** per applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza l'onere mentale di rivedere l'intera codebase dei contenuti. Inoltre, Intlayer è **completamente tipizzato (fully typed)** per garantire l'accuratezza dei tuoi contenuti.

</Accordion>

<Accordion header="Agente IA">

La co-localizzazione dei contenuti **riduce il contesto necessario** dai Large Language Models (LLM). Intlayer viene fornito anche con una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** e **[capacità dell'agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti IA.

</Accordion>

<Accordion header="Automazione">

Utilizza l'automazione per tradurre nella tua pipeline CI/CD utilizzando il LLM di tua scelta al costo del tuo provider di intelligenza artificiale. Intlayer offre anche un **compilatore** per automatizzare l'estrazione dei contenuti, nonché una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) per aiutare a **tradurre in background**.

</Accordion>

<Accordion header="Prestazione">

La connessione di enormi file JSON ai componenti può portare a problemi di prestazioni e reattività. Intlayer ottimizza il caricamento dei contenuti in fase di compilazione.

</Accordion>

<Accordion header="Scalabilità con nessuno sviluppatore">

Più di una semplice soluzione i18n, Intlayer fornisce un **[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** self-hosted e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** per aiutarti gestisci i tuoi contenuti multilingue in **tempo reale**, semplificando la collaborazione con traduttori, copywriter e altri membri del team. I contenuti possono essere archiviati localmente e/o in remoto.

</Accordion>
</AccordionGroup>

---

## Guida passo-passo per configurare Intlayer in un'applicazione Next.js

<Steps>

<Step number={1} title="Installa le dipendenze">

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente IA.

> Questo comando rileverà il tuo ambiente e installerà i pacchetti richiesti. Ad esempio:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **next-intlayer**

  Il pacchetto che integra Intlayer con Next.js. Fornisce provider di contesto e hook per l'internazionalizzazione in Next.js. Inoltre, include il plugin Next.js per integrare Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), così come un proxy per rilevare la lingua preferita dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

</Step>

<Step number={2} title="Configura il tuo progetto">

Ecco la struttura finale che andremo a creare:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Layout locale per il provider Intlayer
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Layout radice per stile e provider globali
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
├── package.json
└── tsconfig.json
```

> Se non desideri il routing per locale, intlayer può essere utilizzato come un semplice provider / hook. Vedi [questa guida](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_no_locale_path.md) per maggiori dettagli.

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre localizzazioni
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, il reindirizzamento proxy, i nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Step>

<Step number={3} title="Integra Intlayer nella tua configurazione Next.js">

Configura il tuo setup Next.js per utilizzare Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opzioni di configurazione qui */
};

export default withIntlayer(nextConfig);
```

> Il plugin Next.js `withIntlayer()` viene utilizzato per integrare Intlayer con Next.js. Garantisce la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno degli ambienti [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Inoltre, fornisce alias per ottimizzare le prestazioni e assicura la compatibilità con i componenti server.

> La funzione `withIntlayer()` è una funzione promise. Permette di preparare i dizionari di Intlayer prima che inizi la build. Se vuoi usarla con altri plugin, puoi aspettare il suo completamento con await. Esempio:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Se vuoi usarlo in modo sincrono, puoi utilizzare la funzione `withIntlayerSync()`. Esempio:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer rileva automaticamente se il tuo progetto utilizza **webpack** o **Turbopack** in base ai flag della riga di comando `--webpack`, `--turbo` o `--turbopack`, oltre alla tua versione attuale di **Next.js**.
>
> A partire da `next>=16`, se utilizzi **Rspack**, devi forzare esplicitamente Intlayer a utilizzare la configurazione webpack disabilitando Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Definire le Rotte Dinamiche per le Localizzazioni">

Rimuovi tutto da `RootLayout` e sostituiscilo con il seguente codice:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Puoi ancora avvolgere i children con altri provider, come `next-themes`, `react-query`, `framer-motion`, ecc.
  <>{children}</>
);

export default RootLayout;
```

> Mantenere il componente `RootLayout` vuoto permette di impostare gli attributi [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) al tag `<html>`.

Per implementare il routing dinamico, fornisci il percorso per la locale aggiungendo un nuovo layout nella tua directory `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Il segmento di percorso `[locale]` viene utilizzato per definire la localizzazione. Esempio: `/en-US/about` si riferirà a `en-US` e `/fr/about` a `fr`.

> A questo punto, incontrerai l'errore: `Error: Missing <html> and <body> tags in the root layout.`. Questo è previsto perché il file `/app/page.tsx` non è più utilizzato e può essere rimosso. Invece, il segmento di percorso `[locale]` attiverà la pagina `/app/[locale]/page.tsx`. Di conseguenza, le pagine saranno accessibili tramite percorsi come `/en`, `/fr`, `/es` nel tuo browser. Per impostare la locale predefinita come pagina radice, fai riferimento alla configurazione `proxy` al passo 7.

Quindi, implementa la funzione `generateStaticParams` nel Layout della tua applicazione.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Riga da inserire

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Resto del codice*/
};

export default LocaleLayout;
```

> `generateStaticParams` garantisce che la tua applicazione precompili le pagine necessarie per tutte le localizzazioni, riducendo il calcolo a runtime e migliorando l'esperienza utente. Per maggiori dettagli, consulta la [documentazione Next.js su generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer funziona con `export const dynamic = 'force-static';` per assicurare che le pagine siano precompilate per tutte le localizzazioni.

</Step>

<Step number={5} title="Dichiara il Tuo Contenuto">

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
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
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Le dichiarazioni di contenuto possono essere definite in qualsiasi punto della tua applicazione non appena sono incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

</Step>

<Step number={6} title="Utilizza il Contenuto nel Tuo Codice">

Accedi ai tuoi dizionari di contenuto in tutta l'applicazione:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** viene utilizzato per fornire la localizzazione ai componenti lato client. Può essere posizionato in qualsiasi componente genitore, incluso il layout. Tuttavia, si consiglia di posizionarlo in un layout perché Next.js condivide il codice del layout tra le pagine, rendendolo più efficiente. Utilizzando `IntlayerClientProvider` nel layout, si evita di reinizializzarlo per ogni pagina, migliorando le prestazioni e mantenendo un contesto di localizzazione coerente in tutta l'applicazione.
- **`IntlayerServerProvider`** viene utilizzato per fornire la localizzazione ai componenti lato server. Non può essere impostato nel layout.

  > Layout e pagina non possono condividere un contesto server comune perché il sistema di contesto server si basa su un archivio dati per richiesta (tramite il meccanismo [React's cache](https://react.dev/reference/react/cache)), causando la ricreazione di ogni "contesto" per diversi segmenti dell'applicazione. Posizionare il provider in un layout condiviso romperebbe questa isolazione, impedendo la corretta propagazione dei valori del contesto server ai tuoi componenti server.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Crea la dichiarazione di contenuto correlata

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
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione di contenuto correlata

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Se vuoi usare il tuo contenuto in un attributo di tipo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, ad esempio:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useIntlayer.md).

> Se la tua app esiste già, puoi utilizzare l' [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) in combinazione con il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per convertire migliaia di componenti in un secondo.

</Step>

<Step number={7} title="Configurare il Proxy per il Rilevamento della Lingua" isOptional={true}>

Configura il proxy per rilevare la lingua preferita dall'utente:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Il `intlayerProxy` viene utilizzato per rilevare la lingua preferita dall'utente e reindirizzarlo all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md). Inoltre, consente di salvare la lingua preferita dell'utente in un cookie.

> Se hai bisogno di concatenare più proxy insieme (ad esempio, `intlayerProxy` con autenticazione o proxy personalizzati), Intlayer ora fornisce un helper chiamato `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Internazionalizzazione dei tuoi metadata" isOptional={true}>

Nel caso tu voglia internazionalizzare i tuoi metadata, come il titolo della tua pagina, puoi usare la funzione `generateMetadata` fornita da Next.js. All'interno, puoi recuperare il contenuto dalla funzione `getIntlayer` per tradurre i tuoi metadata.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une applicazione Next.js",
      es: "Crear una applicazione Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
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
   * Genera un oggetto contenente tutti gli URL per ogni locale.
   *
   * Esempio:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Restituisce
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

// ... Resto del codice
````

> Nota che la funzione `getIntlayer` importata da `next-intlayer` restituisce il tuo contenuto racchiuso in un `IntlayerNode`, permettendo l'integrazione con l'editor visivo. Al contrario, la funzione `getIntlayer` importata da `intlayer` restituisce il tuo contenuto direttamente senza proprietà aggiuntive.

In alternativa, puoi utilizzare la funzione `getTranslation` per dichiarare i tuoi metadata. Tuttavia, si consiglia di utilizzare file di dichiarazione dei contenuti per automatizzare la traduzione dei tuoi metadata ed esternalizzare il contenuto a un certo punto.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Resto del codice
```

> Scopri di più sull'ottimizzazione dei metadata [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Internazionalizzazione del tuo sitemap.xml e robots.txt" isOptional={true}>

Per internazionalizzare il tuo `sitemap.xml` e `robots.txt`, puoi utilizzare la funzione `getMultilingualUrls` fornita da Intlayer. Questa funzione ti permette di generare URL multilingue per la tua sitemap.

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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
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

> Scopri di più sull'ottimizzazione della sitemap [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Scopri di più sull'ottimizzazione del robots.txt [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Cambiare la lingua del tuo contenuto" isOptional={true}>

Per cambiare la lingua del tuo contenuto in Next.js, il modo consigliato è utilizzare il componente `Link` per reindirizzare gli utenti alla pagina localizzata appropriata. Il componente `Link` permette il prefetching della pagina, il che aiuta a evitare un ricaricamento completo della pagina.

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
            replace // Garantirà che il pulsante "indietro" del browser reindirizzi alla pagina precedente
          >
            <span>
              {/* Localizzazione - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella sua stessa localizzazione - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella localizzazione corrente - es. Francés con la localizzazione corrente impostata su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Un modo alternativo è utilizzare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione non permetterà il prefetching della pagina. Consulta la [documentazione dell'hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useLocale.md) per maggiori dettagli.

> Puoi anche impostare una funzione nell'opzione `onLocaleChange` per attivare una funzione personalizzata quando la lingua cambia.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Resto del codice

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Cambia in francese</button>
);
```

> Riferimenti alla documentazione:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Creazione di un componente Link localizzato" isOptional={true}>

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente il prefisso della lingua corrente agli URL interni. Ad esempio, quando un utente francofono clicca su un link alla pagina "About", viene reindirizzato a `/fr/about` invece che a `/about`.

Questo comportamento è utile per diversi motivi:

- **SEO e esperienza utente**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e forniscono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un link localizzato in tutta l'applicazione, garantisci che la navigazione rimanga all'interno della lingua corrente, evitando cambi di lingua imprevisti.
- **Manutenibilità**: Centralizzare la logica di localizzazione in un unico componente semplifica la gestione degli URL, rendendo il tuo codice più facile da mantenere ed estendere man mano che la tua applicazione cresce.

Di seguito è riportata l'implementazione di un componente `Link` localizzato in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Funzione di utilità per verificare se un dato URL è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla locale corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso della locale all'URL (es. /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto di locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Come funziona

- **Rilevamento di link esterni**:  
  La funzione di utilità `checkIsExternalLink` determina se un URL è esterno. I link esterni rimangono invariati perché non necessitano di localizzazione.

- **Recupero della locale corrente**:  
  L'hook `useLocale` fornisce la locale corrente (es. `fr` per il francese).

- **Localizzazione dell'URL**:  
  Per i link interni (ovvero non esterni), `getLocalizedUrl` viene utilizzato per aggiungere automaticamente il prefisso della locale corrente all'URL. Ciò significa che se il tuo utente è in francese, passare `/about` come `href` lo trasformerà in `/fr/about`.

- **Restituzione del link**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato, garantendo che la navigazione sia coerente con la locale.

Integrando questo componente `Link` in tutta la tua applicazione, manterrai un'esperienza utente coerente e consapevole della lingua, beneficiando al contempo di una migliore SEO e usabilità.

</Step>

<Step number={12} title="Ottenere la locale corrente nelle Server Actions" isOptional={true}>

Se hai bisogno della locale attiva all'interno di una Server Action (ad esempio, per localizzare le email o eseguire logiche sensibili alla locale), chiama `getLocale` da `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Fai qualcosa con la locale
};
```

> La funzione `getLocale` segue una strategia a cascata per determinare la locale dell'utente:
>
> 1. Innanzitutto, controlla gli intestazioni della richiesta per un valore di locale che potrebbe essere stato impostato dal proxy
> 2. Se non viene trovata alcuna locale negli intestazioni, cerca una locale memorizzata nei cookie
> 3. Se non viene trovato alcun cookie, tenta di rilevare la lingua preferita dell'utente dalle impostazioni del browser
> 4. Come ultima risorsa, ripiega sulla locale predefinita configurata dell'applicazione
>
> Questo garantisce che venga selezionata la locale più appropriata in base al contesto disponibile.

</Step>

<Step number={13} title="Ottimizza la dimensione del bundle" isOptional={true}>

Quando usi `next-intlayer`, i dizionari sono inclusi nel bundle per ogni pagina di default. Per ottimizzare la dimensione del bundle, Intlayer fornisce un plugin SWC opzionale che sostituisce in modo intelligente le chiamate a `useIntlayer` usando macro. Questo assicura che i dizionari siano inclusi solo nei bundle delle pagine che li utilizzano effettivamente.

Per abilitare questa ottimizzazione, installa il pacchetto `@intlayer/swc`. Una volta installato, `next-intlayer` rileverà automaticamente e utilizzerà il plugin:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Nota: Questa ottimizzazione è disponibile solo per Next.js 13 e versioni successive.

> Nota: Questo pacchetto non è installato di default perché i plugin SWC sono ancora sperimentali su Next.js. Potrebbe cambiare in futuro.
> </Step>

<Step number={14} title="Estrarre il contenuto dei tuoi componenti" isOptional={true}>

Se hai una base di codice esistente, trasformare migliaia di file può richiedere molto tempo.

Per facilitare questo processo, Intlayer propone un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) / [estrattore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md) per trasformare i tuoi componenti ed estrarre il contenuto.

Per configurarlo, puoi aggiungere una sezione `compiler` nel tuo file `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Resto della tua configurazione
  compiler: {
    /**
     * Indica se il compilatore deve essere abilitato.
     */
    enabled: true,

    /**
     * Definisce il percorso dei file di output
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se i componenti devono essere salvati dopo essere stati trasformati. In questo modo, il compilatore può essere eseguito solo una volta per trasformare l'app e poi rimosso.
     */
    saveComponents: false,

    /**
     * Prefisso chiave dizionario
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Comando di estrazione'>

Esegui l'estrattore per trasformare i tuoi componenti ed estrarre il contenuto

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
 <Tab value='Compilatore Babel'>

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Estrai il contenuto dai componenti nei dizionari
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # Oppure npm run dev
```

```bash packageManager="pnpm"
pnpm run build # O pnpm run dev
```

```bash packageManager="yarn"
yarn build # O yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

### Monitorare le modifiche ai dizionari su Turbopack

Quando si utilizza Turbopack come server di sviluppo con il comando `next dev --turbopack`, le modifiche ai dizionari non verranno rilevate automaticamente per impostazione predefinita.

Questa limitazione si verifica perché Turbopack non può eseguire plugin webpack in parallelo per monitorare le modifiche nei file di contenuto. Per ovviare a questo problema, sarà necessario utilizzare il comando `intlayer watch` per eseguire contemporaneamente il server di sviluppo e l'osservatore di compilazione Intlayer.

```json5 fileName="package.json"
{
  // ... Le tue configurazioni package.json esistenti
  "scripts": {
    // ... Le tue configurazioni di script esistenti
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Se stai utilizzando next-intlayer@<=6.x.x, devi mantenere il flag `--turbopack` per far funzionare correttamente l'applicazione Next.js 16 con Turbopack. Consigliamo di utilizzare next-intlayer@>=7.x.x per evitare questa limitazione.

### Configurare TypeScript

Intlayer utilizza l'augmentation dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che la tua configurazione di TypeScript includa i tipi generati automaticamente.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

### Approfondimenti

Per approfondire, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).
