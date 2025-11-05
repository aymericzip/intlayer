---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Hook useI18n | react-intlayer
description: Pelajari cara menggunakan hook useI18n dalam paket react-intlayer
keywords:
  - useI18n
  - i18n
  - terjemahan
  - kamus
  - Intlayer
  - internasionalisasi
  - dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
history:
  - version: 6.0.0
    date: 2025-06-29
    changes: Penulisan awal dokumentasi hook `useI18n`
---

# Integrasi React: Dokumentasi Hook `useI18n`

Bagian ini memberikan panduan rinci tentang cara menggunakan hook `useI18n` dalam aplikasi React, memungkinkan lokalisasi konten yang efisien.

## Mengimpor `useI18n` di React

Hook `useI18n` dapat diimpor dan diintegrasikan ke dalam aplikasi React sesuai dengan konteks sebagai berikut:

- **Komponen Klien:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Digunakan dalam komponen React sisi klien
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Digunakan dalam komponen React sisi klien
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Digunakan dalam komponen React sisi klien
  ```

- **Komponen Server:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Digunakan dalam komponen React sisi server
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Digunakan dalam komponen React sisi server
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Digunakan dalam komponen React sisi server
  ```

## Parameter

Hook ini menerima dua parameter:

1. **`namespace`**: Namespace kamus untuk membatasi ruang lingkup kunci terjemahan.
2. **`locale`** (opsional): Locale yang diinginkan. Jika tidak ditentukan, locale dari konteks akan digunakan sebagai default.

## Kamus

Semua kunci kamus harus dideklarasikan dalam file deklarasi konten untuk meningkatkan keamanan tipe dan mencegah kesalahan. [Instruksi konfigurasi dapat ditemukan di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

## Contoh Penggunaan dalam React

Contoh penggunaan hook `useI18n` dalam komponen React:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Tampilkan judul */}
      <p>{t("description")}</p> {/* Tampilkan deskripsi */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Tampilkan judul */}
      <p>{t("description")}</p> {/* Tampilkan deskripsi */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Tampilkan judul */}
      <p>{t("description")}</p> {/* Tampilkan deskripsi */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react.intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Tampilkan judul */}
      <p>{t("description")}</p> {/* Tampilkan deskripsi */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Tampilkan judul */}
      <p>{t("description")}</p> {/* Tampilkan deskripsi */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Tampilkan judul */}
      <p>{t("description")}</p> {/* Tampilkan deskripsi */}
    </div>
  );
};
```

## Penanganan Atribut

Saat melokalisasi atribut, akses nilai terjemahan dengan tepat:

```jsx
<!-- Untuk atribut aksesibilitas (misalnya, aria-label), gunakan .value karena diperlukan string murni -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Sumber Daya Tambahan

- **Intlayer Visual Editor**: Untuk pengalaman manajemen konten yang lebih intuitif, lihat dokumentasi editor visual [di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Bagian ini secara khusus membahas integrasi hook `useI18n` dalam aplikasi React, yang menyederhanakan proses lokalisasi dan memastikan konsistensi konten di berbagai locale.
