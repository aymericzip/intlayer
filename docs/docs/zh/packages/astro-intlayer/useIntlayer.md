---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useIntlayer 钩子文档 | astro-intlayer
description: 了解如何在 Astro 组件和客户端脚本中使用 useIntlayer 钩子访问本地化内容。
keywords:
  - useIntlayer
  - dictionary
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "初始文档"
author: aymericzip
---

# useIntlayer 钩子文档

`useIntlayer` 钩子允许您在 Astro 应用程序中按键检索本地化的字典内容。

可以使用相同的导入路径在两个不同的上下文中调用它：

1. **服务端 / Frontmatter**：在 `.astro` 文件内部，它会自动使用存储在 `Astro.locals.intlayer` 中的请求语言环境来解析内容。
2. **浏览器 / 客户端 `<script>`**：在客户端脚本或 UI 框架组件内部，它解析为客户端 store 实现 (`vanilla-intlayer`)。

## 使用方法

### 在 Astro 组件 Frontmatter 中

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### 在客户端 `<script>` 块中

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## 参数

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**：字典的唯一键（在 `.content.ts` 声明文件中定义）。
2. **`localeOrSelector`**（可选）：特定语言环境或选择器对象（`{ item }`、`{ variant }`，可包含 `locale`）。提供时，它会覆盖从请求上下文或客户端 store 检测到的语言环境。

## 说明

该钩子执行以下任务：

1. **语言环境解析**：
   - 在服务端，通过由 `astro-intlayer/middleware` 初始化的 `AsyncLocalStorage` 作用域从 `Astro.locals.intlayer` 读取活动语言环境。
   - 在浏览器中，从客户端存储/store 读取活动语言环境。
2. **字典获取**：注入与指定键匹配的字典内容。
3. **翻译处理**：将翻译 (`t()`)、枚举、条件和 markdown 解析为可渲染的内容。

## 相关文档

- [`intlayer` 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/intlayer.md)
- [`useDictionary` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useDictionary.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useLocale.md)
