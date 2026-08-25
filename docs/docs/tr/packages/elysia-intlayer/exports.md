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

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` bir peer dependency'dir (`>=1.0.0`). Elysia **Bun** runtime'ını hedefler.

## Dışa Aktarımlar

### Eklenti

İçe aktarma:

```ts
import { intlayer } from "elysia-intlayer";
```

| Fonksiyon  | Açıklama                                                                                                                                                                                                                                                                                                               | İlgili Doküman                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Intlayer'ı Elysia uygulamanıza entegre eden Elysia eklentisi. Locale algılamayı storage'dan (çerezler, başlıklar) ve ardından `Accept-Language`'den yönetir, route context'ine `locale`, `t`, `getIntlayer` ve `getDictionary` sunan bir `intlayer` nesnesi enjekte eder ve `AsyncLocalStorage` istek bağlamını kurar. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/elysia-intlayer/intlayer.md) |

### Fonksiyonlar

İçe aktarma:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Fonksiyon       | Açıklama                                                                                                                                                                                                                                                    | İlgili Doküman                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Elysia'da mevcut locale için içeriği getiren global çeviri fonksiyonu. `intlayer` eklentisinin kurduğu istek bağlamına erişmek için `AsyncLocalStorage` kullanır ve bunun dışında varsayılan locale'e geri döner. `intlayer.t` üzerinden de erişilebilir.   | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dictionary/translation.md) |
| `getIntlayer`   | Üretilen bildirimden anahtarına göre bir sözlük getirir ve içeriğini mevcut locale için döndürür. `getDictionary`'nin optimize edilmiş sürümü. İstek bağlamına erişmek için `AsyncLocalStorage` kullanır. `intlayer.getIntlayer` üzerinden de erişilebilir. | -                                                                                                      |
| `getDictionary` | Sözlük nesnelerini işler ve mevcut locale için içeriği döndürür. `t()` çevirilerini, enumeration'ları, markdown'ı, HTML'i vb. işler. İstek bağlamına erişmek için `AsyncLocalStorage` kullanır. `intlayer.getDictionary` üzerinden de erişilebilir.         | -                                                                                                      |

### Tipler

İçe aktarma:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tip                 | Açıklama                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Her route context'ine enjekte edilen `intlayer` nesnesinin yapısı: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Bir locale map'ini mevcut istek locale'ine karşılık gelen içeriğe çeviren çeviri fonksiyonunun imzası.                                                                  |

## Kullanım

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Uluslararasılaştırma eklentisini yükle
  .use(intlayer())
  // Locale ve helper'ları route context'ten oku
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      tr: "Merhaba",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Ya da mevcut isteğe bağlı standalone helper'ları kullan
  .get("/t_example", () =>
    t({
      tr: "İngilizce'de döndürülen içerik örneği",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Plugin, context'ini **global** bir `derive` üzerinden kaydeder ve Elysia bunu `Partial<{ intlayer: IntlayerContext }>` olarak tipler. `.use(intlayer())` sonrasında kaydedilen route'larda değer çalışma zamanında her zaman mevcuttur; bu yüzden `strict` modda TypeScript'i memnun etmek için non-null assertion (`intlayer!.locale`) veya optional chaining kullanın.

## İlgili Dokümantasyon

- [Elysia i18n - Uygulamanızı çevirmek için eksiksiz kılavuz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_elysia.md)
- [Yapılandırma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
