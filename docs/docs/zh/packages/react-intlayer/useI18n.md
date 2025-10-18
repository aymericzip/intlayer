---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useI18n Hook 文档 | react-intlayer
description: 学习如何在 react-intlayer 包中使用 useI18n Hook
keywords:
  - useI18n
  - i18n
  - 翻译
  - 词典
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
history:
  - version: 6.0.0
    date: 2025-06-29
    changes: `useI18n` 钩子文档的初始编写
---

# React 集成：`useI18n` Hook 文档

本节详细介绍如何在 React 应用中使用 `useI18n` Hook，实现高效的内容本地化。

## 在 React 中导入 `useI18n`

可以根据不同的上下文，将 `useI18n` Hook 导入并集成到 React 应用中，具体如下：

- **客户端组件：**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // 在客户端 React 组件中使用
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // 在客户端 React 组件中使用
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // 在客户端 React 组件中使用
  ```

- **服务器组件：**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // 在服务器端 React 组件中使用
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // 在服务器端 React 组件中使用
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // 在服务器端 React 组件中使用
  ```

## 参数

此钩子接受两个参数：

1. **`namespace`**：用于限定翻译键的字典命名空间。
2. **`locale`**（可选）：期望使用的语言环境。如果未指定，则默认使用上下文的语言环境。

## 字典

所有字典键必须在内容声明文件中声明，以增强类型安全并防止错误。[配置说明请参见此处](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

## React 中的使用示例

以下是在 React 组件中使用 `useI18n` 钩子的示例：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 显示标题 */}
      <p>{t("description")}</p> {/* 显示描述 */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 显示标题 */}
      <p>{t("description")}</p> {/* 显示描述 */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 显示标题 */}
      <p>{t("description")}</p> {/* 显示描述 */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 显示标题 */}
      <p>{t("description")}</p> {/* 显示描述 */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 显示标题 */}
      <p>{t("description")}</p> {/* 显示描述 */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## 属性处理

在本地化属性时，请适当地访问翻译值：

```jsx
<!-- 对于无障碍属性（例如 aria-label），请使用 .value，因为需要纯字符串 -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## 额外资源

- **Intlayer 可视化编辑器**：为了获得更直观的内容管理体验，请参阅可视化编辑器文档 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

本节特别涵盖了在 React 应用中集成 `useI18n` 钩子，简化本地化流程并确保不同语言环境下内容的一致性。
