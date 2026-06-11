---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: 扫描网站
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
  - version: 8.13.0
    date: 2026-06-11
    changes: "添加 scan 命令"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# 扫描网站

`scan` 命令用于获取公共 URL，测量总页面大小，并审计页面的 i18n 和 SEO 健康状况。它会生成一份评分报告（0–100），涵盖 HTML 属性、规范链接、hreflang 标签、robots.txt、sitemap.xml、本地化内部链接以及 JavaScript 包中的语言包体积权重。

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
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
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
- **`--verbose`** — 启用详细日志记录（CLI 模式下默认开启）。
- **`--prefix`** — 自定义日志前缀。

## 检查内容

| 检查项                    | 描述                                           | 评分权重 |
| ------------------------- | ---------------------------------------------- | -------- |
| `html lang`               | `<html lang="…">` 属性存在                     | 9        |
| `html dir`                | `<html dir="…">` 属性存在                      | 3        |
| `canonical`               | `<link rel="canonical">` 存在                  | 10       |
| `hreflang`                | `<link rel="alternate" hreflang="…">` 标签存在 | 9        |
| `x-default hreflang`      | 存在 `x-default` hreflang 备用链接             | 7        |
| `localized links`         | 至少一个内部链接包含语言段                     | 5        |
| `all links localized`     | 每个内部链接都包含语言段                       | 5        |
| `current locale`          | 能够检测到页面语言                             | 3        |
| `robots.txt present`      | `/robots.txt` 返回 200 响应                    | 10       |
| `robots.txt locale paths` | robots.txt 中未阻止任何语言路径                | 10       |
| `sitemap.xml present`     | `/sitemap.xml` 返回 200 响应                   | 10       |
| `sitemap locale coverage` | 每个检测到的语言都出现在站点地图中             | 10       |
| `sitemap alternates`      | 站点地图包含 `hreflang` 备用链接               | 5        |
| `sitemap x-default`       | 站点地图包含 `x-default` hreflang              | 5        |
| `unused bundle content`   | JS 包不包含过多的未使用语言数据                | 9        |

最终得分是所有通过的检查项的加权总和，以百分比（0-100）表示。

## 以编程方式使用扫描功能

`scan` 函数也从 `@intlayer/cli` 中导出，因此可以从您自己的脚本中调用：

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

对于更低级别的访问，来自 `@intlayer/chokidar/scan` 的 `scanWebsite` 会返回一个结构化的 `ScanResult` 对象：

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
