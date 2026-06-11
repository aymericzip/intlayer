---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Tipe IntlayerNode. Apa itu?
description: Apa itu tipe IntlayerNode? Mengapa string saya diubah menjadi IntlayerNode&lt;string&gt;?
keywords:
  - Pendahuluan
  - Memulai
  - Intlayer
  - Aplikasi
  - Paket
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Inisialisasi dokumen"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Apa itu tipe IntlayerNode?

Tipe `IntlayerNode<T>` adalah tipe khusus yang disediakan oleh paket-paket intlayer seperti `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer`, dan `vanilla-intlayer`.

## Contoh penggunaan

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // mengembalikan tipe: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo tambahkan framework lain sebagai tab seperti pada docs/docs/id/dictionary/markdown.md
</Tabs>

### Mengapa Intlayer menyisipkan IntlayerNode?

Intlayer menyisipkan IntlayerNode agar dapat merender Selektor Editor Visual dalam konteks CMS / Editor Visual.

![Demo Editor Visual](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

IntlayerNode adalah node React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla yang diperkaya, tetapi juga memungkinkan akses ke properti dari node primitif dasar.

Sebagai contoh:

```js
const content = useIntlayer("app");

// Kasus String
content.title; // Mengembalikan IntlayerNode&lt;string&gt;
content.title.value; // Mengembalikan konten dasar, dalam hal ini sebuah string

content.title.toString(); // Mengembalikan string
content.title.toLowerCase(); // Mengembalikan string
String(content.title); // Mengembalikan string
content.title.toUpperCase(); // Mengembalikan string huruf besar
content.title.replace("a", "b"); // Mengembalikan string yang dimodifikasi
// ...
```

> Mengakses properti dari IntlayerNode akan berfungsi, tetapi akan mematahkan kemampuan untuk menampilkan selektor di Editor Visual.

> IntlayerNode juga dapat membungkus angka, atau tipe lain seperti `IntlayerNode<number>`
