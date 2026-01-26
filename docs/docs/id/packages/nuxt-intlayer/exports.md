---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket nuxt-intlayer
description: Integrasi Nuxt untuk Intlayer, menyediakan modul untuk aplikasi Nuxt.
keywords:
  - nuxt-intlayer
  - nuxt
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket nuxt-intlayer

Paket `nuxt-intlayer` menyediakan modul Nuxt untuk mengintegrasikan Intlayer ke dalam proyek Nuxt Anda.

## Instalasi

```bash
npm install nuxt-intlayer
```

## Ekspor

### Modul

Paket `nuxt-intlayer` menyediakan modul Nuxt untuk mengintegrasikan Intlayer ke dalam proyek Nuxt Anda.

Import:

```tsx
import "nuxt-intlayer";
```

atau menambahkan ke `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Ekspor    | Tipe         | Deskripsi                                                         |
| --------- | ------------ | ----------------------------------------------------------------- |
| `default` | `NuxtModule` | Ekspor `default` adalah Nuxt module yang mengonfigurasi Intlayer. |
