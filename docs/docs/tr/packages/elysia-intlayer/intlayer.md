---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: intlayer Elysia Eklenti Dokümantasyonu | elysia-intlayer
description: elysia-intlayer paketindeki intlayer eklentisinin nasıl kullanılacağını görün
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Uluslararasılaştırma
  - Dokümantasyon
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Dokümantasyonun başlatılması"
author: aymericzip
---

# intlayer Elysia Eklenti Dokümantasyonu

Elysia için `intlayer` eklentisi kullanıcının locale'ini tespit eder ve route context'ine bir `intlayer` nesnesi enjekte eder. Ayrıca, istek bağlamı içerisinde global çeviri fonksiyonlarının kullanılmasını sağlar.

## Kullanım

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    tr: "Merhaba",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> Plugin, context'ini **global** bir `derive` üzerinden kaydeder ve Elysia bunu `Partial<{ intlayer: IntlayerContext }>` olarak tipler. `.use(intlayer())` sonrasında kaydedilen route'larda değer çalışma zamanında her zaman mevcuttur; bu yüzden `strict` modda TypeScript'i memnun etmek için non-null assertion (`intlayer!.t`) veya optional chaining kullanın.

Aynı helper'lar bağımsız export'lar olarak da mevcuttur; böylece route context'ini destructure etmeden çağırabilirsiniz:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    tr: "Merhaba",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Açıklama

Eklenti aşağıdaki görevleri yerine getirir:

1. **Locale Algılama**: İstemcinin açıkça belirlediği locale'i storage'dan (çerez, başlık) okur, ardından `Accept-Language` başlığından müzakere edilen locale'e geri döner.
2. **Bağlama Enjeksiyon**: Elysia route context'ine bir `intlayer` özelliği ekler (aşağıdaki Route Context tablosuna bakın).
3. **Bağlam Yönetimi**: Asenkron bir bağlamı yönetmek için `AsyncLocalStorage` kullanır; böylece global Intlayer fonksiyonları (`t`, `getIntlayer`, `getDictionary`) bağlam nesnesini taşımaya gerek kalmadan isteğe özel locale'e erişebilir.
4. **Sözlük Hazırlığı**: Plugin oluşturulduğunda `prepareIntlayer` çağrılır, böylece sözlükler uygulama açılırken derlenir.

### Route Context

| Özellik           | Tip                    | Açıklama                                                                                    |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | Bu istek için kullanılacak locale; `locale_storage`, `locale_detected`'a göre önceliklidir. |
| `locale_storage`  | `Locale` (opsiyonel)   | İstemcinin bir çerez veya başlık aracılığıyla açıkça talep ettiği locale.                   |
| `locale_detected` | `Locale`               | İstek başlıklarından müzakere edilen locale.                                                |
| `defaultLocale`   | `Locale`               | `intlayer.config.ts` içinde fallback olarak yapılandırılan locale.                          |
| `t`               | `TranslateFunction`    | Bir çeviri fonksiyonu.                                                                      |
| `getIntlayer`     | `typeof getIntlayer`   | Sözlükleri anahtarına göre almak için bir fonksiyon.                                        |
| `getDictionary`   | `typeof getDictionary` | Sözlük nesnelerini işlemek için bir fonksiyon.                                              |

> Node tabanlı Intlayer eklentilerinin aksine, `elysia-intlayer` `cls-hooked` yerine `AsyncLocalStorage`'a dayanır; çünkü `cls-hooked`, Bun'un uygulamadığı `async_hooks.createHook`'a bağımlıdır.

İstek bağlamı, yanıt map'lendiği anda serbest bırakılır; böylece bağımsız helper'lar hiçbir zaman sonlanmış bir isteğe karşı çözümlenmez. Eklentinin işlediği bir isteğin dışında çağrıldıklarında, yapılandırılmış varsayılan locale'e geri dönerler.

## Locale Çözümleme Sırası

Varsayılan olarak plugin, locale'i şu sırayla çözer:

1. `INTLAYER_LOCALE` çerezi.
2. `x-intlayer-locale` header'ı.
3. `Accept-Language` header müzakeresi.
4. Yapılandırılan `defaultLocale`.

```bash
# `Accept-Language` üzerinden müzakere edildi
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# Çerez `Accept-Language`'e göre önceliklidir
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# Header `Accept-Language`'e göre önceliklidir
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Yapılandırma

Eklenti `intlayer.config.ts` dosyanızı okur. Locale algılama için kullanılan çerezi ve başlığı özelleştirebilirsiniz:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Yapılandırma hakkında daha fazla bilgi için [yapılandırma dokümantasyonunu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md) ziyaret edin.

## İlgili Dokümantasyon

- [elysia-intlayer Paket Dokümantasyonu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Uygulamanızı çevirmek için eksiksiz kılavuz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_with_elysia.md)
