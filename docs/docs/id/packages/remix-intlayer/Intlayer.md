---
createdAt: 2026-09-19
updatedAt: 2026-09-19
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

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## Deskripsi

`Intlayer` digunakan oleh middleware `intlayer()` untuk mengikat state sesi saat ini ke konteks permintaan Remix (`RequestContext`). Biasanya disarankan menggunakan hook seperti `useLocale()` atau `useIntlayer()`. Akses langsung melalui `context.get(Intlayer)` berguna dalam handler middleware tingkat rendah atau rute API di mana instans konteks diteruskan secara eksplisit.

## Dokumentasi Terkait

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useLocale.md)
