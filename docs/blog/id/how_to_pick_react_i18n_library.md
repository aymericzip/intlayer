---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Cara Memilih Library React i18n yang Tepat di Tahun 2026"
description: Panduan keputusan untuk internasionalisasi React. Pertanyaan apa yang perlu dijawab sebelum membandingkan react-i18next, react-intl, Lingui, use-intl, Paraglide, dan Intlayer, serta apa dampak setiap pilihan terhadap ukuran bundle, typing, dan pemeliharaan.
keywords:
  - react i18n
  - internasionalisasi react
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - perbandingan library i18n
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# Cara Memilih Library React i18n yang Tepat

React tidak menyediakan primitif i18n bawaan. Library yang Anda pilih sejak hari pertama menentukan bagaimana terjemahan disimpan, bagaimana terjemahan masuk ke dalam bundle, dan seberapa banyak pekerjaan yang harus Anda tangani sendiri selama beberapa tahun ke depan. Sebagian besar tim memilih berdasarkan popularitas, lalu baru menyadari konsekuensi dan komprominya saat sudah mencapai 2.000 kunci.

Panduan ini mengambil pendekatan sebaliknya: jawab beberapa pertanyaan tentang proyek Anda terlebih dahulu, lalu petakan jawabannya ke library yang paling cocok. Panduan ini berfokus pada React murni (Vite, React Router, TanStack Start). Next.js memiliki batasan dan karakteristik tersendiri, yang dibahas dalam [perbandingan Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md).

![Ekosistem library React i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Daftar Isi

<TOC/>

## Enam pertanyaan yang harus dijawab sebelum membandingkan library

Tabel fitur tidak ada gunanya tanpa mengetahui baris mana yang penting bagi Anda. Evaluasi pertanyaan-pertanyaan ini terlebih dahulu.

1. **Bagaimana aplikasi dirender?** Hanya SPA, SSR dengan hydration, atau React Server Components. Hook berbasis konteks berfungsi di mana saja dalam SPA. Dengan RSC, sebuah hook memaksa `"use client"` pada setiap komponen yang merender teks, sehingga Anda juga akan memerlukan API sisi server.
2. **Siapa yang menulis terjemahan?** Developer, tim internal yang menggunakan TMS, agensi yang mengirimkan file ICU, atau pipeline AI. Hal ini menentukan format katalog lebih dari detail API mana pun.
3. **Berapa banyak locale dan halaman?** Dua locale dan lima halaman masih sanggup memuat semuanya sekaligus. Sepuluh locale dan lima puluh route tidak bisa, dan strategi pemuatan menjadi biaya utama.
4. **Apakah Anda memerlukan type safety pada kunci (keys)?** Typo pada `t("checkout.totl")` tetap ter-compile di setiap library berbasis kunci kecuali jika Anda menghubungkan type-nya sendiri. Tentukan apakah hal tersebut dapat diterima.
5. **Apa yang ada di dalam string?** Teks biasa, bentuk jamak (plurals), atau kalimat dengan `<Link>` di tengahnya. Konten kaya (rich content) adalah bagian di mana sebagian besar API mulai terasa canggung.
6. **Berapa lama proyek akan berjalan?** Prototipe tiga bulan dan produk lima tahun tidak memerlukan jumlah build tooling yang sama.

Tuliskan jawabannya. Semua pembahasan di bawah ini merujuk kembali ke jawaban-jawaban tersebut.

## Gambaran lanskap dalam satu gambar

Lima belas tahun JavaScript i18n terbagi dalam empat gelombang arsitektur, dan library React yang akan Anda bandingkan berasal dari gelombang yang berbeda.

![Sejarah library JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Kamus runtime (2011 hingga 2017): i18next, react-intl">

Katalog JSON dimuat dalam memori, `t("a.b")` dicari saat runtime, ICU atau sintaks kustom di-parse di browser. Ekosistem terbesar, runtime paling berat, type bersifat opsional (opt-in).

</Accordion>
<Accordion header="Makro waktu kompilasi (2018 hingga 2021): Lingui, typesafe-i18n">

Pesan diekstrak saat build, dikompilasi menjadi katalog yang ringkas, argumen bertipe. Langkah build tambahan (`extract`, `compile`) sebagai ganti bundle yang lebih kecil.

</Accordion>
<Accordion header="Mengutamakan server (2022 hingga 2024): use-intl / next-intl">

Dirancang untuk SSR dan Server Components. Render di server, hydrate hanya apa yang dibutuhkan klien. Masih berbasis kunci dan terpusat.

</Accordion>
<Accordion header="Compiler dan konten terkolokasi (2024 hingga 2026): Paraglide, Intlayer, wuchale">

Konten dikompilasi menjadi fungsi yang mendukung tree-shaking atau kamus per komponen. Type di-generate secara otomatis, terjemahan yang hilang menggagalkan build, dan terjemahan AI dijalankan langsung dari CLI.

</Accordion>
</AccordionGroup>

[Sejarah JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md) merinci bagaimana setiap gelombang menjawab masalah dari gelombang sebelumnya.

## Keputusan yang paling penting: di mana konten berada dan kapan dimuat

Setiap library React i18n memiliki bentuk yang serupa: sebuah store, provider, dan hook. Apa pun yang diterima oleh provider akan berakhir di bundle klien atau dalam payload hydration. Jadi dua pilihan struktural utamanya adalah:

- **Konten terpusat (centralized) atau terlingkup (scoped).** Satu `en.json` untuk seluruh aplikasi, atau satu deklarasi per komponen (atau per namespace).
- **Static import atau dynamic import.** Semuanya di-bundle saat startup, atau locale aktif dan route diambil sesuai permintaan (on demand).

Grafik di bawah ini memperkirakan payload untuk aplikasi teoritis 1 hingga 10 halaman, diterjemahkan ke dalam 1 hingga 10 locale, dengan sekitar 30 KB teks per halaman.

![Kebocoran konten teoritis berdasarkan arsitektur](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Konten terpusat dengan static import bertambah seiring kedua sumbu: 10 halaman dikali 10 locale berarti 300 KB teks di setiap halaman. Dynamic import menghilangkan sumbu locale. Scoping menghilangkan sumbu halaman. Hanya kombinasinya yang tetap stabil dan datar.

Ini bukan sekadar karakteristik library, melainkan masalah disiplin implementasi. `react-i18next` dapat di-scope dengan namespace dan backend lazy loading. `use-intl` dapat dipecah per route. Namun tidak ada yang memaksakannya, dan sebuah `<Button>` bersama yang mengakses `t("common:cta")` secara diam-diam menjadikan `common` sebagai dependensi dari setiap route. [Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md) mengukur ini sebagai "kebocoran dari route lain" dan "kebocoran dari locale lain", dan dari sinilah sebagian besar perbedaan performa antar library berasal.

Jika jawaban Anda untuk pertanyaan 3 adalah "banyak locale, banyak halaman", pertimbangkan bagian ini lebih dari preferensi API apa pun. Artikel [i18n per komponen vs terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md) membahas lebih dalam mengenai sisi pemeliharaan dari pilihan yang sama.

## Para kandidat

Ukuran library diambil dari [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md): provider ditambah hook dalam komponen kosong, setelah bundling, tree-shaking, dan minifikasi, 10 halaman dan 10 locale. Konten diukur secara terpisah.

| Library                 | Gelombang    | Model konten                           | Keamanan tipe                      | Format pesan                  | Ukuran library                                           |
| :---------------------- | :----------- | :------------------------------------- | :--------------------------------- | :---------------------------- | :------------------------------------------------------- |
| `react-i18next`         | Runtime      | JSON terpusat, namespace               | 2/5 — Opt-in (`CustomTypeOptions`) | i18next (suffix plurals)      | ~18.4 kB                                                 |
| `react-intl` (FormatJS) | Runtime      | JSON terpusat, ICU                     | 2/5 — Opt-in (ekstraksi + union)   | ICU                           | ~15.3 kB                                                 |
| `use-intl`              | Server-first | JSON terpusat, ICU                     | 2/5 — Opt-in (declaration merging) | ICU                           | ~14.1 kB                                                 |
| `@tolgee/react`         | Runtime      | Terpusat, in-context editing           | 1/5 — Tidak                        | ICU                           | ~11.1 kB                                                 |
| Lingui                  | Makro        | Teks sumber di kode, katalog kompilasi | 2/5 — Bagus, dari compiler         | ICU via makro                 | ~11.8 kB                                                 |
| Paraglide               | Compiler     | Proyek inlang, fungsi ter-generate     | 3.5/5 — Ter-generate               | Kustom                        | Hampir nol (karena kode yang dihasilkan di dalam proyek) |
| Intlayer                | Compiler     | `.content.ts` per komponen             | 5/5 — Ter-generate, aktif default  | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                                  |

> Angka-angka ini adalah snapshot pada versi saat benchmark dilakukan dan dapat berubah seiring rilis versi baru. Jalankan benchmark pada aplikasi Anda sendiri sebelum memutuskan hanya berdasarkan ukuran.
> Keamanan tipe: 5/5 berarti kunci, parameter, dan setiap locale diperiksa tanpa penyiapan manual, termasuk pemformat URL dan pembantu (helpers).

Dua hal yang tidak ditampilkan dalam tabel. `Paraglide` hampir tidak memuat kode library karena men-generate kode langsung ke dalam repo Anda, yang berarti diperlukan langkah regenerasi sebelum setiap commit dan potensi merge conflict pada file yang di-generate. Dan `Intlayer` memerlukan plugin bundler (`vite-intlayer` atau setara), sehingga tidak dapat berjalan dalam setup tanpa proses build.

## Cocokkan jawaban Anda dengan library

<AccordionGroup>
<Accordion header="Prototipe, tim kecil, sedikit locale">

Pilih opsi paling sederhana yang berfungsi dan jangan over-invest. `react-i18next` dengan satu JSON per locale sudah cukup, dan dokumentasi serta jawaban Stack Overflow selama satu dekade akan menghemat waktu Anda. Lewati namespace sampai Anda benar-benar membutuhkannya. Jika prototipe berkembang menjadi produk, siapkan rencana migrasi ke konten scoped; [adapter kompatibilitas react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-i18next.md) membuat proses tersebut bertahap.

</Accordion>
<Accordion header="Terjemahan berasal dari agensi atau TMS yang menggunakan ICU">

Format katalog Anda sudah ditentukan sejak awal. `react-intl` bersifat ICU-native dan alat ekstraksi FormatJS dibangun untuk pipeline tersebut. `use-intl` juga membaca format ICU. `react-i18next` memerlukan plugin ICU dan kunci jamak kustom jika tidak menggunakannya. Dukungan ICU Intlayer saat ini masih parsial, jadi jika Anda menerima string ICU hari ini, jadikan itu pertimbangan utama hingga fiturnya lengkap.

</Accordion>
<Accordion header="Aplikasi besar, banyak route, anggaran ukuran bundle penting">

Pilih konten terlingkup (scoped) dan dynamic loading secara default, bukan sekadar berdasarkan konvensi. `Lingui` dan `Paraglide` mencapainya melalui kompilasi. Intlayer mencapainya melalui deklarasi per komponen, dan compiler hanya menyertakan apa yang dirender oleh sebuah route. Dengan `react-i18next` atau `use-intl`, rencanakan strategi namespace dan lazy-loading sejak hari pertama dan tegakkan dalam code review, karena tooling tidak akan memaksakannya untuk Anda.

</Accordion>
<Accordion header="Type safety adalah hal yang mutlak">

Setiap library berbasis kunci bisa diberi type, namun hampir tidak ada yang menyediakannya secara default. Jika Anda tidak ingin memelihara declaration merging yang harus bertahan di antara namespace yang dimuat secara lazy, pilih library di mana type di-generate langsung dari konten: `Lingui`, `Paraglide`, atau Intlayer. Artikel [mendeteksi terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md) membandingkan apa saja yang ditangkap oleh masing-masing library saat build.

</Accordion>
<Accordion header="Banyak konten kaya: markdown, tautan di dalam kalimat, komponen per locale">

Node konten kaya adalah titik di mana fungsi `t()` yang mengembalikan string mulai menemui batasnya. `react-i18next` dan `Lingui` memiliki `<Trans>`, `react-intl` memiliki tag rich text, semuanya lebih rumit dibandingkan kasus string biasa. Node konten Intlayer menerima JSX, markdown, dan objek bersarang secara langsung, yang jauh lebih cocok jika konten Anda lebih kompleks daripada sekadar label antarmuka pengguna.

</Accordion>
<Accordion header="Terjemahan akan dihasilkan oleh AI, ditinjau oleh developer">

Maka JSON terpusat tidak lagi menjadi keharusan, karena tidak ada TMS eksternal yang perlu diimpor. Konten terkolokasi ditambah CLI yang mengisi locale yang hilang adalah jalur yang lebih ringkas. Perintah `fill` Intlayer berjalan menggunakan API key Anda sendiri (OpenAI, Anthropic, Mistral, Gemini) dan hanya menerjemahkan bagian yang berubah. Paraglide dan Tolgee menawarkan layanan serupa berbasis cloud dengan paket langganan mereka sendiri.

</Accordion>
<Accordion header="Anda mungkin akan beralih ke Next.js App Router nanti">

React context tidak dapat melintasi batasan server/client. Library yang dibangun hanya berdasarkan hook klien (`react-i18next`, `react-intl`) akan memerlukan API server paralel saat Anda mengadopsi RSC. `use-intl` (sebagai `next-intl`) dan Intlayer (sebagai `next-intlayer`) sudah memiliki pemisahan tersebut. Baca artikel [i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/nextjs.md) sebelum membakukan suatu pola arsitektur.

</Accordion>
</AccordionGroup>

## Di mana letak kekurangan setiap library

Batasan realistis, karena setiap opsi pasti memilikinya.

- **`react-i18next`**: paling berat di antara semuanya, format plural sendiri, konfigurasi type harus Anda pelihara sendiri, dan dead keys menumpuk tanpa disadari.
- **`react-intl`**: DX cukup bertele-tele (`useIntl()` lalu `formatMessage({ id })`), instance global terikat pada banyak node.
- **`use-intl`**: mudah untuk memulai, cukup rumit saat dioptimalkan. Menggabungkan namespace, dynamic loading, dan typing secara bersamaan cukup memperlambat alur pengembangan.
- **`Lingui`**: langkah build tambahan `extract` / `compile`, beberapa sintaks yang tumpang tindih (`t()`, tagged template, `i18n.t()`, `<Trans>`) yang membingungkan manusia maupun asisten AI.
- **`Paraglide`**: file ter-generate di dalam repo, tree-shaking tidak bekerja optimal dalam benchmark React, dan locale dibaca dari storage pada setiap node alih-alih dari store terpusat.
- **`Tolgee`**: tidak ada typing pada kunci, onboarding lebih sulit, in-context editing adalah nilai jual utamanya.
- **`Intlayer`**: wajib menggunakan plugin build, ekosistem lebih baru dan lebih kecil, dukungan ICU parsial, konten tersebar di seluruh codebase secara sengaja sehingga mengekspor satu file JSON untuk penerjemah memerlukan tooling tambahan.
- **`gt-react`, `lingo.dev`**: tidak direkomendasikan dalam benchmark: error kuota saat build, keterikatan vendor (vendor lock-in), dan masalah reaktivitas yang mengharuskan re-render paksa pada provider.

## Gambaran masing-masing opsi dalam kode

Komponen yang sama, ringkasan keranjang belanja (cart summary) dengan judul dan bentuk jamak (plural), ditulis dengan setiap kandidat. Bagian yang menarik bukanlah komponennya, melainkan di mana konten berada dan apa yang diketahui oleh type checker tentang konten tersebut.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

  <Tabs group="locale">
  <Tab value="en" label="Inggris">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Prancis">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Spanyol">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Bentuk jamak (plurals) adalah kunci berakhiran sufiks yang diselesaikan melalui `Intl.PluralRules`. `t` bertipe `(key: string) => string` kecuali jika Anda mendeklarasikan `CustomTypeOptions`, sehingga `t("titel")` tetap lolos kompilasi.

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="Inggris">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="Prancis">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="Spanyol">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

ICU dari ujung ke ujung, yang merupakan format standar yang diekspor oleh sebagian besar platform TMS. Type pada `id` berasal dari langkah ekstraksi `formatjs` ditambah generated union, bukan tersedia langsung secara instan (out of the box).

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="Inggris">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="Prancis">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="Spanyol">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Struktur yang sama dengan `next-intl` tanpa binding khusus Next.js. Kunci memiliki type setelah Anda memperluas `AppConfig` dengan type pesan; pembagian namespace harus Anda kelola sendiri.

  </Tab>
  <Tab label="Lingui" value="lingui">

  <Tabs group="locale">
  <Tab value="en" label="Inggris">

```po fileName="src/locales/en/messages.po"
msgid "Your cart"
msgstr "Your cart"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# item} other {# items}}"
```

  </Tab>
  <Tab value="fr" label="Prancis">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

  </Tab>
  <Tab value="es" label="Spanyol">

```po fileName="src/locales/es/messages.po"
msgid "Your cart"
msgstr "Tu carrito"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# artículo} other {# artículos}}"
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

Bahasa sumber berada di dalam komponen; locale lain berada di dalam file `.po` di bawah hash ID setelah menjalankan `lingui extract`. Jika lupa menjalankan `extract` atau `compile`, aplikasi akan diam-diam fallback ke bahasa Inggris.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

Setiap pesan adalah fungsi bertipe yang di-generate, sehingga kunci yang hilang langsung memicu error impor. Folder `paraglide/` di-generate ke dalam repositori Anda dan di-regenerate pada setiap perubahan.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

Semua locale dalam satu file di samping komponen. Type di-generate saat build, sehingga `title` memiliki autocomplete dan kesalahan ketik (typo) langsung menggagalkan `tsc` tanpa memerlukan declaration merging manual. Menghapus folder otomatis menghapus string terkait.

  </Tab>
</Tabs>

Sudah menggunakan `react-i18next`, `react-intl`, atau `Lingui`? Adapter kompatibilitas ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md)) melakukan alias pada import di level bundler sehingga API yang ada tetap berfungsi saat Anda bermigrasi komponen demi komponen. [Panduan migrasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md) mencakup langkah-langkah lainnya.

## Sebelum Anda memutuskan

Tabel fitur menunjukkan apa yang bisa dilakukan library hari ini. Poin-poin berikut memberi tahu Anda seperti apa pengalaman menggunakannya dalam jangka panjang.

**Periksa aktivitas repositori.**

Commit, waktu respons issue, dan apakah rilis minor terakhir dilakukan tahun ini. Desain yang baik tanpa pengelola aktif adalah awal dari migrasi terpaksa di kemudian hari.

**Jangan memilih hanya berdasarkan unduhan npm.**

Library yang paling banyak diunduh adalah yang dirilis paling awal, bukan yang paling cocok untuk codebase React tahun 2026. Jumlah unduhan mengukur riwayat masa lalu, bukan kecocokan saat ini.

![Tier list library JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Ketahui siapa yang mendanai pengelola, dan apa yang mereka jual.**

`i18next` didukung oleh Locize. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n`, dan Lingui didukung oleh Crowdin. Tolgee, Paraglide (inlang), dan Intlayer masing-masing menjalankan platform mereka sendiri. Vendor yang pendapatannya berasal dari hosting terjemahan memiliki sedikit insentif untuk membuat terjemahan gratis di dalam alur kerja alat Anda. Intlayer adalah satu-satunya dari daftar ini yang menyediakan terjemahan AI melalui CLI dengan API key Anda sendiri, serta CMS yang dapat Anda hosting sendiri (self-host).

**Apakah siap untuk AI Agent?**

Agent AI masih sering kesulitan dengan i18n: lupa menyertakan locale, membuat kunci fiktif, dan mencampur aduk sintaks pesan. Apakah library menyediakan [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md) atau [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md) agar agent dapat menampilkan daftar, mengisi, dan menguji konten? Dan apakah pemuatan konten dioptimalkan secara default, atau seseorang harus meninjau namespace dan lazy import setiap kuartal?

**Type safety bawaan.**

Bukan sekadar "bisa diberi type dengan konfigurasi manual tambahan", melainkan "kunci yang salah langsung menggagalkan `tsc` pada instalasi baru". Periksa apa yang terjadi jika ada kunci yang tidak ada, atau jika sebuah locale kekurangan satu terjemahan.

**Deteksi konten yang tidak digunakan.**

Katalog terjemahan cenderung terus bertambah. Build Intlayer membersihkan field yang tidak digunakan dan mencatatnya (`build.purge`). Paraglide mencapainya melalui arsitektur, karena fungsi pesan yang tidak dipanggil akan di-tree-shake. Opsi lainnya menyerahkan pembersihan ini sepenuhnya kepada Anda.

**Pengalaman pengembang (Developer Experience).**

Waktu setup hingga string terjemahan pertama berfungsi, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md) atau [ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md) yang menampilkan terjemahan saat kursor diarahkan (hover) dan melompat langsung ke deklarasi, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk fill, test, dan push, [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) atau ekstraktor yang mengambil string hard-coded dari komponen Anda sehingga tidak perlu mengelola setiap string satu per satu berdasarkan kunci, serta cara bagi non-developer untuk mengedit konten ([editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)) tanpa perlu membuka pull request.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah react-i18next masih menjadi pilihan default yang baik di tahun 2026?">

Ya untuk sebagian besar tim. Library ini memiliki ekosistem terbesar dan jawaban paling banyak di internet. Konsekuensinya nyata namun dapat diprediksi: runtime paling berat, format plural kustom, serta type safety dan scoping yang harus Anda konfigurasi dan jaga sendiri.

</Question>

<Question title="Apakah saya memerlukan library berbasis compiler?">

Hanya jika ukuran bundle, generated types, atau pemeriksaan kunci yang hilang saat waktu build termasuk dalam kebutuhan Anda. Untuk aplikasi kecil dengan dua locale, library runtime lebih sederhana. Artikel [i18n compiler vs deklaratif](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md) menjelaskan apa yang diberikan oleh compiler dan apa potensi kekurangannya.

</Question>

<Question title="Bisakah saya beralih library nanti tanpa menulis ulang setiap komponen?">

Sebagian bisa. Library berbasis kunci memiliki pola yang cukup mirip sehingga adapter kompatibilitas dapat membuat alias dari satu API ke API lainnya, seperti cara kerja adapter Intlayer. Format pesan (ICU vs i18next vs helper bawaan) tidak terkonversi secara otomatis, jadi bentuk jamak (plurals) dan interpolasi adalah bagian yang perlu Anda ubah secara manual.

</Question>

<Question title="Apakah pilihan library memengaruhi SEO?">

Secara tidak langsung. Apa yang dilihat oleh web crawler ditentukan oleh routing, `hreflang`, `<html lang>`, dan apakah teks ada dalam HTML yang dirender di server. Beberapa library menyediakan helper untuk hal tersebut, namun sebagian besar menyerahkannya kepada Anda. Lihat [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Langkah selanjutnya

- [Benchmark library i18n: ukuran bundle, kebocoran, dan waktu peralihan locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md) dan [laporan TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)
- [React i18n: cara kerja model provider dan dampaknya](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/react.md)
- [react-i18next vs react-intl vs Intlayer, fitur demi fitur](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md)
- [Sejarah JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)
- [i18n Compiler vs deklaratif](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md)
- [i18n per komponen vs terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md)
- [Cara kerja optimasi bundle pada waktu build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)
- [Menyiapkan i18n dalam aplikasi Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)
- Panduan yang sama untuk [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_svelte_i18n_library.md), dan [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_solid_i18n_library.md)
