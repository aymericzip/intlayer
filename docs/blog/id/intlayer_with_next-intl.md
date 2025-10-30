---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Cara mengotomatiskan terjemahan JSON next-intl Anda menggunakan Intlayer
description: Otomatiskan terjemahan JSON Anda dengan Intlayer dan next-intl untuk peningkatan internasionalisasi dalam aplikasi Next.js.
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Berubah ke plugin syncJSON
---

# Cara mengotomatiskan terjemahan JSON next-intl Anda menggunakan Intlayer

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi sumber terbuka yang inovatif, dirancang untuk mengatasi kekurangan solusi i18n tradisional. Ini menawarkan pendekatan modern untuk manajemen konten dalam aplikasi Next.js.

Lihat perbandingan konkret dengan next-intl dalam posting blog kami [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md).

## Mengapa Menggabungkan Intlayer dengan next-intl?

Meskipun Intlayer menyediakan solusi i18n mandiri yang sangat baik (lihat [panduan integrasi Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)), Anda mungkin ingin menggabungkannya dengan next-intl karena beberapa alasan:

1. **Basis kode yang sudah ada**: Anda memiliki implementasi next-intl yang sudah mapan dan ingin secara bertahap bermigrasi ke pengalaman pengembang Intlayer yang lebih baik.
2. **Persyaratan warisan**: Proyek Anda memerlukan kompatibilitas dengan plugin atau alur kerja next-intl yang sudah ada.
3. **Kenyamanan Tim**: Tim Anda sudah terbiasa dengan next-intl tetapi menginginkan manajemen konten yang lebih baik.

**Untuk itu, Intlayer dapat diimplementasikan sebagai adaptor untuk next-intl guna membantu mengotomatisasi terjemahan JSON Anda dalam CLI atau pipeline CI/CD, menguji terjemahan Anda, dan lainnya.**

Panduan ini menunjukkan cara memanfaatkan sistem deklarasi konten unggulan Intlayer sambil mempertahankan kompatibilitas dengan next-intl.

## Daftar Isi

<TOC/>

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dengan next-intl

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

**Deskripsi paket:**

- **intlayer**: Perpustakaan inti untuk manajemen internasionalisasi, deklarasi konten, dan pembangunan
- **@intlayer/sync-json-plugin**: Plugin untuk mengekspor deklarasi konten Intlayer ke format JSON yang kompatibel dengan next-intl

### Langkah 2: Implementasikan plugin Intlayer untuk membungkus JSON

Buat file konfigurasi Intlayer untuk mendefinisikan locale yang didukung:

**Jika Anda juga ingin mengekspor kamus JSON untuk next-intl**, tambahkan plugin `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Plugin `syncJSON` akan secara otomatis membungkus JSON. Plugin ini akan membaca dan menulis file JSON tanpa mengubah arsitektur kontennya.

Jika Anda ingin membuat JSON tersebut berdampingan dengan file deklarasi konten intlayer (`.content` files), Intlayer akan melanjutkan dengan cara berikut:

    1. memuat baik file JSON maupun file deklarasi konten dan mengubahnya menjadi kamus intlayer.
    2. jika terdapat konflik antara JSON dan file deklarasi konten, Intlayer akan memproses penggabungan semua kamus tersebut. Tergantung pada prioritas plugin, dan prioritas file deklarasi konten (semua dapat dikonfigurasi).

Jika perubahan dilakukan menggunakan CLI untuk menerjemahkan JSON, atau menggunakan CMS, Intlayer akan memperbarui file JSON dengan terjemahan baru.

## Konfigurasi Git

Disarankan untuk mengabaikan file Intlayer yang dihasilkan secara otomatis:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

File-file ini dapat dihasilkan ulang selama proses build Anda dan tidak perlu dikomit ke kontrol versi.

### Ekstensi VS Code

Untuk pengalaman pengembang yang lebih baik, pasang **Ekstensi Intlayer VS Code** resmi:

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
