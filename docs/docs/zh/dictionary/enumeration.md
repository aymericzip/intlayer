---
createdAt: 2024-08-11
updatedAt: 2026-10-08
priority: 8
title: "枚举：按数量显示消息"
description: "使用 Intlayer 枚举，根据数字或区间显示不同内容，配合 enu() 节点和 '<-1'、'>5' 等条件。"
keywords:
  - 枚举
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
author: aymericzip
---

# 枚举 / 复数形式

## 枚举的工作原理

在 Intlayer 中，枚举是通过 `enu` 函数实现的，该函数将特定的键映射到对应的内容。这些键可以表示数值、范围或自定义标识符。当与 React Intlayer 或 Next Intlayer 一起使用时，会根据应用程序的语言环境和定义的规则自动选择合适的内容。

## 设置枚举

要在您的 Intlayer 项目中设置枚举，您需要创建一个包含枚举定义的内容模块。以下是一个关于汽车数量的简单枚举示例：

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "许多车",
      "fallback": "备用值", // 可选
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "少于负一辆车",
        "-1": "负一辆车",
        "0": "没有车辆",
        "1": "一辆车",
        ">5": "一些车辆",
        ">19": "许多车辆",
        "fallback": "备用值" // 可选
      }
    }
  }
}
```

在此示例中，`enu` 将各种条件映射到特定内容。当在 React 组件中使用时，Intlayer 可以根据给定的变量自动选择合适的内容。

> 在 Intlayer 枚举中，声明的顺序非常重要。第一个有效的声明将被选中。如果多个条件适用，请确保它们的顺序正确，以避免意外行为。

> 如果未声明备用值，当没有匹配的键时，函数将返回 `undefined`。

## 在各框架中使用枚举

<Tabs group="framework">
  <Tab label="React" value="react">

要在 React 组件中使用枚举，可以使用 `react-intlayer` 包中的 `useIntlayer` Hook。该 Hook 会根据指定的键获取对应的内容。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // 输出：无车辆
        }
      </p>
      <p>
        {
          numberOfCar(6) // 输出：一些车辆
        }
      </p>
      <p>
        {
          numberOfCar(20) // 输出：许多车辆
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // 输出：备用值
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

要在 Next.js 客户端组件中使用枚举，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

要在 Vue 组件中使用枚举，可通过 `useIntlayer` Hook 获取。示例如下：

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { numberOfCar } = useIntlayer("car_count");
</script>

<template>
  <div>
    <p>{{ numberOfCar(6) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

要在 Svelte 组件中使用枚举，可通过 `useIntlayer` Hook 获取。使用 `$` 访问 store。示例如下：

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("car_count");
</script>

<div>
  <p>{$content.numberOfCar(6)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

要在 Preact 组件中使用枚举，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

要在 SolidJS 组件中使用枚举，可通过 `useIntlayer` Hook 获取。示例如下：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const CarComponent: Component = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

要在 Angular 组件中使用枚举，可通过 `useIntlayer` Hook 获取。示例如下：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-car",
  template: `
    <div>
      <p>{{ content().numberOfCar(6) }}</p>
    </div>
  `,
})
export class CarComponent {
  content = useIntlayer("car_count");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

要在 Vanilla JS 中使用枚举，可通过 `vanilla-intlayer` 的 `useIntlayer` 获取。示例如下：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// 初始渲染
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>

### 使用序数枚举

<Tabs group="framework">
  <Tab label="React" value="react">

要在 React 组件中使用序数枚举，传入数字的最后一位以获取正确的后缀，然后将完整数量作为插值传入：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // 获取最后一位数字以确定正确的前缀/后缀
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // 例如 count=5 时输出 "第 5 名"
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

要在 Next.js 客户端组件中使用序数枚举，传入数字的最后一位以获取正确后缀，并将完整数量作为插值传入：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

要在 Vue 组件中使用序数枚举，传入数字的最后一位以获取正确后缀，并将完整数量作为插值传入：

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { ordinal } = useIntlayer("ranking_component");
</script>

<template>
  <div>
    <p>{{ ordinal(Math.abs(count) % 10)({ count }) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

要在 Svelte 组件中使用序数枚举，传入数字的最后一位以获取正确后缀，并将完整数量作为插值传入：

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("ranking_component");
$: lastDigit = Math.abs(count) % 10;
</script>

<div>
  <p>{$content.ordinal(lastDigit)({ count })}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

要在 Preact 组件中使用序数枚举，传入数字的最后一位以获取正确后缀，并将完整数量作为插值传入：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

要在 SolidJS 组件中使用序数枚举，传入数字的最后一位以获取正确后缀，并将完整数量作为插值传入：

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const RankingComponent: Component<{ count: number }> = (props) => {
  const { ordinal } = useIntlayer("ranking_component");

  return (
    <div>
      <p>{ordinal(Math.abs(props.count) % 10)({ count: props.count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

要在 Angular 组件中使用序数枚举，传入数字的最后一位以获取正确后缀，并将完整数量作为插值传入：

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-ranking",
  template: `
    <div>
      <p>{{ content().ordinal(lastDigit())({ count }) }}</p>
    </div>
  `,
})
export class RankingComponent {
  @Input() count!: number;

  content = useIntlayer("ranking_component");

  lastDigit() {
    return Math.abs(this.count) % 10;
  }
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

要在 Vanilla JS 中使用序数枚举，传入数字的最后一位以获取正确后缀，并将完整数量作为插值传入：

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("ranking_component");
const lastDigit = Math.abs(5) % 10;

document.getElementById("ranking")!.textContent = content.ordinal(lastDigit)({
  count: 5,
});
```

  </Tab>
</Tabs>

## 其他资源

有关配置和使用的更详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了关于在不同环境和各种框架中设置和使用 Intlayer 的更多指导。
