---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du composant MarkdownRenderer | react-intlayer
description: Découvrez comment utiliser le composant MarkdownRenderer du package react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
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

# Documentation du composant MarkdownRenderer

Le composant `MarkdownRenderer` affiche du contenu markdown avec des composants personnalisés.

## Utilisation

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Propriétés

| Propriété    | Type              | Description                                                                            |
| ------------ | ----------------- | -------------------------------------------------------------------------------------- |
| `children`   | `string`          | Le contenu Markdown à rendre.                                                          |
| `components` | `Overrides`       | Une map de composants personnalisés à utiliser pour des éléments Markdown spécifiques. |
| `options`    | `MarkdownOptions` | Options supplémentaires pour le renderer Markdown.                                     |
