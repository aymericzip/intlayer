---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Komponen MarkdownRenderer | react-intlayer
description: Lihat cara menggunakan komponen MarkdownRenderer untuk paket react-intlayer
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

# Dokumentasi Komponen MarkdownRenderer

Komponen `MarkdownRenderer` merender konten markdown dengan komponen kustom.

## Penggunaan

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Properti

| Prop         | Tipe              | Deskripsi                                                           |
| ------------ | ----------------- | ------------------------------------------------------------------- |
| `children`   | `string`          | Konten markdown yang akan dirender.                                 |
| `components` | `Overrides`       | Peta komponen kustom yang digunakan untuk elemen markdown tertentu. |
| `options`    | `MarkdownOptions` | Opsi tambahan untuk renderer markdown.                              |
