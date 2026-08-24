---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Документация функции getDictionaryAsync | intlayer
description: Узнайте, как использовать функцию getDictionaryAsync для пакета intlayer
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

# Документация: Функция `getDictionaryAsync` в `intlayer`

## Описание

Функция `getDictionaryAsync` загружает **единый языковой chunk** словаря и возвращает его интерпретированное содержимое.

Это аналог [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getDictionary.md) для maps загрузчиков для отдельных языков, выпускаемых в `.intlayer/dynamic_dictionaries/`: вместо получения словаря со всеми языками он получает map загрузчика и ожидает только chunk для запрошенного языка.

> В коде приложения вы обычно вызываете [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayerAsync.md), а не эту функцию. [Плагины сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) переписывают каждый вызов `getIntlayerAsync('key', locale)` на `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` экспортируется для пользовательских загрузчиков и для инструментов, которые создают свои собственные maps загрузчиков.

**Ключевые особенности:**

- Загружает только запрошенный языковой chunk
- Поддерживает простые (`locale → loader`) и квалифицированные (`locale → qualifierId → loader`) maps загрузчиков
- Дедублирует одновременные загрузки одного chunk и кэширует разрешенное содержимое
- Неудачные загрузки удаляются из кэша, поэтому последующий вызов повторит попытку загрузки chunk

---

## Сигнатура функции

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Обязательно
  key: string,                                           // Обязательно
  localeOrSelector?: LocalesValues | DictionarySelector, // Опционально
  plugins?: Plugins[]                                    // Опционально
): Promise<DeepTransformContent<...>>
```

---

## Параметры

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: Карта загрузчиков для каждой локали. Простые карты связывают локаль с загрузчиком; квалифицированные карты (используются коллекциями и вариантами) связывают локаль с идентификатором квалификатора, затем с загрузчиком. Для квалифицированной карты загружаются только фрагменты, на которые указывает селектор.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: Ключ словаря, используется для разделения кэша фрагментов.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Локаль для интерпретации контента или объект селектора (`{ item }`, `{ variant }`, опционально с `locale`). См. [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — по умолчанию используется настроенная `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Node трансформеры. По умолчанию используется базовый набор интерпретатора.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the loaded chunk.
- **Description**: Resolves to `null` when the map emits no chunk for the requested locale nor for any of its fallbacks, mirroring how a missing qualified coordinate resolves.

---

## Пример использования

### С генерируемой картой загрузчика

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### С пользовательской картой загрузчика

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### С селектором на квалифицированной карте

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Примечания о поведении

### Кеширование и дедупликация

Кеш сохраняет **promise** каждой тройки `key + locale + selector`, поэтому одновременные вызовы для одного chunk ждут одной загрузки. Отклоненная загрузка удаляется из кеша, поэтому неудавшийся chunk повторяется при следующем вызове вместо того, чтобы воспроизводить одну и ту же ошибку бесконечно.

### Fallback локали

Простая карта загрузчика следует той же цепочке fallback, что и синхронный режим: сначала запрашиваемая локаль, затем её fallbacks, затем `null`, если ни один из них не выдал chunk.

---

## Связанные функции

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayerAsync.md): Функция, которую вызывают приложения; плагины сборки переписывают её в `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getDictionary.md): Синхронный аналог, принимающий полный словарь.
- [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md): Collections и variants, а также генерируемые ими карты loader.

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
