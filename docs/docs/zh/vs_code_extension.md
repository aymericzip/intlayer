---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: 官方 VS Code 扩展
description: 学习如何在 VS Code 中使用 Intlayer 扩展来提升您的开发工作流程。快速在本地化内容之间导航并高效管理您的字典。
keywords:
  - VS Code 扩展
  - Intlayer
  - 本地化
  - 开发工具
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# 官方 VS Code 扩展

## 概述

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) 是 **Intlayer** 的官方 Visual Studio Code 扩展，旨在提升开发者在项目中处理本地化内容时的体验。

![Intlayer VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

扩展链接：[https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## 功能

### 即时导航

**支持“转到定义”** – 在 `useIntlayer` 键上使用 `⌘ + 点击`（Mac）或 `Ctrl + 点击`（Windows/Linux）即可立即打开对应的内容文件。  
**无缝集成** – 与 **react-intlayer** 和 **next-intlayer** 项目完美配合。  
**多语言支持** – 支持不同语言的本地化内容。  
**VS Code 集成** – 与 VS Code 的导航和命令面板无缝集成。

### 词典管理命令

直接在 VS Code 中管理您的内容词典：

- **构建词典** – 根据您的项目结构生成内容文件。
- **推送词典** – 将最新的词典内容上传到您的代码仓库。
- **拉取词典** – 从代码仓库同步最新的词典内容到本地环境。
- **填充词典** – 使用项目中的内容填充词典。
- **测试词典** – 识别缺失或不完整的翻译。

### 内容声明生成器

轻松生成不同格式的结构化词典文件：

如果您当前正在开发一个组件，它会为您生成 `.content.{ts,tsx,js,jsx,mjs,cjs,json}` 文件。

组件示例：

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

生成的 TypeScript 格式文件：

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

可用格式：

- **TypeScript (`.ts`)**
- **ES 模块 (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Intlayer 选项卡（活动栏）

通过点击 VS Code 活动栏中的 Intlayer 图标打开 Intlayer 选项卡。它包含两个视图：

- **搜索**：一个实时搜索栏，用于快速筛选字典及其内容。输入时结果会即时更新。
- **字典**：一个树状视图，显示您的环境/项目、字典键以及贡献条目的文件。您可以：
  - 点击文件以在编辑器中打开它。
  - 使用工具栏执行操作：构建、拉取、推送、填充、刷新、测试和创建字典文件。
  - 使用上下文菜单执行特定项目操作：
    - 在字典上：拉取或推送
    - 在文件上：填充字典
  - 当您切换编辑器时，如果文件属于某个字典，树状视图会自动展开显示该文件。

## 安装

您可以直接从 VS Code 市场安装 **Intlayer**：

1. 打开 **VS Code**。
2. 进入 **扩展市场**。
3. 搜索 **"Intlayer"**。
4. 点击 **安装**。

## 使用方法

### 快速导航

1. 打开一个使用 **react-intlayer** 的项目。
2. 找到对 `useIntlayer()` 的调用，例如：

   ```tsx
   const content = useIntlayer("app");
   ```

3. 在键（例如 `"app"`）上执行 **Command+点击**（macOS 上为 `⌘+点击`）或 **Ctrl+点击**（Windows/Linux 上）。
4. VS Code 会自动打开对应的字典文件，例如 `src/app.content.ts`。

### 管理内容字典

### Intlayer 侧边栏（活动栏）

使用侧边栏浏览和管理字典：

- 打开活动栏中的 Intlayer 图标。
- 在**搜索**中，输入内容以实时过滤词典和条目。
- 在**词典**中，浏览环境、词典和文件。使用工具栏进行构建、拉取、推送、填充、刷新、测试和创建词典文件。右键点击可进行上下文操作（对词典执行拉取/推送，对文件执行填充）。当前编辑器文件在适用时会自动在树视图中显示。

#### 构建词典

生成所有词典内容文件：

```sh
Cmd + Shift + P（macOS）/ Ctrl + Shift + P（Windows/Linux）
```

搜索**构建词典**并执行该命令。

#### 推送词典

上传最新的词典内容：

1. 打开**命令面板**。
2. 搜索**推送词典**。
3. 选择要推送的词典并确认。

#### 拉取词典

同步最新的词典内容：

1. 打开 **命令面板**。
2. 搜索 **拉取词典（Pull Dictionaries）**。
3. 选择要拉取的词典。

#### 填充词典

使用项目中的内容填充词典：

1. 打开 **命令面板**。
2. 搜索 **填充词典（Fill Dictionaries）**。
3. 运行命令以填充词典。

#### 测试词典

验证词典并查找缺失的翻译：

1. 打开 **命令面板**。
2. 搜索 **测试词典（Test Dictionaries）**。
3. 查看报告的问题并进行修复。

## 文档历史

| 版本   | 日期       | 变更           |
| ------ | ---------- | -------------- |
| 5.5.10 | 2025-06-29 | 初始化历史记录 |
