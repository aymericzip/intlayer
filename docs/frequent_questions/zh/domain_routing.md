---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 如何配置基于域名的路由？
description: 学习如何配置基于域名的路由。
keywords:
  - 域名
  - 路由
  - intlayer
  - 配置
  - 中间件
  - react-router
  - vue-router
  - next.js
  - vite
  - 框架
slugs:
  - frequent-questions
  - domain-routing
author: aymericzip
---

# 如何使用 Intlayer 配置基于**域名的路由**，而不是使用 `/[locale]/` 路径？

## 简短回答

基于域名的路由比基于路径的路由（`example.com/[locale]/`）更简单，因为你可以跳过所有中间件和路由配置。只需将你的应用部署到每个语言域名，并为每个域名设置一个环境变量。

## 逐步操作

1. **每个域名部署一次**（`example.com`、`exemple.fr`、`ejemplo.es` 等）。
2. 对于每次部署，设置 `LOCALE`（以及常用的 Intlayer 环境变量）为该域名应提供的语言环境。
3. 在你的 `intlayer.config.[ts|js]` 中将该变量作为 `defaultLocale` 引用。

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 域名决定语言环境
  },
  // ... 你的其他配置
};

export default config;
```

就是这么简单--对于 **Next.js**、**Vite + React**、**Vite + Vue** 等框架，效果相同。

## 如果所有域名都指向**同一个**部署怎么办？

如果所有域名都指向同一个应用包，您需要在运行时检测主机，并通过提供者手动传递语言环境。

### 对于 Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 解析语言环境，优先使用传入的 locale，否则调用自定义函数获取
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### 对于 Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // 使用自定义函数获取主机名对应的语言环境
app.mount("#app");
```

请将 `getLocaleFromHostname()` 替换为您自己的查找逻辑。

## 更新您的语言切换器

使用基于域名的路由时，切换语言意味着跳转到另一个域名：

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target]; // 跳转到目标语言对应的域名
}
```

## 基于域名路由的优势

1. **配置更简单**：无需配置 `intlayerProxy`、`generateStaticParams`、`react-router` 或 `vue-router`
2. **更好的SEO**：每种语言都有自己的域名
3. **更简洁的URL**：路径中没有语言前缀
4. **更易维护**：每种语言的部署相互独立
