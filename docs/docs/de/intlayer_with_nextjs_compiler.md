---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Transformieren Sie eine bestehende Next.js-App in eine mehrsprachige App (i18n-Leitfaden 2026)
description: Erfahren Sie, wie Sie Ihre bestehende Next.js-Anwendung mit dem Intlayer Compiler mehrsprachig machen. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und mit KI zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compiler
  - KI
slugs:
  - doc
  - umgebung
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Erstveröffentlichung
---

# Wie man eine bestehende Next.js-Anwendung nachträglich mehrsprachig (i18n) macht (i18n-Leitfaden 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Die beste i18n-Lösung für Next.js? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) auf GitHub.

## Inhaltsverzeichnis

<TOC/>

## Warum ist es schwierig, eine bestehende Anwendung zu internationalisieren?

Wenn Sie jemals versucht haben, mehrere Sprachen zu einer App hinzuzufügen, die nur für eine Sprache entwickelt wurde, kennen Sie den Aufwand. Es ist nicht nur „schwierig“ – es ist mühsam. Sie müssen jede einzelne Datei durchkämmen, jede Textzeichenfolge aufspüren und sie in separate Wörterbuchdateien verschieben.

Dann kommt der riskante Teil: Das Ersetzen all dieses Textes durch Code-Hooks, ohne Ihr Layout oder Ihre Logik zu beeinträchtigen. Es ist die Art von Arbeit, die die Entwicklung neuer Funktionen für Wochen unterbricht und sich wie ein endloses Refactoring anfühlt.

## Was ist der Intlayer Compiler?

Der **Intlayer Compiler** wurde entwickelt, um diese manuelle Fleißarbeit zu umgehen. Anstatt Zeichenfolgen manuell zu extrahieren, erledigt der Compiler dies für Sie. Er scannt Ihren Code, findet den Text und verwendet KI, um im Hintergrund die Wörterbücher zu generieren.
Anschließend modifiziert er Ihren Code während des Builds, um die erforderlichen i18n-Hooks einzufügen. Im Grunde schreiben Sie Ihre App so weiter, als wäre sie einsprachig, und der Compiler kümmert sich automatisch um die mehrsprachige Transformation.

> Doc Compiler: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md

### Einschränkungen

Da der Compiler eine Codeanalyse und -transformation (Einfügen von Hooks und Generieren von Wörterbüchern) zur **Kompilierzeit** durchführt, kann er den **Build-Prozess verlangsamen**.

Um diese Auswirkungen während der Entwicklung zu mildern, können Sie den Compiler im Modus [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) ausführen oder ihn ganz deaktivieren, wenn er nicht benötigt wird.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Next.js-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

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

  Das Kernpaket, das Internationalisierungstools für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **next-intlayer**

  Das Paket, das Intlayer in Next.js integriert. Es bietet Context Provider und Hooks für die Internationalisierung von Next.js. Zusätzlich enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie einen Proxy zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Umleitungen.

### Schritt 2: Konfigurieren Sie Ihr Projekt

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.GERMAN],
    defaultLocale: Locales.GERMAN,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Kann auf 'build-only' gesetzt werden, um die Auswirkungen im Dev-Modus zu begrenzen
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Kein Präfix, Standard ist "comp-"
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Diese App ist eine Karten-App",
  },
};

export default config;
```

> **Hinweis**: Stellen Sie sicher, dass Ihr `OPEN_AI_API_KEY` in Ihren Umgebungsvariablen gesetzt ist.

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Proxy-Umleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Next.js-Konfiguration integrieren

Konfigurieren Sie Ihr Next.js-Setup so, dass es Intlayer verwendet:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Konfigurationsoptionen hier */
};

export default withIntlayer(nextConfig);
```

> Das Next.js-Plugin `withIntlayer()` wird verwendet, um Intlayer in Next.js zu integrieren. Es stellt die Erstellung von Inhaltsdeklarationsdateien sicher und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/)- oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)-Umgebungen. Zusätzlich bietet es Aliase zur Leistungsoptimierung und gewährleistet die Kompatibilität mit Server-Komponenten.

### Schritt 4: Babel konfigurieren

Der Intlayer-Compiler benötigt Babel, um Ihren Inhalt zu extrahieren und zu optimieren. Aktualisieren Sie Ihre `babel.config.js` (oder `babel.config.json`) um die Intlayer-Plugins einzubinden:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Schritt 5: Sprache in Ihren Seiten erkennen

Entfernen Sie alles aus dem `RootLayout` und ersetzen Sie es durch den folgenden Code:

```tsx fileName="src/app/layout.tsx"
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

### Schritt 6: Compilieren Sie Ihre Komponenten

Wenn der Compiler aktiviert ist, müssen Sie Inhaltswörterbücher (wie `.content.ts`-Dateien) **nicht mehr manuell deklarieren**.

Stattdessen können Sie Ihren Inhalt direkt als Zeichenfolgen in Ihren Code schreiben. Intlayer analysiert Ihren Code, generiert die Übersetzungen mit dem konfigurierten KI-Anbieter und ersetzt die Zeichenfolgen zur Kompilierzeit durch lokalisierten Inhalt.

Schreiben Sie Ihre Komponenten einfach mit fest kodierten Zeichenfolgen in Ihrer Standardsprache. Der Compiler kümmert sich um den Rest.

Beispiel für das Aussehen Ihrer Seite:

<Tabs>
  <Tab value="Code">

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
  <Tab value="Output">

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

- **`IntlayerClientProvider`** wird verwendet, um die Sprache für Client-Komponenten bereitzustellen.
- **`IntlayerServerProvider`** wird verwendet, um die Sprache für Server-Kinder bereitzustellen.

### (Optional) Schritt 7: Fehlende Übersetzungen ausfüllen

Intlayer bietet ein CLI-Tool an, um fehlende Übersetzungen auszufüllen. Sie können den Befehl `intlayer` verwenden, um fehlende Übersetzungen in Ihrem Code zu testen und auszufüllen.

```bash
npx intlayer test         # Testen, ob Übersetzungen fehlen
```

```bash
npx intlayer fill         # Fehlende Übersetzungen ausfüllen
```

### (Optional) Schritt 8: Proxy zur Erkennung der Sprache konfigurieren

Richten Sie einen Proxy ein, um die bevorzugte Sprache des Benutzers zu erkennen:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Der `intlayerProxy` wird verwendet, um die bevorzugte Sprache des Benutzers zu erkennen und ihn gemäß der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) auf die entsprechende URL umzuleiten. Außerdem ermöglicht er das Speichern der bevorzugten Sprache des Benutzers in einem Cookie.

### (Optional) Schritt 8: Sprache Ihres Inhalts ändern

Um die Sprache Ihres Inhalts in Next.js zu ändern, wird empfohlen, die Komponente `Link` zu verwenden, um Benutzer auf die entsprechende lokalisierte Seite umzuleiten. Die Komponente `Link` ermöglicht das Prefetching der Seite, was dazu beiträgt, ein vollständiges Neuladen der Seite zu vermeiden.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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
              {/* Sprache - z. B. DE */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z. B. Deutsch */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z. B. Allemand, wenn die aktuelle Sprache auf Locales.FRENCH eingestellt ist */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache in Englisch - z. B. German */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Eine Alternative ist die Verwendung der Funktion `setLocale`, die vom Hook `useLocale` bereitgestellt wird. Diese Funktion erlaubt kein Prefetching der Seite. Weitere Einzelheiten finden Sie in der [Dokumentation zum Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md).

### (Optional) Schritt 10: Bundle-Größe optimieren

Bei Verwendung von `next-intlayer` sind Wörterbücher standardmäßig für jede Seite im Bundle enthalten. Um die Bundle-Größe zu optimieren, bietet Intlayer ein optionales SWC-Plugin an, das `useIntlayer`-Aufrufe mithilfe von Makros intelligent ersetzt. Dies stellt sicher, dass Wörterbücher nur in Bundles für Seiten enthalten sind, die sie tatsächlich verwenden.

Um diese Optimierung zu aktivieren, installieren Sie das Paket `@intlayer/swc`. Nach der Installation erkennt und verwendet `next-intlayer` automatisch das Plugin:

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

> Hinweis: Diese Optimierung ist nur für Next.js 13 und höher verfügbar.

> Hinweis: Dieses Paket wird nicht standardmäßig installiert, da SWC-Plugins in Next.js noch experimentell sind. Dies kann sich in Zukunft ändern.

> Hinweis: Wenn Sie die Option als `importMode: 'dynamic'` oder `importMode: 'fetch'` festlegen (in der Konfiguration `dictionary`), basiert dies auf Suspense. Daher müssen Sie Ihre `useIntlayer`-Aufrufe in eine `Suspense`-Boundary einhüllen. Das bedeutet, dass Sie `useIntlayer` nicht direkt auf der obersten Ebene Ihrer Seite- / Layout-Komponente verwenden können.

### TypeScript konfigurieren

Intlayer verwendet Modul-Augmentation, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Die automatisch generierten Typen einbinden
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, dass sie in Ihr Git-Repository übertragen werden.

Fügen Sie hierzu die folgenden Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext fileName=".gitignore"
# Die von Intlayer generierten Dateien ignorieren
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation über den VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Fehlererkennung in Echtzeit** für fehlende Übersetzungen.
- **Inline-Vorschau** der übersetzten Inhalte.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Einzelheiten zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

### Weiterführende Informationen

Um noch weiter zu gehen, können Sie den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) externalisieren.
