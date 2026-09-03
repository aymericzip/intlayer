---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Cara Menguji Terjemahan Tanpa Menulis Tes yang Rapuh"
description: Apa yang layak diuji dalam aplikasi i18n dan apa yang tidak. Pengujian rendering berbasis provider, pseudolokalisasi, cakupan RTL dan bentuk jamak, serta jebakan snapshot.
keywords:
  - uji terjemahan
  - pengujian i18n
  - testing library i18n
  - pseudolokalisasi
  - uji provider locale
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Cara Menguji Terjemahan Tanpa Menulis Tes yang Rapuh

Sebagian besar suite pengujian i18n gagal karena salah satu dari dua alasan. Entah mereka menegaskan teks literal, sehingga setiap perubahan kata merusak lima puluh tes dan tim akhirnya menghapusnya. Atau mereka merender semuanya hanya dalam locale default, sehingga tidak membuktikan apa pun tentang tujuh belas locale lainnya. Keduanya berakhir di tempat yang sama: suite yang tidak dipercaya siapa pun.

## Daftar Isi

<TOC/>

## Pola ini tidak bergantung pada library tertentu

Setiap pola di bawah ini berfungsi pada stack i18n mana pun. Ganti provider dengan `I18nextProvider`, `NextIntlClientProvider`, atau `IntlProvider` dan pengujian tetap identik, karena mereka memvalidasi output render alih-alih API library tertentu.

Perangkat pengujian cakupan juga dapat dipindahkan: dengan [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) yang diarahkan ke katalog yang ada, atau [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) yang membuat alias pada import saat ini, asersi cakupan berjalan langsung terhadap file JSON yang sudah Anda miliki.

## Tentukan apa yang sebenarnya Anda uji

Kualitas terjemahan bukan sesuatu yang bisa diuji dengan kode. Tidak ada assertion yang dapat memberi tahu apakah bahasa Jerman terdengar alami, dan mencoba melakukannya hanya akan memenuhi suite Anda dengan string hardcoded.

Hal-hal mekanis yang layak diuji meliputi:

| Layak diuji                                   | Tidak layak diuji                      |
| :-------------------------------------------- | :------------------------------------- |
| Setiap locale wajib memiliki nilai            | Apakah susunan katanya indah           |
| Locale yang tepat mencapai komponen           | Teks persis dari setiap label          |
| Bentuk jamak diselesaikan untuk tiap kategori | Apakah penerjemah bekerja teliti       |
| Locale RTL mengatur arah dan pencerminan      | Setiap string di setiap locale         |
| Tanggal dan angka yang diformat sesuai locale | Kebenaran implementasi internal `Intl` |

Pengujian cakupan harus dilakukan dalam satu tes berbasis data, bukan dalam tes komponen individual. Hal ini dibahas secara rinci di [menemukan terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md); artikel ini berfokus pada aspek lainnya.

## Render di bawah provider dan periksa berdasarkan peran (Role)

Pola utamanya adalah memasang komponen di dalam provider locale dan mencari elemen berdasarkan role atau test id daripada teks literal.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("merender judul ringkasan dalam bahasa Prancis", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Mencari dengan `getByRole("heading")` tetap bertahan saat kata-kata berubah. Sebaliknya `getByText("Récapitulatif")` langsung gagal saat ada penyesuaian teks. Gunakan teks literal hanya jika string itu sendiri yang menjadi objek pengujian, yang sebenarnya sangat jarang.

Untuk atribut seperti `aria-label`, Anda memerlukan string mentah daripada node yang dapat dirender. Di React, entri `useIntlayer` menyediakan field `.value` untuk kebutuhan ini.

## Parameterisasi pengujian di seluruh locale

Satu logika tes yang dijalankan pada setiap locale jauh lebih bernilai daripada menulis tes terpisah untuk masing-masing bahasa.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("merender tanpa fallback ke nama key", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Key yang ter-render berarti pencarian gagal.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("menetapkan arah teks yang benar", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

Assertion pertama adalah keuntungan generik yang murah: jika pencarian gagal dan library menampilkan key, DOM akan memuat pola seperti `cart.summary.title`. Ini menangkap seluruh kelas bug tanpa perlu memeriksa string tertentu satu per satu.

## Pseudolokalisasi menemukan apa yang terlewat oleh katalog

Tambahkan locale tiruan yang mengubah setiap string, misalnya mengubah `Checkout` menjadi `[!!! Çĥéçķöũţ !!!]`. Kemudian render halaman dalam bahasa tersebut.

Apa pun yang masih muncul dalam bahasa Inggris standar berarti di-hardcode dalam kode sumber. Audit berbasis katalog tidak akan pernah menemukannya karena dari sudut pandang alat, string tersebut belum ada. Tanda kurung siku memiliki fungsi kedua: memperpanjang teks sekitar 30 persen, memperlihatkan tata letak yang rusak sebelum benar-benar diuji dalam bahasa Jerman.

Sebaiknya jalankan ini sebagai pemeriksaan visual atau end-to-end daripada unit test, karena kesalahan ini dapat dilihat secara visual.

## Bentuk jamak membutuhkan pengujian per kategori, bukan per bahasa

Bug bentuk jamak sering luput karena bahasa Inggris hanya memiliki dua bentuk dan sebagian besar pengembang hanya menguji bentuk tersebut. Bahasa Polandia memiliki empat, dan bahasa Arab memiliki enam kategori bentuk jamak.

```ts fileName="plural.test.ts"
// Bahasa Arab menguji zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("jumlah %i", (count) => {
  it("menghasilkan string tidak kosong dalam bahasa Arab", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Pilihlah angka yang mencakup setiap kategori CLDR untuk bahasa paling kompleks alih-alih menguji 1 dan 2 di semua tempat. `Intl.PluralRules` memberi tahu kategori dari suatu angka, sehingga Anda dapat menentukan sampel pengujian tanpa menebak-nebak. Selengkapnya mengenai kategori ini dalam [artikel format pesan ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/icu_message_format.md).

## Jebakan snapshot

Snapshot dan i18n adalah paduan yang buruk. Snapshot dari komponen yang dilokalkan mencatat setiap string di dalamnya: ketika seorang penerjemah memperbaiki kesalahan ketik dalam bahasa Portugis, tes yang sebelumnya hijau berubah merah, dalam file yang tidak dapat dinilai oleh reviewer. Setelah ketiga kalinya, seseorang akan menjalankan `-u` tanpa membaca diff, dan snapshot kehilangan maknanya.

Jika Anda ingin menggunakan snapshot, lakukan hanya dalam satu locale dan perlakukan sebagai pemeriksaan struktural daripada pemeriksaan konten. Semua yang spesifik untuk locale harus diuji dengan assertion eksplisit.

## Uji negosiasi locale, bukan hanya proses rendering

Bug i18n paling umum di produksi bukanlah teks yang hilang. Melainkan terpilihnya locale yang salah: URL menunjukkan `/fr/`, klien membaca `navigator.language`, dan keduanya tidak cocok.

Uji urutan penyelesaian locale secara langsung sebagai fungsi murni, terpisah dari komponen:

```ts fileName="locale-resolution.test.ts"
it("memprioritaskan URL daripada preferensi yang tersimpan", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("jatuh kembali ke header ketika URL tidak memiliki prefix", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

Ini adalah tes i18n paling bernilai tinggi yang paling sering hilang dalam codebase, dan tes ini sama sekali tidak memerlukan DOM.

## Apa yang harus dijalankan dan di mana

- **Unit**: Negosiasi locale, formatter, kategori bentuk jamak. Cepat, tanpa DOM.
- **Komponen**: Satu render berbasis provider per locale, memvalidasi role dan ketiadaan key mentah.
- **Cakupan**: Satu tes berbasis data yang memastikan tidak ada locale wajib yang hilang.
- **Visual atau E2E**: Pemeriksaan pseudolokalisasi dan satu halaman RTL, karena masalah tersebut bersifat visual.

Pertahankan tiga yang pertama di pipeline CI pada setiap commit. Yang terakhir hemat dijalankan pada build malam hari dan mahal jika dijalankan di setiap push.

## Kesalahan umum

- **Menegaskan teks literal di mana-mana.** Memastikan suite pengujian dihapus dalam beberapa bulan.
- **Mengambil snapshot komponen yang dilokalkan.** Penerjemah merusak build dan reviewer menyetujui tanpa membaca.
- **Hanya menguji locale default.** Satu-satunya locale yang mustahil hilang.
- **Hanya menguji 1 dan 2 untuk bentuk jamak.** Melewatkan kategori yang tidak ada dalam bahasa Inggris.
- **Membuat mock dari library i18n.** Anda hanya menguji bahwa mock Anda mengembalikan string.
- **Tidak pernah menguji logika negosiasi locale.** Masalah paling umum di dunia nyata dan paling mudah diuji.

## Pelajari lebih lanjut

- [Menguji konten Anda: audit CLI, API programatik, dan asersi UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md)
- [Plugin ESLint: mendeteksi string hardcoded dan konten yang tidak terpakai](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)
- [Formatter dan utilitas locale, termasuk `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md)
- [Laporan benchmark antar berbagai framework](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)
- [Adapter kompatibilitas react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-i18next.md)
- [Cara mendeteksi terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md)
- [Format pesan ICU: bentuk jamak, select, dan skeleton](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/icu_message_format.md)
