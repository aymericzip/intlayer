---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 我遇到了与子包 @intlayer/* 相关的错误
description: 解决与子包 @intlayer/* 相关的错误。
keywords:
  - @intlayer/*
  - 子包
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# 我遇到了与子包 `@intlayer/*` 相关的错误

此问题通常发生在更新 Intlayer 包之后。

错误信息示例：

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ 错误  在 "node_modules/@intlayer/config/dist/esm/client.mjs" 中没有匹配的导出用于导入 "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## 原因

基础包如 `intlayer`、`react-intlayer`、`react-native-intlayer`、`vue-intlayer` 复用了相同的子包，如 `@intlayer/config`、`@intlayer/core`、`@intlayer/types`，以避免代码重复。

在两个版本之间，子包的导出不保证是相同的。为限制此问题，intlayer 将子包的版本固定为主包的版本。

> 例如：`intlayer@1.0.0` 使用 `@intlayer/config@1.0.0`、`@intlayer/core@1.0.0`、`@intlayer/types@1.0.0`

> （除了 `@intlayer/swc`），`@intlayer/*` 子包不建议直接使用。因此我们建议不要直接安装它们。

## 解决方案

1. 确保主包和子包的版本一致。

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // 版本错误，应该是 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. 尝试删除锁文件和 node_modules 文件夹并重新安装依赖。

有时，包管理器会在缓存的锁文件中保留子包的旧版本。为了解决这个问题，你可以尝试删除锁文件和 node_modules 文件夹，然后重新安装依赖。

```bash
rm -rf package-lock.json node_modules
npm install
```

3. 检查全局安装

我们建议全局安装 `intlayer` 或 `intlayer-cli` 以访问 CLI 命令。如果全局版本与本地版本不一致，包管理器可能会使用错误的版本。

**检查某个包是否已全局安装**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**修复潜在的全局依赖冲突**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. 尝试清理缓存

在某些环境中，如 docker、GitHub Actions 或 Vercel 等网站托管平台，可能存在缓存。您可以尝试清理缓存并重新安装。

您也可以尝试使用以下命令清理包管理器的缓存：

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
