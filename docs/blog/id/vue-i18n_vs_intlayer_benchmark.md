---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: Benchmark 2026"
description: vue-i18n dan Intlayer diukur pada aplikasi Vite + Vue 3 yang sama. Ukuran pustaka, JavaScript per halaman, kebocoran konten, ukuran komponen, dan reaktivitas pergantian locale, dengan penjelasan angka-angkanya.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Benchmark Internasionalisasi (i18n) Vue

`vue-i18n` adalah pustaka i18n rujukan untuk Vue. Intlayer adalah alternatif berbasis compiler dengan konten berlingkup komponen, disertai integrasi Vue (`vue-intlayer`). Kami sudah membandingkan [fitur dan pengalaman pengembangnya](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer.md). Artikel ini melihat berapa biaya masing-masing setelah aplikasi di-build.

Data berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), sebuah suite open-source yang mem-build aplikasi yang sama dengan setiap pustaka dan mencatat apa yang benar-benar diunduh dan dieksekusi browser.

<TOC/>

> **tl;dr**: Pada aplikasi Vite + Vue 3 yang sama, `vue-i18n` mengirim **134,9 KB** JavaScript ter-gzip per halaman dibandingkan **41,3 KB** untuk aplikasi tanpa i18n. Intlayer mengirim **57,1 KB**. Runtime `vue-i18n` saja berbobot **24,3 KB gzip** (6x dari 3,9 KB milik Intlayer), setiap halaman membawa **90% string dari halaman lain**, dan sebuah komponen yang dikompilasi terpisah menyeret **196 KB** karena terikat pada pohon pesan global. Adapter `@intlayer/vue-i18n` mempertahankan API `vue-i18n` dan terukur **47,0 KB** per halaman.

## Singkatnya

- **vue-i18n** - Pustaka i18n de-facto untuk Vue 2 / Vue 3 dan inti dari `@nuxtjs/i18n`. Pesan bergaya ICU, blok `<i18n>` di SFC, direktif `v-t`, formatter `d()` / `n()`, ekosistem besar. Pesan didaftarkan pada instance global saat `createI18n()`; lazy loading per locale adalah pola manual `setLocaleMessage()`, dan pemisahan per rute harus Anda bangun sendiri.
- **Intlayer** - Model konten yang berpusat pada komponen. Kamus `.content.ts` berada di samping komponen yang dilayaninya, compiler saat build (`vite-intlayer`) melakukan tree-shaking dan lazy-load per komponen dan per locale, tipe TypeScript ketat dihasilkan dari konten Anda, dan terjemahan yang hilang gagal saat build. Dilengkapi helper router / SEO, Visual Editor / CMS, dan terjemahan berbantuan AI.

| Pustaka               | GitHub Stars                                                                                                                                                                   | Total Commit                                                                                                                                                                       | Commit Terakhir                                                                                                                                     | Versi Pertama | Versi NPM                                                                                                   | Unduhan NPM                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Des 2016      | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Badge diperbarui secara otomatis. Snapshot akan bervariasi seiring waktu.

## Perbandingan fitur berdampingan

| Fitur                                              | `vue-intlayer` (Intlayer)                                | `vue-i18n`                                                                |
| -------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Terjemahan dekat komponen**                      | ✅ Ya, `.content.ts` ditempatkan bersama setiap komponen | ✅ Melalui blok SFC `<i18n>` (opsional); katalog global adalah setup umum |
| **Integrasi TypeScript**                           | ✅ Tipe ketat dihasilkan otomatis dari konten            | ✅ Typing bagus; keamanan key yang ketat butuh typing skema dan disiplin  |
| **Deteksi terjemahan yang hilang**                 | ✅ Error TypeScript + error/peringatan saat build        | ⚠️ Fallback runtime + peringatan konsol                                   |
| **Konten kaya (komponen / Markdown)**              | ✅ Dukungan langsung                                     | ⚠️ Interpolasi komponen `<i18n-t>`; Markdown lewat plugin eksternal       |
| **Dukungan ICU**                                   | ⚠️ Dalam pengerjaan                                      | ✅ Ya                                                                     |
| **Pemformatan (tanggal, angka, mata uang)**        | ✅ Formatter berbasis Intl                               | ✅ `d()` / `n()` dengan `datetimeFormats` / `numberFormats`               |
| **Routing terlokalisasi**                          | ✅ Helper untuk Vue Router / Nuxt, `getMultilingualUrls` | ⚠️ Bukan inti (`@nuxtjs/i18n` atau setup router kustom)                   |
| **Helper SEO (hreflang, sitemap, robots)**         | ✅ Helper bawaan                                         | ❌ Bukan inti                                                             |
| **Tree-shaking (kirim hanya konten yang dipakai)** | ✅ Per komponen, per locale, otomatis oleh compiler      | ⚠️ Manual: pisahkan katalog, `setLocaleMessage()` per rute                |
| **Lazy loading**                                   | ✅ `importMode: 'dynamic'` (satu baris konfigurasi)      | ✅ `import()` manual + `setLocaleMessage()`                               |
| **Pembersihan konten tak terpakai**                | ✅ Kamus mati dibuang saat build                         | ❌ Tidak bawaan                                                           |
| **Pengujian terjemahan hilang (CLI / CI)**         | ✅ `npx intlayer content test`                           | ⚠️ Pihak ketiga (`vue-i18n-extract`)                                      |
| **Terjemahan bertenaga AI**                        | ✅ Bawaan, memakai key provider Anda sendiri             | ❌ Tidak                                                                  |
| **Visual Editor / CMS**                            | ✅ Visual Editor gratis + CMS opsional                   | ❌ Tidak (platform lokalisasi eksternal)                                  |
| **Server MCP & Agent Skills**                      | ✅ Ya                                                    | ❌ Tidak                                                                  |
| **Ekosistem / komunitas**                          | ⚠️ Lebih kecil tapi tumbuh cepat                         | ✅ Besar dan matang di ekosistem Vue                                      |

## Benchmark

### Apa yang diukur

Suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) mem-build **aplikasi Vite + Vue 3 yang sama** dengan setiap pustaka: **10 halaman** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), komponen identik dan konten identik. Halaman diukur dalam `en` dan `fr`.

Kedua pustaka diuji dalam konfigurasi **static**, konfigurasi yang dikirim oleh kebanyakan proyek Vue: untuk `vue-i18n`, JSON setiap locale diimpor dan diteruskan ke `createI18n({ messages })`; untuk Intlayer, `importMode: 'static'` bawaan. Dalam mode itu Intlayer juga mem-bundle setiap locale, tetapi compiler tetap membatasi konten **per komponen**, jadi sebuah halaman hanya membawa kamus dari komponen yang dirender-nya.

Untuk setiap build, suite mencatat:

- **Lib size**: ukuran gzip sebuah komponen kosong yang hanya mengimpor pustaka i18n. Biaya tetap runtime.
- **Page JS**: JavaScript gzip yang diunduh per halaman, dirata-ratakan atas semua halaman dan locale.
- **Locale leak %**: porsi string terjemahan yang ditemukan di JS yang diunduh yang termasuk locale yang **tidak** sedang dilihat pengguna (di-fingerprint pada `en` dan `fr`, jadi 50% berarti "locale terukur lainnya hadir sepenuhnya"; dengan 10 locale di-bundle, pemborosan sebenarnya lebih tinggi).
- **Page leak %**: porsi string terjemahan yang ditemukan di JS yang diunduh yang termasuk halaman yang **tidak** sedang dikunjungi pengguna.
- **Component avg**: ukuran gzip rata-rata setiap komponen yang dikompilasi terpisah. Menunjukkan seberapa banyak runtime i18n dan katalog yang diseret satu komponen.
- **E2E reactivity**: waktu nyata antara memilih locale baru dan `html[lang]` diperbarui di DOM (Playwright, 5 iterasi).
- **Page load**: `PerformanceNavigationTiming.duration`.

> Angka-angka di bawah berasal dari eksekusi tertanggal **2026-09-12** dengan `vue-i18n` 11.4.0 dan `intlayer` 9.5.0 / 9.5.1. Aplikasi uji sengaja dibuat kecil (beberapa puluh string per locale), jadi persentase kebocoran menggambarkan sebuah **pola**: mereka tumbuh bersama konten Anda sementara biaya runtime tetap.

### Hasil pada Vite + Vue 3

| Pustaka                       | Strategi | Lib size (gz) | Lib size (min) | Page JS rata-rata (gz) | Locale leak | Page leak | Component rata-rata (gz) | Reaktivitas E2E | Page load |
| ----------------------------- | -------- | ------------: | -------------: | ---------------------: | ----------: | --------: | -----------------------: | --------------: | --------: |
| **base** (tanpa i18n)         | -        |        0,0 KB |         0,0 KB |                41,3 KB |        0,0% |         - |                   1,1 KB |          1,8 ms |   10,8 ms |
| `vue-i18n`                    | static   |       24,3 KB |        83,2 KB |               134,9 KB |       50,0% |     90,0% |                 196,0 KB |          2,8 ms |   13,6 ms |
| **`vue-intlayer`**            | static   |    **3,9 KB** |    **11,1 KB** |            **57,1 KB** |       56,8% |  **0,0%** |               **7,7 KB** |      **4,5 ms** |   13,8 ms |
| `@intlayer/vue-i18n` (compat) | static   |        7,9 KB |        23,2 KB |                47,0 KB |       15,0% |      0,0% |                   8,4 KB |          1,5 ms |    9,3 ms |

> Kolom page-leak aplikasi base dibiarkan kosong: tanpa pustaka i18n, fingerprinting menangkap string hard-coded di chunk bersama dan angkanya tidak bermakna.

**Cara membacanya**

- **Biaya runtime.** `vue-i18n` adalah salah satu runtime terberat di seluruh benchmark: **24,3 KB gzip / 83,2 KB minified** untuk komponen kosong yang hanya mengimpornya. `vue-intlayer` berbiaya 3,9 KB gzip. Selisih itu dibayar di setiap halaman terlepas dari berapa banyak string yang Anda punya.
- **JavaScript per halaman.** Aplikasi tanpa i18n berbobot 41,3 KB. `vue-i18n` melipatgandakannya lebih dari tiga kali menjadi **134,9 KB**; Intlayer mendarat di **57,1 KB**, +15,8 KB, yang sebagian besar adalah sepuluh locale yang di-bundle (lihat poin berikutnya).
- **Kebocoran.** Dengan `createI18n({ messages: { en, fr, ... } })`, setiap halaman mengirim setiap locale dan string setiap halaman: **50% kebocoran locale** (pada dua locale yang di-fingerprint) dan **90% kebocoran halaman**. Mode `static` Intlayer juga mem-bundle setiap locale (karena itu angka kebocoran locale sebanding) tetapi memiliki **0% kebocoran halaman**: sebuah halaman hanya menarik kamus dari komponen yang dirender-nya. Beralih ke `importMode: 'dynamic'` juga menghilangkan kebocoran locale; konfigurasi itu bukan bagian dari eksekusi Vue ini.
- **Ukuran komponen adalah tempat arsitektur terlihat.** Komponen yang memanggil `useI18n()` dikompilasi menjadi **196 KB** rata-rata, karena `t()` terikat ke instance global yang menyimpan setiap pesan dari setiap locale. Komponen yang sama dengan `useIntlayer()` dikompilasi menjadi **7,7 KB**: ia hanya menjangkau kamusnya sendiri.
- **Reaktivitas** bukan masalah bagi keduanya (2-5 ms). Sistem reaktivitas Vue membuat pergantian locale murah begitu pesan ada di memori.
- **`@intlayer/vue-i18n`**, adapter drop-in, mempertahankan API `vue-i18n` dan terukur **47,0 KB per halaman** dan **8,4 KB per komponen**, dengan kode aplikasi tidak disentuh.

> Sebagai referensi, eksekusi yang sama mengukur `fluent-vue` pada 171,8 KB per halaman, 29,7 KB runtime, dan 217 KB per komponen.

## Mengapa ada selisih? Instance global vs kamus terkompilasi

`vue-i18n` adalah runtime. `createI18n()` membangun instance global yang menyimpan pohon pesan per locale; `useI18n()` mengikat setiap komponen padanya; `t("footer.github")` mencari key saat render. Inilah yang memungkinkan blok SFC `<i18n>`, `v-t`, dan pemuatan pesan saat runtime, dan ini juga alasan graf dependensi setiap komponen mencakup seluruh pohon:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # satu file per locale, semua halaman di dalamnya
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

Mengoptimalkan berarti **Anda** memisahkan `en.json` ke file per rute, **Anda** memanggil `setLocaleMessage()` di router guard, dan **Anda** menjaga peta rute-ke-file tetap benar saat komponen berpindah. Runtime tidak bisa melakukannya untuk Anda karena ia tidak tahu key mana yang akan diminta sebuah komponen.

Intlayer memindahkan pengetahuan itu ke build. Konten dideklarasikan di samping komponen, dan `vite-intlayer` menentukan komponen mana yang mengimpor kamus mana:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

Compiler menghasilkan, per kamus dan per locale, persis JSON yang dibutuhkan komponen itu, dan membuang kamus yang tidak diimpor apa pun. Pembatasan per rute adalah konsekuensi dari pembatasan per komponen, bukan sebuah tugas.

> Untuk juga membuang locale yang tidak dipakai, atur `dictionary.importMode: 'dynamic'` di `intlayer.config.ts`. Lihat [dokumentasi optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

## Pengalaman pengembang

### Setup

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

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

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Komponen

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` hanyalah string sampai Anda mengetik skema pesan sendiri; salah ketik akan merender key-nya.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
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

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` dan `increment` bertipe; salah ketik adalah error TypeScript, nilai bahasa Prancis yang hilang adalah error build.

### Lazy loading per locale

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

Lalu panggil `loadLocaleMessages()` dari router guard, dan pisahkan `locales/{locale}.json` per rute sendiri jika Anda ingin pembatasan per halaman.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## Pertahankan API vue-i18n, dapatkan output Intlayer

`@intlayer/vue-i18n` adalah adapter drop-in: `useI18n()`, `t()`, `d()`, `n()`, interpolasi `{name}` dan `{0}`, plural dengan pipe (`"car | cars"`), `v-t`, dan `i18n.global.locale` tetap bekerja, dilayani dari kamus Intlayer yang dikompilasi oleh `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

Dalam benchmark, build compat dari aplikasi yang sama turun dari **134,9 KB ke 47,0 KB** per halaman dan dari **196 KB ke 8,4 KB** per komponen, dengan komponen tidak disentuh. `locales/{locale}.json` Anda yang ada bisa tetap menjadi sumber kebenaran melalui plugin sinkronisasi JSON.

Lihat [panduan migrasi vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_vue-i18n_to_intlayer.md) dan [dokumentasi kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/vue-i18n.md). Pengguna Nuxt punya jalur yang sama melalui [kompatibilitas `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/nuxtjs-i18n.md).

## Kapan memilih yang mana?

- **Pilih vue-i18n** jika Anda menginginkan pendekatan Vue standar, mengandalkan pesan ICU atau blok SFC `<i18n>`, sudah memakai `@nuxtjs/i18n`, atau platform terjemahan mengharapkan JSON terpusat. Sediakan waktu untuk memisahkan katalog dan lazy-load per rute jika ukuran bundle penting.
- **Pilih Intlayer** jika Anda menginginkan **konten berlingkup komponen**, **TypeScript ketat**, **error key hilang saat build**, **tree-shaking dan lazy loading tanpa usaha**, dan perangkat editorial bawaan (Visual Editor, CMS, terjemahan AI, server MCP). Sangat relevan untuk basis kode Vue / Nuxt yang besar dan modular serta design system.
- **Pilih `@intlayer/vue-i18n`** jika Anda sudah memakai `vue-i18n` dan ingin keuntungan bundle tanpa menulis ulang.

## Perbandingan terkait

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-intl_vs_intlayer.md) (benchmark yang sama)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18next_vs_intlayer.md) (benchmark yang sama)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer.md) (benchmark yang sama)
- [vue-i18n vs Intlayer (fitur & DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer.md)
- [Apakah vue-i18n sudah usang?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_vue-i18n_outdated.md)

## GitHub STARs

GitHub stars adalah indikator kuat popularitas proyek, kepercayaan komunitas, dan relevansi jangka panjang. Meskipun bukan ukuran langsung kualitas teknis, mereka mencerminkan berapa banyak pengembang yang menganggap proyek itu berguna, mengikuti perkembangannya, dan kemungkinan besar mengadopsinya.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## Kesimpulan

`vue-i18n` matang, fleksibel, dan terintegrasi mendalam dengan Vue. Benchmark menunjukkan apa biaya desain runtime-first-nya pada build Vite: **runtime 24 KB gzip**, **134,9 KB per halaman** untuk aplikasi yang berbobot 41 KB tanpa i18n, **90% konten halaman lain** di setiap halaman, dan komponen yang masing-masing mencapai **196 KB** karena bergantung pada pohon pesan global.

Intlayer memindahkan pekerjaan ke compiler. Kamus per komponen dan pembersihan konten mati adalah output build, bukan konvensi. Pada aplikasi yang sama: **runtime 3,9 KB**, **57,1 KB per halaman**, **0% kebocoran halaman**, komponen **25x lebih kecil**. Dan jika menulis ulang bukan pilihan, `@intlayer/vue-i18n` mencapai sebagian besar hasil itu dengan komponen tidak disentuh.

Semua data mentah, aplikasi uji, dan skrip ada di [repositori Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Jalankan sendiri.

Lihat [dokumentasi 'Mengapa Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md) untuk detail lebih lanjut.
