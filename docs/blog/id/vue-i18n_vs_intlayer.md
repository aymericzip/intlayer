---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n vs Intlayer
description: Membandingkan vue-i18n dengan Intlayer untuk internasionalisasi (i18n) dalam aplikasi Vue/Nuxt
keywords:
  - vue-i18n
  - Intlayer
  - Internasionalisasi
  - i18n
  - Blog
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n VS Intlayer | Internasionalisasi Vue (i18n)

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Panduan ini membandingkan dua opsi i18n populer untuk **Vue 3** (dan **Nuxt**): **vue-i18n** dan **Intlayer**.
Kami fokus pada tooling Vue modern (Vite, Composition API) dan mengevaluasi:

1. **Arsitektur & organisasi konten**
2. **TypeScript & keamanan**
3. **Penanganan terjemahan yang hilang**
4. **Strategi routing & URL**
5. **Performa & perilaku pemuatan**
6. **Pengalaman pengembang (DX), tooling & pemeliharaan**
7. **SEO & skalabilitas proyek besar**

<TOC/>

> **ringkasan**: Keduanya dapat melokalkan aplikasi Vue. Jika Anda menginginkan **konten yang dibatasi pada komponen**, **tipe TypeScript yang ketat**, **pemeriksaan kunci hilang saat build-time**, **kamus yang di-tree-shake**, dan **bantuan router/SEO yang sudah termasuk** serta **Editor Visual & terjemahan AI**, **Intlayer** adalah pilihan yang lebih lengkap dan modern.

## Posisi tingkat tinggi

- **vue-i18n** - Perpustakaan i18n de-facto untuk Vue. Format pesan yang fleksibel (gaya ICU), blok SFC `<i18n>` untuk pesan lokal, dan ekosistem besar. Keamanan dan pemeliharaan skala besar sebagian besar menjadi tanggung jawab Anda.
- **Intlayer** - Model konten yang berfokus pada komponen untuk Vue/Vite/Nuxt dengan **pengetikan TS yang ketat**, **pemeriksaan saat build-time**, **tree-shaking**, **bantuan router & SEO**, **Editor Visual/CMS** opsional, dan **terjemahan dibantu AI**.

## Berapa biayanya pada waktu build

Sebelum tabel fitur, bagian yang diukur. [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) membangun aplikasi Vite + Vue 3 yang sama (10 halaman, 10 lokal) dengan setiap library dan mencatat apa yang diunduh browser:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

Runtime `vue-i18n` saja berbobot **6x** Intlayer, setiap halaman membawa **90% string halaman asing**, dan komponen yang dikompilasi secara terisolasi menarik **196 KB** karena `useI18n()` mengikatnya ke hierarki pesan global. Laporan lengkap dengan pengaturan waktu reaktivitas dan pemuatan halaman ada di [benchmark vue-i18n vs Intlayer](https://intlayer.org/id/blog/vue-i18n-vs-intlayer-benchmark).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabel lengkap dalam [laporan benchmark Vue](https://intlayer.org/id/doc/benchmark/vue).

## Perbandingan Fitur Berdampingan (Fokus pada Vue)

| Fitur                                                   | **Intlayer**                                                                                   | **vue-i18n**                                                                           |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Terjemahan dekat komponen**                           | ✅ Ya, konten ditempatkan bersama per komponen (misal, `MyComp.content.ts`)                    | ✅ Ya, melalui blok SFC `<i18n>` (opsional)                                            |
| **Integrasi TypeScript**                                | ✅ Lanjutan, tipe **strict** yang dihasilkan otomatis & autocompletion kunci                   | ✅ Typing yang baik; **keamanan kunci strict memerlukan pengaturan/disiplin tambahan** |
| **Deteksi terjemahan yang hilang**                      | ✅ Peringatan/eror **saat build-time** dan tampilan TS                                         | ⚠️ Fallback/peringatan saat runtime                                                    |
| **Konten kaya (komponen/Markdown)**                     | ✅ Dukungan langsung untuk node kaya dan file konten Markdown                                  | ⚠️ Terbatas (komponen melalui `<i18n-t>`, Markdown melalui plugin eksternal)           |
| **Terjemahan berbasis AI**                              | ✅ Alur kerja bawaan menggunakan kunci penyedia AI Anda sendiri                                | ❌ Tidak bawaan                                                                        |
| **Editor Visual / CMS**                                 | ✅ Editor Visual Gratis & CMS opsional                                                         | ❌ Tidak bawaan (gunakan platform eksternal)                                           |
| **Routing lokal**                                       | ✅ Bantuan untuk Vue Router/Nuxt untuk menghasilkan jalur, URL, dan `hreflang` yang dilokalkan | ⚠️ Bukan inti (gunakan Nuxt i18n atau pengaturan Vue Router kustom)                    |
| **Generasi rute dinamis**                               | ✅ Ya                                                                                          | ❌ Tidak disediakan (Nuxt i18n menyediakan)                                            |
| **Pluralisasi & pemformatan**                           | ✅ Pola enumerasi; pemformat berbasis Intl                                                     | ✅ Pesan gaya ICU; pemformat Intl                                                      |
| **Format konten**                                       | ✅ `.ts`, `.js`, `.json`, `.md`, `.txt` (YAML dalam pengerjaan)                                | ✅ `.json`, `.js` (plus blok SFC `<i18n>`)                                             |
| **Dukungan ICU**                                        | ⚠️ Dalam pengerjaan                                                                            | ✅ Ya                                                                                  |
| **Bantuan SEO (sitemap, robots, metadata)**             | ✅ Bantuan bawaan (framework-agnostik)                                                         | ❌ Bukan inti (Nuxt i18n/komunitas)                                                    |
| **SSR/SSG**                                             | ✅ Bekerja dengan Vue SSR dan Nuxt; tidak menghalangi rendering statis                         | ✅ Bekerja dengan Vue SSR/Nuxt                                                         |
| **Tree-shaking (mengirim hanya konten yang digunakan)** | ✅ Per-komponen saat build time                                                                | ⚠️ Sebagian; membutuhkan pemisahan kode/manual dan pesan async                         |
| **Lazy loading**                                        | ✅ Per-locale / per-kamus                                                                      | ✅ Mendukung pesan locale async                                                        |
| **Purge unused content**                                | ✅ Ya (saat build)                                                                             | ❌ Tidak bawaan                                                                        |
| **Maintainabilitas proyek besar**                       | ✅ Mendorong struktur modular yang ramah sistem desain                                         | ✅ Mungkin, tapi membutuhkan disiplin file/namespace yang kuat                         |
| **Ekosistem / komunitas**                               | ⚠️ Lebih kecil tapi tumbuh cepat                                                               | ✅ Besar dan matang dalam ekosistem Vue                                                |

## Perbandingan mendalam

<AccordionGroup>
<Accordion header="1) Arsitektur dan skalabilitas">

- **vue-i18n**: Pengaturan umum menggunakan **katalog terpusat** per locale (opsional dibagi menjadi file/namespace). Blok SFC `<i18n>` memungkinkan pesan lokal tetapi tim sering kembali ke katalog bersama saat proyek berkembang. Lihat [i18n per komponen vs terpusat](https://intlayer.org/id/blog/per-component-vs-centralized-i18n).
- **Intlayer**: Mendorong **kamus per-komponen** yang disimpan di samping komponen yang mereka layani. Ini mengurangi konflik antar tim, menjaga konten tetap dapat ditemukan, dan secara alami membatasi penyimpangan/kunci yang tidak terpakai.

**Mengapa ini penting:** Dalam aplikasi Vue besar atau sistem desain, **konten modular** lebih mudah diskalakan dibandingkan katalog monolitik.

</Accordion>
<Accordion header="2) TypeScript dan keamanan tipe">

- **vue-i18n**: Dukungan TS yang baik; **pengetikan kunci ketat** biasanya membutuhkan skema/generik khusus dan konvensi yang hati-hati.
- **Intlayer**: **Menghasilkan tipe yang ketat** dari konten Anda, memberikan **autocompletion IDE** dan **error saat kompilasi** untuk kesalahan ketik/kunci yang hilang.

**Mengapa ini penting:** Pengetikan yang kuat menangkap masalah **sebelum** runtime.

</Accordion>
<Accordion header="3) Penanganan terjemahan yang hilang">

- **vue-i18n**: Peringatan/fallback **saat runtime** (misalnya, fallback locale atau kunci). Lihat [mendeteksi terjemahan yang hilang](https://intlayer.org/id/blog/detecting-missing-translations).
- **Intlayer**: Deteksi **saat build** dengan peringatan/error di seluruh locale dan kunci., ditambah `npx intlayer test` di CI.

**Mengapa ini penting:** Penegakan saat build menjaga UI produksi tetap bersih dan konsisten.

</Accordion>
<Accordion header="4) Strategi perutean dan URL (Vue Router/Nuxt)">

- **Keduanya** dapat bekerja dengan rute yang dilokalkan. Lihat [panduan hreflang](https://intlayer.org/id/blog/hreflang-guide-multilingual-seo).
- **Intlayer** menyediakan helper untuk **menghasilkan path yang dilokalkan**, **mengelola prefix locale**, dan mengeluarkan **`<link rel="alternate" hreflang>`** untuk SEO. Dengan Nuxt, ini melengkapi routing framework.

**Mengapa ini penting:** Lebih sedikit lapisan penghubung kustom dan **SEO yang lebih bersih** di berbagai locale.

</Accordion>
<Accordion header="5) Kinerja dan perilaku pemuatan">

- **vue-i18n**: Mendukung pesan locale secara async; menghindari over-bundling adalah tanggung jawab Anda (pisahkan katalog dengan hati-hati). Benchmark di atas membuktikannya dengan angka: 134.9 KB berbanding 57.1 KB per halaman.
- **Intlayer**: **Melakukan tree-shaking** saat build dan **lazy-load per kamus/locale**. Konten yang tidak digunakan tidak dikirim.

**Mengapa ini penting:** Bundle yang lebih kecil dan startup lebih cepat untuk aplikasi Vue multi-locale.

</Accordion>
<Accordion header="6) Pengalaman pengembang dan perkakas">

- **vue-i18n**: Dokumentasi dan komunitas yang matang; Anda biasanya akan mengandalkan **platform lokalisasi eksternal** untuk alur kerja editorial.
- **Intlayer**: Menyediakan **Visual Editor gratis**, **CMS opsional** (ramah Git atau eksternal), **ekstensi VSCode**, utilitas **CLI/CI**, dan **terjemahan berbantuan AI** menggunakan kunci penyedia Anda sendiri., sebuah **server MCP**

**Mengapa ini penting:** Biaya operasional lebih rendah dan siklus dev–konten yang lebih singkat.

</Accordion>
<Accordion header="7) SEO, SSR dan SSG">

- **Keduanya** bekerja dengan Vue SSR dan Nuxt. Lihat [internasionalisasi dan SEO](https://intlayer.org/id/blog/SEO-and-i18n).
- **Intlayer**: Menambahkan **helper SEO** (sitemap/metadata/`hreflang`) yang tidak tergantung pada framework dan bekerja dengan baik pada build Vue/Nuxt.

**Mengapa ini penting:** SEO internasional tanpa pengaturan khusus.

</Accordion>
</AccordionGroup>

## Mengapa Intlayer? (Masalah & pendekatan)

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

Sebagian besar stack i18n (termasuk **vue-i18n**) dimulai dari **katalog terpusat**:

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="Satu berkas per lokal" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="Satu folder per lokal" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

Folder tersebut terus berkembang, satu namespace per fitur, di setiap lokal:

```txt
locales
├── EN
│   ├── blog.json
│   ├── about.json
│   ├── auth.json
│   ├── blog.json
│   ├── cart.json
│   ├── categories.json
│   ├── contact.json
│   ├── dashboard.json
│   ├── errors.json
│   ├── faq.json
│   ├── footer.json
│   ├── form.json
│   ├── home.json
│   ├── language.json
│   ├── navbar.json
│   ├── ... 65 files
│   └── validation.json
└── ES
```

Ini sering memperlambat pengembangan seiring pertumbuhan aplikasi:

1. **Untuk komponen baru** Anda membuat/mengedit katalog jarak jauh, menghubungkan namespace, dan menerjemahkan (seringkali melalui salin/tempel manual dari alat AI).
2. **Saat mengubah komponen** Anda mencari kunci bersama, menerjemahkan, menjaga sinkronisasi locale, menghapus kunci mati, dan menyelaraskan struktur JSON.

**Intlayer** mengatur konten **per-komponen** dan menyimpannya **di sebelah kode**, seperti yang sudah kita lakukan dengan CSS, stories, tests, dan docs:

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

Setiap berkas lokal harus diedit secara manual, dan kuncinya adalah string biasa: kesalahan ketik akan dirender sebagai `componentExample.greting` di produksi.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

Semua lokal berada dalam satu berkas bertipe di samping komponen.

</Tab>
</Tabs>

Pendekatan ini:

- **Mempercepat pengembangan** (deklarasi sekali; IDE/AI melengkapi otomatis).
- **Membersihkan codebase** (1 komponen = 1 kamus).
- **Mempermudah duplikasi/migrasi** (salin komponen dan kontennya bersama-sama).
- **Menghindari dead keys** (komponen yang tidak digunakan tidak mengimpor konten).
- **Mengoptimalkan pemuatan** (komponen yang dimuat secara malas membawa kontennya sendiri).

## Fitur tambahan Intlayer (relevan untuk Vue)

- **Dukungan lintas-framework**: Bekerja dengan Vue, Nuxt, Vite, React, Express, dan lainnya.
- **Manajemen konten berbasis JavaScript**: Deklarasikan dalam kode dengan fleksibilitas penuh.
- **File deklarasi per-locale**: Menyediakan semua locale dan membiarkan tooling menghasilkan sisanya.
- **Lingkungan yang aman tipe**: Konfigurasi TS yang kuat dengan autocompletion.
- **Pengambilan konten yang disederhanakan**: Satu hook/composable untuk mengambil semua konten untuk sebuah kamus.
- **Codebase yang terorganisir**: 1 komponen = 1 kamus dalam folder yang sama.
- **Routing yang ditingkatkan**: Bantuan untuk **Vue Router/Nuxt** jalur dan metadata yang dilokalkan.
- **Dukungan Markdown**: Impor Markdown jarak jauh/lokal per locale; mengekspose frontmatter ke kode.
- **Editor Visual Gratis & CMS opsional**: Penulisan tanpa platform lokalisasi berbayar; sinkronisasi ramah Git.
- **Konten yang dapat di-tree-shake**: Mengirim hanya apa yang digunakan; mendukung lazy loading.
- **Ramah rendering statis**: Tidak menghalangi SSG.
- **Terjemahan bertenaga AI**: Terjemahkan ke 231 bahasa menggunakan penyedia AI/API key Anda sendiri.
- **Server MCP & ekstensi VSCode**: Otomatiskan alur kerja i18n dan penulisan konten di dalam IDE Anda.
- **Interoperabilitas**: Menghubungkan dengan **vue-i18n**, **react-i18next**, dan **react-intl** saat diperlukan.

## Kapan memilih yang mana?

<AccordionGroup>
<Accordion header="Pilih vue-i18n">

Anda menginginkan **pendekatan standar Vue**, Anda nyaman mengelola katalog dan namespace sendiri, dan aplikasi Anda berukuran **kecil hingga menengah** (atau Anda sudah mengandalkan Nuxt i18n). Blok SFC `<i18n>` dan `setLocaleMessage()` runtime adalah fitur yang sengaja tidak direplikasi oleh Intlayer.

</Accordion>
<Accordion header="Pilih Intlayer">

Anda menghargai **konten scoped komponen**, **TypeScript yang ketat**, **jaminan saat build**, **tree-shaking**, dan perkakas lengkap untuk perutean, SEO, dan editor, terutama untuk **basis kode modular Vue/Nuxt besar** dan sistem desain. Mulai dengan [Intlayer dengan Vue](https://intlayer.org/id/doc/environment/vite-and-vue) atau [dengan Nuxt](https://intlayer.org/id/doc/environment/nuxt-and-vue).

</Accordion>
<Accordion header="Pilih @intlayer/vue-i18n">

Anda menggunakan `vue-i18n` hari ini dan menginginkan keuntungan bundel tanpa mengedit berkas `.vue`. [Adapter kompatibilitas](https://intlayer.org/id/doc/compatibility/vue-i18n) mempertahankan `createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t` dan `v-t`, dan menyajikannya dari kamus yang dikompilasi. Diukur berdampingan di [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/id/blog/vue-i18n-vs-intlayer-vue-i18n).

</Accordion>
</AccordionGroup>

## Interoperabilitas dengan vue-i18n

`intlayer` juga dapat membantu mengelola namespace `vue-i18n` Anda.

Dengan menggunakan `intlayer`, Anda dapat mendeklarasikan konten Anda dalam format perpustakaan i18n favorit Anda, dan intlayer akan menghasilkan namespace Anda di lokasi pilihan Anda (contoh: `/messages/{{locale}}/{{namespace}}.json`). Lihat [dokumen kompatibilitas vue-i18n](https://intlayer.org/id/doc/compatibility/vue-i18n) dan [adapter Nuxt i18n](https://intlayer.org/id/doc/compatibility/nuxtjs-i18n).

## FAQ

<FAQ>

<Question title="Apakah Intlayer pengganti vue-i18n atau lapisan di atasnya?">

Keduanya, tergantung cara Anda mengadopsinya. `vue-intlayer` adalah runtime native dengan composable `useIntlayer()` sendiri. `@intlayer/vue-i18n` adalah adapter kompatibilitas yang mempertahankan API `vue-i18n` dan menukar apa yang diikatnya, sehingga Anda dapat bermigrasi tanpa menyentuh komponen dan melanjutkannya berkas demi berkas setelahnya.

</Question>

<Question title="Apa yang terjadi pada blok SFC <i18n> saya?">

Adapter tidak membacanya. Pindahkan pesan tersebut ke JSON lokal Anda, atau ke `.content.ts` di sebelah komponen, yang merupakan konsep serupa dengan tipe yang dihasilkan. Itu adalah satu-satunya fitur `vue-i18n` yang tidak terbawa.

</Question>

<Question title="Apakah Intlayer berfungsi dengan Nuxt?">

Ya. [Intlayer dengan Nuxt](https://intlayer.org/id/doc/environment/nuxt-and-vue) mencakup perutean multibahasa, middleware deteksi lokal, dan pembuatan peta situs. Jika Anda menggunakan `@nuxtjs/i18n`, [adapter kompatibilitas Nuxt i18n](https://intlayer.org/id/doc/compatibility/nuxtjs-i18n) adalah jalur migrasinya.

</Question>

<Question title="Bisakah saya mempertahankan locales/{locale}.json sebagai sumber kebenaran?">

Ya. [Plugin sinkronisasi JSON](https://intlayer.org/id/doc/compatibility/vue-i18n) membacanya dengan dialek `vue-i18n` (`{name}`, `{0}`, bentuk jamak pipa `"car | cars"`) dan menulis kembali terjemahan saat CLI atau CMS memperbaruinya.

</Question>

<Question title="Apakah ICU berfungsi dengan Intlayer di Vue?">

Dukungan ICU bawaan sedang dalam pengerjaan. Adapter `@intlayer/vue-i18n` menyelesaikan sintaks pesan `vue-i18n` sendiri, termasuk bentuk jamak pipa dan interpolasi bernama serta daftar. Untuk model pluralisasi Intlayer, lihat [konten enumerasi](https://intlayer.org/id/doc/concept/content/enumeration).

</Question>

</FAQ>

## GitHub STARs

Bintang GitHub adalah indikator kuat dari popularitas proyek, kepercayaan komunitas, dan relevansi jangka panjang. Meskipun bukan ukuran langsung dari kualitas teknis, bintang mencerminkan berapa banyak pengembang yang menganggap proyek tersebut berguna, mengikuti perkembangannya, dan kemungkinan akan mengadopsinya. Untuk memperkirakan nilai sebuah proyek, bintang membantu membandingkan daya tarik di antara alternatif dan memberikan wawasan tentang pertumbuhan ekosistem.

[![Grafik Riwayat Bintang](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Kesimpulan

Baik **vue-i18n** maupun **Intlayer** sama-sama melakukan lokalisasi aplikasi Vue dengan baik. Perbedaannya adalah **seberapa banyak yang harus Anda bangun sendiri** untuk mencapai pengaturan yang kuat dan dapat diskalakan:

- Dengan **Intlayer**, **konten modular**, **TS ketat**, **keamanan saat build**, **bundle tree-shaken**, dan **tooling router/SEO/editor** tersedia **langsung**.
- Jika tim Anda memprioritaskan **pemeliharaan dan kecepatan** dalam aplikasi Vue/Nuxt multi-locale yang berbasis komponen, Intlayer menawarkan pengalaman yang **paling lengkap** saat ini.

## Bacaan lebih lanjut

- [vue-i18n vs Intlayer benchmark](https://intlayer.org/id/blog/vue-i18n-vs-intlayer-benchmark), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/id/blog/vue-i18n-vs-intlayer-vue-i18n), the adapter on the same app
- [Is vue-i18n outdated?](https://intlayer.org/id/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/id/blog/how-to-pick-vue-i18n-library)
- [Using Intlayer with vue-i18n](https://intlayer.org/id/blog/intlayer-with-vue-i18n)
- [Vue benchmark report](https://intlayer.org/id/doc/benchmark/vue)
- [Migration guide: vue-i18n to Intlayer](https://intlayer.org/id/doc/migration/vue-i18n)
- [Bundle optimization](https://intlayer.org/id/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/id/doc/compiler)

Refer to ['Why Intlayer?' doc](https://intlayer.org/id/doc/why) for more details.
