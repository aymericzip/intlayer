# Getting Started internationalizing (i18n) with Intlayer and Next.js 14 with App Router

Consulta [Application Template](https://github.com/aymericzip/intlayer-next-14-template) su GitHub.

## Cosa è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web. Intlayer si integra perfettamente con l'ultimo framework **Next.js 14**, inclusa la sua potente **App Router**. È ottimizzata per funzionare con i **Server Components** per un rendering efficiente ed è completamente compatibile con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (da Next.js >= 15).

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, rotte e contenuti.
- **Accedere alle traduzioni sia nei componenti lato client che lato server**.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento dinamico della lingua e il cambio di lingua.

> Intlayer è compatibile con Next.js 12, 13, 14 e 15. Se stai utilizzando Next.js Page Router, puoi fare riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_page_router.md). Per Next.js 15 con o senza turbopack, consulta questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

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

> Tramite questo file di configurazione, puoi configurare URL localizzati, reindirizzamenti middleware, nomi dei cookie, la posizione e l'estensione delle dichiarazioni dei contenuti, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella configurazione di Next.js

Configura il tuo setup Next.js per utilizzare Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> Il plugin `withIntlayer()` di Next.js è utilizzato per integrare Intlayer con Next.js. Garantisce la costruzione dei file di dichiarazione dei contenuti e li monitora in modalità di sviluppo. Definisce le variabili di ambiente di Intlayer all'interno degli ambienti [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Inoltre, fornisce alias per ottimizzare le prestazioni e garantisce la compatibilità con i componenti server.

### Passo 4: Configura il Middleware per il rilevamento della lingua

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

> Il `intlayerMiddleware` è utilizzato per rilevare la lingua preferita dell'utente e reindirizzarlo all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md). Inoltre, consente di salvare la lingua preferita dell'utente in un cookie.

> Adatta il parametro `matcher` per corrispondere alle rotte della tua applicazione. Per maggiori dettagli, consulta la [documentazione di Next.js sulla configurazione del matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Passo 5: Definisci rotte dinamiche per la lingua

Rimuovi tutto da `RootLayout` e sostituiscilo con il seguente codice:

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Mantenere il componente `RootLayout` vuoto consente di impostare gli attributi [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) e [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) nel tag `<html>`.

Per implementare il routing dinamico, fornisci il percorso per la lingua aggiungendo un nuovo layout nella tua directory `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

module.exports = LocaleLayout;
```

> Il segmento di percorso `[locale]` è utilizzato per definire la lingua. Esempio: `/en-US/about` si riferirà a `en-US` e `/fr/about` a `fr`.

Poi, implementa la funzione `generateStaticParams` nel layout della tua applicazione.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Riga da inserire

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Resto del codice*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Riga da inserire

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Resto del codice*/
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Riga da inserire

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Resto del codice*/
};

module.exports = LocaleLayout;
```

> `generateStaticParams` garantisce che la tua applicazione pre-costruisca le pagine necessarie per tutte le lingue, riducendo il calcolo a runtime e migliorando l'esperienza utente. Per maggiori dettagli, consulta la [documentazione di Next.js su generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Passo 6: Dichiara i tuoi contenuti

Crea e gestisci le dichiarazioni dei tuoi contenuti per memorizzare le traduzioni:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md).

### Passo 7: Utilizza i contenuti nel tuo codice

Accedi ai tuoi dizionari di contenuti in tutta la tua applicazione:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <IntlayerClientProvider locale={locale}>
          <ServerComponentExample />
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

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

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

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

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

- **`IntlayerClientProvider`** è utilizzato per fornire la lingua ai componenti lato client. Può essere posizionato in qualsiasi componente genitore, incluso il layout. Tuttavia, è consigliato posizionarlo in un layout perché Next.js condivide il codice del layout tra le pagine, rendendolo più efficiente. Utilizzando `IntlayerClientProvider` nel layout, eviti di reinizializzarlo per ogni pagina, migliorando le prestazioni e mantenendo un contesto di localizzazione coerente in tutta l'applicazione.
- **`IntlayerServerProvider`** è utilizzato per fornire la lingua ai figli lato server. Non può essere impostato nel layout.

  > Layout e pagina non possono condividere un contesto server comune perché il sistema di contesto server si basa su un archivio dati per richiesta (tramite il meccanismo di [cache di React](https://react.dev/reference/react/cache)), causando la ricreazione di ogni "contesto" per segmenti diversi dell'applicazione. Posizionare il provider in un layout condiviso interromperebbe questo isolamento, impedendo la corretta propagazione dei valori del contesto server ai tuoi componenti server.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Crea la dichiarazione dei contenuti correlata

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
  const content = useIntlayer("client-component-example"); // Crea la dichiarazione dei contenuti correlata

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
  const content = useIntlayer("client-component-example"); // Crea la dichiarazione dei contenuti correlata

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione dei contenuti correlata

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
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione dei contenuti correlata

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
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione dei contenuti correlata

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Se desideri utilizzare i tuoi contenuti in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:

> ```jsx
>
> ```

> <img src={content.image.src.value} alt={content.image.value} />

> ```
>
> ```

> Per saperne di più sull'hook `useIntlayer`, consulta la [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useIntlayer.md).

### (Opzionale) Passo 8: Internazionalizzazione dei tuoi metadati

Nel caso tu voglia internazionalizzare i tuoi metadati, come il titolo della tua pagina, puoi utilizzare la funzione `generateMetadata` fornita da Next.js. All'interno della funzione utilizza la funzione `getTranslation` per tradurre i tuoi metadati.

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
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

````javascript fileName="src/app/[locale]/layout.msx or src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
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
   *  //   es: '/es/about',
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

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="javascript"
const { getTranslation, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = ({ params: { locale } }) => {
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
   *  //   es: '/es/about',
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

> Scopri di più sull'ottimizzazione dei metadati [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opzionale) Passo 9: Internazionalizzazione del tuo sitemap.xml e robots.txt

Per internazionalizzare il tuo `sitemap.xml` e `robots.txt`, puoi utilizzare la funzione `getMultilingualUrls` fornita da Intlayer. Questa funzione ti consente di generare URL multilingue per il tuo sitemap.

```tsx fileName="src/app/sitemap.ts"   codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
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
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
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
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
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

> Scopri di più sull'ottimizzazione del sitemap [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Scopri di più sull'ottimizzazione del robots.txt [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opzionale) Passo 10: Cambia la lingua dei tuoi contenuti

Per cambiare la lingua dei tuoi contenuti in Next.js, il modo consigliato è utilizzare il componente `Link` per reindirizzare gli utenti alla pagina localizzata appropriata. Il componente `Link` consente il prefetching della pagina, il che aiuta a evitare un ricaricamento completo della pagina.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
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
              {/* Lingua - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nel proprio locale - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel locale corrente - es. Francés con locale corrente impostato su Locales.SPANISH */}
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

const LocaleSwitcher = () => {
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
              {/* Lingua - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nel proprio locale - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel locale corrente - es. Francés con locale corrente impostato su Locales.SPANISH */}
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

const LocaleSwitcher = () => {
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
              {/* Lingua - es. FR */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nel proprio locale - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel locale corrente - es. Francés con locale corrente impostato su Locales.SPANISH */}
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

> Riferimenti alla documentazione:

> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useLocale.md)

> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)

> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)

> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)

> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)

> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opzionale) Passo 11: Creazione di un componente Link localizzato

Per garantire che la navigazione della tua applicazione rispetti la lingua corrente, puoi creare un componente `Link` personalizzato. Questo componente aggiunge automaticamente il prefisso agli URL interni con la lingua corrente, in modo che, ad esempio, quando un utente francofono clicca su un link alla pagina "About", venga reindirizzato a `/fr/about` invece che a `/about`.

Questo comportamento è utile per diversi motivi:

- **SEO e User Experience**: Gli URL localizzati aiutano i motori di ricerca a indicizzare correttamente le pagine specifiche per lingua e forniscono agli utenti contenuti nella loro lingua preferita.
- **Coerenza**: Utilizzando un link localizzato in tutta l'applicazione, garantisci che la navigazione rimanga all'interno della lingua corrente, evitando cambi di lingua inaspettati.
- **Manutenibilità**: Centralizzando la logica di localizzazione in un unico componente, semplifichi la gestione degli URL, rendendo il tuo codice più facile da mantenere ed estendere man mano che l'applicazione cresce.

Di seguito è riportata l'implementazione di un componente `Link` localizzato in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, viene considerato esterno.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso dell'URL con la lingua (es. /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto linguistico.
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
 * Se l'URL inizia con http:// o https://, viene considerato esterno.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Un componente Link personalizzato che adatta l'attributo href in base alla lingua corrente.
 * Per i link interni, utilizza `getLocalizedUrl` per aggiungere il prefisso dell'URL con la lingua (es. /fr/about).
 * Questo garantisce che la navigazione rimanga all'interno dello stesso contesto linguistico.
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
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * Funzione di utilità per verificare se un URL è esterno.
 * Se l'URL inizia con http:// o https://, viene considerato esterno.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Se il link è interno e viene fornito un href valido, ottieni l'URL localizzato.
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### Come Funziona

- **Rilevamento dei Link Esterni**:  
  La funzione helper `checkIsExternalLink` determina se un URL è esterno. I link esterni vengono lasciati invariati perché non necessitano di localizzazione.

- **Recupero della Lingua Corrente**:  
  L'hook `useLocale` fornisce la lingua corrente (es. `fr` per il francese).

- **Localizzazione dell'URL**:  
  Per i link interni (cioè non esterni), `getLocalizedUrl` viene utilizzato per aggiungere automaticamente il prefisso dell'URL con la lingua corrente. Ciò significa che se il tuo utente è in francese, passando `/about` come `href` verrà trasformato in `/fr/about`.

- **Restituzione del Link**:  
  Il componente restituisce un elemento `<a>` con l'URL localizzato, garantendo che la navigazione sia coerente con la lingua.

Integrando questo componente `Link` in tutta la tua applicazione, mantieni un'esperienza utente coerente e consapevole della lingua, beneficiando anche di un miglior SEO e usabilità.

### Configura TypeScript

Intlayer utilizza l'augmentazione dei moduli per ottenere i vantaggi di TypeScript e rendere il tuo codice più robusto.

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

### (Opzionale) Passo 12: Ottimizza la dimensione del tuo bundle

Quando si utilizza `next-intlayer`, i dizionari sono inclusi nel bundle per ogni pagina per impostazione predefinita. Per ottimizzare la dimensione del bundle, Intlayer fornisce un plugin SWC opzionale che sostituisce in modo intelligente le chiamate a `useIntlayer` utilizzando macro. Questo assicura che i dizionari siano inclusi solo nei bundle delle pagine che li utilizzano effettivamente.

Per abilitare questa ottimizzazione, installa il pacchetto `@intlayer/swc`. Una volta installato, `next-intlayer` rileverà e utilizzerà automaticamente il plugin:

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

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti consente di evitare di commetterli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Approfondisci

Per approfondire, puoi implementare l'[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md).
