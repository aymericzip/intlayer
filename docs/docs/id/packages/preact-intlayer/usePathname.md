---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentasi Hook usePathname | preact-intlayer
description: Lihat bagaimana cara menggunakan hook usePathname pada paket preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Tambahkan utilitas usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inisialisasi history"
author: aymericzip
---

# Integrasi Preact: Dokumentasi Hook `usePathname`

Hook `usePathname` mengembalikan pathname browser saat ini dengan segmen locale yang telah dihilangkan. Hal ini berguna untuk membangun navigasi yang peka terhadap locale — misalnya, menentukan item navigasi mana yang aktif — tanpa harus menghilangkan awalan locale secara manual.

## Mengimpor `usePathname` di Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Gambaran Umum

`usePathname` membaca `window.location.pathname`, menghilangkan awalan locale melalui `getPathWithoutLocale`, dan merender ulang komponen setiap kali browser memicu event `popstate` (navigasi kembali/maju). Hook ini mengembalikan string kosong selama proses Server-Side Rendering (SSR).

## Penggunaan

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

## Nilai Kembalian

| Tipe     | Deskripsi                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------- |
| `string` | Pathname saat ini tanpa awalan locale. String kosong selama proses Server-Side Rendering (SSR). |

## Perilaku

- **Penghilangan Locale (Locale stripping)**: Menghilangkan segmen locale di awal URL (misalnya `/id/dashboard` → `/dashboard`).
- **Reaktif**: Memperbarui secara otomatis saat event `popstate` (navigasi kembali / maju pada browser).
- **Aman untuk SSR (SSR-safe)**: Mengembalikan `""` ketika `window` tidak tersedia.
- **Pembersihan (Cleanup)**: Listener `popstate` dihapus secara otomatis saat komponen di-unmount.

## Contoh

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Dasbor" },
  { href: "/settings", label: "Pengaturan" },
];

const Sidebar: FunctionComponent = () => {
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

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/preact-intlayer/exports.md) — locale saat ini + pengubah locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md) — utilitas dasar yang digunakan oleh hook ini
