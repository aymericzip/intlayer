---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Документация функции getIntlayerAsync | intlayer
description: "Используйте getIntlayerAsync, чтобы загрузить и прочитать контент словаря только для одной локали, не включая другие языки в бандл."
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
    changes: "Без локали ожидается локаль запроса (заголовки и cookies Next.js)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Первоначальная документация"
author: aymericzip
---

# Документация: функция `getIntlayerAsync` в `intlayer`

## Описание

Функция `getIntlayerAsync` выбирает один словарь по его ключу и разрешает его содержимое для заданной локали, **загружая только эту локаль**.

Это асинхронный аналог [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md), предназначенный для мест, где словарь читается вне рендеринга, построители маршрута `head` / метаданных, загрузчики, серверные функции.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md)

В то время как `getIntlayer` подгружает объединённый словарь, содержащий все локали, [плагины сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) переписывают этот вызов в `getDictionaryAsync(loaderMap, key, locale)`, указывая на части для каждой локали в `.intlayer/dynamic_dictionaries/`. Таким образом, бандл никогда не содержит ничего, кроме фактически запрошенной локали.

- [плагины сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md)

Без этих плагинов, при неоптимизированной сборке, вызов разрешается через синхронный реестр словарей вместо этого: то же содержимое, но без разделения по локалям.

**Ключевые особенности:**

- Те же типизированные ключи, селекторы и возвращаемое содержимое, что и в `getIntlayer`
- Загружает только запрошенный фрагмент локали в оптимизированных сборках
- Одновременные вызовы для одного и того же фрагмента используют единую загрузку
- Безопасно использовать в `async` построителях метаданных, загрузчиках и серверных функциях

## Сигнатура функции

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Обязательно
  localeOrSelector?: LocalesValues | DictionarySelector, // Опционально
  plugins?: Plugins[]                         // Опционально
): Promise<DeepTransformContent<...>>
```

## Параметры

- `key: DictionaryKeys`
  - **Описание**: Ключ словаря для чтения, как объявлено в ваших файлах контента.
  - **Тип**: `DictionaryKeys`, объединение всех объявленных ключей словаря.
  - **Обязательно**: Да

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Описание**: Локаль для интерпретации контента или объект селектора для [динамических словарей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md).
    - `'fr'`: локаль
    - `{ item: 2 }`: элемент [коллекции](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/collections.md) (опустите `item`, чтобы получить все элементы в виде массива)
    - `{ variant: 'black-friday' }`: именованный [вариант](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/variants.md) (опустите для получения `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: структурированный вариант
    - Любой селектор может содержать локаль: `{ item: 2, locale: 'fr' }`
  - **Тип**: `LocalesValues | DictionarySelector`
  - **Обязательно**: Нет (необязательно). Если не указана, определяется так же, как в [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md) (локаль запроса, затем сохранённая локаль, затем `defaultLocale`). Будучи асинхронной, функция также может дождаться локали запроса, если её можно прочитать только асинхронно: в Server Components Next.js, `generateMetadata` и route handlers она читает `headers()` и `cookies()` запроса, как `getLocale()` из `next-intlayer/server`. Такое чтение переводит маршрут в динамический рендеринг, поэтому оно выполняется, только если `IntlayerProvider` ещё не предоставил локаль.

- `plugins: Plugins[]`
  - **Описание**: Пользовательские трансформаторы узлов, заменяющие базовые плагины интерпретатора. Только для продвинутого использования.
  - **Тип**: `Plugins[]`
  - **Обязательно**: Нет (необязательно)

### Возвращаемое значение

- **Тип**: `Promise<Content>`, обещание, разрешаемое в интерпретированное содержимое словаря, типизированное из вашего объявления.

## Пример использования

### Основное использование

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Returns            | Контент                                                                                                         | Обещание (promise) контента                       |
| Dictionary loaded  | Объединённый словарь (все локали)                                                                               | Только фрагмент запрошенной локали                |
| Best suited for    | Рендеринг, синхронные пути кода                                                                                 | Метаданные, загрузчики, серверные функции         |
| Requires a plugin? | Нет                                                                                                             | Нет, разделение по локалям требует плагины сборки |

Обе функции принимают одинаковые аргументы и возвращают одинаковый контент: переключение между ними изменяет только **когда** и **сколько** загружается.

## Связанные функции

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocale.md)

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
