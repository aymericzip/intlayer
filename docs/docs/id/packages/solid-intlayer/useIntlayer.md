---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Hook useIntlayer | solid-intlayer
description: Lihat cara menggunakan hook useIntlayer untuk paket solid-intlayer
keywords:
  - useIntlayer
  - kamus
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Dokumentasi Hook useIntlayer

Hook `useIntlayer` memungkinkan Anda mengambil konten yang dilokalkan dari sebuah kamus menggunakan kuncinya. Di Solid, hook ini mengembalikan fungsi **accessor** reaktif yang akan diperbarui setiap kali locale berubah.

## Penggunaan

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Deskripsi

Hook ini melakukan tugas-tugas berikut:

1. **Locale Detection**: Ia menggunakan locale saat ini dari konteks `IntlayerProvider`.
2. **Dictionary Injection**: Ia secara otomatis menyuntikkan isi kamus yang sesuai dengan key yang diberikan, menggunakan deklarasi teroptimasi yang dihasilkan oleh compiler Intlayer.
3. **Reactivity**: Ia mengembalikan sebuah accessor Solid (`Accessor<T>`) yang secara otomatis dievaluasi ulang ketika state locale global berubah.
4. **Pemrosesan Terjemahan**: ia menyelesaikan konten berdasarkan locale yang terdeteksi, memproses setiap definisi `t()`, `enu()`, dll., yang ditemukan dalam dictionary.

## Parameter

- **key**: Kunci unik dari dictionary (seperti yang didefinisikan dalam file deklarasi konten Anda).
- **locale** (opsional): Menimpa locale saat ini.

## Mengembalikan

Sebuah fungsi accessor (`() => Content`) yang mengembalikan konten terlokalisasi.
