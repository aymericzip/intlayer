# Intlayer 文档

欢迎来到官方 **Intlayer** 文档！在这里，您将找到所有与集成、配置和掌握 Intlayer 相关的内容，以满足您所有国际化 (i18n) 的需求—无论您是在使用 **Next.js**、**React**、**Vite**、**Express** 还是其他 JavaScript 环境。

Intlayer 提供了一种灵活、现代的方式来翻译您的应用程序。我们的文档将指导您从安装和设置到高级功能，如 **基于 AI 的翻译**、**TypeScript** 定义和 **服务器组件** 支持—使您能够创建无缝的多语言体验。

---

## 入门

- **[介绍](https://github.com/aymericzip/intlayer/blob/main/docs/zh/introduction.md)**  
  了解 Intlayer 的基本工作原理、核心特性，以及它为何是国际化的游戏改变者。

- **[Intlayer 如何工作](https://github.com/aymericzip/intlayer/blob/main/docs/zh/how_works_intlayer.md)**  
  深入了解架构设计，了解 Intlayer 如何处理从内容声明到翻译交付的所有内容。

- **[配置](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)**  
  自定义 Intlayer 以满足您项目的需求。探索中间件选项、目录结构和高级设置。

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)**  
  使用我们的命令行工具管理内容和翻译。了解如何推送和拉取内容，自动化翻译等。

- **[Intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)**  
  简化与非开发人员的协作，并通过 AI 提升您的翻译—直接在我们的免费直观 CMS 中。

---

## 核心概念

### 内容声明

将您的多语言内容与代码紧密组织，以保持一致性和可维护性。

- **[开始](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)**  
  学习在 Intlayer 中声明内容的基础知识。

- **[翻译](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/translation.md)**  
  了解翻译是如何生成、存储和在您的应用程序中使用的。

- **[枚举](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/enumeration.md)**  
  轻松管理各种语言中重复或固定的数据集。

- **[功能提取](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/function_fetching.md)**  
  查看如何使用自定义逻辑动态提取内容以匹配您的项目工作流程。

---

## 环境及集成

我们在构建 Intlayer 时考虑了灵活性，提供与众多流行框架和构建工具的无缝集成：

- **[Intlayer 与 Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)**
- **[Intlayer 与 Next.js 14（应用路由）](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_14.md)**
- **[Intlayer 与 Next.js 页面路由](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_page_router.md)**
- **[Intlayer 与 React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)**
- **[Intlayer 与 Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)**
- **[Intlayer 与 Express](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_express.md)**

每个集成指南都包括使用 Intlayer 功能的最佳实践—例如 **服务器端渲染**、**动态路由** 或 **客户端渲染**—让您可以维护一个快速、SEO 友好且高度可扩展的应用程序。

---

## 包

Intlayer 的模块化设计为特定环境和需求提供了专门的包：

### `intlayer`

核心实用程序函数，用于配置和管理您的国际化设置。

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

在 **Express** 为基础的应用程序中利用 Intlayer：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/express-intlayer/t.md)**  
  一个极简直观的翻译助手，用于您的服务器路由和视图。

### `react-intlayer`

通过强大的钩子增强您的 **React** 应用程序：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

无缝集成 **Next.js**：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useLocale.md)**

---

## 其他资源

- **[博客：Intlayer 和 i18next](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_i18next.md)**  
  了解 Intlayer 如何补充和比较流行的 **i18next** 库。

- **[YouTube 现场教程](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  观看全面演示，了解如何实时集成 Intlayer。

---

## 贡献与反馈

我们重视开源和社区驱动开发的力量。如果您想提出改进意见、添加新指南或纠正我们文档中的任何问题，请随时提交 Pull Request 或在我们的 [GitHub 仓库](https://github.com/aymericzip/intlayer/blob/main/docs) 上打开问题。

**准备好更快更高效地翻译您的应用程序吗？** 立即深入我们的文档，开始使用 Intlayer。体验一种强大、简化的国际化方法，让您的内容保持有序，让您的团队更加高效。

祝翻译愉快！  
— Intlayer 团队
