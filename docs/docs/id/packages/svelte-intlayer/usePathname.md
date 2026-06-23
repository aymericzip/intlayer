---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentasi Fungsi usePathname | svelte-intlayer
description: Pelajari cara menggunakan fungsi usePathname dari paket svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
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

# Integrasi Svelte: Dokumentasi `usePathname`

Fungsi `usePathname` mengembalikan pathname browser saat ini dengan segmen locale yang telah dihapus, dalam bentuk store Svelte `Readable<string>`. Ini berguna untuk membangun navigasi yang sadar akan locale — misalnya, menentukan item navigasi mana yang sedang aktif — tanpa harus menghapus awalan locale secara manual.

## Mengimpor `usePathname` di Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Gambaran Umum

`usePathname` membuat store Svelte yang dapat dibaca (readable) yang membaca `window.location.pathname`, menghapus awalan locale melalui `getPathWithoutLocale`, dan memancarkan nilai baru setiap kali browser memicu peristiwa `popstate` (navigasi mundur/maju). Berlanggananlah (subscribe) menggunakan sintaks store `$` di dalam komponen.

## Penggunaan

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## Nilai Kembalian

| Tipe               | Deskripsi                                                                    |
| ------------------ | ---------------------------------------------------------------------------- |
| `Readable<string>` | Store Svelte yang dapat dibaca berisi pathname saat ini tanpa awalan locale. |

## Perilaku

- **Penghapusan Locale**: Menghapus segmen locale di awal (misal: `/id/dashboard` → `/dashboard`).
- **Reaktif**: Memancarkan nilai baru setiap terjadi peristiwa `popstate` (navigasi mundur / maju pada browser).
- **Aman untuk SSR**: Mengembalikan `""` saat `window` tidak tersedia.
- **Pembersihan (Cleanup)**: Pendengar (listener) `popstate` dihapus secara otomatis ketika pelanggan (subscriber) terakhir berhenti berlangganan (unsubscribe).

## Contoh

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Dasbor" },
    { href: "/settings", label: "Pengaturan" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## Terkait

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/svelte-intlayer/useLocale.md) — locale saat ini + pengalih locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md) — utilitas dasar yang digunakan oleh hook ini
