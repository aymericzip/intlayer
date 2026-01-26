---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: preact-intlayer Paket Dokümantasyonu
description: Intlayer için Preact'e özgü entegrasyon; Preact uygulamaları için provider'lar ve hook'lar sağlar.
keywords:
  - preact-intlayer
  - preact
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# preact-intlayer Paketi

`preact-intlayer` paketi, Intlayer'ı Preact uygulamalarına entegre etmek için gerekli araçları sağlar. Çok dilli içeriğin yönetimi için provider'lar ve hook'lar içerir.

## Kurulum

```bash
npm install preact-intlayer
```

## Dışa Aktarılanlar

### Sağlayıcı

| Bileşen            | Açıklama                                                        |
| ------------------ | --------------------------------------------------------------- |
| `IntlayerProvider` | Uygulamanızı saran ve Intlayer bağlamını sağlayan ana provider. |

### Hook'lar

| Hook            | Açıklama                                                                                                           | İlgili Doküman                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | `useDictionary` temel alınarak, ancak üretilen deklarasyondan sözlüğün optimize edilmiş bir sürümünü enjekte eder. | -                                                                                                 |
| `useDictionary` | Sözlük gibi görünen nesneleri (anahtar, içerik) işler. `t()` çevirilerini, enum'ları vb. işler.                    | -                                                                                                 |
| `useLocale`     | Mevcut locale'i ve bunu ayarlamak için bir fonksiyon döndürür.                                                     | -                                                                                                 |
| `t`             | Mevcut locale'e göre içeriği seçer.                                                                                | [çeviri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |

### Bileşenler

| Bileşen            | Açıklama                                          |
| ------------------ | ------------------------------------------------- |
| `MarkdownProvider` | Markdown renderlama bağlamı için provider.        |
| `MarkdownRenderer` | Markdown içeriğini özel bileşenlerle render eder. |
