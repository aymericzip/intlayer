---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Sözlükleri Oluşturma
description: İçerik beyan dosyalarından Intlayer sözlüklerinizi nasıl oluşturacağınızı öğrenin.
keywords:
  - Oluşturma
  - Sözlükler
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# Sözlükleri Oluşturma

Sözlüklerinizi oluşturmak için aşağıdaki komutları çalıştırabilirsiniz:

```bash
npx intlayer build
```

veya izleme modunda

```bash
npx intlayer build --watch
```

Bu komut, varsayılan olarak `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` dosyalarınızı bulur ve `.intlayer` dizininde sözlükleri oluşturur.

## Kısaltmalar:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Argümanlar:

- **`--base-dir`**: Proje için temel dizini belirtin. Intlayer yapılandırmasını almak için komut, temel dizinde `intlayer.config.{ts,js,json,cjs,mjs}` dosyasını arayacaktır.

  > Örnek: `npx intlayer build --base-dir ./src`

- **`--env`**: Ortamı belirtin (örneğin, `development`, `production`). Intlayer yapılandırma dosyanızda ortam değişkenleri kullanıyorsanız faydalıdır.

  > Örnek: `npx intlayer build --env production`

- **`--env-file`**: Değişkenleri yüklemek için özel bir ortam dosyası sağlayın. Intlayer yapılandırma dosyanızda ortam değişkenleri kullanıyorsanız faydalıdır.

  > Örnek: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Komutu build ile paralel olarak başlatın.

  > Örnek: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Hazırlık adımını atlayın.

  > Örnek: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Önbelleği devre dışı bırakın.

  > Örnek: `npx intlayer build --no-cache`
