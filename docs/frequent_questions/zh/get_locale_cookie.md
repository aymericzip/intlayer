---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 如何从 Cookie / 头信息中获取语言环境？
description: 学习如何从 Cookie / 头信息中获取语言环境。
keywords:
  - cookie
  - headers
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - doc
  - faq
  - get-locale-cookie
---

# 如何从 Cookie / 头信息中获取语言环境

## 使用 Hooks（推荐）

对于大多数使用场景，推荐使用 `useLocale` hook 来获取当前语言环境，因为它是自动解析的。这与 Vue.js 中的 `useLocale` 组合式函数类似。

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// or import { useLocale } from "vue-intlayer";

// 客户端使用
const { locale } = useLocale();
```

对于服务器组件，你可以从以下位置导入：

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

还有一个 `useLocaleCookie` hook，仅解析 cookie 的值。

## 手动配置 Cookie

你可以声明自定义的 cookie 名称，如下：

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // 默认是 'intlayer-locale'
  },
};

export default config;
```

然后你可以这样获取它

### 客户端

```ts
// 使用默认的 cookie 名称
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// 使用自定义的 cookie 名称
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### 服务器端（Next.js）

```ts
import { cookies } from "next/headers";

// 使用默认的 cookie 名称
const locale = cookies().get("intlayer-locale")?.value;

// 使用自定义的 cookie 名称
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### 如果 locale 尚未设置

locale 只有在用户明确选择了语言后，才会被设置为 cookie。默认情况下，对于新访客，locale 是从请求头字段中解析的。

您可以从请求头中检测用户偏好的语言环境。以下是如何处理的示例：

```ts
/**
 * 从请求头中检测语言环境
 *
 * accept-language 头是语言环境检测中最重要的。
 * 它包含一个带有质量值（q 值）的语言代码列表，表示用户偏好的语言顺序。
 *
 * 示例: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US 是首选语言（隐含 q=1.0）
 * - en 是第二选择（q=0.9）
 * - fr 是第三选择（q=0.8）
 * - es 是第四选择（q=0.7）
 */
import { localeDetector } from "@intlayer/core";

/**
 * 浏览器通常发送的协商者请求头示例
 * 这些请求头有助于确定用户偏好的语言
 */
ts;
/**
 * 从请求头中检测用户的首选语言环境
 *
 * accept-language 头是语言环境检测中最重要的头。
 * 它包含带有质量值（q值）的语言代码列表，
 * 指示用户按偏好顺序排列的首选语言。
 *
 * 示例: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US 是首选语言（隐含 q=1.0）
 * - en 是第二选择（q=0.9）
 * - fr 是第三选择（q=0.8）
 * - es 是第四选择（q=0.7）
 */
import { localeDetector } from "@intlayer/core";

/**
 * 浏览器通常发送的协商头示例
 * 这些头有助于确定用户的首选语言
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// 使用示例：
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
