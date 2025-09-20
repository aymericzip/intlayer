---
createdAt: 2025-02-07
updatedAt: 2025-09-20
title: Файл контента
description: Узнайте, как настраивать расширения для ваших файлов декларации контента. Следуйте этой документации, чтобы эффективно реализовывать условия в вашем проекте.
keywords:
  - Файл контента
  - Документация
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# Файл контента

<iframe title="i18n, Markdown, JSON… одно универсальное решение для управления всем этим | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Что такое файл контента?

Файл контента в Intlayer — это файл, содержащий определения словарей.  
Эти файлы объявляют текстовое содержимое вашего приложения, переводы и ресурсы.  
Файлы контента обрабатываются Intlayer для генерации словарей.

Словари будут конечным результатом, который ваше приложение импортирует с помощью хука `useIntlayer`.

### Ключевые понятия

#### Словарь

Словарь — это структурированная коллекция контента, организованная по ключам. Каждый словарь содержит:

- **Ключ**: уникальный идентификатор словаря
- **Контент**: фактические значения контента (текст, числа, объекты и т.д.)
- **Метаданные**: дополнительная информация, такая как заголовок, описание, теги и т.д.

#### Файл контента

Пример файла контента:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string; // строковый контент
      numberContent: number; // числовой контент
      booleanContent: boolean; // булевый контент
      javaScriptContent: string; // контент JavaScript
    };
  };
  multilingualContent: string; // мультиязычный контент
  quantityContent: string; // контент с количеством
  conditionalContent: string; // условный контент
  markdownContent: never; // markdown контент (никогда не используется)
  externalContent: string; // внешний контент
  insertionContent: string; // контент с вставкой
  nestedContent: string; // вложенный контент
  fileContent: string; // контент из файла
  jsxContent: ReactNode; // JSX контент
}

export default {
  key: "page", // ключ словаря
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      ru: "Русский контент",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Меньше чем минус одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
    conditionalContent: cond({
      true: "Валидация включена",
      false: "Валидация отключена",
    }),
    insertionContent: insert("Привет {{name}}!"),
    nestedContent: nest(
      "navbar", // Ключ словаря для вложения
      "login.button" // [Опционально] Путь к контенту для вложения
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Пример Markdown"),

    /*
     * Доступно только при использовании `react-intlayer` или `next-intlayer`
     */
    jsxContent: <h1>Мой заголовок</h1>,
  },
} satisfies Dictionary<Content>; // [необязательно] Dictionary является универсальным и позволяет усилить форматирование вашего словаря
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Меньше чем минус одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Некоторые машины",
      ">19": "Много машин",
    }),
    conditionalContent: cond({
      true: "Валидация включена",
      false: "Валидация отключена",
    }),
    insertionContent: insert("Привет, {{name}}!"),
    nestedContent: nest(
      "navbar", // Ключ словаря для вложения
      "login.button" // [Необязательно] Путь к содержимому для вложения
    ),
    markdownContent: md("# Пример Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Доступно только при использовании `react-intlayer` или `next-intlayer`
    jsxContent: <h1>Мой заголовок</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      ru: "Содержимое на русском",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Меньше чем минус одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
    conditionalContent: cond({
      true: "Валидация включена",
      false: "Валидация отключена",
    }),
    insertionContent: insert("Привет, {{name}}!"),
    nestedContent: nest(
      "navbar", // Ключ словаря для вложения
      "login.button" // [Необязательно] Путь к содержимому для вложения
    ),
    markdownContent: md("# Пример Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Доступно только при использовании `react-intlayer` или `next-intlayer`
    jsxContent: <h1>Мой заголовок</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Привет, мир",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Нет машин",
        "1": "Одна машина",
        "<-1": "Меньше чем минус одна машина",
        "-1": "Минус одна машина",
        ">5": "Некоторые машины",
        ">19": "Много машин",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Валидация включена",
        "false": "Валидация отключена",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Привет, {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Пример Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Мой заголовок"],
      },
    },
  },
}
```

#### Узлы содержимого

Узлы содержимого являются строительными блоками содержимого словаря. Они могут быть:

- **Примитивные значения**: строки, числа, булевы значения, null, undefined
- **Типизированные узлы**: специальные типы содержимого, такие как переводы, условия, markdown и т.д.
- **Функции**: динамическое содержимое, которое может быть вычислено во время выполнения [см. Получение функций](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md)
- **Вложенное содержимое**: ссылки на другие словари

#### Типы содержимого

Intlayer поддерживает различные типы содержимого через типизированные узлы:

- **Содержимое перевода**: Многоязычный текст с локализованными значениями [см. Содержимое перевода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation_content.md)
- **Условное содержимое**: Содержимое, зависящее от булевых выражений [см. Условное содержимое](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/condition_content.md)
- **Перечисляемое содержимое**: Содержимое, изменяющееся в зависимости от перечисляемых значений [см. Перечисляемое содержимое](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration_content.md)
- **Вставляемое содержимое**: Содержимое, которое можно вставлять в другое содержимое [см. Вставляемое содержимое](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion_content.md)
- **Содержимое Markdown**: Форматированный текст в формате Markdown [см. Содержимое Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown_content.md)
- **Вложенное содержимое**: Ссылки на другие словари [см. Вложенное содержимое](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/nested_content.md)
- **Содержимое по полу**: Содержимое, зависящее от пола [см. Содержимое по полу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender_content.md)
- **Содержимое файла**: Ссылки на внешние файлы [см. Содержимое файла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/file_content.md)

## Структура словаря

Словарь в Intlayer определяется типом `Dictionary` и содержит несколько свойств, которые управляют его поведением:

### Обязательные свойства

#### `key` (строка)

Идентификатор словаря. Если несколько словарей имеют одинаковый ключ, Intlayer автоматически объединит их.

> Используйте соглашение об именовании в стиле kebab-case (например, `"about-page-meta"`).

#### Content (строка | число | булево | объект | массив | функция)

Свойство `content` содержит фактические данные словаря и поддерживает:

- **Примитивные значения**: строки, числа, булевы значения, null, undefined
- **Типизированные узлы**: специальные типы содержимого с использованием вспомогательных функций Intlayer
- **Вложенные объекты**: сложные структуры данных
- **Массивы**: коллекции содержимого
- **Функции**: динамическая оценка содержимого

### Необязательные свойства

#### `title` (string)

Читаемое человеком название словаря, которое помогает идентифицировать его в редакторах и системах управления контентом (CMS). Это особенно полезно при работе с большим количеством словарей или при использовании интерфейсов управления контентом.

**Пример:**

```typescript
{
  key: "about-page-meta",
  title: "Метаданные страницы «О нас»",
  content: { /* ... */ }
}
```

#### `description` (string)

Подробное описание, объясняющее назначение словаря, рекомендации по использованию и любые особые замечания. Это описание также используется как контекст для генерации переводов с помощью ИИ, что важно для поддержания качества и согласованности переводов.

**Пример:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Этот словарь управляет метаданными страницы «О нас»",
    "Рассмотрите лучшие практики для SEO:",
    "- Заголовок должен содержать от 50 до 60 символов",
    "- Описание должно содержать от 150 до 160 символов",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Массив строк для категоризации и организации словарей. Теги предоставляют дополнительный контекст и могут использоваться для фильтрации, поиска или организации словарей в редакторах и системах управления контентом.

**Пример:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `locale` (LocalesValues)

Преобразует словарь в словарь для каждого локаля, где каждое поле, объявленное в содержимом, автоматически преобразуется в узел перевода. Когда это свойство установлено:

- Словарь рассматривается как словарь для одного языка (локали)
- Каждое поле становится узлом перевода для этой конкретной локали
- НЕ следует использовать узлы перевода (`t()`) в содержимом при использовании этого свойства
- Если свойство отсутствует, словарь будет рассматриваться как многоязычный

> См. [Объявление контента по локалям в Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) для получения дополнительной информации.

**Пример:**

```json
// Словарь для одной локали
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Это становится узлом перевода для 'en'
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

Инструкции по автоматическому заполнению содержимого словаря из внешних источников. Это можно настроить глобально в `intlayer.config.ts` или для каждого словаря отдельно. Поддерживаются несколько форматов:

- **`true`**: Включить авто-заполнение для всех локалей
- **`string`**: Путь к одному файлу или шаблон с переменными
- **`object`**: Пути к файлам для каждой локали

**Примеры:**

```json
// Включить для всех локалей
{
  "autoFill": true
}
// Один файл
{
  "autoFill": "./translations/aboutPage.content.json"
}
// Шаблон с переменными
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Точная настройка для каждой локали
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Доступные переменные:**

- `{{locale}}` – Код локали (например, `fr`, `es`)
- `{{fileName}}` – Имя файла (например, `example`)
- `{{key}}` – Ключ словаря (например, `example`)

> Подробнее смотрите в разделе [Конфигурация автозаполнения в Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md).

##### `priority` (число)

Указывает приоритет словаря для разрешения конфликтов. Когда несколько словарей содержат одинаковый ключ, словарь с наивысшим числовым приоритетом переопределит остальные. Это полезно для управления иерархией контента и переопределениями.

**Пример:**

```typescript
// Базовый словарь
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// Словарь-переопределение
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Добро пожаловать в наш премиум-сервис!" }
}
// Это переопределит базовый словарь
```

### Свойства CMS

##### `version` (строка)

Идентификатор версии для удалённых словарей. Помогает отслеживать, какая версия словаря в данный момент используется, особенно полезно при работе с удалёнными системами управления контентом.

##### `live` (булево)

Для удалённых словарей указывает, должен ли словарь загружаться в режиме реального времени во время выполнения. При включении:

- Требуется, чтобы `importMode` был установлен в "live" в `intlayer.config.ts`
- Требуется запущенный живой сервер
- Словарь будет загружаться во время выполнения с использованием API живой синхронизации
- Если включён live, но загрузка не удалась, используется динамическое значение
- Если live не включён, словарь преобразуется во время сборки для оптимальной производительности

### Системные свойства (Автоматически сгенерированные)

Эти свойства автоматически генерируются Intlayer и не должны изменяться вручную:

##### `$schema` (string)

JSON-схема, используемая для валидации структуры словаря. Автоматически добавляется Intlayer для обеспечения целостности словаря.

##### `id` (string)

Для удалённых словарей это уникальный идентификатор словаря на удалённом сервере. Используется для получения и управления удалённым контентом.

##### `localId` (LocalDictionaryId)

Уникальный идентификатор для локальных словарей. Автоматически генерируется Intlayer для помощи в идентификации словаря и определения, является ли он локальным или удалённым, а также его расположения.

##### `localIds` (LocalDictionaryId[])

Для объединённых словарей этот массив содержит идентификаторы всех словарей, которые были объединены вместе. Полезно для отслеживания источника объединённого содержимого.

##### `filePath` (string)

Путь к файлу локального словаря, указывающий, из какого файла `.content` был сгенерирован словарь. Помогает при отладке и отслеживании источника.

##### `availableVersions` (string[])

Для удалённых словарей этот массив содержит все доступные версии словаря. Помогает отслеживать, какие версии доступны для использования.

##### `autoFilled` (true)

Указывает, был ли словарь автоматически заполнен из внешних источников. В случае конфликтов базовые словари имеют приоритет над автоматически заполненными.

##### `location` ('distant' | 'locale')

Указывает расположение словаря:

- `'locale'`: Локальный словарь (из файлов контента)
- `'distant'`: Удалённый словарь (из внешнего источника)

## Типы узлов контента

Intlayer предоставляет несколько специализированных типов узлов контента, которые расширяют базовые примитивные значения:

### Переводимый контент (`t`)

Многоязычный контент, который варьируется в зависимости от локали:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Условный контент (`cond`)

Контент, который меняется в зависимости от булевых условий:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### Перечисляемый контент (`enu`)

Контент, который меняется в зависимости от перечисленных значений:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Ваш запрос находится в ожидании",
  approved: "Ваш запрос был одобрен",
  rejected: "Ваш запрос был отклонён",
});
```

### Вставляемый контент (`insert`)

Контент, который можно вставлять в другой контент:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Этот текст можно вставить куда угодно");
```

### Вложенный контент (`nest`)

Ссылки на другие словари:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Контент в формате Markdown (`md`)

Форматированный текст в формате Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Добро пожаловать\n\nЭто **жирный** текст с [ссылками](https://example.com)"
);
```

### Контент по половому признаку (`gender`)

Контент, который меняется в зависимости от пола:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Он разработчик",
  female: "Она разработчик",
  other: "Они разработчики",
});
```

### Контент из файла (`file`)

Ссылки на внешние файлы:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Создание файлов контента

### Основная структура файла контента

Файл контента экспортирует объект по умолчанию, который соответствует типу `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Содержание страницы приветствия",
  description:
    "Контент для главной страницы приветствия, включая секцию героя и функции",
  tags: ["страница", "приветствие", "главная"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          ru: "Простота использования",
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          ru: "Интуитивно понятный интерфейс для всех уровней навыков",
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### JSON Content File

You can also create content files in JSON format:

```json
{
  "key": "welcome-page",
  "title": "Содержание главной страницы приветствия",
  "description": "Содержимое главной страницы приветствия",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Добро пожаловать на нашу платформу",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Создавайте удивительные приложения с легкостью",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Файлы контента для каждого локаля

Для словарей, специфичных для локали, укажите свойство `locale`:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Добро пожаловать на нашу платформу",
      subtitle: "Создавайте удивительные приложения с легкостью",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Расширения файлов контента

Intlayer позволяет настраивать расширения для файлов деклараций контента. Эта настройка обеспечивает гибкость в управлении крупномасштабными проектами и помогает избежать конфликтов с другими модулями.

### Расширения по умолчанию

По умолчанию Intlayer отслеживает все файлы с следующими расширениями для деклараций контента:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Эти расширения по умолчанию подходят для большинства приложений. Однако, если у вас есть специфические требования, вы можете определить собственные расширения, чтобы оптимизировать процесс сборки и снизить риск конфликтов с другими компонентами.

> Чтобы настроить расширения файлов, которые Intlayer использует для определения файлов деклараций контента, вы можете указать их в конфигурационном файле Intlayer. Этот подход полезен для крупных проектов, где ограничение области наблюдения улучшает производительность сборки.

## Расширенные концепции

### Объединение словарей

Когда несколько словарей имеют одинаковый ключ, Intlayer автоматически объединяет их. Поведение при объединении зависит от нескольких факторов:

- **Приоритет**: словари с более высоким значением `priority` переопределяют словари с более низким значением
- **Автозаполнение против базового**: базовые словари имеют приоритет над автозаполненными словарями
- **Расположение**: локальные словари имеют приоритет над удалёнными словарями (при равенстве приоритетов)

### Типобезопасность

Intlayer предоставляет полную поддержку TypeScript для файлов контента:

```typescript
// Определите тип вашего контента
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Используйте его в вашем словаре
export default {
  key: "welcome-page",
  content: {
    // TypeScript обеспечит автозаполнение и проверку типов
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Вложенность узлов

Вы можете без проблем вкладывать функции друг в друга.

Пример:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` возвращает `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Композитный контент, вкладывающий условие, перечисление и многоязычный контент
    // `getIntlayer('page','en').advancedContent(true)(10)` возвращает 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe"; // асинхронная функция для получения имени

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` возвращает `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Композитный контент, включающий условие, перечисление и многоязычный контент
    // `getIntlayer('page','en').advancedContent(true)(10)` возвращает 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          ru: "Найдено несколько элементов",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        ru: "Нет доступных действительных данных",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` возвращает `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        ru: "Привет",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Композитный контент, включающий условие, перечисление и многоязычный контент
    // `getIntlayer('page','en').advancedContent(true)(10)` возвращает 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Привет", // Приветствие
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "ru": "Элементы не найдены",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "ru": "Найден один элемент",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "ru": "Найдено несколько элементов",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Лучшие практики

1. **Соглашения об именах**:
   - Используйте kebab-case для ключей словаря (`"about-page-meta"`)
   - Группируйте связанный контент под одним префиксом ключа

2. **Организация контента**:
   - Держите связанный контент вместе в одном словаре
   - Используйте вложенные объекты для организации сложных структур контента
   - Используйте теги для категоризации
   - Используйте `autoFill` для автоматического заполнения отсутствующих переводов

3. **Производительность**:
   - Настройте конфигурацию контента, чтобы ограничить область отслеживаемых файлов
   - Используйте живые словари только тогда, когда необходимы обновления в реальном времени (например, A/B тестирование и т.д.)
   - Убедитесь, что плагин трансформации сборки (`@intlayer/swc` или `@intlayer/babel`) включен для оптимизации словаря во время сборки

## История документации

| Версия | Дата       | Изменения                       |
| ------ | ---------- | ------------------------------- |
| 6.0.0  | 2025-09-20 | Добавлена документация по полям |
| 5.5.10 | 2025-06-29 | Инициализация истории           |
