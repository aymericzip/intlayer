---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: 官方 VS Code 扩展
description: 学习如何在 VS Code 中使用 Intlayer 扩展以提升您的开发工作流程。快速在本地化内容之间导航并高效管理您的词典。
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

扩展链接: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## 功能

![填充词典](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **即时导航** – 点击 `useIntlayer` 键时，快速跳转到正确的内容文件。
- **填充词典** – 使用项目中的内容填充词典。

![列出命令](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **轻松访问 Intlayer 命令** – 轻松构建、推送、拉取、填充和测试内容词典。

![创建内容文件](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **内容声明生成器** – 以多种格式创建词典内容文件（`.ts`、`.esm`、`.cjs`、`.json`）。

![测试词典](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **测试词典** – 测试词典中缺失的翻译。

![重建词典](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **保持词典最新** – 使您的词典内容保持与项目最新内容同步。

![Intlayer 侧边栏标签 (活动栏)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Intlayer 侧边栏标签 (活动栏)** – 通过专用侧边标签浏览和搜索词典，带有工具栏和上下文操作（构建、拉取、推送、填充、刷新、测试、创建文件）。

## 使用方法

### 快速导航

1. 打开一个使用 **react-intlayer** 的项目。
2. 找到对 `useIntlayer()` 的调用，例如：

   ```tsx
   const content = useIntlayer("app");
   ```

3. **命令点击**（macOS 上为 `⌘+点击`，Windows/Linux 上为 **Ctrl+点击**）键（例如 `"app"`）。
4. VS Code 会自动打开对应的字典文件，例如 `src/app.content.ts`。

### Intlayer 侧边栏（活动栏）

使用侧边栏浏览和管理字典：

- 打开活动栏中的 Intlayer 图标。
- 在 **搜索** 中输入内容，实时过滤字典和条目。
- 在 **字典** 中浏览环境、字典和文件。使用工具栏进行构建（Build）、拉取（Pull）、推送（Push）、填充（Fill）、刷新（Refresh）、测试（Test）和创建字典文件。右键点击可进行上下文操作（字典上的拉取/推送，文件上的填充）。当前编辑器文件在适用时会自动在树中高亮显示。

### 访问命令

你可以通过 **命令面板** 访问这些命令。

```sh
Cmd + Shift + P（macOS）/ Ctrl + Shift + P（Windows/Linux）
```

- **构建字典**
- **推送字典**
- **拉取字典**
- **填充字典**
- **测试字典**
- **创建字典文件**

### 加载环境变量

Intlayer 建议将您的 AI API 密钥，以及 Intlayer 客户端 ID 和密钥存储在环境变量中。

该扩展可以从您的工作区加载环境变量，以便在正确的上下文中运行 Intlayer 命令。

- **加载顺序（优先级）**：`.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **非破坏性**：不会覆盖已有的 `process.env` 值。
- **作用域**：文件从配置的基础目录解析（默认为工作区根目录）。

#### 选择活动环境

- **命令面板**：打开命令面板并运行 `Intlayer: Select Environment`，然后选择环境（例如，`development`、`staging`、`production`）。扩展将尝试加载上述优先级列表中第一个可用的文件，并显示类似“已从 .env.<env>.local 加载环境”的通知。
- **设置**：进入 `设置 → 扩展 → Intlayer`，并设置：
  - **环境**：用于解析 `.env.<env>*` 文件的环境名称。
  - （可选）**环境文件**：显式指定一个 `.env` 文件路径。提供后，该路径优先于推断的列表。

#### Monorepos 和自定义目录

- **命令面板**：打开命令面板并运行 `Intlayer: Select Environment`，然后选择环境（例如，`development`、`staging`、`production`）。扩展将尝试加载上述优先列表中的第一个可用文件，并显示类似“已从 .env.<env>.local 加载环境”的通知。
- **设置**：进入 `设置 → 扩展 → Intlayer`，并设置：
  - **环境**：用于解析 `.env.<env>*` 文件的环境名称。
  - （可选）**Env 文件**：显式指定一个 `.env` 文件路径。提供后，该路径优先于推断的列表。

#### 多包仓库和自定义目录

如果你的 `.env` 文件位于工作区根目录之外，请在 `设置 → 扩展 → Intlayer` 中设置 **基础目录**。加载器将相对于该目录查找 `.env` 文件。

## 文档历史

| 版本   | 日期       | 变更内容                         |
| ------ | ---------- | -------------------------------- |
| 6.1.5  | 2025-09-30 | 添加演示动图                     |
| 6.1.0  | 2025-09-24 | 新增环境选择章节                 |
| 6.0.0  | 2025-09-22 | Intlayer 标签页 / 填充与测试命令 |
| 5.5.10 | 2025-06-29 | 初始化历史                       |
