# Начало работы с декларацией вашего контента

## Расширения файлов

По умолчанию Intlayer отслеживает все файлы с следующими расширениями для деклараций контента:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Приложение будет искать файлы, соответствующие шаблону `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` по умолчанию.

Эти стандартные расширения подходят для большинства приложений. Однако, если у вас есть специфические требования, обратитесь к [руководству по настройке расширений контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md#content-configuration) для инструкций по их управлению.

Для полного списка опций конфигурации посетите документацию по конфигурации.

## Объявление вашего контента

Создавайте и управляйте вашими словарями:

```tsx fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
    };
    multilingualContent: string;
    quantityContent: string;
    conditionalContent: string;
    nestedContent: string;
    markdownContent: string;
    externalContent: string;
  };
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Привет, мир",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      ru: "Русский контент",
    }),
    quantityContent: enu({
      "<-1": "Меньше минус одной машины",
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
    nestedContent: nest(
      "navbar", // Ключ словаря для вложения
      "login.button" // [Необязательно] Путь к контенту для вложения
    ),
    externalContent: async () => await fetch("https://example.com"),
    markdownContent: md("# Пример Markdown"),

    /*
     * Доступно только с использованием `react-intlayer` или `next-intlayer`
     */
    jsxContent: <h1>Мой заголовок</h1>,
  },
} satisfies Dictionary<Content>; // [необязательно] Dictionary является обобщением и позволяет усилить форматирование вашего словаря
```

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Привет, мир",
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
      ru: "Русский контент",
    }),
    quantityContent: enu({
      "<-1": "Меньше минус одной машины",
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
    nestedContent: nest(
      "navbar", // Ключ словаря для вложения
      "login.button" // [Необязательно] Путь к контенту для вложения
    ),
    markdownContent: md("# Пример Markdown"),
    externalContent: async () => await fetch("https://example.com"),

    // Доступно только с использованием `react-intlayer` или `next-intlayer`
    jsxContent: <h1>Мой заголовок</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Привет, мир",
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
      ru: "Русский контент",
    }),
    quantityContent: enu({
      "<-1": "Меньше минус одной машины",
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
    nestedContent: nest(
      "navbar", // Ключ словаря для вложения
      "login.button" // [Необязательно] Путь к контенту для вложения
    ),
    markdownContent: md("# Пример Markdown"),
    externalContent: async () => await fetch("https://example.com"),

    // Доступно только с использованием `react-intlayer` или `next-intlayer`
    jsxContent: <h1>Мой заголовок</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
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
        "ru": "Русский контент",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Нет машин",
        "1": "Одна машина",
        "<-1": "Меньше минус одной машины",
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
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Пример Markdown",
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

## Вложение функций

Вы можете без проблем вкладывать функции в другие.

Пример:

```javascript fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "Иван Иванов";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','ru').hiMessage` возвращает `['Привет', ' ', 'Иван Иванов']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        ru: "Привет",
      }),
      " ",
      getName(),
    ],
    // Составной контент, включающий условие, перечисление и многоязычный контент
    // `getIntlayer('page','ru').advancedContent(true)(10) возвращает 'Найдено несколько элементов'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          ru: "Элементы не найдены",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          ru: "Найден один элемент",
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
        ru: "Нет доступных данных",
      }),
    }),
  },
} satisfies Dictionary;
```
