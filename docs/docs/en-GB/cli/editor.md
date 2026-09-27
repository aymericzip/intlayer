---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: Visual Editor CLI Commands"
description: "Start and configure the Intlayer visual editor from the CLI to edit your content in context, directly on your running application."
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

# Editor commands

The `editor` command wraps the `intlayer-editor` commands.

> To be able to use the `editor` command, the `intlayer-editor` package must be installed. (See [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md))

- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
