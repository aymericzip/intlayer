---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Dokumentasi React Intlayer
description: Panduan lengkap untuk menggunakan hook useDictionary dalam aplikasi React dengan Intlayer untuk penanganan konten lokal yang efisien tanpa editor visual.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - lokalisasi
  - i18n
  - kamus
  - terjemahan
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Riwayat awal"
author: aymericzip
---

# Integrasi React: Dokumentasi Hook `useDictionary`

Bagian ini memberikan panduan terperinci tentang penggunaan hook `useDictionary` dalam aplikasi React, memungkinkan penanganan konten lokal yang efisien tanpa editor visual.

## Contoh Penggunaan di React

Berikut adalah contoh cara menggunakan hook `useDictionary` dalam sebuah komponen React:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Tips Tambahan

- **Keamanan Tipe**: Selalu gunakan `Dictionary` untuk mendefinisikan kamus Anda agar memastikan keamanan tipe.
- **Pembaruan Lokalisasi**: Saat memperbarui konten, pastikan semua locale konsisten untuk menghindari terjemahan yang hilang.

Dokumentasi ini berfokus pada integrasi hook `useDictionary`, memberikan pendekatan yang lebih sederhana untuk mengelola konten yang dilokalisasi tanpa bergantung pada fungsi editor visual.
