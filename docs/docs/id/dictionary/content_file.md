---
createdAt: 2025-02-07
updatedAt: 2026-01-10
title: Berkas Konten
description: Pelajari cara menyesuaikan ekstensi untuk berkas deklarasi konten Anda. Ikuti dokumentasi ini untuk mengimplementasikan kondisi secara efisien dalam proyek Anda.
keywords:
  - Berkas Konten
  - Dokumentasi
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Menambahkan dukungan format ICU dan i18next
  - version: 7.0.0
    date: 2025-10-23
    changes: Mengganti nama `autoFill` menjadi `fill`
  - version: 6.0.0
    date: 2025-09-20
    changes: Menambahkan dokumentasi fields
  - version: 5.5.10
    date: 2025-06-29
    changes: Memulai riwayat
---

# Berkas Konten

<iframe title="i18n, Markdown, JSON… satu solusi untuk mengelola semuanya | Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Apa itu Berkas Konten?

Berkas konten dalam Intlayer adalah berkas yang berisi definisi kamus.
Berkas-berkas ini mendeklarasikan konten teks aplikasi Anda, terjemahan, dan sumber daya.
Berkas konten diproses oleh Intlayer untuk menghasilkan kamus.

Kamus-kamus tersebut akan menjadi hasil akhir yang akan diimpor oleh aplikasi Anda menggunakan hook `useIntlayer`.

### Konsep Utama

#### Kamus

Sebuah kamus adalah kumpulan konten yang terstruktur dan diorganisir berdasarkan kunci. Setiap kamus berisi:

- **Key**: Identifier unik untuk kamus tersebut
- **Content**: Nilai konten sebenarnya (teks, angka, objek, dll.)
- **Metadata**: Informasi tambahan seperti judul, deskripsi, tag, dll.

#### Berkas Konten

Contoh berkas konten:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Halo Dunia",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Kurang dari minus satu mobil",
      "-1": "Minus satu mobil",
      "0": "Tidak ada mobil",
      "1": "Satu mobil",
      ">5": "Beberapa mobil",
      ">19": "Banyak mobil",
    }),
    conditionalContent: cond({
      true: "Validasi diaktifkan",
      false: "Validasi dinonaktifkan",
    }),
    insertionContent: insert("Halo {{name}}!"),
    nestedContent: nest(
      "navbar", // Kunci dari kamus yang akan disisipkan
      "login.button" // [Opsional] Jalur ke konten yang akan disisipkan
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Contoh Markdown"),

    /*
     * Hanya tersedia menggunakan `react-intlayer` atau `next-intlayer`
     */
    jsxContent: <h1>Judul saya</h1>,
  },
} satisfies Dictionary<Content>; // [opsional] Dictionary adalah generic dan memungkinkan Anda memperkuat format kamus Anda
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Halo Dunia",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // Lingkungan Node.js saat ini
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Kurang dari minus satu mobil",
      "-1": "Minus satu mobil",
      "0": "Tidak ada mobil",
      "1": "Satu mobil",
      ">5": "Beberapa mobil",
      ">19": "Banyak mobil",
    }),
    conditionalContent: cond({
      true: "Validasi diaktifkan",
      false: "Validasi dinonaktifkan",
    }),
    insertionContent: insert("Halo {{name}}!"),
    nestedContent: nest(
      "navbar", // Kunci dari kamus yang akan disisipkan
      "login.button" // [Opsional] Jalur ke konten yang akan disisipkan
    ),
    markdownContent: md("# Contoh Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Hanya tersedia menggunakan `react-intlayer` atau `next-intlayer`
    jsxContent: <h1>Judul saya</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Halo Dunia",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // Konten JavaScript dari variabel lingkungan
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Kurang dari minus satu mobil",
      "-1": "Minus satu mobil",
      "0": "Tidak ada mobil",
      "1": "Satu mobil",
      ">5": "Beberapa mobil",
      ">19": "Banyak mobil",
    }),
    conditionalContent: cond({
      true: "Validasi diaktifkan",
      false: "Validasi dinonaktifkan",
    }),
    insertionContent: insert("Halo {{name}}!"),
    nestedContent: nest(
      "navbar", // Kunci dari kamus yang akan disisipkan
      "login.button" // [Opsional] Jalur ke konten yang akan disisipkan
    ),
    markdownContent: md("# Contoh Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Hanya tersedia menggunakan `react-intlayer` atau `next-intlayer`
    jsxContent: <h1>Judul Saya</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Halo Dunia",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Konten bahasa Inggris",
        "en-GB": "Konten bahasa Inggris (UK)",
        "fr": "Konten bahasa Perancis",
        "es": "Konten bahasa Spanyol",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Tidak ada mobil",
        "1": "Satu mobil",
        "<-1": "Kurang dari minus satu mobil",
        "-1": "Minus satu mobil",
        ">5": "Beberapa mobil",
        ">19": "Banyak mobil",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validasi diaktifkan",
        "false": "Validasi dinonaktifkan",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Halo {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Contoh Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Judul saya"],
      },
    },
  },
}
```

#### Content Nodes

Content nodes adalah blok bangunan dari konten kamus. Mereka dapat berupa:

- **Nilai primitif**: string, angka, boolean, null, undefined
- **Node bertipe**: Jenis konten khusus seperti terjemahan, kondisi, markdown, dll.
- **Fungsi**: Konten dinamis yang dapat dievaluasi saat runtime [lihat Pengambilan Fungsi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/function_fetching.md)
- **Konten bersarang**: Referensi ke kamus lain

#### Jenis Konten

Intlayer mendukung berbagai jenis konten melalui node bertipe:

- **Konten Terjemahan**: Teks multibahasa dengan nilai spesifik lokal [lihat Konten Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation_content.md)
- **Konten Kondisi**: Konten kondisional berdasarkan ekspresi boolean [lihat Konten Kondisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/condition_content.md)
- **Konten Enumerasi**: Konten yang bervariasi berdasarkan nilai enumerasi [lihat Konten Enumerasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/enumeration_content.md)
- **Konten Penyisipan**: Konten yang dapat disisipkan ke dalam konten lain [lihat Konten Penyisipan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion_content.md)
- **Konten Markdown**: Konten teks kaya dalam format Markdown [lihat Konten Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown_content.md)
- **Konten Bersarang**: Referensi ke kamus lain [lihat Konten Bersarang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/nested_content.md)
- **Konten Gender**: Konten yang bervariasi berdasarkan gender [lihat Konten Gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender_content.md)
- **Konten File**: Referensi ke file eksternal [lihat Konten File](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/file_content.md)

## Struktur Kamus

Sebuah kamus dalam Intlayer didefinisikan oleh tipe `Dictionary` dan berisi beberapa properti yang mengontrol perilakunya:

### Properti Wajib

#### `key` (string)

Pengidentifikasi untuk kamus. Jika beberapa kamus memiliki kunci yang sama, Intlayer akan menggabungkannya secara otomatis.

> Gunakan konvensi penamaan kebab-case (misalnya, `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

Properti `content` berisi data kamus yang sebenarnya dan mendukung:

- **Nilai primitif**: string, angka, boolean, null, undefined
- **Typed nodes**: Jenis konten khusus menggunakan fungsi pembantu Intlayer
- **Objek bersarang**: Struktur data kompleks
- **Array**: Koleksi konten
- **Fungsi**: Evaluasi konten dinamis

### Properti Opsional

#### `title` (string)

Judul yang mudah dibaca untuk kamus yang membantu mengidentifikasinya di editor dan sistem CMS. Ini sangat berguna saat mengelola sejumlah besar kamus atau saat bekerja dengan antarmuka manajemen konten.

**Contoh:**

```typescript
{
  key: "about-page-meta",
  title: "Metadata Halaman Tentang",
  content: { /* ... */ }
}
```

#### `description` (string)

Deskripsi rinci yang menjelaskan tujuan kamus, panduan penggunaan, dan pertimbangan khusus lainnya. Deskripsi ini juga digunakan sebagai konteks untuk pembuatan terjemahan berbasis AI, sehingga sangat berharga untuk menjaga kualitas dan konsistensi terjemahan.

**Contoh:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Kamus ini mengelola metadata dari Halaman Tentang",
    "Pertimbangkan praktik terbaik untuk SEO:",
    "- Judul harus antara 50 dan 60 karakter",
    "- Deskripsi harus antara 150 dan 160 karakter",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Array string untuk mengkategorikan dan mengorganisir kamus. Tag memberikan konteks tambahan dan dapat digunakan untuk penyaringan, pencarian, atau pengorganisasian kamus di editor dan sistem CMS.

**Contoh:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Menentukan formatter yang akan digunakan untuk konten kamus. Ini memungkinkan penggunaan sintaks pemformatan pesan yang berbeda.

- `'intlayer'`: Formatter Intlayer default.
- `'icu'`: Menggunakan pemformatan pesan ICU.
- `'i18next'`: Menggunakan pemformatan pesan i18next.

**Contoh:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

Mengubah kamus menjadi kamus per-locale di mana setiap field yang dideklarasikan dalam konten akan secara otomatis diubah menjadi node terjemahan. Ketika properti ini diatur:

- Kamus diperlakukan sebagai kamus satu-lokasi
- Setiap field menjadi node terjemahan untuk lokasi spesifik tersebut
- Anda TIDAK boleh menggunakan node terjemahan (`t()`) dalam konten saat menggunakan properti ini
- Jika tidak ada, kamus akan diperlakukan sebagai kamus multibahasa

> Lihat [Deklarasi Konten Per-Lokasi di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) untuk informasi lebih lanjut.

**Contoh:**

```json
// Kamus per-lokasi
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Ini menjadi node terjemahan untuk 'en'
    "description": "Learn more about our company"
  }
}
```

#### `fill` (Fill)

Instruksi untuk mengisi konten kamus secara otomatis dari sumber eksternal. Ini dapat dikonfigurasi secara global di `intlayer.config.ts` atau per kamus. Mendukung beberapa format:

- **`true`**: Mengaktifkan pengisian untuk semua lokasi
- **`false`**: Menonaktifkan pengisian untuk semua lokasi
- **`string`**: Jalur ke satu file atau template dengan variabel
- **`object`**: Jalur file per lokasi

**Contoh:**

```json
// Menonaktifkan pengisian
{
  "fill": false
}
// Satu file
{
  "fill": "./translations/aboutPage.content.json"
}
// Template dengan variabel
{
  "fill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Konfigurasi per-lokasi yang detail
{
  "fill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Variabel yang tersedia:**

- `{{locale}}` – Kode locale (misal `fr`, `es`)
- `{{fileName}}` – Nama file (misal `example`)
- `{{key}}` – Kunci kamus (misal `example`)

> Lihat [Konfigurasi Auto-Fill di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/fill.md) untuk informasi lebih lanjut.

##### `priority` (number)

Menunjukkan prioritas kamus untuk penyelesaian konflik. Ketika beberapa kamus memiliki kunci yang sama, kamus dengan nomor prioritas tertinggi akan menimpa yang lain. Ini berguna untuk mengelola hierarki konten dan override.

**Contoh:**

```typescript
// Kamus dasar
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// Kamus override
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Selamat datang di layanan premium kami!" }
}
// Ini akan menimpa kamus dasar
```

### Properti CMS

##### `version` (string)

Pengidentifikasi versi untuk kamus jarak jauh. Membantu melacak versi kamus yang sedang digunakan, sangat berguna saat bekerja dengan sistem manajemen konten jarak jauh.

##### `live` (boolean)

Untuk kamus jarak jauh, menunjukkan apakah kamus harus diambil secara langsung saat runtime. Ketika diaktifkan:

- Membutuhkan `importMode` disetel ke "live" di `intlayer.config.ts`
- Membutuhkan server live yang berjalan
- Kamus akan diambil saat runtime menggunakan API sinkronisasi langsung
- Jika live tetapi pengambilan gagal, akan kembali ke nilai dinamis
- Jika tidak live, kamus diubah pada saat build untuk performa optimal

### Properti Sistem (Otomatis Dibuat)

Properti ini dibuat secara otomatis oleh Intlayer dan tidak boleh dimodifikasi secara manual:

##### `$schema` (string)

Skema JSON yang digunakan untuk validasi struktur kamus. Ditambahkan secara otomatis oleh Intlayer untuk memastikan integritas kamus.

##### `id` (string)

Untuk kamus jarak jauh, ini adalah pengidentifikasi unik dari kamus di server jarak jauh. Digunakan untuk mengambil dan mengelola konten jarak jauh.

##### `projectIds` (string[])

Untuk kamus jarak jauh, array ini berisi ID proyek yang dapat menggunakan kamus ini. Kamus jarak jauh dapat dibagikan antara beberapa proyek.

##### `localId` (LocalDictionaryId)

Pengidentifikasi unik untuk kamus lokal. Dibuat secara otomatis oleh Intlayer untuk membantu mengidentifikasi kamus dan menentukan apakah itu lokal atau jarak jauh, beserta lokasinya.

##### `localIds` (LocalDictionaryId[])

Untuk kamus yang digabung, array ini berisi ID dari semua kamus yang digabungkan bersama. Berguna untuk melacak sumber konten yang digabung.

##### `filePath` (string)

Jalur file dari kamus lokal, menunjukkan dari file `.content` mana kamus tersebut dihasilkan. Membantu dalam debugging dan pelacakan sumber.

##### `versions` (string[])

Untuk kamus jarak jauh, array ini berisi semua versi kamus yang tersedia. Membantu melacak versi mana yang tersedia untuk digunakan.

##### `filled` (true)

Menunjukkan apakah kamus telah diisi otomatis dari sumber eksternal. Jika terjadi konflik, kamus dasar akan mengesampingkan kamus yang diisi otomatis.

##### `location` ('distant' | 'locale')

Menunjukkan lokasi kamus:

- `'locale'`: Kamus lokal (dari file konten)
- `'distant'`: Kamus jarak jauh (dari sumber eksternal)

## Jenis Node Konten

Intlayer menyediakan beberapa jenis node konten khusus yang memperluas nilai primitif dasar:

### Konten Terjemahan (`t`)

Konten multibahasa yang bervariasi berdasarkan locale:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Konten Kondisi (`cond`)

Konten yang berubah berdasarkan kondisi boolean:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "Pengguna telah masuk",
  false: "Silakan masuk untuk melanjutkan",
});
```

### Konten Enumerasi (`enu`)

Konten yang bervariasi berdasarkan nilai enumerasi:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Permintaan Anda sedang menunggu",
  approved: "Permintaan Anda telah disetujui",
  rejected: "Permintaan Anda telah ditolak",
});
```

### Konten Penyisipan (`insert`)

Konten yang dapat disisipkan ke dalam konten lain:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Teks ini dapat disisipkan di mana saja");
```

### Konten Bersarang (`nest`)

Referensi ke kamus lain:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Konten Markdown (`md`)

Konten teks kaya dalam format Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Selamat Datang\n\nIni adalah teks **tebal** dengan [tautan](https://example.com)"
);
```

### Konten Gender (`gender`)

Konten yang bervariasi berdasarkan gender:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Dia adalah seorang pengembang",
  female: "Dia adalah seorang pengembang",
  other: "Mereka adalah seorang pengembang",
});
```

### Konten File (`file`)

Referensi ke file eksternal:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Membuat File Konten

### Struktur Dasar File Konten

A content file mengekspor objek default yang memenuhi tipe `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Konten Halaman Selamat Datang",
  description:
    "Konten untuk halaman utama selamat datang termasuk bagian hero dan fitur",
  tags: ["page", "welcome", "homepage"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### File Konten JSON

Anda juga dapat membuat file konten dalam format JSON:

```json
{
  "key": "welcome-page",
  "title": "Konten Halaman Selamat Datang",
  "description": "Konten untuk halaman utama selamat datang",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

Anda juga dapat membuat file konten dalam format JSON:

```json
{
  "key": "welcome-page",
  "title": "Konten Halaman Selamat Datang",
  "description": "Konten untuk halaman selamat datang utama",
  "tags": ["halaman", "selamat datang"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### File Konten Per-Locale

Untuk kamus per-locale, tentukan properti `locale`:

```typescript
typescript;
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Welcome to Our Platform",
      subtitle: "Build amazing applications with ease",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Ekstensi File Konten

Intlayer memungkinkan Anda untuk menyesuaikan ekstensi untuk file deklarasi konten Anda. Kustomisasi ini memberikan fleksibilitas dalam mengelola proyek berskala besar dan membantu menghindari konflik dengan modul lain.

### Ekstensi Default

Secara default, Intlayer memantau semua file dengan ekstensi berikut untuk deklarasi konten:

- `.content.json`
- `.content.json5`
- `.content.jsonc`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Ekstensi default ini cocok untuk sebagian besar aplikasi. Namun, ketika Anda memiliki kebutuhan khusus, Anda dapat menentukan ekstensi kustom untuk menyederhanakan proses build dan mengurangi risiko konflik dengan komponen lain.

> Untuk menyesuaikan ekstensi file yang digunakan Intlayer untuk mengidentifikasi file deklarasi konten, Anda dapat menentukan ekstensi tersebut dalam file konfigurasi Intlayer. Pendekatan ini bermanfaat untuk proyek skala besar di mana membatasi cakupan proses pemantauan meningkatkan performa build.

## Konsep Lanjutan

### Penggabungan Kamus

Ketika beberapa kamus memiliki kunci yang sama, Intlayer secara otomatis menggabungkannya. Perilaku penggabungan tergantung pada beberapa faktor:

- **Prioritas**: Kamus dengan nilai `priority` lebih tinggi akan menimpa yang memiliki nilai lebih rendah
- **Auto-fill vs Base**: Kamus dasar (base) menimpa kamus yang diisi otomatis (auto-filled)
- **Lokasi**: Kamus lokal menimpa kamus jarak jauh (remote) (ketika prioritas sama)

### Keamanan Tipe (Type Safety)

Intlayer menyediakan dukungan penuh TypeScript untuk file konten:

```typescript
// Definisikan tipe konten Anda
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Gunakan di kamus Anda
export default {
  key: "welcome-page",
  content: {
    // TypeScript akan menyediakan autocomplete dan pengecekan tipe
    hero: {
      title: "Selamat Datang",
      subtitle: "Bangun aplikasi luar biasa",
      cta: "Mulai",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Imbrikasi Node

Anda dapat dengan mudah mengimbrikasikan fungsi ke dalam fungsi lain.

Contoh:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` mengembalikan `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Konten komposit yang menggabungkan kondisi, enumerasi, dan konten multibahasa
    // `getIntlayer('page','en').advancedContent(true)(10) mengembalikan 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "Tidak ada data valid yang tersedia",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` mengembalikan `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Konten komposit yang menggabungkan kondisi, enumerasi, dan konten multibahasa
    // `getIntlayer('page','en').advancedContent(true)(10)` mengembalikan 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "Tidak ada item yang ditemukan",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Satu item ditemukan",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Beberapa item ditemukan",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "Tidak ada data valid yang tersedia",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` mengembalikan `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Konten komposit yang menggabungkan kondisi, enumerasi, dan konten multibahasa
    // `getIntlayer('page','en').advancedContent(true)(10)` mengembalikan 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Beberapa item ditemukan",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "Tidak ada data valid yang tersedia",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                en: "Tidak ada item yang ditemukan",
                fr: "Aucun article trouvé",
                es: "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                en: "Satu item ditemukan",
                fr: "Un article trouvé",
                es: "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Praktik Terbaik

1. **Konvensi Penamaan**:
   - Gunakan kebab-case untuk kunci kamus (`"about-page-meta"`)
   - Kelompokkan konten terkait di bawah prefix kunci yang sama

2. **Organisasi Konten**:
   - Simpan konten terkait bersama dalam kamus yang sama
   - Gunakan objek bersarang untuk mengatur struktur konten yang kompleks
   - Manfaatkan tag untuk kategorisasi
   - Gunakan `fill` untuk mengisi terjemahan yang hilang secara otomatis

3. **Performa**:
   - Sesuaikan konfigurasi konten untuk membatasi cakupan file yang dipantau
   - Gunakan kamus langsung hanya ketika pembaruan waktu nyata diperlukan, (misalnya A/B testing, dll.)
   - Pastikan plugin transformasi build (`@intlayer/swc`, atau `@intlayer/babel`) diaktifkan untuk mengoptimalkan kamus saat build time
