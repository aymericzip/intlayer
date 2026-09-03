---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Cara Menemukan Terjemahan yang Hilang Sebelum Pengguna Anda Menemukannya"
description: Terjemahan yang hilang gagal secara diam-diam. Mengapa fallback menyembunyikannya, empat lapisan deteksi yang benar-benar berfungsi, dan cara menggagalkan build pada kunci yang belum diterjemahkan.
keywords:
  - temukan terjemahan yang hilang
  - kunci terjemahan hilang
  - audit i18n
  - string yang belum diterjemahkan
  - cakupan terjemahan
  - lint i18n
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Cara Menemukan Terjemahan yang Hilang Sebelum Pengguna Anda Menemukannya

Terjemahan yang hilang hampir tidak pernah memicu error atau exception. Bergantung pada konfigurasi Anda, aplikasi akan menampilkan teks bahasa Inggris kepada pengguna di Jepang, atau mencetak `checkout.summary.total` langsung di halaman produksi. Keduanya lolos ke tahap rilis, lolos peninjauan kode, dan justru ditemukan oleh pelanggan alih-alih oleh Anda sendiri.

## Daftar Isi

<TOC/>

## Ini berlaku untuk pustaka (library) apa pun yang Anda gunakan

Tidak ada yang eksklusif untuk satu stack teknologi tertentu di sini. Lapisan deteksi di bawah ini bekerja persis sama pada i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate, atau Lingui, karena semuanya menyelesaikan kunci dan mengalami kegagalan dengan logika yang serupa.

Alat-alatnya juga portabel. Jika pesan Anda berada di katalog JSON saat ini, [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) mengarahkan Intlayer ke file-file tersebut, memberi Anda perintah audit, pengisian (fill), dan pengujian tanpa memindahkan konten atau mengubah satu baris impor pun:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // atau "icu" untuk next-intl / react-intl
    }),
  ],
};

export default config;
```

Jika Anda ingin API runtime tetap identik, [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) menyediakan alias untuk `useTranslation`, `$t`, dan sejenisnya pada tingkat bundler. Apa pun pilihannya, perlakukan perintah di bawah ini sebagai salah satu implementasi nyata dari konsep tersebut, bukan sebagai keharusan.

## Mengapa terjemahan yang hilang tidak terlihat?

Setiap library i18n menyelesaikan kunci melalui rantai yang sama: mencari locale aktif, beralih ke locale default (fallback), dan jika gagal, mengembalikan kunci itu sendiri sebagai string. Langkah terakhir inilah yang menjadi sumber masalah. Tidak ada error, tidak ada peringatan di produksi, dan tidak ada tes yang gagal, karena tidak ada bagian dalam alur kerja yang menganggap kunci yang hilang sebagai hal abnormal.

Mekanisme fallback justru memperburuk keadaan alih-alih memperbaikinya. Halaman yang secara diam-diam menampilkan bahasa Inggris terlihat sangat normal bagi developer berbahasa Inggris dan bagi semua pengujian otomatis. Bug tersebut hanya terlihat oleh orang yang tidak memahami bahasa tersebut.

Jadi pertanyaannya bukanlah "bagaimana menangani terjemahan yang hilang di runtime". Melainkan "bagaimana membuat terjemahan yang hilang mustahil untuk di-merge".

## Empat lapisan tempat Anda dapat menangkapnya

Setiap lapisan menangkap apa yang dilewatkan oleh lapisan lainnya. Anda membutuhkan lebih dari satu.

| Lapisan       | Menangkap                                       | Melewatkan                                    |
| :------------ | :---------------------------------------------- | :-------------------------------------------- |
| Tipe (Types)  | Kunci yang memang tidak ada sama sekali         | Kunci ada tetapi belum diterjemahkan di `ja`  |
| Linter        | String hardcode yang tidak pernah diterjemahkan | Kunci yang hilang dari katalog                |
| Audit         | Cakupan bahasa pada setiap kunci yang dibuat    | Teks yang tidak pernah dijadikan translatable |
| Tes Rendering | Kunci yang terselesaikan tetapi salah render    | Segala hal yang tidak dicakup oleh tes        |

Celah yang paling sering dihadapi tim adalah baris ketiga: mereka tahu kunci mereka valid secara sintaksis, tetapi tidak ada yang memeriksa apakah semua delapan belas bahasa benar-benar memiliki nilai.

## Lapisan 1: jadikan kunci sebagai tipe, bukan sekadar string

`t("checkout.summry.total")` adalah typo yang tetap lolos kompilasi. Jika kunci Anda berupa string biasa, setiap penggantian nama adalah risiko runtime dan setiap penghapusan meninggalkan kunci yatim piatu.

Kunci bertipe mengubah masalah tersebut menjadi kesalahan build. `react-i18next` mendukungnya melalui declaration merging, `next-intl` menyimpulkannya dari bentuk pesan, Lingui menurunkan ID dari teks sumber, dan Intlayer menghasilkan tipe ketat langsung dari file deklarasi konten. Semuanya bekerja; yang membedakan adalah seberapa banyak konfigurasi yang harus Anda siapkan.

Lapisan ini penting namun tidak cukup. Tipe hanya mendeskripsikan struktur katalog default Anda. Tipe tidak menjamin apakah bahasa Korea memiliki nilai untuk kunci tersebut.

## Lapisan 2: lint string yang tidak pernah menjadi kunci

Terjemahan yang tidak dapat Anda temukan sering kali adalah teks yang tidak pernah dieksternalisasi. Label yang di-hardcode dalam komponen tidak terlihat oleh audit berbasis katalog mana pun, karena dari sudut pandang peralatan tersebut, string itu tidak pernah ada.

Plugin ESLint dari Intlayer mengatasi hal ini dengan `no-raw-text`, ditambah `no-unused-content` untuk kasus sebaliknya: konten dideklarasikan tetapi tidak lagi dibaca oleh apa pun.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` mencegah katalog membengkak selamanya. Kunci mati memang tidak merusak kode, tetapi membuat tagihan vendor penerjemah menjadi lebih besar dari yang seharusnya. Daftar aturan lengkap ada di [dokumentasi plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md).

## Lapisan 3: audit cakupan bahasa (locale coverage)

Inilah lapisan yang menjawab pertanyaan inti. Intlayer menyediakannya sebagai perintah CLI:

```bash packageManager="npm"
npx intlayer content test
```

Perintah ini membaca locale yang Anda konfigurasikan dan kamus yang dideklarasikan, lalu melaporkan kunci mana yang kehilangan bahasa apa, dan di file mana letaknya.

Satu detail penting sebelum Anda memasukkannya ke pipeline: **CLI mencetak laporan tetapi keluar dengan status nol (sukses).** Jika Anda memasukkannya dengan harapan menggagalkan build, Anda akan mendapatkan build hijau dengan teks laporan panjang yang tidak dibaca siapa pun. Untuk memblokir proses, gunakan API programatik yang dibahas di bawah.

## Lapisan 4: uji dengan assertion di test suite

`listMissingTranslations()` memberikan hasil audit yang sama dalam bentuk data terstruktur, sangat pas untuk kebutuhan build gate.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("tidak memiliki locale wajib yang hilang", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Tiga field dikembalikan dengan fungsi masing-masing:

- `missingTranslations`: per kunci, bahasa apa yang hilang dan dari file mana. Ini yang Anda cetak jika tes gagal.
- `missingLocales`: gabungan seluruh bahasa yang hilang di semua kunci.
- `missingRequiredLocales`: dibatasi pada `requiredLocales` dalam konfigurasi Anda (atau semua bahasa jika tidak disetel).

## `requiredLocales` adalah pengaturan yang membuat gate dapat bertahan

Mendukung delapan belas bahasa tidak berarti semua delapan belas harus 100% lengkap agar Anda dapat melakukan deploy. Sebagian besar tim membagi tingkatan: tingkatan penting yang menahan rilis, dan tingkatan pelengkap yang dikerjakan berkala.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Tanpa `requiredLocales`, setiap bahasa yang terdaftar otomatis menjadi wajib dan build Anda akan terus merah hingga bahasa terakhir selesai. Hal ini biasanya berujung pada tim yang mematikan pemeriksaan tersebut secara total, yang tentu lebih buruk daripada tidak memilikinya sama sekali.

## Menemukan celah yang sudah terlanjur di produksi

Lapisan di atas mencegah masuknya celah baru. Untuk aplikasi yang sudah live, dua langkah ini sangat membantu.

**Pseudolokalisasi.** Jalankan aplikasi dengan locale tiruan di mana setiap string diubah, misalnya `[!!! Ĉĥéçķöũţ !!!]`. Teks apa pun yang masih muncul dalam bahasa Inggris polos dipastikan merupakan teks hardcode. Metode ini menemukan dalam sepuluh menit apa yang secara struktural tidak dapat dilihat oleh audit katalog, karena ia menguji tampilan yang sudah dirender.

**Merayapi (crawl) situs Anda sendiri.** Jika Anda menyajikan URL dengan locale, ambil sampel per bahasa dan lakukan pencarian teks HTML untuk string bahasa default Anda. Halaman di `/ja/` yang memuat frasa "Add to cart" menandakan adanya terjemahan yang hilang atau fallback yang tidak Anda sadari.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Mengisi kekosongan terjemahan

Begitu Anda tahu apa yang kurang, `intlayer fill` mengisi entri kosong tersebut, dan opsi `autoFill` dapat menghasilkan file per-locale saat konten dideklarasikan. Lihat [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md).

Perlu dipahami dengan jelas: terjemahan yang diisi oleh mesin mengubah celah _yang terlihat_ menjadi celah _yang tidak terlihat_. Kunci sekarang memiliki isi, sehingga audit berubah menjadi hijau, tetapi belum ada manusia yang membaca hasilnya. Gunakan cara ini untuk membuka blokir rilis, lalu serahkan teks penting kepada peninjau manusia untuk hal-hal yang memengaruhi keputusan pelanggan. Ini adalah penopang sementara, bukan jawaban mutlak.

## Kesalahan umum

- **Menganggap fallback sebagai fitur perlindungan.** Ini hanyalah strategi rendering darurat, bukan jaring pengaman. Halaman yang diam-diam berbahasa Inggris adalah bug yang tidak diketahui siapa pun.
- **Mengandalkan laporan CLI untuk membatalkan CI.** `intlayer content test` keluar dengan kode nol. Gunakan assertion dalam unit test.
- **Mewajibkan semua bahasa.** Pemeriksaan langsung dimatikan begitu menahan jadwal rilis darurat.
- **Mengaudit katalog tanpa pernah melihat layar render.** String hardcode tidak mungkin terlihat dalam audit katalog.
- **Hanya menguji bahasa default.** Bahasa default adalah satu-satunya bahasa yang mustahil hilang.
- **Mengakhiri alur kerja hanya dengan auto-fill mesin.** Audit hijau dengan teks yang belum pernah diperiksa manusia.

## Pelajari lebih lanjut

- [Menguji konten Anda: audit CLI, API programatik, dan assertion UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md)
- [Aturan plugin ESLint, termasuk `no-raw-text` dan `no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)
- [autoFill: menghasilkan file deklarasi per-locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md)
- [Referensi konfigurasi: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Laporan benchmark performa antar-framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)
- [Adapter kompatibilitas i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/i18next.md)
- [Apa saja yang sebenarnya dicakup oleh internasionalisasi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/what_is_internationalization.md)
- [i18n per komponen vs i18n terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md)
