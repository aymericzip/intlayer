---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: astro-intlayer Paketi Dokümantasyonu
description: Yerel ayar tabanlı yönlendirme, ara yazılım, hook'lar, istemci deposu ve sözlük yönetimi kurulumunu sağlayan Intlayer Astro entegrasyonu.
keywords:
  - astro-intlayer
  - astro
  - uluslararasılaştırma
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer, useDictionary, useLocale hook'ları, ara yazılım ve formatlayıcılar dokümantasyonu eklendi"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Tüm dışa aktarımlar için birleşik dokümantasyon"
author: aymericzip
---

# astro-intlayer Paketi

`astro-intlayer` paketi, Intlayer'ı Astro uygulamalarına entegre etmek için gerekli araçları sağlar. Yerel ayar tabanlı yönlendirmeyi, sözlük yönetimini, derleme zamanı sayfa yeniden yazımını, istek ara yazılımını ve hem sunucu tarafından oluşturulan `.astro` bileşenlerinde hem de istemci tarafı komut dosyalarında çok dilli içeriğe erişmek için hook'ları yapılandırır.

## Kurulum

```bash
npm install astro-intlayer
```

## Dışa Aktarılanlar

### Entegrasyon

`astro-intlayer` paketi, projenizde Intlayer'ı kuran bir Astro entegrasyonu sağlar.

İçe aktarma:

```tsx
import { intlayer } from "astro-intlayer";
```

veya `astro.config.mjs` içinde varsayılan içe aktarma:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Fonksiyon  | Açıklama                                                                                                                                                                                                                        | İlgili Doküman                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Sözlükleri hazırlayan, Vite eklentilerini (takma adlar, yönlendirme proxy'si, budama) yapılandıran, istek ara yazılımını otomatik kaydeden ve yeniden yazılan URL'lerde önceden oluşturulmuş sayfalar yayan Astro entegrasyonu. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/intlayer.md) |

### Hook'lar (Sunucu ve İstemci)

İçe aktarma:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Açıklama                                                                                                                                                                                    | İlgili Doküman                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Bir sözlüğü anahtarına göre seçer ve yerelleştirilmiş içeriğini döndürür. `.astro` frontmatter'ında istek yerel ayarını `Astro.locals`'tan okur. `<script>` içinde istemci deposundan okur. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Bir sözlük nesnesini dönüştürür ve çözümlenen yerel ayar için içerik döndürür. Frontmatter ve istemci komut dosyalarında çalışır.                                                           | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Geçerli yerel ayarı, varsayılan yerel ayarı, kullanılabilir yerel ayarları ve yerel ayarı güncellemek için bir işlevi döndürür.                                                             | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/useLocale.md)         |

### Ara Yazılım (astro-intlayer/middleware)

İçe aktarma:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Dışa Aktarım | Tür                 | Açıklama                                                                                                                                                                | İlgili Doküman                                                                                                  |
| ------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest`  | `MiddlewareHandler` | İstek yerel ayarını algılayan ve `Astro.locals.intlayer` bağlayan Astro ara yazılımı. `intlayer()` tarafından otomatik kaydedilir veya birleştirmek için içe aktarılır. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/astro-intlayer/onRequest.md) |

### Yardımcı Programlar

İçe aktarma:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Fonksiyon           | Açıklama                                                                                                              | İlgili Doküman |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------- |
| `getIntlayerLocals` | `Astro.locals` dışındaki istek depolama kapsamından geçerli `IntlayerLocals` nesnesini almak için yardımcı fonksiyon. | -              |

### İstemci Yardımcı Programları (astro-intlayer/client)

İçe aktarma:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Tarayıcıda veya istemci `<script>` etiketleri içinde içe aktarıldığında, `astro-intlayer` otomatik olarak `astro-intlayer/client`'a eşlenir (`vanilla-intlayer` tarafından desteklenir), istemci tarafı sözlük alıcıları, depo aboneleri ve yerel ayar kalıcılık araçları sağlar.

### Formatlayıcılar (astro-intlayer/format)

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
} from "astro-intlayer/format";
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

### HTML Yardımcı Programları (astro-intlayer/html)

İçe aktarma:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Dışa Aktarım      | Tür        | Açıklama                                                        |
| ----------------- | ---------- | --------------------------------------------------------------- |
| `renderHTML`      | `Function` | HTML düğümlerini oluşturmak için bağımsız yardımcı işlev.       |
| `useHTML`         | `Hook`     | HTML sağlayıcı bağlamını ve yapılandırmasını alma hook'u.       |
| `useHTMLRenderer` | `Hook`     | Önceden yapılandırılmış bir HTML oluşturucu işlevi alma hook'u. |

### Markdown Yardımcı Programları (astro-intlayer/markdown)

İçe aktarma:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Dışa Aktarım          | Tür        | Açıklama                                                            |
| --------------------- | ---------- | ------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Markdown dizelerini yapılandırılmış bir temsile derler.             |
| `renderMarkdown`      | `Function` | Markdown içeriğini çıktı düğümlerine dönüştürür.                    |
| `parseMarkdown`       | `Function` | Ham Markdown içeriğini bir AST'ye ayrıştırır.                       |
| `useMarkdown`         | `Hook`     | Markdown sağlayıcı bağlamını alma hook'u.                           |
| `useMarkdownRenderer` | `Hook`     | Önceden yapılandırılmış bir Markdown oluşturucu işlevi alma hook'u. |

### Tipler

İçe aktarma:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Tip               | Açıklama                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | `locale`, `defaultLocale` ve `availableLocales` içeren `Astro.locals.intlayer`'a eklenen nesne. |
| `UseLocaleProps`  | `useLocale()` tarafından kabul edilen isteğe bağlı yapılandırma özellikleri.                    |
| `UseLocaleResult` | Yerel ayar özelliklerini ve güncelleme yöntemlerini sağlayan `useLocale()` dönüş türü.          |
