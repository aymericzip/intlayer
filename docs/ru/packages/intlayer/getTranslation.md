# Документация: Функция `getTranslationContent` в `intlayer`

## Описание

Функция `getTranslationContent` извлекает содержимое, соответствующее определенной локали, из набора настраиваемого языкового содержимого. Если указанная локаль не найдена, по умолчанию возвращается содержимое для локали по умолчанию, настроенной в проекте.

## Параметры

- `languageContent: CustomizableLanguageContent<Content>`

  - **Описание**: Объект, содержащий переводы для различных локалей. Каждый ключ представляет локаль, а его значение , соответствующее содержимое.
  - **Тип**: `CustomizableLanguageContent<Content>`
    - `Content` может быть любого типа, по умолчанию `string`.

- `locale: Locales`

  - **Описание**: Локаль, для которой нужно получить содержимое.
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
    ru: "Привет",
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
    ru: "Привет",
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
    ru: "Привет",
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
    ru: "Привет",
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
    ru: "Привет",
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
    ru: "Привет",
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
    ru: { greeting: "Привет" },
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
    ru: { greeting: "Привет" },
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
    ru: { greeting: "Привет" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вывод: "Bonjour"
```

## Граничные случаи

- **Локаль не найдена:**
  - Когда `locale` не найдена в `languageContent`, функция возвращает содержимое для локали по умолчанию.
- **Неполное языковое содержимое:**
  - Если локаль определена частично, функция не объединяет содержимое. Она строго извлекает значение указанной локали или возвращает значение по умолчанию.
- **Применение TypeScript:**
  - Если локали в `languageContent` не соответствуют конфигурации проекта, TypeScript потребует определения всех необходимых локалей, обеспечивая полноту и безопасность типов.

[Документация на GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/ru/getTranslationContent.md)
