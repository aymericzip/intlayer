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

# Навички агента

## Команда `intlayer init skills`

Команда `intlayer init skills`, це найпростіший спосіб налаштувати Agent Skills у вашому проєкті. Вона визначає ваше середовище й встановлює необхідні конфігураційні файли для обраних платформ.

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
