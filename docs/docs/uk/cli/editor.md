---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: команди візуального редактора"
description: "Запускайте й налаштовуйте візуальний редактор Intlayer з CLI, щоб редагувати контент у контексті просто в застосунку."
keywords:
  - Editor
  - Visual Editor
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
author: aymericzip
---

# Команди редактора

Команда `editor` обгортає команди `intlayer-editor`.

> Щоб мати можливість використовувати команду `editor`, пакет `intlayer-editor` має бути встановлений. (Див. [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
