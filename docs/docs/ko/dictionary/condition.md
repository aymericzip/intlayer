---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: 조건 콘텐츠
description: Intlayer에서 조건부 콘텐츠를 사용하여 특정 조건에 따라 동적으로 콘텐츠를 표시하는 방법을 알아보세요. 이 문서를 따라 조건을 효율적으로 구현하세요.
keywords:
  - 조건 콘텐츠
  - 동적 렌더링
  - 문서
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

# 조건부 콘텐츠 / Intlayer에서의 조건

## 조건 작동 방식

Intlayer에서 조건부 콘텐츠는 특정 조건(일반적으로 boolean 값)을 해당 콘텐츠에 매핑하는 `cond` 함수를 통해 구현됩니다. 이 접근 방식은 주어진 조건에 따라 동적으로 콘텐츠를 선택할 수 있게 합니다. React Intlayer 또는 Next Intlayer와 통합하면 런타임에 제공된 조건에 따라 적절한 콘텐츠가 자동으로 선택됩니다.

## 조건부 콘텐츠 설정

Intlayer 프로젝트에서 조건부 콘텐츠를 설정하려면 조건 정의를 포함하는 콘텐츠 모듈을 생성하십시오. 아래는 다양한 형식의 예제입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "조건이 참일 때의 콘텐츠",
      false: "조건이 거짓일 때의 콘텐츠",
      fallback: "조건이 실패했을 때의 콘텐츠", // 선택 사항
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
        "true": "조건이 참일 때의 콘텐츠",
        "false": "조건이 거짓일 때의 콘텐츠",
        "fallback": "조건이 실패했을 때의 콘텐츠", // 선택 사항
      },
    },
  },
}
```

> fallback이 선언되지 않은 경우, 조건이 유효하지 않을 때 마지막으로 선언된 키가 fallback으로 사용됩니다.

## React Intlayer와 조건부 콘텐츠 사용

<Tabs group="framework">
  <Tab label="React" value="react">

To utilize conditional content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass in a condition to select the appropriate output.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content when it's true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: my content when it's false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
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

To utilize conditional content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize conditional content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize conditional content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

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

To utilize conditional content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize conditional content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize conditional content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize conditional content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("true-content")!.textContent =
    newContent.myCondition(true);
  document.getElementById("false-content")!.textContent =
    newContent.myCondition(false);
});

// Initial render
document.getElementById("true-content")!.textContent =
  content.myCondition(true);
document.getElementById("false-content")!.textContent =
  content.myCondition(false);
```

  </Tab>
</Tabs>

## 추가 리소스

구성 및 사용에 대한 자세한 정보는 다음 리소스를 참조하십시오:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

이 리소스는 다양한 환경 및 프레임워크에서 Intlayer의 설정 및 사용에 대한 추가 정보를 제공합니다.
