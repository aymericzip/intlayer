---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Навички агента
description: Дізнайтеся, як використовувати Intlayer Agent Skills, щоб покращити розуміння вашого проєкту вашим AI-агентом, включаючи вичерпні посібники з налаштування метаданих, карт сайту та серверних дій.
keywords:
  - Intlayer
  - Agent Skills
  - AI-агент
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Ініціалізація
---

## Команда `intlayer init skills`

Команда `intlayer init skills` — це найпростіший спосіб налаштувати Agent Skills у вашому проєкті. Вона визначає ваше середовище й встановлює необхідні конфігураційні файли для обраних платформ.

```bash
npx intlayer init skills
```

Або використовуючи Vercel Skill SDK

```bash
npx skills add aymericzip/intlayer-skills
```

Коли ви запускаєте цю команду, вона:

1.  Визначить фреймворк, який ви використовуєте (наприклад, Next.js, React, Vite).
2.  Запитає, для яких платформ ви хочете встановити навички (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace тощо).
3.  Згенерує потрібні конфігураційні файли (наприклад, `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json` тощо).

## Підтримувані платформи

Intlayer надає документацію для конкретних фреймворків (налаштування, використання, метадані, карта сайту, серверні дії тощо), щоб допомогти AI-агенту зрозуміти, як працювати з Intlayer у вашому конкретному проєкті. Ці навички розроблені для того, щоб вести агента крізь складнощі інтернаціоналізації, забезпечуючи дотримання правильних шаблонів та найкращих практик.

Intlayer підтримує інтеграцію з такими платформами:

### 1. Cursor

Cursor підтримує MCP (Model Context Protocol) сервери та користувацькі навички (custom skills). Запуск `intlayer init skills`:

- Створить файл `.cursor/mcp.json` для зв'язку з MCP-сервером Intlayer.
- Встановить навички для конкретного фреймворку в директорію `.cursor/skills`.

### 2. Windsurf

Windsurf — це AI-IDE. Запуск `intlayer init skills` встановить навички для конкретного фреймворку в директорію `.windsurf/skills`.

### 3. VS Code

Для користувачів VS Code, особливо тих, хто використовує GitHub Copilot або інші розширення, сумісні з MCP, команда:

- Створює конфігурацію `.vscode/mcp.json`.
- Встановлює навички для конкретного фреймворку в директорію `skills/` у корені вашого проєкту.

### 4. OpenCode

OpenCode — інтерактивний CLI-агент, призначений для завдань з розробки програмного забезпечення. Intlayer надає специфічні навички, щоб допомогти OpenCode у виконанні ваших задач з інтернаціоналізації. Вони встановлюються в директорію `.opencode/skills`.

### 5. Claude Code

Claude Code можна налаштувати для використання навичок Intlayer. Команда встановлює навички для конкретного фреймворку в директорію `.claude/skills`.

### 6. GitHub Copilot Workspace

GitHub Copilot Workspace дозволяє визначати користувацькі навички. Команда встановлює навички для конкретного фреймворку в директорію `.github/skills`.
