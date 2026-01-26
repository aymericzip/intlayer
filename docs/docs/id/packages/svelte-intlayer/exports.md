---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket svelte-intlayer
description: Integrasi khusus Svelte untuk Intlayer, menyediakan fungsi penyiapan dan store untuk aplikasi Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket svelte-intlayer

Paket `svelte-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Svelte. Paket ini mencakup fungsi penyiapan dan store untuk menangani konten multibahasa.

## Instalasi

```bash
npm install svelte-intlayer
```

## Ekspor

### Penyiapan

Impor:

```tsx
import "svelte-intlayer";
```

| Fungsi          | Deskripsi                                                  |
| --------------- | ---------------------------------------------------------- |
| `setupIntlayer` | Fungsi untuk mengatur Intlayer dalam aplikasi Svelte Anda. |

### Store

Impor:

```tsx
import "svelte-intlayer";
```

| Store           | Deskripsi                                         |
| --------------- | ------------------------------------------------- |
| `intlayerStore` | Svelte store yang berisi state Intlayer saat ini. |

### Hooks (Konteks)

Impor:

```tsx
import "svelte-intlayer";
```

| Fungsi                 | Deskripsi                                                                                                                  | Dokumen Terkait                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Berdasarkan `useDictionary`, tetapi menyuntikkan versi kamus yang dioptimalkan dari deklarasi yang dihasilkan.             | -                                                                                                                        |
| `useDictionary`        | Memproses objek yang menyerupai dictionary (key, content). Ini memproses terjemahan `t()`, enumerasi, dll.                 | -                                                                                                                        |
| `useDictionaryAsync`   | Sama seperti `useDictionary`, tetapi menangani dictionary asinkron.                                                        | -                                                                                                                        |
| `useDictionaryDynamic` | Sama seperti `useDictionary`, tetapi menangani dictionary dinamis.                                                         | -                                                                                                                        |
| `useLocale`            | Mengembalikan locale saat ini dan sebuah fungsi untuk mengubahnya.                                                         | -                                                                                                                        |
| `useRewriteURL`        | Fungsi di sisi klien untuk mengelola rewrite URL. Secara otomatis memperbarui URL jika ada aturan rewrite yang dilokalkan. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Mengembalikan objek Intl untuk locale saat ini.                                                                            | -                                                                                                                        |

### Markdown

Impor:

```tsx
import "svelte-intlayer";
```

| Fungsi                | Deskripsi                                                          |
| --------------------- | ------------------------------------------------------------------ |
| `setIntlayerMarkdown` | Fungsi untuk mengatur konteks markdown dalam aplikasi Svelte Anda. |
