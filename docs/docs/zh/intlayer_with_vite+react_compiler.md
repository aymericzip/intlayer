---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite + React i18n - 将现有应用转换为多语言应用2026
description: 了解如何使用 Intlayer 编译器使现有的 Vite 和 React 应用程序支持多语言。按照文档进行国际化 (i18n) 并使用 AI 进行翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - React
  - 编译器
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: 首次发布
---

# 如何将现有的 Vite 和 React 应用程序转换为多语言 (i18n) 应用（2026年 i18n 指南）

<Tabs defaultTab="video">
  <Tab label="视频" value="video">
  
<iframe title="Vite 和 React 的最佳 i18n 解决方案？探索 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

查看 GitHub 上的 [应用程序模板](https://github.com/aymericzip/intlayer-vite-react-template)。

## 目录

<TOC/>

## 为什么国际化现有应用程序很困难？

如果您曾经尝试为仅针对一种语言构建的应用添加多种语言，您就会明白那种痛苦。这不仅仅是“困难”，而是繁琐。您必须梳理每一个文件，搜寻每一个文本字符串，并将它们移动到单独的字典文件中。

然后是风险部分：用代码钩子替换所有这些文本，而不破坏您的布局或逻辑。这种工作会使新功能的开发停滞数周，感觉像是无休止的重构。

## 什么是 Intlayer 编译器？

**Intlayer 编译器** 旨在跳过那些手动的琐事。编译器为您完成字符串提取，而不是由您手动提取。它扫描您的代码，找到文本，并使用 AI 在幕后生成字典。
然后，它在构建期间修改您的代码以注入必要的 i18n 钩子。基本上，您继续像编写单语言应用一样编写应用，编译器会自动处理多语言转换。

> 编译器文档：[https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)

### 局限性

由于编译器在 **编译时** 执行代码分析 and 转换（插入钩子并生成字典），它可能会 **减慢应用程序的构建过程**。

为了减轻开发期间的影响，您可以将编译器配置为以 [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 模式运行，或在不需要时将其禁用。

---

## 在 Vite 和 React 应用程序中设置 Intlayer 的分步指南

### 第 1 步：安装依赖项

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **react-intlayer**
  将 Intlayer 与 React 应用程序集成的包。它为 React 国际化提供上下文提供者和钩子。

- **vite-intlayer**
  包括用于将 Intlayer 与 [Vite 构建器](https://vite.dev/guide/why.html#why-bundle-for-production)集成的 Vite 插件，以及用于检测用户首选语言、管理 cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置您的项目

创建一个配置文件来配置应用程序的语言：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * 指示是否启用编译器。
     */
    enabled: true,

    /**
     * 优化后字典的输出目录。
     */
    outputDir: "compiler",

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "", // 移除基础前缀

    /**
     * 指示转换后是否应保存组件。
     * 这样，编译器只需运行一次即可转换应用程序，然后即可将其移除。
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "这个应用是一个地图应用", // 注意：您可以自定义此应用描述
  },
};

export default config;
```

> **注意**：请确保在环境变量中设置了 `OPEN_AI_API_KEY`。

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：在 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保内容声明文件的构建并在开发模式下监控它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它提供别名以优化性能。

> `intlayerCompiler()` Vite 插件用于从组件中提取内容并编写 `.content` 文件。

### 第 4 步：编译您的代码

只需使用您的默认语言在组件中编写硬编码字符串。编译器会处理剩下的工作。

您的页面可能如下所示：

<Tabs>
 <Tab value="代码">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="输出">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      zh: {
        viteLogo: "Vite 图标",
        reactLogo: "React 图标",
        title: "Vite + React",
        countButton: "当前计数为",
        editMessage: "编辑",
        hmrMessage: "并保存以测试 HMR",
        readTheDocs: "点击 Vite 和 React 图标了解更多信息",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** 用于向嵌套组件提供语言环境。

### （可选）第 6 步：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.CHINESE)}>将语言更改为中文</button>
  );
};
```

> 要了解有关 `useLocale` 钩子的更多信息，请参阅 [文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

### (可选) 第 7 步：填充缺失的翻译

Intlayer 提供了一个 CLI 工具来帮助您填充缺失的翻译。您可以使用 `intlayer` 命令来测试并填充代码中缺失的翻译。

```bash
npx intlayer test         # 测试是否存在缺失的翻译
```

```bash
npx intlayer fill         # 填充缺失的翻译
```

> 有关更多详细信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/ci.md)

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的 **自动补全**。
- 缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### 深入了解

要进一步深入，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外置您的内容。
