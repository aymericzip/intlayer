---
createdAt: 2026-01-30
updatedAt: 2026-09-29
priority: 5
title: intlayer AdonisJS Middleware Belgeleri | adonis-intlayer
description: "AdonisJS için intlayer middleware'i kullanıcının locale'ini algılar ve çeviri fonksiyonlarını istek bağlamı üzerinden sunar."
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Uluslararasılaştırma
  - Belgeler
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: "İlk belgeler"
author: aymericzip
---

# intlayer AdonisJS Middleware Belgeleri

AdonisJS için `intlayer` middleware'i kullanıcının yerel ayarını algılar ve çeviri fonksiyonları sağlar. Ayrıca istek akışı içinde küresel çeviri fonksiyonlarının kullanılmasını sağlar.

## Kullanım

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Açıklama

Middleware aşağıdaki görevleri gerçekleştirir:

1. **Yerel Ayar Tespiti**: Kullanıcının tercih ettiği yerel ayarı belirlemek için isteği (başlıklar, çerezler vb.) analiz eder.
2. **Bağlam Kurulumu**: İstek bağlamını yerel ayar bilgileriyle doldurur.

> Not: Yerel ayar tespiti için çerezleri kullanmak için, uygulamanızda `@adonisjs/cookie`'nin yapılandırıldığından ve kullanıldığından emin olun.
