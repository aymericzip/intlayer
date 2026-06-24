---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Transloco'dan Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak Angular uygulamanızı Transloco'dan Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - transloco
  - angular
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Transloco'dan Intlayer'a Geçiş Yapın

Angular uygulamanız şu anda `@jsverse/transloco` kullanıyorsa, uyumluluk adaptörümüzü kullanarak Intlayer'a geçebilirsiniz. Bu geçiş, mevcut template sözdizimini korurken Intlayer'ın güçlü sözlük yapısından yararlanmanıza olanak tanır.

## Ne yapmalı

Projede başlatma komutunu çalıştırın:

```bash
npx intlayer init
```

Bu, gerekli `intlayer.config.ts` konfigürasyonunu oluşturacaktır. Ardından Transloco importlarını `@intlayer/transloco` modülleriyle değiştirin veya build takma adlarına güvenin.

## Arka Planda Neler Olur

Transloco, kapsamlar ve bir `TranslocoService` (`translate`, `selectTranslate`), yapısal direktifler (`*transloco="let t"`) ve pipe'lar (`| transloco`) kullanır.

Arka Planda:

- **Kapsamlar:** Intlayer sözlük anahtarlarına doğal olarak eşleşir ve bundle optimizasyonu için harika bir budama hikayesi sağlar.
- **Hizmet & Direktifler:** Intlayer'ın Angular adaptörü sağlayıcıları sorunsuzca değiştirir, mevcut template pipe'larınızın ve direktiflerinizin Intlayer sözlüklerine karşı çözülmesine izin verir.
- **Build süresi ayrıştırması:** TypeScript analizörü `instant/get` çağrılarını tanır ve fallback budaması, template kullanımı statik olarak izlenmese bile doğruluğu sağlar.
