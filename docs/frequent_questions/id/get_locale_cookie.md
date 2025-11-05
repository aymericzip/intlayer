---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Cara mengambil locale dari cookies / headers?
description: Pelajari cara mengambil locale dari cookies / headers.
keywords:
  - cookie
  - headers
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Cara mengambil locale dari cookies / headers

## Menggunakan Hooks (Direkomendasikan)

Untuk sebagian besar kasus penggunaan, disarankan untuk mengambil locale saat ini menggunakan hook `useLocale` karena ini otomatis ter-resolve. Ini bekerja serupa dengan composable `useLocale` di Vue.js.

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// or import { useLocale } from "vue-intlayer";

// Penggunaan di sisi klien
const { locale } = useLocale();
```

Untuk komponen server, Anda dapat mengimpornya dari:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

Ada juga hook `useLocaleCookie` yang hanya mengambil nilai cookie.

## Konfigurasi Cookie Manual

Anda dapat mendeklarasikan nama cookie kustom sebagai

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // default adalah 'intlayer-locale'
  },
};

export default config;
```

kemudian mengambilnya sebagai

### Sisi Klien

```ts
// Menggunakan nama cookie default
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Menggunakan nama cookie kustom
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Sisi Server (Next.js)

```ts
import { cookies } from "next/headers";

// Menggunakan nama cookie default
const locale = cookies().get("intlayer-locale")?.value;

// Menggunakan nama cookie kustom
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Jika locale belum disetel

Locale disetel sebagai cookie hanya setelah pengguna secara eksplisit memilih locale. Secara default, untuk pengunjung baru, locale diinterpretasikan dari field headers.

Anda dapat mendeteksi locale yang disukai pengguna dari headers permintaan. Berikut adalah contoh cara menanganinya:

```ts
/**
 * Mendeteksi locale dari headers permintaan
 *
 * Header accept-language adalah yang paling penting untuk deteksi locale.
 * Header ini berisi daftar kode bahasa dengan nilai kualitas (q-values) yang menunjukkan
 * bahasa yang disukai pengguna berdasarkan urutan preferensi.
 *
 * Contoh: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US adalah bahasa utama (q=1.0 diasumsikan)
 * - en adalah pilihan kedua (q=0.9)
 * - fr adalah pilihan ketiga (q=0.8)
 * - es adalah pilihan keempat (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Contoh header negosiator yang biasanya dikirim oleh browser
 * Header ini membantu menentukan bahasa yang disukai pengguna
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Contoh penggunaan:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
