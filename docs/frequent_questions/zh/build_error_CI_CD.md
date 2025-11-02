---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CD 中的构建错误
description: 了解如何修复在 CI/CD 环境中发生的构建错误。
keywords:
  - 构建
  - 错误
  - ci
  - cd
  - 流水线
  - intlayer
  - 字典
  - next.js
  - 预构建
  - 自动化
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# CI/CD 中的构建错误

如果你在 Next.js 中遇到如下错误：

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

这里有一些解决方案：

## 1. 缺少字典文件

确保字典文件在构建阶段被生成。

本地构建通常可以正常工作，但在 CI/CD 上却不行。原因是本地存在 `.intlayer` 目录，而在 CI/CD 上由于被排除在构建之外，所以不存在该目录。

你可以通过在项目的 `package.json` 中添加预构建脚本来解决此问题。

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // 构建前运行
    "build": "next build",
  },
}
```

> 注意，如果你使用 `withIntlayer` 函数，或者你框架的等效打包插件，预构建脚本会在构建之前自动运行。

## 2. 构建/运行时缺少环境变量

在容器或自动部署平台中，建议将 `.env` 文件排除在构建之外。

```text fileName=".gitignore or .dockerignore"
# 环境变量
.env
**/.env
.env.*
**/.env.*
```

如果你的环境变量在构建时不可用，将会抛出错误。

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL), // 使用环境变量设置元数据基础URL
});
```

这很可能与 Intlayer 无关。所以请检查你在 CI/CD 平台上构建时的环境变量配置。
