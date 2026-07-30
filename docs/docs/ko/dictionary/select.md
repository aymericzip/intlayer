---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: 선택 기반 콘텐츠
description: Intlayer에서 선택 기반 콘텐츠를 사용하여 임의의 문자열 값을 기반으로 콘텐츠를 동적으로 표시하는 방법을 알아보세요. 이 문서를 따라 프로젝트에서 스위치(switch) 유사 콘텐츠를 효율적으로 구현하세요.
keywords:
  - 선택 기반 콘텐츠
  - Select Content
  - 스위치 콘텐츠
  - ICU select
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
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "선택 기반 콘텐츠 도입"
author: aymericzip
---

# 선택 기반 콘텐츠 (Select) / Intlayer

## Select의 작동 방식

Intlayer에서 선택 기반 콘텐츠는 `select` 함수를 통해 이루어지며, 임의의 문자열 값을 해당 콘텐츠에 매핑합니다. 이는 ICU의 `{value, select, …}` 메시지나 애플리케이션 코드의 `switch` 문과 동일합니다.

상태(status), 요금제(plan), 플랫폼(platform), 역할(role) 등 판별자(discriminant)가 자유 형식의 문자열일 때 `select`를 사용하세요. 다른 판별자의 경우 Intlayer는 전용 노드를 제공합니다:

| 판별자            | 노드       |
| ----------------- | ---------- |
| 수량              | `enu()`    |
| 불리언(Boolean)   | `cond()`   |
| 성별              | `gender()` |
| 그 외 모든 문자열 | `select()` |

## 선택 기반 콘텐츠 설정하기

Intlayer 프로젝트에서 선택 기반 콘텐츠를 설정하려면, 선택 정의를 포함하는 콘텐츠 모듈을 생성하세요. 아래는 다양한 형식의 예시입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // 선택 사항
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
        "fallback": "Unknown status", // 선택 사항
      },
    },
  },
}
```

> `fallback`이 선언되지 않은 경우, 제공된 값이 선언된 케이스와 일치하지 않으면 마지막으로 선언된 키가 대체(fallback)로 간주됩니다. 이는 `cond()` 및 `gender()`와 동일한 규칙입니다.

### 타입 안전성(Type Safety)

허용되는 인수는 선언된 케이스에서 유추됩니다:

- `fallback`이 없으면 선언된 케이스만 허용됩니다: 오타는 타입 오류로 처리됩니다.
- `fallback`이 있으면 모든 문자열이 허용되며(대체 항목이 일치하지 않는 값을 처리함), 동시에 선언된 케이스는 여전히 자동 완성(autocompletion)을 제공합니다.

## 일반 객체(Plain Object)를 사용하지 않는 이유

일반 객체를 선언하고 런타임 값을 사용하여 인덱싱하는 것은 매력적일 수 있습니다:

```tsx
// ❌ 이렇게 하지 마세요
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

Intlayer 컴파일러는 소스 코드를 분석하여 사용되지 않는 콘텐츠를 버리고 나머지 키를 축소(minify)합니다. 동적 계산 접근(`obj[expr]`)은 정적으로 해석될 수 없으므로, 전체 분기가 불투명(opaque)하게 표시됩니다: 해당 분기는 번들(bundle)에 보존되며 해당 키는 축소되지 않습니다.

`select()`를 사용하면, 케이스 해결이 속성 접근(property access)이 아닌 함수 호출 내부에서 이루어집니다. 컴파일러는 단일 정적 필드 접근을 인지하고, `enu()`, `cond()`, 또는 `gender()`와 동일한 방식으로 노드를 정확하게 최적화합니다:

```tsx
// ✅ 이렇게 하세요
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## 선택 기반 콘텐츠 사용하기

<Tabs group="framework">
  <Tab label="React" value="react">

React 컴포넌트 내에서 선택 기반 콘텐츠를 활용하려면 `react-intlayer` 패키지의 `useIntlayer` 훅을 가져와 사용하세요. 이 훅은 지정된 키에 대한 콘텐츠를 가져오고, 적절한 출력을 선택하기 위해 값을 전달할 수 있게 해줍니다.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* 출력: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* 출력: Unknown status */
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

Next.js 클라이언트 컴포넌트 내에서 선택 기반 콘텐츠를 활용하려면 `useIntlayer` 훅을 통해 검색하세요. 예시는 다음과 같습니다:

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

Vue 컴포넌트 내에서 선택 기반 콘텐츠를 활용하려면 `useIntlayer` 훅을 통해 검색하세요. 예시는 다음과 같습니다:

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

Svelte 컴포넌트 내에서 선택 기반 콘텐츠를 활용하려면 `useIntlayer` 훅을 통해 검색하세요. 스토어는 `$`를 사용하여 접근합니다. 예시는 다음과 같습니다:

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

Preact 컴포넌트 내에서 선택 기반 콘텐츠를 활용하려면 `useIntlayer` 훅을 통해 검색하세요. 예시는 다음과 같습니다:

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

SolidJS 컴포넌트 내에서 선택 기반 콘텐츠를 활용하려면 `useIntlayer` 훅을 통해 검색하세요. 예시는 다음과 같습니다:

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

Angular 컴포넌트 내에서 선택 기반 콘텐츠를 활용하려면 `useIntlayer` 훅을 통해 검색하세요. 예시는 다음과 같습니다:

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

`vanilla-intlayer`로 선택 기반 콘텐츠를 활용하려면 `useIntlayer` 훅을 통해 검색하세요. 예시는 다음과 같습니다:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// 초기 렌더링
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Select와 다른 노드의 결합

각 케이스에는 완전한 콘텐츠 노드가 포함되어 있으므로, `select`는 `t()`, `insert()`, `md()` 등과 조합될 수 있습니다:

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
          ko: "{{name}}님이 초안을 저장했습니다",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          ko: "{{name}}님이 게시물을 발행했습니다",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          ko: "{{name}}님이 게시물을 업데이트했습니다",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // 출력: Alice님이 초안을 저장했습니다
```

## ICU `select`에서 마이그레이션

ICU `select` 인수를 사용하는 메시지는 `select` 노드로 가져옵니다:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

위의 형식은 다음과 같이 변경됩니다:

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

ICU `other` 케이스는 모든 불일치 케이스에 대한 Intlayer의 정규 이름인 `fallback`으로 이름이 바뀝니다. 두 번째 인수는 ICU 변수의 이름을 기록하므로 메시지를 내보낼 때 정확히 동일한 ICU 문자열로 되돌릴 수 있습니다.

> 참고로, 케이스가 성별 값(`male` / `female` / `other`)인 ICU `select`는 대신 [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md) 노드로 가져옵니다.

## 추가 리소스

구성 및 사용에 대한 더 자세한 정보는 다음 리소스를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
- [Intlayer React 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Intlayer Next.js 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

이러한 리소스는 다양한 환경과 프레임워크에서 Intlayer를 설정하고 사용하는 방법에 대한 추가 통찰력을 제공합니다.
