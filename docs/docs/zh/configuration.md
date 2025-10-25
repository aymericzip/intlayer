---
createdAt: 2024-08-13
updatedAt: 2025-09-16
title: 配置
description: 了解如何为您的应用程序配置 Intlayer。了解各种设置和选项，以根据您的需求自定义 Intlayer。
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
history:
  - version: 6.0.0
    date: 2025-09-16
    changes: 添加 `live` 导入模式
  - version: 6.0.0
    date: 2025-09-16
    changes: 添加 `live` 导入模式
  - version: 6.0.0
    date: 2025-09-04
    changes: 用 `liveSync` 替换 `hotReload` 字段，并新增 `liveSyncPort` 和 `liveSyncURL` 字段
  - version: 5.6.1
    date: 2025-07-25
    changes: 用 `importMode` 选项替换 `activateDynamicImport`
  - version: 5.6.0
    date: 2025-07-13
    changes: 默认的 contentDir 从 `['src']` 改为 `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: 添加 `docs` 命令
---

# Intlayer 配置文档

## 概述

Intlayer 配置文件允许自定义插件的各个方面，例如国际化、中间件和内容处理。本文档详细描述了配置中的每个属性。

---

## 配置文件支持

Intlayer 支持 JSON、JS、MJS 和 TS 配置文件格式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 示例配置文件

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH], // 支持的语言列表
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // 自动填充内容文件路径模板
    contentDir: ["src", "../ui-library"], // 内容目录
  },
  middleware: {
    noPrefix: false, // 是否禁用前缀
  },
  editor: {
    applicationURL: "https://example.com", // 编辑器应用程序 URL
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI 接口密钥
    applicationContext: "This is a test application", // 应用上下文描述
  },
  build: {
    importMode: "dynamic", // 构建时的导入模式
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// 配置对象类型定义
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
    apiKey: process.env.OPENAI_API_KEY, // AI 接口密钥
    applicationContext: "This is a test application", // 应用上下文描述
  },
  build: {
    importMode: "dynamic", // 构建时的导入模式
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
    "contentDir": ["src", "../ui-library"], // 内容目录
  },
  "middleware": {
    "noPrefix": false, // 是否禁用前缀
  },
  "editor": {
    "applicationURL": "https://example.com", // 编辑器应用程序 URL
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "这是一个测试应用",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## 配置参考

以下部分描述了 Intlayer 可用的各种配置设置。

---

### 国际化配置

定义与国际化相关的设置，包括可用的语言环境和应用的默认语言环境。

#### 属性

- **locales**：
  - _类型_：`string[]`
  - _默认值_：`['en']`
  - _描述_：应用中支持的语言环境列表。
  - _示例_：`['en', 'fr', 'es']`

- **requiredLocales**：
  - _类型_：`string[]`
  - _默认值_：`[]`
  - _描述_：应用中必需的语言环境列表。
  - _示例_：`[]`
  - _注意_：如果为空，则在 `strict` 模式下所有语言环境都是必需的。
  - _注意_：确保必需的语言环境也在 `locales` 字段中定义。
- **strictMode**：
  - _类型_：`string`
  - _默认值_：`inclusive`
  - _描述_：确保使用 TypeScript 强化国际化内容的实现。
  - _注意_：如果设置为 "strict"，翻译函数 `t` 将要求每个声明的语言环境都必须定义。如果缺少某个语言环境，或者配置中未声明某个语言环境，将抛出错误。
  - _注意_：如果设置为 "inclusive"，翻译函数 `t` 将要求每个声明的语言环境都必须定义。如果缺少某个语言环境，将发出警告。但如果配置中未声明某个语言环境但该语言环境存在，则接受。
  - _注意_: 如果设置为 "loose"，翻译函数 `t` 将接受任何存在的语言环境。

- **defaultLocale**:
  - _类型_: `string`
  - _默认值_: `'en'`
  - _描述_: 当请求的语言环境未找到时，使用的默认语言环境作为回退。
  - _示例_: `'en'`
  - _注意_: 用于在 URL、cookie 或请求头中未指定语言环境时确定语言环境。

---

### 编辑器配置

定义与集成编辑器相关的设置，包括服务器端口和激活状态。

#### 属性

- **applicationURL**:
  - _类型_: `string`
  - _默认值_: `http://localhost:3000`
  - _描述_: 应用程序的 URL。用于出于安全原因限制编辑器的来源。
  - _示例_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
- `process.env.INTLAYER_EDITOR_URL`
  - _注意_: 应用程序的 URL。用于出于安全原因限制编辑器的来源。如果设置为 `'*'`，则编辑器可从任何来源访问。

- **port**:
  - _类型_: `number`
  - _默认值_: `8000`
  - _描述_: 可视化编辑器服务器使用的端口。

- **editorURL**:
  - _类型_: `string`
  - _默认值_: `'http://localhost:8000'`
  - _描述_: 编辑器服务器的 URL。用于出于安全原因限制编辑器的来源。
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注意_：应用程序访问的编辑器服务器的 URL。用于限制可以与应用程序交互的来源以确保安全。如果设置为 `'*'`，编辑器可以从任何来源访问。如果端口更改或编辑器托管在不同域名上，应设置此项。

- **cmsURL**：
  - _类型_：`string`
  - _默认值_：`'https://intlayer.org'`
  - _描述_：Intlayer CMS 的 URL。
  - _示例_：`'https://intlayer.org'`
  - _注意_：Intlayer CMS 的 URL。

- **backendURL**：
  - _类型_：`string`
  - _默认值_：`https://back.intlayer.org`
  - _描述_：后端服务器的 URL。
  - _示例_：`http://localhost:4000`

- **enabled**：
  - _类型_：`boolean`
  - _默认值_：`true`
  - _描述_：指示应用程序是否与可视化编辑器交互。
  - _示例_：`process.env.NODE_ENV !== 'production'`
  - _注意_：如果为 true，编辑器将能够与应用程序交互。如果为 false，编辑器将无法与应用程序交互。无论如何，编辑器只能由可视化编辑器启用。在特定环境中禁用编辑器是一种加强安全性的方式。

- **clientId**:
  - _类型_：`string` | `undefined`
  - _默认值_：`undefined`
  - _描述_: clientId 和 clientSecret 允许 intlayer 包使用 oAuth2 认证与后端进行身份验证。访问令牌用于验证与项目相关的用户。要获取访问令牌，请访问 https://intlayer.org/dashboard/project 并创建一个账户。
  - _示例_: `true`
  - _注意_: 重要提示：clientId 和 clientSecret 应保持机密，不得公开共享。请确保将它们保存在安全的位置，例如环境变量中。

- **clientSecret**:
  - _类型_: `string` | `undefined`
  - _默认值_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 intlayer 包使用 oAuth2 认证与后端进行身份验证。访问令牌用于验证与项目相关的用户。要获取访问令牌，请访问 https://intlayer.org/dashboard/project 并创建一个账户。
  - _示例_: `true`
  - _注意_: 重要提示：clientId 和 clientSecret 应保持机密，不得公开共享。请确保将它们保存在安全的位置，例如环境变量中。

- **dictionaryPriorityStrategy**:
  - _类型_: `string`
  - _默认值_: `'local_first'`
  - _描述_: 当本地和远程词典同时存在时，优先使用词典的策略。如果设置为 `'distant_first'`，应用程序将优先使用远程词典而非本地词典。如果设置为 `'local_first'`，应用程序将优先使用本地词典而非远程词典。
  - _示例_: `'distant_first'`

- **liveSync**:
  - _类型_: `boolean`
  - _默认值_: `false`
  - _描述_: 指示当检测到 CMS / 可视化编辑器 / 后端内容发生变化时，应用服务器是否应热重载应用内容。
  - _示例_: `true`
  - _备注_: 例如，当添加或更新新的词典时，应用程序会更新页面中显示的内容。
  - _注意_: 实时同步需要将应用内容外部化到另一个服务器。这意味着它可能会稍微影响应用的性能。为限制这种影响，我们建议将应用和实时同步服务器托管在同一台机器上。此外，实时同步与 `optimize` 的组合可能会对实时同步服务器产生大量请求。根据您的基础设施，我们建议测试这两种选项及其组合。

- **liveSyncPort**:
  - _类型_: `number`
  - _默认值_: `4000`
  - _描述_: 实时同步服务器的端口。
  - _示例_: `4000`
  - _注意_: 实时同步服务器的端口。

- **liveSyncURL**:
  - _类型_: `string`
  - _默认值_: `'http://localhost:{liveSyncPort}'`
  - _描述_: 实时同步服务器的 URL。
  - _示例_: `'https://example.com'`
  - _备注_: 默认指向 localhost，但在远程实时同步服务器的情况下可以更改为任何 URL。

### 中间件配置

控制中间件行为的设置，包括应用如何处理 cookie、头信息以及用于区域管理的 URL 前缀。

#### 属性

- **headerName**:
  - _类型_: `string`
  - _默认值_: `'x-intlayer-locale'`
  - _描述_: 用于确定区域的 HTTP 头名称。
  - _示例_: `'x-custom-locale'`
  - _备注_: 这对于基于 API 的区域确定非常有用。

- **cookieName**:
  - _类型_: `string`
  - _默认值_: `'intlayer-locale'`
  - _描述_: 用于存储区域的 cookie 名称。
  - _示例_: `'custom-locale'`
  - _说明_: 用于在会话之间保持语言环境。

- **prefixDefault**:
  - _类型_: `boolean`
  - _默认值_: `false`
  - _说明_: 是否在 URL 中包含默认语言环境。
  - _示例_: `true`
  - _说明_:
    - 如果为 `true` 且 `defaultLocale = 'en'`：路径为 `/en/dashboard` 或 `/fr/dashboard`
    - 如果为 `false` 且 `defaultLocale = 'en'`：路径为 `/dashboard` 或 `/fr/dashboard`

- **basePath**:
  - _类型_: `string`
  - _默认值_: `''`
  - _说明_: 应用程序 URL 的基础路径。
  - _示例_: `'/my-app'`
  - _说明_:
    - 如果应用托管在 `https://example.com/my-app`
    - 基础路径为 `'/my-app'`
    - URL 将是 `https://example.com/my-app/en`
    - 如果未设置基础路径，URL 将是 `https://example.com/en`

- **serverSetCookie**：
  - _类型_：`string`
  - _默认值_：`'always'`
  - _描述_：服务器端设置语言环境 Cookie 的规则。
  - _选项_：`'always'`，`'never'`
  - _示例_：`'never'`
  - _说明_：控制是否在每次请求时设置语言环境 Cookie，或者从不设置。

- **noPrefix**：
  - _类型_：`boolean`
  - _默认值_：`false`
  - _描述_：是否在 URL 中省略语言环境前缀。
  - _示例_：`true`
  - _说明_：
    - 如果为 `true`：URL 中无前缀
    - 如果为 `false`：URL 中有前缀
    - 以 `basePath = '/my-app'` 为例：
      - 如果 `noPrefix = false`：URL 将是 `https://example.com/my-app/en`
      - 如果 `noPrefix = true`：URL 将是 `https://example.com`

---

### 内容配置

与应用内内容处理相关的设置，包括目录名称、文件扩展名及派生配置。

#### 属性

- **autoFill**：
  - _类型_：`boolean | string | { [key in Locales]?: string }`
  - _默认值_：`undefined`
  - _描述_：指示内容应如何使用 AI 自动填充。可以在 `intlayer.config.ts` 文件中全局声明。
  - _示例_：true
  - _示例_：'./{{fileName}}.content.json'
  - _示例_：{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }
  - _备注_：自动填充配置。它可以是：
    - boolean：为所有语言启用自动填充
    - string：单个文件路径或带变量的模板路径
    - object：每个语言的文件路径

- **watch**:
  - _类型_：`boolean`
  - _默认值_：`process.env.NODE_ENV === 'development'`
  - _描述_：指示 Intlayer 是否应监视应用中内容声明文件的更改，以重建相关字典。

- **fileExtensions**:
  - _类型_：`string[]`
  - _默认值_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _描述_: 构建字典时要查找的文件扩展名。
  - _示例_: `['.data.ts', '.data.js', '.data.json']`
  - _备注_: 自定义文件扩展名可以帮助避免冲突。

- **baseDir**:
  - _类型_: `string`
  - _默认值_: `process.cwd()`
  - _描述_: 项目的基础目录。
  - _示例_: `'/path/to/project'`
  - _备注_: 用于解析所有与 Intlayer 相关的目录。

- **dictionaryOutput**:
  - _类型_: `string[]`
  - _默认值_: `['intlayer']`
  - _描述_: 使用的字典输出类型，例如 `'intlayer'` 或 `'i18next'`。

- **contentDir**:
  - _类型_: `string[]`
  - _默认值_: `['.']`
  - _示例_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _描述_: 存储内容的目录路径。

- **dictionariesDir**:
  - _类型_: `string`
  - _默认_: `'.intlayer/dictionaries'`
  - _描述_: 用于存储中间结果或输出结果的目录路径。

- **moduleAugmentationDir**:
  - _类型_: `string`
  - _默认_: `'.intlayer/types'`
  - _描述_: 模块增强目录，允许更好的 IDE 提示和类型检查。
  - _示例_: `'intlayer-types'`
  - _注意_: 确保在 `tsconfig.json` 中包含此目录。

- **unmergedDictionariesDir**:
  - _类型_: `string`
  - _默认_: `'.intlayer/unmerged_dictionary'`
  - _描述_: 用于存储未合并字典的目录。
  - _示例_: `'translations'`

- **dictionariesDir**:
  - _类型_: `string`
  - _默认值_: `'.intlayer/dictionary'`
  - _描述_: 用于存储本地化词典的目录。
  - _示例_: `'translations'`

- **i18nextResourcesDir**:
  - _类型_: `string`
  - _默认值_: `'i18next_dictionary'`
  - _描述_: 用于存储 i18n 词典的目录。
  - _示例_: `'translations'`
  - _注意_: 确保该目录已为 i18next 输出类型进行配置。

- **typesDir**:
  - _类型_: `string`
  - _默认值_: `'types'`
  - _描述_: 用于存储词典类型的目录。
  - _示例_: `'intlayer-types'`

- **mainDir**:
  - _类型_: `string`
  - _默认值_: `'main'`
  - _描述_: 存放主应用程序文件的目录。
  - _示例_: `'intlayer-main'`

- **excludedPath**:
  - _类型_: `string[]`
  - _默认值_: `['node_modules']`
  - _描述_: 排除内容搜索的目录。
  - _备注_: 此设置尚未使用，但计划在未来实现。

### 日志配置

控制日志记录器的设置，包括使用的前缀。

#### 属性

- **mode**:
  - _类型_: `string`
  - _默认值_: `default`
  - _描述_: 指示日志记录器的模式。
  - _选项_: `default`，`verbose`，`disabled`
  - _示例_: `default`
  - _备注_: 日志记录器的模式。详细模式将记录更多信息，可用于调试。禁用模式将关闭日志记录器。

- **prefix**:
  - _类型_: `string`
  - _默认值_: `'[intlayer] '`
  - _描述_: 日志记录器的前缀。
  - _示例_: `'[my custom prefix] '`
  - _注释_: 日志器的前缀。

### AI 配置

控制 Intlayer AI 功能的设置，包括提供商、模型和 API 密钥。

如果您已使用访问密钥在[Intlayer 控制面板](https://intlayer.org/dashboard/project)注册，则此配置是可选的。Intlayer 会自动管理最有效且具有成本效益的 AI 解决方案以满足您的需求。使用默认选项可确保更好的长期可维护性，因为 Intlayer 会持续更新以使用最相关的模型。

如果您希望使用自己的 API 密钥或特定模型，可以定义自定义的 AI 配置。
此 AI 配置将在整个 Intlayer 环境中全局使用。CLI 命令将使用这些设置作为命令的默认值（例如 `fill`），同时 SDK、可视化编辑器和 CMS 也会使用这些默认值。您可以通过命令参数覆盖这些默认值以满足特定用例。

Intlayer 支持多个 AI 提供商，以增强灵活性和选择。目前支持的提供商有：

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
  - _注意_: 不同的提供商可能需要不同的 API 密钥，并且有不同的定价模型。

- **model**:
  - _类型_: `string`
  - _默认值_: 无
  - _描述_: 用于 Intlayer AI 功能的模型。
  - _示例_: `'gpt-4o-2024-11-20'`
  - _注意_: 具体使用的模型因提供商而异。

- **temperature**:
  - _类型_: `number`
  - _默认值_: 无
  - _描述_: temperature 控制 AI 回答的随机性。
  - _示例_: `0.1`
  - _注意_: 较高的 temperature 会使 AI 更具创造性且不可预测。

- **apiKey**:
  - _类型_: `string`
  - _默认值_: 无
  - _描述_: 你为所选提供商提供的 API 密钥。
  - _示例_: `process.env.OPENAI_API_KEY`
  - _注意_: 重要提示：API 密钥应保密，切勿公开共享。请确保将其保存在安全的位置，例如环境变量中。

- **applicationContext**:
  - _类型_: `string`
  - _默认值_: 无
  - _描述_: 向 AI 模型提供有关您的应用程序的额外上下文，帮助其生成更准确且符合上下文的翻译。这可以包括您的应用领域、目标受众、语气或特定术语的信息。

### 构建配置

控制 Intlayer 如何优化和构建您的应用程序国际化的设置。

构建选项适用于 `@intlayer/babel` 和 `@intlayer/swc` 插件。

> 在开发模式下，Intlayer 使用静态导入字典，以简化开发体验。

> 在优化模式下，Intlayer 会替换字典调用以优化代码分块，因此最终打包只会导入实际使用的字典。

#### 属性

- **optimize**：
  - _类型_：`boolean`
  - _默认值_：`process.env.NODE_ENV === 'production'`
  - _描述_：控制构建是否应进行优化。
  - _示例_：`true`
  - _注意_：启用时，Intlayer 会替换所有字典调用以优化代码分块。这样最终打包只会导入被使用的字典。所有导入将保持为静态导入，以避免加载字典时的异步处理。
  - _注意_: Intlayer 会根据 `importMode` 选项定义的模式替换所有 `useIntlayer` 的调用，并将 `getIntlayer` 替换为 `getDictionary`。
  - _注意_: 此选项依赖于 `@intlayer/babel` 和 `@intlayer/swc` 插件。
  - _注意_: 确保所有键在 `useIntlayer` 调用中是静态声明的。例如 `useIntlayer('navbar')`。

- **importMode**:
  - _类型_: `'static' | 'dynamic' | 'live'`
  - _默认值_: `'static'`
  - _描述_: 控制字典的导入方式。
  - _示例_: `'dynamic'`
  - _注意_: 可用模式：
    - "static"：字典以静态方式导入。将 `useIntlayer` 替换为 `useDictionary`。
    - "dynamic"：字典通过 Suspense 动态导入。将 `useIntlayer` 替换为 `useDictionaryDynamic`。
  - "live"：字典通过实时同步 API 动态获取。将 `useIntlayer` 替换为 `useDictionaryFetch`。
  - _注意_：动态导入依赖 Suspense，可能会略微影响渲染性能。
  - _注意_：如果禁用，所有语言环境将一次性加载，即使未被使用。
  - _注意_：此选项依赖 `@intlayer/babel` 和 `@intlayer/swc` 插件。
  - _注意_：确保在 `useIntlayer` 调用中所有键都是静态声明的。例如 `useIntlayer('navbar')`。
  - _注意_：如果禁用 `optimize`，此选项将被忽略。
  - _注意_: 如果设置为 "live"，只有包含远程内容且标记为 "live" 的字典会被转换为实时模式。其他字典将以 "dynamic" 模式动态导入，以优化请求次数和加载性能。
  - _注意_: 实时模式将使用实时同步 API 来获取字典。如果 API 调用失败，字典将以 "dynamic" 模式动态导入。
  - _注意_: 此选项不会影响 `getIntlayer`、`getDictionary`、`useDictionary`、`useDictionaryAsync` 和 `useDictionaryDynamic` 函数。

- **traversePattern**:
  - _类型_: `string[]`
  - _默认值_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _描述_：定义在优化过程中应遍历哪些文件的模式。
    - _示例_：`['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _注意_：使用此选项限制优化范围到相关代码文件，以提升构建性能。
  - _注意_：如果禁用 `optimize`，此选项将被忽略。
  - _注意_：使用 glob 模式。
