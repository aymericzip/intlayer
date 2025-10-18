---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Externalisieren Sie Ihre Inhalte in das Intlayer CMS
description: Externalisieren Sie Ihre Inhalte in das Intlayer CMS, um die Verwaltung Ihrer Inhalte an Ihr Team zu delegieren.
keywords:
  - CMS
  - Visueller Editor
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: Live-Sync-Dokumentation hinzugefügt
  - version: 6.0.0
    date: 2025-09-04
    changes: Ersetzte das Feld `hotReload` durch `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Intlayer Content Management System (CMS) Dokumentation

<iframe title="Visueller Editor + CMS für Ihre Webanwendung: Intlayer erklärt" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Das Intlayer CMS ist eine Anwendung, die es Ihnen ermöglicht, die Inhalte eines Intlayer-Projekts auszulagern.

Dafür führt Intlayer das Konzept der „fernen Wörterbücher“ ein.

![Intlayer CMS Oberfläche](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Verständnis von fernen Wörterbüchern

Intlayer unterscheidet zwischen „lokalen“ und „fernen“ Wörterbüchern.

- Ein „lokales“ Wörterbuch ist ein Wörterbuch, das in Ihrem Intlayer-Projekt deklariert ist. Zum Beispiel die Deklarationsdatei eines Buttons oder Ihrer Navigationsleiste. In diesem Fall macht es keinen Sinn, Ihre Inhalte auszulagern, da sich diese Inhalte nicht häufig ändern sollen.

- Ein „fernes“ Wörterbuch ist ein Wörterbuch, das über das Intlayer CMS verwaltet wird. Dies kann nützlich sein, um Ihrem Team zu ermöglichen, Ihre Inhalte direkt auf Ihrer Website zu verwalten, und zielt außerdem darauf ab, A/B-Testfunktionen und automatische SEO-Optimierung zu nutzen.

## Visueller Editor vs. CMS

Der [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) Editor ist ein Werkzeug, das es Ihnen ermöglicht, Ihre Inhalte in einem visuellen Editor für lokale Wörterbücher zu verwalten. Sobald eine Änderung vorgenommen wird, wird der Inhalt im Code-Basis ersetzt. Das bedeutet, dass die Anwendung neu gebaut wird und die Seite neu geladen wird, um den neuen Inhalt anzuzeigen.

Im Gegensatz dazu ist das Intlayer CMS ein Werkzeug, das es Ihnen ermöglicht, Ihre Inhalte in einem visuellen Editor für ferne Wörterbücher zu verwalten. Sobald eine Änderung vorgenommen wird, wirkt sich der Inhalt **nicht** auf Ihre Code-Basis aus. Und die Website zeigt automatisch den geänderten Inhalt an.

## Integration

Für weitere Details zur Installation des Pakets siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js siehe die [Installationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App siehe die [Installationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md).

### Integration mit Vite + React

Für die Integration mit Vite + React siehe die [Installationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md).

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
     * Dies ist die URL, auf die der visuelle Editor abzielt.
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
     * Dies ist die URL, auf die der visuelle Editor abzielt.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Erforderlich
     *
     * Client-ID und Client-Secret sind erforderlich, um den Editor zu aktivieren.
     * Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
     * Diese können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
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
     * Standardmäßig ist sie auf https://intlayer.org gesetzt
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * Falls Sie das Intlayer CMS selbst hosten, können Sie die URL des Backends festlegen.
     *
     * Die URL des Intlayer CMS.
     * Standardmäßig ist sie auf https://back.intlayer.org gesetzt
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
     * Dies ist die URL, auf die der visuelle Editor abzielt.
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
     * Standardmäßig ist sie auf https://intlayer.org gesetzt
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

> Um alle verfügbaren Parameter zu sehen, konsultieren Sie die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Verwendung des CMS

### Konfiguraton hochladen

Um das Intlayer CMS zu konfigurieren, können Sie die [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/docs/de/intlayer_cli.md) Befehle verwenden.

```bash
npx intlayer config push
```

> Wenn Sie Umgebungsvariablen in Ihrer `intlayer.config.ts` Konfigurationsdatei verwenden, können Sie die gewünschte Umgebung mit dem Argument `--env` angeben:

```bash
npx intlayer config push --env production
```

Dieser Befehl lädt Ihre Konfiguration in das Intlayer CMS hoch.

### Ein Wörterbuch hochladen

Um Ihre Lokalisierungswörterbücher in ein entferntes Wörterbuch zu transformieren, können Sie die [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/docs/de/intlayer_cli.md) Befehle verwenden.

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Wenn Sie Umgebungsvariablen in Ihrer `intlayer.config.ts` Konfigurationsdatei verwenden, können Sie die gewünschte Umgebung mit dem Argument `--env` angeben:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Dieser Befehl lädt Ihre anfänglichen Inhaltswörterbücher hoch und macht sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar.

### Wörterbuch bearbeiten

Anschließend können Sie Ihr Wörterbuch im [Intlayer CMS](https://intlayer.org/dashboard/content) anzeigen und verwalten.

## Live-Synchronisation

Live Sync ermöglicht es Ihrer App, CMS-Inhaltsänderungen zur Laufzeit widerzuspiegeln. Kein Neuaufbau oder erneutes Bereitstellen erforderlich. Wenn aktiviert, werden Updates an einen Live-Sync-Server gestreamt, der die Wörterbücher aktualisiert, die Ihre Anwendung liest.

> Live Sync erfordert eine kontinuierliche Serververbindung und ist im Enterprise-Plan verfügbar.

Aktivieren Sie Live Sync, indem Sie Ihre Intlayer-Konfiguration aktualisieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    /**
     * Aktiviert das Hot-Reloading der Lokalisierungskonfigurationen, wenn Änderungen erkannt werden.
     * Zum Beispiel, wenn ein Wörterbuch hinzugefügt oder aktualisiert wird, aktualisiert die Anwendung
     * den auf der Seite angezeigten Inhalt.
     *
     * Da Hot-Reloading eine kontinuierliche Verbindung zum Server erfordert, ist es
     * nur für Kunden des `enterprise`-Plans verfügbar.
     *
     * Standard: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Steuert, wie Wörterbücher importiert werden:
     *
     * - "live": Wörterbücher werden dynamisch über die Live Sync API abgerufen.
     *   Ersetzt useIntlayer durch useDictionaryDynamic.
     *
     * Hinweis: Der Live-Modus verwendet die Live Sync API, um Wörterbücher abzurufen. Wenn der API-Aufruf
     * fehlschlägt, werden die Wörterbücher dynamisch importiert.
     * Hinweis: Nur Wörterbücher mit entfernten Inhalten und dem "live"-Flag verwenden den Live-Modus.
     * Andere verwenden den dynamischen Modus für bessere Leistung.
     */
    importMode: "live",
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
     * Ermöglicht das Hot-Reloading von Sprachkonfigurationen, wenn Änderungen erkannt werden.
     * Zum Beispiel, wenn ein Wörterbuch hinzugefügt oder aktualisiert wird, aktualisiert die Anwendung
     * den auf der Seite angezeigten Inhalt.
     *
     * Da Hot-Reloading eine kontinuierliche Verbindung zum Server erfordert, ist es
     * nur für Kunden des `enterprise`-Plans verfügbar.
     *
     * Standard: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Steuert, wie Wörterbücher importiert werden:
     *
     * - "live": Wörterbücher werden dynamisch über die Live Sync API abgerufen.
     *   Ersetzt useIntlayer durch useDictionaryDynamic.
     *
     * Hinweis: Der Live-Modus verwendet die Live Sync API, um Wörterbücher abzurufen. Wenn der API-Aufruf
     * fehlschlägt, werden die Wörterbücher dynamisch importiert.
     * Hinweis: Nur Wörterbücher mit Remote-Inhalten und dem "live"-Flag verwenden den Live-Modus.
     * Andere verwenden den dynamischen Modus zur Leistungssteigerung.
     */
    importMode: "live",
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
     * Aktiviert das Hot-Reloading der Lokalisierungskonfigurationen, wenn Änderungen erkannt werden.
     * Zum Beispiel, wenn ein Wörterbuch hinzugefügt oder aktualisiert wird, aktualisiert die Anwendung
     * den auf der Seite angezeigten Inhalt.
     *
     * Da Hot-Reloading eine kontinuierliche Verbindung zum Server erfordert, ist es
     * nur für Kunden des `enterprise`-Plans verfügbar.
     *
     * Standard: false
     */
    liveSync: true,

    /**
     * Der Port des Live Sync Servers.
     *
     * Standard: 4000
     */
    liveSyncPort: 4000,

    /**
     * Die URL des Live Sync Servers.
     *
     * Standard: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Steuert, wie Wörterbücher importiert werden:
     *
     * - "live": Wörterbücher werden dynamisch über die Live Sync API abgerufen.
     *   Ersetzt useIntlayer durch useDictionaryDynamic.
     *
     * Hinweis: Der Live-Modus verwendet die Live Sync API, um Wörterbücher abzurufen. Wenn der API-Aufruf
     * fehlschlägt, werden Wörterbücher dynamisch importiert.
     * Hinweis: Nur Wörterbücher mit entfernten Inhalten und "live"-Flags verwenden den Live-Modus.
     * Andere verwenden aus Leistungsgründen den dynamischen Modus.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Starten Sie den Live Sync Server, um Ihre Anwendung einzubinden:

Beispiel mit Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... andere Skripte
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Beispiel mit Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... andere Skripte
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Der Live Sync Server umschließt Ihre Anwendung und wendet automatisch aktualisierte Inhalte an, sobald diese eintreffen.

Um Änderungsbenachrichtigungen vom CMS zu erhalten, hält der Live-Sync-Server eine SSE-Verbindung zum Backend aufrecht. Wenn sich Inhalte im CMS ändern, leitet das Backend die Aktualisierung an den Live-Sync-Server weiter, der die neuen Wörterbücher schreibt. Ihre Anwendung spiegelt die Aktualisierung bei der nächsten Navigation oder beim Neuladen des Browsers wider – ein Neubau ist nicht erforderlich.

Flussdiagramm (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Live Sync Logik Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

So funktioniert es:

![Live Sync Ablauf CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### Entwicklungs-Workflow (lokal)

- In der Entwicklung werden alle entfernten Wörterbücher beim Start der Anwendung abgerufen, sodass Sie Updates schnell testen können.
- Um Live Sync lokal mit Next.js zu testen, umschließen Sie Ihren Dev-Server:

```json5 fileName="package.json"
{
  "scripts": {
    // ... andere Skripte
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Für Vite
  },
}
```

Aktivieren Sie die Optimierung, damit Intlayer während der Entwicklung die Live-Import-Transformationen anwendet:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

Diese Konfiguration umschließt Ihren Dev-Server mit dem Live Sync Server, lädt entfernte Wörterbücher beim Start und streamt Updates vom CMS über SSE. Aktualisieren Sie die Seite, um Änderungen zu sehen.

Hinweise und Einschränkungen:

- Fügen Sie die Live Sync-Quelle zu Ihrer Site-Sicherheitsrichtlinie (CSP) hinzu. Stellen Sie sicher, dass die Live Sync-URL in `connect-src` (und `frame-ancestors`, falls relevant) erlaubt ist.
- Live Sync funktioniert nicht mit statischem Output. Für Next.js muss die Seite dynamisch sein, um zur Laufzeit Updates zu erhalten (z. B. verwenden Sie `generateStaticParams`, `generateMetadata`, `getServerSideProps` oder `getStaticProps` entsprechend, um vollständige statische Einschränkungen zu vermeiden).

Diese Einrichtung bindet Ihren Entwicklungsserver mit dem Live-Sync-Server, lädt beim Start entfernte Wörterbücher und streamt Aktualisierungen vom CMS über SSE. Aktualisieren Sie die Seite, um Änderungen zu sehen.

Hinweise und Einschränkungen:

- Fügen Sie die Live-Sync-Quelle zu Ihrer Sicherheitsrichtlinie der Website (CSP) hinzu. Stellen Sie sicher, dass die Live-Sync-URL in `connect-src` (und `frame-ancestors`, falls relevant) erlaubt ist.
- Live Sync funktioniert nicht mit statischer Ausgabe. Für Next.js muss die Seite dynamisch sein, um zur Laufzeit Updates zu erhalten (z. B. verwenden Sie `generateStaticParams`, `generateMetadata`, `getServerSideProps` oder `getStaticProps` entsprechend, um vollständige statische Einschränkungen zu vermeiden).
- Im CMS hat jedes Wörterbuch ein `live`-Flag. Nur Wörterbücher mit `live=true` werden über die Live-Sync-API abgerufen; andere werden dynamisch importiert und bleiben zur Laufzeit unverändert.
- Das `live`-Flag wird für jedes Wörterbuch zur Build-Zeit ausgewertet. Wenn der entfernte Inhalt während des Builds nicht mit `live=true` gekennzeichnet war, müssen Sie neu bauen, um Live Sync für dieses Wörterbuch zu aktivieren.
- Der Live-Sync-Server muss in der Lage sein, in `.intlayer` zu schreiben. In Containern stellen Sie sicher, dass Schreibzugriff auf `/.intlayer` besteht.

## Debug

Wenn Sie Probleme mit dem CMS haben, überprüfen Sie Folgendes:

- Die Anwendung läuft.

- Die [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration)-Konfiguration ist in Ihrer Intlayer-Konfigurationsdatei korrekt gesetzt.
  - Erforderliche Felder:
- Die Anwendungs-URL sollte mit der in der Editor-Konfiguration (`applicationURL`) eingestellten URL übereinstimmen.
- Die CMS-URL

- Stellen Sie sicher, dass die Projektkonfiguration in das Intlayer CMS übertragen wurde.

- Der visuelle Editor verwendet ein iframe, um Ihre Website anzuzeigen. Stellen Sie sicher, dass die Content Security Policy (CSP) Ihrer Website die CMS-URL als `frame-ancestors` erlaubt (standardmäßig 'https://intlayer.org'). Überprüfen Sie die Editor-Konsole auf Fehler.
