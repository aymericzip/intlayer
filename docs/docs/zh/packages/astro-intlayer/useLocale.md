---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useLocale 钩子文档 | astro-intlayer
description: 了解如何在 Astro 应用程序中使用 useLocale 钩子访问和管理当前语言环境。
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "初始文档"
author: aymericzip
---

# useLocale 钩子文档

`astro-intlayer` 的 `useLocale` 钩子提供对 Astro 应用程序中当前请求语言环境、配置的默认语言环境以及所有可用语言环境的访问权限。

它在服务器渲染的 `.astro` frontmatter 和客户端 `<script>` 块中表现一致。

## 使用方法

### 在组件 Frontmatter 中（服务端渲染）

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>当前语言环境：{locale}</span>
      <span>默认语言环境：{defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### 在客户端 `<script>` 中（交互式）

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## 返回值

该钩子返回一个 `UseLocaleResult` 类型的对象：

| 属性               | 类型                                   | 描述                                                                        |
| ------------------ | -------------------------------------- | --------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | 活动语言环境。                                                              |
| `defaultLocale`    | `DeclaredLocales`                      | 在 `intlayer.config.ts` 中配置的默认回退语言环境。                          |
| `availableLocales` | `DeclaredLocales[]`                    | 为项目配置的所有受支持语言环境的数组。                                      |
| `setLocale`        | `(locale: LocalesValues) => void`      | 更新语言环境的函数。（在客户端 `<script>` 中可交互，在 SSR 期间发出警告）。 |
| `subscribe`        | `(callback: () => void) => () => void` | 订阅客户端语言环境更改。                                                    |

## 服务端与客户端行为

- **在 SSR / 服务端渲染期间**：请求使用固定参数渲染一次。在服务端渲染期间调用 `setLocale()` 没有效果并会发出警告；语言环境切换应在客户端执行或通过导航到目标语言环境 URL 执行。
- **在客户端脚本中**：`setLocale` 更新客户端 store 并根据您的 Intlayer 配置更新持久化的 Cookie 或本地存储。

## 相关文档

- [`intlayer` 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useIntlayer.md)
- [`useDictionary` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useDictionary.md)
