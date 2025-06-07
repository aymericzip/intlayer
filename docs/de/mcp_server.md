# Intlayer MCP Server

Der **Intlayer MCP (Model Context Protocol) Server** bietet KI-gestützte IDE-Unterstützung, die speziell für das [Intlayer](https://github.com/aymericzip/intlayer)-Ökosystem entwickelt wurde. Konzipiert für moderne Entwicklerumgebungen wie **Cursor**, **GitHub Copilot workspace** und jede IDE, die das MCP-Protokoll unterstützt, bietet dieser Server kontextbezogene, Echtzeit-Unterstützung basierend auf der Einrichtung Ihres Projekts.

## Warum den Intlayer MCP Server verwenden?

Durch die Aktivierung des Intlayer MCP Servers in Ihrer IDE profitieren Sie von:

- **Intelligenter CLI-Integration**
  Greifen Sie direkt über Ihre IDE-Oberfläche auf Intlayer CLI-Befehle zu und führen Sie diese aus. Sehen Sie sich die vollständige Liste der Befehle und Optionen in der [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) an.

- **Kontextbezogene Dokumentation**
  Der MCP-Server lädt und stellt die Dokumentation bereit, die der Version von Intlayer entspricht, die Sie in Ihrem Projekt verwenden. Dies stellt sicher, dass Codevorschläge, Befehlsoptionen und Erklärungen immer aktuell und relevant sind.

- **KI-gestützte Entwicklung**
  Mit projektbezogenen Vorschlägen und Autovervollständigung kann der KI-Assistent Ihren Code erklären, CLI-Nutzung empfehlen oder vorschlagen, wie Sie bestimmte Funktionen von Intlayer basierend auf Ihren aktuellen Dateien verwenden können.

- **Leichtgewichtig & Sofortige Einrichtung**
  Keine Serverwartung oder aufwendige Installation erforderlich. Konfigurieren Sie einfach Ihre `.cursor/mcp.json` oder eine gleichwertige MCP-Konfiguration, und Sie sind startklar.

---

## Cursor einrichten

Fügen Sie in Ihrem Projektstamm die folgende `.cursor/mcp.json`-Konfigurationsdatei hinzu:

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

Dies weist Ihre IDE an, den Intlayer MCP-Server mit `npx` zu starten, wodurch sichergestellt wird, dass immer die neueste verfügbare Version verwendet wird, es sei denn, Sie fixieren diese.

---

## 🛠 Funktionsübersicht

| Funktion                      | Beschreibung                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 🧠 CLI-Unterstützung          | Führen Sie `intlayer`-Befehle aus, erhalten Sie Nutzungshinweise und Argumente inline               |
| 📘 Versionierte Dokumentation | Automatische Erkennung und Laden der Dokumentation, die Ihrer aktuellen Intlayer-Version entspricht |
| 🛎 Autovervollständigung      | Intelligente Befehls- und Konfigurationsvorschläge während der Eingabe                              |
| 🧩 Plugin-fähig               | Kompatibel mit IDEs und Tools, die den MCP-Standard unterstützen                                    |

---

## 📎 Nützliche Links

- [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [Intlayer GitHub-Repository](https://github.com/aymericzip/intlayer)
