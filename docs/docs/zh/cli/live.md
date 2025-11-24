---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 实时同步命令
description: 了解如何使用实时同步在运行时反映 CMS 内容更改。
keywords:
  - 实时同步
  - CMS
  - 运行时
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# 实时同步命令

实时同步让您的应用在运行时反映 CMS 内容的更改。无需重新构建或重新部署。启用后，更新会被流式传输到实时同步服务器，该服务器会刷新您的应用读取的字典。详情请参见 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## 参数：

**配置选项：**

- **`--base-dir`**：指定项目的基础目录。命令将在该基础目录中查找 `intlayer.config.{ts,js,json,cjs,mjs}` 文件以获取 intlayer 配置。

- **`--no-cache`**：禁用缓存。

  > 示例：`npx intlayer dictionary push --env-file .env.production.local`

**日志选项：**

- **`--verbose`**：启用详细日志以便调试。（CLI 默认启用）
