# Intlayer 配置文档

## 概述

Intlayer 配置文件允许自定义插件的各种方面，例如国际化、中间件和内容处理。本文件提供配置中每个属性的详细描述。

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

## 示例配置文件

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
    "locales": ["zh"],
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

以下部分描述 Intlayer 可用的各种配置设置。

---

### 国际化配置

定义与国际化相关的设置，包括可用的语言环境和应用程序的默认语言环境。

#### 属性

- **locales**:
  - _类型_: `string[]`
  - _默认_: `['zh']`
  - _描述_: 应用程序中支持的语言环境列表。
  - _示例_: `['zh', 'fr', 'es']`
- **strictMode**:

  - _类型_: `string`
  - _默认_: `required_only`
  - _描述_: 使用 TypeScript 确保国际化内容的强，实现。
  - _注意_: 如果设置为 "strict"，翻译 `t` 函数将要求每个声明的语言环境都被定义。如果缺少一个语言环境，或者在您的配置中没有声明某个语言环境，它将抛出一个错误。
  - _注意_: 如果设置为 "required_only"，翻译 `t` 函数将要求每个声明的语言环境都被定义。如果缺少一个语言环境，它将抛出一个警告。但如果一个语言环境在您的配置中没有声明，但存在，它将被接受。
  - _注意_: 如果设置为 "loose"，翻译 `t` 函数将接受任何现有的语言环境。

- **defaultLocale**:
  - _类型_: `string`
  - _默认_: `'zh'`
  - _描述_: 用作后备的默认语言环境，如果请求的语言环境未找到。
  - _示例_: `'zh'`
  - _注意_: 这用于确定在 URL、cookie 或标头中未指定时的语言环境。

---

### 编辑器配置

定义与集成编辑器相关的设置，包括服务器端口和活动状态。

#### 属性

- **backendURL**:

  - _类型_: `string`
  - _默认_: `https://back.intlayer.org`
  - _描述_: 后端服务器的 URL。
  - _示例_: `http://localhost:4000`

- **enabled**:

  - _类型_: `boolean`
  - _默认_: `true`
  - _描述_: 指示编辑器是否处于活动状态。
  - _示例_: `true`
  - _注意_: 可以使用 NODE_ENV 或其他专用环境变量设置

- **clientId**:

  - _类型_: `string` | `undefined`
  - _默认_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 intlayer 包使用 oAuth2 身份验证与后端进行身份验证。访问令牌用于验证与项目相关的用户。要获取访问令牌，请访问 https://intlayer.org/dashboard/project 并创建一个账户。
  - _示例_: `true`
  - _注意_: 重要：clientId 和 clientSecret 应保持机密，不应公开共享。请确保将其保存在安全的位置，例如环境变量。

- **clientSecret**:
  - _类型_: `string` | `undefined`
  - _默认_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 intlayer 包使用 oAuth2 身份验证与后端进行身份验证。访问令牌用于验证与项目相关的用户。要获取访问令牌，请访问 https://intlayer.org/dashboard/project 并创建一个账户。
  - _示例_: `true`
  - _注意_: 重要：clientId 和 clientSecret 应保持机密，不应公开共享。请确保将其保存在安全的位置，例如环境变量。

### 中间件配置

控制中间件行为的设置，包括应用程序如何处理 cookie、标头和语言环境管理的 URL 前缀。

#### 属性

- **headerName**:
  - _类型_: `string`
  - _默认_: `'x-intlayer-locale'`
  - _描述_: 用于确定语言环境的 HTTP 标头的名称。
  - _示例_: `'x-custom-locale'`
  - _注意_: 这对于基于 API 的语言环境确定很有用。
- **cookieName**:
  - _类型_: `string`
  - _默认_: `'intlayer-locale'`
  - _描述_: 用于存储语言环境的 cookie 的名称。
  - _示例_: `'custom-locale'`
  - _注意_: 用于在会话之间持久化语言环境。
- **prefixDefault**:
  - _类型_: `boolean`
  - _默认_: `true`
  - _描述_: 是否在 URL 中包含默认语言环境。
  - _示例_: `false`
  - _注意_: 如果 `false`，默认语言环境的 URL 将没有语言环境前缀。
- **basePath**:
  - _类型_: `string`
  - _默认_: `''`
  - _描述_: 应用程序 URL 的基本路径。
  - _示例_: `'/my-app'`
  - _注意_: 这会影响应用程序 URL 的构建方式。
- **serverSetCookie**:
  - _类型_: `string`
  - _默认_: `'always'`
  - _描述_: 在服务器上设置语言环境 cookie 的规则。
  - _选项_: `'always'`, `'never'`
  - _示例_: `'never'`
  - _注意_: 控制是在每次请求时设置语言环境 cookie 还是从不设置。
- **noPrefix**:
  - _类型_: `boolean`
  - _默认_: `false`
  - _描述_: 是否从 URLs 中省略语言环境前缀。
  - _示例_: `true`
  - _注意_: 如果 `true`，URL 将不包含语言环境信息。

---

### 内容配置

与应用程序中的内容处理相关的设置，包括目录名称、文件扩展名和派生配置。

#### 属性

- **watch**:
  - _类型_: `boolean`
  - _默认_: `process.env.NODE_ENV === 'development'`
  - _描述_: 指示 Intlayer 是否应监视应用程序中的内容声明文件的更改以重新构建相关字典。
- **fileExtensions**:
  - _类型_: `string[]`
  - _默认_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _描述_: 构建字典时要查找的文件扩展名。
  - _示例_: `['.data.ts', '.data.js', '.data.json']`
  - _注释_: 自定义文件扩展名可以帮助避免冲突。
- **baseDir**:
  - _类型_: `string`
  - _默认_: `process.cwd()`
  - _描述_: 项目的基本目录。
  - _示例_: `'/path/to/project'`
  - _注意_: 这用于解析所有与 Intlayer 相关的目录。
- **dictionaryOutput**:
  - _类型_: `string[]`
  - _默认_: `['intlayer']`
  - _描述_: 要使用的字典输出类型，例如 `'intlayer'` 或 `'i18next'`。
- **contentDirName**:
  - _类型_: `string`
  - _默认_: `'src'`
  - _描述_: 存放内容的目录名称。
  - _示例_: `'data'`, `'content'`, `'locales'`
  - _注意_: 如果不在基本目录级别，请更新 `contentDir`。
- **contentDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'contentDirName'`
  - _描述_: 存放内容的目录路径。

- **resultDirName**:
  - _类型_: `string`
  - _默认_: `'.intlayer'`
  - _描述_: 存放结果的目录名称。
  - _示例_: `'outputOFIntlayer'`
  - _注意_: 如果此目录不在基级别，请更新 `resultDir`。
- **resultDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'resultDirName'`
  - _描述_: 存放中间或输出结果的目录路径。

- **moduleAugmentationDirName**:

  - _类型_: `string`
  - _默认_: `'types'`
  - _描述_: 用于模块增强的目录，允许更好的 IDE 建议和类型检查。
  - _示例_: `'intlayer-types'`
  - _注意_: 确保将其包含在 `tsconfig.json` 中。

- **moduleAugmentationDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _描述_: 模块增强和额外类型定义的路径。

- **dictionariesDirName**:
  - _类型_: `string`
  - _默认_: `'dictionary'`
  - _描述_: 存放字典的目录。
  - _示例_: `'translations'`
  - _注意_: 如果不在结果目录级别，请更新 `dictionariesDir`。
- **dictionariesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'dictionariesDirName'`
  - _描述_: 存放本地化字典的目录。

- **i18nextResourcesDirName**:
  - _类型_: `string`
  - _默认_: `'i18next_dictionary'`
  - _描述_: 存放 i18n 字典的目录。
  - _示例_: `'translations'`
  - _注意_: 如果不在结果目录级别，请更新 `i18nextResourcesDir`。
  - _注意_: 确保 i18n 字典输出包括 i18next 以构建 i18next 的字典。
- **i18nextResourcesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _描述_: 存放 i18n 字典的目录。
  - _注意_: 确保此目录为 i18next 输出类型配置。

- **typeDirName**:

  - _类型_: `string`
  - _默认_: `'types'`
  - _描述_: 存放字典类型的目录。
  - _示例_: `'intlayer-types'`
  - _注意_: 如果不在结果目录级别，请更新 `typesDir`。

- **typesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'typeDirName'`
  - _描述_: 存放字典类型的目录。

- **mainDirName**:
  - _类型_: `string`
  - _默认_: `'main'`
  - _描述_: 存放主要文件的目录。
  - _示例_: `'intlayer-main'`
  - _注意_: 如果不在结果目录级别，请更新 `mainDir`。
- **mainDir**:
  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'mainDirName'`
  - _描述_: 存放主要应用程序文件的目录。
- **excludedPath**:
  - _类型_: `string[]`
  - _默认_: `['node_modules']`
  - _描述_: 从内容搜索中排除的目录。
  - _注意_: 此设置尚未使用，但计划在将来实现。

### 日志记录配置

控制日志记录的设置，包括日志级别和使用的前缀。

#### 属性

- **enabled**:
  - _类型_: `boolean`
  - _默认_: `true`
  - _描述_: 指示日志记录器是否启用。
  - _示例_: `true`
  - _注意_: 可以使用 NODE_ENV 或其他专用环境变量设置。
- **level**:
  - _类型_: `'info' | 'warn' | 'debug' | 'log'`
  - _默认_: `'log'`
  - _描述_: 日志记录器的级别。
  - _示例_: `'info'`
  - _注意_: 日志记录器的级别。可以是 'log'、'info'、'warn'、'error' 或 'debug'。
- **prefix**:
  - _类型_: `string`
  - _默认_: `'[intlayer] '`
  - _描述_: 日志记录器的前缀。
  - _示例_: `'[my custom prefix] '`
  - _注意_: 日志记录器的前缀。
