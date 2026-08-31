---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Analog i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Analog multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer-analog-template
applicationShowcase: https://intlayer-analog-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 8.0.4
    date: 2026-01-26
    changes: "Riwayat awal"
author: aymericzip
---

# Terjemahkan aplikasi Analog (Angular) Anda menggunakan Intlayer | Internasionalisasi (i18n)

<Tabs defaultTab="code">
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-analog-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-analog-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-analog-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `ngx-translate` atau `angular-l10n`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>

<Accordion header="Cakupan Analog Penuh">

Intlayer dioptimalkan untuk bekerja sempurna dengan Analog dengan menawarkan **perutean multibahasa**, **dukungan SSR**, dan semua fitur yang diperlukan untuk penskalaan internasionalisasi (i18n).

</Accordion>

<Accordion header="Ukuran bundle">

Daripada memuat file JSON berukuran besar ke halaman Anda, muat saja konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemampuan Pemeliharaan">

Mencakup konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi berskala besar. Anda dapat menduplikasi atau menghapus satu folder fitur tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **diketik sepenuhnya** untuk memastikan keakuratan konten Anda.

</Accordion>

<Accordion header="Agen AI">

Menempatkan konten bersama **mengurangi konteks yang diperlukan** dengan Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk menjadikan pengalaman pengembang (DX) lebih lancar bagi agen AI.

</Accordion>

<Accordion header="Otomatisasi">

Gunakan otomatisasi untuk menerjemahkan dalam saluran CI/CD Anda menggunakan LLM pilihan Anda dengan biaya penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatiskan ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Pertunjukan">

Menghubungkan file JSON berukuran besar ke komponen dapat menyebabkan masalah kinerja dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada waktu pembuatan.

</Accordion>

<Accordion header="Menskalakan tanpa pengembang">

Lebih dari sekedar solusi i18n, Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** yang dihosting sendiri dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya menjadi lancar. Konten dapat disimpan secara lokal dan/atau jarak jauh.

</Accordion>
</AccordionGroup>

---

## Panduan Langkah demi Langkah untuk Menyiapkan Intlayer dalam Aplikasi Analog

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-analog-template) di GitHub.

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
npm install intlayer angular-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **angular-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi Angular. Ini menyediakan penyedia konteks dan hook untuk internasionalisasi Angular.

- **vite-intlayer**
  Paket yang mengintegrasikan Intlayer dengan Vite. Ini menyediakan plugin untuk menangani file deklarasi konten dan menyiapkan alias untuk performa optimal.

</Step>

<Step number={2} title="Konfigurasi Proyek Anda">

Buat file konfigurasi untuk mengonfigurasi bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Bahasa lainnya
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Melalui file konfigurasi ini, Anda dapat menyiapkan URL yang dilokalisasi, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>

<Step number={3} title="Integrasikan Intlayer dalam Konfigurasi Vite Anda">

Untuk mengintegrasikan Intlayer dengan Analog, Anda perlu menggunakan plugin `vite-intlayer`.

Modifikasi file `vite.config.ts` Anda:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
}));
```

> Plugin `intlayer()` mengonfigurasi Vite dengan Intlayer. Ini menangani file deklarasi konten dan menyiapkan alias untuk performa optimal.

</Step>

<Step number={4} title="Deklarasikan Konten Anda">

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
      id: "Halo",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplikasi sedang berjalan. 🎉",
      id: "Selamat! Aplikasi Anda sedang berjalan. 🎉",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama disertakan ke dalam direktori `contentDir` (secara default, `./src`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

</Step>

<Step number={5} title="Gunakan Intlayer dalam Kode Anda">

Untuk menggunakan fitur internasionalisasi Intlayer di seluruh aplikasi Analog Anda, Anda perlu menyediakan Intlayer dalam konfigurasi aplikasi Anda.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // Tambahkan penyedia Intlayer di sini
  ],
};
```

Kemudian, Anda dapat menggunakan fungsi `useIntlayer` di dalam komponen apa pun.

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

Konten Intlayer dikembalikan sebagai `Signal`, jadi Anda mengakses nilainya dengan memanggil sinyal tersebut: `content().title`.

</Step>

<Step number={6} title="Ubah bahasa konten Anda" isOptional={true}>

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
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Kemudian, gunakan komponen ini di halaman Anda:

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

</Step>

</Steps>

### Konfigurasi TypeScript

Intlayer menggunakan augmentasi modul untuk mendapatkan manfaat dari TypeScript dan membuat basis kode Anda lebih kuat.

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

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari memasukkannya ke dalam repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```bash
#  Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Pelengkapan otomatis** untuk kunci terjemahan.
- **Deteksi kesalahan real-time** untuk terjemahan yang hilang.
- **Pratinjau sebaris** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Analog?">

- **`ngx-translate`** / **`Transloco`**: library client yang membutuhkan konfigurasi manual untuk Analog SSR.
- **`Intlayer`**: terintegrasi penuh dengan Vite, SSR, dan routing berbasis file, optimasi build time, terjemahan AI.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle Analog saya?">

Jauh lebih sedikit daripada solusi berbasis namespace, karena halaman tidak pernah mengunduh katalog yang tidak di-render. Kompilator build time mengganti panggilan `useIntlayer` dengan entri kamus persis yang digunakan komponen, dan [kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) membagi sisanya per locale, mengurangi bundle hingga 50%. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md).

</Question>

<Question title="Bisakah saya bermigrasi dari ngx-translate, Transloco atau @angular/localize tanpa menulis ulang template saya?">

Sebagian besar ya. Ikuti [ikhtisar adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md).

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

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: pengalaman yang sama di editor mana pun yang mendukung LSP, dengan go to definition, hover preview dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan. Ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Apakah Intlayer bekerja dengan server side rendering (SSR) dan SSG di Analog?">

Ya. Konten diselesaikan saat SSR dan SSG, sehingga HTML pertama yang diterima klien sudah diterjemahkan.

</Question>

<Question title="Apakah pergantian bahasa memerlukan reload halaman?">

Tidak. `useIntlayer` bersifat reaktif dan memperbarui komponen seketika.

</Question>

<Question title="Bagaimana cara mengatur routing dengan locale di file system Analog?">

Buat folder `[locale]` di `src/app/pages`. `getLocalizedUrl` otomatis memperbarui tautan.

</Question>

<Question title="Bagaimana cara menangani bahasa dari kanan ke kiri di Analog?">

Gunakan `getHTMLTextDir` untuk menyetel `lang` dan `dir` pada dokumen root.

</Question>

<Question title="Bagaimana cara mengelola metadata SEO dan tag hreflang?">

Gunakan fungsi `getMultilingualUrls` untuk menghasilkan tag alternatif `hreflang` bagi semua locale yang dideklarasikan.

</Question>

<Question title="Bagaimana cara menerjemahkan aplikasi secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. Perintah ini mengisi terjemahan yang hilang menggunakan LLM pilihan Anda dengan provider dan API key Anda sendiri, dan `--git-diff` membatasi proses ke file yang diubah. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

</Question>

<Question title="Apakah Intlayer mendukung bentuk jamak, gender dan rich text?">

Ya: [bentuk jamak (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [penyisipan (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md), dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) untuk angka, tanggal, dan mata uang.

</Question>

<Question title="Bagaimana penerjemah dapat mengedit konten tanpa menyentuh kode?">

Melalui [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), yang memungkinkan siapa saja mengedit teks langsung di aplikasi yang berjalan, atau melalui [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), yang memisahkan konten sehingga dapat diubah tanpa perlu redeploy kode.

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
