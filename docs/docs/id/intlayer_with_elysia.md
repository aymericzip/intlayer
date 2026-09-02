---
createdAt: 2026-08-23
updatedAt: 2026-08-24
title: "Elysia i18n - Panduan lengkap untuk menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Elysia multibahasa (i18n). Terjemahkan dengan AI agents dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Menyelaraskan panduan dengan template Elysia (typing context, setup Bun, script)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Terjemahkan website backend Elysia Anda menggunakan Intlayer | Internationalization (i18n)

`elysia-intlayer` adalah plugin internationalization (i18n) yang powerful untuk aplikasi Elysia, dirancang untuk membuat layanan backend Anda dapat diakses secara global dengan menyediakan respons yang terlokalisasi berdasarkan preferensi klien.

> Lihat [implementasi package di GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer).

### Kasus Penggunaan Praktis

- **Menampilkan Error Backend dalam Bahasa Pengguna**: Ketika terjadi kesalahan, menampilkan pesan dalam bahasa asli pengguna meningkatkan pemahaman dan mengurangi frustrasi. Ini sangat berguna untuk pesan error dinamis yang mungkin ditampilkan dalam komponen front-end seperti toasts atau modals.
- **Mengambil Konten Multibahasa**: Untuk aplikasi yang menarik konten dari database, internasionalisasi memastikan bahwa Anda dapat menyajikan konten ini dalam berbagai bahasa. Ini sangat penting untuk platform seperti situs e-commerce atau sistem manajemen konten yang perlu menampilkan deskripsi produk, artikel, dan konten lainnya dalam bahasa yang disukai pengguna.
- **Mengirim Email Multibahasa**: Baik itu email transaksional, kampanye pemasaran, atau notifikasi, mengirim email dalam bahasa penerima dapat meningkatkan engagement dan efektivitas secara signifikan.
- **Notifikasi Push Multibahasa**: Untuk aplikasi mobile, mengirim notifikasi push dalam bahasa pilihan pengguna dapat meningkatkan interaksi dan retensi. Sentuhan personal ini dapat membuat notifikasi terasa lebih relevan dan dapat ditindaklanjuti.
- **Komunikasi Lainnya**: Segala bentuk komunikasi dari backend, seperti pesan SMS, alert sistem, atau pembaruan antarmuka pengguna, mendapat manfaat dari penggunaan bahasa pengguna, memastikan kejelasan dan meningkatkan pengalaman pengguna secara keseluruhan.

Dengan menginternasionalisasi backend, aplikasi Anda tidak hanya menghormati perbedaan budaya tetapi juga selaras lebih baik dengan kebutuhan pasar global, menjadikannya langkah kunci dalam menskalakan layanan Anda di seluruh dunia.

## Memulai

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-elysia-template) di GitHub.

### Instalasi

Untuk mulai menggunakan `elysia-intlayer`, instal paket menggunakan npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Contohnya:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> Elysia menargetkan runtime **Bun**. `elysia-intlayer` mengandalkan `AsyncLocalStorage` (alih-alih library `cls-hooked` yang dipakai plugin Intlayer berbasis Node) justru karena Bun tidak mengimplementasikan `async_hooks.createHook`.

### Penyiapan

Konfigurasikan pengaturan internasionalisasi dengan membuat `intlayer.config.ts` di root proyek Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Locale default yang dipakai sebagai fallback jika locale yang diminta tidak ditemukan.
     */
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
      id: "Contoh konten yang dikembalikan dalam bahasa Indonesia",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
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
        "id": "Contoh konten yang dikembalikan dalam bahasa Indonesia",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama disertakan dalam direktori `contentDir` (secara default, `./src`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Pengaturan Aplikasi Elysia

Atur aplikasi Elysia Anda untuk menggunakan `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Muat plugin internasionalisasi
  .use(intlayer())
  // Routes
  .get("/", ({ intlayer }) => ({
    // Locale yang digunakan untuk permintaan ini, `Accept-Language` dinegosiasikan atau dibaca dari penyimpanan
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      id: "Halo",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Plugin mendaftarkan context-nya melalui `derive` **global**, yang oleh Elysia diberi tipe `Partial<{ intlayer: IntlayerContext }>`. Nilainya selalu ada saat runtime untuk route yang didaftarkan setelah `.use(intlayer())`, jadi gunakan non-null assertion (`intlayer!.locale`) — atau optional chaining — agar TypeScript pada mode `strict` puas.

Context route menyediakan:

| Properti          | Deskripsi                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `locale`          | Locale yang digunakan untuk request ini, dengan `locale_storage` lebih diprioritaskan daripada `locale_detected`. |
| `locale_storage`  | Locale yang diminta secara eksplisit oleh klien melalui cookie atau header.                                       |
| `locale_detected` | Locale yang dinegosiasikan dari header request.                                                                   |
| `defaultLocale`   | Locale yang dikonfigurasi sebagai fallback di `intlayer.config.ts`.                                               |
| `t`               | Sebuah fungsi terjemahan.                                                                                         |
| `getIntlayer`     | Fungsi untuk mengambil dictionary berdasarkan key.                                                                |
| `getDictionary`   | Fungsi untuk memproses objek dictionary.                                                                          |

Helper yang sama juga diekspor secara standalone. Mereka menyelesaikan request saat ini melalui `AsyncLocalStorage`, sehingga Anda bisa memanggilnya tanpa melakukan destructuring pada context:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      id: "Contoh konten yang dikembalikan dalam bahasa Indonesia",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> Konteks request dilepaskan setelah response dipetakan, sehingga helper mandiri tidak pernah diselesaikan terhadap request yang sudah berakhir. Ketika dipanggil di luar request yang ditangani plugin, keduanya beralih ke locale default yang dikonfigurasi.

### Menjalankan Aplikasi Anda

Tambahkan script Intlayer ke `package.json` Anda. `intlayer build` mengompilasi deklarasi konten Anda ke direktori `.intlayer` dan menghasilkan tipe TypeScript:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Lalu jalankan server:

```bash
bun run dev
```

Uji negosiasi locale dengan `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` tidak wajib dijalankan sebelum `bun run src/index.ts`: plugin juga menyiapkan dictionary saat aplikasi Elysia melakukan boot. Menjalankannya lebih dulu membuat tipe yang dihasilkan tetap sinkron untuk editor Anda dan menghindari biaya build pada request pertama.

### Kompatibilitas

`elysia-intlayer` sepenuhnya kompatibel dengan:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/index.md) untuk aplikasi React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md) untuk aplikasi Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/index.md) untuk aplikasi Vite

Ini juga bekerja dengan mulus dengan solusi internasionalisasi apa pun di berbagai lingkungan, termasuk browser dan permintaan API.

Secara default, plugin menyelesaikan locale dengan urutan berikut:

1. Cookie `INTLAYER_LOCALE`.
2. Header `x-intlayer-locale`.
3. Negosiasi header `Accept-Language`.

Anda dapat menyesuaikan cookie dan header yang dipakai untuk deteksi locale:

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

> Untuk informasi lebih lanjut tentang konfigurasi dan topik lanjutan, kunjungi [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) kami.

### Konfigurasi TypeScript

`elysia-intlayer` memanfaatkan kemampuan robust TypeScript untuk meningkatkan proses internasionalisasi. Pengetikan statis TypeScript memastikan bahwa setiap kunci terjemahan diperhitungkan, mengurangi risiko terjemahan yang hilang dan meningkatkan maintainability.

Pastikan tipe yang dihasilkan secara otomatis (secara default di ./types/intlayer.d.ts) disertakan dalam file tsconfig.json Anda.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript yang ada
  "include": [
    // ... Konfigurasi TypeScript yang ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Intlayer VS Code Extension** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan real-time** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda menghindari commit mereka ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Elysia?">

- **Kamus dasar**: tanpa typing atau tooling.
- **`Intlayer`**: dioptimalkan khusus untuk Bun dan Elysia, kompilasi build time, tipe TypeScript ketat, dan performa tinggi.

Alasan utama untuk menginternasionalkan backend adalah karena sebagian besar teks yang dibaca pengguna tidak pernah melewati frontend: pesan kesalahan API, email transaksional, push notification, SMS, dan ekspor PDF. Hal-hal tersebut memerlukan bahasa penerima, yang diselesaikan per permintaan dan bukan per sesi.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle server Elysia saya?">

Jauh lebih sedikit daripada katalog JSON konvensional. Kompiler Intlayer mengoptimalkan kamus saat build time dan tidak mengurai ulang kamus pada setiap request, menjaga jejak memori dan waktu cold start tetap minimal. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

</Question>

<Question title="Bisakah saya bermigrasi dari library i18n lainnya tanpa menulis ulang handler saya?">

Ya, menggunakan panduan migrasi dan plugin sinkronisasi JSON.

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

Untuk proses otomatis penuh, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time dan menghasilkan kamus pada setiap perubahan.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci ke file konten, ekstrak string, dan jalankan build, fill, test, push dan pull dari command palette.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: go to definition, hover preview nilai terjemahan, dan autocompletion kunci di editor apa pun yang mendukung LSP. Juga menangani panggilan `i18next`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Bagaimana bahasa klien dideteksi pada request yang masuk?">

Plugin Elysia membaca header dan cookie pada fase `onRequest` atau `derive`, menyuntikkan locale ke `context.locale`.

</Question>

<Question title="Bisakah deklarasi konten yang sama melayani respons API dan frontend web saya?">

Ya, dalam monorepo atau paket bersama, ini adalah keunggulan utama. Kamus yang dideklarasikan dapat diimpor di backend (email, error, respons API) dan frontend (React, Vue, Svelte, dll.), menjaga satu sumber kebenaran untuk semua teks.

</Question>

<Question title="Apakah Intlayer memperlambat penanganan request?">

Tidak. Deteksi bahasa dilakukan dalam middleware yang sangat ringan (membaca cookie, query, atau Accept-Language). Kamus telah dikompilasi saat build time dan berada di memori, sehingga tidak ada pembacaan disk atau penguraian template saat request masuk.

</Question>

<Question title="Bagaimana cara melokalisasi respons kesalahan, email, dan push notification?">

Dengan memanggil fungsi `getIntlayer` atau `t()` berdasarkan locale request. Jika bahasa pengguna disimpan di database, fungsi dapat dipanggil dengan locale target secara eksplisit untuk background job di luar request.

</Question>

<Question title="Apakah Intlayer sepenuhnya kompatibel dengan runtime Bun?">

Ya. Intlayer berjalan secara native di Bun, memanfaatkan kecepatan pemuatan modul dan eksekusi langsung TypeScript.

</Question>

<Question title="Bisakah saya menggunakan pesan kesalahan terlokalisasi dalam skema TypeBox Elysia?">

Ya. Pada hook `onError`, Anda dapat menangkap error validasi skema dan mengembalikan respons terlokalisasi via Intlayer.

</Question>

<Question title="Bagaimana cara mengelola routing berdasarkan locale di URL?">

Menggunakan parameter path `/:locale/` di rute dan mengembalikan 404 untuk bahasa yang tidak dikenal.

</Question>

<Question title="Bagaimana cara menerjemahkan aplikasi secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. Perintah ini mengisi terjemahan yang hilang menggunakan LLM pilihan Anda dengan provider dan API key Anda sendiri, dan `--git-diff` membatasi proses ke file yang diubah. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

</Question>

<Question title="Apakah Intlayer mendukung bentuk jamak, gender dan rich text?">

Ya: [bentuk jamak (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [penyisipan (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md), dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md).

</Question>

<Question title="Bagaimana rekan tim non-teknis dapat mengedit template email dan pesan kesalahan tanpa menyentuh kode?">

Dua opsi tersedia: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), yang memisahkan konten dari codebase dan memungkinkan pengeditan teks melalui web, atau [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), yang menyimpan perubahan langsung ke file kode lokal.

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
