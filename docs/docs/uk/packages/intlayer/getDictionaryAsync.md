---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionaryAsync Function Documentation | intlayer
description: See how to use the getDictionaryAsync function for intlayer package
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

# Документація: функція `getDictionaryAsync` в `intlayer`

## Опис

Функція `getDictionaryAsync` завантажує **один локальний чанк** словника та повертає його інтерпретований вміст.

Вона є аналогом [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getDictionary.md) для карт завантажувачів для кожної локалі, виданих в `.intlayer/dynamic_dictionaries/`: замість отримання словника, який містить кожну локаль, вона отримує карту завантажувачів та чекає лише на чанк потрібної локалі.

> У коді застосунку ви зазвичай викликаєте [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md), а не цю функцію. [Плагіни збирання](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) переписують кожний виклик `getIntlayerAsync('key', locale)` на `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` експортується для користувацьких завантажувачів та для утиліт, які будують власні карти завантажувачів.

**Ключові можливості:**

- Завантажує лише потрібний локальний чанк
- Підтримує звичайні (`locale → loader`) та кваліфіковані (`locale → qualifierId → loader`) карти завантажувачів
- Дедублікує одночасне завантаження одного чанка та кешує розв'язаний вміст
- Невдалі завантаження видаляються з кешу, так що пізніший виклик повторює спробу чанка

---

## Function Signature

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Обов'язково
  key: string,                                           // Обов'язково
  localeOrSelector?: LocalesValues | DictionarySelector, // Опціонально
  plugins?: Plugins[]                                    // Опціонально
): Promise<DeepTransformContent<...>>
```

---

## Параметри

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: Карта завантажувачів для кожної локалі. Звичайні карти асоціюють локаль із завантажувачем; кваліфіковані карти (використовуються колекціями та варіантами) асоціюють локаль із ідентифікатором кваліфікатора, а потім із завантажувачем. Для кваліфікованої карти завантажуються лише chunk'и, на які спрямований селектор.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: Ключ словника, використовується для namespace'ування кешу chunk'ів.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Локаль для інтерпретації вмісту або об'єкт селектора (`{ item }`, `{ variant }`, необов'язково з `locale`). Див. [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — за замовчуванням встановлюється значення `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Трансформатори Node. За замовчуванням використовується базовий набір інтерпретаторів.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the loaded chunk.
- **Description**: Resolves to `null` when the map emits no chunk for the requested locale nor for any of its fallbacks, mirroring how a missing qualified coordinate resolves.

---

## Приклад використання

### З генерованою картою завантажувача

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### З користувацькою картою завантажувача

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### З селектором на кваліфікованій карті

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Примітки щодо поведінки

### Кешування та дедублікація

Кеш зберігає **promise** кожної комбінації `key + locale + selector`, тому одночасні виклики для одного чанку очікують одного завантаження. Відхилене завантаження видаляється з кешу, тому невдалий чанк повторно завантажується при наступному виклику замість того, щоб постійно відтворювати ту саму помилку.

### Fallback за локаллю

Звичайна карта завантажувача проходить по тому ж ланцюжку fallback, що й синхронний режим: спочатку запитана локаль, потім її fallback, потім `null`, якщо жоден з них не видав chunk.

---

## Пов'язані функції

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md): Функція, яку викликають додатки; плаґіни збірки переписують її на `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getDictionary.md): Синхронний аналог, який приймає повний словник.
- [Динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md): Колекції та варіанти, а також генеровані ними карти завантажувачів.

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
