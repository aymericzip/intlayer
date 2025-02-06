# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für Internationalisierung (i18n), die darauf ausgelegt ist, die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen. Intlayer integriert sich nahtlos mit dem neuesten **Next.js**-Framework, einschließlich dessen traditionellem **Page Router**.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Dynamisch Metadaten**, Routen und Inhalte lokalisieren.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Spracherkennung und Sprachenwechsel.

> Intlayer ist kompatibel mit Next.js 12, 13, 14 und 15. Wenn Sie den Next.js App Router verwenden, beachten Sie die [App Router Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_14.md). Für Next.js 15 folgen Sie dieser [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

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

  Das Kernpaket, das Tools zur Internationalisierung für Konfigurationsmanagement, Übersetzung, [Inhaltserklärung](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **next-intlayer**

  Das Paket, das Intlayer mit Next.js integriert. Es stellt Kontextanbieter und Hooks für die Internationalisierung in Next.js bereit. Außerdem enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

### Schritt 2: Ihr Projekt konfigurieren

Erstellen Sie eine Konfigurationsdatei, um die von Ihrer Anwendung unterstützten Sprachen festzulegen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Fügen Sie hier Ihre weiteren Sprachen hinzu
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
      // Fügen Sie hier Ihre weiteren Sprachen hinzu
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
      // Fügen Sie hier Ihre weiteren Sprachen hinzu
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltserklärungen, die Deaktivierung der Intlayer-Protokolle in der Konsole und vieles mehr festlegen. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer mit der Next.js-Konfiguration integrieren

Ändern Sie Ihre Next.js-Konfiguration, um Intlayer zu integrieren:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ihre vorhandene Next.js-Konfiguration
};

export default withIntlayer(nextConfig);
```

> Das `withIntlayer()` Next.js-Plugin wird verwendet, um Intlayer mit Next.js zu integrieren. Es sorgt dafür, dass Dateien für Inhaltserklärungen generiert werden und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) Umgebungen. Außerdem bietet es Aliase zur Optimierung der Leistung und gewährleistet die Kompatibilität mit Serverkomponenten.

### Schritt 4: Middleware zur Spracherkennung konfigurieren

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

> Passen Sie den `matcher`-Parameter an, um die Routen Ihrer Anwendung anzupassen. Weitere Informationen finden Sie in der [Next.js-Dokumentation zur Konfiguration des Matchers](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Schritt 5: Dynamische Sprachrouten definieren

Implementieren Sie die dynamische Routenführung, um lokalisierte Inhalte basierend auf der Sprache des Benutzers bereitzustellen.

1.  **Erstellen Sie sprachspezifische Seiten:**

    Benennen Sie Ihre Hauptseiten-Datei um, um das dynamische Segment `[locale]` einzuschließen.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Aktualisieren Sie `_app.tsx`, um die Lokalisierung zu behandeln:**

    Ändern Sie Ihr `_app.tsx`, um Intlayer-Anbieter einzuschließen.

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

3.  **Richten Sie `getStaticPaths` und `getStaticProps` ein:**

    Definieren Sie in Ihrer `[locale]/index.tsx` die Pfade und Props zur Handhabung verschiedener Sprachen.

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

> `getStaticPaths` und `getStaticProps` stellen sicher, dass Ihre Anwendung die erforderlichen Seiten für alle Sprachen im Next.js Page Router vorab generiert. Dieser Ansatz reduziert die Rechenleistung zur Laufzeit und führt zu einem verbesserten Nutzererlebnis. Für weitere Details, beachten Sie die Next.js-Dokumentation zu [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) und [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Schritt 6: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltserklärungen zur Speicherung von Übersetzungen.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Willkommen auf meiner Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Fangen Sie an, indem Sie diese Seite bearbeiten.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Fangen Sie an, indem Sie diese Seite bearbeiten.",
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

/** @type {import('intlayer').DeclarationContent} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Fangen Sie an, indem Sie diese Seite bearbeiten.",
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
        "en": "Fangen Sie an, indem Sie diese Seite bearbeiten.",
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

Für weitere Informationen zur Deklaration von Inhalten, beachten Sie die [Inhaltserklärungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).

### Schritt 7: Inhalt in Ihrem Code nutzen

Greifen Sie auf Ihre Inhaltswörterbücher in der gesamten Anwendung zu, um übersetzte Inhalte anzuzeigen.

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

// ... Rest des Codes, einschließlich getStaticPaths und getStaticProps

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

// ... Rest des Codes, einschließlich getStaticPaths und getStaticProps

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

// ... Rest des Codes, einschließlich getStaticPaths und getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Stellen Sie sicher, dass Sie eine entsprechende Inhaltserklärung haben

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
  const content = useIntlayer("component-example"); // Stellen Sie sicher, dass Sie eine entsprechende Inhaltserklärung haben

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
  const content = useIntlayer("component-example"); // Stellen Sie sicher, dass Sie eine entsprechende Inhaltserklärung haben

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Beim Einsatz von Übersetzungen in `string`-Attributen (z. B. `alt`, `title`, `href`, `aria-label`) sollte der Wert der Funktion wie folgt aufgerufen werden:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Um mehr über den `useIntlayer`-Hook zu erfahren, beachten Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useIntlayer.md).

### (Optional) Schritt 8: Internationalisieren Sie Ihre Metadaten

Um Metadaten wie Seitentitel und Beschreibungen zu internationalisieren, verwenden Sie die Funktion `getStaticProps` in Verbindung mit der Funktion `getTranslationContent` von Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Metadaten können im Kopf oder in anderen Komponenten verwendet werden
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Zusätzliche Inhalte */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Meine Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Willkommen auf meiner Website.",
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

// ... Rest des Codes einschließlich getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // Metadaten können im Kopf oder in anderen Komponenten verwendet werden
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Zusätzliche Inhalte */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Meine Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Willkommen auf meiner Website.",
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

// ... Rest des Codes einschließlich getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslationContent, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // Metadaten können im Kopf oder in anderen Komponenten verwendet werden
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Zusätzliche Inhalte */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Meine Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Willkommen auf meiner Website.",
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

// ... Rest des Codes einschließlich getStaticPaths
```

### (Optional) Schritt 9: Ändern Sie die Sprache Ihres Inhalts

Um den Benutzern zu ermöglichen, die Sprachen dynamisch zu wechseln, verwenden Sie die Funktion `setLocale`, die vom `useLocale`-Hook bereitgestellt wird.

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
              {/* Sprache in ihrer eigenen Sprache - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z. B. Francés mit aktueller Spracheinstellung Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z. B. FR */}
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
              {/* Sprache in ihrer eigenen Sprache - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z. B. Francés mit aktueller Spracheinstellung Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z. B. FR */}
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
              {/* Sprache in ihrer eigenen Sprache - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z. B. Francés mit aktueller Spracheinstellung Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z. B. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> Die `useLocalePageRouter` API entspricht der von `useLocale`. Um mehr über den `useLocale`-Hook zu erfahren, beachten Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useLocale.md).

> Dokumentationsreferenzen:
>
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`-Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang`-Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir`-Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`-Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **Beispiel der Vorteile von TypeScript:**

   ![Autocompletion Example](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Translation Error Example](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Git-Konfiguration

Um Ihr Repository sauber zu halten und die Einfügung generierter Dateien zu vermeiden, wird empfohlen, die von Intlayer erstellten Dateien zu ignorieren.

Fügen Sie die folgenden Zeilen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

## Zusätzliche Ressourcen

- **Intlayer-Dokumentation:** [GitHub-Repository](https://github.com/aymericzip/intlayer)
- **Inhaltserklärungsanleitung:** [Inhaltserklärung](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md)
- **Konfigurationsdokumentation:** [Konfigurationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md)

Durch die Befolgung dieser Anleitung können Sie Intlayer erfolgreich in Ihre Next.js-Anwendung mit dem Page Router integrieren und eine robuste und skalierbare Internationalisierungsunterstützung für Ihre Webprojekte aktivieren.
