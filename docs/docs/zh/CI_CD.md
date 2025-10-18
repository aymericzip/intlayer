---
createdAt: 2025-05-20
updatedAt: 2025-08-13
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
slugs:
  - doc
  - concept
  - ci-cd
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# 在 CI/CD 流水线中自动生成翻译

Intlayer 允许自动生成内容声明文件的翻译。根据您的工作流程，有多种方式可以实现这一点。

## 使用 CMS

使用 Intlayer，您可以采用一种工作流程，只在本地声明单一语言环境，而所有翻译内容则通过 CMS 远程管理。这使内容和翻译完全脱离代码库，为内容编辑者提供更大的灵活性，并支持热内容重载（无需重建应用即可应用更改）。

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
    applicationContext: "这是一个测试应用程序", // 有助于确保一致的翻译生成
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

    applicationContext: "这是一个测试应用程序", // 有助于确保翻译生成的一致性
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # 确保词典是最新的
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

Intlayer 提供了一个 CLI 命令，用于自动填充和审查词典内容。您可以将其集成到使用 GitHub Actions 的 CI/CD 工作流中。

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer 自动填充
# 触发此工作流的条件
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # 第一步：从仓库获取最新代码
      - name: ⬇️ 签出仓库
        uses: actions/checkout@v4
        with:
          persist-credentials: true # 保留凭据以创建拉取请求
          fetch-depth: 0 # 获取完整的 git 历史以进行差异分析

      # 步骤 2：设置 Node.js 环境
      - name: 🟢 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # 使用 Node.js 20 LTS 以保证稳定性

      # 步骤 3：安装项目依赖
      - name: 📦 安装依赖
        run: npm install

      # 步骤 4：全局安装 Intlayer CLI 以管理翻译
      - name: 📦 安装 Intlayer
        run: npm install -g intlayer-cli

      # 步骤 5：构建 Intlayer 项目以生成翻译文件
      - name: ⚙️ 构建 Intlayer 项目
        run: npx intlayer build

      # 步骤 6：使用 AI 自动填充缺失的翻译
      - name: 🤖 自动填充缺失的翻译
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # 第7步：检查是否有更改并提交
      - name: � 检查更改
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # 第8步：如果存在更改，则提交并推送
      - name: 📤 提交并推送更改
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: 自动填充缺失的翻译 [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

要设置环境变量，请前往 GitHub → 设置 → Secrets and variables → Actions 并添加密钥（API_KEY）。

> 与 Husky 相同，在单一仓库（monorepo）的情况下，可以使用 `--base-dir` 参数依次处理每个应用。

> 默认情况下，`--git-diff` 参数会筛选包含从基线（默认 `origin/main`）到当前分支（默认 `HEAD`）的更改的字典。

> 有关 Intlayer CLI 命令及其用法的更多信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。
