---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - Cara menerjemahkan aplikasi Vanilla JS pada tahun 2026
description: Temukan cara membuat situs web Vite dan Vanilla JS Anda multibahasa. Ikuti dokumentasi untuk internasionalisasi (i18n) dan terjemahannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Terjemahkan situs web Vite dan Vanilla JS Anda dengan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) sumber terbuka dan inovatif yang dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata, rute, dan konten secara dinamis**.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan pelengkapan otomatis dan deteksi kesalahan.
- **Memanfaatkan fitur-fitur canggih**, seperti deteksi dan pengalihan lokal dinamis.

---

## Panduan Langkah-demi-Langkah untuk Menyiapkan Intlayer dalam Aplikasi Vite dan Vanilla JS

### Langkah 1: Instal Dependensi

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **vanilla-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi JavaScript / TypeScript murni. Paket ini menyediakan pub/sub singleton (`IntlayerClient`) dan pembantu berbasis callback (`useIntlayer`, `useLocale`, dll.) sehingga bagian mana pun dari aplikasi Anda dapat bereaksi terhadap perubahan lokal tanpa bergantung pada kerangka kerja UI.

- **vite-intlayer**
  Menyertakan plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi lokal pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 2: Konfigurasi Proyek Anda

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Lokal lainnya
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Lokal lainnya
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Lokal lainnya
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer ke dalam Konfigurasi Vite Anda

Tambahkan plugin intlayer ke konfigurasi Anda.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Plugin ini memastikan pembuatan file deklarasi konten dan memantaunya dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Vite. Selain itu, plugin ini menyediakan alias untuk mengoptimalkan kinerja.

### Langkah 4: Bootstrap Intlayer di Titik Masuk Anda

Panggil `installIntlayer()` **sebelum** merender konten apa pun sehingga singleton lokal global siap digunakan.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// Harus dipanggil sebelum merender konten i18n apa pun.
installIntlayer();

// Impor dan jalankan modul aplikasi Anda.
import "./app.js";
```

Jika Anda juga menggunakan deklarasi konten `md()` (Markdown), instal juga perender markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

### Langkah 5: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Klik pada logo Vite untuk mempelajari lebih lanjut",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Klik pada logo Vite untuk mempelajari lebih lanjut",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Klik pada logo Vite untuk mempelajari lebih lanjut",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Klik pada logo Vite untuk mempelajari lebih lanjut"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat ditentukan di mana saja di aplikasi Anda selama mereka termasuk dalam direktori `contentDir` (secara default `./src`). Dan cocok dengan ekstensi file deklarasi konten (secara default `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 6: Gunakan Intlayer di JavaScript Anda

`vanilla-intlayer` mencerminkan API permukaan `react-intlayer`: `useIntlayer(key, locale?)` mengembalikan konten yang diterjemahkan secara langsung. Rantai `.onChange()` pada hasilnya untuk berlangganan perubahan lokal — padanan eksplisit dari render ulang React.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// Dapatkan konten awal untuk lokal saat ini.
// Rantai .onChange() untuk diberitahu setiap kali lokal berubah.
const content = useIntlayer("app").onChange((newContent) => {
  // Hanya render ulang atau perbaiki node DOM yang terpengaruh
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// Render awal
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> Akses nilai leaf sebagai string dengan merangkumnya dalam `String()`, yang memanggil metode `toString()` node dan mengembalikan teks yang diterjemahkan.
>
> Saat Anda memerlukan nilai untuk atribut HTML asli (misalnya, `alt`, `aria-label`), gunakan `.value` secara langsung:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (Opsional) Langkah 7: Ubah Bahasa Konten Anda

Untuk mengubah bahasa konten, gunakan fungsi `setLocale` yang disediakan oleh `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value as any));

  // Jaga agar dropdown tetap sinkron ketika lokal berubah dari tempat lain
  return subscribe((newLocale) => render(newLocale));
}
```

### (Opsional) Langkah 8: Render Konten Markdown dan HTML

Intlayer mendukung deklarasi konten `md()` dan `html()`. Dalam Vanilla JS, output yang dikompilasi dimasukkan sebagai HTML mentah melalui `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

Kompilasi dan masukkan HTML:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` memanggil `toString()` pada `IntlayerNode` yang mengembalikan string Markdown mentah. Berikan itu ke `compileMarkdown` untuk mendapatkan string HTML, lalu pasang melalui `innerHTML`.

> [!WARNING]
> Hanya gunakan `innerHTML` dengan konten tepercaya. Jika markdown berasal dari input pengguna, bersihkan terlebih dahulu (misalnya dengan DOMPurify). Anda dapat menginstal perender pembersih secara dinamis:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (Opsional) Langkah 9: Tambahkan Localized Routing ke aplikasi Anda

Untuk membuat rute unik untuk setiap bahasa (berguna untuk SEO), Anda dapat menggunakan `intlayerProxy` dalam konfigurasi Vite untuk deteksi lokal sisi server.

Pertama, tambahkan `intlayerProxy` ke konfigurasi Vite Anda:

> Perhatikan bahwa untuk menggunakan `intlayerProxy` di produksi, Anda perlu memindahkan `vite-intlayer` dari `devDependencies` ke `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // sebaiknya diletakkan pertama
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // sebaiknya diletakkan pertama
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // sebaiknya diletakkan pertama
    intlayer(),
  ],
});
```

### (Opsional) Langkah 10: Ubah URL ketika lokal berubah

Untuk memperbarui URL browser saat lokal berubah, panggil `useRewriteURL()` setelah menginstal Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// Menulis ulang URL segera dan pada setiap perubahan lokal berikutnya.
// Mengembalikan fungsi berhenti berlangganan untuk pembersihan.
const stopRewriteURL = useRewriteURL();
```

### (Opsional) Langkah 11: Alihkan Atribut Bahasa dan Arah HTML

Perbarui atribut `lang` dan `dir` dari tag `<html>` agar sesuai dengan lokal saat ini demi aksesibilitas dan SEO.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (Opsional) Langkah 12: Lazy-load kamus per lokal

Untuk aplikasi besar, Anda mungkin ingin membagi kamus setiap lokal ke dalam penggalannya sendiri. Gunakan `useDictionaryDynamic` bersama dengan `import()` dinamis Vite:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> Bundel masing-masing lokal hanya diambil ketika lokal tersebut menjadi aktif dan hasilnya disimpan di cache — pengalihan berikutnya ke lokal yang sama bersifat instan.

### (Opsional) Langkah 13: Ekstrak konten komponen Anda

Jika Anda memiliki kode dasar yang sudah ada, mengubah ribuan file bisa memakan waktu.

Untuk meringankan proses ini, Intlayer mengusulkan [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mentransformasi komponen Anda dan mengekstrak konten.

Untuk menyiapkannya, Anda dapat menambahkan bagian `compiler` di file `intlayer.config.ts` Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Sisa konfigurasi Anda
  compiler: {
    /**
     * Menunjukkan apakah kompilator harus diaktifkan.
     */
    enabled: true,

    /**
     * Mendefinisikan jalur file keluaran
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Menunjukkan apakah komponen harus disimpan setelah ditransformasi.
     * Dengan begitu, kompilator hanya dapat dijalankan sekali untuk mengubah aplikasi, dan kemudian dapat dihapus.
     */
    saveComponents: false,

    /**
     * Awalan kunci kamus
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Perintah Extract'>

Jalankan ekstraktor untuk mentransformasi komponen Anda dan mengekstrak konten

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

 </Tab>
 <Tab value='Babel kompilator'>

Perbarui `vite.config.ts` Anda untuk menyertakan plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Menambahkan plugin kompilator
  ],
});
```

```bash packageManager="npm"
npm run build # Atau npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Atau pnpm run dev
```

```bash packageManager="yarn"
yarn build # Atau yarn dev
```

```bash packageManager="bun"
bun run build # Atau bun run dev
```

 </Tab>
</Tabs>

### Konfigurasi TypeScript

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari memasukkannya ke dalam repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```bash
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau sebaris** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
