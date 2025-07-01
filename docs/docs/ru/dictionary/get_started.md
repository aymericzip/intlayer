---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Словарь | Начало работы
description: Узнайте, как объявлять и использовать словари на вашем многоязычном сайте. Следуйте шагам в этой онлайн-документации, чтобы настроить проект за несколько минут.
keywords:
  - Начало работы
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
---

# Начало работы с объявлением вашего контента

<iframe title="i18n, Markdown, JSON… одно решение для управления всем | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Расширения файлов

По умолчанию Intlayer отслеживает все файлы со следующими расширениями для объявлений контента:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Приложение будет искать файлы, соответствующие шаблону `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`, по умолчанию.

Эти расширения по умолчанию подходят для большинства приложений. Однако, если у вас есть специфические требования, обратитесь к [руководству по настройке расширений контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#content-configuration) для инструкций по их управлению.

Для полного списка параметров конфигурации посетите документацию по конфигурации.

## Объявление вашего контента

Создавайте и управляйте своими словарями:

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
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Привет, мир",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // текущая среда выполнения
      },
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
        javaScriptContent: `${process.env.NODE_ENV}`, // содержимое из переменной окружения NODE_ENV
      },
      imbricatedArray: [1, 2, 3], // вложенный массив
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
        stringContent: "Привет, мир",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // содержимое из переменной окружения NODE_ENV
      },
      imbricatedArray: [1, 2, 3],
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
        ">5": "Несколько машин",
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

## Вложенность функций

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
    // Составной контент, вкладывающий условие, перечисление и многоязычный контент
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

const getName = async () => "John Doe";

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
};

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
    // Составной контент, включающий условие, перечисление и многоязычный контент
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
            en: "Hi", // приветствие на английском
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe", // имя пользователя
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          nodeType: "enumeration",
          enumeration: {
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
            "ru": "Данные недоступны или недействительны",
          },
        },
      },
    },
  },
}
```

## Дополнительные ресурсы

Для получения дополнительной информации об Intlayer обратитесь к следующим ресурсам:

- [Документация по объявлению контента для каждого языка](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/per_locale_file.md)
- [Документация по переводу контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md)
- [Документация по перечислениям](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md)
- [Документация по содержимому условий](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/condition.md)
- [Документация по содержимому вставок](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md)
- [Документация по содержимому файлов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/file.md)
- [Документация по вложенному содержимому](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/nesting.md)
- [Документация по содержимому Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md)
- [Документация по содержимому с функцией получения](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md)

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
