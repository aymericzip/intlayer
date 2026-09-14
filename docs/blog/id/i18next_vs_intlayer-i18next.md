---
createdAt: 2026-09-13
updatedAt: 2026-09-13
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

`@intlayer/i18next`, `@intlayer/react-i18next`, dan `@intlayer/next-i18next` adalah adapter kompatibilitas. Mereka mengekspos API `i18next` yang sudah digunakan kode Anda (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) dan menyajikannya dari kamus (dictionaries) yang dikompilasi oleh Intlayer. Komponen tidak berubah. Runtime di bawahnya yang berubah.

Artikel ini mengukur pertukaran tersebut pada aplikasi Next.js yang sama, dibangun sekali dengan `next-i18next` dan sekali dengan `@intlayer/next-i18next`. Angka-angka ini berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Untuk perbandingan `i18next` dan Intlayer sebagai library, baca [i18next vs Intlayer](https://intlayer.org/id/blog/i18next-vs-intlayer). Artikel ini berfokus pada apa yang diubah oleh adapter saat Anda mempertahankan kode apa adanya.

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

> Adapter `react-i18next` pada Vite / TanStack Start tidak diikutsertakan dalam pengujian ini. Data dasar `react-i18next` pada TanStack Start ada di [i18next vs Intlayer](https://intlayer.org/id/blog/i18next-vs-intlayer): 127-184 KB per halaman dan pergantian locale 123-185 ms saat backend dimuat secara malas.

## Mengapa angkanya berubah

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

- **Backend dan detektor bersifat inaktif.** `i18n.use(HttpBackend)` hanya memanggil `init` plugin dan tidak ada tindakan lain. Jika aplikasi Anda bergantung pada pengambilan terjemahan dari CMS saat runtime, alur tersebut tidak lagi berlaku; gunakan CMS Intlayer atau perintah `intlayer pull` / `push` sebagai gantinya.
- **`resources` diabaikan, bukan digabungkan.** Berbeda dengan beberapa adapter lain, `@intlayer/i18next` tidak menggunakan `resources` inline sebagai fallback. Setiap kunci harus ada di dalam kamus yang disinkronkan, yang dapat diverifikasi dengan `intlayer test`.
- **App Router membutuhkan penyesuaian provider.** Cukup satu file, seperti ditunjukkan di atas. Pages Router dengan `appWithTranslation` tidak memerlukan perubahan apa pun.
- **`next-i18next.config.js` tidak dibaca.** Pengaturan seperti `localePath`, `fallbackLng`, `reloadOnPrerender`, dan lainnya tidak memiliki padanan langsung; locale dan fallback dikonfigurasi melalui `intlayer.config.ts`.
- **Adapter membutuhkan sedikit overhead.** Membawa 9.4 KB runtime dan +9.4 KB per halaman dibandingkan `next-intlayer`. Setelah semua komponen bermigrasi ke `useIntlayer`, adapter ini dapat dihapus sepenuhnya.

## Kapan menggunakan yang mana?

- **Tetap gunakan `i18next`** jika aplikasi Anda bergantung pada backend runtime (terjemahan disajikan oleh CMS saat request dibuat), ekosistem plugin, atau lingkungan non-React yang tidak didukung oleh adapter.
- **Gunakan `@intlayer/*`** jika Anda menggunakan `react-i18next` / `next-i18next` dan menginginkan penghematan 68 KB, komponen 8x lebih kecil, 0% kebocoran, kunci bertipe aman, dan validasi CI tanpa perlu menulis ulang kode. Ini adalah pintu masuk praktis untuk basis kode `i18next` yang ada.
- **Gunakan native (`next-intlayer` / `react-intlayer`)** untuk proyek baru, atau setelah adapter menyelesaikan tugasnya. Opsi ini adalah yang paling ringan dari ketiganya (5.5 KB, +0.3 KB per halaman) dan mendukung komponen server sinkron serta file `.content.ts` per komponen.

## Perbandingan terkait

- [i18next vs Intlayer](https://intlayer.org/id/blog/i18next-vs-intlayer) (perbandingan library, benchmark yang sama)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/id/blog/next-intl-vs-intlayer-next-intl) (seri adapter yang sama)
- [Lingui vs @intlayer/lingui](https://intlayer.org/id/blog/lingui-vs-intlayer-lingui) (seri adapter yang sama)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/id/blog/vue-i18n-vs-intlayer-vue-i18n) (seri adapter yang sama)
- Panduan migrasi: [i18next](https://intlayer.org/id/doc/migration/i18next), [react-i18next](https://intlayer.org/id/doc/migration/react-i18next), [next-i18next](https://intlayer.org/id/doc/migration/next-i18next)
- Referensi adapter kompatibilitas: [i18next](https://intlayer.org/id/doc/compatibility/i18next), [react-i18next](https://intlayer.org/id/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/id/doc/compatibility/next-i18next)

## Kesimpulan

`i18next` adalah runtime terberat dalam benchmark ini, dan adapter ini memangkas sebagian besar bebannya tanpa mengharuskan Anda meninggalkan API yang sudah dikenal. Pada aplikasi Next.js yang sama, Anda memperoleh **pengurangan 68 KB per halaman** dibandingkan setup naif, **12.7 KB lebih hemat** daripada konfigurasi paling optimal secara manual, **komponen 8x lebih kecil**, **0% kebocoran**, dan **hidrasi 4 ms lebih cepat**, hanya dengan satu file konfigurasi, satu baris plugin, dan satu penyesuaian provider. Backend dan detektor menjadi no-op, `resources` diabaikan daripada digabungkan, dan runtime native `next-intlayer` tetap lebih ringan 9 KB lagi.

Semua data mentah, aplikasi pengujian, dan skrip tersedia di [repositori Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Jalankan dan buktikan sendiri.

Lihat dokumentasi ['Mengapa Intlayer?'](https://intlayer.org/id/doc/why) untuk detail selengkapnya.
