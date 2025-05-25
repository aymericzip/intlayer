# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

<iframe title="The best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Vedi [Application Template](https://github.com/aymericzip/intlayer-next-15-template) su GitHub.

## Che cos'è Intlayer?

**Intlayer** è una libreria open-source innovativa per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle applicazioni web moderne. Intlayer si integra perfettamente con l'ultimo framework **Next.js 15**, inclusa la sua potente **App Router**. È ottimizzato per funzionare con i **Server Components** per un rendering efficiente ed è completamente compatibile con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, percorsi e contenuti.
- **Accedere alle traduzioni sia nei componenti lato client che lato server**.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento dinamico della lingua e il cambio di lingua.

> Intlayer è compatibile con Next.js 12, 13, 14 e 15. Se stai utilizzando Next.js Page Router, puoi fare riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_page_router.md). Per Next.js 12, 13, 14 con App Router, fai riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_14.md).

---

## Guida passo-passo per configurare Intlayer in un'applicazione Next.js

### Passo 1: Installa le dipendenze

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

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md), transpilation e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).

- **next-intlayer**

  Il pacchetto che integra Intlayer con Next.js. Fornisce provider di contesto e hook per l'internazionalizzazione di Next.js. Inoltre, include il plugin Next.js per integrare Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), oltre a middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire i reindirizzamenti URL.

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
      // Altre lingue
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
      // Altre lingue
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
      // Altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Tramite questo file di configurazione, puoi configurare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle dichiarazioni dei contenuti, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella configurazione di Next.js

Configura il tuo setup Next.js per utilizzare Intlayer:

```typescript filename="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opzioni di configurazione */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* opzioni di configurazione */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* opzioni di configurazione */
};

module.exports = withIntlayer(nextConfig);
```

> Il plugin `withIntlayer()` di Next.js viene utilizzato per integrare Intlayer con Next.js. Garantisce la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno degli ambienti [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Inoltre, fornisce alias per ottimizzare le prestazioni e garantisce la compatibilità con i componenti server.

### Passo 4: Definisci percorsi dinamici per le lingue

Rimuovi tutto da `RootLayout` e sostituiscilo con il seguente codice:

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

> Mantenere il componente `RootLayout` vuoto consente di impostare gli attributi [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) sul tag `<html>`.

Per implementare il routing dinamico, fornisci il percorso per la lingua aggiungendo un nuovo layout nella tua directory `[locale]`:

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

> Il segmento di percorso `[locale]` viene utilizzato per definire la lingua. Esempio: `/en-US/about` si riferirà a `en-US` e `/fr/about` a `fr`.

Poi, implementa la funzione `generateStaticParams` nel layout della tua applicazione.

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

> `generateStaticParams` garantisce che la tua applicazione pre-costruisca le pagine necessarie per tutte le lingue, riducendo il calcolo a runtime e migliorando l'esperienza utente. Per maggiori dettagli, fai riferimento alla [documentazione di Next.js su generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Passo 5: Dichiara i tuoi contenuti

Crea e gestisci le dichiarazioni dei tuoi contenuti per memorizzare le traduzioni:

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
        it: "Inizia modificando",
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
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx",
        "it": "src/app/page.tsx"
      }
    }
  }
}
```

> Le dichiarazioni dei tuoi contenuti possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione dei contenuti (di default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).
> Per maggiori dettagli, fai riferimento alla [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md).

### Passo 6: Utilizza i contenuti nel tuo codice

Accedi ai tuoi dizionari di contenuti in tutta l'applicazione:

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

- **`IntlayerClientProvider`** viene utilizzato per fornire la lingua ai componenti lato client. Può essere posizionato in qualsiasi componente genitore, incluso il layout. Tuttavia, è consigliato posizionarlo in un layout perché Next.js condivide il codice del layout tra le pagine, rendendolo più efficiente. Utilizzando `IntlayerClientProvider` nel layout, eviti di inizializzarlo nuovamente per ogni pagina, migliorando le prestazioni e mantenendo un contesto di localizzazione coerente in tutta l'applicazione.
- **`IntlayerServerProvider`** viene utilizzato per fornire la lingua ai figli lato server. Non può essere impostato nel layout.

  > Layout e pagina non possono condividere un contesto server comune perché il sistema di contesto server si basa su un archivio dati per richiesta (tramite il meccanismo [React’s cache](https://react.dev/reference/react/cache)), causando la ricreazione di ogni "contesto" per segmenti diversi dell'applicazione. Posizionare il provider in un layout condiviso interromperebbe questo isolamento, impedendo la corretta propagazione dei valori del contesto server ai tuoi componenti server.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Crea dichiarazione dei contenuti correlata

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
  const content = useIntlayer("client-component-example"); // Crea dichiarazione dei contenuti correlata

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
  const content = useIntlayer("client-component-example"); // Crea dichiarazione dei contenuti correlata

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
  const content = useIntlayer("server-component-example"); // Crea dichiarazione dei contenuti correlata

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
  const content = useIntlayer("server-component-example"); // Crea dichiarazione dei contenuti correlata

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Crea dichiarazione dei contenuti correlata

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Se desideri utilizzare i tuoi contenuti in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Per saperne di più sull'hook `useIntlayer`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useIntlayer.md).

### (Opzionale) Passo 7: Configura Middleware per il rilevamento della lingua

Configura il middleware per rilevare la lingua preferita dell'utente:

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

> Il `intlayerMiddleware` viene utilizzato per rilevare la lingua preferita dell'utente e reindirizzarlo all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md). Inoltre, consente di salvare la lingua preferita dell'utente in un cookie.

### (Opzionale) Passo 8: Internazionalizzazione dei tuoi metadati

Nel caso in cui desideri internazionalizzare i tuoi metadati, come il titolo della tua pagina, puoi utilizzare la funzione `generateMetadata` fornita da Next.js. All'interno della funzione utilizza la funzione `getTranslation` per tradurre i tuoi metadati.

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
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
      it: "Il mio titolo",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      it: "La mia descrizione",
    }),
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
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
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

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
      it: "Il mio titolo",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      it: "La mia descrizione",
    }),
    alternates: {
      canonical: multilingualUrls[locale],
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
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

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
      it: "Il mio titolo",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
      it: "La mia descrizione",
    }),
    alternates: {
      canonical: multilingualUrls[locale],
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

> Per saperne di più sull'ottimizzazione dei metadati [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opzionale) Passo 9: Internazionalizzazione del tuo sitemap.xml e robots.txt

Per internazionalizzare il tuo `sitemap.xml` e `robots.txt`, puoi utilizzare la funzione `getMultilingualUrls` fornita da Intlayer. Questa funzione ti consente di generare URL multilingue per il tuo sitemap.

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

> Per saperne di più sull'ottimizzazione del sitemap [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Per saperne di più sull'ottimizzazione del robots.txt [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opzionale) Passo 10: Cambia la lingua dei tuoi contenuti

Per cambiare la lingua dei tuoi contenuti, puoi utilizzare la funzione `setLocale` fornita dall'hook `useLocale`. Questa funzione ti consente di impostare la lingua dell'applicazione e aggiornare i contenuti di conseguenza.

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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Locale - es. IT */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria lingua - es. Italiano */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente - es. Italian con lingua corrente impostata su Locales.ENGLISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - es. Italian */}
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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Locale - es. IT */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria lingua - es. Italiano */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente - es. Italian con lingua corrente impostata su Locales.ENGLISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - es. Italian */}
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
  const { locale, pathWithoutLocale, availableLocales } = useLocale();
  const { setLocaleCookie } = useLocaleCookie();

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
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Locale - es. IT */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nella propria lingua - es. Italiano */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nella lingua corrente - es. Italian con lingua corrente impostata su Locales.ENGLISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in Inglese - es. Italian */}
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
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useLocale.md)
> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)
> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)
> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)
> - [Attributo `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=it)
> - [Attributo `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [Attributo `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [Attributo `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opzionale) Passo 11: Creazione di un componente Link localizzato

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente il prefisso agli URL interni con la lingua corrente. Ad esempio, quando un utente francofono clicca su un link alla pagina "About", viene reindirizzato a `/fr/about` invece che a `/about`.

Questo comportamento è utile per diversi motivi:

- **SEO e User Experience**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e forniscono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un link localizzato in tutta l'applicazione, garantisci che la navigazione rimanga all'interno della lingua corrente, evitando cambiamenti di lingua inaspettati.
- **Manutenibilità**: Centralizzando la logica di localizzazione in un unico componente, semplifichi la gestione degli URL, rendendo il tuo codice più facile da mantenere ed estendere man mano che l'applicazione cresce.

Di seguito l'implementazione di un componente `Link` localizzato in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, viene considerato esterno.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso all'URL con la lingua (es. /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto linguistico.
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
 * Se l'URL inizia con http:// o https://, viene considerato esterno.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso all'URL con la lingua (es. /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto linguistico.
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
 * Se l'URL inizia con http:// o https://, viene considerato esterno.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso all'URL con la lingua (es. /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto linguistico.
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

#### Come funziona

- **Rilevamento dei link esterni**:  
  La funzione helper `checkIsExternalLink` determina se un URL è esterno. I link esterni vengono lasciati invariati perché non necessitano di localizzazione.

- **Recupero della lingua corrente**:  
  L'hook `useLocale` fornisce la lingua corrente (es. `fr` per il francese).

- **Localizzazione dell'URL**:  
  Per i link interni (cioè non esterni), `getLocalizedUrl` viene utilizzato per aggiungere automaticamente il prefisso all'URL con la lingua corrente. Ciò significa che se il tuo utente è in francese, passando `/about` come `href` verrà trasformato in `/fr/about`.

- **Restituzione del Link**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato, garantendo che la navigazione sia coerente con la lingua.

Integrando questo componente `Link` in tutta l'applicazione, mantieni un'esperienza utente coerente e consapevole della lingua, beneficiando anche di un miglior SEO e usabilità.

### Configura TypeScript

Intlayer utilizza l'augmentazione dei moduli per ottenere i benefici di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la configurazione di TypeScript includa i tipi autogenerati.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi autogenerati
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti consente di evitare di commetterli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Approfondisci

Per approfondire, puoi implementare l'[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md).
