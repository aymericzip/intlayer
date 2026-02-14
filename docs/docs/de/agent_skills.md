---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Agenten-Fähigkeiten
description: Erfahren Sie, wie Sie Intlayer Agent Skills nutzen können, um das Verständnis Ihres KI-Agenten für Ihr Projekt zu verbessern, einschließlich umfassender Einrichtungsanleitungen für Metadaten, Sitemaps und Server-Aktionen.
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
  - version: 8.1.0
    date: 2026-02-09
    changes: Versionshistorie initialisieren
---

## Der Befehl `intlayer init skills`

Der Befehl `intlayer init skills` ist der einfachste Weg, um Agenten-Fähigkeiten in Ihrem Projekt einzurichten. Er erkennt Ihre Umgebung und installiert die notwendigen Konfigurationsdateien für Ihre bevorzugten Plattformen.

```bash
npx intlayer init skills
```

Oder mit dem Vercel Skill SDK

```bash
npx skills add aymericzip/intlayer-skills
```

Wenn Sie diesen Befehl ausführen, wird er:

1.  Das von Ihnen verwendete Framework erkennen (z. B. Next.js, React, Vite).
2.  Sie fragen, für welche Plattformen Sie Fähigkeiten installieren möchten (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace usw.).
3.  Die erforderlichen Konfigurationsdateien generieren (z. B. `.cursor/skills/intlayer_next_js/SKILL.md`, `.windsurf/skills/intlayer_next_js/SKILL.md`, `.opencode/skills/intlayer_next_js/SKILL.md`, `.vscode/mcp.json` usw.).

## Unterstützte Plattformen

Intlayer bietet frameworkspezifische Dokumentation (Einrichtung, Verwendung, Metadaten, Sitemap, Server-Aktionen usw.), um dem KI-Agenten zu helfen, zu verstehen, wie er in Ihrem spezifischen Projekt mit Intlayer arbeiten kann. Diese Fähigkeiten sind darauf ausgelegt, den Agenten durch die Komplexität der Internationalisierung zu führen und sicherzustellen, dass er den richtigen Mustern und Best Practices folgt.

Intlayer unterstützt die Integration mit den folgenden Plattformen:

### 1. Cursor

Cursor unterstützt MCP (Model Context Protocol) Server und benutzerdefinierte Fähigkeiten (custom skills). Das Ausführen von `intlayer init skills` wird:

- Eine `.cursor/mcp.json`-Datei erstellen, um mit dem Intlayer MCP-Server zu kommunizieren.
- Framework-spezifische Fähigkeiten im Verzeichnis `.cursor/skills` installieren.

### 2. Windsurf

Windsurf ist eine KI-gestützte IDE. Das Ausführen von `intlayer init skills` installiert framework-spezifische Fähigkeiten im Verzeichnis `.windsurf/skills`.

### 3. VS Code

Für VS Code-Benutzer, insbesondere diejenigen, die GitHub Copilot oder andere MCP-kompatible Erweiterungen verwenden, wird durch den Befehl:

- Eine `.vscode/mcp.json`-Konfiguration erstellt.
- Framework-spezifische Fähigkeiten im Verzeichnis `skills/` im Stammverzeichnis Ihres Projekts installiert.

### 4. OpenCode

OpenCode ist ein interaktiver CLI-Agent, der für Software-Engineering-Aufgaben entwickelt wurde. Intlayer bietet spezifische Fähigkeiten, um OpenCode bei Ihren Internationalisierungsaufgaben zu unterstützen. Diese werden im Verzeichnis `.opencode/skills` installiert.

### 5. Claude Code

Claude Code kann so konfiguriert werden, dass er Intlayer-Fähigkeiten nutzt. Der Befehl installiert framework-spezifische Fähigkeiten im Verzeichnis `.claude/skills`.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace ermöglicht es Ihnen, benutzerdefinierte Fähigkeiten zu definieren. Der Befehl installiert framework-spezifische Fähigkeiten im Verzeichnis `.github/skills`.
