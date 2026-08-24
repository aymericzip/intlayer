---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionaryAsync Function Documentation | intlayer
description: getDictionaryAsync fonksiyonunun intlayer paketi için nasıl kullanılacağını görün
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: `getDictionaryAsync` Function in `intlayer`

## Açıklama

`getDictionaryAsync` işlevi, bir sözlüğün **tek bir yerel ayar parçasını** yükler ve yorumlanmış içeriğini döndürür.

`.intlayer/dynamic_dictionaries/` içinde yayınlanan yerel ayara özgü loader haritaları için [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getDictionary.md) işlevinin karşılığıdır: her yerel ayarı içeren bir sözlük almak yerine, loader haritasını alır ve istenen yerel ayarın ihtiyaç duyduğu parçayı bekler.

> Uygulama kodunda normalde bu işlevi değil, [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayerAsync.md) işlevini çağırırsınız. [Build eklentileri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/bundle_optimization.md), her `getIntlayerAsync('key', locale)` çağrısını `getDictionaryAsync(loaderMap, 'key', locale)` çağrısına dönüştürür. `getDictionaryAsync` özel loaderlar ve kendi loader haritalarını oluşturan tooling için dışa aktarılır.

**Temel Özellikler:**

- Yalnızca istenen yerel ayar parçasını yükler
- Düz (`locale → loader`) ve nitelikli (`locale → qualifierId → loader`) loader haritalarını destekler
- Aynı parçanın eşzamanlı yüklemelerini çoğaltmadan çıkarır ve çözülen içeriği önbelleğe alır
- Başarısız yüklemeler önbellekten çıkarılır, böylece daha sonraki bir çağrı parçayı yeniden dener

---

## İşlev İmzası

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Gerekli
  key: string,                                           // Gerekli
  localeOrSelector?: LocalesValues | DictionarySelector, // İsteğe bağlı
  plugins?: Plugins[]                                    // İsteğe bağlı
): Promise<DeepTransformContent<...>>
```

---

## Parametreler

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: Locale başına loader haritası. Basit haritalar bir locale'i bir loader ile ilişkilendirirken; nitelikli haritalar (koleksiyonlar ve varyantlar tarafından kullanılır) bir locale'i bir niteleyici id ile, ardından bir loader ile ilişkilendirir. Nitelikli bir harita için, yalnızca seçicinin hedeflediği chunk(lar) yüklenir.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: Sözlük anahtarı, chunk önbelleğini namespace'lemek için kullanılır.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: İçeriği yorumlamak için kullanılacak locale, veya bir seçici nesnesi (`{ item }`, `{ variant }`, isteğe bağlı olarak `locale` ile). Bkz. [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — yapılandırılan `defaultLocale` değerine varsayılan olarak ayarlanır.

- `plugins: Plugins[]`
  - **Description**: Node transformers. Temel interpreter setine varsayılan olarak ayarlanır.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Döndürülen Değerler

- **Type**: `Promise<Content>` — yüklenen chunk'ın yorumlanmış içeriğine çözümlenen bir promise.
- **Description**: İstenen locale için ne harita ne de herhangi bir fallback'i çıkardığında `null` değerine çözümlenir, eksik nitelendirilmiş koordinatın nasıl çözümlendiğini yansıtır.

---

## Örnek Kullanım

### Oluşturulan bir yükleyici haritası ile

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Özel bir loader haritası ile

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Nitelikli harita üzerinde bir seçici ile

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Davranış Notları

### Önbelleğe alma ve yinelenenleri kaldırma

Önbellek, her `key + locale + selector` üçlüsünün **promise**'ini depolar, bu nedenle aynı chunk için eşzamanlı çağrılar tek bir yüklemesi bekler. Reddedilen bir yükleme önbellekten kaldırılır, bu nedenle başarısız bir chunk, aynı hatayı sonsuza dek tekrarlamak yerine sonraki çağrıda yeniden denenir.

### Locale fallback

Düz bir loader haritası, senkron mod ile aynı fallback zinciri boyunca yürütülür: istenen locale ilk olarak, sonra fallback'leri, sonra hiçbiri chunk yayınlamadıysa `null`.

---

## İlgili Fonksiyonlar

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getIntlayerAsync.md): Uygulamaların çağırdığı fonksiyon; build eklentileri bunu `getDictionaryAsync` olarak yeniden yazar.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/packages/intlayer/getDictionary.md): Tam bir sözlük alan senkron karşılığı.
- [Dinamik sözlükler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/dynamic_dictionaries/index.md): Koleksiyonlar ve varyantlar, ve oluşturdukları loader haritaları.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
