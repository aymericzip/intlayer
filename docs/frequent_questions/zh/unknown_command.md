---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 未知命令
description: 了解如何修复未知命令错误。
keywords:
  - 未知
  - 命令
  - 错误
  - intlayer
  - fill
  - build
  - verbose
  - 终端
  - 重启
  - 本地
slugs:
  - frequent-questions
  - unknown-command
---

# 错误：未知命令 fill / build / 等等

如果 `npx intlayer fill --verbose` 显示：

```
error: unknown command 'fill'
```

但你确定 `fill` 命令 _应该_ 存在，以下是解决步骤：

## 1. **确保你使用的是最新版本**

运行：

```bash
npx intlayer --version                  # 当前本地 intlayer 版本
npx intlayer@latest --version           # 当前最新 intlayer 版本
```

这会强制 `npx` 拉取最新版本。然后再试一次：

```bash
npx intlayer@latest build --verbose
```

## 2. **检查命令是否已注册**

你可以运行：

```bash
npx intlayer --help                     # 提供与命令相关的信息
```

查看命令列表中是否出现该命令。

进入代码仓库，确认你的命令是否已导出并在 CLI 入口点注册。Intlayer 使用了 `commander` 作为框架。

CLI 相关代码：
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **重启你的终端**

有时需要重启终端才能识别新命令。

## 5. **如果你正在开发 `intlayer`，请重新构建并链接它**

如果你在本地开发 `intlayer`：

```bash
# 在 intlayer 目录下
npm install
npm run build
npm link
```

然后在另一个终端中运行：

```bash
intlayer fill --verbose
```

这将使用你正在开发的本地版本。

## 6. **清除 npx 缓存（如果你卡在旧版本）**

```bash
npx clear-npx-cache
```

或者手动删除缓存的 intlayer 包：

```bash
rm -rf ~/.npm/_npx
```

如果你使用 pnpm、yarn、bun 或其他包管理器，请检查相应的清除缓存命令。
