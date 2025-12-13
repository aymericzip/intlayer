---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer dan next-i18next
description: Integrasikan Intlayer dengan next-i18next untuk solusi internasionalisasi Next.js yang komprehensif
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internasionalisasi
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Menambahkan plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Berubah ke plugin syncJSON dan penulisan ulang secara menyeluruh
---

# Internasionalisasi Next.js (i18n) dengan next-i18next dan Intlayer

<iframe title="Cara mengotomatisasi terjemahan JSON next-i18next Anda menggunakan Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Daftar Isi

<TOC/>

## Apa itu next-i18next?

**next-i18next** adalah salah satu kerangka kerja internasionalisasi (i18n) yang paling populer untuk aplikasi Next.js. Dibangun di atas ekosistem **i18next** yang kuat, ia menyediakan solusi komprehensif untuk mengelola terjemahan, lokalisasi, dan pergantian bahasa dalam proyek Next.js.

Namun, next-i18next memiliki beberapa tantangan:

- **Konfigurasi yang kompleks**: Mengatur next-i18next memerlukan beberapa file konfigurasi dan penyiapan yang cermat untuk instance i18n di sisi server dan klien.
- **Terjemahan yang tersebar**: File terjemahan biasanya disimpan di direktori yang terpisah dari komponen, sehingga lebih sulit untuk menjaga konsistensi.
- **Manajemen namespace manual**: Pengembang perlu mengelola namespace secara manual dan memastikan pemuatan sumber daya terjemahan yang tepat.
- **Keamanan tipe terbatas**: Dukungan TypeScript memerlukan konfigurasi tambahan dan tidak menyediakan pembuatan tipe otomatis untuk terjemahan.

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi sumber terbuka yang inovatif, dirancang untuk mengatasi kekurangan solusi i18n tradisional. Ini menawarkan pendekatan modern untuk manajemen konten dalam aplikasi Next.js.

Lihat perbandingan konkret dengan next-intl dalam posting blog kami [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md).

## Mengapa Menggabungkan Intlayer dengan next-i18next?

Sementara Intlayer menyediakan solusi i18n mandiri yang sangat baik (lihat [panduan integrasi Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md) kami), Anda mungkin ingin menggabungkannya dengan next-i18next untuk beberapa alasan:

1. **Basis kode yang sudah ada**: Anda memiliki implementasi next-i18next yang sudah mapan dan ingin secara bertahap bermigrasi ke pengalaman pengembang Intlayer yang lebih baik.
2. **Persyaratan warisan**: Proyek Anda memerlukan kompatibilitas dengan plugin atau alur kerja i18next yang sudah ada.
3. **Kenyamanan tim**: Tim Anda sudah terbiasa dengan next-i18next tetapi menginginkan manajemen konten yang lebih baik.

**Untuk itu, Intlayer dapat diimplementasikan sebagai adaptor untuk next-i18next guna membantu mengotomatisasi terjemahan JSON Anda di CLI atau pipeline CI/CD, menguji terjemahan Anda, dan lainnya.**

Panduan ini menunjukkan cara memanfaatkan sistem deklarasi konten unggulan Intlayer sambil mempertahankan kompatibilitas dengan next-i18next.

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dengan next-i18next

### Langkah 1: Instalasi Dependensi

Instal paket yang diperlukan menggunakan manajer paket pilihan Anda:

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

**Penjelasan paket:**

- **intlayer**: Perpustakaan inti untuk deklarasi dan manajemen konten
- **@intlayer/sync-json-plugin**: Plugin untuk menyinkronkan deklarasi konten Intlayer ke format JSON i18next

### Langkah 2: Implementasikan plugin Intlayer untuk membungkus JSON

Buat file konfigurasi Intlayer untuk mendefinisikan locale yang didukung:

**Jika Anda juga ingin mengekspor kamus JSON untuk i18next**, tambahkan plugin `syncJSON`:

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
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Plugin `syncJSON` akan secara otomatis membungkus JSON. Plugin ini akan membaca dan menulis file JSON tanpa mengubah arsitektur kontennya.

Jika Anda ingin membuat JSON tersebut berdampingan dengan file deklarasi konten intlayer (`.content` files), Intlayer akan memprosesnya dengan cara berikut:

    1. memuat baik file JSON maupun file deklarasi konten dan mengubahnya menjadi kamus intlayer.
    2. jika terdapat konflik antara file JSON dan file deklarasi konten, Intlayer akan melakukan penggabungan dari semua kamus tersebut. Hal ini tergantung pada prioritas plugin, dan prioritas file deklarasi konten (semua dapat dikonfigurasi).

Jika perubahan dilakukan menggunakan CLI untuk menerjemahkan JSON, atau menggunakan CMS, Intlayer akan memperbarui file JSON dengan terjemahan baru.

Untuk melihat lebih detail tentang plugin `syncJSON`, silakan merujuk ke [dokumentasi plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md).

---

### (Opsional) Langkah 3: Implementasikan terjemahan JSON per-komponen

Secara default, Intlayer akan memuat, menggabungkan, dan menyinkronkan baik file JSON maupun file deklarasi konten. Lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md) untuk lebih detail. Namun jika Anda lebih suka, menggunakan plugin Intlayer, Anda juga dapat mengimplementasikan manajemen JSON per-komponen yang dilokalkan di mana saja dalam basis kode Anda.

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
      priority: 1, // Memastikan file JSON ini memiliki prioritas lebih tinggi dibanding file di `./public/locales/en/${key}.json`
    }),
    /**
     * Akan memuat, dan menulis output serta terjemahan kembali ke file JSON di direktori locales
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Ini akan memuat semua file JSON di direktori `src` yang sesuai dengan pola `{key}.i18n.json` dan memuatnya sebagai kamus Intlayer.

---

## Konfigurasi Git

Kecualikan file yang dihasilkan dari kontrol versi:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

File-file ini secara otomatis dihasilkan ulang selama proses build dan tidak perlu dikomit ke repositori Anda.

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembang, pasang **Ekstensi VS Code Intlayer** resmi:

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
