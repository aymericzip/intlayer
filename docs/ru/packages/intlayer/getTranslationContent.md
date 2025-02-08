# Документация: Функция `getTranslation` в `intlayer`

## Описание:

Функция `getTranslation` извлекает содержимое, соответствующее конкретной локали из набора настраиваемого языкового контента. Если указанная локаль не найдена, по умолчанию возвращается контент для локали по умолчанию, настроенной в проекте.

## Параметры:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Описание**: Объект, содержащий переводы для различных локалей. Каждой ключ соответствует локали, а его значение - соответствующий контент.
  - **Тип**: `CustomizableLanguageContent<Content>`
    - `Content` может быть любого типа, по умолчанию - `string`.

- `locale: Locales`

  - **Описание**: Локаль, для которой нужно извлечь содержимое.
  - **Тип**: `Locales`

## Возвращает:

- **Тип**: `Content`
- **Описание**: Содержимое, соответствующее указанной локали. Если локаль не найдена, возвращается контент локали по умолчанию.

## Пример использования:

### Основное использование:

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

### Использование настраиваемых типов контента:

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

## Пограничные случаи:

- **Локаль не найдена:**
  - Когда `locale` не найдена в `languageContent`, функция возвращает контент для локали по умолчанию.
- **Неполный языковой контент:**

  - Если локаль частично определена, функция не объединяет содержимое. Она строго извлекает значение указанной локали или возвращается к значению по умолчанию.

- **Принуждение TypeScript:**
  - Если локали в `languageContent` не соответствуют конфигурации проекта, TypeScript будет настаивать на том, чтобы все требуемые локали были определены, обеспечивая полноту и типобезопасность контента.
