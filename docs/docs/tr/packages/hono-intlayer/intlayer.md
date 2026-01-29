---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: intlayer Hono Ara Yazılım Dokümantasyonu | hono-intlayer
description: hono-intlayer paketi için intlayer ara yazılımının nasıl kullanılacağını görün
keywords:
  - intlayer
  - hono
  - ara yazılım
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Dokümantasyon başlatıldı
---

# intlayer Hono Ara Yazılım Dokümantasyonu

Hono için `intlayer` ara yazılımı, kullanıcının yerel ayarını algılar ve bağlam nesnesini Intlayer fonksiyonlarıyla doldurur. Ayrıca istek bağlamı içinde genel çeviri fonksiyonlarının kullanılmasını sağlar.

## Kullanım

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    tr: "Merhaba",
  });

  return c.text(content);
});
```

## Açıklama

Ara yazılım aşağıdaki görevleri gerçekleştirir:

1. **Yerel Ayar Algılama**: Kullanıcının tercih ettiği yerel ayarı belirlemek için isteği (başlıklar, çerezler vb.) analiz eder.
2. **Bağlam Doldurma**: `c.get()` aracılığıyla erişilebilen Hono bağlamına Intlayer verilerini ekler. Şunları içerir:
   - `locale`: Algılanan yerel ayar.
   - `t`: Bir çeviri fonksiyonu.
   - `getIntlayer`: Sözlükleri almak için bir fonksiyon.
   - `getDictionary`: Sözlük nesnelerini işlemek için bir fonksiyon.
3. **Bağlam Yönetimi**: `cls-hooked` kullanarak asenkron bir bağlam yönetir ve genel Intlayer fonksiyonlarının (`t`, `getIntlayer`, `getDictionary`) bağlam nesnesini geçmeden isteğe özel yerel ayara erişmesine olanak tanır.
