---
docName: intlayer_CMS
url: /doc/concept/cms
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Intlayer CMS | Externieren Sie Ihren Inhalt in das Intlayer CMS
description: Externieren Sie Ihren Inhalt in das Intlayer CMS, um die Verwaltung Ihres Inhalts an Ihr Team zu delegieren.
keywords:
  - CMS
  - Visual Editor
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer Content Management System (CMS) Dokumentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Das Intlayer CMS ist eine Anwendung, die es Ihnen ermöglicht, den Inhalt eines Intlayer-Projekts auszulagern.

Dafür führt Intlayer das Konzept der 'entfernten Wörterbücher' ein.

![Intlayer CMS Oberfläche](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Verständnis von entfernten Wörterbüchern

Intlayer unterscheidet zwischen 'lokalen' und 'entfernten' Wörterbüchern.

- Ein 'lokales' Wörterbuch ist ein Wörterbuch, das in Ihrem Intlayer-Projekt deklariert ist. Zum Beispiel die Deklarationsdatei eines Buttons oder Ihrer Navigationsleiste. Die Auslagerung dieses Inhalts macht in diesem Fall keinen Sinn, da dieser Inhalt nicht häufig geändert werden soll.

- Ein 'entferntes' Wörterbuch ist ein Wörterbuch, das über das Intlayer CMS verwaltet wird. Es kann nützlich sein, Ihrem Team zu ermöglichen, Inhalte direkt auf Ihrer Website zu verwalten, und zielt auch darauf ab, A/B-Testfunktionen und automatische SEO-Optimierung zu nutzen.

## Visueller Editor vs CMS

Der [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) Editor ist ein Tool, das es Ihnen ermöglicht, Inhalte in einem visuellen Editor für lokale Wörterbücher zu verwalten. Sobald eine Änderung vorgenommen wurde, wird der Inhalt in der Code-Basis ersetzt. Das bedeutet, dass die Anwendung neu gebaut und die Seite neu geladen wird, um den neuen Inhalt anzuzeigen.

Im Gegensatz dazu ist das Intlayer CMS ein Tool, das es Ihnen ermöglicht, Inhalte in einem visuellen Editor für entfernte Wörterbücher zu verwalten. Sobald eine Änderung vorgenommen wurde, wird der Inhalt **nicht** Ihre Code-Basis beeinflussen. Und die Website wird den geänderten Inhalt automatisch anzeigen.

## Integration

Für weitere Details zur Installation des Pakets siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js, siehe die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App, siehe die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md).

### Integration mit Vite + React

Für die Integration mit Vite + React, siehe die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md).

## Konfiguration

In Ihrer Intlayer-Konfigurationsdatei können Sie die CMS-Einstellungen anpassen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    /**
     * Erforderlich
     *
     * Die URL der Anwendung.
     * Dies ist die URL, die vom visuellen Editor anvisiert wird.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Erforderlich
     *
     * Client-ID und Client-Secret sind erforderlich, um den Editor zu aktivieren.
     * Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
     * Sie können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optional
     *
     * Falls Sie das Intlayer CMS selbst hosten, können Sie die URL des CMS festlegen.
     *
     * Die URL des Intlayer CMS.
     * Standardmäßig ist sie auf https://intlayer.org gesetzt.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * Falls Sie das Intlayer CMS selbst hosten, können Sie die URL des Backends festlegen.
     *
     * Die URL des Intlayer CMS.
     * Standardmäßig ist sie auf https://back.intlayer.org gesetzt.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * Die URL der Anwendung.
     * Dies ist die URL, die vom visuellen Editor anvisiert wird.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Erforderlich
     *
     * Client-ID und Client-Secret sind erforderlich, um den Editor zu aktivieren.
     * Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
     * Sie können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optional
     *
     * Falls Sie das Intlayer CMS selbst hosten, können Sie die URL des CMS festlegen.
     *
     * Die URL des Intlayer CMS.
     * Standardmäßig ist sie auf https://intlayer.org gesetzt.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * Falls Sie das Intlayer CMS selbst hosten, können Sie die URL des Backends festlegen.
     *
     * Die URL des Intlayer CMS.
     * Standardmäßig ist sie auf https://back.intlayer.org gesetzt.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * Die URL der Anwendung.
     * Dies ist die URL, die vom visuellen Editor anvisiert wird.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Erforderlich
     *
     * Client-ID und Client-Secret sind erforderlich, um den Editor zu aktivieren.
     * Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
     * Sie können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optional
     *
     * Falls Sie das Intlayer CMS selbst hosten, können Sie die URL des CMS festlegen.
     *
     * Die URL des Intlayer CMS.
     * Standardmäßig ist sie auf https://intlayer.org gesetzt.
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * Falls Sie das Intlayer CMS selbst hosten, können Sie die URL des Backends festlegen.
     *
     * Die URL des Intlayer CMS.
     * Standardmäßig ist sie auf https://back.intlayer.org gesetzt.
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Wenn Sie keine Client-ID und kein Client-Secret haben, können Sie diese durch das Erstellen eines neuen Clients im [Intlayer Dashboard - Projekte](https://intlayer.org/dashboard/projects) erhalten.

> Um alle verfügbaren Parameter zu sehen, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Verwendung des CMS

### Konfiguration hochladen

Um das Intlayer CMS zu konfigurieren, können Sie die [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/de/intlayer_cli.md) Befehle verwenden.

```bash
npx intlayer config push
```

> Wenn Sie Umgebungsvariablen in Ihrer `intlayer.config.ts` Konfigurationsdatei verwenden, können Sie die gewünschte Umgebung mit dem `--env` Argument angeben:

```bash
npx intlayer config push --env production
```

Dieser Befehl lädt Ihre Konfiguration in das Intlayer CMS hoch.

### Wörterbuch hochladen

Um Ihre lokalen Wörterbücher in ein entferntes Wörterbuch zu transformieren, können Sie die [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/de/intlayer_cli.md) Befehle verwenden.

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Wenn Sie Umgebungsvariablen in Ihrer `intlayer.config.ts` Konfigurationsdatei verwenden, können Sie die gewünschte Umgebung mit dem `--env` Argument angeben:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Dieser Befehl lädt Ihre initialen Inhaltswörterbücher hoch, sodass sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar sind.

### Wörterbuch bearbeiten

Dann können Sie Ihr Wörterbuch im [Intlayer CMS](https://intlayer.org/dashboard/content) anzeigen und verwalten.

## Hot Reloading

Das Intlayer CMS kann die Wörterbücher automatisch neu laden, wenn eine Änderung erkannt wird.

Ohne das Hot Reloading wird ein neuer Build der Anwendung benötigt, um den neuen Inhalt anzuzeigen.

Durch Aktivieren der [`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration) Konfiguration wird die Anwendung den aktualisierten Inhalt automatisch ersetzen, sobald er erkannt wird.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    // ... andere Konfigurationseinstellungen

    /**
     * Gibt an, ob die Anwendung die lokalen Konfigurationen automatisch neu laden soll, wenn eine Änderung erkannt wird.
     * Zum Beispiel, wenn ein neues Wörterbuch hinzugefügt oder aktualisiert wird, wird die Anwendung den Inhalt aktualisieren, der auf der Seite angezeigt wird.
     *
     * Da das Hot Reloading eine kontinuierliche Verbindung zum Server benötigt, ist es nur für Kunden des `Enterprise`-Plans verfügbar.
     *
     * Standard: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... andere Konfigurationseinstellungen
  editor: {
    // ... andere Konfigurationseinstellungen

    /**
     * Gibt an, ob die Anwendung die lokalen Konfigurationen automatisch neu laden soll, wenn eine Änderung erkannt wird.
     * Zum Beispiel, wenn ein neues Wörterbuch hinzugefügt oder aktualisiert wird, wird die Anwendung den Inhalt aktualisieren, der auf der Seite angezeigt wird.
     *
     * Da das Hot Reloading eine kontinuierliche Verbindung zum Server benötigt, ist es nur für Kunden des `Enterprise`-Plans verfügbar.
     *
     * Standard: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... andere Konfigurationseinstellungen
  editor: {
    // ... andere Konfigurationseinstellungen

    /**
     * Gibt an, ob die Anwendung die lokalen Konfigurationen automatisch neu laden soll, wenn eine Änderung erkannt wird.
     * Zum Beispiel, wenn ein neues Wörterbuch hinzugefügt oder aktualisiert wird, wird die Anwendung den Inhalt aktualisieren, der auf der Seite angezeigt wird.
     *
     * Da das Hot Reloading eine kontinuierliche Verbindung zum Server benötigt, ist es nur für Kunden des `Enterprise`-Plans verfügbar.
     *
     * Standard: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

Das Hot Reloading ersetzt den Inhalt sowohl auf der Server- als auch auf der Client-Seite.

- Auf der Server-Seite sollten Sie sicherstellen, dass der Anwendungsprozess Schreibzugriff auf das Verzeichnis `.intlayer/dictionaries` hat.
- Auf der Client-Seite ermöglicht das Hot Reloading der Anwendung, den Inhalt im Browser ohne Neuladen der Seite automatisch zu aktualisieren. Diese Funktion ist jedoch nur für Client-Komponenten verfügbar.

> Da das Hot Reloading eine kontinuierliche Verbindung zum Server über einen `EventListener` benötigt, ist es nur für Kunden des `Enterprise`-Plans verfügbar.

## Debugging

Falls Sie Probleme mit dem CMS haben, überprüfen Sie Folgendes:

- Die Anwendung läuft.

- Die [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) Konfiguration ist korrekt in Ihrer Intlayer-Konfigurationsdatei eingestellt.

  - Erforderliche Felder:
    - Die Anwendungs-URL sollte mit der übereinstimmen, die Sie in der Editor-Konfiguration (`applicationURL`) eingestellt haben.
    - Die CMS-URL

- Stellen Sie sicher, dass die Projektkonfiguration in das Intlayer CMS hochgeladen wurde.

- Der visuelle Editor verwendet ein iframe, um Ihre Website anzuzeigen. Stellen Sie sicher, dass die Content Security Policy (CSP) Ihrer Website die CMS-URL als `frame-ancestors` erlaubt ('https://intlayer.org' standardmäßig). Überprüfen Sie die Editor-Konsole auf Fehler.
