# Iniziare con l'internazionalizzazione (i18n) utilizzando Intlayer e Next.js 15 App Router

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle applicazioni web moderne. Intlayer si integra perfettamente con l'ultima versione del framework **Next.js 15**, compreso il potente **App Router**. È ottimizzata per lavorare con i **Server Components** per un rendering efficiente ed è pienamente compatibile con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Con Intlayer puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componenti.
- **Localizzare dinamicamente metadati, route e contenuti.**
- **Accedere alle traduzioni sia in componenti lato client che lato server.**
- **Garantire il supporto a TypeScript** con tipi autogenerati, migliorando l'autocompletamento e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

> Intlayer è compatibile con Next.js 12, 13, 14 e 15. Se stai utilizzando il Next.js Page Router, puoi consultare questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_page_router.md). Per Next.js 12, 13, 14 con App Router, consulta questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_14.md).

---

## Guida Passo-passo per Configurare Intlayer in un'Applicazione Next.js

### Passo 1: Installazione delle Dipendenze

Installa i pacchetti necessari utilizzando npm:

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

  Il pacchetto core che fornisce gli strumenti per l'internazionalizzazione, per la gestione della configurazione, la traduzione, la [dichiarazione di contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md), la transpilation e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md).

- **next-intlayer**

  Il pacchetto che integra Intlayer con Next.js. Fornisce i context provider e gli hook per l'internazionalizzazione in Next.js. Include inoltre il plugin per Next.js che integra Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), oltre a middleware per il rilevamento della lingua preferita dall'utente, la gestione dei cookie e il redirect degli URL.

### Passo 2: Configurare il Progetto

Crea un file di configurazione per impostare le lingue dell'applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
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
      // Le tue altre lingue
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
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Attraverso questo file di configurazione è possibile impostare URL localizzati, il redirect tramite middleware, il nome dei cookie, la posizione e l'estensione delle dichiarazioni dei contenuti, disabilitare i log di Intlayer sulla console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md).

### Passo 3: Integrare Intlayer nella Configurazione di Next.js

Configura Next.js per utilizzare Intlayer:

```typescript filename="next.config.ts" codeFormat="typescript"
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

> Il plugin Next.js `withIntlayer()` è utilizzato per integrare Intlayer con Next.js. Garantisce la generazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno degli ambienti [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Inoltre, fornisce alias per ottimizzare le prestazioni e garantisce la compatibilità con i componenti server.

### Passo 4: Definire Route Localizzate Dinamicamente

Elimina tutto dal `RootLayout` e sostituisci con il seguente codice:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Lasciare il componente `RootLayout` vuoto permette di impostare gli attributi [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) sul tag `<html>`.

Per implementare il routing dinamico, fornisci il percorso per la lingua aggiungendo un nuovo layout nella cartella `[locale]`:

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
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
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
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> Il segmento di percorso `[locale]` viene utilizzato per definire la lingua. Ad esempio: `/en-US/about` farà riferimento a `en-US` e `/fr/about` a `fr`.

Poi, implementa la funzione `generateStaticParams` nel layout della tua applicazione.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Riga da inserire

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Resto del codice */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Riga da inserire

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Resto del codice */
};

// ... Resto del codice
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Riga da inserire

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Resto del codice */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` garantisce che la tua applicazione precompili le pagine necessarie per tutte le lingue, riducendo il calcolo in fase di runtime e migliorando l'esperienza utente. Per maggiori dettagli, consulta la [documentazione di Next.js su generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Passo 5: Dichiarare il Tuo Contenuto

Crea e gestisci le dichiarazioni del contenuto per memorizzare le traduzioni:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

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

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> Le dichiarazioni del contenuto possono essere definite ovunque nella tua applicazione purché vengano incluse nella directory `contentDir` (di default, `./src`) e corrispondano all'estensione dei file di dichiarazione (di default, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md).

### Passo 6: Utilizzare il Contenuto nel Tuo Codice

Accedi ai dizionari di contenuto in tutta l'applicazione:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const { title, content } = useIntlayer("page");

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
    <>
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />

        <IntlayerClientProvider locale={locale}>
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** viene utilizzato per fornire la lingua ai componenti lato client. Può essere posizionato in qualsiasi componente genitore, incluso il layout. Tuttavia, è consigliabile posizionarlo nel layout poiché Next.js condivide il codice del layout tra le pagine, rendendolo più efficiente. In questo modo, evitando di re-inizializzarlo per ogni pagina si ottimizzano le prestazioni e si mantiene un contesto di internazionalizzazione consistente in tutta l'applicazione.
- **`IntlayerServerProvider`** viene utilizzato per fornire la lingua ai componenti server. Non può essere impostato nel layout.

  > Il layout e la pagina non possono condividere lo stesso contesto server perché il sistema di contesto server si basa su uno store dati per richiesta (tramite il meccanismo [React’s cache](https://react.dev/reference/react/cache)), causando la ricreazione di ogni “contesto” per differenti segmenti dell'applicazione. Posizionare il provider in un layout condiviso romperebbe questa isolazione, impedendo la corretta propagazione dei valori del contesto server ai componenti server.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Crea la dichiarazione del contenuto correlato

  return (
    <div>
      <h2>{content.title} </h2>
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
      <h2>{content.title} </h2>
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
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione del contenuto correlato

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione del contenuto correlato

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione del contenuto correlato

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};

module.exports = ServerComponentExample;
```

> Se vuoi utilizzare il contenuto in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi invocare il valore come funzione, ad esempio:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Per maggiori dettagli sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayer.md).

### (Opzionale) Passo 7: Configurare il Middleware per il Rilevamento della Lingua

Configura il middleware per rilevare la lingua preferita dall'utente:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> Il `intlayerMiddleware` viene utilizzato per rilevare la lingua preferita dall'utente e reindirizzarlo all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md). Inoltre, permette di salvare la lingua preferita dell'utente in un cookie.

### (Opzionale) Passo 8: Internazionalizzazione dei Metadati

Nel caso in cui si voglia internazionalizzare i metadati, come ad esempio il titolo della pagina, è possibile utilizzare la funzione `generateMetadata` fornita da Next.js. All'interno della funzione utilizza `getTranslationContent` per tradurre i metadati.

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * Genera un oggetto contenente tutti gli URL per ogni lingua.
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
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Resto del codice
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslationContent, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslationContent(content, locale);

  /**
   * Genera un oggetto contenente tutti gli URL per ogni lingua.
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
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Resto del codice
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslationContent, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslationContent(content, locale);

  /**
   * Genera un oggetto contenente tutti gli URL per ogni lingua.
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
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

module.exports = { generateMetadata };

// ... Resto del codice
````

> Approfondisci l'ottimizzazione dei metadati consultando la [documentazione ufficiale di Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opzionale) Passo 9: Internazionalizzazione di sitemap.xml e robots.txt

Per internazionalizzare il file `sitemap.xml` e `robots.txt`, puoi utilizzare la funzione `getMultilingualUrls` fornita da Intlayer. Questa funzione ti permette di generare URL multilingue per la sitemap.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
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
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
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

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
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

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Approfondisci l'ottimizzazione della sitemap consultando la [documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Approfondisci l'ottimizzazione del robots.txt consultando la [documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opzionale) Passo 10: Cambiare la Lingua del Tuo Contenuto

Per cambiare la lingua del contenuto, puoi utilizzare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione consente di impostare la lingua dell'applicazione e aggiornare di conseguenza il contenuto.

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
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Lingua nella sua lingua (es. Français) */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente (es. Francés con la lingua corrente impostata su Locales.SPANISH) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese (es. French) */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nella sua forma abbreviata (es. FR) */}
              {localeItem}
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
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Lingua nella sua forma estesa (es. Français) */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente (es. Francés con la lingua corrente impostata su Locales.SPANISH) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese (es. French) */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Abbreviazione della lingua (es. FR) */}
              {localeItem}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Riferimenti utili:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [Attributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [Attributo `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Attributo `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Attributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opzionale) Passo 11: Creare un Componente Link Localizzato

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente il prefisso della lingua agli URL interni. Ad esempio, se un utente francofono clicca su un link per la pagina "About", verrà reindirizzato a `/fr/about` invece che a `/about`.

Questo comportamento è utile per diversi motivi:

- **SEO ed Esperienza Utente**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per ogni lingua e offrono agli utenti contenuti nella lingua preferita.
- **Coerenza**: Utilizzando un componente Link localizzato in tutta l'applicazione, si garantisce che la navigazione rimanga nel contesto della lingua corrente, evitando cambi inaspettati.
- **Manutenibilità**: Centralizzando la logica della localizzazione in un unico componente, il codice diventa più semplice da gestire e aggiornare man mano che l'applicazione cresce.

Di seguito l'implementazione di un componente `Link` localizzato in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso della lingua (es. /fr/about).
 * Ciò garantisce che la navigazione rimanga nello stesso contesto linguistico.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso della lingua (es. /fr/about).
 * Ciò garantisce che la navigazione rimanga nello stesso contesto linguistico.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, è considerato esterno.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

#### Come Funziona

- **Rilevamento dei Link Esterni**:  
  La funzione helper `checkIsExternalLink` determina se un URL è esterno. I link esterni vengono lasciati invariati perché non necessitano di localizzazione.

- **Recupero della Lingua Corrente**:  
  L'hook `useLocale` fornisce la lingua corrente (es. `fr` per il francese).

- **Localizzazione dell'URL**:  
  Per i link interni (cioè non esterni), `getLocalizedUrl` viene utilizzato per aggiungere automaticamente il prefisso della lingua all'URL. Ciò significa che se l'utente è in francese, passando `/about` come `href` questo verrà trasformato in `/fr/about`.

- **Restituzione del Link**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato, garantendo che la navigazione sia coerente con la lingua corrente.

Utilizzando questo componente `Link` in tutta l'applicazione, manterrai un'esperienza utente coesa e consapevole della lingua, beneficiando anche di un migliore SEO e usabilità.

### Configurazione di TypeScript

Intlayer utilizza l'**augmentation dei moduli** per sfruttare i benefici di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la configurazione di TypeScript includa i tipi autogenerati.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    "types", // Includi i tipi autogenerati
  ],
}
```

### Configurazione di Git

È consigliato ignorare i file generati da Intlayer in modo da evitare di committarli nel repository Git.

Per fare ciò, aggiungi le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```
