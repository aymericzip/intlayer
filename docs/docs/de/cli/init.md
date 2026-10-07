---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: Intlayer im Projekt einrichten"
description: "Führen Sie intlayer init aus, um Intlayer zu einem bestehenden Projekt hinzuzufügen: Framework erkennen, Pakete installieren, Konfiguration schreiben."
keywords:
  - Initialisieren
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init installiert nur die Pakete und richtet das Framework ein; ein Unterbefehl pro Einrichtungsschritt; --interactive schlägt ohne Terminal fehl"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Unterbefehl init infra hinzufügen"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init-Befehl hinzugefügt"
author: aymericzip
---

# Intlayer initialisieren

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Der Befehl `init` installiert die Intlayer-Pakete und richtet Ihr Framework ein (Konfigurationsdatei, TypeScript, Bundler-Plugin, Middleware/Proxy, Provider). Das ist der empfohlene Einstieg in Intlayer.

Alles andere (CI-Workflows, KI-Skills, MCP-Server, Editor-Tools, Lint-Regeln, CMS, Infrastruktur) ist optional: Wählen Sie es in der `--interactive`-Checkliste aus oder führen Sie den jeweiligen Unterbefehl aus (siehe unten).

## Aliase:

- `npx intlayer init`

## Argumente:

- `--project-root [projectRoot]` - Optional. Geben Sie das Projektstammverzeichnis an. Wenn nicht angegeben, sucht der Befehl das Projektstammverzeichnis ausgehend vom aktuellen Arbeitsverzeichnis.
- `--no-gitignore` - Optional. Überspringt die automatische Aktualisierung der `.gitignore`-Datei. Wenn dieses Flag gesetzt ist, wird `.intlayer` nicht zu `.gitignore` hinzugefügt.
- `--no-framework-setup` - Optional. Installiert nur die Pakete, ohne die Projektdateien zu verändern.
- `--routing <routing>` - Optional. Locale-Routing: `prefix-no-default` (Standard), `prefix-all`, `no-prefix`, `search-params` oder `none`.
- `--content <layout>` - Optional. Wie Inhalte deklariert werden:
  - `multilingual` - `{fileName}.content.{ts,json}` neben der Komponente, alle Locales in einer Datei (setzt `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` neben der Komponente (setzt `compiler.output` und `dictionary.locale`).
  - `centralized` - ein `/locales/{locale}.{json,po}`-Katalog pro Locale (fügt das `syncJSON` / `syncPO`-Plugin hinzu).
  - `namespaces` - `/locales/{locale}/{namespace}.{json,po}`-Kataloge (fügt das `syncJSON` / `syncPO`-Plugin hinzu).
- `--content-format <format>` - Optional, mit `--content`. `ts` oder `json` für `multilingual` / `per-locale`, `json` oder `po` für `centralized` / `namespaces`. Standardmäßig das erste.
- `-i, --interactive` - Optional. Wählen Sie die Einrichtungsschritte aus einer Checkliste (Pakete, CI, Skills, MCP, VS Code, LSP, Lint, CMS, Infrastruktur, …) statt der Standardauswahl. Benötigt ein Terminal: Ohne Terminal (KI-Agent, CI) schlägt der Befehl fehl und listet stattdessen die auszuführenden Unterbefehle auf.
- `--no-github-actions` - Optional. Mit `--interactive` werden die GitHub-Actions-Workflows nie erstellt, auch wenn sie ausgewählt sind.

## Was es macht:

Der `init`-Befehl führt die folgenden Einrichtungsschritte aus:

1. **Validiert Projektstruktur** - Stellt sicher, dass Sie sich in einem gültigen Projektverzeichnis mit einer `package.json`-Datei befinden
2. **Installiert die Pakete** - Installiert die für Ihren Stack fehlenden Intlayer-Pakete (z. B. `react-intlayer`, `vite-intlayer`) und aktualisiert veraltete
3. **Aktualisiert `.gitignore`** - Fügt `.intlayer` zu Ihrer `.gitignore`-Datei hinzu, um generierte Dateien von der Versionskontrolle auszuschließen
4. **Konfiguriert TypeScript** - Aktualisiert alle `tsconfig.json`-Dateien, um Intlayer-Typdefinitionen einzuschließen (`.intlayer/**/*.ts`)
5. **Erstellt Konfigurationsdatei** - Generiert eine `intlayer.config.ts` (für TypeScript-Projekte) oder `intlayer.config.mjs` (für JavaScript-Projekte) mit Standardeinstellungen
6. **Aktualisiert die Bundler- / Framework-Konfiguration** - Fügt das Intlayer-Plugin zu Ihrer Vite-, Next.js-, Nuxt-, Astro-, …-Konfiguration hinzu und erstellt Middleware/Proxy und Provider, wenn das Framework es unterstützt

## Einen Schritt nach dem anderen einrichten

Jeder Schritt der `--interactive`-Checkliste hat einen eigenen Unterbefehl. Sie stellen keine Fragen, wenn ihre Werte als Flags übergeben werden, und lassen sich daher sicher aus einem KI-Agenten oder einem CI-Job ausführen.

| Befehl                                                                | Was er einrichtet                                                                            |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Installiert fehlende Intlayer-Pakete und aktualisiert veraltete                              |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Konfigurationsdatei, TypeScript, Bundler-Plugin, Middleware/Proxy, Provider und `.gitignore` |
| `intlayer init github-actions`                                        | Die GitHub-Actions-Workflows `fill` und `test`                                               |
| `intlayer init vscode-extension`                                      | Empfiehlt die Intlayer-Erweiterung in `.vscode/extensions.json`                              |
| `intlayer init lsp`                                                   | Den Intlayer-Language-Server in `.vscode/settings.json`                                      |
| `intlayer init eslint`                                                | Die Intlayer-Lint-Regeln (ESLint / oxlint), wenn das Projekt bereits lintet                  |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | Die Intlayer-Dokumentation als Skills für KI-Agenten                                         |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Den Intlayer-MCP-Server                                                                      |
| `intlayer init extension [--browser <chrome/firefox>]`                | Öffnet die Store-Seite der Intlayer-Browsererweiterung                                       |
| `intlayer init cms`                                                   | Meldet Sie über Ihren Browser beim Intlayer-CMS an und speichert die Zugangsdaten in `.env`  |
| `intlayer init infra --mode <desktop/docker/compose>`                 | Die Desktop-App oder einen selbst gehosteten Stack                                           |

### Aus einem KI-Agenten oder einem CI-Job

Die Shell eines KI-Agenten hat kein Terminal, daher kann keine Frage beantwortet werden. Verwenden Sie den Standardbefehl und danach die Unterbefehle, die Sie brauchen:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Ohne Terminal:

- `init skills` installiert die zu Ihrem Stack passenden Skills, sofern `--skills` nicht gesetzt ist (z. B. `--skills Usage Content React`).
- `init skills` und `init mcp` verwenden die erkannte KI-Plattform (Claude Code, Cursor, VS Code, Windsurf, …), sofern `--platform` nicht gesetzt ist, und schlagen mit der Liste der Plattformen fehl, wenn keine erkannt wird.
- `init mcp` verwendet den Transport `stdio`, sofern `--transport` nicht gesetzt ist.
- `init infra` erfordert `--mode`, und `init extension` gibt nur die Store-Links aus, sofern `--browser` nicht gesetzt ist.

Der MCP-Server wird immer innerhalb des Projekts konfiguriert (für Claude Code in `.mcp.json`).

## Beispiele:

### Grundlegende Initialisierung:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Dies initialisiert Intlayer im aktuellen Verzeichnis und erkennt automatisch das Projekt-Root.

### Initialisierung mit benutzerdefiniertem Projekt-Root:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

Dies initialisiert Intlayer im angegebenen Verzeichnis.

### Initialisierung ohne .gitignore zu aktualisieren:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Dies richtet alle Konfigurationsdateien ein, ohne Ihre `.gitignore` zu ändern.

### Infrastruktur einrichten (Desktop-App oder Self-Hosting):

```bash
npx intlayer init infra
```

Lädt das gehostete Installationsprogramm (`https://intlayer.org/install.sh` bzw. `install.ps1` unter Windows) herunter und führt es aus, welches fragt, wie Sie Intlayer ausführen möchten:

- **Desktop-App** - installiert das native Dashboard auf Ihrem Computer, verbunden mit der Intlayer Cloud.
- **All-in-One Docker** - Dashboard + API + MongoDB + Redis + MinIO in einem einzigen Container.
- **Docker Compose** - ein Container pro Dienst für skalierbares Self-Hosting.

Überspringen Sie das Menü mit `--mode`:

```bash
npx intlayer init infra --mode compose
```

Derselbe Schritt wird auch von `npx intlayer init --interactive` angeboten. Siehe die [`init infra`-Referenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/infra.md) für die Einstellungen des Installationsprogramms und den [Self-Hosting-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) für die Details zu jedem Modus.

- [`init infra`-Referenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/infra.md)
- [Self-Hosting-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md)

## Beispielausgabe:

```bash
npx intlayer init
Prüfe Intlayer-Konfiguration...
✓ .intlayer zur .gitignore hinzugefügt
✓ tsconfig.json aktualisiert, um intlayer-Typen einzuschließen
Erstellt intlayer.config.ts
✓ Import in vite.config.ts eingefügt
✓ Intlayer-Init abgeschlossen.
```

## Hinweise:

- Der Befehl ist idempotent. Sie können ihn mehrfach gefahrlos ausführen. Er überspringt Schritte, die bereits konfiguriert sind.
- Wenn bereits eine Konfigurationsdatei existiert, wird sie nicht überschrieben.
- TypeScript-Konfigurationsdateien ohne ein `include`-Array (z. B. solution-style-Konfigurationen mit references) werden übersprungen.
- Der Befehl bricht mit einem Fehler ab, wenn im Projektstamm kein `package.json` gefunden wird.
