---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Membuat komponen multibahasa (perpustakaan i18n) di React dan Next.js
description: Pelajari cara mendeklarasikan dan mengambil konten yang dilokalkan untuk membangun komponen React atau Next.js multibahasa dengan Intlayer.
keywords:
  - i18n
  - komponen
  - react
  - multibahasa
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Cara membuat komponen multibahasa (i18n) dengan Intlayer

Panduan ini menunjukkan langkah minimal untuk membuat komponen UI multibahasa dalam dua pengaturan umum:

- React (Vite/SPA)
- Next.js (App Router)

Anda akan terlebih dahulu mendeklarasikan konten Anda, kemudian mengambilnya di dalam komponen Anda.

## 1) Deklarasikan konten Anda (dibagikan untuk React dan Next.js)

Buat file deklarasi konten di dekat komponen Anda. Ini menjaga terjemahan tetap dekat dengan tempat mereka digunakan dan memungkinkan keamanan tipe.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

JSON juga didukung jika Anda lebih suka menggunakan file konfigurasi.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Ambil konten Anda

### Kasus A — Aplikasi React (Vite/SPA)

Pendekatan default: gunakan `useIntlayer` untuk mengambil berdasarkan key. Ini menjaga komponen tetap ramping dan bertipe.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Rendering sisi server atau di luar provider: gunakan `react-intlayer/server` dan berikan `locale` secara eksplisit saat diperlukan.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Alternatif: `useDictionary` dapat membaca seluruh objek yang dideklarasikan jika Anda lebih suka menempatkan struktur di lokasi pemanggilan.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Kasus B — Next.js (App Router)

Utamakan komponen server untuk keamanan data dan performa. Gunakan `useIntlayer` dari `next-intlayer/server` di file server, dan `useIntlayer` dari `next-intlayer` di komponen klien.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Tip: Untuk metadata halaman dan SEO, Anda juga dapat mengambil konten menggunakan `getIntlayer` dan menghasilkan URL multibahasa melalui `getMultilingualUrls`.

## Mengapa pendekatan komponen Intlayer adalah yang terbaik

- **Kolokasi**: Deklarasi konten berada dekat dengan komponen, mengurangi pergeseran dan meningkatkan penggunaan ulang di seluruh sistem desain.
- **Keamanan tipe**: Kunci dan struktur memiliki tipe yang kuat; terjemahan yang hilang muncul saat build-time, bukan saat runtime.
- **Server-first**: Bekerja secara native di komponen server untuk keamanan dan performa yang lebih baik; hooks klien tetap ergonomis.
- **Tree-shaking**: Hanya konten yang digunakan oleh komponen yang dibundel, menjaga ukuran payload tetap kecil pada aplikasi besar.
- **DX & tooling**: Middleware bawaan, helper SEO, dan terjemahan Visual Editor/AI opsional mempermudah pekerjaan sehari-hari.

Lihat perbandingan dan pola dalam rangkuman yang berfokus pada Next.js: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Panduan dan referensi terkait

- Setup React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- Mulai TanStack: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Setup Next.js: https://intlayer.org/doc/environment/nextjs
- Mengapa Intlayer dibandingkan dengan next-intl dan next-i18next: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Halaman-halaman ini mencakup setup menyeluruh, penyedia, routing, dan helper SEO.
