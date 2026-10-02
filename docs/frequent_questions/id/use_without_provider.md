---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: "Bisakah saya menggunakan Intlayer tanpa provider global?"
description: "Membaca konten Intlayer tanpa memasang provider, bagaimana locale di-resolve di server dan di browser, serta perbedaan performa dibandingkan dengan provider."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - performa
  - hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Bisakah saya menggunakan Intlayer tanpa provider global?

Bisa. `getIntlayer` dan `getDictionary` adalah fungsi biasa yang tidak memerlukan provider apa pun, dan `useIntlayer` juga berfungsi di luar provider.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Tidak ada locale yang diberikan
```

## Locale mana yang digunakan?

Locale yang diberikan secara eksplisit selalu diutamakan. Jika tidak, locale di-resolve dengan urutan berikut:

1. **Locale dari request saat ini**, di server, ketika sebuah integrasi Intlayer menanganinya: middleware dari `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer`, dan `astro-intlayer`, atau `IntlayerProvider` di React Server Components.
2. **Locale yang tersimpan di browser** (cookie, `localStorage`, `sessionStorage`), yaitu yang disimpan oleh locale switcher Anda.
3. **`defaultLocale`** dari konfigurasi Anda.

Setiap request di-resolve dari cookies dan headers miliknya sendiri, dan disimpan dalam scope khusus request tersebut. Pengguna yang bersamaan dengan locale berbeda tidak pernah berbagi locale.

Resolusi yang sama berlaku untuk `getDictionary`, untuk pemanggilan yang ditulis ulang oleh [optimasi build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md), serta untuk `useIntlayer` dan `useDictionaryDynamic` yang di-render di luar provider.

- [optimasi build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)

[Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) (`number`, `date`, `list`…) dan hook-nya (`useNumber`, `useDate`, `useList`…) mengikuti urutan yang sama saat tidak ada `locale` yang diberikan.

- [Formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md)

### Server Components Next.js

Di Next.js, locale request hanya bisa dibaca secara asinkron, melalui `headers()` dan `cookies()`. Gunakan [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayerAsync.md), yang menunggunya dengan cara yang sama seperti `getLocale()` dari `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale dari request

  return { title };
};
```

Membaca headers membuat route beralih ke rendering dinamis. Ketika `IntlayerProvider` sudah menyediakan locale, headers tidak dibaca dan route tetap statis.

## Performa: dengan atau tanpa provider

Kontennya sama. Perbedaannya ada pada reaktivitas dan biaya rendering.

|                     | Dengan provider                                  | Tanpa provider                                                                                                           |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Pergantian locale   | Komponen di-render ulang di tempat, tanpa reload | Tidak ada yang di-render ulang; locale baru muncul pada pemanggilan berikutnya (navigasi, reload)                        |
| Biaya pembacaan     | Lookup context dan langganan ke locale           | Pemanggilan fungsi yang di-memoize, objek yang sama untuk `key + locale` yang sama                                       |
| Biaya pergantian    | Render ulang setiap consumer                     | Tidak ada                                                                                                                |
| Rendering di server | Server dan browser me-render locale yang sama    | Di luar integrasi request, server me-render `defaultLocale` dan browser locale tersimpan: kemungkinan hydration mismatch |
| Bundle              | Kode provider                                    | Sekitar 100 byte (gzip) untuk membaca locale tersimpan, di-cache hingga perubahan berikutnya                             |

Pertahankan provider untuk aplikasi interaktif yang mengganti locale di tempat atau me-render di server. Tidak perlu provider untuk backend, script, halaman statis yang locale-nya berasal dari URL (berikan secara eksplisit), atau kode yang membaca konten sekali saja.

Lihat [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md) untuk detail lebih lanjut.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getIntlayer.md)
