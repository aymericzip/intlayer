---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Документация функции getDictionary | intlayer
description: Узнайте, как использовать функцию getDictionary в пакете intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Документация: функция `getDictionary` в `intlayer`

## Описание

Функция `getDictionary` интерпретирует словарь **объект, который вы передаёте сами**, и возвращает его разрешённое содержимое для заданной локали. Она проходит содержимое в один проход и применяет каждый плагин интерпретатора по мере необходимости, разрешая переводы `t()`, перечисления, условия, вставки, вложенность, markdown, HTML и узлы файлов.

В отличие от [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md), которая ищет словарь по ключу в сгенерированном реестре, `getDictionary` принимает сам словарь. Это делает её правильным инструментом для содержимого, построенного во время выполнения, полученного из API или CMS, или объявленного встроенно в тесте.

**Ключевые особенности:**

- Работает с любым объектом, следующим структуре словаря (`{ key, content }`)
- Также принимает квалифицированную группу словаря (коллекции, варианты) вместе с селектором
- Полностью типизирована: возвращаемый объект отражает `content`, который вы передали
- Принимает пользовательские плагины интерпретатора

---

## Сигнатура функции

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Обязательно
  localeOrSelector?: LocalesValues | DictionarySelector, // Опционально
  plugins?: Plugins[]                                // Опционально
): DeepTransformContent<...>
```

---

## Параметры

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Description**: Словарь (или квалифицированная группа словарей) для интерпретации.
  - **Type**: `Dictionary | QualifiedDictionaryGroup`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Локаль для интерпретации содержимого или объект селектора (`{ item }`, `{ variant }`, опционально с `locale`). См. [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Массив преобразователей узлов, определяющих способ интерпретации распознанных узлов. Если не указано, используется набор плагинов интерпретатора по умолчанию.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Возвращаемое значение

- **Type**: The interpreted content of the dictionary.
- **Description**: The `content` you passed, with every Intlayer node resolved for the requested locale. For a collection group without an `item` selector, an ordered array of interpreted entries is returned; `null` is returned when the selector targets nothing.

---

## Пример использования

### Базовое использование

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        ru: "Привет",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "ru"
);

console.log(content.greeting); // "Привет"
```

### Интерпретация контента, полученного во время выполнения

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### С селектором

```typescript
import { getDictionary } from "intlayer";

// Квалифицированная группа словаря разрешается в одну запись…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …или в упорядоченный массив, если `item` не указан
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Связанные функции

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md): Аналогичная интерпретация, но словарь ищется по ключу в созданном реестре.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getDictionaryAsync.md): Аналог для карт загрузчиков для каждой локали.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useDictionary.md): Эквивалент React хука, читающий локаль от провайдера.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
