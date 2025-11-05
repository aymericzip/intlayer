---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Dokumentasi React Intlayer
description: Panduan lengkap untuk menggunakan hook useDictionary dalam aplikasi React dengan Intlayer untuk penanganan konten lokal yang efisien tanpa editor visual.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - lokalisasi
  - i18n
  - kamus
  - terjemahan
slugs:
  - doc
  - package
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Riwayat awal
---

# Integrasi React: Dokumentasi Hook `useDictionary`

Bagian ini memberikan panduan terperinci tentang penggunaan hook `useDictionary` dalam aplikasi React, memungkinkan penanganan konten lokal yang efisien tanpa editor visual.

## Mengimpor `useDictionary` dalam React

Hook `useDictionary` dapat diintegrasikan ke dalam aplikasi React dengan mengimpornya berdasarkan konteks:

- **Komponen Klien:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Digunakan dalam komponen React sisi klien
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Digunakan dalam komponen React sisi klien
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Digunakan dalam komponen React sisi klien
  ```

- **Komponen Server:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Digunakan dalam komponen React sisi server
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Digunakan dalam komponen React sisi server
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Digunakan dalam komponen React sisi server
  ```

## Parameter

Hook ini menerima dua parameter:

1. **`dictionary`**: Objek kamus yang dideklarasikan berisi konten yang dilokalisasi untuk kunci tertentu.
2. **`locale`** (opsional): Locale yang diinginkan. Defaultnya adalah locale konteks saat ini jika tidak ditentukan.

## Kamus

Semua objek kamus harus dideklarasikan dalam file konten terstruktur untuk memastikan keamanan tipe dan mencegah kesalahan runtime. Anda dapat menemukan [instruksi pengaturan di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md). Berikut adalah contoh deklarasi konten:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ini adalah konten dari contoh komponen klien",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "Ini adalah konten dari contoh komponen klien", // komentar dalam bahasa Indonesia
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "id": "Contoh Komponen Klien"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "id": "Ini adalah konten dari contoh komponen klien"
      }
    }
  }
}
```

## Contoh Penggunaan di React

Berikut adalah contoh cara menggunakan hook `useDictionary` dalam sebuah komponen React:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Integrasi Server

Jika Anda menggunakan hook `useDictionary` di luar `IntlayerProvider`, locale harus secara eksplisit diberikan sebagai parameter saat merender komponen:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Catatan tentang Atribut

Berbeda dengan integrasi yang menggunakan editor visual, atribut seperti `buttonTitle.value` tidak berlaku di sini. Sebagai gantinya, akses langsung string yang sudah dilokalisasi sesuai dengan deklarasi dalam konten Anda.

```jsx
<button title={content.title}>{content.content}</button>
```

## Tips Tambahan

- **Keamanan Tipe**: Selalu gunakan `Dictionary` untuk mendefinisikan kamus Anda agar memastikan keamanan tipe.
- **Pembaruan Lokalisasi**: Saat memperbarui konten, pastikan semua locale konsisten untuk menghindari terjemahan yang hilang.

Dokumentasi ini berfokus pada integrasi hook `useDictionary`, memberikan pendekatan yang lebih sederhana untuk mengelola konten yang dilokalisasi tanpa bergantung pada fungsi editor visual.
