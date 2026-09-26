---
createdAt: 2026-09-22
updatedAt: 2026-09-22
priority: 6
title: Chrome 与 Firefox 扩展，i18n 与 SEO 扫描器
description: 使用 Intlayer Chrome 扩展检查任何网站的 i18n 配置。检测框架、i18n 库、语言区域、hreflang 和 SEO 标签，并运行完整的 i18n SEO 审计。
keywords:
  - Chrome 扩展
  - i18n 扫描器
  - hreflang 检查器
  - 多语言 SEO
  - Intlayer
  - 本地化
  - 开发工具
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "初始化历史"
author: aymericzip
---

# Chrome 与 Firefox 扩展：i18n 与 SEO 扫描器

## 概述

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) 是 **Intlayer** 的官方 Chrome 扩展。在任何网站上打开它，即可查看该网站如何处理国际化：使用了哪个框架和 i18n 库，提供了哪些语言区域，以及多语言 SEO 标签是否配置正确。

无论网站是否使用 Intlayer，它都能正常工作。

![Intlayer Chrome 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[Chrome 扩展链接](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

[Firefox 附加组件链接](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/)

## 功能特性

- **技术检测**：识别框架（Next.js、Nuxt、Astro、SvelteKit、Angular、Vue.js、Qwik、React、Gatsby、WordPress）和 i18n 库（Intlayer、i18next、Vue I18n、@nuxtjs/i18n、Angular @angular/localize、next-intl / next-i18next、Weglot、Localize、WPML、Polylang）。每次检测都会显示触发它的依据，例如全局变量、cookie 或 DOM 标记。
- **语言区域**：列出在 `lang` 属性、hreflang 和 `og:locale` 标签、URL 语言前缀以及语言 cookie 或本地存储中发现的语言区域。
- **SEO i18n 标签**：检查 `html lang`、`html dir`、规范链接（canonical）、hreflang 标签、`x-default`、`og:locale` 以及本地化内部链接的比例。
- **跨语言环境导航**：根据 hreflang 标签，一键将当前页面切换到任一本地化版本。
- **站点地图搜索**：搜索网站站点地图中列出的所有页面，并在当前标签页中打开。
- **完整审计**：运行与 [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) 相同的审计，并显示实时评分。

## 安装

<Tabs group="browser">
  <Tab label="Chrome" value="chrome">

从 Chrome 网上应用店安装 [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)，然后将其固定到工具栏。

该扩展适用于 Chrome 以及任何支持 Chrome 网上应用店扩展的 Chromium 内核浏览器（Edge、Brave、Arc、Opera）。

  </Tab>
  <Tab label="Firefox" value="firefox">

从 Firefox 附加组件商店安装 [**Intlayer i18n Scanner**](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/)，然后将其固定到工具栏。

  </Tab>
</Tabs>

## 使用方法

### 检查页面

1. 打开您想要检查的网站。
2. 点击工具栏中的 **Intlayer i18n Scanner** 图标。
3. 弹出窗口将显示当前页面的 **检测到的技术**、**语言区域** 和 **SEO i18n 标签** 部分。

检测完全在您的浏览器本地运行，仅针对当前标签页。

### 在语言环境之间切换

![Intlayer Chrome 扩展导航](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

**导航** 部分列出当前页面的 **本地化版本**，数据来自其 hreflang 标签。点击某个语言环境，即可在当前标签页中打开该版本。

在 **站点地图页面** 中，输入关键词搜索网站站点地图中的 URL，然后点击结果即可打开。

### 运行完整审计

![Intlayer Chrome 扩展审计评分](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

滚动到 **完整审计** 部分，然后点击 **运行完整 i18n 审计**。随着每项检查的完成，结果将实时显示，分为以下几组：

- **页面**：`html lang` 和 `dir` 属性、当前语言区域、hreflang 标签、`x-default`、规范链接、本地化内部链接、语言选择器、国旗图标以及 JavaScript bundle 中未使用的语言内容。
- **Robots.txt**：是否存在，以及语言路径是否保持可抓取。
- **站点地图（Sitemap）**：是否存在、列出的所有语言区域、备用链接和 `x-default`。
- **域名**：在整个网站中发现的语言区域数量。

每项检查都会标记为通过、警告或未通过，综合评分总结了页面的整体 i18n SEO 健康状况。

## 隐私与权限

该扩展仅申请最少权限：

- **activeTab** 和 **scripting**：检测器仅在您正在查看的标签页上运行，且仅在您打开弹出窗口时运行。
- **back.intlayer.org**：仅在您运行完整审计时使用。当前页面的 URL 会发送到 Intlayer API 进行扫描。

不会收集任何浏览历史记录，后台也不会运行任何程序。

## 常见问题

<FAQ>

<Question title="网站需要使用 Intlayer 吗？">

不需要。无论网站使用何种框架或 i18n 库，该扩展都可以检查任何网站。

</Question>
<Question title="为什么有些技术没有被检测到？">

检测依赖于页面在浏览器中公开的信息：全局变量、cookie、meta 标签和 DOM 标记。某些生产构建会移除这些标记，因此库可能在使用中但未留下可见痕迹。

</Question>
<Question title="如何修复审计发现的问题？">

大多数检查都对应路由或元数据设置。使用 Intlayer 时，hreflang、规范链接、`x-default`、本地化链接、站点地图和 robots.txt 均可从您的[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)自动生成。请参阅适用于您框架的集成指南，例如 [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)、[Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nuxt.md) 或 [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)。

</Question>

</FAQ>

## 相关工具

- [VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- [MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)
- [LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)
