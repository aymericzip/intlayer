---
createdAt: 2025-12-30
updatedAt: 2026-05-31
priority: 9
title: "Fastify i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Siapkan Intlayer di Fastify: deteksi locale per request dengan plugin, terjemahkan respons API dan pesan error, bertipe dari ujung ke ujung."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Tambah perintah init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Terjemahkan backend Fastify Anda menggunakan Intlayer

`fastify-intlayer` adalah plugin internasionalisasi (i18n) yang kuat untuk aplikasi Fastify, dirancang untuk membuat layanan backend Anda dapat diakses secara global dengan memberikan respons yang dilokalkan berdasarkan preferensi klien.

> Lihat [implementasi paket di GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer).

## Kasus Penggunaan Praktis

- **Menampilkan Kesalahan Backend dalam Bahasa Pengguna**: Ketika terjadi kesalahan, menampilkan pesan dalam bahasa asli pengguna meningkatkan pemahaman dan mengurangi frustrasi. Ini sangat berguna untuk pesan kesalahan dinamis yang mungkin ditampilkan di komponen front-end seperti toast atau modal.
- **Mengambil Konten Multibahasa**: Untuk aplikasi yang mengambil konten dari database, internasionalisasi memastikan bahwa Anda dapat menyajikan konten ini dalam berbagai bahasa. Ini sangat penting untuk platform seperti situs e-commerce atau sistem manajemen konten yang perlu menampilkan deskripsi produk, artikel, dan konten lainnya dalam bahasa yang disukai oleh pengguna.
- **Mengirim Email Multibahasa**: Baik itu email transaksional, kampanye pemasaran, atau pemberitahuan, mengirim email dalam bahasa penerima dapat secara signifikan meningkatkan keterlibatan dan efektivitas.
- **Pemberitahuan Push Multibahasa**: Untuk aplikasi seluler, mengirim pemberitahuan push dalam bahasa pilihan pengguna dapat meningkatkan interaksi dan retensi. Sentuhan pribadi ini dapat membuat pemberitahuan terasa lebih relevan dan dapat ditindaklanjuti.
- **Komunikasi Lainnya**: Segala bentuk komunikasi dari backend, seperti pesan SMS, peringatan sistem, atau pembaruan antarmuka pengguna, mendapat manfaat dari penggunaan bahasa pengguna, memastikan kejelasan dan meningkatkan pengalaman pengguna secara keseluruhan.

Dengan menginternasionalisasi backend, aplikasi Anda tidak hanya menghormati perbedaan budaya tetapi juga menyelaraskan lebih baik dengan kebutuhan pasar global, menjadikannya langkah kunci dalam menskalakan layanan Anda ke seluruh dunia.

## Memulai

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-fastify-template) di GitHub.

### Instalasi

Untuk mulai menggunakan `fastify-intlayer`, instal paket menggunakan npm:

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

> flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Misalnya:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### Penyiapan

Konfigurasikan pengaturan internasionalisasi dengan membuat `intlayer.config.ts` di akar proyek Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda segera setelah mereka disertakan dalam direktori `contentDir` (secara default, `./src`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

- [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)

### Penyiapan Aplikasi Fastify

Siapkan aplikasi Fastify Anda untuk menggunakan `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Muat plugin internasionalisasi
await fastify.register(intlayer);

// Rute
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Mulai server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Kompatibilitas

`fastify-intlayer` sepenuhnya kompatibel dengan:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/exports.md) untuk aplikasi React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/exports.md) untuk aplikasi Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/exports.md) untuk aplikasi Vite

Ini juga bekerja secara mulus dengan solusi internasionalisasi apa pun di berbagai lingkungan, termasuk browser dan permintaan API. Anda dapat menyesuaikan middleware untuk mendeteksi locale melalui header atau cookie:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Opsi konfigurasi lainnya
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

Secara default, `fastify-intlayer` akan menginterpretasikan header `Accept-Language` untuk menentukan bahasa yang disukai klien.

> Untuk informasi lebih lanjut tentang konfigurasi dan topik lanjutan, kunjungi [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) kami.

- [Konfigurasi Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

### Konfigurasi TypeScript

`fastify-intlayer` memanfaatkan kemampuan TypeScript yang tangguh untuk meningkatkan proses internasionalisasi. Pengetikan statis TypeScript memastikan bahwa setiap kunci terjemahan diperhitungkan, mengurangi risiko kehilangan terjemahan dan meningkatkan pemeliharaan.

Pastikan tipe yang dihasilkan secara otomatis (secara default di ./types/intlayer.d.ts) disertakan dalam file tsconfig.json Anda.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Intlayer VS Code Extension** resmi.

- [Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md).

- [dokumentasi Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari memasukkannya ke repositori Git Anda.

Untuk melakukannya, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer

```

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Fastify?">

- **Plugin Fastify untuk `i18next`**: library runtime berbasis namespace JSON.
- **`Intlayer`**: plugin `fastify-intlayer` yang dioptimalkan untuk siklus hidup Fastify, typing TypeScript lengkap, terjemahan AI, dan kamus terpadu dengan frontend.

Alasan utama untuk menginternasionalkan backend adalah karena sebagian besar teks yang dibaca pengguna tidak pernah melewati frontend: pesan kesalahan API, email transaksional, push notification, SMS, dan ekspor PDF. Hal-hal tersebut memerlukan bahasa penerima, yang diselesaikan per permintaan dan bukan per sesi.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

- [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md)

</Question>
<Question title="Berapa banyak i18n menambah ukuran bundle server Fastify saya?">

Sangat sedikit. Kamus dikompilasi lebih awal (ahead of time) dan hanya locale yang Anda deklarasikan yang disertakan, sehingga tidak ada pemuatan katalog saat boot dan tidak ada pembacaan file di jalur request. Hal ini paling penting pada deployment serverless dan edge, di mana ukuran bundle menentukan waktu cold start. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

- [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)

</Question>
<Question title="Bisakah saya bermigrasi dari `i18next` tanpa menulis ulang handler saya?">

Ya, dan ada dua jalur. Anda dapat memigrasikan konten secara bertahap dengan [panduan migrasi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md). Atau Anda dapat mempertahankan API Anda saat ini sepenuhnya: [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) menyediakan API yang persis sama dengan `i18next`, tetapi dilayani oleh kamus Intlayer, sehingga hanya import yang berubah dan kode handler tidak.

- [panduan migrasi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md)
- [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

</Question>
<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan locale dalam satu file.

- [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)
- [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md)
- [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md)

</Question>
<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file sumber Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

- [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)

Di sisi frontend dari proyek yang sama, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melangkah lebih jauh dan menghasilkan kamus saat build time dari sumber JSX, TSX, Vue, atau Svelte Anda, sehingga kedua bagian aplikasi berbagi satu lapisan konten tanpa kunci yang dikelola secara manual.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)

</Question>
<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer khusus.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: kemampuan yang sama di editor apa pun yang mendukung LSP, dengan go to definition, find all references, hover preview nilai terjemahan, autocompletion kunci dan field, serta peringatan ketika sebuah kunci tidak dideklarasikan di mana pun. Server ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`, yang membantu selama migrasi.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT, sehingga asisten menjawab dari dokumentasi terkini alih-alih menebak, dan dapat menjalankan perintah seperti `intlayer fill` sendiri.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`, ditambah satu per framework, yang mengajarkan agen konfigurasi routing Anda dan tipe node konten.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: `no-raw-text` menandai string hardcoded, dengan aturan tambahan untuk kunci kamus statis dan konten yang tidak digunakan.

</Question>
<Question title="Bagaimana Intlayer mengetahui bahasa yang digunakan untuk menjawab?">

Secara default `fastify-intlayer` membaca header `Accept-Language` dari request yang masuk dan memilih locale terdekat yang dideklarasikan, dengan fallback ke locale default Anda. Anda dapat mengubah sumbernya dengan `routing.storage`, misalnya header kustom atau cookie yang diatur oleh frontend Anda, sehingga API menjawab dalam bahasa yang benar-benar dipilih pengguna, bukan bahasa yang diiklankan oleh browsernya. Lihat [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

- [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

</Question>
<Question title="Apakah locale diisolasi per request?">

Ya. Plugin membatasi locale aktif pada request, sehingga dua request bersamaan dalam bahasa berbeda tidak pernah membaca locale satu sama lain. Itulah yang membuat `t()` dan `getIntlayer()` aman dipanggil dari sebuah service tanpa meneruskan argumen locale melalui setiap fungsi.

</Question>
<Question title="Bagaimana cara mengirim email transaksional dalam bahasa penerima?">

Deklarasikan konten email di file konten seperti konten lainnya, lalu ambil dengan `getIntlayer` untuk locale penerima yang tersimpan alih-alih locale request. Ini penting untuk job dan antrean (queue), di mana bahasa dimiliki oleh data pengguna dan tidak ada request masuk untuk dibaca header-nya.

</Question>
<Question title="Bagaimana cara melokalkan pesan error API?">

Bungkus pesan dengan `t()` di titik tempat error dibuat. Locale request yang aktif akan menyelesaikannya, sehingga klien menerima pesan yang dapat langsung ditampilkan, dan frontend Anda tidak memerlukan katalog kode error paralel.

</Question>
<Question title="Apakah ini berfungsi dengan lifecycle plugin dan enkapsulasi Fastify?">

Ya. `fastify-intlayer` didaftarkan sebagai plugin Fastify standar, sehingga mengikuti aturan enkapsulasi yang biasa. Daftarkan di root, atau di dalam scope yang membutuhkannya, sebelum route yang membaca konten.

</Question>
<Question title="Bagaimana cara menerjemahkan konten backend secara otomatis dengan AI?">

Jalankan `npx intlayer fill`, yang mengisi terjemahan yang hilang dengan LLM pilihan Anda menggunakan provider dan kunci API Anda sendiri. Tambahkan `--git-diff` untuk hanya menerjemahkan konten yang berubah di branch. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

- [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md)
- [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md)

</Question>
<Question title="Apakah Intlayer mendukung bentuk jamak, gender, dan nilai interpolasi di server?">

Ya: [bentuk jamak](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md) untuk nilai interpolasi, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md) untuk isi email, dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) untuk angka, tanggal, dan mata uang.

- [bentuk jamak](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md)
- [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md)
- [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)
- [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md)

</Question>
<Question title="Apakah saya mendapatkan autocompletion TypeScript di server?">

Ya. Intlayer menghasilkan tipe kamus Anda ke `./types/intlayer.d.ts`, sehingga kunci yang tidak ada menjadi error kompilasi, bukan string kosong saat runtime. Jalankan `npx intlayer test` di CI untuk menggagalkan build ketika sebuah locale yang dideklarasikan kekurangan konten.

</Question>
<Question title="Bisakah frontend dan backend berbagi konten yang sama?">

Ya, dan itulah pengaturan yang umum. `fastify-intlayer` bekerja bersama `react-intlayer`, `next-intlayer` dan `vite-intlayer` pada konten yang dideklarasikan yang sama, sehingga label yang digunakan baik dalam respons API maupun di halaman hanya dideklarasikan sekali. Lihat [cara kerja Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/how_works_intlayer.md).

- [cara kerja Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/how_works_intlayer.md)

</Question>
<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk untuk penggunaan komersial. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- [di-host sendiri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md)

</Question>

</FAQ>
