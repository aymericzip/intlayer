---
createdAt: 2024-08-13
updatedAt: 2025-06-29
title: 配置
description: 学习如何为您的应用程序配置Intlayer。了解可用于根据您的需要自定义Intlayer的各种设置和选项。
keywords:
  - 配置
  - 设置
  - 自定义
  - Intlayer
  - 选项
slugs:
  - doc
  - concept
  - configuration
---

# Intlayer 配置文档

## 概述

Intlayer 配置文件允许自定义插件的各个方面，例如国际化、中间件和内容处理。本文件详细描述了配置中的每个属性。

---

## 配置文件支持

Intlayer 支持 JSON、JS、MJS 和 TS 格式的配置文件：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 配置文件示例

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // 支持的语言列表
  },
  content: {
    contentDir: ["src", "../ui-library"], // 内容目录
  },
  middleware: {
    noPrefix: false, // 是否禁用前缀
  },
  editor: {
    applicationURL: "https://example.com", // 编辑器应用程序 URL
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI API 密钥
    applicationContext: "This is a test application", // 应用程序上下文
  },
  build: {
    importMode: "dynamic", // 启用动态导入
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // 支持的语言列表
  },
  "content": {
    "typesDir": "content/types", // 内容类型目录
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## 配置参考

以下部分描述了 Intlayer 可用的各种配置设置。

---

### 国际化配置

定义与国际化相关的设置，包括可用语言和应用程序的默认语言。

#### 属性

- **locales**:

  - _类型_: `string[]`
  - _默认值_: `['en']`
  - _描述_: 应用程序支持的语言列表。
  - _示例_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _类型_: `string[]`
  - _默认值_: `[]`
  - _描述_: 应用程序中必需的语言列表。
  - _示例_: `[]`
  - _注意_: 如果为空，在 `strict` 模式下所有语言都是必需的。
  - _注意_: 确保必需的语言也在 `locales` 字段中定义。
- **strictMode**:

  - _类型_: `string`
  - _默认值_: `inclusive`
  - _描述_: 使用 TypeScript 确保国际化内容的强实现。
  - _注意_: 如果设置为 "strict"，翻译函数 `t` 将要求每个声明的语言都被定义。如果缺少某个语言，或者某个语言未在配置中声明，将抛出错误。
  - _注意_: 如果设置为 "inclusive"，翻译函数 `t` 将要求每个声明的语言都被定义。如果缺少某个语言，将发出警告。但如果某个语言未在配置中声明但存在，也会接受。
  - _注意_: 如果设置为 "loose"，翻译函数 `t` 将接受任何现有的语言。

- **defaultLocale**:

  - _类型_: `string`
  - _默认值_: `'en'`
  - _描述_: 当请求的语言环境未找到时，使用的默认语言环境作为回退。
  - _示例_: `'en'`
  - _注意_: 当 URL、cookie 或请求头中未指定语言环境时，使用此项来确定语言环境。

---

### 编辑器配置

定义与集成编辑器相关的设置，包括服务器端口和激活状态。

#### 属性

- **applicationURL**:

  - _类型_: `string`
  - _默认值_: `http://localhost:3000`
  - _描述_: 应用程序的 URL。用于限制编辑器的来源以确保安全。
  - _示例_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注意_: 应用程序的 URL。用于限制编辑器的来源以确保安全。如果设置为 `'*'`，编辑器可以从任何来源访问。

- **port**:

  - _类型_: `number`
  - _默认值_: `8000`
  - _描述_: 可视化编辑器服务器使用的端口。

- **editorURL**:

  - _类型_: `string`
  - _默认值_: `'http://localhost:8000'`
  - _描述_: 编辑器服务器的 URL。用于限制编辑器的来源以确保安全。
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注意_: 从应用程序访问的编辑器服务器的 URL。用于限制可以与应用程序交互的来源以确保安全。如果设置为 `'*'`，则编辑器可从任何来源访问。如果更改了端口或编辑器托管在不同域上，应设置此项。

- **cmsURL**:

  - _类型_: `string`
  - _默认值_: `'https://intlayer.org'`
  - _描述_: Intlayer CMS 的 URL。
  - _示例_: `'https://intlayer.org'`
  - _注意_: Intlayer CMS 的 URL。

- **backendURL**:

  - _类型_: `string`
  - _默认值_: `https://back.intlayer.org`
  - _描述_: 后端服务器的 URL。
  - _示例_: `http://localhost:4000`

- **enabled**:

  - _类型_: `boolean`
  - _默认值_: `true`
  - _描述_: 指示应用程序是否与可视化编辑器交互。
  - _示例_: `process.env.NODE_ENV !== 'production'`
  - _注意_: 如果为 true，编辑器将能够与应用程序交互。如果为 false，编辑器将无法与应用程序交互。在任何情况下，编辑器只能由可视化编辑器启用。为特定环境禁用编辑器是一种增强安全性的方式。

- **clientId**:

  - _类型_: `string` | `undefined`
  - _默认值_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 intlayer 包使用 oAuth2 认证与后端进行身份验证。访问令牌用于验证与项目相关的用户。要获取访问令牌，请访问 https://intlayer.org/dashboard/project 并创建一个账户。
  - _示例_: `true`
  - _注意_: 重要：clientId 和 clientSecret 应该保密，不应公开共享。请确保将它们保存在安全的位置，例如环境变量中。

- **clientSecret**:

  - _类型_: `string` | `undefined`
  - _默认值_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 intlayer 包使用 oAuth2 认证与后端进行身份验证。访问令牌用于验证与项目相关的用户。要获取访问令牌，请访问 https://intlayer.org/dashboard/project 并创建一个账户。
  - _示例_: `true`
  - _注意_: 重要提示：clientId 和 clientSecret 应保密，不得公开分享。请确保将它们保存在安全的位置，例如环境变量中。

- **hotReload**:

  - _类型_: `boolean`
  - _默认值_: `false`
  - _描述_: 指示应用程序在检测到更改时是否应热加载语言配置。
  - _示例_: `true`
  - _注意_: 例如，当添加或更新新的词典时，应用程序将更新页面中显示的内容。
  - _注意_: 由于热重载需要与服务器保持持续连接，因此仅对 `enterprise` 计划的客户端可用。

- **dictionaryPriorityStrategy**:
  - _类型_: `string`
  - _默认值_: `'local_first'`
  - _描述_: 当本地词典和远程词典同时存在时，优先使用词典的策略。如果设置为 `'distant_first'`，应用程序将优先使用远程词典；如果设置为 `'local_first'`，应用程序将优先使用本地词典。
  - _示例_: `'distant_first'`

### 中间件配置

控制中间件行为的设置，包括应用程序如何处理 Cookie、头信息和用于语言环境管理的 URL 前缀。

#### 属性

- **headerName**:

  - _类型_: `string`
  - _默认值_: `'x-intlayer-locale'`
  - _描述_: 用于确定语言环境的 HTTP 头名称。
  - _示例_: `'x-custom-locale'`
  - _注意_: 这对于基于 API 的语言环境确定非常有用。

- **cookieName**:

  - _类型_: `string`
  - _默认值_: `'intlayer-locale'`
  - _描述_: 用于存储语言环境的 Cookie 名称。
  - _示例_: `'custom-locale'`
  - _注意_: 用于在会话之间保持语言环境。

- **prefixDefault**:

  - _类型_: `boolean`
  - _默认值_: `false`
  - _描述_: 是否在 URL 中包含默认语言环境。
  - _示例_: `true`
  - _注意_:
    - 如果 `true` 且 `defaultLocale = 'en'`: path = `/en/dashboard` 或 `/fr/dashboard`
    - 如果 `false` 且 `defaultLocale = 'en'`: path = `/dashboard` 或 `/fr/dashboard`

- **basePath**:

  - _类型_: `string`
  - _默认值_: `''`
  - _描述_: 应用程序 URL 的基础路径。
  - _示例_: `'/my-app'`
  - _注意_:
    - 如果应用程序托管在 `https://example.com/my-app`
    - 基础路径是 `'/my-app'`
    - URL 将是 `https://example.com/my-app/en`
    - 如果基础路径未设置，URL 将是 `https://example.com/en`

- **serverSetCookie**:

  - _类型_: `string`
  - _默认值_: `'always'`
  - _描述_: 在服务器上设置语言环境 Cookie 的规则。
  - _选项_: `'always'`, `'never'`
  - _示例_: `'never'`
  - _注意_: 控制是否在每个请求上设置语言环境 Cookie 或从不设置。

- **noPrefix**:

  - _类型_: `boolean`
  - _默认值_: `false`
  - _描述_: 是否从 URL 中省略语言环境前缀。
  - _示例_: `true`
  - _注意_:
    - 如果 `true`: URL 中没有前缀
    - 如果 `false`: URL 中有前缀
    - 使用 `basePath = '/my-app'` 的示例:
      - 如果 `noPrefix = false`: URL 将是 `https://example.com/my-app/en`
      - 如果 `noPrefix = true`: URL 将是 `https://example.com`

- **detectLocaleOnPrefetchNoPrefix**:

  - _类型_: `boolean`
  - _默认值_: `false`
  - _描述_: 控制是否在 Next.js 预取请求期间进行语言环境检测。
  - _示例_: `true`
  - _注意_: 此设置影响 Next.js 处理语言环境预取的方式:
    - **示例场景:**
      - 用户的浏览器语言是 `'fr'`
      - 当前页面是 `/fr/about`
      - 链接预取 `/about`
    - **使用 `detectLocaleOnPrefetchNoPrefix: true`:**
      - 预取从浏览器检测到 `'fr'` 语言环境
      - 将预取重定向到 `/fr/about`
    - **使用 `detectLocaleOnPrefetchNoPrefix: false` (默认):**
      - 预取使用默认语言环境
      - 将预取重定向到 `/en/about` (假设 `'en'` 是默认值)
    - **何时使用 `true`:**
      - 您的应用程序使用非本地化的内部链接 (例如 `<a href="/about">`)
      - 您希望在常规请求和预取请求之间保持一致的语言环境检测行为
    - **何时使用 `false` (默认):**
      - 您的应用程序使用带语言环境前缀的链接 (例如 `<a href="/fr/about">`)
      - 您希望优化预取性能
      - 您希望避免潜在的重定向循环

---

### 内容配置

与应用程序中的内容处理相关的设置，包括目录名称、文件扩展名和派生配置。

#### 属性

- **watch**:

  - _类型_: `boolean`
  - _默认值_: `process.env.NODE_ENV === 'development'`
  - _描述_: 指示 Intlayer 是否应监视应用程序中的内容声明文件的更改以重新构建相关字典。

- **fileExtensions**:

  - _类型_: `string[]`
  - _默认值_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _描述_: 构建字典时要查找的文件扩展名。
  - _示例_: `['.data.ts', '.data.js', '.data.json']`
  - _注意_: 自定义文件扩展名可以帮助避免冲突。

- **baseDir**:

  - _类型_: `string`
  - _默认值_: `process.cwd()`
  - _描述_: 项目的基础目录。
  - _示例_: `'/path/to/project'`
  - _注意_: 用于解析所有与 Intlayer 相关的目录。

- **dictionaryOutput**:

  - _类型_: `string[]`
  - _默认值_: `['intlayer']`
  - _描述_: 要使用的字典输出类型，例如 `'intlayer'` 或 `'i18next'`。

- **contentDir**:

  - _类型_: `string[]`
  - _默认值_: `['src']`
  - _示例_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _描述_: 存储内容的目录路径。

- **dictionariesDir**:

  - _类型_: `string`
  - _默认值_: `'.intlayer/dictionaries'`
  - _描述_: 用于存储中间或输出结果的目录路径。

- **moduleAugmentationDir**:

  - _类型_: `string`
  - _默认值_: `'.intlayer/types'`
  - _描述_: 模块增强目录，允许更好的 IDE 建议和类型检查。
  - _示例_: `'intlayer-types'`
  - _注意_: 请确保将其包含在 `tsconfig.json` 中。

- **unmergedDictionariesDir**:

  - _类型_: `string`
  - _默认值_: `'.intlayer/unmerged_dictionary'`
  - _描述_: 用于存储未合并字典的目录。
  - _示例_: `'translations'`

- **dictionariesDir**:

  - _类型_: `string`
  - _默认值_: `'.intlayer/dictionary'`
  - _描述_: 用于存储本地化字典的目录。
  - _示例_: `'translations'`

- **i18nextResourcesDir**:
- **i18nextResourcesDir**:

  - _类型_: `string`
  - _默认值_: `'i18next_dictionary'`
  - _描述_: 用于存储 i18n 字典的目录。
  - _示例_: `'translations'`
  - _注意_: 确保此目录已为 i18next 输出类型配置。

- **typesDir**:

  - _类型_: `string`
  - _默认值_: `'types'`
  - _描述_: 用于存储字典类型的目录。
  - _示例_: `'intlayer-types'`

- **mainDir**:

  - _类型_: `string`
  - _默认值_: `'main'`
  - _描述_: 存储主应用程序文件的目录。
  - _示例_: `'intlayer-main'`

- **excludedPath**:
  - _类型_: `string[]`
  - _默认值_: `['node_modules']`
  - _描述_: 从内容搜索中排除的目录。
  - _注意_: 此设置尚未使用，但计划在未来实现。

### 日志配置

控制日志记录器的设置，包括使用的前缀。

#### 属性

- **mode**:

  - _类型_: `string`
  - _默认值_: `default`
  - _描述_: 指示日志记录器的模式。
  - _选项_: `default`, `verbose`, `disabled`
  - _示例_: `default`
  - _注意_: 日志记录器的模式。详细模式将记录更多信息，但可用于调试目的。禁用模式将禁用日志记录器。

- **prefix**:

  - _类型_: `string`
  - _默认值_: `'[intlayer] '`
  - _描述_: 日志记录器的前缀。
  - _示例_: `'[my custom prefix] '`
  - _注意_: 日志记录器的前缀。

### AI 配置

控制 Intlayer AI 功能的设置，包括提供商、模型和 API 密钥。
如果您已使用访问密钥在 [Intlayer Dashboard](https://intlayer.org/dashboard/project) 上注册，则此配置是可选的。Intlayer 将自动为您的需求管理最有效和最具成本效益的 AI 解决方案。使用默认选项可确保更好的长期可维护性，因为 Intlayer 会不断更新以使用最相关的模型。

如果您更喜欢使用自己的 API 密钥或特定模型，可以定义自定义 AI 配置。
此 AI 配置将在整个 Intlayer 环境中全局使用。CLI 命令将使用这些设置作为命令（例如 `fill`）的默认值，以及 SDK、可视化编辑器和 CMS。您可以使用命令参数为特定用例覆盖这些默认值。
Intlayer 支持多个 AI 提供商，以增强灵活性和选择性。目前支持的提供商有：

- **OpenAI**（默认）
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### 属性

- **provider**：

  - _类型_：`string`
  - _默认值_：`'openai'`
  - _描述_：用于 Intlayer AI 功能的提供商。
  - _选项_：`'openai'`、`'anthropic'`、`'mistral'`、`'deepseek'`、`'gemini'`
  - _示例_：`'anthropic'`
  - _注意_：不同的提供商可能需要不同的 API 密钥，并具有不同的定价模型。

- **model**：

  - _类型_：`string`
  - _默认值_：无
  - _描述_：用于 Intlayer AI 功能的模型。
  - _示例_：`'gpt-4o-2024-11-20'`
  - _注意_: 不同提供商使用的具体模型可能有所不同。

- **temperature**:

  - _类型_: `number`
  - _默认值_: 无
  - _描述_: 温度控制 AI 响应的随机性。
  - _示例_: `0.1`
  - _注意_: 较高的温度会使 AI 更具创造性且更不可预测。

- **apiKey**:

  - _类型_: `string`
  - _默认值_: 无
  - _描述_: 您为所选提供商提供的 API 密钥。
  - _示例_: `process.env.OPENAI_API_KEY`
  - _注意_: 重要提示：API 密钥应保密，不得公开共享。请确保将其保存在安全位置，例如环境变量。

- **applicationContext**:
  - _类型_: `string`
  - _默认值_: 无
  - _描述_：为 AI 模型提供有关您的应用程序的额外上下文，帮助其生成更准确且符合上下文的翻译。这可以包括您的应用领域、目标受众、语气或特定术语等信息。

### 构建配置

控制 Intlayer 如何优化和构建应用程序国际化的设置。

构建选项适用于 `@intlayer/babel` 和 `@intlayer/swc` 插件。

> 在开发模式下，Intlayer 使用静态导入字典以简化开发体验。

> 优化时，Intlayer 将替换字典调用以优化分块，以便最终包只导入实际使用的字典。

#### 属性

- **optimize**：

  - _类型_：`boolean`
  - _默认值_：`process.env.NODE_ENV === 'production'`
  - _描述_：控制构建是否应被优化。
  - _示例_：`true`
  - _注意_：启用时，Intlayer 将替换所有字典调用以优化分块。这样，最终包将只导入使用的字典。所有导入都将保持为静态导入，以避免加载字典时的异步处理。
  - _注意_：Intlayer 将用 `importMode` 选项定义的模式替换所有 `useIntlayer` 调用，并将 `getIntlayer` 替换为 `getDictionary`。
  - _注意_：此选项依赖于 `@intlayer/babel` 和 `@intlayer/swc` 插件。
  - _注意_：确保所有键都在 `useIntlayer` 调用中静态声明。例如：`useIntlayer('navbar')`。

- **importMode**：

  - _类型_：`'static' | 'dynamic' | 'async'`
  - _默认值_：`'static'`
  - _描述_：控制字典的导入方式。
  - _示例_：`'dynamic'`
  - _注意_：可用模式：
    - "static"：字典静态导入。将 `useIntlayer` 替换为 `useDictionary`。
    - "dynamic"：字典使用 Suspense 动态导入。将 `useIntlayer` 替换为 `useDictionaryDynamic`。
    - "async"：字典异步动态导入。将 `useIntlayer` 替换为 `await useDictionaryAsync`。
  - _注意_：动态导入依赖于 Suspense，可能会略微影响渲染性能。
  - _注意_：如果禁用，所有语言环境将一次性加载，即使未被使用。
  - _注意_：此选项依赖于 `@intlayer/babel` 和 `@intlayer/swc` 插件。
  - _注意_：确保所有键在 `useIntlayer` 调用中静态声明。例如：`useIntlayer('navbar')`。
  - _注意_：如果 `optimize` 被禁用，此选项将被忽略。
  - _注意_：在大多数情况下，React 应用程序将使用 `"dynamic"`，Vue.js 应用程序将使用 `"async"`。
  - _注意_：此选项不会影响 `getIntlayer`、`getDictionary`、`useDictionary`、`useDictionaryAsync` 和 `useDictionaryDynamic` 函数。

- **traversePattern**：
  - _类型_：`string[]`
  - _默认值_：`['**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**/node_modules/**']`
  - _描述_：定义在优化过程中应遍历哪些文件的模式。
    - _示例_：`['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _注意_：使用此选项限制优化到相关的代码文件，以提升构建性能。
  - _注意_：如果禁用 `optimize`，此选项将被忽略。
  - _注意_：使用 glob 模式。

## 文档历史

- 5.5.11 - 2025-06-29：新增 `docs` 命令
