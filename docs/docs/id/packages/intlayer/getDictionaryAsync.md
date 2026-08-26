---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Dokumentasi Fungsi getDictionaryAsync | intlayer
description: Lihat cara menggunakan fungsi getDictionaryAsync untuk paket intlayer
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentasi: Fungsi `getDictionaryAsync` di `intlayer`

## Deskripsi

Fungsi `getDictionaryAsync` memuat **chunk locale tunggal** dari sebuah dictionary dan mengembalikan konten yang sudah diinterpretasi.

Ini adalah padanan dari [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getDictionary.md) untuk per-locale loader maps yang dipancarkan di `.intlayer/dynamic_dictionaries/`: daripada menerima dictionary yang berisi setiap locale, ia menerima loader map dan hanya menunggu chunk yang dibutuhkan locale yang diminta.

> Dalam kode aplikasi Anda biasanya memanggil [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayerAsync.md), bukan fungsi ini. [Build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) menulis ulang setiap panggilan `getIntlayerAsync('key', locale)` menjadi `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` diekspor untuk custom loaders dan untuk tooling yang membangun loader maps-nya sendiri.

**Fitur Utama:**

- Memuat hanya chunk locale yang diminta
- Mendukung plain (`locale → loader`) dan qualified (`locale → qualifierId → loader`) loader maps
- Menghilangkan duplikasi concurrent loads dari chunk yang sama, dan menyimpan konten yang sudah direspon dalam cache
- Failed loads dihapus dari cache sehingga panggilan nanti mencoba ulang chunk

---

## Signature Fungsi

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Wajib
  key: string,                                           // Wajib
  localeOrSelector?: LocalesValues | DictionarySelector, // Opsional
  plugins?: Plugins[]                                    // Opsional
): Promise<DeepTransformContent<...>>
```

---

## Parameter

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: Peta loader per-locale. Peta biasa menghubungkan locale dengan loader; peta qualified (digunakan oleh collections dan variants) menghubungkan locale dengan qualifier id, kemudian dengan loader. Untuk peta qualified, hanya chunk(s) yang ditargetkan oleh selector yang dimuat.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: Kunci dictionary, digunakan untuk namespace chunk cache.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale untuk menginterpretasikan konten dengan, atau objek selector (`{ item }`, `{ variant }`, opsional dengan `locale`). Lihat [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Node transformers. Defaults to the base interpreter set.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the loaded chunk.
- **Description**: Resolves to `null` when the map emits no chunk for the requested locale nor for any of its fallbacks, mirroring how a missing qualified coordinate resolves.

---

## Contoh Penggunaan

### Dengan peta loader yang dihasilkan

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Dengan peta loader kustom

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Dengan selector pada qualified map

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Catatan Perilaku

### Caching and deduplication

The cache stores the **promise** of each `key + locale + selector` triple, so concurrent calls for the same chunk await a single load. A rejected load is removed from the cache, so a failing chunk is retried on the next call instead of replaying the same failure forever.

### Locale fallback

Peta loader biasa berjalan sepanjang rantai fallback yang sama seperti mode sinkron: lokal yang diminta terlebih dahulu, kemudian fallback-nya, kemudian `null` jika tidak ada yang memancarkan chunk.

---

## Fungsi Terkait

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayerAsync.md): Fungsi yang dipanggil aplikasi; plugin build menulisnya kembali menjadi `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getDictionary.md): Rekan sinkron yang menerima kamus lengkap.
- [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md): Koleksi dan varian, serta peta loader yang mereka hasilkan.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
