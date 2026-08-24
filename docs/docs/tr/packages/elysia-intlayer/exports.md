---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer Paket Dokümantasyonu
description: Intlayer için Elysia eklentisi; çeviri fonksiyonları ve locale algılama sağlar.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Tüm dışa aktarımlar için birleştirilmiş dokümantasyon"
author: aymericzip
---

# elysia-intlayer Paketi

`elysia-intlayer` paketi, Elysia uygulamaları için uluslararasılaştırmayı (internationalization / i18n) yönetmek üzere bir plugin sağlar. Kullanıcının locale'ini algılar ve route context'ine bir `intlayer` nesnesi enjekte eder.

## Kurulum

```bash
npm install elysia-intlayer
```

## Dışa Aktarımlar

### Eklenti

İçe aktarma:

```tsx
import { intlayer } from "elysia-intlayer";
```

| Fonksiyon  | Açıklama                                                                                                                                                                                                                                                                                                               | İlgili Doküman                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Intlayer'ı Elysia uygulamanıza entegre eden Elysia eklentisi. Locale algılamayı storage'dan (çerezler, başlıklar) ve ardından `Accept-Language`'den yönetir, route context'ine `locale`, `t`, `getIntlayer` ve `getDictionary` sunan bir `intlayer` nesnesi enjekte eder ve `AsyncLocalStorage` istek bağlamını kurar. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/elysia-intlayer/intlayer.md) |

### Fonksiyonlar

İçe aktarma:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Fonksiyon       | Açıklama                                                                                                                                                                                                                                                    | İlgili Doküman                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Elysia'da mevcut locale için içeriği getiren global çeviri fonksiyonu. `intlayer` eklentisinin kurduğu istek bağlamına erişmek için `AsyncLocalStorage` kullanır ve bunun dışında varsayılan locale'e geri döner. `intlayer.t` üzerinden de erişilebilir.   | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `getIntlayer`   | Üretilen bildirimden anahtarına göre bir sözlük getirir ve içeriğini mevcut locale için döndürür. `getDictionary`'nin optimize edilmiş sürümü. İstek bağlamına erişmek için `AsyncLocalStorage` kullanır. `intlayer.getIntlayer` üzerinden de erişilebilir. | -                                                                                                      |
| `getDictionary` | Sözlük nesnelerini işler ve mevcut locale için içeriği döndürür. `t()` çevirilerini, enumeration'ları, markdown'ı, HTML'i vb. işler. İstek bağlamına erişmek için `AsyncLocalStorage` kullanır. `intlayer.getDictionary` üzerinden de erişilebilir.         | -                                                                                                      |

### Tipler

İçe aktarma:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tip                 | Açıklama                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Her route context'ine enjekte edilen `intlayer` nesnesinin yapısı: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Bir locale map'ini mevcut istek locale'ine karşılık gelen içeriğe çeviren çeviri fonksiyonunun imzası.                                                                  |
