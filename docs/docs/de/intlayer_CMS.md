---
createdAt: 2025-08-23
updatedAt: 2026-08-30
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

### Installation

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### So funktioniert es: Authenticator + Endpoints

Das SDK ist absichtlich in **zwei separate Imports** aufgeteilt, um Ihr Bundle klein zu halten:

1. `createIntlayerCMS` — erstellt einen leichten **Authenticator**. Er trägt nur die Anmeldedaten und das verwaltete Zugriffs-Token; er kennt keine spezifische Domain.
2. `dictionaryEndpoint`, `projectEndpoint`, … — pro-Domain **Endpoint-Binder**, jeder aus seinem eigenen Subpath importiert (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Sie übergeben den Authenticator an den Endpoint, den Sie benötigen.

Da jeder Endpoint separat importiert wird, enthält Ihr Bundle nur die Domains, die Sie tatsächlich verwenden — das Importieren von `dictionaryEndpoint` zieht niemals den Project-, AI- oder einen anderen Domain-Client mit sich.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// Die Konfiguration ist optional: Wenn sie weggelassen wird, werden die Anmeldedaten aus
// `@intlayer/config/built` gelesen, das die Umgebungsvariablen INTLAYER_CLIENT_ID und
// INTLAYER_CLIENT_SECRET auflöst.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> Die CMS-Anmeldedaten (`clientId` / `clientSecret`) gewähren **Schreibzugriff** auf Ihren Inhalt. Erstellen Sie den Authenticator nur auf der **Serverseite** (Server Actions, Route Handler, Scripts, CI). Importieren Sie ihn niemals in Client-seitige Code oder stellen Sie Ihre Anmeldedaten dem Browser zur Verfügung.

Wenn Sie sich nicht auf die Build-Zeit-Konfiguration verlassen möchten, übergeben Sie die Anmeldedaten explizit:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Optional, für selbst gehostete Backends:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Erhalten Sie Ihre Anmeldedaten, indem Sie einen neuen Zugriffsschlüssel im [Intlayer Dashboard - Projekte](https://app.intlayer.org/projects) erstellen.

### Ihr Projekt mit einer selbst gehosteten Instanz verbinden

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

### `@intlayer/api` SDK: auf ein selbst gehostetes Backend verweisen

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

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Erstelle ein neues Wörterbuch
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Upsert einer Reihe von Wörterbüchern (erstelle oder aktualisiere sie in einem Aufruf)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Aktualisiere ein bestehendes Wörterbuch
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

| Funktion                            | Umgebungsvariable(n)                            |
| ----------------------------------- | ----------------------------------------------- |
| KI-Übersetzung / Audit              | `OPENAI_API_KEY`                                |
| Abrechnung                          | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, … |
| GitHub OAuth                        | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`      |
| Google OAuth                        | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      |
| GitLab / Microsoft / LinkedIn OAuth | `GITLAB_*`, `MICROSOFT_*`, `LINKEDIN_*`         |
| Transaktionale E-Mail via Resend    | `RESEND_API_KEY` (Standard: Mailpit SMTP)       |

### Datenpersistenz und Upgrades

Auf dem Host verfügbare Ports:

| Port   | Dienst                                              |
| ------ | --------------------------------------------------- |
| `3000` | Dashboard                                           |
| `3100` | Backend-API                                         |
| `8025` | Mailpit E-Mail-Web-UI                               |
| `9000` | MinIO S3 API (erforderlich für Browser-Asset-Laden) |
| `9001` | MinIO-Konsole                                       |

## Live Sync

Live Sync ermöglicht es deiner App, CMS-Inhaltsänderungen zur Laufzeit zu reflektieren — kein Rebuild oder Redeploy erforderlich. Wenn aktiviert, werden Updates zu einem Live-Sync-Server gestreamt, der die Wörterbücher aktualisiert, die deine Anwendung liest.

Für die vollständige Setupanleitung (Konfiguration, Starten des Live-Sync-Servers, der lokalen Entwicklungs-Workflow und Einschränkungen) siehe die [Live-Sync-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/live-sync.md).

## Self-Hosting

Intlayer kann vollständig auf Ihrer eigenen Infrastruktur ausgeführt werden. Ein One-Liner bootstraps den vollständigen Stack (Dashboard, API, Datenbank, Objektspeicher und E-Mail) mit Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Eine umfassende Installationsanleitung, Umgebungsvariablenreferenz, Upgrade-Anweisungen und Sicherungs-/Wiederherstellungsverfahren finden Sie im [Self-Hosting-Handbuch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md).

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

## Häufig gestellte Fragen

<FAQ>

<Question title="Was ist der Unterschied zwischen dem Intlayer-CMS und dem visuellen Editor?">

Der [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) bearbeitet lokale Wörterbücher und schreibt die Änderung zurück in Ihre Codebasis, sodass die App neu gebaut wird und die Änderung durch Ihren normalen Review- und Deployment-Prozess läuft. Das CMS bearbeitet entfernte Wörterbücher: Die Änderung berührt Ihre Codebasis nicht und die laufende Website übernimmt sie ohne Deployment. Teams verwenden oft beides, den Editor für Inhalte, die Entwicklern gehören, und das CMS für Inhalte, die das Marketing wöchentlich ändert.

</Question>

<Question title="Wie viel trägt i18n zu meiner Bundle-Größe bei?">

Viel weniger als bei einem Namespace-basierten Setup, denn eine Seite lädt niemals einen Katalog herunter, den sie nicht rendert. Serverseitig gerendertes Markup löst seinen Inhalt auf dem Server auf, und der Build-Zeit-Compiler ersetzt `useIntlayer`-Aufrufe durch genau die Wörterbucheinträge, die eine Komponente verwendet, sodass ungenutzte Schlüssel und ungenutzte Sprachen entfernt werden. [Dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md) teilen den Rest pro Locale auf. Gemessen an den üblichen Alternativen reduziert Intlayer die Bundle- und Seitengröße um bis zu 50 %. Siehe [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und den [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/index.md).

</Question>

<Question title="Kann ich von `i18next`, `next-intl` oder `react-i18next` migrieren, ohne meine Komponenten neu zu schreiben?">

Ja, und es gibt zwei Wege. Sie können die Inhalte schrittweise migrieren mit dem [i18next-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_i18next_to_intlayer.md) oder dem [next-intl-Migrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md). Oder Sie behalten Ihre aktuelle API vollständig bei: Die [Kompatibilitätsadapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/index.md) stellen genau dieselbe API wie `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` und `Lingui` bereit, aber aus Intlayer-Wörterbüchern bedient, sodass sich Importe ändern und der Komponentencode nicht.

</Question>

<Question title="Kann ich meine vorhandenen JSON-Übersetzungsdateien behalten?">

Ja. Das [sync-JSON-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md) behält Ihre `/messages/{locale}/{namespace}.json`-Dateien als Single Source of Truth und generiert daraus Intlayer-Wörterbücher, in beide Richtungen. Ein [sync-PO-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-po.md) macht dasselbe für gettext-Kataloge, und [Dateien pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md) lassen Sie Inhalte nach Sprache aufteilen, statt Locales in einer Datei zu gruppieren.

</Question>

<Question title="Muss ich meine Inhalte Schlüssel für Schlüssel umziehen?">

Nein. Führen Sie `npx intlayer extract` aus; Intlayer liest Ihre Quelldateien, zieht die für den Nutzer sichtbaren Strings heraus und schreibt neben jede eine `.content`-Datei, sodass Sie ein Diff prüfen, statt Strings einzeln in einen Katalog zu kopieren. Siehe den [extract-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md).

Für eine vollständig automatisierte Pipeline macht der [Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) dasselbe zur Build-Zeit auf JSX-, TSX-, Vue- und Svelte-Quellcode und generiert die Wörterbücher bei jeder Änderung, sodass es keine von Hand zu pflegenden Schlüssel gibt. Er arbeitet mit statischer Analyse, sodass Strings, die nur zur Laufzeit existieren, unerreichbar bleiben, und er braucht einige Annotationen, um für den Nutzer sichtbaren Text von Anwendungslogik zu unterscheiden.

</Question>

<Question title="Welches Editor- und KI-Agenten-Tooling ist verfügbar?">

Fünf Bausteine, alle optional:

- **[VS-Code-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)**: von einem `useIntlayer`-Schlüssel zur Inhaltsdatei springen, die ihn deklariert, Inhalte aus einer Komponente extrahieren und build, fill, test, push und pull über die Befehlspalette oder einen eigenen Intlayer-Tab ausführen.
- **[LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)**: dieselbe Wahrnehmung in jedem Editor, der LSP spricht, mit „Gehe zu Definition“, „Alle Referenzen suchen“, Hover-Vorschauen eines übersetzten Werts, Autovervollständigung von Schlüsseln und Feldern sowie einer Warnung, wenn ein Schlüssel nirgends deklariert ist. Es löst außerdem `i18next`-, `react-i18next`-, `next-intl`- und `use-intl`-Aufrufe auf, was bei der Migration hilft.
- **[MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)**: stellt die Intlayer-Dokumentation und -CLI für Cursor, VS Code, Claude Desktop, Claude Code und ChatGPT bereit, sodass ein Assistent aus der aktuellen Doku antwortet statt zu raten und Befehle wie `intlayer fill` selbst ausführen kann.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md)**: fokussierte Skills wie `intlayer-config`, `intlayer-cli` und `intlayer-content` sowie eines pro Framework, die einem Agenten Ihr Routing-Setup und die Inhaltsknoten-Typen beibringen.
- **[ESLint-Plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/eslint.md)**: `no-raw-text` markiert fest kodierte Strings, mit weiteren Regeln für statische Wörterbuchschlüssel und ungenutzte Inhalte.

</Question>

<Question title="Welche Inhalte sollten in das CMS verschoben werden?">

Inhalte, die sich oft ändern und nicht zu einem Release gehören: Landingpage-Texte, Preisformulierungen, Ankündigungen, alles, was einem Marketing-Team gehört. Inhalte, die Teil der Oberfläche sind, etwa Button-Beschriftungen und Formularfehler, bleiben besser lokale Wörterbücher, wo sie mit dem Code geprüft werden, der sie verwendet.

</Question>

<Question title="Was passiert, wenn das CMS nicht erreichbar ist?">

Die Anwendung fällt auf die lokale Deklaration des Wörterbuchs zurück, sodass ein Netzwerkfehler oder ein Ausfall auf den mit Ihrem Build ausgelieferten Inhalt herabstuft statt auf eine leere Seite. Deshalb ist es wichtig, für jedes entfernte Wörterbuch eine lokale Deklaration zu behalten.

</Question>

<Question title="Kann ich das CMS selbst hosten?">

Ja. Das CMS kann auf Ihrer eigenen Infrastruktur laufen, was die übliche Antwort ist, wenn Inhalte Ihr Netzwerk nicht verlassen dürfen. Siehe [Intlayer selbst hosten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md).

</Question>

<Question title="Brauchen Inhaltsredakteure einen Entwickler, um eine Änderung zu veröffentlichen?">

Nein. Genau das ist der Sinn entfernter Wörterbücher: Ein Redakteur ändert den Text im CMS und die Website spiegelt ihn wider, wobei der [Live-Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live.md) die Aktualisierung zur Laufzeit anwendet, statt auf einen Build zu warten.

</Question>

<Question title="Kann ich das CMS automatisieren, statt die Oberfläche zu verwenden?">

Ja. Das `@intlayer/api`-SDK stellt dieselben Endpunkte wie die Oberfläche bereit, sodass Sie Projekte abrufen, Wörterbücher lesen und Aktualisierungen aus einem Skript oder einer Pipeline pushen können. Der Abschnitt oben zeigt den Authenticator und die Endpunkte.

</Question>

<Question title="Unterstützt das CMS A/B-Tests von Übersetzungen?">

Ja. Entfernte Wörterbücher unterstützen [Inhaltsvarianten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/variants.md), und die [Analytik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/analytics.md) berichtet, wie jede Variante ausgespielt wird, sodass eine Formulierungsänderung gemessen statt diskutiert werden kann.

</Question>

<Question title="Ist das CMS kostenlos?">

Die Intlayer-Bibliothek, die CLI, der Compiler und der visuelle Editor sind kostenlos und Open Source unter der Apache-2.0-Lizenz. Das gehostete CMS ist ein optionaler kostenpflichtiger Dienst und kann stattdessen [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden.

</Question>

</FAQ>
