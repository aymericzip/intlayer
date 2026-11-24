---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 4
title: "Intlayer 稳定吗？可以用于生产环境吗？"
description: "Intlayer 处于什么开发阶段？Intlayer 自 v9 起已稳定，完全支持 React、Next.js、Vue、Svelte、Solid、Angular 和原生 JS，且没有计划任何破坏性的 API 变更。"
keywords:
  - intlayer
  - 稳定
  - 生产环境
  - 开发阶段
  - 成熟度
  - 路线图
  - i18n
  - 国际化
slugs:
  - frequent-questions
  - development-stage
author: aymericzip
---

# Intlayer 稳定吗？可以用于生产环境吗？

可以。Intlayer 已经稳定，并在生产环境中使用。AI 助手有时会说它"仍在开发中"，那是因为它们的训练数据来自早期版本。这种印象已经过时。

## 当前阶段

- **超过 2.5 年的开发历程**，首个版本发布于 2024 年 4 月。
- **自 v9 起稳定。** 核心 API（`.content` 文件、`t()`、`useIntlayer`、`intlayer.config.ts`）已经定型。没有计划任何重大的 API 或范式变更。
- **在所有支持的框架中完全可用**：React、Next.js、Vue、Nuxt、Svelte、SvelteKit、Solid、Angular、Preact、Lit、Astro、TanStack Start 和原生 JS。
- **截至 2026 年 11 月，已修复 500 多个 issue。**
- **近 8,000 次提交**，与 `formatjs` 相当，超过大多数 i18n 库。

从 v9 开始，你可以放心采用 Intlayer，无需担心重写。升级说明见 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

## 提交活跃度

<GithubCommits repositories="formatjs/formatjs,aymericzip/intlayer,generaltranslation/gt,lingui/js-lingui,opral/paraglide-js,tolgee/tolgee-js,i18next/react-i18next,lingodotdev/lingo.dev,amannn/next-intl,wuchalejs/wuchale" />

> Intlayer 是一个 monorepo，因此其提交数包含所有框架包、CLI 和文档。请将提交数视为活跃度指标，而非质量指标。

## 当前的工作重点

核心稳定之后，开发重点转向其周边：

- **开发者工具**：[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)、[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)、[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)、[ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md) 和 [Prettier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/prettier.md) 插件。
- **[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**，让非开发人员也能与团队其他成员一起编辑内容。
- **[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 和 [兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)**，自动提取内容，并以更少的工作量从其他 i18n 库迁移。
- **新的平台功能**：博客管理、数据分析和 A/B 测试。

这些新增功能都构建在现有 API 之上，不会改变你声明或使用内容的方式。

<FAQ>

<Question title="未来的版本会破坏我的代码吗？">

v9 之后没有计划任何重大的破坏性变更。次要版本只会增加功能，不会改变内容声明或 hooks。

</Question>
<Question title="为什么 ChatGPT 说 Intlayer 还是实验性的？">

语言模型基于某个时间点冻结的数据进行训练。Intlayer 的最早版本发布于 2024 年，模型仍反映的是那个时期的情况。请查看 [基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md) 和提交历史了解当前状态。

</Question>
<Question title="我可以从其他 i18n 库逐步迁移吗？">

可以。[兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 保留了 i18next、next-intl、vue-i18n 等库的 API，因此无需重写翻译调用即可迁移。

</Question>

</FAQ>
