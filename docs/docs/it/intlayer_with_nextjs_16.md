---
createdAt: 2024-12-06
updatedAt: 2025-10-26
title: Come tradurre la tua app Next.js 16 – Guida i18n 2025
description: Scopri come rendere il tuo sito Next.js 16 multilingue. Segui la documentazione per internazionalizzare (i18n) e tradurlo.
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
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.0.0
    date: 2025-06-29
    changes: Inizio cronologia
---

# Traduci il tuo sito Next.js 16 usando Intlayer | Internazionalizzazione (i18n)

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="La migliore soluzione i18n per Next.js? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Vedi [Template Applicazione](https://github.com/aymericzip/intlayer-next-16-template) su GitHub.

## Indice

<TOC/>

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web. Intlayer si integra perfettamente con l'ultimo framework **Next.js 16**, incluso il suo potente **App Router**. È ottimizzato per funzionare con i **Server Components** per un rendering efficiente ed è completamente compatibile con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadata**, le rotte e i contenuti.
- **Accedere alle traduzioni sia nei componenti client-side che server-side**.
- **Garantire il supporto a TypeScript** con tipi generati automaticamente, migliorando l'autocompletamento e il rilevamento degli errori.
- **Approfitta delle funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

> Intlayer è compatibile con Next.js 12, 13, 14 e 16. Se utilizzi Next.js Page Router, puoi fare riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_page_router.md). Per Next.js 12, 13, 14 con App Router, fai riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_14.md).

---

## Guida passo-passo per configurare Intlayer in un'applicazione Next.js

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, la traduzione, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la traspilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).

- **next-intlayer**

  Il pacchetto che integra Intlayer con Next.js. Fornisce provider di contesto e hook per l'internazionalizzazione in Next.js. Inoltre, include il plugin Next.js per integrare Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), così come un proxy per rilevare la lingua preferita dall'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passo 2: Configura il tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, il reindirizzamento proxy, i nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella tua configurazione Next.js

Configura il tuo setup Next.js per utilizzare Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opzioni di configurazione qui */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* opzioni di configurazione qui */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* opzioni di configurazione qui */
};

module.exports = withIntlayer(nextConfig);
```

> Il plugin Next.js `withIntlayer()` viene utilizzato per integrare Intlayer con Next.js. Garantisce la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno degli ambienti [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Inoltre, fornisce alias per ottimizzare le prestazioni e assicura la compatibilità con i componenti server.

> La funzione `withIntlayer()` è una funzione promise. Permette di preparare i dizionari di Intlayer prima che inizi la build. Se vuoi usarla con altri plugin, puoi aspettare il suo completamento con await. Esempio:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Se vuoi usarlo in modo sincrono, puoi utilizzare la funzione `withIntlayerSync()`. Esempio:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

### Passo 4: Definire le Rotte Dinamiche per le Localizzazioni

Rimuovi tutto da `RootLayout` e sostituiscilo con il seguente codice:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Puoi ancora avvolgere i children con altri provider, come `next-themes`, `react-query`, `framer-motion`, ecc.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Puoi ancora avvolgere i children con altri provider, come `next-themes`, `react-query`, `framer-motion`, ecc.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Puoi ancora avvolgere i children con altri provider, come `next-themes`, `react-query`, `framer-motion`, ecc.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Mantenere il componente `RootLayout` vuoto permette di impostare gli attributi [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) al tag `<html>`.

Per implementare il routing dinamico, fornisci il percorso per la locale aggiungendo un nuovo layout nella tua directory `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> Il segmento di percorso `[locale]` viene utilizzato per definire la localizzazione. Esempio: `/en-US/about` si riferirà a `en-US` e `/fr/about` a `fr`.

> A questo punto, incontrerai l'errore: `Error: Missing <html> and <body> tags in the root layout.`. Questo è previsto perché il file `/app/page.tsx` non è più utilizzato e può essere rimosso. Invece, il segmento di percorso `[locale]` attiverà la pagina `/app/[locale]/page.tsx`. Di conseguenza, le pagine saranno accessibili tramite percorsi come `/en`, `/fr`, `/es` nel tuo browser. Per impostare la locale predefinita come pagina radice, fai riferimento alla configurazione `proxy` al passo 7.

Quindi, implementa la funzione `generateStaticParams` nel Layout della tua applicazione.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Riga da inserire

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Resto del codice*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Riga da inserire

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Resto del codice*/
};

// ... Resto del codice
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Riga da inserire

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Resto del codice*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` garantisce che la tua applicazione precompili le pagine necessarie per tutte le localizzazioni, riducendo il calcolo a runtime e migliorando l'esperienza utente. Per maggiori dettagli, consulta la [documentazione Next.js su generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer funziona con `export const dynamic = 'force-static';` per assicurare che le pagine siano precompilate per tutte le localizzazioni.

### Passo 5: Dichiara il Tuo Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Contenuto della pagina con traduzioni
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
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        it: "Inizia modificando",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
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
        "es": "Comience por editar",
        "it": "Inizia modificando"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Le dichiarazioni di contenuto possono essere definite in qualsiasi punto della tua applicazione non appena sono incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Passo 6: Utilizza il Contenuto nel Tuo Codice

Accedi ai tuoi dizionari di contenuto in tutta l'applicazione:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
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

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** viene utilizzato per fornire la localizzazione ai componenti lato client. Può essere posizionato in qualsiasi componente genitore, incluso il layout. Tuttavia, si consiglia di posizionarlo in un layout perché Next.js condivide il codice del layout tra le pagine, rendendolo più efficiente. Utilizzando `IntlayerClientProvider` nel layout, si evita di reinizializzarlo per ogni pagina, migliorando le prestazioni e mantenendo un contesto di localizzazione coerente in tutta l'applicazione.
- **`IntlayerServerProvider`** viene utilizzato per fornire la localizzazione ai componenti lato server. Non può essere impostato nel layout.

  > Layout e pagina non possono condividere un contesto server comune perché il sistema di contesto server si basa su un archivio dati per richiesta (tramite il meccanismo [React's cache](https://react.dev/reference/react/cache)), causando la ricreazione di ogni "contesto" per diversi segmenti dell'applicazione. Posizionare il provider in un layout condiviso romperebbe questa isolazione, impedendo la corretta propagazione dei valori del contesto server ai tuoi componenti server.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
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

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Crea la dichiarazione del contenuto correlato

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Crea la dichiarazione del contenuto correlato

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
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

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione di contenuto correlata

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione del contenuto correlato

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Se vuoi usare il tuo contenuto in un attributo di tipo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, ad esempio:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useIntlayer.md).

### (Opzionale) Passo 7: Configurare il Proxy per il Rilevamento della Lingua

Configura il proxy per rilevare la lingua preferita dall'utente:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
// intlayerProxy viene utilizzato per rilevare la lingua preferita dall'utente e reindirizzarlo all'URL appropriato come specificato nella configurazione.
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> Il `intlayerProxy` viene utilizzato per rilevare la lingua preferita dall'utente e reindirizzarlo all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md). Inoltre, consente di salvare la lingua preferita dell'utente in un cookie.

> Se hai bisogno di concatenare più proxy insieme (ad esempio, `intlayerProxy` con autenticazione o proxy personalizzati), Intlayer ora fornisce un helper chiamato `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (Opzionale) Passo 8: Internazionalizzazione dei tuoi metadata

Nel caso tu voglia internazionalizzare i tuoi metadata, come il titolo della tua pagina, puoi usare la funzione `generateMetadata` fornita da Next.js. All'interno, puoi recuperare il contenuto dalla funzione `getIntlayer` per tradurre i tuoi metadata.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
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

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
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
        "es": "Logo Preact",
        "it": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "it": "Generato da create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
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

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
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
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
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
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

module.exports = { generateMetadata };

// ... Resto del codice
````

> Nota che la funzione `getIntlayer` importata da `next-intlayer` restituisce il tuo contenuto racchiuso in un `IntlayerNode`, permettendo l'integrazione con l'editor visivo. Al contrario, la funzione `getIntlayer` importata da `intlayer` restituisce il tuo contenuto direttamente senza proprietà aggiuntive.

In alternativa, puoi utilizzare la funzione `getTranslation` per dichiarare i tuoi metadata. Tuttavia, si consiglia di utilizzare file di dichiarazione dei contenuti per automatizzare la traduzione dei tuoi metadata ed esternalizzare il contenuto a un certo punto.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
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
      en: "La mia descrizione",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Resto del codice
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "Il mio titolo",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "La mia descrizione",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Resto del codice
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
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

module.exports = { generateMetadata };

// ... Resto del codice
```

> Scopri di più sull'ottimizzazione dei metadata [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opzionale) Passo 9: Internazionalizzazione del tuo sitemap.xml e robots.txt

Per internazionalizzare il tuo `sitemap.xml` e `robots.txt`, puoi utilizzare la funzione `getMultilingualUrls` fornita da Intlayer. Questa funzione ti permette di generare URL multilingue per la tua sitemap.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
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

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
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

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
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

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

// Ottieni tutte le URL multilingue da un array di URL
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Configurazione del file robots.txt con regole per i crawler
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Blocca le pagine di login e registrazione in tutte le lingue
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

// Ottieni tutte le URL multilingue da un array di URL
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Blocca le pagine di login e registrazione in tutte le lingue
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

// Ottieni tutte le URL multilingue per le pagine specificate
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Blocca l'accesso a login e registrazione in tutte le lingue
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Scopri di più sull'ottimizzazione della sitemap [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Scopri di più sull'ottimizzazione del robots.txt [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opzionale) Passo 10: Cambiare la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto in Next.js, il modo consigliato è utilizzare il componente `Link` per reindirizzare gli utenti alla pagina localizzata appropriata. Il componente `Link` permette il prefetching della pagina, il che aiuta a evitare un ricaricamento completo della pagina.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
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
              {/* Località - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella sua stessa Località - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella Località corrente - es. Francés con la località corrente impostata su Locales.SPANISH */}
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
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
            aria-current={locale === localeItem ? "pagina" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Garantirà che il pulsante "indietro" del browser reindirizzi alla pagina precedente
          >
            <span>
              {/* Locale - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella sua stessa Locale - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella Locale corrente - es. Francés con la locale corrente impostata su Locales.SPANISH */}
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
> - [`lang` attribute](https://developer.mozilla.org/it/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/it/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/it/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opzionale) Passo 11: Creare un Componente Link Localizzato

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente il prefisso della lingua corrente agli URL interni. Ad esempio, quando un utente francofono clicca su un link alla pagina "About", viene reindirizzato a `/fr/about` invece che a `/about`.

Questo comportamento è utile per diversi motivi:

- **SEO e esperienza utente**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e forniscono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un link localizzato in tutta l'applicazione, garantisci che la navigazione rimanga all'interno della lingua corrente, evitando cambi di lingua imprevisti.
- **Manutenibilità**: Centralizzare la logica di localizzazione in un unico componente semplifica la gestione degli URL, rendendo il tuo codice più facile da mantenere ed estendere man mano che la tua applicazione cresce.

Di seguito è riportata l'implementazione di un componente `Link` localizzato in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Componente Link personalizzato che adatta l'attributo href in base alla locale corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso della locale all'URL (es. /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto di locale.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla locale corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per anteporre la locale all'URL (ad esempio, /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto di locale.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Come Funziona

- **Rilevamento dei Link Esterni**:  
  La funzione di supporto `checkIsExternalLink` determina se un URL è esterno. I link esterni vengono lasciati invariati perché non necessitano di localizzazione.

- **Recupero della Locale Corrente**:  
  L'hook `useLocale` fornisce la locale corrente (ad esempio, `fr` per il francese).

- **Localizzazione dell'URL**:  
  Per i link interni (cioè non esterni), `getLocalizedUrl` viene utilizzato per aggiungere automaticamente il prefisso della locale corrente all'URL. Ciò significa che se l'utente è in francese, passando `/about` come `href` verrà trasformato in `/fr/about`.

- **Restituzione del Link**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato, garantendo che la navigazione sia coerente con la locale.

Integrando questo componente `Link` in tutta la tua applicazione, mantieni un'esperienza utente coerente e consapevole della lingua, beneficiando anche di un miglioramento della SEO e dell'usabilità.

### (Opzionale) Passo 12: Ottenere la locale corrente nelle Server Actions

Se hai bisogno della locale attiva all'interno di una Server Action (ad esempio, per localizzare email o eseguire logiche dipendenti dalla locale), chiama `getLocale` da `next-intlayer/server`:

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
> 1. Prima, controlla gli header della richiesta per un valore di locale che potrebbe essere stato impostato dal proxy
> 2. Se non viene trovato alcun locale negli header, cerca un locale memorizzato nei cookie
> 3. Se non viene trovato alcun cookie, tenta di rilevare la lingua preferita dall'utente dalle impostazioni del browser
> 4. Come ultima risorsa, ricade sul locale predefinito configurato nell'applicazione
>
> Questo garantisce che venga selezionato il locale più appropriato in base al contesto disponibile.

### (Opzionale) Passo 13: Ottimizza la dimensione del tuo bundle

Quando si utilizza `next-intlayer`, i dizionari sono inclusi nel bundle per ogni pagina per impostazione predefinita. Per ottimizzare la dimensione del bundle, Intlayer fornisce un plugin SWC opzionale che sostituisce in modo intelligente le chiamate a `useIntlayer` utilizzando macro. Questo garantisce che i dizionari siano inclusi solo nei bundle delle pagine che li utilizzano effettivamente.

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

> Nota: Questa ottimizzazione è disponibile solo per Next.js 13 e versioni successive.

> Nota: Questo pacchetto non è installato di default perché i plugin SWC sono ancora sperimentali su Next.js. Potrebbe cambiare in futuro.

### Monitorare le modifiche ai dizionari con Turbopack

Quando si utilizza Turbopack come server di sviluppo con il comando `next dev`, le modifiche ai dizionari non vengono rilevate automaticamente di default.

Questa limitazione si verifica perché Turbopack non può eseguire i plugin webpack in parallelo per monitorare le modifiche nei file di contenuto. Per aggirare questo problema, è necessario utilizzare il comando `intlayer watch` per eseguire contemporaneamente sia il server di sviluppo che il watcher di build di Intlayer.

```json5 fileName="package.json"
{
  // ... Le tue configurazioni esistenti di package.json
  "scripts": {
    // ... Le tue configurazioni esistenti di script
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Se stai usando next-intlayer@<=6.x.x, devi mantenere il flag `--turbopack` per far funzionare correttamente l'applicazione Next.js 16 con Turbopack. Consigliamo di utilizzare next-intlayer@>=7.x.x per evitare questa limitazione.

### Configurare TypeScript

Intlayer utilizza l'augmentazione dei moduli per sfruttare i vantaggi di TypeScript e rendere il tuo codice più robusto.

![Completamento automatico](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Errore di traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

Per fare ciò, puoi aggiungere le seguenti istruzioni nel tuo file `.gitignore`:

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

### Andare oltre

Per andare oltre, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).
