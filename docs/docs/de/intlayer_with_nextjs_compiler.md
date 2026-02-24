---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Transform an existing Next.js app into a multilingual app (i18n guide 2026)
description: Erfahren Sie, wie Sie Ihre bestehende Next.js-Anwendung mit dem Intlayer Compiler mehrsprachig machen. Folgen Sie der Dokumentation, um Ihre Anwendung durch KI zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Übersetzung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compiler
  - KI
slugs:
  - doc
  - konfiguration
  - nextjs
  - compiler
---

# Wie man eine bestehende Next.js-Anwendung nachträglich mehrsprachig (i18n) macht (i18n-Leitfaden 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Beste i18n-Lösung für Next.js? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox Demo - Wie Sie Ihre Anwendung mit Intlayer internationalisieren"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Schauen Sie sich die [Anwendungs-Vorlage](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) auf GitHub an.

## Inhaltsverzeichnis

<TOC/>

## Warum ist die Internationalisierung einer bestehenden Anwendung schwierig?

Wenn Sie jemals versucht haben, mehrere Sprachen zu einer Anwendung hinzuzufügen, die nur für eine Sprache erstellt wurde, kennen Sie die Herausforderung. Es ist nicht nur "schwierig" – es ist mühsam. Sie müssen jede Datei durchsuchen, jede Textzeichenfolge finden und sie in separate Wörterbuchdateien verschieben.

Dann kommt der riskante Teil: Das Ersetzen dieses gesamten Textes durch Code-Hooks, ohne das Layout oder die Logik zu beeinträchtigen. Es ist die Art von Arbeit, die die Entwicklung neuer Funktionen um Wochen verzögert und sich wie eines endloses Refactoring anfühlt.

## Was ist der Intlayer Compiler?

Der **Intlayer Compiler** wurde entwickelt, um diese manuelle Arbeit zu umgehen. Anstatt Sie zu zwingen, Zeichenfolgen manuell zu extrahieren, erledigt der Compiler dies für Sie. Er durchsucht Ihren Code, findet den Text und verwendet KI, um im Hintergrund Wörterbücher zu generieren.
Anschließend ändert er Ihren Quellcode während des Build-Schritts, um die erforderlichen i18n-Hooks einzufügen. Im Grunde genommen schreiben Sie Ihre Anwendung so weiter, als wäre sie nur einsprachig, und der Compiler verarbeitet die mehrsprachige Transformation nativ und automatisch.

> Compiler Dokumentation: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md

### Einschränkungen

Da der Compiler während der **Kompilierzeit (compile time)** den Code analysiert und transformiert (Einfügen von Hooks und Generieren von Wörterbüchern), kann dies die **Build-Zeit (build time)** Ihrer Anwendung **verlangsamen**.

Um diese Auswirkungen während der aktiven Entwicklung (Entwicklungsmodus oder dev mode) zu begrenzen, können Sie den Compiler in den [`'build-only'`-Modus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) versetzen oder ihn deaktivieren, wenn er nicht benötigt wird.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Das Hauptpaket des Frameworks, das Internationalisierungstools für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **next-intlayer**

  Das Paket, das Intlayer in die Next.js-Umgebung integriert. Es stellt Context Provider sowie Hooks für die Next.js-Internationalisierung bereit. Darüber hinaus enthält es das Next.js-Plugin für die Einbindung von Intlayer in [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), sowie eine Middleware, um das bevorzugte Gebietsschema des Benutzers zu erkennen, Cookies zu verwalten und URL-Weiterleitungen abzuwickeln.

### Schritt 2: Konfigurieren Sie Ihr Projekt

Erstellen Sie eine Konfigurationsdatei, um die Sprachen für Ihre Anwendung festzulegen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Kann auf 'build-only' gesetzt werden, um die Auswirkungen im Dev-Modus zu begrenzen
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Kein Kompilierungs-Präfix
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext:
      "Dies ist ein einfaches Beispiel für eine Kartenanwendung.",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Kann auf 'build-only' gesetzt werden, um die Auswirkungen im Dev-Modus zu begrenzen
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Kein Kompilierungs-Präfix
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext:
      "Dies ist ein einfaches Beispiel für eine Kartenanwendung.",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Kann auf 'build-only' gesetzt werden, um die Auswirkungen im Dev-Modus zu begrenzen
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Kein Kompilierungs-Präfix
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext:
      "Dies ist ein einfaches Beispiel für eine Kartenanwendung.",
  },
};

module.exports = config;
```

> **Hinweis**: Stellen Sie sicher, dass Sie den `OPEN_AI_API_KEY` in Ihren Umgebungsvariablen (environment variables) konfiguriert haben.

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Proxy-Weiterleitungen, Cookie-Einstellung, Speicherort und Erweiterungen Ihrer Inhaltsdeklarationen (Content declarations) einrichten, Intlayer-Protokolle in der Konsole deaktivieren sowie weitere Anpassungen vornehmen. Eine vollständige Liste aller verfügbaren Parameter finden Sie in der [Dokumentation der Konfiguration (Configuration Documentation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Next.js-Konfiguration integrieren

Konfigurieren Sie Ihr Next.js-Setup, sodass Intlayer genutzt wird:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Optionale zusätzliche Next.js Konfiguration hierhin */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Optionale zusätzliche Next.js Konfiguration hierhin */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Optionale zusätzliche Next.js Konfiguration hierhin */
};

module.exports = withIntlayer(nextConfig);
```

> Das `withIntlayer()` Next.js-Plugin sorgt dafür, dass Intlayer in Next.js verankert wird. Es sichert den reibungslosen Build-Vorgang der Wörterbuchdateien sowie deren Überwachung (Watch) im Dev-Modus. Darüber hinaus definiert das Modul die Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/) oder der brandneuen [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)-Umgebung. Zusätzlich gewährt es Alias-Pfade für Performance-Optimierungen und ist hundertprozentig mit Server Components konform.

### Babel konfigurieren

Der Intlayer-Compiler benötigt Babel, um Ihre Inhalte zu extrahieren und zu optimieren. Aktualisieren Sie Ihre `babel.config.js` (oder `babel.config.json`), um die Intlayer-Plugins einzubinden:

```js fileName="babel.config.js" codeFormat="commonjs"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Schritt 4: Dynamisches Routing für die Anwendungssprache (Locale Routing)

Leeren Sie den Inhalt Ihres `RootLayout`-Modells und ersetzen Sie ihn in etwa durch das nachfolgende Setup:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
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
  const locale = await getLocale();
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
  const locale = await getLocale();
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

### Schritt 5: Deklarieren Sie Ihre Inhalte (Automatisch)

Sobald der Compiler aktiviert ist, **gehört die manuelle Angabe (Erstellen und Füllen von speziellen `.content.ts`-Dateien) Ihrer Sprachendeklarationen der Vergangenheit an.**

Stattdessen können Sie Ihren Text quasi "fest verdrahtet" (hardcoded) unberührt als einfachen String am Platz im Code hinterlassen. Intlayer scannt den Source Code, berechnet die Übersetzungen eigenständig anhand des integrierten KI-Engines und schleust jenen identischen Codeblock ganz stillschweigend und unbemerkt während des Build Compiling um, versehen mit dem lokalisierten (übersetzten) Inhalt. Nichts ist mehr anstrengend zu handhaben. Alles läuft gänzlich automatisiert!

### Schritt 6: Implementierung der textlichen Werte (Inhalte) im direkten Code

Schreiben Sie Ihre Komponenten einfach mit fest kodierten Zeichenfolgen in Ihrer Standardsprache. Der Compiler kümmert sich um den Rest.

Beispiel, wie Ihre Seite aussehen könnte:

<Tabs>
  <Tab value="Code" label="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Beginnen Sie mit der Bearbeitung von</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output" label="Ausgabe">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      de: {
        getStartedByEditing: "Beginnen Sie mit der Bearbeitung von",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- Bitte beachten Sie: **`IntlayerClientProvider`** agiert als Verteiler (Provider), um das 'locale'-Attribut im Client-seitigen Konstrukt von Parent auf Child-Rängen (DOM / virtual DOM) zu vermitteln.
- **`IntlayerServerProvider`** auf der Gegenseite sichert, dass bei reinen Server Component das Child ebenfalls reibungslosen Zugriff auf das 'locale'-Attribut behält.

### (Optional) Schritt 7: Fehlende Übersetzungen ausfüllen

Intlayer bietet ein CLI-Tool an, mit dem Sie fehlende Übersetzungen ausfüllen können. Sie können den Befehl `intlayer` verwenden, um fehlende Übersetzungen aus Ihrem Code zu testen und auszufüllen.

```bash
npx intlayer test         # Testen, ob Übersetzungen fehlen
```

```bash
npx intlayer fill         # Fehlende Übersetzungen ausfüllen
```

### (Optional) Schritt 8: Proxy-Middleware zur Optimierung von lokalisiertem Routing

Falls Sie Ihren Besucher automatisch und lückenlos zu seiner vertrauten Standardsprache leiten lassen möchten, reicht das Etablieren eines Proxy-Middlewares aus:

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

> Die Kernkomponente hierbei ist die Middleware `intlayerProxy`, welche gezielt dafür geschrieben wurde, das Sprachschema vorab zu antizipieren und im Bedarfsfall eine direkte Weiterleitung auf die am besten adäquate Seite sicherzustellen (passend zu Ihren Definitionen im [Configuration File](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)). Das Tool speichert das Locale sicherheitshalber gleichermaßen in einem Navigationscookie (Session/Log für den künftigen Client-Wiederbesuch).

### (Optional) Schritt 9: Menü / Button zum Umschalten zwischen Sprachen (Language Switcher)

Um Ihren Endkunden die tollste UX (Benutzererfahrung) bereitzustellen und den Next.js-Datenfluss homogen (ohne ständiges „Hard Refresh“-Rucken durch einen nativen Document Reload vom Server) am Laufen zu halten, nutzen Sie am besten unser vorkostümiertes Language Switcher Component mit passender Navigation:

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
              {/* Kurzes Sprach-Label - z.B. DE */}
              {localeItem}
            </span>
            <span>
              {/* Sprache basierend auf dem aktuell betrachteten Text - z.B. für einen französischsprachigen Nutzer: Allemand (German) */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache gemäß nativer Nomenklatur  - z.B. Deutsch */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache im englischem Vokabular (global common name) - z.B. German */}
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
              {/* Kurzes Sprach-Label - z.B. DE */}
              {localeItem}
            </span>
            <span>
              {/* Sprache basierend auf dem aktuell betrachteten Text - z.B. für einen französischsprachigen Nutzer: Allemand (German) */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache gemäß nativer Nomenklatur  - z.B. Deutsch */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache im englischem Vokabular (global common name) - z.B. German */}
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
              {/* Kurzes Sprach-Label - z.B. DE */}
              {localeItem}
            </span>
            <span>
              {/* Sprache basierend auf dem aktuell betrachteten Text - z.B. für einen französischsprachigen Nutzer: Allemand (German) */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache gemäß nativer Nomenklatur  - z.B. Deutsch */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache im englischem Vokabular (global common name) - z.B. German */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Im Allgemeinen erlaubt die `setLocale` API aus dem Hook Bundle `useLocale` die Erzeugung integrierter Front-End Routings per Event Handler. Für komplexere Konfigurationen oder Details konsultieren Sie bitte das [useLocale hook reference manual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md).

### (Optional) Schritt 10: Abrufen der Locale in Serverseitigen Elementen (Server Actions)

Falls Sie komplexe Next.js-Datenbankprozesse, E-Mail-Events oder Backend-Hooks managen müssen und direkt die serverseitige Sprache der aktuellen Benutzersitzung erfragen wollen (unabhängig vom Browserspeicher des Clients) ist `getLocale` des Modules `@next-intlayer/server` die Lösung der Wahl:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Verwenden Sie den identifizierten Wert, um Ihre serverseitigen Routinen und Services anzupassen. (z. B. den Versand einer deutschsprachigen Mail an den Client)...
};
```

> Die Validierung (Auflösung) von `getLocale()` im Server-Gefüge arbeitet folgendes Hierarchie-System ab:
>
> 1. Next.js Basis-Standard Request Headers (welche auf der vorausgehenden Prüfung und Einsetzung via Proxy-Middleware des Next.js aufbaut).
> 2. Gespeicherter, alter User-Session (Cookie State), auf welchen der Browser zugreift.
> 3. Überprüfung der nativen Sprache / Locale der Client-Navigatoren bzw. der lokal genutzten Anwendungsarchitektur.
> 4. Schlussendlich greift beim Fehlen obiger Daten unweigerlich die im `intlayer.config.ts` verankerte "Standard-Rückfallsicherung" (Fallback-Locale Option).

### (Optional) Schritt 11: Optimieren und Verkleinern Ihrer gebauten Client JS-Bundles. (Einsatz des SWC Next.js Plugins)

Normalerweise bettet das System (`next-intlayer`) standardmäßig das Gesamtvolumen an Inhaltswörterbüchern (Content dictionaries) physisch ungetrennt in Client-side React Bundles ein (was bei größeren Projekten spürbar ins Gewicht und auf die Ladeperformance fällt). Entzerren lässt sich dies prächtig durch das Kompilierungswerkzeug `@intlayer/swc` (SWC Next Compiler-Erweiterung). Dieses Modul destilliert einzig die konkret gebrauchte Referenz auf der Root-Ebene für Server Component heraus, blockiert somit die Entladung vollständiger Listen-Bibliotheken (Objects) und komprimiert alles auf radikale Payload-Leichtigkeit.

Installieren Sie für diese mächtige Transformation jenes Plugin in Ihre Dev-Abhängigkeiten:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Wichtig für das Set-Up: Das SWC Next JS Plugin gilt derzeit noch als experimenteller Aspekt (Experimental Vercel Extension Stages). Infolgedessen richtet sich ein hundertprozentiger störungsfreier Einsatz primär auf Next.js-Umgebungen jenseits der Turbopack-Ebene (ab Versionsbasis `> 13.0.x++`).

> Unbedingt Lesen (Absoluter Sicherheitshinweis!): Sollten Sie tiefgreifendere dynamische Server Application-Rendermuster und Latenz-Requests, wie etwa über Hooks umgesetzt (Beispielwortlaut `importMode: "dynamic"` in Kombination mit der Funktion `useIntlayer`), aktiv im Server Component Layer aufbauen, MÜSSEN zugehörige Kind-Componenten zwingend sauber in sogenannten React `<Suspense>` Containern gewrappt werden! Geschieht dies nicht umgehend, eskaliert das Skript-Parsing und produziert drastische Crash-Meldungen bei Side-Effects serverseitig in der Build Execution (Next.js Application Crashes aus dem Nichts sind sonst die logische Folge).

### Konfliktfreie Zusammenstellung des Intlayer Live "Watch Modus" mit dem "Turbopack" Code Compiler

In der derzeit verfügbaren Architektur von Next's modernstem "Turbopack dev mode generator" stoßen wir ab und an auf mangelnde Synchronisation mit parallel ausgeführten asynchronen Hintergrund-Hooks externer Webpack-Plugins (exakt jener Prozess, in dem unsere Wörterbücher und der JSON Content Background Auto-Rebuild ablaufen). Als Folge stottert Intlayers Echtzeit-Überwachungsdienst manchmal, da durch das Überspringen des Compilier-Laufs beim Coden mit `next dev --turbopack` das "Live-Text-Updating" ausfällt (Hot-Reload-Lag in den Textausgaben beim Speichern einer String-Zeile).

Die simple und effektive Medizin dieses Dilemmas besteht darin, schlicht beide Live-Watch-Dienste huckepack auf demselben Konsolenbefehl auszuführen:

Steuern Sie in ihrem App-Herzstück das Dokument `package.json` an und ergänzen Sie:

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // Synchronisiert und aktiviert CLI Watcher Engine von Intlayer & Next Dev parallel an.
  },
}
```

> Kompatibilitätsmodus: Bitte vergewissern Sie sich, dass bei Next-Branches mit Integration unter Version `@6.X.X` in dieses Startauslöserkommando verpflichtend das Keyword `--turbopack` gesetzt bleibt: `"intlayer watch --with 'next dev --turbopack'"`. Sollten Module `>= 7.X.X` vorzufinden sein (Next.js), so ist diese Maßnahme obsolet, da diese Parametrisierungen standardisiert eingebunden wurden.

### Autocomplete via Editor & Ausrichtung der TypeScript Typen-Injektion (Typisierungssicherheit)

Eines der Herzstücke des unsichtbar hinter dem Bühnenvorhang von Intlayer laufenden Compilers ist seine präzise und lückenlose TypeScript-Gießanlage! Parallel zur Dictionary-Ausgabe verfertigt er "Typescript-Type-Hint Models", die haargenau Ihre String-Lokalisierung abbilden (Typing Checks).

Wird diese Informationsquelle als Wurzel der eigenen IDE (Beispielsweise in VS Code) hinzugefügt, profitiert der Coder unbeschreiblich von blitzartigem Autocomplete (Code Hinting Intellisense Feature) sowie dem allgegenwärtigen "Rot-Makiert-Hinweiser" durch Linting (Linter Key Missing Validation System) sobald Sprachfelder undefiniert oder gelöscht auftauchen!

![Autocomplete Feature und Vorschläge](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Validierung der Felder per Error Alert](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Navigieren Sie flugs zu Ihrer Datei `tsconfig.json` und lassen Sie den Pfad zu Intlayers-Hintergrundgenerator in Ihre Typechecks mitlaufen:

```json5 fileName="tsconfig.json"
{
  "include": [
    // Pre-existente Node und Pfade der App Basis-Systeme hier eintragen...
    ".intlayer/**/*.ts", // Leiten Sie den Path Tracker direkt an die .intlayer-Generierungsmappen der TS Engine!
  ],
}
```

### Die Sicherung des Git- und Repo-Wohlbefindens

Bedenkt man, dass der Compiler kontinuierlich operiert und dabei zahllose neue JSON-Zweige `.content` nebst Typsicherheit-Parametrisierungen hochfrequent in der unsichtbaren und lediglich als temporärem Ausgabebereich deklarierten `.intlayer` Stammordner-Sektion (Background) speichert. Was passiert in so einem Fall, wenn man sie in eine CI-Cloud (Git) pushed? Ein Albtraum! Ständige Version-Mixups, Code-Review Clutters und zerrissene Mergeroutinen auf den Main-Branches ("Bloated Pull Requests").

Setzen Sie der Dateiflut mit Hilfe von `.gitignore` eine klare Stop-Markierung:

```plaintext fileName=".gitignore"
# Ignorieren des generierten Auto-Cache-Baums und des Output Builds aus dem Intlayer Background
.intlayer
```

### Maximale Produktivität: VS Code Add-on Tool-Integration

Effizienz ist im Software-Engineering essenziell! Ständiges Hin- und Herspringen durch Dateiordner, um Vokabelprüfungen manuell nachzusehen? Unnötig. Visual Studio Code-Koryphäen norden ihr Setup durch unsere eigene Microsoft Store-Zusatzausstattung ein: Dürfen wir vorstellen: das Plugin `Intlayer VS Code Extension`.

Kostenfrei herunterladbar:
[Erweitere Visual Studio Tools Web Extension Link (Der Microsoft Marketplace Store Link)](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ein Blick auf Ihre neuen mächtigen Superkräfte bei der Quelltextbearbeitung:

- **Intelligente Mouse Hover-Tooltips (Visual Dialog Modals Text Viewer)**: Betätigen des Fingers (Mouse Index) auf einer der referenzierten `UseIntlayer`-Dictionary Schlüsselpositionen im Component-Text erweckt das Plugin. Es flutet einen kleinen Fensterblock oberhalb des Codes und decodiert den echten Laufzeitinhalt Ihrer gewählten Lokalisierung auf dem Punkt. Kein Blättern dritter Fileserver mehr!
- **Error Live Red Check Validierungsschleifen**: Ein Echtzeit Parser behält permanent Lücken und Übersetzungslecks (Lost and broken translation state variables/keys) im Auge. Jeder Bruch erstrahlt augenblicklich intensiv "Rot-Sintaktisch" hervorgehoben unter der Component (Feintuning für fehlerlose Live Edits).
- **Die unglaubliche Makroauslese durch Hotkeys / Shortcut Refactoring**: Entdecken Sie Ihr Zielobjekt, zum Beispiel eine simple "Hardcoded String Line Text Message" -> Setzen Sie einen Tastaturbefehl / Hotkey Makro Combo -> Intlayer kappt den unübersetzten Teil und führt eine unbändige Magiesequenz aus: Verschiebung in den Hauptkonfigurationsknoten (Dictionary JSON Branch), Automatischer React-Importer (Refactoring Hook) zur Position in Form der "UseIntlayer()-Abfrage" statt der harten String-Variable! Wer dieses Feature fehlerfrei für sein Tastatur Layout adaptieren möchte, ist zum Studium im Support-Center eingeladen [Developer Guide for VS Code Editor Plugin Settings Setup Guidelines Manual](https://intlayer.org/doc/vs-code-extension).

### Was kommt als Nächstes? (CMS, Externe Architekturen & Remote Tools)

Liegt die Integration hinter Ihnen, haben Sie Next JS Komponent-i18n komplett für Devs geschnürt? Großartig. Was aber geschieht, wenn Marketers, Copywriter oder Ihr externes Content-Team Daten ohne GitHub-Erfahrung ändern sollen? Bieten Sie ihnen direkten Textzugang ohne CLI Tools durch unseren hauseigenen Client-Dashboard UI Web Controller: [Das Web Visual Editor Application Setup Interface (Dokumentationstutorial).](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md).

Für Ausgliederungen des System JSON Dictionary Trees in Cloud App-Systeme und Storage Datenbank Server (DB CMS Node Architektur) empfiehlt sich ein "Serverless / Remote API Base Backend Setup" Blueprint Konzept des Node Cloud Systems! Navigieren Sie zu den [Intlayer Remote Headless Server Architekturen & Database Integrations Guidelines](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).
