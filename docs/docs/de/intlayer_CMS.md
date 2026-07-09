---
createdAt: 2025-08-23
updatedAt: 2026-07-08
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
  - version: 9.0.0
    date: 2026-07-08
    changes: "Abschnitt „Live-Synchronisation“ auf eine eigene Seite (live-sync.md) verschoben; hier nur eine kurze Einführung mit Link belassen"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Self-Hosting-Abschnitt hinzugefügt: Docker Compose Bootstrap, Service-Inventar, SDK-Konfiguration, optionale Funktionen und Upgrade-Hinweise"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Live-Sync-Dokumentation hinzugefügt"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Ersetzte das Feld `hotReload` durch `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historie initialisiert"
author: aymericzip
---

# Intlayer Content Management System (CMS) Dokumentation

<iframe title="Visueller Editor + CMS für Ihre Webanwendung: Intlayer erklärt" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Das Intlayer CMS ist eine Anwendung, die es Ihnen ermöglicht, die Inhalte eines Intlayer-Projekts auszulagern.

Dafür führt Intlayer das Konzept der „fernen Wörterbücher“ ein.

![Intlayer CMS Oberfläche](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Inhaltsverzeichnis

<TOC/>

---

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

Führen Sie den folgenden Befehl aus, um sich beim Intlayer CMS anzumelden:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Dies öffnet Ihren Standardbrowser, um den Authentifizierungsprozess abzuschließen und die erforderlichen Anmeldedaten (Client ID und Client Secret) zu erhalten, um Intlayer-Dienste zu verwenden.

In Ihrer Intlayer-Konfigurationsdatei können Sie die CMS-Einstellungen anpassen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
     * Sie können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://app.intlayer.org/projects) erhalten werden.
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

> Wenn Sie keine Client-ID und kein Client-Secret haben, können Sie diese durch das Erstellen eines neuen Clients im [Intlayer Dashboard - Projekte](https://app.intlayer.org/projects) erhalten.

> Um alle verfügbaren Parameter zu sehen, konsultieren Sie die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Verwendung des CMS

### Konfiguraton hochladen

Um das Intlayer CMS zu konfigurieren, können Sie die [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/docs/de/cli/index.md) Befehle verwenden.

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Wenn Sie Umgebungsvariablen in Ihrer `intlayer.config.ts` Konfigurationsdatei verwenden, können Sie die gewünschte Umgebung mit dem Argument `--env` angeben:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Dieser Befehl lädt Ihre Konfiguration in das Intlayer CMS hoch.

### Ein Wörterbuch hochladen

Um Ihre Lokalisierungswörterbücher in ein entferntes Wörterbuch zu transformieren, können Sie die [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/docs/de/cli/index.md) Befehle verwenden.

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Wenn Sie Umgebungsvariablen in Ihrer `intlayer.config.ts` Konfigurationsdatei verwenden, können Sie die gewünschte Umgebung mit dem Argument `--env` angeben:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Dieser Befehl lädt Ihre anfänglichen Inhaltswörterbücher hoch und macht sie für asynchrones Abrufen und Bearbeiten über die Intlayer-Plattform verfügbar.

### Wörterbuch bearbeiten

Anschließend können Sie Ihr Wörterbuch im [Intlayer CMS](https://app.intlayer.org/content) anzeigen und verwalten.

## Live-Synchronisation

Live Sync ermöglicht es Ihrer App, CMS-Inhaltsänderungen zur Laufzeit widerzuspiegeln. Kein Neuaufbau oder erneutes Bereitstellen erforderlich. Wenn aktiviert, werden Updates an einen Live-Sync-Server gestreamt, der die Wörterbücher aktualisiert, die Ihre Anwendung liest.

Die vollständige Anleitung (Aktivierung, Start des Live-Sync-Servers, lokaler Entwicklungsworkflow und Einschränkungen) finden Sie in der [Live-Sync-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/live-sync.md).

## Self-Hosting

Intlayer kann vollständig auf Ihrer eigenen Infrastruktur betrieben werden – kein Intlayer Cloud-Konto erforderlich. Ein einziger Befehl bootstrappt den gesamten Stack (Dashboard, API, Datenbank, Objektspeicher und E-Mail) mit Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Dies lädt eine `docker-compose.yml` und eine `.env` herunter, generiert automatisch die erforderlichen Secrets (`BETTER_AUTH_SECRET`, MinIO-Anmeldedaten) und startet alle Container mit `docker compose up -d`. Ein erneutes Ausführen desselben Befehls auf einer bestehenden Installation führt ein Rolling Upgrade ohne Datenverlust durch.

### Gestartete Dienste

| Dienst              | Port(s)                        | Zweck                                       |
| ------------------- | ------------------------------ | ------------------------------------------- |
| **app** (Dashboard) | `3000`                         | TanStack Start CMS-Oberfläche               |
| **backend** (API)   | `3100`                         | Fastify REST API                            |
| **MongoDB 7**       | intern                         | Primäre Datenbank (single-node replica set) |
| **Redis 7**         | intern                         | Job-Warteschlangen und Caching              |
| **MinIO**           | `9000` (S3), `9001` (Konsole)  | S3-kompatibler Objektspeicher               |
| **Mailpit**         | `1025` (SMTP), `8025` (Web-UI) | Lokale transaktionale E-Mail-Senke          |

Chromium (für die Puppeteer-Screenshot-Generierung) ist im Backend-Image gebündelt – kein separater Container erforderlich.

### Ihr Projekt mit einer selbst gehosteten Instanz verbinden

Richten Sie Ihre Intlayer-Konfiguration auf Ihr eigenes Backend und Dashboard statt auf `intlayer.org` aus:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL des selbst gehosteten CMS-Dashboards.
     * Standard: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // z.B. http://localhost:3000

    /**
     * URL der selbst gehosteten Backend-API.
     * Standard: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // z.B. http://localhost:3100
  },
};

export default config;
```

Setzen Sie die passenden Umgebungsvariablen in Ihrem Projekt:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Erstellen Sie Zugangsdaten in Ihrem selbst gehosteten Dashboard unter `http://localhost:3000/projects`.

### `@intlayer/api` SDK: auf ein selbst gehostetes Backend verweisen

Bei programmatischer Verwendung des SDK übergeben Sie `backendURL` explizit an `createIntlayerCMS`:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

### Optionale Funktionen

Diese Funktionen erfordern externe Konten und funktionieren weiterhin ohne ihre Schlüssel in der selbst gehosteten `.env`:

| Funktion                            | Umgebungsvariable(n)                            |
| ----------------------------------- | ----------------------------------------------- |
| KI-Übersetzung / Audit              | `OPENAI_API_KEY`                                |
| Abrechnung                          | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, … |
| GitHub OAuth                        | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`      |
| Google OAuth                        | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      |
| GitLab / Microsoft / LinkedIn OAuth | `GITLAB_*`, `MICROSOFT_*`, `LINKEDIN_*`         |
| Transaktionale E-Mail via Resend    | `RESEND_API_KEY` (Standard: Mailpit SMTP)       |

### Datenpersistenz und Upgrades

Drei Docker-Volumes halten alle dauerhaften Daten: `mongo-data`, `redis-data` und `minio-data`. Sie überleben Container-Neustarts und Upgrades. Ein erneutes Ausführen des Installers lädt die neuesten Images herunter und führt ein Rolling `docker compose up -d` durch.

Auf dem Host verfügbare Ports:

| Port   | Dienst                                              |
| ------ | --------------------------------------------------- |
| `3000` | Dashboard                                           |
| `3100` | Backend-API                                         |
| `8025` | Mailpit E-Mail-Web-UI                               |
| `9000` | MinIO S3 API (erforderlich für Browser-Asset-Laden) |
| `9001` | MinIO-Konsole                                       |

Eine vollständige Referenz aller verfügbaren Umgebungsvariablen und erweiterten Optionen (Reverse Proxy, benutzerdefinierte Domains, Sicherung/Wiederherstellung) finden Sie im [Self-Hosting-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md).

---

## Debug

Wenn Sie Probleme mit dem CMS haben, überprüfen Sie Folgendes:

- Die Anwendung läuft.

- Die [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration)-Konfiguration ist in Ihrer Intlayer-Konfigurationsdatei korrekt gesetzt.
  - Erforderliche Felder:
- Die Anwendungs-URL sollte mit der in der Editor-Konfiguration (`applicationURL`) eingestellten URL übereinstimmen.
- Die CMS-URL

- Stellen Sie sicher, dass die Projektkonfiguration in das Intlayer CMS übertragen wurde.

- Der visuelle Editor verwendet ein iframe, um Ihre Website anzuzeigen. Stellen Sie sicher, dass die Content Security Policy (CSP) Ihrer Website die CMS-URL als `frame-ancestors` erlaubt (standardmäßig 'https://intlayer.org'). Überprüfen Sie die Editor-Konsole auf Fehler.
