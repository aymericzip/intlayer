---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer Paket Dokümantasyonu
description: Intlayer için Angular'a özgü entegrasyon; Angular uygulamaları için sağlayıcılar ve servisler sağlar.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş dokümantasyon
---

# angular-intlayer Paketi

`angular-intlayer` paketi, Intlayer'ı Angular uygulamalarına entegre etmek için gerekli araçları sağlar. Çok dilli içeriği yönetmek için sağlayıcılar ve servisler içerir.

## Kurulum

```bash
npm install angular-intlayer
```

## Dışa Aktarılanlar

### Kurulum

| Fonksiyon         | Açıklama                                             |
| ----------------- | ---------------------------------------------------- |
| `provideIntlayer` | Angular uygulamanızda Intlayer'ı sağlayan fonksiyon. |

### Servisler

| Servis            | Açıklama                                                                      |
| ----------------- | ----------------------------------------------------------------------------- |
| `IntlayerService` | Bir sözlüğü anahtarıyla seçen ve içeriği döndüren servis.                     |
| `LocaleService`   | Geçerli locale değerini ve bunu ayarlamak için bir fonksiyon döndüren servis. |

### Bileşenler

| Bileşen                     | Açıklama                                         |
| --------------------------- | ------------------------------------------------ |
| `IntlayerMarkdownComponent` | Markdown içeriğini render eden Angular bileşeni. |
