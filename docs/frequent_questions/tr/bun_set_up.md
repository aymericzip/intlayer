---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: Bun kullanırken modül bulunamadı hatası alıyorum
description: "Intlayer'ı Bun ile kullanırken çıkan 'Cannot find package' hatasını düzeltin; Bun'ın require() kapsamını sınırlamasından kaynaklanır, çözüm yapılandırmasıyla."
keywords:
  - bun
  - modül bulunamadı
  - intlayer
  - yapılandırma
  - paket yöneticisi
slugs:
  - frequent-questions
  - bun-set-up
author: aymericzip
---

# Bun kullanırken modül bulunamadı hatası alıyorum

## Sorun Açıklaması

Bun kullanırken aşağıdaki gibi bir hata ile karşılaşabilirsiniz:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Sebep

Intlayer dahili olarak `require` kullanır. Ve bun, require fonksiyonunu tüm proje yerine sadece `@intlayer/config` paketinin paketlerini çözmek için sınırlar.

## Çözüm

### Yapılandırmada `require` fonksiyonunu sağlayın

```ts
ts;
const config: IntlayerConfig = {
  build: {
    require, // require fonksiyonunu yapılandırmaya dahil et
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // require fonksiyonunu yapılandırmaya dahil et
});

export default configuration;
```
