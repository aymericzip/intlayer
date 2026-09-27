---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor : commandes de l'éditeur visuel"
description: "Lancez et configurez l'éditeur visuel Intlayer depuis la CLI pour modifier votre contenu en contexte, directement sur votre application."
keywords:
  - Éditeur
  - Éditeur Visuel
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
author: aymericzip
---

# Commandes de l'éditeur

La commande `editor` encapsule à nouveau les commandes `intlayer-editor`.

> Pour pouvoir utiliser la commande `editor`, le package `intlayer-editor` doit être installé. (Voir [Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md))

- [Éditeur Visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md)

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
