---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket vue-intlayer
description: Integrasi khusus Vue untuk Intlayer, menyediakan plugin dan composables untuk aplikasi Vue.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket vue-intlayer

Paket `vue-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Vue. Paket ini mencakup plugin Vue dan composables untuk menangani konten multibahasa.

## Instalasi

```bash
npm install vue-intlayer
```

## Ekspor

### Plugin

Impor:

```tsx
import "vue-intlayer";
```

| Fungsi            | Deskripsi                                            |
| ----------------- | ---------------------------------------------------- |
| `installIntlayer` | Plugin Vue untuk memasang Intlayer di aplikasi Anda. |

### Composables

Impor:

```tsx
import "vue-intlayer";
```

| Composable             | Deskripsi                                                                                                                                      | Dokumen Terkait                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Berdasarkan `useDictionary`, tetapi menyuntikkan versi dictionary yang dioptimalkan dari deklarasi yang dihasilkan.                            | -                                                                                                                     |
| `useDictionary`        | Memproses objek yang tampak seperti dictionary (key, content). Ini memproses terjemahan `t()`, enumerations, dll.                              | -                                                                                                                     |
| `useDictionaryAsync`   | Sama seperti `useDictionary`, tetapi menangani kamus asinkron.                                                                                 | -                                                                                                                     |
| `useDictionaryDynamic` | Sama seperti `useDictionary`, tetapi menangani kamus dinamis.                                                                                  | -                                                                                                                     |
| `useLocale`            | Mengembalikan locale saat ini dan fungsi untuk mengaturnya.                                                                                    | -                                                                                                                     |
| `useRewriteURL`        | Composable di sisi klien untuk mengelola penulisan ulang URL. Secara otomatis memperbarui URL jika ada aturan penulisan ulang yang dilokalkan. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Mengembalikan objek Intl untuk locale saat ini.                                                                                                | -                                                                                                                     |
| `useLoadDynamic`       | Composable untuk memuat dictionary dinamis.                                                                                                    | -                                                                                                                     |

### Fungsi

Impor:

```tsx
import "vue-intlayer";
```

| Fungsi          | Deskripsi                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Memproses objek yang menyerupai kamus (key, content). Ia memproses terjemahan `t()`, enumerasi, dll.                |
| `getIntlayer`   | Berdasarkan `getDictionary`, tetapi menyuntikkan versi yang dioptimalkan dari kamus dari deklarasi yang dihasilkan. |

### Markdown

Impor:

```tsx
import "vue-intlayer/markdown";
```

| Fungsi                    | Deskripsi                                                       |
| ------------------------- | --------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue untuk menginstal Intlayer Markdown di aplikasi Anda. |
