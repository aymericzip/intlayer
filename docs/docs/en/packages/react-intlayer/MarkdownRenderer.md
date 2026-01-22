---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: MarkdownRenderer Component Documentation | react-intlayer
description: See how to use the MarkdownRenderer component for react-intlayer package
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internationalization
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

# MarkdownRenderer Component Documentation

The `MarkdownRenderer` component renders markdown content with custom components.

## Usage

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Props

| Prop         | Type              | Description                                                       |
| ------------ | ----------------- | ----------------------------------------------------------------- |
| `children`   | `string`          | The markdown content to render.                                   |
| `components` | `Overrides`       | A map of custom components to use for specific markdown elements. |
| `options`    | `MarkdownOptions` | Additional options for the markdown renderer.                     |
