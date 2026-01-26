---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del componente MarkdownRenderer | react-intlayer
description: Scopri come utilizzare il componente MarkdownRenderer per il pacchetto react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Doc iniziale
---

# Documentazione del componente MarkdownRenderer

Il componente `MarkdownRenderer` renderizza contenuti Markdown con componenti personalizzati.

## Utilizzo

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Proprietà

| Proprietà    | Tipo              | Descrizione                                                                      |
| ------------ | ----------------- | -------------------------------------------------------------------------------- |
| `children`   | `string`          | Il contenuto Markdown da renderizzare.                                           |
| `components` | `Overrides`       | Una mappa di componenti personalizzati da usare per elementi Markdown specifici. |
| `options`    | `MarkdownOptions` | Opzioni aggiuntive per il renderer Markdown.                                     |
