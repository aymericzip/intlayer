---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js i18n - Vollständiger Leitfaden zur Übersetzung Ihrer App"
description: "Kein i18next mehr. Der 2026-Leitfaden zum Erstellen einer mehrsprachigen (i18n) Next.js-App. Übersetzen Sie mit KI-Agenten und optimieren Sie Bundle-Größe, SEO und Performance."
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
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualisieren der Solid useIntlayer API-Nutzung auf direkten Eigenschaftszugriff"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Erstveröffentlichung"
author: aymericzip
---

# Wie man eine bestehende Next.js-Anwendung nachträglich mehrsprachig (i18n) macht (i18n-Leitfaden 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Die beste i18n-Lösung für Next.js? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
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

> Doc Compiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md)

### Einschränkungen

Da der Compiler eine Codeanalyse und -transformation (Einfügen von Hooks und Generieren von Wörterbüchern) zur **Kompilierzeit** durchführt, kann er den **Build-Prozess verlangsamen**.

Um diese Auswirkungen während der Entwicklung zu mildern, können Sie den Compiler im Modus [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) ausführen oder ihn ganz deaktivieren, wenn er nicht benötigt wird.

---

## Schritt-für-Schritt-Anleitung

<Steps>

<Step number={1} title="Abhängigkeiten installieren">

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> das `--interactive` Flag ist optional. Verwenden Sie `intlayer-cli init`, wenn Sie ein KI-Agent sind.

> Dieser Befehl erkennt deine Umgebung und installiert die erforderlichen Pakete. Zum Beispiel:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

Das Core-Paket, das Internationalisierungstools für Konfigurationsverwaltung, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **next-intlayer**

Das Paket, das Intlayer mit Next.js integriert. Es bietet Context-Provider und Hooks für Next.js-Internationalisierung. Zusätzlich enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), sowie einen Proxy zur Erkennung des bevorzugten Locale des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Umleitung.

</Step>

<Step number={2} title="Konfigurieren Sie Ihr Projekt">

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts"
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
    /**
     * Gibt an, ob der Compiler aktiviert werden soll.
     */
    enabled: true,

    /**
     * Ausgabeverzeichnis für die optimierten Wörterbücher.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Nur Inhalt in generierter Datei einfügen, ohne Schlüssel.
     */
    noMetadata: false,

    /**
     * Wörterbuchschlüssel-Präfix
     */
    dictionaryKeyPrefix: "", // Basis-Präfix entfernen

    /**
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     *
     * - Wenn `true`, schreibt der Compiler die Komponentendatei auf die Festplatte. Die Transformation wird also permanent, und der Compiler überspringt die Transformation beim nächsten Prozess. Auf diese Weise kann der Compiler die App transformieren und dann entfernt werden.
     *
     * - Wenn `false`, injiziert der Compiler den `useIntlayer()`-Funktionsaufruf in den Code nur in der Build-Ausgabe und behält die Basis-Codebase intakt. Die Transformation wird nur im Speicher durchgeführt.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is an map app",
  },
};

export default config;
```

> **Hinweis**: Stelle sicher, dass du deinen `OPEN_AI_API_KEY` in deinen Umgebungsvariablen gesetzt hast.

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Proxy-Umleitung, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Content-Deklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Step>

<Step number={3} title="Integrieren Sie Intlayer in Ihre Next.js-Konfiguration">

Konfigurieren Sie Ihr Next.js-Setup zur Verwendung von Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Konfigurationsoptionen hier */};

export default withIntlayer(nextConfig);
```

> Das `withIntlayer()` Next.js Plugin wird verwendet, um Intlayer mit Next.js zu integrieren. Es stellt sicher, dass Content Declaration Files erstellt werden, und überwacht sie im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der [Webpack](https://webpack.js.org/)- oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)-Umgebungen. Darüber hinaus bietet es Aliase zur Optimierung der Leistung und gewährleistet Kompatibilität mit Server Components.

</Step>

<Step number={4} title="Babel konfigurieren">

Der Intlayer-Compiler benötigt Babel, um Ihren Inhalt zu extrahieren und zu optimieren. Aktualisieren Sie Ihre `babel.config.js` (oder `babel.config.json`), um die Intlayer-Plugins einzubeziehen:

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

</Step>

<Step number={5} title="Detect Locale in your pages">

Entfernen Sie alles aus `RootLayout` und ersetzen Sie es mit dem folgenden Code:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
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
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="Kompilieren Sie Ihre Komponenten">

Mit aktiviertem Compiler müssen Sie **keine** Content-Dictionaries (wie `.content.ts` Dateien) mehr manuell deklarieren.

Stattdessen können Sie Ihren Inhalt direkt in Ihrem Code als Strings schreiben. Intlayer analysiert Ihren Code, generiert die Übersetzungen mit dem konfigurierten KI-Anbieter und ersetzt die Strings zur Compile-Zeit durch lokalisierte Inhalte.

Schreiben Sie Ihre Komponenten einfach mit hartcodierten Strings in Ihrer Standardsprache. Der Compiler kümmert sich um den Rest.

Beispiel für das Aussehen Ihrer Seite:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";

const PageContent: FC = () => {
  return (
    <>
      <p>Beginnen Sie mit der Bearbeitung</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default function Page() {
  return <PageContent />;
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
      de: {
        getStartedByEditing: "Beginnen Sie mit der Bearbeitung",
      },
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      es: {
        getStartedByEditing: "Comience editando",
      },
    }
  }
}
```

<Tabs>
  <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default function Page() {
  return <PageContent />;
}
```

- **`IntlayerProvider`** wird einmal im Root-Layout eingefügt. Es stellt das Locale sowohl für Server- als auch für Client-Komponenten bereit, sodass Seiten sich nicht mehr selbst wrappen müssen.
- Ohne ein `[locale]` Pfadsegment kommt das Locale immer aus der Anfrage — dem `x-intlayer-locale` Header, der durch den Intlayer Proxy gesetzt wird, dann dem Locale-Cookie — die der Server-Hooks auf eigene Faust liest, wenn der Provider noch nicht ausgeführt wurde.

  </Tab>
  <Tab label='Intlayer <9.4' value='<9.4'>

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

- **`IntlayerClientProvider`** wird verwendet, um das Locale für Client-seitige Komponenten bereitzustellen.
- **`IntlayerServerProvider`** wird verwendet, um das Locale für Server-Children bereitzustellen.

  > Layout und Page können keinen gemeinsamen Server-Context teilen, da das Server-Context-System auf einem Pro-Request-Datenspeicher basiert (über [React's cache](https://react.dev/reference/react/cache) Mechanismus), was dazu führt, dass jeder "Context" für verschiedene Segmente der Anwendung neu erstellt wird. Das Platzieren des Providers in einem gemeinsamen Layout würde diese Isolierung unterbrechen und die korrekte Weitergabe der Server-Context-Werte an Ihre Server-Komponenten verhindern.

  </Tab>

</Tabs>

</Step>

<Step number={7} title="Fehlende Übersetzung ausfüllen" isOptional={true}>

Intlayer bietet ein CLI-Tool, um fehlende Übersetzungen auszufüllen. Sie können den `intlayer`-Befehl verwenden, um fehlende Übersetzungen aus Ihrem Code zu testen und auszufüllen.

```bash packageManager="npm"
npx intlayer test         # Teste auf fehlende Übersetzungen
```

```bash packageManager="yarn"
yarn intlayer test         # Testen Sie, ob fehlende Übersetzungen vorhanden sind
```

```bash packageManager="pnpm"
pnpm intlayer test         # Test auf fehlende Übersetzungen
```

```bash packageManager="bun"
bun x intlayer test         # Test auf fehlende Übersetzungen
```

```bash packageManager="npm"
npx intlayer fill         # Fehlende Übersetzungen ausfüllen
```

```bash packageManager="yarn"
yarn intlayer fill         # Fehlende Übersetzungen ausfüllen
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Fehlende Übersetzungen ausfüllen
```

```bash packageManager="bun"
bun x intlayer fill         # Fehlende Übersetzungen ausfüllen
```

> Weitere Informationen finden Sie in der [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/ci.md)

</Step>

<Step number={8} title="Proxy für Locale-Erkennung konfigurieren" isOptional={true}>

Proxy einrichten, um die bevorzugte Sprache des Benutzers zu erkennen:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Der `intlayerProxy` wird verwendet, um die bevorzugte Sprache des Benutzers zu erkennen und ihn auf die entsprechende URL umzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) angegeben. Darüber hinaus ermöglicht er das Speichern der bevorzugten Sprache des Benutzers in einem Cookie.

> Seit Intlayer v9 respektiert diese Middleware die Option `routing.enableProxy` (`true` standardmäßig). Setzen Sie `routing.enableProxy: false` in Ihrer Konfiguration, um sie in einen Pass-through zu verwandeln, ohne diese Datei zu entfernen. Siehe die [v9 Release Notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/releases/v9.md).

</Step>

<Step number={8} title="Ändern Sie die Sprache Ihres Inhalts" isOptional={true}>

Um die Sprache deines Inhalts in Next.js zu ändern, ist die empfohlene Methode, die `Link`-Komponente zu verwenden, um Benutzer auf die entsprechende lokalisierte Seite umzuleiten. Die `Link`-Komponente ermöglicht das Prefetching der Seite, was einen vollständigen Neuladen der Seite vermeidet.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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
              {/* Sprache - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in aktueller Sprache - z.B. Französisch mit aktueller Sprache auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Eine alternative Möglichkeit ist die Verwendung der `setLocale` Funktion, die vom `useLocale` Hook bereitgestellt wird. Diese Funktion ermöglicht es nicht, die Seite vorab zu laden. Weitere Informationen finden Sie in der [`useLocale` Hook Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md).

</Step>

<Step number={10} title="Optimize your bundle size" isOptional={true}>

Bei der Verwendung von `next-intlayer` werden Wörterbücher standardmäßig in das Bundle für jede Seite eingebunden. Um die Bundle-Größe zu optimieren, stellt Intlayer ein optionales SWC-Plugin zur Verfügung, das `useIntlayer`-Aufrufe intelligent durch Makros ersetzt. Dies stellt sicher, dass Wörterbücher nur in Bundles für Seiten eingebunden werden, die sie tatsächlich verwenden.

Das `@intlayer/babel`-Plugin integriert bereits die Bundling-Optimierung (siehe `babel.config.js`). Aber das `@intlayer/swc`-Plugin ist leistungsfähiger. Wenn Sie das `@intlayer/babel`-Plugin entfernen, können Sie das `@intlayer/swc`-Plugin verwenden.

Installieren Sie das `@intlayer/swc` Package. Nach der Installation erkennt `next-intlayer` das Plugin automatisch und verwendet es:

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

> Hinweis: Dieses Paket wird standardmäßig nicht installiert, da SWC-Plugins auf Next.js noch experimentell sind. Dies kann sich in Zukunft ändern.

> Hinweis: Wenn Sie die Option als `importMode: 'dynamic'` oder `importMode: 'fetch'` (in der `dictionary` Konfiguration) setzen, wird sie sich auf Suspense verlassen, daher müssen Sie Ihre `useIntlayer` Aufrufe in eine `Suspense` Grenze einwickeln. Das bedeutet, dass Sie `useIntlayer` nicht direkt auf der obersten Ebene Ihrer Page / Layout Komponente verwenden können.

</Step>

<Step number={1} title="Inhalt Ihrer Komponenten extrahieren" isOptional={true}>

Wenn Sie eine bestehende Codebasis haben, kann die Transformation von Tausenden von Dateien zeitaufwendig sein.

Um diesen Prozess zu erleichtern, bietet Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) / [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) an, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

Um es einzurichten, können Sie einen `compiler`-Abschnitt in Ihrer `intlayer.config.ts`-Datei hinzufügen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest Ihrer Konfiguration
  compiler: {
    /**
     * Gibt an, ob der Compiler aktiviert sein soll.
     */
    enabled: true,

    /**
     * Definiert den Pfad der Ausgabedateien
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen. Auf diese Weise kann der Compiler nur einmal ausgeführt werden, um die App zu transformieren, und dann entfernt werden.
     */
    saveComponents: false,

    /**
     * Präfix für Wörterbuchschlüssel
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extraktionsbefehl'>

Führen Sie den Extractor aus, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel-Compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Inhalt aus Komponenten in Wörterbücher extrahieren
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # Oder npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Oder pnpm run dev
```

```bash packageManager="yarn"
yarn build # Oder yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

</Steps>

### TypeScript konfigurieren

Intlayer verwendet Modulerweiterung (Module Augmentation), um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Fügen Sie die automatisch generierten Typen hinzu
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch wird verhindert, dass sie in Ihr Git-Repository übertragen werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code-Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code-Erweiterung** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Fehlererkennung in Echtzeit** für fehlende Übersetzungen.
- **Inline-Vorschau** von übersetzten Inhalten.
- **Schnelle Aktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code-Erweiterung](https://intlayer.org/doc/vs-code-extension).

### Weiterführende Informationen

Um noch weiter zu gehen, können Sie den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) externalisieren.

## Häufig gestellte Fragen

<FAQ>

<Question title="Welche verschiedenen Lösungen gibt es, um eine Next.js-App zu internationalisieren?">

Das `i18n`-Feld von `next.config.js` gilt nicht für den App Router, sodass die Lokalisierungsebene immer eine Bibliothekswahl ist:

- **`next-intl`**, **`next-i18next` / `i18next`** und **`react-intl`**: JSON- oder ICU-Kataloge, die pro Namespace geladen werden, mit von Hand an jeder Aufrufstelle geschriebenen Schlüsseln.
- **`Lingui`**: extraktionsgetrieben, mit zur Build-Zeit kompilierten ICU-Nachrichten.
- **`Intlayer`**: Inhalte werden zur Build-Zeit aus Ihren Komponenten heraus kompiliert, vollständig typisiert, mit KI-Übersetzung, visuellem Editor und CMS.

Dieser Leitfaden verwendet das Compiler-Setup, bei dem Sie weiterhin einfache Strings in Ihren Komponenten schreiben und die Wörterbücher für Sie generiert werden. Siehe [warum Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md) und den [Next.js-i18n-Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md).

</Question>

<Question title="Wie viel trägt i18n zu meiner Next.js-Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Server Components lösen ihren Inhalt auf dem Server auf, und der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden, und [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md).

</Question>

<Question title="Kann ich von `next-intl`, `next-i18next` oder `i18next` migrieren, ohne meine Komponenten neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [next-intl-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md) oder dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `next-intl`, `react-i18next` und `react-intl` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Komponentencode nicht.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein, und genau das richtet dieser Leitfaden ein. Sie schreiben Ihre Komponenten mit einfachen Strings in Ihrer Standard-Locale, und der [Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) scannt bei jedem Build den Quellcode, extrahiert den für den Nutzer sichtbaren Text und generiert die Wörterbücher, sodass es keine von Hand zu erstellenden oder zu pflegenden Schlüssel gibt.

Zwei Einschränkungen sollten Sie kennen. Der Compiler arbeitet mit statischer Analyse, sodass Strings, die nur zur Laufzeit existieren, etwa API-Fehlercodes oder CMS-Felder, unerreichbar bleiben und weiterhin ein deklariertes Wörterbuch brauchen. Und er muss für den Nutzer sichtbaren Text von Anwendungslogik wie `className="active"` oder einem Statuscode unterscheiden, was in einer großen Codebasis einige Annotationen erfordert.

Wenn Sie lieber die Kontrolle behalten, führt `npx intlayer extract` dieselbe Extraktion einmalig auf den von Ihnen gewählten Dateien aus und schreibt neben jede Komponente eine `.content`-Datei für Ihren Review. Siehe den [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md).

</Question>

<Question title="Welches Editor- und KI-Agenten-Tooling ist verfügbar?">

Fünf Bausteine, alle optional:

- **[VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)**: von einem `useIntlayer`-Schlüssel zur Inhaltsdatei springen, die ihn deklariert, Inhalte aus einer Komponente extrahieren und build, fill, test, push und pull über die Befehlspalette oder einen eigenen Intlayer-Tab ausführen.
- **[LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**: dieselbe Wahrnehmung in jedem Editor, der LSP spricht, mit „Gehe zu Definition“, „Alle Referenzen suchen“, Hover-Vorschauen eines übersetzten Werts, Autovervollständigung von Schlüsseln und Feldern sowie einer Warnung, wenn ein Schlüssel nirgends deklariert ist. Es löst außerdem `i18next`-, `react-i18next`-, `next-intl`- und `use-intl`-Aufrufe auf, was bei der Migration hilft.
- **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)**: stellt die Intlayer-Dokumentation und -CLI für Cursor, VS Code, Claude Desktop, Claude Code und ChatGPT bereit, sodass ein Assistent aus der aktuellen Doku antwortet statt zu raten und Befehle wie `intlayer fill` selbst ausführen kann.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**: fokussierte Skills wie `intlayer-config`, `intlayer-cli` und `intlayer-content` sowie eines pro Framework, die einem Agenten Ihr Routing-Setup und die Inhaltsknoten-Typen beibringen.
- **[ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)**: `no-raw-text` markiert fest kodierte Strings, mit weiteren Regeln für statische Wörterbuchschlüssel und ungenutzte Inhalte.

</Question>

<Question title="Sollte ich den Compiler verwenden oder meine Inhalte selbst deklarieren?">

Verwenden Sie den Compiler, wenn Sie i18n mit möglichst wenig Aufwand zu einer bestehenden Codebasis hinzufügen möchten: Ihre Komponenten bleiben, wie sie sind, und die Wörterbücher folgen. Deklarieren Sie Inhalte selbst, wie der [Standard-Next.js-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md) zeigt, wenn Sie explizite Kontrolle über Schlüssel, Struktur und Wiederverwendung möchten. Beide können in derselben Wörterbuchebene nebeneinander bestehen.

</Question>

<Question title="Warum muss ich Babel konfigurieren?">

Schritt 4 behandelt das. Der Compiler liest Ihre Komponenten über eine Babel-Transformation, sodass Next.js eine `babel.config.js` benötigt, damit der Extraktionsdurchlauf läuft. `npx intlayer init --interactive` gerüstet sie für Sie, wenn Sie das Compiler-Setup wählen.

</Question>

<Question title="Was passiert mit Strings, die der Compiler nicht sehen kann?">

Sie bleiben unübersetzt, weil der Compiler mit statischer Analyse arbeitet. Alles, was zur Laufzeit zusammengesetzt wird, etwa eine API-Fehlermeldung, ein CMS-Feld oder ein durch Verkettung gebauter String, muss auf die normale Weise in einer Inhaltsdatei deklariert werden. Führen Sie `npx intlayer test` aus, um zu finden, was fehlt.

</Question>

<Question title="Wie fülle ich die fehlenden Übersetzungen?">

Schritt 7 behandelt das. `npx intlayer fill` sendet den extrahierten Inhalt an das LLM Ihrer Wahl, unter Verwendung Ihres eigenen Anbieters und API-Schlüssels, und `--git-diff` beschränkt den Lauf auf das, was sich im Branch geändert hat. Siehe den [fill-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) und die [CI/CD-Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/CI_CD.md).

</Question>

<Question title="Wie wird die Locale erkannt?">

Schritt 5 liest sie in Ihren Seiten und Schritt 8 fügt den Proxy hinzu, der sie aus der URL, einem Cookie oder dem `Accept-Language`-Header auflöst. `routing.mode` entscheidet, ob die Locale überhaupt im Pfad erscheint. Siehe die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

</Question>

<Question title="Unterstützt Intlayer Pluralformen, Genus und Rich Text?">

Ja: [Pluralformen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/plurial.md), [genusbasierte Inhalte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/gender.md), Bedingungen, [Einfügungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md) und [Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/formatters.md) für Zahlen, Daten und Währungen.

</Question>

<Question title="Wie können Übersetzer die Inhalte bearbeiten, ohne den Code anzufassen?">

Über den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), der auf Ihrer eigenen Infrastruktur läuft und es jedem ermöglicht, Text direkt in der laufenden App zu bearbeiten, oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md), das Inhalte auslagert, sodass sie sich ohne Deployment ändern können.

</Question>

<Question title="Ist Intlayer kostenlos und Open Source?">

Ja, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst, der auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden kann.

</Question>

</FAQ>
