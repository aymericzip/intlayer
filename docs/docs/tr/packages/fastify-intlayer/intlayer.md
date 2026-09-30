---
createdAt: 2026-01-21
updatedAt: 2026-09-29
priority: 5
title: intlayer Fastify Eklenti Dokümantasyonu | fastify-intlayer
description: "Fastify için intlayer eklentisi kullanıcının locale'ini algılar ve her isteğe Intlayer çeviri fonksiyonlarını ekler."
keywords:
  - intlayer
  - fastify
  - eklenti
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Dokümantasyon başlatıldı"
author: aymericzip
---

# intlayer Fastify Eklenti Dokümantasyonu

Fastify için `intlayer` eklentisi kullanıcının yerel ayarını (locale) tespit eder ve istek (request) nesnesini Intlayer fonksiyonları ile genişletir. Ayrıca, istek bağlamı içerisinde global çeviri fonksiyonlarının kullanılmasını sağlar.

## Kullanım

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    tr: "Merhaba",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Açıklama

Eklenti aşağıdaki görevleri yerine getirir:

1. **Yerel Algılama**: İsteği (başlıklar, çerezler vb.) analiz ederek kullanıcının tercih ettiği yerel ayarı (locale) belirler.
2. **İstek Dekorasyonu**: `FastifyRequest` nesnesine `intlayer` özelliğini ekler; bu özellik şunları içerir:
   - `locale`: Algılanan locale.
   - `t`: Bir çeviri fonksiyonu.
   - `getIntlayer`: Sözlükleri almak için bir fonksiyon.
