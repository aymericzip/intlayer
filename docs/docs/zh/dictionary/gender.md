---
createdAt: 2025-07-27
updatedAt: 2026-10-08
priority: 8
title: "Intlayer 中按性别区分的内容"
description: "使用 Intlayer 的 gender() 节点根据读者性别调整消息：男性、女性和默认变体集中声明。"
keywords:
  - 基于性别的内容
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
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "引入基于性别的内容显示功能"
author: aymericzip
---

# 基于性别的内容 / Intlayer 中的性别

## 性别的工作原理

在 Intlayer 中，基于性别的内容是通过 `gender` 函数实现的，该函数将特定的性别值（'male'，'female'）映射到相应的内容。此方法使您能够根据给定的性别动态选择内容。当与 React Intlayer 或 Next Intlayer 集成时，会根据运行时提供的性别自动选择适当的内容。

## 设置基于性别的内容

要在您的 Intlayer 项目中设置基于性别的内容，请创建一个包含性别特定定义的内容模块。以下是各种格式的示例。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "针对男性用户的内容",
      female: "针对女性用户的内容",
      fallback: "未指定性别时的内容", // 可选
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "针对男性用户的内容",
        "female": "针对女性用户的内容",
        "fallback": "未指定性别时的内容", // 可选
      },
    },
  },
}
```

> 如果未声明回退内容，当性别未指定或不匹配任何定义的性别时，将使用最后声明的键作为回退内容。

## 在各框架中使用基于性别的内容

<Tabs group="framework">
  <Tab label="React" value="react">

要在 React 组件中使用基于性别的内容，请从 `react-intlayer` 包中导入并使用 `useIntlayer` Hook。该 Hook 会获取指定键的内容，并允许您传入性别参数以选择对应的输出：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出：针对男性用户的内容 */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 输出：针对女性用户的内容 */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 输出：针对男性用户的内容 */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 输出：针对女性用户的内容 */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 输出：未指定性别时的 fallback 内容 */
          myGender("")
        }
      </p>
      <p>
        {
          /* 输出：未指定性别时的 fallback 内容 */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

要在 Next.js 客户端组件中使用基于性别的内容，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

要在 Vue 组件中使用基于性别的内容，可通过 `useIntlayer` Hook 获取。示例如下：

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myGender } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myGender("male") }}</p>
    <p>{{ myGender("female") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

要在 Svelte 组件中使用基于性别的内容，可通过 `useIntlayer` Hook 获取。使用 `$` 访问 store。示例如下：

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myGender("male")}</p>
  <p>{$content.myGender("female")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

要在 Preact 组件中使用基于性别的内容，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

要在 SolidJS 组件中使用基于性别的内容，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const GenderComponent: Component = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>{myGender("male")}</p>
      <p>{myGender("female")}</p>
    </div>
  );
};

export default GenderComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

要在 Angular 组件中使用基于性别的内容，可通过 `useIntlayer` Hook 获取。示例如下：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-gender",
  template: `
    <div>
      <p>{{ content().myGender("male") }}</p>
      <p>{{ content().myGender("female") }}</p>
    </div>
  `,
})
export class GenderComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

要在 Vanilla JS 中使用基于性别的内容，可通过 `vanilla-intlayer` 的 `useIntlayer` 获取。示例如下：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("gender-male")!.textContent =
    newContent.myGender("male");
  document.getElementById("gender-female")!.textContent =
    newContent.myGender("female");
});

// 初始渲染
document.getElementById("gender-male")!.textContent = content.myGender("male");
document.getElementById("gender-female")!.textContent =
  content.myGender("female");
```

  </Tab>
</Tabs>

## 其他资源

有关配置和使用的更详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了关于在各种环境和框架中设置和使用 Intlayer 的更多指导。
