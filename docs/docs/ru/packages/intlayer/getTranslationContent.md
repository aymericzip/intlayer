---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Функция getTranslation - Документация Intlayer JavaScript
description: Документация по функции getTranslation в Intlayer, которая получает локализованный контент для конкретных локалей с возвратом к контенту по умолчанию.
keywords:
  - getTranslation
  - intlayer
  - функция
  - локализация
  - i18n
  - JavaScript
  - перевод
  - локаль
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
---

# Документация: Функция `getTranslation` в `intlayer`

## Описание

Функция `getTranslation` извлекает контент, соответствующий определённой локали, из набора настраиваемого языкового контента. Если указанная локаль не найдена, по умолчанию возвращается контент для локали по умолчанию, настроенной в проекте.

## Параметры

- `languageContent: CustomizableLanguageContent<Content>`
  - **Описание**: Объект, содержащий переводы для различных локалей. Каждый ключ представляет локаль, а значение - соответствующий контент.
  - **Тип**: `CustomizableLanguageContent<Content>`
    - `Content` может быть любого типа, по умолчанию `string`.

- `locale: Locales`
  - **Описание**: Локаль, для которой необходимо получить контент.
  - **Тип**: `Locales`

## Возвращаемое значение

- **Тип**: `Content`
- **Описание**: Контент, соответствующий указанной локали. Если локаль не найдена, возвращается контент локали по умолчанию.

## Пример использования

### Базовое использование

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Вывод: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Вывод: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Вывод: "Bonjour"
```

### Отсутствующая локаль:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вывод: "Hello" (контент локали по умолчанию)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вывод: "Hello" (контент локали по умолчанию)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вывод: "Hello" (контент локали по умолчанию)
```

### Использование пользовательских типов контента:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вывод: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вывод: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вывод: "Bonjour"
```

## Особые случаи

- **Локаль не найдена:**
  - Если `locale` не найден в `languageContent`, функция возвращает контент локали по умолчанию.
- **Неполный контент языка:**
  - Если локаль определена частично, функция не объединяет содержимое. Она строго возвращает значение указанной локали или использует значение по умолчанию.
- **Принудительная проверка TypeScript:**
  - Если локали в `languageContent` не соответствуют конфигурации проекта, TypeScript потребует определения всех необходимых локалей, гарантируя, что контент полный и типобезопасный.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
