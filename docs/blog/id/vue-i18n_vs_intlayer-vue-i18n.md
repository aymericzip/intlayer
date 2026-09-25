---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "vue-i18n vs @intlayer/vue-i18n: API yang Sama, Bundle Berbeda"
description: Apa yang berubah ketika aplikasi Vue 3 menyimpan panggilan vue-i18n-nya tetapi melayaninya melalui adapter kompatibilitas @intlayer/vue-i18n. JavaScript per halaman, ukuran runtime, ukuran komponen dan kebocoran diukur pada kode Vite + Vue yang sama, ditambah apa yang adapter simpan, abaikan dan tidak dapat gantikan.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migrasi
  - Internasionalisasi
  - i18n
  - Benchmark
  - Ukuran bundle
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VERSUS @intlayer/vue-i18n | API yang Sama, Bundle Berbeda

![Ekosistem library i18n Vue](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n` adalah adapter kompatibilitas: ini mengekspos API `vue-i18n` (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) dan melayaninya dari kamus yang dikompilasi oleh Intlayer. File `.vue` Anda tidak berubah. Apa yang terikat pada `t("footer.github")` yang berubah.

Artikel ini mengukur pertukaran tersebut pada aplikasi Vite + Vue 3 yang sama, dibangun sekali dengan `vue-i18n` dan sekali dengan adapter. Angka-angka tersebut berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Untuk perbandingan `vue-i18n` dan Intlayer sebagai library, baca [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer.md) dan [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer_benchmark.md). Yang ini tentang apa yang berubah adapter ketika Anda mempertahankan komponen seperti apa adanya.

<TOC/>

> **tl;dr**: Pada aplikasi Vite + Vue 3 yang sama, mengganti `vue-i18n` dengan `@intlayer/vue-i18n` mengurangi JavaScript per-halaman dari **134.9 KB menjadi 47.0 KB** gzip (aplikasi tanpa i18n berukuran 41.3 KB), runtime dari **24.3 KB menjadi 7.9 KB**, rata-rata komponen dari **196 KB menjadi 8.4 KB**, dan kebocoran string halaman asing dari **90% menjadi 0%**, tanpa mengedit file `.vue` apa pun. `createI18n({ messages })` terus berfungsi sebagai fallback; hapus impor JSON untuk mendapatkan angka di atas. Blok SFC `<i18n>` dan `setLocaleMessage()` runtime adalah dua fitur yang tidak terbawa.

## Apa itu `@intlayer/vue-i18n`

`vue-i18n` adalah runtime. `createI18n({ messages: { en, fr, ... } })` membangun instans global yang menyimpan setiap pesan dari setiap lokal; `useI18n()` mengikat setiap komponen ke dalamnya; `t("footer.github")` menelusuri hierarki saat waktu render. Desain itulah yang memungkinkan blok SFC `<i18n>` dan `setLocaleMessage()`, dan itulah sebabnya grafik dependensi setiap komponen mencakup seluruh hierarki.

`@intlayer/vue-i18n` mempertahankan API dan mengganti hierarki tersebut:

1. **Import aliasing.** `vueI18nVitePlugin()` dari `@intlayer/vue-i18n/plugin` membungkus `vite-intlayer` dan menambahkan `resolve.alias` sehingga `vue-i18n` diselesaikan ke `@intlayer/vue-i18n`. Tidak ada impor yang diganti namanya.
2. **JSON sebagai sumber kebenaran.** Plugin `syncJSON` membaca `locales/{locale}.json` Anda yang sudah ada dengan `format: "vue-i18n"` (sehingga interpolasi daftar `{name}`, `{0}` dan bentuk jamak `"car | cars"` diurai dengan benar) dan menulis kembali terjemahan saat CLI atau CMS memperbaruinya.
3. **Pengikatan call-site.** Tahap optimalisasi Intlayer menulis ulang lokasi pemanggilan `useI18n()` sehingga komponen menerima kamus yang disebutkan oleh kuncinya, dalam lokal aktif, sebagai impor yang dapat dilacak dan dipecah oleh bundler.

```vue fileName="src/components/Footer.vue"
<!-- Kode Anda, tidak berubah -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="Apa yang dihasilkan kompiler (disederhanakan)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

Komponen tidak lagi mengakses hierarki pesan global. Komponen mengakses `footer`. Itulah sebabnya kolom ukuran komponen di bawah ini turun dari 196 KB menjadi 8 KB.

## Apa yang adapter simpan, abaikan, dan tidak gantikan

| API `vue-i18n`                                                      | Dengan `@intlayer/vue-i18n`                                                                                                                       |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ Dipertahankan. Kunci `t` memiliki tipe berdasarkan kamus Anda                                                                                  |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ Dipertahankan. `{name}`, `{0}` dan bentuk jamak dengan tanda pipa diselesaikan seperti sebelumnya                                              |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ Dipertahankan. `datetimeFormats` / `numberFormats` dari `createI18n()` dihormati, didukung oleh `Intl` bawaan                                  |
| `i18n.global.locale.value = "fr"`                                   | ✅ Dipertahankan. `WritableComputedRef` yang didukung oleh klien Intlayer; reaktivitas berfungsi seperti sebelumnya                               |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ Dipertahankan. Didaftarkan di `app.config.globalProperties` oleh `app.use(i18n)`                                                               |
| Direktif `v-t`                                                      | ✅ Dipertahankan                                                                                                                                  |
| `legacy: true`                                                      | ✅ Diterima                                                                                                                                       |
| `createI18n({ messages })`                                          | ⚠️ `messages` digunakan sebagai **fallback runtime** dengan peringatan dev. Hapus impor JSON untuk penghematan bundle                             |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ Peringatan dan tidak melakukan apa pun. Pemuatan pesan runtime digantikan oleh kamus saat build                                                |
| Blok kustom SFC `<i18n>`                                            | ❌ Tidak dibaca. Pindahkan pesan-pesan tersebut ke dalam JSON lokal (atau `.content.ts` di sebelah komponen)                                      |
| `@nuxtjs/i18n`                                                      | ⚠️ Adapter terpisah, lihat [dokumentasi kompatibilitas Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/nuxtjs-i18n.md) |

## Benchmark

### Apa yang diukur

Rangkaian [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) membangun **aplikasi Vite + Vue 3 yang sama** dengan setiap konfigurasi: **10 halaman** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lokal** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), komponen identik dan konten identik. Halaman diukur dalam `en` dan `fr`.

Keduanya dibangun dalam konfigurasi **statis**, yang dikirimkan sebagian besar proyek Vue: untuk `vue-i18n`, JSON setiap lokal diimpor dan diteruskan ke `createI18n({ messages })`; untuk adapter, komponen yang sama dengan `vite.config.ts` dan `intlayer.config.ts` diubah dan impor `messages` dihapus. `vue-intlayer` native disertakan sebagai referensi.

Untuk setiap build, pengujian mencatat:

- **Lib size**: ukuran gzip (dan minified) dari komponen kosong yang hanya mengimpor library i18n.
- **Page JS**: JavaScript gzip yang diunduh per halaman, dirata-ratakan di semua halaman dan lokal.
- **Locale leak %**: bagian dari string terjemahan dalam JS yang diunduh milik lokal yang pengguna **tidak** lihat.
- **Page leak %**: bagian dari string terjemahan dalam JS yang diunduh milik halaman tempat pengguna **tidak** berada.
- **Component avg**: rata-rata ukuran gzip setiap komponen yang dikompilasi secara terisolasi.
- **E2E reactivity**: waktu dari pemilihan lokal baru hingga lokal aktif dan `html[lang]` diperbarui di DOM (Playwright, 5 iterasi).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Angka-angka di bawah ini berasal dari pengujian tanggal **12-09-2026** dengan `vue-i18n` 11.4.0 dan `@intlayer/vue-i18n` 9.5.1. Aplikasi pengujian sengaja dibuat kecil (beberapa lusin string per lokal), sehingga persentase kebocoran menggambarkan **pola**: mereka bertambah seiring bertambahnya konten Anda sementara biaya runtime tetap tetap.

### Hasil pada Vite + Vue 3

Pilih metrik dan pustaka yang Anda minati:

<I18nBenchmark framework="vite-vue" vertical/>

| Penyiapan                | Strategi | Ukuran Lib (gz) | Ukuran Lib (min) | Rata-rata JS Halaman (gz) | Kebocoran lokal | Kebocoran halaman | Rata-rata Komponen (gz) | Reaktivitas E2E | Waktu Muat Halaman |
| ------------------------ | -------- | --------------: | ---------------: | ------------------------: | --------------: | ----------------: | ----------------------: | --------------: | -----------------: |
| **base** (tanpa i18n)    | -        |          0.0 KB |           0.0 KB |                   41.3 KB |            0.0% |                 - |                  1.1 KB |          1.8 ms |            10.8 ms |
| `vue-i18n`               | static   |         24.3 KB |          83.2 KB |                  134.9 KB |           50.0% |             90.0% |                196.0 KB |          2.8 ms |            13.6 ms |
| **`@intlayer/vue-i18n`** | static   |      **7.9 KB** |      **23.2 KB** |               **47.0 KB** |       **15.0%** |          **0.0%** |              **8.4 KB** |      **1.5 ms** |         **9.3 ms** |
| `vue-intlayer` (native)  | static   |          3.9 KB |          11.1 KB |                   57.1 KB |           56.8% |              0.0% |                  7.7 KB |          4.5 ms |            13.8 ms |
| `vue-intlayer` (native)  | dynamic  |          3.9 KB |          11.1 KB |                   59.8 KB |           50.0% |              0.0% |                  6.5 KB |          4.0 ms |            15.8 ms |

> Kolom kebocoran halaman aplikasi dasar dibiarkan kosong: tanpa library i18n, sidik jari mendeteksi string yang di-hardcode dalam chunk bersama dan angkanya tidak bermakna.

**Cara membacanya**

- **88 KB lebih sedikit per halaman, komponen yang sama.** `vue-i18n` membawa aplikasi 41.3 KB ke **134.9 KB**. Build adapter dari komponen yang sama berada di **47.0 KB**, 5.7 KB di atas aplikasi dasar. Sebagian besar perbedaannya adalah 74.9 KB dari `src/locales` yang ditarik oleh `createI18n({ messages })` ke setiap halaman dan tidak pernah dibundel adapter sebagai satu blok.
- **Ukuran runtime menyusut 3x lipat.** Komponen kosong yang hanya mengimpor `vue-i18n` berukuran **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`, kompiler pesan dan runtime. Adapter berukuran **7.9 KB / 23.2 KB**, sebagian besar adalah inti Intlayer ditambah permukaan API `vue-i18n`.
- **Komponen: 23x lebih kecil.** Komponen `useI18n()` yang dikompilasi secara terisolasi rata-rata berukuran **196 KB**, karena `t` terikat pada instans yang menyimpan setiap pesan dari setiap lokal. Dengan adapter, komponen yang sama rata-rata berukuran **8.4 KB**: komponen ini hanya mencapai kamusnya sendiri.
- **Kebocoran.** `vue-i18n` mengirimkan setiap lokal dan string setiap halaman di setiap halaman: kebocoran lokal 50% (pada dua lokal yang diuji; dengan sepuluh lokal yang dibundel, pemborosan sebenarnya lebih tinggi), kebocoran halaman 90%. Adapter menurunkan kebocoran halaman menjadi **0%** karena setiap komponen hanya mengimpor kamusnya. Kebocoran lokal berada di 15% dalam pengujian `static` ini; `importMode: 'dynamic'` adalah pengaturan yang menghilangkannya, dan konfigurasi tersebut bukan bagian dari pengujian Vue ini.
- **Reaktivitas dan waktu muat halaman.** Perpindahan lokal murah untuk keduanya (1.5-2.8 ms); sistem reaktivitas Vue membuatnya demikian setelah pesan berada dalam memori. Pemuatan halaman beralih dari 13.6 ms menjadi **9.3 ms**, sejalan dengan berkurangnya 88 KB JavaScript yang harus di-parse.
- **Tentang baris native.** `vue-intlayer` dalam pengujian ini membundel setiap lokal dalam mode `static` dan mencapai 57.1 KB dengan runtime 3.9 KB; kamus adapter yang disinkronkan membawa lebih sedikit string lokal asing, itulah sebabnya angka per halaman lebih rendah. Runtime bawaan tetap menjadi yang teringan dari ketiganya, dan model `.content.ts`-nya adalah tempat blok SFC `<i18n>` menemukan padanannya.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Tabel lengkap, setiap pustaka dan strategi, dalam [laporan benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/vue.md).

## Mengapa angka berubah

![Kompiler Intlayer mengekstrak konten dari komponen](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Tidak ada apa pun di `src/components/` yang berubah, jadi keuntungan berasal dari apa yang terikat pada `useI18n`.

**Dengan `vue-i18n`**, pengikatannya adalah instans global. `createI18n({ messages: { en, fr, ... } })` adalah satu impor yang menampung semuanya; setiap komponen yang memanggil `useI18n()` dapat mengakses semuanya, sehingga bundler tidak dapat memecahnya di bawah tingkat instans. Mengoptimalkan berarti _Anda_ memecah `en.json` berdasarkan rute, memanggil `setLocaleMessage()` dalam guard router, dan menjaga peta rute-ke-berkas tetap benar saat komponen dipindahkan. Pemborosan tumbuh pada dua sumbu sekaligus, halaman dan lokal:

![Kebocoran konten teoretis berdasarkan arsitektur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # string setiap halaman
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**Dengan `@intlayer/vue-i18n`**, pengikatannya adalah kamus. `syncJSON` mengubah setiap kunci tingkat atas `en.json` menjadi kamus; tahap pengoptimalan memberikan komponen kamus yang disebutkan kuncinya, sebagai impor yang dilacak dan dipecah bundler per halaman.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # tidak berubah, tetap menjadi sumber kebenaran
│   └── fr.json
├── .intlayer/                     # dihasilkan: satu kamus per kunci tingkat atas, per lokal
└── src
    ├── i18n.ts                    # createI18n({})   ← impor messages dihapus
    ├── main.ts                    # app.use(i18n)    ← tidak berubah
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← tidak berubah
```

Impor `messages` di `i18n.ts` adalah satu baris yang perlu dihapus. Itulah penghematan 88 KB.

## Migrasi dalam tiga langkah

<Steps>
<Step number={1} title="Pasang">

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

Perintah ini mendeteksi `vue-i18n`, memasang `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n`, dan `@intlayer/sync-json-plugin`, serta mengisi `intlayer.config.ts`. Tetap pasang `vue-i18n`: ini adalah dependensi sejawat dan menyediakan tipenya.

</Step>
<Step number={2} title="Arahkan Intlayer ke berkas lokal Anda">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" membundel setiap lokal; "dynamic" memuat yang aktif sesuai permintaan
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // dialek vue-i18n: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` tetap berada di tempatnya semula. Setiap kunci tingkat atas (`footer`, `hero`...) menjadi kamus.

</Step>
<Step number={3} title="Tambahkan plugin dan hapus impor messages">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Sebelum: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` membungkus `vite-intlayer` (pemantauan konten, kompilasi kamus, fase optimasi) dan membuat alias `vue-i18n` ke adapter. Menghapus impor `messages` adalah apa yang memangkas 88 KB; membiarkannya tetap membuat aplikasi berjalan namun mengirimkan keduanya.

</Step>
</Steps>

### Apa yang dapat Anda hapus setelahnya

| Berkas / pola                                       | Alasan                                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `import en from "./locales/en.json"` dan sejenisnya | Digunakan hanya sebagai fallback oleh adapter. Di sinilah 88 KB berada               |
| `setLocaleMessage()` di guard router                | Tidak ada operasi. Pemuatan per-rute sekarang menjadi tugas compiler                 |
| `@intlify/unplugin-vue-i18n`                        | Tidak diperlukan: ini mengompilasi awal pesan dan blok SFC yang tidak dibaca adapter |
| Blok SFC `<i18n>`                                   | Tidak dibaca; pindahkan ke JSON lokal atau ke `.content.ts` per komponen             |

### Apa yang Anda dapatkan di luar byte

- **Kunci bertipe.** `t("footer.github")` memiliki tipe terhadap kamus `footer` yang dikompilasi; jalur yang salah adalah kesalahan TypeScript alih-alih kunci yang dirender sebagai teks.
- **`npx intlayer test`** menggagalkan CI jika ada kunci yang hilang di lokal mana pun. **`npx intlayer fill`** menerjemahkan yang hilang dengan kunci penyedia Anda sendiri (OpenAI, Anthropic, Mistral, Gemini...) dan menulisnya kembali ke `locales/{locale}.json`.
- **Editor Visual dan CMS** beroperasi pada JSON yang sama, sehingga non-pengembang dapat mengedit melalui UI dan berkas diperbarui.
- **Peralihan bertahap ke `.content.ts`**. Setiap komponen dapat beralih dari `useI18n()` ke `useIntlayer("footer")` dengan berkas konten yang ditempatkan bersama. Kamus JSON dan `.content.ts` dapat hidup berdampingan dan digabungkan.

## Batasan yang perlu diketahui sebelum memulai

<AccordionGroup>
<Accordion header="Blok SFC <i18n> tidak dibaca">

Jika pesan Anda berada di dalam komponen, pesan tersebut harus dipindahkan ke berkas lokal, atau ke `.content.ts`, yang merupakan konsep serupa dengan tipe yang dihasilkan.

</Accordion>
<Accordion header="Pemuatan pesan saat runtime telah dihapus">

`setLocaleMessage()` dan `mergeLocaleMessage()` memberikan peringatan dan kembali. Terjemahan yang diambil dari CMS saat runtime memerlukan [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), atau perintah `intlayer pull` / `push`.

</Accordion>
<Accordion header="messages adalah fallback, bukan gratis">

Menyimpan impor JSON di `createI18n()` mempertahankan 75 KB di dalam bundel. Hapus setelah `intlayer test` berhasil.

</Accordion>
<Accordion header="Adaptor bukan runtime bawaan">

7.9 KB dibandingkan 3.9 KB untuk `vue-intlayer`. Setelah setiap komponen beralih ke `useIntlayer`, hapus adaptor tersebut.

</Accordion>
</AccordionGroup>

## Kapan menggunakan yang mana?

<AccordionGroup>
<Accordion header="Tetap di vue-i18n">

Aplikasi Anda bergantung pada blok SFC `<i18n>`, alur `setLocaleMessage()` runtime, atau 90 KB per halaman tidak menjadi masalah bagi audiens Anda.

</Accordion>
<Accordion header="Gunakan @intlayer/vue-i18n">

Anda menggunakan `vue-i18n` dan menginginkan penghematan 88 KB, komponen 23x lebih kecil, 0% kebocoran halaman, kunci bertipe, dan pemeriksaan CI tanpa mengedit berkas `.vue`. Ini adalah titik masuk untuk basis kode `vue-i18n` yang sudah ada.

</Accordion>
<Accordion header="Beralih ke native (vue-intlayer)">

Untuk proyek baru, atau setelah adaptor menyelesaikan tugasnya. Menawarkan runtime teringan (3.9 KB) dan model `.content.ts` per komponen yang menggantikan blok `<i18n>` dengan konten bertipe. Mulai dengan [Intlayer dengan Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md) atau [dengan Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Apakah saya harus mengedit berkas .vue saya?">

Tidak. Build benchmark hanya mengubah `vite.config.ts`, `intlayer.config.ts`, dan satu baris di `src/i18n.ts`, impor `messages`. Setiap panggilan `useI18n()`, `$t`, `v-t`, dan Options API tetap seperti semula.

</Question>

<Question title="Mengapa ukuran komponen 23x lebih kecil?">

Karena `useI18n()` berhenti mengakses instans global. `createI18n({ messages })` menyimpan setiap pesan dari setiap lokal, sehingga komponen yang dikompilasi secara terisolasi menarik 196 KB. Dengan adaptor, komponen hanya mengakses kamusnya sendiri: 8.4 KB.

</Question>

<Question title="Bagaimana dengan pemformatan d() dan n()?">

Dipertahankan. Konfigurasi `datetimeFormats` dan `numberFormats` yang diteruskan ke `createI18n()` dihormati, didukung oleh API `Intl` bawaan. Lihat [pemformatan tanggal, waktu, dan angka](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/date_time_number_formatting_locales.md).

</Question>

<Question title="Apakah ini berfungsi dengan Nuxt?">

`@intlayer/vue-i18n` menargetkan Vite + Vue. Untuk `@nuxtjs/i18n`, gunakan [adaptor kompatibilitas Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/nuxtjs-i18n.md), dan lihat [Intlayer dengan Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md) untuk konfigurasi bawaan.

</Question>

<Question title="Bisakah saya bermigrasi komponen demi komponen?">

Ya. Setiap komponen dapat beralih dari `useI18n()` ke `useIntlayer("footer")` dengan berkas konten yang ditempatkan bersama. Kamus JSON dan `.content.ts` dapat hidup berdampingan dan digabungkan.

</Question>

</FAQ>

## Perbandingan terkait

Seri adaptor yang sama:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-intl_vs_intlayer-next-intl.md)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer-lingui.md)

Pustaka yang dibandingkan secara langsung:

- [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer.md), fitur dan DX
- [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer_benchmark.md), pengujian yang sama secara lengkap
- [Apakah vue-i18n sudah usang?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_vue-i18n_outdated.md)
- [Cara memilih library i18n Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_vue_i18n_library.md)

Dokumentasi referensi:

- [Adapter kompatibilitas: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/vue-i18n.md) dan [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/nuxtjs-i18n.md)
- [Panduan migrasi: vue-i18n ke Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_vue-i18n_to_intlayer.md)
- [Laporan benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/vue.md)
- [Optimalisasi bundel](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [kompiler Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)
- [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) dan [terjemahan AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md)

## Kesimpulan

`@intlayer/vue-i18n` mengubah apa yang diikat oleh `useI18n()`: dari instans global yang menyimpan setiap pesan dari setiap lokal ke kamus yang dikompilasi untuk komponen tersebut. Pada aplikasi Vite + Vue 3 yang sama, ini berarti **88 KB lebih sedikit per halaman**, **runtime 3x lebih kecil**, **komponen 23x lebih kecil** dan **0% kebocoran halaman**, hanya dengan satu file konfigurasi, satu baris plugin, dan satu impor yang dihapus. Blok SFC `<i18n>` dan pemuatan pesan runtime adalah dua hal yang tidak didukungnya, dan runtime `vue-intlayer` native tetap berukuran setengahnya.

Semua data mentah, aplikasi pengujian, dan skrip ada di [repositori Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Jalankan sendiri.

Lihat [dokumen 'Mengapa Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md) untuk detail selengkapnya.
