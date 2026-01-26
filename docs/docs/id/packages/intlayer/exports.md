---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket intlayer
description: Paket inti Intlayer, menyediakan fungsi dasar dan tipe untuk internasionalisasi.
keywords:
  - intlayer
  - inti
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Paket intlayer

Package `intlayer` adalah library inti dari ekosistem Intlayer. Paket ini menyediakan fungsi, tipe, dan utilitas esensial untuk mengelola konten multibahasa dalam aplikasi JavaScript dan TypeScript.

## Instalasi

```bash
npm install intlayer
```

## Ekspor

### Konfigurasi

Impor:

```tsx
import "intlayer";
```

| Variabel           | Tipe                   | Deskripsi                                                                                            | Dokumen Terkait                                                                                                         |
| ------------------ | ---------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Objek konfigurasi Intlayer.                                                                          | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Mengembalikan objek konfigurasi Intlayer. (**Deprecated**: Gunakan `configuration` sebagai gantinya) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | Daftar semua locales yang didukung.                                                                  | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | Daftar semua locales yang diperlukan.                                                                | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | Locale bawaan.                                                                                       | -                                                                                                                       |

### Tipe

Impor:

```tsx
import "intlayer";
```

| Tipe                  | Deskripsi                                                                  |
| --------------------- | -------------------------------------------------------------------------- |
| `Dictionary`          | Tipe Dictionary yang digunakan untuk mendefinisikan struktur sebuah kamus. |
| `DeclarationContent`  | (**Deprecated**) Gunakan `Dictionary<T>` sebagai gantinya.                 |
| `IntlayerConfig`      | Tipe yang mendefinisikan konfigurasi Intlayer.                             |
| `ContentNode`         | Sebuah node dalam konten kamus.                                            |
| `Locale`              | Tipe yang merepresentasikan sebuah locale.                                 |
| `LocalesValues`       | Nilai yang mungkin untuk sebuah locale.                                    |
| `StrictModeLocaleMap` | Peta locale dengan pemeriksaan tipe yang ketat.                            |

### Fungsi Konten

Impor:

```tsx
import "intlayer";
```

| Fungsi                   | Tipe       | Deskripsi                                                                                                         | Dokumen Terkait                                                                                        |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | Memilih konten berdasarkan locale saat ini.                                                                       | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Memilih konten berdasarkan jumlah.                                                                                | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Memilih konten berdasarkan kondisi boolean.                                                                       | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/condition.md)     |
| `gender`                 | `Function` | Memilih konten berdasarkan gender.                                                                                | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md)           |
| `insert`                 | `Function` | Menyisipkan nilai ke dalam string konten.                                                                         | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md)     |
| `nest` / `getNesting`    | `Function` | Menyematkan kamus lain.                                                                                           | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/nesting.md)         |
| `md`                     | `Function` | Memproses konten Markdown.                                                                                        | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)       |
| `html`                   | `Function` | Memproses konten HTML.                                                                                            | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/html.md)               |
| `file`                   | `Function` | Menangani konten file.                                                                                            | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/file.md)               |
| `getDictionary`          | `Function` | Memproses objek yang menyerupai dictionary (key, content). Ia memproses terjemahan `t()`, enumerasi, dll.         | -                                                                                                      |
| `getIntlayer`            | `Function` | Berdasarkan `getDictionary`, tetapi memasukkan versi dictionary yang dioptimalkan dari deklarasi yang dihasilkan. | -                                                                                                      |

### Utilitas Lokalisasi

Impor:

```tsx
import "intlayer";
```

| Function               | Type       | Description                                         | Related Doc                                                                                                                     |
| ---------------------- | ---------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Mendeteksi locale dari string atau path.            | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Mengambil bagian bahasa dari sebuah locale.         | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Mengambil nama tampilan dari sebuah locale.         | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Mengubah path kanonik menjadi versi terlokalisasi.  | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Menyelesaikan path yang dilokalkan menjadi kanonis. | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Menghasilkan URL yang dilokalkan.                   | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Menghasilkan URL untuk semua locale yang didukung.  | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Menghapus prefix locale dari path.                  | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Mengambil prefix locale dari path.                  | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Mengambil arah teks (LTR/RTL).                      | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Memvalidasi prefix locale.                          | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/validatePrefix.md)             |

### Utilitas Browser

Impor:

```tsx
import "intlayer";
```

| Fungsi                 | Tipe       | Deskripsi                                    |
| ---------------------- | ---------- | -------------------------------------------- |
| `getBrowserLocale`     | `Function` | Mendeteksi locale yang dipilih oleh browser. |
| `getCookie`            | `Function` | Mengambil nilai cookie.                      |
| `getLocaleFromStorage` | `Function` | Mengambil locale dari penyimpanan.           |
| `setLocaleInStorage`   | `Function` | Menyimpan locale ke penyimpanan.             |

### Pemformat

Impor:

```tsx
import "intlayer";
```

| Function       | Deskripsi                             |
| -------------- | ------------------------------------- |
| `number`       | Memformat angka.                      |
| `currency`     | Memformat nilai mata uang.            |
| `percentage`   | Memformat persentase.                 |
| `compact`      | Memformat angka dalam bentuk ringkas. |
| `date`         | Memformat tanggal.                    |
| `relativeTime` | Memformat waktu relatif.              |
| `units`        | Memformat nilai dengan satuan.        |
| `Intl`         | Objek Intl standar.                   |
