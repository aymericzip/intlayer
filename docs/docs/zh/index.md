---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Intlayer 文档 - JavaScript 完整国际化指南
description: Intlayer 的完整文档，现代化的国际化库，支持 JavaScript、React、Next.js、Express 及更多框架。
keywords:
  - intlayer
  - 国际化
  - i18n
  - JavaScript
  - React
  - Next.js
  - 文档
  - 翻译
  - 多语言
slugs:
  - doc
  - index
---

# Intlayer 文档

欢迎来到官方 **Intlayer** 文档！在这里，您将找到集成、配置和掌握 Intlayer 所需的一切，无论您是在使用 **Next.js**、**React**、**Vite**、**Express** 还是其他 JavaScript 环境，满足您所有的国际化（i18n）需求。

Intlayer 提供了一种灵活且现代化的应用翻译方案。我们的文档将引导您从安装和设置开始，直到高级功能，如 **AI 驱动的翻译**、**TypeScript** 类型定义和 **服务器组件** 支持，助您打造无缝的多语言体验。

---

## 入门指南

- **[介绍](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/introduction.md)**  
  了解 Intlayer 的工作原理、核心功能，以及它为何成为国际化（i18n）领域的变革者。

- **[Intlayer 的工作原理](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/how_works_intlayer.md)**  
  深入了解架构设计，学习 Intlayer 如何处理从内容声明到翻译交付的全过程。

- **[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)**  
  根据项目需求自定义 Intlayer。探索中间件选项、目录结构和高级设置。

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)**  
  使用我们的命令行工具管理内容和翻译。了解如何推送和拉取内容，自动化翻译等功能。

- **[Intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)**  
  简化与非开发者的协作，并通过我们的免费直观 CMS 直接使用 AI 强化您的翻译。

---

## 核心概念

### 词典

将您的多语言内容组织在代码附近，保持所有内容的一致性和可维护性。

- **[入门指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)**  
  学习在 Intlayer 中声明内容的基础知识。

- **[翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)**  
  了解翻译是如何生成、存储并在您的应用程序中使用的。

- **[枚举](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)**  
  轻松管理跨多种语言的重复或固定数据集。

- **[条件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/conditional.md)**  
  学习如何在 Intlayer 中使用条件逻辑来创建动态内容。

- **[插入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)**  
  了解如何使用插入占位符在字符串中插入值。

- **[函数获取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)**  
  了解如何在您的应用程序中生成、存储和使用翻译内容。

- **[枚举](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)**  
  轻松管理跨多语言的重复或固定数据集。

- **[条件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/conditional.md)**  
  学习如何在 Intlayer 中使用条件逻辑来创建动态内容。

- **[插入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)**  
  了解如何使用插入占位符在字符串中插入值。

- **[函数获取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)**  
  了解如何通过自定义逻辑动态获取内容，以匹配您的项目工作流程。

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)**  
  学习如何在 Intlayer 中使用 Markdown 创建丰富内容。

- **[文件嵌入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/file_embeddings.md)**  
  了解如何在 Intlayer 中嵌入外部文件，以便在内容编辑器中使用。

- **[嵌套](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/nesting.md)**  
  理解如何在 Intlayer 中嵌套内容以创建复杂结构。

---

## 环境与集成

我们设计 Intlayer 时注重灵活性，提供了与流行框架和构建工具的无缝集成：

- **[Intlayer 与 Next.js 15 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)**
- **[Intlayer 与 Next.js 14（App Router）集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md)**
- **[Intlayer 与 Next.js 页面路由集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)**
- **[Intlayer 与 React CRA 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)**
- **[Intlayer 与 Vite + React 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)**

我们设计 Intlayer 时充分考虑了灵活性，提供了与流行框架和构建工具的无缝集成：

- **[Intlayer 与 Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)**
- **[Intlayer 与 Next.js 14（App Router）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md)**
- **[Intlayer 与 Next.js 页面路由器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)**
- **[Intlayer 与 React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)**
- **[Intlayer 与 Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)**
- **[Intlayer 与 React Native 和 Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react_native+expo.md)**
- **[Intlayer 与 Lynx 和 React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_lynx+react.md)**
- **[Intlayer 与 Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_express.md)**

每个集成指南都包含了使用 Intlayer 功能的最佳实践，如 **服务器端渲染**、**动态路由** 或 **客户端渲染**，帮助你保持应用的高速、SEO 友好和高度可扩展性。

---

## 包

Intlayer 的模块化设计为特定环境和需求提供了专用包：

### `intlayer`

核心实用函数，用于配置和管理您的国际化(i18n)设置。

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

在基于 **Express** 的应用中利用 Intlayer：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/express-intlayer/t.md)**  
  一个简洁、直接的翻译辅助工具，适用于你的服务器路由和视图。

### `react-intlayer`

增强您的 **React** 应用程序，使用强大的钩子：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

无缝集成 **Next.js**：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)**

---

## 额外资源

- **[博客：Intlayer 与 i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_i18next.md)**  
  了解 Intlayer 如何补充并对比流行的 **i18next** 库。

- **[YouTube 直播教程](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  观看全面演示，学习如何实时集成 Intlayer。

---

## 贡献与反馈

我们重视开源和社区驱动开发的力量。如果您想提出改进建议、添加新的指南，或纠正文档中的任何问题，欢迎随时在我们的[GitHub 仓库](https://github.com/aymericzip/intlayer/blob/main/docs/docs)提交 Pull Request 或开启 issue。

**准备好更快更高效地翻译您的应用了吗？** 立即深入我们的文档，开始使用 Intlayer。体验一种强大且简化的国际化方法，让您的内容井然有序，团队工作更高效。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
