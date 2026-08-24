---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Dokumentasi Fungsi getDictionary | intlayer
description: Lihat cara menggunakan fungsi getDictionary untuk paket intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: Fungsi `getDictionary` dalam `intlayer`

## Deskripsi

Fungsi `getDictionary` menginterpretasi objek dictionary **yang Anda berikan sendiri** dan mengembalikan konten yang telah diselesaikan untuk locale tertentu. Fungsi ini berjalan melalui konten dalam satu pass dan menerapkan setiap plugin interpreter sesuai kebutuhan, menyelesaikan translasi `t()`, enumerations, conditions, insertions, nesting, markdown, HTML dan file nodes.

Berbeda dengan [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md), yang mencari dictionary berdasarkan key dalam registry yang dihasilkan, `getDictionary` mengambil dictionary itu sendiri. Hal ini menjadikannya alat yang tepat untuk konten yang dibangun pada saat runtime, diambil dari API atau CMS, atau dideklarasikan secara inline dalam test.

**Fitur Utama:**

- Bekerja dengan objek apa pun yang mengikuti struktur dictionary (`{ key, content }`)
- Juga menerima dictionary group yang qualified (collections, variants) bersama dengan selector
- Fully typed: objek yang dikembalikan mencerminkan `content` yang Anda berikan
- Menerima plugin interpreter kustom

---

## Function Signature

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Diperlukan
  localeOrSelector?: LocalesValues | DictionarySelector, // Opsional
  plugins?: Plugins[]                                // Opsional
): DeepTransformContent<...>
```

---

## Parameters

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Description**: Kamus (atau kelompok kamus yang memenuhi syarat) yang akan ditafsirkan.
  - **Type**: `Dictionary | QualifiedDictionaryGroup`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale untuk menafsirkan konten, atau objek selector (`{ item }`, `{ variant }`, secara opsional dengan `locale`). Lihat [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Array node transformers yang menentukan bagaimana node yang dikenali ditafsirkan. Jika dihilangkan, set default interpreter plugins digunakan.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Pengembalian

- **Type**: Konten yang ditafsirkan dari kamus.
- **Description**: `content` yang Anda berikan, dengan setiap node Intlayer diselesaikan untuk lokal yang diminta. Untuk grup koleksi tanpa pemilih `item`, array terurut dari entri yang ditafsirkan dikembalikan; `null` dikembalikan ketika pemilih tidak menargetkan apa pun.

---

## Contoh Penggunaan

### Penggunaan Dasar

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        id: "Halo",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "id"
);

console.log(content.greeting); // "Halo"
```

### Menginterpretasikan konten yang diambil saat runtime

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Dengan selector

```typescript
import { getDictionary } from "intlayer";

// Grup dictionary yang qualified diuraikan menjadi satu entry…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …atau ke array yang terurut ketika tidak ada `item` yang diberikan
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Fungsi Terkait

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md): Interpretasi yang sama, tetapi kamus dicari berdasarkan kunci dalam registry yang dihasilkan.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getDictionaryAsync.md): Rekan untuk peta loader per-locale.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useDictionary.md): Setara dengan React hook, membaca locale dari provider.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
