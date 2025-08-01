---
createdAt: 2025-03-17
updatedAt: 2025-06-29
title: 官方 VS Code 扩展
description: 了解如何在 VS Code 中使用 Intlayer 扩展以提升您的开发工作流程。快速在本地化内容之间导航并高效管理您的词典。
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

**支持跳转到定义** – 在 `useIntlayer` 键上使用 `Cmd+点击`（Mac）或 `Ctrl+点击`（Windows/Linux）即可立即打开对应的内容文件。  
**无缝集成** – 与 **react-intlayer** 和 **next-intlayer** 项目无缝协作。  
**多语言支持** – 支持多种语言的本地化内容。  
**VS Code 集成** – 与 VS Code 的导航和命令面板完美结合。

### 词典管理命令

直接从 VS Code 管理您的内容词典：

- **构建词典** (`extension.buildDictionaries`) – 根据您的项目结构生成内容文件。
- **推送词典** (`extension.pushDictionaries`) – 将最新的词典内容上传到您的代码仓库。
- **拉取词典** (`extension.pullDictionaries`) – 从代码仓库同步最新的词典内容到本地环境。

### 内容声明生成器

轻松生成不同格式的结构化字典文件：

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES 模块 (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## 安装

您可以直接从 VS Code 市场安装 **Intlayer**：

1. 打开 **VS Code**。
2. 进入 **扩展市场**。
3. 搜索 **"Intlayer"**。
4. 点击 **安装**。

或者，您也可以通过命令行安装：

```sh
code --install-extension intlayer
```

## 使用

### 快速导航

1. 打开一个使用 **react-intlayer** 的项目。
2. 找到调用 `useIntlayer()` 的位置，例如：

   ```tsx
   const content = useIntlayer("app");
   ```

3. 在键（例如 `"app"`）上执行 **命令点击**（macOS 上为 `⌘+点击`）或 **Ctrl+点击**（Windows/Linux 上）。
4. VS Code 会自动打开对应的字典文件，例如 `src/app.content.ts`。

### 管理内容字典

#### 构建字典

生成所有字典内容文件：

```sh
Cmd + Shift + P（macOS）/ Ctrl + Shift + P（Windows/Linux）
```

搜索 **构建字典（Build Dictionaries）** 并执行该命令。

#### 推送字典

上传最新的字典内容：

1. 打开 **命令面板**。
2. 搜索 **推送字典（Push Dictionaries）**。
3. 选择要推送的字典并确认。

#### 拉取字典

同步最新的字典内容：

1. 打开 **命令面板**。
2. 搜索 **拉取字典（Pull Dictionaries）**。
3. 选择要拉取的字典。

## 开发与贡献

想要贡献代码？我们欢迎社区的贡献！

仓库地址：https://github.com/aymericzip/intlayer-vs-code-extension

### 快速开始

克隆仓库并安装依赖：

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> 使用 `npm` 包管理器以兼容用于构建和发布扩展的 `vsce` 包。

### 开发模式运行

1. 在 **VS Code** 中打开项目。
2. 按 `F5` 启动一个新的 **扩展开发主机** 窗口。

### 提交拉取请求

如果你改进了扩展，请在 [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension) 上提交 PR。

## 反馈与问题

发现了错误或有功能请求？请在我们的**GitHub仓库**中提交问题：

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## 许可证

Intlayer采用**MIT许可证**发布。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
