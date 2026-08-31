---
createdAt: 2024-08-13
updatedAt: 2026-08-30
title: 配置
description: 了解如何为您的应用程序配置 Intlayer。了解可用于根据您的需求自定义 Intlayer 的各种设置和选项。
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
  - version: 9.3.3
    date: 2026-08-22
    changes: "安装 `@intlayer/analytics` 后默认启用分析功能"
  - version: 9.1.3
    date: 2026-08-06
    changes: "将 `routing.enableProxy` 改为三态：未设置（auto）、`true`、`false`"
  - version: 9.0.0
    date: 2026-07-11
    changes: "添加 `analytics` 配置"
  - version: 9.0.0
    date: 2026-06-24
    changes: "Add `enableProxy` option to the routing configuration"
  - version: 8.10.0
    date: 2026-06-17
    changes: "向字典配置添加 `format` 选项"
  - version: 8.9.4
    date: 2026-05-12
    changes: "添加对 LM Studio 提供者的支持"
  - version: 8.7.0
    date: 2026-04-08
    changes: "在构建配置中添加了 `prune` 和 `minify` 选项"
  - version: 8.7.0
    date: 2026-04-03
    changes: "添加了 `currentDomain` 选项"
  - version: 8.4.0
    date: 2026-03-20
    changes: "为 'compiler.output' 和 'dictionary.fill' 添加了按区域设置的路径定义支持"
  - version: 8.3.0
    date: 2026-03-11
    changes: "将 'baseDir' 从 'content' 配置移至 'system' 配置"
  - version: 8.2.0
    date: 2026-03-09
    changes: "更新了编译器选项，添加了对 'output' 和 'noMetadata' 的支持"
  - version: 8.1.7
    date: 2026-02-25
    changes: "更新了编译器选项"
  - version: 8.1.5
    date: 2026-02-23
    changes: "添加了 'build-only' 编译器选项和字典前缀"
  - version: 8.0.6
    date: 2026-02-12
    changes: "添加了对 Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face 和 Together AI 提供商的支持"
  - version: 8.0.5
    date: 2026-02-06
    changes: "在 AI 配置中添加了 `dataSerialization`"
  - version: 8.0.0
    date: 2026-01-24
    changes: "将 `live` 导入模式重命名为 `fetch`，以更好地描述底层机制。"
  - version: 8.0.0
    date: 2026-01-22
    changes: "将构建配置 `importMode` 移至 `dictionary` 配置。"
  - version: 8.0.0
    date: 2026-01-22
    changes: "在路由配置中添加了 `rewrite` 选项"
  - version: 8.0.0
    date: 2026-01-18
    changes: "将系统配置从内容配置中分离。将内部路径移至 `system` 属性。添加了 `codeDir` 以将内容文件与代码转换分离。"
  - version: 8.0.0
    date: 2026-01-18
    changes: "添加了字典选项 `location` 和 `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "添加了对 JSON5 和 JSONC 文件格式的支持"
  - version: 7.5.0
    date: 2025-12-17
    changes: "添加了 `buildMode` 选项"
  - version: 7.0.0
    date: 2025-10-25
    changes: "添加了 `dictionary` 配置"
  - version: 7.0.0
    date: 2025-10-21
    changes: "将 `middleware` 替换为 `routing` 配置"
  - version: 7.0.0
    date: 2025-10-12
    changes: "添加了 `formatCommand` 选项"
  - version: 6.2.0
    date: 2025-10-12
    changes: "更新了 `excludedPath` 选项"
  - version: 6.0.2
    date: 2025-09-23
    changes: "添加了 `outputFormat` 选项"
  - version: 6.0.0
    date: 2025-09-21
    changes: "删除了 `dictionaryOutput` 和 `i18nextResourcesDir` 字段"
  - version: 6.0.0
    date: 2025-09-16
    changes: "添加了 `live` 导入模式"
  - version: 6.0.0
    date: 2025-09-04
    changes: "将 `hotReload` 字段替换为 `liveSync` 并添加了 `liveSyncPort`、`liveSyncURL` 字段"
  - version: 5.6.1
    date: 2025-07-25
    changes: "将 `activateDynamicImport` 替换为 `importMode` 选项"
  - version: 5.6.0
    date: 2025-07-13
    changes: "将默认 `contentDir` 从 `['src']` 改为 `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "添加了 `docs` 命令"
author: aymericzip
---

# Intlayer 配置文档

## 概述

Intlayer 配置文件允许您自定义插件的各个方面，例如国际化 (i18n)、中间件和内容管理。本文档提供了配置中每个属性的详细说明。

---

## 目录

<TOC/>

---

## 配置文件支持

Intlayer 接受 JSON、JS、MJS 和 TS 配置文件格式：

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
import { syncJSON } from "@intlayer/sync-json-plugin";
import { z } from "zod";

/**
 * 包含所有可用选项的 Intlayer 配置文件示例。
 */
const config: IntlayerConfig = {
  /**
   * 国际化设置配置。
   */
  internationalization: {
    /**
     * 应用程序中支持的区域设置列表。
     * 默认值：[Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * 每个字典中必须定义的必需区域设置列表。
     * 如果为空，则在 `strict` 模式下所有区域设置都是必需的。
     * 默认值：[]
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * 国际化内容的严格级别。
     * - "strict": 如果缺少已声明的区域设置或使用未声明的区域设置，则报错。
     * - "inclusive": 如果缺少已声明的区域设置，则发出警告。
     * - "loose": 接受任何现有的区域设置。
     * 默认值："inclusive"
     */
    strictMode: "inclusive",

    /**
     * 如果请求的区域设置不可用，则用作回退的默认区域设置。
     * 默认值：Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * 控制字典操作和缺失内容行为的设置。
   */
  dictionary: {
    /**
     * 控制字典的导入方式。
     * - "static": 构建时静态导入。
     * - "dynamic": 使用 Suspense 进行动态导入。
     * - "fetch": 通过 Live Sync API 进行动态获取。
     * 默认值："static"
     */
    importMode: "static",

    /**
     * 使用 AI 自动填充缺失翻译的策略。
     * 可以是布尔值或用于保存填充内容的路径模式。
     * 默认值：true
     */
    fill: true,

    /**
     * 字典文件的物理位置。
     * - "local": 存储在本地文件系统中。
     * - "remote": 存储在 Intlayer CMS 中。
     * - "hybrid": 同时存储在本地和 Intlayer CMS 中。
     * - "plugin" (或任何自定义字符串): 由插件或自定义源提供。
     * 默认值："local"
     */
    location: "local",

    /**
     * 是否自动转换内容（例如将 Markdown 转换为 HTML）。
     * 默认值：false
     */
    contentAutoTransformation: false,
  },

  /**
   * 路由和中间件配置。
   */
  routing: {
    /**
     * 区域设置路由策略。
     * - "prefix-no-default": 除默认语言外所有语言都有前缀（例如 /dashboard, /fr/dashboard）。
     * - "prefix-all": 所有语言都有前缀（例如 /en/dashboard, /fr/dashboard）。
     * - "no-prefix": URL 中没有区域设置。
     * - "search-params": 使用 ?locale=...
     * 默认值："prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * 启用 Intlayer 语言环境路由代理（中间件）。
     * 负责在 dev、preview 和 SSR 中进行语言环境检测、重定向和重写。
     * - 未设置（auto）：dev 和 preview 服务器忽略 Cookie 和请求头中存储的语言环境，
     *   保持路由由 URL 驱动。前缀仍会解析，语言环境仍会持久化，
     *   Accept-Language 检测仍然生效。生产环境下的行为与 `true` 相同。
     * - true：在所有环境中启用完整行为。
     * - false：不进行语言环境路由。
     * 默认值：undefined（auto）
     */
    enableProxy: undefined,

    /**
     * 用户选择的区域设置存储在哪里。
     * 选项：'cookie', 'localStorage', 'sessionStorage', 'header' 或这些选项的数组。
     * 默认值：['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * 应用程序 URL 的基础路径。
     * 默认值：""
     */
    basePath: "",

    /**
     * 特定区域设置路径的自定义 URL 重写规则。
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * 将区域设置映射到域主机名以进行基于域的路由。
     * 这些区域设置的 URL 将是绝对的（例如，https://intlayer.cn/）。
     * 域意味着区域设置，因此不会向路径添加区域设置前缀。
     * 默认值：undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * 用于发现和处理内容文件的设置。
   */
  content: {
    /**
     * 扫描字典的文件扩展名。
     * 默认值：['.content.ts', '.content.js', '.content.json' 等]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * .content 文件所在的目录。
     * 默认值：["."]
     */
    contentDir: ["src"],

    /**
     * 源代码目录。
     * 用于构建优化和代码转换。
     * 默认值：["."]
     */
    codeDir: ["src"],

    /**
     * 扫描中排除的模式。
     * 默认值：['node_modules', '.intlayer' 等]
     */
    excludedPath: ["node_modules"],

    /**
     * 是否在开发过程中监控更改并重新生成字典。
     * 默认值：开发模式下为 true
     */
    watch: true,

    /**
     * 格式化新创建 / 更新的 .content 文件的命令。
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * 可视化编辑器配置。
   */
  editor: {
    /**
     * 是否启用可视化编辑器。
     * 默认值：false
     */
    enabled: true,

    /**
     * 您的应用程序 URL，用于源验证。
     * 默认值：""
     */
    applicationURL: "http://localhost:3000",

    /**
     * 本地编辑器服务器的端口。
     * 默认值：8000
     */
    port: 8000,

    /**
     * 编辑器的公共 URL。
     * 默认值："http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS 的 URL。
     * 默认值："https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * 后端 API 服务器的 URL。
     * 默认值："https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * 是否启用实时内容同步。
     * 默认值：false
     */
    liveSync: true,
  },

  /**
   * 分析（analytics）配置。
   */
  analytics: {
    /**
     * 是否启用分析数据收集（页面浏览量、内容曝光、A/B 事件）。
     * 需要安装 `@intlayer/analytics` 并设置 `editor.clientId` 以进行归因。
     * 默认值：true
     */
    enabled: true,

    /**
     * 自动批量发送到后端之间的毫秒数。
     * 默认值：20000
     */
    flushInterval: 20000,

    /**
     * 要记录的会话比例，从 0（不记录）到 1（全部记录）。
     * 默认值：1
     */
    sampleRate: 1,
  },

  /**
   * 使用 AI 进行翻译和生成的设置。
   */
  ai: {
    /**
     * 使用的 AI 提供商。
     * 选项：'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai', 'lmstudio', 'moonshotai'
     * 默认值：'openai'
     */
    provider: "openai",

    /**
     * 所选提供商使用的模型。
     */
    model: "gpt-4o",

    /**
     * 提供商的 API 密钥。
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * 引导 AI 生成翻译时的全局上下文。
     */
    applicationContext: "这是一个旅游预订应用程序。",

    /**
     * AI API 的基础 URL。
     */
    baseURL: "http://localhost:3000",

    /**
     * 数据序列化方式
     *
     * 选项：
     * - "json": 默认，可靠；使用更多 token。
     * - "toon": 更快，更少 token，但不如 JSON 稳定。
     *
     * 默认值："json"
     */
    dataSerialization: "json",
  },

  /**
   * 构建和优化设置。
   */
  build: {
    /**
     * 构建执行模式。
     * - "auto": 应用程序构建期间自动构建。
     * - "manual": 需要显式构建命令。
     * 默认值："auto"
     */
    mode: "auto",

    /**
     * 是否通过删除未使用的字典来优化应用程序包。
     * 默认值：生产环境中为 true
     */
    optimize: true,

    /**
     * 压缩字典以减小包体大小。
     * 默认值：true
     *
     * 注意：
     * - 如果禁用 `optimize`，此选项将被忽略。
     * - 如果 `editor.enabled` 为 true，此选项将被忽略。
     */
    minify: true,

    /**
     * 清除字典中未使用的键。
     * 默认值：true
     *
     * 注意：
     * - 如果禁用 `optimize`，此选项将被忽略。
     */
    purge: true,

    /**
     * 按使用它们的代码分割边界对各语言的字典分块进行分组，使懒加载页面只需一次请求即可获取其内容。
     * 默认值：true
     *
     * 注意：
     * - 仅适用于使用 `importMode: 'dynamic'` 的字典。
     */
    chunkGrouping: true,

    /**
     * 让字典与使用它的分块一起加载，而不是等该分块渲染后再获取。读取将同步渲染而不是挂起，因此导航时不再闪烁加载状态。
     * 默认值：true
     *
     * 注意：
     * - 仅等待已解析的语言，因此页面只会下载它所呈现的语言。
     */
    dictionariesPreload: true,

    /**
     * 生成的字典文件的输出格式。
     * 默认值：['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * 是否在构建期间执行 TypeScript 类型检查。
     * 默认值：false
     */
    checkTypes: false,
  },

  /**
   * 日志记录器配置。
   */
  log: {
    /**
     * 日志级别。
     * - "default": 标准日志记录。
     * - "verbose": 详细调试日志记录。
     * - "disabled": 禁用日志记录。
     * 默认值："default"
     */
    mode: "default",

    /**
     * 日志中所有消息的前缀。
     * 默认值："[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * 系统配置（用于高级用法）
   */
  system: {
    /**
     * 存储本地化字典的目录。
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * 模块扩充 (module augmentation) 的目录。
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
     * 应用程序主文件所在的目录。
     */
    mainDir: ".intlayer/main",

    /**
     * 已编译配置文件的目录。
     */
    configDir: ".intlayer/config",

    /**
     * 缓存文件的目录。
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * 编译器配置（用于高级用法）
   */
  compiler: {
    /**
     * 是否启用编译器。
     *
     * - false: 禁用编译器。
     * - true: 启用编译器。
     * - "build-only": 开发期间跳过编译器以加快启动速度。
     *
     * 默认值：false
     */
    enabled: true,

    /**
     * 确定输出文件路径。替换 `outputDir`。
     *
     * - 以 `./` 开头的路径相对于组件目录解析。
     * - 以 `/` 开头的路径相对于项目基础目录 (`baseDir`) 解析。
     *
     * - 路径中存在 `{{locale}}` 变量时，会启用按区域设置生成字典。
     *
     * 示例：
     * ```ts
     * {
     *   // 在组件旁边生成多语言 .content.ts 文件
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // 通过模板字符串等效
     * }
     * ```
     *
     * ```ts
     * {
     *   // 在项目基础目录中生成按区域设置的集中式 JSON
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // 通过模板字符串等效
     * }
     * ```
     *
     * 变量列表：
     *   - `fileName`: 文件名。
     *   - `key`: 内容键。
     *   - `locale`: 内容区域设置。
     *   - `extension`: 文件扩展名。
     *   - `componentFileName`: 组件文件名。
     *   - `componentExtension`: 组件文件扩展名。
     *   - `format`: 字典格式。
     *   - `componentFormat`: 组件字典格式。
     *   - `componentDirPath`: 组件目录路径。
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * 转换组件后是否保存它们。
     *
     * - 如果为 `true`，编译器将重写磁盘中的组件文件。因此转换将是永久性的，编译器将跳过下一次进程的转换。这样，编译器可以在转换应用后被移除。
     *
     * - 如果为 `false`，编译器仅在构建输出中将 `useIntlayer()` 函数调用注入代码中，并保持基础代码库不变。转换将仅在内存中进行。
     */
    saveComponents: false,

    /**
     * 生成的文件中仅保留内容。适用于按区域设置的 i18next 格式或 ICU MessageFormat JSON 输出。
     */
    noMetadata: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "", // 为提取的字典键添加可选前缀
  },

  /**
   * 用于字典内容验证的自定义架构。
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * 字典配置。
   */
  dictionary: {
    /**
     * 控制如何导入字典。
     * - "static": 在构建时静态导入。
     * - "dynamic": 使用 Suspense 动态导入。
     * - "fetch": 通过实时同步 API 动态获取。
     */
    importMode: "static",

    /**
     * 项目中所有字典的默认消息格式。
     * - 'intlayer': 原生 intlayer 格式 (默认)。
     * - 'icu': ICU 消息格式。
     * - 'i18next': i18next 格式。
     * - 'vue-i18n': Vue I18n 格式。
     * - 'po': GNU Gettext PO 格式。
     */
    format: "icu",
  },

  /**
   * 插件配置。
   */
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
    }),
  ],
};

export default config;
````

---

## 配置参考指南

以下是 Intlayer 中可用的各种配置参数的详细说明。

---

### 国际化配置 (Internationalization)

定义国际化相关的设置，包括可用区域设置和默认区域设置。

| 字段              | 说明                                                 | 类型       | 默认值              | 示例                 | 备注                                                                                                                                                                                                                               |
| ----------------- | ---------------------------------------------------- | ---------- | ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | 应用程序中支持的区域设置列表。                       | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                    |
| `requiredLocales` | 应用程序中必需的区域设置列表。                       | `string[]` | `[]`                | `[]`                 | • 如果为空，则在 `strict` 模式下所有区域设置都是必需的。<br/>• 请确保必需的区域设置也已在 `locales` 字段中定义。                                                                                                                   |
| `strictMode`      | 使用 TypeScript 确保国际化内容的强实现。             | `string`   | `'inclusive'`       |                      | • 如果为 `"strict"`: 为 `t` 函数定义每个已声明的区域设置是强制性的--如缺少或未声明则报错。<br/>• 如果为 `"inclusive"`: 对缺少的区域设置发出警告，但允许使用未声明的现有区域设置。<br/>• 如果为 `"loose"`: 接受任何现有的区域设置。 |
| `defaultLocale`   | 如果请求的区域设置不可用，则用作回退的默认区域设置。 | `string`   | `Locales.ENGLISH`   | `'en'`               | 如果 URL、cookie 或 header 中未指定区域设置，则用于确定区域设置。                                                                                                                                                                  |

---

### 编辑器配置 (Editor)

定义可视化编辑器的设置，包括服务器端口和启用状态。

| 字段                         | 说明                                                                                                                             | 类型                              | 默认值                              | 示例                                                                                            | 备注                                                                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | 您的应用程序 URL。                                                                                                               | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • 用于出于安全原因限制编辑器的源。<br/>• 如果设置为 `'*'`，则可以从任何源访问编辑器。                                                           |
| `port`                       | 可视化编辑器服务器的端口。                                                                                                       | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                 |
| `editorURL`                  | 编辑器服务器的 URL。                                                                                                             | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • 用于限制可以与应用程序通信的源。<br/>• 如果设置为 `'*'`，则可以从任何源访问。<br/>• 如果端口已更改或编辑器托管在其他域，则需要设置此项。      |
| `cmsURL`                     | Intlayer CMS 的 URL。                                                                                                            | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                 |
| `backendURL`                 | 后端服务器的 URL。                                                                                                               | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                 |
| `enabled`                    | 应用程序是否应与可视化编辑器通信。                                                                                               | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • 如果为 `false`，编辑器将无法与应用程序通信。<br/>• 在某些环境中禁用此项可提高安全性。                                                         |
| `clientId`                   | 允许 intlayer 包通过 oAuth2 向后端进行身份验证。访问 [intlayer.org/project](https://app.intlayer.org/project) 获取您的访问令牌。 | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | 应保持私密；使用环境变量。                                                                                                                      |
| `clientSecret`               | 允许 intlayer 包通过 oAuth2 向后端进行身份验证。访问 [intlayer.org/project](https://app.intlayer.org/project) 获取您的访问令牌。 | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | 应保持私密；使用环境变量。                                                                                                                      |
| `dictionaryPriorityStrategy` | 当同时存在本地和远程字典时的字典优先级策略。                                                                                     | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: 远程字典优先于本地字典。<br/>• `'local_first'`: 本地字典优先于远程字典。                                                   |
| `liveSync`                   | 当在 CMS <br/> 可视化编辑器 <br/> 后端服务器中检测到更改时，应用程序服务器是否立即构建内容重新加载。                             | `boolean`                         | `true`                              | `true`                                                                                          | • 添加/更新字典时刷新应用程序页面内容。<br/>• Live Sync 接受来自另一台服务器的内容，这可能会稍微影响性能。<br/>• 建议将两者托管在同一台机器上。 |
| `liveSyncPort`               | Live Sync 服务器的端口。                                                                                                         | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                 |
| `liveSyncURL`                | Live Sync 服务器的 URL。                                                                                                         | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | 默认指向本地主机；可以更改为指向远程实时同步服务器。                                                                                            |

### 分析配置 (Analytics)

定义与 Intlayer 分析相关的设置：收集实际展示给用户的内容（页面浏览量、内容曝光），并支持内容的 A/B 测试。

分析功能采用选择退出（opt-out）模式：默认启用，只要安装了 `@intlayer/analytics` 包**并且**配置了用于归因的项目密钥（`editor.clientId`），即开始收集数据。将 `analytics.enabled` 设为 `false`（或不安装该包），整个分析集成就会从应用程序打包结果中被移除（死代码消除）。

| 字段            | 描述                                                   | 类型      | 默认值  | 示例    | 说明                                                                                                                       |
| --------------- | ------------------------------------------------------ | --------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | 启用分析数据收集（页面浏览量、内容曝光、A/B 事件）。   | `boolean` | `true`  | `false` | 需要安装 `@intlayer/analytics` 并设置 `editor.clientId` 以进行归因；否则即使 `enabled` 为 `true`，分析功能仍保持禁用状态。 |
| `flushInterval` | 自动批量发送到后端之间的毫秒数。                       | `number`  | `20000` | `10000` |                                                                                                                            |
| `sampleRate`    | 要记录的会话比例，从 `0`（不记录）到 `1`（全部记录）。 | `number`  | `1`     | `0.5`   | 采样按会话确定性进行，因此被记录的会话会报告其所有事件（不会出现部分漏斗）。                                               |

---

### 路由配置 (Routing)

控制路由行为的设置，包括 URL 结构、区域设置存储和中间件管理。

| 字段          | 说明                                                                                                                                | 类型                                                                                                                                                                                                         | 默认值                 | 示例                                                                                                                                                                                    | 备注                                                                                                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`        | 区域设置管理的 URL 路由模式。                                                                                                       | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) 或 `/fr/dashboard` (fr)。 `'prefix-all'`: `/en/dashboard` 。 `'no-prefix'`: 区域设置以其他方式管理。 `'search-params'`: `/dashboard?locale=fr` | 不影响 cookie 管理或本地存储。                                                                                                                                                                                                                                                                         |
| `enableProxy` | 启用 Intlayer 语言环境路由代理（中间件）。                                                                                          | `boolean` &#124; <br/> `undefined`                                                                                                                                                                           | `undefined`（auto）    | `true`                                                                                                                                                                                  | • 未设置（auto）：dev 和 preview 服务器忽略 Cookie/请求头中存储的语言环境作为重定向来源；前缀、持久化和 `Accept-Language` 检测仍然生效。生产环境下的行为与 `true` 相同。<br/>• `true`：在任何地方都启用完整行为。<br/>• `false`：不进行语言环境路由。在 Next.js 中，`intlayerProxy` 中间件将变为直通。 |
| `storage`     | 客户端区域设置存储的配置。                                                                                                          | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                      | 参阅下方的存储参数表。                                                                                                                                                                                                                                                                                 |
| `basePath`    | 应用程序 URL 的基础路径。                                                                                                           | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                             | 如果您的应用程序位于 `https://example.com/my-app`，则 basePath 为 `'/my-app'`，指向 URL 为 `https://example.com/my-app/en` 。                                                                                                                                                                          |
| `rewrite`     | 自定义 URL 重写规则，用于覆盖特定路径的默认路由模式。支持动态参数 `[param]`。                                                       | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | 见下方示例                                                                                                                                                                              | • 重写规则优先级高于 `mode`。<br/>• 与 Next.js 和 Vite 配合。 <br/>• `getLocalizedUrl()` 自动应用适当的规则。<br/>• 见 [自定义 URL 重写](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md)。                                                                       |
| `domains`     | 将区域设置映射到域主机名以进行基于域的路由。设置后，区域设置的 URL 将使用该域作为基础（绝对 URL），并且不会向路径添加区域设置前缀。 | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                             | • 如果主机名中未包含，默认协议为 `https://`。<br/>• 域本身标识区域设置，因此不会添加 `/zh/` 前缀。<br/>• `getLocalizedUrl('/', 'zh')` 返回 `https://intlayer.zh/`。                                                                                                                                    |

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

#### 存储参数 (Storage)

| 值                 | 备注                                                                                                                                                         | 说明                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `'cookie'`         | • 确保适当的用户同意以符合 GDPR 要求。<br/>• 通过 `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`) 可配置。  | 将区域设置存储在 cookie 中--客户端和服务器均可访问。 |
| `'localStorage'`   | • 除非明确删除，否则不会过期。<br/>• Intlayer Proxy 无法访问它。<br/>• 通过 `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`) 可配置。 | 将区域设置存储在浏览器中，永不过期--仅限客户端。     |
| `'sessionStorage'` | • 关闭标签页/窗口时删除。<br/>• Intlayer Proxy 无法访问它。<br/>• 通过 `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`) 可配置。    | 在页面会话期间存储区域设置--仅限客户端。             |
| `'header'`         | • 对于 API 调用很有用。<br/>• 客户端无法访问它。<br/>• 通过 `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`) 可配置。                       | 通过 HTTP header 存储或传递区域设置--仅限服务器。    |

#### Cookie 属性 (Cookies Attributes)

在 cookie 中使用存储时，可以设置额外属性：

| 字段       | 说明                                                                                   | 类型                                                  |
| ---------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `name`     | Cookie 名称。默认值：`'INTLAYER_LOCALE'`                                               | `string`                                              |
| `domain`   | Cookie 域。默认值：`undefined`                                                         | `string`                                              |
| `path`     | Cookie 路径。默认值：`undefined`                                                       | `string`                                              |
| `secure`   | 需要 HTTPS。默认值：`undefined`                                                        | `boolean`                                             |
| `httpOnly` | HTTP-only 标志。默认值：`undefined`                                                    | `boolean`                                             |
| `sameSite` | SameSite 策略。                                                                        | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | 数字表示自创建以来的天数；日期（或ISO日期字符串）是绝对的过期日期。默认值：`undefined` | `Date` &#124; <br/> `number` &#124; <br/> `string`    |
| `maxAge`   | 创建后的秒级生存时间。优先级高于 `expires`。默认值：`undefined`                        | `number`                                              |

#### 存储属性 (Storage Attributes)

使用 localStorage 或 sessionStorage 时：

| 字段   | 说明                                      | 类型                                             |
| ------ | ----------------------------------------- | ------------------------------------------------ |
| `type` | 存储类型。                                | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | 存储中的键名。默认值：`'INTLAYER_LOCALE'` | `string`                                         |

#### 配置示例

以下是新 v7 路由结构的一些常见配置示例：

**基本配置（默认值）**:

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

**搜索参数 (Search Params) 模式**:

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

**具有自定义存储的无前缀模式**:

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

**具有动态路径的自定义 URL 重写**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // 未重写路径的回退
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

### 内容配置 (Content)

有关应用程序中如何管理内容、目录名称、文件扩展名以及派生配置的设置。

| 字段             | 说明                                                         | 类型       | 默认值                                                                                                                                                                    | 示例                                                                                                                                                                                  | 备注                                                                                                      |
| ---------------- | ------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `watch`          | 指示 Intlayer 是否应监控内容声明文件中的更改以重新生成字典。 | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                           |
| `fileExtensions` | 编译字典期间扫描的文件扩展名。                               | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | 可帮助避免自定义冲突。                                                                                    |
| `contentDir`     | 内容定义文件 (`.content.*`) 所在目录的路径。                 | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | 用于内容文件跟踪和字典重新生成。                                                                          |
| `codeDir`        | 代码所在的路径目录，相对于基础目录。                         | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • 用于跟踪代码文件转换（删除不必要的部分、优化）。<br/>• 与 `contentDir` 分离可提高性能。                 |
| `excludedPath`   | 要从内容扫描中排除的目录。                                   | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | 目前未使用；计划在未来使用。                                                                              |
| `formatCommand`  | Intlayer 本地写入内容文件时对其进行格式化的命令。            | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` 将被替换为文件路径。<br/>• 如果未定义，Intlayer 会尝试推断（测试 prettier, biome, eslint）。 |

---

### 系统配置

与 Intlayer 的内部路径和输出结果相关的设置。这些设置通常是内部的，用户通常不需要修改。

| Field                     | Description                                     | Type     | Default                           | Example              | Note                                  |
| ------------------------- | ----------------------------------------------- | -------- | --------------------------------- | -------------------- | ------------------------------------- |
| `baseDir`                 | 项目的基础目录。                                | `string` | `process.cwd()`                   | `'/path/to/project'` | 用于解析所有 Intlayer 相关的目录。    |
| `dictionariesDir`         | 存储本地化字典的目录路径。                      | `string` | `'.intlayer/dictionary'`          |                      |                                       |
| `moduleAugmentationDir`   | 模块增强的目录，允许更好的 IDE 建议和类型检查。 | `string` | `'.intlayer/types'`               | `'intlayer-types'`   | 确保在 `tsconfig.json` 中包含此目录。 |
| `unmergedDictionariesDir` | 存储未合并字典的目录。                          | `string` | `'.intlayer/unmerged_dictionary'` |                      |                                       |
| `typesDir`                | 存储字典类型的目录。                            | `string` | `'.intlayer/types'`               |                      |                                       |
| `mainDir`                 | 存储主应用程序文件的目录。                      | `string` | `'.intlayer/main'`                |                      |                                       |
| `configDir`               | 存储配置文件的目录。                            | `string` | `'.intlayer/config'`              |                      |                                       |
| `cacheDir`                | 存储缓存文件的目录。                            | `string` | `'.intlayer/cache'`               |                      |                                       |

### 字典配置 (Dictionary)

控制字典操作的设置，包括自动填充行为和内容生成。

这个字典配置有两个主要目的：

1. **默认值**: 在创建内容声明文件时定义默认值
2. **回退行为**: 在未定义特定字段时提供回退值，允许您全局定义字典操作行为

控制字典操作的参数，包括自动填充行为和内容生成。

| 字段                        | 说明                                                                                         | 类型                                                                                                            | 默认值       | 示例                                                                                        | 备注                                                                                                                                                                                                                                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | 控制自动填充 (AI 翻译) 输出文件的生成方式。                                                  | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`       | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: 默认路径（与源文件相同）。<br/>• `false`: 禁用。<br/>• 模板字符串/函数启用按区域设置生成。<br/>• 按区域设置对象：每个区域设置对应其自己的模板；`false` 排除该区域设置。<br/>• 包含 `{{locale}}` 启用按区域设置生成。<br/>• 字典级别的 `fill` 始终优先于此全局设置。                               |
| `description`               | 帮助编辑器和 CMS 理解字典的目的。也用作 AI 生成翻译的上下文。                                | `string`                                                                                                        | `undefined`  | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                             |
| `locale`                    | 将字典转换为特定区域设置格式。每个声明的字段变为一个翻译节点。如果缺少，则字典被视为多语言。 | `LocalesValues`                                                                                                 | `undefined`  | `'en'`                                                                                      | 如果字典是针对特定区域设置而非包含多种翻译，请使用此项。                                                                                                                                                                                                                                                    |
| `contentAutoTransformation` | 是否将内容字符串自动转换为类型化的节点（Markdown、HTML 或插入内容）。                        | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`      | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')` 。<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')` 。<br/>• 插入内容 : `Hello {{name}}` → `insert('Hello {{name}}')` 。                                                                                                                           |
| `location`                  | 指出字典文件存储在哪里以及如何与 CMS 同步。                                                  | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`    | `'hybrid'`                                                                                  | • `'local'`: 仅本地管理。<br/>• `'remote'`: 仅远程管理 (CMS)。<br/>• `'hybrid'`: 本地和远程管理。<br/>• `'plugin'` 或自定义字符串：通过插件或自定义源管理。                                                                                                                                                 |
| `importMode`                | 控制字典的导入方式。                                                                         | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`   | `'dynamic'`                                                                                 | • `'static'`: 静态导入。<br/>• `'dynamic'`: 通过 Suspense 动态导入。<br/>• `'fetch'`: 通过 Live Sync API 获取；失败后回退到 `'dynamic'`。<br/>• 需要 `@intlayer/babel` 和 `@intlayer/swc` 插件。<br/>• 键必须静态声明。<br/>• 如果 `optimize` 关闭则忽略。<br/>• 不影响 `getIntlayer`, `getDictionary` 等。 |
| `format`                    | 项目中所有字典的默认消息格式。                                                               | `'intlayer'` &#124; <br/> `'icu'` &#124; <br/> `'i18next'` &#124; <br/> `'vue-i18n'` &#124; <br/> `'po'`        | `'intlayer'` | `'icu'`                                                                                     | • `'intlayer'`: 原生 intlayer 格式。<br/>• `'icu'`: ICU 消息格式。<br/>• `'i18next'`: i18next 格式。<br/>• `'vue-i18n'`: Vue I18n 格式。<br/>• `'po'`: GNU Gettext PO 格式。                                                                                                                                |
| `priority`                  | 字典优先级。在解决字典之间的冲突时，较高的值比较低的值具有优先级。                           | `number`                                                                                                        | `undefined`  | `1`                                                                                         |                                                                                                                                                                                                                                                                                                             |
| `live`                      | 已弃用 - 请使用 `importMode: 'fetch'`。曾指示是否应通过 Live Sync API 动态获取字典内容。     | `boolean`                                                                                                       | `undefined`  |                                                                                             | 在 v8.0.0 中重命名为 `importMode: 'fetch'`。                                                                                                                                                                                                                                                                |
| `schema`                    | 由 Intlayer 自动生成，用于 JSON 架构验证。                                                   | `'https://intlayer.org/schema.json'`                                                                            | 自动生成     |                                                                                             | 请勿手动编辑。                                                                                                                                                                                                                                                                                              |
| `title`                     | 帮助在编辑器和 CMS 中识别字典。                                                              | `string`                                                                                                        | `undefined`  | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                             |
| `tags`                      | 对字典进行分类并为编辑器和 AI 提供上下文或指令。                                             | `string[]`                                                                                                      | `undefined`  | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                             |
| `version`                   | 远程字典版本；帮助跟踪当前正在使用的版本。                                                   | `string`                                                                                                        | `undefined`  | `'1.0.0'`                                                                                   | • 在 CMS 中管理。<br/>• 请勿本地编辑。                                                                                                                                                                                                                                                                      |

**`fill` 示例**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### 日志记录器配置 (Log)

自定义 Intlayer 日志输出的参数。

| 字段     | 说明                   | 类型                                                           | 默认值          | 示例            | 备注                                                                       |
| -------- | ---------------------- | -------------------------------------------------------------- | --------------- | --------------- | -------------------------------------------------------------------------- |
| `mode`   | 指示日志记录器模式。   | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`     | • `'verbose'`: 记录更多调试信息。<br/>• `'disabled'`: 完全禁用日志记录器。 |
| `prefix` | 日志中所有消息的前缀。 | `string`                                                       | `'[intlayer] '` | `'[我的前缀] '` |                                                                            |

### AI 配置 (AI)

控制 Intlayer AI 功能的设置，包括提供商、模型和 API 密钥。

如果您在 [Intlayer Dashboard](https://app.intlayer.org/project) 中注册访问密钥，则此配置是可选的。Intlayer 将根据您的需求自动为您管理最具成本效益且最高效的 AI 解决方案。使用默认选项可确保获得最佳的长期支持，因为 Intlayer 会不断更新以使用最新模型。

如果您更喜欢使用自己的 API 密钥或特定模型，则可以定义自己的 AI 配置。
此 AI 配置将在您的 Intlayer 环境中全局使用。CLI 命令（如 `fill`）将默认使用这些设置，同样 SDK、可视化编辑器和 CMS 也是如此。您可以通过命令参数在特定情况下覆盖这些默认值。

Intlayer 支持多个 AI 提供商，以提供最大的灵活性。当前支持的提供商有：

- **OpenAI** (默认)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**
- **LM Studio**

| 字段                 | 说明                                                                                 | 类型                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 默认值      | 示例                                                          | 备注                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | 要为 Intlayer AI 功能使用的提供商。                                                  | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` &#124; <br/> `'lmstudio'` &#124; <br/> `'moonshotai'` | `undefined` | `'anthropic'`                                                 | 不同的提供商需要不同的 API 密钥，且价格不同。                                                                                                     |
| `model`              | 要为 AI 功能使用的 AI 模型。                                                         | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | 无          | `'gpt-4o-2024-11-20'`                                         | 具体模型取决于提供商。                                                                                                                            |
| `temperature`        | 控制 AI 响应的随机性。                                                               | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                             | 无          | `0.1`                                                         | 温度越高 = 越具创造力且越不可靠。                                                                                                                 |
| `apiKey`             | 所选提供商的您的 API 密钥。                                                          | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | 无          | `process.env.OPENAI_API_KEY`                                  | 应保持私密；使用环境变量。                                                                                                                        |
| `applicationContext` | 有关应用程序的其他上下文，以帮助 AI 生成更准确的翻译（领域、目标受众、语气、术语）。 | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | 无          | `'我的自定义应用程序上下文'`                                  | 可用于添加规则（例如：`"您不应转换您的 URL"` ）。                                                                                                 |
| `baseURL`            | AI API 的基础 URL。                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                             | 无          | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | 可以指向本地或自定义的 AI API 端点。                                                                                                              |
| `dataSerialization`  | AI 功能的数据序列化格式。                                                            | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                                                                       | `undefined` | `'toon'`                                                      | • `'json'`: 默认，可靠；使用更多 token。<br/>• `'toon'`: token 更少，但也更不稳定。<br/>• 将上下文作为额外参数（reasoning effort 等）传递给模型。 |

### 构建配置 (Build)

控制 Intlayer 如何优化和编译应用程序国际化的参数。

构建选项应用于 `@intlayer/babel` 和 `@intlayer/swc` 插件。

> 在开发模式下，Intlayer 使用字典的静态导入以便于开发过程。

> 在优化期间，Intlayer 将替换字典调用以优化分块 (chunking)，使生成的包仅导入实际使用的字典。

| 字段                  | 说明                                                           | 类型                             | 默认值                                                                                                                                                                            | 示例                                                                          | 备注                                                                                                                                                                                                                                                                                                                            |
| --------------------- | -------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                | 控制构建模式。                                                 | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: 构建在应用程序构建期间自动启动。<br/>• `'manual'`: 仅通过显式构建命令触发。<br/>• 可用于防止字典构建（例如避免在 Node.js 环境中运行）。                                                                                                                                                                             |
| `optimize`            | 控制是否应执行构建优化。                                       | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • 如果未定义，则在框架构建 (Vite/Next.js) 期间启动优化。<br/>• `true` 在开发模式下也会强制执行优化。<br/>• `false` 将其禁用。<br/>• 如果启用，则会替换字典调用以优化分块。<br/>• 需要 `@intlayer/babel` 和 `@intlayer/swc` 插件。                                                                                               |
| `minify`              | 压缩字典以减小包体大小。                                       | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • 指定是否应最小化包内容。<br/>• 默认值：生产环境中为 `true`。<br/>• 如果禁用了 `optimize`，该选项将被忽略。<br/>• 如果 `editor.enabled` 为 true，该选项将被忽略。                                                                                                                                                              |
| `purge`               | 清除字典中未使用的键。                                         | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • 指定是否应清理包内容。<br/>• 默认值：生产环境中为 `true`。<br/>• 如果禁用了 `optimize`，该选项将被忽略。                                                                                                                                                                                                                      |
| `checkTypes`          | 指示构建是否应检查 TypeScript 类型并记录错误。                 | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | 可能会减慢构建过程。                                                                                                                                                                                                                                                                                                            |
| `chunkGrouping`       | 是否按使用它们的代码分割边界对各语言的字典分块进行分组。       | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • 不分组时，由众多组件构成的页面会为每个字典发出一次请求。<br/>• 从多个边界访问的字典会移入共享分块，因此任何页面都不会携带其他页面的内容。<br/>• 仅适用于使用 `importMode: 'dynamic'` 的字典。<br/>• 仅适用于客户端构建，且仅在打包时生效（开发模式除外）。                                                                    |
| `dictionariesPreload` | 字典是否应与使用它的分块一起加载，而不是等该分块渲染后再获取。 | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • 生成的入口点在顶层等待浏览语言，因此懒加载路由在其内容就绪前不会被视为已加载。<br/>• 读取将同步渲染而不是挂起，因此导航时不再闪烁加载状态。<br/>• 仅等待已解析的语言，因此页面只会下载它所呈现的语言。<br/>• 仅适用于客户端构建中使用 `importMode: 'dynamic'` 的字典。<br/>• 需要支持顶层 await 的打包工具（Vite、esbuild）。 |
| `outputFormat`        | 控制字典的输出格式。                                           | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                 |
| `traversePattern`     | 优化期间指定要扫描的文件的模式。                               | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • 通过将优化限制在相关文件来提高构建性能。<br/>• 如果 `optimize` 关闭则忽略。<br/>• 使用 glob 模式。                                                                                                                                                                                                                            |

---

### 编译器配置 (Compiler)

控制 Intlayer 编译器的设置，该编译器直接从组件中收集字典。

| 字段                  | 说明                                                                                                                                                                                                                                                                          | 类型                                                                                                            | 默认值      | 示例                                                                                                                                                     | 备注                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`             | 指示编译器是否应处于活动状态以收集字典。                                                                                                                                                                                                                                      | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` 在开发过程中跳过编译器以实现更快构建；仅在构建命令期间运行。                                                                |
| `dictionaryKeyPrefix` | 收集的字典键的前缀。                                                                                                                                                                                                                                                          | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | 加在生成的键（基于文件名）之前以避免冲突。                                                                                                 |
| `saveComponents`      | 转换组件后是否应将其保存。                                                                                                                                                                                                                                                    | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • 如果为 `true`，原始文件将被转换后的版本覆盖。<br/>• 允许运行一次编译器后将其删除。                                                       |
| `output`              | 确定输出文件路径。替换 `outputDir`。支持模板变量：`{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}` 。 | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • `./` 路径相对于组件目录解析。<br/>• `/` 路径相对于项目基础。 <br/>• `{{locale}}` 启用按区域设置生成。<br/>• 支持按区域设置的对象表示法。 |
| `noMetadata`          | 如果为 `true`，编译器会从输出中删除字典元数据（键、内容包装器）。                                                                                                                                                                                                             | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • 对于 i18next 格式或 ICU MessageFormat JSON 输出非常有用。<br/>• 与 `loadJSON` 插件很好地配合。                                           |
| `dictionaryKeyPrefix` | 字典键前缀                                                                                                                                                                                                                                                                    | `string`                                                                                                        | `''`        |                                                                                                                                                          | 为提取的字典键添加可选前缀                                                                                                                 |

### 自定义架构 (Custom Schemas)

| 字段      | 说明                                    | 类型                        |
| --------- | --------------------------------------- | --------------------------- |
| `schemas` | 允许您定义 Zod 架构来验证您的字典结构。 | `Record<string, ZodSchema>` |

---

### 插件 (Plugins)

| 字段      | 说明                         | 类型               |
| --------- | ---------------------------- | ------------------ |
| `plugins` | 要包含的 Intlayer 插件列表。 | `IntlayerPlugin[]` |

## 常见问题

<FAQ>

<Question title="intlayer.config.ts 文件应该放在哪里？">

放在项目的根目录下，与 `package.json` 同级。Intlayer 还支持 `intlayer.config.js`、`intlayer.config.mjs`、`intlayer.config.cjs` 以及 JSON 格式，因此您可以根据项目使用的模块系统自由选择。

</Question>

<Question title="i18n 会给我的 bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。服务端渲染的标记在服务端直接解析内容，而构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃。[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="我可以从 i18next、next-intl 或 react-i18next 迁移而无需重写组件吗？">

可以，有两条迁移路径。您可以使用 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 或 [next-intl 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-intl_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `i18next`、`react-i18next`、`next-intl`、`next-i18next`、`react-intl`、`use-intl`、`vue-i18n` 和 `Lingui` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，组件代码无需修改。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的源码文件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。请参阅 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可以在构建时对 JSX、TSX、Vue 和 Svelte 源码执行相同操作，在每次更改时自动生成字典，完全无需手动维护键名。它通过静态分析工作，因此仅在运行时存在的字符串无法被捕获，并且需要少量注解以区分用户文本和应用程序逻辑。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="如何向我的应用添加新语言？">

将新的语言环境添加到 `internationalization.locales` 中，然后运行 `npx intlayer fill` 将现有内容翻译为该语言。生成的类型定义会同步更新，因此任何缺少新语言环境的内容文件都会触发编译类型错误，而不是静默回退。

</Question>

<Question title="如何从 URL 中移除语言环境前缀？">

设置 `routing.mode` 选项。默认值 `"prefix-no-default"` 会为默认语言生成 `/about`，为其他语言生成 `/zh/about`。`"prefix-all"` 会为所有语言添加前缀。`"no-prefix"` 则完全不在路径中添加语言环境，而是通过 Cookie、请求头或域名进行解析。`"search-params"` 则将其作为查询参数放入 URL 中，如 `/about?locale=zh`。

</Question>

<Question title="我可以为每种语言配置独立的域名吗？">

可以。`routing.domains` 可以将语言环境映射到具体的主机名，例如 `{ zh: 'example.cn', en: 'example.com' }`。域名直接标识了语言环境，因此路径中无需添加任何前缀，并且 `getLocalizedUrl` 会返回对应正确域名的绝对 URL。

</Question>

<Question title="如何检测用户的语言？">

通过 `routing.storage` 进行检测，它会按顺序依次尝试列出的来源，通常首先是 URL，其次是 Cookie，最后是 `Accept-Language` 请求头。用户明确选择的语言会被持久化保存，从而在下次访问时优先采用。

</Question>

<Question title="routing.enableProxy 有什么作用？">

它控制语言路由代理，即处理路径前缀和重定向的中间件。若未显式设置，代理仍会运行，但开发和预览服务器会忽略持久化的存储语言作为重定向源，从而避免将您强制重定向到当前并未在测试的语言；在生产环境中其行为则等同于 `true`。若您希望自行处理多语言路由，可以将其显式设置为 `false`。

</Question>

<Question title="importMode 中的 static、dynamic 和 fetch 有什么区别？">

默认的 `"static"` 会以静态方式导入字典，因此字典会被打包在一起并同步读取。`"dynamic"` 会通过 Suspense 异步导入字典，因此仅当组件渲染该语言时才会下载对应语言包，非常适合庞大的内容集合。`"fetch"` 则从实时同步 API 获取字典，并在获取失败时回退到 `"dynamic"`。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)。

</Question>

<Question title="在哪里配置用于自动翻译的 AI 提供商和 API 密钥？">

可以在配置文件中设置，或者直接在命令行中使用 `--provider`、`--model` 和 `--api-key` 进行指定。密钥始终由您掌控：翻译请求直接从您的本地机器或 CI 执行器发送给您指定的模型提供商，不经过任何第三方中转。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md)。

</Question>

<Question title="修改配置后需要重启开发服务器吗？">

通常不需要。Intlayer 监听器会自动监视 `intlayer.config.ts` 本身：在保存时它会重新加载配置并重新准备字典，因此添加语言环境或更改路由模式会像修改内容一样被热更新捕获。不过，部分系统可能会对配置进行缓存，若遇到未生效的情况，重启应用是一个稳妥的解决办法。

</Question>

</FAQ>
