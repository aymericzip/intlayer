---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cara Memilih Library Vue i18n yang Tepat di Tahun 2026"
description: Panduan pengambilan keputusan untuk internasionalisasi Vue dan Nuxt. Pertanyaan apa saja yang perlu dijawab sebelum membandingkan vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide, dan Intlayer, serta konsekuensi masing-masing pilihan terhadap bundle size, typing, dan SSR payload.
keywords:
  - vue i18n
  - vue internationalization
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - perbandingan library i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Cara Memilih Library Vue i18n yang Tepat

"Vue i18n" adalah istilah umum sekaligus nama library yang dipasang oleh hampir semua orang. Hal ini praktis sekaligus menyesatkan pada saat yang sama: `vue-i18n` adalah opsi default yang bagus, tetapi bukan satu-satunya pilihan, dan pertanyaan yang seharusnya mendasari keputusan tersebut (SSR atau tidak, berapa banyak halaman, siapa yang menulis terjemahan) jarang diajukan sebelum menjalankan `npm install`.

Panduan ini membahas pertanyaan-pertanyaan tersebut terlebih dahulu, lalu memetakan jawabannya ke library yang sesuai, baik untuk Vite + Vue murni maupun untuk Nuxt.

![Ekosistem library Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Daftar Isi

<TOC/>

## Enam pertanyaan yang perlu dijawab sebelum membandingkan library

1. **Vite SPA atau Nuxt?** Pada SPA, biaya katalog adalah masalah JS bundle. Pada Nuxt, ini juga merupakan masalah payload HTML, karena pesan diserialisasi ke dalam state SSR dan dihidrasi. Sebagian besar laporan "vue-i18n lambat" berasal dari aplikasi Nuxt karena alasan ini.
2. **Siapa yang menulis terjemahan?** Developer, TMS, agensi yang menyediakan format ICU string, atau pipeline AI. `vue-i18n` menggunakan sintaks plural sendiri yang dipisahkan oleh karakter pipa (pipe), bukan ICU. Hal ini penting jika string berasal dari pihak eksternal.
3. **Berapa banyak locale dan halaman?** Dua locale dan lima halaman dapat memuat semuanya sekaligus. Sepuluh locale dan empat puluh route tidak bisa, dan strategi pemuatan (loading strategy) menjadi biaya utama.
4. **Apakah Anda memerlukan type safety pada keys?** `t("cart.totl")` akan tetap ter-compile di `vue-i18n` kecuali Anda menyertakan generic message schema, dan skema tersebut sering bermasalah dengan katalog yang dimuat secara lazy (lazily loaded).
5. **Apa saja isi kontennya?** Hanya label UI, atau markdown, tautan di tengah kalimat, dan blok per-locale. Konten kaya (rich content) adalah bagian di mana `t()` yang mengembalikan string terasa canggung.
6. **Apakah CSP menjadi batasan?** Build default `vue-i18n` meng-compile pesan di browser menggunakan `new Function`. Build runtime-only membutuhkan `@intlify/unplugin-vue-i18n` untuk melakukan precompile pada saat build time.

Catat jawabannya. Semua pembahasan di bawah ini akan merujuk kembali ke poin-poin tersebut.

## Lanskap dalam satu gambaran

Ekosistem Vue memiliki lebih sedikit library i18n dibandingkan React, dan mereka berasal dari gelombang arsitektur yang berbeda.

![Sejarah library i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Runtime dictionaries (2015 hingga 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` muncul pada tahun 2015 dan telah menjadi standar default sejak saat itu. `@nuxt/i18n` membungkusnya dengan locale routing, tag SEO, dan lazy loading per locale. Pesan di-compile menjadi render function, pada saat build time jika Anda menambahkan unplugin, atau langsung di browser jika tidak.

</Accordion>
<Accordion header="Format alternatif (2020): fluent-vue">

File Mozilla Fluent `.ftl` menghadirkan sintaks pesan yang lebih ramah dengan varian yang memahami tata bahasa (grammar-aware). Tidak ada type safety untuk keys, dan plugin Vite memuat setiap locale ke dalam setiap halaman.

</Accordion>
<Accordion header="Compiler dan colocated content (2024 hingga 2026): Paraglide, Intlayer">

Paraglide menghasilkan satu fungsi per pesan dan membiarkan bundler melakukan tree-shake pada sisanya. Intlayer mendeklarasikan konten per komponen dalam file `.content.ts`, menghasilkan types, dan hanya mengirimkan apa yang di-render oleh route tertentu.

</Accordion>
</AccordionGroup>

Artikel [sejarah JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md) membahas setiap gelombang arsitektur ini secara mendalam.

## Keputusan yang paling penting: di mana konten berada dan kapan dimuat

Dua pilihan struktural menjelaskan sebagian besar perbedaan ukuran bundle antar konfigurasi:

- **Centralized atau scoped content.** Satu file `locales/en.json` untuk seluruh aplikasi, atau satu deklarasi per komponen.
- **Static atau dynamic import.** Memuat semuanya saat startup, atau hanya memuat locale yang aktif (dan idealnya route yang aktif) sesuai permintaan (on demand).

Grafik berikut memperkirakan payload untuk aplikasi teoritis dengan 1 hingga 10 halaman, diterjemahkan ke dalam 1 hingga 10 locale, dengan sekitar 30 KB teks per halaman.

![Kebocoran konten teoritis berdasarkan arsitektur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` mendukung sumbu dinamis: `setLocaleMessage` setelah `import()` berarti Anda berhenti mengirim sembilan locale yang tidak dibaca siapa pun. Namun, yang tidak diberikannya adalah pemisahan berdasarkan halaman. Katalog locale adalah satu objek tunggal, dan memuatnya berarti memuat seluruh teks setiap halaman. Dalam SPA, tidak ada yang menyadarinya. Di Nuxt, dengan `@nuxtjs/i18n` dan lebih dari sepuluh halaman, setiap route membawa string dari setiap route lainnya, dua kali lipat: di dalam chunk JS dan di dalam SSR payload.

[Benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/vue.md) mengukur hal ini sebagai "kebocoran dari route lain" dan "kebocoran dari locale lain". Jika jawaban Anda untuk pertanyaan 3 adalah "banyak halaman", bagian ini lebih penting daripada preferensi API mana pun. Artikel [per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md) membahas sisi pemeliharaan dari trade-off yang sama.

## Kandidat library

Ukuran library diambil dari [benchmark Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/vue.md): plugin ditambah composable dalam komponen kosong, setelah proses bundling, tree-shaking, dan minifikasi, pada aplikasi 10 halaman dan 10 locale. Konten diukur secara terpisah.

| Library        | Model konten                                              | Keamanan tipe                          | Format pesan                        | Splitting per-route     | Ukuran library                                              |
| :------------- | :-------------------------------------------------------- | :------------------------------------- | :---------------------------------- | :---------------------- | :---------------------------------------------------------- |
| `vue-i18n`     | Katalog terpusat per locale, opsional SFC `<i18n>` blocks | 2/5 — Opt-in via schema generic        | Khusus (pipe plurals)               | Tidak                   | ~24.3 kB                                                    |
| `@nuxtjs/i18n` | Sama seperti `vue-i18n`, ditambah routing dan tag SEO     | 2/5 — Sama                             | Sama                                | Tidak, hanya per locale | ~24.3 kB                                                    |
| `fluent-vue`   | File `.ftl` (Mozilla Fluent)                              | 1/5 — Tidak ada                        | Fluent                              | Tidak                   | ~29.7 kB                                                    |
| Paraglide      | Project inlang, generated functions                       | 3.5/5 — Dihasilkan (generated)         | Khusus                              | Melalui tree-shaking    | Mendekati nol (karena kode yang dihasilkan di dalam proyek) |
| Intlayer       | Satu `.content.ts` per komponen                           | 5/5 — Dihasilkan, aktif secara default | Intlayer (+ ICU, i18next, vue-i18n) | Ya, per komponen        | ~3.9 kB                                                     |

> Angka-angka tersebut merupakan gambaran pada versi saat benchmark dilakukan. Jalankan pengujian pada aplikasi Anda sendiri sebelum memutuskan hanya berdasarkan ukuran.
> Keamanan tipe: 5/5 berarti kunci, parameter, dan setiap locale diperiksa tanpa penyiapan manual, termasuk pemformat URL dan pembantu (helpers).

Ukuran library Paraglide yang mendekati nol dicapai melalui konstruksinya: runtime di-generate langsung ke dalam repositori Anda, yang berarti diperlukan langkah regenerasi sebelum setiap push dan potensi konflik merge pada file yang di-generate. Intlayer memerlukan `vite-intlayer` (atau modul Nuxt), sehingga tidak dapat berjalan tanpa langkah build.

## Sesuaikan jawaban Anda dengan library

<AccordionGroup>
<Accordion header="Vite SPA, tim kecil, sedikit locale">

`vue-i18n` dalam mode Composition (`legacy: false`), dengan `@intlify/unplugin-vue-i18n` agar Anda mengirimkan build runtime-only. Lakukan lazy-load locale menggunakan `import()`. Ini mencakup sebagian besar aplikasi kecil dan solusi dari komunitas tersedia di mana-mana. Blok SFC `<i18n>` menempatkan pesan bersama dengan komponen (colocated), yang sangat membantu, tetapi tooling ekstraksi dan integrasi TMS untuk blok tersebut lebih terbatas dibandingkan katalog JSON, jadi putuskan sejak awal mana yang akan digunakan tim.

</Accordion>
<Accordion header="Nuxt dengan locale routing, sitemap, dan hreflang">

`@nuxtjs/i18n` memberi Anda strategi routing, tag `hreflang`, dan deteksi locale tanpa perlu menulis kode tambahan, dan itu saja sudah cukup untuk membenarkan penggunaannya pada situs konten dengan beberapa halaman. Batasannya adalah katalog per-locale: jika sudah melewati sekitar sepuluh halaman, SSR payload akan membawa teks setiap route. Jika itu kasus Anda, hubungkan `vue-i18n` secara manual dengan pesan per-route, atau beralihlah ke scoped content. Artikel [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/nuxt.md) membahas pemilihan strategi routing terlebih dahulu.

</Accordion>
<Accordion header="Terjemahan berasal dari TMS atau agensi yang menyediakan ICU">

Sintaks plural `vue-i18n` (`"no item | one item | {count} items"`) bukan standar ICU dan tidak portabel. Penerjemah perlu diberi tahu tentang hal ini, dan ekspor dari TMS tidak akan menghasilkannya. Sepakati formatnya sebelum katalog pertama dibuat, atau pilih library yang formatnya cocok dengan vendor Anda. Dukungan ICU di Intlayer masih parsial, jadi jika Anda menerima ICU string saat ini, pertimbangkan hal tersebut sebagai batasan juga.

</Accordion>
<Accordion header="Aplikasi besar, banyak route, anggaran ketat untuk bundle atau SSR payload">

Pilihlah scoped content yang di-compile pada saat build time. Paraglide mencapainya melalui tree-shaking, yang bekerja sesuai fungsinya di Vite. Intlayer mencapainya melalui deklarasi per-komponen dan hanya mengirimkan apa yang di-render oleh route. Dengan `vue-i18n`, Anda dapat memisahkan pesan berdasarkan route secara manual, tetapi tidak ada yang memaksakannya dan komponen bersama yang mengimpor namespace global dapat merusak pemisahan tersebut secara diam-diam.

</Accordion>
<Accordion header="Type safety tidak bisa ditawar">

`vue-i18n` dapat memiliki type safety dengan meneruskan schema generic ke `createI18n`. Cara ini berhasil, tetapi langsung rusak begitu katalog dimuat secara lazy (lazy loading), karena skema tersebut mendeskripsikan pesan yang mungkin belum ada saat itu. Jika Anda tidak ingin repot memelihara hal tersebut, pilih library yang types-nya di-generate langsung dari konten: Paraglide atau Intlayer. Artikel [mendeteksi terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md) membandingkan apa yang dapat ditangkap oleh masing-masing library saat build time.

</Accordion>
<Accordion header="Konten lebih dari sekadar label UI">

Halaman markdown, kalimat dengan `<RouterLink>` di tengahnya, komponen khusus per-locale. `vue-i18n` memiliki `<i18n-t>` untuk interpolasi komponen, yang berfungsi tetapi cukup verbose. Node konten Intlayer menerima markdown, HTML, dan nested objects secara langsung, yang jauh lebih cocok ketika aplikasi memiliki banyak konten.

</Accordion>
<Accordion header="Terjemahan akan diproduksi oleh AI">

Maka JSON terpusat tidak lagi memiliki konsumen yang membenarkan penggunaannya. Colocated content ditambah CLI yang mengisi locale yang hilang adalah jalur yang lebih ringkas. Perintah `fill` dari Intlayer berjalan menggunakan API key Anda sendiri (OpenAI, Anthropic, Mistral, Gemini) dan hanya menerjemahkan ulang apa yang berubah.

</Accordion>
</AccordionGroup>

## Di mana kekurangan masing-masing library

- **`vue-i18n`**: yang paling berat di antara semuanya, format plural milik sendiri, types bersifat opt-in dan rentan bermasalah dengan lazy loading, tidak ada pembatasan per-route, key yang tidak terpakai menumpuk tanpa disadari. Membiarkan `legacy: true` di aplikasi Vue 3 tetap mempertahankan lapisan kompatibilitas Vue 2 dan menghilangkan typing untuk `useI18n()`.
- **`@nuxtjs/i18n`**: mewarisi semua kekurangan di atas, dan SSR payload membawa string setiap halaman setelah melewati belasan route.
- **`fluent-vue`**: sintaks pesan yang bagus, tidak ada type safety pada keys, dan plugin Vite memuat semua konten dalam semua bahasa ke dalam setiap halaman. Paling berat dalam benchmark.
- **Paraglide**: file hasil generate di-commit ke repositori, memerlukan regenerasi sebelum setiap push, dan locale dibaca dari cookie atau storage pada setiap pemanggilan pesan alih-alih dari reactive store, yang membutuhkan biaya komputasi tambahan saat pergantian locale.
- **Intlayer**: plugin build wajib, ekosistem lebih kecil, dukungan ICU parsial, dan konten tersebar di seluruh codebase secara terstruktur, sehingga mengekspor satu file JSON untuk penerjemah membutuhkan tooling tambahan.

## Seperti apa tampilan setiap opsi dalam kode

Komponen yang sama, ringkasan keranjang belanja dengan judul dan bentuk plural, ditulis menggunakan masing-masing kandidat. Bagian yang menarik bukanlah template-nya, melainkan di mana konten berada dan apa yang diketahui `vue-tsc` tentangnya.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Plural yang dipisahkan oleh pipa adalah format milik vue-i18n sendiri, bukan ICU. `t` menerima string apa pun kecuali Anda meneruskan generic message schema ke `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Sintaks Fluent menangani bentuk jamak (plural) dan varian tata bahasa dengan sangat baik. Message ID berupa string tanpa type safety, dan plugin Vite membundel setiap locale ke dalam setiap halaman.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Setiap pesan adalah fungsi bertipe (typed function) yang dihasilkan oleh generator, sehingga key yang hilang menjadi import error. Folder `paraglide/` di-generate ke dalam repo Anda dan di-regenerate pada setiap perubahan.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Semua locale berada dalam satu file di samping komponen. Types di-generate saat build, sehingga `title` memiliki autocomplete dan kesalahan ketik (typo) akan menggagalkan `vue-tsc`. `<title />` me-render node yang dapat ditargetkan oleh visual editor; `{{ items(props.count) }}` menghasilkan string biasa.

  </Tab>
</Tabs>

Sudah menggunakan `vue-i18n`? [Compat adapter `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/vue-i18n.md) membuat alias untuk package tersebut di level bundler, sehingga `useI18n()`, `$t`, pipe plurals, dan `v-t` tetap berfungsi sementara Intlayer menyajikan kontennya. [Panduan migrasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_vue-i18n_to_intlayer.md) membahas langkah-langkah melepaskan adapter setelahnya, dan tersedia juga [panduan khusus Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_nuxtjs_i18n_to_intlayer.md).

## Sebelum Anda menentukan pilihan

Tabel fitur menunjukkan apa yang dapat dilakukan oleh library saat ini. Poin-poin berikut memberi gambaran seperti apa penggunaannya dalam jangka panjang.

**Periksa aktivitas repositori.**

Aktivitas commit, waktu respons isu, dan apakah rilis minor terakhir dilakukan pada tahun ini. Desain yang bagus tanpa maintainer adalah migrasi yang hanya menunggu waktu.

**Jangan memilih hanya berdasarkan unduhan npm.**

Library yang paling banyak dipasang adalah library yang dirilis pertama kali, bukan yang paling cocok untuk codebase Vue tahun 2026. Jumlah unduhan mengukur sejarah, bukan kecocokan.

![Tier list library i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Ketahui siapa yang mendanai maintainer, dan apa yang mereka jual.**

`vue-i18n` didukung oleh Crowdin, seperti halnya `next-intl` dan `svelte-i18n`. `i18next` didukung oleh Locize. Tolgee, Paraglide (inlang), dan Intlayer masing-masing mengoperasikan platform mereka sendiri. Vendor yang pendapatannya berasal dari hosting terjemahan memiliki sedikit alasan untuk membuat terjemahan gratis di dalam toolchain Anda. Intlayer adalah satu-satunya di antara kelompok ini yang menyediakan terjemahan AI melalui CLI dengan API key Anda sendiri, serta CMS yang dapat Anda host sendiri (self-host).

**Apakah library siap untuk AI agent?**

Agent masih sering kesulitan dengan i18n: mereka melewatkan locale, mengarang keys, dan mencampuradukkan sintaks pesan. Apakah library menyediakan [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md) atau [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md) agar agent dapat membuat daftar, mengisi, dan menguji konten? Dan apakah pemuatan konten sudah dioptimalkan secara default, atau seseorang harus meninjau namespace dan lazy import setiap kuartal?

**Type safety langsung tanpa konfigurasi tambahan (out of the box).**

Bukan "dapat diberi types dengan konfigurasi tambahan", melainkan "key yang salah akan menggagalkan `tsc` pada instalasi baru". Periksa apa yang terjadi jika sebuah key tidak ada, dan jika sebuah locale kehilangan satu terjemahan.

**Pendeteksian konten yang tidak terpakai.**

Katalog terjemahan cenderung terus membengkak. Build Intlayer membersihkan field yang tidak terpakai dan mencatatnya (`build.purge`). Paraglide mencapainya melalui arsitektur, karena fungsi pesan yang tidak dipanggil akan di-tree-shake. Library lainnya menyerahkan proses pembersihan tersebut kepada Anda.

**Developer experience.**

Waktu setup hingga string terjemahan pertama muncul, dukungan [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md) atau [ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md) yang menampilkan terjemahan saat hover dan melompat ke deklarasi, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk fill, test, dan push, [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) atau ekstraktor yang mengambil string hard-coded dari komponen Anda sehingga tidak perlu mengelola setiap string satu per satu berdasarkan kunci, serta cara bagi non-developer untuk mengedit konten ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)) tanpa perlu membuat pull request.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah vue-i18n masih menjadi pilihan default yang tepat di tahun 2026?">

Untuk sebagian besar aplikasi Vue, ya. Ekosistemnya adalah yang terbesar, dokumentasinya sangat lengkap, dan biayanya dapat diprediksi: runtime yang cukup berat, format plural kustom, dan pembatasan per-route yang harus Anda bangun dan pertahankan sendiri.

</Question>

<Question title="Haruskah saya menggunakan @nuxtjs/i18n atau menghubungkan vue-i18n secara manual di Nuxt?">

Gunakan modul tersebut kecuali jika kebutuhan routing Anda tidak lazim atau aplikasi Anda hanya memiliki sedikit halaman. Menghubungkannya secara manual berarti membangun kembali route locale, middleware, `hreflang`, dan sitemap sendiri, dan hal-hal tersebut lebih rumit dari kelihatannya.

</Question>

<Question title="Apakah saya memerlukan library berbasis compiler?">

Hanya jika ukuran bundle, SSR payload, generated types, atau pemeriksaan missing-key saat build time memang merupakan kebutuhan nyata. Artikel [compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md) menjelaskan keuntungan yang diberikan compiler dan potensi kekurangannya.

</Question>

<Question title="Apakah pilihan library memengaruhi SEO?">

Secara tidak langsung. Web crawler memperhatikan routing, `hreflang`, `<html lang>`, dan apakah teks ada di dalam HTML yang di-render di server. Lihat [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Pelajari lebih lanjut

- [Benchmark Vue i18n: ukuran bundle, kebocoran, dan waktu peralihan locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/vue.md)
- [Vue i18n: cara kerja vue-i18n dan titik kelemahannya](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/vue.md) dan [artikel Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer, fitur demi fitur](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer.md) dan [benchmark vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/vue-i18n_vs_intlayer_benchmark.md)
- [Apakah vue-i18n sudah ketinggalan zaman?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_vue-i18n_outdated.md)
- [Sejarah JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md)
- [Menyiapkan i18n di aplikasi Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md) dan di [aplikasi Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md)
- Panduan serupa untuk [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_svelte_i18n_library.md), dan [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_solid_i18n_library.md)
