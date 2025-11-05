---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Bagaimana cara menyesuaikan daftar locale?
description: Pelajari cara menyesuaikan daftar locale.
keywords:
  - locales
  - daftar
  - intlayer
  - konfigurasi
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - locale
  - daftar
slugs:
  - frequent-questions
  - customized-locale-list
---

# Apakah mungkin untuk memblokir tipe bahasa, seperti Bahasa Inggris? Saya menambahkan bahasa Inggris dalam kamus saya tetapi saya belum ingin bahasa Inggris tersedia di situs web

Ya, Anda dapat memblokir tipe bahasa, seperti Bahasa Inggris, dengan menggunakan opsi `availableLocales` dalam konfigurasi Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

atau

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

Konfigurasi ini akan mengubah tipe fungsi `t()` Anda sehingga hanya mencakup locale yang tersedia.

Available locales bersifat opsional, jika Anda tidak menyediakannya, semua locale akan tersedia.

Berhati-hatilah, semua locale yang termasuk dalam opsi `availableLocales` harus juga termasuk dalam opsi `locales`.

Perlu dicatat bahwa jika Anda menggunakan hook `useLocale`, opsi `availableLocales` akan digunakan untuk mengatur akses ke daftar locale.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
