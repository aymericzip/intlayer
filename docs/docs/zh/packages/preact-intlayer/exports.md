---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: preact-intlayer 包文档
description: 用于 Preact 的 Intlayer 集成，为 Preact 应用提供 providers 和 hooks。
keywords:
  - preact-intlayer
  - preact
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出的文档
---

# preact-intlayer 包

`preact-intlayer` 包提供将 Intlayer 集成到 Preact 应用所需的工具。它包括用于处理多语言内容的 providers 和 hooks。

## 安装

```bash
npm install preact-intlayer
```

## 导出

### Provider（提供者）

| 组件               | 描述                                                  |
| ------------------ | ----------------------------------------------------- |
| `IntlayerProvider` | 主要的 provider，包裹你的应用并提供 Intlayer 上下文。 |

### 钩子

| 钩子            | 描述                                                            | 相关文档                                                                                        |
| --------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `useIntlayer`   | 基于 `useDictionary`，但注入来自生成声明的优化版本的字典。      | -                                                                                               |
| `useDictionary` | 处理类似字典的对象（key，content）。它处理 `t()` 翻译、枚举等。 | -                                                                                               |
| `useLocale`     | 返回当前 locale 以及用于设置它的函数。                          | -                                                                                               |
| `t`             | 根据当前 locale 选择内容。                                      | [翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md) |

### 组件

| 组件               | 描述                                  |
| ------------------ | ------------------------------------- |
| `MarkdownProvider` | 用于 markdown 渲染上下文的 Provider。 |
| `MarkdownRenderer` | 使用自定义组件渲染 markdown 内容。    |
