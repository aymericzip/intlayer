---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer Paket Dokümantasyonu
description: Vue'ye özgü Intlayer entegrasyonu; Vue uygulamaları için eklentiler ve composables sağlar.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# vue-intlayer Paketi

`vue-intlayer` paketi, Intlayer'ı Vue uygulamalarına entegre etmek için gereken araçları sağlar. Çok dilli içerik yönetimi için bir Vue eklentisi ve composables içerir.

## Kurulum

```bash
npm install vue-intlayer
```

## Dışa Aktarımlar

### Eklenti

| Fonksiyon         | Açıklama                                             |
| ----------------- | ---------------------------------------------------- |
| `installIntlayer` | Uygulamanıza Intlayer'ı yüklemek için Vue eklentisi. |

### Composable'lar

| Composable      | Açıklama                                                              |
| --------------- | --------------------------------------------------------------------- |
| `useIntlayer`   | Anahtarına göre bir sözlüğü seçer ve içeriği döndürür.                |
| `useDictionary` | Anahtarına göre bir sözlüğü seçer ve içeriği döndürür.                |
| `useLocale`     | Mevcut locale'i ve bu locale'i ayarlamak için bir fonksiyon döndürür. |
| `useIntl`       | Mevcut locale için Intl nesnesini döndürür.                           |

### Fonksiyonlar

| Fonksiyon       | Açıklama                      |
| --------------- | ----------------------------- |
| `getDictionary` | Bir sözlük getirir.           |
| `getIntlayer`   | Bir sözlükten içerik getirir. |

### Markdown

| Fonksiyon                 | Açıklama                                                    |
| ------------------------- | ----------------------------------------------------------- |
| `installIntlayerMarkdown` | Uygulamanıza Intlayer Markdown'u kurmak için Vue eklentisi. |
