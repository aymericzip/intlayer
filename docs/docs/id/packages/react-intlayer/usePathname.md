---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentasi Hook usePathname | react-intlayer
description: Pelajari cara menggunakan hook usePathname dari paket react-intlayer untuk mendapatkan nama path URL saat ini tanpa segmen lokal (locale).
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internasionalisasi
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Tambahkan utilitas usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Integrasi React: Dokumentasi Hook `usePathname`

Hook `usePathname` dari `react-intlayer` mengembalikan nama path (pathname) browser saat ini dengan segmen locale yang dihapus. Hook ini bergantung pada properti `window.location.pathname` bawaan dan bereaksi terhadap peristiwa navigasi browser melalui `popstate`.

## Mengimpor `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Ringkasan

Tidak seperti hook perutean khusus kerangka kerja (seperti yang ada di `next-intlayer` atau `react-router`), hook ini merupakan solusi ringan dan tidak bergantung pada kerangka kerja untuk aplikasi React murni. Hook ini mengekstrak URL saat ini dan menghapus awalan locale yang cocok (misalnya, `/id/about` menjadi `/about`).

## Penggunaan

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Beranda
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        Tentang
      </a>
    </nav>
  );
};

export default Navigation;
```

## Nilai Kembali

| Tipe     | Deskripsi                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------- |
| `string` | Pathname browser saat ini dengan awalan locale dihapus (misalnya: `/id/dashboard` → `/dashboard`). |

## Perilaku

- **Penghapusan Locale**: Di balik layar, ia menggunakan utilitas `getPathWithoutLocale` untuk secara otomatis mendeteksi dan menghapus locale dari pathname berdasarkan konfigurasi Intlayer aplikasi.
- **Reaktivitas**: Mendengarkan event `popstate`. Ketika pengguna bernavigasi menggunakan tombol maju/mundur browser atau ketika `pushState`/`replaceState` dipanggil, hook memperbarui pathname yang dikembalikan.
- **SSR Fallback**: Pada server (di mana `window` tidak terdefinisi), secara default mengembalikan `/` karena tidak memiliki akses ke URL permintaan secara default dalam konteks React murni.

## Dokumentasi Terkait

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md)
