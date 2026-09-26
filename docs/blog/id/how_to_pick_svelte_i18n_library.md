---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "Cara Memilih Library Svelte i18n yang Tepat di Tahun 2026"
description: Panduan keputusan untuk internasionalisasi Svelte dan SvelteKit. Pertanyaan apa yang perlu dijawab sebelum membandingkan svelte-i18n, Paraglide, typesafe-i18n, wuchale, dan Intlayer, serta apa dampak setiap pilihan terhadap ukuran bundle, typing, dan keamanan SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - internasionalisasi svelte
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - perbandingan library i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Cara Memilih Library Svelte i18n yang Tepat

Svelte tidak menyediakan fitur bawaan untuk i18n. Tidak ada `$t`, tidak ada primitif locale, tidak ada format pesan. Setiap opsi merupakan pilihan pihak ketiga (third-party), dan ekosistem Svelte adalah tempat di mana i18n waktu kompilasi (compile-time) telah berkembang paling jauh, sehingga kandidat-kandidatnya lebih berbeda satu sama lain dibandingkan di React atau Vue.

Panduan ini mencantumkan pertanyaan yang harus dijawab terlebih dahulu, lalu memetakan jawabannya ke `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale`, dan Intlayer, untuk Vite + Svelte dan untuk SvelteKit.

![Ekosistem library Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Daftar Isi

<TOC/>

## Enam pertanyaan yang harus dijawab sebelum membandingkan library

1. **Vite SPA atau SvelteKit?** Dalam sebuah SPA, store tingkat modul sudah tepat: satu tab, satu pengguna, satu locale. Di SvelteKit, singleton yang sama tersebut dibagikan ke seluruh request konkuren di server, dan request B dirender dalam bahasa request A. Library tersebut dapat memberi Anda bentuk per-request (context, `locals`) atau menyerahkan pengaturannya kepada Anda.
2. **Siapa yang menulis terjemahan?** Developer, TMS, agensi yang mengirimkan string ICU, atau pipeline AI. `svelte-i18n` mendukung ICU. Paraglide dan `typesafe-i18n` menggunakan sintaks mereka sendiri. Sesuaikan dengan vendor yang digunakan.
3. **Berapa banyak locale dan halaman?** Dua locale dan lima halaman dapat memuat semuanya. Sepuluh locale dan empat puluh route tidak bisa, dan perbedaan antara katalog runtime dan pesan terkompilasi menjadi biaya utama.
4. **Apakah Anda memerlukan type pada kunci (keys)?** `$_("cart.totl")` adalah kegagalan runtime di `svelte-i18n`. Library compile-time menjadikannya sebagai error type secara terstruktur.
5. **Store Svelte 4 atau rune Svelte 5?** Rune mengubah sintaks dari state locale, bukan masalah pembagian datanya (sharing problem). Namun `$state` di file `.ts` terkompilasi menjadi variabel biasa, sehingga runtime library harus mendukung rune jika Anda menggunakan Svelte 5.
6. **Dapatkah Anda menerima file yang di-generate di dalam repo?** Paraglide dan `typesafe-i18n` sama-sama men-generate file JavaScript atau TypeScript ke dalam struktur source tree Anda. Beberapa tim tidak mempermasalahkannya, sementara yang lain mengalami konflik merge pada setiap branch paralel.

Tuliskan jawabannya. Semua pembahasan di bawah ini merujuk kembali ke jawaban-jawaban tersebut.

## Gambaran lanskap dalam satu gambar

Svelte i18n hadir lebih lambat daripada React atau Vue, dan langsung melompat ke gelombang compile-time.

![Sejarah library JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Kamus runtime (2019 hingga 2020): svelte-i18n, sveltekit-i18n">

Katalog JSON, ICU di-parse di browser melalui `intl-messageformat`, locale dalam store tingkat modul (`$locale`, `$_`). Paling banyak diadopsi, terdokumentasi dengan baik, pengaturan SSR harus Anda tangani sendiri.

</Accordion>
<Accordion header="Type yang di-generate (2020 hingga 2022): typesafe-i18n">

Sebuah generator memantau katalog Anda dan memancarkan accessor bertipe (`$LL.cart.total()`). Model yang solid, file yang di-generate berada di dalam repo, dan repository tersebut belum banyak diperbarui baru-baru ini.

</Accordion>
<Accordion header="Compiler dan konten terkolokasi (2022 hingga 2026): Paraglide, wuchale, Intlayer">

Paraglide mengompilasi setiap pesan menjadi fungsi yang diekspor sehingga bundler melakukan tree-shaking pada apa yang tidak pernah dipanggil oleh sebuah route. `wuchale` mengekstrak string dari markup saat build. Intlayer mendeklarasikan konten per komponen dan men-generate type serta kamus per komponen.

</Accordion>
</AccordionGroup>

[Sejarah JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md) membahas setiap gelombang secara rinci.

## Keputusan yang paling penting: di mana konten berada dan kapan dimuat

Dua pilihan struktural menjelaskan sebagian besar perbedaan bundle antar setup:

- **Konten terpusat (centralized) atau terlingkup (scoped).** Satu `locales/en.json` untuk seluruh aplikasi, atau satu deklarasi per komponen.
- **Import statis atau dinamis.** Semuanya saat startup, atau locale aktif (dan idealnya route aktif) di-fetch sesuai permintaan (on demand).

Grafik ini memperkirakan payload untuk aplikasi teoritis 1 hingga 10 halaman, diterjemahkan ke dalam 1 hingga 10 locale, dengan sekitar 30 KB teks per halaman.

![Kebocoran konten teoritis berdasarkan arsitektur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` berada di kiri atas secara default: `register("fr", () => import("./fr.json"))` memberi Anda pemuatan dinamis per locale, tetapi katalog locale adalah satu objek tunggal dan memuatnya akan memuat salinan teks untuk setiap halaman. Paraglide adalah kasus yang menarik: karena setiap pesan adalah ekspornya sendiri, tree-shaking memberi Anda pemisahan sumbu halaman secara gratis, dan [benchmark Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/svelte.md) mengonfirmasi bahwa ini bekerja seperti yang diiklankan pada Vite + Svelte (namun tidak terjadi pada benchmark React dan Next.js). Intlayer mencapai hasil yang sama melalui deklarasi per komponen.

Jika jawaban Anda untuk pertanyaan 3 adalah "banyak halaman", pertimbangkan bagian ini lebih dari preferensi API apa pun. Artikel [i18n per komponen vs terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md) membahas sisi pemeliharaan dari kompromi yang sama.

## Para kandidat

Ukuran library diambil dari [benchmark Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/svelte.md): store ditambah accessor dalam komponen kosong, setelah bundling, tree-shaking, dan minifikasi, pada aplikasi 10 halaman dan 10 locale. Konten diukur secara terpisah.

| Library         | Tempat konten berada                 | State locale                                          | Keamanan tipe              | Format pesan                  | Pemisahan per route  | Ukuran library                                           |
| :-------------- | :----------------------------------- | :---------------------------------------------------- | :------------------------- | :---------------------------- | :------------------- | :------------------------------------------------------- |
| `svelte-i18n`   | Katalog JSON per locale              | Store Svelte tingkat modul                            | 2/5 — Union manual         | ICU                           | Tidak                | ~16.6 kB                                                 |
| `typesafe-i18n` | Modul TS yang di-generate            | Adaptor store                                         | 4/5 — Di-generate          | Kustom                        | Parsial              | Kecil                                                    |
| Paraglide       | Proyek inlang, dikompilasi ke fungsi | Dibaca per pemanggilan dari cookie, URL, atau storage | 3.5/5 — Di-generate        | Kustom                        | Ya, via tree-shaking | Hampir nol (karena kode yang dihasilkan di dalam proyek) |
| `wuchale`       | Diekstrak dari markup saat build     | Store                                                 | N/A (tanpa kunci)          | Kustom                        | Ya                   | ~30.7 kB                                                 |
| Intlayer        | `.content.ts` di samping komponen    | Context ditambah store, mendukung rune                | 5/5 — Di-generate, default | Intlayer (+ ICU, i18next, PO) | Ya, per komponen     | ~3.6 kB                                                  |

> Angka-angka tersebut merupakan gambaran pada versi saat benchmark dilakukan. Jalankan pada aplikasi Anda sendiri sebelum memutuskan hanya berdasarkan ukuran.
> Keamanan tipe: 5/5 berarti kunci, parameter, dan setiap locale diperiksa tanpa penyiapan manual, termasuk pemformat URL dan pembantu (helpers).

Ukuran library Paraglide yang hampir nol diperoleh dari rancangannya: runtime di-generate langsung ke dalam repository Anda. Intlayer memerlukan `vite-intlayer`, sehingga tidak dapat berjalan tanpa langkah build.

## Mencocokkan jawaban Anda dengan library

<AccordionGroup>
<Accordion header="Vite SPA, tim kecil, sedikit locale">

`svelte-i18n`. Ini adalah opsi yang paling banyak didokumentasikan, `$_` mudah dibaca dalam markup, dan `register` ditambah `waitLocale()` menangani pemuatan lambat (lazy loading) per locale. Batasi render pertama dengan `isLoading`, jika tidak, kunci mentah akan sempat terlihat sekilas. Jika aplikasi mungkin menambahkan server nantinya, tempatkan locale di context Svelte sejak hari pertama alih-alih mengandalkan module store; ini tidak memakan biaya sekarang dan mencegah bug yang hanya muncul di tahap produksi nanti.

</Accordion>
<Accordion header="SvelteKit dengan routing locale dan SSR">

Masalah pembagian data (sharing problem) menentukan pilihan ini. `svelte-i18n` berfungsi di SvelteKit tetapi integrasi per-request (`hooks.server.ts`, `locals`, `load`, lalu `setContext`) harus Anda tulis sendiri dan mudah salah dalam penerapannya. Paraglide menyediakan integrasi SvelteKit yang menangani routing dan membaca locale pada setiap pemanggilan, yang menghindari masalah singleton. Intlayer menetapkan locale dari data `load` ke dalam context. [Artikel SvelteKit i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/sveltekit.md) menjelaskan pilihan antara `[[lang]]` dan `reroute`, yang sebaiknya Anda putuskan sebelum memilih library.

</Accordion>
<Accordion header="Terjemahan berasal dari TMS atau agensi yang mengirimkan ICU">

`svelte-i18n` bersifat native ICU melalui `intl-messageformat`, sehingga terhubung langsung ke sebagian besar vendor. Paraglide dan `typesafe-i18n` menggunakan sintaks mereka sendiri dan memerlukan konversi. Dukungan ICU pada Intlayer bersifat parsial, jadi jika Anda menerima string ICU hari ini, anggap itu sebagai pertimbangan utama.

</Accordion>
<Accordion header="Ukuran bundle adalah batasan utama">

Gunakan compile-time. Tree-shaking milik Paraglide bekerja pada Vite + Svelte dan biaya library-nya hampir nol. Kamus per komponen Intlayer memberikan hasil yang sama tanpa menghasilkan file di dalam repo. `svelte-i18n` menyertakan parser ICU beserta seluruh katalog dan menghasilkan ukuran sekitar 4,5× `svelte-intlayer` dalam benchmark sebelum konten apa pun ditambahkan.

</Accordion>
<Accordion header="Type safety tidak bisa dikompromikan">

Gunakan opsi apa pun selain setup `svelte-i18n` polos, di mana satu-satunya pengetikan adalah union manual yang cepat usang dari file JSON. `typesafe-i18n`, Paraglide, dan Intlayer semuanya men-generate type dari konten. Periksa aktivitas repository `typesafe-i18n` sebelum menggunakannya pada codebase Anda. Artikel [mendeteksi terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md) membandingkan apa saja yang dapat ditangkap oleh masing-masing library pada saat build.

</Accordion>
<Accordion header="Anda tidak ingin ada file yang di-generate di dalam repo">

Ini mengeliminasi Paraglide dan `typesafe-i18n`. `svelte-i18n` dan Intlayer menyimpan output-nya di `node_modules` atau direktori build; dengan Intlayer, file `.content.ts` adalah kode sumber yang ditulis manual, sementara kamus dan type terkompilasi berada di `.intlayer/` dan diabaikan oleh git.

</Accordion>
<Accordion header="Terjemahan akan dibuat oleh AI">

Maka JSON terpusat tidak lagi memiliki alasan untuk dipertahankan. Konten terkolokasi ditambah CLI yang mengisi locale yang hilang adalah jalur yang lebih praktis. Perintah `fill` milik Intlayer berjalan menggunakan API key Anda sendiri (OpenAI, Anthropic, Mistral, Gemini) dan hanya menerjemahkan ulang apa yang berubah. Ekosistem inlang milik Paraglide menawarkan solusi hosting serupa dengan paket berlangganan mereka sendiri.

</Accordion>
</AccordionGroup>

## Kelemahan masing-masing library

- **`svelte-i18n`**: paling berat di antara semuanya, tanpa type pada kunci, tanpa pemisahan per route, dan store tingkat modul yang bocor di antara request pada SvelteKit kecuali jika Anda mengonfigurasi context sendiri.
- **`typesafe-i18n`**: proses watcher, file yang di-generate di dalam repo, dan repository yang belum banyak bergerak baru-baru ini.
- **Paraglide**: file yang di-generate di-commit ke dalam repo dan harus di-generate ulang sebelum setiap push, menimbulkan konflik merge pada branch paralel, dan locale dibaca dari cookie atau storage pada setiap pemanggilan pesan daripada dari sebuah store, yang menambah beban kerja saat pergantian locale.
- **`wuchale`**: ide ekstraksi yang menarik, tetapi masih baru. Benchmark React mengalami masalah reactivity yang mengharuskan re-render provider secara paksa, dan dokumentasinya masih minim.
- **Intlayer**: memerlukan plugin build wajib, ekosistem lebih kecil, dukungan ICU parsial, dan konten tersebar di seluruh codebase berdasarkan rancangannya, sehingga mengekspor satu file JSON untuk penerjemah memerlukan tooling tambahan.

## Tampilan setiap opsi dalam kode

Komponen yang sama, ringkasan keranjang dengan judul dan bentuk jamak (plural), ditulis dengan masing-masing kandidat. Bagian yang menarik bukanlah markup-nya, melainkan di mana konten berada, bagaimana locale disimpan, dan apa yang diketahui oleh pemeriksa tipe (type checker).

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Inggris">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Prancis">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Spanyol">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU melalui `intl-messageformat`, locale dalam store tingkat modul. `$_` menerima string apa pun; satu-satunya pengetikan adalah union yang Anda tulis secara manual.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Inggris">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Prancis">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Spanyol">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Setiap pesan adalah fungsi bertipe yang di-generate, di-tree-shake jika tidak pernah dipanggil. Folder `paraglide/` di-generate ke dalam repo Anda, dan locale dibaca per pemanggilan alih-alih dari sebuah store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Inggris">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

  </Tab>
  <Tab value="fr" label="Prancis">

```ts fileName="src/i18n/fr/index.ts"
import type { Translation } from "../i18n-types";

const fr = {
  cart: {
    title: "Votre panier",
    items: "{count} article{{s}}",
  },
} satisfies Translation;

export default fr;
```

  </Tab>
  <Tab value="es" label="Spanyol">

```ts fileName="src/i18n/es/index.ts"
import type { Translation } from "../i18n-types";

const es = {
  cart: {
    title: "Tu carrito",
    items: "{count} artículo{{s}}",
  },
} satisfies Translation;

export default es;
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Accessor bertipe yang di-generate oleh proses watcher. Modelnya solid; file yang di-generate berada di dalam repo dan proyek ini jarang diperbarui baru-baru ini.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      id: "Keranjang Anda",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      id: plural({ one: "{{count}} item", other: "{{count}} item" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Semua locale dalam satu file di samping komponen. `useIntlayer` mengembalikan store yang dapat dibaca, sehingga `$content` adalah auto-subscription yang sudah Anda kenal, dan locale disimpan dalam context (aman untuk SSR) alih-alih modul singleton.

  </Tab>
</Tabs>

Sudah menggunakan `svelte-i18n`? [Adaptor kompatibilitas `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/svelte-i18n.md) membuat alias untuk package pada tingkat bundler sehingga `$_`, `$date`, `$number`, dan kunci flat Anda tetap berfungsi sementara Intlayer menyajikan kontennya.

## Sebelum Anda memutuskan

Tabel fitur memberi tahu apa yang dilakukan library hari ini. Poin-poin ini memberi tahu seperti apa pengalaman menggunakannya dalam jangka panjang.

**Periksa aktivitas repository.**

Commit, waktu respons issue, dan apakah rilis minor terakhir dilakukan tahun ini. Desain yang solid tanpa maintainer adalah migrasi yang tinggal menunggu waktu.

**Jangan memilih berdasarkan unduhan npm.**

Library yang paling banyak diinstal adalah library yang dirilis lebih dulu, bukan yang paling cocok untuk codebase Svelte tahun 2026. Jumlah unduhan mengukur riwayat masa lalu, bukan kesesuaian saat ini.

![Daftar tingkatan library JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Tanyakan siapa yang mendanai maintainer, dan apa yang mereka jual.**

`svelte-i18n` didukung oleh Crowdin, seperti `next-intl` dan `vue-i18n`. `i18next` didukung oleh Locize. Tolgee, Paraglide (inlang), dan Intlayer masing-masing menjalankan platform mereka sendiri. Vendor yang pendapatannya berasal dari hosting terjemahan memiliki sedikit alasan untuk membuat terjemahan gratis di dalam toolchain Anda. Intlayer adalah satu-satunya dari kumpulan ini yang menyediakan terjemahan AI melalui CLI dengan API key Anda sendiri, serta CMS yang dapat Anda host sendiri (self-host).

**Apakah sudah siap untuk AI-agent?**

Agent masih kesulitan dengan i18n: mereka melupakan locale, mengarang kunci, dan mencampur sintaks pesan. Apakah library menyediakan [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md) atau [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md) sehingga agent dapat mendaftar, mengisi, dan menguji konten? Dan apakah pemuatan konten dioptimalkan secara default, atau seseorang harus meninjau namespace dan lazy import setiap kuartal?

**Type safety langsung siap pakai.**

Bukan "dapat diberi tipe dengan konfigurasi tambahan", melainkan "kunci yang salah akan menggagalkan `tsc` pada instalasi baru". Periksa apa yang terjadi dengan kunci yang tidak ada, dan dengan locale yang kehilangan satu terjemahan.

**Deteksi konten yang tidak digunakan.**

Katalog hanya akan terus bertambah. Build Intlayer membersihkan field yang tidak digunakan dan mencatatnya dalam log (`build.purge`). Paraglide mencapainya melalui arsitektur, karena fungsi pesan yang tidak dipanggil akan di-tree-shake. Opsi lainnya menyerahkan pembersihan ini sepenuhnya kepada Anda.

**Pengalaman developer (Developer experience).**

Waktu setup hingga string terjemahan pertama, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md) atau [ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md) yang menampilkan terjemahan saat hover dan melompat ke deklarasi, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk fill, test, dan push, [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) atau ekstraktor yang mengambil string hard-coded dari komponen Anda sehingga tidak perlu mengelola setiap string satu per satu berdasarkan kunci, serta cara bagi non-developer untuk mengedit konten ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)) tanpa pull request.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah svelte-i18n masih merupakan pilihan default yang tepat di tahun 2026?">

Untuk Vite SPA dengan katalog kecil, ya. Ini adalah opsi yang paling banyak didokumentasikan dan kompatibilitas ICU penting bagi banyak tim. Pada SvelteKit atau setelah melewati beberapa puluh halaman, kekurangannya (tanpa tipe, tanpa scoping, store bersama) mulai terasa membebani.

</Question>

<Question title="Apakah tree-shaking Paraglide benar-benar berfungsi?">

Pada Vite + Svelte, ya, benchmark mengonfirmasikannya. Pada React dengan TanStack Start atau Next.js, fitur ini tidak berpengaruh dalam benchmark yang sama. Lakukan verifikasi pada stack Anda sendiri daripada mempercayai salah satu hasil secara mentah-mentah.

</Question>

<Question title="Apakah rune mengubah library mana yang harus saya pilih?">

Rune mengubah sintaks dari state locale Anda sendiri, bukan masalah pembagian data (sharing problem). Yang penting adalah apakah runtime library mendukung rune pada Svelte 5 dan apakah library tersebut menggunakan context daripada module store. Periksa keduanya.

</Question>

<Question title="Apakah pilihan library memengaruhi SEO?">

Secara tidak langsung. Web crawler memperhatikan routing, `hreflang`, `<html lang>`, dan apakah teks ada di dalam HTML yang dirender di server. Lihat [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Melangkah lebih jauh

- [Benchmark Svelte i18n: ukuran bundle, kebocoran, dan waktu peralihan locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/svelte.md)
- [Svelte i18n: store, rune, dan jebakan level modul](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/svelte.md) dan [SvelteKit i18n: routing, SSR, dan shared state](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/sveltekit.md)
- [Adaptor kompatibilitas `svelte-i18n` drop-in](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/svelte-i18n.md)
- [Sejarah JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)
- [i18n compiler vs deklaratif](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md)
- [i18n per komponen vs terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md)
- [Cara kerja optimasi bundle pada waktu build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)
- [Menyiapkan i18n di aplikasi Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+svelte.md) dan di [aplikasi SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_svelte_kit.md)
- Panduan yang sama untuk [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_vue_i18n_library.md), dan [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_solid_i18n_library.md)
