---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor: comandos del editor visual"
description: "Inicia y configura el editor visual de Intlayer desde la CLI para editar tu contenido en contexto, directamente sobre tu aplicación."
keywords:
  - Editor
  - Editor Visual
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
author: aymericzip
---

# Comandos del editor

El comando `editor` envuelve nuevamente los comandos de `intlayer-editor`.

> Para poder usar el comando `editor`, el paquete `intlayer-editor` debe estar instalado. (Ver [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md))

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
