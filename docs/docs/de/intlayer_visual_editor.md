---
createdAt: 2024-08-11
updatedAt: 2026-08-30
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
    changes: "Historie initialisiert"
author: aymericzip
---

# Intlayer Visual Editor Dokumentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

Mit dem `--with` Flag können Sie den Editor parallel mit einem anderen Befehl starten:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Konfiguration

In Ihrer Intlayer-Konfigurationsdatei können Sie die Editor-Einstellungen anpassen:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> **Beachten Sie, dass der Befehl vom `intlayer` Paket erneut exportiert wird. Sie können stattdessen `npx intlayer editor start` verwenden.**

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

## Häufig gestellte Fragen

<FAQ>

<Question title="Was ist der Unterschied zwischen dem visuellen Editor und dem CMS?">

Der visuelle Editor bearbeitet lokale Wörterbücher und schreibt die Änderung zurück in Ihre Codebasis, sodass sie durch Ihren üblichen Review- und Deployment-Prozess läuft. Das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) bearbeitet entfernte Wörterbücher, die sich auf der laufenden Website ohne Deployment ändern. Der Editor passt zu Inhalten, die Entwicklern gehören; das CMS passt zu Inhalten, die einem Marketing-Team gehören.

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

<Question title="Wo läuft der visuelle Editor?">

Auf Ihrer eigenen Infrastruktur. Er lädt Ihre Anwendung in einem iframe und kommuniziert mit einem lokalen Editor-Server, sodass Ihr Inhalt Ihre Umgebung nie verlässt. Das macht ihn für Projekte nutzbar, die keine Texte an einen gehosteten Dienst senden dürfen.

</Question>

<Question title="Müssen Redakteure programmieren können?">

Nein. Sie öffnen die Website, klicken auf ein Textstück und bearbeiten es direkt. Der Editor löst auf, welcher Wörterbucheintrag diesen Text stützt, und schreibt die Änderung in die richtige Inhaltsdatei, sodass ein Übersetzer die Datei nicht finden oder den Schlüssel kennen muss.

</Question>

<Question title="Ändert das Bearbeiten über den visuellen Editor meine Quelldateien?">

Ja, das ist die Absicht. Die Änderung landet in der Inhaltsdeklarationsdatei in Ihrer Codebasis, sodass sie als normales Diff erscheint, das Sie prüfen und committen können, und die Anwendung baut neu, um sie anzuzeigen.

</Question>

<Question title="Der Editor zeigt eine leere Seite an oder weigert sich, meine Website zu laden. Was sollte ich prüfen?">

Der Editor zeigt Ihre Anwendung in einem iframe an, sodass Ihre Content Security Policy den Editor-Origin als `frame-ancestors` zulassen muss, was standardmäßig `http://localhost:8000` ist. Prüfen Sie außerdem, dass die `applicationURL` in Ihrer Editor-Konfiguration mit der URL übereinstimmt, unter der Ihre App tatsächlich ausgeliefert wird. Die Editor-Konsole meldet beide Fehler.

</Question>

<Question title="Kann ich den visuellen Editor in der Produktion verwenden?">

Er ist für Entwicklung und Staging ausgelegt, wo ein Neubau nach einer Bearbeitung akzeptabel ist. Um Inhalte auf einer Live-Website ohne Deployment zu bearbeiten, verwenden Sie stattdessen das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) und seine entfernten Wörterbücher.

</Question>

<Question title="Ist der visuelle Editor kostenlos?">

Ja. Der visuelle Editor ist Teil des Open-Source-Projekts, unter der Apache-2.0-Lizenz, kommerzielle Nutzung eingeschlossen. Nur das gehostete [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) ist ein kostenpflichtiger Dienst, und es kann auch [selbst gehostet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) werden.

</Question>

</FAQ>
