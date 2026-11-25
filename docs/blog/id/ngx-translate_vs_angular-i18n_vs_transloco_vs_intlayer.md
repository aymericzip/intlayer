---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco, atau Intlayer? Bandingkan library i18n Angular dari sisi pergantian bahasa saat runtime, type safety, lazy loading, bentuk jamak, dan SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - internasionalisasi angular
  - ngx-translate vs transloco
  - Intlayer
  - perbandingan library i18n
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular adalah satu-satunya framework besar yang menyertakan i18n sendiri, dan pendekatannya berlawanan dengan library yang dibangun komunitas di sekitarnya. `@angular/localize` menerjemahkan saat build dan menghasilkan satu aplikasi per bahasa. `ngx-translate` dan Transloco menerjemahkan saat runtime dari file JSON. Intlayer mengompilasi konten saat build, tetapi tetap mempertahankan satu aplikasi yang berganti bahasa saat runtime.

Artikel ini membandingkan keempatnya berdasarkan hal yang menentukan pilihan dalam praktik: bagaimana locale berganti, di mana konten disimpan, apa yang ditangkap compiler, dan apa yang dimuat di browser.

## Daftar Isi

<TOC/>

## Versi singkat

- **`@angular/localize`** (Angular i18n): tanpa biaya runtime dan ICU native, tetapi satu build dan satu deployment per locale, dan berganti bahasa memuat ulang aplikasi.
- **`ngx-translate`**: opsi runtime tertua dan paling sederhana. Satu file JSON per locale dimuat lewat HTTP, key tanpa tipe, bentuk jamak lewat plugin.
- **Transloco**: opsi runtime yang dibuat untuk aplikasi lebih besar. Scope memuat terjemahan per fitur, dan ekosistem plugin mencakup ICU, format locale, dan ekstraksi key.
- **Intlayer**: konten dideklarasikan di samping setiap komponen, diberi tipe saat build, dipecah per komponen dan per locale, dengan pergantian bahasa saat runtime. Memerlukan builder esbuild kustom.

> Untuk melihat asal-usul tiap library, baca [sejarah i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md).

- [sejarah i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)

## Build time atau runtime: keputusan yang membelah pilihan

**`@angular/localize`** menyisipkan terjemahan ke dalam template yang sudah dikompilasi. `ng build --localize` menghasilkan `dist/app/en`, `dist/app/fr`, dan seterusnya, masing-masing hanya berisi bahasanya sendiri. Tidak ada yang diunduh dan tidak ada yang diinterpretasikan saat runtime, sehingga ini opsi tercepat setelah dimuat. Biayanya operasional: N build untuk diuji, N folder untuk di-deploy, aturan server atau CDN untuk mengarahkan `/fr/` ke build yang benar, dan pemuatan halaman penuh saat pengguna berganti bahasa. `ng serve` juga hanya menjalankan satu locale pada satu waktu.

**`ngx-translate` dan Transloco** mempertahankan satu build. Sebuah service mengunduh `fr.json` saat locale berubah dan setiap pipe atau directive dirender ulang. Pergantian terjadi seketika, tetapi render pertama menunggu permintaan HTTP, key hanyalah string biasa, dan dengan SSR loader harus berfungsi di server juga (URL absolut atau loader file system, ditambah `TransferState` agar tidak mengunduh dua kali).

**Intlayer** juga mempertahankan satu build, tetapi konten dikompilasi ke dalam bundle, bukan diunduh sebagai file JSON mentah. `useIntlayer()` mengembalikan Signal, sehingga perubahan locale memperbarui komponen yang membacanya, tanpa reload.

Ada satu detail Angular yang mudah terlewat pada library runtime: `DatePipe`, `CurrencyPipe`, dan `DecimalPipe` membaca `LOCALE_ID`, yang ditetapkan saat bootstrap. Berganti bahasa dengan `ngx-translate` tidak mengubah format tanggal dan harga. Transloco mengatasinya dengan `@jsverse/transloco-locale`, Intlayer dengan `useDate`, `useNumber`, dan `useCurrency` yang mengikuti locale aktif. `@angular/localize` tidak punya masalah ini, karena setiap build memiliki `LOCALE_ID` sendiri. [Panduan format tanggal, waktu, dan angka](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/date_time_number_formatting_locales.md) membahas sisi `Intl`.

- [panduan format tanggal, waktu, dan angka](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/date_time_number_formatting_locales.md)

## Perbandingan fitur

|                            | `@angular/localize`                                          | `ngx-translate`                                    | Transloco                                                  | Intlayer                                                               |
| :------------------------- | :----------------------------------------------------------- | :------------------------------------------------- | :--------------------------------------------------------- | :--------------------------------------------------------------------- |
| **Terjemahan diterapkan**  | Saat build, disisipkan                                       | Runtime                                            | Runtime                                                    | Dikompilasi saat build, diselesaikan saat runtime                      |
| **Build per rilis**        | Satu per locale                                              | Satu                                               | Satu                                                       | Satu                                                                   |
| **Pergantian locale**      | Reload halaman ke build lain                                 | Seketika                                           | Seketika                                                   | Seketika                                                               |
| **Lokasi konten**          | Teks sumber di template, terjemahan di XLIFF/JSON            | Satu JSON per locale                               | Satu JSON per locale, ditambah satu per scope              | `.content.ts` (atau JSON) di samping setiap komponen, atau terpusat    |
| **Bentuk jamak / ICU**     | ✅ ICU native di template                                    | ⚠️ Plugin (`ngx-translate-messageformat-compiler`) | ⚠️ Plugin (`@jsverse/transloco-messageformat`)             | ✅ `plural()` dengan aturan CLDR, ⚠️ string ICU sebagian               |
| **Key bertipe**            | Tidak berlaku, teks sumber adalah pesannya                   | ❌ Tidak                                           | ❌ Tidak, Keys Manager menemukan key yang hilang lewat CLI | ✅ Dihasilkan, key yang salah menggagalkan `ng build`                  |
| **Terjemahan yang hilang** | Peringatan build, atau error dengan `i18nMissingTranslation` | Menampilkan key mentah saat runtime                | Bahasa fallback saat runtime, pemeriksaan CLI              | Ditandai TypeScript, `intlayer test` di CI                             |
| **Lazy loading**           | Tidak perlu, setiap build memuat satu locale                 | Seluruh file locale, dipecah manual                | ✅ Per scope (route atau komponen)                         | ✅ Per komponen dan per locale                                         |
| **Signals**                | Tidak berlaku, teks statis                                   | Pipe dan Observables                               | `translateSignal()`                                        | `useIntlayer()` mengembalikan Signal                                   |
| **Setup build**            | `ng add @angular/localize`, locale di `angular.json`         | Tidak ada                                          | Tidak ada                                                  | `@angular-builders/custom-esbuild` dan plugin esbuild                  |
| **Alur kerja penerjemah**  | ✅ XLIFF, format yang diharapkan alat TMS                    | JSON                                               | JSON                                                       | `.content.ts`/JSON, plugin sync, editor visual, pengisian AI lewat CLI |

Beberapa baris perlu konteks.

**ID pesan di `@angular/localize`.** Tanpa ID kustom (`i18n="@@cartTitle"`), ID setiap pesan adalah hash dari teks sumbernya. Perbaiki typo pada teks bahasa Inggris dan semua terjemahan pesan itu menjadi yatim sampai penerjemah mengerjakannya ulang. Tetapkan ID kustom sejak hari pertama.

**Memecah dengan `ngx-translate`.** Loader bawaan mengunduh seluruh `fr.json`, sehingga setiap halaman membawa string dari semua halaman lain. Anda bisa memecah per fitur dengan loader kustom atau beberapa instance `TranslateService`, tetapi tidak ada yang memaksanya. Artikel [i18n per komponen vs terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md) membahas trade-off ini.

- [i18n per komponen vs terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md)

**Scope di Transloco.** Scope adalah folder berisi file JSON (`i18n/cart/en.json`) yang dimuat saat sebuah route atau komponen menyediakannya. Ini yang paling mendekati konten per komponen pada library runtime, dan berjalan baik selama komponen bersama tidak menjangkau scope fitur lain.

**Builder Intlayer.** Angular CLI tidak membuka plugin esbuild, jadi Intlayer memerlukan `@angular-builders/custom-esbuild` di `angular.json`. Ini perubahan kecil, tetapi merupakan builder pihak ketiga yang harus diselaraskan dengan upgrade Angular. [Panduan setup Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_angular_21.md) menunjukkan konfigurasi lengkapnya.

- [panduan setup Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_angular_21.md)

## Aktivitas commit

`@angular/localize` berada di monorepo `angular/angular`, sehingga jumlah commit-nya tidak sebanding dan tidak ditampilkan.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Unduhan npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Unduhan lebih mengukur sejarah daripada pilihan saat ini: `ngx-translate` masih terpasang di setiap aplikasi yang dimulai sebelum Transloco ada, dan asisten AI terus menyarankannya karena ia mendominasi kode tempat mereka dilatih. Transloco pindah dari `@ngneat/transloco` ke `@jsverse/transloco` pada 2024, dan scope lama masih diunduh.

## Komponen yang sama dengan tiap library

Ringkasan keranjang dengan judul dan bentuk jamak. Template nyaris tidak berubah, yang berubah adalah tempat string disimpan dan apa yang diketahui compiler tentangnya.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

Teks bahasa Inggris tetap di template. Penerjemah bekerja pada XLIFF hasil ekstraksi, dan setiap locale menjadi build tersendiri. String di TypeScript memakai tag `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Bentuk jamak ICU hanya berfungsi dengan `ngx-translate-messageformat-compiler`, parser bawaan hanya mengganti `{{count}}`. `"cart.titel"` berhasil dikompilasi dan merender key mentah saat runtime.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Scope `cart` diunduh saat komponen pertama kali dirender. Bentuk jamak ICU memerlukan `@jsverse/transloco-messageformat`. Key tidak bertipe, `transloco-keys-manager` melaporkan key yang hilang dan yang tidak terpakai.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ id: "Keranjang Anda", en: "Your cart", fr: "Votre panier" }),
    items: t({
      id: plural({ other: "{{count}} item" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Semua locale ada dalam satu file di samping komponen. Tipe dihasilkan saat build, sehingga `content().titel` menggagalkan `ng build`, dan locale yang hilang dari `t()` ditandai di editor.

  </Tab>
</Tabs>

## Mana yang cocok untuk aplikasi Anda

<AccordionGroup>
<Accordion header="Situs publik, sedikit interaksi, SEO diutamakan">

`@angular/localize`. Setiap locale adalah build terpisah dengan URL sendiri, halaman yang di-prerender sudah terkirim dalam bentuk terjemahan, dan tidak ada runtime i18n yang perlu dimuat. Biaya satu build per locale rendah ketika aplikasi sebagian besar berisi konten dan pergantian bahasa jarang terjadi. Padukan dengan tag `hreflang` yang benar, lihat [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md).

- [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard atau SaaS tempat pengguna berganti bahasa di dalam aplikasi">

Opsi runtime. Memuat ulang ke build lain menghilangkan state di memori, dan menu bahasa yang me-reload aplikasi terasa rusak. `ngx-translate` cukup untuk aplikasi kecil dengan dua atau tiga locale. Transloco adalah pilihan runtime yang lebih aman jika fiturnya lebih dari selusin, berkat scope.

</Accordion>
<Accordion header="Terjemahan berasal dari TMS atau agensi">

`@angular/localize` mengekspor XLIFF, yang dibaca semua TMS, dan teks sumber di template memberi penerjemah konteks nyata. JSON `ngx-translate` dan Transloco juga didukung luas. Pastikan vendor Anda menangani bentuk jamak ICU sebelum memilih library runtime, karena keduanya memerlukan plugin untuk itu.

</Accordion>
<Accordion header="Aplikasi besar, banyak route lazy, anggaran bundle">

Scope Transloco atau Intlayer. Keduanya menghindari pengiriman string setiap fitur ke setiap route. Bedanya ada pada penegakannya: scope Transloco adalah konvensi, sedangkan dictionary Intlayer hanya masuk bundle di tempat `useIntlayer()` mengimpornya. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [dictionary dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md).

- [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)
- [dictionary dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Type safety adalah keharusan">

Hanya Intlayer yang memberi tipe pada key secara bawaan. Dengan `ngx-translate` dan Transloco, typo pada key tetap berhasil dikompilasi dan muncul di produksi sebagai key mentah. Transloco Keys Manager bisa menangkapnya di CI, yang lebih baik daripada tidak sama sekali tetapi tidak sama dengan error kompilasi. Artikel [mendeteksi terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md) membandingkan pendekatannya.

- [mendeteksi terjemahan yang hilang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/detecting_missing_translations.md)

</Accordion>
<Accordion header="Terjemahan akan dibuat oleh AI">

Konten di samping komponen ditambah CLI yang mengisi locale yang hilang adalah jalur terpendek. [Perintah `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) milik Intlayer berjalan dengan API key Anda sendiri dan hanya menerjemahkan ulang yang berubah. Dengan katalog XLIFF atau JSON, Anda harus membuat sendiri skrip untuk alur yang sama.

- [perintah `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md)

</Accordion>
</AccordionGroup>

## Kekurangan masing-masing

- **`@angular/localize`**: satu build dan satu deployment per locale, reload saat berganti bahasa, ID ber-hash yang membuat terjemahan yatim saat teks sumber berubah, dan tidak ada cara memuat terjemahan dari CMS setelah build tanpa trik saat bootstrap.
- **`ngx-translate`**: key tanpa tipe, bentuk jamak dan ICU lewat plugin, file locale penuh di setiap halaman, pipe impure yang dievaluasi ulang pada setiap change detection, dan tidak ada penanganan `LOCALE_ID` untuk tanggal dan angka.
- **Transloco**: key tanpa tipe, ICU lewat plugin, dan scope yang merupakan konvensi, bukan jaminan. Beberapa plugin harus dirakit untuk apa yang diberikan `@angular/localize` secara native.
- **Intlayer**: builder pihak ketiga di `angular.json`, komunitas Angular yang lebih kecil daripada tiga lainnya, dukungan ICU sebagian, dan konten yang tersebar di codebase secara desain, sehingga mengekspor satu file untuk penerjemah memerlukan [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) atau CLI.

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)

## Migrasi dari ngx-translate

[Adaptor kompatibilitas `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/ngx-translate.md) menjaga `TranslateService`, pipe `translate`, dan directive `[translate]` tetap berfungsi sementara Intlayer menyajikan kontennya, sehingga template bisa dipindahkan satu per satu. [Panduan migrasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_ngx-translate_to_intlayer.md) menjelaskannya langkah demi langkah. Untuk Transloco atau `@angular/localize`, [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) dapat mempertahankan katalog JSON yang ada sebagai sumber kebenaran selama perpindahan.

- [adaptor kompatibilitas `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/ngx-translate.md)
- [panduan migrasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_ngx-translate_to_intlayer.md)
- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah ngx-translate masih dipelihara?">

Ya. Setelah bertahun-tahun minim aktivitas, proyek ini mendapat maintainer baru pada 2024 dan sejak itu merilis API standalone seperti `provideTranslateService`. Desainnya tidak berubah: JSON saat runtime, key berupa string, bentuk jamak lewat plugin.

</Question>

<Question title="ngx-translate atau Transloco untuk aplikasi Angular baru?">

Transloco, kecuali aplikasinya kecil. Ia mencakup apa yang dilakukan `ngx-translate` dan menambahkan scope, helper signal, panduan SSR, dan tooling untuk key. Kedua API cukup mirip sehingga berpindah belakangan sebagian besar bersifat mekanis, tetapi tidak ada alasan memulai dengan yang lebih sederhana jika aplikasi akan berkembang.

</Question>

<Question title="Bisakah @angular/localize berganti bahasa tanpa reload?">

Tidak sesuai desainnya. Terjemahan disisipkan saat build, jadi bahasa lain berarti build lain. Anda bisa memanggil `loadTranslations()` sebelum bootstrap untuk memuat terjemahan saat runtime, tetapi berganti bahasa tetap memerlukan restart aplikasi.

</Question>

<Question title="Opsi mana yang terbaik untuk SEO Angular?">

Library lebih tidak penting daripada routing: satu URL per locale, tag `hreflang`, `<html lang>`, dan HTML terjemahan yang dirender di server. `@angular/localize` mendapatkan semuanya hampir gratis karena setiap locale adalah build terpisah. Library runtime memerlukan SSR dan route yang dilokalkan untuk menyamainya. Lihat [internasionalisasi dan SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md).

- [internasionalisasi dan SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md)

</Question>

<Question title="Apakah Intlayer bekerja dengan Analog?">

Ya, lewat Vite. Lihat [panduan Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_analog.md).

- [panduan Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_analog.md)

</Question>

</FAQ>

## Selanjutnya

- [Menyiapkan Intlayer di Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_angular_21.md)
- [Menyiapkan Intlayer di Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_angular_19.md)
- [Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)
- [Compiler vs i18n deklaratif](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md)
- [Format pesan ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/icu_message_format.md)
- [Adaptor kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

Perbandingan yang sama untuk

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/how_to_pick_solid_i18n_library.md)
