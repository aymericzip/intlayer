---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: glob import, chunk, dan pesan waktu kompilasi"
description: Apa yang benar-benar spesifik untuk Vite dalam i18n. Katalog lazy dengan import.meta.glob, mengapa pemisahan rute jarang bekerja, batas HMR, dan plugin build-time.
keywords:
  - vite i18n
  - import.meta.glob
  - pemisahan kode vite
  - lazy load terjemahan
  - plugin vite i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: Bagian yang Terkait dengan Vite, Bukan Framework Anda

Sebagian besar tutorial "Vite i18n" sebenarnya adalah tutorial React atau Vue yang kebetulan menggunakan Vite. Artikel ini membahas lapisan di bawahnya: bagaimana katalog diimpor, apa yang dilakukan Rollup terhadapnya, dan mengapa lazy loading yang Anda tulis kemungkinan besar sebenarnya tidak benar-benar lazy.

## Daftar Isi

<TOC/>

## Impor statis adalah bawaan, dan sifatnya langsung (eager)

Pengaturan paling sederhana mengimpor setiap katalog di baris teratas sebuah modul:

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Itu menempatkan tiga katalog di dalam entry chunk utama, di setiap halaman, untuk setiap pengunjung. Tidak masalah untuk dua bahasa dan seratus teks. Pada sepuluh bahasa, ini menjadi pemborosan terbesar yang sebenarnya sangat mudah dihindari dalam bundle Anda.

## `import.meta.glob` dan opsi yang kerap salah dikonfigurasi

Fitur glob import bawaan Vite adalah solusi umumnya:

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

Pemuatan asinkron (lazy) adalah bawaan: setiap entri adalah fungsi yang mengembalikan dynamic import, dan Rollup menghasilkan satu chunk per file. Menambahkan `{ eager: true }` akan menyatukan semua file langsung ke dalam modul pemanggil, yang justru membatalkan optimasi yang Anda inginkan:

```ts
// Semua bahasa digabungkan ke dalam entry chunk. Hampir tidak pernah diinginkan:
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

Jebakannya adalah kedua versi berjalan mulus di lingkungan dev, karena Vite melayani modul secara terpisah tanpa dibundel. Perbedaannya baru terlihat di dalam direktori `dist`. Uji dengan `npx vite build && npx vite preview`, lalu periksa apa saja yang sebenarnya masuk ke dalam entry chunk.

## Pemisahan per rute jarang memisahkan katalog secara nyata

Ini adalah bagian yang kerap mengejutkan pengembang. Anda memisahkan katalog berdasarkan halaman:

```
locales/en/home.json
locales/en/checkout.json
```

Kemudian dua rute berbeda sama-sama mengimpor `checkout.json`, dan Rollup mengangkat file tersebut ke dalam chunk bersama (shared chunk) yang diunduh di kedua halaman. Pembagian chunk oleh Rollup digerakkan oleh graf modul, bukan oleh struktur folder Anda: modul apa pun yang dapat dijangkau dari lebih dari satu titik masuk akan dijadikan dependensi bersama. Menambahkan rute ketiga tidak mengubah apa pun, dan rute keempat mungkin mengubah pola pembagian secara tak terduga.

Oleh karena itu, pemisahan katalog per rute hanya berlaku jika graf impor benar-benar terpisah total. Jika ukuran bundle penting, lakukan pengukuran nyata dengan alat analisis:

```bash
npx vite build && npx vite-bundle-visualizer
```

Jika Anda terpaksa mengunci batas-batas chunk, opsi `build.rollupOptions.output.manualChunks` adalah jalan keluar darurat, dengan konsekuensi pemeliharaan konfigurasi manual.

## Katalog tidak mendukung Hot Reload (HMR) secara otomatis

Ubah komponen, Vite langsung memperbaruinya di layar. Ubah `locales/fr.json`, dan tergantung pada cara impornya, tidak ada yang terjadi. File JSON yang diimpor secara dinamis tidak memiliki batas HMR bawaan, sehingga graf modul tidak tahu bagaimana cara membatalkan komponen yang menggunakannya.

Banyak tim mengatasi hal ini dengan me-restart server dev setiap kali mengedit teks. Solusi yang benar ada pada plugin i18n: plugin harus menangani pembaruan HMR dan menyalurkan pesan terbaru ke aplikasi yang sedang berjalan. Saat memilih pustaka, pastikan plugin Vite-nya memiliki kapabilitas ini.

## `define` mengunci bahasa secara permanen saat kompilasi

Sangat menggoda untuk menetapkan locale bawaan saat proses build:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` melakukan penggantian teks secara literal saat kompilasi. Nilai yang ada saat proses build adalah nilai yang dikirim ke pengguna, sehingga memaksa Anda membuat satu build terpisah per bahasa. Ini adalah strategi yang valid (seperti yang diterapkan oleh i18n resmi Angular), tetapi bukan yang Anda inginkan jika satu penyebaran harus melayani semua bahasa secara dinamis.

Untuk nilai yang perlu bervariasi pada setiap permintaan pengguna, hindari `define` dan evaluasi pada waktu proses (runtime).

## Memindahkan penguraian pesan ke waktu kompilasi

Semua solusi yang matang di ekosistem ini bermuara pada langkah yang sama: berhenti mengurai pesan di dalam browser.

| Plugin                       | Apa yang dipindahkan ke waktu build                                       |
| :--------------------------- | :------------------------------------------------------------------------ |
| `@intlify/unplugin-vue-i18n` | Mengompilasi pesan vue-i18n ke fungsi render (bundle ringan runtime-only) |
| Lingui (makro + plugin)      | Mengekstrak dan mengompilasi katalog, mengganti makro dengan ID pesan     |
| Paraglide (inlang)           | Mengompilasi setiap pesan ke dalam fungsi tree-shakable tersendiri        |
| `vite-intlayer`              | Membangun kamus per komponen, membuang (purge) dan meminifikasi kunci     |

Keuntungannya ganda: modul kompiler pesan tidak lagi disertakan ke dalam browser, dan entri yang tidak terpakai dapat dibuang secara statis. Konsekuensinya: server dev dan CI Anda harus menjalankan plugin tersebut, dan eksekusi `tsc` murni atau runner tes non-Vite akan membutuhkan konfigurasi tambahan.

## SSR: jangan simpan status bahasa di tingkat modul

Jika Anda menerapkan SSR (baik melalui framework atau `vite-plugin-ssr`), aturan terpenting adalah: variabel tingkat modul yang menyimpan locale saat ini akan dibagikan ke seluruh permintaan bersamaan pada proses server tersebut.

```ts
// Aman di browser. Kebocoran data antar-permintaan di server:
export let currentLocale = "en";
```

Dua pengguna yang mengakses server pada saat bersamaan akan mengalami race condition, dan salah satu dari mereka akan menerima bahasa milik pengguna lainnya. Bug ini tidak muncul saat pengujian lokal karena hanya ada Anda sendiri. Tentukan locale per permintaan dan teruskan secara eksplisit melalui context atau request-local storage milik framework.

## Plugin Vite dari Intlayer

Intlayer mendaftarkan satu plugin terintegrasi yang menangani kompilasi kamus, pengawasan mode dev, dan saluran optimasi:

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

Penulisan ulang impor, pembersihan (purge), dan minifikasi sudah aktif secara default. Dua pengaturan penting berada di `intlayer.config.ts`:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // membuang bidang teks yang tidak dibaca oleh komponen mana pun
    minify: true, // mengganti nama kunci konten menjadi alias ringkas
  },
};

export default config;
```

Karena teks dideklarasikan berdampingan dengan komponen alih-alih dalam file global raksasa, proses pembersihan mengandalkan graf modul nyata sehingga penghapusan kode mati terjamin keamanannya. Rincian selengkapnya di [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

## Kesalahan umum

- **`{ eager: true }` pada glob yang seharusnya lazy.** Bekerja di dev, memuat seluruh bahasa sekaligus di produksi.
- **Berharap struktur folder otomatis membagi chunk.** Rollup mengikuti alur impor, bukan nama folder.
- **Me-restart server dev demi melihat perubahan teks.** Pertanda absennya penanganan HMR di plugin.
- **Memasukkan locale ke dalam `define`.** Memaksa pembuatan satu build terpisah untuk tiap bahasa.
- **Status bahasa di tingkat modul pada SSR.** Menimbulkan kebocoran data antar-permintaan pengguna.
- **Mengukur performa bundle di server dev.** Modul tanpa bundel tidak mencerminkan bundle produksi.

## Pelajari lebih lanjut

- [Optimasi bundle: pembersihan, minifikasi, dan muatan akhir peramban](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)
- [Laporan benchmark performa antar-framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)
- [Referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Menyiapkan Intlayer dengan Vite dan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)
- [Adapter kompatibilitas i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md)
- [React i18n: bagaimana model provider bekerja](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: cara kerja dan kendalanya](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/list_i18n_technologies/frameworks/vue.md)
- [i18n per komponen vs i18n terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md)
