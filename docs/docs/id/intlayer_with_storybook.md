---
createdAt: 2026-03-20
updatedAt: 2026-05-31
title: "Storybook i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Storybook multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
author: aymericzip
---

# Intlayer dengan Storybook

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `storybook-react-i18next` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>

<Accordion header="Liputan Buku Cerita Lengkap">

Intlayer dioptimalkan agar berfungsi sempurna dengan Storybook dengan menawarkan **dekorator cerita multibahasa**, **pengalihan lokal**, dan semua fitur yang diperlukan untuk meningkatkan internasionalisasi (i18n) di seluruh sistem desain Anda.

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

## Mengapa menggunakan Intlayer dengan Storybook?

Storybook adalah alat standar industri untuk mengembangkan dan mendokumentasikan komponen UI secara terisolasi. Menggabungkannya dengan Intlayer memungkinkan Anda untuk:

- **Pratinjau setiap lokal** langsung di dalam kanvas Storybook menggunakan pengalih bilah alat.
- **Menemukan terjemahan yang hilang** sebelum mencapai tahap produksi.
- **Mendokumentasikan komponen multibahasa** dengan konten asli yang aman secara tipe, bukan string yang dikodekan secara statis.

---

## Pengaturan Langkah demi Langkah

<Tabs>
<Tab value="Vite Setup">

<Steps>

<Step number={1} title="Instal Dependensi">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Paket            | Peran                                                         |
| ---------------- | ------------------------------------------------------------- |
| `intlayer`       | Inti - konfigurasi, kompilasi konten, CLI                     |
| `react-intlayer` | Pengikatan React - `IntlayerProvider`, hook `useIntlayer`     |
| `vite-intlayer`  | Plugin Vite - memantau dan mengompilasi file deklarasi konten |

---

</Step>

<Step number={2} title="Buat Konfigurasi Intlayer">

Buat `intlayer.config.ts` di root proyek Anda (atau di dalam paket sistem desain Anda):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // tambahkan lebih banyak lokal jika diperlukan
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // lokasi file *.content.ts Anda
  },
};

export default config;
```

> Untuk daftar lengkap opsi, lihat [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

---

</Step>

<Step number={3} title="Tambahkan Plugin Vite ke Storybook">

Hook `viteFinal` Storybook memungkinkan Anda memperluas konfigurasi Vite internal. Impor dan tambahkan plugin `intlayer()` di sana:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …addons lainnya
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

Plugin `intlayer()` memantau file `*.content.ts` Anda dan membangun kembali kamus secara otomatis setiap kali ada perubahan selama pengembangan Storybook.

---

</Step>

<Step number={4} title="Tambahkan Dekorator `IntlayerProvider` dan Bilah Alat Lokal">

File `preview` Storybook adalah tempat yang tepat untuk membungkus setiap story dengan `IntlayerProvider` dan mengekspos pengalih lokal di bilah alat:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Bungkus setiap story di dalam IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Ekspos pengalih lokal di bilah alat Storybook
  globalTypes: {
    locale: {
      description: "Lokal yang aktif",
      defaultValue: "en",
      toolbar: {
        title: "Lokal",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> Nilai `locale` harus sesuai dengan lokal yang dideklarasikan dalam `intlayer.config.ts` Anda.

</Tab>
<Tab value="Webpack Setup">

</Step>

<Step number={1} title="Instal Dependensi">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

</Step>

<Step number={2} title="Buat Konfigurasi Intlayer">

Buat `intlayer.config.ts` di root proyek Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

</Step>

<Step number={3} title="Konfigurasi Webpack Storybook">

Untuk pengaturan Storybook berbasis Webpack (misalnya `@storybook/react-webpack5`), perluas konfigurasi webpack melalui `webpackFinal` untuk menambahkan alias dan loader Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

---

</Step>

<Step number={4} title="Tambahkan Dekorator `IntlayerProvider` dan Bilah Alat Lokal">

Sama seperti pengaturan Vite - tambahkan dekorator dan tipe lokal global di `.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Lokal yang aktif",
      defaultValue: "en",
      toolbar: {
        title: "Lokal",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

</Step>

</Steps>

## Mendeklarasikan Konten

Buat file `*.content.ts` di samping setiap komponen. Intlayer akan mengambilnya secara otomatis selama proses kompilasi.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

> Untuk format dan fitur deklarasi konten lainnya, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

---

## Menggunakan `useIntlayer` dalam Komponen

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Salin
    </button>
  );
};
```

`useIntlayer` mengembalikan kamus yang telah dikompilasi untuk lokal saat ini yang disediakan oleh `IntlayerProvider` terdekat. Mengalihkan lokal di bilah alat Storybook akan secara otomatis me-render ulang story dengan terjemahan yang diperbarui.

---

## Menulis Story untuk Komponen yang di-Internasionalisasi

Dengan adanya dekorator `IntlayerProvider`, story Anda akan bekerja sama persis seperti sebelumnya. Bilah alat lokal mengontrol lokal aktif untuk seluruh kanvas:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Story default - ubah lokal di bilah alat untuk melihat pratinjau terjemahan. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Me-render tombol di dalam blok kode, kasus penggunaan dunia nyata yang umum. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Setiap story mewarisi global `locale` dari bilah alat, jadi Anda dapat memverifikasi setiap lokal tanpa mengubah kode story apa pun.

---

## Menguji Terjemahan dalam Story

Gunakan fungsi `play` Storybook untuk menegaskan bahwa teks terjemahan yang benar telah dirender untuk lokal tertentu:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Verifikasi tombol memiliki nama aksesibel yang tidak kosong
    await expect(button).toHaveAccessibleName();
    // Verifikasi tombol tidak dinonaktifkan
    await expect(button).not.toBeDisabled();
    // Verifikasi aksesibilitas keyboard
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Sumber Daya Tambahan

- [Referensi konfigurasi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)
- [Dokumentasi CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- [Dokumentasi Storybook](https://storybook.js.org/docs)
