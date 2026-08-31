---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Vite + React multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Vite
  - React
  - Kompilator
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Rilis awal"
author: aymericzip
---

# Cara membuat multibahasa (i18n) pada aplikasi Vite dan React yang sudah ada setelahnya (panduan i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Solusi i18n terbaik untuk Vite dan React? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-vite-react-template) di GitHub.

## Daftar Isi

<TOC/>

## Mengapa sulit untuk menginternasionalisasi aplikasi yang sudah ada?

Jika Anda pernah mencoba menambahkan banyak bahasa ke aplikasi yang dibuat hanya untuk satu bahasa, Anda pasti tahu betapa sulitnya itu. Bukan hanya "sulit", tetapi membosankan. Anda harus menyisir setiap file, memburu setiap untaian teks, dan memindahkannya ke file kamus terpisah.

Kemudian datanglah bagian yang berisiko: mengganti semua teks tersebut dengan hook kode tanpa merusak tata letak atau logika Anda. Ini adalah jenis pekerjaan yang menghentikan pengembangan fitur baru selama berminggu-minggu dan terasa seperti refactoring tanpa akhir.

## Apa itu Intlayer Compiler?

**Intlayer Compiler** dibuat untuk melewati pekerjaan manual yang membosankan itu. Alih-alih Anda mengekstrak string secara manual, kompilator melakukannya untuk Anda. Ia memindai kode Anda, menemukan teks, dan menggunakan AI untuk menghasilkan kamus di balik layar.
Kemudian, ia memodifikasi kode Anda selama proses build untuk menyuntikkan hook i18n yang diperlukan. Pada dasarnya, Anda terus menulis aplikasi seolah-olah hanya satu bahasa, dan kompilator menangani transformasi multibahasa secara otomatis.

> Dok Kompilator: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)

### Batasan

Karena kompilator melakukan analisis dan transformasi kode (memasukkan hook dan menghasilkan kamus) pada **waktu kompilasi**, hal ini dapat **memperlambat proses build** aplikasi Anda.

Untuk mengurangi dampak ini selama pengembangan, Anda dapat mengonfigurasi kompilator agar berjalan dalam mode [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) atau menonaktifkannya saat tidak diperlukan.

---

## Panduan Langkah-demi-Langkah untuk Menyiapkan Intlayer dalam Aplikasi Vite dan React

<Steps>

<Step number={1} title="Instal Dependensi">

Instal paket-paket yang diperlukan menggunakan npm:

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

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Misalnya:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi React. Ini menyediakan penyedia konteks dan hook untuk internasionalisasi React.

- **vite-intlayer**
  Termasuk plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi lokal pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

</Step>

<Step number={2} title="Konfigurasi Proyek Anda">

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.INDONESIAN, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Menunjukkan apakah kompiler harus diaktifkan.
     */
    enabled: true,

    /**
     * Direktori output untuk kamus yang dioptimalkan.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Masukkan konten saja dalam file yang dihasilkan, tanpa kunci.
     */
    noMetadata: false,

    /**
     * Awalan kunci kamus
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Menunjukkan apakah komponen harus disimpan setelah ditransformasi.
     * Dengan begitu, kompiler hanya perlu dijalankan sekali untuk mentransformasi aplikasi, lalu dapat dihapus.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Aplikasi ini adalah aplikasi peta", // Catatan: Anda dapat menyesuaikan deskripsi aplikasi ini
  },
};

export default config;
```

> **Catatan**: Pastikan Anda telah mengatur `OPEN_AI_API_KEY` di variabel lingkungan Anda.

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Integrasikan Intlayer dalam Konfigurasi Vite Anda">

Tambahkan plugin intlayer ke dalam konfigurasi Anda.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Ini memastikan pembangunan file deklarasi konten dan memantaunya dalam mode pengembangan. Ini mendefinisikan variabel lingkungan Intlayer dalam aplikasi Vite. Selain itu, ia menyediakan alias untuk mengoptimalkan kinerja.

> Plugin Vite `intlayerCompiler()` digunakan untuk mengekstrak konten dari komponen dan menulis file `.content`.

> Sejak Intlayer v9, compiler digabungkan langsung ke dalam plugin `intlayer()` dan diaktifkan secara otomatis setelah `compiler.enabled` diatur dengan path `compiler.output`. Mendaftarkan `intlayerCompiler()` secara terpisah seperti yang ditunjukkan di bawah ini sekarang bersifat opsional — ini akan menghilangkan duplikat jika juga ditambahkan. Lihat [catatan rilis v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/releases/v9.md).

</Step>

<Step number={4} title="Kompilasi kode Anda">

Cukup tulis komponen Anda dengan string yang dikodekan secara keras dalam lokal default Anda. Kompilator menangani sisanya.

Contoh bagaimana tampilan halaman Anda mungkin terlihat:

<Tabs>
 <Tab value="Kode">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Output">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      id: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "hitungan adalah",
        editMessage: "Ubah",
        hmrMessage: "dan simpan untuk menguji HMR",
        readTheDocs: "Klik pada logo Vite dan React untuk mempelajari lebih lanjut",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** digunakan untuk menyediakan lokal ke komponen bersarang.

</Step>

<Step number={6} title="Ubah bahasa konten Anda" isOptional={true}>

Untuk mengubah bahasa konten Anda, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini memungkinkan Anda untuk mengatur lokal aplikasi dan memperbarui konten yang sesuai.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Ubah Bahasa ke Inggris
    </button>
  );
};
```

> Untuk mempelajari lebih lanjut tentang hook `useLocale`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Isi terjemahan yang hilang" isOptional={true}>

Intlayer menyediakan alat CLI untuk membantu Anda mengisi terjemahan yang hilang. Anda dapat menggunakan perintah `intlayer` untuk menguji dan mengisi terjemahan yang hilang dari kode Anda.

```bash packageManager="npm"
npx intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash packageManager="yarn"
yarn intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash packageManager="pnpm"
pnpm intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash packageManager="bun"
bun x intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash packageManager="npm"
npx intlayer fill         # Isi terjemahan yang hilang
```

```bash packageManager="yarn"
yarn intlayer fill         # Isi terjemahan yang hilang
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Isi terjemahan yang hilang
```

```bash packageManager="bun"
bun x intlayer fill         # Isi terjemahan yang hilang
```

> Untuk detail lebih lanjut, silakan merujuk ke [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/ci.md)
> </Step>

</Steps>

### (Opsional) Sitemap dan robots.txt (generate saat build)

Intlayer menyediakan `generateSitemap` dan `getMultilingualUrls` untuk memformat `sitemap.xml` multibahasa dan `robots.txt` yang siap untuk crawler, lalu menulisnya secara otomatis ke `public/`. Biasanya skrip Node kecil dijalankan **sebelum** Vite (misalnya hook npm `predev` / `prebuild`).

#### Sitemap

Generator sitemap Intlayer menghormati konfigurasi locale dan menambahkan metadata untuk crawler.

> Sitemap mendukung namespace `xhtml:link` (hreflang). Alih-alih hanya daftar URL datar, Intlayer menghubungkan semua varian bahasa setiap halaman secara dua arah (mis. `/about`, `/fr/about`, atau `/about?lang=fr` tergantung mode routing).

#### Robots.txt

Gunakan `getMultilingualUrls` agar aturan `Disallow` mencakup semua varian URL jalur sensitif.

#### 1. Buat `generate-seo.mjs` di root proyek

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Paket `intlayer` harus terpasang. Setel `SITE_URL` di lingkungan produksi (misalnya di CI).

> Disarankan `generate-seo.mjs` untuk ESM Node. Jika memakai `generate-seo.js`, pastikan `"type": "module"` di `package.json` atau aktifkan ESM lainnya.

#### 2. Jalankan skrip sebelum Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Sesuaikan perintah jika memakai pnpm atau yarn. Skrip juga bisa dipanggil dari CI.

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari memasukkannya ke dalam repositori Git Anda.

Untuk melakukannya, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi Intlayer VS Code** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau sebaris** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Ekstensi Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Vite dan React?">

- **`react-i18next`**: pemuatan JSON di runtime.
- **`react-intl`**: format ICU.
- **`Intlayer`**: ekstraksi teks otomatis saat build time, dukungan HMR, tipe TypeScript lengkap, dan terjemahan AI.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle Vite saya?">

Kompiler hanya menyertakan string yang benar-benar digunakan komponen, menjaga ukuran kode tetap minimal. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

</Question>

<Question title="Bisakah saya bermigrasi dari react-i18next atau react-intl tanpa menulis ulang komponen saya?">

Ya, melalui adapter kompatibilitas atau mengaktifkan compiler langsung pada kode yang ada.

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file sumber Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

Untuk proses otomatis penuh, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time pada kode JSX, TSX, Vue dan Svelte, menghasilkan kamus pada setiap perubahan tanpa perlu memelihara kunci secara manual. Karena bekerja melalui analisis statis, string yang hanya ada di runtime tetap berada di luar jangkauannya.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: pengalaman yang sama di editor mana pun yang mendukung LSP, dengan go to definition, hover preview dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan. Ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Haruskah saya menggunakan compiler atau mendeklarasikan konten sendiri?">

Untuk pengembangan cepat, compiler sangat ideal. Untuk bentuk jamak yang kompleks atau logika khusus, file konten eksplisit memberikan kontrol yang lebih baik.

</Question>

<Question title="Apa yang terjadi pada string yang tidak dapat dilihat compiler?">

String dinamis yang dibuat saat runtime dapat ditangani menggunakan `t()` atau file `.content` standar.

</Question>

<Question title="Bagaimana compiler memutuskan apa yang merupakan teks pengguna?">

Compiler menargetkan node teks JSX dan atribut umum seperti `aria-label` atau `placeholder`, menyaring class CSS dan identifier sistem.

</Question>

<Question title="Bagaimana cara mengisi terjemahan yang hilang?">

Langkah 7 membahas hal ini. Perintah `npx intlayer fill` mengirimkan konten yang diekstrak ke LLM pilihan Anda, dan `--git-diff` membatasi perubahan ke branch saat ini.

</Question>

<Question title="Bagaimana cara mengubah bahasa saat runtime?">

Langkah 6 membahas hal ini. Hook `useLocale` menyediakan bahasa aktif, daftar bahasa, dan setter; komponen me-render ulang dalam bahasa baru tanpa me-reload halaman.

</Question>

<Question title="Apakah Intlayer mendukung bentuk jamak, gender dan rich text?">

Ya: [bentuk jamak (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [penyisipan (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md), dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) untuk angka, tanggal, dan mata uang.

</Question>

<Question title="Bagaimana penerjemah dapat mengedit konten tanpa menyentuh kode?">

Melalui [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), yang memungkinkan siapa saja mengedit teks langsung di aplikasi yang berjalan, atau melalui [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), yang memisahkan konten sehingga dapat diubah tanpa perlu redeploy kode.

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
