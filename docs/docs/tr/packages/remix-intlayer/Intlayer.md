---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Intlayer Bağlamı Dokümantasyonu | remix-intlayer
description: Remix 3 uygulamalarında Intlayer istek bağlamı depolama anahtarı dokümantasyonu.
keywords:
  - Intlayer
  - remix
  - remix-3
  - istek bağlamı
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Intlayer bağlam anahtarı başlangıç dokümantasyonu"
author: aymericzip
---

# Intlayer İstek Bağlamı Anahtarı

`Intlayer` dışa aktarımı, Remix 3'te bir istek bağlamı depolama tanımlayıcısı olarak işlev görür. Rota işleyicileri veya özel ara yazılımlar içinde Remix bağlam nesnesinden Intlayer durumunu doğrudan almanıza olanak tanır.

## Kullanım

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

## Açıklama

`Intlayer`, geçerli oturum durumunu Remix'in istek bağlamına (`RequestContext`) bağlamak için `intlayer()` ara yazılımı tarafından kullanılır. Genellikle `useLocale()` veya `useIntlayer()` gibi hook'ların kullanılması tercih edilir. `context.get(Intlayer)` aracılığıyla doğrudan erişim, alt düzey ara yazılım işleyicilerinde veya bağlam örneğinin açıkça iletildiği API rotalarında yararlıdır.

## İlgili Dokümantasyon

- [`intlayer` Ara Yazılımı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useLocale.md)
