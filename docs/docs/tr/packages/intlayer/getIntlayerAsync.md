---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: "getIntlayerAsync Fonksiyon Dokümantasyonu | intlayer"
description: "getIntlayerAsync ile bir sözlüğün içeriğini yalnızca tek bir locale için yükleyip okuyun, diğer diller bundle'a eklenmez."
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayerAsync
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "Locale verilmediğinde isteğin locale'i beklenir (Next.js header'ları ve cookie'leri)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "İlk dokümantasyon"
author: aymericzip
---

# Dokumentasyon: `intlayer` içindeki `getIntlayerAsync` Fonksiyonu

## Açıklama

`getIntlayerAsync` fonksiyonu bir sözlüğü anahtarına göre seçer ve içeriğini belirli bir locale için çözer, **yalnızca o locale'i yükler**.

[`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md) fonksiyonunun asenkron karşılığıdır ve sözlüğün render işlemi dışında okunduğu yerlerde kullanılır, route `head` / metadata builders, loaders, server functions.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md)

`getIntlayer` tüm locale'leri içeren birleştirilmiş sözlüğü çekerken, [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) bu çağrıyı `getDictionaryAsync(loaderMap, key, locale)` olarak yeniden yazar ve `.intlayer/dynamic_dictionaries/` içindeki locale başına chunks'lara işaret eder. Bundle bu nedenle yalnızca istenen locale'i taşır.

- [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md)

Bu plugins olmadan, optimize edilmemiş bir build, çağrı bunun yerine senkron sözlük registry'si üzerinden çözülür: aynı içerik, locale başına bölünme olmadan.

**Temel Özellikler:**

- `getIntlayer` ile aynı typed keys, selectors ve döndürülen içerik
- Optimize edilmiş builds'de yalnızca istenen locale chunk'ını yükler
- Aynı chunk için eş zamanlı çağrılar tek bir yüklemişi paylaşır
- `async` metadata builders, loaders ve server functions'larda kullanmak için güvenlidir

## Fonksiyon İmzası

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Gerekli
  localeOrSelector?: LocalesValues | DictionarySelector, // İsteğe Bağlı
  plugins?: Plugins[]                         // İsteğe Bağlı
): Promise<DeepTransformContent<...>>
```

## Parametreler

- `key: DictionaryKeys`
  - **Açıklama**: İçerik dosyalarınızda bildirildiği şekilde okunacak sözlüğün anahtarı.
  - **Tür**: `DictionaryKeys`, bildirilen her sözlük anahtarının birleşimi.
  - **Gerekli**: Evet

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Açıklama**: İçeriği yorumlamak için kullanılacak yerel ayar veya [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) için seçici nesnesi.
    - `'fr'`: bir yerel ayar
    - `{ item: 2 }`: bir [koleksiyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/collections.md) öğesi (tüm öğeleri dizi olarak almak için `item` atlanmalıdır)
    - `{ variant: 'black-friday' }`: adlandırılmış bir [varyant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/variants.md) (varsayılan olan için atlanmalıdır)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: yapılandırılmış varyant
    - Herhangi bir seçici yerel ayar taşıyabilir: `{ item: 2, locale: 'fr' }`
  - **Tür**: `LocalesValues | DictionarySelector`
  - **Gerekli**: Hayır (İsteğe bağlı). Verilmezse [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md) ile aynı şekilde çözümlenir (isteğin locale'i, sonra saklanan locale, sonra `defaultLocale`). Asenkron olduğu için, yalnızca asenkron okunabildiği durumlarda isteğin locale'ini de bekleyebilir: Next.js Server Components, `generateMetadata` ve route handler'larda, `next-intlayer/server` içindeki `getLocale()` gibi isteğin `headers()` ve `cookies()` değerlerini okur. Bu okuma route'u dinamik render'a geçirir, bu yüzden yalnızca `IntlayerProvider` locale'i henüz sağlamamışsa yapılır.

- `plugins: Plugins[]`
  - **Açıklama**: Temel yorumlayıcı eklentilerini değiştiren özel düğüm dönüştürücüleri. Yalnızca ileri kullanım için.
  - **Tür**: `Plugins[]`
  - **Gerekli**: Hayır (İsteğe bağlı)

### Döndürülen Değer

- **Tür**: `Promise<Content>`, sözlüğün yorumlanan içeriğine çözümlenen bir promise, deklarasyonunuzdan yazılmıştır.

## Örnek Kullanım

### Temel Kullanım

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Döndürülen değer   | İçerik                                                                                                          | İçeriğin bir promise'i                                  |
| Yüklenen sözlük    | Birleştirilmiş sözlük (tüm diller)                                                                              | Yalnızca istenen dilin parçası                          |
| En uygun kullanım  | Rendering, senkron kod yolları                                                                                  | Metadata, loaders, server fonksiyonları                 |
| Plugin gerekli mi? | Hayır                                                                                                           | Hayır, dil başına bölme, build eklentilerini gerektirir |

Her ikisi de aynı argümanları kabul eder ve aynı içeriği döndürür: birinden diğerine geçiş yalnızca **ne zaman** ve **ne kadar** yüklendiğini değiştirir.

## İlgili Fonksiyonlar

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocale.md)

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
