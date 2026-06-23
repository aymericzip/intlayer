---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentasi Hook usePathname | next-intlayer
description: Pelajari cara menggunakan hook usePathname untuk paket next-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Menambahkan utilitas usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Integrasi Next.js: Dokumentasi Hook `usePathname`

Hook `usePathname` mengembalikan pathname Next.js saat ini dengan segmen lokal (locale) yang telah dihapus. Ini berguna untuk membangun navigasi yang menyadari lokal — misalnya, menentukan item navigasi mana yang aktif — tanpa harus secara manual menghapus awalan (prefix) lokal.

## Mengimpor `usePathname` di Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Ringkasan

`usePathname` membungkus `usePathname()` bawaan Next.js dari `next/navigation`, menambahkan parameter pencarian (search params), dan menghapus awalan lokal melalui `getPathWithoutLocale`. Ia memicu proses render ulang pada setiap navigasi sisi klien (client-side). Hook ini hanya tersedia di Client Components (memerlukan `"use client"`).

## Penggunaan

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Nilai Kembalian (Return Value)

| Tipe     | Deskripsi                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `string` | Pathname saat ini tanpa awalan lokal dan tanpa parameter kueri (query params) yang terkait dengan lokal. |

## Perilaku

- **Penghapusan lokal**: Menghapus segmen lokal di awal (contoh: `/id/dashboard` → `/dashboard`).
- **Penghapusan parameter pencarian**: Juga menghapus parameter kueri `?locale=...` saat menggunakan mode routing berbasis parameter pencarian.
- **Reaktif**: Secara otomatis memperbarui nilai pada setiap navigasi sisi klien melalui Next.js App Router.
- **Aman untuk SSR**: Mengembalikan pathname sisi server selama proses render pertama, kemudian menyinkronkan parameter pencarian pada klien.

## Perbandingan dengan `useLocale`

`useLocale` dari `next-intlayer` sudah mengekspos `pathWithoutLocale` sebagai bagian dari nilai kembaliannya. Gunakan `usePathname` ketika Anda hanya membutuhkan pathname dan tidak membutuhkan fungsionalitas pergantian bahasa (locale-switching).

```tsx codeFormat={["typescript", "esm"]}
// Ketika Anda membutuhkan status lokal dan pathname:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Ketika Anda hanya membutuhkan pathname:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Contoh

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Dasbor" },
  { href: "/settings", label: "Pengaturan" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## Terkait

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md) — lokal saat ini + pengalih lokal (juga mengekspos `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md) — utilitas dasar yang digunakan oleh hook ini
