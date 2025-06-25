---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: MCP-Server-Dokumentation
description: Erkunden Sie die Funktionen und die Einrichtung des MCP-Servers, um Ihre Serververwaltung und -operationen zu optimieren.
keywords:
  - MCP-Server
  - Serververwaltung
  - Optimierung
  - Intlayer
  - Dokumentation
  - Einrichtung
  - Funktionen
---

# Intlayer MCP Server

Der **Intlayer MCP (Model Context Protocol) Server** bietet KI-gestützte IDE-Unterstützung, die speziell für das Intlayer Ökosystem entwickelt wurde. Entworfen für moderne Entwicklerumgebungen wie **Cursor**, **GitHub Copilot workspace** und jede IDE, die das MCP-Protokoll unterstützt, bietet dieser Server kontextbezogene, Echtzeit-Unterstützung basierend auf der Konfiguration Ihres Projekts.

## Warum den Intlayer MCP Server verwenden?

Durch die Aktivierung des Intlayer MCP Servers in Ihrer IDE erhalten Sie:

- **Intelligente CLI-Integration**
  Greifen Sie direkt über Ihre IDE-Oberfläche auf Intlayer CLI-Befehle zu und führen Sie diese aus. Sehen Sie sich die vollständige Liste der Befehle und Optionen in der [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) an.

- **Kontextbezogene Dokumentation**
  Der MCP-Server lädt und stellt die Dokumentation bereit, die der Version von Intlayer entspricht, die Sie in Ihrem Projekt verwenden. Dies stellt sicher, dass Codevorschläge, Befehlsoptionen und Erklärungen stets aktuell und relevant sind.

- **KI-gestützte Entwicklung**
  Mit projektbezogenen Vorschlägen und Autovervollständigung kann der KI-Assistent Ihren Code erklären, CLI-Nutzung empfehlen oder vorschlagen, wie Sie bestimmte Funktionen von Intlayer basierend auf Ihren aktuellen Dateien verwenden können.

- **Leichtgewichtig & Sofortige Einrichtung**
  Keine Serverwartung oder aufwändige Installation erforderlich. Konfigurieren Sie einfach Ihre `.cursor/mcp.json` oder eine entsprechende MCP-Konfiguration und Sie sind startklar.

---

## Cursor einrichten

Fügen Sie im Stammverzeichnis Ihres Projekts die folgende `.cursor/mcp.json`-Konfigurationsdatei hinzu:

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

Dies weist Ihre IDE an, den Intlayer MCP-Server mit `npx` zu starten, wodurch sichergestellt wird, dass immer die neueste verfügbare Version verwendet wird, es sei denn, Sie fixieren sie.

---

## VS Code einrichten

Um den Intlayer MCP Server mit VS Code zu verwenden, müssen Sie ihn in Ihren Arbeitsbereichs- oder Benutzereinstellungen konfigurieren.

### Arbeitsbereichskonfiguration

Erstellen Sie eine `.vscode/mcp.json`-Datei im Stammverzeichnis Ihres Projekts:

```json
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

### Verwendung des MCP-Servers in VS Code

1. **Agent-Modus aktivieren**: Öffnen Sie die Chat-Ansicht (⌃⌘I auf Mac, Ctrl+Alt+I auf Windows/Linux) und wählen Sie den **Agent**-Modus aus dem Dropdown-Menü.

2. **Zugriff auf Tools**: Klicken Sie auf die Schaltfläche **Tools**, um verfügbare Intlayer-Tools anzuzeigen. Sie können bestimmte Tools nach Bedarf auswählen/abwählen.

3. **Direkter Tool-Verweis**: Verweisen Sie direkt auf Tools in Ihren Eingabeaufforderungen, indem Sie `#` gefolgt vom Toolnamen eingeben.

4. **Tool-Bestätigung**: Standardmäßig fragt VS Code nach einer Bestätigung, bevor Tools ausgeführt werden. Verwenden Sie die **Weiter**-Schaltflächenoptionen, um Tools automatisch für die aktuelle Sitzung, den Arbeitsbereich oder alle zukünftigen Aufrufe zu bestätigen.

### Serververwaltung

- Führen Sie **MCP: List Servers** aus der Befehlspalette aus, um konfigurierte Server anzuzeigen.
- Starten, stoppen oder starten Sie den Intlayer MCP-Server nach Bedarf neu.
- Sehen Sie sich Serverprotokolle zur Fehlerbehebung an, indem Sie den Server auswählen und **Show Output** wählen.

Für detailliertere Informationen zur VS Code MCP-Integration siehe die [offizielle VS Code MCP-Dokumentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Verwendung des MCP-Servers über CLI

Sie können den Intlayer MCP-Server auch direkt über die Befehlszeile für Tests, Debugging oder die Integration mit anderen Tools ausführen.

### Installation des MCP-Servers

Installieren Sie zuerst das MCP-Server-Paket global oder verwenden Sie es über npx:

```bash
# Global installieren
npm install -g @intlayer/mcp

# Oder direkt mit npx verwenden (empfohlen)
npx @intlayer/mcp
```

### Server starten

Um den MCP-Server mit dem Inspector für Debugging und Tests zu starten:

```bash
# Mit dem integrierten Startbefehl
npm run start

# Oder direkt mit npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Dies startet den MCP-Server mit einer Inspector-Oberfläche, die Ihnen ermöglicht:

- MCP-Protokollkommunikation zu testen
- Serverantworten zu debuggen
- Tool- und Ressourcenimplementierungen zu validieren
- Serverleistung zu überwachen

### Entwicklungseinsatz

Für Entwicklungs- und Testzwecke können Sie den Server in verschiedenen Modi ausführen:

```bash
# Im Entwicklungsmodus erstellen und starten
npm run dev

# Mit benutzerdefinierter Konfiguration ausführen
node dist/cjs/index.cjs

# Serverfunktionalität testen
npm test
```

Der Server stellt Intlayer-spezifische Tools und Ressourcen bereit, die von jedem MCP-kompatiblen Client genutzt werden können, nicht nur von Cursor oder anderen IDEs.

---

## Funktionsübersicht

| Funktion                   | Beschreibung                                                                                        |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| CLI-Unterstützung          | Führen Sie `intlayer`-Befehle aus, erhalten Sie Nutzungshinweise und Argumente inline               |
| Versionierte Dokumentation | Automatische Erkennung und Laden der Dokumentation, die Ihrer aktuellen Intlayer-Version entspricht |
| Autovervollständigung      | Intelligente Befehls- und Konfigurationsvorschläge während der Eingabe                              |
| Plugin-fähig               | Kompatibel mit IDEs und Tools, die den MCP-Standard unterstützen                                    |

---

## Nützliche Links

- [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [Intlayer GitHub-Repository](https://github.com/aymericzip/intlayer)
