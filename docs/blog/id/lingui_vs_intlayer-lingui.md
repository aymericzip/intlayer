---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui: Makro Sama, Runtime Berbeda"
description: "Apa yang berubah ketika aplikasi React mempertahankan makro Lingui tetapi menyajikannya melalui adaptor kompatibilitas @intlayer/lingui. Ukuran komponen, hidrasi, kebocoran, dan JavaScript per halaman diukur pada kode TanStack Start yang sama, termasuk area di mana adaptor tertinggal."
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Adaptor kompatibilitas
  - Migrasi
  - Internasionalisasi
  - i18n
  - Benchmark
  - Ukuran bundle
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Makro Sama, Runtime Berbeda

`@intlayer/lingui` adalah adaptor kompatibilitas (compat adapter) untuk `@lingui/core` dan `@lingui/react`. Pemanggilan `` t`...` ``, `<Trans>`, `useLingui()`, dan `i18n._()` Anda tetap sama persis; makro terus terkompilasi seperti biasa; yang berubah adalah sumber pesan pada saat runtime. Alih-alih satu katalog terkompilasi per bahasa, setiap lokasi pemanggilan terikat pada kamus Intlayer yang dikompilasi khusus untuknya.

Artikel ini mengukur pertukaran tersebut pada aplikasi TanStack Start yang sama, dibangun sekali dengan Lingui murni dan sekali dengan adaptor. Angka-angka ini berasal dari [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Untuk perbandingan langsung kedua pustaka, baca [Lingui vs Intlayer](https://intlayer.org/id/blog/lingui-vs-intlayer). Tulisan ini berfokus pada apa yang diubah oleh adaptor, dan di mana ia tidak memberikan peningkatan.

<TOC/>

> **Ringkasan (tl;dr)**: Pada aplikasi TanStack Start yang sama, `@intlayer/lingui` memangkas ukuran rata-rata komponen dari **85,5 KB menjadi 12,8 KB** gzip, hidrasi dari **28 ms menjadi 19,7 ms**, dan pergantian bahasa dari **5,9 ms menjadi 2,9 ms**, tanpa mengubah makro sedikit pun. Pada konfigurasi dasar (semua katalog dimuat di awal), adaptor juga menghilangkan **90% kebocoran halaman** dan menghemat 12 KB per halaman. Namun pada konfigurasi lazy-loaded, adaptor mengirimkan **137 KB per halaman dibandingkan 115 KB** untuk Lingui biasa: adaptor mengurai sintaks ICU pada saat runtime sedangkan Lingui mengirimkan larik token yang telah dikompilasi sebelumnya. Kebocoran bahasa sumber (~9-10%) identik di kedua sisi karena berasal dari fallback teks `message` yang tertanam dalam komponen, bukan dari runtime. Adaptor ini berupa plugin Vite dan diukur pada TanStack Start.

## Apa itu `@intlayer/lingui`

Lingui terdiri dari kompilator dan runtime. Makro dalam kode sumber diekstrak ke dalam katalog `.po` (atau JSON) per bahasa, dikompilasi menjadi modul JS per bahasa, dan dimuat ke dalam instans global `I18n` melalui `i18n.load()` + `i18n.activate()`. Setiap pemanggilan `useLingui()` berlangganan ke instans tersebut; setiap pemanggilan `_()` mencari ID-nya pada katalog aktif.

`@intlayer/lingui` mempertahankan makro serta API dan menggantikan mekanisme pencarian katalog:

1. **Aliasing impor.** Plugin `lingui()` dari paket `@intlayer/lingui/plugin` membungkus `vite-intlayer` dan menambahkan entri `resolve.alias` sehingga `@lingui/core` dan `@lingui/react` dialihkan ke `@intlayer/lingui`. Impor kode Anda tidak perlu diubah.
2. **Katalog sebagai sumber kebenaran tunggal.** Plugin `syncJSON` (atau `syncPO` untuk berkas `.po`) membaca katalog yang ada dan mengubahnya menjadi kamus Intlayer, menulis balik terjemahan ketika CLI atau CMS melakukan pembaruan. Dengan opsi `splitKeys: "key-prefix"`, katalog datar ber-ID titik (`footer.github`, `hero.title`) diubah menjadi kamus-kamus kecil per awalan, alih-alih satu berkas besar berukuran 244 KB.
3. **Pengikatan lokasi pemanggilan (Call-site binding).** Langkah optimasi Intlayer mengumpulkan ID yang diteruskan ke `_`, `t`, dan `<Trans>` dalam setiap berkas, dan menyerahkan kamus yang cocok saja ke komponen. `<Trans id="hero.title">` terikat secara mandiri; `useLingui()` terikat ke semua awalan yang digunakan dalam berkas tersebut. ID tanpa titik (ID ber-hash, `mockBanner`) dialihkan ke kamus fallback tunggal `messages` milik Lingui.

```tsx fileName="src/components/Hero.tsx"
// Kode Anda, tidak berubah
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="Keluaran kompilator (disederhanakan)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

Komponen tidak lagi mengakses instans global beserta katalog monolitik di belakangnya. Komponen hanya mengakses kamus `hero`. Itulah alasan utama mengapa kolom ukuran komponen turun hingga 7 kali lipat pada tabel di bawah.

## Hal yang dipertahankan, diabaikan, dan tidak digantikan oleh adaptor

| API Lingui                                               | Bersama `@intlayer/lingui`                                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Makro `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ Dipertahankan. Pertahankan `@lingui/babel-plugin-lingui-macro` atau `@lingui/swc-plugin` sebelum tahap Intlayer |
| `useLingui()` → `{ i18n, _, t }`                         | ✅ Dipertahankan. Berfungsi juga di luar provider (bahasa diturunkan dari `react-intlayer`)                        |
| `i18n._(id, values)`, `i18n.t()`                         | ✅ Dipertahankan. Mengurai ID eksplisit maupun ID hash                                                             |
| Bentuk jamak ICU, `select`, `selectordinal`, `#`         | ✅ Dipertahankan, melalui resolver ICU milik Intlayer                                                              |
| `i18n.date()`, `i18n.number()`, `formats`                | ✅ Dipertahankan, didukung oleh `Intl` bawaan                                                                      |
| `I18nProvider`                                           | ✅ Dipertahankan. Membungkus `IntlayerProvider`; memantau `i18n.on("change")` agar `activate()` memicu re-render   |
| `i18n.activate(locale)`                                  | ✅ Dipertahankan                                                                                                   |
| `i18n.load(locale, messages)` / `loadAndActivate()`      | ⚠️ Diterima sebagai **fallback runtime**. Kamus kompilasi diutamakan; peringatan dev menyarankan penghapusan       |
| `setupI18n({ messages, missing })`                       | ⚠️ `messages` digabungkan sebagai fallback; `missing` diabaikan                                                    |
| `lingui extract` / `lingui compile`                      | ✅ Alur kerja reguler Anda tetap sama. Arahkan `syncPO` / `syncJSON` ke katalog hasil ekstraksi                    |
| `defaultComponent` pada `I18nProvider`                   | ⚠️ Disimpan dalam konteks, tidak diterapkan saat rendering                                                         |
| Next.js                                                  | ❌ Plugin membungkus `vite-intlayer`. Hanya mendukung Vite, TanStack Start, dan React Router                       |

## Pengujian Benchmark

### Apa yang diukur

Rangkaian pengujian [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) membangun **aplikasi yang persis sama** pada setiap konfigurasi: **10 halaman** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 bahasa** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), komponen identik, dan konten identik. Halaman diukur pada bahasa `en` dan `fr`.

Lingui dibangun dengan empat strategi pemuatan: mulai dari mengimpor semua katalog terkompilasi di awal (`static`) hingga pemuatan lambat katalog per rute (`scoped-dynamic`). Adaptor diuji pada **komponen yang sama**, hanya mengubah `vite.config.ts` dan `intlayer.config.ts`. Baris `static`-nya menggabungkan semua bahasa; baris `dynamic`-nya (`importMode: 'dynamic'`) memuat bahasa aktif sesuai permintaan. Tidak ada varian "scoped" karena optimasi otomatis mengisolasi cakupan per lokasi pemanggilan.

Untuk setiap build, metrik berikut dicatat:

- **Lib size**: ukuran gzip komponen kosong yang hanya mengimpor pustaka i18n.
- **Page JS**: rata-rata ukuran gzip JavaScript yang diunduh per halaman di seluruh halaman dan bahasa.
- **Locale leak %**: persentase string terjemahan dalam JS yang diunduh milik bahasa yang **tidak** sedang dilihat pengguna.
- **Page leak %**: persentase string terjemahan dalam JS yang diunduh milik halaman tempat pengguna **tidak** berada.
- **Component avg**: rata-rata ukuran gzip setiap komponen saat dikompilasi secara terpisah.
- **E2E reactivity**: waktu nyata antara pemilihan bahasa baru hingga pembaruan atribut `html[lang]` di DOM (Playwright, 5 iterasi).
- **Hydration**: durasi fase hidrasi React.

> Angka di bawah diambil dari eksekusi tanggal **2026-09-12** menggunakan `@lingui/react` 6.6.0 dan `@intlayer/lingui` 9.5.1. Aplikasi uji sengaja dibuat ringkas (beberapa puluh teks per bahasa), sehingga persentase kebocoran mencerminkan **pola struktural**: kebocoran membesar seiring pertumbuhan konten sementara biaya runtime tetap konstan.

### Hasil pada TanStack Start

| Konfigurasi            | Strategi       | Lib size (gz) | Page JS rata2 (gz) | Bocor Bahasa | Bocor Halaman | Komponen rata2 (gz) | Reaktivitas E2E |     Hidrasi |
| ---------------------- | -------------- | ------------: | -----------------: | -----------: | ------------: | ------------------: | --------------: | ----------: |
| **dasar** (tanpa i18n) | -              |        0,0 KB |           111,0 KB |         0,0% |          0,0% |              0,7 KB |          8,1 ms |     21,6 ms |
| Lingui                 | static         |       11,2 KB |           152,2 KB |        50,0% |         90,0% |             58,0 KB |          3,9 ms |     19,9 ms |
| Lingui                 | dynamic        |       11,2 KB |       **115,2 KB** |         9,3% |          0,0% |             85,5 KB |          5,9 ms |     28,0 ms |
| Lingui                 | scoped-static  |       11,2 KB |           120,8 KB |         4,0% |          0,0% |            147,9 KB |          7,1 ms |     33,9 ms |
| Lingui                 | scoped-dynamic |       11,2 KB |           120,2 KB |         8,6% |          0,0% |             83,7 KB |         42,1 ms |     32,9 ms |
| **`@intlayer/lingui`** | static         |   **10,3 KB** |           140,5 KB |        50,0% |      **0,0%** |         **14,9 KB** |      **3,3 ms** | **11,3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10,3 KB** |           137,0 KB |         9,9% |      **0,0%** |         **12,8 KB** |      **2,9 ms** | **19,7 ms** |
| `intlayer` (asli)      | static         |        5,0 KB |           125,8 KB |        50,0% |          0,0% |              8,1 KB |          3,2 ms |     11,5 ms |
| `intlayer` (asli)      | dynamic        |        5,0 KB |           118,6 KB |         0,0% |          0,0% |              6,3 KB |          3,6 ms |     14,1 ms |

**Cara membaca data**

- **Komponen: 7x lebih kecil.** Ini adalah dampak terpenting dari adaptor. Komponen Lingui yang dikompilasi secara terpisah rata-rata berukuran **58-148 KB** tergantung strateginya, karena `useLingui()` menjangkau instans global dan semua katalog yang dimuat di dalamnya. Komponen yang sama dengan adaptor rata-rata berukuran **12,8-14,9 KB**: komponen hanya mengimpor kamusnya sendiri dan resolver ICU.
- **Hidrasi: 8-14 ms lebih cepat.** `i18n.load()` + `i18n.activate()` dijalankan di sisi klien sebelum React dapat melakukan hidrasi; semakin terisolasi pemuatan Lingui, semakin lama waktu yang dibutuhkan (28-34 ms). Dengan adaptor, kamus hadir sebagai impor biasa yang telah ditempatkan bundler dalam chunk halaman: **11,3 ms** pada mode `static`, **19,7 ms** pada mode `dynamic`.
- **Pergantian bahasa: 2x lebih cepat, tanpa jeda.** Konfigurasi `scoped-dynamic` Lingui yang dioptimalkan membutuhkan **42 ms** untuk memperbarui `html[lang]`, karena katalog rute harus diambil, dimuat, dan diaktifkan sebelum perubahan terlihat. Adaptor stabil pada **2,9-3,3 ms** di kedua mode.
- **Konfigurasi sederhana teroptimasi secara otomatis.** Lingui statis menyertakan semua katalog di setiap halaman: 152,2 KB dan 90% kebocoran halaman. Adaptor statis: 140,5 KB, 0% kebocoran halaman, pada komponen yang persis sama.
- **Ukuran per halaman: Lingui unggul pada mode `dynamic` sebesar 22 KB.** Poin ini perlu disadari secara objektif. Lingui mengompilasi pesan menjadi larik token pada saat build dan hanya menyertakan runtime 11 KB ringan yang melintasinya. Adaptor menyertakan resolver ICU Intlayer (sekitar 15 KB lebih banyak kode `@intlayer/core` dibanding build asli), lapisan adaptor (~10 KB), dan `react-intlayer` (~6 KB). Pada aplikasi ini, itu menghasilkan **137,0 KB berbanding 115,2 KB**. Jika efisiensi byte per halaman adalah satu-satunya tujuan Anda dan Anda telah mengoptimalkan Lingui dengan lazy loading, adaptor tidak memberikan pengurangan ukuran di sini.
- **Kebocoran bahasa serupa di kedua sisi.** 9,3% untuk Lingui dan 9,9% untuk adaptor pada mode `dynamic`. Ini berasal dari kode komponen itu sendiri: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` membawa teks asli bahasa Inggris sebagai fallback, begitu pula keluaran makro kecuali kolom message dibersihkan. Teks bahasa Inggris ini masuk ke chunk `fr` terlepas dari runtime yang digunakan. Intlayer asli (`.content.ts`, tanpa teks bawaan dalam kode) menghasilkan tepat 0%.

## Mengapa angka-angka berubah dan mengapa satu metrik tetap

Dua faktor yang menentukan hasil ini: **ke mana komponen diikat**, dan **dalam format apa pesan dikirimkan**.

**Pengikatan.** Pada Lingui, unit dasarnya adalah keseluruhan bahasa. Berkas `messages.mjs` untuk `fr` merupakan satu modul tunggal; komponen mana pun yang mengimpor instans yang memuatnya memiliki akses ke seluruh isinya, sehingga bundler tidak dapat memecahnya lebih kecil dari tingkat bahasa. Pada adaptor, unit dasarnya adalah lokasi pemanggilan: `hero` dan `footer` adalah impor terpisah, dipecah dan dimuat sesuai kebutuhan per komponen. Hal ini menjelaskan penghematan ukuran komponen, kecepatan hidrasi, dan lenyapnya kebocoran halaman.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # keluaran lingui compile, satu per bahasa
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # dihasilkan: satu kamus per awalan ID, per bahasa
└── src
    ├── locales
    │   ├── en/messages.json             # tidak berubah, tetap menjadi sumber kebenaran
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← tidak berubah
```

**Format.** Langkah kompilasi Lingui mengubah `{count, plural, one {# item} other {# items}}` menjadi larik token; runtime tidak pernah mem-parsing sintaks ICU. Adaptor mempertahankan pesan sebagai teks dan memprosesnya dengan resolver ICU Intlayer. Ini adalah biaya tetap sekitar 15 KB yang dibayar sekali per halaman, dan alasan mengapa baris `dynamic` kalah dalam ukuran byte total meskipun unggul di semua metrik lainnya. Intlayer asli menghindari biaya ini karena kamus `.content.ts` menggunakan simpul `enu()` / `insert()` yang diselesaikan terlebih dahulu oleh kompilator.

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

Perintah ini akan mendeteksi Lingui, membaca `lingui.config.ts` untuk memilih `syncPO` (katalog `.po`) atau `syncJSON` (katalog JSON), menginstal `intlayer`, `react-intlayer`, `@intlayer/lingui` dan plugin sinkronisasi yang sesuai, serta mengganti `@lingui/vite-plugin` dengan plugin adaptor di `vite.config.ts`. Pertahankan `@lingui/core`, `@lingui/react`, dan plugin makro Anda: makro tetap terkompilasi normal dan adaptor memanfaatkan tipe milik Lingui.

</Step>
<Step number={2} title="Hubungkan Intlayer ke katalog Anda">

Untuk katalog JSON (ketika `format: "minimal"` di `lingui.config.ts`):

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
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Kelompokkan ID ber-titik berdasarkan segmen pertamanya: `footer.github` → kamus `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

Untuk katalog `.po`, ganti `syncJSON` dengan `syncPO` dari `@intlayer/sync-po-plugin` dengan pola `source` yang sama menggunakan ekstensi `.po`. Lihat [dokumentasi plugin Sync PO](https://intlayer.org/id/doc/plugin/sync-po).

`splitKeys: "key-prefix"` adalah kunci utama pengurangan ukuran komponen secara drastis. Berkas katalog tetap mempertahankan format datarnya; pemisahan hanya terjadi pada kamus yang dihasilkan, dan sinkronisasi balik menyatukan kembali kunci-kunci tersebut secara otomatis.

</Step>
<Step number={3} title="Tambahkan plugin">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Pertahankan plugin makro Anda; harus berjalan sebelum tahap Intlayer
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` membungkus `vite-intlayer` (pemantauan konten, kompilasi kamus, fase optimasi) dan mengarahkan alias `@lingui/core` serta `@lingui/react` ke adaptor. Lakukan build, dan hasil pengujian di atas langsung dapat dinikmati.

</Step>
</Steps>

### Apa yang bisa dihapus setelah migrasi

| Berkas / pola                                        | Alasan                                                                                        |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Kamus diimpor langsung oleh komponen yang menggunakannya. `i18n.load()` menjadi fallback      |
| `i18n.load()` / `i18n.loadAndActivate()`             | Pertahankan `i18n.activate(locale)`; hapus pemuatan katalog manual                            |
| `lingui compile` dalam skrip build                   | Hanya jika Anda beralih ke JSON atau `.po` sebagai sumber dan tidak lagi mengimpor modul jadi |

### Keuntungan selain penghematan ukuran

- **Pendeteksian terjemahan yang hilang.** Perintah `npx intlayer test` menggagalkan alur CI jika ada kunci yang hilang pada suatu bahasa; `lingui extract` hanya menampilkan statistik.
- **Pengisian otomatis via `npx intlayer fill`.** Menerjemahkan entri yang belum lengkap menggunakan penyedia AI pilihan Anda (OpenAI, Anthropic, Mistral, Gemini...) dan menyimpannya langsung ke katalog Anda.
- **Visual Editor dan CMS.** Bekerja pada kamus yang sama, memungkinkan tim non-teknis memperbarui berkas `.po` dan JSON secara langsung lewat antarmuka grafis.
- **Migrasi bertahap ke `.content.ts`.** Komponen mana pun dapat dialihkan kapan saja dari `useLingui()` ke `useIntlayer("hero")` dengan berkas konten lokal yang berdampingan. Kedua jenis kamus dapat hidup berdampingan secara harmonis.

## Batasan yang perlu dipahami sebelum memulai

- **Biaya per halaman pada mode `dynamic`.** Seperti dibahas sebelumnya: perkirakan sekitar +20 KB per halaman dibandingkan penyiapan Lingui lazy-loaded pada aplikasi kecil. Selisih ini tidak bertambah besar seiring bertambahnya konten (karena berasal dari parser, bukan katalog), tetapi juga tidak berkurang.
- **Kebocoran bahasa sumber tetap ada.** Deskriptor pesan dan keluaran makro menyematkan teks asli bahasa Inggris sebagai fallback. Untuk menghilangkannya sepenuhnya, bidang `message` harus dibersihkan atau komponen dipindahkan ke `.content.ts`.
- **`i18n.load()` hanyalah fallback.** Jika Anda terus mengimpor katalog yang dikompilasi dan memanggil `load()`, bundel lama dan bundel baru akan dimuat bersamaan. Hapus impor tersebut.
- **Khusus untuk Vite.** Belum ada plugin Next.js untuk `@intlayer/lingui`. Proyek Next.js berbasis Lingui sebaiknya langsung mempertimbangkan [`next-intlayer`](https://intlayer.org/id/doc/environment/nextjs).
- **`defaultComponent` tidak diterapkan.** Jika Anda mengandalkannya untuk membungkus setiap elemen `<Trans>`, tambahkan pembungkus tersebut secara eksplisit pada komponen.

## Kapan harus memilih yang mana?

- **Tetap di Lingui** jika Anda sudah menerapkan arsitektur `scoped-dynamic`, prioritas utama Anda adalah byte per halaman terkecil, serta jeda 42 ms pada pergantian bahasa dan 30 ms hidrasi dapat diterima oleh aplikasi Anda.
- **Gunakan `@intlayer/lingui`** jika Anda menggunakan Lingui dan menginginkan komponen yang jauh lebih kecil, hidrasi dan pergantian bahasa lebih cepat, 0% kebocoran halaman pada penyiapan dasar, ID bertipe data kuat, pengujian CI, dan pelengkapan terjemahan AI tanpa menyentuh makro. Ini adalah jembatan peningkatan ideal untuk basis kode Lingui yang ada.
- **Beralih ke Intlayer asli (`react-intlayer`)** ketika Anda mulai merombak komponen secara menyeluruh. Ini adalah satu-satunya opsi dalam tabel benchmark dengan **0% kebocoran bahasa**, runtime 5 KB, dan hanya menambah +7,6 KB per halaman dibanding aplikasi dasar.

## Perbandingan terkait

- [Lingui vs Intlayer](https://intlayer.org/id/blog/lingui-vs-intlayer) (perbandingan kedua pustaka pada benchmark yang sama)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/id/blog/next-intl-vs-intlayer-next-intl) (seri perbandingan adaptor)
- [i18next vs @intlayer/i18next](https://intlayer.org/id/blog/i18next-vs-intlayer-i18next) (seri perbandingan adaptor)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/id/blog/vue-i18n-vs-intlayer-vue-i18n) (seri perbandingan adaptor)
- [Panduan adaptor kompatibilitas: Lingui](https://intlayer.org/id/doc/compatibility/lingui)
- [Pendekatan berbasis kompilator vs i18n deklaratif](https://intlayer.org/id/blog/compiler-vs-declarative-i18n)

## Kesimpulan

`@intlayer/lingui` mengubah target pengikatan lokasi pemanggilan Lingui: dari instans global dan katalog bahasa raksasa menjadi kamus yang dikompilasi secara spesifik untuk masing-masing komponen. Pada aplikasi TanStack Start yang sama, ini menghasilkan **komponen 7x lebih kecil**, **hidrasi 8-14 ms lebih cepat**, **pergantian bahasa 2x lebih responsif** tanpa jeda 42 ms, tanpa perlu mengedit satu pun makro. Adaptor tidak mengubah teks cadangan yang tertanam dalam komponen (sehingga kebocoran bahasa sumber tetap ada) dan mengurai ICU pada saat runtime (membuat mode dinamis mengirimkan sekitar 20 KB lebih banyak per halaman daripada Lingui murni). Pertimbangkan metrik prioritas Anda sebelum menentukan pilihan.

Semua data mentah, aplikasi pengujian, dan skrip benchmark tersedia di [repositori Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Anda dipersilakan mengujinya sendiri.

Untuk informasi selengkapnya, silakan baca dokumentasi ['Mengapa Intlayer?'](https://intlayer.org/id/doc/why).
