---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: Befehle für den visuellen Editor"
description: "Starten und konfigurieren Sie den visuellen Intlayer-Editor über die CLI, um Inhalte im Kontext direkt in Ihrer laufenden App zu bearbeiten."
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
author: aymericzip
---

# Editor-Befehle

Der Befehl `editor` kapselt die `intlayer-editor` Befehle neu ein.

> Um den Befehl `editor` verwenden zu können, muss das Paket `intlayer-editor` installiert sein. (Siehe [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md))

- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
