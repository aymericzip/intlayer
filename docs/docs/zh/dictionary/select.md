---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: 基于选择的内容
description: 了解如何在 Intlayer 中使用基于选择的内容，以根据任意字符串值动态显示内容。按照本指南高效地在项目中实现类似 switch 语句的内容。
keywords:
  - 基于选择的内容
  - 选择内容
  - Select Content
  - Switch 内容
  - ICU select
  - 动态渲染
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "引入基于选择的内容"
author: aymericzip
---

# 基于选择的内容 (Select) / Intlayer

## Select 的工作原理

在 Intlayer 中，基于选择的内容是通过 `select` 函数实现的，它将任意字符串值映射到相应的内容。这相当于 ICU 的 `{value, select, …}` 消息，或者应用程序代码中的 `switch` 语句。

当判别条件是一个自由格式的字符串时（如状态、计划、平台、角色），请使用 `select`。对于其他判别条件，Intlayer 提供了专用的节点：

| 判别条件       | 节点       |
| -------------- | ---------- |
| 一个数量       | `enu()`    |
| 一个布尔值     | `cond()`   |
| 一个性别       | `gender()` |
| 任何其他字符串 | `select()` |

## 设置基于选择的内容

要在您的 Intlayer 项目中设置基于选择的内容，请创建一个包含选择定义的内容模块。下面是不同格式的示例。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // 可选
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // 可选
      },
    },
  },
}
```

> 如果未声明 `fallback`，当提供的值与任何声明的情况不匹配时，最后声明的键将被作为后备项。这与 `cond()` 和 `gender()` 的约定相同。

### 类型安全

接受的参数是从声明的情况中推断出来的：

- 如果没有 `fallback`，则只接受声明的情况：输入错误将导致类型错误。
- 如果有 `fallback`，则接受任何字符串（后备项会处理不匹配的值），同时声明的情况仍然支持自动补全。

## 为什么不使用简单对象？

声明一个简单的对象并使用运行时值进行索引是很诱人的：

```tsx
// ❌ 不要这样做
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Intlayer 编译器会分析您的源代码，以丢弃未使用的内容并压缩剩余的键。动态计算访问 (`obj[expr]`) 无法在静态时解析，因此整个分支会被标记为不透明（opaque）：它将保留在包中，且其键保持不被压缩。

使用 `select()`，情况解析发生在函数调用内部，而不是属性访问。编译器看到的是单一静态字段访问，并像对待 `enu()`、`cond()` 或 `gender()` 一样精确优化该节点：

```tsx
// ✅ 请这样做
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## 使用基于选择的内容

<Tabs group="framework">
  <Tab label="React" value="react">

要在 React 组件中使用基于选择的内容，请导入并使用 `react-intlayer` 包中的 `useIntlayer` 钩子。该钩子获取指定键的内容，并允许您传入一个值以选择适当的输出。

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* 输出: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* 输出: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

要在 Next.js 客户端组件中使用基于选择的内容，请通过 `useIntlayer` 钩子获取它。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

要在 Vue 组件中使用基于选择的内容，请通过 `useIntlayer` 钩子获取它。示例如下：

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

要在 Svelte 组件中使用基于选择的内容，请通过 `useIntlayer` 钩子获取它。可以通过 `$` 访问 store。示例如下：

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

要在 Preact 组件中使用基于选择的内容，请通过 `useIntlayer` 钩子获取它。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

要在 SolidJS 组件中使用基于选择的内容，请通过 `useIntlayer` 钩子获取它。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

要在 Angular 组件中使用基于选择的内容，请通过 `useIntlayer` 钩子获取它。示例如下：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

要在 `vanilla-intlayer` 中使用基于选择的内容，请通过 `useIntlayer` 钩子获取它。示例如下：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// 初始渲染
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## 将 Select 与其他节点结合使用

每个情况都包含一个完整的内容节点，因此 `select` 可以与 `t()`、`insert()`、`md()` 等结合使用：

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          zh: "{{name}} 保存了一份草稿",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          zh: "{{name}} 发布了帖子",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          zh: "{{name}} 更新了帖子",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // 输出: Alice 保存了一份草稿
```

## 从 ICU `select` 迁移

使用 ICU `select` 参数的消息将被作为 `select` 节点导入：

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

变为

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

ICU 中的 `other` 情况被重命名为 `fallback`，这是 Intlayer 用于所有未匹配情况的规范名称。第二个参数记录了 ICU 变量的名称，以便在导出时可以将消息完全恢复为原来的 ICU 字符串。

> 如果 ICU `select` 的情况是性别值（`male` / `female` / `other`），它将作为 [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md) 节点导入。

## 其他资源

有关配置和使用的更多详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [Intlayer React 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Intlayer Next.js 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源深入探讨了在不同环境和框架中配置和使用 Intlayer 的方法。
