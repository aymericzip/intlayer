---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CD集成
description: 了解如何将Intlayer集成到您的CI/CD管道中，以实现自动化的内容管理和部署。
keywords:
  - CI/CD
  - 持续集成
  - 持续部署
  - 自动化
  - 国际化
  - 文档
  - Intlayer
---

# 在 CI/CD 管道中自动生成翻译

Intlayer 允许为您的内容声明文件自动生成翻译。根据您的工作流程，有多种方法可以实现这一点。

## 使用 CMS

通过 Intlayer，您可以采用一种工作流程，其中仅在本地声明一个语言环境，而所有翻译都通过 CMS 远程管理。这使得内容和翻译可以完全与代码库分离，为内容编辑者提供了更大的灵活性，并支持热内容重新加载（无需重新构建应用程序即可应用更改）。

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

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS 凭据
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // 帮助确保翻译生成的一致性
  },
};

export default config;
```

要了解有关 CMS 的更多信息，请参阅[官方文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。

## 使用 Husky

您可以使用 [Husky](https://typicode.github.io/husky/) 将翻译生成集成到本地 Git 工作流程中。

### 示例配置

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // 可选语言环境由远程处理
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // 使用您自己的 API 密钥

    applicationContext: "This is a test application", // 帮助确保翻译生成的一致性
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 确保字典是最新的
npx intlayer fill --unpushed --mode fill    # 仅填充缺失内容，不更新现有内容
```

> 有关 Intlayer CLI 命令及其用法的更多信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

> 如果您的仓库中有多个应用程序使用单独的 Intlayer 实例，您可以使用 `--base-dir` 参数，如下所示：

```bash fileName=".husky/pre-push"
# 应用程序 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# 应用程序 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## 使用 GitHub Actions

Intlayer 提供了一个 CLI 命令，用于自动填充和审查字典内容。这可以通过 GitHub Actions 集成到您的 CI/CD 工作流程中。

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
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
      - name: ⬇️ 检出代码库
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

      - name: 🤖 自动填充缺失翻译
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 创建或更新翻译 PR
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> 与 Husky 相同，在 monorepo 的情况下，您可以使用 `--base-dir` 参数依次处理每个应用程序。

> 默认情况下，`--git-diff` 参数会过滤从基线（默认 `origin/main`）到当前分支（默认：`HEAD`）的更改中包含的字典。

> 有关 Intlayer CLI 命令及其用法的更多信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。
