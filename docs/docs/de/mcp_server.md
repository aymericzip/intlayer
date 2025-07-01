---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: MCP Server Dokumentation
description: Entdecken Sie die Funktionen und die Einrichtung des MCP Servers, um Ihr Servermanagement und Ihre Abläufe zu optimieren.
keywords:
  - MCP Server
  - Serververwaltung
  - Optimierung
  - Intlayer
  - Dokumentation
  - Einrichtung
  - Funktionen
---

# Intlayer MCP Server

Der **Intlayer MCP (Model Context Protocol) Server** bietet KI-gestützte IDE-Unterstützung, die speziell auf das Intlayer-Ökosystem zugeschnitten ist. Entwickelt für moderne Entwicklerumgebungen wie **Cursor**, **GitHub Copilot Workspace** und jede IDE, die das MCP-Protokoll unterstützt, liefert dieser Server kontextbezogene, Echtzeit-Unterstützung basierend auf der Einrichtung Ihres Projekts.

## Warum den Intlayer MCP Server verwenden?

Durch die Aktivierung des Intlayer MCP Servers in Ihrer IDE erhalten Sie:

- **Intelligente CLI-Integration**
  Greifen Sie direkt über die IDE-Oberfläche auf Intlayer CLI-Befehle zu und führen Sie diese aus. Eine vollständige Liste der Befehle und Optionen finden Sie in der [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

- **Kontextbezogene Dokumentation**
  Der MCP-Server lädt und stellt die Dokumentation bereit, die der Version von Intlayer entspricht, die Sie in Ihrem Projekt verwenden. Dies stellt sicher, dass Codevorschläge, Befehlsoptionen und Erklärungen stets aktuell und relevant sind.

- **KI-gestützte Entwicklung**
  Mit projektbezogenen Vorschlägen und Autovervollständigung kann der KI-Assistent Ihren Code erklären, die Nutzung der CLI empfehlen oder vorschlagen, wie bestimmte Funktionen von Intlayer basierend auf Ihren aktuellen Dateien verwendet werden.

- **Leichtgewichtig & Sofort einsatzbereit**
  Kein Serverwartungsaufwand oder umfangreiche Installation erforderlich. Konfigurieren Sie einfach Ihre `.cursor/mcp.json` oder eine entsprechende MCP-Konfiguration und Sie sind startklar.

---

## Cursor einrichten

Fügen Sie im Stammverzeichnis Ihres Projekts die folgende `.cursor/mcp.json` Konfigurationsdatei hinzu:

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

Dies weist Ihre IDE an, den Intlayer MCP-Server mit `npx` zu starten, wodurch sichergestellt wird, dass immer die neueste verfügbare Version verwendet wird, es sei denn, Sie fixieren eine bestimmte Version.

---

## Einrichtung von VS Code

Um den Intlayer MCP-Server mit VS Code zu verwenden, müssen Sie ihn in Ihren Arbeitsbereichs- oder Benutzereinstellungen konfigurieren.

### Arbeitsbereichskonfiguration

Erstellen Sie im Stammverzeichnis Ihres Projekts eine Datei `.vscode/mcp.json` mit folgendem Inhalt:

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

1. **Agentenmodus aktivieren**: Öffnen Sie die Chat-Ansicht (⌃⌘I auf dem Mac, Ctrl+Alt+I unter Windows/Linux) und wählen Sie im Dropdown-Menü den **Agent**-Modus aus.

2. **Zugriff auf Werkzeuge**: Klicken Sie auf die Schaltfläche **Werkzeuge**, um die verfügbaren Intlayer-Werkzeuge anzuzeigen. Sie können bestimmte Werkzeuge nach Bedarf auswählen oder abwählen.

3. **Direkte Werkzeugreferenz**: Verweisen Sie in Ihren Eingaben direkt auf Werkzeuge, indem Sie `#` gefolgt vom Werkzeugnamen eingeben.

4. **Werkzeugbestätigung**: Standardmäßig fragt VS Code vor dem Ausführen von Werkzeugen nach einer Bestätigung. Verwenden Sie die Optionen der **Weiter**-Schaltfläche, um Werkzeuge automatisch für die aktuelle Sitzung, den Arbeitsbereich oder alle zukünftigen Aufrufe zu bestätigen.

### Verwaltung des Servers

- Führen Sie **MCP: Server auflisten** über die Befehlspalette aus, um konfigurierte Server anzuzeigen
- Starten, stoppen oder starten Sie den Intlayer MCP-Server bei Bedarf neu
- Sehen Sie sich zur Fehlerbehebung die Serverprotokolle an, indem Sie den Server auswählen und **Ausgabe anzeigen** wählen

Für detailliertere Informationen zur VS Code MCP-Integration siehe die [offizielle VS Code MCP-Dokumentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Verwendung des MCP-Servers über die CLI

Sie können den Intlayer MCP-Server auch direkt über die Befehlszeile ausführen, um Tests, Debugging oder die Integration mit anderen Werkzeugen durchzuführen.

### Installation des MCP-Servers

Installieren Sie zunächst das MCP-Server-Paket global oder verwenden Sie es direkt über npx:

```bash
# Global installieren
npm install -g @intlayer/mcp

# Oder direkt mit npx verwenden (empfohlen)
npx @intlayer/mcp
```

### Starten des Servers

Um den MCP-Server mit dem Inspector für Debugging und Tests zu starten:

```bash
# Mit dem eingebauten Startbefehl
npm run start

# Oder direkt mit npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Dies startet den MCP-Server mit einer Inspector-Oberfläche, die es Ihnen ermöglicht:

- MCP-Protokollkommunikationen zu testen
- Serverantworten zu debuggen
- Implementierungen von Tools und Ressourcen zu validieren
- Die Serverleistung zu überwachen

### Entwicklungsnutzung

Für Entwicklungs- und Testzwecke können Sie den Server in verschiedenen Modi ausführen:

```bash
# Im Entwicklungsmodus bauen und starten
npm run dev

# Mit benutzerdefinierter Konfiguration ausführen
node dist/cjs/index.cjs

# Die Serverfunktionalität testen
npm test
```

Der Server stellt Intlayer-spezifische Tools und Ressourcen bereit, die von jedem MCP-kompatiblen Client genutzt werden können, nicht nur von Cursor oder anderen IDEs.

---

## Funktionsübersicht

| Feature | Beschreibung |
Dies startet den MCP-Server mit einer Inspektor-Oberfläche, die es Ihnen ermöglicht:

- MCP-Protokollkommunikationen zu testen
- Serverantworten zu debuggen
- Implementierungen von Tools und Ressourcen zu validieren
- Serverleistung zu überwachen

### Entwicklungsnutzung

Für Entwicklungs- und Testzwecke können Sie den Server in verschiedenen Modi ausführen:

```bash
# Im Entwicklungsmodus bauen und starten
npm run dev

# Mit benutzerdefinierter Konfiguration ausführen
node dist/cjs/index.cjs

# Serverfunktionalität testen
npm test
```

Der Server stellt Intlayer-spezifische Tools und Ressourcen bereit, die von jedem MCP-kompatiblen Client genutzt werden können, nicht nur von Cursor oder anderen IDEs.

---

## Funktionsübersicht

| Funktion                   | Beschreibung                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| CLI-Unterstützung          | Führen Sie `intlayer`-Befehle aus, erhalten Sie Nutzungshinweise und Argumente inline             |
| Versionierte Dokumentation | Automatische Erkennung und Laden der Dokumentation, die zu Ihrer aktuellen Intlayer-Version passt |
| Autovervollständigung      | Intelligente Vorschläge für Befehle und Konfiguration während der Eingabe                         |
| Plugin-fähig               | Kompatibel mit IDEs und Tools, die den MCP-Standard unterstützen                                  |

---

## Nützliche Links

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [Intlayer GitHub Repository](https://github.com/aymericzip/intlayer)

---

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
