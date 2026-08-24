---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Документация функции getIntlayer | intlayer
description: Узнайте, как использовать функцию getIntlayer для пакета intlayer
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Документация: функция `getIntlayer` в `intlayer`

## Описание

Функция `getIntlayer` выбирает один словарь по его ключу и возвращает его содержимое, интерпретированное для заданной локали. Это независимый от фреймворка эквивалент хука `useIntlayer`: то же содержимое, те же селекторы, но пригодный для использования везде, где React контекст недоступен — скрипты Node, серверные функции, загрузчики маршрутов, построители метаданных, обработчики Express/Fastify, тесты.

Функция читает словари, созданные Intlayer в `.intlayer/`, поэтому аргумент `key` типизирован и автодополняется на основе ваших объявлений содержимого, а возвращаемый объект полностью типизирован вплоть до каждого листового узла.

**Основные возможности:**

- Типизированные ключи словарей и типизированное возвращаемое содержимое
- Интерпретирует каждый узел содержимого (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Принимает локаль или объект селектора (коллекции, варианты)
- Результаты кэшируются для каждой комбинации `key + locale + selector`
- В режиме разработки откатывается на безопасный прокси при отсутствии словаря вместо краша

---

## Function Signature

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Обязательно
  localeOrSelector?: LocalesValues | DictionarySelector, // Опционально
  plugins?: Plugins[]                         // Опционально
): DeepTransformContent<...>
```

---

## Параметры

- `key: DictionaryKeys`
  - **Description**: Ключ словаря для чтения, объявленный в ваших файлах контента.
  - **Type**: `DictionaryKeys` — объединение всех объявленных ключей словаря.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Локаль для интерпретации контента или объект селектора для [динамических словарей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md).
    - `'fr'` — локаль
    - `{ item: 2 }` — элемент [коллекции](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/collections.md) (опустите `item` чтобы получить все элементы как массив)
    - `{ variant: 'black-friday' }` — именованный [вариант](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/variants.md) (опустите для `default` варианта)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — структурированный вариант
    - Любой селектор может содержать локаль: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — по умолчанию используется настроенная `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Пользовательские трансформеры узлов, заменяющие базовые плагины интерпретатора. Только для продвинутого использования; опустите для сохранения поведения по умолчанию.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Возвращаемое значение

- **Type**: Интерпретированное содержимое словаря, типизированное из вашего объявления.
- **Description**: Простой объект, отражающий поле `content` вашего словаря, где каждый узел Intlayer разрешен на его финальное значение для запрошенной локали.

---

## Пример использования

### Базовое использование

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      ru: "Привет",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### Без локали

Если пропустить параметр locale, контент будет интерпретирован с использованием `defaultLocale`, объявленной в вашей [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Интерпретируется с локалью по умолчанию
```

### Внутри обработчика сервера

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### С селектором (коллекции и варианты)

```typescript
import { getIntlayer } from "intlayer";

// Один элемент коллекции
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Все элементы коллекции, как упорядоченный массив
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Именованный вариант
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Примечания о поведении

### Кеширование

Результаты кешируются на уровне модуля с ключом `key + locale + selector`. Повторные вызовы `getIntlayer("app", "fr")` интерпретируют словарь один раз и впоследствии возвращают тот же объект.

### Отсутствующие словари

В процессе разработки запрос ключа, для которого не был сгенерирован словарь, регистрирует предупреждение один раз и возвращает безопасный резервный прокси: чтение `content.title` возвращает строку `"app.title"` вместо выброса ошибки. Это позволяет странице оставаться функциональной во время исправления недостающей декларации. Запустите сборку Intlayer (или сервер разработки), чтобы словарь был сгенерирован.

### Размер бандла

`getIntlayer` читает объединённый словарь, который содержит **все** локали. В клиентских бандлах [плагины сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) переписывают вызов так, чтобы отправлялось только необходимое содержимое. Когда вы читаете содержимое вне рендеринга (метаданные, загрузчики, серверные функции) и хотите загрузить одну локаль по требованию, используйте [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayerAsync.md).

---

## Связанные функции

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayerAsync.md): Асинхронный аналог для загрузки одного языкового chunk'а.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getDictionary.md): Интерпретирует объект словаря, который вы передаёте сами, вместо поиска по ключу.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md): Эквивалент React hook'а, читающий локаль из провайдера.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
