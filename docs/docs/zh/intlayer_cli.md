---
createdAt: 2024-08-11
updatedAt: 2025-07-11
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
slugs:
  - doc
  - concept
  - cli
history:
  - version: 5.5.11
    date: 2025-07-11
    changes: 更新 CLI 命令参数文档
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# Intlayer CLI

---

## 目录

<TOC/>

---

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

`intlayer-cli` 包旨在将您的 [intlayer 声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md) 转换为字典。

该包会转换所有 intlayer 文件，例如 `src/**/*.content.{ts|js|mjs|cjs|json}`。[查看如何声明您的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

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

如果安装了 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)，你也可以将字典推送到编辑器。此命令将使字典可用于 [编辑器](https://intlayer.org/dashboard)。通过这种方式，你可以与团队共享字典，并在不修改应用代码的情况下编辑内容。

##### 别名：

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### 参数：

**字典选项：**

- **`-d`, `--dictionaries`**：要推送的字典 ID。如果未指定，则推送所有字典。

  > 示例：`npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**配置选项：**

- **`--base-dir`**：指定项目的基础目录。为了获取 intlayer 配置，命令将在基础目录中查找 `intlayer.config.{ts,js,json,cjs,mjs}` 文件。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

**环境变量选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。当你在 intlayer 配置文件中使用环境变量时非常有用。
- **`--env-file`**：提供自定义环境文件以加载变量。当你在 intlayer 配置文件中使用环境变量时非常有用。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

  > 示例：`npx intlayer dictionary push --env production`

**输出选项：**

- **`-r`，`--delete-locale-dictionary`**：跳过推送字典后询问是否删除本地语言目录的问题，并删除这些目录。默认情况下，如果字典在本地定义，它将覆盖远程字典内容。

  > 示例：`npx intlayer dictionary push -r`

  > 示例：`npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`，`--keep-locale-dictionary`**：跳过推送字典后询问是否删除本地语言目录的问题，并保留这些目录。默认情况下，如果字典在本地定义，它将覆盖远程字典内容。

  > 示例：`npx intlayer dictionary push -k`

  > 示例: `npx intlayer dictionary push --keep-locale-dictionary`

**日志选项:**

- **`--verbose`**: 启用详细日志以便调试。

**Git 选项:**

- **`--git-diff`**: 仅对包含从基准（默认 `origin/main`）到当前分支（默认 `HEAD`）的更改的字典执行操作。
- **`--git-diff-base`**: 指定 git diff 的基准引用（默认 `origin/main`）。
- **`--git-diff-current`**: 指定 git diff 的当前引用（默认 `HEAD`）。
- **`--uncommitted`**: 包含未提交的更改。
- **`--unpushed`**: 包含未推送的更改。
- **`--untracked`**: 包含未跟踪的文件。

> 示例: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`
> 示例：`npx intlayer dictionary push --uncommitted --unpushed --untracked`

### 拉取远程词典

```bash
npx intlayer pull
```

如果安装了 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)，你也可以从编辑器拉取词典。通过这种方式，你可以根据应用需求覆盖词典内容。

##### 别名：

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### 参数：

**词典选项：**

- **`-d, --dictionaries`**：要拉取的词典 ID。如果未指定，将拉取所有词典。

  > 示例：`npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**配置选项：**

- **`--base-dir`**：指定项目的基础目录。为了获取 intlayer 配置，命令将在基础目录中查找 `intlayer.config.{ts,js,json,cjs,mjs}` 文件。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

**环境变量选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。为了获取 intlayer 配置，命令将在基础目录中查找 `intlayer.config.{ts,js,json,cjs,mjs}` 文件。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

  > 示例：`npx intlayer dictionary push --env production`

**输出选项：**

- **`--new-dictionaries-path`**：新词典保存目录的路径。如果未指定，新词典将保存在项目的 `./intlayer-dictionaries` 目录中。如果词典内容中指定了 `filePath` 字段，则词典不会考虑此参数，而是保存在指定的 `filePath` 目录中。

**日志选项：**

- **`--verbose`**：启用详细日志以便调试。

##### 示例：

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 填充 / 审核 / 翻译词典

```bash
npx intlayer fill
```

该命令会分析您的内容声明文件，查找潜在的问题，例如缺失的翻译、结构不一致或类型不匹配。如果发现任何问题，**intlayer fill** 将建议或应用更新，以保持您的字典一致且完整。

##### 别名：

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### 参数：

**文件列表选项：**

- **`-f, --file [files...]`**：要审核的特定内容声明文件列表。如果未提供，将审核基于您的配置文件设置发现的所有 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 文件。

  > 示例：`npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**：基于键过滤字典。如果未提供，将审核所有字典。

  > 示例：`npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**：基于键排除字典。如果未提供，将审核所有字典。

  > 示例：`npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**：基于文件路径的全局匹配模式过滤字典。

  > 示例：`npx intlayer dictionary fill --path-filter "src/home/**"`

**条目输出选项：**

- **`--source-locale [sourceLocale]`**：要翻译的源语言区域。如果未指定，将使用配置中的默认语言区域。

- **`--output-locales [outputLocales...]`**：目标翻译语言。如果未指定，将使用配置中的所有语言，除了源语言。

- **`--mode [mode]`**：翻译模式：'complete'（完整）、'review'（审核）或 'missing-only'（仅缺失）。默认是 'missing-only'。

**Git 选项：**

- **`--git-diff`**：仅对包含从基准（默认 `origin/main`）到当前分支（默认 `HEAD`）的更改的字典运行。
- **`--git-diff-base`**：指定 git diff 的基准引用（默认 `origin/main`）。
- **`--git-diff-current`**：指定 git diff 的当前引用（默认 `HEAD`）。
- **`--uncommitted`**：包含未提交的更改。
- **`--unpushed`**：包含未推送的更改。
- **`--untracked`**：包含未跟踪的文件。

> 示例：`npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
> 示例：`npx intlayer doc translate --uncommitted --unpushed --untracked`

**AI 选项：**

- **`--model [model]`**：用于翻译的 AI 模型（例如，`gpt-3.5-turbo`）。
- **`--provider [provider]`**：用于翻译的 AI 提供商。
- **`--temperature [temperature]`**：AI 模型的温度设置。
- **`--api-key [apiKey]`**：为 AI 服务提供您自己的 API 密钥。
- **`--custom-prompt [prompt]`**：为您的翻译指令提供自定义提示。
- **`--application-context [applicationContext]`**：为 AI 翻译提供额外的上下文信息。

  > 示例: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "我的应用是一个猫咪商店"`

**环境变量选项:**

- **`--env`**: 指定环境（例如，`development`，`production`）。
- **`--env-file [envFile]`**: 提供自定义环境文件以加载变量。

  > 示例: `npx intlayer fill --env-file .env.production.local`

  > 示例: `npx intlayer fill --env production`

**配置选项:**

- **`--base-dir`**: 指定项目的基础目录。

  > 示例: `npx intlayer fill --base-dir ./src`

**日志选项:**

- **`--verbose`**: 启用详细日志以便调试。

##### 示例:

```bash
bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

此命令将使用 GPT-3.5 Turbo 模型，将 `src/home/` 目录下所有内容声明文件的内容从英语翻译成法语和西班牙语。

### 管理配置

#### 获取配置

`configuration get` 命令用于检索当前 Intlayer 的配置，特别是语言环境设置。这对于验证您的设置非常有用。

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

`configuration push` 命令将您的配置上传到 Intlayer CMS 和编辑器。这一步是启用 Intlayer 可视化编辑器中远程词典使用的必要步骤。

```bash
npx intlayer configuration push
```

##### 别名：

- `npx intlayer config push`
- `npx intlayer conf push`

##### 参数：

- **`--env`**：指定环境（例如，`development`、`production`）。
- **`--env-file`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。
- **`--verbose`**：启用详细日志以便调试。

通过推送配置，您的项目将完全集成到 Intlayer CMS 中，实现跨团队的无缝词典管理。

### 文档管理

`doc` 命令提供了管理和翻译多语言文档文件的工具。

#### 翻译文档

`doc translate` 命令使用 AI 翻译服务，自动将文档文件从基础语言翻译到目标语言。

```bash
npx intlayer doc translate
```

##### 参数：

**文件列表选项：**

- **`--doc-pattern [docPattern...]`**：匹配要翻译的文档文件的全局模式。

  > 示例：`npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**：用于排除不进行翻译的文件的全局匹配模式。

  > 示例：`npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**：如果文件在指定时间之前被修改，则跳过该文件。
  - 可以是绝对时间，如 "2025-12-05"（字符串或日期对象）
  - 也可以是相对时间，单位为毫秒，例如 `1 * 60 * 60 * 1000`（1小时）
  - 此选项通过 `fs.stat` 方法检查文件的更新时间，因此可能会受到 Git 或其他修改文件工具的影响。

  > 示例：`npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**：如果文件在指定时间内被修改，则跳过该文件。
  - 可以是绝对时间，如 "2025-12-05"（字符串或日期对象）
  - 可以是相对时间，单位为毫秒，例如 `1 * 60 * 60 * 1000`（1 小时）
  - 此选项通过 `fs.stat` 方法检查文件的更新时间，因此可能会受到 Git 或其他修改文件工具的影响。

  > 示例：`npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**输出选项：**

- **`--locales [locales...]`**：目标语言，用于翻译文档。

  > 示例：`npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**：源语言，用于从该语言翻译。

  > 示例：`npx intlayer doc translate --base-locale en`

**文件处理选项：**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**：同时处理翻译的文件数量。

  > 示例：`npx intlayer doc translate --nb-simultaneous-file-processed 5`

**AI 选项：**

- **`--model [model]`**：用于翻译的 AI 模型（例如，`gpt-3.5-turbo`）。
- **`--provider [provider]`**：用于翻译的 AI 提供商。
- **`--temperature [temperature]`**：AI 模型的温度设置。
- **`--api-key [apiKey]`**：为 AI 服务提供您自己的 API 密钥。
- **`--application-context [applicationContext]`**：为 AI 翻译提供额外的上下文信息。
- **`--custom-prompt [prompt]`**：自定义用于翻译的基础提示。（注意：对于大多数用例，推荐使用 `--custom-instructions` 选项，因为它能更好地控制翻译行为。）

  > 示例：`npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "我的应用是一个猫咪商店"`

**环境变量选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file [envFile]`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。

  > 示例：`npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**日志选项：**

- **`--verbose`**：启用详细日志记录以便调试。

  > 示例：`npx intlayer doc translate --verbose`

**自定义指令选项：**

- **`--custom-instructions [customInstructions]`**：添加到提示中的自定义指令。用于应用有关格式、URL 翻译等的特定规则。
  - 可以是绝对时间，如 "2025-12-05"（字符串或日期）
  - 可以是相对时间，单位为毫秒，如 `1 * 60 * 60 * 1000`（1 小时）
  - 此选项通过 `fs.stat` 方法检查文件的更新时间，因此可能会受到 Git 或其他修改文件工具的影响。

  > 示例：`npx intlayer doc translate --custom-instructions "避免翻译 URL，保持 Markdown 格式"`

  > 示例：`npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git 选项：**

- **`--git-diff`**：仅针对包含从基础分支（默认 `origin/main`）到当前分支（默认 `HEAD`）的更改的字典运行。
- **`--git-diff-base`**：指定 git diff 的基础参考（默认 `origin/main`）。
- **`--git-diff-current`**：指定 git diff 的当前参考（默认 `HEAD`）。
- **`--uncommitted`**：包含未提交的更改。
- **`--unpushed`**：包含未推送的更改。
- **`--untracked`**：包含未跟踪的文件。

  > 示例：`npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 示例：`npx intlayer doc translate --uncommitted --unpushed --untracked`

> 注意，输出文件路径将通过替换以下模式确定
>
> - `/{{baseLocale}}/` 替换为 `/{{locale}}/`（Unix）
> - `\{{baseLocale}}\` 替换为 `\{{locale}}\`（Windows）
> - `_{{baseLocale}}.` 替换为 `_{{locale}}.`
> - `{{baseLocale}}_` 替换为 `{{locale}}_`
> - `.{{baseLocaleName}}.` 替换为 `.{{localeName}}.`
>
> 如果未找到匹配模式，输出文件将在文件扩展名后添加 `.{{locale}}`。例如，`./my/file.md` 会被翻译为法语版本 `./my/file.fr.md`。

#### 审核文档

`doc review` 命令用于分析文档文件在不同语言版本中的质量、一致性和完整性。

```bash
npx intlayer doc review
```

该命令可用于审核已翻译的文件，并检查翻译是否正确。

在大多数使用场景中，

- 当该文件的翻译版本不可用时，优先使用 `doc translate`。
- 当该文件的翻译版本已存在时，优先使用 `doc review`。

> 请注意，审核过程相比翻译过程在完整审核同一文件时会消耗更多的输入令牌。然而，审核过程会优化需要审核的块，并跳过未更改的部分。

##### 参数：

`doc review` 命令接受与 `doc translate` 相同的参数，允许您审核特定的文档文件并应用质量检查。

如果您启用了其中一个 git 选项，命令将只审查文件中发生更改的部分。脚本会通过将文件分块来处理，并审查每个块。如果某个块没有变化，脚本将跳过该块，以加快审查过程并限制 AI 提供商 API 的成本。

## 在您的 `package.json` 中使用 intlayer 命令

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

## CLI SDK

CLI SDK 是一个库，允许你在自己的代码中使用 Intlayer CLI。

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
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

## 调试 intlayer 命令

### 1. **确保你使用的是最新版本**

运行：

```bash
npx intlayer --version                  # 当前本地 intlayer 版本
npx intlayer@latest --version           # 当前最新 intlayer 版本
```

### 2. **检查命令是否已注册**

您可以使用以下命令检查：

```bash
npx intlayer --help                     # 显示可用命令列表和使用信息
npx intlayer dictionary build --help    # 显示某个命令的可用选项列表
```

### 3. **重启终端**

有时需要重启终端以识别新命令。

### 4. **清除 npx 缓存（如果您卡在旧版本）**

```bash
npx clear-npx-cache
```
