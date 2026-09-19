---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: remix-intlayer 包文档
description: remix-intlayer 包的导出项文档，为 Remix 3 应用程序提供国际化 (i18n) 支持。
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer 导出的初始文档"
author: aymericzip
---

# remix-intlayer 包

`remix-intlayer` 包提供了将 Intlayer 集成到 Remix 3 应用程序中所需的工具。它包含用于请求语言环境检测的中间件、请求上下文访问以及用于检索字典和管理语言环境的钩子 (hooks)。

## 安装

```bash
npm install remix-intlayer
```

## 包导出项

### 中间件

| 导出项     | 类型       | 描述                                                                      | 相关文档                                                                                                                       |
| ---------- | ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `intlayer` | 中间件函数 | 用于 Remix 3 的中间件，用于检测请求语言环境、处理重定向并填充请求上下文。 | [intlayer 中间件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/intlayerMiddleware.md) |

### 上下文存储

| 导出项     | 类型                         | 描述                                                                                     | 相关文档                                                                                                             |
| ---------- | ---------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Intlayer` | RequestContext 键 / 存储标识 | 用于从 Remix 3 请求上下文 (`context.get(Intlayer)`) 中检索 Intlayer 状态的请求上下文键。 | [Intlayer 上下文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/Intlayer.md) |

### 钩子 (Hooks)

| 导出项          | 类型 | 描述                                                                           | 相关文档                                                                                                                     |
| --------------- | ---- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | 钩子 | 根据当前请求语言环境，按键获取并处理字典内容。                                 | [useIntlayer 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | 钩子 | 从导入的字典对象中获取与当前请求语言环境匹配的内容。                           | [useDictionary 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | 钩子 | 提供对当前请求语言环境、默认语言环境以及项目中所有可用语言环境列表的访问权限。 | [useLocale 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useLocale.md)         |

## 快速入门

### 在路由器中配置中间件

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### 在视图与组件中使用内容

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
