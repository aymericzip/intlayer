---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do Componente MarkdownRenderer | react-intlayer
description: Veja como usar o componente MarkdownRenderer do pacote react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Init doc
---

# Documentação do Componente MarkdownRenderer

O componente `MarkdownRenderer` renderiza conteúdo markdown com componentes personalizados.

## Uso

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># Meu Título Meu conteúdo</MarkdownRenderer>
);
```

## Props

| Prop         | Tipo              | Descrição                                                                             |
| ------------ | ----------------- | ------------------------------------------------------------------------------------- |
| `children`   | `string`          | O conteúdo Markdown a ser renderizado.                                                |
| `components` | `Overrides`       | Um mapa de componentes personalizados para usar em elementos específicos do Markdown. |
| `options`    | `MarkdownOptions` | Opções adicionais para o renderizador de Markdown.                                    |
