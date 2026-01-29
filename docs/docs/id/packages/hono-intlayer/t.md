---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Dokumentasi Fungsi t | hono-intlayer
description: Lihat cara menggunakan fungsi t untuk paket hono-intlayer
keywords:
  - t
  - terjemahan
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `t` dalam `hono-intlayer`

Fungsi `t` dalam paket `hono-intlayer` adalah alat utama untuk menyediakan respons yang dilokalkan dalam aplikasi Hono Anda. Ini menyederhanakan internasionalisasi (i18n) dengan secara dinamis memilih konten berdasarkan bahasa pilihan pengguna.

---

## Ikhtisar

Fungsi `t` digunakan untuk mendefinisikan dan mengambil terjemahan untuk kumpulan bahasa tertentu. Fungsi ini secara otomatis menentukan bahasa yang tepat untuk dikembalikan berdasarkan pengaturan permintaan klien, seperti header `Accept-Language`. Jika bahasa yang disukai tidak tersedia, fungsi ini akan beralih ke locale default yang ditentukan dalam konfigurasi Anda.

---

## Fitur Utama

- **Lokalisasi Dinamis**: Secara otomatis memilih terjemahan yang paling sesuai untuk klien.
- **Fallback ke Locale Default**: Beralih ke locale default jika bahasa pilihan klien tidak tersedia, memastikan kelangsungan pengalaman pengguna.
- **Ringan dan Cepat**: Dirancang untuk aplikasi berperforma tinggi, memastikan overhead minimal.
- **Dukungan Mode Ketat**: Menegakkan kepatuhan ketat terhadap locale yang dideklarasikan untuk perilaku yang andal.

---

## Tanda Tangan Fungsi

```typescript
t(translations: Record<string, string>): string;
```

### Parameter

- `translations`: Sebuah objek di mana kuncinya adalah kode locale (misalnya, `en`, `fr`, `id`) dan nilainya adalah string terjemahan yang sesuai.

### Pengembalian

- Sebuah string yang mewakili konten dalam bahasa pilihan klien.

---

## Memuat Handler Permintaan Internasionalisasi

Untuk memastikan bahwa fungsionalitas internasionalisasi yang disediakan oleh `hono-intlayer` berfungsi dengan benar, Anda **harus** memuat middleware internasionalisasi di awal aplikasi Hono Anda. Ini mengaktifkan fungsi `t` dan memastikan penanganan deteksi locale dan terjemahan yang tepat.

Tempatkan middleware `app.use("*", intlayer())` **sebelum rute mana pun** di aplikasi Anda untuk memastikan bahwa semua rute mendapatkan manfaat dari internasionalisasi:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Muat handler permintaan internasionalisasi
app.use("*", intlayer());

// Tentukan rute Anda setelah memuat middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      id: "Halo, Dunia!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Muat handler permintaan internasionalisasi
app.use("*", intlayer());

// Tentukan rute Anda setelah memuat middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      id: "Halo, Dunia!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Muat handler permintaan internasionalisasi
app.use("*", intlayer());

// Tentukan rute Anda setelah memuat middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      id: "Halo, Dunia!",
    })
  );
});
```

### Mengapa Ini Diperlukan

- **Deteksi Locale**: Middleware `intlayer` memproses permintaan masuk untuk mendeteksi locale pilihan pengguna berdasarkan header, cookie, atau metode konfigurasi lainnya.
- **Konteks Terjemahan**: Menyiapkan konteks yang diperlukan agar fungsi `t` dapat beroperasi dengan benar, memastikan bahwa terjemahan dikembalikan dalam bahasa yang benar.
- **Pencegahan Kesalahan**: Tanpa middleware ini, menggunakan fungsi `t` akan menghasilkan kesalahan runtime karena informasi locale yang diperlukan tidak akan tersedia.

---

## Contoh Penggunaan

### Contoh Dasar

Sajikan konten yang dilokalkan dalam berbagai bahasa:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      id: "Selamat datang!",
    })
  );
});
```

**Permintaan Klien:**

- Klien dengan `Accept-Language: fr` akan menerima `Bienvenue!`.
- Klien dengan `Accept-Language: id` akan menerima `Selamat datang!`.
- Klien dengan `Accept-Language: de` akan menerima `Welcome!` (locale default).

### Menangani Kesalahan

Berikan pesan kesalahan dalam beberapa bahasa:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      id: "Terjadi kesalahan yang tidak terduga.",
    }),
    500
  );
});
```

---

### Menggunakan Varian Locale

Tentukan terjemahan untuk varian khusus locale:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      id: "Halo!",
    })
  );
});
```

---

## Topik Lanjutan

### Mekanisme Fallback

Jika locale yang disukai tidak tersedia, fungsi `t` akan beralih ke locale default yang ditentukan dalam konfigurasi:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.INDONESIAN],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### Penegakan Mode Ketat

Konfigurasikan fungsi `t` untuk menegakkan kepatuhan ketat terhadap locale yang dideklarasikan:

| Mode        | Perilaku                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| `strict`    | Semua locale yang dideklarasikan harus memiliki terjemahan. Locale yang hilang akan menyebabkan kesalahan.  |
| `inclusive` | Locale yang dideklarasikan harus memiliki terjemahan. Locale yang hilang memicu peringatan tetapi diterima. |
| `loose`     | Locale apa pun yang ada diterima, meskipun tidak dideklarasikan.                                            |

---

### Integrasi TypeScript

Fungsi `t` aman secara tipe saat digunakan dengan TypeScript. Tentukan objek terjemahan yang aman secara tipe:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  id: "Selamat pagi!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Kesalahan Umum dan Pemecahan Masalah

| Masalah                     | Penyebab                                 | Solusi                                                        |
| --------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| Fungsi `t` tidak berfungsi  | Middleware tidak dimuat                  | Pastikan `app.use("*", intlayer())` ditambahkan sebelum rute. |
| Kesalahan terjemahan hilang | Mode ketat diaktifkan tanpa semua locale | Sediakan semua terjemahan yang diperlukan.                    |

---

## Kesimpulan

Fungsi `t` adalah alat yang ampuh untuk internasionalisasi backend. Dengan menggunakannya secara efektif, Anda dapat membuat aplikasi yang lebih inklusif dan ramah pengguna untuk audiens global. Untuk penggunaan lanjutan dan opsi konfigurasi mendetail, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
