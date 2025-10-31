---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Cara mengotomatisasi terjemahan JSON react-intl Anda menggunakan Intlayer
description: Otomatiskan terjemahan JSON Anda dengan Intlayer dan react-intl untuk meningkatkan internasionalisasi dalam aplikasi React.
keywords:
  - react-intl
  - Intlayer
  - Internasionalisasi
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Berubah ke plugin syncJSON
---

# Cara mengotomatisasi terjemahan JSON react-intl Anda menggunakan Intlayer

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi sumber terbuka yang inovatif, dirancang untuk mengatasi kekurangan solusi i18n tradisional. Ini menawarkan pendekatan modern untuk manajemen konten dalam aplikasi React.

Lihat perbandingan konkret dengan react-intl di posting blog kami [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/react-i18next_vs_react-intl_vs_intlayer.md).

## Mengapa Menggabungkan Intlayer dengan react-intl?

Meskipun Intlayer menyediakan solusi i18n mandiri yang sangat baik (lihat [panduan integrasi React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)), Anda mungkin ingin menggabungkannya dengan react-intl untuk beberapa alasan:

1. **Basis kode yang sudah ada**: Anda memiliki implementasi react-intl yang sudah mapan dan ingin secara bertahap bermigrasi ke pengalaman pengembang Intlayer yang lebih baik.
2. **Persyaratan warisan**: Proyek Anda memerlukan kompatibilitas dengan plugin atau alur kerja react-intl yang sudah ada.
3. **Kenyamanan tim**: Tim Anda sudah terbiasa dengan react-intl tetapi menginginkan manajemen konten yang lebih baik.

**Untuk itu, Intlayer dapat diimplementasikan sebagai adaptor untuk react-intl guna membantu mengotomatisasi terjemahan JSON Anda di CLI atau pipeline CI/CD, menguji terjemahan Anda, dan lainnya.**

Panduan ini menunjukkan cara memanfaatkan sistem deklarasi konten Intlayer yang unggul sambil mempertahankan kompatibilitas dengan react-intl.

## Daftar Isi

<TOC/>

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dengan react-intl

### Langkah 1: Instalasi Dependensi

Pasang paket yang diperlukan:

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
- **@intlayer/sync-json-plugin**: Plugin untuk mengekspor deklarasi konten Intlayer ke format JSON yang kompatibel dengan react-intl

### Langkah 2: Implementasikan plugin Intlayer untuk membungkus JSON

Buat file konfigurasi Intlayer untuk mendefinisikan locale yang didukung:

**Jika Anda juga ingin mengekspor kamus JSON untuk react-intl**, tambahkan plugin `syncJSON`:

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Plugin `syncJSON` akan secara otomatis membungkus JSON. Plugin ini akan membaca dan menulis file JSON tanpa mengubah arsitektur konten.

Jika Anda ingin membuat JSON tersebut berdampingan dengan file deklarasi konten intlayer (`.content` files), Intlayer akan melanjutkan dengan cara berikut:

    1. memuat baik file JSON maupun file deklarasi konten dan mengubahnya menjadi kamus intlayer.
    2. jika terdapat konflik antara file JSON dan file deklarasi konten, Intlayer akan memproses penggabungan semua kamus tersebut. Tergantung pada prioritas plugin, dan prioritas file deklarasi konten (semua dapat dikonfigurasi).

Jika perubahan dilakukan menggunakan CLI untuk menerjemahkan JSON, atau menggunakan CMS, Intlayer akan memperbarui file JSON dengan terjemahan baru.

Untuk melihat lebih detail tentang plugin `syncJSON`, silakan merujuk ke [dokumentasi plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md).

## Konfigurasi Git

Disarankan untuk mengabaikan file Intlayer yang dihasilkan secara otomatis:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

    File-file ini dapat dihasilkan ulang selama proses build Anda dan tidak perlu dikomit ke kontrol versi.

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembang, instal **Ekstensi VS Code Intlayer** resmi:

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
