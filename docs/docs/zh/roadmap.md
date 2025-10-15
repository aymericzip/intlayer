---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: 路线图
description: 了解 Intlayer 的路线图。查看 Intlayer 已实现和计划实现的所有功能。
keywords:
  - 路线图
  - Intlayer
  - 国际化
  - CMS
  - 内容管理系统
  - 可视化编辑器
slugs:
  - doc
  - roadmap
history:
  - version: 5.5.10
    date: 2025-06-30
    changes: 新增 Preact 和 Nuxt 支持，MCP 服务器，更新 CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# Intlayer：功能概览与路线图

Intlayer 是一个内容管理和国际化解决方案，旨在简化您在应用程序中声明、管理和更新内容的方式。它提供了强大的功能，例如集中式或分布式内容声明、广泛的国际化选项、Markdown 支持、条件渲染、TypeScript/JavaScript/JSON 集成等。以下是 Intlayer 当前提供的功能的全面概述，以及即将推出的路线图功能。

---

## 当前功能

### 1. 内容声明

#### 集中式或分布式

- **集中式**：在应用程序的根目录中，将所有内容声明在一个大型文件中，类似于 i18next，这样您可以在一个地方管理所有内容。
- **分布式**：或者，将您的内容拆分为组件或功能级别的单独文件，以便更好地维护。这使您的内容保持在相关代码（组件、测试、Storybook 等）附近。删除组件时，确保相关内容也被删除，防止残留数据混乱代码库。

> 资源：
>
> - [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)

### 2. 国际化

- 支持 **230 种语言和地区**（包括区域变体，如法语（法国）、英语（加拿大）、英语（英国）、葡萄牙语（葡萄牙）等）。
- 轻松从一个地方管理所有这些地区的翻译。

> 资源：
>
> - [国际化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)

### 3. Markdown 支持

- 使用 **Markdown** 声明内容，允许您自动格式化文本，包括段落、标题、链接等。
- 非常适合博客文章、文档页面或任何需要富文本格式的场景。

> 资源：
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)

### 4. 外部文件支持

- 以文本格式导入外部文件内容，如 TXT、HTML、JSON、YAML 或 CSV。
- 在 Intlayer 中使用 `file` 函数将外部文件内容嵌入字典，确保与 Intlayer 可视化编辑器和 CMS 的无缝集成。
- 支持动态内容更新，这意味着当源文件被修改时，内容会在 Intlayer 中自动更新。
- 通过动态链接特定语言的 Markdown 文件，实现多语言内容管理。

> 资源：
>
> - [文件内容嵌入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/file.md)

### 5. 动态内容与函数获取

Intlayer 提供多种方法来插入和管理动态内容，确保内容交付的灵活性和适应性。这包括动态内容插入、条件渲染、枚举、嵌套和函数获取等功能。

1. 动态内容插入

   使用 insert 函数定义带有占位符的内容（如 {{name}}、{{age}} 等）。

   支持类似模板的内容，根据用户输入、API响应或其他动态数据源进行适配。

   与 TypeScript、ESM、CommonJS 以及 JSON 配置无缝兼容。

   通过 useIntlayer 轻松集成 React Intlayer 和 Next Intlayer。

2. 条件渲染

   定义根据用户特定条件（如语言或认证状态）适配的内容。

   无需在多个文件中重复内容，即可定制个性化体验。

3. 枚举与复数形式

   使用 enu 函数根据数值、范围或自定义键定义内容变体。

   确保根据给定值自动选择正确的短语。

   支持排序规则，确保行为可预测。

4. 嵌套与子内容引用

   使用 nest 函数引用并重用另一个字典中的内容，减少重复。

   支持结构化和分层的内容管理，提升可维护性。

5. 函数获取

   Intlayer 允许将内容声明为函数，支持同步和异步内容获取。

   同步函数：内容在构建时动态生成。

   异步函数：动态从外部来源（如 API、数据库）获取数据。

   集成：支持 TypeScript、ESM 和 CommonJS，但不支持 JSON 或远程内容文件。

### 6. 内容声明格式

Intlayer 支持使用 **TypeScript**（也支持 JavaScript）和 **JSON** 来声明内容。

- **TypeScript**：
  - 确保您的内容结构正确且没有遗漏的翻译。
  - 提供严格或更灵活的验证模式。
  - 允许从变量、函数或外部 API 动态获取数据。

- **JSON**：
  - 由于其标准化格式，便于与外部工具（如可视化编辑器）集成。

  > 资源：
  >
  > - [内容声明格式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)

### 7. 清理、包优化和动态导入

- Intlayer 集成了 `Babel` 和 `SWC` 插件，以优化您的包并提升性能。它替换导入，只允许将使用到的字典导入到包中。
- 通过激活该选项，Intlayer 还允许仅动态导入当前语言环境的词典内容。

> 资源：
>
> - [构建配置](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## 与框架和环境的集成

### 1. Next.js

#### a. 服务器和客户端组件

- 为服务器和客户端组件提供**统一的内容管理方法**。
- 为服务器组件提供内置上下文，简化实现，相较于其他解决方案更为方便。

#### b. 元数据、站点地图和 robots.txt

- 动态获取并注入内容，以生成元数据、站点地图或 `robots.txt` 文件。

#### c. 中间件

- 添加中间件以根据用户的首选语言**重定向用户**到相应内容。

#### d. Turbopack 和 Webpack 兼容性

- 完全兼容新的 Next.js Turbopack 以及传统的 Webpack。

> 资源：
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

### 2. Vite

- 类似于 Next.js，您可以将 Intlayer 集成到 Vite 中，并使用 **中间件** 根据用户的首选语言重定向内容。

> 资源：
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)

### 3. Express

- 管理内容并国际化基于 Express 构建的后端服务。
- 使用本地化文本个性化电子邮件、错误消息、推送通知等。

> 资源：
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_express.md)

### 4. React Native

- 将 Intlayer 集成到 React Native 中，以管理内容并实现移动应用的国际化。
- 支持 iOS 和 Android 平台。

> 资源：
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react_native.md)

### 5. Lynx

- 将 Intlayer 集成到 Lynx 中，以管理内容并实现移动应用的国际化。
- 支持 iOS 和 Android 平台。

> 资源：
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_lynx.md)

### 6. Vue

- 将 Intlayer 集成到 Vue 中，以管理内容并实现 Vite / Vue.js 应用的国际化。

> 资源：
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vue.md)

### 7. Nuxt

- 将 Intlayer 集成到 Nuxt 中，以管理内容并实现 Nuxt / Vue.js 应用程序的国际化。
- 支持服务器端和客户端组件。
- 集成路由和中间件，根据用户的首选语言重定向到相应内容。

> 资源：
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nuxt.md)

### 8. Preact

- 将 Intlayer 集成到 Preact 中，以管理内容并实现 Preact 应用程序的国际化。

> 资源：
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_preact.md)

---

## 可视化编辑器和 CMS

### 1. 本地可视化编辑器

- 一个**免费的本地可视化编辑器**，允许您通过直接选择页面上的元素来编辑应用程序内容。
- 集成了 AI 功能以帮助：
  - 生成或修正翻译
  - 检查语法和拼写
  - 提出改进建议
- 可以本地托管，也可以部署在远程服务器上。

> 资源：
>
> - [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)

### 2. Intlayer CMS（远程）

- 一个**托管的 CMS** 解决方案，允许您在线管理应用程序内容，无需触及代码库。
- 提供 AI 辅助功能，用于声明内容、管理翻译以及修正语法或拼写错误。
- 通过您的实时应用界面与内容进行交互。

> 资源：
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

---

## IDE 扩展

- 为主流 IDE 提供的扩展，提供用于管理本地和远程翻译的**图形界面**。
- 功能可能包括自动生成组件内容声明文件、与 Intlayer CMS 的直接集成以及实时校验。

---

## MCP 服务器

- 一个**MCP 服务器**，允许你使用集成在 IDE 中的工具来管理内容和翻译。

---

## Intlayer CLI

- **翻译和文件生成**：对你的内容文件进行审计，生成缺失的翻译并检查不一致之处。
- **远程交互**：将本地内容推送到远程 CMS，或拉取远程内容以集成到本地应用中。
- **文档翻译与审核**：翻译并审核您的文档/文件等。

> 资源：
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)

---

## 环境配置

- 使用 **环境变量** 来针对生产、测试和本地环境不同地配置 Intlayer。
- 根据您的环境定义要使用的可视化编辑器或远程 CMS 项目。

---

## 热内容更新

- 使用远程词典和 Intlayer CMS 时，您可以 **实时更新应用内容**，无需重新部署。

> 资源：
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

---

## 即将推出的功能

### 1. A/B 测试与个性化

- **多变量测试**：测试同一内容的不同版本，以确定哪个表现最佳（例如，点击率更高）。
- **数据驱动的个性化**：根据用户的人口统计信息（性别、年龄、位置等）或其他行为模式显示不同内容。
- **自动迭代**：允许 AI 自动测试多个版本，选择表现最佳的版本或推荐选项供管理员审批。

### 2. 版本控制

- 通过**内容版本控制**恢复内容的先前版本。
- 跟踪内容随时间的变化，并在需要时恢复到早期状态。

### 3. 自动翻译

- 对于远程 CMS 用户，支持**一键生成任何支持语言的翻译**。
- 系统将在后台生成翻译，然后提示您进行验证或编辑。

### 4. SEO 增强

- 提供工具来**分析关键词**、用户搜索意图和新兴趋势。
- 建议改进内容以获得更好的排名，并跟踪长期表现。

### 5. 与更多框架的兼容性

- 正在努力支持**Solid、Svelte、Angular**等框架。
- 目标是使 Intlayer 兼容**任何基于 JavaScript 的应用程序**。

---

## 结论

Intlayer 旨在成为内容管理和国际化的一站式解决方案。它专注于灵活性（集中式或分布式文件）、广泛的语言支持、与现代框架和打包工具的轻松集成，以及强大的 AI 驱动功能。随着 A/B 测试、版本控制和自动翻译等新功能的推出，Intlayer 将继续简化内容工作流程，提升不同平台上的用户体验。

敬请关注即将发布的版本，欢迎随时探索现有功能，了解 Intlayer 如何帮助您集中管理和优化内容管理流程！

---
