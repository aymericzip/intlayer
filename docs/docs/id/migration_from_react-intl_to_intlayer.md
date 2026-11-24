---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrasi dari react-intl (FormatJS) ke Intlayer"
description: "Migrasikan aplikasi React dari react-intl ke Intlayer langkah demi langkah. useIntl, FormattedMessage, dan semua komponen Formatted* tetap berfungsi dengan compat adapter @intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrasi dari react-intl (FormatJS) ke Intlayer

## Mengapa migrasi dari react-intl ke Intlayer?

<AccordionGroup>
<Accordion header="Ukuran bundle">

Dengan react-intl, semua pesan locale diberikan ke `IntlProvider`, sehingga setiap halaman membawa seluruh katalog. Intlayer hanya mengirim kamus yang digunakan setiap halaman, sehingga **mengurangi ukuran bundle dan halaman hingga 50%**.

</Accordion>
<Accordion header="Kemudahan pemeliharaan">

Id pesan **bertipe** sesuai kamus Anda: id yang tidak valid gagal saat build. Konten dapat diletakkan di samping komponen yang menggunakannya.

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

1. **Compat adapter (disarankan untuk aplikasi yang sudah ada)**: instal `@intlayer/react-intl`. Package ini mengekspos API yang sama dengan `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) dan menyajikan pesan dari kamus Intlayer. ICU MessageFormat, plural, select, dan tag rich text berfungsi seperti sebelumnya.
2. **Migrasi penuh**: ganti pemanggilan react-intl secara bertahap dengan `useIntlayer` dan file `.content.ts` di samping komponen Anda.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Biarkan `react-intl` tetap terinstal: package ini menyediakan tipe TypeScript.

</Step>
<Step number={2} title="Konfigurasi Intlayer">

Arahkan plugin `syncJSON` ke file pesan Anda yang sudah ada. Katalog react-intl adalah map datar berisi id bertitik:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> Segmen pertama setiap id (`home`) menjadi kamus Intlayer, sehingga setiap halaman hanya memuat kamus yang digunakannya. Saat Intlayer menulis kembali terjemahan, file tetap berbentuk datar.

</Step>
<Step number={3} title="Tambahkan plugin Vite">

`reactIntlVitePlugin()` menjalankan build Intlayer dan membuat alias `react-intl` ke `@intlayer/react-intl`, tanpa perubahan pada file sumber.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Menggunakan bundler lain? Ganti nama import menjadi `@intlayer/react-intl` (lihat langkah 5) dan gunakan plugin Intlayer untuk bundler Anda, misalnya `withIntlayer` dari `next-intlayer` untuk Next.js.

</Step>
<Step number={4} title="Berhenti memberikan pesan ke IntlProvider">

`IntlProvider` tetap berfungsi, tetapi pesan kini dimuat oleh Intlayer. Hapus prop `messages` dan import katalog:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> Jika `messages` masih diberikan, prop tersebut diabaikan dan peringatan ditampilkan di mode development.

</Step>
</Steps>

Komponen Anda tetap berfungsi tanpa perubahan, dengan id bertipe:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Migrasi penuh

<Steps>
<Step number={5} title="Penggantian nama import secara eksplisit (opsional)" isOptional={true}>

Plugin Vite sudah menangani alias. Untuk membuat dependensi menjadi eksplisit:

| Sebelum                                         | Sesudah                                                   |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Pindahkan konten ke file .content.ts" isOptional={true}>

Komponen baru dapat menggunakan konten Intlayer native, berdampingan dengan pemanggilan react-intl yang sudah ada:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

Terjemahan yang diisi ditulis kembali ke file JSON Anda. Lihat [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk konfigurasi AI.

</Step>
</Steps>

## Yang dapat Anda hapus setelah migrasi

| File / pola                               | Mengapa tidak diperlukan lagi                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| Prop `messages` dan pemuatan katalog      | Kamus dikompilasi dan dimuat oleh Intlayer.                                  |
| Langkah `formatjs compile`                | Intlayer mem-parsing pesan ICU langsung dari file JSON.                      |
| Pembuatan id oleh `babel-plugin-formatjs` | Gunakan id bertitik yang eksplisit agar setiap id dipetakan ke sebuah kamus. |

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

- [Compat adapter react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/react-intl.md)
- [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)
- [Intlayer dengan Vite dan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)
- [Migrasi dari react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md)
- [Editor visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
