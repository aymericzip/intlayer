---
createdAt: 2024-08-11
updatedAt: 2026-10-08
priority: 5
title: "intlayer version：查看已安装的 CLI"
description: "查看项目中安装的 Intlayer CLI 及其依赖包的版本，便于排查版本不一致的错误。"
keywords:
  - 版本
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - version
author: aymericzip
---

# 检查 CLI 版本

```bash packageManager="npm"
npx intlayer --version
npx intlayer version
```

```bash packageManager="yarn"
yarn intlayer --version
yarn intlayer version
```

```bash packageManager="pnpm"
pnpm intlayer --version
pnpm intlayer version
```

```bash packageManager="bun"
bun x intlayer --version
bun x intlayer version
```

这两个命令都会打印已安装的 Intlayer CLI 版本。
