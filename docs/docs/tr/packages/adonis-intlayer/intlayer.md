---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: intlayer AdonisJS Middleware Belgeleri | adonis-intlayer
description: adonis-intlayer paketi için intlayer middleware'inin nasıl kullanılacağını görün
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
    changes: İlk belgeler
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
3. **Async Local Storage**: Bir asenkron bağlamı yönetmek için `cls-hooked` kullanır ve `t`, `getIntlayer` ve `getDictionary` gibi küresel Intlayer fonksiyonlarının istek-özel yerel ayarına manuel olarak geçirmeden erişmesini sağlar.

> Not: Yerel ayar tespiti için çerezleri kullanmak için, uygulamanızda `@adonisjs/cookie`'nin yapılandırıldığından ve kullanıldığından emin olun.
