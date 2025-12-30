---
createdAt: 2025-10-25
updatedAt: 2025-12-30
title: Wie Sie Ihre Next.js 16 App übersetzen – i18n Leitfaden 2026
description: Entdecken Sie, wie Sie Ihre Next.js 16 Website mehrsprachig machen. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
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
  - version: 7.5.9
    date: 2025-12-30
    changes: Init-Befehl hinzufügen
  - version: 7.0.0
    date: 2025-06-29
    changes: Initiale Historie
---

# Übersetzen Sie Ihre Next.js 16 Website mit Intlayer | Internationalisierung (i18n)

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Die beste i18n-Lösung für Next.js? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

Siehe [Application Template](https://github.com/aymericzip/intlayer-next-16-template) auf GitHub.

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen. Intlayer integriert sich nahtlos in das neueste **Next.js 16**-Framework, einschließlich seines leistungsstarken **App Routers**. Es ist optimiert für die Arbeit mit **Server Components** für effizientes Rendering und ist vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** durch deklarative Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **Übersetzungen sowohl in Client- als auch in Server-Komponenten nutzen**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Profitieren Sie von erweiterten Funktionen**, wie dynamischer Spracherkennung und -umschaltung.

> Intlayer ist kompatibel mit Next.js 12, 13, 14 und 16. Wenn Sie den Next.js Page Router verwenden, können Sie sich an dieser [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_page_router.md) orientieren. Für Next.js 12, 13, 14 mit App Router, siehe diese [Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_14.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **next-intlayer**

  Das Paket, das Intlayer mit Next.js integriert. Es stellt Kontextanbieter und Hooks für die Internationalisierung in Next.js bereit. Zusätzlich enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie einen Proxy zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

### Schritt 2: Konfigurieren Sie Ihr Projekt

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

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Proxy-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter lesen Sie bitte die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Next.js-Konfiguration

Konfigurieren Sie Ihre Next.js-Umgebung, um Intlayer zu verwenden:

```typescript fileName="next.config.ts" codeFormat="typescript"
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

> Das Next.js-Plugin `withIntlayer()` wird verwendet, um Intlayer in Next.js zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) Umgebungen. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren und gewährleistet die Kompatibilität mit Server-Komponenten.

> Die Funktion `withIntlayer()` ist eine Promise-Funktion. Sie ermöglicht es, die Intlayer-Wörterbücher vorzubereiten, bevor der Build startet. Wenn Sie sie mit anderen Plugins verwenden möchten, können Sie sie mit `await` aufrufen. Beispiel:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Wenn Sie es synchron verwenden möchten, können Sie die Funktion `withIntlayerSync()` verwenden. Beispiel:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

### Schritt 4: Definieren Sie dynamische Locale-Routen

Entfernen Sie alles aus `RootLayout` und ersetzen Sie es durch den folgenden Code:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Sie können die Kinder weiterhin mit anderen Providern umschließen, wie z.B. `next-themes`, `react-query`, `framer-motion` usw.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Sie können die Kinder weiterhin mit anderen Providern umschließen, wie `next-themes`, `react-query`, `framer-motion` usw.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Sie können die Kinder weiterhin mit anderen Providern umschließen, wie `next-themes`, `react-query`, `framer-motion` usw.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Die `RootLayout`-Komponente leer zu halten, ermöglicht es, die Attribute [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) und [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) im `<html>`-Tag zu setzen.

Um dynamisches Routing zu implementieren, geben Sie den Pfad für die Locale an, indem Sie ein neues Layout in Ihrem `[locale]`-Verzeichnis hinzufügen:

````tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
> Die `RootLayout`-Komponente leer zu halten, ermöglicht es, die Attribute [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) und [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) im `<html>`-Tag zu setzen.

Um dynamisches Routing zu implementieren, geben Sie den Pfad für die Locale an, indem Sie ein neues Layout in Ihrem `[locale]`-Verzeichnis hinzufügen:

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
````

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

> Das Pfadsegment `[locale]` wird verwendet, um die Locale zu definieren. Beispiel: `/en-US/about` bezieht sich auf `en-US` und `/fr/about` auf `fr`.

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

````

> Das Pfadsegment `[locale]` wird verwendet, um die Spracheinstellung (Locale) zu definieren. Beispiel: `/en-US/about` bezieht sich auf `en-US` und `/fr/about` auf `fr`.

> In diesem Stadium werden Sie auf den Fehler stoßen: `Error: Missing <html> and <body> tags in the root layout.`. Dies ist zu erwarten, da die Datei `/app/page.tsx` nicht mehr verwendet wird und entfernt werden kann. Stattdessen aktiviert das Pfadsegment `[locale]` die Seite `/app/[locale]/page.tsx`. Folglich sind die Seiten über Pfade wie `/en`, `/fr`, `/es` in Ihrem Browser zugänglich. Um die Standardsprache als Root-Seite festzulegen, siehe die `proxy`-Konfiguration in Schritt 7.

Implementieren Sie dann die Funktion `generateStaticParams` in Ihrem Anwendungs-Layout.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Zeile zum Einfügen

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Rest des Codes*/
};

export default LocaleLayout;
````

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Zeile zum Einfügen

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Rest des Codes*/
};

// ... Rest des Codes
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Zeile zum Einfügen

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Rest des Codes*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` stellt sicher, dass Ihre Anwendung die notwendigen Seiten für alle Sprachen vorab erstellt, wodurch die Laufzeitberechnung reduziert und die Benutzererfahrung verbessert wird. Weitere Details finden Sie in der [Next.js-Dokumentation zu generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer arbeitet mit `export const dynamic = 'force-static';`, um sicherzustellen, dass die Seiten für alle Sprachen vorab erstellt werden.

### Schritt 5: Deklarieren Sie Ihre Inhalte

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
// Inhalt der Seite deklarieren
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
        de: "Beginnen Sie mit der Bearbeitung",
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
        "de": "Beginnen Sie mit der Bearbeitung",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` (standardmäßig `./src`) aufgenommen werden. Und sie müssen die Dateiendung für Inhaltsdeklarationen erfüllen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 6: Inhalte in Ihrem Code verwenden

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

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
      <p>{content.getStarted.main}</p> {/* Hauptinhalt von getStarted */}
      <code>{content.getStarted.pageLink}</code>{" "}
      {/* Seitenlink von getStarted */}
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
      <p>{content.getStarted.main}</p> {/* Hauptinhalt zum Einstieg */}
      <code>{content.getStarted.pageLink}</code> {/* Link zur Seite */}
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

- **`IntlayerClientProvider`** wird verwendet, um die Locale an Client-seitige Komponenten bereitzustellen. Es kann in jeder übergeordneten Komponente platziert werden, einschließlich des Layouts. Es wird jedoch empfohlen, es im Layout zu platzieren, da Next.js Layout-Code über Seiten hinweg teilt, was effizienter ist. Durch die Verwendung von `IntlayerClientProvider` im Layout vermeidet man die erneute Initialisierung für jede Seite, verbessert die Leistung und sorgt für einen konsistenten Lokalisierungskontext in der gesamten Anwendung.
- **`IntlayerServerProvider`** wird verwendet, um die Locale an die Server-Kinder bereitzustellen. Es kann nicht im Layout gesetzt werden.

  > Layout und Seite können keinen gemeinsamen Server-Kontext teilen, da das Server-Kontext-System auf einem pro-Anfrage-Datenspeicher basiert (über den [React Cache](https://react.dev/reference/react/cache)-Mechanismus), wodurch jeder "Kontext" für verschiedene Segmente der Anwendung neu erstellt wird. Das Platzieren des Providers in einem gemeinsamen Layout würde diese Isolation aufheben und verhindern, dass die Server-Kontextwerte korrekt an Ihre Server-Komponenten weitergegeben werden.

> Layout und Seite können keinen gemeinsamen Server-Kontext teilen, da das Server-Kontext-System auf einem pro-Anfrage-Datenspeicher basiert (über den [React-Cache](https://react.dev/reference/react/cache)-Mechanismus), wodurch jeder "Kontext" für verschiedene Segmente der Anwendung neu erstellt wird. Das Platzieren des Providers in einem gemeinsamen Layout würde diese Isolation aufheben und die korrekte Weitergabe der Server-Kontextwerte an Ihre Server-Komponenten verhindern.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Erstelle zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("client-component-example"); // Erstelle zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("client-component-example"); // Erstelle zugehörige Inhaltsdeklaration

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
  const content = useIntlayer("server-component-example"); // Erstellen der zugehörigen Inhaltsdeklaration

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
  const content = useIntlayer("server-component-example"); // Erstellen der zugehörigen Inhaltsdeklaration

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
  const content = useIntlayer("server-component-example"); // Erstelle die zugehörige Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie z.B. `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, zum Beispiel:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Um mehr über den `useIntlayer` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayer.md).

### (Optional) Schritt 7: Proxy für die Lokalerkennung konfigurieren

Richten Sie einen Proxy ein, um die bevorzugte Sprache des Benutzers zu erkennen:

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
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> Der `intlayerProxy` wird verwendet, um die bevorzugte Sprache des Benutzers zu erkennen und ihn auf die entsprechende URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) angegeben. Zusätzlich ermöglicht er das Speichern der bevorzugten Sprache des Benutzers in einem Cookie.

> Falls Sie mehrere Proxies hintereinander schalten müssen (zum Beispiel `intlayerProxy` mit Authentifizierung oder benutzerdefinierten Proxies), stellt Intlayer jetzt einen Helfer namens `multipleProxies` zur Verfügung.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (Optional) Schritt 8: Internationalisierung Ihrer Metadaten

Falls Sie Ihre Metadaten internationalisieren möchten, wie zum Beispiel den Titel Ihrer Seite, können Sie die von Next.js bereitgestellte Funktion `generateMetadata` verwenden. Innerhalb dieser Funktion können Sie den Inhalt aus der Funktion `getIntlayer` abrufen, um Ihre Metadaten zu übersetzen.

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
      en: "Erstellt mit create next app",
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
      en: "Erstellt mit create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
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
        "de": "Preact-Logo",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "de": "Erstellt mit create next app",
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
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
   * Generiert ein Objekt, das alle URLs für jede Locale enthält.
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

// ... Rest des Codes
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generiert ein Objekt, das alle URLs für jede Locale enthält.
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

// ... Rest des Codes
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generiert ein Objekt, das alle URLs für jede Locale enthält.
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

// ... Rest des Codes
````

> Beachten Sie, dass die aus `next-intlayer` importierte Funktion `getIntlayer` Ihren Inhalt in einem `IntlayerNode` kapselt, was die Integration mit dem visuellen Editor ermöglicht. Im Gegensatz dazu gibt die aus `intlayer` importierte Funktion `getIntlayer` Ihren Inhalt direkt ohne zusätzliche Eigenschaften zurück.

Alternativ können Sie die Funktion `getTranslation` verwenden, um Ihre Metadaten zu deklarieren. Es wird jedoch empfohlen, Inhaltsdeklarationsdateien zu verwenden, um die Übersetzung Ihrer Metadaten zu automatisieren und den Inhalt irgendwann auszulagern.

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
      en: "Meine Beschreibung",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Rest des Codes
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "Mein Titel",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "Meine Beschreibung",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Rest des Codes
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

// ... Rest des Codes
```

> Erfahren Sie mehr über die Optimierung von Metadaten [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Schritt 9: Internationalisierung Ihrer sitemap.xml und robots.txt

Um Ihre `sitemap.xml` und `robots.txt` zu internationalisieren, können Sie die von Intlayer bereitgestellte Funktion `getMultilingualUrls` verwenden. Diese Funktion ermöglicht es Ihnen, mehrsprachige URLs für Ihre Sitemap zu generieren.

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
// Importiere die Funktion zum Abrufen mehrsprachiger URLs aus intlayer
const { getMultilingualUrls } = require("intlayer");

// Definiert die Sitemap mit mehrsprachigen Alternativ-URLs
const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") }, // Mehrsprachige URLs für die Startseite
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") }, // Mehrsprachige URLs für die Login-Seite
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") }, // Mehrsprachige URLs für die Registrierungsseite
    },
  },
];

// Exportiert die Sitemap für die Verwendung in anderen Modulen
module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Funktion zur Erstellung der Robots.txt-Regeln
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // Gilt für alle User-Agents
    allow: ["/"], // Erlaubte Pfade
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Verbotene Pfade (mehrsprachig)
  },
  host: "https://example.com", // Hostname der Website
  sitemap: `https://example.com/sitemap.xml`, // Pfad zur Sitemap
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

// Funktion zum Abrufen aller mehrsprachigen URLs
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*", // Gilt für alle User-Agents
    allow: ["/"], // Erlaubte Pfade
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Verbotene Pfade (mehrsprachig)
  },
  host: "https://example.com", // Hostname der Website
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

// Funktion, um alle mehrsprachigen URLs aus einer Liste von URLs zu erhalten
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]), // Pfade, die für alle Sprachen gesperrt sind
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Erfahren Sie mehr über die Sitemap-Optimierung [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Erfahren Sie mehr über die robots.txt-Optimierung [in der offiziellen Next.js-Dokumentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optional) Schritt 10: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts in Next.js zu ändern, wird empfohlen, die `Link`-Komponente zu verwenden, um Benutzer auf die entsprechende lokalisierte Seite weiterzuleiten. Die `Link`-Komponente ermöglicht das Vorladen der Seite, was hilft, ein vollständiges Neuladen der Seite zu vermeiden.

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
            replace // Wird sicherstellen, dass die "Zurück"-Schaltfläche des Browsers zur vorherigen Seite zurückführt
          >
            <span>
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés mit aktuellem Gebietsschema auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
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
            replace // Wird sicherstellen, dass die "Zurück"-Schaltfläche des Browsers zur vorherigen Seite zurückführt
          >
            <span>
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés, wenn das aktuelle Gebietsschema auf Locales.SPANISH gesetzt ist */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
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
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Stellt sicher, dass die "Zurück"-Schaltfläche des Browsers zur vorherigen Seite zurückkehrt
          >
            <span>
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés mit aktuellem Gebietsschema auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Eine alternative Möglichkeit ist die Verwendung der `setLocale`-Funktion, die vom `useLocale`-Hook bereitgestellt wird. Diese Funktion erlaubt kein Prefetching der Seite. Weitere Details finden Sie in der [`useLocale`-Hook-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md).

> Sie können auch eine Funktion in der Option `onLocaleChange` festlegen, um eine benutzerdefinierte Funktion auszulösen, wenn sich die Locale ändert.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Rest des Codes

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Wechsel zu Französisch
  </button>
);
```

> Dokumentationsverweise:
>
> - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Optional) Schritt 11: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt internen URLs automatisch das aktuelle Sprachpräfix hinzu. Zum Beispiel wird ein französischsprachiger Benutzer, der auf einen Link zur "Über uns"-Seite klickt, zu `/fr/about` anstelle von `/about` weitergeleitet.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren und bieten den Nutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in der gesamten Anwendung wird sichergestellt, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung von URLs und macht Ihren Code leichter wartbar und erweiterbar, wenn Ihre Anwendung wächst.

Unten sehen Sie die Implementierung einer lokalisierten `Link`-Komponente in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit dem Sprachpräfix zu versehen (z.B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und eine gültige href vorhanden ist, wird die lokalisierte URL verwendet.
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
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Locale anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Locale zu versehen (z.B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Locale-Kontext bleibt.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und eine gültige href angegeben ist, wird die lokalisierte URL abgerufen.
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
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, gilt sie als extern.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Locale anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Locale zu versehen (z.B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Locale-Kontext bleibt.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Wenn der Link intern ist und ein gültiges href vorhanden ist, wird die lokalisierte URL abgerufen.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Funktionsweise

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert, da sie nicht lokalisiert werden müssen.

- **Abrufen der aktuellen Locale**:  
  Der Hook `useLocale` liefert die aktuelle Locale (z. B. `fr` für Französisch).

- **Lokalisierung der URL**:  
  Für interne Links (d. h. nicht extern) wird `getLocalizedUrl` verwendet, um die URL automatisch mit der aktuellen Locale zu versehen. Das bedeutet, wenn Ihr Benutzer Französisch eingestellt hat, wird beim Übergeben von `/about` als `href` daraus `/fr/about`.

- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL zurück, wodurch sichergestellt wird, dass die Navigation konsistent mit der Locale erfolgt.

Durch die Integration dieser `Link`-Komponente in Ihre gesamte Anwendung gewährleisten Sie eine kohärente und sprachbewusste Benutzererfahrung und profitieren gleichzeitig von verbesserter SEO und Benutzerfreundlichkeit.

### (Optional) Schritt 12: Die aktuelle Locale in Server Actions abrufen

Wenn Sie die aktive Locale innerhalb einer Server Action benötigen (z. B. um E-Mails zu lokalisieren oder locale-spezifische Logik auszuführen), rufen Sie `getLocale` aus `next-intlayer/server` auf:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Etwas mit der Locale machen
};
```

> Die Funktion `getLocale` folgt einer kaskadierenden Strategie, um die Locale des Benutzers zu bestimmen:
>
> 1. Zuerst überprüft es die Anforderungsheader auf einen Locale-Wert, der möglicherweise vom Proxy gesetzt wurde
> 2. Wenn kein Locale in den Headern gefunden wird, sucht es nach einem in Cookies gespeicherten Locale
> 3. Wenn kein Cookie gefunden wird, versucht es, die bevorzugte Sprache des Benutzers aus den Browsereinstellungen zu erkennen
> 4. Als letzte Möglichkeit greift es auf das in der Anwendung konfigurierte Standard-Locale zurück
>
> Dies stellt sicher, dass basierend auf dem verfügbaren Kontext das passendste Locale ausgewählt wird.

### (Optional) Schritt 13: Optimieren Sie Ihre Bundle-Größe

Beim Verwenden von `next-intlayer` werden Wörterbücher standardmäßig in das Bundle für jede Seite aufgenommen. Um die Bundle-Größe zu optimieren, bietet Intlayer ein optionales SWC-Plugin an, das `useIntlayer`-Aufrufe mithilfe von Makros intelligent ersetzt. Dies stellt sicher, dass Wörterbücher nur in Bundles für Seiten enthalten sind, die sie tatsächlich verwenden.

Um diese Optimierung zu aktivieren, installieren Sie das Paket `@intlayer/swc`. Nach der Installation erkennt `next-intlayer` das Plugin automatisch und verwendet es:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> Hinweis: Diese Optimierung ist nur für Next.js 13 und höher verfügbar.

> Hinweis: Dieses Paket ist nicht standardmäßig installiert, da SWC-Plugins in Next.js noch experimentell sind. Dies kann sich in Zukunft ändern.

### Überwachen von Wörterbuchänderungen mit Turbopack

Wenn Sie Turbopack als Entwicklungsserver mit dem Befehl `next dev` verwenden, werden Wörterbuchänderungen standardmäßig nicht automatisch erkannt.

Diese Einschränkung besteht, weil Turbopack keine Webpack-Plugins parallel ausführen kann, um Änderungen in Ihren Inhaltsdateien zu überwachen. Um dies zu umgehen, müssen Sie den Befehl `intlayer watch` verwenden, um sowohl den Entwicklungsserver als auch den Intlayer-Build-Watcher gleichzeitig auszuführen.

```json5 fileName="package.json"
{
  // ... Ihre bestehenden package.json-Konfigurationen
  "scripts": {
    // ... Ihre bestehenden Skript-Konfigurationen
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Wenn Sie next-intlayer@<=6.x.x verwenden, müssen Sie das Flag `--turbopack` beibehalten, damit die Next.js 16-Anwendung korrekt mit Turbopack funktioniert. Wir empfehlen die Verwendung von next-intlayer@>=7.x.x, um diese Einschränkung zu vermeiden.

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Enthält die automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, dass diese Dateien in Ihr Git-Repository übernommen werden.

Fügen Sie dazu die folgenden Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** der übersetzten Inhalte.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Nutzung der Erweiterung siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.
