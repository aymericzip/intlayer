---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Live-Synchronisation | CMS-Inhaltsänderungen zur Laufzeit übernehmen
description: Lassen Sie Ihre Anwendung CMS-Inhaltsänderungen zur Laufzeit widerspiegeln — ohne Neuerstellung oder erneutes Deployment.
keywords:
  - Live-Synchronisation
  - Live Sync
  - CMS
  - Visueller Editor
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Aus der Intlayer-CMS-Dokumentation in eine eigene Seite verschoben"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Live-Sync-Dokumentation hinzugefügt"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Ersetzte das Feld `hotReload` durch `liveSync`"
author: aymericzip
---

# Live-Synchronisation

Live Sync ermöglicht es Ihrer App, CMS-Inhaltsänderungen zur Laufzeit widerzuspiegeln. Kein Neuaufbau oder erneutes Bereitstellen erforderlich. Wenn aktiviert, werden Updates an einen Live-Sync-Server gestreamt, der die Wörterbücher aktualisiert, die Ihre Anwendung liest.

## Inhaltsverzeichnis

<TOC/>

---

> Live Sync erfordert eine kontinuierliche Serververbindung und ist im Enterprise-Plan verfügbar.

Aktivieren Sie Live Sync, indem Sie Ihre Intlayer-Konfiguration aktualisieren:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
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
    importMode: "fetch",
  },
};

export default config;
```

Starten Sie den Live Sync Server, um Ihre Anwendung einzubinden:

Beispiel mit Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... andere Skripte
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Der Live Sync Server umschließt Ihre Anwendung und wendet automatisch aktualisierte Inhalte an, sobald diese eintreffen.

Um Änderungsbenachrichtigungen vom CMS zu erhalten, hält der Live-Sync-Server eine SSE-Verbindung zum Backend aufrecht. Wenn sich Inhalte im CMS ändern, leitet das Backend die Aktualisierung an den Live-Sync-Server weiter, der die neuen Wörterbücher schreibt. Ihre Anwendung spiegelt die Aktualisierung bei der nächsten Navigation oder beim Neuladen des Browsers wider – ein Neubau ist nicht erforderlich.

Flussdiagramm (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Live Sync Logik Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

So funktioniert es:

![Live Sync Ablauf CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## Entwicklungs-Workflow (lokal)

- In der Entwicklung werden alle entfernten Wörterbücher beim Start der Anwendung abgerufen, sodass Sie Updates schnell testen können.
- Um Live Sync lokal mit Next.js zu testen, umschließen Sie Ihren Dev-Server:

```json5 fileName="package.json"
{
  "scripts": {
    // ... andere Skripte
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Für Vite
  },
}
```

Aktivieren Sie die Optimierung, damit Intlayer während der Entwicklung die Live-Import-Transformationen anwendet:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
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

## Nützliche Links

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)
- [Intlayer Visueller Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)
- [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Self-Hosting-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md)
