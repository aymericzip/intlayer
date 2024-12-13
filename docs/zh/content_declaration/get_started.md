# 开始内容声明

## 为您的项目配置 Intlayer

[查看如何在 NextJS 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)

[查看如何在 ReactJS 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)

[查看如何在 Vite 和 React 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)

## 安装包

使用 npm 安装必要的包：

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## 管理您的内容

创建和管理您的内容字典：

### 使用 TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
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
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "少于一辆车",
        "-1": "减去一辆车",
        "0": "没有车",
        "1": "一辆车",
        ">5": "一些车",
        ">19": "许多车",
      }),
    },
  },
} satisfies DeclarationContent;

// 内容应作为默认导出
export default pageContent;
```

### 使用 ECMAScript 模块

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "少于一辆车",
      "-1": "减去一辆车",
      0: "没有车",
      1: "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
  },
};

// 内容应作为默认导出
export default pageContent;
```

### 使用 CommonJS 模块

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "少于一辆车",
      "-1": "减去一辆车",
      0: "没有车",
      1: "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
  },
};

// 内容应作为默认导出
module.exports = pageContent;
```

### 使用 JSON

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "少于一辆车",
      "-1": "减去一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    },
  },
}
```

警告，JSON 内容声明使得实现 [功能获取](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/function_fetching.md) 成为不可能。
