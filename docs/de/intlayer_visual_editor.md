# Intlayer Visual Editor Dokumentation

Der Intlayer Visual Editor ist ein Tool, das Ihre Website umhüllt, um mit Ihren Inhaltsdeklarationsdateien über einen visuellen Editor zu interagieren.

![Intlayer Visual Editor Benutzeroberfläche](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

Das `intlayer-editor`-Paket basiert auf Intlayer und ist für JavaScript-Anwendungen wie React (Create React App), Vite + React und Next.js verfügbar.

## Visueller Editor vs CMS

Der Intlayer Visual Editor ist ein Tool, das es Ihnen ermöglicht, Ihre Inhalte in einem visuellen Editor für lokale Wörterbücher zu verwalten. Sobald eine Änderung vorgenommen wird, wird der Inhalt im Code-Basis ersetzt. Das bedeutet, dass die Anwendung neu gebaut wird und die Seite neu geladen wird, um den neuen Inhalt anzuzeigen.

Im Gegensatz dazu ist das [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) ein Tool, das es Ihnen ermöglicht, Ihre Inhalte in einem visuellen Editor für entfernte Wörterbücher zu verwalten. Sobald eine Änderung vorgenommen wird, wird der Inhalt **nicht** Ihre Code-Basis beeinflussen. Und die Website zeigt automatisch die geänderten Inhalte an.

## Integrieren Sie Intlayer in Ihre Anwendung

Für weitere Details zur Integration von Intlayer siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js verweisen Sie auf die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App verweisen Sie auf die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md).

### Integration mit Vite + React

Für die Integration mit Vite + React verweisen Sie auf die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md).

## So funktioniert der Intlayer Editor

Der visuelle Editor in einer Anwendung umfasst zwei Dinge:

- Eine Frontend-Anwendung, die Ihre Website in ein iframe einfügt. Wenn Ihre Website Intlayer verwendet, erkennt der visuelle Editor automatisch Ihren Inhalt und ermöglicht es Ihnen, damit zu interagieren. Sobald eine Änderung vorgenommen wird, können Sie Ihre Änderungen herunterladen.

- Sobald Sie auf die Schaltfläche "Download" klicken, sendet der visuelle Editor eine Anfrage an den Server, um Ihre Inhaltsdeklarationsdateien mit den neuen Inhalten zu ersetzen (wo auch immer diese Dateien in Ihrem Projekt deklariert sind).

> Beachten Sie, dass der Intlayer Editor Ihre Inhaltsdeklarationsdateien vorerst als JSON-Dateien schreibt.

## Installation

Sobald Intlayer in Ihrem Projekt konfiguriert ist, installieren Sie einfach `intlayer-editor` als Entwicklungsabhängigkeit:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## Konfiguration

### 1. Aktivieren Sie den Editor in Ihrer intlayer.config.ts-Datei

In Ihrer Intlayer-Konfigurationsdatei können Sie die Editor-Einstellungen anpassen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    /**
     * Erforderlich
     * Die URL der Anwendung.
     * Dies ist die URL, die vom visuellen Editor angesteuert wird.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optional
     * Standardmäßig `8000`.
     * Der Port des Editor-Servers.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optional
     * Standardmäßig "http://localhost:8000"
     * Die URL des Editor-Servers.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Optional
     * Standardmäßig `true`. Wenn `false`, ist der Editor inaktiv und kann nicht aufgerufen werden.
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen in bestimmten Umgebungen, wie z.B. Produktion, zu deaktivieren.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... andere Konfigurationseinstellungen
  editor: {
   /**
     * Erforderlich
     * Die URL der Anwendung.
     * Dies ist die URL, die vom visuellen Editor angesteuert wird.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optional
     * Standardmäßig `8000`.
     * Der Port des Editor-Servers.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optional
     * Standardmäßig "http://localhost:8000"
     * Die URL des Editor-Servers.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Optional
     * Standardmäßig `true`. Wenn `false`, ist der Editor inaktiv und kann nicht aufgerufen werden.
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen in bestimmten Umgebungen, wie z.B. Produktion, zu deaktivieren.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... andere Konfigurationseinstellungen
  editor: {
    /**
     * Erforderlich
     * Die URL der Anwendung.
     * Dies ist die URL, die vom visuellen Editor angesteuert wird.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optional
     * Standardmäßig `8000`.
     * Der Port des Editor-Servers.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optional
     * Standardmäßig "http://localhost:8000"
     * Die URL des Editor-Servers.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Optional
     * Standardmäßig `true`. Wenn `false`, ist der Editor inaktiv und kann nicht aufgerufen werden.
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen in bestimmten Umgebungen, wie z.B. Produktion, zu deaktivieren.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Um alle verfügbaren Parameter zu sehen, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Verwendung des Editors

1. Wenn der Editor installiert ist, können Sie den Editor mit folgendem Befehl starten:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. Öffnen Sie dann die angegebene URL. Standardmäßig `http://localhost:8000`.

   Sie können jedes Feld, das von Intlayer indiziert ist, sehen, indem Sie mit dem Cursor über Ihren Inhalt fahren.

   ![Mit dem Inhalt Hover](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Wenn Ihr Inhalt umrissen ist, können Sie lange darauf klicken, um das Bearbeitungsfeld anzuzeigen.
