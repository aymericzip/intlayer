---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "next-i18next'ten Intlayer'a Geçiş Yapın"
description: "Uyumluluk adaptörünü kullanarak Next.js uygulamanızı next-i18next'ten Intlayer'a nasıl geçireceğinizi öğrenin."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# next-i18next'ten Intlayer'a Geçiş Yapın

Kapsamlı ve ayrıntılı adım adım eğitim için lütfen tam [next-i18next Göç Kılavuzuna](../migration_from_next-i18next_to_intlayer.md) bakın.

Intlayer, Next.js Pages Router ve App Router uygulamalarını saydam şekilde işler. Adaptörü kullanmak, `next-i18next` uygulamanızı sıfır kod yeniden yazımı olmadan göç etmenize izin verir.

## Ne yapmalı

Başlamak için şunu çalıştırın:

```bash
npx intlayer init
```

Bu, gerekli Intlayer setup dosyasını oluşturur. Arka Planda Intlayer'a geçmek için `next.config.ts` dosyasını güncelleyin:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Arka Planda Neler Olur

`createNextI18nPlugin`, Next.js'nin yerel davranışını core `next-intlayer` plugin'iyle birlikte oluşturmakta, `next-i18next`, `react-i18next` ve `i18next` için tüm gerekli Webpack/Turbopack takma adlarını enjekte etmektedir.

Arka Planda:

- **`serverSideTranslations` & `appWithTranslation`:** Artık Intlayer'ın iç yükleyicileri için wrapper'lar olarak işlev gördüğünden, büyük statik JSON enjeksiyonunu ortadan kaldırır.
- **Client Hook'ları:** Tüm biçimlendirme, çoğullaştırma ve iç içe ad alanı özelliklerini koruyarak `@intlayer/react-i18next`'e hemen delege eder.
