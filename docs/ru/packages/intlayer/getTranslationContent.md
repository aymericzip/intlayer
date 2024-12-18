# Документация: Функция `getTranslationContent` в `intlayer`

## Описание:

Функция `getTranslationContent` извлекает контент, соответствующий конкретной локали из набора настраиваемого языкового контента. Если указанная локаль не найдена, по умолчанию возвращается контент для локали по умолчанию, настроенной в проекте.

## Параметры:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Описание**: Объект, содержащий переводы для различных локалей. Каждой ключ представляет локаль, а его значение — соответствующий контент.
  - **Тип**: `CustomizableLanguageContent<Content>`
    - `Content` может быть любого типа, по умолчанию `string`.

- `locale: Locales`

  - **Описание**: Локаль, для которой необходимо извлечь контент.
  - **Тип**: `Locales`

## Возврат:

- **Тип**: `Content`
- **Описание**: Контент, соответствующий заданной локали. Если локаль не найдена, возвращается контент локали по умолчанию.

## Пример использования:

### Основное использование:

```typescript
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

### Отсутствующая локаль:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вывод: "Hello" (контент локали по умолчанию)
```

### Использование пользовательских типов контента:

```typescript
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

## Граничные случаи:

- **Локаль не найдена:**
  - Когда `locale` не найдена в `languageContent`, функция возвращает контент локали по умолчанию.
- **Неполный языковой контент:**

  - Если локаль частично определена, функция не сливает содержимое. Она строго извлекает значение заданной локали или возвращается к значению по умолчанию.

- **Принудительное выполнение TypeScript:**
  - Если локали в `languageContent` не совпадают с конфигурацией проекта, TypeScript будет настаивать на том, чтобы все требуемые локали были определены, обеспечивая полноту и безопасность типов контента.
