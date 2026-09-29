---
createdAt: 2026-09-28
updatedAt: 2026-09-28
priority: 4
title: "可以在没有全局 provider 的情况下使用 Intlayer 吗？"
description: "在不挂载 provider 的情况下读取 Intlayer 内容，语言环境如何在服务器和浏览器中解析，以及与 provider 的性能差异。"
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - 语言环境
  - 性能
  - 水合
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# 可以在没有全局 provider 的情况下使用 Intlayer 吗？

可以。`getIntlayer` 和 `getDictionary` 是不需要任何 provider 的普通函数，`useIntlayer` 在 provider 之外也能工作。

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // 未传入语言环境
```

## 使用哪个语言环境？

显式传入的语言环境始终优先。否则，语言环境按以下顺序解析：

1. **当前请求的语言环境**：在服务器上，由 Intlayer 集成处理该请求时。包括 `express-intlayer`、`fastify-intlayer`、`hono-intlayer`、`adonis-intlayer`、`elysia-intlayer`、`remix-intlayer` 和 `astro-intlayer` 的 middleware，或 React Server Components 中的 `IntlayerProvider`。
2. **浏览器中保存的语言环境**（cookie、`localStorage`、`sessionStorage`），即你的语言切换器保存的语言环境。
3. 配置中的 **`defaultLocale`**。

每个请求都根据自己的 cookies 和 headers 解析，并保存在该请求专属的作用域中。语言环境不同的并发用户之间绝不会共享语言环境。

同样的解析也适用于 `getDictionary`、被[构建优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)重写的调用，以及在 provider 之外渲染的 `useIntlayer` 和 `useDictionaryDynamic`。

- [构建优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)

### Next.js Server Components

在 Next.js 中，请求的语言环境只能通过 `headers()` 和 `cookies()` 异步读取。请使用 [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayerAsync.md)，它会像 `next-intlayer/server` 的 `getLocale()` 一样等待该语言环境：

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // 请求的语言环境

  return { title };
};
```

读取 headers 会让路由切换为动态渲染。当 `IntlayerProvider` 已经提供语言环境时，不会读取 headers，路由保持静态。

## 性能：使用或不使用 provider

内容相同。区别在于响应性和渲染成本。

|                | 使用 provider                    | 不使用 provider                                                                                     |
| -------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| 切换语言环境   | 组件在原地重新渲染，无需刷新     | 不会重新渲染任何内容；新的语言环境在下一次调用时生效（导航、刷新）                                  |
| 一次读取的成本 | context 查找和语言环境订阅       | 一次记忆化的函数调用，相同的 `key + locale` 返回同一个对象                                          |
| 一次切换的成本 | 所有 consumer 重新渲染           | 无                                                                                                  |
| 服务端渲染     | 服务器和浏览器渲染相同的语言环境 | 在请求集成之外，服务器渲染 `defaultLocale`，浏览器渲染已保存的语言环境：可能出现 hydration mismatch |
| Bundle         | provider 代码                    | 读取已保存的语言环境约 100 字节（gzip），缓存到下一次切换                                           |

对于需要原地切换语言环境或在服务器上渲染的交互式应用，请保留 provider。对于后端、脚本、语言环境来自 URL 的静态页面（请显式传入），或只读取一次内容的代码，可以不使用 provider。

更多详情请参阅 [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md)。

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md)
