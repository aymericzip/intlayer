---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs @intlayer/next-intl: API yang Sama, Bundle Berbeda"
description: Apa yang berubah ketika impor next-intl dari aplikasi Next.js disajikan oleh adapter kompatibilitas @intlayer/next-intl. Ukuran bundle, kebocoran, ukuran komponen dan hidrasi diukur pada kode yang sama, ditambah apa yang adapter pertahankan, abaikan dan tidak dapat gantikan.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | API yang Sama, Bundle Berbeda

`@intlayer/next-intl` adalah compat adapter: ia mengekspos API `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...) dan melayaninya dari dictionary yang dikompilasi oleh Intlayer. Kode aplikasi tidak berubah. Bundle-nya berubah.

Artikel ini membandingkan keduanya pada aplikasi Next.js yang sama, dibangun sekali dengan `next-intl` dan sekali dengan adapter. Angka-angka berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), suite open-source yang mencatat apa yang benar-benar diunduh browser. Jika Anda menginginkan perbandingan `next-intl` vs Intlayer sebagai library, baca [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer). Yang ini tentang apa yang berubah pada adapter ketika Anda menjaga komponen seperti yang sekarang.

<TOC/>

> **tl;dr**: Pada aplikasi Next.js yang sama, mengganti `next-intl` dengan `@intlayer/next-intl` mengurangi JavaScript per halaman dari **153.6 KB menjadi 147.5 KB** gzip, rata-rata komponen dari **21.8 KB menjadi 8.1 KB**, kebocoran string halaman asing dari **~90% menjadi 0%**, dan hydration dari **14.7 ms menjadi 12.8 ms**, tanpa ada komponen yang diedit. Pada TanStack Start, ekuivalen `use-intl` (`@intlayer/use-intl`) mengurangi komponen dari **76-87 KB menjadi 9-11 KB** dan penggantian locale dari **7-21 ms menjadi 4-9 ms**. Adapter membutuhkan **8.0 KB** runtime versus **14.7 KB** untuk `next-intl` dan **5.5 KB** untuk native `next-intlayer`. Navigasi dan middleware diimplementasikan ulang pada konfigurasi routing Intlayer; `pathnames` terlokal adalah satu-satunya fitur yang tidak dialihkan.

## Apa itu `@intlayer/next-intl`

`next-intl` adalah runtime: `getRequestConfig` memuat `messages/{locale}.json` per request, `NextIntlClientProvider` mengirimnya ke client, dan `useTranslations("about")` membaca kunci dari objek tersebut saat render. Setiap optimisasi (namespaces, `pick(messages, [...])` per halaman, lazy loading) adalah tanggung jawab Anda untuk menulisnya.

`@intlayer/next-intl` mempertahankan bagian pertama dan terakhir dari rantai tersebut dan mengganti bagian tengahnya. Komponen Anda masih memanggil `useTranslations("about")`; apa yang mereka terima berasal dari dictionary Intlayer yang dikompilasi saat build time, scoped ke komponen tersebut, dalam locale aktif saja.

Tiga mekanisme membuat hal ini berfungsi:

1. **Import aliasing.** `createNextIntlPlugin()` dari `@intlayer/next-intl/plugin` membungkus `withIntlayer` dan menambahkan alias Webpack / Turbopack sehingga `next-intl`, `next-intl/server`, `next-intl/navigation` dan `next-intl/middleware` diselesaikan ke `@intlayer/next-intl`. Tidak ada import dalam codebase Anda yang diubah.
2. **JSON as source of truth.** Plugin `syncJSON` membaca `messages/{locale}.json` yang sudah ada, memisahkan kunci tingkat atasnya menjadi satu kamus per namespace, dan menulis terjemahan kembali ke file yang sama ketika CLI atau CMS memperbarui mereka. Alur kerja penerjemah Anda tetap tidak berubah.
3. **Call-site binding.** Intlayer optimize pass (Babel atau SWC) menulis ulang `useTranslations("about")` menjadi call yang menerima dictionary `about` secara langsung. Component tidak lagi menjangkau global message tree; ia menjangkau kontennya sendiri.

```tsx fileName="app/[locale]/about/page.tsx"
// Kode Anda, tidak berubah
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="What the compiler emits (simplified)"
// Apa yang dipancarkan compiler (disederhanakan)
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Penulisan ulang itu adalah mengapa kolom component-size dan page-leakage di bawah bergerak: sebuah halaman hanya menarik dictionary dari komponen yang dirender, dan hanya dalam locale yang dilayani.

## Apa yang dipertahankan, diabaikan, dan tidak diganti oleh adapter

| `next-intl` API                                                      | Dengan `@intlayer/next-intl`                                                                                                           |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Dipertahankan. Terikat pada dictionary `ns` pada waktu build. Keys diketikkan terhadap konten Anda.                                 |
| `getTranslations({ locale, namespace })`                             | ✅ Dipertahankan                                                                                                                       |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Dipertahankan. ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}` berjalan melalui resolver ICU Intlayer               |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Dipertahankan                                                                                                                       |
| `useFormatter()`                                                     | ✅ Dipertahankan. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` menghubungkan ke `Intl` native                         |
| `NextIntlClientProvider`                                             | ✅ Disimpan. Props `messages`, `timeZone` dan `now` **diterima tetapi diabaikan** (peringatan dev memberi tahu Anda)                   |
| `getMessages()`                                                      | ✅ Disimpan untuk kompatibilitas; tidak lagi diperlukan                                                                                |
| `getRequestConfig()` di `src/i18n.ts`                                | ⚠️ Tidak diperlukan. Dictionary dikompilasi pada saat build; tidak ada loading pesan per-request                                       |
| `defineRouting()`                                                    | ✅ Disimpan. Field yang dihilangkan (`locales`, `defaultLocale`, `localePrefix`) dibaca dari `intlayer.config.ts`                      |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Dipertahankan. Diimplementasikan ulang pada config routing Intlayer; argumen `routing` diterima tetapi diabaikan                    |
| `pathnames` (nama rute yang dilokalisasi)                            | ❌ Diterima untuk typing, **tidak diinterpolasi**. Pertahankan pathnames biasa atau pindahkan mapping tersebut ke `rewrite` Intlayer   |
| `createMiddleware()`                                                 | ✅ Dipertahankan. Mengembalikan proxy Intlayer; mengatur cookie `NEXT_LOCALE` sehingga `useLocale()` dan switcher Anda tetap berfungsi |
| `NEXT_LOCALE` cookie                                                 | ✅ Dibaca secara default (kecuali jika Anda mengonfigurasi `routing.storage` sendiri)                                                  |
| Bare `useTranslations()` dengan tidak ada namespace                  | ⚠️ Berfungsi, tetapi call site tidak terikat: resolves melalui runtime registry. Berikan namespace untuk mendapatkan keuntungan bundle |

## Benchmark

### Apa yang diukur

Suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) membangun **aplikasi yang sama** dengan setiap setup: **10 halaman** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), komponen identik dan konten identik. Halaman diukur dalam `en` dan `fr`.

`next-intl` dibangun dalam empat strategi loading, dari setup naif (`messages/{locale}.json` dimuat seluruhnya) hingga yang optimal (satu namespace per route + per-page `pick()`). Adapter dibangun dengan **komponen yang sama seperti setup naif**, hanya dengan `next.config.ts` dan `intlayer.config.ts` yang berubah. Tidak ada varian "scoped": compiler mengatur scope konten per komponen, jadi baris `static` dan `dynamic`-nya sudah dalam scope.

Untuk setiap build, suite merekam:

- **Lib size**: ukuran gzip dari komponen kosong yang hanya mengimpor library i18n. Biaya tetap dari runtime.
- **Page JS**: JavaScript gzip yang diunduh per halaman, rata-rata di semua halaman dan locale.
- **Locale leak %**: bagian dari string yang diterjemahkan yang ditemukan di JS yang diunduh dan termasuk locale yang **tidak** dilihat pengguna.
- **Page leak %**: bagian dari string yang diterjemahkan yang ditemukan di JS yang diunduh dan termasuk halaman yang **tidak** diakses pengguna.
- **Component avg**: ukuran gzip rata-rata setiap komponen yang dikompilasi secara terpisah. Menunjukkan berapa banyak runtime i18n dan katalog yang dibawa oleh satu komponen.
- **E2E reactivity**: waktu dinding antara memilih locale baru dan `html[lang]` diperbarui di DOM (Playwright, 5 iterasi).
- **Hydration**: durasi fase hydration React.

> Angka di bawah berasal dari jalankan yang bertanggal **2026-09-12** dengan `next-intl` / `use-intl` 4.14.2 dan `@intlayer/*` 9.5.1. Aplikasi pengujian sengaja dibuat kecil (beberapa puluh string per locale), jadi persentase kebocoran menggambarkan sebuah **pola**: mereka tumbuh dengan konten Anda sementara biaya runtime tetap fixed.

### Hasil di Next.js

| Setup                     | Strategi       | Ukuran lib (gz) | Rata-rata JS halaman (gz) | Bocor locale | Bocor halaman | Rata-rata komponen (gz) | Reaktivitas E2E |     Hidrasi |
| ------------------------- | -------------- | --------------: | ------------------------: | -----------: | ------------: | ----------------------: | --------------: | ----------: |
| **base** (no i18n)        | -              |          0.0 KB |                  141.0 KB |         0.0% |          0.0% |                  0.9 KB |         13.4 ms |     11.8 ms |
| `next-intl`               | static         |         14.7 KB |                  153.6 KB |         4.2% |         89.8% |                 21.8 KB |         16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |         14.7 KB |                  153.6 KB |         9.7% |         89.9% |                 21.8 KB |         15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |         14.7 KB |                  153.6 KB |         0.0% |          0.0% |                 80.1 KB |         17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |         14.7 KB |                  153.6 KB |         0.0% |          0.0% |                 22.9 KB |         17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |      **8.0 KB** |              **147.5 KB** |     **0.0%** |      **0.0%** |              **8.1 KB** |     **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |      **8.0 KB** |              **148.7 KB** |     **0.0%** |      **0.0%** |              **8.1 KB** |     **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |          5.5 KB |                  141.3 KB |         0.0% |          0.0% |                  8.5 KB |         15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |          5.5 KB |                  141.3 KB |         0.0% |          0.0% |                  6.9 KB |         15.3 ms |     15.9 ms |

**Cara membacanya**

- **Komponen yang sama, 6 KB lebih sedikit per halaman.** Build adapter dari aplikasi naive mencapai **147.5 KB**, lebih kecil dari setiap konfigurasi `next-intl` termasuk yang sepenuhnya dioptimalkan (153.6 KB). Runtime itu sendiri adalah perbedaannya: 8.0 KB versus 14.7 KB, dibayarkan di setiap halaman.
- **Kebocoran turun ke 0% tanpa menyentuh komponen.** Setup `next-intl` yang naif mengirim ~90% string halaman asing di setiap halaman. Mencapai 0% dengan `next-intl` berarti setup `scoped-*`: satu namespace per rute, dan `pick(messages, [...])` di setiap halaman. Adapter mencapai 0% dari kode naif karena pass optimisasi mengikat setiap `useTranslations("ns")` ke dictionary-nya sendiri.
- **Komponen menyusut 2.7x.** Komponen yang dikompilasi secara terisolasi rata-rata **21.8 KB** dengan `next-intl` (mencapai provider dan message tree) dan **8.1 KB** dengan adapter. Dalam setup `scoped-static` milik `next-intl`, angka tersebut _meningkat_ menjadi 80 KB, karena file namespace setiap rute menjadi dapat diakses dari halaman yang memilihnya.
- **Hydration 2 ms lebih cepat** (12.8 vs 14.7 ms): tidak ada message object yang perlu di-deserialize dari RSC payload sebelum React dapat melakukan hydrate.
- **Adapter bukan runtime native.** `next-intlayer` berada di **141.3 KB**, +0.3 KB di atas base app, dengan runtime 5.5 KB. Adapter membawa surface API `next-intl` (`useFormatter`, `t.rich`, ICU resolver) di atas core Intlayer, sehingga 8.0 KB dan +6 KB per page. Ini adalah bridge, bukan destination.

### Hasil pada TanStack Start (`use-intl`)

`use-intl` adalah core framework-agnostic dari `next-intl`. Adapternya, `@intlayer/use-intl`, mengikuti desain yang sama dengan Vite plugin (`@intlayer/use-intl/plugin`).

| Pengaturan               | Strategi       | Ukuran Lib (gz) | Rata-rata JS Halaman (gz) | Locale leak | Page leak | Rata-rata Komponen (gz) | E2E reactivity |   Hydration |
| ------------------------ | -------------- | --------------: | ------------------------: | ----------: | --------: | ----------------------: | -------------: | ----------: |
| **base** (no i18n)       | -              |          0.0 KB |                  111.0 KB |        0.0% |      0.0% |                  0.7 KB |         8.1 ms |     21.6 ms |
| `use-intl`               | static         |         14.1 KB |                  179.8 KB |       50.0% |     89.8% |                 76.0 KB |         6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |         14.1 KB |                  119.4 KB |        0.0% |     89.8% |                 75.9 KB |         7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |         14.1 KB |                  128.7 KB |        0.0% |      0.0% |                 87.1 KB |        20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |         14.1 KB |                  128.7 KB |        0.0% |      0.0% |                 87.1 KB |        13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |      **7.3 KB** |                  135.8 KB |       49.7% |  **0.0%** |             **10.9 KB** |     **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |      **7.3 KB** |              **129.7 KB** |    **0.0%** |  **0.0%** |              **9.3 KB** |     **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |          5.0 KB |                  125.8 KB |       50.0% |      0.0% |                  8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |          5.0 KB |                  118.6 KB |        0.0% |      0.0% |                  6.3 KB |         3.6 ms |     14.1 ms |

**Cara membacanya**

- **Bytes per-halaman sebanding dengan `use-intl` yang dioptimalkan.** `@intlayer/use-intl` dalam mode `dynamic` (129.7 KB) berada dalam jarak 1 KB dari `scoped-dynamic` milik `use-intl` (128.7 KB), dan 10 KB _di atas_ `dynamic` biasa `use-intl` (119.4 KB). Baris `dynamic` biasa itu masih mengalami kebocoran 90% string halaman asing; jumlah byte rendah karena konten aplikasi uji relatif kecil. 0% adapter adalah apa yang tetap flat seiring pertumbuhan konten.
- **Komponen 7-9x lebih kecil.** Komponen `use-intl` rata-rata **76-87 KB** dalam setiap strategi, karena `useTranslations` terikat pada seluruh objek pesan dari provider. Adapter rata-rata **9-11 KB**.
- **Pengalihan locale lebih cepat.** Setup `use-intl` yang dioptimalkan membutuhkan **13-21 ms** untuk memperbarui `html[lang]`; adapter membutuhkan **4-9 ms**. Lebih sedikit komponen yang di-render ulang, dan tidak ada yang diambil ulang dari pohon pesan.
- **`static` menyimpan setiap locale.** Baris `static` adapter menunjukkan kebocoran locale 49,7%, sama seperti Intlayer native dalam mode `static`: semua locale dibundel, hanya kamus halaman yang tersimpan. Satu baris konfigurasi (`importMode: 'dynamic'`) menghilangkannya.

## Mengapa angka-angka berubah

Tidak ada yang berubah dalam komponen, jadi keuntungannya berasal sepenuhnya dari apa yang `useTranslations` terikat.

**Dengan `next-intl`**, pengikatan adalah provider. `NextIntlClientProvider` menerima seluruh object `messages` untuk locale; setiap `useTranslations("about")` membacanya. Bundler melihat satu komponen mengimpor satu hook yang membaca satu context, dan tidak dapat mengetahui bahwa hanya branch `about` yang digunakan. Rute di bawah ini semuanya berbagi object message yang sama, jadi kolom page-leak membaca ~90% hingga Anda membagi file sendiri.

```bash
.
├── messages
│   ├── en.json                       # setiap namespace, setiap halaman
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**Dengan `@intlayer/next-intl`**, binding-nya adalah dictionary. `syncJSON` mengubah `messages/en.json` menjadi satu dictionary per key tingkat atas; compiler menyelesaikan komponen mana yang memanggil `useTranslations("about")` dan mengirimkannya `about` secara langsung, dalam locale aktif, sebagai import yang dapat dilacak dan dipisahkan oleh bundler.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # unchanged, masih menjadi sumber kebenaran
│   └── fr.json
├── .intlayer/                        # generated: satu dictionary per namespace, per locale
└── src
    ├── middleware.ts                 # createMiddleware() sekarang mengembalikan proxy Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (tidak ada prop messages)
        └── about/page.tsx            # useTranslations("about")  ← tidak berubah
```

`src/i18n.ts` dan prop `messages` hilang. Semuanya yang lain sama.

## Migrasi dalam tiga langkah

<Steps>
<Step number={1} title="Instal">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Perintah mendeteksi `next-intl` dan menginstal `intlayer`, `next-intlayer`, `@intlayer/next-intl` dan `@intlayer/sync-json-plugin`. Jaga agar `next-intl` tetap terinstal: itu adalah peer dependency dari adapter dan menyediakan tipenya.

</Step>
<Step number={2} title="Arahkan Intlayer ke pesan Anda">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" mengemas setiap locale; "dynamic" memuat yang aktif sesuai permintaan
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // Placeholder ICU: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` tetap berada di tempat aslinya. Setiap kunci tingkat atas menjadi dictionary; `useTranslations("about")` memetakan ke dictionary `about`.

</Step>
<Step number={3} title="Bungkus next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` menyusun `withIntlayer` (content watching, dictionary compilation, the optimize pass) dan `next-intl` → `@intlayer/next-intl` aliases untuk Webpack dan Turbopack. Build, dan angka-angka dalam tabel di atas adalah milik Anda.

</Step>
</Steps>

### Yang dapat Anda hapus setelahnya

| File / pattern                                 | Alasan                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `getRequestConfig` di `src/i18n.ts`            | Tidak ada per-request message loading. Pertahankan file hanya jika juga mengekspor helper `createNavigation` |
| `messages={...}` pada `NextIntlClientProvider` | Adapter membaca output yang dikompilasi; prop diabaikan dan mencatat peringatan dalam development            |
| `await getMessages()` dalam layouts            | Alasan yang sama                                                                                             |
| Per-page `pick(messages, [...])`               | Compiler melakukan picking, per component                                                                    |

### Apa yang Anda dapatkan selain bytes

- **Typed keys.** `useTranslations("about")` di-type terhadap dictionary `about` yang dikompilasi. `t("does.not.exist")` adalah TypeScript error, bukan runtime fallback.
- **`npx intlayer test`** gagal CI ketika sebuah locale kehilangan sebuah key. **`npx intlayer fill`** menerjemahkan yang hilang dengan provider pilihan Anda (OpenAI, Anthropic, Mistral, Gemini...) menggunakan key Anda sendiri, dan menulis hasilnya kembali ke `messages/{locale}.json`.
- **Visual Editor dan CMS** bekerja pada dictionary yang sama, sehingga non-developer dapat mengedit `messages/fr.json` melalui UI dan file terupdate.
- **Incremental move ke `.content.ts`.** Setiap component dapat beralih dari `useTranslations("about")` ke `useIntlayer("about")` dengan file content yang co-located, satu per satu. Dictionary JSON dan `.content.ts` coexist dan merge.

## Batasan yang perlu Anda ketahui sebelum memulai

- **Konfigurasi routing bergerak ke `intlayer.config.ts`.** `createNavigation(routing)` dan `createMiddleware(routing)` mempertahankan signature mereka tetapi mengabaikan argumen: locale, locale default, dan strategi prefix berasal dari konfigurasi `routing` Intlayer. Jika Anda menggunakan `pathnames` terlokalisasi dari `next-intl` (`/about` → `/a-propos`), adapter tidak melakukan interpolasi; `routing.rewrite` Intlayer mencakup kasus itu tetapi merupakan perubahan terpisah.
- **`useTranslations()` tanpa namespace tidak terikat.** Pass optimasi memerlukan namespace statis untuk mengetahui dictionary mana yang harus diimpor. Panggilan kosong masih berfungsi, melalui registry runtime yang mereferensikan setiap dictionary, yang merupakan kebocoran persis yang Anda coba hapus. Berikan namespace.
- **Adapter tidak gratis.** 8.0 KB runtime versus 5.5 KB untuk `next-intlayer`, dan +6-7 KB per halaman dibandingkan native build. Ini adalah biaya untuk API surface `next-intl`. Jika Anda mencapai titik di mana setiap komponen telah dipindahkan ke `useIntlayer`, lepaskan adapter.
- **`messages`, `timeZone`, `now` pada provider diabaikan.** Formatter didukung oleh native `Intl` dan hanya locale yang mempengaruhi output mereka; jika Anda bergantung pada forced time zone atau `now` tetap untuk tanggal yang stabil saat hydration, tangani di call site.

## Kapan menggunakan yang mana?

- **Tetap di `next-intl`** jika aplikasi Anda kecil, bundle bukan masalah, dan tim Anda nyaman mengelola namespace dan `pick()` per halaman.
- **Gunakan `@intlayer/next-intl`** jika Anda saat ini menggunakan `next-intl` dan menginginkan keuntungan bundle, menghindari kebocoran, stabilitas hydration, typed keys, dan tooling CLI / CMS tanpa menulis ulang. Ini adalah entry point yang direkomendasikan untuk setiap codebase `next-intl` yang sudah ada.
- **Gunakan native (`next-intlayer`)** untuk proyek baru, atau setelah adapter telah menjalankan tugasnya. Ini adalah yang paling ringan dari ketiganya (5.5 KB, +0.3 KB per halaman) dan membuka akses ke synchronous server components, per-component `.content.ts` files, dan full feature set.

## Perbandingan terkait

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (library-nya, benchmark yang sama)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (series adapter yang sama)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (seri adapter yang sama)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/blog/vue-i18n-vs-intlayer-vue-i18n) (seri adapter yang sama)
- [Panduan migrasi: next-intl ke Intlayer](https://intlayer.org/doc/migration/next-intl)
- [Referensi adapter kompatibilitas: next-intl](https://intlayer.org/doc/compatibility/next-intl)

## Kesimpulan

`@intlayer/next-intl` melakukan satu hal: ia mengubah apa yang `useTranslations` terikat, dari provider yang menyimpan setiap pesan ke dictionary yang dikompilasi untuk komponen tersebut. Pada aplikasi Next.js yang sama senilai **6 KB per halaman**, **komponen 2,7x lebih kecil**, **0% leakage** dan **2 ms hidration**, sebelum siapa pun membuka file komponen. Navigation dan middleware mempertahankan API mereka di atas konfigurasi routing Intlayer's, dan runtime `next-intlayer` native tetap lebih ringan lagi.

Semua data mentah, aplikasi tes, dan script tersedia di [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Jalankan sendiri.

Lihat ['dokumen Why Intlayer?'](https://intlayer.org/doc/why) untuk detail lebih lanjut.
