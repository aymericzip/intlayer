---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Hook useDictionary | next-intlayer
description: Lihat cara menggunakan hook useDictionary untuk paket next-intlayer
keywords:
  - useDictionary
  - kamus
  - kunci
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Integrasi React: Dokumentasi Hook `useDictionary`

Bagian ini memberikan panduan rinci tentang penggunaan hook `useDictionary` dalam aplikasi React, memungkinkan penanganan konten yang dilokalisasi secara efisien tanpa editor visual.

## Mengimpor `useDictionary` di React

Hook `useDictionary` dapat diintegrasikan ke dalam aplikasi React dengan mengimpornya berdasarkan konteks:

- **Komponen Klien:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Digunakan dalam komponen React sisi klien
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Digunakan dalam komponen React sisi klien
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Digunakan dalam komponen React sisi klien
  ```

- **Komponen Server:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Digunakan dalam komponen React sisi server
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Digunakan dalam komponen React sisi server
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Digunakan dalam komponen React sisi server
  ```

## Parameter

Hook ini menerima dua parameter:

1. **`dictionary`**: Objek kamus yang dideklarasikan berisi konten terlokalisasi untuk kunci tertentu.
2. **`locale`** (opsional): Locale yang diinginkan. Defaultnya adalah locale dari konteks saat ini jika tidak ditentukan.

## Kamus

Semua objek kamus harus dideklarasikan dalam file konten terstruktur untuk memastikan keamanan tipe dan mencegah kesalahan saat runtime. Anda dapat menemukan [instruksi pengaturan di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md). Berikut adalah contoh deklarasi konten:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// contoh deklarasi konten menggunakan format ESM
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// contoh deklarasi konten menggunakan format CommonJS
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Contoh Penggunaan di Komponen Client React

Di bawah ini adalah contoh cara menggunakan hook `useDictionary` dalam sebuah komponen React:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

// Contoh komponen klien menggunakan useDictionary
const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Contoh Penggunaan di React Server Component

Jika Anda menggunakan hook `useDictionary` di luar `IntlayerServerProvider`, locale harus secara eksplisit diberikan sebagai parameter saat merender komponen:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Catatan tentang Atribut

Berbeda dengan integrasi yang menggunakan editor visual, atribut seperti `buttonTitle.value` tidak berlaku di sini. Sebagai gantinya, akses langsung string yang sudah dilokalisasi seperti yang dideklarasikan dalam konten Anda.

```jsx
<button title={content.title}>{content.content}</button>
```

## Tips Tambahan

- **Keamanan Tipe**: Selalu gunakan `Dictionary` untuk mendefinisikan kamus Anda agar memastikan keamanan tipe.
- **Pembaruan Lokalisasi**: Saat memperbarui konten, pastikan semua locale konsisten untuk menghindari terjemahan yang hilang.

Dokumentasi ini berfokus pada integrasi hook `useDictionary`, menyediakan pendekatan yang efisien untuk mengelola konten yang dilokalisasi tanpa bergantung pada fungsi editor visual.
