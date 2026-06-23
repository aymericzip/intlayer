---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentasi Hook usePathname | solid-intlayer
description: Lihat cara menggunakan hook usePathname dari paket solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
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

# Integrasi Solid: Dokumentasi Hook `usePathname`

Hook `usePathname` mengembalikan pathname browser saat ini dengan segmen locale yang telah dihapus, sebagai Solid `Accessor<string>`. Ini berguna untuk membangun navigasi yang sadar-locale — misalnya, menentukan item navigasi mana yang aktif — tanpa harus menghapus awalan locale secara manual.

## Mengimpor `usePathname` di Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Ringkasan

`usePathname` membuat sinyal reaktif yang diinisialisasi dari `window.location.pathname`, menghapus awalan locale melalui `getPathWithoutLocale`, dan memperbarui sinyal setiap kali browser memicu event `popstate` (navigasi kembali/maju). Event listener dibersihkan secara otomatis melalui `onCleanup`.

## Penggunaan

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Nilai Kembalian

| Tipe               | Deskripsi                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor Solid (getter reaktif) yang mengembalikan pathname saat ini tanpa awalan locale. |

## Perilaku

- **Penghapusan Locale**: Menghapus segmen locale di awal (misal: `/id/dashboard` → `/dashboard`).
- **Reaktif**: Memperbarui secara otomatis pada event `popstate` (navigasi kembali / maju browser).
- **Aman untuk SSR**: Mengembalikan `""` saat `window` tidak tersedia.
- **Pembersihan**: Listener `popstate` dihapus secara otomatis melalui `onCleanup` milik Solid.

## Contoh

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Dasbor" },
  { href: "/settings", label: "Pengaturan" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## Terkait

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/useLocale.md) — locale saat ini + pengalih locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md) — utilitas dasar yang digunakan oleh hook ini
