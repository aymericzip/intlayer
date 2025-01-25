# Intlayer Content Management System (CMS) Dokumentation

Das Intlayer CMS ist eine Anwendung, die es Ihnen ermöglicht, Ihren Inhalt eines Intlayer-Projekts zu externalisieren.

Dafür führt Intlayer das Konzept der 'distant dictionaries' ein.

## Verständnis der distant dictionaries

Intlayer unterscheidet zwischen 'local' und 'distant' dictionaries.

- Ein 'local' dictionary ist ein Wörterbuch, das in Ihrem Intlayer-Projekt deklariert ist. Zum Beispiel die Deklarationsdatei eines Buttons oder Ihrer Navigationsleiste. Das Externalisieren Ihres Inhalts macht in diesem Fall keinen Sinn, da dieser Inhalt nicht oft geändert werden soll.

- Ein 'distant' dictionary ist ein Wörterbuch, das über das Intlayer CMS verwaltet wird. Es könnte nützlich sein, um Ihrem Team zu ermöglichen, Ihren Inhalt direkt auf Ihrer Website zu verwalten, und zielt auch darauf ab, A/B-Testing-Funktionen und automatische SEO-Optimierung zu nutzen.

## Visual Editor vs CMS

Der [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) Editor ist ein Werkzeug, das es Ihnen ermöglicht, Ihren Inhalt in einem visuellen Editor für lokale Wörterbücher zu verwalten. Sobald eine Änderung vorgenommen wird, wird der Inhalt im Code-Basis ersetzt. Das bedeutet, dass die Anwendung neu erstellt wird und die Seite neu geladen wird, um den neuen Inhalt anzuzeigen.

Im Gegensatz dazu ist das Intlayer CMS ein Werkzeug, das es Ihnen ermöglicht, Ihren Inhalt in einem visuellen Editor für distale Wörterbücher zu verwalten. Sobald eine Änderung vorgenommen wird, wird der Inhalt **nicht** Ihre Code-Basis beeinflussen. Und die Website wird automatisch den geänderten Inhalt anzeigen.

## Integration

Für weitere Details zur Installation des Pakets siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js, siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App, siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md).

### Integration mit Vite + React

Für die Integration mit Vite + React, siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md).

## Konfiguration

### 1. Aktivieren Sie den Editor in Ihrer intlayer.config.ts-Datei

In Ihrer Intlayer-Konfigurationsdatei können Sie die Editor-Einstellungen anpassen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    /**
     * Client-ID und Client-Geheimnis sind erforderlich, um den Editor zu aktivieren.
     * Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
     * Sie können erhalten werden, indem Sie einen neuen Client im Intlayer Dashboard - Projekte erstellen (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Optional
     * Standardmäßig auf `true`. Wenn `false`, ist der Editor inaktiv und kann nicht aufgerufen werden.
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen für bestimmte Umgebungen zu deaktivieren, wie z.B. Produktion.
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
     * Client-ID und Client-Geheimnis sind erforderlich, um den Editor zu aktivieren.
     * Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
     * Sie können erhalten werden, indem Sie einen neuen Client im Intlayer Dashboard - Projekte erstellen (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,    /**
     * Optional
     * Standardmäßig auf `true`. Wenn `false`, ist der Editor inaktiv und kann nicht aufgerufen werden.
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen für bestimmte Umgebungen zu deaktivieren, wie z.B. Produktion.
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
     * Client-ID und Client-Geheimnis sind erforderlich, um den Editor zu aktivieren.
     * Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
     * Sie können erhalten werden, indem Sie einen neuen Client im Intlayer Dashboard - Projekte erstellen (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Optional
     * Standardmäßig auf `true`. Wenn `false`, ist der Editor inaktiv und kann nicht aufgerufen werden.
     * Kann verwendet werden, um den Editor aus Sicherheitsgründen für bestimmte Umgebungen zu deaktivieren, wie z.B. Produktion.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Wenn Sie keine Client-ID und kein Client-Geheimnis haben, können Sie diese erhalten, indem Sie einen neuen Client im [Intlayer Dashboard - Projekte](https://intlayer.org/dashboard/projects) erstellen.

> Um alle verfügbaren Parameter zu sehen, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Verwendung des CMS

Wenn der Editor installiert ist, können Sie jedes von Intlayer indizierte Feld sehen, indem Sie mit dem Cursor über Ihren Inhalt fahren.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Wenn Ihr Inhalt umreißt ist, können Sie ihn lange drücken, um das Bearbeitungsfeld anzuzeigen.
