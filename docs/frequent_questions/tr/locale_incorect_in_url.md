---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: URL'den yanlış locale alınması
description: URL'den yanlış locale alınması sorununu nasıl düzelteceğinizi öğrenin.
keywords:
  - locale
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - yapılandırma
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - locale-incorect-in-url
---

# URL'den Yanlış Locale Alınması

## Sorun Açıklaması

URL'den locale parametresini almaya çalışırken, locale değeri yanlış dönebilir:

```js
const { locale } = await params;
console.log(locale); // Beklenen locale yerine "about" döner
```

## Çözüm

### 1. Dosya Yapısını Kontrol Edin

Next.js uygulama router yolunuzun şu yapıda olduğundan emin olun:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Middleware Yapılandırmasını Kontrol Edin

Sorun genellikle middleware'in olmamasından veya tetiklenmemesinden kaynaklanır. Middleware dosyanız şurada olmalı:

```bash
src/middleware.ts
```

Bu middleware, `prefixDefault` false olduğunda `/en/about`'u `/about`'a yönlendirmekten sorumludur.

### 3. Yapılandırmaya Göre URL Şablonları

#### Varsayılan Yapılandırma (`prefixDefault: false`, `noPrefix: false`)

- İngilizce: `/about`
- Fransızca: `/fr/about`
- İspanyolca: `/es/about`

#### `prefixDefault: true` ile

- İngilizce: `/en/about`
- Fransızca: `/fr/about`
- İspanyolca: `/es/about`

#### `noPrefix: true` ile

- İngilizce: `/about`
- Fransızca: `/about`
- İspanyolca: `/about`

Bu yapılandırma seçenekleri hakkında daha fazla bilgi için [Yapılandırma Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) sayfasına bakın.
