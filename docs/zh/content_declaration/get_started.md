# 开始声明您的内容

## 文件扩展名

默认情况下，Intlayer 监视所有具有以下扩展名的文件，以进行内容声明：

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

应用程序默认将搜索与 `./src/**/*.content.{ts,tsx,js,mjs,cjs}` 通配符模式匹配的文件。

这些默认扩展名适用于大多数应用程序。但是，如果您有特定要求，请参考内容扩展名自定义指南以获取管理说明。

有关配置选项的完整列表，请访问配置文档。

## 声明您的内容

创建和管理您的内容字典：

### 使用 TypeScript

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
      "<-1": "少于一辆车",
      "-1": "少于一辆车",
      "0": "没有汽车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "许多辆车",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### 使用 ECMAScript 模块

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
      "<-1": "少于一辆车",
      "-1": "少于一辆车",
      0: "没有汽车",
      1: "一辆车",
      ">5": "几辆车",
      ">19": "许多辆车",
    }),
  },
};
```

### 使用 CommonJS 模块

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
      "<-1": "少于一辆车",
      "-1": "少于一辆车",
      0: "没有汽车",
      1: "一辆车",
      ">5": "几辆车",
      ">19": "许多辆车",
    }),
  },
};
```

### 使用 JSON

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
        "<-1": "少于一辆车",
        "-1": "少于一辆车",
        "0": "没有汽车",
        "1": "一辆车",
        ">5": "几辆车",
        ">19": "许多辆车",
      },
    },
  },
}
```

警告，JSON 内容声明使得实现 [函数获取](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/function_fetching.md) 不可能。
