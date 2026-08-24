---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Dokumentasi Fungsi getIntlayer | intlayer
description: Lihat cara menggunakan fungsi getIntlayer untuk package intlayer
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentasi: Fungsi `getIntlayer` di `intlayer`

## Deskripsi

Fungsi `getIntlayer` memilih satu kamus berdasarkan kuncinya dan mengembalikan isinya yang diinterpretasikan untuk lokal yang diberikan. Ini adalah pasangan yang independen dari kerangka kerja dari hook `useIntlayer`: konten yang sama, pemilih yang sama, tetapi dapat digunakan di mana pun konteks React tidak tersedia — skrip Node, fungsi server, pemuat rute, pembuat metadata, penangan Express/Fastify, tes.

Ini membaca kamus yang dihasilkan oleh Intlayer di `.intlayer/`, jadi argumen `key` diketik dan selesai otomatis dari deklarasi konten Anda sendiri, dan objek yang dikembalikan sepenuhnya diketik hingga setiap daun.

**Fitur Utama:**

- Kunci kamus yang diketik dan konten yang dikembalikan diketik
- Menginterpretasikan setiap node konten (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Menerima lokal atau objek pemilih (koleksi, varian)
- Hasil di-cache per `key + locale + selector`
- Kembali ke proksi yang aman dalam pengembangan ketika kamus hilang, alih-alih mengalami kegagalan

---

## Function Signature

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Wajib
  localeOrSelector?: LocalesValues | DictionarySelector, // Opsional
  plugins?: Plugins[]                         // Opsional
): DeepTransformContent<...>
```

---

## Parameter

- `key: DictionaryKeys`
  - **Deskripsi**: Kunci kamus yang akan dibaca, seperti yang dideklarasikan dalam file konten Anda.
  - **Tipe**: `DictionaryKeys` — sebuah union dari setiap kunci kamus yang dideklarasikan.
  - **Diperlukan**: Ya

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Deskripsi**: Locale untuk menginterpretasi konten dengan, atau objek selector untuk [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md).
    - `'fr'` — sebuah locale
    - `{ item: 2 }` — sebuah [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/collections.md) item (abaikan `item` untuk mendapatkan setiap item sebagai array)
    - `{ variant: 'black-friday' }` — sebuah [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/variants.md) bernama (abaikan untuk yang `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — sebuah variant terstruktur
    - Setiap selector dapat membawa sebuah locale: `{ item: 2, locale: 'fr' }`
  - **Tipe**: `LocalesValues | DictionarySelector`
  - **Diperlukan**: Tidak (Opsional) — default ke `defaultLocale` yang dikonfigurasi.

- `plugins: Plugins[]`
  - **Deskripsi**: Custom node transformers menggantikan plugin interpreter dasar. Penggunaan lanjutan saja; abaikan ini untuk mempertahankan perilaku default.
  - **Tipe**: `Plugins[]`
  - **Diperlukan**: Tidak (Opsional)

### Returns

- **Type**: Konten dictionary yang diinterpretasi, diketik dari deklarasi Anda.
- **Description**: Objek biasa yang mencerminkan bidang `content` dari dictionary Anda, di mana setiap node Intlayer telah diselesaikan ke nilai akhirnya untuk locale yang diminta.

---

## Contoh Penggunaan

### Penggunaan Dasar

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      id: "Halo",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### Tanpa locale

Menghilangkan locale menginterpretasi konten dengan `defaultLocale` yang dideklarasikan dalam [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) Anda.

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Diinterpretasi dengan locale default
```

### Di dalam server handler

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### Dengan selector (koleksi dan varian)

```typescript
import { getIntlayer } from "intlayer";

// Item koleksi tunggal
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Setiap item dari koleksi, sebagai array yang terurut
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Varian bernama
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Catatan Perilaku

### Caching

Hasil disimpan dalam cache tingkat modul dengan kunci `key + locale + selector`. Memanggil `getIntlayer("app", "fr")` berulang kali menginterpretasi dictionary sekali dan mengembalikan objek yang sama setelahnya.

### Kamus yang Hilang

Dalam pengembangan, meminta kunci yang tidak memiliki kamus yang dihasilkan mencatat peringatan sekali dan mengembalikan proxy fallback yang aman: membaca `content.title` menghasilkan string `"app.title"` alih-alih melempar. Ini membuat halaman tetap dapat digunakan sementara deklarasi yang hilang diperbaiki. Jalankan build Intlayer (atau dev server) agar kamus dihasilkan.

### Ukuran Bundle

`getIntlayer` membaca dictionary yang digabungkan, yang menyimpan **setiap** locale. Dalam client bundles, [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) menulis ulang panggilan sehingga hanya konten yang diperlukan yang dikirim. Ketika Anda membaca konten di luar rendering (metadata, loaders, server functions) dan ingin satu locale dimuat sesuai permintaan, gunakan [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayerAsync.md) sebagai gantinya.

---

## Fungsi Terkait

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayerAsync.md): Counterpart async yang memuat satu chunk locale.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getDictionary.md): Menginterpretasikan object dictionary yang Anda berikan sendiri, alih-alih yang dicari berdasarkan key.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md): Equivalent React hook, membaca locale dari provider.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
