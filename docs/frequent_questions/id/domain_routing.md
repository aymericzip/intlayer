---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Cara mengonfigurasi routing berbasis domain?
description: Pelajari cara mengonfigurasi routing berbasis domain.
keywords:
  - domain
  - routing
  - intlayer
  - konfigurasi
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - frequent-questions
  - domain-routing
---

# Bagaimana cara mengonfigurasi **routing berbasis domain** dengan Intlayer daripada menggunakan path `/[locale]/`?

## Jawaban singkat

Routing berbasis domain lebih sederhana daripada routing berbasis path (`example.com/[locale]/`) karena Anda dapat melewati semua konfigurasi middleware dan routing. Cukup deploy aplikasi Anda ke setiap domain bahasa dan atur satu variabel lingkungan per domain.

## Langkah demi langkah

1. **Deploy sekali untuk setiap domain** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Untuk setiap deployment, atur `LOCALE` (dan variabel lingkungan Intlayer yang biasa) ke locale yang harus dilayani oleh domain tersebut.
3. Referensikan variabel tersebut sebagai `defaultLocale` di `intlayer.config.[ts|js]` Anda.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 domain menentukan locale
  },
  // ... sisa konfigurasi Anda
};

export default config;
```

Itu saja—cara kerjanya sama untuk **Next.js**, **Vite + React**, **Vite + Vue**, dll.

## Bagaimana jika setiap domain mengarah ke deployment **yang sama**?

Jika semua domain mengarah ke bundle aplikasi yang sama, Anda perlu mendeteksi host saat runtime dan mengoper locale secara manual melalui provider.

### Untuk Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 👈 dapatkan locale dari hostname jika locale tidak diberikan
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Untuk Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // 👈 pasang Intlayer dengan locale dari hostname
app.mount("#app");
```

Ganti `getLocaleFromHostname()` dengan logika pencarian Anda sendiri.

## Perbarui pengalih locale Anda

Saat menggunakan routing berbasis domain, mengganti bahasa berarti menavigasi ke domain lain:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target]; // 👈 navigasi ke domain sesuai locale target
}
```

## Manfaat routing berbasis domain

1. **Konfigurasi lebih sederhana**: Tidak perlu mengonfigurasi `intlayerMiddleware`, `generateStaticParams`, `react-router`, atau `vue-router`
2. **SEO yang lebih baik**: Setiap bahasa memiliki domainnya sendiri
3. **URL yang lebih bersih**: Tidak ada prefix locale di jalur
4. **Pemeliharaan yang lebih mudah**: Setiap deployment bahasa bersifat independen
