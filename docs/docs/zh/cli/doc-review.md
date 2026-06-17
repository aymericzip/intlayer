---
createdAt: 2024-08-11
updatedAt: 2026-06-17
title: 审核文档
description: 学习如何审核不同语言版本的文档文件，以确保质量、一致性和完整性。
keywords:
  - 审核
  - 文档
  - 文档管理
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
history:
  - version: 9.0.0
    date: 2026-06-17
    changes: "添加 --log 选项"
author: aymericzip
---

# 审核文档

`doc review` 命令用于分析不同语言版本的文档文件，检查其质量、一致性和完整性。

## 关键要点：

- 将大型 markdown 文件拆分为块，以保持在 AI 模型的上下文窗口限制内。
- 优化要审查的块，跳过已翻译且未更改的部分。
- 使用队列系统并行处理文件、块和语言环境以提高速度。

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

该命令可用于审核已翻译的文件，并检查翻译是否正确。

在大多数使用场景中，

- 当该文件的翻译版本不可用时，优先使用 `doc translate`。
- 当该文件的翻译版本已存在时，优先使用 `doc review`。

> 请注意，审核过程比翻译过程消耗更多的输入令牌来完整审核同一文件。然而，审核过程会优化需要审核的块，并跳过未更改的部分。

## 参数：

**文件列表选项：**

- **`--doc-pattern [docPattern...]`**：匹配要审核的文档文件的全局模式。

  > 示例：`npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**：排除不审核的文件的全局匹配模式。

  > 示例：`npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**：如果文件在指定时间之前被修改，则跳过该文件。
  - 可以是绝对时间，如 "2025-12-05"（字符串或 Date 类型）
  - 可以是相对时间，单位为毫秒，如 `1 * 60 * 60 * 1000`（1 小时）
  - 此选项通过 `fs.stat` 方法检查文件的更新时间，因此可能会受到 Git 或其他修改文件工具的影响。

  > 示例：`npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**：如果文件在指定时间内被修改，则跳过该文件。
  - 可以是绝对时间，如 "2025-12-05"（字符串或 Date 类型）
  - 可以是相对时间，单位为毫秒，如 `1 * 60 * 60 * 1000`（1 小时）
  - 此选项通过 `fs.stat` 方法检查文件的更新时间，因此可能会受到 Git 或其他修改文件工具的影响。

  > 示例：`npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**：如果文件已存在，则跳过该文件。

  > 示例：`npx intlayer doc review --skip-if-exists`

**审核模式选项：**

- **`--log`**：仅记录模式。不使用 AI 进行翻译；而是记录需要关注的块（带有行号和内容），供基础语言环境和目标语言环境参考，以帮助另一个代理生成翻译。

  > 示例：`npx intlayer doc review --log`

**入口输出选项：**

- **`--locales [locales...]`**：目标语言，用于审核文档。

  > 示例：`npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**：源语言（基础文档），用于对比的起始语言。

  > 示例：`npx intlayer doc review --base-locale en`

**文件处理选项：**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**：同时处理审核的文件数量。

  > 示例：`npx intlayer doc review --nb-simultaneous-file-processed 5`

**AI 选项：**

- **`--model [model]`**：用于审核的 AI 模型（例如，`gpt-3.5-turbo`）。
- **`--provider [provider]`**：用于审核的 AI 提供商。
- **`--temperature [temperature]`**：AI 模型的温度设置。
- **`--api-key [apiKey]`**：为 AI 服务提供您自己的 API 密钥。
- **`--application-context [applicationContext]`**：为 AI 审核提供额外的上下文信息。
- **`--data-serialization [dataSerialization]`**：用于 Intlayer AI 功能的数据序列化格式。选项：`json`（标准、可靠），`toon`（更少 token，但一致性较低）。
- **`--custom-prompt [prompt]`**：自定义用于审核的基础提示。（注意：对于大多数用例，建议使用 `--custom-instructions` 选项，因为它能更好地控制审核行为。）

  > 示例：`npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**环境变量选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file [envFile]`**：提供自定义环境文件以加载变量。
- **`--base-dir`**：指定项目的基础目录。
- **`--no-cache`**：禁用缓存。

  > 示例: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**日志选项:**

- **`--verbose`**: 启用详细日志以便调试。（CLI 默认启用）

  > 示例: `npx intlayer doc review --verbose`

**自定义指令选项:**

- **`--custom-instructions [customInstructions]`**: 添加到提示中的自定义指令。用于应用关于格式、URL 翻译等的特定规则。

  > 示例: `npx intlayer doc review --custom-instructions "避免翻译网址，并保持 markdown 格式"`

  > 示例: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Git 选项:**

- **`--git-diff`**: 仅针对包含从基础分支（默认 `origin/main`）到当前分支（默认 `HEAD`）的更改的文件运行。
- **`--git-diff-base`**: 指定 git diff 的基础参考（默认 `origin/main`）。
- **`--git-diff-current`**: 指定 git diff 的当前参考（默认 `HEAD`）。
- **`--uncommitted`**: 包含未提交的更改。
- **`--unpushed`**: 包含未推送的更改。
- **`--untracked`**: 包含未跟踪的文件。

  > 示例: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 示例: `npx intlayer doc review --uncommitted --unpushed --untracked`

> 请注意，输出文件路径将通过替换以下模式来确定：
>
> - `/{{baseLocale}}/` 替换为 `/{{locale}}/`（Unix）
> - `\{{baseLocale}}\` 替换为 `\{{locale}}\`（Windows）
> - `_{{baseLocale}}.` 替换为 `_{{locale}}.`
> - `{{baseLocale}}_` 替换为 `{{locale}}_`
> - `.{{baseLocaleName}}.` 替换为 `.{{localeName}}.`
>
> 如果未找到上述模式，输出文件将在文件扩展名后添加 `.{{locale}}`。例如，`./my/file.md` 将被审核并为法语版本更新为 `./my/file.fr.md`。
