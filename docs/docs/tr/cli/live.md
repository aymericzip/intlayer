---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Canlı Senkronizasyon Komutları
description: Canlı Senkronizasyonu kullanarak CMS içerik değişikliklerini çalışma zamanında nasıl yansıtacağınızı öğrenin.
keywords:
  - Canlı Senkronizasyon
  - CMS
  - Çalışma Zamanı
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# Canlı Senkronizasyon komutları

Canlı Senkronizasyon, uygulamanızın CMS içerik değişikliklerini çalışma zamanında yansıtmasını sağlar. Yeniden derleme veya yeniden dağıtım gerekmez. Etkinleştirildiğinde, güncellemeler uygulamanızın okuduğu sözlükleri yenileyen bir Canlı Senkronizasyon sunucusuna aktarılır. Daha fazla detay için [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) sayfasına bakın.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Argümanlar:

**Yapılandırma seçenekleri:**

- **`--base-dir`**: Proje için temel dizini belirtin. Intlayer yapılandırmasını almak için komut, temel dizinde `intlayer.config.{ts,js,json,cjs,mjs}` dosyasını arayacaktır.

- **`--no-cache`**: Önbelleği devre dışı bırakır.

  > Örnek: `npx intlayer dictionary push --env-file .env.production.local`

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlüklemeyi etkinleştirir. (CLI kullanılırken varsayılan olarak true)
