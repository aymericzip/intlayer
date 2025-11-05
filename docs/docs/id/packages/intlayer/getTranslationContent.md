---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Fungsi getTranslation - Dokumentasi JavaScript Intlayer
description: Dokumentasi untuk fungsi getTranslation di Intlayer, yang mengambil konten terlokalisasi untuk locale tertentu dengan fallback ke locale default.
keywords:
  - getTranslation
  - intlayer
  - fungsi
  - lokalisasi
  - i18n
  - JavaScript
  - terjemahan
  - locale
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `getTranslation` di `intlayer`

## Deskripsi

Fungsi `getTranslation` mengambil konten yang sesuai dengan locale tertentu dari sekumpulan konten bahasa yang dapat disesuaikan. Jika locale yang ditentukan tidak ditemukan, fungsi ini akan mengembalikan konten untuk locale default yang dikonfigurasi dalam proyek.

## Parameter

- `languageContent: CustomizableLanguageContent<Content>`
  - **Deskripsi**: Sebuah objek yang berisi terjemahan untuk berbagai locale. Setiap kunci mewakili sebuah locale, dan nilainya adalah konten yang sesuai.
  - **Tipe**: `CustomizableLanguageContent<Content>`
    - `Content` dapat berupa tipe apa saja, dengan default `string`.

- `locale: Locales`
  - **Deskripsi**: Locale yang kontennya akan diambil.
  - **Tipe**: `Locales`

## Mengembalikan

- **Tipe**: `Content`
- **Deskripsi**: Konten yang sesuai dengan locale yang ditentukan. Jika locale tidak ditemukan, konten dari locale default akan dikembalikan.

## Contoh Penggunaan

### Penggunaan Dasar

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### Locale yang Hilang:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (konten locale default)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (konten locale default)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (konten locale default)
```

### Menggunakan Tipe Konten Kustom:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Kasus Tepi

- **Locale Tidak Ditemukan:**
  - Ketika `locale` tidak ditemukan dalam `languageContent`, fungsi mengembalikan konten untuk locale default.
- **Konten Bahasa Tidak Lengkap:**
  - Jika sebuah locale hanya didefinisikan sebagian, fungsi tidak menggabungkan konten. Fungsi secara ketat mengambil nilai dari locale yang ditentukan atau kembali ke default.
- **Penegakan TypeScript:**
  - Jika locales dalam `languageContent` tidak sesuai dengan konfigurasi proyek, TypeScript akan menegakkan semua locales yang diperlukan untuk didefinisikan, memastikan konten lengkap dan aman tipe.
