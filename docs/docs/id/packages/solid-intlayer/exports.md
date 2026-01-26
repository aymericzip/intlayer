---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket solid-intlayer
description: Integrasi khusus untuk Solid dengan Intlayer, menyediakan providers dan hooks untuk aplikasi Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Menyatukan dokumentasi untuk semua ekspor
---

# Paket solid-intlayer

Paket `solid-intlayer` menyediakan alat yang diperlukan untuk mengintegrasikan Intlayer ke dalam aplikasi Solid. Paket ini menyertakan providers dan hooks untuk menangani konten multibahasa.

## Instalasi

```bash
npm install solid-intlayer
```

## Ekspor

### Provider

Impor:

```tsx
import "solid-intlayer";
```

| Komponen           | Deskripsi                                                                      | Dokumen Terkait                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Provider utama yang membungkus aplikasi Anda dan menyediakan konteks Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/IntlayerProvider.md) |

### Hooks

Impor:

```tsx
import "solid-intlayer";
```

| Hook                   | Deskripsi                                                                                                                             | Dokumentasi Terkait                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Berdasarkan `useDictionary`, tetapi menyuntikkan versi dictionary yang dioptimalkan dari deklarasi yang dihasilkan.                   | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Memproses objek yang terlihat seperti dictionary (key, content). Memproses terjemahan `t()`, enumerations, dll.                       | -                                                                                                                       |
| `useDictionaryAsync`   | Sama seperti `useDictionary`, tetapi menangani dictionary asinkron.                                                                   | -                                                                                                                       |
| `useDictionaryDynamic` | Sama seperti `useDictionary`, tetapi menangani dictionary dinamis.                                                                    | -                                                                                                                       |
| `useLocale`            | Mengembalikan locale saat ini dan sebuah fungsi untuk mengaturnya.                                                                    | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook sisi-klien untuk mengelola penulisan ulang URL. Secara otomatis memperbarui URL jika aturan penulisan ulang yang dilokalkan ada. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Mengembalikan objek Intl untuk locale saat ini.                                                                                       | -                                                                                                                       |
| `useLoadDynamic`       | Hook untuk memuat kamus dinamis.                                                                                                      | -                                                                                                                       |
| `t`                    | Memilih konten berdasarkan locale saat ini.                                                                                           | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md)                  |

### Komponen

Impor:

```tsx
import "solid-intlayer";
```

| Komponen           | Deskripsi                                  |
| ------------------ | ------------------------------------------ |
| `MarkdownProvider` | Provider untuk konteks rendering markdown. |
