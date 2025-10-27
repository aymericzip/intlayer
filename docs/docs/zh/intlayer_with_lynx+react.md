---
createdAt: 2025-03-09
updatedAt: 2025-06-29
title: 如何翻译您的Lynx and React mobile app应用 – i18n指南 2025
description: 了解如何使您的使用 Lynx 和 React 的移动应用实现多语言。请遵循文档进行国际化（i18n）和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
slugs:
  - doc
  - environment
  - lynx-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-lynx-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 使用Intlayer翻译您的Lynx and React mobile app | 国际化(i18n)

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-lynx-template)。

## 什么是 Intlayer？

**Intlayer** 是一个**创新的开源国际化 (i18n) 库**，简化了现代应用程序中的多语言支持。它适用于许多 JavaScript/TypeScript 环境，**包括 Lynx**（通过 `react-intlayer` 包）。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用组件级别的声明式字典。
- **确保 TypeScript 支持**，通过自动生成的类型。
- **动态本地化**内容，包括**UI 字符串**（在 Web 的 React 中，还可以本地化 HTML 元数据等）。
- **受益于高级功能**，如动态语言检测和切换。

---

## 第一步：安装依赖

在您的 Lynx 项目中，安装以下包：

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### 包说明

- **intlayer**  
  核心 i18n 工具包，用于配置、字典内容、类型生成和 CLI 命令。

- **react-intlayer**  
  React 集成，提供上下文提供者和 React hooks，您将在 Lynx 中使用它来获取和切换语言。

- **lynx-intlayer**  
  Lynx 集成，提供将 Intlayer 与 Lynx 打包器集成的插件。

---

## 第二步：创建 Intlayer 配置

在项目根目录（或任何方便的位置）创建一个 **Intlayer 配置** 文件。它可能如下所示：

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 添加您需要的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... 添加您需要的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

在此配置中，您可以：

- 配置您的**支持语言列表**。
- 设置一个**默认**语言。
- 以后，您可以添加更高级的选项（例如日志、自定义内容目录等）。
- 查看 [Intlayer 配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 了解更多。

## 第三步：将 Intlayer 插件添加到 Lynx 打包器

要在 Lynx 中使用 Intlayer，您需要将插件添加到 `lynx.config.ts` 文件中：

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... 其他插件
    pluginIntlayerLynx(),
  ],
});
```

## 第四步：添加 Intlayer 提供者

为了在您的应用程序中同步用户语言，您需要使用 `react-intlayer` 中的 `IntlayerProvider` 组件包装您的根组件。

此外，您需要添加 `intlayerPolyfill` 函数文件，以确保 Intlayer 能够正常工作。

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## 第五步：声明您的内容

在项目中的任何位置创建**内容声明**文件（通常在 `src/` 中），使用 Intlayer 支持的任何扩展格式：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- 等等。

示例：

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      zh: "点击标志并享受乐趣！",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        zh: "编辑",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        zh: "以查看更新！",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      zh: "在 Lynx 上",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      zh: "点击标志并享受乐趣！",
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        zh: "编辑",
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        zh: "以查看更新！",
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      zh: "在 Lynx 上",
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      zh: "点击标志并享受乐趣！",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
    }),
    hint: [
      t({
        en: "Edit",
        zh: "编辑",
        fr: "Modifier",
        es: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        zh: "以查看更新！",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "on Lynx",
        "zh": "在 Lynx 上",
        "fr": "sur Lynx",
        "es": "en Lynx"
      }
    },
"description": {
  "nodeType": "translation",
  "translation": {
    "zh": "点击标志并享受乐趣！",
    "en": "Tap the logo and have fun!",
    "fr": "Appuyez sur le logo et amusez-vous!",
    "es": "¡Toca el logo y diviértete!"
  }
},
"hint": [
  {
    "nodeType": "translation",
    "translation": {
      "zh": "编辑",
      "en": "Edit",
      "fr": "Modifier",
      "es": "Editar"
    }
  },
  " src/App.tsx ",
  {
    "nodeType": "translation",
    "translation": {
      "zh": "查看更新！",
      "en": "to see updates!",
      "fr": "pour voir les mises à jour!",
      "es": "para ver actualizaciones!"
    }
  }
]
}
```

> 有关内容声明的详细信息，请参阅 [Intlayer 的内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

---

## 第 4 步：在组件中使用 Intlayer

在子组件中使用 `useIntlayer` 钩子以获取本地化内容。

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");
  const onTap = useCallback(() => {
    // 仅更改背景
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> 当在基于字符串的属性中使用 `content.someKey`（例如按钮的 `title` 或 `Text` 组件的 `children`）时，**调用 `content.someKey.value`** 以获取实际字符串。

---

## （可选）第 5 步：更改应用程序语言环境

要从组件内部切换语言环境，可以使用 `useLocale` 钩子的 `setLocale` 方法：

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

这将触发使用 Intlayer 内容的所有组件的重新渲染，现在显示新语言环境的翻译。

> 有关更多详细信息，请参阅 [`useLocale` 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

## 配置 TypeScript（如果您使用 TypeScript）

Intlayer 在一个隐藏文件夹中生成类型定义（默认是 `.intlayer`），以改进自动补全并捕获翻译错误：

```json5
// tsconfig.json
{
  // ... 您现有的 TS 配置
  "include": [
    "src", // 您的源代码
    ".intlayer/types/**/*.ts", // <-- 确保包含自动生成的类型
    // ... 您已经包含的其他内容
  ],
}
```

这使得以下功能成为可能：

- **自动补全** 您的字典键。
- **类型检查** 如果您访问不存在的键或类型不匹配，将发出警告。

---

## Git 配置

为了避免提交由 Intlayer 自动生成的文件，请将以下内容添加到您的 `.gitignore` 中：

```plaintext
# 忽略由 Intlayer 生成的文件
.intlayer
```

---

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- **翻译键的自动补全**。
- **实时错误检测**，用于发现缺失的翻译。
- **内联预览**已翻译的内容。
- **快速操作**，轻松创建和更新翻译。
  有关如何使用该扩展的更多详细信息，请参阅[Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

## 深入了解

- **可视化编辑器**：使用[Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)以可视化方式管理翻译。
- **CMS 集成**：您还可以将字典内容外部化并从[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)中获取。
- **CLI 命令**：探索[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)以执行诸如**提取翻译**或**检查缺失键**等任务。

---
