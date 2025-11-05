---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Hook useIntlayer | next-intlayer
description: Lihat cara menggunakan hook useIntlayer untuk paket next-intlayer
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
  - next-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Riwayat awal
---

# Integrasi Next.js: Dokumentasi Hook `useIntlayer`

Hook `useIntlayer` dirancang khusus untuk aplikasi Next.js guna mengambil dan mengelola konten yang dilokalisasi secara efisien. Dokumentasi ini akan fokus pada cara menggunakan hook ini dalam proyek Next.js, memastikan praktik lokalisasi yang tepat.

## Mengimpor `useIntlayer` di Next.js

Tergantung pada apakah Anda bekerja pada komponen sisi klien atau sisi server dalam aplikasi Next.js, Anda dapat mengimpor hook `useIntlayer` sebagai berikut:

- **Komponen Klien:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Digunakan dalam komponen sisi klien
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Digunakan dalam komponen sisi klien
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Digunakan dalam komponen sisi klien
  ```

- **Komponen Server:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Digunakan dalam komponen sisi server
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Digunakan dalam komponen sisi server
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Digunakan dalam komponen sisi server
  ```

## Parameter

1. **`key`**: Identifier string untuk kunci kamus dari mana Anda ingin mengambil konten.
2. **`locale`** (opsional): Locale spesifik yang akan digunakan. Jika tidak disertakan, hook akan menggunakan locale yang disetel dalam konteks klien atau server.

## File Kamus

Sangat penting bahwa semua kunci konten didefinisikan dalam file deklarasi konten untuk mencegah kesalahan saat runtime dan memastikan keamanan tipe. Pendekatan ini juga memudahkan integrasi TypeScript untuk validasi saat kompilasi.

Instruksi untuk mengatur file deklarasi konten tersedia [di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

## Contoh Penggunaan di Next.js

Berikut cara mengimplementasikan hook `useIntlayer` dalam halaman Next.js untuk memuat konten yang dilokalkan secara dinamis berdasarkan locale aplikasi saat ini:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Penanganan Lokalisasi Atribut

Untuk melokalisasi atribut seperti `alt`, `title`, `href`, `aria-label`, dll., pastikan Anda merujuk konten dengan benar:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Informasi Lebih Lanjut

- **Intlayer Visual Editor**: Pelajari cara menggunakan editor visual untuk manajemen konten yang lebih mudah [di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Dokumentasi ini menguraikan penggunaan hook `useIntlayer` secara khusus dalam lingkungan Next.js, menyediakan solusi yang kuat untuk mengelola lokalisasi di seluruh aplikasi Next.js Anda.
