---
docName: intlayer_cli
url: https://intlayer.org/doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: 了解如何使用 Intlayer CLI 来管理您的多语言网站。按照本在线文档中的步骤，几分钟内即可设置您的项目。
keywords:
  - CLI
  - 命令行界面
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer CLI

## 安装包

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> 如果已经安装了 `intlayer` 包，CLI 会自动安装。您可以跳过此步骤。

## intlayer-cli 包

`intlayer-cli` 包旨在将您的 [intlayer 声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md) 转译成字典。

该包会转译所有 intlayer 文件，例如 `src/**/*.content.{ts|js|mjs|cjs|json}`。[查看如何声明您的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

要解释 intlayer 字典，您可以使用解释器，例如 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 或 [next-intlayer](https://www.npmjs.com/package/next-intlayer)。

## 配置文件支持

Intlayer 支持多种配置文件格式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

要查看如何配置可用的语言环境或其他参数，请参阅[此处的配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## CLI SDK

CLI SDK 是一个库，允许您在自己的代码中使用 Intlayer CLI。

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

使用示例：

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## 运行 intlayer 命令

### 构建字典

要构建您的字典，可以运行以下命令：

```bash
npx intlayer build
```

或者使用监听模式

```bash
npx intlayer build --watch
```

此命令将默认查找您的声明内容文件，路径为 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`，并在 `.intlayer` 目录中构建字典。

##### 别名：

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### 推送字典

```bash
npx intlayer dictionary push
```

如果安装了[intlayer编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)，你也可以将字典推送到编辑器。此命令将使字典可用于[编辑器](https://intlayer.org/dashboard)。通过这种方式，你可以与团队共享字典，并在不修改应用程序代码的情况下编辑内容。

##### 别名：

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### 参数：

- `-d`, `--dictionaries`：要推送的字典ID。如果未指定，则会推送所有字典。
  > 示例：`npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`，`--deleteLocaleDictionary`：跳过推送字典后询问是否删除本地语言目录的问题，并删除这些目录。默认情况下，如果字典是在本地定义的，它将覆盖远程字典内容。
  > 示例：`npx intlayer dictionary push -r`
- `-k`，`--keepLocaleDictionary`：跳过推送字典后询问是否删除本地语言目录的问题，并保留这些目录。默认情况下，如果字典是在本地定义的，它将覆盖远程字典内容。
  > 示例：`npx intlayer dictionary push -k`
- `--env`：指定环境（例如，`development`，`production`）。
- `--env-file`：提供自定义环境文件以加载变量。
- `--base-dir`：指定项目的基础目录。
- `--verbose`：启用详细日志记录以进行调试。
- `--git-diff`：仅对包含从基础分支（默认 `origin/main`）到当前分支（默认：`HEAD`）的更改的字典运行。
- `--git-diff-base`：指定 git diff 的基础引用（默认 `origin/main`）。
- `--git-diff-current`：指定 git diff 的当前引用（默认：`HEAD`）。
- `--uncommitted`：包含未提交的更改。
- `--unpushed`：包含未推送的更改。
- `--untracked`：包含未跟踪的文件。

### 拉取远程字典

```bash
npx intlayer pull
```

如果安装了[intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)，你也可以从编辑器中拉取字典。通过这种方式，你可以根据应用需求覆盖字典的内容。

##### 别名：

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### 参数：

- `-d, --dictionaries`：要拉取的字典 ID。如果未指定，将拉取所有字典。
  > 示例：`npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` ：新字典将被保存的目录路径。如果未指定，新字典将保存在项目的 `./intlayer-dictionaries` 目录中。如果在字典内容中指定了 `filePath` 字段，字典将忽略此参数，并保存到指定的 `filePath` 目录中。
- `--env`：指定环境（例如，`development`，`production`）。
- `--env-file`：提供自定义环境文件以加载变量。
- `--base-dir`：指定项目的基础目录。
- `--verbose`：启用详细日志以便调试。

##### 示例：

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 填充 / 审核 / 翻译 字典

```bash
npx intlayer fill
```

此命令会分析您的内容声明文件，查找潜在的问题，例如缺失的翻译、结构不一致或类型不匹配。如果发现任何问题，**intlayer fill** 将建议或应用更新，以保持您的词典一致且完整。

##### 别名：

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### 参数：

- `-f, --file [files...]`
  指定要审核的特定内容声明文件列表。如果未提供，则会审核所有发现的 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 文件。

- `--exclude [excludedGlobs...]`
  排除审核的匹配模式（例如 `--exclude "src/test/**"`）。

- `--source-locale [sourceLocale]`
  要翻译的源语言环境。如果未指定，将使用配置中的默认语言环境。

- `--output-locales [outputLocales...]`
  要翻译到的目标语言环境。如果未指定，将使用配置中的所有语言环境，除了源语言环境。

- `--mode [mode]`
  翻译模式：'complete'（完整）、'review'（审查）或 'missing-only'（仅缺失）。默认是 'missing-only'。

- `--git-diff`
  过滤包含从基准（默认 `origin/main`）到当前分支（默认：`HEAD`）的更改的字典。

- `--git-diff-base`
  指定 git diff 的基准引用（默认 `origin/main`）。

- `--git-diff-current`
  指定 git diff 的当前引用（默认：`HEAD`）。

- `--uncommitted`
  过滤包含未提交更改的字典。

- `--unpushed`
- `--untracked`
  过滤包含未跟踪文件的字典。

- `--keys [keys...]`
  根据指定的键过滤字典。

- `--excluded-keys [excludedKeys...]`
  根据指定的键排除字典。

- `--path-filter [pathFilters...]`
  根据文件路径的全局匹配模式过滤字典。

- `--model [model]`
  用于翻译的 AI 模型（例如，`gpt-3.5-turbo`）。

- `--provider [provider]`
  用于翻译的 AI 提供商。

- `--temperature [temperature]`
  AI 模型的温度设置。

- `--api-key [apiKey]`
  提供您自己的 AI 服务 API 密钥。

- `--custom-prompt [prompt]`
  提供自定义的翻译指令提示。
- `--application-context [applicationContext]`
  为 AI 翻译提供额外的上下文信息。

- `--env`
  指定环境（例如，`development`，`production`）。

- `--env-file [envFile]`
  提供自定义环境文件以加载变量。

- `--base-dir`
  指定项目的基础目录。

- `--verbose`
  启用详细日志以便调试。

##### 示例：

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

此命令将使用 GPT-3.5 Turbo 模型，将 `src/home/` 目录下所有内容声明文件的内容从英语翻译成法语和西班牙语。

### 管理配置

#### 获取配置

`configuration get` 命令用于检索当前的 Intlayer 配置，特别是语言环境设置。这对于验证您的设置非常有用。

```bash
npx intlayer configuration get
```

##### 别名：

- `npx intlayer config get`
- `npx intlayer conf get`

##### 参数：

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。
- **`--verbose`**：启用详细日志以便调试。

#### 推送配置

`configuration push` 命令将您的配置上传到 Intlayer CMS 和编辑器。此步骤是启用在 Intlayer 可视化编辑器中使用远程词典所必需的。

```bash
npx intlayer configuration push
```

##### 别名：

- `npx intlayer config push`
- `npx intlayer conf push`

##### 参数：

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。
- **`--verbose`**：启用详细日志以便调试。

通过推送配置，您的项目将完全集成 Intlayer CMS，实现团队间无缝的词典管理。

### 文档管理

`doc` 命令提供了跨多语言环境管理和翻译文档文件的工具。

#### 翻译文档

`doc translate` 命令使用 AI 翻译服务，自动将文档文件从基础语言翻译到目标语言。

```bash
npx intlayer doc translate
```

##### 参数：

- **`--doc-pattern [docPattern...]`**：匹配要翻译的文档文件的全局模式。
  > 示例：`npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**：排除翻译的全局模式。
  > 示例：`npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**：同时处理翻译的文件数量。
  > 示例：`npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**：目标语言，用于将文档翻译成指定语言。
  > 示例：`npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**：源语言，用于指定翻译的起始语言。
  > 示例：`npx intlayer doc translate --base-locale en`
- **`--model [model]`**：用于翻译的 AI 模型（例如，`gpt-3.5-turbo`）。
- **`--provider [provider]`**：用于翻译的 AI 服务提供商。
- **`--temperature [temperature]`**：AI 模型的温度设置。
- **`--api-key [apiKey]`**：为 AI 服务提供您自己的 API 密钥。
- **`--custom-prompt [prompt]`**：提供自定义的翻译指令提示。
- **`--application-context [applicationContext]`**：为 AI 翻译提供额外的上下文信息。
- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file [envFile]`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。
- **`--verbose`**：启用详细日志以便调试。
- **`--custom-instructions [customInstructions]`**：添加到提示中的自定义指令。用于应用关于格式、URL 翻译等的特定规则。

##### 示例：

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> 注意，输出文件路径将通过替换以下模式确定
>
> - `/{{baseLocale}}/` 替换为 `/{{locale}}/`（Unix）
> - `\{{baseLocale}}\` 替换为 `\{{locale}}\`（Windows）
> - `_{{baseLocale}}.` 替换为 `_{{locale}}.`
> - `{{baseLocale}}_` 替换为 `{{locale}}_`
> - `.{{baseLocaleName}}.` 替换为 `.{{localeName}}.`
>
> 如果未找到匹配模式，输出文件将在文件扩展名后添加 `.{{locale}}`。例如，`./my/file.md` 会被翻译为法语区域的 `./my/file.fr.md`。

#### 审核文档

`doc review` 命令用于分析文档文件在不同语言环境下的质量、一致性和完整性。

```bash
npx intlayer doc review
```

##### 参数：

`doc review` 命令接受与 `doc translate` 相同的参数，允许您审核特定的文档文件并应用质量检查。

##### 示例：

```bash
npx intlayer doc review
 --doc-pattern "docs/zh/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## 在你的 `package.json` 中使用 intlayer 命令

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## 调试 intlayer 命令

### 1. **确保你使用的是最新版本**

运行：

```bash
npx intlayer --version                  # 当前本地 intlayer 版本
npx intlayer@latest --version           # 当前最新 intlayer 版本
```

### 2. **检查命令是否已注册**

您可以通过以下命令检查：

```bash
npx intlayer --help                     # 显示可用命令列表和使用信息
npx intlayer dictionary build --help    # 显示某个命令的可用选项列表
```

### 3. **重启终端**

有时需要重启终端以识别新命令。

### 4. **清除 npx 缓存（如果卡在旧版本）**

```bash
npx clear-npx-cache
```

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史记录
