---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Agenten-Fähigkeiten
description: Erfahren Sie, wie Sie Intlayer Agent Skills nutzen können, um das Verständnis Ihres KI-Agenten für Ihr Projekt zu verbessern.
keywords:
  - Intlayer
  - Agenten-Fähigkeiten
  - KI-Agent
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: Versionshistorie initialisieren
---

## Der Befehl `intlayer init skills`

Der Befehl `intlayer init skills` ist der einfachste Weg, um Agenten-Fähigkeiten in Ihrem Projekt einzurichten. Er erkennt Ihre Umgebung und installiert die notwendigen Konfigurationsdateien für Ihre bevorzugten Plattformen.

```bash
npx intlayer init skills
```

Wenn Sie diesen Befehl ausführen, wird er:

1.  Das von Ihnen verwendete Framework erkennen (z. B. Next.js, React, Vite).
2.  Sie fragen, für welche Plattformen Sie Fähigkeiten installieren möchten (Cursor, VS Code, OpenCode, Claude Code usw.).
3.  Die erforderlichen Konfigurationsdateien generieren (wie `.cursor/mcp.json`, `.vscode/mcp.json` oder `.intlayer/skills/*.md`).

## Unterstützte Plattformen

Intlayer unterstützt die Integration mit den folgenden Plattformen:

### 1. Cursor

Cursor unterstützt MCP (Model Context Protocol) Server. Das Ausführen von `intlayer init skills` erstellt eine `.cursor/mcp.json`-Datei, die es Cursor ermöglicht, mit dem Intlayer MCP-Server zu kommunizieren.

### 2. VS Code

Für VS Code-Benutzer, insbesondere diejenigen, die GitHub Copilot oder andere MCP-kompatible Erweiterungen verwenden, erstellt der Befehl eine `.vscode/mcp.json`-Konfiguration.

### 3. OpenCode

OpenCode ist ein interaktiver CLI-Agent, der für Software-Engineering-Aufgaben entwickelt wurde. Intlayer bietet spezifische Fähigkeiten, um OpenCode bei Internationalisierungsaufgaben zu unterstützen.

### 4. Claude Code

Claude Code kann so konfiguriert werden, dass er Intlayer-Fähigkeiten nutzt, indem die generierten Konfigurationen zu seinen Desktop- oder CLI-Einstellungen hinzugefügt werden.
