---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayerAsync Function Documentation | intlayer
description: getIntlayerAsync fonksiyonunun intlayer paketi ile nasıl kullanılacağını öğrenin
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
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentasyon: `intlayer` içindeki `getIntlayerAsync` Fonksiyonu

## Açıklama

`getIntlayerAsync` fonksiyonu bir sözlüğü anahtarına göre seçer ve içeriğini belirli bir locale için çözer, **yalnızca o locale'i yükler**.

[`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md) fonksiyonunun asenkron karşılığıdır ve sözlüğün render işlemi dışında okunduğu yerlerde kullanılır — route `head` / metadata builders, loaders, server functions.

`getIntlayer` tüm locale'leri içeren birleştirilmiş sözlüğü çekerken, [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) bu çağrıyı `getDictionaryAsync(loaderMap, key, locale)` olarak yeniden yazar ve `.intlayer/dynamic_dictionaries/` içindeki locale başına chunks'lara işaret eder. Bundle bu nedenle yalnızca istenen locale'i taşır.

Bu plugins olmadan — optimize edilmemiş bir build — çağrı bunun yerine senkron sözlük registry'si üzerinden çözülür: aynı içerik, locale başına bölünme olmadan.

**Temel Özellikler:**

- `getIntlayer` ile aynı typed keys, selectors ve döndürülen içerik
- Optimize edilmiş builds'de yalnızca istenen locale chunk'ını yükler
- Aynı chunk için eş zamanlı çağrılar tek bir yüklemişi paylaşır
- `async` metadata builders, loaders ve server functions'larda kullanmak için güvenlidir

---

## Fonksiyon İmzası

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Gerekli
  localeOrSelector?: LocalesValues | DictionarySelector, // İsteğe Bağlı
  plugins?: Plugins[]                         // İsteğe Bağlı
): Promise<DeepTransformContent<...>>
```

---

## Parametreler

- `key: DictionaryKeys`
  - **Description**: İçerik dosyalarınızda bildirildiği şekilde okunacak sözlüğün anahtarı.
  - **Type**: `DictionaryKeys` — bildirilen her sözlük anahtarının birleşimi.
  - **Required**: Evet

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: İçeriği yorumlamak için kullanılacak yerel ayar veya [dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md) için seçici nesnesi.
    - `'fr'` — bir yerel ayar
    - `{ item: 2 }` — bir [koleksiyon](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/collections.md) öğesi (tüm öğeleri dizi olarak almak için `item` atlanmalıdır)
    - `{ variant: 'black-friday' }` — adlandırılmış bir [varyant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/variants.md) (varsayılan olan için atlanmalıdır)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — yapılandırılmış varyant
    - Herhangi bir seçici yerel ayar taşıyabilir: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: Hayır (İsteğe bağlı) — yapılandırılan `defaultLocale` değerini kullanır.

- `plugins: Plugins[]`
  - **Description**: Temel yorumlayıcı eklentilerini değiştiren özel düğüm dönüştürücüleri. Yalnızca ileri kullanım için.
  - **Type**: `Plugins[]`
  - **Required**: Hayır (İsteğe bağlı)

### Döndürülen Değer

- **Type**: `Promise<Content>` — sözlüğün yorumlanan içeriğine çözümlenen bir promise, deklarasyonunuzdan yazılmıştır.

---

## Örnek Kullanım

### Temel Kullanım

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Döndürülen değer   | İçerik                                                                                                          | İçeriğin bir promise'i                                   |
| Yüklenen sözlük    | Birleştirilmiş sözlük (tüm diller)                                                                              | Yalnızca istenen dilin parçası                           |
| En uygun kullanım  | Rendering, senkron kod yolları                                                                                  | Metadata, loaders, server fonksiyonları                  |
| Plugin gerekli mi? | Hayır                                                                                                           | Hayır — dil başına bölme, build eklentilerini gerektirir |

Her ikisi de aynı argümanları kabul eder ve aynı içeriği döndürür: birinden diğerine geçiş yalnızca **ne zaman** ve **ne kadar** yüklendiğini değiştirir.

---

## İlgili Fonksiyonlar

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayer.md): Birleştirilmiş sözlüğü okuyan senkron eşdeğer.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getDictionaryAsync.md): Build eklentilerinin bu çağrıyı yeniden yazdığı alt seviye fonksiyon.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getLocale.md): Gelen bir isteğin yerel ayarını algılar.

---

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
