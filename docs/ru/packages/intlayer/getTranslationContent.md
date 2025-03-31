# Документация: Функция `getTranslation` в `intlayer`

## Описание

Функция `getTranslation` извлекает контент, соответствующий определенной локали, из набора настраиваемого языкового контента. Если указанная локаль не найдена, по умолчанию возвращается контент для локали по умолчанию, настроенной в проекте.

## Параметры

- `languageContent: CustomizableLanguageContent<Content>`

  - **Описание**: Объект, содержащий переводы для различных локалей. Каждый ключ представляет локаль, а его значение , соответствующий контент.
  - **Тип**: `CustomizableLanguageContent<Content>`
    - `Content` может быть любого типа, по умолчанию `string`.

- `locale: Locales`

  - **Описание**: Локаль, для которой должен быть извлечен контент.
  - **Тип**: `Locales`

## Возвращаемое значение

- **Тип**: `Content`
- **Описание**: Контент, соответствующий указанной локали. Если локаль не найдена, возвращается контент локали по умолчанию.

## Пример использования

### Основное использование

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ru: "Привет",
  },
  Locales.ENGLISH
);

console.log(content); // Вывод: "Hello"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ru: "Привет",
  },
  Locales.ENGLISH
);

console.log(content); // Вывод: "Hello"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ru: "Привет",
  },
  Locales.ENGLISH
);

console.log(content); // Вывод: "Hello"
```

### Отсутствующая локаль:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ru: "Привет",
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
    ru: "Привет",
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
    ru: "Привет",
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
    ru: { greeting: "Привет" },
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
    ru: { greeting: "Привет" },
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
    ru: { greeting: "Привет" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вывод: "Bonjour"
```

## Граничные случаи

- **Локаль не найдена:**
  - Когда `locale` не найдена в `languageContent`, функция возвращает контент для локали по умолчанию.
- **Неполный языковой контент:**
  - Если локаль частично определена, функция не объединяет контент. Она строго извлекает значение указанной локали или возвращает значение по умолчанию.
- **Применение TypeScript:**
  - Если локали в `languageContent` не соответствуют конфигурации проекта, TypeScript потребует определения всех необходимых локалей, обеспечивая полноту и безопасность типов.
