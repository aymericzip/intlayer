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

Intlayer wspiera integrację z następującymi platformami:

### 1. Cursor

Cursor obsługuje serwery MCP (Model Context Protocol) oraz niestandardowe umiejętności. Uruchomienie `intlayer init skills`:

- Utworzy plik `.cursor/mcp.json` do komunikacji z serwerem MCP Intlayer.
- Zainstaluje umiejętności specyficzne dla frameworka w katalogu `.cursor/skills`.

### 2. Windsurf

Windsurf to IDE napędzane przez AI. Uruchomienie `intlayer init skills` zainstaluje umiejętności specyficzne dla frameworka w katalogu `.windsurf/skills`.

### 3. VS Code

Dla użytkowników VS Code, zwłaszcza tych korzystających z GitHub Copilot lub innych rozszerzeń zgodnych z MCP, polecenie:

- Tworzy konfigurację `.vscode/mcp.json`.
- Instaluje umiejętności specyficzne dla frameworka w katalogu `skills/` w głównym folderze projektu.

### 4. OpenCode

OpenCode to interaktywny agent CLI zaprojektowany do zadań inżynierii oprogramowania. Intlayer zapewnia specyficzne umiejętności, które pomagają OpenCode w zadaniach związanych z internacjonalizacją. Są one instalowane w katalogu `.opencode/skills`.

### 5. Claude Code

Claude Code można skonfigurować do korzystania z umiejętności Intlayer. Polecenie instaluje umiejętności specyficzne dla frameworka в katalogu `.claude/skills`.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace pozwala na definiowanie niestandardowych umiejętności. Polecenie instaluje umiejętności specyficzne dla frameworka w katalogu `.github/skills`.
