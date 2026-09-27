---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan：审查网站的 i18n 与 SEO"
description: 了解如何使用 Intlayer CLI scan 命令测量页面大小并审计任何网站的 i18n/SEO 健康状况。
keywords:
  - 扫描
  - SEO
  - i18n
  - 审计
  - CLI
  - Intlayer
  - 页面大小
  - 包体积
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "检测路由策略与 i18n 技术栈（库、TMS）；新增 hreflang 互惠性、og:locale 与语言切换器检查；支持追踪 robots.txt 站点地图、站点地图索引及 gzip 压缩站点地图"
  - version: 9.5.2
    date: 2026-09-12
    changes: "添加 `--ci` 标志"
  - version: 9.0.0
    date: 2026-06-11
    changes: "添加 scan 命令"
author: aymericzip
---

# 扫描网站

`scan` 命令用于获取公共 URL，测量总页面大小，并审计页面的 i18n 和 SEO 健康状况。它会生成一份评分报告（0–100），涵盖 HTML 属性、规范链接、hreflang 标签及其互惠回链、robots.txt、站点地图、本地化内部链接以及 JavaScript 包中的语言包体积权重。

它还会报告站点如何在 URL 中编码语言（路由策略），以及使用了哪个框架、i18n 库、翻译管理系统（TMS）或翻译代理。相同的检查功能也支持[在线 i18n SEO 扫描器](https://intlayer.org/i18n-seo-scanner)和 Intlayer Chrome 扩展程序。

无需额外依赖。安装 [puppeteer](https://pptr.dev/) 后，扫描可以捕获延迟加载的 JavaScript 分包，以进行更精确的包体分析；否则，它将退化为检查 HTML 中声明的同步加载脚本。

## 用法

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### 示例

```bash packageManager="npm"
npx intlayer scan https://example.com
```

示例输出：

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## 选项

### `<url>` (必填)

要扫描的完整 URL（例如 `https://example.com`）。

### `--no-deep`

禁用基于渲染的深度扫描。

默认情况下，该命令会尝试使用 [puppeteer](https://pptr.dev/) 在无头浏览器中渲染页面，捕获延迟加载的 JavaScript 分包，并测量实际传输大小。如果未安装 puppeteer，该命令将自动退回到基本模式。

传入 `--no-deep` 以强制使用基本模式，即使 puppeteer 可用。

> 示例：`npx intlayer scan https://example.com --no-deep`

### `--json`

将完整的扫描结果输出为 JSON 对象，而不是格式化的报告。适用于程序消费或 CI 流水线。

> 示例：`npx intlayer scan https://example.com --json`

### 标准配置选项

- **`--base-dir`** — 用于定位 `intlayer.config.*` 文件的基目录。
- **`-e, --env`** — 目标环境（例如 `development`，`production`）。
- **`--env-file`** — 自定义 `.env` 文件的路径。
- **`--no-cache`** — 禁用配置缓存。
- **`--ci`** — 在 monorepo 的每个 Intlayer 项目中执行该命令（在项目目录内运行时仅处理当前项目）。可通过 `INTLAYER_PROJECT_CREDENTIALS`（将项目路径映射到 `{ "clientId", "clientSecret" }` 的 JSON 对象）为每个项目注入凭据。
- **`--verbose`** — 启用详细日志记录（CLI 模式下默认开启）。
- **`--prefix`** — 自定义日志前缀。

## 路由策略

页面的 hreflang 备用链接所共享的语言模式揭示了网站如何对其语言进行路由。如果没有备用链接，则仅使用被扫描的 URL（置信度较低）。

| 策略                | 示例                             |
| ------------------- | -------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`         |
| `prefix-no-default` | `/about` (默认语言), `/fr/about` |
| `search-params`     | `/about?lang=fr`                 |
| `subdomain`         | `fr.example.com`                 |
| `domain`            | `example.fr`, `example.de`       |
| `no-prefix`         | 所有语言使用同一个 URL（Cookie） |

链接、规范链接、robots.txt 和站点地图检查均通过此策略解读每个 URL。例如，在采用 `prefix-no-default` 的站点上，无前缀链接在默认语言下是正确的；而在采用 `search-params` 的站点上，不带 `?lang=` 的链接则意味着脱离了当前语言。

## 检测到的技术栈

框架、i18n 库（Intlayer、i18next、react-i18next、next-i18next、next-intl、use-intl、react-intl、vue-i18n、@nuxtjs/i18n、Lingui、svelte-i18n、Paraglide、ngx-translate、Transloco、Polylang、WPML…）、翻译管理系统（Crowdin、Phrase、Lokalise、locize、Transifex、Tolgee、Localazy、SimpleLocalize、Localizely、Smartling、Intlayer CMS）和翻译代理（Weglot、Localize、GTranslate…）均可从 HTML、已加载资源和 JavaScript 包中识别。深度模式还会读取 window 全局变量和 Cookie。

## 检查内容

| 检查项                          | 描述                                                                                    | 评分权重 |
| ------------------------------- | --------------------------------------------------------------------------------------- | -------- |
| `html lang`                     | `<html lang>` 存在且为有效的 BCP 47 标签                                                | 9        |
| `html dir`                      | 从右到左书写的语言设置了 `dir="rtl"`（默认为 `ltr`）                                    | 3        |
| `locale signals consistent`     | `<html lang>`、URL 语言和自身的 hreflang 条目保持一致                                   | 5        |
| `og:locale`                     | 设置了 `og:locale` 且与 `<html lang>` 匹配                                              | 3        |
| `canonical`                     | 规范链接存在且不指向其他语言版本                                                        | 10       |
| `hreflang`                      | hreflang 标签存在，代码有效、URL 绝对、无重复且包含自引用                               | 9        |
| `x-default hreflang`            | 存在 `x-default` hreflang 备用链接                                                      | 7        |
| `hreflang alternates link back` | 备用链接返回 200 响应、未被重定向、包含回链并声明了语言                                 | 8        |
| `localized links`               | 内部链接指向页面的当前语言                                                              | 8        |
| `all links keep the locale`     | 没有内部链接切换或丢失当前语言                                                          | 6        |
| `language switcher`             | 存在可抓取的 `<a href>` 链接指向其他语言版本                                            | 6        |
| `robots.txt present`            | `/robots.txt` 返回 200 响应                                                             | 10       |
| `robots.txt localized URLs`     | 网站及其本地化 URL 均未对 Googlebot 封锁                                                | 8        |
| `sitemap present`               | 找到了站点地图（robots.txt 中的 `Sitemap:` 指令、`/sitemap.xml`、`/sitemap_index.xml`） | 10       |
| `sitemap locale coverage`       | 列出了所有语言，且包含备用链接的条目同时列出了自身                                      | 9        |
| `sitemap alternates`            | 站点地图包含 `hreflang` 备用链接                                                        | 8        |
| `sitemap x-default`             | 站点地图包含 `x-default` hreflang                                                       | 7        |
| `unused bundle content`         | 主 JS 包未携带其他语言的翻译数据                                                        | 8        |

出现警告可获得该项权重的一半分值。最终得分是所有运行的检查项的加权总和，以百分比（0–100）表示。未通过的检查项会打印首次发现的问题；使用 `--json` 获取完整详细信息。

## 以编程方式使用扫描功能

`scan` 函数也从 `@intlayer/cli` 中导出，因此可以从您自己的脚本中调用：

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

对于更低级别的访问，来自 `@intlayer/engine/scan` 的 `scanWebsite` 会返回一个结构化的 `ScanResult` 对象：

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
