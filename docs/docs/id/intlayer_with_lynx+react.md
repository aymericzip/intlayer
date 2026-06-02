---
createdAt: 2025-03-09
updatedAt: 2026-05-31
title: Lynx + React i18n - Panduan lengkap menerjemahkan Lynx
description: Solusi terbaik untuk ukuran bundle, SEO, performa & keterpeliharaan. Jadikan Lynx and React aplikasi mobile Anda multibahasa di 2026, terjemahan LLM, Agent Skills & MCP.
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Tambahkan perintah init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
---

# Terjemahkan situs aplikasi mobile Lynx dan React Anda menggunakan Intlayer | Internasionalisasi (i18n)

Lihat [Application Template](https://github.com/aymericzip/intlayer-lynx-template) di GitHub.

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-lynx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `react-native-localize` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>

<Accordion header="Cakupan Lynx penuh">

Intlayer dioptimalkan untuk bekerja sempurna dengan Lynx dan React dengan menawarkan **pelingkupan konten tingkat komponen**, **dukungan TypeScript**, dan semua fitur yang diperlukan untuk penskalaan internasionalisasi (i18n).

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
bun x intlayer init
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

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```bash
#  Abaikan file yang dihasilkan oleh Intlayer
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
- **Perintah CLI**: Jelajahi [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk tugas seperti **mengekstrak terjemahan** atau **memeriksa kunci yang hilang**.

---
