---
createdAt: 2024-08-11
updatedAt: 2025-06-29
priority: 8
title: "번역 콘텐츠: t() 함수"
description: "Intlayer의 t() 함수로 로케일별 번역을 선언합니다. 타입 검사가 빌드 시 누락된 로케일을 알려 줍니다."
keywords:
  - 번역
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
author: aymericzip
---

# 번역

## 번역 정의하기

`intlayer`의 `t` 함수는 여러 언어로 콘텐츠를 선언할 수 있게 해줍니다. 이 함수는 타입 안전성을 보장하며, 번역이 누락된 경우 오류를 발생시켜 특히 TypeScript 환경에서 유용합니다.

다음은 번역이 포함된 콘텐츠를 선언하는 예시입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## 로케일 구성

적절한 번역 처리를 보장하기 위해 `intlayer.config.ts`에서 허용되는 로케일을 구성할 수 있습니다. 이 구성은 애플리케이션이 지원하는 언어를 정의할 수 있게 합니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## 컴포넌트에서 번역 사용하기

<Tabs group="framework">
  <Tab label="React" value="react">

`react-intlayer`를 사용하면 React 컴포넌트에서 번역을 손쉽게 사용할 수 있습니다. 다음은 예시입니다:

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

이 컴포넌트는 애플리케이션에 설정된 현재 로케일을 기반으로 해당하는 번역을 가져옵니다.

  </Tab>
  <Tab label="Next.js" value="nextjs">

`next-intlayer`를 사용하면 React Server Components 또는 Client Components에서 번역을 사용할 수 있습니다. 다음은 Client Component에서의 예시입니다:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

`vue-intlayer`를 사용하면 Vue 컴포넌트에서 번역을 손쉽게 사용할 수 있습니다. 다음은 예시입니다:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("multi_lang");
</script>

<template>
  <div>
    <p>{{ content.welcomeMessage }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

`svelte-intlayer`를 사용하면 Svelte 컴포넌트에서 번역을 사용할 수 있습니다. 이 훅은 Svelte 스토어를 반환합니다. 다음은 예시입니다:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("multi_lang");
</script>

<div>
  <p>{$content.welcomeMessage}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

`preact-intlayer`를 사용하면 Preact 컴포넌트에서 번역을 사용할 수 있습니다. 다음은 예시입니다:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

`solid-intlayer`를 사용하면 SolidJS 컴포넌트에서 번역을 사용할 수 있습니다. 다음은 예시입니다:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const MyComponent: Component = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

`angular-intlayer`를 사용하면 Angular 컴포넌트에서 번역을 사용할 수 있습니다. 다음은 예시입니다:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my-component",
  template: `
    <div>
      <p>{{ content().welcomeMessage }}</p>
    </div>
  `,
})
export class MyComponent {
  content = useIntlayer("multi_lang");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

`vanilla-intlayer`를 사용하면 콘텐츠 변경을 구독하여 번역을 처리할 수 있습니다. 다음은 예시입니다:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("multi_lang").onChange((newContent) => {
  document.getElementById("welcome-message")!.textContent = String(
    newContent.welcomeMessage
  );
});

// 초기 렌더링
document.getElementById("welcome-message")!.textContent = String(
  content.welcomeMessage
);
```

  </Tab>
</Tabs>
