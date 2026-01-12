---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Per-Komponen vs. i18n Terpusat: Pendekatan Baru dengan Intlayer
description: Tinjauan mendalam tentang strategi internasionalisasi di React, membandingkan pendekatan terpusat, per-key, dan per-komponen, serta memperkenalkan Intlayer.
keywords:
  - i18n
  - React
  - Internasionalisasi
  - Intlayer
  - Optimisasi
  - Ukuran Bundle
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# Per-Komponen vs. i18n Terpusat

Pendekatan per-komponen bukanlah konsep baru. Misalnya, dalam ekosistem Vue, `vue-i18n` mendukung [i18n SFC (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html). Nuxt juga menawarkan [terjemahan per-komponen](https://i18n.nuxtjs.org/docs/guide/per-component-translations), dan Angular menggunakan pola serupa melalui [Feature Modules](https://v17.angular.io/guide/feature-modules)-nya.

Bahkan dalam aplikasi Flutter, kita sering menemukan pola ini:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- Terjemahan berada di sini
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

Namun, di dunia React, kita terutama melihat pendekatan yang berbeda, yang akan saya kelompokkan menjadi tiga kategori:

<Columns>
  <Column>

**Pendekatan terpusat** (i18next, next-intl, react-intl, lingui)

- (with no namespaces) menganggap satu sumber untuk mengambil konten. Secara default, Anda memuat konten dari semua halaman ketika aplikasi Anda dimuat.

  </Column>
  <Column>

**Pendekatan granular** (intlayer, inlang)

- pengambilan konten dilakukan secara granular per key, atau per-komponen.

  </Column>
</Columns>

> Dalam blog ini, saya tidak akan fokus pada solusi berbasis compiler, yang sudah saya bahas di sini: [Compiler vs Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/compiler_vs_declarative_i18n.md).
> Perlu dicatat bahwa i18n berbasis compiler (mis. Lingui) hanya mengotomatisasi ekstraksi dan pemuatan konten. Di balik layar, mereka sering berbagi batasan yang sama dengan pendekatan lainnya.

> Perlu dicatat bahwa semakin Anda memperinci cara mengambil konten, semakin besar risiko Anda memasukkan state dan logika tambahan ke dalam komponen Anda.

Pendekatan granular lebih fleksibel daripada yang terpusat, tetapi sering kali merupakan tradeoff. Bahkan jika "tree shaking" diiklankan oleh perpustakaan tersebut, dalam praktiknya Anda sering kali akan berakhir memuat sebuah halaman dalam setiap bahasa.

Jadi, secara garis besar, keputusan dibagi seperti ini:

- Jika aplikasi Anda memiliki lebih banyak halaman daripada bahasa, Anda sebaiknya memilih pendekatan granular.
- Jika Anda memiliki lebih banyak bahasa daripada halaman, Anda sebaiknya condong ke pendekatan terpusat.

Tentu saja, penulis pustaka menyadari keterbatasan ini dan menyediakan solusi.
Di antaranya: memecah menjadi namespaces, memuat file JSON secara dinamis (`await import()`), atau menghapus konten saat build.

Pada saat yang sama, Anda harus tahu bahwa ketika Anda memuat konten secara dinamis, Anda memperkenalkan permintaan tambahan ke server Anda. Setiap `useState` atau hook tambahan berarti permintaan server tambahan.

> Untuk mengatasi hal ini, Intlayer menyarankan mengelompokkan beberapa definisi konten di bawah kunci yang sama, Intlayer kemudian akan menggabungkan konten tersebut.

Tetapi dari semua solusi tersebut, jelas bahwa pendekatan terpusat adalah yang paling populer.

### Jadi mengapa pendekatan terpusat begitu populer?

- Pertama, i18next adalah solusi pertama yang menjadi banyak digunakan, mengikuti filosofi yang terinspirasi dari arsitektur PHP dan Java (MVC), yang mengandalkan pemisahan tanggung jawab yang ketat (memisahkan konten dari kode). Ia hadir pada 2011, menetapkan standarnya bahkan sebelum pergeseran besar menuju Arsitektur Berbasis Komponen (seperti React).
- Kemudian, setelah sebuah library banyak diadopsi, menjadi sulit menggeser ekosistem ke pola lain.
- Menggunakan pendekatan terpusat juga mempermudah penggunaan Translation Management Systems seperti Crowdin, Phrase, atau Localized.
- Logika di balik pendekatan per-komponen lebih kompleks daripada yang terpusat dan membutuhkan waktu pengembangan ekstra, terutama saat Anda harus memecahkan masalah seperti mengidentifikasi di mana konten berada.

### Oke, tapi kenapa tidak tetap berpegang pada pendekatan Terpusat?

Biarkan saya jelaskan mengapa ini bisa menjadi masalah untuk aplikasi Anda:

- **Data yang Tidak Digunakan:**
  Saat sebuah halaman dimuat, Anda sering memuat konten dari semua halaman lain. (Di aplikasi 10-halaman, itu berarti 90% konten yang dimuat tidak digunakan). Anda memuat modal secara lazy? Library i18n tidak peduli, ia tetap memuat string terlebih dahulu.
- **Performa:**
  Untuk setiap re-render, setiap komponen Anda di-hydrate dengan payload JSON besar, yang memengaruhi reaktivitas aplikasi Anda seiring pertumbuhannya.
- **Pemeliharaan:**
  Memelihara file JSON besar itu merepotkan. Anda harus loncat antar file untuk memasukkan terjemahan, memastikan tidak ada terjemahan yang hilang dan tidak ada **orphan keys** yang tertinggal.
- **Sistem desain:**
  Ini menciptakan ketidakcocokan dengan design systems (misalnya, komponen `LoginForm`) dan membatasi duplikasi komponen antar aplikasi.

**"Tapi kami menciptakan Namespaces!"**

Tentu, dan itu merupakan langkah maju yang besar. Mari lihat perbandingan ukuran bundle utama dari setup Vite + React + React Router v7 + Intlayer. Kami mensimulasikan aplikasi 20-halaman.

Contoh pertama tidak memasukkan terjemahan yang dimuat secara lazy per locale dan tidak ada pemecahan namespace. Yang kedua mencakup pembersihan konten + pemuatan dinamis untuk terjemahan.

| Bundle dioptimalkan                                                                                                           | Bundle tidak dioptimalkan                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ![bundle tidak teroptimasi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![bundle yang teroptimasi](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Jadi berkat namespaces, kita berpindah dari struktur ini:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

Menjadi struktur ini:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Sekarang Anda harus mengelola secara rinci bagian mana dari konten aplikasi Anda yang harus dimuat, dan di mana. Kesimpulannya, sebagian besar proyek justru melewatkan bagian ini karena kompleksitasnya (lihat [panduan next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-i18next.md) misalnya untuk melihat tantangan yang muncul hanya dengan mengikuti praktik yang baik).
Akibatnya, proyek-proyek tersebut berakhir dengan masalah pemuatan JSON besar-besaran yang dijelaskan sebelumnya.

> Perlu dicatat bahwa masalah ini bukan spesifik untuk i18next, melainkan untuk semua pendekatan terpusat yang disebutkan di atas.

Namun, saya ingin mengingatkan Anda bahwa tidak semua pendekatan granular menyelesaikan hal ini. Misalnya, pendekatan `vue-i18n SFC` atau `inlang` tidak secara inheren melakukan lazy load terjemahan per-locale, sehingga Anda hanya menukar masalah ukuran bundle dengan masalah lain.

Selain itu, tanpa separation of concerns yang tepat, akan jauh lebih sulit untuk mengekstrak dan menyediakan terjemahan Anda kepada penerjemah untuk ditinjau.

### Bagaimana pendekatan per-komponen Intlayer menyelesaikan ini

Intlayer melakukan beberapa langkah:

1. **Deklarasi:** Deklarasikan konten Anda di mana saja dalam codebase Anda menggunakan file `*.content.{ts|jsx|cjs|json|json5|...}`. Ini memastikan separation of concerns sambil menjaga konten tetap ditempatkan bersama. Sebuah file konten bisa per-locale atau multibahasa.
2. **Pemrosesan:** Intlayer menjalankan langkah build untuk memproses logika JS, menangani fallback terjemahan yang hilang, menghasilkan tipe TypeScript, mengelola konten duplikat, mengambil konten dari CMS Anda, dan lainnya.
3. **Pembersihan:** Ketika aplikasi Anda dibangun, Intlayer membersihkan konten yang tidak terpakai (sedikit mirip dengan bagaimana Tailwind mengelola kelas Anda) dengan mengganti konten sebagai berikut:

**Deklarasi:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**Pemrosesan:** Intlayer membangun kamus berdasarkan file `.content` dan menghasilkan:

```json5
// .intlayer/dynamic_dictionary/id/my-key.json
{
  "key": "my-key",
  "content": { "title": "Judul saya" },
}
```

**Penggantian:** Intlayer mengubah komponen Anda selama proses build aplikasi.

**- Mode Impor Statis:**

```tsx
// Representasi komponen dalam sintaks mirip JSX
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        id: { title: "Judul saya" },
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Mode Impor Dinamis:**

```tsx
// Representasi komponen dalam sintaks mirip JSX
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // Sama untuk bahasa lain
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` menggunakan mekanisme mirip Suspense untuk memuat JSON terlokalisasi hanya saat dibutuhkan.

**Manfaat utama dari pendekatan per-komponen ini:**

- Menjaga deklarasi konten Anda dekat dengan komponen memungkinkan pemeliharaan yang lebih baik (mis. memindahkan sebuah komponen ke aplikasi atau design system lain. Menghapus folder komponen akan menghapus konten terkait juga, seperti yang mungkin sudah Anda lakukan untuk berkas `.test`, `.stories`)

/// Pendekatan per-komponen mencegah agen AI perlu melompat ke semua berkas Anda yang berbeda. Pendekatan ini memperlakukan semua terjemahan di satu tempat, membatasi kompleksitas tugas dan jumlah token yang digunakan.

### Keterbatasan

Tentu saja, pendekatan ini datang dengan trade-offs:

- Lebih sulit untuk terhubung ke sistem l10n lain dan tooling tambahan.
- Anda menjadi terkunci (yang pada dasarnya sudah terjadi dengan solusi i18n manapun karena sintaks spesifik mereka).

Itulah alasan mengapa Intlayer berusaha menyediakan rangkaian alat lengkap untuk i18n (100% gratis dan OSS), termasuk terjemahan AI menggunakan AI Provider dan API keys milik Anda. Intlayer juga menyediakan tooling untuk menyinkronkan JSON Anda, berfungsi seperti formatter pesan ICU / vue-i18n / i18next untuk memetakan konten ke format spesifik mereka.
