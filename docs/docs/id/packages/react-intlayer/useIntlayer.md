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
    changes: "Inisialisasi riwayat"
author: aymericzip
---

## Kamus

Semua kunci kamus harus dideklarasikan dalam file deklarasi konten untuk meningkatkan keamanan tipe dan menghindari kesalahan. Anda dapat menemukan [instruksi pengaturan di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

## Contoh Penggunaan di React

Menunjukkan penggunaan hook `useIntlayer` dalam sebuah komponen React:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

## Sumber Daya Tambahan

- **Intlayer Visual Editor**: Untuk pengalaman manajemen konten yang lebih intuitif, lihat dokumentasi editor visual [di sini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Bagian ini secara khusus menargetkan integrasi hook `useIntlayer` dalam aplikasi React, menyederhanakan proses lokalisasi dan memastikan konsistensi konten di berbagai locale.
