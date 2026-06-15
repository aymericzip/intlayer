---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 枚举
description: 了解如何在您的多语言网站中声明和使用枚举。按照本在线文档中的步骤，几分钟内即可设置您的项目。
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

## 在 React Intlayer 中使用枚举

<Tabs group="framework">
  <Tab label="React" value="react">

To use enumeration in a React component, you can leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified ID. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use enumeration in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

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

To use enumeration in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// Initial render
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>

## 附加资源

有关配置和使用的更详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了关于在不同环境和各种框架中设置和使用 Intlayer 的更多见解。

### Using Ordinal Enumeration

<Tabs group="framework">
  <Tab label="React" value="react">

To use this in a React component, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Get the last digit to determine the correct suffix
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // e.g., "5th place" for count=5
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use this in Next.js Client Components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

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

To use this in Vue components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

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

To use this in Svelte components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

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

To use this in Preact components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

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

To use this in SolidJS components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

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

To use this in Angular components, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

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

To use this with `vanilla-intlayer`, call the enumeration with the last digit of the number to get the correct suffix, then pass the full count as the insertion value:

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

## Combining Enumeration with Insert for Ordinal Numbers

<Tabs group="framework">
  <Tab label="React" value="react">

To use enumeration in a React component, you can leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified ID. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use enumeration in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

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

To use enumeration in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To use enumeration with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// Initial render
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>
## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

These resources provide further insights into the setup and usage of Intlayer in different environments and with various frameworks.
