---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: 동적 레코드
description: 불투명한 ID로 런타임에 가져오는 CMS 관리형 레코드를 선언하기 위해 Intlayer 콘텐츠 파일에서 meta 필드를 사용합니다. 이를 통해 빌드 시점의 열거 없이 강력한 형식의 동적 콘텐츠를 지원합니다.
keywords:
  - 동적 레코드
  - 동적 콘텐츠
  - CMS
  - 런타임 콘텐츠
  - Intlayer
  - 국제화
slugs:
  - doc
  - concept
  - dynamic-records
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "동적 콘텐츠 기능 출시"
author: aymericzip
---

# 동적 레코드

**동적 레코드**(dynamic record)는 고유 식별자가 순차적 인덱스나 이름이 지정된 변형이 아니라, `meta` 필드에 선언된 임의의 키-값 쌍의 집합인 콘텐츠 파일입니다. Intlayer는 런타임 시 이 필드들을 선택기로 사용하여 CMS 레코드, 사용자 특정 텍스트 또는 빌드 시점에 키를 알 수 없는 임의의 콘텐츠에 접근할 수 있게 합니다.

## 동적 레코드 선언

```ts fileName="product-copy.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product-copy",
  meta: {
    id: "prod_abc",
    userId: "user_123",
  },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product-copy.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product-copy",
  meta: {
    id: "prod_abcd",
    userId: "user_123",
  },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

## 동적 레코드 소비하기

선택기에서 모든 `meta` 필드는 **필수**입니다. 일부 필드를 누락하면 `null`이 반환되며 TypeScript 오류가 발생합니다.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScript는 `id`와 `userId`가 모두 제공되었는지 검사합니다.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScript는 `id`와 `userId`가 모두 제공되었는지 검사합니다.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="ProductCopy.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product-copy", { id: props.productId, userId: props.userId });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="ProductCopy.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product-copy", { id: productId, userId });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const ProductCopy = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: productId, userId });
      // TypeScript는 `id`와 `userId`가 모두 제공되었는지 검사합니다.

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="ProductCopy.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const ProductCopy = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product-copy", { id: props.productId, userId: props.userId });
      // TypeScript는 `id`와 `userId`가 모두 제공되었는지 검사합니다.

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product-copy.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product-copy",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductCopyComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product-copy", { id: this.productId, userId: this.userId });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product-copy.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product-copy", {
      id: "prod_abcd",
      userId: "user_123"
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

### 명시적 로케일 사용 시

```tsx
const content = useIntlayer("product-copy", {
  id: "prod_abc",
  userId: "user_123",
  locale: "ko",
});
```

### 필수 meta 필드 누락 — 컴파일 오류

```ts
// 타입 오류: `userId` 누락
const content = useIntlayer("product-copy", { id: "prod_abc" });
```

## 로딩 모드 (loading mode)

동적 레코드는 일반적으로 지연 로드됩니다. 이를 제어하려면 사전에 `importMode`를 설정합니다.

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product-copy",
  importMode: "fetch", // 또는 "dynamic"
  meta: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

`static`, `dynamic`, `fetch` 모드에 대한 자세한 내용은 [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참조하세요.

## 일반적인 사용 사례

- CMS에서 관리하는 제품별 마케팅 문구
- 사용자별 또는 계정별 맞춤 콘텐츠
- 불투명한 런타임 ID로 식별되는 임의의 콘텐츠
