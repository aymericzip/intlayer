---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Plugin Sync PO
description: Sinkronkan kamus Intlayer dengan file Gettext PO. Pertahankan i18n Anda yang sudah ada sambil menggunakan Intlayer untuk mengelola, menerjemahkan, dan menguji pesan Anda.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - terjemahan
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Dokumentasi awal plugin Sync PO"
---

# Sync PO (jembatan i18n) - Sync PO dengan dukungan ICU / i18next

Gunakan Intlayer sebagai tambahan untuk stack i18n Anda yang sudah ada. Plugin ini menjaga pesan Gettext PO Anda tetap sinkron dengan kamus Intlayer sehingga Anda dapat:

- Mempertahankan alur kerja terjemahan berbasis PO yang sudah ada.
- Mengelola dan menerjemahkan pesan Anda dengan Intlayer (CLI, CI, penyedia, CMS), tanpa merombak aplikasi Anda.
- Mengirimkan tutorial dan konten SEO yang menargetkan setiap ekosistem, sambil menyarankan Intlayer sebagai lapisan manajemen PO.

Catatan dan cakupan saat ini:

- Eksternalisasi ke CMS berfungsi untuk terjemahan dan teks klasik.
- Belum ada dukungan untuk penyisipan, jamak/ICU, atau fitur runtime lanjutan dari pustaka lain di dalam entri PO itu sendiri.
- Editor visual belum didukung untuk output i18n pihak ketiga.

### Kapan menggunakan plugin ini

- Anda sudah menggunakan file Gettext PO untuk terjemahan Anda.
- Anda ingin pengisian berbantuan AI, pengujian di CI, dan operasi konten tanpa mengubah runtime rendering Anda.

## Instalasi

```bash
pnpm add -D @intlayer/sync-po-plugin
# atau
npm i -D @intlayer/sync-po-plugin
```

## Plugin

Paket ini menyediakan dua plugin:

- `loadPO`: Memuat file PO ke dalam kamus Intlayer.
  - Plugin ini digunakan untuk memuat file PO dari sumber dan akan dimuat ke dalam kamus Intlayer. Ini dapat memindai semua basis kode dan mencari file PO tertentu.
    Plugin ini dapat digunakan:
    - jika Anda menggunakan pustaka i18n yang mengharuskan lokasi tertentu untuk file PO Anda dimuat, tetapi Anda ingin menempatkan deklarasi konten di mana pun Anda inginkan dalam basis kode Anda.
    - Ini juga dapat digunakan jika Anda ingin mengambil pesan Anda dari sumber jarak jauh (misalnya: CMS, API, dll.) dan menyimpan pesan Anda dalam file PO.

  > Di balik layar, plugin ini akan memindai semua basis kode dan mencari file PO tertentu serta memuatnya ke dalam kamus Intlayer.
  > Perhatikan bahwa plugin ini tidak akan menulis output dan terjemahan kembali ke file PO.

- `syncPO`: Sinkronkan file PO dengan kamus Intlayer.
  - Plugin ini digunakan untuk menyinkronkan file PO dengan kamus Intlayer. Ini dapat memindai lokasi yang diberikan dan memuat PO yang cocok dengan pola untuk file PO tertentu. Plugin ini berguna jika Anda ingin mendapatkan manfaat Intlayer sambil menggunakan pustaka i18n lain.

## Menggunakan kedua plugin

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Jaga agar file PO Anda saat ini tetap sinkron dengan kamus Intlayer
  plugins: [
    /**
     * Akan memuat semua file PO di src yang cocok dengan pola {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Memastikan file PO ini lebih diutamakan daripada file di `./locales/en/${key}.po`
    }),
    /**
     * Akan memuat, dan menulis output dan terjemahan kembali ke file PO di direktori locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Plugin `syncPO`

### Mulai cepat

Tambahkan plugin ke `intlayer.config.ts` Anda dan arahkan ke struktur PO Anda yang sudah ada.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Jaga agar file PO Anda saat ini tetap sinkron dengan kamus Intlayer
  plugins: [
    syncPO({
      // Tata letak per-lokal, per-namespace
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternatif: satu file per lokal:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Cara kerjanya

- Baca: plugin menemukan file PO dari pembangun `source` Anda dan memuatnya sebagai kamus Intlayer.
- Tulis: setelah pembangunan dan pengisian, ia menulis PO yang dilokalkan kembali ke jalur yang sama (dengan header Gettext yang tepat).
- Pengisian otomatis: plugin mendeklarasikan jalur `autoFill` untuk setiap kamus. Menjalankan `intlayer fill` memperbarui hanya terjemahan yang hilang di file PO Anda secara default.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // wajib
  location?: string, // label opsional, default: "sync-po::path/to/source"
  priority?: number, // prioritas opsional untuk resolusi konflik, default: 0
});
```

### Beberapa sumber PO dan prioritas

Anda dapat menambahkan beberapa plugin `syncPO` untuk menyinkronkan sumber PO yang berbeda. Ini berguna ketika Anda memiliki beberapa sumber terjemahan atau struktur PO yang berbeda dalam proyek Anda.

#### Sistem prioritas

Ketika beberapa plugin menargetkan kunci kamus yang sama, parameter `priority` menentukan plugin mana yang lebih diutamakan:

- Nomor prioritas yang lebih tinggi menang atas yang lebih rendah
- Prioritas default file `.content` adalah `0`
- Prioritas default plugin adalah `0`
- Plugin dengan prioritas yang sama diproses sesuai urutan kemunculannya dalam konfigurasi

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Sumber PO utama (prioritas tertinggi)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Sumber PO cadangan (prioritas lebih rendah)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Sumber PO lama (prioritas terendah)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Plugin Load PO

### Mulai cepat

Tambahkan plugin ke `intlayer.config.ts` Anda untuk memasukkan file PO yang ada sebagai kamus Intlayer. Plugin ini bersifat baca-saja (tidak ada penulisan ke disk):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Masukkan pesan PO yang terletak di mana saja di pohon sumber Anda
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Muat satu lokal per instansi plugin (default ke defaultLocale konfigurasi)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternatif: tata letak per-lokal, masih baca-saja (hanya lokal yang dipilih yang dimuat):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Hanya file untuk Locales.FRENCH yang akan dimuat dari pola ini
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Cara kerjanya

- Temukan: membangun glob dari pembangun `source` Anda dan mengumpulkan file PO yang cocok.
- Masukkan: memuat setiap file PO sebagai kamus Intlayer dengan `locale` yang disediakan.
- Baca-saja: tidak menulis atau memformat file output; gunakan `syncPO` jika Anda memerlukan sinkronisasi bolak-balik.
- Siap pengisian otomatis: menentukan jalur `fill` sehingga `intlayer content fill` dapat mengisi kunci yang hilang.

### API

```ts
loadPO({
  // Bangun jalur ke PO Anda. `locale` bersifat opsional jika struktur Anda tidak memiliki segmen lokal
  source: ({ key, locale }) => string,

  // Lokal target untuk kamus yang dimuat oleh instansi plugin ini
  // Default ke configuration.internationalization.defaultLocale
  locale?: Locale,

  // Label opsional untuk mengidentifikasi sumber
  location?: string, // default: "plugin"

  // Prioritas yang digunakan untuk resolusi konflik terhadap sumber lain
  priority?: number, // default: 0
});
```

### Perilaku dan konvensi

- Jika mask `source` Anda menyertakan placeholder lokal, hanya file untuk `locale` yang dipilih yang dimasukkan.
- Jika tidak ada segmen `{key}` di mask Anda, kunci kamus adalah "index".
- Kunci diturunkan dari jalur file dengan mengganti placeholder `{key}` di pembangun `source` Anda.
- Plugin hanya menggunakan file yang ditemukan dan tidak membuat lokal atau kunci yang hilang.
- Jalur `fill` disimpulkan dari `source` Anda dan digunakan untuk memperbarui nilai yang hilang melalui CLI saat Anda memilih untuk ikut serta.

## Resolusi konflik

Ketika kunci terjemahan yang sama ada di beberapa sumber PO:

1. Plugin dengan prioritas tertinggi menentukan nilai akhir
2. Sumber prioritas lebih rendah digunakan sebagai cadangan untuk kunci yang hilang
3. Ini memungkinkan Anda untuk mempertahankan terjemahan lama sambil secara bertahap bermigrasi ke struktur baru

## CLI

File PO yang disinkronkan akan dianggap sebagai file `.content` lainnya. Itu berarti, semua perintah intlayer akan tersedia untuk file PO yang disinkronkan. Termasuk:

- `intlayer content test` untuk menguji apakah ada terjemahan yang hilang
- `intlayer content list` untuk mencantumkan file PO yang disinkronkan
- `intlayer content fill` untuk mengisi terjemahan yang hilang
- `intlayer content push` untuk mendorong file PO yang disinkronkan
- `intlayer content pull` untuk menarik file PO yang disinkronkan

Lihat [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) untuk detail lebih lanjut.

## Batasan (saat ini)

- Tidak ada dukungan penyisipan atau jamak/ICU saat menargetkan pustaka pihak ketiga.
- Editor visual belum tersedia untuk runtime non-Intlayer.
- Hanya sinkronisasi PO; format katalog non-PO tidak didukung.

## Mengapa ini penting

- Kami dapat merekomendasikan solusi i18n yang sudah mapan dan memposisikan Intlayer sebagai tambahan.
- Kami memanfaatkan SEO/kata kunci mereka dengan tutorial yang diakhiri dengan menyarankan Intlayer untuk mengelola PO.
- Memperluas audiens yang dapat dituju dari "proyek baru" menjadi "tim mana pun yang sudah menggunakan i18n".
