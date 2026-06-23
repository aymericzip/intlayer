---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentasi Fungsi usePathname | vue-intlayer
description: Pelajari cara menggunakan fungsi usePathname dari paket vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# Integrasi Vue: Dokumentasi `usePathname`

Fungsi `usePathname` mengembalikan pathname browser saat ini dengan segmen locale yang dihapus, dalam bentuk Vue `ComputedRef<string>`. Ini berguna untuk membangun navigasi yang sadar-locale — misalnya, untuk menentukan item navigasi mana yang sedang aktif — tanpa harus menghapus awalan locale secara manual.

## Mengimpor `usePathname` di Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Ikhtisar

`usePathname` membuat referensi terkomputasi (computed ref) Vue yang membaca `window.location.pathname`, menghapus awalan locale melalui `getPathWithoutLocale`, dan memperbarui nilainya setiap kali browser memicu peristiwa `popstate` (navigasi mundur/maju). Nilai ini dapat digunakan langsung di dalam template Vue atau fungsi setup Anda.

## Penggunaan

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Nilai Kembalian

| Tipe                  | Deskripsi                                                                   |
| --------------------- | --------------------------------------------------------------------------- |
| `ComputedRef<string>` | Computed Ref Vue yang berisi pathname browser saat ini tanpa awalan locale. |

## Perilaku

- **Penghapusan Locale (Locale stripping)**: Menghapus segmen locale di depan (misalnya `/id/dashboard` → `/dashboard`).
- **Reaktif**: Memperbarui nilai pada setiap peristiwa `popstate` (navigasi mundur / maju pada browser).
- **Aman untuk SSR**: Mengembalikan `""` saat `window` tidak tersedia.
- **Pembersihan (Cleanup)**: Pendengar `popstate` ditambahkan secara global pada saat inisialisasi dan umumnya tidak memerlukan pembersihan manual per-komponen, berkat cara Vue mengelola siklus hidup komponennya.

## Contoh

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Dasbor" },
  { href: "/settings", label: "Pengaturan" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## Terkait

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vue-intlayer/useLocale.md) — locale saat ini + pengalih locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md) — utilitas dasar yang digunakan oleh hook ini
