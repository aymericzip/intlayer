---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: polecenia edytora wizualnego"
description: "Uruchamiaj i konfiguruj edytor wizualny Intlayer z CLI, aby edytować treść w kontekście, bezpośrednio w działającej aplikacji."
keywords:
  - Edytor
  - Edytor wizualny
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
author: aymericzip
---

# Polecenia edytora

Polecenie `editor` opakowuje polecenia `intlayer-editor`.

> Aby móc używać polecenia `editor`, pakiet `intlayer-editor` musi być zainstalowany. (Zobacz [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
