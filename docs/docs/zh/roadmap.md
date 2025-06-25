---
docName: roadmap
url: https://intlayer.org/doc/roadmap
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/roadmap.md
createdAt: 2025-03-01
updatedAt: 2025-03-01
title: 路线图
description: 发现Intlayer的路线图。查看所有已实现的Intlayer功能，并查看它打算实现的功能。
keywords:
  - Roadmap
  - Intlayer
  - 国际化
  - CMS
  - 内容管理系统
  - 视觉编辑器
---

# Intlayer: 功能概览与路线图

Intlayer 是一种内容管理和国际化解决方案，旨在简化您在应用程序中声明、管理和更新内容的方式。它提供了强大的功能，例如集中式或分布式内容声明、广泛的国际化选项、Markdown 支持、条件渲染、TypeScript/JavaScript/JSON 集成等。以下是 Intlayer 当前功能的全面概述，以及即将推出的路线图功能。

---

## 当前功能

### 1. 内容声明

#### 集中式或分布式

- **集中式**：在应用程序的基础位置使用一个大型文件声明所有内容，类似于 i18next，这样您可以在一个地方管理所有内容。
- **分布式**：或者，将内容拆分到组件或功能级别的单独文件中，以提高可维护性。这使您的内容与相关代码（组件、测试、Storybook 等）保持紧密联系。移除组件时，相关内容也会被移除，防止遗留数据使代码库变得混乱。

> 资源:
>
> - [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)

### 2. 国际化

- 支持 **230 种语言和区域**（包括区域变体，如法语（法国）、英语（加拿大）、英语（英国）、葡萄牙语（葡萄牙）等）。
- 可以轻松地从一个地方管理所有这些语言的翻译。

> 资源:
>
> - [国际化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)

### 3. Markdown 支持

- 使用 **Markdown** 声明内容，允许您自动格式化带有段落、标题、链接等的文本。
- 非常适合博客文章、文档页面或任何需要丰富文本格式的场景。

> 资源:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)

### 4. 条件渲染

- 定义基于特定条件（如用户语言、用户登录状态或任何其他上下文相关变量）适应的内容。
- 帮助定制个性化体验，而无需在多个文件中重复内容。

> 资源:
>
> - [条件渲染](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/condition.md)

### 5. 内容声明格式

Intlayer 支持使用 **TypeScript**（也支持 JavaScript）和 **JSON** 声明内容。

- **TypeScript**:

  - 确保您的内容结构正确且没有缺失的翻译。
  - 提供严格或更灵活的验证模式。
  - 允许从变量、函数或外部 API 动态获取数据。

- **JSON**:

  - 由于其标准化格式，便于与外部工具（如可视化编辑器）集成。

  > 资源:
  >
  > - [内容声明格式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_extention_customization.md)

---

## 与框架和环境的集成

### 1. Next.js

#### a. 服务端和客户端组件

- 为服务端和客户端组件提供 **统一的内容管理方法**。
- 为服务端组件提供内置上下文，与其他解决方案相比简化了实现。

#### b. 元数据、站点地图和 robots.txt

- 动态获取并注入内容以生成元数据、站点地图或 `robots.txt` 文件。

#### c. 中间件

- 添加中间件以根据用户的首选语言 **重定向用户** 到相应内容。

#### d. Turbopack 和 Webpack 兼容性

- 完全兼容新的 Next.js Turbopack 以及传统的 Webpack。

> 资源:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

### 2. Vite

- 类似于 Next.js，您可以将 Intlayer 与 Vite 集成，并使用 **中间件** 根据用户的首选语言重定向到相应内容。

> 资源:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)

### 3. Express

- 管理内容并国际化基于 Express 构建的后端服务。
- 使用本地化文本个性化电子邮件、错误消息、推送通知等。

> 资源:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_express.md)

---

## 可视化编辑器和 CMS

### 1. 本地可视化编辑器

- 一个 **免费的本地可视化编辑器**，允许您通过直接选择页面上的元素来编辑应用程序内容。
- 集成 AI 功能以帮助：
  - 生成或修复翻译
  - 检查语法和拼写
  - 提出改进建议
- 可以本地托管或部署在远程服务器上。

> 资源:
>
> - [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)

### 2. Intlayer CMS（远程）

- 一个 **托管的 CMS** 解决方案，允许您在线管理应用程序内容，而无需接触代码库。
- 提供 AI 辅助功能，用于声明内容、管理翻译以及修复语法或拼写错误。
- 通过您的实时应用程序界面与内容交互。

> 资源:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

---

## Intlayer CLI

- **审计和翻译生成**：对内容文件运行审计以生成缺失的翻译或识别未使用的翻译。
- **远程交互**：将本地内容发布到远程 CMS 或获取远程内容以集成到本地应用程序中。
- 对于 **CI/CD 管道** 非常有用，确保您的内容始终与代码同步。

> 资源:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)

---

## 环境

- 使用 **环境变量** 在生产、测试和本地环境中以不同方式配置 Intlayer。
- 根据您的环境定义要定位的可视化编辑器或远程 CMS 项目。

---

## 热内容更新

- 使用远程字典和 Intlayer CMS 时，您可以 **实时更新应用程序的内容**，无需重新部署。

> 资源:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

---

## 路线图：即将推出的功能

### 1. A/B 测试与个性化

- **多变量测试**：测试内容的不同版本以查看哪个表现最佳（例如更高的点击率）。
- **数据驱动的个性化**：根据用户人口统计（性别、年龄、位置等）或其他行为模式显示不同内容。
- **自动迭代**：允许 AI 自动测试多个版本，并选择表现最佳的版本或推荐选项供管理员批准。

### 2. 版本控制

- 使用 **内容版本控制** 恢复内容的先前版本。
- 跟踪随时间的更改，并在需要时恢复到早期状态。

### 3. 自动翻译

- 对于远程 CMS 用户，支持 **一键翻译生成** 任意支持的语言。
- 系统将在后台生成翻译，然后提示您进行验证或编辑。

### 4. SEO 增强

- 工具用于 **分析关键词**、用户搜索意图和新兴趋势。
- 提出改进内容的建议以获得更好的排名，并跟踪长期表现。

### 5. 与更多框架的兼容性

- 正在努力支持 **Vite、Angular、React Native** 等。
- 目标是使 Intlayer 与 **任何基于 JavaScript 的应用程序** 兼容。

### 6. IDE 扩展

- 为主要 IDE 提供扩展，提供 **图形界面** 来管理本地和远程翻译。
- 功能可能包括为组件自动生成内容声明文件、与 Intlayer CMS 的直接集成以及实时验证。

---

## 结论

Intlayer 旨在成为内容管理和国际化的一站式解决方案。它专注于灵活性（集中式或分布式文件）、广泛的语言支持、与现代框架和打包工具的轻松集成以及强大的 AI 驱动功能。随着 A/B 测试、版本控制和自动翻译等新功能的推出，Intlayer 将继续简化内容工作流并提升不同平台上的用户体验。

敬请期待即将发布的版本，并随时探索现有功能，看看 Intlayer 如何帮助集中和优化您的内容管理流程！
