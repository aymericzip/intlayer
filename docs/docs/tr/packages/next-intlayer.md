---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer Paketi Dokümantasyonu
description: Intlayer için Next.js'e özgü entegrasyon; App Router ve Page Router için middleware ve provider'lar sağlar.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# next-intlayer Paketi

`next-intlayer` paketi, Intlayer'ı Next.js uygulamalarına entegre etmek için gerekli araçları sağlar. Hem App Router hem de Page Router'ı destekler; ayrıca locale tabanlı yönlendirme için middleware içerir.

## Kurulum

```bash
npm install next-intlayer
```

## Dışa Aktarımlar

### Ara Katman (Middleware)

| Function             | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js ara yazılımı; locale tabanlı yönlendirme ve yönlendirmeleri yönetir. |

### Providers

| Component                | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `IntlayerClientProvider` | Next.js'te istemci tarafı bileşenleri için sağlayıcı.             |
| `IntlayerServerProvider` | Next.js'te sunucu tarafı bileşenleri için sağlayıcı (App Router). |

### Hooks (Client-side)

Çoğu hook'u `react-intlayer`'dan yeniden dışa aktarır.

| Hook            | Açıklama                                                                |
| --------------- | ----------------------------------------------------------------------- |
| `useIntlayer`   | Bir sözlüğü anahtarıyla seçer ve içeriğini döndürür.                    |
| `useDictionary` | Bir sözlüğü anahtarıyla seçer ve içeriğini döndürür.                    |
| `useLocale`     | Geçerli locale bilgisini ve bunu ayarlamak için bir fonksiyon döndürür. |
| `useI18n`       | Geçerli Intlayer bağlam değerlerini döndürür.                           |

### Fonksiyonlar (Sunucu tarafı)

| Fonksiyon              | Açıklama                                                           |
| ---------------------- | ------------------------------------------------------------------ |
| `t`                    | Next.js App Router için çeviri fonksiyonunun sunucu tarafı sürümü. |
| `generateStaticParams` | Next.js'in dinamik rotaları için statik parametreler oluşturur.    |

### Tipler

| Type                 | Açıklama                                               |
| -------------------- | ------------------------------------------------------ |
| `NextPageIntlayer`   | Intlayer desteğine sahip Next.js sayfaları için tür.   |
| `NextLayoutIntlayer` | Intlayer desteğine sahip Next.js layout'ları için tür. |
