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

`intlayer()` ara yazılımı çalıştığında, istek bağlamında `Intlayer` anahtarı altında bir `IntlayerState` nesnesi saklar. Bunu herhangi bir rota işleyicisi içinde alabilirsiniz:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // context.get(Intlayer) aracılığıyla erişim
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Doğrudan özellik kısayolu olan `context.intlayer` ile de erişebilirsiniz:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## `IntlayerState` Yapısı

`IntlayerState` nesnesi şunları içerir:

| Özellik            | Tür                 | Açıklama                                                            |
| ------------------ | ------------------- | ------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | Geçerli istek için çözümlenen yerel ayar.                           |
| `defaultLocale`    | `DeclaredLocales`   | `intlayer.config.ts` içinde tanımlanan yedek yerel ayar.            |
| `availableLocales` | `DeclaredLocales[]` | Proje için yapılandırılmış tüm desteklenen yerel ayarların listesi. |

## İlgili Dokümantasyon

- [`intlayer` Ara Yazılımı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useIntlayer.md)
