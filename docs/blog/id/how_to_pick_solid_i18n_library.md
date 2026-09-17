---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cara Memilih Library Solid i18n yang Tepat di Tahun 2026"
description: Panduan keputusan untuk internasionalisasi SolidJS dan SolidStart. Pertanyaan apa yang perlu dijawab sebelum membandingkan @solid-primitives/i18n, solid-i18next, Paraglide, Lingui, dan Intlayer, serta apa dampak setiap pilihan terhadap reactivity, ukuran bundle, dan typing.
keywords:
  - solidjs i18n
  - solid start i18n
  - internasionalisasi solid
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - perbandingan library i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Cara Memilih Library Solid i18n yang Tepat

Model reactivity milik Solid mengubah apa yang perlu dilakukan oleh library i18n. Komponen hanya berjalan sekali, sehingga terjemahan yang disimpan dalam `const` saat setup menjadi string yang beku (frozen string), dan library yang mengembalikan string alih-alih accessor akan menghasilkan halaman yang berganti bahasa di mana-mana kecuali di tiga komponen tempat seseorang melakukan hal tersebut. Memilih library untuk Solid sebagian adalah tentang API, dan sebagian lagi tentang mana yang membuat kesalahan tersebut sulit dibuat.

Panduan ini mencantumkan pertanyaan yang harus dijawab terlebih dahulu, lalu memetakannya ke `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid`, dan Intlayer, untuk Vite + Solid dan untuk SolidStart.

![Ekosistem library Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Daftar Isi

<TOC/>

## Enam pertanyaan yang harus dijawab sebelum membandingkan library

1. **Vite SPA atau SolidStart?** Dalam SPA, locale dapat disimpan di dalam signal saja. Pada SolidStart, locale harus di-resolve di server dari URL, dan apa pun yang harus dilihat oleh crawler tanpa JavaScript (`<html lang>`, `hreflang`) berada di `entry-server.tsx`.
2. **Seberapa reaktif perubahan locale yang dibutuhkan?** Reload halaman penuh saat pergantian bahasa dapat diterima untuk beberapa aplikasi. Jika tidak, nilai library harus berupa signal atau accessor, dan pembacaannya harus di-track, bukan di-copy.
3. **Siapa yang menulis terjemahan?** Developer, TMS, agensi yang mengirimkan string ICU, atau pipeline AI. `solid-i18next` menggunakan format i18next. `@solid-primitives/i18n` mengikuti apa pun objek kamus Anda. Sesuaikan dengan vendor yang digunakan.
4. **Berapa banyak locale dan halaman?** Dua locale dan lima halaman dapat memuat semuanya sekaligus. Sepuluh locale dan empat puluh route tidak bisa, dan katalog lazy serta scoping menjadi biaya utama.
5. **Apakah Anda memerlukan type pada kunci (keys)?** `@solid-primitives/i18n` meng-infer type dari kamus sumber. `solid-i18next` memerlukan deklarasi manual. Library compile-time men-generate type tersebut.
6. **Berapa banyak cakupan fitur yang Anda butuhkan?** Manajemen cookie, routing berawalan locale (locale-prefixed routing), redirect, formatter. Opsi paling ringan tidak memiliki semua itu, dan itu tidak masalah sampai Anda membutuhkannya.

Tuliskan jawabannya. Semua pembahasan di bawah ini merujuk kembali ke jawaban-jawaban tersebut.

## Gambaran lanskap dalam satu gambar

Solid adalah ekosistem termuda di sini dan memiliki opsi paling sedikit, yang terbagi dalam tiga gelombang.

![Sejarah library JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Kamus runtime: solid-i18next">

i18next yang dibungkus untuk Solid. Namespace, backend, detector, dan satu dekade plugin. Paling berat di antara semuanya, dan memiliki biaya `t("a.b")` yang sama seperti di React.

</Accordion>
<Accordion header="Primitif minimal (2022): @solid-primitives/i18n">

Kamus flat yang Anda kelola sendiri, `translator()` yang mengembalikan accessor, type di-infer dari objek sumber. Sangat kecil, tanpa scoping, tanpa routing, tanpa formatter. Pilihan default komunitas.

</Accordion>
<Accordion header="Compiler dan konten yang diletakkan bersama (2024 hingga 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide men-generate satu fungsi per pesan. Intlayer mendeklarasikan konten per komponen dalam file `.content.ts` dan mengembalikan node berbasis signal. Binding Solid dari Lingui hadir pada tahun 2026 dan membawa ekstraksi berbasis makro miliknya.

</Accordion>
</AccordionGroup>

[Sejarah JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md) membahas setiap gelombang secara mendalam.

## Keputusan yang paling penting: di mana konten berada dan kapan dimuat

Dua pilihan struktural menjelaskan sebagian besar perbedaan bundle antar setup:

- **Konten tersentralisasi atau scoped.** Satu kamus untuk seluruh aplikasi, atau satu deklarasi per komponen.
- **Import statis atau dinamis.** Semuanya saat startup, atau locale aktif (dan idealnya route aktif) di-fetch sesuai permintaan (on demand).

Grafik ini memperkirakan payload untuk aplikasi teoritis berisi 1 hingga 10 halaman, diterjemahkan ke dalam 1 hingga 10 locale, dengan sekitar 30 KB teks per halaman.

![Kebocoran konten teoritis berdasarkan arsitektur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` tidak menangani kedua sumbu tersebut: Anda melakukan `createResource` untuk kamus per locale, yang memberikan pemuatan dinamis, dan sisanya Anda tangani sendiri. `solid-i18next` memiliki namespace dan lazy backend, tetapi tidak ada yang memaksakan pemetaannya, sehingga komponen bersama yang mengimpor `common` menjadikannya dependensi dari setiap route. Paraglide menangani sumbu halaman melalui tree-shaking, meskipun hal tersebut tidak berpengaruh dalam implementasi [benchmark Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/solid.md). Intlayer menanganinya melalui deklarasi per-komponen.

Jika jawaban Anda untuk pertanyaan 4 adalah "banyak halaman", pertimbangkan bagian ini lebih dari sekadar preferensi API apa pun. Artikel [per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md) membahas sisi pemeliharaan dari kompromi yang sama.

## Para kandidat

Ukuran library diambil dari [benchmark Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/solid.md): provider ditambah accessor dalam komponen kosong, setelah bundling, tree-shaking, dan minifikasi, pada aplikasi 10 halaman dan 10 locale. Konten diukur secara terpisah.

| Library                  | Model konten                              | Reactivity pada pergantian locale           | Keamanan tipe                           | Scoping dan lazy loading      | Ukuran library                                           |
| :----------------------- | :---------------------------------------- | :------------------------------------------ | :-------------------------------------- | :---------------------------- | :------------------------------------------------------- |
| `@solid-primitives/i18n` | Kamus flat yang Anda kelola               | Signal, accessor dikembalikan translator    | 3/5 — Di-infer dari kamus sumber        | Tidak ada bawaan              | ~0.6 kB                                                  |
| `solid-i18next`          | Katalog dan namespace i18next             | Store, re-render via provider               | 2/5 — Deklarasi manual                  | Namespace, lazy backend       | ~14.9 kB                                                 |
| Paraglide                | Proyek inlang, fungsi yang di-generate    | Dibaca per pemanggilan dari cookie/storage  | 3.5/5 — Di-generate                     | Tree-shaking (tidak di bench) | Hampir nol (karena kode yang dihasilkan di dalam proyek) |
| `@lingui/solid`          | Teks sumber dalam kode, katalog kompilasi | Berbasis signal                             | 2/5 — Dari compiler                     | Per katalog                   | ~11.8 kB                                                 |
| Intlayer                 | Satu `.content.ts` per komponen           | Node berbasis signal, tanpa re-run komponen | 5/5 — Di-generate, aktif secara default | Ya, per komponen              | ~4.3 kB                                                  |

> Angka-angka tersebut merupakan gambaran pada versi saat benchmark dilakukan. Ukuran `@lingui/solid` diambil dari benchmark TanStack Start. Jalankan pada aplikasi Anda sendiri sebelum memutuskan hanya berdasarkan ukuran.
> Keamanan tipe: 5/5 berarti kunci, parameter, dan setiap locale diperiksa tanpa penyiapan manual, termasuk pemformat URL dan pembantu (helpers).

Ukuran library Paraglide yang hampir nol didapat dari rancangannya: runtime di-generate langsung ke dalam repository Anda. Intlayer membutuhkan `vite-intlayer`, sehingga tidak dapat berjalan tanpa build step.

## Cocokkan jawaban Anda dengan library

<AccordionGroup>
<Accordion header="Vite SPA, katalog kecil, Anda menginginkan hal yang sederhana tanpa hambatan">

`@solid-primitives/i18n`. Kamus flat, `translator()` yang mengembalikan accessor, type di-infer tanpa konfigurasi rumit. Ini adalah pilihan tepat untuk aplikasi kecil, dan membaca kode sumbernya hanya membutuhkan sepuluh menit. Yang perlu Anda tulis sendiri: persistensi locale, routing, formatter, dan pemisahan per-route. Jika daftar tersebut bertambah panjang, itu adalah tanda untuk beralih.

</Accordion>
<Accordion header="Berasal dari React dengan codebase i18next">

`solid-i18next` memungkinkan Anda menggunakan kembali katalog, namespace, backend, dan detector apa adanya. Ini adalah opsi terberat dan membawa biaya yang sama dengan `react-i18next`: deklarasi type manual, optimasi yang mungkin dilakukan tetapi memakan waktu, serta `t()` yang mengembalikan string sehingga bug terjemahan beku (frozen-translation) mudah terjadi. Bungkus pembacaan di dalam JSX atau memo dan jangan pernah menyimpannya saat setup.

</Accordion>
<Accordion header="SolidStart dengan route berawalan locale dan SSR">

Locale harus berasal dari URL di server agar kedua sisi selaras; mendeteksinya di client sudah terlambat. `@solid-primitives/i18n` dan `solid-i18next` menyerahkan route `[[locale]]`, `matchFilters`, redirect, dan tag `entry-server.tsx` kepada Anda. Paraglide memiliki plugin Vite yang menangani routing. Intlayer menyediakan middleware dan helper route. Mana pun yang Anda pilih, letakkan `<html lang>` dan `hreflang` di `entry-server.tsx`; `@solidjs/meta` diterapkan di client setelah hydration di SolidStart v2. Artikel [Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/solid.md) memandu penyiapan tersebut.

</Accordion>
<Accordion header="Perubahan locale harus instan dan fine-grained">

Pilih library yang nilainya berupa signal atau accessor dan pembacaannya di-track. Accessor `@solid-primitives/i18n` dan node Intlayer sama-sama hanya memperbarui node DOM yang membacanya, tanpa re-run komponen. `solid-i18next` melakukan re-render melalui provider. Paraglide membaca locale dari cookie atau storage pada setiap pemanggilan pesan alih-alih dari signal, yang memang berfungsi tetapi melakukan lebih banyak pekerjaan per node daripada yang seharusnya.

</Accordion>
<Accordion header="Aplikasi besar, banyak route, batas anggaran bundle">

Konten scoped yang dikompilasi saat build time. Intlayer hanya menyertakan apa yang dirender oleh sebuah route. Paraglide seharusnya mencapainya melalui tree-shaking; verifikasi dalam setup Anda, karena itu tidak terjadi pada implementasi benchmark. Dengan `solid-i18next`, rencanakan strategi namespace dan lazy-loading sejak hari pertama serta terapkan secara ketat dalam code review.

</Accordion>
<Accordion header="Type safety tidak bisa dikompromikan">

`@solid-primitives/i18n` memberi Anda inferred types secara gratis, yang lebih baik daripada apa yang ditawarkan sebagian besar library React. Untuk type yang di-generate dan tetap bertahan melalui lazy loading serta pemisahan per-route, Paraglide, `@lingui/solid`, dan Intlayer semuanya memproduksinya dari konten. Artikel [mendeteksi terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md) membandingkan apa yang dapat ditangkap oleh masing-masing library saat build time.

</Accordion>
<Accordion header="Terjemahan akan dibuat oleh AI">

Maka kamus tersentralisasi tidak lagi memiliki alasan penggunaan yang kuat. Konten yang diletakkan bersama komponen (colocated) ditambah CLI yang mengisi locale yang hilang adalah jalur yang lebih praktis. Perintah `fill` milik Intlayer berjalan menggunakan API key Anda sendiri (OpenAI, Anthropic, Mistral, Gemini) dan hanya menerjemahkan ulang apa yang berubah.

</Accordion>
</AccordionGroup>

## Kelemahan masing-masing library

- **`@solid-primitives/i18n`**: tidak ada lazy loading atau scoping selain yang Anda buat sendiri, tanpa routing, tanpa penanganan cookie, tanpa formatter. Sangat baik untuk aplikasi kecil, tetapi cepat terasa kurang untuk aplikasi profesional.
- **`solid-i18next`**: paling berat di antara semuanya, type manual, format jamak tersendiri, dan `t()` mengembalikan string sehingga terjemahan membeku jika disimpan saat setup.
- **Paraglide**: file hasil generate di-commit ke repo dan di-generate ulang sebelum setiap push, tree-shaking tidak berpengaruh dalam benchmark Solid, dan locale dibaca dari storage per pemanggilan alih-alih dari signal.
- **`@lingui/solid`**: baru dirilis pada tahun 2026, sehingga belum banyak feedback produksi. Mewarisi build step `extract` / `compile` milik Lingui dan beberapa sintaksnya yang saling tumpang tindih.
- **Intlayer**: plugin build wajib, ekosistem lebih kecil, dukungan ICU parsial, dan konten tersebar di seluruh codebase berdasarkan rancangannya, sehingga mengekspor satu file JSON untuk penerjemah memerlukan tooling tambahan.

## Tampilan masing-masing opsi dalam kode

Komponen yang sama, ringkasan keranjang belanja dengan judul dan bentuk jamak, ditulis menggunakan masing-masing kandidat. Perhatikan di mana terjemahan dibaca: di dalam JSX terjemahan di-track, di dalam body setup terjemahan menjadi string yang beku.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";

export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Key di-type dari objek bahasa Inggris tanpa codegen. Tidak ada aturan jamak, tidak ada lazy loading, dan tidak ada routing; Anda harus menambahkan masing-masing secara manual.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Katalog, namespace, dan plugin i18next apa adanya. `t` mengembalikan string, sehingga `const title = t("cart:title")` saat setup akan membekukannya; pertahankan pemanggilan di dalam JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Setiap pesan adalah fungsi bertipe yang di-generate. Locale dibaca dari cookie atau storage pada setiap pemanggilan alih-alih dari signal, sehingga reactivity saat pergantian harus Anda hubungkan sendiri.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      id: "Keranjang Anda",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        id: "{{count}} item",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        id: "{{count}} item",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Semua locale dalam satu file di samping komponen. `useIntlayer` mengembalikan node berbasis signal, sehingga perubahan locale hanya memperbarui node DOM yang membacanya. `{content.title}` di dalam JSX di-track; `content.title.value` di dalam body setup tidak.

  </Tab>
</Tabs>

Pada codebase i18next yang sudah ada, [adapter kompatibilitas i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md) meng-alias package pada level bundler sehingga katalog dan `t()` tetap berfungsi sementara Intlayer menyajikan kontennya, dan [panduan migrasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md) membahas langkah selanjutnya.

## Sebelum Anda menentukan pilihan

Tabel fitur memberi tahu apa yang dapat dilakukan library saat ini. Poin-poin berikut memberi tahu bagaimana rasanya menggunakannya dalam jangka panjang.

**Periksa aktivitas repository.**

Commit, waktu respons issue, dan apakah rilis minor terakhir dilakukan tahun ini. Desain yang bagus tanpa maintainer adalah migrasi yang tinggal menunggu waktu.

**Jangan memilih berdasarkan unduhan npm.**

Library yang paling banyak diunduh adalah yang pertama kali dirilis, bukan yang paling cocok untuk codebase Solid di tahun 2026. Jumlah unduhan mengukur riwayat, bukan kecocokan.

![Daftar peringkat library JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Cari tahu siapa yang mendanai maintainer, dan apa yang mereka jual.**

`i18next` (di balik `solid-i18next`) didukung oleh Locize. `next-intl`, `vue-i18n`, `svelte-i18n`, dan Lingui didukung oleh Crowdin. Tolgee, Paraglide (inlang), dan Intlayer masing-masing mengoperasikan platform sendiri. Vendor yang pendapatannya berasal dari hosted translation memiliki sedikit alasan untuk membuat terjemahan gratis di dalam toolchain Anda. Intlayer adalah satu-satunya dari kumpulan ini yang menyediakan terjemahan AI melalui CLI dengan API key Anda sendiri, serta CMS yang dapat Anda host sendiri (self-host).

**Apakah siap untuk agen AI?**

Agen AI masih kesulitan dengan i18n: mereka melupakan locale, mengarang kunci, dan mencampur sintaks pesan. Apakah library menyediakan [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md) atau [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md) sehingga agen dapat melihat daftar, mengisi, dan menguji konten? Dan apakah pemuatan konten dioptimalkan secara default, atau seseorang harus meninjau namespace dan lazy import setiap kuartal?

**Type safety langsung dari awal (out of the box).**

Bukan "bisa diberi type dengan konfigurasi tambahan" tetapi "kunci yang salah akan gagal pada `tsc` saat instalasi baru". Periksa apa yang terjadi dengan kunci yang tidak ada, dan dengan locale yang kehilangan satu terjemahan.

**Deteksi konten yang tidak digunakan.**

Katalog biasanya hanya akan membesar. Build Intlayer membersihkan field yang tidak digunakan dan mencatatnya (`build.purge`). Paraglide mencapainya secara arsitektural, karena fungsi pesan yang tidak dipanggil akan di-tree-shake. Library lainnya menyerahkan proses pembersihan tersebut kepada Anda.

**Developer experience.**

Waktu setup hingga string terjemahan pertama, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md) atau [ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md) yang menampilkan terjemahan saat kursor diarahkan (hover) dan melompat ke deklarasi, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk fill, test, dan push, [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) atau ekstraktor yang mengambil string hard-coded dari komponen Anda sehingga tidak perlu mengelola setiap string satu per satu berdasarkan kunci, serta cara bagi non-developer untuk mengedit konten ([visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)) tanpa pull request.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah @solid-primitives/i18n cukup untuk aplikasi produksi?">

Untuk aplikasi kecil, ya, dan ini adalah opsi paling ringan yang tersedia. Pilihan ini mulai tidak mencukupi ketika Anda membutuhkan katalog lazy per route, routing locale di SolidStart, persistensi cookie, atau formatter, karena semua itu harus Anda bangun sendiri.

</Question>

<Question title="Mengapa terjemahan saya tidak diperbarui saat locale berubah?">

Karena komponen Solid hanya berjalan sekali. Terjemahan yang dibaca ke dalam `const` saat setup adalah string biasa, bukan subscription. Bacalah di dalam JSX, effect, atau memo, atau pilih library yang nilainya berupa accessor sehingga versi yang keliru lebih sulit untuk dibuat.

</Question>

<Question title="Apakah saya memerlukan library berbasis compiler?">

Hanya jika ukuran bundle, generated types, atau pemeriksaan kunci yang hilang saat build time adalah persyaratan nyata. Artikel [compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md) menjelaskan apa yang diberikan compiler dan di mana compiler bisa melakukan kesalahan.

</Question>

<Question title="Apakah pilihan library memengaruhi SEO?">

Secara tidak langsung. Crawler memperhatikan routing, `hreflang`, `<html lang>`, dan apakah teks ada dalam HTML yang dirender server, yang pada SolidStart berarti `entry-server.tsx`. Lihat [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Pelajari lebih lanjut

- [Benchmark Solid i18n: ukuran bundle, leakage, dan waktu pergantian locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/solid.md)
- [Solid i18n: mengapa terjemahan membeku saat perubahan locale](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/solid.md)
- [Adapter kompatibilitas i18next drop-in](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md) dan [panduan migrasi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md)
- [Sejarah JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md)
- [Bagaimana optimasi bundle bekerja saat build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)
- [Siapkan i18n dalam aplikasi Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+solid.md) dan dalam [aplikasi SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_solid_start.md)
- Panduan serupa untuk [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_vue_i18n_library.md), dan [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_svelte_i18n_library.md)
