---
createdAt: 2026-01-10
updatedAt: 2026-03-12
title: Next.js i18n - Transformieren Sie eine bestehende Next.js-App in eine mehrsprachige App in 2026
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
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.2.0
    date: 2026-03-09
    changes: Update compiler options, add FilePathPattern support
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

> Doc Compiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md)

### Einschränkungen

Da der Compiler eine Codeanalyse und -transformation (Einfügen von Hooks und Generieren von Wörterbüchern) zur **Kompilierzeit** durchführt, kann er den **Build-Prozess verlangsamen**.

Um diese Auswirkungen während der Entwicklung zu mildern, können Sie den Compiler im Modus [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) ausführen oder ihn ganz deaktivieren, wenn er nicht benötigt wird.

---

## Schritt-für-Schritt-Anleitung

### (Optional) Schritt 1 : Inhalt Ihrer Komponenten extrahieren

Wenn Sie eine bestehende Codebasis haben, kann die Transformation von Tausenden von Dateien zeitaufwendig sein.

Um diesen Prozess zu erleichtern, bietet Intlayer einen [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) / [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) an, um Ihre Komponenten zu transformieren und den Inhalt zu extrahieren.

Um es einzurichten, können Sie einen `compiler`-Abschnitt in Ihrer `intlayer.config.ts`-Datei hinzufügen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
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
bunx intlayer extract
```

 </Tab>
 <Tab value='Babel-Compiler'>

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

zur Einrichtung von Intlayer in einer Next.js-Anwendung

- **`IntlayerClientProvider`** wird verwendet, um die Sprache für Client-Komponenten bereitzustellen.
- **`IntlayerServerProvider`** wird verwendet, um die Sprache für Server-Kinder bereitzustellen.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

### Weiterführende Informationen

Um noch weiter zu gehen, können Sie den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) externalisieren.
