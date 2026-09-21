---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useLocale 钩子文档 | remix-intlayer
description: 了解如何在 Remix 3 应用程序中使用 useLocale 钩子获取当前请求语言环境、默认语言环境和可用语言环境。
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useLocale 钩子初始文档"
author: aymericzip
---

# useLocale 钩子文档

`remix-intlayer` 中的 `useLocale` 钩子提供对当前正在处理的 HTTP 请求的语言环境，以及项目中配置的默认语言环境和可用语言环境的访问。

## 使用方法

在 Remix 组件中（例如语言切换器）：

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

在路由处理程序中：

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## 返回值

该钩子返回一个 `UseLocaleResult` 类型的对象：

| 属性               | 类型                | 描述                                                     |
| ------------------ | ------------------- | -------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | 为当前请求解析出的语言环境。                             |
| `defaultLocale`    | `DeclaredLocales`   | 在 `intlayer.config.ts` 中配置的默认回退语言环境。       |
| `availableLocales` | `DeclaredLocales[]` | 在 `intlayer.config.ts` 中配置的所有可用语言环境的数组。 |

## 说明

1. **请求作用域解析**: 在由 `intlayer()` 中间件处理的活动请求中，`useLocale` 从请求存储中读取解析出的语言环境。
2. **平滑回退 (Fallback)**: 如果在请求上下文之外调用（例如在初始化脚本或测试套件中），它将默认返回配置的 `defaultLocale`。

## 相关文档

- [`intlayer` 中间件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useIntlayer.md)
- [`useDictionary` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useDictionary.md)
