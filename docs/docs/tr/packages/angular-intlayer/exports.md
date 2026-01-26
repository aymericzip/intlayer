---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer Paketi Dokümantasyonu
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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarımlar için birleştirilmiş belgeler
---

# angular-intlayer Paketi

`angular-intlayer` paketi, Intlayer'ı Angular uygulamalarına entegre etmek için gerekli araçları sağlar. Çok dilli içeriği yönetmek için sağlayıcılar ve servisler içerir.

## Kurulum

```bash
npm install angular-intlayer
```

## Dışa Aktarımlar

İçe Aktar:

```tsx
import "angular-intlayer";
```

### Yapılandırma

| Fonksiyon         | Açıklama                                                  |
| ----------------- | --------------------------------------------------------- |
| `provideIntlayer` | Angular uygulamanızda Intlayer'ı sağlamak için fonksiyon. |

### Hook'lar

| Hook                   | Açıklama                                                                                                      | İlgili Doküman |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | -------------- |
| `useIntlayer`          | `useDictionary`'e dayanır, ancak oluşturulan bildirimden sözlüğün optimize edilmiş bir sürümünü enjekte eder. | -              |
| `useDictionary`        | Sözlük gibi görünen (key, content) nesneleri işler. `t()` çevirilerini, enumerations vb. işler.               | -              |
| `useDictionaryAsync`   | `useDictionary` ile aynı, ancak asenkron sözlükleri işler.                                                    | -              |
| `useDictionaryDynamic` | `useDictionary` ile aynı, ancak dinamik sözlükleri işler.                                                     | -              |
| `useLocale`            | Geçerli locale'i ve bunu ayarlamak için bir fonksiyon döndürür.                                               | -              |
| `useIntl`              | Geçerli locale için Intl nesnesini döndürür.                                                                  | -              |
| `useLoadDynamic`       | Dinamik sözlükleri yüklemek için hook.                                                                        | -              |

### Bileşenler

| Bileşen                     | Açıklama                                         |
| --------------------------- | ------------------------------------------------ |
| `IntlayerMarkdownComponent` | Markdown içeriğini render eden Angular bileşeni. |
