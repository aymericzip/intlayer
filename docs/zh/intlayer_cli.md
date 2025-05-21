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

`intlayer-cli` 包旨在将您的 [intlayer 声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md) 转换为字典。

此包将转换所有的 intlayer 文件，例如 `src/**/*.content.{ts|js|mjs|cjs|json}`。[查看如何声明您的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

要解释 intlayer 字典，您可以使用解释器，例如 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 或 [next-intlayer](https://www.npmjs.com/package/next-intlayer)。

## 配置文件支持

Intlayer 支持多种配置文件格式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

要了解如何配置可用的语言环境或其他参数，请参考[此处的配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 运行 intlayer 命令

### 构建字典

要构建您的字典，可以运行以下命令：

```bash
npx intlayer dictionaries build
```

或者使用监视模式

```bash
npx intlayer dictionaries build --watch
```

此命令将默认查找您的声明内容文件，例如 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`，并在 `.intlayer` 目录中构建字典。

### 推送字典

```bash
npx intlayer dictionary push
```

如果安装了 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md)，您还可以将字典推送到编辑器。此命令将使字典可用于[编辑器](https://intlayer.org/dashboard)。通过这种方式，您可以与团队共享字典并编辑内容，而无需编辑应用程序代码。

##### 参数：

- `-d`, `--dictionaries`: 要推送的字典ID。如果未指定，将推送所有字典。
  > 示例：`npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: 跳过询问是否在推送字典后删除语言目录，并删除。默认情况下，如果字典在本地定义，它将覆盖远程字典的内容。
  > 示例：`npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: 跳过询问是否在推送字典后删除语言目录，并保留。默认情况下，如果字典在本地定义，它将覆盖远程字典的内容。
  > 示例：`npx intlayer dictionary push -k`
- `--env`: 指定环境（例如：`development`、`production`）。
- `--env-file`: 提供自定义环境文件以加载变量。
- `--base-dir`: 指定项目的基本目录。
- `--verbose`: 启用详细日志记录以进行调试。
- `--git-diff`: 仅执行在git仓库中有未推送更改的字典。
- `--git-diff-base`: 指定git diff的基本引用。
- `--git-diff-current`: 指定git diff的当前引用。
- `--uncommitted`: 包含未提交的更改。
- `--unpushed`: 包含未推送的更改。
- `--untracked`: 包含未跟踪的文件。

### 拉取远程字典

```bash
npx intlayer dictionary pull
```

如果安装了 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md)，您还可以从编辑器拉取字典。通过这种方式，您可以根据应用程序的需要覆盖字典的内容。

##### 参数：

- `-d, --dictionaries`: 要拉取的字典ID。如果未指定，将拉取所有字典。
  > 示例：`npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: 新字典将存储的目录路径。如果未指定，新字典将存储在项目的`./intlayer-dictionaries`目录中。如果字典内容中指定了`filePath`字段，字典将存储在指定的`filePath`目录中，忽略此参数。
- `--env`: 指定环境（例如：`development`、`production`）。
- `--env-file`: 提供自定义环境文件以加载变量。
- `--base-dir`: 指定项目的基本目录。
- `--verbose`: 启用详细日志记录以进行调试。

##### 示例：

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 审核字典

```bash
npx intlayer audit
```

此命令分析您的内容声明文件中的潜在问题，例如缺失的翻译、结构不一致或类型不匹配。如果发现任何问题，**intlayer audit** 将提出或应用更新，以保持字典的一致性和完整性。

##### 参数：

- **`-f, --files [files...]`**  
  要审核的特定内容声明文件列表。如果未提供，将审核所有发现的 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 文件。

- **`--exclude [excludedGlobs...]`**  
  要从审核中排除的全局模式（例如 `--exclude "src/test/**"`）。

- **`--source-locale [sourceLocale]`**  
  要翻译的源语言。如果未指定，将使用配置中的默认语言。

- **`--output-locales [outputLocales...]`**  
  要翻译的目标语言。如果未指定，将使用配置中除源语言外的所有语言。

- **`--mode [mode]`**  
  翻译模式：'complete'、'review'或'missing-only'。默认为'missing-only'。

- **`--git-diff`**  
  仅执行在git仓库中有未推送更改的字典。

- **`--git-diff-base`**  
  指定git diff的基本引用。

- **`--git-diff-current`**  
  指定git diff的当前引用。

- **`--uncommitted`**  
  包含未提交的更改。

- **`--unpushed`**  
  包含未推送的更改。

- **`--untracked`**  
  包含未跟踪的文件。

- **`--keys [keys...]`**  
  基于指定键过滤字典。

- **`--excluded-keys [excludedKeys...]`**  
  基于指定键排除字典。

- **`--path-filter [pathFilters...]`**  
  基于文件路径的glob模式过滤字典。

- **`--model [model]`**  
  用于翻译的AI模型（例如：`gpt-3.5-turbo`）。

- **`--provider [provider]`**  
  用于翻译的AI提供商。

- **`--temperature [temperature]`**  
  AI模型的温度设置。

- **`--api-key [apiKey]`**  
  为AI服务提供您自己的API密钥。

- **`--custom-prompt [prompt]`**  
  为翻译指令提供自定义提示。

- **`--application-context [applicationContext]`**  
  为AI翻译提供额外的上下文。

- **`--env`**  
  指定环境（例如：`development`、`production`）。

- **`--env-file [envFile]`**  
  提供自定义环境文件以加载变量。

- **`--base-dir`**  
  指定项目的基本目录。

- **`--verbose`**  
  启用详细日志记录以进行调试。

##### 示例：

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

此命令将忽略 `tests/**` 下的任何文件，并使用 `gpt-3.5-turbo` 模型审核发现的内容声明文件。如果发现任何问题（例如缺失的翻译），它们将被就地修正，同时保留原始文件结构。

### 管理配置

#### 获取配置

`get configuration` 命令检索 Intlayer 的当前配置，特别是语言环境设置。这对于验证您的设置非常有用。

```bash
npx intlayer config get
```

##### 参数：

- **`--env`**: 指定环境（例如 `development`，`production`）。
- **`--env-file`**: 提供自定义环境文件以加载变量。
- **`--base-dir`**: 指定项目的基本目录。
- **`--verbose`**: 启用详细日志记录以进行调试。

#### 推送配置

`push configuration` 命令将您的配置上传到 Intlayer CMS 和编辑器。此步骤对于在 Intlayer 可视化编辑器中启用远程字典的使用是必要的。

```bash
npx intlayer config push
```

##### 参数：

- **`--env`**: 指定环境（例如 `development`，`production`）。
- **`--env-file`**: 提供自定义环境文件以加载变量。
- **`--base-dir`**: 指定项目的基本目录。
- **`--verbose`**: 启用详细日志记录以进行调试。

通过推送配置，您的项目将完全集成到 Intlayer CMS 中，从而实现团队间的无缝字典管理。

## 在 `package.json` 中使用 intlayer 命令

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## 调试 intlayer 命令

### 1. **确保使用最新版本**

运行:

```bash
npx intlayer --version                  # 当前本地 intlayer 版本
npx intlayer@latest --version          # 最新 intlayer 版本
```

### 2. **检查命令是否已注册**

您可以通过以下方式检查:

```bash
npx intlayer --help      # 显示可用命令列表和使用信息
man npx intlayer         # 显示命令的手册页（如果可用）
```

### 3. **重启终端**

有时需要重启终端才能识别新命令。

### 4. **清除 npx 缓存（如果卡在旧版本）**

```bash
npx clear-npx-cache
```
