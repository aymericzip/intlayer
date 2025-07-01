---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CD 集成
description: 了解如何将 Intlayer 集成到您的 CI/CD 流水线中，实现内容管理和部署的自动化。
keywords:
  - CI/CD
  - 持续集成
  - 持续部署
  - 自动化
  - 国际化
  - 文档
  - Intlayer
---

# 在 CI/CD 流水线中自动生成翻译

Intlayer 允许自动生成内容声明文件的翻译。根据您的工作流程，有多种实现方式。

## 使用 CMS

使用 Intlayer，您可以采用一种工作流程，其中本地只声明单一语言环境，而所有翻译内容均通过 CMS 远程管理。这使得内容和翻译可以完全脱离代码库，提供给内容编辑者更大的灵活性，并支持热内容重载（无需重新构建应用即可应用更改）。

### 示例配置

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // 可选语言环境将由远程管理
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // 远程内容优先

    applicationURL: process.env.APPLICATION_URL, // CMS 使用的应用程序 URL

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS 凭证
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // 有助于确保一致的翻译生成
  },
};

export default config;
```

要了解有关 CMS 的更多信息，请参阅[官方文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。

## 使用 Husky

您可以使用 [Husky](https://typicode.github.io/husky/) 将翻译生成集成到本地 Git 工作流中。

### 示例配置

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // 可选语言由远程处理
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // 使用您自己的 API 密钥

    applicationContext: "这是一个测试应用", // 有助于确保翻译生成的一致性
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 确保字典是最新的
npx intlayer fill --unpushed --mode fill    # 仅填充缺失内容，不更新已有内容
```

> 有关 Intlayer CLI 命令及其用法的更多信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

> 如果您的仓库中有多个应用使用独立的 intlayer 实例，可以使用 `--base-dir` 参数，如下所示：

```bash fileName=".husky/pre-push"
# 应用 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# 应用 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## 使用 GitHub Actions

Intlayer 提供了一个 CLI 命令用于自动填充和审查字典内容。您可以使用 GitHub Actions 将其集成到您的 CI/CD 工作流中。

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer 自动填充
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ 签出仓库
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 安装依赖
        run: npm ci

      - name: ⚙️ 构建 Intlayer 项目
        run: npx intlayer build

      - name: 🤖 自动填充缺失的翻译
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 创建或更新翻译拉取请求
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: 自动填充缺失的翻译 [skip ci]
          branch: auto-translations
          title: chore: 更新缺失的翻译
          labels: translation, automated
```

> 与 Husky 相同，在 monorepo 的情况下，您可以使用 `--base-dir` 参数来顺序处理每个应用。

> 默认情况下，`--git-diff` 参数会过滤包含从基线（默认 `origin/main`）到当前分支（默认：`HEAD`）的更改的字典。

> 有关 Intlayer CLI 命令及其用法的更多信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
