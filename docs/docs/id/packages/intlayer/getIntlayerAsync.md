---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Dokumentasi Fungsi getIntlayerAsync | intlayer
description: "Gunakan getIntlayerAsync untuk memuat dan membaca konten kamus hanya untuk satu locale, tanpa menyertakan bahasa lain."
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayerAsync
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "Tanpa locale, menunggu locale request (headers dan cookies Next.js)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Dokumentasi awal"
author: aymericzip
---

# Dokumentasi: Fungsi `getIntlayerAsync` di `intlayer`

## Deskripsi

Fungsi `getIntlayerAsync` memilih satu kamus berdasarkan kuncinya dan menyelesaikan kontennya untuk locale yang diberikan, **memuat locale tersebut saja**.

Ini adalah mitra asinkron dari [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md), dimaksudkan untuk tempat-tempat di mana kamus dibaca di luar rendering, route `head` / pembangun metadata, loaders, server functions.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md)

Di mana `getIntlayer` menarik kamus gabungan yang menampung setiap locale, [plugin build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) menulis ulang panggilan ini menjadi `getDictionaryAsync(loaderMap, key, locale)`, mengarahkannya ke chunk per-locale di `.intlayer/dynamic_dictionaries/`. Bundle oleh karena itu hanya pernah membawa locale yang benar-benar diminta.

- [plugin build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)

Tanpa plugin tersebut, build yang tidak dioptimalkan, panggilan diselesaikan melalui registry kamus sinkron sebagai gantinya: konten yang sama, tanpa pemisahan per-locale.

**Fitur Utama:**

- Kunci, selektor dan konten yang dikembalikan sama dengan `getIntlayer`
- Memuat hanya chunk locale yang diminta dalam build yang dioptimalkan
- Panggilan bersamaan untuk chunk yang sama berbagi satu load
- Aman digunakan dalam pembangun metadata `async`, loaders dan server functions

## Signature Fungsi

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Diperlukan
  localeOrSelector?: LocalesValues | DictionarySelector, // Opsional
  plugins?: Plugins[]                         // Opsional
): Promise<DeepTransformContent<...>>
```

## Parameters

- `key: DictionaryKeys`
  - **Deskripsi**: Kunci kamus yang akan dibaca, seperti yang dideklarasikan dalam file konten Anda.
  - **Tipe**: `DictionaryKeys`, union dari setiap kunci kamus yang dideklarasikan.
  - **Diperlukan**: Ya

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Deskripsi**: Locale untuk menginterpretasi konten, atau objek selector untuk [kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md).
    - `'fr'`: sebuah locale
    - `{ item: 2 }`: item [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/collections.md) (abaikan `item` untuk mendapatkan setiap item sebagai array)
    - `{ variant: 'black-friday' }`: [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/variants.md) bernama (abaikan untuk yang `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: variant terstruktur
    - Setiap selector dapat membawa locale: `{ item: 2, locale: 'fr' }`
  - **Tipe**: `LocalesValues | DictionarySelector`
  - **Diperlukan**: Tidak (opsional). Jika dihilangkan, di-resolve seperti pada [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md) (locale request, lalu locale tersimpan, lalu `defaultLocale`). Karena asinkron, fungsi ini juga bisa menunggu locale request ketika hanya bisa dibaca secara asinkron: di Server Components Next.js, `generateMetadata`, dan route handler, fungsi ini membaca `headers()` dan `cookies()` dari request, seperti `getLocale()` dari `next-intlayer/server`. Pembacaan ini membuat route beralih ke rendering dinamis, sehingga hanya dilakukan jika `IntlayerProvider` belum menyediakan locale.

- `plugins: Plugins[]`
  - **Deskripsi**: Custom node transformers yang menggantikan base interpreter plugins. Penggunaan advanced only.
  - **Tipe**: `Plugins[]`
  - **Diperlukan**: Tidak (opsional)

### Returns

- **Tipe**: `Promise<Content>`, sebuah promise yang me-resolve ke konten dictionary yang telah diinterpretasi, dengan tipe dari deklarasi Anda.

## Contoh Penggunaan

### Penggunaan Dasar

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Returns            | Konten                                                                                                          | Janji dari konten                                |
| Dictionary loaded  | Dictionary yang digabungkan (semua locale)                                                                      | Chunk dari locale yang diminta saja              |
| Best suited for    | Rendering, jalur kode sinkron                                                                                   | Metadata, loaders, fungsi server                 |
| Requires a plugin? | Tidak                                                                                                           | Tidak, split per-locale memerlukan build plugins |

Keduanya menerima argumen yang sama dan mengembalikan konten yang sama: beralih dari satu ke yang lain hanya mengubah **kapan** dan **berapa banyak** yang dimuat.

## Fungsi Terkait

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocale.md)

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
