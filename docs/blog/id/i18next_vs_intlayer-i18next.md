---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "i18next vs @intlayer/i18next: API yang Sama, Bundle Berbeda"
description: "Apa yang berubah ketika aplikasi React atau Next.js tetap menggunakan panggilan i18next, react-i18next, dan next-i18next tetapi menyajikannya melalui adapter @intlayer/i18next. JavaScript per halaman, ukuran komponen, kebocoran, dan hidrasi diukur pada kode yang sama, serta apa yang dipertahankan, diabaikan, dan tidak dapat digantikan oleh adapter."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Adapter kompatibilitas
  - Migrasi
  - Internasionalisasi
  - i18n
  - Benchmark
  - Ukuran bundle
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | API yang Sama, Bundle Berbeda

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next`, dan `@intlayer/next-i18next` adalah adapter kompatibilitas. Mereka mengekspos API `i18next` yang sudah digunakan kode Anda (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) dan menyajikannya dari kamus (dictionaries) yang dikompilasi oleh Intlayer. Komponen tidak berubah. Runtime di bawahnya yang berubah.

Artikel ini mengukur pertukaran tersebut pada aplikasi Next.js yang sama, dibangun sekali dengan `next-i18next` dan sekali dengan `@intlayer/next-i18next`. Angka-angka ini berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Untuk perbandingan `i18next` dan Intlayer sebagai library, baca [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18next_vs_intlayer.md). Artikel ini berfokus pada apa yang diubah oleh adapter saat Anda mempertahankan kode apa adanya.

<TOC/>

> **tl;dr**: Pada aplikasi Next.js yang sama, mengganti `next-i18next` dengan `@intlayer/next-i18next` memangkas JavaScript per halaman dari **218.5 KB menjadi 150.7 KB** gzip (setup naif) dan mengalahkan setup `next-i18next` yang dioptimalkan sepenuhnya (163.4 KB) sebesar **12.7 KB**. Rata-rata ukuran komponen turun dari **78.5 KB menjadi 9.7 KB**, kebocoran string halaman lain turun dari **~90% menjadi 0%**, hidrasi dari **15.6 ms menjadi 11.3 ms**, dan runtime dari **19.7 KB menjadi 9.4 KB**. Tidak ada komponen yang diedit; hanya satu file provider yang diubah. Plugin `i18next` (backend, detektor bahasa) diterima tetapi tidak melakukan apa pun: tidak ada lagi yang perlu dimuat atau dideteksi saat runtime.

## Apa itu `@intlayer/i18next`

`i18next` adalah sebuah runtime. `i18n.init({ resources })` atau plugin backend memuat `locales/{lng}/{ns}.json` ke dalam instance global; `useTranslation("about")` mendaftarkan komponen ke dalamnya; `t("title")` mencari kunci pada saat render. Namespace, lazy loading, daftar namespace per halaman, dan keamanan tipe data (type safety) semuanya harus Anda konfigurasikan dan kelola sendiri.

Adapter mempertahankan API dan mengganti instance:

1. **Import aliasing.** `createNextI18nPlugin()` dari `@intlayer/next-i18next/plugin` (atau `withI18next`) membungkus `withIntlayer` dan menambahkan alias Webpack / Turbopack sehingga `next-i18next`, `react-i18next`, dan `i18next` mengarah ke padanan `@intlayer/*` mereka. Pada Vite, `reactI18nextVitePlugin()` dari `@intlayer/react-i18next/plugin` melakukan hal yang sama. Tidak ada import yang diganti namanya.
2. **JSON sebagai sumber kebenaran (source of truth).** Plugin `syncJSON` membaca file `locales/{lng}/{ns}.json` Anda yang ada dengan `format: "i18next"` (sehingga `{{name}}`, penumpukan `$t()`, sufiks `_one` / `_other`, dan konteks diparsing dengan benar) dan menulis kembali terjemahan saat CLI atau CMS memperbaruinya.
3. **Pengikatan titik panggilan (call-site binding).** Tahap optimasi Intlayer menulis ulang `useTranslation("about")` menjadi panggilan yang menerima kamus `about` secara langsung, dalam locale yang aktif. Komponen tidak lagi mengakses store global.

```tsx fileName="components/About.tsx"
// Kode Anda, tidak berubah
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Apa yang dihasilkan kompilator (disederhanakan)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Penulisan ulang itulah yang mengubah angka pada kolom ukuran komponen dan kebocoran halaman di bawah ini.

## Apa yang dipertahankan, diabaikan, dan tidak digantikan oleh adapter

| API `i18next`                                                                   | Dengan `@intlayer/*`                                                                                                          |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Dipertahankan. Terikat ke kamus `ns` saat build; kunci bertipe sesuai konten Anda                                          |
| `t("key", { name })`, `{{interpolation}}`, penumpukan `$t(key)`                 | ✅ Dipertahankan                                                                                                              |
| Jamak `key_one` / `key_other`, konteks `key_male`, `returnObjects`              | ✅ Dipertahankan. Jamak dievaluasi dengan `Intl.PluralRules`                                                                  |
| `<Trans>` dengan `components`, tag bernomor `<1>...</1>`, `values`              | ✅ Dipertahankan                                                                                                              |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Dipertahankan                                                                                                              |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Dipertahankan. `changeLanguage` mengontrol locale Intlayer                                                                 |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Dipertahankan                                                                                                              |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` memanggil `init` plugin dan mengembalikan; backend dan detektor tidak memiliki apa pun untuk dimuat atau dideteksi |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` **diabaikan** dengan peringatan dev; hapus import JSON untuk mendapatkan penghematan bundle                    |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Merender `IntlayerProvider`; prop `i18n` diabaikan. Di App Router, berikan locale (lihat di bawah)                         |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Mengembalikan bentuk yang diharapkan dan tidak memuat apa pun. Aman dipertahankan, aman dihapus                            |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Dipertahankan                                                                                                              |
| `next-i18next.config.js`                                                        | ⚠️ Tidak dibaca. Locale berasal dari `intlayer.config.ts`                                                                     |
| `useTranslation()` polos tanpa namespace                                        | ✅ Bekerja terhadap kamus `translation` seluruh file (`splitKeys: false`)                                                     |

## Benchmark

### Apa yang diukur

Suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) membangun **aplikasi yang sama persis** dengan masing-masing konfigurasi: **10 halaman** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), komponen identik, dan konten identik. Halaman diukur dalam `en` dan `fr`.

`next-i18next` dibangun dalam empat strategi pemuatan, mulai dari JSON setiap locale diimpor ke `resources` (`static`) hingga satu namespace per rute yang dimuat secara malas melalui backend (`scoped-dynamic`). Adapter dibangun pada **komponen yang sama dengan setup naif**, dengan perubahan pada `next.config.ts`, `intlayer.config.ts`, dan file provider. Adapter tidak memiliki varian "scoped": kompilator membatasi cakupan konten per komponen secara otomatis.

Untuk setiap build, suite mencatat:

- **Lib size**: ukuran gzip komponen kosong yang hanya mengimpor library i18n.
- **Page JS**: JavaScript gzip yang diunduh per halaman, dirata-ratakan di semua halaman dan locale.
- **Locale leak %**: proporsi string terjemahan dalam JS yang diunduh yang termasuk dalam locale yang **tidak** sedang dilihat pengguna.
- **Page leak %**: proporsi string terjemahan dalam JS yang diunduh yang termasuk dalam halaman tempat pengguna **tidak** berada.
- **Component avg**: rata-rata ukuran gzip setiap komponen yang dikompilasi secara terisolasi.
- **E2E reactivity**: waktu nyata antara pemilihan locale baru dan pembaruan `html[lang]` di DOM (Playwright, 5 iterasi).
- **Hydration**: durasi fase hidrasi React.

> Angka di bawah ini berasal dari pengujian tanggal **2026-09-12** dengan `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) dan `@intlayer/next-i18next` 9.5.1. Aplikasi uji sengaja dibuat kecil (beberapa puluh string per locale), sehingga persentase kebocoran menggambarkan **pola**: mereka tumbuh bersama konten Anda sementara biaya runtime tetap konstan.

### Hasil pada Next.js

Pilih metrik dan pustaka yang Anda minati:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                        | Strategi       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ---------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (tanpa i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-i18next`               | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |        16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |        15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |        16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |        15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **11.9 ms** | **10.6 ms** |
| `next-intlayer` (native)     | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)     | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Cara membaca data**

- **Hemat 68 KB per halaman dibandingkan setup naif.** `resources: { en, fr, ... }` menyertakan setiap locale dan setiap namespace di setiap halaman: **218.5 KB**. Build adapter dari komponen yang sama menghasilkan **150.7 KB**. Ini juga mengalahkan konfigurasi terbaik `next-i18next` (163.4 KB, satu namespace per rute, dimuat secara malas) sebesar 12.7 KB, karena runtime `i18next` saja berbobot 19.7 KB dibandingkan 9.4 KB.
- **Kebocoran turun menjadi 0% tanpa menyentuh satu pun komponen.** Setiap setup `next-i18next` kecuali yang sepenuhnya terisolasi (scoped) menyertakan ~90% string halaman lain. Baris `dynamic` bahkan lebih buruk daripada kelihatannya: tidak menurunkan kebocoran halaman sama sekali dan justru menambah **50% kebocoran locale**, karena backend per locale tetap memuat seluruh namespace `translation`. Adapter mencapai 0% / 0% langsung dari kode naif.
- **Komponen: 8x lebih kecil.** Komponen `useTranslation()` yang dikompilasi secara terisolasi berukuran rata-rata **78.5 KB** dengan `resources` inline dan **26-27 KB** dengan backend, karena `t` terikat ke global store. Dengan adapter, ukurannya rata-rata hanya **9.7 KB**.
- **Hidrasi dan pergantian bahasa lebih cepat.** Hidrasi meningkat dari 15.6 ms menjadi **11.3 ms** (dan dari 27.7 ms pada setup `dynamic`, di mana pengambilan data dari backend berada di jalur kritis). Pergantian locale meningkat dari 15-16 ms menjadi **11-12 ms**.
- **Adapter bukanlah runtime native.** `next-intlayer` berukuran **141.3 KB**, hanya +0.3 KB di atas aplikasi dasar. Adapter membawa permukaan API `i18next` (dialek interpolasi, resolusi sufiks jamak dan konteks, penguraian tag `<Trans>`) di atas inti Intlayer: 9.4 KB dan +9.4 KB per halaman dibandingkan native. Ini adalah jembatan transisi, bukan tujuan akhir.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabel lengkap, setiap pustaka dan strategi, dalam [laporan benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md).

> Adapter `react-i18next` pada Vite / TanStack Start tidak diikutsertakan dalam pengujian ini. Data dasar `react-i18next` pada TanStack Start ada di [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18next_vs_intlayer.md): 127-184 KB per halaman dan pergantian locale 123-185 ms saat backend dimuat secara malas.

## Mengapa angkanya berubah

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Tidak ada apa pun di direktori `components/` yang diubah, sehingga penghematan berasal dari apa yang diikat oleh `useTranslation`.

**Dengan `i18next`**, pengikatan dilakukan ke instance global. Apa pun yang dimuat ke dalamnya (semua locale dalam `static`, seluruh namespace locale aktif dalam `dynamic`) dapat diakses dari setiap komponen yang memanggil `useTranslation()`. Bundler tidak dapat memecah di bawah apa yang dimuat oleh instance tersebut, dan runtime tidak dapat mengetahui kunci mana yang akan diminta komponen.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # string untuk setiap halaman
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

Apa pun yang ditampung instans dikirim ke setiap halaman, dan pemborosan bertambah pada dua sumbu, halaman dan lokal:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**Dengan `@intlayer/next-i18next`**, pengikatan dilakukan ke kamus. `syncJSON` mengubah setiap file namespace menjadi kamus; tahap optimasi memberikan kamus yang dibutuhkan langsung ke komponen, sebagai modul import yang dapat dilacak dan dipecah oleh bundler per halaman dan per locale.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # tidak berubah, tetap menjadi sumber kebenaran
│   └── fr/translation.json
├── .intlayer/                        # dibuat otomatis: satu kamus per namespace, per locale
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← tidak berubah
```

`i18n/i18n.ts` dan import `resources`-nya menjadi dead code. Itulah sumber penghematan 68 KB tersebut.

## Migrasi dalam tiga langkah

<Steps>
<Step number={1} title="Instalasi">

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

Perintah ini mendeteksi `i18next` / `react-i18next` / `next-i18next`, menginstal `intlayer`, paket framework (`next-intlayer` atau `react-intlayer`), adapter `@intlayer/*` yang sesuai, dan `@intlayer/sync-json-plugin`, serta mengisi `intlayer.config.ts`. Pertahankan paket asli tetap terinstal: mereka adalah peer dependencies dan menyediakan tipe data TypeScript.

</Step>
<Step number={2} title="Arahkan Intlayer ke file locale Anda">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // Dialek i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Satu file per namespace: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Jika Anda memiliki satu `translation.json` per locale (namespace bawaan i18next), atur `splitKeys: false` agar seluruh file tetap menjadi satu kamus dan `useTranslation()` tanpa argumen tetap berfungsi.

</Step>
<Step number={3} title="Tambahkan plugin">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

Pada App Router, komponen klien mendapatkan locale dari segmen `[locale]`. Komponen `I18nextProvider` adapter tidak menerima parameter locale, jadi ganti sekali di file provider Anda:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Setiap komponen di bawahnya tetap memanggil `useTranslation()`.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` membungkus `vite-intlayer` dan membuat alias untuk `react-i18next` dan `i18next`. Untuk proyek non-React, `i18nextVitePlugin()` dari `@intlayer/i18next/plugin` membuat alias untuk `i18next` saja.

</Tab>
</Tabs>

</Step>
</Steps>

### Apa yang dapat Anda hapus setelahnya

| File / pola                                            | Alasan                                                                             |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` dan import JSON           | Diabaikan oleh adapter. Di sinilah letak 68 KB yang dihemat                        |
| `i18next-http-backend`, `i18next-resources-to-backend` | Tidak ada yang perlu diambil saat runtime                                          |
| `i18next-browser-languagedetector`                     | Deteksi locale ditangani konfigurasi routing Intlayer (awalan URL, cookie, header) |
| `serverSideTranslations()` di `getStaticProps`         | Mengembalikan bentuk kosong; tidak berbahaya, tetapi tidak lagi diperlukan         |
| `next-i18next.config.js`                               | Tidak dibaca. Konfigurasi locale berada di `intlayer.config.ts`                    |
| Daftar `ns: [...]` per halaman                         | Kompilator memilih namespace per komponen                                          |

### Apa yang Anda dapatkan selain penghematan byte

- **Kunci bertipe data aman (typed keys).** `useTranslation("about")` memiliki tipe terhadap kamus `about` yang dikompilasi; `t("does.not.exist")` menjadi error TypeScript, bukan mengembalikan string kunci biasa.
- **`npx intlayer test`** menggagalkan CI jika ada kunci yang hilang di locale mana pun. **`npx intlayer fill`** menerjemahkan kunci yang hilang menggunakan kunci API penyedia AI Anda sendiri (OpenAI, Anthropic, Mistral, Gemini...) dan menyimpannya kembali ke `locales/{lng}/{ns}.json`.
- **Visual Editor dan CMS** beroperasi pada JSON yang sama, sehingga penerjemah dapat mengedit melalui antarmuka visual dan file diperbarui.
- **Transisi bertahap ke `.content.ts`.** Komponen mana pun dapat beralih dari `useTranslation("about")` ke `useIntlayer("about")` dengan file konten yang diletakkan bersama komponen. Kamus JSON dan `.content.ts` dapat hidup berdampingan.

## Batasan yang perlu diketahui sebelum memulai

<AccordionGroup>
<Accordion header="Backend dan detektor tidak aktif">

`i18n.use(HttpBackend)` memanggil init plugin dan tidak melakukan hal lain. Jika aplikasi Anda mengandalkan pengambilan terjemahan dari CMS saat runtime, alur tersebut tidak ada lagi; gunakan [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) atau perintah `intlayer pull` / `push`. Deteksi bahasa menjadi konfigurasi perutean Intlayer (prefiks URL, cookie, header).

</Accordion>
<Accordion header="resources diabaikan, bukan digabungkan">

Tidak seperti beberapa adaptor lainnya, `@intlayer/i18next` tidak menggunakan `resources` inline sebagai fallback. Setiap kunci harus ada dalam kamus yang disinkronkan, yang diverifikasi oleh `intlayer test`.

</Accordion>
<Accordion header="App Router memerlukan pengeditan provider">

Hanya satu berkas, ditunjukkan di atas. Pages Router dengan `appWithTranslation` tidak memerlukan apa pun.

</Accordion>
<Accordion header="next-i18next.config.js tidak dibaca">

`localePath`, `fallbackLng`, `reloadOnPrerender` dan sejenisnya tidak memiliki padanan; bahasa dan fallback berasal dari `intlayer.config.ts`.

</Accordion>
<Accordion header="Adaptor tidak gratis">

9.4 KB runtime dan +9.4 KB per halaman dibandingkan `next-intlayer`. Setelah setiap komponen beralih ke `useIntlayer`, hapus adaptor tersebut.

</Accordion>
</AccordionGroup>

## Kapan menggunakan yang mana?

<AccordionGroup>
<Accordion header="Tetap di i18next">

Aplikasi Anda bergantung pada backend runtime (terjemahan yang disajikan oleh CMS pada saat permintaan), pada ekosistem plugin, atau pada target non-React yang tidak dicakup oleh adaptor.

</Accordion>
<Accordion header="Gunakan @intlayer/*">

Anda menggunakan `react-i18next` / `next-i18next` dan menginginkan penghematan 68 KB, komponen 8x lebih kecil, 0% kebocoran, kunci bertipe, dan pemeriksaan CI tanpa penulisan ulang. Ini adalah titik masuk untuk basis kode `i18next` yang sudah ada.

</Accordion>
<Accordion header="Beralih ke native (next-intlayer / react-intlayer)">

Untuk proyek baru, atau setelah adaptor menyelesaikan tugasnya. Menawarkan runtime teringan (5.5 KB, +0.3 KB per halaman) dan membuka Server Components sinkron serta berkas `.content.ts` per komponen. Mulai dengan [Intlayer dengan Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md) atau [dengan Vite dan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Dari mana datangnya penghematan 68 KB?">

Dari `resources: { en, fr, ... }`. Penyiapan umum `next-i18next` mengimpor JSON setiap bahasa ke `init()`, sehingga setiap halaman membawa setiap namespace di setiap bahasa: **218.5 KB** per halaman. Adaptor tidak pernah membundel blok itu; adaptor hanya memberikan kamus yang disebutkan ke setiap komponen, dalam bahasa yang aktif.

</Question>

<Question title="Apakah komponen <Trans> saya tetap berfungsi?">

Ya, dengan `components`, tag bernomor `<1>...</1>` dan `values`. Begitu pula dengan `{{interpolation}}`, penyarangan `$t(key)`, bentuk jamak `key_one` / `key_other` (dievaluasi dengan `Intl.PluralRules`), sufiks konteks, dan `returnObjects`.

</Question>

<Question title="Bagaimana jika saya menggunakan satu berkas translation.json per bahasa?">

Atur `splitKeys: false` di plugin `syncJSON`. Seluruh berkas tetap menjadi satu kamus dan panggilan sederhana `useTranslation()` akan terus menyelesaikan terhadapnya.

</Question>

<Question title="Apakah ini sama dengan bermigrasi ke Intlayer?">

Tidak, ini adalah jembatan. Adaptor mempertahankan API `i18next` dan berbiaya runtime 9.4 KB; `next-intlayer` native berbiaya 5.5 KB dan menambahkan Server Components sinkron serta berkas `.content.ts` yang ditempatkan bersama. Anda dapat bermigrasi komponen demi komponen, karena kamus JSON dan `.content.ts` hidup berdampingan.

</Question>

<Question title="Bisakah penerjemah tetap bekerja seperti yang mereka lakukan saat ini?">

Ya. `locales/{lng}/{ns}.json` tetap menjadi sumber kebenaran: `syncJSON` membacanya dengan dialek i18next dan menulis kembali terjemahan saat CLI atau CMS memperbaruinya.

</Question>

</FAQ>

## Perbandingan terkait

Seri adaptor yang sama:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-intl_vs_intlayer-next-intl.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer-vue-i18n.md)

Pustaka yang dibandingkan secara langsung:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18next_vs_intlayer.md), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/react-i18next_vs_react-intl_vs_intlayer.md)
- [Is i18next outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_i18next_outdated.md)

Dokumentasi referensi:

- Compat adapters: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/next-i18next.md)
- Migration guides: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-i18next_to_intlayer.md)
- [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md) and [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) and [AI translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md)

## Kesimpulan

`i18next` adalah runtime terberat dalam benchmark ini, dan adapter ini memangkas sebagian besar bebannya tanpa mengharuskan Anda meninggalkan API yang sudah dikenal. Pada aplikasi Next.js yang sama, Anda memperoleh **pengurangan 68 KB per halaman** dibandingkan setup naif, **12.7 KB lebih hemat** daripada konfigurasi paling optimal secara manual, **komponen 8x lebih kecil**, **0% kebocoran**, dan **hidrasi 4 ms lebih cepat**, hanya dengan satu file konfigurasi, satu baris plugin, dan satu penyesuaian provider. Backend dan detektor menjadi no-op, `resources` diabaikan daripada digabungkan, dan runtime native `next-intlayer` tetap lebih ringan 9 KB lagi.

Semua data mentah, aplikasi pengujian, dan skrip tersedia di [repositori Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Jalankan dan buktikan sendiri.

Lihat dokumentasi ['Mengapa Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md) untuk detail selengkapnya.
