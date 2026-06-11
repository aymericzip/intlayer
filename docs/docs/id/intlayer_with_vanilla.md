---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Vanilla JS multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Inisialisasi riwayat"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Terjemahkan situs web Vanilla JS Anda menggunakan Intlayer | Internasionalisasi (i18n)

<Tabs defaultTab="code">
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `i18next` atau `i18n.js`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>

<Accordion header="Cakupan penuh Vanilla JS">

Intlayer dioptimalkan agar berfungsi sempurna dengan Vanilla JavaScript dengan menawarkan **manajemen konten tanpa kerangka kerja**, **dukungan TypeScript**, dan semua fitur yang diperlukan untuk meningkatkan internasionalisasi (i18n).

</Accordion>

<Accordion header="Ukuran bundle">

Daripada memuat file JSON berukuran besar ke halaman Anda, muat saja konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemampuan Pemeliharaan">

Mencakup konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi berskala besar. Anda dapat menduplikasi atau menghapus satu folder fitur tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **diketik sepenuhnya** untuk memastikan keakuratan konten Anda.

</Accordion>

<Accordion header="Agen AI">

Menempatkan konten bersama **mengurangi konteks yang diperlukan** dengan Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, dan **[agent skill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, untuk menjadikan pengalaman pengembang (DX) lebih lancar bagi agen AI.

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

## Panduan Langkah demi Langkah untuk Menyiapkan Intlayer dalam Aplikasi Vanilla JS

<Steps>

<Step number={1} title="Instal Dependensi">

Instal paket-paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
# Hasilkan bundel mandiri dari intlayer dan vanilla-intlayer
# File ini akan diimpor ke dalam file HTML Anda
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inisialisasi intlayer dengan file konfigurasi
npx intlayer init --no-gitignore

# Bangun kamus
npx intlayer build
```

```bash packageManager="pnpm"
# Hasilkan bundel mandiri dari intlayer dan vanilla-intlayer
# File ini akan diimpor ke dalam file HTML Anda
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inisialisasi intlayer dengan file konfigurasi
pnpm intlayer init --no-gitignore

# Bangun kamus
pnpm intlayer build
```

```bash packageManager="yarn"
# Hasilkan bundel mandiri dari intlayer dan vanilla-intlayer
# File ini akan diimpor ke dalam file HTML Anda
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inisialisasi file konfigurasi intlayer, TypeScript jika sudah disiapkan, variabel lingkungan
yarn intlayer init --no-gitignore

# Bangun kamus
yarn intlayer build
```

```bash packageManager="bun"
# Hasilkan bundel mandiri dari intlayer dan vanilla-intlayer
# File ini akan diimpor ke dalam file HTML Anda
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inisialisasi intlayer dengan file konfigurasi
bun x intlayer init --no-gitignore

# Bangun kamus
bun x intlayer build
```

- **intlayer**
  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilisasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **vanilla-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi JavaScript / TypeScript murni. Paket ini menyediakan singleton pub/sub (`IntlayerClient`) dan pembantu berbasis callback (`useIntlayer`, `useLocale`, dsb.) sehingga bagian mana pun dari aplikasi Anda dapat bereaksi terhadap perubahan bahasa tanpa bergantung pada kerangka kerja UI.

> Ekspor penggabungan (bundling) dari CLI `intlayer standalone` menghasilkan build yang dioptimalkan melalui pemusnahan kode mati (tree-shaking) untuk paket, lokal, dan logika non-esensial (seperti pengalihan atau awalan) yang tidak digunakan khusus untuk konfigurasi Anda.

</Step>

<Step number={2} title="Konfigurasi Proyek Anda">

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

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

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar parameter lengkap yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>

<Step number={3} title="Impor bundel di HTML Anda">

Setelah Anda menghasilkan bundel `intlayer.js`, Anda dapat mengimpornya di file HTML Anda:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />

    <!-- Impor bundel -->
    <script src="./intlayer.js" defer></script>
    <!-- Impor skrip utama Anda -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Bundel tersebut mengekspos `Intlayer` dan `VanillaIntlayer` sebagai objek global di `window`.

</Step>

<Step number={4} title="Bootstrap Intlayer di titik masuk (entry point) Anda">

Di `src/main.js` Anda, panggil `installIntlayer()` **sebelum** ada konten yang dirender sehingga singleton bahasa global sudah siap.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Harus dipanggil sebelum merender konten i18n apa pun.
installIntlayer();
```

Jika Anda juga ingin menggunakan perender markdown, panggil `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="Deklarasikan Konten Anda">

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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
      es: "Klik logo Vite untuk mempelajari lebih lanjut",
    }),
  },
} satisfies Dictionary;

export default appContent;
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
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda segera setelah mereka disertakan dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

</Step>

<Step number={6} title="Gunakan Intlayer dalam JavaScript Anda">

Objek `window.VanillaIntlayer` menyediakan pembantu API: `useIntlayer(key, locale?)` mengembalikan konten yang diterjemahkan untuk kunci yang diberikan.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Dapatkan konten awal untuk bahasa saat ini.
// Rantai .onChange() untuk diberitahu setiap kali bahasa berubah.
const content = useIntlayer("app").onChange((newContent) => {
  // Render ulang atau tambal hanya node DOM yang terpengaruh
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Render awal
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Akses nilai daun sebagai string dengan membungkusnya dalam `String()`, yang memanggil metode `toString()` dari node tersebut dan mengembalikan teks yang diterjemahkan.
>
> Saat Anda memerlukan nilai untuk atribut HTML asli (misalnya `alt`, `aria-label`), gunakan `.value` secara langsung:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Ubah bahasa konten Anda" isOptional={true}>

Untuk mengubah bahasa konten Anda, gunakan fungsi `setLocale` yang diekspos oleh `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Bahasa");

  const render = (currentLocale) => {
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

  select.addEventListener("change", () => setLocale(select.value));

  // Jaga dropdown tetap sinkron ketika bahasa berubah dari tempat lain
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Ganti Bahasa HTML dan Atribut Arah" isOptional={true}>

Perbarui atribut `lang` dan `dir` dari tag `<html>` agar sesuai dengan bahasa saat ini untuk aksesibilitas dan SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="Muat kamus secara bertahap (lazy-load) per bahasa" isOptional={true}>

Jika Anda ingin memuat kamus secara bertahap per bahasa, Anda dapat menggunakan `useDictionaryDynamic`. Ini berguna jika Anda tidak ingin menggabungkan semua terjemahan dalam file `intlayer.js` awal.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Catatan: `useDictionaryDynamic` mengharuskan kamus tersedia sebagai file ESM terpisah. Pendekatan ini biasanya digunakan jika Anda memiliki server web yang melayani kamus.
> </Step>

</Steps>

### Konfigurasikan TypeScript

Pastikan konfigurasi TypeScript Anda menyertakan tipe data yang dibuat secara otomatis.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi resmi Intlayer VS Code**.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Pelengkapan otomatis** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau sebaris (inline)** untuk konten yang diterjemahkan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
