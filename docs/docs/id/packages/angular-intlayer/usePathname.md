---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentasi Hook usePathname | angular-intlayer
description: Lihat cara menggunakan hook usePathname untuk paket angular-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
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

# Integrasi Angular: Dokumentasi Hook `usePathname`

Hook `usePathname` mengembalikan pathname peramban saat ini dengan segmen lokal dihapus, sebagai Angular `Signal<string>`. Ini berguna untuk membangun navigasi yang sadar lokal — misalnya, menentukan item navigasi mana yang aktif — tanpa harus menghapus awalan lokal secara manual.

## Mengimpor `usePathname` di Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Ikhtisar

`usePathname` membaca `window.location.pathname`, menghapus awalan lokal melalui `getPathWithoutLocale`, dan memperbarui sinyal setiap kali peramban memicu peristiwa `popstate` (navigasi kembali/maju). Ia menggunakan `DestroyRef` dari Angular untuk membersihkan event listener secara otomatis saat komponen dihancurkan.

## Penggunaan

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## Nilai Kembalian

| Tipe             | Deskripsi                                                        |
| ---------------- | ---------------------------------------------------------------- |
| `Signal<string>` | Sinyal Angular yang berisi pathname saat ini tanpa awalan lokal. |

## Perilaku

- **Penghapusan lokal**: Menghapus segmen lokal di depan (mis. `/id/dashboard` → `/dashboard`).
- **Reaktif**: Memperbarui secara otomatis pada peristiwa `popstate` (navigasi mundur / maju browser).
- **Aman untuk SSR**: Mengembalikan `""` saat `window` tidak tersedia.
- **Pembersihan**: Listener `popstate` dihapus melalui `DestroyRef.onDestroy` saat komponen host dihancurkan.

## Contoh

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "Dasbor" },
    { href: "/settings", label: "Pengaturan" },
  ];

  readonly pathname = usePathname();
}
```

## Terkait

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/angular-intlayer/exports.md) — lokal saat ini + pengalih lokal
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md) — utilitas dasar yang digunakan oleh hook ini
