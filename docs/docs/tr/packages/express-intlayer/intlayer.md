---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Express Middleware Dokümantasyonu | express-intlayer
description: express-intlayer paketi için intlayer middleware'inin nasıl kullanılacağını görün
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Dokümantasyon
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokümantasyon başlatıldı
---

# intlayer Express Middleware Dokümantasyonu

Express için `intlayer` middleware'i kullanıcının yerel ayarını algılar ve çeviri fonksiyonlarını `res.locals` nesnesi üzerinden sağlar. Ayrıca `t` ve `getIntlayer` fonksiyonlarının istek işleyicilerinizde kullanılmasını mümkün kılar.

## Kullanım

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    tr: "Merhaba",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Açıklama

Middleware (ara katman) aşağıdaki görevleri yerine getirir:

1. **Locale Tespiti**: Kullanıcının locale'ini belirlemek için çerezleri, header'ları (ör. `Accept-Language`) ve URL parametrelerini kontrol eder.
2. **Bağlam Kurulumu**: `res.locals` içine şunları ekler:
   - `locale`: Tespit edilen locale.
   - `t`: Tespit edilen locale'e bağlı bir çeviri fonksiyonu.
   - `getIntlayer`: Tespit edilen locale'e bağlı sözlükleri almak için bir fonksiyon.
3. **Asenkron Yerel Depolama**: istek akışı içinde `express-intlayer`'dan içe aktarılan global `t` ve `getIntlayer` fonksiyonlarının kullanılmasına izin veren bir bağlam oluşturur.
