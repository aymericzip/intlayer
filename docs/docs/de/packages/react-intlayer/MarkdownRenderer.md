---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "Dokumentation der MarkdownRenderer-Komponente | react-intlayer"
description: "Anleitung zur Verwendung der MarkdownRenderer-Komponente des react-intlayer-Pakets"
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Dokumentation initialisiert
---

# Dokumentation der MarkdownRenderer-Komponente

Die `MarkdownRenderer`-Komponente rendert Markdown-Inhalte mit benutzerdefinierten Komponenten.

## Verwendung

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Props

| Prop         | Typ               | Beschreibung                                                                                        |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------- |
| `children`   | `string`          | Der zu rendernde Markdown-Inhalt.                                                                   |
| `components` | `Overrides`       | Eine Map mit benutzerdefinierten Komponenten, die für bestimmte Markdown-Elemente verwendet werden. |
| `options`    | `MarkdownOptions` | Zusätzliche Optionen für den Markdown-Renderer.                                                     |
