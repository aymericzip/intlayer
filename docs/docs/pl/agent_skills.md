---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Umiejętności agenta
description: Dowiedz się, jak używać Intlayer Agent Skills, aby poprawić zrozumienie Twojego projektu przez agenta AI, w tym kompleksowe przewodniki konfiguracji dla metadanych, map witryn i akcji serwera.
keywords:
  - Intlayer
  - Agent Skills
  - Agent AI
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Historia początkowa
---

# Umiejętności agenta

## Polecenie `intlayer init skills`

Polecenie `intlayer init skills` to najprostszy sposób na skonfigurowanie umiejętności agenta w Twoim projekcie. Wykrywa Twoje środowisko i instaluje niezbędne pliki konfiguracyjne dla preferowanych platform.

```bash
npx intlayer init skills
```

Lub używając Vercel Skill SDK

```bash
npx skills add aymericzip/intlayer-skills
```

Po uruchomieniu tego polecenia zostaną wykonane następujące czynności:

1.  Wykryje framework, którego używasz (np. Next.js, React, Vite).
2.  Zapyta Cię, na których platformach chcesz zainstalować umiejętności (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace itp.).
3.  Wygeneruje wymagane pliki konfiguracyjne (takie jak `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json` itp.).

## Obsługiwane platformy

Intlayer zapewnia dokumentację specyficzną dla frameworka (Konfiguracja, Użycie, Metadane, Mapa witryny, Akcje serwera itp.), aby pomóc agentowi AI zrozumieć, jak pracować z Intlayer w Twoim konkretnym projekcie. Umiejętności te zostały zaprojektowane, aby prowadzić agenta przez zawiłości internacjonalizacji, zapewniając przestrzeganie właściwych wzorców i najlepszych praktyk.
