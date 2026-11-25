---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "使用 Schema 校验字典 (Zod)"
description: "在 intlayer.config.ts 中声明 Zod schema 并将其关联到字典，在构建时校验每个 locale，并在编辑器中为内容提供类型。"
keywords:
  - Schema
  - Zod
  - 校验
  - 字典
  - 内容声明
  - 类型安全
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "初始化文档"
author: aymericzip
---

# 使用 Schema 校验字典

Schema 描述了字典内容的预期结构。你只需在 `intlayer.config.ts` 中声明一次并为其命名，然后通过 `schema` 字段将该名称关联到任意字典。

之后 Intlayer 会：

- 在构建字典时针对每个 locale **校验**字典，并报告每个问题所在的 locale 和字段路径。
- 在编辑器中为字典内容**提供类型**，让缺失或类型错误的字段在构建之前就被发现。

当多个字典需要共享相同结构（SEO 元数据、商品卡片、类 CMS 条目），或者内容需要满足 TypeScript 无法表达的约束（例如每条翻译的最大长度）时，Schema 非常有用。

<Steps>
<Step number={1} title="在配置中声明 schema">

安装 [Zod](https://zod.dev)：

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

然后在 `schemas` 键下声明你的 schema。每个键就是你在字典中引用的名称。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="将 schema 关联到字典">

将字典的 `schema` 字段设置为配置中声明的某个名称。

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

同一个 schema 可以关联到任意数量的字典。

</Step>
<Step number={3} title="构建并查看报告">

每次 Intlayer 构建字典时都会执行校验：无论是通过 `npx intlayer build`，还是在 dev 和 build 模式下通过打包工具插件。如果某条翻译违反了 schema，Intlayer 会输出 locale、字段路径和 Zod 的错误信息：

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

无效的字典会被排除在构建之外，直到其内容被修复。其他字典不受影响。

</Step>
</Steps>

## 根据 schema 为内容提供类型

`Dictionary` 的泛型参数决定了 TypeScript 检查字典的严格程度：

| 声明                                                    | `schema` 字段            | `content` 字段                 |
| ------------------------------------------------------- | ------------------------ | ------------------------------ |
| `satisfies Dictionary`                                  | 自动补全，未知名称会报错 | 不由 TypeScript 检查           |
| `satisfies Dictionary<undefined, "seo-metadata">`       | 必须为 `"seo-metadata"`  | 根据 schema 推导类型           |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | 必须为 `"seo-metadata"`  | 根据 schema 和你自己的类型推导 |

使用带类型的 schema 时，每个字段既可以接受普通值，也可以接受生成该值的内容节点，因此仍然可以使用 `t()`：

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> 每次构建字典时，Intlayer 都会根据你的 Zod schema 在 `.intlayer/types` 中生成这些类型。类型只覆盖结构：`.min()`、`.max()` 或 `.regex()` 等约束会在构建时检查。

## 校验内容

对于 `internationalization.locales` 中列出的每个 locale，Intlayer 会先解析该 locale 下的字典内容，再校验结果。因此 schema 描述的是字段的最终值（`title: string`），而不是保存翻译的 `t()` 节点。

- **缺失的翻译**：在默认的 `strictMode` 下，缺失的翻译会在校验前回退到默认 locale。在 `strictMode: "strict"` 下，缺失的翻译会导致必填字段校验失败。
- **其他内容节点**：`enu()`、`plural()`、`cond()`、`gender()`、`select()` 和 `insert()` 会被解析为函数，`md()` 或 `html()` 会被解析为节点。请使用 `z.any()` 声明这些字段，并将约束放在解析为普通值的字段上。
- **不会被校验**：由函数或 Promise 提供的内容（[function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)），以及从 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 拉取的字典。

## 使用其他校验库

`schemas` 中的条目并不限定于 Zod。任何提供与 Zod 兼容的 `safeParse(data)` 方法的对象都可以使用，只要它返回 `{ success: true }` 或 `{ success: false, error: { issues } }`，其中每个 issue 都包含 `path` 数组和 `message`。内容类型只会从 Zod schema 生成：使用其他库时，关联字典的内容类型为 `any`。

## 常见问题

<FAQ>

<Question title="schema 错误会中断我的构建吗？">

不会。Intlayer 会输出每个问题，将无效字典排除在构建之外，并继续构建其他字典。在 dev 模式下，修复内容并保存即可：watcher 会重新校验并构建该字典。

</Question>
<Question title="多个字典可以共享同一个 schema 吗？">

可以。schema 通过名称引用，因此任意数量的字典都可以指向它。这正是主要用例：为所有页面元数据、商品条目或邮件模板强制统一的结构。

</Question>
<Question title="如果 schema 名称不存在会怎样？">

只要声明了至少一个 schema，TypeScript 就会报错，因为 `schema` 字段只接受已声明的名称。在 JSON 内容文件中，未知名称会被忽略，字典也不会被校验。

</Question>
<Question title="会校验所有 locale，还是只校验默认 locale？">

会校验 `internationalization.locales` 中列出的所有 locale。报告会标明失败的 locale，因此很容易发现只在德语中过长的翻译。

</Question>

</FAQ>

## 相关文档

- [内容声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)
- [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
