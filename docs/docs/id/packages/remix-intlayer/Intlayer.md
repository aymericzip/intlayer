---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentasi Konteks Intlayer | remix-intlayer
description: Dokumentasi kunci penyimpanan konteks permintaan Intlayer di aplikasi Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - konteks permintaan
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumentasi kunci konteks Intlayer"
author: aymericzip
---

# Kunci Konteks Permintaan Intlayer

Ekspor `Intlayer` berfungsi sebagai pengidentifikasi penyimpanan konteks permintaan di Remix 3. Ini memungkinkan Anda mengambil status Intlayer langsung dari objek konteks Remix di dalam handler rute atau middleware kustom.

## Penggunaan

Saat middleware `intlayer()` berjalan, middleware tersebut menyimpan objek `IntlayerState` di konteks permintaan dengan kunci `Intlayer`. Anda dapat mengambilnya di dalam handler rute mana pun:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Akses melalui context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Anda juga dapat mengaksesnya menggunakan pintasan properti langsung `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Struktur `IntlayerState`

Objek `IntlayerState` berisi:

| Properti           | Tipe                | Deskripsi                                                          |
| ------------------ | ------------------- | ------------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | Locale yang ditentukan untuk permintaan saat ini.                  |
| `defaultLocale`    | `DeclaredLocales`   | Locale cadangan yang didefinisikan di `intlayer.config.ts`.        |
| `availableLocales` | `DeclaredLocales[]` | Daftar semua locale yang didukung yang dikonfigurasi untuk proyek. |

## Dokumentasi Terkait

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useIntlayer.md)
