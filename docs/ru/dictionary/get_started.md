# Начало работы с декларацией вашего контента

## Расширения файлов

По умолчанию Intlayer отслеживает все файлы с следующими расширениями для деклараций контента:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Приложение по умолчанию будет искать файлы, соответствующие шаблону `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}`.

Эти стандартные расширения подходят для большинства приложений. Однако, если у вас есть специфические требования, ознакомьтесь с [руководством по настройке расширений контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md#content-configuration) для инструкций по их управлению.

Для полного списка параметров конфигурации посетите документацию по конфигурации.

## Объявите ваш контент

Создайте и управляйте своими словарями контента:

```typescript fileName="src/app/[locale]/page.content.ts" codeFormat="typescript"
import { t, enu, type Dictionary } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Менее чем одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Некоторые машины",
      ">19": "Много машин",
    }),
  },
} satisfies Dictionary<Content>;
```

```javascript fileName="src/app/[locale]/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Менее чем одна машина",
      "-1": "Минус одна машина",
      0: "Нет машин",
      1: "Одна машина",
      ">5": "Некоторые машины",
      ">19": "Много машин",
    }),
  },
};
```

```javascript fileName="src/app/[locale]/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Менее чем одна машина",
      "-1": "Минус одна машина",
      0: "Нет машин",
      1: "Одна машина",
      ">5": "Некоторые машины",
      ">19": "Много машин",
    }),
  },
};
```

```json5 fileName="src/app/[locale]/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Менее чем одна машина",
        "-1": "Минус одна машина",
        "0": "Нет машин",
        "1": "Одна машина",
        ">5": "Некоторые машины",
        ">19": "Много машин",
      },
    },
  },
}
```
