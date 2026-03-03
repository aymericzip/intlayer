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

# Agenten-Fähigkeiten

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
3.  Die erforderlichen Konfigurationsdateien generieren (z. B. `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json` usw.).

## Unterstützte Plattformen

Intlayer bietet frameworkspezifische Dokumentation (Einrichtung, Verwendung, Metadaten, Sitemap, Server-Aktionen usw.), um dem KI-Agenten zu helfen, zu verstehen, wie er in Ihrem spezifischen Projekt mit Intlayer arbeiten kann. Diese Fähigkeiten sind darauf ausgelegt, den Agenten durch die Komplexität der Internationalisierung zu führen und sicherzustellen, dass er den richtigen Mustern und Best Practices folgt.
