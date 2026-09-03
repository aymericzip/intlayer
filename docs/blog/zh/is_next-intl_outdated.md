---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: 2026 年，next-intl 已经过时了吗？
description: next-intl 已成为 Next.js App Router 的主流国际化方案。然而，其运行时打包体积开销以及繁琐的手动命名空间拆分依然是不可忽视的短板。
keywords:
  - next-intl
  - Intlayer
  - 国际化
  - i18n
  - Next.js
  - 打包体积
  - 博客
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# 2026 年，next-intl 已经过时了吗？

当 Vercel 推出 App Router 并废弃 Pages Router 原生内置的 i18n 支持时，`next-intl` 敏锐且迅速地填补了这一空白。凭借 Jan Amann 详尽的文档和极快的 App Router 适配，该库迅速成为广大开发者的首选。

那么，为什么我们今天还需要重新审视它的合理性？

**原因在于：过去三年中前端架构发生了巨变，而 `next-intl` 的核心架构模型却基本止步不前。**

当 Next.js 全面迈向 React Server Components (RSC)、流式传输（Streaming）以及编译器级优化时，`next-intl` 依然将国际化当作纯运行时的任务：通过客户端 Provider 分发庞大的 JSON 数据对象，在浏览器内执行 ICU 格式化，并依赖手动拆分命名空间来抑制打包体积的暴增。

<TOC/>

## 核心观点

**开发演进放缓：**

在过去的 12 个月中，`next-intl` 累计提交了约 187 次 commit，主要围绕 Next.js 版本适配和细微 bug 修复展开。

**客户端运行时开销高昂：**

结合使用 `NextIntlClientProvider` 与 `useTranslations()`，在展示首个文本之前就会向客户端引入约 12.8 KB（gzip 压缩后，未压缩约 51 KB）的代码，相当于 `next-intlayer`（4.3 KB）的近 3 倍。

**高达 90% 的跨页面内容泄漏：**

在常规配置下，**下发到特定页面的翻译数据中有 89.8% 属于其他路由**。用户访问 `/contact` 页面时，`/pricing` 和管理后台的文本也会被一并下载。

**手动管理命名空间负担重：**

为了避免打包体积失控，开发者必须逐个路由手动拆分和匹配命名空间，这极大增加了生产环境文本丢失的几率。

**商业合作的制约：**

作为 Crowdin 的官方合作伙伴，该项目缺乏动力在官方 CLI 中内置完全免费的本地 AI 翻译功能。

## 维护模式 vs. 现代工具生态

过去 12 个月的 commit 动态对比：

| 仓库                  | Stars                                                                                                                                                  | 总 Commit 数                                                                                                                                                        | 年 Commit 数                                                                                                                                                       | 最近一次 Commit                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

过去一年的产出：

- `amannn/next-intl`：**187 次 commit**（主要针对 Next.js 更新进行补丁维护）。
- `aymericzip/intlayer`：**4,343 次 commit**（在编译器、IDE 扩展、MCP Server 及自主 AI 翻译引擎上高频迭代）。

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

成熟的库通常让人感到放心，但 i18n 技术范式已经发生转变：构建期借助编译器剔除无用文本，CI 阶段自动调用大模型批量翻译，开发者通过 Language Server (LSP) 与 AI Agent 协助编写。纯运行时的设计难以直接消化这些优势。

## Next.js 16 App Router 基准性能评测

基于拥有 10 个路由、10 种语言的典型 App Router 应用进行实测：

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> 在真实浏览器中开启 gzip 压缩环境下测试。完整数据见 [Next.js 基准测试报告](https://intlayer.org/zh/doc/benchmark/nextjs)。

### 库本身的基础体积

未引入任何翻译文本时客户端的空白开销：

| 库                     | Gzip 压缩后 | Minified 未压缩 |
| ---------------------- | ----------- | --------------- |
| `next-intl@4.9.1`      | 12.8 KB     | 51.0 KB         |
| `next-intlayer@8.7.12` | **4.3 KB**  | **13.3 KB**     |

### 页面体积与数据泄漏分析

| 配置                | 单页平均 JS (gz) | 跨语言泄漏 | 跨页面泄漏 | 平均组件大小 (gz) |
| ------------------- | ---------------- | ---------- | ---------- | ----------------- |
| 基准（无 i18n）     | 150.8 KB         | 0.0%       | 0.0%       | 0.7 KB            |
| `next-intl`（静态） | 163.5 KB         | 4.2%       | **89.8%**  | 20.5 KB           |
| `next-intl`（动态） | 163.4 KB         | 9.7%       | **89.9%**  | 20.5 KB           |
| `next-intlayer`     | **152.1 KB**     | **0.0%**   | **0.0%**   | **7.2 KB**        |

### 跨路由翻译泄漏的原因

在传统的 `next-intl` 项目中，根布局通常会一次性获取整个应用的所有消息：

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

因为 `messages` 在顶层被整体传入客户端 Provider，浏览器在加载任何单页时都必须下载整个词典。哪怕用户仅访问 `/login`，也会连带下载常见问题、使用指南和后台仪表盘等全部翻译。

虽然可以通过划分多个 JSON 命名空间来规避，但手工配置和维护映射关系既费时又极易出错。

Intlayer 采用静态分析解决该问题：[Intlayer 编译器](https://intlayer.org/zh/doc/compiler)精准提取各个路由实际调用的翻译字段，使跨页面泄漏率直降为 **0.0%**。

## 为什么 next-intl 无法做 Tree-shaking？

这是因为其 API 依赖于运行时的动态字符串取值：

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack 和 Webpack 无法静态预判 `UserProfile` 内部将调用哪些键名。为了防止线上缺失文本报错，**打包工具只能将整个命名空间全部打包进客户端 chunk**。而在 Intlayer 中，属性以解构方式使用，编译器能精确追踪依赖关系并剪裁掉无用内容。更多细节见[打包优化](https://intlayer.org/zh/doc/concept/bundle-optimization)。

## 开发者体验对比

### 分离式 JSON vs. 组件就近组织

在 `next-intl` 中，翻译集中放置在与组件相隔较远的 `messages/` 目录中。Intlayer 提倡将内容声明文件与目标组件就近存放：

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/zh.json"
{
  "authModal": {
    "title": "登录您的账户",
    "submitButton": "继续"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      zh: "登录您的账户",
    }),
    submitButton: t({
      en: "Continue",
      zh: "继续",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

一旦移动或删除 `AuthModal.tsx`，对应的内容声明文件也会随之移动或删除。

### 代码提示 vs. 严格完备性检查

在 `next-intl` 中扩展 `IntlMessages` 能带来基于默认语言的代码补全：

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

但这只能基于单一基准语言校验。如果在 `zh.json` 中删除了某个词条，TypeScript 不会发出任何告警，CI 流水线照样能通过，最终导致线上用户看到空白。

Intlayer 则直接基于内容声明生成全局类型。开启 [`strictMode`](https://intlayer.org/zh/doc/concept/configuration) 后，若缺少任何一种目标语言的翻译，编译期就会立即报错拦截。

### 工具链与 AI 适配能力

| 功能特性                  | `next-intl` | Intlayer                                                         |
| ------------------------- | ----------- | ---------------------------------------------------------------- |
| **VS Code 官方插件**      | ❌ 无       | ✅ [官方专属插件](https://intlayer.org/zh/doc/vs-code-extension) |
| **Language Server (LSP)** | ❌ 无       | ✅ [专属 LSP 服务](https://intlayer.org/zh/doc/lsp)              |
| **AI Agent MCP Server**   | ❌ 无       | ✅ [内置 MCP Server](https://intlayer.org/zh/doc/mcp-server)     |
| **Agent Skills 预制集**   | ❌ 无       | ✅ [开箱即用 Skills](https://intlayer.org/zh/doc/agent_skills)   |
| **可视化上下文 CMS**      | ❌ 无       | ✅ [免费开源 CMS](https://intlayer.org/zh/doc/concept/editor)    |

内置的 LSP 与 MCP Server 赋予 AI 编程助手透视多语言依赖结构的能力，极大提升代码生成与维护的精准度。

## 与 Crowdin 的商业捆绑

`next-intl` 与 Crowdin 拥有官方合作关系。商业赞助对开源生态固然有益，但也左右了功能演进的路线图：作为一个定位偏向商业翻译服务（TMS）客户端的工具，`next-intl` 缺乏动力在命令行中提供完全免费且本地化的 AI 自动翻译能力。

Intlayer 将这些能力原生地内置于开源工具链中：

**本地 AI 自动补全（`intlayer fill`）：**

使用你自己的 OpenAI、Anthropic、Mistral 或 Gemini API 密钥，自动查找并补齐所有缺失词条。

**支持私有化部署的可视化 CMS：**

利用 [Intlayer CMS](https://intlayer.org/zh/doc/concept/cms)，非技术人员可以直接在网页上可视修改并即时推送到 Git 仓库。

**纯粹的开源协议：**

所有配套工具均在 Apache 2.0 协议下完全开放。

## 什么时候选用 next-intl 依然合适？

<AccordionGroup>
<Accordion header="重度依赖 ICU MessageFormat 语法">

如果系统中存在大量深层嵌套的复数、序数规则和高度复杂的格式化，`next-intl` 历经考验的 ICU 引擎足够稳妥。

</Accordion>
<Accordion header="已有成熟的 Crowdin 工作流">

如果企业内部的文案协作机制早已与 Crowdin 平台深度绑定，那么使用 `next-intl` 能很好地契合当前流程。

</Accordion>
<Accordion header="稳定上线的老项目">

如果既有系统运行稳定，当前的打包体积对业务指标没有直接负面影响，则没有必要为了重构而重构。

</Accordion>
</AccordionGroup>

## 如何改进我现有的 next-intl 配置？

Intlayer 提供了开箱即用的兼容层包，完美保留了 `next-intl` 的核心函数与 Hook 签名（如 `useTranslations`、`getTranslations` 以及路由辅助工具）。你无需重写页面或组件，就能直接享受编译器级架构的各项优化红利。

只需运行单条命令即可完成集成：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

该交互式 CLI 工具会自动完成以下工作：

1. 安装 `@intlayer/next-intl` 兼容包。
2. 配置打包工具别名（alias），将现有的导入语句（`next-intl`、`next-intl/server`）平滑重定向至 Intlayer，之后便可安全地从 `package.json` 中移除旧依赖。
3. 立即启用编辑器内的 Language Server（LSP）诊断，在构建阶段消除跨路由的文案泄露（完整 Tree-shaking），并开启本地 AI 自动化翻译流程，全程无需繁重的代码重构。

更多详细步骤请参考我们的专题文档：

- **平滑兼容层：** 使用 [`next-intl` 兼容层](https://intlayer.org/zh/doc/compatibility/next-intl)，无需改动现有组件内的 `useTranslations` 语法，即可切换到底层的优化编译器。
- **指南参考：** 阅读我们的 [next-intl 迁移指南](https://intlayer.org/zh/doc/migration/next-intl)，快速将旧版 JSON 资产转换为类型安全的数据定义。
- **混合式方案：** 你也可以在运行时保留 `next-intl`，仅[将 Intlayer 与 next-intl 搭配使用](https://intlayer.org/zh/blog/intlayer-with-next-intl)，享受本地 AI 自动翻译与类型检查的能力。

欢迎使用免费的 [i18n SEO 分析器](https://intlayer.org/i18n-seo-scanner) 测量你当前网站的打包体积和翻译泄漏情况：

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 延伸阅读

- [Next.js i18n 基准测试：深度性能测评](https://intlayer.org/zh/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer 方案对比](https://intlayer.org/zh/blog/next-i18next-vs-next-intl-vs-intlayer)
- [2026 年，i18next 已经过时了吗？](https://intlayer.org/zh/blog/is-i18next-outdated)
- [编译型国际化与声明式架构优势剖析](https://intlayer.org/zh/blog/compiler-vs-declarative-i18n)
