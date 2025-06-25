---
docName: intlayer_with_nextjs_15
url: https://intlayer.org/doc/environment/nextjs
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md
createdAt: 2024-12-06
updatedAt: 2024-12-07
title: Übersetzen Sie Ihre Next.js 15-Website (i18n)
description: Entdecken Sie, wie Sie Ihre Next.js 15-Website mehrsprachig gestalten. Befolgen Sie die Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js 15
  - JavaScript
  - React
---

# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und Next.js 15 App Router

<iframe title="The best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Siehe [Application Template](https://github.com/aymericzip/intlayer-next-15-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen. Intlayer integriert sich nahtlos in das neueste **Next.js 15**-Framework, einschließlich seines leistungsstarken **App Routers**. Es ist optimiert für die Arbeit mit **Serverkomponenten** für effizientes Rendering und vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **Übersetzungen sowohl in clientseitigen als auch in serverseitigen Komponenten nutzen**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und -umschaltung.

> Intlayer ist kompatibel mit Next.js 12, 13, 14 und 15. Wenn Sie den Next.js Page Router verwenden, können Sie diesen [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_page_router.md) konsultieren. Für Next.js 12, 13, 14 mit App Router, siehe diesen [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_14.md).

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

  Das Kernpaket, das Internationalisierungstools für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **next-intlayer**

  Das Paket, das Intlayer mit Next.js integriert. Es bietet Kontextanbieter und Hooks für die Internationalisierung in Next.js. Zusätzlich enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und URL-Weiterleitung.

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
      // Ihre weiteren Sprachen
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
      // Ihre weiteren Sprachen
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
      // Ihre weiteren Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Protokolle in der Konsole deaktivieren und mehr. Für eine vollständige Liste der verfügbaren Parameter lesen Sie die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Next.js-Konfiguration integrieren

Konfigurieren Sie Ihr Next.js-Setup, um Intlayer zu verwenden:

```typescript filename="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Konfigurationsoptionen hier */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Konfigurationsoptionen hier */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Konfigurationsoptionen hier */
};

module.exports = withIntlayer(nextConfig);
```

> Das `withIntlayer()` Next.js-Plugin wird verwendet, um Intlayer mit Next.js zu integrieren. Es stellt sicher, dass Inhaltsdeklarationsdateien erstellt und im Entwicklungsmodus überwacht werden. Es definiert Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/)- oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)-Umgebungen. Darüber hinaus bietet es Aliase zur Leistungsoptimierung und stellt die Kompatibilität mit Serverkomponenten sicher.

### Schritt 4: Dynamische Sprachrouten definieren

Entfernen Sie alles aus `RootLayout` und ersetzen Sie es durch den folgenden Code:

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

> Das Halten der `RootLayout`-Komponente leer ermöglicht das Setzen der [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang)- und [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir)-Attribute für das `<html>`-Tag.

Um dynamisches Routing zu implementieren, geben Sie den Pfad für die Sprache an, indem Sie ein neues Layout in Ihrem `[locale]`-Verzeichnis hinzufügen:

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

> Das `[locale]`-Pfadsegment wird verwendet, um die Sprache zu definieren. Beispiel: `/en-US/about` bezieht sich auf `en-US` und `/fr/about` auf `fr`.

> In diesem Stadium werden Sie auf den Fehler stoßen: `Error: Missing <html> and <body> tags in the root layout.`. Dies ist zu erwarten, da die Datei `/app/page.tsx` nicht mehr verwendet wird und entfernt werden kann. Stattdessen wird das `[locale]`-Pfadsegment die Seite `/app/[locale]/page.tsx` aktivieren. Folglich sind Seiten über Pfade wie `/en`, `/fr`, `/es` in Ihrem Browser zugänglich. Um die Standardsprache als Root-Seite festzulegen, beziehen Sie sich auf die `middleware`-Einrichtung in Schritt 7.

Implementieren Sie dann die Funktion `generateStaticParams` in Ihrem Anwendungs-Layout.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Zeile einfügen

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Restlicher Code*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Zeile einfügen

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Restlicher Code*/
};

// ... Restlicher Code
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Zeile einfügen

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Restlicher Code*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` stellt sicher, dass Ihre Anwendung die erforderlichen Seiten für alle Sprachen vorab erstellt, wodurch die Laufzeitberechnung reduziert und die Benutzererfahrung verbessert wird. Weitere Details finden Sie in der [Next.js-Dokumentation zu generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Schritt 5: Inhalte deklarieren

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

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

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir`-Verzeichnis (standardmäßig `./src`) enthalten sind und mit der Inhaltsdeklarationsdateierweiterung übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`). Weitere Details finden Sie in der [Inhaltsdeklarationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 6: Inhalte in Ihrem Code verwenden

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu:

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

- **`IntlayerClientProvider`** wird verwendet, um die Sprache an clientseitige Komponenten zu übergeben. Es kann in jeder übergeordneten Komponente, einschließlich des Layouts, platziert werden. Es wird jedoch empfohlen, es in einem Layout zu platzieren, da Next.js Layout-Code über Seiten hinweg teilt, was effizienter ist. Durch die Verwendung von `IntlayerClientProvider` im Layout vermeiden Sie, dass es für jede Seite neu initialisiert wird, was die Leistung verbessert und einen konsistenten Lokalisierungskontext in Ihrer gesamten Anwendung gewährleistet.
- **`IntlayerServerProvider`** wird verwendet, um die Sprache an die serverseitigen Kinder zu übergeben. Es kann nicht im Layout platziert werden.

  > Layout und Seite können keinen gemeinsamen Serverkontext teilen, da das Serversystem auf einem pro-Anfrage-Datenspeicher basiert (über den [React-Cache](https://react.dev/reference/react/cache)-Mechanismus), wodurch jeder „Kontext“ für verschiedene Segmente der Anwendung neu erstellt wird. Das Platzieren des Providers in einem gemeinsamen Layout würde diese Isolation brechen und verhindern, dass die korrekten Werte des Serverkontexts an Ihre Serverkomponenten weitergegeben werden.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Erstellen Sie die zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("client-component-example"); // Erstellen Sie die zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("client-component-example"); // Erstellen Sie die zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("server-component-example"); // Erstellen Sie die zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("server-component-example"); // Erstellen Sie die zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("server-component-example"); // Erstellen Sie die zugehörige Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Wenn Sie Ihre Inhalte in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Um mehr über den `useIntlayer`-Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayer.md).

### (Optional) Schritt 7: Middleware für die Spracherkennung konfigurieren

Richten Sie Middleware ein, um die bevorzugte Sprache des Benutzers zu erkennen:

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

> Die `intlayerMiddleware` wird verwendet, um die bevorzugte Sprache des Benutzers zu erkennen und ihn auf die entsprechende URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) angegeben. Darüber hinaus ermöglicht sie das Speichern der bevorzugten Sprache des Benutzers in einem Cookie.

### (Optional) Schritt 8: Internationalisierung Ihrer Metadaten

Falls Sie Ihre Metadaten, wie den Titel Ihrer Seite, internationalisieren möchten, können Sie die von Next.js bereitgestellte Funktion `generateMetadata` verwenden. Innerhalb der Funktion verwenden Sie die Funktion `getTranslation`, um Ihre Metadaten zu übersetzen.

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
   * Generiert ein Objekt, das alle URLs für jede Sprache enthält.
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
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Restlicher Code
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  /**
   * Generiert ein Objekt, das alle URLs für jede Sprache enthält.
   *
   * Beispiel:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Gibt zurück
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
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Restlicher Code
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  /**
   * Generiert ein Objekt, das alle URLs für jede Sprache enthält.
   *
   * Beispiel:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Gibt zurück
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
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

module.exports = { generateMetadata };

// ... Restlicher Code
````

> Erfahren Sie mehr über die Metadatenoptimierung [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Schritt 9: Internationalisierung Ihrer sitemap.xml und robots.txt

Um Ihre `sitemap.xml` und `robots.txt` zu internationalisieren, können Sie die von Intlayer bereitgestellte Funktion `getMultilingualUrls` verwenden. Diese Funktion ermöglicht es Ihnen, mehrsprachige URLs für Ihre Sitemap zu generieren.

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

> Erfahren Sie mehr über die Sitemap-Optimierung [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Erfahren Sie mehr über die robots.txt-Optimierung [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optional) Schritt 10: Die Sprache Ihrer Inhalte ändern

Um die Sprache Ihrer Inhalte in Next.js zu ändern, wird empfohlen, die `Link`-Komponente zu verwenden, um Benutzer auf die entsprechende lokalisierte Seite umzuleiten. Die `Link`-Komponente ermöglicht das Vorladen der Seite, was hilft, einen vollständigen Seitenneuladen zu vermeiden.

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

> Dokumentationsreferenzen:
>
> - [`useLocale`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md)
> - [`getLocaleName`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`-Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang`-Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir`-Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`-Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Optional) Schritt 11: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt internen URLs automatisch die aktuelle Sprache voran, sodass z. B. ein französischsprachiger Benutzer, der auf einen Link zur Seite „Über uns“ klickt, zu `/fr/about` statt zu `/about` weitergeleitet wird.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten Benutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in Ihrer gesamten Anwendung stellen Sie sicher, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung von URLs und macht Ihren Code einfacher wartbar und erweiterbar, wenn Ihre Anwendung wächst.

Nachfolgend finden Sie die Implementierung einer lokalisierten `Link`-Komponente in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Hilfsfunktion, um zu überprüfen, ob eine angegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Sprache zu präfixieren (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation innerhalb des gleichen Sprachkontexts bleibt.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und ein gültiges href angegeben ist, holen Sie die lokalisierte URL.
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
 * Hilfsfunktion, um zu überprüfen, ob eine angegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Sprache zu präfixieren (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation innerhalb des gleichen Sprachkontexts bleibt.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und ein gültiges href angegeben ist, holen Sie die lokalisierte URL.
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
 * Hilfsfunktion, um zu überprüfen, ob eine angegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Sprache zu präfixieren (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation innerhalb des gleichen Sprachkontexts bleibt.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und ein gültiges href angegeben ist, holen Sie die lokalisierte URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Wie es funktioniert

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert, da sie keine Lokalisierung benötigen.

- **Abrufen der aktuellen Sprache**:  
  Der `useLocale`-Hook liefert die aktuelle Sprache (z. B. `fr` für Französisch).

- **Lokalisierung der URL**:  
  Für interne Links (d. h. nicht extern) wird `getLocalizedUrl` verwendet, um die URL automatisch mit der aktuellen Sprache zu präfixieren. Das bedeutet, dass bei einem Benutzer, der Französisch verwendet, das Übergeben von `/about` als `href` in `/fr/about` umgewandelt wird.

- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL zurück, wodurch sichergestellt wird, dass die Navigation mit der Sprache übereinstimmt.

Durch die Integration dieser `Link`-Komponente in Ihrer gesamten Anwendung gewährleisten Sie eine kohärente und sprachbewusste Benutzererfahrung und profitieren gleichzeitig von verbesserter SEO und Benutzerfreundlichkeit.

### (Optional) Schritt 12: Optimieren Sie Ihre Bundle-Größe

Bei der Verwendung von `next-intlayer` werden Wörterbücher standardmäßig in das Bundle für jede Seite aufgenommen. Um die Bundle-Größe zu optimieren, bietet Intlayer ein optionales SWC-Plugin, das `useIntlayer`-Aufrufe intelligent durch Makros ersetzt. Dies stellt sicher, dass Wörterbücher nur in Bundles für Seiten enthalten sind, die sie tatsächlich verwenden.

Um diese Optimierung zu aktivieren, installieren Sie das `@intlayer/swc`-Paket. Nach der Installation erkennt und verwendet `next-intlayer` das Plugin automatisch:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> Hinweis: Diese Optimierung ist nur für Next.js 13 und höher verfügbar.

> Hinweis: Dieses Paket ist standardmäßig nicht installiert, da SWC-Plugins in Next.js noch experimentell sind. Dies könnte sich in Zukunft ändern.

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
    ".intlayer/**/*.ts", // Einschließen der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, dass diese in Ihr Git-Repository aufgenommen werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignorieren der von Intlayer generierten Dateien
.intlayer
```

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.
