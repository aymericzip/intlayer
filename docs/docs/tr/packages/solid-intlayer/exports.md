---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: solid-intlayer Paket Dokümantasyonu
description: Solid uygulamaları için Intlayer'a özgü entegrasyon; Solid uygulamaları için provider'lar ve hook'lar sunar.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Tüm dışa aktarılanlar için birleştirilmiş dokümantasyon
---

# solid-intlayer Paketi

`solid-intlayer` paketi, Intlayer'ı Solid uygulamalarına entegre etmek için gerekli araçları sağlar. Çok dilli içeriği yönetmek için provider'lar ve hook'lar içerir.

## Kurulum

```bash
npm install solid-intlayer
```

## Dışa Aktarılanlar

### Provider (Sağlayıcı)

İçe Aktarma:

```tsx
import "solid-intlayer";
```

| Bileşen            | Açıklama                                                        | İlgili Doküman                                                                                                                |
| ------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Uygulamanızı saran ve Intlayer bağlamını sağlayan ana provider. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/IntlayerProvider.md) |

### Hook'lar

İçe Aktar:

```tsx
import "solid-intlayer";
```

| Hook                   | Açıklama                                                                                                                                       | İlgili Doküman                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | `useDictionary`'e dayanır, ancak oluşturulan declaration'dan sözlüğün optimize edilmiş bir sürümünü enjekte eder.                              | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Sözlük (key, content) gibi görünen nesneleri işler. `t()` çevirilerini, enumerations vb. öğeleri işler.                                        | -                                                                                                                       |
| `useDictionaryAsync`   | `useDictionary` ile aynı, ancak asenkron sözlükleri işler.                                                                                     | -                                                                                                                       |
| `useDictionaryDynamic` | `useDictionary` ile aynı, ancak dinamik sözlükleri işler.                                                                                      | -                                                                                                                       |
| `useLocale`            | Geçerli locale'i ve bunu ayarlamak için bir fonksiyon döndürür.                                                                                | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | URL yeniden yazımlarını yönetmek için istemci tarafı hook'u. Lokalize edilmiş bir yeniden yazma kuralı varsa URL'yi otomatik olarak günceller. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Geçerli locale için Intl nesnesini döndürür.                                                                                                   | -                                                                                                                       |
| `useLoadDynamic`       | Dinamik sözlükleri yüklemek için hook.                                                                                                         | -                                                                                                                       |
| `t`                    | Geçerli locale'e göre içeriği seçer.                                                                                                           | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md)                  |

### Bileşenler

İçe aktar:

```tsx
import "solid-intlayer";
```

| Bileşen            | Açıklama                                   |
| ------------------ | ------------------------------------------ |
| `MarkdownProvider` | Markdown renderlama bağlamı için provider. |
