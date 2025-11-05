---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi t | next-intlayer
description: Lihat cara menggunakan fungsi t untuk paket next-intlayer
keywords:
  - t
  - terjemahan
  - Intlayer
  - next-intlayer
  - Internasionalisasi
  - Dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `t` di `next-intlayer`

Fungsi `t` dalam paket `next-intlayer` adalah alat fundamental untuk internasionalisasi inline dalam aplikasi Next.js Anda. Fungsi ini memungkinkan Anda mendefinisikan terjemahan langsung di dalam komponen Anda, sehingga memudahkan untuk menampilkan konten yang dilokalisasi berdasarkan locale saat ini.

---

## Ikhtisar

Fungsi `t` digunakan untuk menyediakan terjemahan untuk berbagai locale langsung di dalam komponen Anda. Dengan melewatkan sebuah objek yang berisi terjemahan untuk setiap locale yang didukung, `t` mengembalikan terjemahan yang sesuai berdasarkan konteks locale saat ini dalam aplikasi Next.js Anda.

---

## Fitur Utama

- **Terjemahan Inline**: Ideal untuk teks cepat dan inline yang tidak memerlukan deklarasi konten terpisah.
- **Pemilihan Locale Otomatis**: Mengembalikan terjemahan yang sesuai dengan locale saat ini secara otomatis.
- **Dukungan TypeScript**: Menyediakan keamanan tipe dan autocompletion saat digunakan dengan TypeScript.
- **Integrasi Mudah**: Bekerja dengan mulus di dalam komponen client dan server di Next.js.

---

## Tanda Tangan Fungsi

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameter

- `translations`: Sebuah objek di mana kunci adalah kode locale (misalnya, `en`, `fr`, `es`) dan nilainya adalah string terjemahan yang sesuai.

### Mengembalikan

- Sebuah string yang mewakili konten terjemahan untuk locale saat ini.

---

## Contoh Penggunaan

### Menggunakan `t` dalam Komponen Client

Pastikan Anda menyertakan direktif `'use client';` di bagian atas file komponen Anda saat menggunakan `t` dalam komponen sisi client.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Menggunakan `t` dalam Komponen Server

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Terjemahan Inline dalam Atribut

Fungsi `t` sangat berguna untuk terjemahan inline dalam atribut JSX.
Saat melokalkan atribut seperti `alt`, `title`, `href`, atau `aria-label`, Anda dapat menggunakan `t` langsung di dalam atribut.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Topik Lanjutan

### Integrasi TypeScript

Fungsi `t` aman secara tipe saat digunakan dengan TypeScript, memastikan semua locale yang diperlukan disediakan.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Deteksi Locale dan Konteks

Dalam `next-intlayer`, locale saat ini dikelola melalui context providers: `IntlayerClientProvider` dan `IntlayerServerProvider`. Pastikan provider ini membungkus komponen Anda dan properti `locale` diteruskan dengan benar.

#### Contoh:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Komponen Anda di sini */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Komponen Anda di sini */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Komponen Anda di sini */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Kesalahan Umum dan Pemecahan Masalah

### `t` Mengembalikan Undefined atau Terjemahan yang Salah

- **Penyebab**: Locale saat ini tidak diatur dengan benar, atau terjemahan untuk locale saat ini tidak ada.
- **Solusi**:
  - Pastikan bahwa `IntlayerClientProvider` atau `IntlayerServerProvider` telah diatur dengan benar menggunakan `locale` yang sesuai.
  - Pastikan bahwa objek terjemahan Anda mencakup semua locale yang diperlukan.

### Terjemahan Hilang di TypeScript

- **Penyebab**: Objek terjemahan tidak memenuhi locale yang diperlukan, menyebabkan error TypeScript.
- **Solusi**: Gunakan tipe `IConfigLocales` untuk memastikan kelengkapan terjemahan Anda.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Hilangnya 'es' akan menyebabkan error TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Hilangnya 'es' akan menyebabkan error TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Hilangnya 'es' akan menyebabkan error TypeScript [!code error]
};

const text = t(translations);
```

---

## Tips untuk Penggunaan Efektif

1. **Gunakan `t` untuk Terjemahan Inline Sederhana**: Ideal untuk menerjemahkan potongan teks kecil langsung di dalam komponen Anda.
2. **Lebih Pilih `useIntlayer` untuk Konten Terstruktur**: Untuk terjemahan yang lebih kompleks dan penggunaan ulang konten, definisikan konten dalam file deklarasi dan gunakan `useIntlayer`.
3. **Penyediaan Locale yang Konsisten**: Pastikan locale Anda disediakan secara konsisten di seluruh aplikasi melalui penyedia yang sesuai.
4. **Manfaatkan TypeScript**: Gunakan tipe TypeScript untuk menangkap terjemahan yang hilang dan memastikan keamanan tipe.

---

## Kesimpulan

Fungsi `t` dalam `next-intlayer` adalah alat yang kuat dan praktis untuk mengelola terjemahan inline dalam aplikasi Next.js Anda. Dengan mengintegrasikannya secara efektif, Anda meningkatkan kemampuan internasionalisasi aplikasi Anda, memberikan pengalaman yang lebih baik bagi pengguna di seluruh dunia.

Untuk penggunaan yang lebih rinci dan fitur lanjutan, lihat [dokumentasi next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

---

**Catatan**: Ingatlah untuk mengatur `IntlayerClientProvider` dan `IntlayerServerProvider` Anda dengan benar agar locale saat ini diteruskan dengan tepat ke komponen Anda. Ini sangat penting agar fungsi `t` mengembalikan terjemahan yang benar.
