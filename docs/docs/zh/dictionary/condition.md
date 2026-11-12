---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 8
title: "Intlayer 中的条件内容"
description: "使用 Intlayer 的 cond() 节点，根据布尔条件显示不同内容，只需声明一次，渲染时解析。"
keywords:
  - 条件内容
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
  - condition
author: aymericzip
---

# 条件内容 / Intlayer 中的条件

## 条件如何工作

在 Intlayer 中，通过 `cond` 函数实现条件内容，该函数将特定条件（通常是布尔值）映射到其对应的内容。这种方法使您能够根据给定条件动态选择内容。当与 React Intlayer 或 Next Intlayer 集成时，会根据运行时提供的条件自动选择适当的内容。

## 设置条件内容

要在您的 Intlayer 项目中设置条件内容，请创建一个包含条件定义的内容模块。以下是各种格式的示例。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "当条件为真时的内容",
      false: "当条件为假时的内容",
      fallback: "当条件不满足时的内容", // 可选
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "当条件为真时的内容",
        "false": "当条件为假时的内容",
        "fallback": "当条件不满足时的内容", // 可选
      },
    },
  },
}
```

> 如果未声明 fallback，当条件不满足时将使用最后声明的键作为 fallback。

## 在各框架中使用条件内容

<Tabs group="framework">
  <Tab label="React" value="react">

要在 React 组件中使用条件内容，请从 `react-intlayer` 包中导入并使用 `useIntlayer` Hook。该 Hook 会获取指定键的内容，并允许您传入条件以选择对应的输出：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出：条件为 true 时的内容 */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 输出：条件为 false 时的内容 */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 输出：条件不满足时的 fallback 内容 */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 输出：条件不满足时的 fallback 内容 */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

要在 Next.js 客户端组件中使用条件内容，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

要在 Vue 组件中使用条件内容，可通过 `useIntlayer` Hook 获取。示例如下：

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myCondition } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myCondition(true) }}</p>
    <p>{{ myCondition(false) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

要在 Svelte 组件中使用条件内容，可通过 `useIntlayer` Hook 获取。使用 `$` 访问 store。示例如下：

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myCondition(true)}</p>
  <p>{$content.myCondition(false)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

要在 Preact 组件中使用条件内容，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

要在 SolidJS 组件中使用条件内容，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const ConditionalComponent: Component = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

要在 Angular 组件中使用条件内容，可通过 `useIntlayer` Hook 获取。示例如下：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-conditional",
  template: `
    <div>
      <p>{{ content().myCondition(true) }}</p>
      <p>{{ content().myCondition(false) }}</p>
    </div>
  `,
})
export class ConditionalComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

要在 Vanilla JS 中使用条件内容，可通过 `vanilla-intlayer` 的 `useIntlayer` 获取。示例如下：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("true-content")!.textContent =
    newContent.myCondition(true);
  document.getElementById("false-content")!.textContent =
    newContent.myCondition(false);
});

// 初始渲染
document.getElementById("true-content")!.textContent =
  content.myCondition(true);
document.getElementById("false-content")!.textContent =
  content.myCondition(false);
```

  </Tab>
</Tabs>

## 其他资源

有关配置和使用的更多详细信息，请参考以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了在各种环境和框架中设置和使用 Intlayer 的进一步见解。
