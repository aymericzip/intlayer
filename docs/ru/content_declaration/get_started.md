# Начало работы с вами контентом

## Настройка Intlayer для вашего проекта

[Смотрите, как использовать intlayer с NextJS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)

[Смотрите, как использовать intlayer с ReactJS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)

[Смотрите, как использовать intlayer с Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md)

## Установка пакета

Установите необходимые пакеты с помощью npm:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## Управление вашим контентом

Создайте и управляйте своими контентными словарями:

### Использование TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Начните с редактирования",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "Меньше чем один автомобиль",
        "-1": "Минус один автомобиль",
        "0": "Нет автомобилей",
        "1": "Один автомобиль",
        ">5": "Некоторые автомобили",
        ">19": "Много автомобилей",
      }),
    },
  },
} satisfies DeclarationContent;

// Контент должен экспортироваться как default
export default pageContent;
```

### Использование модулей ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Начните с редактирования",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Меньше чем один автомобиль",
      "-1": "Минус один автомобиль",
      0: "Нет автомобилей",
      1: "Один автомобиль",
      ">5": "Некоторые автомобили",
      ">19": "Много автомобилей",
    }),
  },
};

// Контент должен экспортироваться как default
export default pageContent;
```

### Использование модулей CommonJS

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Начните с редактирования",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "Меньше чем один автомобиль",
      "-1": "Минус один автомобиль",
      0: "Нет автомобилей",
      1: "Один автомобиль",
      ">5": "Некоторые автомобили",
      ">19": "Много автомобилей",
    }),
  },
};

// Контент должен экспортироваться как default
module.exports = pageContent;
```

### Использование JSON

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "Начните с редактирования",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "Меньше чем один автомобиль",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Некоторые автомобили",
      ">19": "Много автомобилей",
    },
  },
}
```

Предупреждение, декларация JSON контента делает невозможным реализацию [функции получения](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/function_fetching.md)
