---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del componente MarkdownRenderer | react-intlayer
description: Vea cómo usar el componente MarkdownRenderer para el paquete react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internationalization
  - Documentación
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Doc inicial
---

# Documentación del componente MarkdownRenderer

El componente `MarkdownRenderer` renderiza contenido Markdown con componentes personalizados.

## Uso

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># Mi título Mi contenido</MarkdownRenderer>
);
```

## Props

| Propiedad    | Tipo              | Descripción                                                                        |
| ------------ | ----------------- | ---------------------------------------------------------------------------------- |
| `children`   | `string`          | El contenido Markdown a renderizar.                                                |
| `components` | `Overrides`       | Un mapa de componentes personalizados para usar en elementos markdown específicos. |
| `options`    | `MarkdownOptions` | Opciones adicionales para el renderer de Markdown.                                 |
