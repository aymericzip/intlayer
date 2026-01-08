---
createdAt: 2025-03-13
updatedAt: 2025-12-13
title: Plugin Sinkronisasi JSON
description: Sinkronkan kamus Intlayer dengan file JSON i18n pihak ketiga (i18next, next-intl, react-intl, vue-i18n, dan lainnya). Pertahankan i18n Anda yang sudah ada sambil menggunakan Intlayer untuk mengelola, menerjemahkan, dan menguji pesan Anda.
keywords:
  - Intlayer
  - Sinkronisasi JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - terjemahan
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Menambahkan dukungan format ICU dan i18next
  - version: 6.1.6
    date: 2025-10-05
    changes: Dokumentasi awal plugin Sinkronisasi JSON
---

# Sinkronisasi JSON (jembatan i18n) - Sinkronisasi JSON dengan dukungan ICU / i18next

<iframe title="Cara menjaga terjemahan JSON Anda tetap sinkron dengan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Gunakan Intlayer sebagai tambahan pada tumpukan i18n Anda yang sudah ada. Plugin ini menjaga pesan JSON Anda tetap sinkron dengan kamus Intlayer sehingga Anda dapat:

- Mempertahankan i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n, dll.
- Mengelola dan menerjemahkan pesan Anda dengan Intlayer (CLI, CI, penyedia, CMS), tanpa perlu merombak aplikasi Anda.
- Mengirimkan tutorial dan konten SEO yang menargetkan setiap ekosistem, sambil menyarankan Intlayer sebagai lapisan pengelolaan JSON.

Catatan dan cakupan saat ini:

- Eksternalisasi ke CMS berfungsi untuk terjemahan dan teks klasik.
- Belum mendukung penyisipan, bentuk jamak/ICU, atau fitur runtime lanjutan dari pustaka lain.
- Editor visual belum didukung untuk output i18n pihak ketiga.

### Kapan menggunakan plugin ini

- Anda sudah menggunakan perpustakaan i18n dan menyimpan pesan dalam file JSON.
- Anda menginginkan pengisian berbantuan AI, pengujian di CI, dan operasi konten tanpa mengubah runtime rendering Anda.

## Instalasi

```bash
pnpm add -D @intlayer/sync-json-plugin
# atau
npm i -D @intlayer/sync-json-plugin
```

## Mulai cepat

Tambahkan plugin ke `intlayer.config.ts` Anda dan arahkan ke struktur JSON yang sudah ada.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Jaga file JSON Anda saat ini tetap sinkron dengan kamus Intlayer
  plugins: [
    syncJSON({
      // Tata letak per-locale, per-namespace (misalnya, next-intl, i18next dengan namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternatif: satu file per locale (umum dengan pengaturan i18next/react-intl):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Cara kerjanya

- Baca: plugin menemukan file JSON dari pembangun `source` Anda dan memuatnya sebagai kamus Intlayer.
- Tulis: setelah proses build dan pengisian, plugin menulis kembali JSON yang sudah dilokalkan ke jalur yang sama (dengan newline akhir untuk menghindari masalah format).
- Auto‑fill: plugin mendeklarasikan jalur `autoFill` untuk setiap kamus. Menjalankan `intlayer fill` secara default hanya memperbarui terjemahan yang hilang dalam file JSON Anda.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // wajib
  location?: string, // label opsional, default: "plugin"
  priority?: number, // prioritas opsional untuk resolusi konflik, default: 0
  format?: 'intlayer' | 'icu' | 'i18next', // formatter opsional, digunakan untuk kompatibilitas runtime Intlayer
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Menentukan formatter yang akan digunakan untuk konten kamus saat menyinkronkan file JSON. Ini memungkinkan penggunaan berbagai sintaks pemformatan pesan yang kompatibel dengan runtime Intlayer.

- `undefined`: Tidak ada formatter yang akan digunakan, konten JSON akan digunakan apa adanya.
- `'intlayer'`: Formatter Intlayer default (default).
- `'icu'`: Menggunakan pemformatan pesan ICU (kompatibel dengan pustaka seperti react-intl, vue-i18n).
- `'i18next'`: Menggunakan pemformatan pesan i18next (kompatibel dengan i18next, next-i18next, Solid-i18next).

> Perhatikan bahwa menggunakan formatter akan mengubah konten JSON Anda pada input dan output. Untuk aturan JSON yang kompleks seperti pluralisasi ICU, parsing mungkin tidak menjamin pemetaan 1 ke 1 antara input dan output.
> Jika Anda tidak menggunakan runtime Intlayer, Anda mungkin lebih memilih untuk tidak mengatur formatter.

**Contoh:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Gunakan pemformatan i18next untuk kompatibilitas
}),
```

## Beberapa sumber JSON dan prioritas

Anda dapat menambahkan beberapa plugin `syncJSON` untuk menyinkronkan berbagai sumber JSON. Ini berguna ketika Anda memiliki beberapa pustaka i18n atau struktur JSON yang berbeda dalam proyek Anda.

### Sistem prioritas

Ketika beberapa plugin menargetkan kunci kamus yang sama, parameter `priority` menentukan plugin mana yang diutamakan:

- Angka prioritas yang lebih tinggi menang atas yang lebih rendah
- Prioritas default untuk file `.content` adalah `0`
- Prioritas default untuk file konten plugin adalah `-1`
- Plugin dengan prioritas yang sama diproses sesuai urutan kemunculannya dalam konfigurasi

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Sumber JSON utama (prioritas tertinggi)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Sumber JSON cadangan (prioritas lebih rendah)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Sumber JSON Legacy (prioritas terendah)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Penyelesaian konflik

Ketika kunci terjemahan yang sama ada di beberapa sumber JSON:

1. Plugin dengan prioritas tertinggi menentukan nilai akhir
2. Sumber dengan prioritas lebih rendah digunakan sebagai cadangan untuk kunci yang hilang
3. Ini memungkinkan Anda mempertahankan terjemahan legacy sambil secara bertahap bermigrasi ke struktur baru

## Integrasi

Berikut adalah pemetaan umum. Biarkan runtime Anda tetap tidak berubah; hanya tambahkan plugin.

### i18next

Tata letak file tipikal: `./public/locales/{locale}/{namespace}.json` atau `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

Pesan JSON per-locale (sering `./messages/{locale}.json`) atau per-namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

Lihat juga: `docs/id/intlayer_with_next-intl.md`.

### react-intl

JSON tunggal per locale adalah umum:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Baik satu file per locale atau per-namespace:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

File JSON yang disinkronkan akan dianggap sebagai file `.content` lainnya. Artinya, semua perintah intlayer akan tersedia untuk file JSON yang disinkronkan. Termasuk:

- `intlayer content test` untuk menguji apakah ada terjemahan yang hilang
- `intlayer content list` untuk mendaftar file JSON yang disinkronkan
- `intlayer content fill` untuk mengisi terjemahan yang hilang
- `intlayer content push` untuk mengirim file JSON yang disinkronkan
- `intlayer content pull` untuk menarik file JSON yang disinkronkan

Lihat [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md) untuk detail lebih lanjut.

## Keterbatasan (saat ini)

- Tidak ada dukungan penyisipan atau bentuk jamak/ICU saat menargetkan pustaka pihak ketiga.
- Editor visual belum tersedia untuk runtime non-Intlayer.
- Sinkronisasi hanya untuk JSON; format katalog non-JSON tidak didukung.

## Mengapa ini penting

- Kami dapat merekomendasikan solusi i18n yang sudah mapan dan memposisikan Intlayer sebagai tambahan.
- Kami memanfaatkan SEO/kata kunci mereka dengan tutorial yang berakhir dengan menyarankan Intlayer untuk mengelola JSON.
- Memperluas audiens yang dapat dijangkau dari “proyek baru” menjadi “tim mana pun yang sudah menggunakan i18n”.
