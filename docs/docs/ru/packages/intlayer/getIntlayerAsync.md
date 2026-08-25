---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Документация функции getIntlayerAsync | intlayer
description: Узнайте, как использовать функцию getIntlayerAsync для пакета intlayer
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

# Документация: функция `getIntlayerAsync` в `intlayer`

## Описание

Функция `getIntlayerAsync` выбирает один словарь по его ключу и разрешает его содержимое для заданной локали, **загружая только эту локаль**.

Это асинхронный аналог [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md), предназначенный для мест, где словарь читается вне рендеринга — построители маршрута `head` / метаданных, загрузчики, серверные функции.

В то время как `getIntlayer` подгружает объединённый словарь, содержащий все локали, [плагины сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) переписывают этот вызов в `getDictionaryAsync(loaderMap, key, locale)`, указывая на части для каждой локали в `.intlayer/dynamic_dictionaries/`. Таким образом, бандл никогда не содержит ничего, кроме фактически запрошенной локали.

Без этих плагинов — при неоптимизированной сборке — вызов разрешается через синхронный реестр словарей вместо этого: то же содержимое, но без разделения по локалям.

**Ключевые особенности:**

- Те же типизированные ключи, селекторы и возвращаемое содержимое, что и в `getIntlayer`
- Загружает только запрошенный фрагмент локали в оптимизированных сборках
- Одновременные вызовы для одного и того же фрагмента используют единую загрузку
- Безопасно использовать в `async` построителях метаданных, загрузчиках и серверных функциях

---

## Сигнатура функции

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Обязательно
  localeOrSelector?: LocalesValues | DictionarySelector, // Опционально
  plugins?: Plugins[]                         // Опционально
): Promise<DeepTransformContent<...>>
```

---

## Параметры

- `key: DictionaryKeys`
  - **Описание**: Ключ словаря для чтения, как объявлено в ваших файлах контента.
  - **Тип**: `DictionaryKeys` — объединение всех объявленных ключей словаря.
  - **Обязательно**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Описание**: Локаль для интерпретации контента или объект селектора для [динамических словарей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md).
    - `'fr'` — локаль
    - `{ item: 2 }` — элемент [коллекции](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/collections.md) (опустите `item`, чтобы получить все элементы в виде массива)
    - `{ variant: 'black-friday' }` — именованный [вариант](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/variants.md) (опустите для получения `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — структурированный вариант
    - Любой селектор может содержать локаль: `{ item: 2, locale: 'fr' }`
  - **Тип**: `LocalesValues | DictionarySelector`
  - **Обязательно**: No (Optional) — по умолчанию используется настроенный `defaultLocale`.

- `plugins: Plugins[]`
  - **Описание**: Пользовательские трансформаторы узлов, заменяющие базовые плагины интерпретатора. Только для продвинутого использования.
  - **Тип**: `Plugins[]`
  - **Обязательно**: No (Optional)

### Возвращаемое значение

- **Type**: `Promise<Content>` — обещание, разрешаемое в интерпретированное содержимое словаря, типизированное из вашего объявления.

---

## Пример использования

### Основное использование

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Returns            | Контент                                                                                                         | Обещание (promise) контента                        |
| Dictionary loaded  | Объединённый словарь (все локали)                                                                               | Только фрагмент запрошенной локали                 |
| Best suited for    | Рендеринг, синхронные пути кода                                                                                 | Метаданные, загрузчики, серверные функции          |
| Requires a plugin? | Нет                                                                                                             | Нет — разделение по локалям требует плагины сборки |

Обе функции принимают одинаковые аргументы и возвращают одинаковый контент: переключение между ними изменяет только **когда** и **сколько** загружается.

---

## Связанные функции

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md): Синхронный эквивалент, читающий объединённый словарь.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getDictionaryAsync.md): Функция нижнего уровня, в которую переписывают вызовы плагины сборки.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocale.md): Определяет локаль входящего запроса.

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
