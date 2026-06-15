---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: 성별 기반 콘텐츠
description: Intlayer에서 성별 기반 콘텐츠를 사용하여 성별에 따라 동적으로 콘텐츠를 표시하는 방법을 알아보세요. 이 문서를 따라 프로젝트에서 성별별 콘텐츠를 효율적으로 구현할 수 있습니다.
keywords:
  - 성별 기반 콘텐츠
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
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: "성별 기반 콘텐츠 도입"
author: aymericzip
---

# 성별 기반 콘텐츠 / Intlayer의 성별

## 성별 작동 방식

Intlayer에서는 `gender` 함수를 통해 성별 기반 콘텐츠를 구현합니다. 이 함수는 특정 성별 값('male', 'female')을 해당하는 콘텐츠에 매핑합니다. 이 방식을 통해 주어진 성별에 따라 동적으로 콘텐츠를 선택할 수 있습니다. React Intlayer 또는 Next Intlayer와 통합하면, 런타임에 제공된 성별에 따라 적절한 콘텐츠가 자동으로 선택됩니다.

## 성별 기반 콘텐츠 설정

Intlayer 프로젝트에서 성별 기반 콘텐츠를 설정하려면, 성별별 정의를 포함하는 콘텐츠 모듈을 생성하세요. 아래는 다양한 형식의 예시입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "남성 사용자용 콘텐츠",
      female: "여성 사용자용 콘텐츠",
      fallback: "성별이 지정되지 않았을 때의 콘텐츠", // 선택 사항
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
        "male": "남성 사용자용 콘텐츠",
        "female": "여성 사용자용 콘텐츠",
        "fallback": "성별이 지정되지 않았을 때의 콘텐츠", // 선택 사항
      },
    },
  },
}
```

> 만약 fallback이 선언되지 않았다면, 성별이 지정되지 않았거나 정의된 성별과 일치하지 않을 경우 마지막으로 선언된 키가 fallback으로 사용됩니다.

## React Intlayer에서 성별 기반 콘텐츠 사용하기

<Tabs group="framework">
  <Tab label="React" value="react">

To utilize gender-based content within a React component, import and use the `useIntlayer` hook from the `react-intlayer` package. This hook fetches the content for the specified key and allows you to pass in a gender to select the appropriate output.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content for male users */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Output: my content for male users */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Output: my content for female users */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
          myGender("")
        }
      </p>
      <p>
        {
          /* Output: my content when gender is not specified */
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

To utilize gender-based content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize gender-based content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize gender-based content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

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

To utilize gender-based content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize gender-based content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize gender-based content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

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

To utilize gender-based content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("gender-male")!.textContent =
    newContent.myGender("male");
  document.getElementById("gender-female")!.textContent =
    newContent.myGender("female");
});

// Initial render
document.getElementById("gender-male")!.textContent = content.myGender("male");
document.getElementById("gender-female")!.textContent =
  content.myGender("female");
```

  </Tab>
</Tabs>

## 추가 자료

설정 및 사용법에 대한 자세한 정보는 다음 자료를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

이 자료들은 다양한 환경과 프레임워크에서 Intlayer의 설정 및 사용에 대한 추가적인 통찰을 제공합니다.
