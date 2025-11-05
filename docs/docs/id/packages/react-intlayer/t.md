---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi t | react-intlayer
description: Lihat cara menggunakan fungsi t untuk paket react-intlayer
keywords:
  - t
  - terjemahan
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
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Dokumentasi: Fungsi `t` di `react-intlayer`

Fungsi `t` dalam paket `react-intlayer` adalah alat dasar untuk internasionalisasi inline dalam aplikasi React Anda. Fungsi ini memungkinkan Anda mendefinisikan terjemahan langsung di dalam komponen Anda, sehingga memudahkan untuk menampilkan konten yang dilokalkan berdasarkan locale saat ini.

---

## Ikhtisar

Fungsi `t` digunakan untuk menyediakan terjemahan untuk berbagai locale langsung di dalam komponen Anda. Dengan melewatkan sebuah objek yang berisi terjemahan untuk setiap locale yang didukung, `t` mengembalikan terjemahan yang sesuai berdasarkan konteks locale saat ini dalam aplikasi React Anda.

---

## Fitur Utama

- **Terjemahan Inline**: Ideal untuk teks cepat dan inline yang tidak memerlukan deklarasi konten terpisah.
- **Pemilihan Locale Otomatis**: Mengembalikan terjemahan yang sesuai dengan locale saat ini secara otomatis.
- **Dukungan TypeScript**: Menyediakan keamanan tipe dan autocompletion saat digunakan dengan TypeScript.
- **Integrasi Mudah**: Bekerja dengan mulus di dalam komponen React.

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

### Penggunaan Dasar `t` dalam Sebuah Komponen

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Terjemahan Inline dalam Atribut

Fungsi `t` sangat berguna untuk terjemahan inline dalam atribut JSX. Saat melokalisasi atribut seperti `alt`, `title`, `href`, atau `aria-label`, Anda dapat menggunakan `t` langsung di dalam atribut tersebut.

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

Fungsi `t` aman tipe saat digunakan dengan TypeScript, memastikan bahwa semua locale yang diperlukan disediakan.

```typescript codeFormat="typescript"
typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Deteksi Locale dan Konteks

Di `react-intlayer`, locale saat ini dikelola melalui `IntlayerProvider`. Pastikan provider ini membungkus komponen Anda dan properti `locale` diteruskan dengan benar.

#### Contoh:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Komponen Anda di sini */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Komponen Anda di sini */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Komponen Anda di sini */}
  </IntlayerProvider>
);
```

---

## Kesalahan Umum dan Pemecahan Masalah

### `t` Mengembalikan Undefined atau Terjemahan yang Salah

- **Penyebab**: Locale saat ini tidak disetel dengan benar, atau terjemahan untuk locale saat ini tidak ada.
- **Solusi**:
  - Pastikan `IntlayerProvider` sudah disiapkan dengan `locale` yang sesuai.
  - Pastikan objek terjemahan Anda mencakup semua locale yang diperlukan.

### Terjemahan Hilang di TypeScript

- **Penyebab**: Objek terjemahan tidak memenuhi locale yang diperlukan, menyebabkan kesalahan TypeScript.
- **Solusi**: Gunakan tipe `IConfigLocales` untuk memastikan kelengkapan terjemahan Anda.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Hilangnya 'es' akan menyebabkan error di TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Hilangnya 'es' akan menyebabkan error di TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Hilangnya 'es' akan menyebabkan error di TypeScript
};

const text = t(translations);
```

---

## Tips untuk Penggunaan Efektif

1. **Gunakan `t` untuk Terjemahan Inline Sederhana**: Ideal untuk menerjemahkan potongan teks kecil langsung di dalam komponen Anda.
2. **Lebih Pilih `useIntlayer` untuk Konten Terstruktur**: Untuk terjemahan yang lebih kompleks dan penggunaan ulang konten, definisikan konten dalam file deklarasi dan gunakan `useIntlayer`.
3. **Penyediaan Locale yang Konsisten**: Pastikan locale Anda disediakan secara konsisten di seluruh aplikasi melalui `IntlayerProvider`.
4. **Manfaatkan TypeScript**: Gunakan tipe TypeScript untuk menangkap terjemahan yang hilang dan memastikan keamanan tipe.

---

## Kesimpulan

Fungsi `t` dalam `react-intlayer` adalah alat yang kuat dan praktis untuk mengelola terjemahan inline dalam aplikasi React Anda. Dengan mengintegrasikannya secara efektif, Anda meningkatkan kemampuan internasionalisasi aplikasi Anda, memberikan pengalaman yang lebih baik bagi pengguna di seluruh dunia.

Untuk penggunaan yang lebih rinci dan fitur lanjutan, lihat [dokumentasi react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

---

**Catatan**: Ingat untuk mengatur `IntlayerProvider` Anda dengan benar agar locale saat ini diteruskan dengan tepat ke komponen Anda. Ini sangat penting agar fungsi `t` mengembalikan terjemahan yang benar.
