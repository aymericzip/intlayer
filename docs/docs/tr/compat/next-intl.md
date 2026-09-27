---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: next-intl için uyumluluk adaptörü"
description: "next-intl kodunuzu koruyun ve Intlayer ile sunun: @intlayer/next-intl paketini kurun, import'lar için alias tanımlayın ve adaptörün arka planda neyi değiştirdiğini görün."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - göç
  - uyumluluk
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-intl: next-intl için uyumluluk adaptörü

Kapsamlı ve ayrıntılı adım adım eğitim için lütfen tam [next-intl Göç Kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/migration_from_next-intl_to_intlayer.md) bakın.

`next-intl`'den Intlayer'a geçiş, uygulama routing'inizi ve sözdizimini tamamen etkilemeden tutmanıza izin verir.

## Ne yapmalı

Deponuzda aşağıdaki komutu yürütün:

```bash
npx intlayer init --interactive
```

Bu, bir `intlayer.config.ts` oluşturacaktır. `next.config.ts` dosyasında, plugin wrapper'ını kullanarak `next-intl` takma adlarını `@intlayer/next-intl`'ye sorunsuzca enjekte edin.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Arka Planda Neler Olur

Bundler wrapper çevirileri değiştirir, ancak **`next-intl/navigation` özelliklerini olduğu gibi bırakır** (örneğin `Link`, `redirect`, `usePathname`).

Arka Planda:

- **ICU runtime:** Çoğullar (`=0`, `one`, `other`), select/selectordinal, `#` argümanları ve biçimlendirilmiş argümanlar (`{ts, date, long}`) paylaşılan `resolveMessage(..., 'icu')` çözümleyicisini kullanarak doğru şekilde çalışır.
- **`useTranslations()` & `getTranslations()`:** Bare scope çağrıları ilk anahtar segmentini doğru sözlük tanımlayıcısı olarak ayıklar. İç içe ad alanları zarif bir şekilde sözlük yolları ve ön eklerine bölünür.
- **Zengin Biçimlendirme:** Hem `t.rich()` hem de `t.markup()` tamamen doğal olarak uygulanmakta, HTML benzeri düğümleri render edilen React chunks'lerine dönüştürmektedir.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange` ve yapılandırmadan adlı biçimler, core yerel `Intl` formatter'larına köprü atılmaktadır.

> Bu kütüphanelerin nereden geldiğini anlamak için JavaScript i18n tarihini okuyun.

- [JavaScript i18n tarihi](https://github.com/aymericzip/intlayer/blob/main/docs/blog/tr/history_of_i18n.md)
