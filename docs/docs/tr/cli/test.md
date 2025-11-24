---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Eksik Çevirileri Test Etme
description: Sözlüklerinizdeki eksik çevirileri nasıl test edeceğinizi ve tespit edeceğinizi öğrenin.
keywords:
  - Test
  - Eksik Çeviriler
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Eksik çevirileri test etme

```bash
npx intlayer content test
```

## Kısaltmalar:

- `npx intlayer test`

Bu komut, içerik bildirim dosyalarınızı analiz ederek yapılandırılmış tüm yerellerdeki eksik çevirileri tespit eder. Hangi çeviri anahtarlarının hangi yerellerde eksik olduğunu gösteren kapsamlı bir rapor sunar ve çok dilli içeriğinizde tutarlılığı sağlamanıza yardımcı olur.

## Örnek çıktı:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Yereller: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Gerekli yereller: en
Eksik yereller: pl, tr, es
Gerekli eksik yereller: -
Toplam eksik yerel sayısı: 3
Toplam gerekli eksik yerel sayısı: 0
```

## Argümanlar:

**Yapılandırma seçenekleri:**

- **`--env`**: Ortamı belirtin (örneğin, `development`, `production`).
- **`--env-file [envFile]`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın.
- **`--base-dir`**: Proje için temel dizini belirtin.

> Örnek: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Önbelleği devre dışı bırakır.

  > Örnek: `npx intlayer build --no-cache`

**Hazırlık seçenekleri:**

- **`--build`**: İçeriğin güncel olmasını sağlamak için gönderme işleminden önce sözlükleri derler. True derlemeyi zorlar, false derlemeyi atlar, undefined ise derleme önbelleğinin kullanılmasına izin verir.

**Günlük seçenekleri:**

- **`--verbose`**: Hata ayıklama için ayrıntılı günlüklemeyi etkinleştirir. (CLI kullanıldığında varsayılan olarak true)

  > Örnek: `npx intlayer content test --verbose`

## Örnek:

```bash
npx intlayer content test --verbose
```

Çıktı, uygulamanızın yapılandırılmış tüm yerellerde düzgün çalışmasını sağlamak için hangi çevirilerin tamamlanması gerektiğini hızlıca belirlemenize yardımcı olur.
