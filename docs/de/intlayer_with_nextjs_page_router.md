# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und Next.js unter Verwendung des Page Routers

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen. Intlayer integriert sich nahtlos in das neueste **Next.js**-Framework, einschließlich seines traditionellen **Page Routers**.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und -umschaltung.

> Intlayer ist kompatibel mit Next.js 12, 13, 14 und 15. Wenn Sie den Next.js App Router verwenden, lesen Sie den [App Router Guide](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_14.md). Für Next.js 15 folgen Sie dieser [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung mit Page Router

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **next-intlayer**

  Das Paket, das Intlayer mit Next.js integriert. Es bietet Kontextanbieter und Hooks für die Internationalisierung in Next.js. Außerdem enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und Behandlung von URL-Weiterleitungen.

### Schritt 2: Projekt konfigurieren

Erstellen Sie eine Konfigurationsdatei, um die von Ihrer Anwendung unterstützten Sprachen zu definieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Fügen Sie hier weitere Sprachen hinzu
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
      // Fügen Sie hier weitere Sprachen hinzu
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
      // Fügen Sie hier weitere Sprachen hinzu
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen, das Deaktivieren von Intlayer-Protokollen in der Konsole und mehr einrichten. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer in die Next.js-Konfiguration integrieren

Ändern Sie Ihre Next.js-Konfiguration, um Intlayer einzubinden:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ihre bestehende Next.js-Konfiguration
};

export default withIntlayer(nextConfig);
```

> Das `withIntlayer()` Next.js-Plugin wird verwendet, um Intlayer mit Next.js zu integrieren. Es stellt sicher, dass Inhaltsdeklarationsdateien erstellt und im Entwicklungsmodus überwacht werden. Es definiert Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/)- oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)-Umgebungen. Darüber hinaus bietet es Aliase zur Leistungsoptimierung und stellt die Kompatibilität mit Serverkomponenten sicher.

### Schritt 4: Middleware für die Spracherkennung konfigurieren

Richten Sie Middleware ein, um die bevorzugte Sprache des Benutzers automatisch zu erkennen und zu behandeln:

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

> Passen Sie den Parameter `matcher` an, um die Routen Ihrer Anwendung abzugleichen. Weitere Details finden Sie in der [Next.js-Dokumentation zur Konfiguration des Matchers](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Schritt 5: Dynamische Sprachrouten definieren

Implementieren Sie dynamisches Routing, um lokalisierte Inhalte basierend auf der Sprache des Benutzers bereitzustellen.

1.  **Erstellen Sie sprachspezifische Seiten:**

    Benennen Sie Ihre Hauptseitendatei um, um das dynamische Segment `[locale]` einzuschließen.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Aktualisieren Sie `_app.tsx`, um die Lokalisierung zu behandeln:**

    Ändern Sie Ihre `_app.tsx`, um Intlayer-Anbieter einzuschließen.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

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

3.  **Richten Sie `getStaticPaths` und `getStaticProps` ein:**

    Definieren Sie in Ihrer `[locale]/index.tsx` die Pfade und Eigenschaften, um verschiedene Sprachen zu behandeln.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* Ihr Inhalt hier */}</div>;

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

    const HomePage = () => <div>{/* Ihr Inhalt hier */}</div>;

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

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* Ihr Inhalt hier */}</div>;

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

> `getStaticPaths` und `getStaticProps` stellen sicher, dass Ihre Anwendung die erforderlichen Seiten für alle Sprachen im Next.js Page Router vorab erstellt. Dieser Ansatz reduziert die Laufzeitberechnung und führt zu einer verbesserten Benutzererfahrung. Weitere Details finden Sie in der Next.js-Dokumentation zu [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) und [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Schritt 6: Inhalte deklarieren

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
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
        en: "Get started by editing this page.",
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
        en: "Get started by editing this page.",
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
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por éditar esta página."
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

Weitere Informationen zur Deklaration von Inhalten finden Sie im [Leitfaden zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

### Schritt 7: Inhalte im Code verwenden

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu, um übersetzte Inhalte anzuzeigen.

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
      {/* Zusätzliche Komponenten */}
    </div>
  );
};

// ... Restlicher Code, einschließlich getStaticPaths und getStaticProps

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
      {/* Zusätzliche Komponenten */}
    </div>
  );
};

// ... Restlicher Code, einschließlich getStaticPaths und getStaticProps

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
      {/* Zusätzliche Komponenten */}
    </div>
  );
};

// ... Restlicher Code, einschließlich getStaticPaths und getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Stellen Sie sicher, dass Sie eine entsprechende Inhaltsdeklaration haben

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
  const content = useIntlayer("component-example"); // Stellen Sie sicher, dass Sie eine entsprechende Inhaltsdeklaration haben

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
  const content = useIntlayer("component-example"); // Stellen Sie sicher, dass Sie eine entsprechende Inhaltsdeklaration haben

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Wenn Sie Übersetzungen in `string`-Attributen verwenden (z. B. `alt`, `title`, `href`, `aria-label`), rufen Sie den Wert der Funktion wie folgt auf:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Weitere Informationen zum `useIntlayer`-Hook finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useIntlayer.md).

### (Optional) Schritt 8: Ihre Metadaten internationalisieren

Um Metadaten wie Seitentitel und Beschreibungen zu internationalisieren, verwenden Sie die Funktion `getStaticProps` in Verbindung mit der Funktion `getTranslation` von Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Metadaten können im Head oder in anderen Komponenten nach Bedarf verwendet werden
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Zusätzlicher Inhalt */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
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

// ... Restlicher Code einschließlich getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";



const HomePage = ({ metadata }) => {
  // Metadaten können im Head oder in anderen Komponenten nach Bedarf verwendet werden
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Zusätzlicher Inhalt */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
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

// ... Restlicher Code einschließlich getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslation, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");


const HomePage = ({ metadata }) => {
  // Metadaten können im Head oder in anderen Komponenten nach Bedarf verwendet werden
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Zusätzlicher Inhalt */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
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

// ... Restlicher Code einschließlich getStaticPaths
```

### (Optional) Schritt 9: Die Sprache Ihrer Inhalte ändern

Um Benutzern zu ermöglichen, die Sprache dynamisch zu wechseln, verwenden Sie die Funktion `setLocale`, die vom Hook `useLocale` bereitgestellt wird.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

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
              {/* Sprache - z. B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z. B. Francés mit aktueller Sprache auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
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
              {/* Sprache - z. B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z. B. Francés mit aktueller Sprache auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
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
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
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
              {/* Sprache - z. B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z. B. Francés mit aktueller Sprache auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        </option>
      ))}
    </select>
  );
};
```

> Die API `useLocalePageRouter` ist identisch mit `useLocale`. Weitere Informationen zum `useLocale`-Hook finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useLocale.md).

> Dokumentationsreferenzen:
>
> - [`getLocaleName`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`-Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang`-Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir`-Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`-Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache respektiert, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt internen URLs automatisch die aktuelle Sprache voran, sodass beispielsweise ein französischsprachiger Benutzer beim Klicken auf einen Link zur Seite "Über uns" zu `/fr/about` statt zu `/about` weitergeleitet wird.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten Benutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in Ihrer gesamten Anwendung stellen Sie sicher, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung von URLs und macht Ihren Code einfacher zu warten und zu erweitern, wenn Ihre Anwendung wächst.

Nachfolgend finden Sie die Implementierung einer lokalisierten `Link`-Komponente in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Hilfsfunktion, um zu überprüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Sprache zu versehen (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation innerhalb des gleichen Sprachkontexts bleibt.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und ein gültiges href bereitgestellt wird, holen Sie die lokalisierte URL.
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
 * Hilfsfunktion, um zu überprüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Sprache zu versehen (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation innerhalb des gleichen Sprachkontexts bleibt.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und ein gültiges href bereitgestellt wird, holen Sie die lokalisierte URL.
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
 * Hilfsfunktion, um zu überprüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und ein gültiges href bereitgestellt wird, holen Sie die lokalisierte URL.
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

#### Funktionsweise

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert, da sie keine Lokalisierung benötigen.

- **Abrufen der aktuellen Sprache**:  
  Der Hook `useLocale` liefert die aktuelle Sprache (z. B. `fr` für Französisch).

- **Lokalisierung der URL**:  
  Für interne Links (d. h. nicht extern) wird `getLocalizedUrl` verwendet, um die URL automatisch mit der aktuellen Sprache zu versehen. Das bedeutet, dass bei einem Benutzer, der Französisch verwendet, `/about` als `href` zu `/fr/about` transformiert wird.

- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL zurück und stellt sicher, dass die Navigation mit der Sprache übereinstimmt.

Durch die Integration dieser `Link`-Komponente in Ihrer gesamten Anwendung erhalten Sie eine kohärente und sprachbewusste Benutzererfahrung und profitieren gleichzeitig von einer verbesserten SEO und Benutzerfreundlichkeit.

### TypeScript konfigurieren

Intlayer verwendet Modulerweiterungen, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Schließen Sie die automatisch generierten Typen ein
  ],
}
```

### Git-Konfiguration

Um Ihr Repository sauber zu halten und das Commiten generierter Dateien zu vermeiden, wird empfohlen, die von Intlayer erstellten Dateien zu ignorieren.

Fügen Sie die folgenden Zeilen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```

## Zusätzliche Ressourcen

- **Intlayer-Dokumentation:** [GitHub-Repository](https://github.com/aymericzip/intlayer)
- **Wörterbuch-Leitfaden:** [Wörterbuch](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md)
- **Konfigurationsdokumentation:** [Konfigurationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md)

Durch die Befolgung dieser Anleitung können Sie Intlayer effektiv in Ihre Next.js-Anwendung mit dem Page Router integrieren und eine robuste und skalierbare Unterstützung für die Internationalisierung Ihrer Webprojekte ermöglichen.

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mithilfe des [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) auslagern.
