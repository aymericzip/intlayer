---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Umiejętności agenta
description: Dowiedz się, jak używać Intlayer Agent Skills, aby poprawić zrozumienie Twojego projektu przez agenta AI.
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
  - version: 8.0.4
    date: 2026-02-09
    changes: Historia początkowa
---

## Polecenie `intlayer init skills`

Polecenie `intlayer init skills` to najprostszy sposób na skonfigurowanie umiejętności agenta w Twoim projekcie. Wykrywa Twoje środowisko i instaluje niezbędne pliki konfiguracyjne dla preferowanych platform.

```bash
npx intlayer init skills
```

Po uruchomieniu tego polecenia zostaną wykonane następujące czynności:

1.  Wykryje framework, którego używasz (np. Next.js, React, Vite).
2.  Zapyta Cię, na których platformach chcesz zainstalować umiejętności (Cursor, VS Code, OpenCode, Claude Code itp.).
3.  Wygeneruje wymagane pliki konfiguracyjne (takie jak `.cursor/mcp.json`, `.vscode/mcp.json` lub `.intlayer/skills/*.md`).

## Obsługiwane platformy

Intlayer wspiera integrację z następującymi platformami:

### 1. Cursor

Cursor obsługuje serwery MCP (Model Context Protocol). Uruchomienie `intlayer init skills` utworzy plik `.cursor/mcp.json`, który pozwoli Cursor na komunikację z serwerem MCP Intlayer.

### 2. VS Code

Dla użytkowników VS Code, zwłaszcza korzystających z GitHub Copilot lub innych rozszerzeń zgodnych z MCP, polecenie tworzy konfigurację `.vscode/mcp.json`.

### 3. OpenCode

OpenCode jest interaktywnym agentem CLI zaprojektowanym do zadań inżynierii oprogramowania. Intlayer udostępnia konkretne umiejętności, które pomagają OpenCode w zadaniach związanych z internacjonalizacją (i18n).

### 4. Claude Code

Claude Code można skonfigurować do korzystania z umiejętności Intlayer, dodając wygenerowane pliki konfiguracyjne do jego ustawień desktopowych lub ustawień CLI.
