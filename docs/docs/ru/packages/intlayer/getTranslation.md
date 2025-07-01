---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getTranslation | intlayer
description: Узнайте, как использовать функцию getTranslation для пакета intlayer
keywords:
  - getTranslation
  - перевод
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# Документация: функция `getTranslationContent` в `intlayer`

## Описание

Функция `getTranslationContent` извлекает содержимое, соответствующее определённой локали, из набора настраиваемого языкового контента. Если указанная локаль не найдена, по умолчанию возвращается содержимое для локали по умолчанию, настроенной в проекте.

## Параметры

- `languageContent: CustomizableLanguageContent<Content>`

  - **Описание**: Объект, содержащий переводы для различных локалей. Каждый ключ представляет локаль, а значение — соответствующее содержимое.
  - **Тип**: `CustomizableLanguageContent<Content>`
    - `Content` может быть любого типа, по умолчанию `string`.

- `locale: Locales`

  - **Описание**: Локаль, для которой необходимо получить содержимое.
  - **Тип**: `Locales`

## Возвращаемое значение

- **Тип**: `Content`
- **Описание**: Содержимое, соответствующее указанной локали. Если локаль не найдена, возвращается содержимое локали по умолчанию.

## Пример использования

### Базовое использование

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Вывод: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Вывод: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
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
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вывод: "Hello" (содержимое локали по умолчанию)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вывод: "Hello" (содержимое локали по умолчанию)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вывод: "Hello" (содержимое локали по умолчанию)
```

### Использование пользовательских типов содержимого:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вывод: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вывод: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вывод: "Bonjour"
```

## Крайние случаи

- **Локаль не найдена:**
  - Если `locale` не найден в `languageContent`, функция возвращает содержимое локали по умолчанию.
- **Неполное содержимое языка:**
  - Если локаль определена частично, функция не объединяет содержимое. Она строго извлекает значение указанной локали или возвращается к локали по умолчанию.
- **Контроль TypeScript:**
  - Если локали в `languageContent` не соответствуют конфигурации проекта, TypeScript потребует определения всех необходимых локалей, обеспечивая полноту и типобезопасность содержимого.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
