---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Angular i18n - Cara menerjemahkan aplikasi Angular di 2026
description: Temukan cara membuat situs web Angular Anda multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: Rilis versi stabil
  - version: 8.0.0
    date: 2025-12-30
    changes: Tambahkan perintah init
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web Angular Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi (i18n) sumber terbuka yang inovatif yang dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalisasi metadata, rute, dan konten secara dinamis**.
- **Memastikan dukungan TypeScript** dengan tipe yang dibuat secara otomatis, meningkatkan autocompletion dan deteksi kesalahan.
- **Memanfaatkan fitur-fitur canggih**, seperti deteksi dan pengalihan lokal dinamis.

---

## Panduan Langkah demi Langkah untuk Menyiapkan Intlayer dalam Aplikasi Angular

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-angular-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-angular-template) di GitHub.

### Langkah 1: Instal Dependensi

Instal paket-paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-webpack --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-webpack --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-webpack --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-webpack --dev
bunx intlayer init
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **angular-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi Angular. Ini menyediakan penyedia konteks dan hook untuk internasionalisasi Angular.

- **@angular-builders/custom-webpack**
  Diperlukan untuk menyesuaikan konfigurasi Webpack dari Angular CLI.

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi untuk mengonfigurasi bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Lokal Anda yang lain
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
      // Lokal Anda yang lain
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
      // Lokal Anda yang lain
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalisasi, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Angular Anda

Untuk mengintegrasikan Intlayer dengan Angular CLI, Anda perlu menggunakan builder khusus. Panduan ini mengasumsikan Anda menggunakan Webpack (default untuk banyak proyek Angular).

Pertama, modifikasi `angular.json` Anda untuk menggunakan builder Webpack khusus. Perbarui konfigurasi `build` dan `serve`:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser", // replace "@angular-devkit/build-angular:application",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts",
              "mergeStrategies": { "module.rules": "prepend" },
            },
            "main": "src/main.ts", // replace "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
        },
      },
    },
  },
}
```

> Pastikan untuk mengganti `your-app-name` dengan nama proyek Anda yang sebenarnya di `angular.json`.

Selanjutnya, buat file `webpack.config.ts` di akar proyek Anda:

```typescript fileName="webpack.config.ts"
import { mergeConfig } from "angular-intlayer/webpack";

export default mergeConfig({});
```

> Fungsi `mergeConfig` mengonfigurasi Webpack dengan Intlayer. Ini menyuntikkan `IntlayerWebpackPlugin` (untuk menangani file deklarasi konten) dan mengatur alias untuk performa optimal.

### Langkah 4: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Halo",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Selamat! Aplikasi Anda sedang berjalan. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      en: "Jelajahi Dokumen",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Belajar dengan Tutorial",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "Dokumen CLI",
    angularLanguageService: t({
      en: "Layanan Bahasa Angular",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda asalkan disertakan dalam direktori `contentDir` (secara default, `./src`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Langkah 5: Gunakan Intlayer dalam Kode Anda

Untuk menggunakan fitur internasionalisasi Intlayer di seluruh aplikasi Angular Anda, Anda perlu menyediakan Intlayer dalam konfigurasi aplikasi Anda.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Tambahkan penyedia Intlayer di sini
  ],
};
```

Kemudian, Anda dapat menggunakan fungsi `useIntlayer` di dalam komponen apa pun.

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

Dan di templat Anda:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Konten Intlayer dikembalikan sebagai `Signal`, jadi Anda mengakses nilainya dengan memanggil sinyal: `content().title`.

### (Opsional) Langkah 6: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh fungsi `useLocale`. Ini memungkinkan Anda untuk mengatur lokal aplikasi dan memperbarui konten yang sesuai.

Buat komponen untuk beralih antar bahasa:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
  styles: [
    `
      .locale-switcher {
        margin: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: fit-content;
      }
    `,
  ],
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Kemudian, gunakan komponen ini di `app.component.ts` Anda:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

### Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk mendapatkan manfaat TypeScript dan membuat basis kode Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari commit file tersebut ke repositori Git Anda.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext
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

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---
