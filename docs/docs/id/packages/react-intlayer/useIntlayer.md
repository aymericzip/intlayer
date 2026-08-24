---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Hook useIntlayer | react-intlayer
description: Lihat cara menggunakan hook useIntlayer untuk paket react-intlayer
keywords:
  - useIntlayer
  - kamus
  - kunci
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Dokumentasi Hook useIntlayer

Hook `useIntlayer` memungkinkan Anda untuk mengambil konten terlokalisasi dari kamus menggunakan kuncinya. Hook ini didasarkan pada `useDictionary` tetapi secara otomatis menyuntikkan versi yang dioptimalkan dari kamus dari deklarasi yang dihasilkan.

## Contoh Penggunaan di React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Sumber Daya Tambahan

- **Intlayer Visual Editor**: Untuk pengalaman manajemen konten yang lebih intuitif, lihat dokumentasi editor visual [di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Bagian ini secara khusus menargetkan integrasi hook `useIntlayer` dalam aplikasi React, menyederhanakan proses lokalisasi dan memastikan konsistensi konten di berbagai locale.
