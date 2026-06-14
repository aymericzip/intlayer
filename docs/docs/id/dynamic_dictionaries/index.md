---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Kamus Dinamis
description: Gambaran umum tentang tiga fitur kamus dinamis Intlayer — koleksi, varian, dan catatan dinamis — untuk membangun konten i18n yang fleksibel dan didorong oleh runtime.
keywords:
  - Kamus Dinamis
  - Koleksi
  - Varian
  - Catatan Dinamis
  - Intlayer
  - Internasionalisasi
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Rilis fitur kamus dinamis"
author: aymericzip
---

# Kamus Dinamis

Intlayer mendukung tiga mekanisme untuk mengekspresikan konten yang melampaui satu kamus statis per kunci. Masing-masing dideklarasikan melalui **bidang metadata tingkat atas** dalam file konten; tidak ada fungsi pembungkus (wrapper) yang diperlukan.

| Fitur                                                                                                                    | Bidang metadata   | Selektor dalam `useIntlayer` |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------- | ---------------------------- |
| [Koleksi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/collections.md)             | `item: N`         | `{ item: N }`                |
| [Varian](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/variants.md)                 | `variant: "name"` | `{ variant: "name" }`        |
| [Catatan Dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }` | `{ id, … }`                  |

Ketiganya disusun dengan argumen lokalitas dan mendukung pemuatan selektif / malas (lazy loading) melalui `importMode`.

## Kapan menggunakan yang mana

- **Koleksi** — daftar item terurut yang dikelola dalam file terpisah (entri FAQ, postingan blog, produk).
- **Varian** — alternatif konten bernama untuk pengujian A/B, spanduk musiman, atau bendera fitur (feature flags).
- **Catatan dinamis** — konten yang diambil saat runtime menggunakan ID buram (catatan CMS, salinan khusus pengguna).

## Resolusi Konflik Selektor

Ketika ada beberapa selektor pada satu kamus, urutan resolusinya adalah:

```
variant → meta → item
```
