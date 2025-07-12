---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: MCP Server Dokumentation
description: Entdecken Sie die Funktionen und die Einrichtung des MCP Servers, um Ihre Serververwaltung und -betrieb zu optimieren.
keywords:
  - MCP Server
  - Serververwaltung
  - Optimierung
  - Intlayer
  - Dokumentation
  - Einrichtung
  - Funktionen
slugs:
  - doc
  - mcp-server
---

# Intlayer MCP Server

Der **Intlayer MCP (Model Context Protocol) Server** bietet KI-gestützte IDE-Unterstützung, die speziell auf das Intlayer-Ökosystem zugeschnitten ist.

## Wo kann ich ihn verwenden?

- In modernen Entwicklerumgebungen wie **Cursor**, **VS Code** und jeder IDE, die das MCP-Protokoll unterstützt.
- Mit Ihrem bevorzugten KI-Assistenten wie **Claude Desktop**, **Gemini**, **ChatGPT** usw.

## Warum den Intlayer MCP Server verwenden?

Durch die Aktivierung des Intlayer MCP Servers in Ihrer IDE erhalten Sie:

- **Kontextbezogene Dokumentation**
  Der MCP-Server lädt und stellt die Dokumentation von Intlayer bereit. Dies beschleunigt Ihre Einrichtung, Ihre Migrationen usw.
  So wird sichergestellt, dass Codevorschläge, Befehlsoptionen und Erklärungen stets aktuell und relevant sind.

- **Intelligente CLI-Integration**
  Greifen Sie direkt über die Benutzeroberfläche Ihrer IDE auf Intlayer CLI-Befehle zu und führen Sie diese aus. Mithilfe des MCP-Servers kann Ihr KI-Assistent Befehle wie `intlayer dictionaries build` ausführen, um Ihre Wörterbücher zu aktualisieren, oder `intlayer dictionaries fill`, um fehlende Übersetzungen zu ergänzen.

  > Die vollständige Liste der Befehle und Optionen finden Sie in der [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

## Lokaler Server (stdio) vs. Remote-Server (SSE)

Der MCP-Server kann auf zwei Arten verwendet werden:

- Lokaler Server (stdio)
- Remote-Server (SSE)

### Lokaler Server (stdio) (empfohlen)

Intlayer stellt ein NPM-Paket bereit, das lokal auf Ihrem Rechner installiert werden kann. Es kann in Ihrer bevorzugten IDE wie VS Code, Cursor sowie in Ihrer lokalen Assistenten-Anwendung wie ChatGPT, Claude Desktop usw. installiert werden.

Dieser Server ist die empfohlene Methode zur Nutzung des MCP-Servers, da er alle Funktionen des MCP-Servers integriert, einschließlich der CLI-Tools.

### Remote-Server (SSE)

Der MCP-Server kann auch remote über die SSE-Transportmethode verwendet werden. Dieser Server wird von Intlayer gehostet und ist unter https://mcp.intlayer.org verfügbar. Auf diesen Server kann öffentlich, ohne Authentifizierung zuzugreifen, und die Nutzung ist kostenlos.

Beachten Sie, dass der Remote-Server keine CLI-Tools, keine KI-Autovervollständigung usw. integriert. Der entfernte Server dient nur zur Interaktion mit der Dokumentation, um Ihrem KI-Assistenten im Intlayer-Ökosystem zu helfen.

> Aufgrund der Hosting-Kosten für den Server kann die Verfügbarkeit des Remote-Servers nicht garantiert werden. Wir begrenzen die Anzahl gleichzeitiger Verbindungen. Für die zuverlässigste Erfahrung empfehlen wir die Verwendung der lokalen Server-Transportmethode (stdio).

---

## Einrichtung in Cursor

Folgen Sie der [offiziellen Dokumentation](https://docs.cursor.com/context/mcp), um den MCP-Server in Cursor zu konfigurieren.

Fügen Sie im Stammverzeichnis Ihres Projekts die folgende Konfigurationsdatei `.cursor/mcp.json` hinzu:

### Lokaler Server (stdio) (empfohlen)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Remote-Server (SSE)

Um eine Verbindung zu einem entfernten Intlayer MCP-Server über Server-Sent Events (SSE) herzustellen, können Sie Ihren MCP-Client so konfigurieren, dass er sich mit dem gehosteten Dienst verbindet.

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Dies weist Ihre IDE an, den Intlayer MCP-Server mit `npx` zu starten, wodurch sichergestellt wird, dass immer die neueste verfügbare Version verwendet wird, sofern Sie diese nicht festlegen.

---

## Einrichtung in VS Code

Folgen Sie der [offiziellen Dokumentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers), um den MCP-Server in VS Code zu konfigurieren.

Um den Intlayer MCP-Server mit VS Code zu verwenden, müssen Sie ihn in Ihren Arbeitsbereichs- oder Benutzereinstellungen konfigurieren.

### Lokaler Server (stdio) (empfohlen)

Erstellen Sie eine Datei `.vscode/mcp.json` im Stammverzeichnis Ihres Projekts:

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Remote-Server (SSE)

Um eine Verbindung zu einem entfernten Intlayer MCP-Server über Server-Sent Events (SSE) herzustellen, können Sie Ihren MCP-Client so konfigurieren, dass er sich mit dem gehosteten Dienst verbindet.

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## Einrichtung in ChatGPT

### Remote-Server (SSE)

Folgen Sie der [offiziellen Dokumentation](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server), um den MCP-Server in ChatGPT zu konfigurieren.

1. Gehen Sie zum [Prompt-Dashboard](https://platform.openai.com/prompts)
2. Klicken Sie auf `+ Erstellen`
3. Klicken Sie auf `Tools (Erstellen oder +)`
4. Wählen Sie `MCP-Server`
5. Klicken Sie auf `Neu hinzufügen`
6. Füllen Sie die folgenden Felder aus:

   - URL: `https://mcp.intlayer.org`
   - Bezeichnung: `Intlayer MCP-Server`
   - Name: `intlayer-mcp-server`
   - Authentifizierung: `Keine`

7. Klicken Sie auf "Speichern"

---

## Einrichtung in Claude Desktop

Folgen Sie der [offiziellen Dokumentation](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server), um den MCP-Server in Claude Desktop zu konfigurieren.

Pfad der Konfigurationsdatei:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Lokaler Server (stdio) (empfohlen)

```json fileName="claude_desktop_config.json"
{
"mcpServers": {
  "intlayer": {
    "command": "npx",
    "args": ["-y", "@intlayer/mcp"]
  }
}
```

---

## Verwendung des MCP-Servers über die CLI

Sie können den Intlayer MCP-Server auch direkt über die Kommandozeile ausführen, um Tests, Debugging oder die Integration mit anderen Tools durchzuführen.

```bash
# Global installieren
npm install -g @intlayer/mcp

# Oder direkt mit npx verwenden (empfohlen)
npx @intlayer/mcp
```

---

## Dokumentationsverlauf

| Version | Datum      | Änderungen                                      |
| ------- | ---------- | ----------------------------------------------- |
| 5.5.12  | 2025-07-11 | Einrichtung von ChatGPT hinzugefügt             |
| 5.5.12  | 2025-07-10 | Einrichtung von Claude Desktop hinzugefügt      |
| 5.5.12  | 2025-07-10 | SSE-Transport und entfernten Server hinzugefügt |
| 5.5.10  | 2025-06-29 | Historie initialisieren                         |
