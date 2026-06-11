---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 调试 Intlayer 命令
description: 学习如何调试和排查 Intlayer CLI 问题。
keywords:
  - 调试
  - 排查
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# 调试 intlayer 命令

## 1. **确保你使用的是最新版本**

运行：

```bash packageManager="npm"
npx intlayer --version                  # 当前本地 intlayer 版本
npx intlayer@latest --version           # 当前最新 intlayer 版本
```

```bash packageManager="yarn"
yarn intlayer --version                  # 当前本地 intlayer 版本
yarn intlayer@latest --version           # 当前最新 intlayer 版本
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # 当前本地 intlayer 版本
pnpm intlayer@latest --version           # 当前最新 intlayer 版本
```

```bash packageManager="bun"
bun x intlayer --version                  # 当前本地 intlayer 版本
bun x intlayer@latest --version           # 当前最新 intlayer 版本
```

## 2. **检查命令是否已注册**

你可以使用以下命令检查：

```bash packageManager="npm"
npx intlayer --help                     # 显示可用命令列表和使用信息
npx intlayer dictionary build --help    # 显示某个命令的可用选项列表
```

```bash packageManager="yarn"
yarn intlayer --help                     # 显示可用命令列表和使用信息
yarn intlayer dictionary build --help    # 显示某个命令的可用选项列表
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # 显示可用命令列表和使用信息
pnpm intlayer dictionary build --help    # 显示某个命令的可用选项列表
```

```bash packageManager="bun"
bun x intlayer --help                     # 显示可用命令列表和使用信息
bun x intlayer dictionary build --help    # 显示某个命令的可用选项列表
```

## 3. **重启你的终端**

有时需要重启终端才能识别新命令。

## 4. **清除 npx 缓存（如果你卡在旧版本）**

```bash
npx clear-npx-cache
```
