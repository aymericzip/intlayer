---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer Paket Dokümantasyonu
description: Vue uygulamaları için pluginler ve composables sağlayan Intlayer için Vue'ya özgü entegrasyon.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm exports için birleştirilmiş dokümantasyon
---

# vue-intlayer Paketi

`vue-intlayer` paketi, Intlayer'ı Vue uygulamalarına entegre etmek için gerekli araçları sağlar. Çok dilli içeriği yönetmek için bir Vue plugin'i ve composables içerir.

## Kurulum

```bash
npm install vue-intlayer
```

## Dışa Aktarımlar

### Plugin

İçe Aktar:

```tsx
import "vue-intlayer";
```

| Fonksiyon         | Açıklama                                           |
| ----------------- | -------------------------------------------------- |
| `installIntlayer` | Uygulamanıza Intlayer'ı kurmak için Vue eklentisi. |

### Composable'lar

İçe Aktar:

```tsx
import "vue-intlayer";
```

| Composable             | Açıklama                                                                                                                                    | İlgili Doküman                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | `useDictionary`'e dayanır, ancak oluşturulan deklarasyondan optimize edilmiş bir sözlük sürümünü enjekte eder.                              | -                                                                                                                     |
| `useDictionary`        | Anahtar, içerik gibi sözlüğe benzeyen nesneleri işler. `t()` çevirilerini, enum'ları vb. işler.                                             | -                                                                                                                     |
| `useDictionaryAsync`   | `useDictionary` ile aynı, ancak asenkron sözlükleri işler.                                                                                  | -                                                                                                                     |
| `useDictionaryDynamic` | `useDictionary` ile aynı, ancak dinamik sözlükleri işler.                                                                                   | -                                                                                                                     |
| `useLocale`            | Mevcut locale'i ve onu ayarlamak için bir fonksiyon döndürür.                                                                               | -                                                                                                                     |
| `useRewriteURL`        | URL yeniden yazmalarını yönetmek için istemci tarafı composable. Yerelleştirilmiş bir yeniden yazma kuralı varsa URL'yi otomatik günceller. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Geçerli locale için Intl nesnesini döndürür.                                                                                                | -                                                                                                                     |
| `useLoadDynamic`       | Dinamik sözlükleri yüklemek için composable.                                                                                                | -                                                                                                                     |

### Fonksiyonlar

İçe Aktar:

```tsx
import "vue-intlayer";
```

| Fonksiyon       | Açıklama                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Sözlük (anahtar, içerik) gibi görünen nesneleri işler. `t()` çevirilerini, enum'ları vb. işler.                  |
| `getIntlayer`   | `getDictionary`'e dayanır, ancak oluşturulan deklarasyondan sözlüğün optimize edilmiş bir sürümünü enjekte eder. |

### Markdown

İçe Aktar:

```tsx
import "vue-intlayer/markdown";
```

| Fonksiyon                 | Açıklama                                                    |
| ------------------------- | ----------------------------------------------------------- |
| `installIntlayerMarkdown` | Uygulamanıza Intlayer Markdown'u kurmak için Vue eklentisi. |
