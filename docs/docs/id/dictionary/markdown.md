---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Markdown
description: Pelajari cara mendeklarasikan dan menggunakan konten Markdown di situs web multibahasa Anda dengan Intlayer. Ikuti langkah-langkah dalam dokumentasi online ini untuk mengintegrasikan Markdown secara mulus ke dalam proyek Anda.
keywords:
  - Markdown
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Markdown / Konten Teks Kaya

## Cara Kerja Markdown

Intlayer mendukung konten teks kaya yang didefinisikan menggunakan sintaks Markdown. Hal ini dicapai melalui fungsi `md`, yang mengubah string Markdown menjadi format yang dapat dikelola oleh Intlayer. Dengan menggunakan Markdown, Anda dapat dengan mudah menulis dan memelihara konten dengan format kaya, seperti blog, artikel, dan lainnya.

[Editor Visual Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) dan [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) keduanya mendukung manajemen konten Markdown.

Ketika diintegrasikan dengan aplikasi React, Anda dapat menggunakan penyedia rendering Markdown (seperti [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) untuk merender konten Markdown menjadi HTML. Ini memungkinkan Anda menulis konten dalam Markdown sambil memastikan tampilannya benar di aplikasi Anda.

## Menyiapkan Konten Markdown

Untuk menyiapkan konten Markdown dalam proyek Intlayer Anda, definisikan sebuah kamus konten yang menggunakan fungsi `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Judul Saya \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Judul Saya \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## Judul Saya \n\nLorem Ipsum"
    }
  }
}
```

## Impor file `.md` (multibahasa)

Jika file Markdown Anda adalah file `.md`, Anda dapat mengimpornya menggunakan berbagai format impor yang disediakan oleh JavaScript atau Intlayer.

Disarankan untuk memprioritaskan impor melalui [`file` function](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/file.md), karena memungkinkan Intlayer mengelola jalur relatif terhadap lokasi file dengan benar dan memastikan integrasi file ini dengan Visual Editor / CMS.

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Deklarasi ini memungkinkan TypeScript mengenali dan mengimpor file Markdown (.md) sebagai modul.

// Tanpa ini, TypeScript akan menghasilkan error saat mencoba mengimpor file Markdown,
// karena secara native tidak mendukung impor file non-kode.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, file, t, type Dictionary } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown from "./myMarkdown.md";

const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, file, t } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown from "./myMarkdown.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, file, t } = require("intlayer");

const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
// Kamus markdown
const markdownDictionary = {
  key: "app",
  content: {
    contentMultilingualFile: t({
      en: md(file("./myMarkdown.en.md")),
      fr: md(file("./myMarkdown.fr.md")),
      es: md(file("./myMarkdown.es.md")),
    }),

    contentImport: md(markdown),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// - Mengimpor file Markdown eksternal (.md) hanya memungkinkan menggunakan node `file`, atau file deklarasi JS atau TS.
// - Mengambil konten Markdown eksternal hanya memungkinkan menggunakan file deklarasi JS atau TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "": {
        "nodeType": "file",
        "file": "./myMarkdown.md",
      },
    },

    "contentMultilingualFile": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.en.md",
          },
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.fr.md",
          },
        },
        "es": {
          "nodeType": "markdown",
          "markdown": {
            "nodeType": "file",
            "file": "./myMarkdown.es.md",
          },
        },
      },
    },
  },
}
```

## Menggunakan Markdown dengan React Intlayer

Untuk merender konten Markdown dalam aplikasi React, Anda dapat memanfaatkan hook `useIntlayer` dari paket `react-intlayer` bersama dengan penyedia rendering Markdown. Dalam contoh ini, kami menggunakan paket [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) untuk mengonversi Markdown menjadi HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="esm"
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="commonjs"
const { useIntlayer, MarkdownProvider } = require("react-intlayer");
const Markdown = require("markdown-to-jsx");

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

module.exports = {
  AppProvider,
};
```

Dalam implementasi ini:

- `MarkdownProvider` membungkus aplikasi (atau bagian relevan darinya) dan menerima fungsi `renderMarkdown`. Fungsi ini digunakan untuk mengonversi string Markdown menjadi JSX menggunakan paket `markdown-to-jsx`.
- Hook `useIntlayer` digunakan untuk mengambil konten Markdown (`myMarkdownContent`) dari kamus dengan kunci `"app"`.
- Konten Markdown dirender langsung di dalam komponen, dan rendering Markdown ditangani oleh provider.

### Menggunakan Markdown dengan Next Intlayer

Implementasi menggunakan paket `next-intlayer` mirip dengan yang di atas. Perbedaannya hanya pada fungsi `renderMarkdown` yang harus diteruskan ke komponen `MarkdownProvider` dalam komponen client.

```tsx title="src/providers/IntlayerMarkdownProvider.tsx" codeFormat="typescript"
"use client";

import type { FC, PropsWithChildren } from "react";
import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown: string) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.msx" codeFormat="esm"
"use client";

import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.csx" codeFormat="commonjs"
"use client";

const { MarkdownProvider } = require("next-intlayer");

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

## Sumber Daya Tambahan

- [Dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md)
- [Dokumentasi React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)
- [Dokumentasi Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)
- [markdown-to-jsx di npm](https://www.npmjs.com/package/markdown-to-jsx)

Sumber daya ini memberikan wawasan lebih lanjut tentang pengaturan dan penggunaan Intlayer dengan berbagai jenis konten dan framework.
