---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket astro-intlayer
description: Integrasi Astro untuk Intlayer, menyediakan pengaturan untuk routing berbasis locale dan manajemen kamus.
keywords:
  - astro-intlayer
  - astro
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Paket astro-intlayer

Paket `astro-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Astro. Paket ini mengonfigurasi routing berbasis locale dan manajemen kamus.

## Instalasi

```bash
npm install astro-intlayer
```

## Ekspor

### Integrasi

Paket `astro-intlayer` menyediakan integrasi Astro untuk menyiapkan Intlayer dalam proyek Anda.

Impor:

```tsx
import "astro-intlayer";
```

atau menambahkannya ke `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Fungsi     | Deskripsi                                                   |
| ---------- | ----------------------------------------------------------- |
| `intlayer` | Integrasi Astro yang menyiapkan Intlayer dalam proyek Anda. |
