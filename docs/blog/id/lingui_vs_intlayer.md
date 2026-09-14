---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs Intlayer: Tolok Ukur & Perbandingan 2026"
description: "Dua pustaka i18n berbasis kompiler diuji pada Next.js dan TanStack Start. Ukuran bundle, kebocoran konten, ukuran komponen, hidrasi, reaktivitas pergantian lokal, dan pengalaman pengembang."
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | Tolok Ukur Internasionalisasi (i18n) React & Next.js

Lingui dan Intlayer adalah dua pustaka dalam tolok ukur ini yang mengandalkan **kompiler** daripada runtime murni. Lingui mengekstrak pesan dari makro saat build time dan mengompilasi katalog per lokal. Intlayer mengompilasi kamus per komponen dan melakukan tree-shake per lokal. Di atas kertas keduanya seharusnya sebanding. Angka-angka berikut menunjukkan di mana keduanya berbeda.

Data berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), sebuah rangkaian pengujian sumber terbuka yang membangun aplikasi yang sama dengan masing-masing pustaka dan mencatat apa yang sebenarnya diunduh serta dieksekusi oleh peramban.

<TOC/>

> **tl;dr**: Lingui paling mendekati Intlayer dalam hal JavaScript mentah per halaman: **115-120 KB** vs **118.6 KB** pada TanStack Start setelah lazy loading dikonfigurasi, **148.6 KB** vs **141.3 KB** pada Next.js. Namun celah melebar di aspek lain: komponen Lingui yang dikompilasi secara terisolasi berukuran **58-153 KB** dibandingkan **6-8 KB** untuk Intlayer, hidrasi membutuhkan **28-34 ms** dibandingkan **11-14 ms**, fallback lokal sumber membocorkan **3-15%** string `en` ke halaman `fr` di setiap pengaturan optimal, dan mencapai pengaturan optimal tersebut membutuhkan ekstraksi, kompilasi, serta pemilihan katalog secara manual per rute. Intlayer mencapainya tanpa konfigurasi tambahan.

## Ringkasan

- **Lingui** - Berbasis makro (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, katalog `.po` / JSON, alur kerja `lingui extract` + `lingui compile`. Mengompilasi ID pesan menjadi hash pendek, mendukung pemuatan katalog dinamis per lokal. Sangat mapan, agnostik kerangka kerja, dukungan ekosistem penerjemah yang kuat seputar file `.po`.
- **Intlayer** - Model konten yang berpusat pada komponen. Kamus `.content.ts` ditempatkan berdampingan dengan komponen yang dilayaninya, kompiler build-time melakukan tree-shake dan lazy-load per komponen dan per lokal, tipe TypeScript yang ketat dihasilkan dari konten Anda, dan terjemahan yang hilang gagal pada saat build. Menyertakan middleware terintegrasi, pembantu SEO, Visual Editor / CMS, dan terjemahan berbantuan AI.

| Pustaka               | Bintang GitHub                                                                                                                                                                 | Total Komit                                                                                                                                                                        | Komit Terakhir                                                                                                                                      | Versi Pertama | Versi NPM                                                                                                           | Unduhan NPM                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Des 2016      | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Lencana diperbarui secara otomatis. Cuplikan data akan bervariasi seiring waktu.

## Perbandingan fitur berdampingan

| Fitur                                          | Intlayer (`react-intlayer` / `next-intlayer`)                                           | Lingui (`@lingui/core` / `@lingui/react`)                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Terjemahan dekat komponen**                  | ✅ Ya, `.content.ts` ditempatkan bersama setiap komponen                                | ⚠️ String sumber inline di JSX via makro; terjemahan dalam katalog `.po` terpusat          |
| **Integrasi TypeScript**                       | ✅ Tipe ketat dihasilkan otomatis dari konten                                           | ⚠️ Makro memiliki tipe; ID pesan tidak, entri katalog yang hilang tidak terdeteksi         |
| **Deteksi terjemahan yang hilang**             | ✅ Error TypeScript + error/peringatan saat build                                       | ⚠️ `lingui extract` melaporkan statistik; runtime beralih ke string sumber                 |
| **Konten kaya (JSX / Markdown / komponen)**    | ✅ Dukungan langsung                                                                    | ✅ `<Trans>` dengan komponen bersarang                                                     |
| **Dukungan ICU**                               | ⚠️ Sedang dikembangkan                                                                  | ✅ Ya (makro `plural`, `select`, `selectOrdinal`)                                          |
| **Pemformatan (tanggal, angka, mata uang)**    | ✅ `useNumber`, `useDate`, ... (Intl bawaan)                                            | ✅ `i18n.date()`, `i18n.number()`                                                          |
| **Routing terlokalisasi & middleware**         | ✅ Proxy/middleware bawaan, `getMultilingualUrls`                                       | ❌ Bukan inti                                                                              |
| **Pembantu SEO (hreflang, sitemap, robots)**   | ✅ Pembantu bawaan                                                                      | ❌ Manual                                                                                  |
| **Komponen server sinkron**                    | ✅ `useIntlayer` dari `next-intlayer/server` berfungsi di semua komponen server turunan | ⚠️ Memerlukan instans `I18n` per permintaan, diteruskan ke bawah atau diatur via `setI18n` |
| **Tree-shaking (hanya kirim konten terpakai)** | ✅ Per komponen, per lokal, diotomatisasi oleh kompiler                                 | ⚠️ Per lokal via `lingui compile`; per rute memerlukan pemisahan katalog manual            |
| **Pemuatan lambat (Lazy loading)**             | ✅ `importMode: 'dynamic'` (satu baris konfigurasi)                                     | ⚠️ `import()` manual katalog terkompilasi + `i18n.load()` / `i18n.activate()`              |
| **Hapus konten yang tidak digunakan**          | ✅ Kamus yang tidak terpakai dibuang saat build                                         | ✅ `lingui extract --clean` menghapus pesan yang usang                                     |
| **Uji terjemahan yang hilang (CLI / CI)**      | ✅ `npx intlayer content test`                                                          | ⚠️ Statistik `lingui extract` (tanpa kode keluar error secara default)                     |
| **Pipeline build**                             | ✅ Satu plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)                  | ⚠️ Plugin makro (Babel atau SWC) + langkah `extract` + `compile`                           |
| **Terjemahan bertenaga AI**                    | ✅ Bawaan, menggunakan kunci penyedia Anda sendiri                                      | ❌ Tidak                                                                                   |
| **Visual Editor / CMS**                        | ✅ Visual Editor gratis + CMS opsional                                                  | ❌ Tidak (`.po` bekerja dengan TMS eksternal)                                              |
| **Server MCP & Keterampilan Agen**             | ✅ Ya                                                                                   | ❌ Tidak                                                                                   |
| **Ekosistem / komunitas**                      | ⚠️ Lebih kecil tetapi berkembang pesat                                                  | ✅ Mapan, agnostik kerangka kerja                                                          |

## Tolok ukur

### Apa yang diukur

Rangkaian [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) membangun **aplikasi yang sama** dengan setiap pustaka: **10 halaman** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lokal** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), komponen identik, dan konten identik. Halaman diukur dalam `en` dan `fr`. Setiap pustaka diuji hingga empat **strategi pemuatan**, dari konfigurasi paling sederhana hingga optimal:

| Strategi           | Deskripsi                                                                            | Siapa yang menggunakan                 |
| ------------------ | ------------------------------------------------------------------------------------ | -------------------------------------- |
| **static**         | Katalog terkompilasi dari setiap lokal diimpor dan dimuat di awal                    | Prototipe cepat, kode hasil AI         |
| **dynamic**        | Hanya katalog lokal aktif yang diimpor via `import()`, tetapi mencakup semua halaman | Mayoritas proyek                       |
| **scoped-static**  | Satu katalog per rute, semuanya dibundel di awal                                     | Jarang                                 |
| **scoped-dynamic** | Satu katalog per rute + `import()` dinamis. Hanya halaman aktif, lokal aktif         | Aplikasi dengan anggaran kinerja ketat |

Intlayer tidak memerlukan varian "scoped": kompiler otomatis membatasi konten **per komponen**, sehingga baris `static` dan `dynamic` sudah ter-scope secara bawaan.

Untuk setiap build, pengujian mencatat:

- **Ukuran pustaka (Lib size)**: ukuran gzip dari komponen kosong yang hanya mengimpor pustaka i18n. Biaya tetap runtime.
- **JS Halaman (Page JS)**: JavaScript terkompresi gzip per halaman, dirata-ratakan di seluruh halaman dan lokal.
- **% kebocoran lokal (Locale leak %)**: proporsi string terjemahan dalam JS terunduh yang berasal dari lokal yang **tidak** sedang dilihat pengguna (diuji pada `en` dan `fr`, sehingga 50% berarti "lokal terukur lainnya ada sepenuhnya"; dengan 10 lokal terbundel, pemborosan sebenarnya jauh lebih tinggi).
- **% kebocoran halaman (Page leak %)**: proporsi string terjemahan dalam JS terunduh yang berasal dari halaman yang **tidak** sedang diakses pengguna.
- **Rata-rata komponen (Component avg)**: ukuran gzip rata-rata dari setiap komponen yang dikompilasi secara terisolasi. Menunjukkan seberapa besar runtime i18n dan katalog yang diseret oleh satu komponen.
- **Reaktivitas E2E**: waktu antara memilih lokal baru hingga pembaruan `html[lang]` di DOM (Playwright, 5 iterasi).
- **Hidrasi**: durasi fase hidrasi React.

> Angka-angka di bawah ini berasal dari pengujian tanggal **2026-09-12** menggunakan `@lingui/react` 6.6.0 dan `intlayer` 9.5.1. Aplikasi pengujian sengaja dibuat kecil (beberapa lusin string per lokal), sehingga persentase kebocoran menggambarkan sebuah **pola**: angka ini meningkat seiring bertambahnya konten Anda sementara biaya runtime tetap konstan.

### Hasil pada Next.js

| Pustaka               | Strategi       | Ukuran Lib (gz) | Rata-rata JS Halaman (gz) | Bocor Lokal | Bocor Halaman | Rata-rata Komponen (gz) | Reaktivitas E2E | Hidrasi |
| --------------------- | -------------- | --------------: | ------------------------: | ----------: | ------------: | ----------------------: | --------------: | ------: |
| **base** (tanpa i18n) | -              |          0.0 KB |                  141.0 KB |        0.0% |          0.0% |                  0.9 KB |         13.4 ms | 11.8 ms |
| Lingui                | static         |         11.9 KB |                  207.4 KB |       50.0% |         90.0% |                 73.3 KB |         15.3 ms | 15.2 ms |
| Lingui                | dynamic        |         11.9 KB |                  145.4 KB |        2.8% |         89.9% |                 19.9 KB |         15.7 ms | 12.7 ms |
| Lingui                | scoped-static  |         11.9 KB |                  148.2 KB |        2.7% |         89.1% |                 20.4 KB |         15.1 ms | 13.1 ms |
| Lingui                | scoped-dynamic |         11.9 KB |                  148.6 KB |       14.8% |          0.0% |                152.6 KB |         16.1 ms | 14.8 ms |
| **`next-intlayer`**   | static         |      **5.5 KB** |              **141.3 KB** |    **0.0%** |      **0.0%** |              **8.5 KB** |     **15.5 ms** | 16.9 ms |
| **`next-intlayer`**   | dynamic        |      **5.5 KB** |              **141.3 KB** |    **0.0%** |      **0.0%** |              **6.9 KB** |     **15.3 ms** | 15.9 ms |

**Cara membaca hasil**

- **Biaya runtime.** Komponen kosong membutuhkan 11.9 KB gzip dengan Lingui, dibandingkan 5.5 KB dengan Intlayer. Pada halaman penuh, konfigurasi terbaik Lingui berada pada **+7.3 KB** di atas Intlayer (148.6 vs 141.3 KB); Intlayer hanya bertambah **+0.3 KB** di atas aplikasi dasar.
- **Konfigurasi sederhana berbiaya mahal.** Memuat setiap katalog terkompilasi di awal menghasilkan **207.4 KB per halaman**, +66 KB di atas aplikasi dasar. Setengah dari string yang diuji berasal dari lokal yang salah, dan 90% dari halaman yang salah.
- **Pemuatan dinamis memperbaiki lokal, bukan halaman.** Dengan satu katalog per lokal, kebocoran halaman tetap berada pada ~90%: seluruh katalog `fr` dikirimkan pada setiap halaman berbahasa Prancis. Untuk mencapai 0% kebocoran halaman, diperlukan pengaturan `scoped-dynamic`: satu katalog per rute, diekstrak dan dikompilasi secara terpisah, serta dipilih secara manual pada setiap halaman.
- **Fallback lokal sumber bocor.** Bahkan dalam pengaturan yang dioptimalkan, **3-15% string `en` tetap terkirim di dalam halaman `fr`**. Makro Lingui menjaga pesan sumber tetap tersedia sebagai fallback, sehingga ikut masuk ke dalam bundle bersama terjemahan. Intlayer menyelesaikan fallback pada saat build dan hanya mengirimkan lokal yang aktif.
- **Ukuran komponen membengkak pada `scoped-dynamic`.** Setiap komponen yang dikompilasi secara terisolasi rata-rata berukuran **152.6 KB**, karena katalog setiap rute dapat diakses dari komponen yang mengimpornya. Komponen yang sama dengan `useIntlayer()` hanya berukuran rata-rata **6.9 KB**.

### Hasil pada TanStack Start

| Pustaka                     | Strategi       | Ukuran Lib (gz) | Rata-rata JS Halaman (gz) | Bocor Lokal | Bocor Halaman | Rata-rata Komponen (gz) | Reaktivitas E2E | Hidrasi |
| --------------------------- | -------------- | --------------: | ------------------------: | ----------: | ------------: | ----------------------: | --------------: | ------: |
| **base** (tanpa i18n)       | -              |          0.0 KB |                  111.0 KB |        0.0% |          0.0% |                  0.7 KB |          8.1 ms | 21.6 ms |
| Lingui                      | static         |         11.2 KB |                  152.2 KB |       50.0% |         90.0% |                 58.0 KB |          3.9 ms | 19.9 ms |
| Lingui                      | dynamic        |         11.2 KB |                  115.2 KB |        9.3% |          0.0% |                 85.5 KB |          5.9 ms | 28.0 ms |
| Lingui                      | scoped-static  |         11.2 KB |                  120.8 KB |        4.0% |          0.0% |                147.9 KB |          7.1 ms | 33.9 ms |
| Lingui                      | scoped-dynamic |         11.2 KB |                  120.2 KB |        8.6% |          0.0% |                 83.7 KB |         42.1 ms | 32.9 ms |
| **`intlayer`**              | static         |      **5.0 KB** |              **125.8 KB** |       50.0% |      **0.0%** |              **8.1 KB** |      **3.2 ms** | 11.5 ms |
| **`intlayer`**              | dynamic        |      **5.0 KB** |              **118.6 KB** |    **0.0%** |      **0.0%** |              **6.3 KB** |      **3.6 ms** | 14.1 ms |
| `@intlayer/lingui` (kompat) | dynamic        |         10.3 KB |                  137.0 KB |        9.9% |          0.0% |                 12.8 KB |          2.9 ms | 19.7 ms |

**Cara membaca hasil**

- **Dalam hal JavaScript per halaman, Lingui unggul tipis.** `dynamic` Lingui mencapai **115.2 KB**, 3.4 KB di bawah Intlayer (118.6 KB). Katalog terkompilasi Lingui dengan hash ID sangat ringkas, dan router TanStack Start membagi rute dengan sangat baik sehingga kebocoran halaman sudah 0% pada baris `dynamic`.
- **Segala hal lainnya berpihak pada Intlayer.** Hidrasi membutuhkan waktu **28-34 ms** pada Lingui berbanding **11-14 ms** pada Intlayer: `i18n.load()` + `i18n.activate()` dijalankan di klien sebelum React dapat melakukan hidrasi. Komponen yang dikompilasi secara terisolasi berukuran **58-148 KB** berbanding **6-8 KB**. Kebocoran lokal tidak pernah mencapai 0% (4-9%) karena fallback lokal sumber.
- **Pergantian lokal pada pengaturan teroptimasi berlangsung lambat.** `scoped-dynamic` Lingui membutuhkan waktu **42 ms** untuk memperbarui `html[lang]`: katalog rute baru harus diambil, dimuat, dan diaktifkan sebelum perubahan terlihat. Intlayer beralih dalam **3-4 ms** pada kedua mode.
- **Baris `static` Intlayer sudah memiliki 0% kebocoran halaman** karena hanya kamus yang diimpor oleh komponen halaman yang dibundel. Satu baris konfigurasi (`importMode: 'dynamic'`) menghapus kebocoran lokal juga.
- **`@intlayer/lingui`** mempertahankan sintaks makro Lingui dan menyajikannya dari kamus Intlayer. Pendekatan ini mengorbankan sedikit ukuran halaman (137 KB, karena runtime makro tetap ada) demi komponen yang lebih kecil (12.8 KB) dan hidrasi yang lebih cepat daripada Lingui bawaan. Ini adalah langkah migrasi, bukan tujuan akhir.

## Mengapa ada perbedaan? Dua kompiler, dua unit kerja

Kedua pustaka melakukan kompilasi. Perbedaannya terletak pada **apa** yang mereka kompilasi.

**Lingui mengompilasi katalog.** Makro dalam kode sumber Anda diekstrak ke dalam file `.po` per lokal, lalu dikompilasi menjadi modul JS per lokal. Unit kerjanya adalah **lokal**. Membaginya lebih lanjut, berdasarkan rute atau komponen, berarti membuat beberapa katalog, mengonfigurasi `lingui.config.ts` untuk mengekstrak masing-masing dari kumpulan file yang berbeda, dan memuat katalog yang tepat di setiap rute. Instans runtime `I18n` bersifat global; setiap pemanggilan `useLingui()` menghubungkan komponen ke instans tersebut.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # output lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer mengompilasi kamus.** Setiap file `.content.ts` adalah kamus yang terikat pada sebuah kunci; kompiler mencari tahu komponen mana yang mengimpor kunci tersebut dan menghasilkan, per kamus dan per lokal, tepatnya JSON yang dibutuhkan komponen tersebut. Unit kerjanya adalah **komponen**. Pembatasan rute adalah konsekuensi alaminya: suatu halaman hanya menarik kamus dari komponen yang direndernya.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

Itulah mengapa pola `scoped-dynamic` adalah output bawaan bagi Intlayer dan merupakan proyek konfigurasi manual yang rumit bagi Lingui.

> Untuk mendapatkan angka pada baris `dynamic`, atur `dictionary.importMode: 'dynamic'` di `intlayer.config.ts`. Lihat [panduan optimasi bundle](https://intlayer.org/id/doc/concept/bundle-optimization).

## Pengalaman pengembang

### Pengaturan

**Lingui**

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Kemudian tambahkan `@lingui/babel-plugin-lingui-macro` (atau `@lingui/swc-plugin`) ke bundler, jalankan `lingui extract` setelah mengedit kode sumber, jalankan `lingui compile` sebelum build, dan bungkus hierarki aplikasi dengan `<I18nProvider i18n={i18n}>`.

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Tambahkan `intlayer()` ke `vite.config.ts` (atau `withIntlayer()` ke `next.config.ts`) dan bungkus hierarki komponen dengan `<IntlayerProvider>`. Tidak ada langkah ekstrak atau kompilasi terpisah: kamus dibangun secara otomatis saat bundler berjalan.

### Komponen

**Lingui**

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

Teks bahasa Inggris berada di dalam komponen; teks bahasa Prancis berada di `src/locales/fr/messages.po` di bawah ID ter-hash, setelah `lingui extract` dijalankan. Jika Anda lupa menjalankannya atau lupa menjalankan `compile`, aplikasi akan secara diam-diam kembali ke bahasa Inggris.

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Kedua lokal berada dalam satu file di samping komponen. Nilai `fr` yang hilang akan memicu error saat build, dan kunci yang salah akan menjadi error TypeScript.

### Di luar komponen

Metadata, loader, fungsi server: di mana saja tanpa hierarki React.

**Lingui**

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Instans `I18n` baru dibuat per pemanggilan, katalog yang tepat dimuat secara manual, serta menggunakan `msg` + `i18n._()` daripada `t`. Sebagaimana dicatat dalam [catatan tolok ukur](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), mengetahui kapan harus menggunakan `t`, `` t` ` ``, `i18n.t()`, `msg`, atau `<Trans>` sering kali membingungkan.

**Intlayer**

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

## Pertahankan makro Lingui, dapatkan kamus Intlayer

`@intlayer/lingui` adalah adaptor pengganti langsung untuk `@lingui/core` dan `@lingui/react`. Makro tetap dikompilasi seperti biasa; pemanggilan runtime `i18n._()` yang dihasilkannya disajikan langsung dari kamus Intlayer, dengan plugin sinkronisasi `.po` yang menjaga katalog lama Anda tetap sinkron. Bentuk jamak dan seleksi ICU dirender secara identik.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Biarkan `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` tetap berada dalam pipeline build sebelum kompiler Intlayer. Lihat [dokumentasi kompatibilitas Lingui](https://intlayer.org/id/doc/compatibility/lingui).

## Kapan harus memilih yang mana?

- **Pilih Lingui** jika Anda menginginkan **ICU MessageFormat** dengan makro bertipe, penerjemah Anda bekerja dengan file **`.po`** dalam alur TMS yang sudah ada, Anda menyukai string sumber inline di JSX, dan tim Anda terbiasa mengelola alur kerja ekstrak / kompilasi / pemisahan katalog. Ukuran JS per halamannya sangat kompetitif setelah lazy loading dikonfigurasi.
- **Pilih Intlayer** jika Anda menginginkan **konten dengan cakupan komponen**, **TypeScript yang ketat**, **deteksi error kunci yang hilang saat build**, **tree-shaking dan lazy loading otomatis tanpa konfigurasi**, komponen yang ringan, hidrasi cepat, pergantian lokal instan, dan alat editorial bawaan (Visual Editor, CMS, terjemahan AI, server MCP). Sangat relevan untuk codebase modular dan sistem desain berskala besar.
- **Pilih `@intlayer/lingui`** jika Anda saat ini menggunakan Lingui dan ingin bermigrasi ke kamus Intlayer secara bertahap tanpa mengubah makro.

## Perbandingan terkait

- [next-intl vs Intlayer](https://intlayer.org/id/blog/next-intl-vs-intlayer) (tolok ukur yang sama)
- [i18next vs Intlayer](https://intlayer.org/id/blog/i18next-vs-intlayer) (tolok ukur yang sama)
- [Tolok ukur vue-i18n vs Intlayer](https://intlayer.org/id/blog/vue-i18n-vs-intlayer-benchmark) (tolok ukur yang sama)
- [Kompiler vs i18n deklaratif](https://intlayer.org/id/blog/compiler-vs-declarative-i18n)

## Bintang GitHub

Bintang GitHub adalah indikator kuat dari popularitas proyek, kepercayaan komunitas, dan relevansi jangka panjang. Meskipun bukan pengukuran langsung terhadap kualitas teknis, metrik ini mencerminkan berapa banyak pengembang yang menganggap proyek ini bermanfaat dan mengikutinya.

[![Grafik Riwayat Bintang](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Kesimpulan

Lingui adalah pustaka kombinasi runtime dan kompiler terkuat dalam tolok ukur ini. Katalog terkompilasi dengan hash ID memberikan efisiensi JavaScript per halaman yang hampir menyamai Intlayer, bahkan sedikit lebih kecil di TanStack Start. Jika ukuran bita per halaman adalah satu-satunya ukuran, keduanya akan seri.

Namun, bukan hanya itu yang penting. Kompiler Lingui hanya memproses hingga tingkat lokal; semua hal di bawahnya (katalog per rute, lazy loading, mencegah fallback bocor ke dalam bundle) adalah pekerjaan konfigurasi manual. Tolok ukur memperlihatkan biaya dari batasan tersebut: komponen **10-20x lebih besar**, hidrasi **2-3x lebih lambat**, **kebocoran lokal 3-15%** yang selalu ada, dan pergantian lokal memakan waktu **42 ms** pada pengaturan optimal. Kompiler Intlayer bekerja pada tingkat komponen, sehingga angka-angka tersebut adalah **6-8 KB**, **11-14 ms**, **0%**, dan **3-4 ms** tanpa perlu konfigurasi tambahan.

Semua data mentah, aplikasi pengujian, dan skrip tersedia di [repositori Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Anda dapat menjalankannya sendiri.

Lihat dokumen ['Mengapa Intlayer?'](https://intlayer.org/id/doc/why) untuk informasi lebih lanjut.
