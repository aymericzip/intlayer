---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Liệt kê
description: Tìm hiểu cách khai báo và sử dụng các phép liệt kê trong trang web đa ngôn ngữ của bạn. Làm theo các bước trong tài liệu trực tuyến này để thiết lập dự án của bạn trong vài phút.
keywords:
  - Liệt kê
  - Quốc tế hóa
  - Tài liệu
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
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Liệt kê / Phân số nhiều

## Cách hoạt động của Liệt kê

Trong Intlayer, phép liệt kê được thực hiện thông qua hàm `enu`, hàm này ánh xạ các khóa cụ thể tới nội dung tương ứng của chúng. Các khóa này có thể đại diện cho các giá trị số, phạm vi, hoặc các định danh tùy chỉnh. Khi sử dụng với React Intlayer hoặc Next Intlayer, nội dung phù hợp sẽ được tự động chọn dựa trên locale của ứng dụng và các quy tắc đã định nghĩa.

## Thiết lập Liệt kê

Để thiết lập phép liệt kê trong dự án Intlayer của bạn, bạn cần tạo một module nội dung bao gồm các định nghĩa liệt kê. Dưới đây là ví dụ về một phép liệt kê đơn giản cho số lượng xe hơi:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Ít hơn âm một chiếc xe",
      "-1": "Âm một chiếc xe",
      "0": "Không có xe",
      "1": "Một chiếc xe",
      ">5": "Một vài chiếc xe",
      ">19": "Nhiều chiếc xe",
      "fallback": "Giá trị dự phòng", // Tùy chọn
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
        "<-1": "Ít hơn âm một chiếc xe",
        "-1": "Âm một chiếc xe",
        "0": "Không có xe",
        "1": "Một chiếc xe",
        ">5": "Một vài chiếc xe",
        ">19": "Nhiều chiếc xe",
        "fallback": "Giá trị dự phòng" // Tùy chọn
      }
    }
  }
}
```

Trong ví dụ này, `enu` ánh xạ các điều kiện khác nhau tới nội dung cụ thể. Khi được sử dụng trong một component React, Intlayer có thể tự động chọn nội dung phù hợp dựa trên biến được cung cấp.

> Thứ tự khai báo rất quan trọng trong các phép liệt kê của Intlayer. Khai báo hợp lệ đầu tiên sẽ được chọn. Nếu có nhiều điều kiện áp dụng, hãy đảm bảo chúng được sắp xếp đúng để tránh hành vi không mong muốn.

> Nếu không khai báo giá trị dự phòng, hàm sẽ trả về `undefined` nếu không có khóa nào khớp.

## Sử dụng Enumeration với React Intlayer

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

## Combining Enumeration with Insert for Ordinal Numbers

A common use case is displaying ordinal numbers (1st, 2nd, 3rd, etc.). You can combine `enu` with `insert` to create dynamic ordinal content:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { enu, insert, type Dictionary } from "intlayer";

const rankingContent = {
  key: "ranking_component",
  content: {
    ordinal: enu({
      1: insert("{{count}}st place"),
      2: insert("{{count}}nd place"),
      3: insert("{{count}}rd place"),
      fallback: insert("{{count}}th place"),
    }),
  },
} satisfies Dictionary;

export default rankingContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "ranking_component",
  "content": {
    "ordinal": {
      "nodeType": "enumeration",
      "enumeration": {
        "1": {
          "nodeType": "insertion",
          "insertion": "{{count}}st place"
        },
        "2": {
          "nodeType": "insertion",
          "insertion": "{{count}}nd place"
        },
        "3": {
          "nodeType": "insertion",
          "insertion": "{{count}}rd place"
        },
        "fallback": {
          "nodeType": "insertion",
          "insertion": "{{count}}th place"
        }
      }
    }
  }
}
```

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
## Additional Resources

For more detailed information on configuration and usage, refer to the following resources:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)

These resources provide further insights into the setup and usage of Intlayer in different environments and with various frameworks.
