---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Wie Sie Ihre Next.js 16-App übersetzen (ohne [locale] im Seitenpfad) – i18n-Anleitung 2026
description: Erfahren Sie, wie Sie Ihre Next.js 16-Website mehrsprachig machen, ohne [locale] im Seitenpfad. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
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
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 1.0.0
    date: 2026-01-10
    changes: Erstveröffentlichung
---

# Übersetzen Sie Ihre Next.js 16-Website (ohne [locale] im Seitenpfad) mit Intlayer | Internationalisierung (i18n)

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Die beste i18n-Lösung für Next.js? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox – So internationalisierst du deine Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Siehe [Application Template](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) auf GitHub.

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen. Intlayer lässt sich nahtlos in das aktuelle **Next.js 16**-Framework integrieren, einschließlich dessen leistungsstarkem **App Router**. Sie ist darauf optimiert, mit **Server Components** für effizientes Rendering zusammenzuarbeiten und ist vollständig kompatibel mit [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Dictionaries auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **Auf Übersetzungen sowohl in Client- als auch in Server-Komponenten zugreifen**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die Autocompletion und Fehlererkennung verbessern.
- **Profitieren Sie von erweiterten Funktionen**, wie dynamische Locale-Erkennung und -Wechsel.

> Intlayer ist mit Next.js 12, 13, 14 und 16 kompatibel. Wenn Sie den Next.js Page Router verwenden, können Sie diesen [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_page_router.md) zu Rate ziehen. Für Next.js 12, 13 und 14 mit App Router lesen Sie diesen [Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_14.md).

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **next-intlayer**

Das Paket, das Intlayer mit Next.js integriert. Es stellt Context-Provider und Hooks für die Internationalisierung mit Next.js bereit. Zusätzlich enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie einen Proxy zur Erkennung der bevorzugten Locale des Benutzers, zur Verwaltung von Cookies und zur Behandlung von URL-Weiterleitungen.

### Schritt 2: Konfigurieren Sie Ihr Projekt

Hier ist die endgültige Struktur, die wir erstellen werden:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Wenn du kein locale routing möchtest, kann Intlayer als einfacher Provider / Hook verwendet werden. Siehe [diese Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/intlayer_with_nextjs_no_locale_path.md) für weitere Details.

Erstelle eine Konfigurationsdatei, um die Sprachen deiner Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Weitere Locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // oder `no-prefix` - Nützlich für die Erkennung durch Middleware
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
      // Weitere Locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // oder `no-prefix` - Nützlich für die Erkennung durch Middleware
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
      // Deine weiteren Locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // oder `no-prefix` - Nützlich für die Middleware-Erkennung
  },
};

module.exports = config;
```

Über diese Konfigurationsdatei können Sie lokalisierte URLs, Proxy-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen, das Deaktivieren der Intlayer-Logs in der Konsole und mehr festlegen. Für eine vollständige Liste der verfügbaren Parameter siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Next.js-Konfiguration integrieren

Konfigurieren Sie Ihr Next.js-Setup so, dass Intlayer verwendet wird:

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

> Das `withIntlayer()` Next.js-Plugin dient zur Integration von Intlayer in Next.js. Es stellt den Aufbau der Content-Deklarationsdateien sicher und überwacht diese im Entwicklungsmodus. Es legt Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)-Umgebungen fest. Zusätzlich stellt es Aliase zur Optimierung der Performance bereit und gewährleistet die Kompatibilität mit Server-Komponenten.
>
> Die Funktion `withIntlayer()` ist eine Promise-Funktion. Sie ermöglicht die Vorbereitung der Intlayer-Dictionaries, bevor der Build startet. Wenn Sie sie mit anderen Plugins verwenden möchten, können Sie sie awaiten. Beispiel:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Wenn Sie es synchron verwenden möchten, können Sie die Funktion `withIntlayerSync()` verwenden. Beispiel:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer erkennt automatisch, ob Ihr Projekt **webpack** oder **Turbopack** verwendet, basierend auf den Kommandozeilen-Flags `--webpack`, `--turbo` oder `--turbopack` sowie Ihrer aktuellen **Next.js-Version**.
>
> Ab `next>=16`, wenn Sie **Rspack** verwenden, müssen Sie Intlayer explizit zwingen, die webpack-Konfiguration zu verwenden, indem Sie Turbopack deaktivieren:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### Schritt 4: Dynamische Locale-Routen definieren

Entfernen Sie alles aus `RootLayout` und ersetzen Sie es durch den folgenden Code:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Schritt 5: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      de: "Titel meines Projekts",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      de: "Entdecken Sie unsere innovative Plattform, die darauf ausgelegt ist, Ihren Workflow zu optimieren und die Produktivität zu steigern.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      de: ["Innovation", "Produktivität", "Workflow", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      de: ["Innovation", "Produktivität", "Workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```tsx fileName="src/app/metadata.content.mjs" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      de: "Titel meines Projekts",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      de: "Entdecken Sie unsere innovative Plattform, die darauf ausgelegt ist, Ihren Workflow zu vereinfachen und Ihre Produktivität zu steigern.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      de: "Entdecken Sie unsere innovative Plattform, die entwickelt wurde, um Ihren Workflow zu vereinfachen und Ihre Produktivität zu steigern.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      de: ["innovation", "produktivität", "workflow", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      de: "Titel meines Projekts",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      de: "Entdecken Sie unsere innovative Plattform, die entwickelt wurde, um Ihren Arbeitsablauf zu optimieren und die Produktivität zu steigern.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      de: ["Innovation", "Produktivität", "Workflow", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "de": "Mein Projekttitel",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "de": "Entdecken Sie unsere innovative Plattform, die darauf ausgelegt ist, Ihren Workflow zu optimieren und die Produktivität zu steigern.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "de": ["Innovation", "Produktivität", "Workflow", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        de: "Beginnen Sie mit der Bearbeitung",
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

```javascript fileName="src/app/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

// Typdeklaration für Dictionary von intlayer
/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        de: "Beginnen Sie mit dem Bearbeiten",
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

```javascript fileName="src/app/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

// Typdeklaration für Dictionary von intlayer
/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        de: "Beginnen Sie mit dem Bearbeiten",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "de": "Beginnen Sie, indem Sie die Datei bearbeiten",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Ihre Content-Deklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` (standardmäßig `./src`) aufgenommen sind. Sie müssen zudem der Dateiendung für Content-Deklarationsdateien entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Weitere Informationen finden Sie in der [Dokumentation zur Content-Deklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 6: Inhalte in Ihrem Code nutzen

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Content-Dictionaries zu:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { headers, cookies } from "next/headers";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async () => {

  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** wird verwendet, um die Locale für clientseitige Komponenten bereitzustellen. Es kann in jeder übergeordneten Komponente platziert werden, einschließlich des Layouts. Es wird jedoch empfohlen, es im Layout zu platzieren, da Next.js Layout-Code über Seiten hinweg teilt, was effizienter ist. Durch die Verwendung von `IntlayerClientProvider` im Layout vermeiden Sie, dass es für jede Seite neu initialisiert wird, verbessern die Leistung und behalten einen konsistenten Lokalisierungskontext in Ihrer Anwendung bei.
- **`IntlayerServerProvider`** wird verwendet, um die locale an die serverseitigen Kinder bereitzustellen. Es kann nicht im Layout gesetzt werden.

  > Layout und Seite können keinen gemeinsamen Serverkontext teilen, da das Serverkontext-System auf einem pro-Anfrage-Datenspeicher basiert (über [React's cache](https://react.dev/reference/react/cache) Mechanismus), wodurch jeder "Kontext" für verschiedene Segmente der Anwendung neu erstellt wird. Das Platzieren des Providers in einem gemeinsamen Layout würde diese Isolation aufheben und verhindern, dass die Serverkontextwerte korrekt an Ihre Serverkomponenten weitergegeben werden.

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Erstelle die zugehörige Content-Deklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Erstelle die zugehörige Content-Deklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Erstelle die zugehörige Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Erstelle die zugehörige Inhaltsdeklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Erstelle zugehörige Content-Deklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Erstelle zugehörige Content-Deklaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie z. B. `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, z. B.:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Weitere Informationen zum `useIntlayer`-Hook finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayer.md).

### (Optional) Schritt 7: Proxy zur Erkennung der bevorzugten Locale konfigurieren

Richten Sie den Proxy ein, um die bevorzugte Locale des Benutzers zu erkennen:

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

> Der `intlayerProxy` wird verwendet, um die bevorzugte Locale des Nutzers zu erkennen und ihn auf die entsprechende URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/configuration.md) angegeben. Außerdem ermöglicht er, die bevorzugte Locale des Nutzers in einem Cookie zu speichern.

> Wenn Sie mehrere Proxies hintereinander schalten müssen (zum Beispiel `intlayerProxy` zusammen mit Authentifizierung oder benutzerdefinierten Proxies), stellt Intlayer jetzt einen Helfer namens `multipleProxies` zur Verfügung.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (Optional) Schritt 8: Ändern Sie die Sprache Ihrer Inhalte

Um die Sprache Ihrer Inhalte in Next.js zu ändern, empfiehlt es sich, die `Link`-Komponente zu verwenden, um Benutzer auf die entsprechende lokalisierte Seite weiterzuleiten. Die `Link`-Komponente ermöglicht das Prefetching der Seite, wodurch ein vollständiger Seitenreload vermieden werden kann.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - z. B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Locale - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Locale - z. B. Francés, wenn die aktuelle Locale auf Locales.SPANISH gesetzt ist */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. Französisch */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - z. B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Locale - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Locale - z. B. Francés, wenn die aktuelle Locale auf Locales.SPANISH gesetzt ist */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - z. B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Locale - z. B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Locale - z. B. Francés, wenn die aktuelle Locale auf Locales.SPANISH gesetzt ist */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Eine alternative Möglichkeit ist, die vom `useLocale` Hook bereitgestellte Funktion `setLocale` zu verwenden. Diese Funktion ermöglicht kein Prefetching der Seite. Weitere Details findest du in der [Dokumentation des `useLocale`-Hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md).

> Dokumentationsreferenzen:
>
> - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/getLocalizedUrl.md)
> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Optional) Schritt 9: Aktuelle Locale in Server Actions abrufen

Wenn Sie die aktive Locale innerhalb einer Server Action benötigen (z. B. um E-Mails zu lokalisieren oder lokalisierungsabhängige Logik auszuführen), rufen Sie `getLocale` aus `next-intlayer/server` auf:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Mit der Locale etwas tun
};
```

> Die Funktion `getLocale` folgt einer kaskadierenden Strategie, um die Locale des Benutzers zu bestimmen:
>
> 1. Zuerst prüft sie die Request-Header auf einen Locale-Wert, der möglicherweise vom Proxy gesetzt wurde
> 2. Wenn in den Headern keine Locale gefunden wird, sucht sie nach einer in Cookies gespeicherten Locale
> 3. Findet sich kein Cookie, versucht sie, die bevorzugte Sprache des Benutzers aus den Browsereinstellungen zu ermitteln
> 4. Als letzter Ausweg fällt sie auf die in der Anwendung konfigurierte Standard-Locale zurück
>
> Dies stellt sicher, dass die am besten geeignete Locale basierend auf dem verfügbaren Kontext ausgewählt wird.

### (Optional) Schritt 10: Bundle-Größe optimieren

Bei Verwendung von `next-intlayer` werden Wörterbücher standardmäßig in das Bundle jeder Seite aufgenommen. Um die Bundle-Größe zu optimieren, stellt Intlayer ein optionales SWC-Plugin bereit, das `useIntlayer`-Aufrufe mithilfe von Makros intelligent ersetzt. Dadurch werden Wörterbücher nur in die Bundles von Seiten aufgenommen, die sie tatsächlich verwenden.

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

> Hinweis: Dieses Paket wird nicht standardmäßig installiert, da SWC-Plugins in Next.js noch experimentell sind. Das kann sich in Zukunft ändern.

> Hinweis: Wenn Sie die Option als `importMode: 'dynamic'` oder `importMode: 'live'` setzen, basiert dies auf Suspense, daher müssen Sie Ihre `useIntlayer`-Aufrufe in eine `Suspense`-Grenze einhüllen. Das bedeutet, dass Sie `useIntlayer` nicht direkt auf der obersten Ebene Ihrer Page-/Layout-Komponente verwenden können.

### Wörterbuchänderungen mit Turbopack überwachen

Wenn Sie Turbopack als Entwicklungsserver mit dem Befehl `next dev` verwenden, werden Wörterbuchänderungen standardmäßig nicht automatisch erkannt.

Diese Einschränkung entsteht, weil Turbopack nicht in der Lage ist, webpack-Plugins parallel auszuführen, um Änderungen an Ihren Inhaltsdateien zu überwachen. Um dies zu umgehen, müssen Sie den Befehl `intlayer watch` verwenden, um gleichzeitig sowohl den Entwicklungsserver als auch den Intlayer-Build-Watcher auszuführen.

```json5 fileName="package.json"
{
  // ... Ihre vorhandenen package.json-Konfigurationen
  "scripts": {
    // ... Ihre vorhandenen Skript-Konfigurationen
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Wenn Sie next-intlayer@<=6.x.x verwenden, müssen Sie das Flag `--turbopack` beibehalten, damit die Next.js 16-Anwendung korrekt mit Turbopack funktioniert. Wir empfehlen die Verwendung von next-intlayer@>=7.x.x, um diese Einschränkung zu vermeiden.

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihre Codebase robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre vorhandenen TypeScript-Konfigurationen
  "include": [
    // ... Ihre vorhandenen TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, sie in Ihr Git-Repository zu committen.

Dazu können Sie die folgenden Anweisungen in Ihre `.gitignore`-Datei hinzufügen:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code-Erweiterung

Um Ihre Entwicklererfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Extension** installieren.

[Aus dem VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen** zum einfachen Erstellen und Aktualisieren von Übersetzungen.

Für weitere Details zur Verwendung der Extension siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

### Weiterführende Informationen

Um weiterzugehen, können Sie den [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) externalisieren.
