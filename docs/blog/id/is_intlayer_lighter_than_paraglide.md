---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: Apakah Intlayer lebih ringan dari Paraglide?
description: Paraglide terlihat hampir tanpa beban dalam tolok ukur i18n karena kodenya dibuat langsung di repositori Anda. Berikut analisis ke mana beban tersebut sebenarnya berada, mengapa pembacaan lokal per-node membebani performa, dan bagaimana pemuatan dinamis Intlayer mengirimkan satu bahasa saja alih-alih semuanya.
keywords:
  - Paraglide
  - Intlayer
  - Internasionalisasi
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Apakah Intlayer lebih ringan dari Paraglide?

Ya.

`Paraglide` memiliki reputasi yang sangat baik sebagai solusi i18n paling ringan, dan sekilas hasil [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md) mengonfirmasi hal tersebut: ukuran pustakanya mendekati nol. Namun, ukuran pustaka nol tidak berarti nol bita yang dikirim ke peramban. Itu hanya berarti bita-bita tersebut berada di tempat yang tidak diukur oleh metrik tersebut.

<TOC/>

## Poin Kunci

**Ukuran pustaka disembunyikan, bukan dihilangkan:**

Paraglide membuat kode runtime dan fungsi pesannya langsung di dalam codebase Anda. Kode tersebut tetap dikirim ke peramban, tetapi dihitung sebagai kode _Anda_, bukan sebagai kode pustaka pihak ketiga.

**Tanpa provider bukan berarti kemenangan cuma-cuma:**

Setiap pemanggilan `m.my_key()` menyelesaikan penentuan lokal secara mandiri, membaca cookie atau penyimpanan untuk setiap node yang dirender, alih-alih membacanya sekali saja dari sebuah konteks.

**Tidak ada pemuatan dinamis (Dynamic Loading):**

Paraglide mengimpor seluruh bahasa dari sebuah pesan ke dalam bundle klien Anda. Sebaliknya, Intlayer dengan `importMode: 'dynamic'` atau `'fetch'` hanya memuat bahasa yang sedang dirender.

**Tree shaking tidak selalu terjamin:**

Dalam beberapa pengujian tolok ukur kami, tree shaking yang digadang-gadang oleh Paraglide tidak bekerja efektif. Sebaiknya periksa bundle aplikasi Anda sendiri.

## Ke Mana Sebenarnya Beban Paraglide Berada?

Dalam laporan tolok ukur, metrik "ukuran pustaka" mengukur provider dan hook dari masing-masing pustaka i18n pada komponen kosong, sebelum konten apa pun ditambahkan.

| Pustaka (TanStack Start)      | Ukuran lib (gz) | Ukuran lib (min) |
| ----------------------------- | --------------- | ---------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB          | 4.5 KB           |
| `react-intlayer@9.5.1`        | 5.0 KB          | 15.2 KB          |

Jika dibaca secara terpisah, Paraglide tampak unggul. Namun Paraglide adalah sebuah kompilator: ia membaca berkas `messages/*.json` Anda dan menulis folder `paraglide/` ke repositori Anda, yang berisi `runtime.js` (deteksi lokal, strategi cookie dan penyimpanan, pelokalan URL) serta satu fungsi JavaScript per pesan.

```bash
src/paraglide/
├── runtime.js      # deteksi lokal, strategi, helper URL
├── server.js
├── messages.js     # mengekspor kembali semua pesan
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Karena kode ini berada di dalam folder `src/` Anda dan diimpor menggunakan jalur relatif, bundler menganggapnya sebagai bagian dari aplikasi Anda, bukan paket luar di `node_modules`. Kolom ukuran pustaka memperlihatkan angka mendekati nol, padahal logika yang sama tetap dikirim dalam bundle halaman Anda.

Menghasilkan kode otomatis bukanlah ide buruk: runtime yang dihasilkan hanya memuat logika yang benar-benar dibutuhkan konfigurasi Anda (strategi awalan, cookie vs local storage, dll.). Intlayer mencapai hasil yang sama dengan cara berbeda, yaitu menyuntikkan variabel lingkungan saat proses build sehingga bundler membuang percabangan kode yang tidak digunakan konfigurasi Anda. Kedua pendekatan ini berakhir 3 hingga 10 kali lebih ringan daripada `i18next` atau `next-intl`.

Oleh karena itu, perbandingan yang adil bukanlah ukuran pustakanya, melainkan **JavaScript yang benar-benar dikirimkan per halaman**.

## Beban Halaman yang Terukur

Aplikasi TanStack Start, 10 halaman, diukur pada rute `en` dan `fr`, dikompresi dengan gzip:

| Konfigurasi                        | Rata-rata JS Hal (gz) | Di atas dasar | Kebocoran lokal | Kebocoran hal lain |
| ---------------------------------- | --------------------- | ------------- | --------------- | ------------------ |
| Dasar (tanpa i18n)                 | 111.0 KB              | -             | 0.0%            | 0.0%               |
| `paraglide` (semua strategi)       | 125.1 KB              | +14.1 KB      | 49.7%           | 0.0%               |
| `intlayer` (`importMode: static`)  | 125.8 KB              | +14.8 KB      | 50.0%           | 0.0%               |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**          | **+7.6 KB**   | **0.0%**        | **0.0%**           |

Next.js 16 App Router, aplikasi yang sama:

| Konfigurasi        | Rata-rata JS Hal (gz) | Di atas dasar |
| ------------------ | --------------------- | ------------- |
| Dasar (tanpa i18n) | 141.0 KB              | -             |
| `paraglide-next`   | 155.3 KB              | +14.3 KB      |
| `next-intlayer`    | **141.3 KB**          | **+0.3 KB**   |

<I18nBenchmark framework="tanstack" vertical/>

> Data lengkap tersedia di [laporan benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md) dan [laporan benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md). Setiap bundle dapat diperiksa langsung di [repositori benchmark](https://github.com/intlayer-org/benchmark-i18n).

Dua hal terlihat sangat jelas:

- Dalam mode `static`, Intlayer mengirimkan konten yang hampir sama persis dengan Paraglide (125.8 KB vs 125.1 KB). Hal ini wajar: keduanya menyertakan semua bahasa dari pesan yang digunakan oleh halaman tersebut.
- Paraglide tetap berada di angka 125.1 KB apa pun strateginya, karena tidak memiliki mode dinamis. Setiap baris pada tabel di atas mewakili mode statis.

## Tanpa Provider: Ide yang Tampak Bagus Namun Berisiko

Paraglide tidak memerlukan provider. Anda cukup mengimpor pesan dan memanggilnya:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Tanpa konteks, tanpa wrapper, tanpa hook. Tampak lebih sederhana. Namun, informasi bahasa tetap harus diperoleh dari suatu tempat. Setiap fungsi pesan yang dihasilkan kurang lebih tampak seperti ini (disederhanakan):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // diselesaikan pada setiap pemanggilan

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...satu percabangan per bahasa
};
```

Dan `getLocale()` menelusuri seluruh strategi yang dikonfigurasi (cookie, penyimpanan lokal, URL, bahasa dasar) untuk menemukan lokal aktif. Akibatnya, setiap node teks yang Anda render (`<>{m.my_key()}</>`) menjalankan proses resolusi lokalnya sendiri, termasuk membaca `document.cookie` di peramban. Halaman dengan 200 string terjemahan akan menyelesaikan lokal sebanyak 200 kali per render, dan berulang kembali pada setiap re-render.

Pustaka berbasis provider membaca lokal **hanya sekali**, menyimpannya dalam konteks (atau sinyal, atau store), dan setiap node hanya membaca nilai yang sudah tersedia di memori. Biaya provider hanya beberapa ratus bita. Menghilangkannya justru membebani kerja CPU pada setiap render. Hal ini terbukti dalam tolok ukur: waktu muat halaman dan pergantian bahasa Paraglide konsisten berada di belakang Intlayer pada TanStack Start (waktu muat halaman 22.1 ms vs 14.6 ms, reaktivitas E2E 4.3 ms vs 3.2 ms).

## Pengalaman Pengembang (DX)

Sumber kebenaran Paraglide adalah berkas JSON, tetapi Anda tidak pernah mengimpor berkas JSON secara langsung. Anda mengimpor berkas `.js` yang dihasilkan:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/id.json"
{
  "hero_title": "Rilis aplikasi Anda dalam semua bahasa"
}
```

```tsx fileName="Hero.tsx"
// Hanya ada setelah kompilator membuatnya ulang dari JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      id: "Rilis aplikasi Anda dalam semua bahasa",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Alur kerja semacam ini menimbulkan konsekuensi:

- Setiap perubahan pada berkas JSON memerlukan pembuatan ulang (regeneration) sebelum import dapat dikenali atau tipe data diperbarui.
- Folder `paraglide/` yang dibuat harus diikutsertakan dalam commit git (memicu konflik merge pada berkas buatan di setiap PR teks), atau diabaikan (mengharuskan langkah kompilasi sebelum pemeriksaan tipe, pengujian, dan tugas CI).
- Setiap string berubah menjadi pemanggilan fungsi. Konstanta berubah menjadi `m.key()` di mana-mana, bahkan di tempat yang sebenarnya cukup dengan nilai statis biasa.

## Tree Shaking: Periksa Bundle Anda

Janji utama Paraglide adalah bahwa pesan yang tidak digunakan akan dibuang melalui tree shaking, karena setiap pesan merupakan ekspor mandiri. Pada tolok ukur Svelte + Vite, fitur ini bekerja sesuai klaim.

Namun dalam konfigurasi lain, hal itu tidak terjadi. Pada pengujian [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md) kami, halaman Paraglide berbobot 14 KB lebih berat daripada aplikasi dasar, sedangkan `next-intlayer` hanya menambahkan 0.3 KB. Pengujian awal di TanStack Start juga memperlihatkan pesan dari halaman lain ikut terbawa ke dalam bundle rute yang sedang dibuka.

Tree shaking sangat bergantung pada bundler Anda (Turbopack, Rolldown, Rollup), cara pesan diimpor (`import { m }` vs `import * as m`), dan analisis efek samping (side effects). Jika Anda memilih Paraglide karena pertimbangan ukuran, buka visualizer bundle Anda dan pastikan fitur tersebut bekerja di aplikasi Anda.

## Tanpa Pemuatan Dinamis

Inilah batasan struktural utamanya. Paraglide tidak memiliki mekanisme untuk memuat satu bahasa dalam satu waktu: setiap fungsi pesan secara statis mengimpor implementasi setiap bahasa, sehingga seluruh bahasa berakhir di dalam bundle klien Anda.

Dengan 2 bahasa, separuh muatan terjemahan terbuang sia-sia, cocok dengan ~50% kebocoran lokal yang diukur sebelumnya. Dengan 10 bahasa, pemborosan mencapai 90%. Dengan 30 bahasa, melonjak hingga 97%.

Beralih ke pemuatan dinamis pun tidak serta-merta menyelesaikan masalah: dengan satu fungsi untuk setiap pesan, memuat setiap fungsi secara lazy akan memicu ribuan permintaan jaringan yang terpisah-pisah.

Intlayer memberi Anda fleksibilitas untuk memilih secara global maupun per kamus:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Yang dikirimkan ke klien                                | vs. Paraglide                           |
| ------------ | ------------------------------------------------------- | --------------------------------------- |
| `static`     | Seluruh bahasa dari kamus yang digunakan halaman        | Secara teori muatan sama                |
| `dynamic`    | Hanya bahasa aktif, dimuat secara lazy per kamus        | **N kali lebih ringan** dengan N bahasa |
| `fetch`      | Hanya bahasa aktif, diambil langsung dari Live Sync API | **N kali lebih ringan** dengan N bahasa |

Dengan [transformasi build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan `importMode: 'static'`, Intlayer secara teoritis memuat konten yang sama persis dengan Paraglide. Namun dengan mode `'dynamic'` atau `'fetch'`, ia hanya memuat apa yang dibutuhkan bahasa saat ini: untuk aplikasi dengan N bahasa, beban terjemahan menjadi N kali lebih kecil daripada Paraglide.

## Kapan Paraglide Masih Relevan?

<AccordionGroup>
<Accordion header="Svelte + Vite dengan sedikit bahasa">

Jika teknologi Anda menggunakan Svelte bersama Vite dan Anda hanya mendukung dua atau tiga bahasa, tree shaking bekerja sesuai harapan dan overhead bahasa tambahan tetap minim.

</Accordion>
<Accordion header="Alur kerja inlang yang sudah ada">

Jika tim Anda sudah terbiasa menggunakan ekosistem inlang (Fink, Sherlock, plugin format pesan), Paraglide terintegrasi secara mulus.

</Accordion>
</AccordionGroup>

## Uji Sendiri di Aplikasi Anda

Periksa ukuran muatan dan kebocoran lokal aplikasi produksi Anda dengan [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) gratis:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Untuk menyiapkan Intlayer:

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

## Bacaan Lanjutan

- [Benchmark i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)
- [Benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md)
- [Optimasi Bundle dan `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)
- [Cara Memilih Pustaka i18n untuk React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_react_i18n_library.md)
- [Alasan Memilih Internasionalisasi Berbasis Kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md)
