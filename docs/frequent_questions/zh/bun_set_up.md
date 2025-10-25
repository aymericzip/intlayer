---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 使用 bun 时出现模块未找到错误
description: 解决使用 bun 时的错误。
keywords:
  - bun
  - 模块未找到
  - intlayer
  - 配置
  - 包管理器
slugs:
  - doc
  - faq
  - bun-set-up
---

# 使用 bun 时出现模块未找到错误

## 问题描述

使用 bun 时，您可能会遇到如下错误：

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## 原因

Intlayer 内部使用了 `require`。而 bun 将 require 函数的作用域限制为只解析 `@intlayer/config` 包的依赖，而不是整个项目。

## 解决方案

### 在配置中提供 `require` 函数

```ts
const config: IntlayerConfig = {
  build: {
    require, // 在构建配置中提供 require 函数
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // 使用 withIntlayer 时传入 require 函数
});

export default configuration;
```
