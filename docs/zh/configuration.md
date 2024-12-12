# Intlayer 配置文档

## 概述

Intlayer 配置文件允许自定义插件的各个方面，例如国际化、中间件和内容处理。本文档提供了配置中每个属性的详细描述。

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

```typescript
// intlayer.config.ts

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

```javascript
// intlayer.config.cjs

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

```json5
// .intlayerrc

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

定义与国际化相关的设置，包括可用的语言环境和应用程序的默认语言环境。

#### 属性

- **locales**:
  - _类型_: `string[]`
  - _默认_: `['en']`
  - _描述_: 应用程序支持的语言环境列表。
  - _示例_: `['en', 'fr', 'es']`
- **strictMode**:

  - _类型_: `string`
  - _默认_: `required_only`
  - _描述_: 使用 TypeScript 确保国际化内容的强实现。
  - _注意_: 如果设置为 "strict"，则翻译 `t` 函数将要求每个声明的语言环境都被定义。如果某个语言环境丢失，或者某个语言环境未在配置中声明，将抛出错误。
  - _注意_: 如果设置为 "required_only"，翻译 `t` 函数将要求每个声明的语言环境都被定义。如果某个语言环境丢失，将抛出警告。但是如果某个语言环境未在配置中声明但存在，它将被接受。
  - _注意_: 如果设置为 "loose"，翻译 `t` 函数将接受任何现有的语言环境。

- **defaultLocale**:
  - _类型_: `string`
  - _默认_: `'en'`
  - _描述_: 用作后备的默认语言环境，如果请求的语言环境未找到。
  - _示例_: `'en'`
  - _注意_: 这用于在 URL、cookie 或头信息中未指定的情况下确定语言环境。

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
  - _注意_: 可以使用 NODE_ENV 或其他专用环境变量进行设置。

- **clientId**:

  - _类型_: `string` | `undefined`
  - _默认_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 Intlayer 包使用 oAuth2 认证与后端进行身份验证。访问令牌用于验证与项目相关的用户。要获取访问令牌，请访问 https://back.intlayer.org/dashboard/project 并创建一个帐户。
  - _示例_: `true`
  - _注意_: 重要：clientId 和 clientSecret 应保持保密，切勿公开分享。请确保将它们保存在安全的位置，例如环境变量中。

- **clientSecret**:
  - _类型_: `string` | `undefined`
  - _默认_: `undefined`
  - _描述_: clientId 和 clientSecret 允许 Intlayer 包使用 oAuth2 认证与后端进行身份验证。访问令牌用于验证与项目相关的用户。要获取访问令牌，请访问 https://back.intlayer.org/dashboard/project 并创建一个帐户。
  - _示例_: `true`
  - _注意_: 重要：clientId 和 clientSecret 应保持保密，切勿公开分享。请确保将它们保存在安全的位置，例如环境变量中。

### 中间件配置

控制中间件行为的设置，包括应用程序如何处理语言环境管理的 cookie、头信息和 URL 前缀。

#### 属性

- **headerName**:
  - _类型_: `string`
  - _默认_: `'x-intlayer-locale'`
  - _描述_: 用于确定语言环境的 HTTP 头的名称。
  - _示例_: `'x-custom-locale'`
  - _注意_: 这对于基于 API 的语言环境确定很有用。
- **cookieName**:
  - _类型_: `string`
  - _默认_: `'intlayer-locale'`
  - _描述_: 用于存储语言环境的 cookie 名称。
  - _示例_: `'custom-locale'`
  - _注意_: 用于在会话之间保持语言环境。
- **prefixDefault**:
  - _类型_: `boolean`
  - _默认_: `true`
  - _描述_: 是否在 URL 中包含默认语言环境。
  - _示例_: `false`
  - _注意_: 如果 `false`，则默认语言环境的 URL 将不带语言环境前缀。
- **basePath**:
  - _类型_: `string`
  - _默认_: `''`
  - _描述_: 应用程序 URL 的基础路径。
  - _示例_: `'/my-app'`
  - _注意_: 这会影响应用程序 URL 的构建方式。
- **serverSetCookie**:
  - _类型_: `string`
  - _默认_: `'always'`
  - _描述_: 用于设置服务器上的语言环境 cookie 的规则。
  - _选项_: `'always'`, `'never'`
  - _示例_: `'never'`
  - _注意_: 控制是否在每个请求中设置语言环境 cookie 或从不设置。
- **noPrefix**:
  - _类型_: `boolean`
  - _默认_: `false`
  - _描述_: 是否从 URL 中省略语言环境前缀。
  - _示例_: `true`
  - _注意_: 如果 `true`，则 URL 将不包含语言环境信息。

---

### 内容配置

与应用程序中的内容处理相关的设置，包括目录名称、文件扩展名和派生配置。

#### 属性

- **watch**:
  - _类型_: `boolean`
  - _默认_: `process.env.NODE_ENV === 'development'`
  - _描述_: 指示 Intlayer 是否应监视应用程序中内容声明文件的更改以重建相关字典。
- **fileExtensions**:
  - _类型_: `string[]`
  - _默认_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _描述_: 构建字典时要查找的文件扩展名。
  - _示例_: `['.data.ts', '.data.js', '.data.json']`
  - _注意_: 自定义文件扩展名可以帮助避免冲突。
- **baseDir**:
  - _类型_: `string`
  - _默认_: `process.cwd()`
  - _描述_: 项目的基础目录。
  - _示例_: `'/path/to/project'`
  - _注意_: 此用于解析所有与 Intlayer 相关的目录。
- **dictionaryOutput**:
  - _类型_: `string[]`
  - _默认_: `['intlayer']`
  - _描述_: 使用的字典输出类型，例如 `'intlayer'` 或 `'i18next'`。
- **contentDirName**:
  - _类型_: `string`
  - _默认_: `'src'`
  - _描述_: 存储内容的目录名称。
  - _示例_: `'data'`, `'content'`, `'locales'`
  - _注意_: 如果不在基础目录级别，请更新 `contentDir`。
- **contentDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'contentDirName'`
  - _描述_: 存储内容的目录路径。

- **resultDirName**:
  - _类型_: `string`
  - _默认_: `'.intlayer'`
  - _描述_: 存储结果的目录名称。
  - _示例_: `'outputOFIntlayer'`
  - _注意_: 如果此目录不在基本级别，请更新 `resultDir`。
- **resultDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'resultDirName'`
  - _描述_: 用于存储中间或输出结果的目录路径。

- **moduleAugmentationDirName**:

  - _类型_: `string`
  - _默认_: `'types'`
  - _描述_: 模块扩展的目录，允许更好的 IDE 建议和类型检查。
  - _示例_: `'intlayer-types'`
  - _注意_: 确保在 `tsconfig.json` 中包含这一点。

- **moduleAugmentationDir**:

  - _类型_: `string`
  - _派生自_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _描述_: 模块扩展和附加类型定义的路径。

- **dictionariesDirName**:
  - _类型_: `string`
  - _默认_: `'dictionary'`
  - _描述_: 存储字典的目录。
  - _示例_: `'translations'`
  - _注意_: 如果不在结果目录级别，请更新 `dictionariesDir`。
- **dictionariesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'dictionariesDirName'`
  - _描述_: 存储本地化字典的目录。

- **i18nDictionariesDirName**:
  - _类型_: `string`
  - _默认_: `'i18n_dictionary'`
  - _描述_: 存储 i18n 字典的目录。
  - _示例_: `'translations'`
  - _注意_: 如果不在结果目录级别，请更新 `i18nDictionariesDir`。
  - _注意_: 确保 i18n 字典输出包括 i18next，以构建 i18next 的字典。
- **i18nDictionariesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _描述_: 存储 i18n 字典的目录。
  - _注意_: 确保此目录配置为 i18next 输出类型。

- **typeDirName**:

  - _类型_: `string`
  - _默认_: `'types'`
  - _描述_: 存储字典类型的目录。
  - _示例_: `'intlayer-types'`
  - _注意_: 如果不在结果目录级别，请更新 `typesDir`。

- **typesDir**:

  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'typeDirName'`
  - _描述_: 存储字典类型的目录。

- **mainDirName**:
  - _类型_: `string`
  - _默认_: `'main'`
  - _描述_: 存储主文件的目录。
  - _示例_: `'intlayer-main'`
  - _注意_: 如果不在结果目录级别，请更新 `mainDir`。
- **mainDir**:
  - _类型_: `string`
  - _派生自_: `'resultDir'` / `'mainDirName'`
  - _描述_: 存储主应用程序文件的目录。
- **excludedPath**:
  - _类型_: `string[]`
  - _默认_: `['node_modules']`
  - _描述_: 从内容搜索中排除的目录。
  - _注意_: 此设置尚未使用，但计划在将来实施。
