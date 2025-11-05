---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Isi Otomatis
description: Pelajari cara menggunakan fungsi isi otomatis di Intlayer untuk mengisi konten secara otomatis berdasarkan pola yang telah ditentukan. Ikuti dokumentasi ini untuk mengimplementasikan fitur isi otomatis secara efisien dalam proyek Anda.
keywords:
  - Isi Otomatis
  - Otomatisasi Konten
  - Konten Dinamis
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 7.0.0
    date: 2025-10-23
    changes: Mengganti nama `autoFill` menjadi `fill` dan memperbarui perilaku
  - version: 6.0.0
    date: 2025-09-20
    changes: Menambahkan konfigurasi global
  - version: 6.0.0
    date: 2025-09-17
    changes: Menambahkan variabel `{{fileName}}`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahan File Deklarasi Isi Konten

**File deklarasi isi otomatis** dalam CI Anda adalah cara untuk mempercepat alur kerja pengembangan Anda.

## Perilaku Default

Secara default, `fill` diatur ke `true` secara global, yang berarti Intlayer akan secara otomatis mengisi semua file konten dan mengedit file itu sendiri. Perilaku ini dapat disesuaikan dengan beberapa cara:

### Opsi Konfigurasi Global

1. **`fill: true` (default)** - Secara otomatis mengisi semua locale dan mengedit file saat ini
2. **`fill: false`** - Menonaktifkan isi otomatis untuk file konten ini
3. **`fill: "path/to/file"`** - Membuat/memperbarui file yang ditentukan tanpa mengedit file saat ini
4. **`fill: { [key in Locales]?: string }`** - Membuat/memperbarui file yang ditentukan untuk setiap locale

### Perubahan Perilaku di v7

Pada v7, perilaku perintah `fill` telah diperbarui:

- **`fill: true`** - Menulis ulang file saat ini dengan konten yang diisi untuk semua locale
- **`fill: "path/to/file"`** - Mengisi file yang ditentukan tanpa memodifikasi file saat ini
- **`fill: false`** - Menonaktifkan isi otomatis sepenuhnya

Saat menggunakan opsi path untuk menulis ke file lain, mekanisme isi bekerja melalui hubungan _master-slave_ antara file deklarasi konten. File utama (master) berfungsi sebagai sumber kebenaran, dan ketika diperbarui, Intlayer akan secara otomatis menerapkan perubahan tersebut ke file deklarasi turunan (yang diisi) yang ditentukan oleh path.

### Kustomisasi Per-Locale

Anda juga dapat menyesuaikan perilaku untuk setiap locale dengan menggunakan sebuah objek:

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  content: {
    internationalization: {
      locales: [Locales.ENGLISH, Locales.FRENCH, Locales.POLISH],
      defaultLocale: Locales.ENGLISH,
      requiredLocales: [Locales.ENGLISH], // Disarankan untuk menghindari Property 'pl' hilang dalam tipe '{ en: string; xxx } pada fungsi t Anda jika
    },
  },
  dictionary: {
    fill: {
      en: true, // Isi dan edit file saat ini untuk bahasa Inggris
      fr: "./translations/fr.json", // Buat file terpisah untuk bahasa Prancis
      es: false, // Nonaktifkan isi untuk bahasa Spanyol
    },
  },
};
```

Ini memungkinkan Anda memiliki perilaku isi yang berbeda untuk berbagai locale dalam proyek yang sama.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  fill: "./example.content.json",
  content: {
    contentExample: "Ini adalah contoh konten",
  },
} satisfies Dictionary;

export default exampleContent;
```

Berikut adalah [file deklarasi konten per-locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) yang menggunakan instruksi `fill`.

Kemudian, ketika Anda menjalankan perintah berikut:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer akan secara otomatis menghasilkan file deklarasi turunan di `src/components/example/example.content.json`, mengisi semua locale yang belum dideklarasikan di file utama.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Setelah itu, kedua file deklarasi akan digabungkan menjadi satu kamus, yang dapat diakses menggunakan hook standar `useIntlayer("example")` (react) / composable (vue).

## Konfigurasi Global

Anda dapat mengonfigurasi konfigurasi auto fill global di file `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Menghasilkan terjemahan yang hilang secara otomatis untuk semua kamus
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // menghasilkan terjemahan yang hilang secara otomatis untuk semua kamus seperti menggunakan "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Anda masih dapat menyempurnakan per kamus menggunakan field `fill` di file konten. Intlayer akan terlebih dahulu mempertimbangkan konfigurasi per kamus kemudian menggunakan konfigurasi global sebagai cadangan.

## Format File Autofilled

Format yang direkomendasikan untuk file deklarasi yang diisi otomatis adalah **JSON**, yang membantu menghindari kendala format. Namun, Intlayer juga mendukung format `.ts`, `.js`, `.mjs`, `.cjs`, dan format lainnya.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "./example.filled.content.ts",
  content: {
    // Konten Anda
  },
};
```

Ini akan menghasilkan file di:

```
src/components/example/example.filled.content.ts
```

> Proses pembuatan file `.js`, `.ts`, dan file serupa bekerja sebagai berikut:
>
> - Jika file sudah ada, Intlayer akan memparsenya menggunakan AST (Abstract Syntax Tree) untuk menemukan setiap field dan menyisipkan terjemahan yang hilang.
> - Jika file tidak ada, Intlayer akan membuatnya menggunakan template file deklarasi konten default.

## Path Absolut

Field `fill` juga mendukung path absolut.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/example.content.json",
  content: {
    // Konten Anda
  },
};
```

Ini akan menghasilkan file di:

```
/messages/example.content.json
```

## Autogenerate File Deklarasi Konten Per-Locale

Field `fill` juga mendukung pembuatan file deklarasi konten **per-locale**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Konten Anda
  },
};
```

Ini akan menghasilkan dua file terpisah:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> Dalam kasus ini, jika objek tidak berisi semua locale, Intlayer akan melewati pembuatan locale yang tersisa.

## Filter Autofill Locale Tertentu

Menggunakan objek untuk field `fill` memungkinkan Anda menerapkan filter dan hanya menghasilkan file locale tertentu.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Konten Anda
  },
};
```

Ini hanya akan menghasilkan file terjemahan bahasa Prancis.

## Variabel Path

Anda dapat menggunakan variabel di dalam path `fill` untuk secara dinamis menentukan jalur target untuk file yang dihasilkan.

**Variabel yang tersedia:**

- `{{locale}}` – Kode locale (misalnya `fr`, `es`)
- `{{fileName}}` – Nama file (misalnya `index`)
- `{{key}}` – Kunci kamus (misalnya `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Konten Anda
  },
};
```

Ini akan menghasilkan:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "./{{fileName}}.content.json",
  content: {
    // Konten Anda
  },
};
```

Ini akan menghasilkan:

- `./index.content.json`
- `./index.content.json`
