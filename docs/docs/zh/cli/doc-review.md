---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# 审核文档

`doc review` 命令用于分析不同语言版本的文档文件，检查其质量、一致性和完整性。

## 关键要点：

- 将大型 markdown 文件拆分为块，以保持在 AI 模型的上下文窗口限制内。
- 优化要审查的块，跳过已翻译且未更改的部分。
- 使用队列系统并行处理文件、块和语言环境以提高速度。

```bash
npx intlayer doc review
```

该命令可用于审核已翻译的文件，并检查翻译是否正确。

在大多数使用场景中，

- 当该文件的翻译版本不可用时，优先使用 `doc translate`。
- 当该文件的翻译版本已存在时，优先使用 `doc review`。

> 请注意，审核过程比翻译过程消耗更多的输入令牌来完整审核同一文件。然而，审核过程会优化需要审核的块，并跳过未更改的部分。

## 参数：

`doc review` 命令接受与 `doc translate` 相同的参数，允许您审核特定的文档文件并应用质量检查。

如果您启用了其中一个 git 选项，命令将只审核文件中发生更改的部分。脚本会将文件分块处理并审核每个块。如果某个块没有更改，脚本将跳过该块，以加快审核过程并限制 AI 提供商 API 的成本。

有关完整的参数列表，请参阅[翻译文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/doc-translate.md)命令文档。
