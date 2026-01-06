---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: CI 命令
description: 了解如何在 CI/CD 管道和 monorepo 中使用自动注入的凭据运行 Intlayer 命令。
keywords:
  - CI
  - CI/CD
  - 自动化
  - Monorepo
  - 凭据
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: 添加 CI 命令
---

# CI 命令

```bash
npx intlayer ci <command...>
```

CI 命令专为自动化和 CI/CD 管道而设计。它会自动从 `INTLAYER_PROJECT_CREDENTIALS` 环境变量注入凭据，并可以在 monorepo 中的多个项目上运行 Intlayer 命令。

## 工作原理

CI 命令以两种模式运行：

1. **单项目模式**：如果当前工作目录与 `INTLAYER_PROJECT_CREDENTIALS` 中的项目路径之一匹配，则仅针对该特定项目运行命令。

2. **迭代模式**：如果未检测到特定的项目上下文，它会遍历所有已配置的项目并为每个项目运行命令。

## 环境变量

该命令需要设置 `INTLAYER_PROJECT_CREDENTIALS` 环境变量。此变量应包含一个 JSON 对象，将项目路径映射到其凭据：

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## 包管理器检测

CI 命令会根据 `npm_config_user_agent` 环境变量自动检测正在使用的包管理器（npm、yarn、pnpm 或 bun），并使用适当的命令来执行 Intlayer。

## 参数

- **`<command...>`**：要执行的 Intlayer 命令（例如，`fill`、`push`、`build`）。您可以传递任何 Intlayer 命令及其参数。

  > 示例: `npx intlayer ci fill --verbose`
  >
  > 示例: `npx intlayer ci push`
  >
  > 示例: `npx intlayer ci build`

## 示例

### 在单项目模式下运行命令

如果您在匹配 `INTLAYER_PROJECT_CREDENTIALS` 中路径之一的项目目录中：

```bash
cd packages/app
npx intlayer ci fill
```

这将为 `packages/app` 项目自动注入凭据并运行 `fill` 命令。

### 在所有项目上运行命令

如果您在未匹配任何项目路径的目录中，该命令将遍历所有已配置的项目：

```bash
cd /path/to/monorepo
npx intlayer ci push
```

这将为 `INTLAYER_PROJECT_CREDENTIALS` 中配置的每个项目运行 `push` 命令。

### 传递额外标志

您可以将任何标志传递给底层 Intlayer 命令：

```bash
npx intlayer ci fill --verbose --mode complete
```

### 在 CI/CD 管道中使用

在您的 CI/CD 配置中（例如，GitHub Actions、GitLab CI），将 `INTLAYER_PROJECT_CREDENTIALS` 设置为密钥：

```yaml
# GitHub Actions 示例
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: 填充字典
    run: npx intlayer ci fill
```

## 错误处理

- 如果未设置 `INTLAYER_PROJECT_CREDENTIALS`，命令将以错误退出。
- 如果 `INTLAYER_PROJECT_CREDENTIALS` 不是有效的 JSON，命令将以错误退出。
- 如果项目路径不存在，将跳过并显示警告。
- 如果任何项目失败，命令将以非零状态代码退出。

## 使用场景

- **Monorepo 自动化**：在 monorepo 中的多个项目上运行 Intlayer 命令
- **CI/CD 管道**：在持续集成工作流中自动化字典管理
- **批量操作**：同时对多个 Intlayer 项目执行相同操作
- **密钥管理**：使用环境变量安全地管理多个项目的凭据

## 安全最佳实践

- 在 CI/CD 平台中将 `INTLAYER_PROJECT_CREDENTIALS` 存储为加密密钥
- 永远不要将凭据提交到版本控制
- 为不同的部署环境使用特定于环境的凭据
- 定期轮换凭据
