---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Dokumentasi Fungsi t | express-intlayer
description: Lihat cara menggunakan fungsi t untuk paket express-intlayer
keywords:
  - t
  - terjemahan
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `t` di `express-intlayer`

Fungsi `t` dalam paket `express-intlayer` adalah utilitas inti untuk menyediakan respons yang dilokalisasi dalam aplikasi Express Anda. Fungsi ini mempermudah internasionalisasi (i18n) dengan memilih konten secara dinamis berdasarkan bahasa yang dipilih pengguna.

---

## Ikhtisar

Fungsi `t` digunakan untuk mendefinisikan dan mengambil terjemahan untuk satu set bahasa tertentu. Fungsi ini secara otomatis menentukan bahasa yang tepat untuk dikembalikan berdasarkan pengaturan permintaan klien, seperti header `Accept-Language`. Jika bahasa yang dipilih tidak tersedia, fungsi ini dengan mulus akan kembali ke locale default yang ditentukan dalam konfigurasi Anda.

---

## Fitur Utama

- **Lokalisasi Dinamis**: Secara otomatis memilih terjemahan yang paling sesuai untuk klien.
- **Fallback ke Locale Default**: Kembali ke locale default jika bahasa pilihan klien tidak tersedia, memastikan kelangsungan pengalaman pengguna.
- **Ringan dan Cepat**: Dirancang untuk aplikasi dengan performa tinggi, memastikan overhead minimal.
- **Dukungan Mode Ketat**: Menerapkan kepatuhan ketat pada locale yang dideklarasikan untuk perilaku yang dapat diandalkan.

---

## Tanda Tangan Fungsi

```typescript
t(translations: Record<string, string>): string;
```

### Parameter

- `translations`: Sebuah objek di mana kunci adalah kode locale (misalnya, `en`, `fr`, `es-MX`) dan nilainya adalah string terjemahan yang sesuai.

### Mengembalikan

- Sebuah string yang mewakili konten dalam bahasa pilihan klien.

---

## Memuat Handler Permintaan Internasionalisasi

Untuk memastikan bahwa fungsi internasionalisasi yang disediakan oleh `express-intlayer` bekerja dengan benar, Anda **harus** memuat middleware internasionalisasi di awal aplikasi Express Anda. Ini memungkinkan fungsi `t` dan memastikan penanganan yang tepat untuk deteksi locale dan terjemahan.

Tempatkan middleware `app.use(intlayer())` **sebelum rute apa pun** dalam aplikasi Anda untuk memastikan bahwa semua rute mendapatkan manfaat dari internasionalisasi:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Memuat handler permintaan internasionalisasi
app.use(intlayer());

// Definisikan rute Anda setelah memuat middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Memuat handler permintaan internasionalisasi
app.use(intlayer());

// Definisikan rute Anda setelah memuat middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Memuat handler permintaan internasionalisasi
app.use(intlayer());

// Definisikan rute Anda setelah memuat middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Mengapa Ini Diperlukan

- **Deteksi Locale**: Middleware `intlayer` memproses permintaan yang masuk untuk mendeteksi locale yang dipilih pengguna berdasarkan header, cookie, atau metode lain yang dikonfigurasi.
- **Konteks Terjemahan**: Menyiapkan konteks yang diperlukan agar fungsi `t` dapat beroperasi dengan benar, memastikan terjemahan dikembalikan dalam bahasa yang tepat.
- **Pencegahan Error**: Tanpa middleware ini, penggunaan fungsi `t` akan menyebabkan error saat runtime karena informasi locale yang diperlukan tidak tersedia.

---

## Contoh Penggunaan

### Contoh Dasar

Melayani konten yang dilokalkan dalam berbagai bahasa:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Permintaan Klien:**

- Klien dengan `Accept-Language: fr` akan menerima `Bienvenue!`.
- Klien dengan `Accept-Language: es` akan menerima `¡Bienvenido!`.
- Klien dengan `Accept-Language: de` akan menerima `Welcome!` (locale default).

### Menangani Error

Berikan pesan error dalam berbagai bahasa:

```typescript fileName="src/index.ts" codeFormat="typescript"
javascript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Menggunakan Varian Locale

Tentukan terjemahan untuk varian spesifik locale:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Topik Lanjutan

### Mekanisme Fallback

Jika locale yang diinginkan tidak tersedia, fungsi `t` akan kembali menggunakan locale default yang didefinisikan dalam konfigurasi:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Sebagai contoh:

- Jika `defaultLocale` adalah `Locales.CHINESE` dan klien meminta `Locales.DUTCH`, terjemahan yang dikembalikan akan menggunakan nilai `Locales.CHINESE` secara default.
- Jika `defaultLocale` tidak didefinisikan, fungsi `t` akan kembali menggunakan nilai `Locales.ENGLISH`.

---

### Penegakan Mode Ketat

Konfigurasikan fungsi `t` untuk menegakkan kepatuhan ketat terhadap locale yang dideklarasikan:

| Mode        | Perilaku                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `strict`    | Semua locale yang dideklarasikan harus memiliki terjemahan. Locale yang hilang akan menyebabkan error.           |
| `inclusive` | Locale yang dideklarasikan harus memiliki terjemahan. Locale yang hilang akan memicu peringatan tetapi diterima. |
| `loose`     | Locale yang ada diterima, bahkan jika tidak dideklarasikan.                                                      |

Contoh Konfigurasi:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Konfigurasi Anda yang sudah ada
  internationalization: {
    // ... Konfigurasi internationalization Anda yang sudah ada
    strictMode: "strict", // Terapkan mode ketat
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Konfigurasi Anda yang sudah ada
  internationalization: {
    // ... Konfigurasi internationalization Anda yang sudah ada
    strictMode: "strict", // Terapkan mode ketat
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Konfigurasi Anda yang sudah ada
  internationalization: {
    // ... Konfigurasi internationalization Anda yang sudah ada
    strictMode: "strict", // Terapkan mode ketat
  },
};

module.exports = config;
```

---

### Integrasi TypeScript

Fungsi `t` aman tipe saat digunakan dengan TypeScript. Definisikan objek terjemahan yang aman tipe:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Selamat pagi!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Selamat pagi!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Selamat pagi!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Kesalahan Umum dan Pemecahan Masalah

| Masalah                     | Penyebab                                 | Solusi                                                     |
| --------------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| Fungsi `t` tidak berfungsi  | Middleware tidak dimuat                  | Pastikan `app.use(intlayer())` ditambahkan sebelum routes. |
| Kesalahan terjemahan hilang | Mode ketat diaktifkan tanpa semua locale | Sediakan semua terjemahan yang diperlukan.                 |

---

## Tips untuk Penggunaan Efektif

1. **Sentralisasi Terjemahan**: Gunakan modul terpusat atau file JSON untuk mengelola terjemahan agar memudahkan pemeliharaan.
2. **Validasi Terjemahan**: Pastikan setiap varian bahasa memiliki terjemahan yang sesuai untuk mencegah fallback yang tidak perlu.
3. **Gabungkan dengan i18n Frontend**: Sinkronkan dengan internasionalisasi frontend untuk pengalaman pengguna yang mulus di seluruh aplikasi.
4. **Uji Kinerja**: Uji waktu respons aplikasi Anda saat menambahkan terjemahan untuk memastikan dampak minimal.

---

## Kesimpulan

Fungsi `t` adalah alat yang kuat untuk internasionalisasi backend. Dengan menggunakannya secara efektif, Anda dapat membuat aplikasi yang lebih inklusif dan ramah pengguna untuk audiens global. Untuk penggunaan lanjutan dan opsi konfigurasi yang lebih rinci, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).
