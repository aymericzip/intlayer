---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Kamus dinamis
description: Ikhtisar fitur kamus dinamis Intlayer — koleksi dan varian — untuk membangun konten i18n yang fleksibel dan digerakkan saat runtime.
keywords:
  - Kamus dinamis
  - Koleksi
  - Varian
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
  - version: 9.1.0
    date: 2026-06-26
    changes: "Menggabungkan record dinamis ke dalam varian — `variant` kini menerima string atau objek"
author: aymericzip
---

# Kamus dinamis

Intlayer mendukung dua mekanisme untuk mengekspresikan konten yang melampaui satu kamus statis per kunci. Masing-masing dideklarasikan melalui **field metadata tingkat atas** di file konten; tidak diperlukan fungsi pembungkus.

| Fitur                                                                                                        | Field metadata                            | Selektor di `useIntlayer`                         |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------- |
| [Koleksi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/collections.md) | `item: N`                                 | `{ item: N }`                                     |
| [Varian](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/variants.md)     | `variant: "name"` _atau_ `variant: { … }` | `{ variant: "name" }` _atau_ `{ variant: { … } }` |

Keduanya dapat dikombinasikan dengan argumen locale dan mendukung pemuatan selektif / malas melalui `importMode`.

## Kapan menggunakan yang mana

- **Koleksi** — daftar item terurut yang dikelola dalam file terpisah (entri FAQ, posting blog, produk).
- **Varian** — alternatif konten bernama atau terstruktur:
  - varian **string** untuk pengujian A/B, banner musiman, atau feature flag;
  - varian **objek** untuk record CMS, konten khusus pengguna, atau konten apa pun yang dialamatkan oleh sekumpulan field ("record dinamis" sebelumnya).

> Versi sebelumnya menyediakan field `meta` terpisah untuk konten berkunci record. Field ini telah digabungkan ke `variant`: berikan **objek** ke `variant` alih-alih menggunakan `meta`.

## Disambiguasi selektor

Sebuah kunci dapat mendeklarasikan kedua dimensi sekaligus (mis. koleksi yang setiap itemnya memiliki varian). Keduanya diselesaikan dengan urutan:

```
variant → item
```

Jadi `{ variant: "promo" }` pada kunci variant × item mengembalikan semua item promo sebagai array, dan menambahkan `{ item: 2 }` mempersempitnya menjadi satu entri.
