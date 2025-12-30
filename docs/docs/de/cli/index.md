---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Entdecken Sie, wie Sie die Intlayer CLI verwenden, um Ihre mehrsprachige Website zu verwalten. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - CLI
  - Kommandozeilenschnittstelle
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: Transform-Befehl hinzugefügt
  - version: 7.1.0
    date: 2025-11-05
    changes: Option skipIfExists zum translate-Befehl hinzugefügt
  - version: 6.1.4
    date: 2025-01-27
    changes: Aliase für CLI-Argumente und Befehle hinzugefügt
  - version: 6.1.3
    date: 2025-10-05
    changes: Build-Option zu Befehlen hinzugefügt
  - version: 6.1.2
    date: 2025-09-26
    changes: Versionsbefehl hinzugefügt
  - version: 6.1.0
    date: 2025-09-26
    changes: Setze verbose-Option standardmäßig auf true über CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Watch-Befehl und with-Option hinzugefügt
  - version: 6.0.1
    date: 2025-09-23
    changes: Editor-Befehl hinzugefügt
  - version: 6.0.0
    date: 2025-09-17
    changes: Content-Test- und Listen-Befehl hinzugefügt
  - version: 5.5.11
    date: 2025-07-11
    changes: Dokumentation der CLI-Befehlsparameter aktualisiert
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Intlayer CLI

---

## Inhaltsverzeichnis

<TOC/>

---

## Paket installieren

Installieren Sie die notwendigen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Wenn das `intlayer`-Paket bereits installiert ist, wird die CLI automatisch installiert. Sie können diesen Schritt überspringen.

## intlayer-cli Paket

Das `intlayer-cli` Paket dient dazu, Ihre [Intlayer-Deklarationen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md) in Wörterbücher zu transpilen.

Dieses Paket transpiliert alle Intlayer-Dateien, wie z.B. `src/**/*.content.{ts|js|mjs|cjs|json}`. [Siehe, wie man Intlayer-Deklarationsdateien erstellt](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Um Intlayer-Wörterbücher zu interpretieren, können Sie Interpreter verwenden, wie z.B. [react-intlayer](https://www.npmjs.com/package/react-intlayer) oder [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Unterstützung von Konfigurationsdateien

Intlayer akzeptiert mehrere Formate für Konfigurationsdateien:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Um zu sehen, wie verfügbare Sprachen oder andere Parameter konfiguriert werden, lesen Sie die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Intlayer-Befehle ausführen

### Authentifizierung

- **[Anmelden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/login.md)** - Bei Intlayer CMS authentifizieren und Zugangsdaten erhalten

### Kernbefehle

- **[Dictionaries erstellen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/build.md)** – Erstellen Sie Ihre Wörterbücher aus Inhaltsdeklarationsdateien
- **[Dictionaries überwachen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/watch.md)** – Überwachen Sie Änderungen und erstellen Sie Wörterbücher automatisch
- **[CLI-Version prüfen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/version.md)** – Prüfen Sie die installierte Intlayer CLI-Version

### Wörterbuchverwaltung

- **[Dictionaries pushen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/push.md)** – Pushen Sie Wörterbücher zum Intlayer-Editor und CMS
- **[Dictionaries abrufen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/pull.md)** – Holen Sie Wörterbücher aus dem Intlayer-Editor und CMS
- **[Dictionaries füllen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md)** – Füllen, prüfen und übersetzen Sie Wörterbücher mithilfe von KI
- **[Fehlende Übersetzungen testen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/test.md)** – Testen und identifizieren Sie fehlende Übersetzungen
- **[Inhaltsdeklarationsdateien auflisten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/list.md)** – Listen Sie alle Inhaltsdeklarationsdateien in Ihrem Projekt auf

### Komponentenverwaltung

- **[Komponenten transformieren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/transform.md)** – Bestehende Komponenten transformieren, um Intlayer zu verwenden

### Konfiguration

- **[Konfiguration verwalten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/configuration.md)** – Ihre Intlayer-Konfiguration abrufen und ins CMS übertragen

### Dokumentationsverwaltung

- **[Dokument übersetzen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-translate.md)** – Dokumentationsdateien automatisch mit KI übersetzen
- **[Dokument überprüfen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-review.md)** – Dokumentationsdateien auf Qualität und Konsistenz prüfen

### Editor & Live Sync

- **[Editor-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/editor.md)** – Verwenden Sie die Intlayer-Editor-Befehle
- **[Live-Sync-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live.md)** – Verwenden Sie Live Sync, um CMS-Inhaltsänderungen zur Laufzeit widerzuspiegeln

### Entwicklungstools

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/sdk.md)** – Verwenden Sie das Intlayer CLI SDK in Ihrem eigenen Code
- **[Intlayer Debug-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/debug.md)** – Debuggen und beheben Sie Probleme mit dem Intlayer CLI

## Verwenden Sie Intlayer-Befehle in Ihrer `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Hinweis**: Sie können auch die kürzeren Aliase verwenden:
>
> - `npx intlayer list` anstelle von `npx intlayer content list`
> - `npx intlayer test` anstelle von `npx intlayer content test`
