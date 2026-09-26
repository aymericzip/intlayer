---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 4
title: 如何限制 Claude Code 生成翻译时的 Token 消耗
description: 为什么使用 Claude Code 进行翻译会大量消耗 Token，Intlayer 如何取而代之（过滤已翻译的键、切分 JSON、逐块翻译 Markdown），以及如何通过 claude setup-token 复用 Claude 订阅。
keywords:
  - claude code
  - tokens
  - token 消耗
  - setup-token
  - i18n
  - 国际化
  - 翻译
  - fill
  - mcp
  - agent
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# 如何限制 Claude Code 生成翻译时的 Token 消耗

## 问题描述

让 Claude Code（或任何编码 Agent）直接翻译内容是最昂贵的做法。每次执行时，Agent 都必须：

- 将整个 JSON 或内容文件加载到上下文中，甚至包括已经翻译过的键。
- 检索相关文件以确定内容的存放位置和结构。
- 分析缺少哪些语言环境（Locales）并需要生成。
- 每次都要重新阅读您的自定义指令（“按此规则转换 URL”，“保留英文品牌名称”，“使用非正式语气”等）。
- 重写整个文件，包括未发生变动的部分。

所有这些内容在每次对话轮次中都会被重新发送，导致成本随着 `内容大小 × 语言环境数量 × 对话轮次` 呈倍数增长，而且格式或键名出现的任何偏差都必须手动排查。

## Intlayer 采取的替代方案

Intlayer 的优势在于将这些工作移至 Agent 之外，通过专为翻译构建的流水线来完成：

- **过滤已存在的翻译**以限制 Token 消耗。JSON 中已翻译的键会被剥离，仅将缺失的键发送给模型。
- **逐块翻译 Markdown。** 对于文档，[`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-translate.md) 与 [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-review.md) 会将每个文本块与基础文档进行比对，直接跳过已翻译或未更改的块。
- **超大 JSON 自动分块（Chunking）**，使其始终处于上下文窗口的最佳处理区间内。
- **扁平化与重构 JSON** 以优化 Token 消耗。
- **插入自定义 Prompt** 以适配品牌与术语规则（`applicationContext`, `--custom-instructions`），只需编写一次，无需在每次对话中反复传递。
- **校验数据结构**以确保一致性并防止键名漂移，同时完整保留原始排版格式（Markdown、HTML、插值、复数等）。
- **内置重试机制**以应对输出格式错误。
- **请求排队与并行处理**跨文件、分块和语言环境，显著提高翻译速度。

所有这些工作都不会占用 Agent 的上下文。黄金法则是：让 Agent 决定**需要国际化什么**，而让 Intlayer 处理繁重的重复性流水线。

## 解决方案

### 1. 将提取工作委托给 `intlayer extract`

无需让 Agent 手动重写每个组件，直接运行 [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 命令即可。它会将硬编码字符串提取到组件同目录下的 `.content` 文件中，而不会将完整文件加载到 Agent 上下文中。

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. 将翻译工作委托给 `intlayer fill`

切勿让 Agent 直接进行翻译。[`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 命令会自动应用上述流水线：只发送缺失的键、进行分块、并行处理各个语言环境，并将结果写回内容文件中。

```bash
npx intlayer fill
```

通过几个参数可以精简执行范围：

- `--git-diff`（或 `--uncommitted`）仅处理当前分支中发生更改的字典。
- `--file` 或 `--keys` 针对特定的内容文件。
- `--output-locales fr es` 仅限制在当前实际需要的语言环境中。
- `--skip-metadata` 跳过标题、描述和标签的生成。
- `--data-serialization toon` 向模型发送更紧凑的数据格式（更少的 Token，输出略微不可控）。

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. 使用 `doc translate` 与 `doc review` 翻译 Markdown

让 Agent 翻译 `.md` 文件意味着每次修改都要在每个语言环境中粘贴整个文档。而 [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-translate.md) 和 [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-review.md) 命令则是按文本块逐步处理的。

当目标翻译文件尚不存在时，使用 `doc translate`。它会将 Markdown 分块、并行翻译并写入目标文件：

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

当翻译文件已存在时，使用 `doc review`。它会将每个块与基础文档对比，跳过已翻译或未更改的块，仅发送有差异的块：

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

这两个命令均支持一次性设置规则，无需在每次提示词中重复：

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

在需要 Agent 参与但无需 Intlayer 发起 AI 调用的场景下，`doc review` 的两种模式非常实用：

- `--mode report` 输出需要关注的文本块及行号，让 Agent 仅修改这些特定块。
- `--mode synthesis` 仅输出哪些文档是最新的，哪些文档仍有待编辑的块。

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. 让 Agent 通过 MCP 服务调用 CLI

借助 [Intlayer MCP 服务](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)，Agent 可以依据最新的文档回答，并自行执行 `intlayer fill` 或 `intlayer doc review`，而无需在对话中重新实现这些逻辑。

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

通过 `npx intlayer init skills` 安装 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)，还可以避免 Agent 盲目猜测 Intlayer API 或在每个任务中重复阅读文档。

### 5. 通过 `claude setup-token` 复用 Claude 订阅

在交互式 Claude Code 会话中运行国际化设置会将整个对话历史保留在上下文中。将繁重的工作移至简短的无头（Headless）会话中执行：

从 Claude 订阅中生成长效 Token：

```bash
claude setup-token
```

将其存储为 `CLAUDE_CODE_OAUTH_TOKEN`（保存在 `.env` 文件或 CI 环境变量中），然后在单次会话中复用它以运行 Intlayer 命令：

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

该会话仅包含该 Prompt 和命令输出，无需携带冗长的对话上下文。同一个 Token 也可以在 [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) 中使用，从而在每次 Pull Request 时运行 `intlayer fill`。

> 通过 `claude setup-token` 颁发的 Token 仅用于 Claude Code 认证。它不能在 `ai.apiKey` 中作为 Anthropic API Key 使用。对于翻译本身，`intlayer fill` 会使用您的 [Intlayer 账户](https://app.intlayer.org)（包含免费额度）或在 [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#ai-configuration) 中配置的专属模型 Key。

## 总结

| 任务               | 执行者                   | Agent 上下文中的 Token 消耗 |
| ------------------ | ------------------------ | --------------------------- |
| 决定要本地化的内容 | Claude Code              | 低                          |
| 提取文本字符串     | `intlayer extract`       | 无                          |
| 翻译声明内容       | `intlayer fill`          | 无                          |
| 翻译 Markdown 文档 | `intlayer doc translate` | 无                          |
| 更新 Markdown 文档 | `intlayer doc review`    | 无                          |
| 批量执行命令       | Headless Claude Code     | 仅 Prompt + 命令输出        |
