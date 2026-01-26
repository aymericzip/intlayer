---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja komponentu MarkdownRenderer | react-intlayer
description: Zobacz, jak używać komponentu MarkdownRenderer w pakiecie react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Inicjalizacja dokumentacji
---

# Dokumentacja komponentu MarkdownRenderer

Komponent `MarkdownRenderer` renderuje zawartość Markdown przy użyciu niestandardowych komponentów.

## Użycie

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Właściwości

| Właściwość   | Typ               | Opis                                                                            |
| ------------ | ----------------- | ------------------------------------------------------------------------------- |
| `children`   | `string`          | Zawartość markdown do renderowania.                                             |
| `components` | `Overrides`       | Mapa niestandardowych komponentów do użycia dla konkretnych elementów markdown. |
| `options`    | `MarkdownOptions` | Dodatkowe opcje dla renderera markdown.                                         |
