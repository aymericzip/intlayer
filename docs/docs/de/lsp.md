---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Intlayer LSP-Server
description: Erfahren Sie, wie der Intlayer Language Server Go-to-Definition, Referenzsuche, Hover-Vorschauen, Schlüssel-Autovervollständigung und Diagnosen in Ihre IDE und Ihren KI-Agenten bringt.
keywords:
  - LSP
  - Language Server
  - Go to Definition
  - Autovervollständigung
  - Diagnosen
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "Referenzsuche, Hover, Autovervollständigung und Diagnosen hinzugefügt"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Intlayer LSP-Server

Der **Intlayer Language Server** ist eine Implementierung des [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/), die Ihre IDE — und Ihren KI-Agenten — Intlayer-fähig macht. Er verbindet einen Aufruf wie `useIntlayer("home")` mit der `.content.ts`-Datei, die ihn deklariert, und zwar in beide Richtungen.

---

## Funktionen

| Funktion                   | Tastenkürzel           | Beschreibung                                                                                                               |
| -------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Gehe zu Definition**     | `F12` / `Cmd+Klick`    | Von einem Wörterbuchschlüssel oder einer Feldverwendung zu dessen Deklaration in der Inhaltsdatei springen                 |
| **Alle Referenzen suchen** | `Umschalt+F12`         | Von einer Inhaltsdatei aus jede Aufrufstelle auflisten, die diesen Schlüssel oder dieses Feld verwendet                    |
| **Hover**                  | Cursor darüber bewegen | Die Felder eines Wörterbuchs oder den übersetzten Wert eines Feldes ansehen, ohne die Datei zu verlassen                   |
| **Autovervollständigung**  | `"` `'` `` ` `` `.`    | Deklarierte Wörterbuchschlüssel innerhalb eines Getters vorschlagen sowie Inhaltsfelder nach `.` oder beim Destrukturieren |
| **Diagnosen**              | automatisch            | Warnen, wenn ein Schlüssel in keiner Inhaltsdatei deklariert ist                                                           |

Zwei weitere Verhaltensweisen sind erwähnenswert:

- **Zusammengeführte Wörterbücher** — ein über mehrere Inhaltsdateien verteilter Schlüssel liefert ein Ergebnis pro Datei, sodass Sie zu jeder Deklaration navigieren können.
- **Monorepo-fähig** — der Server ermittelt die zu jeder Datei _nächstgelegene_ `intlayer.config.*`, sodass mehrere Projekte in einem Arbeitsbereich jeweils eigene Wörterbücher erhalten.

### Unterstützte Aufrufe

Der Schlüssel wird entweder aus einem positionellen String-Argument oder aus einem Optionsobjekt (`{ namespace }`, `{ id }`) gelesen.

| Bibliothek                  | Aufrufe                                                  |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Das funktioniert für jedes `*-intlayer`-Paket (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`) sowie für die Compat-Adapter-Pakete, mit denen Sie Ihre bestehende i18n-Syntax beibehalten können.

> Wörterbücher werden aus der Build-Ausgabe gelesen — führen Sie also `npx intlayer build` aus oder lassen Sie Ihren Dev-Server laufen, damit der Server etwas auflösen kann.

---

## Installation

Der Server wird als `intlayer-lsp`-Binary in `@intlayer/lsp` ausgeliefert:

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

Installieren Sie ihn stattdessen global (`npm install -g @intlayer/lsp`), wenn Ihr Editor `intlayer-lsp` im `PATH` benötigt — das gilt für das Claude-Code-Plugin und für jede der folgenden Konfigurationen, die das Binary direkt aufruft.

---

## Einrichtung

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Installieren Sie die [Intlayer-VS-Code-Erweiterung](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). Der Language Server ist seit v8.12.0 enthalten und startet automatisch — **keine Konfiguration erforderlich**.

Weitere Funktionen finden Sie in der [Dokumentation der VS-Code-Erweiterung](https://intlayer.org/doc/vs-code-extension).

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) und [Windsurf](https://windsurf.com/) sind VS-Code-Forks und nutzen dasselbe Erweiterungs-Ökosystem. Installieren Sie die [Intlayer-VS-Code-Erweiterung](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) einmal, und der Server aktiviert sich automatisch — **keine Konfiguration erforderlich**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer liefert ein **Claude-Code-Plugin**, das im Intlayer-Repository gehostet wird. Es gibt Claude Code echte Symbolauflösung für Ihre Wörterbuchschlüssel, statt auf `grep` zurückzufallen.

Legen Sie das Binary in Ihren `PATH`, registrieren Sie dann den Marketplace und installieren Sie das Plugin:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` aktiviert das Plugin ebenfalls. **Starten Sie Claude Code neu** — Language Server werden beim Start geladen, das Plugin wirkt also erst danach.

Claude Code startet den Server anschließend für `.ts`-, `.tsx`-, `.js`-, `.jsx`-, `.vue`-, `.astro`- und `.svelte`-Dateien und nutzt `goToDefinition`, `findReferences` und `hover` beim Navigieren durch Ihren Code.

Falls Go-to-Definition weiterhin nichts tut, schaltet Ihre Claude-Code-Version das LSP-Tool möglicherweise hinter einem Flag frei:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed bietet native LSP-Unterstützung. Fügen Sie den Server Ihren Benutzereinstellungen hinzu:

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

Der Platzhalter `"..."` behält Zeds Standard-Language-Server neben dem von Intlayer bei.

  </Tab>
  <Tab label="Neovim" value="neovim">

Registrieren Sie mit [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) eine benutzerdefinierte Serverkonfiguration:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Server mit npx starten, damit keine globale Installation nötig ist
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Nach einem Neustart von Neovim führt `gd` auf einem Wörterbuchschlüssel „Gehe zu Definition“ aus und `gr` die Referenzsuche.

  </Tab>
  <Tab label="coc.nvim" value="coc">

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="Andere Editoren" value="other">

Jeder LSP-fähige Editor kann `@intlayer/lsp` ausführen. Richten Sie ihn ein auf:

- **Ausführbare Datei** — `npx @intlayer/lsp` oder das `intlayer-lsp`-Binary
- **Transport** — stdio (Standard)
- **Fähigkeiten** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (Auslösezeichen `"` `'` `` ` `` `.`), Push-Diagnosen, `textDocumentSync: Incremental`
- **Root-Muster** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Das genaue Konfigurationsformat entnehmen Sie der LSP-Dokumentation Ihres Editors.

  </Tab>
</Tabs>

---

## Hinweis zu KI-Agenten im Terminal

**Claude Code** agiert als echter LSP-Client — siehe den Tab oben.

**OpenAI Codex** und die meisten anderen Terminal-Tools sind keine LSP-Clients: Sie lesen und schreiben Dateien direkt. Den Server allein laufen zu lassen hilft ihnen nicht; der Nutzen entsteht, wenn er in einem begleitenden Editor aktiv ist, dessen Index der Agent abfragen kann (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Funktionsweise

Für jede Datei sucht der Server die nächstgelegene `intlayer.config.*` und lädt die Konfiguration dieses Projekts, um die kompilierten Wörterbücher zu finden. Konfiguration, Wörterbücher und die Liste der Quelldateien werden mit kurzen TTLs zwischengespeichert und invalidiert, sobald sich eine überwachte Inhaltsdatei ändert.

Bei einer Anfrage parst der Server das Dokument (via [oxc](https://oxc.rs/)) und untersucht die Cursorposition:

1. **Auf einem Schlüssel-String** (`useIntlayer("home")`) → liefert jede Inhaltsdatei, die diesen Schlüssel deklariert, positioniert auf deren `key:`-Zeile.
2. **Auf einer Feldverwendung** (`content.title`, eine destrukturierte Eigenschaft, `t('path.to.field')`, `<Trans>`, …) → löst die Variable zurück zu ihrem Wörterbuch auf und liefert das passende Feld innerhalb der Inhaltsdateien.
3. **Aus einer Inhaltsdatei heraus** → führt die umgekehrte Suche aus und durchsucht die Projektquellen nach Aufrufstellen dieses Schlüssels oder Feldes.

---

## Fehlerbehebung

| Symptom                                         | Wahrscheinliche Ursache                  | Lösung                                                                               |
| ----------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| Es passiert überhaupt nichts                    | Server läuft nicht                       | Prüfen Sie, ob `@intlayer/lsp` installiert ist und Ihr Editor ihn startet            |
| Funktioniert im Editor, nicht in Claude Code    | Plugin mitten in der Sitzung installiert | Claude Code neu starten — Language Server werden beim Start geladen                  |
| Keine Definitionen für einen Schlüssel gefunden | Wörterbücher nicht gebaut                | Führen Sie `npx intlayer build` aus oder starten Sie Ihren Dev-Server                |
| Jeder Schlüssel als nicht deklariert gemeldet   | Konfiguration nicht aufgelöst            | Prüfen Sie, ob eine `intlayer.config.ts` (oder `.js`) im Projektstamm vorhanden ist  |
| Falsches Projekt in einem Monorepo verwendet    | Fehlende Konfiguration pro Paket         | Fügen Sie jedem Paket, das eigenen Inhalt deklariert, eine `intlayer.config.*` hinzu |
| Server stürzt beim Start ab                     | Node.js-Version zu alt                   | Erfordert Node.js ≥ 14.18                                                            |

In VS Code protokolliert der Server unter **Ansicht → Ausgabe → „Intlayer LSP“** — nützlich, um zu prüfen, welche Konfiguration aufgelöst und wie viele Wörterbücher gefunden wurden.
