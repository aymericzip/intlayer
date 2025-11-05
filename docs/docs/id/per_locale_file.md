---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Deklarasi Konten `Per-Locale` di Intlayer
description: Temukan cara mendeklarasikan konten per locale di Intlayer. Ikuti dokumentasi untuk memahami berbagai format dan kasus penggunaan.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Per-Locale
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Deklarasi Konten `Per-Locale` di Intlayer

Intlayer mendukung dua cara untuk mendeklarasikan konten multibahasa:

- Satu file dengan semua terjemahan
- Satu file per locale (format per-locale)

Fleksibilitas ini memungkinkan:

- Migrasi mudah dari alat i18n lainnya
- Dukungan untuk alur kerja terjemahan otomatis
- Organisasi terjemahan yang jelas ke dalam file terpisah berdasarkan locale

## Satu File dengan Banyak Terjemahan

Format ini ideal untuk:

- Iterasi cepat dalam kode.
- Integrasi mulus dengan CMS.

Ini adalah pendekatan yang direkomendasikan untuk sebagian besar kasus penggunaan. Format ini memusatkan terjemahan, sehingga memudahkan iterasi dan integrasi dengan CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// kontenHelloWorld berisi terjemahan multibahasa untuk komponen
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// kontenHelloWorld berisi terjemahan multibahasa untuk komponen
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Direkomendasikan: Format ini paling baik digunakan saat memakai editor visual Intlayer atau mengelola terjemahan langsung di dalam kode.

## Format Per-Locale

Format ini berguna ketika:

- Anda ingin melakukan versioning atau menimpa terjemahan secara independen.
- Anda mengintegrasikan alur kerja terjemahan mesin atau manusia.

Anda juga dapat memisahkan terjemahan ke dalam file locale individual dengan menentukan field locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Penting
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Penting
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Kamus konten untuk "hello-world"
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Penting
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Kamus konten untuk "hello-world"
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Penting
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Penting
  content: {
    multilingualContent: "Title of my component",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Penting
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Penting
  "content": {
    "multilingualContent": "Judul komponen saya",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Penting
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Penting: Pastikan field locale didefinisikan. Ini memberitahu Intlayer bahasa apa yang diwakili oleh file tersebut.

> Catatan: Dalam kedua kasus, file deklarasi konten harus mengikuti pola penamaan `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` agar dikenali oleh Intlayer. Sufiks `.[locale]` bersifat opsional dan hanya digunakan sebagai konvensi penamaan.

## Menggabungkan Format

Anda dapat menggabungkan kedua pendekatan deklarasi untuk kunci konten yang sama. Sebagai contoh:

- Deklarasikan konten dasar Anda secara statis dalam file seperti index.content.ts.
- Tambahkan atau timpa terjemahan spesifik dalam file terpisah seperti index.fr.content.ts atau index.content.json.

Pengaturan ini sangat berguna ketika:

- Anda ingin mendefinisikan struktur konten awal dalam kode.
- Anda berencana untuk memperkaya atau melengkapi terjemahan nanti menggunakan CMS atau alat otomatis.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Contoh

Berikut adalah file deklarasi konten multibahasa:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Judul komponen saya",
    projectName: "Proyek saya",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer menggabungkan file multibahasa dan per-locale secara otomatis.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Default locale adalah ENGLISH, jadi ini akan mengembalikan konten dalam bahasa ENGLISH

console.log(JSON.stringify(intlayer, null, 2));
// Hasil:
// {
//  "multilingualContent": "Judul komponen saya",
//  "projectName": "Proyek saya"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Hasil:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Proyek saya"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Hasil:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Proyek saya"
// }
```

### Pembuatan Terjemahan Otomatis

Gunakan [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md) untuk mengisi otomatis terjemahan yang hilang berdasarkan layanan yang Anda pilih.
