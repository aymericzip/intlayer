---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Cara mengotomatisasi terjemahan JSON react-i18next Anda menggunakan Intlayer
description: Otomatiskan terjemahan JSON Anda dengan Intlayer dan react-i18next untuk peningkatan internasionalisasi dalam aplikasi React.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internasionalisasi
  - i18n
  - Blog
  - React
  - JavaScript
  - TypeScript
  - Manajemen Konten
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Menambahkan plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Mengubah ke plugin syncJSON
---

# Cara mengotomatisasi terjemahan JSON react-i18next Anda menggunakan Intlayer

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi sumber terbuka yang inovatif, dirancang untuk mengatasi kekurangan solusi i18n tradisional. Ini menawarkan pendekatan modern untuk manajemen konten dalam aplikasi React.

Lihat perbandingan konkret dengan react-i18next dalam posting blog kami [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/react-i18next_vs_react-intl_vs_intlayer.md).

## Mengapa Menggabungkan Intlayer dengan react-i18next?

Meskipun Intlayer menyediakan solusi i18n mandiri yang sangat baik (lihat [panduan integrasi React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)), Anda mungkin ingin menggabungkannya dengan react-i18next untuk beberapa alasan:

1. **Basis kode yang sudah ada**: Anda memiliki implementasi react-i18next yang sudah mapan dan ingin secara bertahap bermigrasi ke pengalaman pengembang yang lebih baik dari Intlayer.
2. **Persyaratan warisan**: Proyek Anda memerlukan kompatibilitas dengan plugin atau alur kerja react-i18next yang sudah ada.
3. **Kenyamanan tim**: Tim Anda sudah terbiasa dengan react-i18next tetapi menginginkan manajemen konten yang lebih baik.
4. **Menggunakan fitur Intlayer**: Anda ingin menggunakan fitur Intlayer seperti deklarasi konten, otomatisasi terjemahan, pengujian terjemahan, dan lainnya.

**Untuk itu, Intlayer dapat diimplementasikan sebagai adaptor untuk react-i18next guna membantu mengotomatisasi terjemahan JSON Anda di CLI atau pipeline CI/CD, menguji terjemahan Anda, dan lainnya.**

Panduan ini menunjukkan cara memanfaatkan sistem deklarasi konten unggulan Intlayer sambil mempertahankan kompatibilitas dengan react-i18next.

## Daftar Isi

<TOC/>

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dengan react-i18next

### Langkah 1: Instalasi Dependensi

Instal paket-paket yang diperlukan:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Deskripsi paket:**

- **intlayer**: Perpustakaan inti untuk manajemen internasionalisasi, deklarasi konten, dan pembangunan
- **@intlayer/sync-json-plugin**: Plugin untuk mengekspor deklarasi konten Intlayer ke format JSON yang kompatibel dengan react-i18next

### Langkah 2: Implementasikan plugin Intlayer untuk membungkus JSON

Buat file konfigurasi Intlayer untuk mendefinisikan locale yang didukung:

**Jika Anda juga ingin mengekspor kamus JSON untuk react-i18next**, tambahkan plugin `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Plugin `syncJSON` akan secara otomatis membungkus JSON. Plugin ini akan membaca dan menulis file JSON tanpa mengubah arsitektur kontennya.

Jika Anda ingin membuat JSON tersebut berdampingan dengan file deklarasi konten intlayer (`.content` files), Intlayer akan memprosesnya dengan cara berikut:

    1. memuat baik file JSON maupun file deklarasi konten dan mengubahnya menjadi kamus intlayer.
    2. jika terdapat konflik antara file JSON dan file deklarasi konten, Intlayer akan melakukan penggabungan dari semua kamus tersebut. Bergantung pada prioritas plugin, dan prioritas file deklarasi konten (semuanya dapat dikonfigurasi).

Jika perubahan dilakukan menggunakan CLI untuk menerjemahkan JSON, atau menggunakan CMS, Intlayer akan memperbarui file JSON dengan terjemahan baru tersebut.

Untuk melihat lebih detail tentang plugin `syncJSON`, silakan merujuk ke [dokumentasi plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md).

### (Opsional) Langkah 3: Implementasi terjemahan JSON per-komponen

Secara default, Intlayer akan memuat, menggabungkan, dan menyinkronkan baik file JSON maupun file deklarasi konten. Lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md) untuk informasi lebih lanjut. Namun jika Anda lebih memilih, menggunakan plugin Intlayer, Anda juga dapat mengimplementasikan manajemen JSON terlokalisasi per-komponen di mana saja dalam basis kode Anda.

Untuk itu, Anda dapat menggunakan plugin `loadJSON`.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Menjaga file JSON Anda saat ini tetap sinkron dengan kamus Intlayer
  plugins: [
    /**
     * Akan memuat semua file JSON di src yang cocok dengan pola {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Memastikan file JSON ini memiliki prioritas lebih tinggi daripada file di `./locales/en/${key}.json`
    }),
    /**
     * Akan memuat, dan menulis output serta terjemahan kembali ke file JSON di direktori locales
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Ini akan memuat semua file JSON di direktori `src` yang cocok dengan pola `{key}.i18n.json` dan memuatnya sebagai kamus Intlayer.

## Konfigurasi Git

Disarankan untuk mengabaikan file Intlayer yang dihasilkan secara otomatis:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

File-file ini dapat dibuat ulang selama proses build Anda dan tidak perlu dikomit ke kontrol versi.

### Ekstensi VS Code

Untuk pengalaman pengembang yang lebih baik, pasang **Ekstensi VS Code Intlayer** resmi:

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
