---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Editor-Befehle
description: Erfahren Sie, wie Sie die Intlayer-Editor-Befehle verwenden.
keywords:
  - Editor
  - Visueller Editor
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
---

# Editor-Befehle

Der Befehl `editor` kapselt die `intlayer-editor` Befehle neu ein.

> Um den Befehl `editor` verwenden zu können, muss das Paket `intlayer-editor` installiert sein. (Siehe [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
