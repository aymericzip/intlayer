---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "在 CI/CD 中自动化翻译而不发布糟糕文案"
description: 在三个阶段自动化 i18n，pre-push、pull request 与运行时。如何基于覆盖率拦截构建、安全自动补全并避免无限提交循环。
keywords:
  - 自动化翻译 ci
  - i18n ci cd
  - github actions 翻译
  - husky pre-push
  - 持续本地化
  - 翻译流水线
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# 在 CI/CD 中自动化翻译而不发布糟糕文案

手动翻译根本无法跟上现代软件的发布节奏。周五有人新增了一个文案字符串，导出操作要等到下一个迭代，而此时又有另外三种语言落后了。实现自动化并不复杂。如何在不悄悄向用户发布未经验证的机器输出的前提下实现自动化，才是真正值得深入思考的问题。

## 目录

<TOC/>

## 无需迁移现有代码即可实现自动化

下面介绍的流水线架构与具体的库无关，工具本身也是如此。如果你的文案采用 i18next、next-intl、react-intl、vue-i18n 或 next-translate 的 JSON 字典格式，[Sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 可以就地读写这些文件：

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // 或针对 next-intl / react-intl 的 "icu"
    }),
  ],
};

export default config;
```

你的应用可以继续保持原有的导入方式。后续的 CI 任务将直接填充并校验你现有的字典，审查者在 PR 中看到的 diff 只是 `locales/fr/checkout.json` 的更新，而不是大规模的代码迁移。还有用于 gettext 工作流的 [Sync PO 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md)，以及保持运行时 API 不变的 [兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)。

## 将拦截门禁（Gate）与内容填充（Fill）分离

两项完全不同的任务经常被混淆。

**门禁（Gate）** 是一项会失败的检查。它的作用是声明当前构建不可发布，因为缺少必需的语言环境。它不写入任何文件。

**填充（Fill）** 是一项变更操作。它生成缺失的翻译并提交代码。它绝不会导致构建失败。

仅运行填充意味着没有任何机制进行拦截，未经验证的机器文案会直接流向生产环境。仅运行门禁意味着构建频繁变红，每次都需要人工介入修复。大多数团队希望同时拥有两者，但绑定到不同的触发器上：在 Pull Request 上触发填充，在合并到发布分支时触发门禁。

## 自动化的落脚点对比

| 阶段          | 触发器   | 适用场景                     | 成本                                   |
| :------------ | :------- | :--------------------------- | :------------------------------------- |
| Pre-push 钩子 | 本地 Git | 快速反馈，不消耗 CI 分钟数   | 在开发者的机器上运行并消耗个人 API Key |
| Pull request  | CI 任务  | 合并前审查，安全统一管理密钥 | 消耗 CI 分钟数及每个 PR 的模型调用费用 |
| 发布分支      | CI 任务  | 基于覆盖率的严格拦截门禁     | 廉价，无模型调用                       |
| 运行时        | CMS      | 无需重新构建即可更新内容     | 依赖托管服务                           |

## Pre-push：最快速的反馈循环

Husky 可以在代码离开本地机器之前完成填充，因此新生成的翻译会与引入新字符串的代码处于同一个推送中。

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` 将工作范围限制为尚未推送的内容，从而避免每次推送都耗费大量时间。`--mode complete` 只填充缺失的内容，不会重写已经有值的条目，确保人工审查过的翻译绝不会被静默覆盖。

在 Monorepo 中，可以针对各个应用单独限定范围：

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

缺点也是显而易见的：每个开发者都需要一个 API Key，而且费用由执行推送的人承担。这就是为什么团队扩大后大多数会将其迁移到 CI 的原因。

## Pull request：在审查发生的地方进行填充

在 GitHub Actions 中处理相同的逻辑，并将范围限制在 diff 中：

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

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
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

其中有四个关键配置：

- **`fetch-depth: 0`** 是 `--git-diff` 正常运行所必需的。浅克隆（Shallow clone）没有基准分支来进行 diff，填充过程会静默处理空内容。
- **提交信息中的 `[skip ci]`** 可以防止工作流无限次互相触发。如果没有它，该任务会触发新的运行并再次提交，一夜之间就会耗尽 CI 配额。
- **带有 `cancel-in-progress` 的 `concurrency`** 可以防止并发推送相互竞争写入相同的文件。
- **`--git-diff`** 将填充范围限定在 PR 中变更的内容。如果省略它，每次运行都会重新翻译整个字典。

翻译内容会作为 commit 提交到 PR 分支，这意味着代码审查者可以在 diff 中进行审核。这正是选择在此阶段执行而不是合并后再执行的根本原因。

## 发布分支：门禁检查

门禁不需要访问 AI 模型，执行速度应当非常快。

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

通过断言覆盖率的测试来提供保障，而不是依赖终端输出：

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("没有缺失必需的语言环境", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` 虽然会输出检查报告，但退出状态码始终为 0，仅供参考而不会阻断流水线。可以在本地使用该命令；而在 CI 中使用测试断言。更多区别参见 [如何检测缺失的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md)。

## `requiredLocales` 让门禁在实际开发中可持续运行

如果门禁要求所有十八种语言全部完整，就会因为最慢的一种语言未就绪而阻塞所有发布，最终在一个月内被团队彻底禁用。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

声明你支持的所有语言，并且仅将那些必须阻断发布的语言设为必需项。其余语言可以异步补充，绝不会拖延代码上线。

## 将翻译完全移出代码仓库

另一种模式是在代码中仅保留一种基准语言，其余语言通过带有 Live Sync 功能的 CMS 进行远程管理。这样内容变动完全不需要重新构建应用，使文案修改周期与技术部署周期解耦。

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

这非常适合非技术人员负责文案的团队。这是一种权衡：你获得了内容编辑的自主权，但放弃了仅通过 git checkout 即可完全确定应用渲染状态的确定性。详情见 [CMS 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。

请注意，`clientSecret` 属于服务端凭证。它应当保存在 CI Secrets 和服务器环境变量中，绝不能暴露给客户端 bundle。

## 坦诚面对局限性

以上所有方案自动化的都是**覆盖率**，而不是**翻译质量**。机器自动填充把一个原本显眼的缺失变成了看不见的缺失：由于 key 已经有了值，审计顺利通过，但没有任何人阅读过这段文案。

对于内部后台、更新日志或处于 Beta 阶段的语言，这完全可以接受。但对于定价页面、法律条款、支付失败提示或任何用户做决策前阅读的内容，这是不可接受的。这些内容必须经过人工审核，并全程使用 `--mode complete`，确保审核过的文案不会在后续构建中被自动覆盖。

同时为模型提供上下文以保证文案风格统一：

```ts
ai: {
  applicationContext: "B2B 发票管理应用。正式专业语调。绝不要翻译产品名称。",
}
```

## 常见错误

- **自动提交中缺少 `[skip ci]`。** 导致任务陷入死循环耗尽配额。
- **使用 `--git-diff` 时进行了浅克隆（Shallow clone）。** 没有比较基准，什么都没填充且没有任何警告。
- **每次运行都填充整个字典目录。** 务必使用 `--git-diff` 或 `--unpushed` 控制成本。
- **将 CLI 报告用作门禁检查。** 退出状态码为 0，无法阻断流程。
- **将每种语言都设为必需（required）。** 首次阻塞发布时就会导致检查被永久移除。
- **只配置了填充任务却没有设置任何门禁。** 没有任何步骤会报错，未经审查的机翻直接上线。
- **将模型 API Key 存放在代码库中。** 必须和 `clientSecret` 一样保存在 CI Secrets 中。

## 深入阅读

- [CI/CD：通过 Husky、GitHub Actions 与 CMS 自动生成翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)
- [测试你的内容并在覆盖率不足时阻断构建](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)
- [autoFill：自动生成各语言环境的声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)
- [配置参考：`locales`、`requiredLocales`、`editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [跨框架性能基准报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)
- [i18next 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18next.md)
- [如何检测缺失的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md)
- [如何测试翻译而不写出脆弱的测试](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_testing_strategies.md)
