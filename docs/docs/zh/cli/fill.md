---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 填充字典
description: 学习如何使用 AI 填充、审核和翻译您的字典。
keywords:
  - 填充
  - 审核
  - 翻译
  - 字典
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# 填充 / 审核 / 翻译字典

```bash
npx intlayer fill
```

此命令会分析您的内容声明文件，查找潜在问题，例如缺失的翻译、结构不一致或类型不匹配。如果发现任何问题，**intlayer fill** 将建议或应用更新，以保持您的字典一致且完整。

## 别名：

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## 参数：

**文件列表选项：**

- **`-f, --file [files...]`**：要审核的特定内容声明文件列表。如果未提供，将审核根据您的配置文件设置发现的所有 `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` 文件。

  > 示例：`npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**：基于键过滤字典。如果未提供，将审核所有字典。

  > 示例：`npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**：基于键过滤字典（--keys 的别名）。

  > 示例：`npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**：基于键过滤排除字典。如果未提供，将审核所有字典。

  > 示例：`npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**：基于键过滤排除字典（--excluded-keys 的别名）。

  > 示例：`npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**：基于文件路径的 glob 模式过滤字典。

  > 示例：`npx intlayer dictionary fill --path-filter "src/home/**"`

**条目输出选项：**

- **`--source-locale [sourceLocale]`**：要翻译的源语言区域。如果未指定，将使用配置中的默认语言区域。

- **`--output-locales [outputLocales...]`**：目标翻译语言区域。如果未指定，将使用配置中的所有语言区域，除了源语言区域。

- **`--mode [mode]`**：翻译模式：`complete`（完整）、`review`（审核）。默认是 `complete`。`complete` 会填充所有缺失内容，`review` 会填充缺失内容并审核已有的键。

**Git 选项：**

- **`--git-diff`**：仅对包含从基准（默认 `origin/main`）到当前分支（默认 `HEAD`）的变更的字典执行操作。
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
- **`--application-context [applicationContext]`**：为 AI 翻译提供额外的上下文。

  > 示例：`npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "我的应用是一个猫咪商店"`

**环境变量选项：**

- **`--env`**：指定环境（例如，`development`，`production`）。
- **`--env-file [envFile]`**：提供自定义环境文件以加载变量。

  > 示例：`npx intlayer fill --env-file .env.production.local`

  > 示例：`npx intlayer fill --env production`

**配置选项：**

- **`--base-dir`**：指定项目的基础目录。

  > 示例：`npx intlayer fill --base-dir ./src`

- **`--no-cache`**：禁用缓存。

  > 示例：`npx intlayer build --no-cache`

**准备选项：**

- **`--build`**：在推送之前构建字典以确保内容是最新的。设置为 true 将强制构建，false 将跳过构建，undefined 将允许使用构建缓存。

- **`--skip-metadata`**：跳过为字典填写缺失的元数据（描述、标题、标签）。

**日志选项：**

- **`--verbose`**：启用详细日志以便调试。（CLI 默认启用）

## 示例：

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

该命令将使用 GPT-3.5 Turbo 模型，将 `src/home/` 目录下所有内容声明文件的内容从英语翻译为法语和西班牙语。
