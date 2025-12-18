---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi getLocaleName | intlayer
description: Lihat cara menggunakan fungsi getLocaleName untuk paket intlayer
keywords:
  - getLocaleName
  - terjemahan
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: Tambahkan polyfills untuk React Native dan lingkungan yang lebih lama
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `getLocaleName` di `intlayer`

## Deskripsi

Fungsi `getLocaleName` mengembalikan nama lokal dari locale tertentu (`targetLocale`) dalam locale tampilan (`displayLocale`). Jika `targetLocale` tidak diberikan, fungsi ini mengembalikan nama dari `displayLocale` dalam bahasanya sendiri.

## Parameter

- `displayLocale: Locales`
  - **Deskripsi**: Locale di mana nama dari target locale akan ditampilkan.
  - **Tipe**: Enum atau string yang mewakili locale yang valid.

- `targetLocale?: Locales`
  - **Deskripsi**: Locale yang namanya akan dilokalkan.
  - **Tipe**: Opsional. Enum atau string yang mewakili locale yang valid.

## Pengembalian

- **Tipe**: `string`
- **Deskripsi**: Nama lokal dari `targetLocale` dalam `displayLocale`, atau nama `displayLocale` itu sendiri jika `targetLocale` tidak diberikan. Jika tidak ditemukan terjemahan, akan mengembalikan `"Unknown locale"`.

## Contoh Penggunaan

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
javascript codeFormat="esm"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

## Kasus Tepi

- **Tidak ada `targetLocale` yang diberikan:**
  - Fungsi secara default mengembalikan nama dari `displayLocale` itu sendiri.
- **Terjemahan yang hilang:**
  - Jika `localeNameTranslations` tidak berisi entri untuk `targetLocale` atau `displayLocale` tertentu, fungsi akan kembali ke `ownLocalesName` atau mengembalikan `"Unknown locale"`.

## Polyfills untuk React Native dan Lingkungan yang Lebih Lama

Fungsi `getLocaleName` bergantung pada API `Intl.DisplayNames`, yang tidak tersedia di React Native atau lingkungan JavaScript yang lebih lama. Jika Anda menggunakan `getLocaleName` di lingkungan ini, Anda perlu menambahkan polyfills.

Impor polyfills di awal aplikasi Anda, idealnya di file titik masuk Anda (misalnya, `index.js`, `App.tsx`, atau `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

Untuk detail lebih lanjut, lihat [dokumentasi polyfills FormatJS](https://formatjs.io/docs/polyfills/intl-displaynames/).
