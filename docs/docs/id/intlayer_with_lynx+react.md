---
createdAt: 2025-03-09
updatedAt: 2025-06-29
title: Cara menerjemahkan aplikasi mobile Lynx dan React Anda – panduan i18n 2025
description: Temukan cara membuat aplikasi mobile Lynx dan React Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs aplikasi mobile Lynx dan React Anda menggunakan Intlayer | Internasionalisasi (i18n)

Lihat [Application Template](https://github.com/aymericzip/intlayer-lynx-template) di GitHub.

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-lynx-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Apa itu Intlayer?

**Intlayer** adalah **perpustakaan internasionalisasi (i18n) open-source yang inovatif** yang mempermudah dukungan multibahasa dalam aplikasi modern. Ini bekerja di banyak lingkungan JavaScript/TypeScript, **termasuk Lynx** (melalui paket `react-intlayer`).

Dengan Intlayer, Anda dapat:

- **Kelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Pastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis.
- **Lokalisisasi konten secara dinamis**, termasuk **string UI** (dan di React untuk web, juga dapat melokalisasi metadata HTML, dll.).
- **Manfaatkan fitur canggih**, seperti deteksi dan pergantian locale secara dinamis.

---

## Langkah 1: Instalasi Dependensi

Dari proyek Lynx Anda, instal paket-paket berikut:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer lynx-intlayer
bunx intlayer init
```

### Paket

- **intlayer**
- **intlayer**  
  Toolkit inti i18n untuk konfigurasi, konten kamus, pembuatan tipe, dan perintah CLI.

- **react-intlayer**  
  Integrasi React yang menyediakan context providers dan React hooks yang akan Anda gunakan di Lynx untuk mendapatkan dan mengganti locale.

- **lynx-intlayer**  
  Integrasi Lynx yang menyediakan plugin untuk mengintegrasikan Intlayer dengan bundler Lynx.

---

## Langkah 2: Buat Konfigurasi Intlayer

Di root proyek Anda (atau di mana saja yang nyaman), buat file **konfigurasi Intlayer**. Contohnya bisa seperti ini:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Tambahkan locale lain yang Anda butuhkan
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Tambahkan locale lain yang Anda butuhkan
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Dalam konfigurasi ini, Anda dapat:

- Mengonfigurasi **daftar locale yang didukung**.
- Menetapkan locale **default**.
- Nanti, Anda dapat menambahkan opsi yang lebih canggih (misalnya, log, direktori konten khusus, dll.).
- Lihat [dokumentasi konfigurasi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk informasi lebih lanjut.

## Langkah 3: Tambahkan plugin Intlayer ke bundler Lynx

Untuk menggunakan Intlayer dengan Lynx, Anda perlu menambahkan plugin ke file `lynx.config.ts` Anda:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... plugin lain
    pluginIntlayerLynx(),
  ],
});
```

## Langkah 4: Tambahkan provider Intlayer

Untuk menjaga sinkronisasi bahasa pengguna di seluruh aplikasi Anda, Anda perlu membungkus komponen root Anda dengan komponen `IntlayerProvider` dari `react-intlayer`.

Selain itu, Anda perlu menambahkan file fungsi `intlayerPolyfill` untuk memastikan Intlayer dapat bekerja dengan baik.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## Langkah 5: Deklarasikan Konten Anda

Buat file **deklarasi konten** di mana saja dalam proyek Anda (biasanya di dalam `src/`), menggunakan salah satu format ekstensi yang didukung oleh Intlayer:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- dll.

Contoh:

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "untuk melihat pembaruan!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Ketuk logo dan bersenang-senang!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "untuk melihat pembaruan!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Ketuk logo dan bersenang-senang!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "untuk melihat pembaruan!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Ketuk logo dan bersenang-senang!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "en": "untuk melihat pembaruan!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!"
        }
      }
    ]
  }
}
```

> Untuk detail tentang deklarasi konten, lihat [dokumentasi konten Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

---

## Langkah 4: Gunakan Intlayer di Komponen Anda

Gunakan hook `useIntlayer` di komponen anak untuk mendapatkan konten yang sudah dilokalisasi.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");

  const onTap = useCallback(() => {
    "background only";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Saat menggunakan `content.someKey` dalam props berbasis string (misalnya, `title` pada tombol atau `children` pada komponen `Text`), **panggil `content.someKey.value`** untuk mendapatkan string yang sebenarnya.

---

## (Opsional) Langkah 5: Ubah Locale Aplikasi

Untuk mengganti locale dari dalam komponen Anda, Anda dapat menggunakan metode `setLocale` dari hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Ini memicu re-render semua komponen yang menggunakan konten Intlayer, yang sekarang menampilkan terjemahan untuk locale baru.

> Lihat [dokumentasi `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md) untuk detail lebih lanjut.

## Konfigurasi TypeScript (jika Anda menggunakan TypeScript)

Intlayer menghasilkan definisi tipe dalam folder tersembunyi (secara default `.intlayer`) untuk meningkatkan autocompletion dan menangkap kesalahan terjemahan:

```json5
// tsconfig.json
{
  // ... konfigurasi TS Anda yang sudah ada
  "include": [
    "src", // kode sumber Anda
    ".intlayer/types/**/*.ts", // <-- pastikan tipe yang dihasilkan otomatis disertakan
    // ... apapun yang sudah Anda sertakan
  ],
}
```

Ini yang memungkinkan fitur seperti:

- **Autocompletion** untuk kunci kamus Anda.
- **Pemeriksaan tipe** yang memperingatkan jika Anda mengakses kunci yang tidak ada atau tipe yang tidak cocok.

---

## Konfigurasi Git

Untuk menghindari commit file yang dihasilkan otomatis oleh Intlayer, tambahkan berikut ini ke `.gitignore` Anda:

```plaintext
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

---

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten terjemahan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Melangkah Lebih Jauh

- **Editor Visual**: Gunakan [Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) untuk mengelola terjemahan secara visual.
- **Integrasi CMS**: Anda juga dapat mengeksternalisasi dan mengambil konten kamus Anda dari sebuah [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
- **Perintah CLI**: Jelajahi [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md) untuk tugas seperti **mengekstrak terjemahan** atau **memeriksa kunci yang hilang**.

---
