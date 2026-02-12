---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: Навички агента
description: Дізнайтеся, як використовувати Intlayer Agent Skills, щоб покращити розуміння вашого проєкту вашим AI-агентом.
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
  - version: 8.0.4
    date: 2026-02-09
    changes: Ініціалізація
---

## Команда `intlayer init skills`

Команда `intlayer init skills` — це найпростіший спосіб налаштувати Agent Skills у вашому проєкті. Вона визначає ваше середовище й встановлює необхідні конфігураційні файли для обраних платформ.

```bash
npx intlayer init skills
```

Коли ви запускаєте цю команду, вона:

1.  Визначить фреймворк, який ви використовуєте (наприклад, Next.js, React, Vite).
2.  Запитає, для яких платформ ви хочете встановити навички (Cursor, VS Code, OpenCode, Claude Code тощо).
3.  Згенерує потрібні конфігураційні файли (наприклад, `.cursor/mcp.json`, `.vscode/mcp.json` або `.intlayer/skills/*.md`).

## Підтримувані платформи

Intlayer підтримує інтеграцію з такими платформами:

### 1. Cursor

Cursor підтримує MCP (Model Context Protocol) сервери. Запуск `intlayer init skills` створить файл `.cursor/mcp.json`, який дозволяє Cursor спілкуватися з MCP-сервером Intlayer.

### 2. VS Code

Для користувачів VS Code, особливо тих, хто використовує GitHub Copilot або інші розширення, сумісні з MCP, команда створює конфігурацію `.vscode/mcp.json`.

### 3. OpenCode

OpenCode — інтерактивний CLI-агент, призначений для завдань з розробки програмного забезпечення. Intlayer надає специфічні skills, щоб допомогти OpenCode у виконанні задач з інтернаціоналізації.

### 4. Claude Code

Claude Code можна налаштувати для використання skills Intlayer, додавши згенеровані конфігураційні файли до його настільних або CLI-налаштувань.
