---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: MarkdownRenderer Bileşen Dokümantasyonu | react-intlayer
description: react-intlayer paketi için MarkdownRenderer bileşeninin nasıl kullanılacağını görün
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Doküman başlatıldı
---

# MarkdownRenderer Bileşen Dokümantasyonu

`MarkdownRenderer` bileşeni, markdown içeriğini özel bileşenlerle render eder.

## Kullanım

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Özellikler

| Prop         | Type              | Description                                                                |
| ------------ | ----------------- | -------------------------------------------------------------------------- |
| `children`   | `string`          | Render edilecek markdown içeriği.                                          |
| `components` | `Overrides`       | Belirli markdown öğeleri için kullanılacak özel bileşenlerin bir haritası. |
| `options`    | `MarkdownOptions` | Markdown renderer için ek seçenekler.                                      |
