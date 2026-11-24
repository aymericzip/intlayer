---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrasi dari Lingui ke Intlayer"
description: "Migrasikan aplikasi React dari Lingui ke Intlayer langkah demi langkah. Macro Lingui, useLingui, dan <Trans> tetap berfungsi dengan compat adapter @intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrasi dari Lingui ke Intlayer

## Mengapa migrasi dari Lingui ke Intlayer?

<AccordionGroup>
<Accordion header="Ukuran bundle">

Lingui memuat satu katalog terkompilasi per locale yang berisi semua pesan aplikasi. Intlayer membagi konten per kamus dan hanya mengirim apa yang dipakai setiap halaman, sehingga **mengurangi ukuran bundle dan halaman hingga 50%**.

</Accordion>
<Accordion header="Kemudahan pemeliharaan">

Kamus Intlayer **sepenuhnya bertipe** dan dapat diletakkan di samping komponen yang menggunakannya. Tidak ada langkah `extract` / `compile` yang perlu diingat: kamus di-build oleh plugin bundler.

</Accordion>
<Accordion header="Agen AI">

Konten yang berdekatan dengan komponen **mengurangi konteks yang dibutuhkan** LLM. Intlayer menyediakan **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**.

</Accordion>
<Accordion header="Otomatisasi">

Terjemahkan pesan yang hilang di pipeline CI/CD dengan LLM pilihan Anda, atau di latar belakang dengan [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

</Accordion>
<Accordion header="Skalabilitas bersama non-developer">

Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)** self-hosted dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** agar penerjemah dan copywriter dapat mengedit konten secara real-time.

</Accordion>
</AccordionGroup>

> Untuk memahami asal-usul library ini, baca [sejarah i18n JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md).

## Strategi migrasi

1. **Compat adapter (disarankan untuk aplikasi yang sudah ada)**: instal `@intlayer/lingui`. Package ini mengekspos API yang sama dengan `@lingui/core` dan `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) dan menyajikan pesan dari kamus Intlayer. Macro Anda (`` t`…` ``, `<Trans>`, `msg`, `plural`) tetap dikompilasi persis seperti sebelumnya.
2. **Migrasi penuh**: ganti pemanggilan Lingui secara bertahap dengan `useIntlayer` dan file `.content.ts` di samping komponen Anda.

## Daftar isi

<TOC/>

## Migrasi cepat

<Steps>
<Step number={1} title="Instal dependensi">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> Flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

Perintah ini mendeteksi lingkungan Anda dan menginstal package yang dibutuhkan, misalnya:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Biarkan `@lingui/core`, `@lingui/react`, dan plugin macro Anda (`@lingui/babel-plugin-lingui-macro` atau `@lingui/swc-plugin`) tetap terinstal. Macro tetap berjalan, dan package Lingui menyediakan tipe TypeScript.

</Step>
<Step number={2} title="Konfigurasi Intlayer">

Intlayer membaca katalog Lingui Anda sebagai sumber kebenaran. Dengan struktur default Lingui (`src/locales/{locale}/messages.po`), arahkan plugin `syncPO` ke katalog tersebut:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="Menggunakan katalog JSON">

Dengan `@lingui/format-json`, gunakan `syncJSON` dengan format ICU:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Gunakan id pesan eksplisit (`t({ id: "hero.title", message: "Welcome" })` atau `<Trans id="hero.title">`). Id yang dihasilkan dari teks sumber tidak dicocokkan dengan katalog.

</Step>
<Step number={3} title="Ganti plugin Vite Lingui">

Ganti `@lingui/vite-plugin` dengan `@intlayer/lingui/plugin`. Binding-nya tetap `lingui()`: plugin ini menjalankan build Intlayer dan membuat alias `@lingui/core` serta `@lingui/react` ke `@intlayer/lingui`, tanpa perubahan pada file sumber.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Biarkan plugin macro di plugin React (Babel atau `@lingui/swc-plugin`), agar macro dikompilasi menjadi pemanggilan `i18n._()` sebelum Intlayer meresolvenya.

</Step>
</Steps>

Komponen Anda tetap berfungsi tanpa perubahan:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

Pergantian locale tetap melalui `i18n.activate(locale)`, yang memperbarui setiap konsumen `useLingui()`.

## Migrasi penuh

<Steps>
<Step number={4} title="Hapus pemuatan katalog saat runtime" isOptional={true}>

Pesan kini berasal dari kamus Intlayer yang dikompilasi saat build. Pemanggilan `i18n.load()` / `i18n.loadAndActivate()` hanya berfungsi sebagai fallback dan menampilkan peringatan di mode development. Ganti dengan `i18n.activate(locale)` dan hapus langkah `lingui compile`. Pertahankan `lingui extract` untuk mengumpulkan id pesan baru.

</Step>
<Step number={5} title="Penggantian nama import secara eksplisit (opsional)" isOptional={true}>

Plugin Vite sudah menangani alias. Untuk membuat dependensi menjadi eksplisit:

| Sebelum                                            | Sesudah                                               |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Pindahkan konten ke file .content.ts" isOptional={true}>

Komponen baru dapat menggunakan konten Intlayer native, berdampingan dengan pemanggilan Lingui yang sudah ada:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

</Step>
<Step number={7} title="Aktifkan terjemahan berbasis AI" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Terjemahan yang diisi ditulis kembali ke katalog Lingui Anda. Lihat [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk konfigurasi AI.

</Step>
</Steps>

## Yang dapat Anda hapus setelah migrasi

| File / pola                                     | Mengapa tidak diperlukan lagi                              |
| ----------------------------------------------- | ---------------------------------------------------------- |
| `i18n.load()` / import katalog dinamis          | Kamus dikompilasi dan dimuat oleh Intlayer.                |
| `lingui compile` dan katalog `.js` terkompilasi | Intlayer mem-build kamus langsung dari katalog Anda.       |
| `@lingui/vite-plugin`                           | Digantikan oleh `lingui()` dari `@intlayer/lingui/plugin`. |

## Konfigurasi TypeScript

Sertakan tipe yang dihasilkan di `tsconfig.json` Anda:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Konfigurasi Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Compat adapter Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md)
- [Plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md)
- [Intlayer dengan Vite dan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)
- [Editor visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
