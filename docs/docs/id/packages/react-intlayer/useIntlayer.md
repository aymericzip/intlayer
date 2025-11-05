---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Hook useIntlayer | react-intlayer
description: Lihat cara menggunakan hook useIntlayer untuk paket react-intlayer
keywords:
  - useIntlayer
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
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Integrasi React: Dokumentasi Hook `useIntlayer`

Bagian ini memberikan panduan rinci tentang penggunaan hook `useIntlayer` dalam aplikasi React, memungkinkan lokalisasi konten yang efisien.

## Mengimpor `useIntlayer` di React

Hook `useIntlayer` dapat diintegrasikan ke dalam aplikasi React dengan mengimpornya berdasarkan konteks:

- **Komponen Klien:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Digunakan dalam komponen React sisi klien
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Digunakan dalam komponen React sisi klien
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Digunakan dalam komponen React sisi klien
  ```

- **Komponen Server:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Digunakan dalam komponen React sisi server
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Digunakan dalam komponen React sisi server
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Digunakan dalam komponen React sisi server
  ```

## Parameter

Hook ini menerima dua parameter:

1. **`key`**: Kunci kamus untuk mengambil konten yang sudah dilokalkan.
2. **`locale`** (opsional): Locale yang diinginkan. Default-nya adalah locale dari konteks jika tidak ditentukan.

## Kamus

Semua kunci kamus harus dideklarasikan dalam file deklarasi konten untuk meningkatkan keamanan tipe dan menghindari kesalahan. Anda dapat menemukan [instruksi pengaturan di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

## Contoh Penggunaan di React

Menunjukkan penggunaan hook `useIntlayer` dalam sebuah komponen React:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react.intlayer/server";

tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Menangani Atribut

Saat melokalisasi atribut, akses nilai konten dengan tepat:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Sumber Daya Tambahan

- **Intlayer Visual Editor**: Untuk pengalaman manajemen konten yang lebih intuitif, lihat dokumentasi editor visual [di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Bagian ini secara khusus menargetkan integrasi hook `useIntlayer` dalam aplikasi React, menyederhanakan proses lokalisasi dan memastikan konsistensi konten di berbagai locale.
