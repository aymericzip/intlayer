---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "컬렉션: 위치 또는 ID로 선택하는 현지화 목록"
description: "Intlayer에서 항목마다 하나의 콘텐츠 파일로 현지화된 목록을 만드세요. FAQ, 블로그 글, 데이터베이스 레코드를 위치나 ID로 선택하고, 목록 페이지용 메타데이터도 함께 사용할 수 있습니다."
keywords:
  - 컬렉션
  - 콘텐츠 목록
  - 데이터베이스 ID
  - 동적 콘텐츠
  - Intlayer
  - 국제화
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "항목 `metadata`, `metadataOnly` 선택자, 문자열 항목 ID 추가"
  - version: 9.0.0
    date: 2026-06-12
    changes: "컬렉션 사전 기능 출시"
author: aymericzip
---

# 컬렉션: 현지화된 항목 목록

**컬렉션**은 하나의 사전 `key`를 공유하면서 각각 다른 `item`을 선언하는 콘텐츠 파일의 집합입니다. Intlayer는 빌드 시 이를 하나의 목록으로 병합하며, 전체 또는 항목 단위로 읽을 수 있습니다. 항목은 위치(`1`, `2`…) 또는 데이터베이스 레코드 ID 같은 문자열 ID로 식별됩니다.

## 목차

<TOC />

## 항목 선언

각 파일이 하나의 항목입니다:

```ts fileName="faq.1.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 1,
  content: {
    question: t({ en: "What is Intlayer?", fr: "Qu'est-ce qu'Intlayer ?" }),
    answer: t({ en: "An i18n toolkit.", fr: "Une boîte à outils i18n." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="faq.2.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 2,
  content: {
    question: t({ en: "Is it free?", fr: "Est-ce gratuit ?" }),
    answer: t({ en: "Yes, open-source.", fr: "Oui, open-source." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### 문자열 ID로 식별되는 항목

항목이 데이터베이스나 CMS에서 온다면 레코드 ID를 `item`으로 사용하세요:

```ts fileName="src/products/desk-lamp.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "products",
  item: "6620d4e8a1b2c3d4e5f60718",
  content: {
    name: t({ en: "Desk lamp", fr: "Lampe de bureau" }),
  },
} satisfies Dictionary;

export default dictionary;
```

- **순서**: 전체 목록은 숫자 항목을 값 순서로 먼저 반환하고, 이어서 문자열 ID를 문자 코드 순서로 반환합니다. 따라서 MongoDB ObjectId와 UUIDv7은 생성 순서대로 나열됩니다.
- **텍스트 형태의 숫자**: `item: "2"`와 `item: 2`는 같은 항목입니다. `"007"`은 문자열 ID로 유지됩니다.
- **Markdown 프론트매터**: YAML이 숫자로 읽는 ID는 따옴표로 감싸세요. 따옴표가 없으면 `0012`는 `12`가 되고 `123e4567`은 `Infinity`가 됩니다.
- **대소문자**: `importMode: "dynamic"`에서는 대소문자만 다른 ID(`abc`와 `ABC`)를 피하세요. macOS와 Windows 파일 시스템에서 충돌합니다.

### 항목 간 공유 콘텐츠

같은 `key`를 가지며 `item`이 없는 파일은 모든 항목이 공유하는 콘텐츠를 담습니다. 각 항목은 이 콘텐츠로 보완되며, 둘 다 같은 필드를 선언하면 자신의 값을 유지합니다:

```ts fileName="faq.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  content: {
    contactLabel: t({
      en: "Still stuck? Contact us",
      fr: "Toujours bloqué ? Contactez-nous",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

이제 `useIntlayer("faq")`의 모든 항목에 `question`, `answer`, `contactLabel`이 있습니다.

## 컬렉션 읽기

### 모든 항목

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "react-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "next-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="FAQ.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const items = useIntlayer("faq");
    </script>

    <template>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <strong>{{ item.question }}</strong>
          <p>{{ item.answer }}</p>
        </li>
      </ul>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="FAQ.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const items = useIntlayer("faq");
    </script>

    <ul>
      {#each $items as item}
        <li>
          <strong>{item.question}</strong>
          <p>{item.answer}</p>
        </li>
      {/each}
    </ul>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "preact-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { For } from "solid-js";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          <For each={items()}>
            {(item) => (
              <li>
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </li>
            )}
          </For>
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="faq.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-faq",
      template: `
        <ul>
          @for (item of items(); track $index) {
            <li>
              <strong>{{ item.question }}</strong>
              <p>{{ item.answer }}</p>
            </li>
          }
        </ul>
      `,
    })
    export class FAQComponent {
      items = useIntlayer("faq");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="faq.js"
    import { useIntlayer } from "vanilla-intlayer";

    const faq = useIntlayer("faq");

    faq.forEach((item) => {
      console.log(item.question);
      console.log(item.answer);
    });
    ```

  </Tab>
</Tabs>

### 단일 항목

```tsx
// 위치로 선택
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// ID로 선택
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// 로케일 명시
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

어떤 파일도 선언하지 않은 `item`은 `null`을 반환하므로, 상세 페이지에서 찾을 수 없음 상태를 표시할 수 있습니다.

## 항목 메타데이터

각 항목은 `metadata`를 선언할 수 있습니다. 콘텐츠와 별도로 저장되고 선언한 그대로 반환되는 단순 데이터(제목, 날짜, 태그…)입니다. 목록 페이지는 항목을 불러오지 않고 모든 항목의 메타데이터를 읽으므로, 글이 1,000개인 블로그도 빠르게 유지됩니다.

`.content.md` 파일에서는 사전 설정(`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`)을 제외한 프론트매터가 메타데이터가 됩니다. 번역하려면 로케일마다 파일을 하나씩 선언하세요:

```md fileName="src/blog/first-post.en.content.md"
---
key: blog
locale: en
item: 65f1c0a2b3c4d5e6f7a8b9c0
id: 65f1c0a2b3c4d5e6f7a8b9c0
title: First post
---

# First post
```

`item`은 메타데이터에 포함되지 않으므로, `id`로 같은 값을 반복해 목록의 각 항목을 해당 페이지에 연결합니다.

`.content.ts` 파일에서는 `metadata` 필드를 설정합니다(예: `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`). 다국어 선언에서는 모든 로케일에 적용됩니다.

비주얼 에디터와 CMS에서는 사전의 **Metadata** 탭에서 이 필드를 편집하고 선언 파일에 다시 저장합니다.

### 목록 페이지와 상세 페이지

`metadataOnly: true`는 메타데이터를, `item`은 한 항목의 콘텐츠를 읽습니다:

```tsx fileName="BlogList.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogList = () => {
  const posts = useIntlayer("blog", { metadataOnly: true });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <a href={`/blog/${post.id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
};
```

```tsx fileName="BlogPost.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogPost = ({ postId }: { postId: string }) => {
  const post = useIntlayer("blog", { item: postId });

  if (!post) return <p>Post not found</p>;

  return <article>{post}</article>;
};
```

둘을 함께 사용하면 한 항목의 메타데이터를 읽을 수 있습니다. 예를 들어 페이지의 `<head>`에서: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## 필요할 때 항목 불러오기

항목 파일에 `importMode: "dynamic"`을 지정하면 각 항목이 로케일별로 별도의 청크로 제공됩니다:

- `{ item }`은 해당 항목만 불러옵니다.
- 전체 목록은 모든 항목을 병렬로 불러옵니다.
- 전체 목록에 `{ metadataOnly: true }`를 사용하면 메타데이터 인덱스 하나만 불러오고 항목은 불러오지 않습니다.

정적 모드와 동적 모드는 같은 값을 반환합니다. `importMode: "fetch"`는 아직 컬렉션을 지원하지 않으며, 빌드 경고와 함께 정적 import로 대체됩니다. import 모드는 [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참고하세요.

## 변형과 함께 사용하기

항목은 `variant`도 선언할 수 있습니다([변형](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/variants.md) 참고). 이 경우 해당 키의 모든 항목 파일이 `item`과 `variant`를 모두 선언합니다:

```tsx
// "promo"용으로 선언된 항목, 각각 "default" 버전으로 보완됨
const promoItems = useIntlayer("banner", { variant: "promo" });

// "promo" 변형의 단일 항목
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

`promo` 선언이 없는 항목은 `promo` 목록에서 제외됩니다.

## 일반적인 사용 사례

- FAQ 목록
- 요금제
- 캐러셀 및 슬라이더 슬라이드
- 단계별 안내
- 블로그 글
- 데이터베이스나 CMS의 레코드(ID 기준)
