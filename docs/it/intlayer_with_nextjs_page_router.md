# Inizia a Internazionalizzare (i18n) con Intlayer e Next.js utilizzando il Page Router

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source di internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web. Intlayer si integra perfettamente con il più recente framework **Next.js**, incluso il suo tradizionale **Page Router**.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadati**, le rotte e il contenuto.
- **Garantire supporto TypeScript** con tipi generati automaticamente, migliorando il completamento automatico e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come la rilevazione e il cambio dinamico della lingua.

> Intlayer è compatibile con Next.js 12, 13, 14 e 15. Se stai utilizzando il Next.js App Router, fai riferimento alla [guida all'App Router](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_14.md). Per Next.js 15, segui questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

---

## Guida Passo Passo per Configurare Intlayer in un'Applicazione Next.js Utilizzando il Page Router

### Passo 1: Installa le Dipendenze

Installa i pacchetti necessari utilizzando il tuo gestore pacchetti preferito:

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

  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md), traspilazione e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).

- **next-intlayer**

  Il pacchetto che integra Intlayer con Next.js. Fornisce fornitori di contesto e hook per l'internazionalizzazione di Next.js. Inoltre, include il plugin di Next.js per integrare Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), nonché middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire il reindirizzamento degli URL.

### Passo 2: Configura il Tuo Progetto

Crea un file di configurazione per definire le lingue supportate dalla tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Aggiungi le altre lingue qui
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
      // Aggiungi le altre lingue qui
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
      // Aggiungi le altre lingue qui
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamento middleware, nomi dei cookie, posizione ed estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer con la Configurazione di Next.js

Modifica la tua configurazione Next.js per incorporare Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // La tua configurazione esistente di Next.js
};

export default withIntlayer(nextConfig);
```

> Il plugin `withIntlayer()` di Next.js viene utilizzato per integrare Intlayer con Next.js. Assicura la costruzione di file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili ambientali di Intlayer all'interno degli ambienti [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Inoltre, fornisce alias per ottimizzare le prestazioni e garantire compatibilità con i componenti del server.

### Passo 4: Configura il Middleware per la Rilevazione della Lingua

Imposta il middleware per rilevare e gestire automaticamente la lingua preferita dell'utente:

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

> Adatta il parametro `matcher` per corrispondere alle rotte della tua applicazione. Per ulteriori dettagli, fai riferimento alla [documentazione di Next.js sulla configurazione del matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Passo 5: Definisci Rotte Dinamiche per la Lingua

Implementa il routing dinamico per servire contenuti localizzati in base alla lingua dell'utente.

1.  **Crea Pagine Specifiche per Lingua:**

    Rinomina il tuo file della pagina principale per includere il segmento dinamico `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Aggiorna `_app.tsx` per Gestire la Localizzazione:**

    Modifica il tuo `_app.tsx` per includere i fornitori di Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App: FC<AppProps> = ({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    };

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **Configura `getStaticPaths` e `getStaticProps`:**

    Nel tuo `[locale]/index.tsx`, definisci i percorsi e le proprietà per gestire le diverse lingue.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* Il tuo contenuto qui */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* Il tuo contenuto qui */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* Il tuo contenuto qui */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` e `getStaticProps` garantiscono che la tua applicazione precompili le pagine necessarie per tutte le lingue nel Page Router di Next.js. Questo approccio riduce il calcolo a runtime e porta a un'esperienza utente migliorata. Per ulteriori dettagli, fai riferimento alla documentazione di Next.js su [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) e [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Passo 6: Dichiara i Tuoi Contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Benvenuto nel mio sito web",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Inizia modificando questa pagina.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Inizia modificando questa pagina.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Inizia modificando questa pagina.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Inizia modificando questa pagina.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
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

Per ulteriori informazioni sulla dichiarazione dei contenuti, fai riferimento alla [guida alla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md).

### Passo 7: Utilizza i Contenuti nel Tuo Codice

Accedi ai tuoi dizionari di contenuti in tutta la tua applicazione per visualizzare contenuti tradotti.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Componenti aggiuntivi */}
    </div>
  );
};

// ... Il resto del codice, inclusi getStaticPaths e getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Componenti aggiuntivi */}
    </div>
  );
};

// ... Il resto del codice, inclusi getStaticPaths e getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Componenti aggiuntivi */}
    </div>
  );
};

// ... Il resto del codice, inclusi getStaticPaths e getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Assicurati di avere una dichiarazione di contenuto corrispondente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Assicurati di avere una dichiarazione di contenuto corrispondente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Assicurati di avere una dichiarazione di contenuto corrispondente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Quando utilizzi le traduzioni negli attributi `string` (ad es., `alt`, `title`, `href`, `aria-label`), chiama il valore della funzione come segue:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Per saperne di più sul hook `useIntlayer`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useIntlayer.md).

### (Opzionale) Passo 8: Internazionalizza i Tuoi Metadati

Per internazionalizzare i metadati come i titoli delle pagine e le descrizioni, utilizza la funzione `getStaticProps` in combinazione con la funzione `getTranslation` di Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // I metadati possono essere utilizzati nell'intestazione o in altri componenti secondo necessità
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenuto aggiuntivo */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "Il mio sito web",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Benvenuto nel mio sito web.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Il resto del codice inclusi getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // I metadati possono essere utilizzati nell'intestazione o in altri componenti secondo necessità
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenuto aggiuntivo */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "Il mio sito web",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Benvenuto nel mio sito web.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Il resto del codice inclusi getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslation, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // I metadati possono essere utilizzati nell'intestazione o in altri componenti secondo necessità
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenuto aggiuntivo */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "Il mio sito web",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Benvenuto nel mio sito web.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Il resto del codice inclusi getStaticPaths
```

### (Opzionale) Passo 9: Cambia la Lingua dei Tuoi Contenuti

Per consentire agli utenti di cambiare lingua dinamicamente, utilizza la funzione `setLocale` fornita dall'hook `useLocale`.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Lingua nel proprio Locale - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel Locale corrente - es. Francés con locale corrente impostato su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nel proprio Locale - es. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Lingua nel proprio Locale - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel Locale corrente - es. Francés con locale corrente impostato su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nel proprio Locale - es. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Lingua nel proprio Locale - es. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel Locale corrente - es. Francés con locale corrente impostato su Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Lingua nel proprio Locale - es. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> L'API `useLocalePageRouter` è la stessa di `useLocale`. Per saperne di più sull'hook `useLocale`, fai riferimento alla [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/useLocale.md).

> Riferimenti alla documentazione:
>
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **Esempio dei Vantaggi di TypeScript:**

   ![Esempio di Completamento Automatico](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Esempio di Errore di Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Configurazione di Git

Per mantenere il tuo repository pulito ed evitare di compromettere i file generati, è consigliato ignorare i file creati da Intlayer.

Aggiungi le seguenti righe al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

## Risorse Aggiuntive

- **Documentazione Intlayer:** [Repository GitHub](https://github.com/aymericzip/intlayer)
- **Guida alla Dichiarazione dei Contenuti:** [Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/get_started.md)
- **Documentazione di Configurazione:** [Guida alla Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md)

Seguendo questa guida, puoi integrare efficacemente Intlayer nella tua applicazione Next.js utilizzando il Page Router, abilitando un supporto di internazionalizzazione robusto e scalabile per i tuoi progetti web.
