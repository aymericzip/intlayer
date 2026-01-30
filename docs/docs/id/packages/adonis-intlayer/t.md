---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Dokumentasi Fungsi t | adonis-intlayer
description: Lihat cara menggunakan fungsi t untuk paket adonis-intlayer
keywords:
  - t
  - terjemahan
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Dokumentasi awal
---

# Dokumentasi: Fungsi `t` dalam `adonis-intlayer`

Fungsi `t` dalam paket `adonis-intlayer` adalah utilitas inti untuk menyediakan respons yang dilokalisasi dalam aplikasi AdonisJS Anda. Ini menyederhanakan internasionalisasi (i18n) dengan secara dinamis memilih konten berdasarkan bahasa pilihan pengguna.

---

## Ringkasan

Fungsi `t` digunakan untuk mendefinisikan dan mengambil terjemahan untuk set bahasa tertentu. Ini secara otomatis menentukan bahasa yang tepat untuk dikembalikan berdasarkan pengaturan permintaan klien, seperti header `Accept-Language`. Jika bahasa pilihan tidak tersedia, ia akan beralih dengan anggun ke locale default yang ditentukan dalam konfigurasi Anda.

---

## Fitur Utama

- **Lokalisasi Dinamis**: Secara otomatis memilih terjemahan yang paling sesuai untuk klien.
- **Fallback ke Locale Default**: Beralih ke locale default jika bahasa pilihan klien tidak tersedia, memastikan kontinuitas dalam pengalaman pengguna.
- **Konteks Asinkron**: Bekerja dengan mulus dalam siklus hidup permintaan AdonisJS menggunakan Async Local Storage.
- **Dukungan TypeScript**: Menegakkan keamanan tipe untuk terjemahan Anda.

---

## Tanda Tangan Fungsi

```typescript
t(translations: Record<string, any>): any;
```

### Parameter

- `translations`: Sebuah objek di mana kuncinya adalah kode locale (misalnya, `en`, `fr`, `es`) dan nilainya adalah konten terjemahan yang sesuai.

### Kembalian

- Konten yang mewakili bahasa pilihan klien.

---

## Memuat Middleware

Untuk memastikan bahwa fungsi `t` bekerja dengan benar, Anda **harus** mendaftarkan middleware `intlayer` dalam aplikasi AdonisJS Anda.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Contoh Penggunaan

### Contoh Dasar

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### Penggunaan dalam Controller

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour dari controller",
      })
    );
  }
}
```

---

## Topik Lanjutan

### Mekanisme Fallback

Jika locale pilihan tidak tersedia, fungsi `t` akan beralih ke locale default yang ditentukan dalam `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Integrasi TypeScript

Fungsi `t` aman secara tipe saat digunakan dengan kamus yang ditentukan. Untuk detail lebih lanjut, lihat [dokumentasi TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).
