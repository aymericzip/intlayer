---
blogName: internationalization_and_SEO
url: https://intlayer.org/blog/SEO-and-i18n
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/internationalization_and_SEO.md
createdAt: 2024-12-24
updatedAt: 2024-12-24
title: SEO和国际化
description: 了解如何为搜索引擎优化您的多语言网站，并提升您的SEO。
keywords:
  - SEO
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# SEO & I18n: 为您的网站提供多语言支持的终极指南

想要在全球范围内吸引更多用户吗？让您的网站支持多语言是扩展您受众和改善 SEO（搜索引擎优化）的最佳方法之一。在这篇博客文章中，我们将以清晰易懂的术语分解国际 SEO 的基础知识, , 通常称为 **i18n**（国际化的缩写）。您将了解需要做出的关键决策，如何使用 `hreflang` 等技术元素，以及像 **Intlayer** 这样的工具如何简化您的多语言 Next.js 项目。

---

## 1. 什么是让您的网站支持多语言？

一个多语言网站以多种语言提供内容。例如，您可以拥有一个英文版（`example.com/en/`），一个法文版（`example.com/fr/`）和一个西班牙版（`example.com/es/`）。这种方法使搜索引擎能够根据用户的偏好或地理位置显示正确的语言版本。

当您做到这一点时，您将为非英语用户创造一个更加友好的体验, , 这将导致更好的参与度、更高的转化率，以及不同地区的 SEO 改善。

---

## 2. 选择正确的 URL 结构

如果您决定拥有多个语言版本，您将需要一种清晰、一致的方式来组织网站的 URL。每种语言（或地区）都应该在互联网上有其独特的“地址”。以下是三种常见的多语言网站结构方式：

1. 国家代码顶级域名（ccTLDs）

   - 示例：`example.fr`，`example.de`
   - **优点：** 向搜索引擎发送关于内容目标国家的强烈信号（例如，`.fr` = 法国）。
   - **缺点：** 管理多个域名可能会更昂贵且复杂。

2. **子域名**

   - **示例：** `fr.example.com`，`de.example.com`
   - **优点：** 每种语言“生活”在其自己的子域名上，相对容易添加或删除语言。
   - **缺点：** 搜索引擎有时将子域名视为独立网站，这可能会稀释主域名的权威性。

3. **子目录（子文件夹）**
   - **示例：** `example.com/fr/`，`example.com/de/`
   - **优点：** 管理简单，所有流量指向一个主域名。
   - **缺点：** 不像 ccTLDs 那样强烈的本地 SEO 信号（虽然如果做得当，它仍然非常有效）。

> **提示：** 如果您有一个全球品牌并希望保持简单，子目录通常效果最佳。如果您只针对一两个主要国家，并希望真正强调每一个，ccTLDs 可能是更好的选择。

---

## 3. 精通 Hreflang 的语言定位

### 3.1. 什么是 Hreflang？

当您在多种语言中拥有相同或非常相似的内容时，像 Google 这样的搜索引擎可能会对向用户显示哪个版本感到困惑。**Hreflang** 是一个 HTML 属性，它告知搜索引擎特定页面的目标语言（和地区）是什么，以及其他语言/地区页面是什么。

### 3.2. 为什么这很重要？

1. 它可以防止 **重复内容** 问题（当搜索引擎认为您多次发布相同内容时）。
2. 它确保 **法语用户看到法语版本**，**西班牙语用户看到西班牙语版本**，等等。
3. 它改善了整体用户体验，意味着更好的参与度和更高的 SEO 排名。

### 3.3. 如何在 `<head>` 标签中使用 Hreflang

在您的 HTML 中，您将添加如下内容：

```html
<link rel="alternate" hreflang="en" href="https://example.com/en" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr" />
<link rel="alternate" hreflang="es" href="https://example.com/es" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en" />
```

- **`hreflang="en"`**：指示页面的英文版本。
- **`hreflang="fr"`**：指示页面的法文版本。
- **`hreflang="es"`**：指示页面的西班牙文版本。
- **`hreflang="x-default"`**：当没有其他语言与用户的偏好匹配时的“回退”语言或默认 URL。

> **快速提示：** 确保这些标签中的 URL 直接指向最终页面，**无**其他重定向。

---

## 4. 使内容真正“本地化” （不仅仅是翻译）

### 4.1. 本地化 vs. 翻译

- **翻译** 指的是逐字将文本从一种语言转换为另一种语言。
- **本地化** 是指将内容的格式、货币、测量和文化参考调整为当地受众。例如，如果您针对法国，您将使用 `€` 而不是 `You are an expert in internationalization and content management. Your task is to translate the following documentation into the specified locales.

1. **Requirement:**

   - You should only translate the text, and titles of the file.
   - You should not alter the structure of the file.
   - You should not alter the code logic of code elements.
   - You should transform urls as `https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/**/*.md` to `https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/**/*.md`
   - You should not transform url as `https://github.com/aymericzip/intlayer/blob/main/docs/assets/**/*`
   - You should transform locale urls as `/**/*` to `/{{locale}}/**/*`
   - In the code elements, the naming of the variables should be made in English. But the comments should be in 中文.
   - You should return the translated file content without any additional comments or explanations.
   - You should be sure to do not forgot to translate any content

2. **Locales:**

   - Base file locale: en: English (US)
   - Desired Locales: {{locale}} : {{localeName}}

**File to Translate:**

，并可能提到当地节日或地区特有的细节。

### 4.2. 避免重复内容

即使有良好的翻译，如果它在结构上看起来过于相似，搜索引擎可能会将您的网站标记为重复内容。Hreflang 有助于澄清这些页面不是重复的，而是语言变体。

---

## 5. 技术 SEO 必备事项

### 5.1. 语言声明 (`lang` 和 `dir`)

在您的 HTML 标签中，您可以这样声明语言：

```html
<html lang="en"></html>
```

- **`lang="en"`** 帮助浏览器和辅助技术了解语言。

对于从右到左的语言（例如阿拉伯语或希伯来语），添加：

```html
<html dir="rtl" lang="ar"></html>
```

- **`dir="rtl"`** 确保文本方向为从右到左。

### 5.2. 规范标签

规范标签告诉搜索引擎哪一页是“原始”或主要版本，如果您有近重复的页面。通常，对于多语言网站，您会有一个 **自引用** 的规范。

```html
<link rel="canonical" href="https://example.com/fr/produits" />
```

---

## 6. 多语言的页面 SEO

### 6.1. 标题和元描述

- **针对每种语言进行翻译和优化**。
- 对每个市场进行 **关键词研究**，因为人们在英语中搜索的内容可能在法语或西班牙语中有所不同。

### 6.2. 标头（H1, H2, H3）

您的标题应反映每个地区的 **本地短语** 或 **关键词**。不要仅仅把原始英语标题通过 Google 翻译，然后就算完成了。

### 6.3. 图片和媒体

- 如有需要，本地化 alt 文本、标题和文件名。
- 使用与目标文化产生共鸣的视觉效果。

---

## 7. 语言切换与用户体验

### 7.1. 自动重定向还是语言选择器？

- **自动重定向**（基于 IP 或浏览器设置）可能方便，但可能会将旅行者或 VPN 用户发送到错误的版本。
- **语言选择器** 通常更为透明, , 用户可以选择自己的语言，如果自动检测的语言不正确。

以下是一个简化的 Next.js + Intlayer 示例：

```tsx
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const location = useLocation(); // 获取当前 URL 路径。示例：/fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 构造带有更新语言的 URL
    // 示例：/es/about，当语言设置为西班牙文
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // 更新 URL 路径
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={locale === localeItem ? "x-default" : localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 语言在其本地化中 - 例如法语 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 语言在当前语言中 - 例如法语，当前语言设置为 Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 语言用英语表示 - 例如法语 */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 语言在其本地化中 - 例如 FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

### 7.2. 存储偏好

- 在 **cookie** 或 **会话** 中保存用户的语言选择。
- 下次他们访问您的网站时，您可以自动加载他们的首选语言。

---

## 8. 构建本地反向链接

**反向链接**（来自外部网站指向您的链接）仍然是一个重要的 SEO 因素。当您运行一个多语言网站时，考虑：

- 联系当地新闻网站、博客或论坛。例如，一个指向您法语子目录的 `.fr` 域可以提升您在本地法国的 SEO。
- 监控每种语言的反向链接，以查看哪些地区需要更多的公关/营销努力。

---

## 9. 监控和维护您的多语言网站

### 9.1. Google Analytics 和 Search Console

- 为每个语言目录（`/en/`，`/fr/`，`/es/`）细分您的数据。
- 查看每种语言基础上的 **爬取错误**、**重复内容标记** 和 **索引问题**。

### 9.2. 定期内容更新

- 保持翻译的新鲜感。如果您在英语中更改了产品描述，请在法语、西班牙语等中进行更新。
- 过时的翻译会让客户感到困惑，并损害用户信任。

---

## 10. 常见陷阱

1. **机器翻译的内容**
   没有人工审核的自动翻译可能会充满错误。

2. **错误或缺失的 `hreflang` 标签**
   如果您的标签不完整或代码错误，搜索引擎无法自行确定语言版本。

3. **仅通过 JavaScript 切换语言**
   如果 Google 无法爬取每种语言的唯一 URL，您的页面可能不会出现在正确的本地搜索结果中。

4. **忽视文化细微差别**
   在一个国家有效的笑话或短语，在另一个国家可能是冒犯或毫无意义的。

---

## 总结

让您的网站支持多语言不仅仅涉及翻译文本。它还关乎有效地构建 URL，使用 `hreflang` 标签帮助搜索引擎提供正确的版本，并提供卓越的用户体验, , 包括本地化视觉内容、语言选择器和一致的导航。遵循这些最佳实践将使您在全球市场取得成功，提升用户满意度，并最终在各个地区改善 SEO 结果。

如果您使用 Next.js（特别是 Next.js 13+ 中的 App Router），像 **Intlayer** 这样的工具可以简化整个过程。它可以处理从生成本地化站点地图到自动处理 `hreflang` 链接、语言检测等所有工作, , 这样您就可以专注于创建高质量的多语言内容。

**准备好走向全球吗？** 立即开始实施这些 SEO 和 i18n 策略，看看来自世界各地的新访客如何发现并与您的网站互动！
