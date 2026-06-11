---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Intlayer LSP-Server
description: Erfahren Sie, wie der Intlayer Language Server die Funktion "Gehe zu Definition" und andere IDE-Features für useIntlayer, getIntlayer und verwandte Aufrufe in allen unterstützten Editoren bereitstellt.
keywords:
  - LSP
  - Language Server
  - Gehe zu Definition
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Intlayer LSP-Server

Der **Intlayer Language Server** ist eine Implementierung des [Language Server Protocols (LSP)](https://microsoft.github.io/language-server-protocol/), die Ihre IDE mit Intlayer-spezifischer Intelligenz erweitert. Er bietet derzeit **Gehe zu Definition (Go to Definition)** für Wörterbuchschlüssel-Aufrufe, sodass Sie direkt von `useIntlayer("my-key")` in Ihrer Komponente zu der `.content.ts`-Datei springen können, die diesen deklariert.

---

## Warum den LSP verwenden?

Wenn Sie Intlayer verwenden, ist die Verbindung zwischen einem Aufrufe wie `useIntlayer("homepage")` und seiner Deklaration in `src/homepage.content.ts` implizit. Ohne Tooling müssen Sie manuell nach der Datei suchen. Der LSP macht diese Verbindung explizit:

**Erkennung durch AI-Agenten**

AI-Programmierassistenten (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) verlassen sich auf den Language Server, um Symbole aufzulösen und dateiübergreifende Beziehungen zu verstehen. Wenn der Intlayer-LSP läuft, können Agenten `useIntlayer("key")` bis zu seiner Deklaration zurückverfolgen. Dies gibt ihnen genauen Kontext über verfügbare Inhaltsschlüssel, die Struktur jedes Wörterbuchs und die zu lesenden oder zu bearbeitenden Dateien.

**Gehe zu Definition**

Platzieren Sie Ihren Cursor auf einer beliebigen Wörterbuchschlüssel-Zeichenkette innerhalb eines unterstützten Getter-Aufrufs und drücken Sie `F12` (oder `Cmd/Ctrl+Klick`). Der Editor öffnet die Inhaltsdeklarationsdatei und positioniert den Cursor auf der Zeile `key:`.

**Unterstützung für zusammengeführte Wörterbücher**

Ein Schlüssel kann auf mehrere Inhaltsdateien aufgeteilt sein (Intlayer führt sie zusammen). Der Server gibt einen Ort (`Location`) pro Quelldatei zurück, sodass Sie zu jeder Deklaration navigieren können.

**Funktioniert überall**

Unterstützt alle `*-intlayer`-Pakete (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Unterstützte Getter-Aufrufe

Der Server erkennt die folgenden Funktionsaufrufe und extrahiert das erste String-Literal-Argument als Wörterbuchschlüssel:

| Funktion      | Beispiel                      |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

TypeScript-Generics und zusätzliche Argumente werden ignoriert – nur die Schlüssel-Zeichenkette zählt.

> `useDictionary` und `getDictionary` erwarten ein bereits importiertes `Dictionary`-Objekt als erstes Argument anstelle eines Schlüssel-Strings, weshalb sie nicht von "Gehe zu Definition" profitieren und nicht vom Server verfolgt werden.

---

## Installation

Der LSP-Server wird als Teil von `@intlayer/lsp` verteilt:

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

Das Paket stellt das Binärprogramm `intlayer-lsp` zur Verfügung, das Editoren als Server-Executable verwenden.

---

## Einrichtung als Claude Code Plugin

Der Intlayer LSP ist als **Claude Code Plugin** verfügbar, das direkt im Intlayer-GitHub-Repository gehostet wird. Durch die Installation erhält Claude Code native Unterstützung für "Gehe zu Definition" für all Ihre `useIntlayer`- / `getIntlayer`-Aufrufe.

### 1. Installieren Sie das Language-Server-Binärprogramm

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Dadurch wird das Binärprogramm `intlayer-lsp` zu Ihrem PATH hinzugefügt, welches durch den Eintrag `lspServers` des Plugins aufgerufen wird.

### 2. Registrieren Sie den Intlayer-Marktplatz und installieren Sie das Plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code fügt `"intlayer-lsp@intlayer": true` zu Ihren `enabledPlugins` hinzu und startet den Language Server automatisch für die unterstützten Dateitypen (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Aktivieren Sie das LSP-Tool (falls nicht bereits aktiv)

Einige Claude Code-Versionen erfordern das Setzen des LSP-Feature-Flags. Fügen Sie Folgendes zu Ihrer `~/.claude/settings.json` hinzu, wenn "Gehe zu Definition" nach der Installation nicht funktioniert:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Starten Sie Claude Code neu – bei der Navigation in Ihrer Intlayer-Codebasis wird nun `goToDefinition`, `findReferences` und andere LSP-Operationen anstelle eines Fallbacks auf `grep` verwendet.

---

## Einrichtung in VS Code (über Erweiterung — empfohlen)

Wenn Sie die [Intlayer VS Code-Erweiterung](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) installiert haben, startet der Language Server automatisch. Keine zusätzliche Konfiguration erforderlich. Der LSP ist seit Version 8.12.0 direkt in die VSCode-Erweiterung integriert.

> Siehe die [VS Code-Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension) für Installation und weitere Funktionen.

---

## Manuelle Einrichtung in VS Code

Wenn Sie die Intlayer-Erweiterung nicht verwenden, können Sie den Language Server manuell über eine generische LSP-Client-Erweiterung wie [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) oder durch Schreiben einer eigenen kleinen Erweiterung einrichten. Der empfohlene Weg ist die Verwendung der Intlayer-Erweiterung.

Als Referenz startet der Server über die Binärdatei `intlayer-lsp` über stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Die Intlayer-Erweiterung liest diese Einstellungen, um den Server zu starten. Wenn Sie sich ausschließlich auf die Erweiterung verlassen, sind keine manuellen Einstellungen erforderlich.

---

## Einrichtung in Cursor

[Cursor](https://www.cursor.com/) ist ein VS Code-Fork mit integrierten AI-Funktionen. Es verwendet dasselbe Erweiterungs-Ökosystem, daher funktioniert die **Intlayer VS Code-Erweiterung** ohne zusätzliche Konfiguration – installieren Sie sie einmal und Cursor erkennt sie automatisch.

Wenn Sie eine manuelle Konfiguration bevorzugen, liest Cursor auch `.vscode/settings.json` aus dem Workspace-Root, sodass das obige VS Code-Snippet direkt angewendet wird.

---

## Einrichtung in Windsurf

[Windsurf](https://windsurf.com/) (von Codeium) ist ein weiterer auf VS Code basierender Editor. Installieren Sie die Intlayer-Erweiterung aus dem VS Code Marketplace und der Language Server wird automatisch aktiviert, genau wie in VS Code und Cursor.

Für eine manuelle Konfiguration erstellen Sie `.vscode/settings.json` im Projekt-Root:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Einrichtung in Zed

[Zed](https://zed.dev/) bietet native LSP-Unterstützung über seine Spracheinstellungen. Fügen Sie einen Eintrag in Ihren Zed-Benutzereinstellungen hinzu (`~/.config/zed/settings.json`):

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
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

Der Platzhalter `"..."` teilt Zed mit, die Standard-Language-Server neben dem von Intlayer beizubehalten.

---

## Einrichtung für AI-Agenten-CLIs (Claude Code, Codex, etc.)

**Claude Code** verfügt über erstklassige LSP-Plugin-Unterstützung – folgen Sie der [Claude Code Plugin Einrichtung](#einrichtung-als-claude-code-plugin) oben, um die vollständige "Gehe zu Definition"-Erfahrung direkt in Ihren Terminal-Sitzungen zu nutzen.

**OpenAI Codex** und andere Terminal-basierte Tools agieren noch nicht als LSP-Clients – sie lesen und schreiben Dateien direkt, anstatt eine persistente Language-Server-Sitzung aufrechtzuerhalten. Für diese Tools ergibt sich der Wert des laufenden LSPs indirekt: Wenn der Server in einem Begleit-Editor (VS Code, Cursor, Windsurf, ...) aktiv ist, steht der Live-Index des Editors jedem AI-Agenten zur Verfügung, der ihn über den vom Editor bereitgestellten Kontext abfragen kann (z. B. Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Wenn Sie ausschließlich in einem Terminal ohne geöffneten Editor arbeiten, können Sie den Language Server im Hintergrund starten, damit er für jeden Editor bereit ist, der sich später mit demselben Workspace verbindet:

```bash
# Server im Hintergrund aktiv halten
npx @intlayer/lsp &
```

---

## Manuelle Einrichtung in Neovim

Registrieren Sie mit [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) eine benutzerdefinierte Serverkonfiguration:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Server mit npx starten, damit keine globale Installation erforderlich ist
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

Nach dem Neustart von Neovim ruft das Drücken von `gd` über einem Intlayer-Schlüssel "Gehe zu Definition" auf.

---

## Manuelle Einrichtung in anderen Editoren

Jeder Editor, der das Language Server Protocol unterstützt, kann `@intlayer/lsp` verwenden. Der Server bietet:

- **Transport** – Node.js IPC / stdio (Standard)
- **Executable** – `npx @intlayer/lsp` (oder das lokal installierte `intlayer-lsp`-Binärprogramm)
- **Capabilities** – `definitionProvider: true`, `textDocumentSync: Incremental`

Konsultieren Sie die LSP-Dokumentation Ihres Editors für das genaue Konfigurationsformat (z. B. `languageserver.json` für [coc.nvim](https://github.com/neoclide/coc.nvim) oder die LSP-Client-Einstellungen in [Helix](https://helix-editor.com)).

### Beispiel: coc.nvim

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

### Beispiel: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## Wie es funktioniert

Wenn der Server startet, löst er die Intlayer-Konfiguration aus dem Workspace-Root mithilfe von `getConfiguration()` auf. Dies gibt ihm die `build`- und `system`-Pfade, die zum Auffinden von kompilierten Wörterbüchern benötigt werden.

Bei jeder **Gehe zu Definition**-Anfrage:

1. Der Server liest den vollständigen Text des geöffneten Dokuments.
2. Er scannt nach Getter-Aufrufen (`useIntlayer`, `getIntlayer` usw.) mithilfe eines regulären Ausdrucks.
3. Er prüft, ob die Cursorposition in einen dieser Aufrufe fällt.
4. Wenn dies der Fall ist, extrahiert er den Wörterbuchschlüssel (Erfassungsgruppe 3 des regulären Ausdrucks) und ruft `getUnmergedDictionaries()` auf, um jede Inhaltsdatei zu lokalisieren, die diesen Schlüssel deklariert.
5. Er liest jede übereinstimmende Datei und findet die genaue Zeile mit `key: "<key>"`, um den Cursor präzise zu positionieren.
6. Er gibt ein Array von `Location`-Objekten zurück – eines pro Quelldatei.

Die Konfiguration wird verzögert aufgelöst und pro Sitzung zwischengespeichert. Sie wird bei jeder `initialize`-Anfrage (z. B. wenn Sie einen neuen Workspace-Ordner öffnen) zurückgesetzt.

---

## Fehlerbehebung

| Symptom                                         | Mögliche Ursache              | Lösung                                                                                                |
| ----------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| Gehe zu Definition tut nichts                   | Server läuft nicht            | Überprüfen Sie, ob `@intlayer/lsp` installiert ist und vom Editor gestartet wird                      |
| Falscher Workspace-Root erkannt                 | Mehrere Workspace-Ordner      | Stellen Sie sicher, dass der Ordner, der `intlayer.config.ts` enthält, der erste Workspace-Ordner ist |
| Definitionen für einen Schlüssel nicht gefunden | Konfiguration nicht aufgelöst | Überprüfen Sie, ob `intlayer.config.ts` (oder `.js`) im Workspace-Root existiert                      |
| Server stürzt beim Start ab                     | Node.js-Version zu alt        | Benötigt Node.js ≥ 14.18                                                                              |
