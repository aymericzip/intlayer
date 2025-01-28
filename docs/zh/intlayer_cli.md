# Intlayer CLI

## 安装包

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> 如果 `intlayer` 包已经安装，cli 会自动安装。您可以跳过此步骤。

## intlayer-cli 包

`intlayer-cli` 包旨在将您的 [intlayer 声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md) 转换为字典。

此包将转换所有 intlayer 文件，例如 `src/**/*.content.{ts|js|mjs|cjs|json}`。 [查看如何声明您的 Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

要解释 intlayer 字典，您可以使用解释器，例如 [react-intlayer](https://www.npmjs.com/package/react-intlayer) 或 [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## 配置文件支持

Intlayer 支持多种配置文件格式：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

要了解如何配置可用的地区或其他参数，请参阅 [此处的配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 运行 intlayer 命令

### 构建字典

要构建您的字典，可以运行以下命令：

```bash
npx intlayer build
```

或在监视模式下

```bash
npx intlayer build --watch
```

此命令将默认查找您的声明内容文件，路径为 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`。并在 `.intlayer` 目录中构建字典。

### 推送字典

```bash
npx intlayer dictionary push
```

如果安装了 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)，您也可以将字典推送到编辑器。此命令将使字典可用于 [编辑器](https://intlayer.org/dashboard)。这样，您可以与团队共享字典并在不编辑应用程序代码的情况下编辑内容。

##### 参数：

- `-d`, `--dictionaries`：要拉取的字典的ID。如果未指定，将推送所有字典。
  > 示例：`npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`：跳过询问推送字典后是否删除地区目录的问题，并将其删除。默认情况下，如果字典在本地定义，它将覆盖远程字典内容。
  > 示例：`npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`：跳过询问推送字典后是否删除地区目录的问题，并保留它们。默认情况下，如果字典在本地定义，它将覆盖远程字典内容。
  > 示例：`npx intlayer dictionary push -k`

### 拉取远程字典

```bash
npx intlayer dictionary pull
```

如果安装了 [intlayer 编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)，您也可以从编辑器拉取字典。这样，您可以覆盖字典的内容，以满足应用程序的需求。

##### 参数：

- `-d, --dictionaries`：要拉取的字典的ID。如果未指定，将拉取所有字典。
  > 示例：`npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : 新字典将保存的目录路径。如果未指定，新字典将保存在项目的 `./intlayer-dictionaries` 目录中。如果您的字典内容中指定了 `filePath` 字段，字典将不考虑此参数并保存在指定的 `filePath` 目录中。

##### 示例：

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### 审计字典

```bash
npx intlayer audit
```

此命令分析您的内容声明文件，以查找潜在问题，例如缺失的翻译、结构不一致或类型不匹配。如果发现任何问题，**intlayer audit** 将建议或应用更新，以保持您的字典一致和完整。

##### 参数：

- **`-f, --files [files...]`**  
  要审核的特定内容声明文件列表。如果未提供，将审核所有发现的 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 文件。

- **`--exclude [excludedGlobs...]`**  
  要从审计中排除的模式 (例如 `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  用于审计的 ChatGPT 模型 (例如 `gpt-3.5-turbo`)。

- **`-p, --custom-prompt [prompt]`**  
  为您的审计指令提供自定义提示。

- **`-l, --async-limit [asyncLimit]`**  
  同时处理的最大文件数量。

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  提供您自己的 OpenAI API 密钥以绕过 OAuth2 认证。

##### 示例：

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

此命令将忽略 `tests/**` 下的任何文件，并使用 `gpt-3.5-turbo` 模型来审核发现的内容声明文件。如果发现任何问题 — 比如缺失的翻译 — 将会就地纠正，保留原始文件结构。

## 在您的 `package.json` 中使用 intlayer 命令

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
