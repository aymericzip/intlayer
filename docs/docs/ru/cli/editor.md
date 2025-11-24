---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Команды редактора
description: Узнайте, как использовать команды редактора Intlayer.
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
---

# Команды редактора

Команда `editor` оборачивает команды `intlayer-editor`.

> Чтобы иметь возможность использовать команду `editor`, должен быть установлен пакет `intlayer-editor`. (См. [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
