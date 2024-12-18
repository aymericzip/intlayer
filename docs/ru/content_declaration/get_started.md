# Начало работы с декларацией вашего контента

## Расширения файлов

По умолчанию, Intlayer следит за всеми файлами с следующими расширениями для деклараций контента:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Приложение будет искать файлы, соответствующие шаблону `./src/**/*.content.{ts,tsx,js,mjs,cjs}` по умолчанию.

Эти расширения по умолчанию подходят для большинства приложений. Однако, если у вас есть конкретные требования, обратитесь к руководству по настройке расширений контента для получения инструкций по их управлению.

Для полного списка параметров конфигурации посетите документацию по конфигурации.

## Декларируйте ваш контент

Создайте и управляйте своими словарями контента:

### Используя TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

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
      "<-1": "Меньше чем одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Используя ECMAScript модули

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
      "<-1": "Меньше чем одна машина",
      "-1": "Минус одна машина",
      0: "Нет машин",
      1: "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
};
```

### Используя CommonJS модули

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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
      "<-1": "Меньше чем одна машина",
      "-1": "Минус одна машина",
      0: "Нет машин",
      1: "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
};
```

### Используя JSON

```json5
// src/app/[locale]/page.content.json

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
        "<-1": "Меньше чем одна машина",
        "-1": "Минус одна машина",
        "0": "Нет машин",
        "1": "Одна машина",
        ">5": "Несколько машин",
        ">19": "Много машин",
      },
    },
  },
}
```

Предупреждение, декларация контента JSON делает невозможным внедрение [функции получения](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/function_fetching.md)
