---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: команды визуального редактора"
description: "Запускайте и настраивайте визуальный редактор Intlayer из CLI, чтобы редактировать контент в контексте прямо в работающем приложении."
keywords:
  - Редактор
  - Визуальный редактор
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
author: aymericzip
---

# Команды редактора

Команда `editor` оборачивает команды `intlayer-editor`.

> Чтобы иметь возможность использовать команду `editor`, должен быть установлен пакет `intlayer-editor`. (См. [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md))

- [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
