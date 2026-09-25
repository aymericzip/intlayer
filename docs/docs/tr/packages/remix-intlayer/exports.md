---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: remix-intlayer Paketi Dokümantasyonu
description: Remix 3 uygulamaları için uluslararasılaştırma (i18n) sağlayan remix-intlayer paketi dışa aktarım dokümantasyonu.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer dışa aktarımları başlangıç dokümantasyonu"
author: aymericzip
---

# remix-intlayer Paketi

`remix-intlayer` paketi, Intlayer'ı Remix 3 uygulamalarına entegre etmek için gerekli araçları sağlar. İstek yerel ayarını algılamak için ara yazılım (middleware), istek bağlamı erişimi ve sözlükleri almak ile yerel ayarları yönetmek için hook'lar içerir.

## Kurulum

```bash
npm install remix-intlayer
```

## Paket Dışa Aktarılanları

### Ara Yazılım (Middleware)

| Dışa Aktarım | Tür                    | Açıklama                                                                                                 | İlgili Doküman                                                                                                                       |
| ------------ | ---------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayer`   | Ara Yazılım Fonksiyonu | İstek yerel ayarını algılayan, yönlendirmeleri yöneten ve istek bağlamını dolduran Remix 3 ara yazılımı. | [intlayer Ara Yazılımı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/intlayerMiddleware.md) |

### Bağlam Depolama

| Dışa Aktarım                | Tür                            | Açıklama                                                                                                                             | İlgili Doküman                                                                                                        |
| --------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | RequestContext Anahtarı / Depo | Remix 3 istek bağlamından (`context.get(Intlayer)`) Intlayer durumunu almak için kullanılan istek bağlamı anahtarı.                  | [Intlayer Bağlamı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                       | Doğrudan istek bağlamına yüklenen özellik adı (`'intlayer'`); `context.intlayer` ve `context.get(Intlayer)` üzerinden erişim sağlar. | -                                                                                                                     |

### Hook'lar

| Dışa Aktarım    | Tür  | Açıklama                                                                                                                             | İlgili Doküman                                                                                                                 |
| --------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | Hook | Geçerli istek yerel ayarına göre anahtarla belirtilen sözlük içeriğini alır ve işler.                                                | [useIntlayer Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Hook | Önceden içe aktarılmış bir sözlük nesnesinden geçerli istek yerel ayarına karşılık gelen içeriği döner.                              | [useDictionary Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Hook | Geçerli istek yerel ayarına, varsayılan yerel ayara ve projede yapılandırılmış kullanılabilir yerel ayarlar listesine erişim sağlar. | [useLocale Hook'u](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/remix-intlayer/useLocale.md)         |

### Yardımcı Programlar

İçe Aktar:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| İşlev                 | Açıklama                                                                                                                                                    | İlgili Doküman |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `createLocaleRouting` | İstek, yapılandırma ve seçeneklere göre yerel ayar yönlendirme kararlarını (`redirect`, `rewrite` veya `pass`) hesaplayan saf işlev.                        | -              |
| `getIntlayerState`    | React bileşenlerinin dışındaki `AsyncLocalStorage` istek kapsamından geçerli `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) değerini okur. | -              |

### Formatlayıcılar (remix-intlayer/format)

İçe aktarma:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| Hook              | Açıklama                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Önbelleğe alma ve abonelik özellikleriyle istek veya istemci yerel ayarına bağlı bir Intl örneği döndürür.        |
| `useDate`         | Geçerli yerel ayara önceden bağlanmış bir tarih biçimlendirme işlevi döndürür (`Intl.DateTimeFormat`).            |
| `useNumber`       | Geçerli yerel ayara önceden bağlanmış bir sayı biçimlendirme işlevi döndürür (`Intl.NumberFormat`).               |
| `useCurrency`     | Geçerli yerel ayara önceden bağlanmış bir para birimi biçimlendirme işlevi döndürür.                              |
| `usePercentage`   | Geçerli yerel ayara önceden bağlanmış bir yüzde biçimlendirme işlevi döndürür.                                    |
| `useRelativeTime` | Geçerli yerel ayara önceden bağlanmış bir göreli zaman biçimlendirme işlevi döndürür (`Intl.RelativeTimeFormat`). |
| `useList`         | Geçerli yerel ayara önceden bağlanmış bir liste biçimlendirme işlevi döndürür (`Intl.ListFormat`).                |
| `useUnit`         | Geçerli yerel ayara önceden bağlanmış bir birim biçimlendirme işlevi döndürür.                                    |
| `useCompact`      | Geçerli yerel ayara önceden bağlanmış bir kompakt sayı biçimlendirme işlevi döndürür (ör. `1.5K`).                |

### HTML Yardımcı Programları (remix-intlayer/html)

İçe aktarma:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Dışa Aktarım      | Tür        | Açıklama                                                        |
| ----------------- | ---------- | --------------------------------------------------------------- |
| `renderHTML`      | `Function` | HTML düğümlerini oluşturmak için bağımsız yardımcı işlev.       |
| `useHTML`         | `Hook`     | HTML sağlayıcı bağlamını ve yapılandırmasını alma hook'u.       |
| `useHTMLRenderer` | `Hook`     | Önceden yapılandırılmış bir HTML oluşturucu işlevi alma hook'u. |

### Markdown Yardımcı Programları (remix-intlayer/markdown)

İçe aktarma:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Dışa Aktarım          | Tür        | Açıklama                                                            |
| --------------------- | ---------- | ------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Markdown dizelerini yapılandırılmış bir temsile derler.             |
| `renderMarkdown`      | `Function` | Markdown içeriğini çıktı düğümlerine dönüştürür.                    |
| `parseMarkdown`       | `Function` | Ham Markdown içeriğini bir AST'ye ayrıştırır.                       |
| `useMarkdown`         | `Hook`     | Markdown sağlayıcı bağlamını alma hook'u.                           |
| `useMarkdownRenderer` | `Hook`     | Önceden yapılandırılmış bir Markdown oluşturucu işlevi alma hook'u. |

### Tipler

İçe Aktar:

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Tip                         | Açıklama                                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Remix istek bağlamında saklanan `locale`, `defaultLocale` ve `availableLocales` değerlerini tutan durum nesnesi. |
| `IntlayerMiddlewareOptions` | `intlayer()` ara yazılımına geçirilen yapılandırma seçenekleri.                                                  |
| `LocaleRoutingOptions`      | Yerel ayar önekini, algılamayı ve yönlendirmeleri özelleştiren seçenekler.                                       |
| `LocaleRoutingAction`       | Yönlendirme kararını temsil eden ayrılmış birleşim: `redirect`, `rewrite` veya `pass`.                           |
| `LocaleRoutingRequest`      | `createLocaleRouting` için gereken en az istek gösterimi.                                                        |
| `UseLocaleResult`           | `locale`, `defaultLocale` ve `availableLocales` içeren `useLocale()` dönüş türü.                                 |
