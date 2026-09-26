---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useIntlayer 钩子文档 | remix-intlayer
description: 了解如何在 Remix 3 应用程序中使用 useIntlayer 钩子按键访问本地化内容。
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer 钩子初始文档"
author: aymericzip
---

# useIntlayer 钩子文档

`useIntlayer` 钩子允许在 Remix 3 应用程序中按键从 Intlayer 字典检索本地化内容。

它会自动从当前请求上下文（通过 `AsyncLocalStorage`）读取活动语言环境，因此无需通过路由处理程序、视图模板或组件传递语言环境。

## 使用方法

### 在路由处理程序中

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### 在视图模板和组件中

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## 参数

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: 字典的唯一键（在 `.content.ts` 声明文件中定义）。
2. **`localeOrSelector`**（可选）: 特定语言环境或选择器对象（`{ item }`、`{ variant }`，可包含 `locale`）。提供时，它会覆盖从请求上下文中检测到的语言环境。

## 说明

该钩子执行以下任务：

1. **上下文语言环境检测**: 从 `intlayer()` 中间件建立的与请求绑定的 `AsyncLocalStorage` 作用域中检测当前语言环境。
2. **字典获取**: 检索与提供的键对应的预编译字典。
3. **翻译处理**: 针对解析出的语言环境处理翻译、枚举、Markdown 和条件内容。
4. **回退处理 (Fallback)**: 如果在活动 HTTP 请求上下文之外调用（例如后台任务或没有中间件的单元测试），它会安全回退到配置的 `defaultLocale`。

## 相关文档

- [`intlayer` 中间件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/intlayerMiddleware.md)
- [`useDictionary` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useDictionary.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useLocale.md)
