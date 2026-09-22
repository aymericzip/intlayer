---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs Intlayer: Tolok Ukur & Perbandingan 2026"
description: "Perbandingan mendalam antara next-intl dan Intlayer pada Next.js App Router dan TanStack Start. Ukuran bundle, kebocoran konten, ukuran komponen, hidrasi, dan pengalaman pengembang."
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Tolok Ukur Internasionalisasi (i18n) React & Next.js

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl` adalah pustaka i18n paling populer untuk Next.js. Intlayer adalah alternatif berbasis kompiler dengan cakupan komponen. Keduanya melokalkan aplikasi App Router. Pertanyaannya adalah berapa biaya masing-masing setelah aplikasi dibangun.

Artikel ini bukan tutorial. Ini adalah perbandingan yang didukung oleh angka dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), rangkaian tolok ukur sumber terbuka yang membangun aplikasi yang sama dengan setiap pustaka dan mengukur apa yang sebenarnya diunduh dan dijalankan peramban.

<TOC/>

> **tl;dr**: Pada aplikasi Next.js yang sama, `next-intl` menambahkan **+12.6 KB gzip** JavaScript di setiap halaman, dibandingkan dengan **+0.3 KB** untuk Intlayer. Tanpa upaya tambahan, `next-intl` mengirimkan **~90% string halaman luar** pada setiap halaman. Mencapai 0% kebocoran dengan `next-intl` membutuhkan namespace dan `pick(messages, [...])` per halaman. Intlayer mencapai 0% secara default, karena kompilernya mencakup konten per komponen. Jika Anda menginginkan API `next-intl` dengan output Intlayer, adaptor `@intlayer/next-intl` berukuran **147.5 KB** per halaman dibandingkan **153.6 KB** dengan aslinya.

## Ringkasan

- **next-intl** - Standar komunitas Next.js. Kamus JSON terpusat per bahasa, dukungan penuh ICU MessageFormat, dan integrasi mendalam dengan penanganan permintaan serta routing Next.js.
- **Intlayer** - Model konten yang berpusat pada komponen. File `.content.ts` berada tepat di sebelah komponennya, kompiler build-time melakukan tree-shaking dan lazy loading per komponen dan per lokal, serta menghasilkan tipe TypeScript yang ketat secara otomatis.

| Pustaka               | Bintang GitHub                                                                                                                                                                 | Total Komit                                                                                                                                                                        | Komit Terakhir                                                                                                                                      | Versi Pertama | Versi NPM                                                                                                     | Unduhan NPM                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Maret 2021    | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Lencana diperbarui secara otomatis.

## Perbandingan fitur berdampingan

| Fitur                                       | Intlayer (`react-intlayer` / `next-intlayer`)                                   | next-intl (`next-intl` / `use-intl`)                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Terjemahan dekat komponen**               | ✅ Ya, `.content.ts` berada di samping setiap komponen                          | ❌ Kamus JSON terpusat di folder `messages/`                              |
| **Integrasi TypeScript**                    | ✅ Tipe ketat dihasilkan otomatis dari konten                                   | ⚠️ Didukung lewat konfigurasi manual `global.d.ts`                        |
| **Deteksi terjemahan yang hilang**          | ✅ Error TypeScript + error/peringatan saat build                               | ⚠️ Runtime mengembalikan kunci atau melempar error tergantung konfigurasi |
| **Konten kaya (JSX / Markdown / komponen)** | ✅ Dukungan langsung                                                            | ⚠️ Melalui `t.rich()` dengan pemetaan komponen                            |
| **Dukungan ICU MessageFormat**              | ⚠️ Sedang dikembangkan                                                          | ✅ Ya, dukungan penuh ICU                                                 |
| **Komponen server sinkron**                 | ✅ `useIntlayer` dari `next-intlayer/server` bekerja di komponen server turunan | ❌ Memerlukan penerusan terjemahan melalui props dari server asinkron     |
| **Tree-shaking**                            | ✅ Otomatis per komponen dan per lokal                                          | ⚠️ Memerlukan pemisahan namespace manual dan penggunaan `pick()`          |
| **Pemuatan lambat (Lazy loading)**          | ✅ Satu baris konfigurasi (`importMode: 'dynamic'`)                             | ⚠️ Memerlukan impor dinamis manual di `getRequestConfig`                  |
| **Visual Editor / CMS**                     | ✅ Visual Editor gratis + CMS opsional                                          | ❌ Tidak ada                                                              |
| **Terjemahan bertenaga AI**                 | ✅ Terintegrasi, menggunakan kunci API Anda sendiri                             | ❌ Tidak ada                                                              |
| **Server MCP & Keterampilan Agen**          | ✅ Ya                                                                           | ❌ Tidak ada                                                              |

## Tolok ukur

### Apa yang diukur

Rangkaian pengujian [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) membangun **aplikasi yang sama** dengan setiap pustaka: **10 halaman** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lokal** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), komponen identik, dan konten identik. Halaman diukur dalam `en` dan `fr`. Setiap pustaka diuji hingga empat **strategi pemuatan**:

| Strategi           | Deskripsi                                                                            | Siapa yang menggunakan                 |
| ------------------ | ------------------------------------------------------------------------------------ | -------------------------------------- |
| **static**         | Semua lokal dan semua halaman dibundel bersama di awal                               | Prototipe cepat, kode hasil AI         |
| **dynamic**        | Hanya lokal aktif yang dimuat, tetapi semua halaman sekaligus                        | Mayoritas proyek                       |
| **scoped-static**  | Namespace per rute, tanpa lazy loading                                               | Jarang                                 |
| **scoped-dynamic** | Namespace per rute + lazy loading. Hanya halaman aktif pada lokal aktif yang dikirim | Aplikasi dengan anggaran kinerja ketat |

Intlayer tidak memerlukan varian "scoped": kompiler otomatis membatasi konten **per komponen**, sehingga baris `static` dan `dynamic` sudah ter-scope secara bawaan.

Untuk setiap build, pengujian mencatat:

- **Ukuran pustaka (Lib size)**: ukuran gzip dari komponen kosong yang hanya mengimpor pustaka i18n.
- **JS Halaman (Page JS)**: JavaScript gzip terunduh per halaman.
- **% kebocoran lokal (Locale leak %)**: proporsi string yang bukan milik lokal yang sedang aktif.
- **% kebocoran halaman (Page leak %)**: proporsi string yang bukan milik halaman yang sedang diakses.
- **Rata-rata komponen (Component avg)**: ukuran gzip rata-rata dari setiap komponen yang dikompilasi terisolasi.
- **Reaktivitas E2E**: waktu antara pergantian lokal hingga pembaruan `html[lang]` di DOM.
- **Hidrasi**: durasi fase hidrasi React.

> Angka di bawah ini berasal dari pengujian bertanggal **2026-09-12** dengan `next-intl` 4.14.2 dan `intlayer` 9.5.1.

### Hasil pada Next.js (App Router)

Pilih metrik dan pustaka yang penting bagi Anda:

<I18nBenchmark framework="nextjs" vertical/>

| Pustaka                        | Strategi       | Ukuran Lib (gz) | Rata-rata JS Halaman (gz) | Bocor Lokal | Bocor Halaman | Rata-rata Komponen (gz) | Reaktivitas E2E | Hidrasi |
| ------------------------------ | -------------- | --------------: | ------------------------: | ----------: | ------------: | ----------------------: | --------------: | ------: |
| **base** (tanpa i18n)          | -              |          0.0 KB |                  141.0 KB |        0.0% |          0.0% |                  0.9 KB |         13.4 ms | 11.8 ms |
| `next-intl`                    | static         |         14.7 KB |                  153.6 KB |        4.2% |         89.8% |                 21.8 KB |         16.0 ms | 14.7 ms |
| `next-intl`                    | dynamic        |         14.7 KB |                  153.6 KB |        9.7% |         89.9% |                 21.8 KB |         15.6 ms | 14.8 ms |
| `next-intl`                    | scoped-static  |         14.7 KB |                  153.6 KB |        0.0% |          0.0% |                 80.1 KB |         17.9 ms | 17.4 ms |
| `next-intl`                    | scoped-dynamic |         14.7 KB |                  153.6 KB |        0.0% |          0.0% |                 22.9 KB |         17.8 ms | 16.8 ms |
| **`next-intlayer`**            | static         |      **5.5 KB** |              **141.3 KB** |    **0.0%** |      **0.0%** |              **8.5 KB** |     **15.5 ms** | 16.9 ms |
| **`next-intlayer`**            | dynamic        |      **5.5 KB** |              **141.3 KB** |    **0.0%** |      **0.0%** |              **6.9 KB** |     **15.3 ms** | 15.9 ms |
| `@intlayer/next-intl` (kompat) | static         |          8.0 KB |                  147.5 KB |        0.0% |          0.0% |                  8.1 KB |         14.5 ms | 12.8 ms |
| `@intlayer/next-intl` (kompat) | dynamic        |          8.0 KB |                  148.7 KB |        0.0% |          0.0% |                  8.1 KB |         11.7 ms | 12.8 ms |

**Cara membaca hasil**

- **Biaya runtime.** Aplikasi dasar berukuran 141.0 KB per halaman. `next-intl` meningkatkannya menjadi 153.6 KB (**+12.6 KB gzip di setiap halaman**), sedangkan Intlayer hanya 141.3 KB (**+0.3 KB**).
- **Kebocoran.** Dalam pengaturan yang paling sering digunakan (`static` dan `dynamic`), `next-intl` mengirimkan **~90% string halaman lain** di setiap halaman, karena seluruh `en.json` masuk ke penyedia klien. Menghilangkannya membutuhkan pekerjaan pemisahan manual yang teliti. Intlayer langsung 0% secara otomatis.
- **Ukuran komponen.** Komponen yang memanggil `useTranslations()` menghasilkan rata-rata 21.8 KB; komponen yang sama dengan `useIntlayer()` hanya 6.9 KB.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabel lengkap, setiap pustaka dan strategi, dalam [laporan benchmark Next.js](https://intlayer.org/id/doc/benchmark/nextjs).

### Hasil pada TanStack Start (`use-intl`)

`use-intl` adalah inti independen framework dari `next-intl`. API yang sama, format pesan yang sama. Membandingkannya dengan `intlayer` di TanStack Start menghilangkan bagian khusus Next.js dari persamaan.

<I18nBenchmark framework="tanstack" vertical/>

| Pustaka                       | Strategi       | Ukuran Lib (gz) | Rata-rata JS Halaman (gz) | Bocor Lokal | Bocor Halaman | Rata-rata Komponen (gz) | Reaktivitas E2E |
| ----------------------------- | -------------- | --------------: | ------------------------: | ----------: | ------------: | ----------------------: | --------------: |
| **base** (tanpa i18n)         | -              |          0.0 KB |                  111.0 KB |        0.0% |          0.0% |                  0.7 KB |          8.1 ms |
| `use-intl`                    | static         |         14.1 KB |                  179.8 KB |       50.0% |         89.8% |                 76.0 KB |          6.7 ms |
| `use-intl`                    | dynamic        |         14.1 KB |                  119.4 KB |        0.0% |         89.8% |                 75.9 KB |          7.0 ms |
| `use-intl`                    | scoped-static  |         14.1 KB |                  128.7 KB |        0.0% |          0.0% |                 87.1 KB |         20.9 ms |
| `use-intl`                    | scoped-dynamic |         14.1 KB |                  128.7 KB |        0.0% |          0.0% |                 87.1 KB |         13.3 ms |
| **`intlayer`**                | static         |      **5.0 KB** |              **125.8 KB** |       50.0% |      **0.0%** |              **8.1 KB** |      **3.2 ms** |
| **`intlayer`**                | dynamic        |      **5.0 KB** |              **118.6 KB** |    **0.0%** |      **0.0%** |              **6.3 KB** |      **3.6 ms** |
| `@intlayer/use-intl` (kompat) | dynamic        |          7.3 KB |                  129.7 KB |        0.0% |          0.0% |                  9.3 KB |          8.7 ms |

**Cara membaca hasil**

- Pengaturan sederhana `use-intl` mengirimkan **68.8 KB lebih banyak JS per halaman** dibandingkan aplikasi dasar.
- Dalam mode `dynamic`, `use-intl` mencapai 119.4 KB, namun masih membawa **89.8% kebocoran halaman**.
- Perbedaan arsitektur sangat terlihat pada **ukuran komponen**: 76-87 KB pada `use-intl` berbanding 6-8 KB pada Intlayer.
- **Pergantian lokal** 2x-4x lebih cepat dengan Intlayer (3 ms vs 7-21 ms).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabel lengkap dalam [laporan benchmark TanStack Start](https://intlayer.org/id/doc/benchmark/tanstack).

## Mengapa ada perbedaan? Katalog terpusat vs kamus terkompilasi

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl` mengikuti model klasik: satu JSON per lokal, dimuat dalam `getRequestConfig`, diteruskan ke `NextIntlClientProvider`, dan dibaca lewat `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Runtime tidak dapat memprediksi kunci apa yang akan digunakan halaman, sehingga mengirimkan seluruh katalog adalah langkah paling aman.

Biaya kegagalan mencapainya tumbuh pada dua sumbu sekaligus, halaman dan lokalitas:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer membalikkan model tersebut. Konten dideklarasikan langsung di sebelah komponen:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                ├── page.tsx
                └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

Saat build, kompiler melihat komponen mana yang mengimpor kamus mana, dan hanya membundel kamus tersebut untuk lokal yang aktif.

> Untuk mendapatkan angka pada baris `dynamic`, atur `dictionary.importMode: 'dynamic'` di `intlayer.config.ts`. Lihat [panduan optimasi bundle](https://intlayer.org/id/doc/concept/bundle-optimization).

## Pengalaman pengembang

### Komponen klien

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/ClientCounter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Ingatlah untuk menyertakan namespace `counter` dalam pesan yang diteruskan ke `NextIntlClientProvider` di setiap halaman yang merender komponen ini.

</Tab>
<Tab label="Intlayer" value="intlayer">

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

Tidak ada yang perlu didaftarkan di halaman: komponen membawa kontennya sendiri.

</Tab>
</Tabs>
### Komponen server sinkron

Elemen UI bersama (navbar, footer, kartu) sering kali merupakan komponen server yang dirender sebagai anak dari komponen klien, sehingga tidak boleh bersifat `async`.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

Halaman harus memanggil `await getTranslations("counter")` dan `await getFormatter()`, lalu meneruskan hasilnya ke bawah sebagai props. Komponen tidak lagi mandiri.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>
### Metadata

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## Pertahankan API next-intl, dapatkan hasil Intlayer

Anda tidak perlu menulis ulang komponen untuk mendapatkan angka performa di atas. Paket `@intlayer/next-intl` adalah adaptor siap pakai: ia mempertahankan `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, dan bentuk jamak ICU, sambil menyajikannya dari kamus Intlayer yang dikompilasi oleh kompiler Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

Dalam pengujian, build kompatibilitas dari aplikasi yang sama turun dari **153.6 KB ke 147.5 KB** per halaman, ukuran komponen turun dari **21.8 KB ke 8.1 KB**, dan kebocoran halaman turun dari **~90% ke 0%**, tanpa mengubah kode aplikasi. File `messages/{locale}.json` yang ada dapat tetap menjadi sumber data utama melalui [plugin sinkronisasi JSON](https://intlayer.org/id/doc/compatibility/next-intl).

Lihat [panduan migrasi next-intl](https://intlayer.org/id/doc/migration/next-intl) untuk langkah-langkah detailnya.

## Kapan harus memilih yang mana?

<AccordionGroup>
<Accordion header="Pilih next-intl">

Anda menginginkan standar ekosistem untuk Next.js, mengandalkan ICU MessageFormat, aplikasi Anda berskala kecil hingga menengah, atau Anda berintegrasi dengan platform penerjemahan (Crowdin, Phrase, Lokalise...) yang mengharapkan JSON terpusat. Alokasikan waktu untuk membagi katalog ke dalam namespace dan memilih pesan dengan `pick()` per halaman jika performa menjadi prioritas.

</Accordion>
<Accordion header="Pilih Intlayer">

Anda menginginkan **konten dengan cakupan komponen**, **TypeScript yang ketat**, **kesalahan kunci hilang pada waktu build**, **tree-shaking dan pemuatan lambat (lazy loading) tanpa usaha**, komponen server sinkron, dan alat editorial bawaan ([Editor Visual](https://intlayer.org/id/doc/concept/editor), [CMS](https://intlayer.org/id/doc/concept/cms), [terjemahan AI](https://intlayer.org/id/doc/concept/auto-fill), [server MCP](https://intlayer.org/id/doc/mcp-server)). Sangat relevan untuk basis kode modular besar dan sistem desain.

</Accordion>
<Accordion header="Pilih @intlayer/next-intl">

Anda sudah menggunakan `next-intl` dan ingin penghematan ukuran bundel tanpa perlu menulis ulang kode. [Adaptor kompatibilitas](https://intlayer.org/id/doc/compatibility/next-intl) menjaga impor dan file `messages/{locale}.json` Anda sebagai sumber kebenaran tunggal. Diukur berdampingan dalam [next-intl vs @intlayer/next-intl](https://intlayer.org/id/blog/next-intl-vs-intlayer-next-intl).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Apakah next-intl lebih lambat dari Intlayer?">

Tidak pada waktu render. Perbedaannya terletak pada apa yang dikirim ke browser: `next-intl` berbiaya **+12.6 KB gzip** runtime pada setiap halaman dan pada konfigurasi umum mengirimkan ~90% string halaman lain bersama setiap halaman. Peralihan bahasa dan hidrasi sebanding di Next.js (15-18 ms); di TanStack Start `use-intl` membutuhkan 7-21 ms dibandingkan 3-4 ms untuk Intlayer.

</Question>

<Question title="Bisakah saya mencapai 0% kebocoran dengan next-intl?">

Bisa, dengan konfigurasi `scoped-dynamic`: bagi `messages/{locale}.json` menjadi satu namespace per rute, lalu gunakan `pick(messages, [...])` di setiap halaman dan jaga pemetaan tersebut tetap sinkron saat komponen berpindah. Baris `scoped-*` dalam tolok ukur mencerminkan pekerjaan tersebut. Intlayer mencapai 0% secara bawaan karena kompilator membatasi konten per komponen. Lihat [pengoptimalan bundel](https://intlayer.org/id/doc/concept/bundle-optimization).

</Question>

<Question title="Apakah saya harus menulis ulang komponen untuk bermigrasi?">

Tidak. `@intlayer/next-intl` mempertahankan `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, bentuk jamak ICU, dan helper navigasi, lalu menyediakannya dari kamus yang dikompilasi. Cukup satu baris plugin di `next.config.ts`. Panduan langkah demi langkah di [panduan migrasi next-intl](https://intlayer.org/id/doc/migration/next-intl).

</Question>

<Question title="Apakah Intlayer mendukung ICU MessageFormat?">

Dukungan ICU sedang dikembangkan pada API asli. Adaptor kompatibilitas (`@intlayer/next-intl`, `@intlayer/use-intl`) sudah menjalankan ICU: bentuk jamak, `select`, `selectordinal`, `#`, dan `{ts, date, long}` diproses melalui penyelesai ICU Intlayer. Baca [format pesan ICU](https://intlayer.org/id/blog/icu-message-format) untuk detailnya.

</Question>

<Question title="Bisakah saya mempertahankan file messages/{locale}.json?">

Bisa. [Plugin sinkronisasi JSON](https://intlayer.org/id/doc/compatibility/next-intl) membacanya, membagi kunci tingkat atas menjadi kamus, dan menulis kembali terjemahan ke file yang sama ketika CLI atau CMS memperbaruinya. Alur kerja penerjemah Anda tidak berubah.

</Question>

</FAQ>

## Perbandingan terkait

Tolok ukur yang sama, pustaka lain:

- [i18next vs Intlayer](https://intlayer.org/id/blog/i18next-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/id/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/id/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/id/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/id/blog/react-i18next-vs-react-intl-vs-intlayer)

Mendalami next-intl:

- [next-intl vs @intlayer/next-intl](https://intlayer.org/id/blog/next-intl-vs-intlayer-next-intl), adaptor diukur pada aplikasi yang sama
- [Is next-intl outdated?](https://intlayer.org/id/blog/is-next-intl-outdated)
- [Using Intlayer with next-intl](https://intlayer.org/id/blog/intlayer-with-next-intl)
- [How to internationalize a Next.js app with next-intl](https://intlayer.org/id/blog/nextjs-internationalization-using-next-intl)

Dokumentasi referensi:

- [Laporan benchmark Next.js](https://intlayer.org/id/doc/benchmark/nextjs) dan [laporan benchmark TanStack Start](https://intlayer.org/id/doc/benchmark/tanstack)
- [Adaptor kompatibilitas: next-intl](https://intlayer.org/id/doc/compatibility/next-intl) dan [panduan migrasi](https://intlayer.org/id/doc/migration/next-intl)
- [Pengoptimalan bundel](https://intlayer.org/id/doc/concept/bundle-optimization) dan [kompilator Intlayer](https://intlayer.org/id/doc/compiler)
- [i18n per komponen vs terpusat](https://intlayer.org/id/blog/per-component-vs-centralized-i18n)
- [i18n berbasis kompilator vs deklaratif](https://intlayer.org/id/blog/compiler-vs-declarative-i18n)

## Bintang GitHub

Bintang GitHub adalah indikator kuat dari popularitas proyek, kepercayaan komunitas, dan prospek jangka panjang.

[![Grafik Riwayat Bintang](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Kesimpulan

`next-intl` adalah pustaka yang solid dan dirawat dengan baik, dan pengujian mengonfirmasi bahwa pustaka ini merupakan pilihan yang baik di Next.js. Namun model katalog terpusat membebankan setiap optimasi kepada pengembang: pengaturan sederhana membocorkan sekitar 90% konten halaman lain, dan runtime-nya sendiri berbiaya +12.6 KB gzip pada setiap halaman.

Intlayer memindahkan semua pekerjaan itu ke kompiler. Kamus per komponen, lazy loading per lokal, dan pembersihan konten yang tidak terpakai adalah output build otomatis. Hasilnya pada aplikasi yang sama: **+0.3 KB per halaman**, **0% kebocoran**, komponen **3x lebih kecil**, dan pergantian lokal **2x-4x lebih cepat** pada TanStack Start.

Semua data mentah, aplikasi pengujian, dan skrip tersedia di [repositori Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Anda dapat menjalankannya sendiri.

Lihat dokumen ['Mengapa Intlayer?'](https://intlayer.org/id/doc/why) untuk detail lebih lanjut.
