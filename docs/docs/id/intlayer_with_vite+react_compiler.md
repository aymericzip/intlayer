---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite dan React i18n - Ubah aplikasi yang ada menjadi aplikasi multibahasa (panduan i18n 2026)
description: Temukan cara membuat aplikasi Vite dan React Anda yang sudah ada menjadi multibahasa menggunakan Intlayer Compiler. Ikuti dokumentasi untuk menginternasionalisasi (i18n) dan menerjemahkannya dengan AI.
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
  - lingkungan
  - vite-dan-react
  - kompilator
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Rilis awal
---

# Cara membuat multibahasa (i18n) pada aplikasi Vite dan React yang sudah ada setelahnya (panduan i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Solusi i18n terbaik untuk Vite dan React? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-vite-react-template) di GitHub.

## Daftar Isi

<TOC/>

## Mengapa sulit untuk menginternasionalisasi aplikasi yang sudah ada?

Jika Anda pernah mencoba menambahkan banyak bahasa ke aplikasi yang dibuat hanya untuk satu bahasa, Anda pasti tahu betapa sulitnya itu. Bukan hanya "sulit"—tetapi membosankan. Anda harus menyisir setiap file, memburu setiap untaian teks, dan memindahkannya ke file kamus terpisah.

Kemudian datanglah bagian yang berisiko: mengganti semua teks tersebut dengan hook kode tanpa merusak tata letak atau logika Anda. Ini adalah jenis pekerjaan yang menghentikan pengembangan fitur baru selama berminggu-minggu dan terasa seperti refactoring tanpa akhir.

## Apa itu Intlayer Compiler?

**Intlayer Compiler** dibuat untuk melewati pekerjaan manual yang membosankan itu. Alih-alih Anda mengekstrak string secara manual, kompilator melakukannya untuk Anda. Ia memindai kode Anda, menemukan teks, dan menggunakan AI untuk menghasilkan kamus di balik layar.
Kemudian, ia memodifikasi kode Anda selama proses build untuk menyuntikkan hook i18n yang diperlukan. Pada dasarnya, Anda terus menulis aplikasi seolah-olah hanya satu bahasa, dan kompilator menangani transformasi multibahasa secara otomatis.

> Dok Kompilator: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md)

### Batasan

Karena kompilator melakukan analisis dan transformasi kode (memasukkan hook dan menghasilkan kamus) pada **waktu kompilasi**, hal ini dapat **memperlambat proses build** aplikasi Anda.

Untuk mengurangi dampak ini selama pengembangan, Anda dapat mengonfigurasi kompilator agar berjalan dalam mode [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) atau menonaktifkannya saat tidak diperlukan.

---

## Panduan Langkah-demi-Langkah untuk Menyiapkan Intlayer dalam Aplikasi Vite dan React

### Langkah 1: Instal Dependensi

Instal paket-paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi React. Ini menyediakan penyedia konteks dan hook untuk internasionalisasi React.

- **vite-intlayer**
  Termasuk plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi lokal pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 2: Konfigurasi Proyek Anda

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.INDONESIAN, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // Dapat diatur ke 'build-only' untuk membatasi dampak pada mode dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Tidak ada awalan comp-
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

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Vite Anda

Tambahkan plugin intlayer ke dalam konfigurasi Anda.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Ini memastikan pembangunan file deklarasi konten dan memantaunya dalam mode pengembangan. Ini mendefinisikan variabel lingkungan Intlayer dalam aplikasi Vite. Selain itu, ia menyediakan alias untuk mengoptimalkan kinerja.

> Plugin Vite `intlayerCompiler()` digunakan untuk mengekstrak konten dari komponen dan menulis file `.content`.

### Langkah 4: Kompilasi kode Anda

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

### (Opsional) Langkah 6: Ubah bahasa konten Anda

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
