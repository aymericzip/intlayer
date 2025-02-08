# Getting Started internationalizing (i18n) with Intlayer und Next.js 14 mit App Router

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek zur Internationalisierung (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Intlayer integriert sich nahtlos mit dem neuesten **Next.js 14** Framework, einschließlich seines leistungsstarken **App Routers**. Es ist optimiert für die Arbeit mit **Server Components** für effizientes Rendern und vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (von Next.js >= 15).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Dynamisch Metadaten**, Routen und Inhalte lokalisieren.
- **Zugriff auf Übersetzungen in sowohl clientseitigen als auch serverseitigen Komponenten**.
- **TypeScript-Unterstützung sicherstellen** mit automatisierten Typen, die die Autovervollständigung und Fehlersuche verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Lokalisierungserkennung und -wechsel.

> Intlayer ist kompatibel mit Next.js 12, 13, 14 und 15. Wenn Sie den Next.js Page Router verwenden, können Sie sich auf diesen [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_page_router.md) beziehen. Für Next.js 15 mit oder ohne Turbopack, beziehen Sie sich auf diesen [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

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

  Das Kernpaket, das Werkzeuge zur Internationalisierung für die Konfigurationsverwaltung, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **next-intlayer**

  Das Paket, das Intlayer mit Next.js integriert. Es stellt Kontextanbieter und Hooks für die Next.js-Internationalisierung bereit. Darüber hinaus enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), sowie Middleware zum Erkennen der bevorzugten Spracheinstellungen des Benutzers, zum Verwalten von Cookies und zum Handhaben von URL-Umleitungen.

### Schritt 2: Projekt konfigurieren

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre anderen Lokalisierungen
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
      // Ihre anderen Lokalisierungen
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
      // Ihre anderen Lokalisierungen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Umleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Protokolle in der Konsole deaktivieren und mehr. Für eine vollständige Liste verfügbarer Parameter siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihrer Next.js-Konfiguration integrieren

Konfigurieren Sie Ihr Next.js-Setup, um Intlayer zu verwenden:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> Das `withIntlayer()` Next.js-Plugin wird verwendet, um Intlayer mit Next.js zu integrieren. Es stellt sicher, dass Inhalteerklärungsdateien erstellt werden und überwacht sie im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) Umgebungen. Darüber hinaus bietet es Aliase zur Optimierung der Leistung und gewährleistet die Kompatibilität mit Serverkomponenten.

### Schritt 4: Middleware zur Lokalisierungserkennung konfigurieren

Richten Sie Middleware ein, um die bevorzugte Spracheinstellung des Benutzers zu erkennen:

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

> Die `intlayerMiddleware` wird verwendet, um die bevorzugte Spracheinstellung des Benutzers zu erkennen und ihn zur entsprechenden URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) angegeben. Zusätzlich ermöglicht sie das Speichern der bevorzugten Spracheinstellung des Benutzers in einem Cookie.

> Passen Sie den `matcher`-Parameter an, um die Routen Ihrer Anwendung abzugleichen. Für weitere Informationen siehe die [Next.js-Dokumentation zur Konfiguration des Matchers](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Schritt 5: Dynamische Lokalerouten definieren

Entfernen Sie alles aus `RootLayout` und ersetzen Sie es durch den folgenden Code:

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

> Durch das Leeren der `RootLayout`-Komponente können die [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) und [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) Attribute im `<html>` Tag festgelegt werden.

Um dynamisches Routing zu implementieren, geben Sie den Pfad für die Lokalisierung an, indem Sie ein neues Layout in Ihrem `[locale]`-Verzeichnis hinzufügen:

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

> Der `[locale]`-Pfadsegment wird verwendet, um die Lokalisierung zu definieren. Beispiel: `/en-US/about` wird auf `en-US` verweisen und `/fr/about` auf `fr`.

Implementieren Sie dann die Funktion `generateStaticParams` in Ihrem Anwendungs-Layout.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Zeile zum Einfügen

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Rest des Codes*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Zeile zum Einfügen

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Rest des Codes*/
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Zeile zum Einfügen

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Rest des Codes*/
};

module.exports = LocaleLayout;
```

> `generateStaticParams` sorgt dafür, dass Ihre Anwendung die erforderlichen Seiten für alle Lokalisierungen vorab erstellt, um die Laufzeitberechnung zu minimieren und das Benutzererlebnis zu verbessern. Für weitere Details siehe die [Next.js-Dokumentation zu generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Schritt 6: Ihren Inhalt deklarieren

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sofern sie in das `contentDir`-Verzeichnis (standardmäßig `./src`) eingeschlossen sind. Außerdem muss die Erweiterung der Inhaltsdeklarationsdatei übereinstimmen (standardmäßig `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).

### Schritt 7: Inhalt in Ihrem Code verwenden

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu:

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

- **`IntlayerClientProvider`** wird verwendet, um die Lokalisierung an clientseitige Komponenten bereitzustellen. Es kann in jeder übergeordneten Komponente platziert werden, einschließlich des Layouts. Es wird jedoch empfohlen, es in einem Layout zu verwenden, da Next.js Layoutcode über Seiten hinweg teilt, was es effizienter macht. Wenn Sie `IntlayerClientProvider` im Layout verwenden, vermeiden Sie eine erneute Initialisierung für jede Seite, was die Leistung verbessert und einen konsistenten Lokalisierungskontext in Ihrer Anwendung beibehält.
- **`IntlayerServerProvider`** wird verwendet, um die Lokalisierung an serverseitige Kinder bereitzustellen. Es kann nicht im Layout festgelegt werden.

  > Layout und Seite können keinen gemeinsamen Serverkontext teilen, da das System für den Serverkontext auf einem pro-Anfrage-Datenlager (über den [Cache von React](https://react.dev/reference/react/cache)-Mechanismus) basiert, wodurch jeder „Kontext“ für verschiedene Segmente der Anwendung neu erstellt wird. Das Platzieren des Providers in einem gemeinsamen Layout würde diese Isolation aufbrechen und die korrekte Weitergabe der Werte des Serverkontexts an Ihre Serverkomponenten verhindern.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Verwandte Inhaltsdeklaration erstellen

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
  const content = useIntlayer("client-component-example"); // Verwandte Inhaltsdeklaration erstellen

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
  const content = useIntlayer("client-component-example"); // Verwandte Inhaltsdeklaration erstellen

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Verwandte Inhaltsdeklaration erstellen

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
  const content = useIntlayer("server-component-example"); // Verwandte Inhaltsdeklaration erstellen

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
  const content = useIntlayer("server-component-example"); // Verwandte Inhaltsdeklaration erstellen

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Wenn Sie Ihren Inhalt in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie z.B.:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Um mehr über den `useIntlayer`-Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useIntlayer.md).

### (Optional) Schritt 8: Internationalisierung Ihrer Metadaten

Wenn Sie Ihre Metadaten internationalisieren möchten, wie z.B. den Titel Ihrer Seite, können Sie die von Next.js bereitgestellte Funktion `generateMetadata` verwenden. Innerhalb der Funktion verwenden Sie die Funktion `getTranslation`, um Ihre Metadaten zu übersetzen.

````typescript fileName="src/app/[locale]/layout.tsx oder src/app/[locale]/page.tsx" codeFormat="typescript"
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
   * Generiert ein Objekt, das alle URLs für jede Lokalisierung enthält.
   *
   * Beispiel:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Gibt zurück
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

// ... Rest des Codes
````

````javascript fileName="src/app/[locale]/layout.msx oder src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  /**
   * Generiert ein Objekt, das alle URLs für jede Lokalisierung enthält.
   *
   * Beispiel:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Gibt zurück
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

// ... Rest des Codes
````

````javascript fileName="src/app/[locale]/layout.cjs oder src/app/[locale]/page.cjs" codeFormat="javascript"
const { getTranslation, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  /**
   * Generiert ein Objekt, das alle URLs für jede Lokalisierung enthält.
   *
   * Beispiel:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Gibt zurück
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

// ... Rest des Codes
````

> Erfahren Sie mehr über die Optimierung der Metadaten [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Schritt 9: Internationalisierung Ihrer sitemap.xml und robots.txt

Um Ihre `sitemap.xml` und `robots.txt` zu internationalisieren, können Sie die von Intlayer bereitgestellte Funktion `getMultilingualUrls` verwenden. Diese Funktion ermöglicht es Ihnen, mehrsprachige URLs für Ihre Sitemap zu generieren.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
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

> Erfahren Sie mehr über die Optimierung der Sitemap [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Erfahren Sie mehr über die Optimierung von robots.txt [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optional) Schritt 10: Ändern der Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die von dem Hook `useLocale` bereitgestellte Funktion `setLocale` verwenden. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

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

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
              {/* Sprache in ihrer eigenen Sprache - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z.B. Francés mit aktueller Spracheinstellung auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z.B. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
              {/* Sprache in ihrer eigenen Sprache - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z.B. Francés mit aktueller Spracheinstellung auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z.B. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
              {/* Sprache in ihrer eigenen Sprache - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z.B. Francés mit aktueller Spracheinstellung auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z.B. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> Dokumentationsreferenzen:
>
> - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### TypeScript konfigurieren

Intlayer verwendet Modulergänzung, um die Vorteile von TypeScript zu nutzen und Ihren Code zu stärken.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen umfasst.

```json5 fileName="tsconfig.json"
{
  // ... Ihre vorhandenen TypeScript-Konfigurationen
  "include": [
    // ... Ihre vorhandenen TypeScript-Konfigurationen
    "types", // Die automatisch generierten Typen einbeziehen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, dass sie in Ihr Git-Repository eingecheckt werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```
