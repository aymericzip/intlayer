---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentasi Hook useLocale | remix-intlayer
description: Pelajari cara menggunakan hook useLocale di aplikasi Remix 3 untuk mendapatkan locale permintaan saat ini, locale default, dan daftar locale yang tersedia.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - internasionalisasi
  - dokumentasi
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumentasi hook useLocale"
author: aymericzip
---

# Dokumentasi Hook useLocale

Hook `useLocale` dari `remix-intlayer` menyediakan akses ke locale dari permintaan HTTP yang sedang diproses, bersama dengan locale default dan locale yang tersedia yang dikonfigurasi dalam proyek.

## Penggunaan

Dalam komponen Remix (misalnya pengalih bahasa):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

Di dalam handler rute:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## Nilai Kembalian

Hook mengembalikan objek bertipe `UseLocaleResult`:

| Properti           | Tipe                | Deskripsi                                                                         |
| ------------------ | ------------------- | --------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | Locale yang diselesaikan untuk permintaan saat ini.                               |
| `defaultLocale`    | `DeclaredLocales`   | Locale fallback default yang dikonfigurasi dalam `intlayer.config.ts`.            |
| `availableLocales` | `DeclaredLocales[]` | Array dari semua locale yang tersedia yang dikonfigurasi di `intlayer.config.ts`. |

## Deskripsi

1. **Penyelesaian Cakupan Permintaan**: Dalam permintaan aktif yang ditangani oleh middleware `intlayer()`, `useLocale` membaca locale yang diselesaikan dari penyimpanan permintaan.
2. **Fallback yang Aman**: Jika dipanggil di luar konteks permintaan (seperti selama skrip inisialisasi atau suite pengujian), ini akan kembali ke `defaultLocale` yang dikonfigurasi.

## Dokumentasi Terkait

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useDictionary.md)
