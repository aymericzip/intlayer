---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 翻译文档
description: 学习如何使用 AI 翻译服务自动翻译文档文件。
keywords:
  - 翻译
  - 文档
  - 文档管理
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# 翻译文档

`doc translate` 命令使用 AI 翻译服务，自动将文档文件从基础语言环境翻译到目标语言环境。

```bash
npx intlayer doc translate
```

## 参数：

**文件列表选项：**

- **`--doc-pattern [docPattern...]`**：匹配要翻译的文档文件的全局模式。

  > 示例：`npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**：排除不翻译的文件的全局匹配模式。

  > 示例：`npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**：如果文件在指定时间之前被修改，则跳过该文件。
  - 可以是绝对时间，如 "2025-12-05"（字符串或 Date 类型）
  - 可以是相对时间，单位为毫秒，如 `1 * 60 * 60 * 1000`（1 小时）
  - 此选项通过 `fs.stat` 方法检查文件的更新时间，因此可能会受到 Git 或其他修改文件工具的影响。

  > 示例：`npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**：如果文件在指定时间内被修改，则跳过该文件。
  - 可以是绝对时间，如 "2025-12-05"（字符串或 Date 类型）
  - 可以是相对时间，单位为毫秒，如 `1 * 60 * 60 * 1000`（1 小时）
  - 此选项通过 `fs.stat` 方法检查文件的更新时间，因此可能会受到 Git 或其他修改文件工具的影响。

  > 示例：`npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**：如果文件已存在，则跳过该文件。

  > 示例：`npx intlayer doc translate --skip-if-exists`

**入口输出选项：**

- **`--locales [locales...]`**：目标语言，用于翻译文档。

  > 示例：`npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**：源语言，用于翻译的起始语言。

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
- **`--custom-prompt [prompt]`**：自定义用于翻译的基础提示。（注意：对于大多数用例，建议使用 `--custom-instructions` 选项，因为它能更好地控制翻译行为。）

  > 示例：`npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**环境变量选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file [envFile]`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。
- **`--no-cache`**：禁用缓存。

  > 示例: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**日志选项:**

- **`--verbose`**: 启用详细日志以便调试。（CLI 默认启用）

  > 示例: `npx intlayer doc translate --verbose`

**自定义指令选项:**

- **`--custom-instructions [customInstructions]`**: 添加到提示中的自定义指令。用于应用关于格式、URL 翻译等的特定规则。
  - 可以是绝对时间，如 "2025-12-05"（字符串或 Date 类型）
  - 可以是以毫秒为单位的相对时间，如 `1 * 60 * 60 * 1000`（1 小时）
  - 该选项通过 `fs.stat` 方法检查文件的更新时间，因此可能会受到 Git 或其他修改文件工具的影响。

  > 示例: `npx intlayer doc translate --custom-instructions "避免翻译网址，并保持 markdown 格式"`

  > 示例: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git 选项:**

- **`--git-diff`**: 仅针对包含从基础分支（默认 `origin/main`）到当前分支（默认 `HEAD`）的更改的字典运行。
- **`--git-diff-base`**: 指定 git diff 的基础参考（默认 `origin/main`）。
- **`--git-diff-current`**: 指定 git diff 的当前参考（默认 `HEAD`）。
- **`--uncommitted`**: 包含未提交的更改。
- **`--unpushed`**: 包含未推送的更改。
- **`--untracked`**: 包含未跟踪的文件。

  > 示例: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

> 示例: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> 请注意，输出文件路径将通过替换以下模式来确定
>
> - `/{{baseLocale}}/` 替换为 `/{{locale}}/`（Unix）
> - `\{{baseLocale}}\` 替换为 `\{{locale}}\`（Windows）
> - `_{{baseLocale}}.` 替换为 `_{{locale}}.`
> - `{{baseLocale}}_` 替换为 `{{locale}}_`
> - `.{{baseLocaleName}}.` 替换为 `.{{localeName}}.`
>
> 如果未找到上述模式，输出文件将在文件扩展名后添加 `.{{locale}}`。例如，`./my/file.md` 将被翻译为法语版本 `./my/file.fr.md`。
