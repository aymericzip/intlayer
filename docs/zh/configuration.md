# Intlayer 配置文档

## 概述

Intlayer 配置文件允许自定义插件的各个方面，例如国际化、中间件和内容处理。本文件详细描述了配置中的每个属性。

---

## 配置文件支持

Intlayer 接受 JSON、JS、MJS 和 TS 配置文件格式：

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
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
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

定义与国际化相关的设置，包括应用程序的可用语言环境和默认语言环境。

#### 属性

- **locales**:

  - _类型_: `string[]`
  - _默认值_: `['en']`
  - _描述_: 应用程序中支持的语言环境列表。
  - _示例_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _类型_: `string[]`
  - _默认值_: `[]`
  - _描述_: 应用程序中必需的语言环境列表。
  - _示例_: `[]`
  - _注意_: 如果为空，在 `strict` 模式下所有语言环境都是必需的。
  - _注意_: 确保必需的语言环境也在 `locales` 字段中定义。
- **strictMode**:

  - _类型_: `string`
  - _默认值_: `inclusive`
  - _描述_: 使用 TypeScript 确保国际化内容的强实现。
  - _注意_: 如果设置为 "strict"，翻译函数 `t` 将要求每个声明的语言环境都被定义。如果缺少一个语言环境，或者配置中未声明的语言环境，将抛出错误。
  - _注意_: 如果设置为 "inclusive"，翻译函数 `t` 将要求每个声明的语言环境都被定义。如果缺少一个语言环境，将发出警告。但如果配置中未声明的语言环境存在，则会接受。
  - _注意_: 如果设置为 "loose"，翻译函数 `t` 将接受任何现有的语言环境。

- **defaultLocale**:
  - _类型_: `string`
  - _默认值_: `'en'`
  - _描述_: 如果请求的语言环境未找到，则使用的默认语言环境。
  - _示例_: `'en'`
  - _注意_: 当 URL、cookie 或 header 中未指定语言环境时，用于确定语言环境。

---

### 编辑器配置

定义与集成编辑器相关的设置，包括服务器端口和活动状态。

#### 属性

- **applicationURL**:

  - _类型_: `string`
  - _默认值_: `'*'`
  - _描述_: 应用程序的 URL。用于出于安全原因限制编辑器的来源。
  - _示例_:
    - `'*'`
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注意_: 应用程序的 URL。用于出于安全原因限制编辑器的来源。如果设置为 `'*'`，编辑器可以从任何来源访问。

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
    - `''*'`
  - _注意_: 应用程序访问编辑器服务器的 URL。用于限制可以与应用程序交互的来源以确保安全。如果设置为 `'*'`，编辑器可以从任何来源访问。如果更改了端口，或编辑器托管在不同的域上，应设置此项。

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
  - _注意_: 如果为 true，编辑器将能够与应用程序交互。如果为 false，编辑器将无法与应用程序交互。在任何情况下，编辑器只能通过可视化编辑器启用。为特定环境禁用编辑器是一种增强安全性的方式。

- **clientId**:

  - _类型_: `string` | `undefined`
  - _默认值_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 Intlayer 包使用 oAuth2 认证与后端进行身份验证。访问令牌用于认证与项目相关的用户。要获取访问令牌，请访问 https://intlayer.org/dashboard/project 并创建一个帐户。
  - _示例_: `true`
  - _注意_: 重要：clientId 和 clientSecret 应该保密，不应公开共享。请确保将它们保存在安全位置，例如环境变量。

- **clientSecret**:

  - _类型_: `string` | `undefined`
  - _默认值_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 Intlayer 包使用 oAuth2 认证与后端进行身份验证。访问令牌用于认证与项目相关的用户。要获取访问令牌，请访问 https://intlayer.org/dashboard/project 并创建一个帐户。
  - _示例_: `true`
  - _注意_: 重要：clientId 和 clientSecret 应该保密，不应公开共享。请确保将它们保存在安全位置，例如环境变量。

- **hotReload**:

  - _类型_: `boolean`
  - _默认值_: `false`
  - _描述_: 指示应用程序是否在检测到更改时热重载语言环境配置。
  - _示例_: `true`
  - _注意_: 例如，当添加或更新新词典时，应用程序将更新页面中显示的内容。
  - _注意_: 因为热重载需要与服务器的持续连接，它仅适用于 `enterprise` 计划的客户。

- **dictionaryPriorityStrategy**:
  - _类型_: `string`
  - _默认值_: `'local_first'`
  - _描述_: 在本地和远程词典同时存在的情况下优先词典的策略。如果设置为 `'distant_first'`，应用程序将优先远程词典。如果设置为 `'local_first'`，应用程序将优先本地词典。
  - _示例_: `'distant_first'`

### 中间件配置

控制中间件行为的设置，包括应用程序如何处理 cookie、header 和 URL 前缀以进行语言环境管理。

#### 属性

- **headerName**:
  - _类型_: `string`
  - _默认值_: `'x-intlayer-locale'`
  - _描述_: 用于确定语言环境的 HTTP header 名称。
  - _示例_: `'x-custom-locale'`
  - _注意_: 这对于基于 API 的语言环境确定非常有用。
- **cookieName**:
  - _类型_: `string`
  - _默认值_: `'intlayer-locale'`
  - _描述_: 用于存储语言环境的 cookie 名称。
  - _示例_: `'custom-locale'`
  - _注意_: 用于跨会话持久化语言环境。
- **prefixDefault**:
  - _类型_: `boolean`
  - _默认值_: `true`
  - _描述_: 是否在 URL 中包含默认语言环境。
  - _示例_: `false`
  - _注意_: 如果为 `false`，默认语言环境的 URL 将没有语言环境前缀。
- **basePath**:
  - _类型_: `string`
  - _默认值_: `''`
  - _描述_: 应用程序 URL 的基本路径。
  - _示例_: `'/my-app'`
  - _注意_: 这会影响应用程序 URL 的构造方式。
- **serverSetCookie**:
  - _类型_: `string`
  - _默认值_: `'always'`
  - _描述_: 在服务器上设置语言环境 cookie 的规则。
  - _选项_: `'always'`, `'never'`
  - _示例_: `'never'`
  - _注意_: 控制是否在每个请求或从不设置语言环境 cookie。
- **noPrefix**:
  - _类型_: `boolean`
  - _默认值_: `false`
  - _描述_: 是否从 URL 中省略语言环境前缀。
  - _示例_: `true`
  - _注意_: 如果为 `true`，URL 将不包含语言环境信息。

---

### 内容配置

与应用程序中的内容处理相关的设置，包括目录名称、文件扩展名和派生配置。

#### 属性

- **watch**:
  - _类型_: `boolean`
  - _默认值_: `process.env.NODE_ENV === 'development'`
  - _描述_: 指示 Intlayer 是否应监视应用程序中的内容声明文件的更改以重建相关词典。
- **fileExtensions**:
  - _类型_: `string[]`
  - _默认值_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _描述_: 构建词典时要查找的文件扩展名。
  - _示例_: `['.data.ts', '.data.js', '.data.json']`
  - _注意_: 自定义文件扩展名可以帮助避免冲突。
- **baseDir**:
  - _类型_: `string`
  - _默认值_: `process.cwd()`
  - _描述_: 项目的基本目录。
  - _示例_: `'/path/to/project'`
  - _注意_: 这用于解析所有与 Intlayer 相关的目录。
- **dictionaryOutput**:
  - _类型_: `string[]`
  - _默认值_: `['intlayer']`
  - _描述_: 要使用的词典输出类型，例如 `'intlayer'` 或 `'i18next'`。
- **contentDirName**:
  - _类型_: `string`
  - _默认值_: `'src'`
  - _描述_: 存储内容的目录名称。
  - _示例_: `'data'`, `'content'`, `'locales'`
  - _注意_: 如果不在基本目录级别，请更新 `contentDir`。
- **contentDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'contentDirName'`
  - _描述_: 存储内容的目录路径。

- **resultDirName**:
  - _类型_: `string`
  - _默认值_: `'.intlayer'`
  - _描述_: 存储结果的目录名称。
  - _示例_: `'outputOFIntlayer'`
  - _注意_: 如果此目录不在基本级别，请更新 `resultDir`。
- **resultDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'resultDirName'`
  - _描述_: 用于存储中间或输出结果的目录路径。

- **moduleAugmentationDirName**:

  - _类型_: `string`
  - _默认值_: `'types'`
  - _描述_: 用于模块增强的目录，允许更好的 IDE 建议和类型检查。
  - _示例_: `'intlayer-types'`
  - _注意_: 请确保将此目录包含在 `tsconfig.json` 中。

- **moduleAugmentationDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _描述_: 用于模块增强和附加类型定义的路径。

- **dictionariesDirName**:
  - _类型_: `string`
  - _默认值_: `'dictionary'`
  - _描述_: 用于存储词典的目录。
  - _示例_: `'translations'`
  - _注意_: 如果不在结果目录级别，请更新 `dictionariesDir`。
- **dictionariesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'dictionariesDirName'`
  - _描述_: 用于存储本地化词典的目录。

- **i18nextResourcesDirName**:
  - _类型_: `string`
  - _默认值_: `'i18next_dictionary'`
  - _描述_: 用于存储 i18n 词典的目录。
  - _示例_: `'translations'`
  - _注意_: 如果不在结果目录级别，请更新 `i18nextResourcesDir`。
  - _注意_: 确保 i18n 词典输出包括 i18next 以构建 i18next 的词典。
- **i18nextResourcesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _描述_: 用于存储 i18n 词典的目录。
  - _注意_: 确保此目录已配置为 i18next 输出类型。

- **typeDirName**:

  - _类型_: `string`
  - _默认值_: `'types'`
  - _描述_: 用于存储词典类型的目录。
  - _示例_: `'intlayer-types'`
  - _注意_: 如果不在结果目录级别，请更新 `typesDir`。

- **typesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'typeDirName'`
  - _描述_: 用于存储词典类型的目录。

- **mainDirName**:
  - _类型_: `string`
  - _默认值_: `'main'`
  - _描述_: 用于存储主文件的目录。
  - _示例_: `'intlayer-main'`
  - _注意_: 如果不在结果目录级别，请更新 `mainDir`。
- **mainDir**:
  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'mainDirName'`
  - _描述_: 存储主应用程序文件的目录。
- **excludedPath**:
  - _类型_: `string[]`
  - _默认值_: `['node_modules']`
  - _描述_: 从内容搜索中排除的目录。
  - _注意_: 此设置尚未使用，但计划在未来实现。

### 日志配置

控制日志记录器的设置，包括要使用的前缀。

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
