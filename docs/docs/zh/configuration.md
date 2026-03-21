---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: 配置 (Configuration)
description: 了解如何为您的应用程序配置 Intlayer。理解各种设置和选项，以根据您的需求自定义 Intlayer。
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
  - version: 8.4.0
    date: 2026-03-20
    changes: 为 'compiler.output' 和 'dictionary.fill' 添加了按语言环境的对象表示法
  - version: 8.3.0
    date: 2026-03-11
    changes: 将 'baseDir' 从 'content' 配置移动到 'system' 配置
  - version: 8.2.0
    date: 2026-03-09
    changes: 更新了编译器 (compiler) 选项，添加了对 'output' 和 'noMetadata' 的支持
  - version: 8.1.7
    date: 2026-02-25
    changes: 更新了编译器选项
  - version: 8.1.5
    date: 2026-02-23
    changes: 添加了编译器选项 'build-only' 和字典前缀
  - version: 8.0.6
    date: 2026-02-12
    changes: 添加了对 Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face 和 Together.ai 提供商的支持
  - version: 8.0.5
    date: 2026-02-06
    changes: 在 AI 配置中添加了 `dataSerialization`
  - version: 8.0.0
    date: 2026-01-24
    changes: 将导入模式 `live` 重命名为 `fetch`，以更好地描述底层机制。
  - version: 8.0.0
    date: 2026-01-22
    changes: 将构建配置 `importMode` 移动到 `dictionary` 配置。
  - version: 8.0.0
    date: 2026-01-22
    changes: 在路由配置中添加了 `rewrite` 选项
  - version: 8.0.0
    date: 2026-01-18
    changes: 将系统配置与内容配置分离。将内部路径移动到 `system` 属性。添加了 `codeDir` 以分离内容文件和代码转换。
  - version: 8.0.0
    date: 2026-01-18
    changes: 添加了字典选项 `location` 和 `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: 添加了对 JSON5 和 JSONC 文件格式的支持
  - version: 7.5.0
    date: 2025-12-17
    changes: 添加了 `buildMode` 选项
  - version: 7.0.0
    date: 2025-10-25
    changes: 添加了 `dictionary` 配置
  - version: 7.0.0
    date: 2025-10-21
    changes: 使用路由配置 `routing` 替换了 `middleware`
  - version: 7.0.0
    date: 2025-10-12
    changes: 添加了 `formatCommand` 选项
  - version: 6.2.0
    date: 2025-10-12
    changes: 更新了 `excludedPath` 选项
  - version: 6.0.2
    date: 2025-09-23
    changes: 添加了 `outputFormat` 选项
  - version: 6.0.0
    date: 2025-09-21
    changes: 删除了 `dictionaryOutput` 字段和 `i18nextResourcesDir` 字段
  - version: 6.0.0
    date: 2025-09-16
    changes: 添加了 `live` 导入模式
  - version: 6.0.0
    date: 2025-09-04
    changes: 使用 `liveSync` 替换了 `hotReload` 字段，并添加了 `liveSyncPort` 和 `liveSyncURL` 字段
  - version: 5.6.1
    date: 2025-07-25
    changes: 使用 `importMode` 选项替换了 `activateDynamicImport`
  - version: 5.6.0
    date: 2025-07-13
    changes: 将默认的 contentDir 从 `['src']` 更改为 `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: 添加了 `docs` 命令
---

# Intlayer 配置文档

## 概述

Intlayer 配置文件允许您自定义插件的各个方面，如国际化 (internationalization)、中间件和内容处理。本文档提供了配置中每个属性的深度说明。

---

## 目录

<TOC/>

---

## 支持的配置文件格式

Intlayer 接受 JSON, JS, MJS, TS 等配置文件格式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 配置文件示例

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * 显示所有可用选项的 Intlayer 配置文件示例。
 */
const config: IntlayerConfig = {
  /**
   * 国际化设置配置。
   */
  internationalization: {
    /**
     * 应用程序支持的语言环境 (locales) 列表。
     * 默认值: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * 每个字典中必须定义的必需语言环境列表。
     * 如果为空，在 `strict` 模式下所有语言环境都是必需的。
     * 默认值: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * 国际化内容的严格程度。
     * - "strict": 如果任何声明的语言环境缺失或未声明，则报错。
     * - "inclusive": 如果声明的语言环境缺失，则警告。
     * - "loose": 接受任何现有的语言环境。
     * 默认值: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * 当请求的语言环境未找到时使用的默认语言环境。
     * 默认值: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * 控制字典操作和回退行为的设置。
   */
  dictionary: {
    /**
     * 控制字典的导入方式。
     * - "static": 在构建时静态导入。
     * - "dynamic": 使用 Suspense 动态导入。
     * - "fetch": 通过 Live Sync API 动态获取。
     * 默认值: "static"
     */
    importMode: "static",

    /**
     * 使用 AI 自动填充缺失翻译的策略。
     * 可以是布尔值或用于保存填充内容的路径模式。
     * 默认值: true
     */
    fill: true,

    /**
     * 字典文件的物理位置。
     * - "local": 存储在本地文件系统中。
     * - "remote": 存储在 Intlayer CMS 中。
     * - "hybrid": 同时存储在本地和 Intlayer CMS 中。
     * - "plugin" (或任何自定义字符串): 由插件或自定义源提供。
     * 默认值: "local"
     */
    location: "local",

    /**
     * 内容是否应自动转换 (例如：Markdown 到 HTML)。
     * 默认值: false
     */
    contentAutoTransformation: false,
  },

  /**
   * 路由和中间件配置。
   */
  routing: {
    /**
     * 语言环境路由策略。
     * - "prefix-no-default": 为除默认语言环境以外的所有语言环境添加前缀 (例如：/dashboard, /fr/dashboard)。
     * - "prefix-all": 为所有语言环境添加前缀 (例如：/en/dashboard, /fr/dashboard)。
     * - "no-prefix": URL 中没有语言环境。
     * - "search-params": 使用 ?locale=...
     * 默认值: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * 存储用户选择的语言环境的位置。
     * 选项: 'cookie', 'localStorage', 'sessionStorage', 'header' 或它们的数组。
     * 默认值: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * 应用程序 URL 的基础路径。
     * 默认值: ""
     */
    basePath: "",

    /**
     * 针对各语言环境特定路径的自定义 URL 重写规则。
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * 与内容文件查找和处理相关的设置。
   */
  content: {
    /**
     * 扫描字典的文件扩展名。
     * 默认值: ['.content.ts', '.content.js', '.content.json' 等]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * .content 文件所在的目录。
     * 默认值: ["."]
     */
    contentDir: ["src"],

    /**
     * 源代码所在位置。
     * 用于构建优化和代码转换。
     * 默认值: ["."]
     */
    codeDir: ["src"],

    /**
     * 扫描中排除的模式。
     * 默认值: ['node_modules', '.intlayer' 等]
     */
    excludedPath: ["node_modules"],

    /**
     * 开发过程中是否监视更改并重新构建字典。
     * 默认值: 开发环境下为 true
     */
    watch: true,

    /**
     * 用于格式化新创建/更新的 .content 文件的命令。
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * 可视化编辑器 (Visual Editor) 配置。
   */
  editor: {
    /**
     * 是否启用可视化编辑器。
     * 默认值: false
     */
    enabled: true,

    /**
     * 应用程序的 URL，用于源验证 (origin validation)。
     * 默认值: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * 本地编辑器服务器的端口。
     * 默认值: 8000
     */
    port: 8000,

    /**
     * 编辑器的公开 URL。
     * 默认值: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL。
     * 默认值: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * 后端 API URL。
     * 默认值: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * 是否启用实时内容同步。
     * 默认值: false
     */
    liveSync: true,
  },

  /**
   * 基于 AI 的翻译和构建设置。
   */
  ai: {
    /**
     * 要使用的 AI 提供商。
     * 选项: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * 默认值: 'openai'
     */
    provider: "openai",

    /**
     * 要使用的所选提供商的模型。
     */
    model: "gpt-4o",

    /**
     * 提供商 API 密钥。
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * 全局上下文，用于指导 AI 生成翻译。
     */
    applicationContext: "这是一个旅游预订应用程序。",

    /**
     * AI API 的基础路径 URL。
     */
    baseURL: "http://localhost:3000",

    /**
     * 数据序列化 (Data Serialization)
     *
     * 选项:
     * - "json": 默认设置，稳健；消耗更多 Token。
     * - "toon": 消耗 Token 较少，可能不如 JSON 一致。
     *
     * 默认值: "json"
     */
    dataSerialization: "json",
  },

  /**
   * 构建和优化设置。
   */
  build: {
    /**
     * 构建执行模式。
     * - "auto": 在应用程序构建期间自动构建。
     * - "manual": 需要明确的构建命令。
     * 默认值: "auto"
     */
    mode: "auto",

    /**
     * 是否通过删除未使用的字典来优化最终包。
     * 默认值: 生产环境下为 true
     */
    optimize: true,

    /**
     * 生成的字典文件的输出格式。
     * 默认值: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * 指示构建是否应检查 TypeScript 类型。
     * 默认值: false
     */
    checkTypes: false,
  },

  /**
   * 日志记录器 (Logger) 配置。
   */
  log: {
    /**
     * 日志级别。
     * - "default": 标准日志记录。
     * - "verbose": 深入调试日志记录。
     * - "disabled": 禁用日志记录。
     * 默认值: "default"
     */
    mode: "default",

    /**
     * 所有日志消息的前缀。
     * 默认值: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * 系统配置 (高级用途)
   */
  system: {
    /**
     * 存储本地化字典的目录。
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * TypeScript 模块扩充 (module augmentation) 目录。
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * 存储未合并字典的目录。
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * 存储字典类型的目录。
     */
    typesDir: ".intlayer/types",

    /**
     * 存储主要应用程序文件的目录。
     */
    mainDir: ".intlayer/main",

    /**
     * 存储配置文件的目录。
     */
    configDir: ".intlayer/config",

    /**
     * 存储缓存文件的目录。
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * 编译器配置 (高级用途)
   */
  compiler: {
    /**
     * 指示是否启用编译器。
     *
     * - false: 禁用编译器。
     * - true: 启用编译器。
     * - "build-only": 在开发期间跳过编译器，加速启动时间。
     *
     * 默认值: false
     */
    enabled: true,

    /**
     * 定义输出文件的路径。替换 `outputDir`。
     *
     * - `./` 路径相对于组件目录解析。
     * - `/` 路径相对于项目根目录 (`baseDir`) 解析。
     *
     * - 在路径中包含 `{{locale}}` 变量将为每个语言创建单独的字典。
     *
     * 示例:
     * ```ts
     * {
     *   // 在组件旁边创建多语言 .content.ts 文件
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // 使用模板字符串的等效方式
     * }
     * ```
     *
     * ```ts
     * {
     *   // 在项目根目录为每个语言创建集中的 JSON
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // 使用模板字符串的等效方式
     * }
     * ```
     *
     * 变量列表:
     *   - `fileName`: 文件名。
     *   - `key`: 内容键。
     *   - `locale`: 内容语言环境。
     *   - `extension`: 文件扩展名。
     *   - `componentFileName`: 组件文件名。
     *   - `componentExtension`: 组件文件扩展名。
     *   - `format`: 字典格式。
     *   - `componentFormat`: 组件字典格式。
     *   - `componentDirPath`: 组件目录路径。
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * 指示组件在转换后是否应保存。
     * 这样，编译器可以只运行一次以转换应用程序，然后删除。
     */
    saveComponents: false,

    /**
     * 仅在生成的文件中插入内容。对于 i18next 或 ICU MessageFormat 格式的每种语言 JSON 输出非常有用。
     */
    noMetadata: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "", // 为提取的字典键添加可选前缀
  },

  /**
   * 验证字典内容的自定义架构 (Schemas)。
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * 插件配置。
   */
  plugins: [],
};

export default config;
````

---

## 配置参考 (Configuration Reference)

以下部分描述了 Intlayer 中可用的各种配置项。

---

### 国际化配置 (Internationalization Configuration)

定义与国际化相关的设置，包括可用的语言环境和应用程序的默认语言环境。

| 字段              | 类型       | 说明                                                                  | 示例                 | 备注                                                                                                                                                                                                               |
| ----------------- | ---------- | --------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | `string[]` | 应用程序支持的语言环境列表。默认值: `[Locales.ENGLISH]`               | `['en', 'fr', 'es']` |                                                                                                                                                                                                                    |
| `requiredLocales` | `string[]` | 应用程序中必需的语言环境列表。默认值: `[]`                            | `[]`                 | 如果为空，在 `strict` 模式下所有语言环境都是必需的。请确保必需的语言环境也在 `locales` 字段中定义。                                                                                                                |
| `strictMode`      | `string`   | 确保使用 TypeScript 稳健地实现国际化内容。默认值: `inclusive`         |                      | 如果为 `"strict"`: `t` 函数要求定义每个声明的语言环境 — 如果有任何缺失或未声明，则抛出错误。如果为 `"inclusive"`: 对缺失的语言环境进行警告，但接受现有的未声明语言环境。如果为 `"loose"`: 接受任何现有的语言环境。 |
| `defaultLocale`   | `string`   | 当请求的语言环境未找到时使用的默认语言环境。默认值: `Locales.ENGLISH` | `'en'`               | 当 URL、Cookie 或 Header 中未指定语言环境时，用于确定语言环境。                                                                                                                                                    |

---

### 编辑器配置 (Editor Configuration)

定义与集成编辑器相关的设置，包括服务器端口和活动状态。

| 字段                         | 类型                      | 说明                                                                                                                                                 | 示例                                                                                  | 备注                                                                                                                                |
| ---------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | 应用程序的 URL。默认值: `''`                                                                                                                         | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | 用于出于安全原因限制编辑器的源 (origin)。如果设置为 `'*'`，则可以从任何源访问编辑器。                                               |
| `port`                       | `number`                  | 可视化编辑器服务器使用的端口。默认值: `8000`                                                                                                         |                                                                                       |                                                                                                                                     |
| `editorURL`                  | `string`                  | 编辑器服务器的 URL。默认值: `'http://localhost:8000'`                                                                                                | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | 用于限制可以与应用程序交互的源。如果设置为 `'*'`，则可从任何源访问。在更改端口或编辑器托管在其他域名时必须进行设置。                |
| `cmsURL`                     | `string`                  | Intlayer CMS URL。默认值: `'https://intlayer.org'`                                                                                                   | `'https://intlayer.org'`                                                              |                                                                                                                                     |
| `backendURL`                 | `string`                  | 后端服务器 URL。默认值: `https://back.intlayer.org`                                                                                                  | `http://localhost:4000`                                                               |                                                                                                                                     |
| `enabled`                    | `boolean`                 | 指示应用是否将与可视化编辑器交互。默认值: `true`                                                                                                     | `process.env.NODE_ENV !== 'production'`                                               | 如果为 `false`，则编辑器无法与应用交互。针对特定环境禁用它可以增强安全性。                                                          |
| `clientId`                   | `string &#124; undefined` | 允许 intlayer 包使用 oAuth2 在后端进行身份验证。要获取访问令牌，请访问 [intlayer.org/project](https://app.intlayer.org/project)。默认值: `undefined` |                                                                                       | 请保密；存储在环境变量中。                                                                                                          |
| `clientSecret`               | `string &#124; undefined` | 允许 intlayer 包使用 oAuth2 在后端进行身份验证。要获取访问令牌，请访问 [intlayer.org/project](https://app.intlayer.org/project)。默认值: `undefined` |                                                                                       | 请保密；存储在环境变量中。                                                                                                          |
| `dictionaryPriorityStrategy` | `string`                  | 当本地字典和远程字典同时存在时字典优先级策略。默认值: `'local_first'`                                                                                | `'distant_first'`                                                                     | `'distant_first'`: 远程优先于本地。 `'local_first'`: 本地优先于远程。                                                               |
| `liveSync`                   | `boolean`                 | 指示当在 CMS / 可视化编辑器 / 后端检测到更改时，应用服务器是否应热重载内容。默认值: `true`                                                           | `true`                                                                                | 当添加/更新字典时，应用会更新页面内容。实时同步将内容外包给另一个服务器，这可能会对性能产生轻微影响。建议将两者托管在同一台机器上。 |
| `liveSyncPort`               | `number`                  | 实时同步服务器端口。默认值: `4000`                                                                                                                   | `4000`                                                                                |                                                                                                                                     |
| `liveSyncURL`                | `string`                  | 实时同步服务器 URL。默认值: `'http://localhost:{liveSyncPort}'`                                                                                      | `'https://example.com'`                                                               | 默认指向 localhost；可以更改为远程实时同步服务器。                                                                                  |

### 路由配置 (Routing Configuration)

控制路由行为的设置，包括 URL 结构、语言环境存储和中间件处理。

| 字段       | 类型                                                                                                                                                 | 说明                                                                                           | 示例                                                                                                                                                                                     | 备注                                                                                                                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | 处理语言环境的 URL 路由模式。默认值: `'prefix-no-default'`                                     | `'prefix-no-default'`: `/dashboard` (en) 或 `/fr/dashboard` (fr)。 `'prefix-all'`: `/en/dashboard`。 `'no-prefix'`: 语言环境通过其他方式处理。 `'search-params'`: `/dashboard?locale=fr` | 不影响 Cookie 或语言环境存储管理。                                                                                                                                                                        |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | 在客户端存储语言环境的配置。默认值: `['cookie', 'header']`                                     | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                            | 请参阅下方的“存储选项”表。                                                                                                                                                                                |
| `basePath` | `string`                                                                                                                                             | 应用程序 URL 的基础路径。默认值: `''`                                                          | `'/my-app'`                                                                                                                                                                              | 如果应用程序位于 `https://example.com/my-app`，则 basePath 为 `'/my-app'`，URL 变为 `https://example.com/my-app/en`。                                                                                     |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | 自定义 URL 重写规则，针对特定路径覆盖默认路由模式。支持动态参数 `[param]`。默认值: `undefined` | 请参阅下方示例                                                                                                                                                                           | 重写规则优先于 `mode`。适用于 Next.js 和 Vite。`getLocalizedUrl()` 会自动应用匹配的规则。请参阅 [自定义 URL 重写](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/custom_url_rewrites.md)。 |

**`rewrite` 示例**:

```typescript
routing: {
  mode: "prefix-no-default", // 回退策略
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### 存储选项 (Storage Options)

| 值                 | 说明                                                    | 备注                                                                                                                                                        |
| ------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | 将语言环境存储在 Cookie 中 — 客户端和服务器端均可访问。 | 为了符合 GDPR，请确保已获得适当的用户同意。可通过 `CookiesAttributes` 自定义 (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`)。 |
| `'localStorage'`   | 将语言环境存储在浏览器中，没有过期日期 — 仅限客户端。   | 除非明确清除，否则不会过期。Intlayer 代理无法访问。可通过 `StorageAttributes` 自定义 (`{ type: 'localStorage', name: 'custom-locale' }`)。                  |
| `'sessionStorage'` | 在页面会话期间存储语言环境 — 仅限客户端。               | 关闭标签页/窗口时将被清除。Intlayer 代理无法访问。可通过 `StorageAttributes` 自定义 (`{ type: 'sessionStorage', name: 'custom-locale' }`)。                 |
| `'header'`         | 通过 HTTP 头存储或传输语言环境 — 仅限服务器端。         | 对于 API 调用非常有用。客户端无法访问。可通过 `StorageAttributes` 自定义 (`{ type: 'header', name: 'custom-locale' }`)。                                    |

#### Cookie 属性 (Cookie Attributes)

使用 Cookie 存储时，您可以配置额外的 Cookie 属性：

| 字段       | 类型                                  | 说明                                     |
| ---------- | ------------------------------------- | ---------------------------------------- |
| `name`     | `string`                              | Cookie 名称。默认值: `'INTLAYER_LOCALE'` |
| `domain`   | `string`                              | Cookie 域名。默认值: `undefined`         |
| `path`     | `string`                              | Cookie 路径。默认值: `undefined`         |
| `secure`   | `boolean`                             | 要求 HTTPS。默认值: `undefined`          |
| `httpOnly` | `boolean`                             | HTTP-only 标志。默认值: `undefined`      |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite 策略。                          |
| `expires`  | `Date &#124; number`                  | 过期日期或天数。默认值: `undefined`      |

#### 语言环境存储属性 (Locale Storage Attributes)

使用 localStorage 或 sessionStorage 时：

| 字段   | 类型                                     | 说明                                      |
| ------ | ---------------------------------------- | ----------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | 存储类型。                                |
| `name` | `string`                                 | 存储键的名称。默认值: `'INTLAYER_LOCALE'` |

#### 配置示例

以下是新 v7 路由结构的一些常见配置示例：

**基础配置 (默认)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**符合 GDPR 的配置**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**搜索参数模式 (Search Parameters Mode)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**带自定义存储的无前缀模式 (No Prefix Mode)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**带有动态路径的自定义 URL 重写**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // 针对未重写路径的回退策略
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### 内容配置 (Content Configuration)

与应用程序中的内容处理相关的设置 (目录名、文件扩展名和衍生配置)。

| 字段             | 类型       | 说明                                                                                                                                                            | 示例                                | 备注                                                     |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------- |
| `watch`          | `boolean`  | 指示 Intlayer 是否应监视内容声明文件的更改以重新构建字典。默认值: `process.env.NODE_ENV === 'development'`                                                      |                                     |                                                          |
| `fileExtensions` | `string[]` | 用于扫描内容声明文件的文件扩展名。默认值: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                          |
| `contentDir`     | `string[]` | 内容声明文件所在目录的路径。默认值: `['.']`                                                                                                                     | `['src/content']`                   |                                                          |
| `codeDir`        | `string[]` | 应用程序源代码文件所在目录的路径。默认值: `['.']`                                                                                                               | `['src']`                           | 用于优化构建，并确保代码转换和热重载仅应用于必要的文件。 |
| `excludedPath`   | `string[]` | 内容扫描中排除的路径。默认值: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                         | `['src/styles']`                    |                                                          |
| `formatCommand`  | `string`   | 将为格式化新创建或更新的内容文件而运行的命令。默认值: `undefined`                                                                                               | `'npx prettier --write "{{file}}"'` | 在内容提取期间或通过可视化编辑器使用。                   |

---

### 字典配置 (Dictionary Configuration)

控制字典操作，包括自动填充行为和内容生成。

此字典配置有两个主要目的：

1. **默认值**：在创建内容声明文件时定义默认值
2. **回退行为**：当未定义特定字段时提供回退值，允许您全局定义字典操作行为

有关内容声明文件以及配置值如何应用的更多信息，请参阅 [内容文件文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

| 字段                        | 类型                                                                                            | 说明                                                                | 示例           | 备注                                                                                                                                                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | 控制自动填充（AI 翻译）输出文件的生成方式。默认值: `true`           | 请参阅下方示例 | `true`: 默认路径（与源文件相同）。`false`: 禁用。字符串/函数模板为每个语言环境生成文件。每个语言环境的对象：每个语言环境映射到其自己的模式；`false` 跳过该语言环境。包含 `{{locale}}` 会触发每个语言环境的生成。字典级别的 `fill` 始终优先于此全局配置。 |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | 控制字典的导入方式。默认值: `'static'`                              | `'dynamic'`    | `'static'`: 静态导入。`'dynamic'`: 通过 Suspense 动态导入。`'fetch'`: 通过实时同步 API 动态获取。不影响 `getIntlayer`, `getDictionary`, `useDictionary` 等。                                                                                             |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | 字典存储的位置。默认值: `'local'`                                   | `'remote'`     | `'local'`: 文件系统。`'remote'`: Intlayer CMS。`'hybrid'`: 两者。                                                                                                                                                                                        |
| `contentAutoTransformation` | `boolean`                                                                                       | 内容文件是否应自动转换 (例如：从 Markdown 到 HTML)。默认值: `false` | `true`         | 有助于通过 @intlayer/markdown 处理 Markdown 字段。                                                                                                                                                                                                       |

**`fill` 示例**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### AI 配置 (AI Configuration)

定义 Intlayer AI 驱动功能 (如翻译构建) 的设置。

| 字段                 | 类型                   | 说明                                                 | 示例                                        | 备注                                                               |
| -------------------- | ---------------------- | ---------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------ |
| `provider`           | `string`               | 要使用的 AI 提供商。                                 | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                    |
| `model`              | `string`               | 要使用的 AI 模型。                                   | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                    |
| `apiKey`             | `string`               | 所选提供商的 API 密钥。                              | `process.env.OPENAI_API_KEY`                |                                                                    |
| `applicationContext` | `string`               | 有关您应用程序的额外上下文，以提高 AI 翻译的准确性。 | `'面向儿童的学习平台。'`                    |                                                                    |
| `baseURL`            | `string`               | API 调用的可选基础 URL。                             |                                             | 如果您使用代理或本地 AI 部署，这很有用。                           |
| `dataSerialization`  | `'json' &#124; 'toon'` | 定义如何向 AI 发送数据。默认值: `'json'`             | `'json'`                                    | `'json'`: 更稳健精确。 `'toon'`: 消耗 Token 较少，但可能不太稳定。 |

---

### 构建配置 (Build Configuration)

Intlayer 构建流程和优化设置。

| 字段           | 类型                     | 说明                                                                  | 示例 | 备注 |
| -------------- | ------------------------ | --------------------------------------------------------------------- | ---- | ---- |
| `mode`         | `'auto' &#124; 'manual'` | 指示 Intlayer 是否应在应用预构建步骤期间自动运行。默认值: `'auto'`    |      |      |
| `optimize`     | `boolean`                | 指示编译后的字典是否应针对运行时进行优化。默认值: 生产环境下为 `true` |      |      |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | 生成的字典文件的输出格式。默认值: `['cjs', 'esm']`                    |      |      |
| `checkTypes`   | `boolean`                | 指示 Intlayer 是否应检查生成文件中的类型。默认值: `false`             |      |      |

---

### 系统配置 (System Configuration)

这些设置面向高级用例和 Intlayer 内部配置。

| 字段                      | 类型     | 说明                      | 默认值                            |
| ------------------------- | -------- | ------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | 编译后字典的目录。        | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | TypeScript 模块扩充目录。 | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | 未合并字典的目录。        | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | 生成类型的目录。          | `'.intlayer/types'`               |
| `mainDir`                 | `string` | 主要 Intlayer 文件目录。  | `'.intlayer/main'`                |
| `configDir`               | `string` | 编译后的配置文件目录。    | `'.intlayer/config'`              |
| `cacheDir`                | `string` | 缓存文件目录。            | `'.intlayer/cache'`               |

---

### 编译器配置 (Compiler Configuration)

Intlayer 编译器 (`intlayer compiler`) 的设置。

| 字段                  | 类型                     | 说明                                                  | 默认值  |
| --------------------- | ------------------------ | ----------------------------------------------------- | ------- |
| `enabled`             | `boolean`                | 指示编译器是否处于活动状态。                          | `false` |
| `output`              | `string &#124; Function` | 提取的字典的输出路径。                                |         |
| `saveComponents`      | `boolean`                | 指示是否应使用转换后的版本覆盖原始源文件。            | `false` |
| `noMetadata`          | `boolean`                | 如果为 `true`，编译器将不会在生成的文件中包含元数据。 | `false` |
| `dictionaryKeyPrefix` | `string`                 | 可选的字典键前缀。                                    | `''`    |

---

### 日志记录器配置 (Logger Configuration)

自定义 Intlayer 日志输出的设置。

| 字段     | 类型                                           | 说明           | 默认值         |
| -------- | ---------------------------------------------- | -------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | 日志模式。     | `'default'`    |
| `prefix` | `string`                                       | 日志消息前缀。 | `'[intlayer]'` |

---

### 自定义架构 (Custom Schemas)

| 字段      | 类型                        | 说明                                  |
| --------- | --------------------------- | ------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | 允许您定义 Zod 架构来验证字典的结构。 |

---

### 插件 (Plugins)

| 字段      | 类型               | 说明                         |
| --------- | ------------------ | ---------------------------- |
| `plugins` | `IntlayerPlugin[]` | 要激活的 Intlayer 插件列表。 |
