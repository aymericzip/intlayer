---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite Eklenti Dokümantasyonu | vite-intlayer
description: vite-intlayer paketi için intlayer eklentisinin nasıl kullanılacağını inceleyin
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayer Vite Eklenti Dokümantasyonu

`intlayer` Vite eklentisi, Intlayer yapılandırmasını build sürecine entegre eder. Sözlük alias'larını sağlar, geliştirme modunda sözlük izleyicisini başlatır ve build için sözlükleri hazırlar.

## Kullanım

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Açıklama

Eklenti şu görevleri yerine getirir:

1. **Sözlükleri Hazırlama**: Yapı veya geliştirme sürecinin başında sözlükleri optimize edilmiş dosyalara derler.
2. **İzleme Modu**: Geliştirme modunda, sözlük dosyalarındaki değişiklikleri izler ve bunları otomatik olarak yeniden derler.
3. **Aliaslar**: Uygulamanızda sözlüklere erişim için aliaslar sağlar.
4. **Tree-shaking**: Kullanılmayan çevirilerin `intlayerPrune` eklentisi aracılığıyla tree-shaking ile kaldırılmasını destekler.
