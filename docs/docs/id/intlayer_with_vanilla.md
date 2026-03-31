---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - Cara menerjemahkan aplikasi Vanilla JS di tahun 2026
description: Temukan cara membuat situs web Vanilla JS Anda multibahasa. Ikuti dokumentasi untuk internasionalisasi (i18n) dan menerjemahkannya.
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
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Inisialisasi riwayat"
---

# Terjemahkan situs web Vanilla JS Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi (i18n) sumber terbuka yang inovatif yang dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata, rute, dan konten secara dinamis**.
- **Memastikan dukungan TypeScript** dengan tipe data yang dibuat secara otomatis, meningkatkan pelengkapan otomatis dan deteksi kesalahan.
- **Manfaatkan fitur-fitur canggih**, seperti deteksi dan pengalihan bahasa dinamis.

Panduan ini menunjukkan cara menggunakan Intlayer dalam aplikasi Vanilla JavaScript **tanpa menggunakan manajer paket atau bundler** (seperti Vite, Webpack, dsb.).

Jika aplikasi Anda menggunakan bundler (seperti Vite), kami menyarankan untuk mengikuti [Panduan Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vanilla.md) sebagai gantinya.

Menggunakan bundel mandiri, Anda dapat mengimpor Intlayer secara langsung ke dalam file HTML Anda melalui file JavaScript tunggal, menjadikannya sempurna untuk proyek lama atau situs statis sederhana.

---

## Panduan Langkah demi Langkah untuk Menyiapkan Intlayer dalam Aplikasi Vanilla JS

### Langkah 1: Instal Dependensi

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
      // Bahasa lainnya
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
      // Bahasa lainnya
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
      // Bahasa lainnya
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar parameter lengkap yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Impor bundel di HTML Anda

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

### Langkah 4: Bootstrap Intlayer di titik masuk (entry point) Anda

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
      es: "Klik logo Vite untuk mempelajari lebih lanjut",
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
      es: "Klik logo Vite untuk mempelajari lebih lanjut",
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
      es: "Klik logo Vite untuk mempelajari lebih lanjut",
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
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda segera setelah mereka disertakan dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 6: Gunakan Intlayer dalam JavaScript Anda

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

### (Opsional) Langkah 7: Ubah bahasa konten Anda

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

### (Opsional) Langkah 8: Ganti Bahasa HTML dan Atribut Arah

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

### (Opsional) Langkah 9: Muat kamus secara bertahap (lazy-load) per bahasa

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
