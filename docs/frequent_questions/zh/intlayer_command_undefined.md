---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Intlayer 命令未定义
description: 了解如何修复 intlayer 命令未定义错误。
keywords:
  - intlayer
  - 命令
  - 未定义
  - 错误
  - vscode
  - 扩展
  - 插件
  - 框架
  - next.js
  - vite
slugs:
  - 文档
  - 常见问题
  - intlayer-命令-未定义
---

# Intlayer 命令未定义

## 概述

Intlayer CLI 提供了一种便捷的方式来管理您的 intlayer 内容，包括构建词典、推送翻译等功能。然而，它并不是您的项目正常运行的必需品。如果您使用的是打包插件（例如 Next.js 的 `withIntlayer()` 或 Vite 的 `intlayerPlugin()`），Intlayer 会在应用构建或开发服务器启动时自动构建词典。在开发模式下，它还会监视更改并自动重建内容声明文件。

您可以通过以下不同方式访问 intlayer 命令：

- 直接使用 `intlayer` CLI 命令
- 使用 [VSCode 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- 使用 `@intlayer/cli` SDK

## 问题

尝试使用 `intlayer` 命令时，您可能会遇到以下错误：

```bash
'intlayer' 不是内部或外部命令，也不是可运行的程序或批处理文件。
```

## 解决方案

请按顺序尝试以下解决方案：

1. **验证命令是否已安装**

```bash
npx intlayer -h
```

预期输出：

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            输出版本号
    -h, --help               显示命令帮助

Commands:
    dictionary|dictionaries  词典操作
    configuration|config     配置操作
    help [command]           显示命令帮助
```

2. **全局安装 intlayer-cli 包**

```bash
npm install intlayer-cli -g -g
```

> 如果你已经安装了 `intlayer` 包，通常不需要这样做

3. **全局安装该包**

```bash
npm install intlayer -g
```

4. **重启你的终端**  
   有时需要重启终端才能识别新命令。

5. **清理并重新安装**  
   如果上述解决方案无效：

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **验证安装文件**  
   如果问题仍然存在，检查以下文件是否存在：

   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json`（应包含指向 `./dist/cjs/cli.cjs` 的 `bin` 字段）

7. **检查 PATH 环境变量**  
   确保 npm 全局 bin 目录在你的 PATH 中：

```bash
# 对于基于 Unix 的系统（macOS/Linux）
echo $PATH
# 应该包含类似 /usr/local/bin 或 ~/.npm-global/bin 的路径

# 对于 Windows
echo %PATH%
# 应该包含 npm 全局 bin 目录
```

8. **使用带完整路径的 npx**
   如果命令仍然找不到，尝试使用带完整路径的 npx：

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **检查冲突的安装**

```bash
# 列出所有全局安装的包
npm list -g --depth=0

# 移除任何冲突的全局安装
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# 然后重新安装
npm install -g intlayer
```

10. **验证 Node.js 和 npm 版本**
    确保你使用的是兼容的版本：

```bash
node --version
npm --version
```

    如果你使用的是过时的版本，考虑更新 Node.js 和 npm。

11. **检查权限问题**  
    如果遇到权限错误：

```bash
# 对于基于 Unix 的系统
sudo npm install -g intlayer

# 或者更改 npm 的默认目录
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# 添加到你的 ~/.profile 或 ~/.bashrc 文件中：
export PATH=~/.npm-global/bin:$PATH
```
