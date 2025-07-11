---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: react-i18n vs react-intl vs Intlayer
description: react-i18next和next-intl和Intlayer
keywords:
  - next-intl
  - react-i18next
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - react-i18next-vs-react-intl-vs-intlayer
---

# React-Intl 与 React-i18next 与 Intlayer | React 国际化 (i18n)

以下是三个流行的 i18n（国际化）库在 React 中的简明比较：**React-Intl**、**React-i18next** 和 **Intlayer**。每个库都为在您的 React 应用中集成多语言支持提供了独特的功能和工作流程。阅读完本文后，您应该能够决定哪个解决方案最符合您的需求。

---

## 1. 介绍

在 React 应用中实现国际化 (i18n) 有多种方式。这里介绍的三种库有不同的设计理念、功能集和社区支持：

1. **React-Intl**
2. **React-i18next**
3. **Intlayer**

下面，您将找到每个解决方案的概述，随后是功能比较、优缺点以及示例用例。

---

## 2. React-Intl

### 概述

[**React-Intl**](https://formatjs.io/docs/react-intl/) 是 [FormatJS](https://formatjs.io/) 套件的一部分。它提供了一套强大的 **API 和组件** 来处理消息格式化、复数形式、日期/时间和数字格式化。React-Intl 在企业应用中被广泛使用，主要是因为它是标准化消息语法和格式化的生态系统的一部分。

### 主要特性

- **ICU 消息语法**：提供全面的语法来处理消息插值、复数形式等。
- **本地化格式化**：内置工具根据地区格式化日期、时间、数字和相对时间。
- **声明式组件**：提供 `<FormattedMessage>`、`<FormattedNumber>`、`<FormattedDate>` 等，以便在 JSX 中无缝使用。
- **丰富的生态系统**：与 FormatJS 工具（例如 [babel-plugin-react-intl](https://formatjs.io/docs/tooling/babel-plugin/)）良好集成，用于提取、管理和编译消息。

### 典型工作流程

1. **定义消息目录**（通常是每个地区的 JSON 文件）。
2. **在 `<IntlProvider locale="zh" messages={messages}>` 中包装您的应用**。
3. **使用** `<FormattedMessage id="myMessage" defaultMessage="你好，世界" />` 或 `useIntl()` 钩子来访问翻译字符串。

### 优点

- 成熟且在许多生产环境中使用。
- 高级消息格式化，包括复数形式、性别、时区等。
- 对消息提取和编译的强大工具支持。

### 缺点

- 需要熟悉 **ICU 消息格式**，这可能比较冗长。
- 处理动态或复杂翻译（不只是字符串）的方式不直观。

---

## 3. React-i18next

### 概述

[**React-i18next**](https://react.i18next.com/) 是 [i18next](https://www.i18next.com/) 的 React 扩展，是最流行的 JavaScript i18n 框架之一。它提供了 **广泛的特性** 用于运行时翻译、懒加载和语言检测，使其对于各种用例极其灵活。

### 主要特性

- **灵活的翻译结构**：不绑定于像 ICU 这样的单一格式。您可以将翻译存储在 JSON 中，使用插值、复数形式等。
- **动态语言切换**：内置语言检测插件和运行时更新。
- **嵌套和结构化翻译**：可以轻松地将翻译嵌套在 JSON 中。
- **广泛的插件生态系统**：用于检测（浏览器、路径、子域等）、资源加载、缓存等。

### 典型工作流程

1. **安装 `i18next` 和 `react-i18next`。**
2. **配置 i18n** 加载翻译（JSON）并设置语言检测或回退。
3. **在 `I18nextProvider` 中包装您的应用**。
4. **使用 `useTranslation()` 钩子** 或 `<Trans>` 组件来显示翻译。

### 优点

- 高度 **灵活** 和功能丰富。
- 非常活跃的社区和大量插件生态系统。
- 轻松 **动态加载** 翻译（例如，从服务器按需加载）。

### 缺点

- **配置可能比较冗长**，尤其是如果您有更高级的需求。
- 如果您希望严格类型的翻译，可能需要额外的 TypeScript 设置。

---

## 4. Intlayer

### 概述

[**Intlayer**](https://github.com/aymericzip/intlayer) 是一个较新的开源 i18n 库，专注于 **组件级内容声明**、类型安全和 **动态路由**。它专为现代 React 工作流设计，支持 **Create React App** 和 **Vite** 设置。它还包括高级功能，如 **基于区域的路由** 和 **自动生成的 TypeScript 类型** 用于翻译。

### 主要特性

- **声明性内容文件**：每个组件或模块可以在专用的 `.content.tsx` 或 `.content.json` 文件中声明其翻译，将内容紧邻使用处。
- **内置路由和中间件**：可选模块用于本地化路由（例如，`/zh/about`、`/fr/about`）和用于检测用户区域的服务器中间件。
- **自动生成的 TypeScript 类型**：通过自动完成功能和编译时错误检测，确保类型安全。
- **动态和丰富的翻译**：可以在翻译中包含 JSX/TSX 以应对更复杂的用例（例如，链接、加粗文本、翻译中的图标）。

### 典型工作流程

1. **安装 `intlayer` 和 `react-intlayer`。**
2. **创建 `intlayer.config.ts`** 定义可用的区域和默认区域。
3. **使用 Intlayer CLI** 或插件来 **转译** 内容声明。
4. **在 `<IntlayerProvider>` 中包装您的应用** 并使用 `useIntlayer("keyName")` 获取内容。

### 优点

- **TypeScript 友好**，具有内置类型生成和错误检查。
- 可能 **丰富的内容**（例如，将 React 节点传递作为翻译）。
- **开箱即用的本地化路由**。
- 与流行的构建工具（CRA、Vite）集成，易于设置。

### 缺点

- 与 React-Intl 或 React-i18next 相比仍然 **相对较新**。
- 更加注重“组件级内容声明”的方法, , 可能与典型的 .json 目录有一定差异。
- 与更成熟的库相比，生态系统和社区较小。

---

## 5. 功能比较

| **特性**            | **React-Intl**                                  | **React-i18next**                                                  | **Intlayer**                                                                                |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| **主要用例**        | 基于字符串的翻译，日期/数字格式化，ICU 消息语法 | 全功能 i18n，易于动态切换、嵌套、插件生态系统                      | 强类型翻译，聚焦于声明式内容、本地化路由和可选的服务器中间件                                |
| **方法**            | 使用 `<IntlProvider>` 和 FormatJS 消息组件      | 使用 `I18nextProvider` 和 `useTranslation()` 钩子                  | 使用 `<IntlayerProvider>` 和 `useIntlayer()` 钩子以及内容声明                               |
| **本地化格式**      | 基于 ICU 的字符串（JSON 或 JavaScript 目录）    | JSON 资源文件（或自定义加载程序）。ICU 格式可通过 i18next 插件选择 | `.content.[ts/js/tsx]` 或 JSON 声明；可以包含字符串或 React 组件                            |
| **路由**            | 由外部处理（没有内置的本地化路由机制）          | 通过 i18next 插件（路径、子域检测等）外部处理                      | 内置支持本地化路由（如 `/zh/about`、`/fr/about`），以及可选的服务器中间件（用于 SSR/Vite）  |
| **TypeScript 支持** | 良好（官方包的类型定义）                        | 良好，但如果您希望严格检查类型翻译，则需要额外的配置               | 优秀（自动生成内容键和翻译的类型定义）                                                      |
| **复数和格式化**    | 高级：內置日期/时间/数字格式化、复数/性别支持   | 可配置的复数形式。日期/时间格式化通常通过外部库或 i18next 插件完成 | 可以依赖标准 JavaScript Intl 或将逻辑嵌入内容中。虽然不如 FormatJS 专业，但能处理典型案例。 |
| **社区和生态系统**  | 大，属于 FormatJS 生态系统                      | 非常大，活跃，插件众多（检测、缓存、框架等）                       | 较小但正在成长；开源，现代方法                                                              |
| **学习曲线**        | 中等（学习 ICU 消息语法，FormatJS 规范）        | 低到中等（使用比较简单，但高级配置可能会变得冗长）                 | 中等（内容声明的概念和专业构建步骤）                                                        |

---

## 6. 何时选择每种

1. **React-Intl**

   - 您需要 **强大的格式化** 用于日期/时间/数字，和强大的 **ICU 消息语法**。
   - 您更倾向于使用“**基于标准**”的方法进行翻译。
   - 您不需要本地化路由或强类型的翻译键。

2. **React-i18next**

   - 您需要一个 **灵活、成熟** 的解决方案，具有 **动态** 和 **按需** 加载翻译的功能。
   - 您希望使用 **基于插件** 的语言检测（例如，从 URL、Cookies、本地存储等）或高级缓存。
   - 您需要最大的生态系统，具有针对各种框架（如 Next.js、React Native 等）的许多现有集成。

3. **Intlayer**
   - 您希望 **强类型** 和 **自动生成类型** 的集成，确保您很少遗漏翻译键。
   - 您更喜欢将 **内容声明** 紧邻组件，可能包含 React 节点或在翻译中使用高级逻辑。
   - 您需要 **内置本地化路由** 或想要轻松将其纳入您的 SSR 或 Vite 设置。
   - 您希望采用现代方法或简单地希望拥有一个覆盖 **内容管理**（i18n）和 **路由** 的类型安全的库。

---

## 7. 结论

每个库都为国际化 React 应用程序提供了强大的解决方案：

- **React-Intl** 在消息格式化方面表现优异，是专注于 ICU 消息语法的企业解决方案的热门选择。
- **React-i18next** 为高级或动态 i18n 需求提供了高度灵活和插件驱动的环境。
- **Intlayer** 提供了 **现代、强类型** 的方法，结合了内容声明、高级的本地化路由和基于插件的（CRA，Vite）集成。

您的选择在很大程度上取决于项目需求、期望的开发人员体验（DX）以及类型翻译或高级路由的重要程度。如果您重视内置的本地化路由和 TypeScript 集成，**Intlayer** 可能最具吸引力。如果您想要一个经过考验的、生态系统丰富的解决方案，**React-i18next** 是一个不错的选择。对于直接的 ICU 基于格式化的需求，**React-Intl** 是一个可靠的选择。

---

### 进一步阅读

- [React-Intl 文档](https://formatjs.io/docs/react-intl/)
- [React-i18next 文档](https://react.i18next.com/)
- [Intlayer + CRA 开始指南](#)（来自您的文档）
- [Intlayer + Vite 和 React 开始指南](#)（来自您的文档）

随意混合和匹配这些方法以满足您的需求, , 没有“放之四海而皆准”的解决方案，每个库都在不断发展，以应对 React 生态系统中的新用例。
