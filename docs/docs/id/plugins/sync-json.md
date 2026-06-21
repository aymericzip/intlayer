---
createdAt: 2025-03-13
updatedAt: 2026-06-21
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
  - version: 9.0.0
    date: 2026-06-21
    changes: "Menambahkan opsi splitKeys (satu kamus per kunci namespace tingkat atas) untuk tata letak file tunggal next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Menambahkan dukungan format ICU dan i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Dokumentasi awal plugin Sinkronisasi JSON"
author: aymericzip
---

# Sinkronisasi JSON (jembatan i18n) - Sinkronisasi JSON dengan dukungan ICU / i18next

<iframe title="Cara menjaga terjemahan JSON Anda tetap sinkron dengan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Plugins

This package provides two plugins:

- `loadJSON`: Load JSON files into Intlayer dictionaries.
  - This plugin is used to load JSON files from a source and will be loaded into Intlayer dictionaries. It can scan all the codebase and search for specific JSON files.
    This plugin can be used
    - if you use an i18n library that impose a specific location for your JSON to be loaded (ex: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), but you want to place your content declaration where you want in your code base.
    - It can also be used if you want to fetch your messages from a remote source (ex: a CMS, a API, etc.) and store your messages in JSON files.

  > Under the hood, this plugin will scan all the codebase and search for specific JSON files and load them into Intlayer dictionaries.
  > Note that this plugin will not write the output and translations back to the JSON files.

- `syncJSON`: Synchronize JSON files with Intlayer dictionaries.
  - This plugin is used to synchronize JSON files with Intlayer dictionaries. It can scan the given location and load the JSON that match the pattern for specific JSON files. This plugin is useful if you want to get the benefits of Intlayer while using another i18n library.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the JSON files in the src that match the pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
      format: "intlayer", // Format of the JSON content
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Quick start

Tambahkan plugin ke `intlayer.config.ts` Anda dan arahkan ke struktur JSON yang sudah ada.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Jaga file JSON Anda saat ini tetap sinkron dengan kamus Intlayer
  plugins: [
    syncJSON({
      // Tata letak per-locale, per-namespace (misalnya, next-intl, i18next dengan namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Alternatif: satu file per locale (umum dengan pengaturan i18next/react-intl):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### Cara kerjanya

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
  splitKeys?: boolean, // opsional, membagi satu file menjadi satu kamus per kunci tingkat atas (terdeteksi otomatis)
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

#### `splitKeys` (boolean)

Mengontrol apakah satu file JSON yang **kunci tingkat pertamanya adalah namespace** harus menjadi satu kamus per kunci tingkat atas, alih-alih satu kamus yang menampung seluruh file.

Ini cocok dengan model namespace dari pustaka seperti `next-intl` dan `react-intl`, di mana satu file `messages/{locale}.json` mengelompokkan beberapa namespace berdasarkan kunci tingkat pertamanya, masing-masing ditangani secara independen (misalnya `useTranslations('Hero')` menyelesaikan ke kamus `Hero`).

- `undefined` (default): **terdeteksi otomatis** — file dibagi ketika pola `source` tidak memiliki segmen `{key}` (satu file menampung setiap namespace), dan disimpan sebagai satu kamus jika tidak (satu file per kunci).
- `true`: selalu membagi setiap kunci tingkat atas menjadi kamusnya sendiri.
- `false`: jangan pernah membagi; seluruh file menjadi satu kamus.

Mengingat satu file `messages/{locale}.json`:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // tersirat karena pola tidak memiliki segmen `{key}`
}),
```

Ini menghasilkan tiga kamus — `Hero`, `Nav`, dan `About` — sehingga `useTranslations('Hero')` (next-intl) menyelesaikan dengan benar. Saat ditulis kembali, semua namespace disatukan kembali ke dalam file per-locale yang sama.

> Ketika Anda mempertahankan segmen `{key}` eksplisit di `source` Anda (misalnya `./locales/${locale}/${key}.json`), setiap file sudah menjadi satu namespace, sehingga pemisahan dinonaktifkan secara default.

### Multiple JSON sources and priority

Anda dapat menambahkan beberapa plugin `syncJSON` untuk menyinkronkan berbagai sumber JSON. Ini berguna ketika Anda memiliki beberapa pustaka i18n atau struktur JSON yang berbeda dalam proyek Anda.

#### Sistem prioritas

Ketika beberapa plugin menargetkan kunci kamus yang sama, parameter `priority` menentukan plugin mana yang diutamakan:

- Angka prioritas yang lebih tinggi menang atas yang lebih rendah
- Prioritas default untuk file `.content` adalah `0`
- Prioritas default untuk file konten plugin adalah `0`
- Plugin dengan prioritas yang sama diproses sesuai urutan kemunculannya dalam konfigurasi

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
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
};

export default config;
```

## Load JSON plugin

### Quick start

Add the plugin to your `intlayer.config.ts` to ingest existing JSON files as Intlayer dictionaries. This plugin is read‑only (no writes to disk):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingest JSON messages located anywhere in your source tree
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Load a single locale per plugin instance (defaults to the config defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative: per‑locale layout, still read‑only (only the selected locale is loaded):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Only files for Locales.FRENCH will be loaded from this pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- Discover: builds a glob from your `source` builder and collects matching JSON files.
- Ingest: loads each JSON file as an Intlayer dictionary with the provided `locale`.
- Read‑only: does not write or format output files; use `syncJSON` if you need round‑trip sync.
- Auto‑fill ready: defines a `fill` pattern so `intlayer content fill` can populate missing keys.

### API

```ts
loadJSON({
  // Bangun jalur ke JSON Anda. `locale` bersifat opsional jika struktur Anda tidak memiliki segmen locale
  source: ({ key, locale }) => string,

  // Locale target untuk kamus yang dimuat oleh instance plugin ini
  // Default ke configuration.internationalization.defaultLocale
  locale?: Locale,

  // Label opsional untuk mengidentifikasi sumber
  location?: string, // default: "plugin"

  // Prioritas yang digunakan untuk resolusi konflik terhadap sumber lain
  priority?: number, // default: 0

  // Formatter opsional untuk konten JSON
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // Membagi satu file menjadi satu kamus per kunci tingkat atas (terdeteksi otomatis)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Specifies the formatter to use for the dictionary content when loading JSON files. This allows using different message formatting syntaxes compatible with various i18n libraries.

- `'intlayer'`: The default Intlayer formatter (default).
- `'icu'`: Uses ICU message formatting (compatible with libraries like react-intl, vue-i18n).
- `'i18next'`: Uses i18next message formatting (compatible with i18next, next-i18next, Solid-i18next).

**Example:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Use ICU formatting for compatibility
}),
```

#### `splitKeys` (boolean)

Perilaku yang sama seperti di [`syncJSON`](#splitkeys-boolean): ketika satu file JSON mengelompokkan beberapa namespace berdasarkan kunci tingkat pertamanya, setiap kunci tingkat atas menjadi kamusnya sendiri.

- `undefined` (default): **terdeteksi otomatis** — dibagi ketika pola `source` tidak memiliki segmen `{key}`, kamus tunggal jika tidak.
- `true` / `false`: paksa atau nonaktifkan pemisahan.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys diaktifkan otomatis: `Hero`, `Nav`, `About`, … masing-masing menjadi kamus
}),
```

### Behavior and conventions

- If your `source` mask includes a locale placeholder, only files for the selected `locale` are ingested.
- Jika tidak ada segmen `{key}` dalam mask Anda, setiap kunci tingkat atas dari file menjadi kamusnya sendiri secara default (lihat [`splitKeys`](#splitkeys-boolean)). Atur `splitKeys: false` untuk memuat seluruh file sebagai satu kamus `index`.
- Keys are derived from file paths by substituting the `{key}` placeholder in your `source` builder.
- The plugin only uses discovered files and does not fabricate missing locales or keys.
- The `fill` path is inferred from your `source` and used to update missing values via CLI when you opt‑in.

## Conflict resolution

Ketika kunci terjemahan yang sama ada di beberapa sumber JSON:

1. Plugin dengan prioritas tertinggi menentukan nilai akhir
2. Sumber dengan prioritas lebih rendah digunakan sebagai cadangan untuk kunci yang hilang
3. Ini memungkinkan Anda mempertahankan terjemahan legacy sambil secara bertahap bermigrasi ke struktur baru

## CLI

File JSON yang disinkronkan akan dianggap sebagai file `.content` lainnya. Artinya, semua perintah intlayer akan tersedia untuk file JSON yang disinkronkan. Termasuk:

- `intlayer content test` untuk menguji apakah ada terjemahan yang hilang
- `intlayer content list` untuk mendaftar file JSON yang disinkronkan
- `intlayer content fill` untuk mengisi terjemahan yang hilang
- `intlayer content push` untuk mengirim file JSON yang disinkronkan
- `intlayer content pull` untuk menarik file JSON yang disinkronkan

Lihat [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk detail lebih lanjut.

## Keterbatasan (saat ini)

- Tidak ada dukungan penyisipan atau bentuk jamak/ICU saat menargetkan pustaka pihak ketiga.
- Editor visual belum tersedia untuk runtime non-Intlayer.
- Sinkronisasi hanya untuk JSON; format katalog non-JSON tidak didukung.

## Mengapa ini penting

- Kami dapat merekomendasikan solusi i18n yang sudah mapan dan memposisikan Intlayer sebagai tambahan.
- Kami memanfaatkan SEO/kata kunci mereka dengan tutorial yang berakhir dengan menyarankan Intlayer untuk mengelola JSON.
- Memperluas audiens yang dapat dijangkau dari “proyek baru” menjadi “tim mana pun yang sudah menggunakan i18n”.
