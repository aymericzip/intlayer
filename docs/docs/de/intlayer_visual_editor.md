---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Intlayer Visual Editor | Bearbeiten Sie Ihren Inhalt mit einem visuellen Editor
description: Erfahren Sie, wie Sie den Intlayer-Editor zur Verwaltung Ihrer mehrsprachigen Website nutzen können. Befolgen Sie die Schritte in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - Editor
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Intlayer Visual Editor Dokumentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Der Intlayer Visual Editor ist ein Tool, das Ihre Website einbindet, um mit Ihren Inhaltsdeklarationsdateien über einen visuellen Editor zu interagieren.

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Das `intlayer-editor`-Paket basiert auf Intlayer und ist für JavaScript-Anwendungen verfügbar, wie React (Create React App), Vite + React und Next.js.

## Visueller Editor vs CMS

Der Intlayer Visual Editor ist ein Tool, mit dem Sie Ihre Inhalte in einem visuellen Editor für lokale Wörterbücher verwalten können. Sobald eine Änderung vorgenommen wird, wird der Inhalt in der Code-Basis ersetzt. Das bedeutet, dass die Anwendung neu gebaut wird und die Seite neu geladen wird, um den neuen Inhalt anzuzeigen.

Im Gegensatz dazu ist das [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ein Tool, mit dem Sie Ihre Inhalte in einem visuellen Editor für entfernte Wörterbücher verwalten können. Sobald eine Änderung vorgenommen wird, wirkt sich der Inhalt **nicht** auf Ihre Code-Basis aus. Und die Website zeigt automatisch den geänderten Inhalt an.

## Intlayer in Ihre Anwendung integrieren

Für weitere Details zur Integration von Intlayer siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js, siehe den [Setup-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App, siehe den [Setup-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md).

### Integration mit Vite + React

Für die Integration mit Vite + React, siehe den [Setup-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md).

## Wie der Intlayer Editor funktioniert

Der visuelle Editor in einer Anwendung umfasst zwei Dinge:

- Eine Frontend-Anwendung, die Ihre Website in einem iframe anzeigt. Wenn Ihre Website Intlayer verwendet, erkennt der visuelle Editor automatisch Ihre Inhalte und ermöglicht Ihnen, mit ihnen zu interagieren. Sobald eine Änderung vorgenommen wurde, können Sie Ihre Änderungen herunterladen.

- Sobald Sie auf die Schaltfläche "Herunterladen" klicken, sendet der visuelle Editor eine Anfrage an den Server, um Ihre Inhaltsdeklarationsdateien mit dem neuen Inhalt zu ersetzen (wo auch immer diese Dateien in Ihrem Projekt deklariert sind).

> Beachten Sie, dass der Intlayer Editor Ihre Inhaltsdeklarationsdateien derzeit als JSON-Dateien schreibt.

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

```bash packageManager="bun"
bun add intlayer-editor --dev
```

## Konfiguration

In Ihrer Intlayer-Konfigurationsdatei können Sie die Editor-Einstellungen anpassen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    /**
     * Erforderlich
     * Die URL der Anwendung.
     * Dies ist die URL, die vom visuellen Editor angezielt wird.
     * Beispiel: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optional
     * Standardmäßig `true`. Wenn `false`, ist der Editor inaktiv und kann nicht aufgerufen werden.
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen für bestimmte Umgebungen wie Produktion zu deaktivieren.
     */
    enabled: process.env.INTLAYER_ENABLED,
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
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... andere Konfigurationseinstellungen
  editor: {
    /**
     * Erforderlich
     * Die URL der Anwendung.
     * Dies ist die URL, die vom visuellen Editor angezielt wird.
     * Beispiel: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optional
     * Standardmäßig `true`. Wenn `false`, ist der Editor inaktiv und kann nicht aufgerufen werden.
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen für bestimmte Umgebungen wie Produktion zu deaktivieren.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Optional
     * Standardmäßig `8000`.
     * Der Port, der vom Server des visuellen Editors verwendet wird.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optional
     * Standardmäßig "http://localhost:8000"
     * Die URL des Editor-Servers, die von der Anwendung erreicht werden kann. Wird verwendet, um die Ursprünge einzuschränken, die mit der Anwendung interagieren können, aus Sicherheitsgründen. Wenn auf `'*'` gesetzt, ist der Editor von jedem Ursprung aus zugänglich. Sollte gesetzt werden, wenn der Port geändert wird oder wenn der Editor auf einer anderen Domain gehostet wird.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
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
     * Dies ist die URL, die vom visuellen Editor angezielt wird.
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
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen für bestimmte Umgebungen wie Produktion zu deaktivieren.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Um alle verfügbaren Parameter zu sehen, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

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

   > **Beachten Sie, dass Sie Ihre Anwendung parallel ausführen sollten.** Die Anwendungs-URL sollte mit der übereinstimmen, die Sie in der Editor-Konfiguration (`applicationURL`) festgelegt haben.

2. Öffnen Sie dann die bereitgestellte URL. Standardmäßig `http://localhost:8000`.

   Sie können jedes von Intlayer indizierte Feld anzeigen, indem Sie mit dem Cursor über Ihren Inhalt fahren.

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Wenn Ihr Inhalt umrissen ist, können Sie ihn lange drücken, um die Bearbeitungsleiste anzuzeigen.

## Umgebungs-Konfiguration

Der Editor kann so konfiguriert werden, dass er eine bestimmte Umgebungsdatei verwendet. Dies ist nützlich, wenn Sie dieselbe Konfigurationsdatei für Entwicklung und Produktion verwenden möchten.

Um eine bestimmte Umgebungsdatei zu verwenden, können Sie beim Starten des Editors die Option `--env-file` oder `-f` verwenden:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Beachten Sie, dass sich die Umgebungsdatei im Stammverzeichnis Ihres Projekts befinden sollte.

Oder Sie können die Option `--env` oder `-e` verwenden, um die Umgebung anzugeben:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Debug

Wenn Sie Probleme mit dem visuellen Editor haben, überprüfen Sie Folgendes:

- Der visuelle Editor und die Anwendung laufen.

- Die [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) Konfiguration ist korrekt in Ihrer Intlayer-Konfigurationsdatei eingestellt.
  - Erforderliche Felder:
    - Die Anwendungs-URL sollte mit der übereinstimmen, die Sie in der Editor-Konfiguration (`applicationURL`) festgelegt haben.

- Der visuelle Editor verwendet ein iframe, um Ihre Website anzuzeigen. Stellen Sie sicher, dass die Content Security Policy (CSP) Ihrer Website die CMS-URL als `frame-ancestors` erlaubt (standardmäßig 'http://localhost:8000'). Überprüfen Sie die Konsole des Editors auf Fehler.
