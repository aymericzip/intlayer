---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite Eklentisi Dokümantasyonu | vite-intlayer
description: vite-intlayer paketi için intlayerPrune eklentisinin nasıl kullanılacağını görün
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokümantasyon başlatıldı
---

# intlayerPrune Vite Eklentisi Dokümantasyonu

`intlayerPrune` Vite eklentisi, uygulama paketinizden kullanılmayan sözlükleri tree-shake edip budamak için kullanılır. Bu, yalnızca gerekli çokdilli içeriği dahil ederek son paket boyutunu azaltmaya yardımcı olur.

## Kullanım

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Açıklama

Eklenti, kaynak kodunuzu analiz ederek hangi sözlük anahtarlarının gerçekten kullanıldığını belirler. Ardından paketlenen sözlük dosyalarından kullanılmayan içeriği kaldırır. Bu, yalnızca belirli sayfalar veya bileşenlerde bir alt kümesi kullanılan birçok sözlüğe sahip büyük projeler için özellikle faydalıdır.
