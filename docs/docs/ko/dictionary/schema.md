---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "스키마로 딕셔너리 검증하기 (Zod)"
description: "intlayer.config.ts에 Zod 스키마를 선언하고 딕셔너리에 연결해, 빌드 시 모든 로케일을 검증하고 에디터에서 콘텐츠 타입을 지정하세요."
keywords:
  - 스키마
  - Zod
  - 검증
  - 딕셔너리
  - 콘텐츠 선언
  - 타입 안전성
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "문서 초기화"
author: aymericzip
---

# 스키마로 딕셔너리 검증하기

스키마는 딕셔너리 콘텐츠의 예상 구조를 설명합니다. `intlayer.config.ts`에서 한 번 선언하고 이름을 붙인 다음, `schema` 필드로 그 이름을 원하는 딕셔너리에 연결합니다.

그러면 Intlayer는 다음을 수행합니다.

- 딕셔너리를 빌드할 때 모든 로케일에 대해 딕셔너리를 **검증**하고, 각 오류를 로케일과 필드 경로와 함께 보고합니다.
- 에디터에서 딕셔너리 콘텐츠에 **타입을 지정**하므로, 누락되었거나 타입이 잘못된 필드를 빌드 전에 발견할 수 있습니다.

스키마는 여러 딕셔너리가 같은 구조를 공유해야 할 때(SEO 메타데이터, 상품 카드, CMS 형태의 항목 등)나, 각 번역의 최대 길이처럼 TypeScript로는 표현할 수 없는 제약을 콘텐츠에 적용해야 할 때 유용합니다.

<Steps>
<Step number={1} title="설정에서 스키마 선언하기">

[Zod](https://zod.dev)를 설치합니다.

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

그런 다음 `schemas` 키 아래에 스키마를 선언합니다. 각 키는 딕셔너리에서 참조할 이름입니다.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="딕셔너리에 스키마 연결하기">

딕셔너리의 `schema` 필드를 설정에 선언한 이름 중 하나로 지정합니다.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

하나의 스키마를 필요한 만큼 여러 딕셔너리에 연결할 수 있습니다.

</Step>
<Step number={3} title="빌드하고 리포트 확인하기">

검증은 Intlayer가 딕셔너리를 빌드할 때마다 실행됩니다. `npx intlayer build`로 실행하거나, dev 및 build 모드에서 번들러 플러그인을 통해 실행됩니다. 번역이 스키마를 위반하면 Intlayer는 로케일, 필드 경로, Zod 메시지를 로그로 출력합니다.

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

`intlayer build`를 한 번만 실행하면 스키마 이름이 등록되어 있지 않거나 검증에 실패할 때 빌드가 실패합니다. 감시 모드에서는 내용을 수정할 때까지 유효하지 않은 딕셔너리를 빌드에서 제외합니다.

</Step>
</Steps>

<AccordionGroup>
<Accordion header="Markdown 프런트매터">

Markdown을 렌더링하기 전에 `title`, `description`, `date`, `tags`와 같은 frontmatter 필드를 검증합니다. 필수 필드와 예상 타입은 사전 빌드 중 확인되며, 잘못된 메타데이터는 로케일과 필드 경로와 함께 보고됩니다.

</Accordion>
<Accordion header="페이지 SEO 메타데이터">

페이지 제목과 설명, canonical URL, 소셜 이미지, 색인 지시문에 쓰이는 메타데이터를 검증합니다. 스키마에서 제목을 1~60자로 제한하고 설명을 160자로 제한하며 URL의 유효성도 확인할 수 있습니다. 로케일의 잘못된 콘텐츠는 페이지 렌더링 오류를 일으키기 전에 거부됩니다.

</Accordion>
<Accordion header="공유 구조화 콘텐츠">

제품 항목, 탐색 메뉴, 이메일 템플릿처럼 같은 콘텐츠 구조를 공유하는 사전에 동일한 스키마를 연결합니다. 필드가 없거나 값의 타입이 잘못되면 빌드 중 해당 사전이 유효하지 않은 것으로 처리되어 일관되지 않은 콘텐츠가 앱에 들어가는 것을 막습니다.

</Accordion>
</AccordionGroup>

## 스키마로 콘텐츠 타입 지정하기

`Dictionary`의 제네릭 파라미터에 따라 TypeScript가 딕셔너리를 얼마나 엄격하게 검사할지가 결정됩니다.

| 선언                                                    | `schema` 필드                       | `content` 필드                              |
| ------------------------------------------------------- | ----------------------------------- | ------------------------------------------- |
| `satisfies Dictionary`                                  | 자동 완성됨, 알 수 없는 이름은 오류 | TypeScript가 검사하지 않음                  |
| `satisfies Dictionary<undefined, "seo-metadata">`       | `"seo-metadata"`여야 함             | 스키마로부터 타입 지정                      |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | `"seo-metadata"`여야 함             | 스키마와 직접 정의한 타입으로부터 타입 지정 |

타입이 지정된 스키마에서는 각 필드가 일반 값 또는 그 값을 만들어 내는 콘텐츠 노드를 모두 받을 수 있으므로, `t()`도 그대로 사용할 수 있습니다.

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer는 딕셔너리를 빌드할 때마다 Zod 스키마로부터 이 타입들을 `.intlayer/types`에 생성합니다. 타입으로 지정되는 것은 구조뿐이며, `.min()`, `.max()`, `.regex()` 같은 제약은 빌드 시점에 검사됩니다.

## 검증 대상

`internationalization.locales`에 나열된 각 로케일에 대해 Intlayer는 해당 로케일의 딕셔너리 콘텐츠를 해석한 뒤 그 결과를 검증합니다. 따라서 스키마는 번역을 담고 있는 `t()` 노드가 아니라 필드의 최종 값(`title: string`)을 설명합니다.

- **누락된 번역**: 기본 `strictMode`에서는 누락된 번역이 검증 전에 기본 로케일로 대체됩니다. `strictMode: "strict"`에서는 누락된 번역 때문에 필수 필드가 실패합니다.
- **기타 콘텐츠 노드**: `enu()`, `plural()`, `cond()`, `gender()`, `select()`, `insert()`는 함수로, `md()`나 `html()`은 노드로 해석됩니다. 이런 필드는 `z.any()`로 선언하고, 제약은 일반 값으로 해석되는 필드에 두세요.
- **검증되지 않는 항목**: 함수나 Promise가 제공하는 콘텐츠([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/function_fetching.md))와 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)에서 가져온 딕셔너리.

## 다른 검증 라이브러리 사용하기

`schemas` 항목은 Zod에 묶여 있지 않습니다. Zod와 호환되는 `safeParse(data)` 메서드를 가진 객체라면 `{ success: true }` 또는 `{ success: false, error: { issues } }`를 반환하는 한 모두 동작하며, 각 issue는 `path` 배열과 `message`를 가집니다. 콘텐츠 타입은 Zod 스키마에서만 생성되므로, 다른 라이브러리를 사용하면 연결된 딕셔너리의 콘텐츠는 `any` 타입이 됩니다.

## 자주 묻는 질문

<FAQ>

<Question title="스키마 오류가 빌드를 중단시키나요?">

`intlayer build`를 한 번만 실행하면 딕셔너리가 스키마와 일치하지 않을 때 빌드가 실패합니다. 감시 모드에서는 Intlayer가 오류를 기록하고 수정한 딕셔너리를 저장할 때까지 빌드에서 제외합니다.

</Question>
<Question title="여러 딕셔너리가 같은 스키마를 공유할 수 있나요?">

네. 스키마는 이름으로 참조되므로 원하는 수만큼의 딕셔너리가 같은 스키마를 가리킬 수 있습니다. 이것이 주요 사용 사례로, 모든 페이지 메타데이터, 상품 항목, 이메일 템플릿에 하나의 구조를 강제할 수 있습니다.

</Question>
<Question title="스키마 이름이 존재하지 않으면 어떻게 되나요?">

스키마가 하나라도 선언되어 있으면 `schema` 필드는 선언된 이름만 허용하므로 TypeScript가 오류를 보고합니다. JSON 파일에 등록되지 않은 스키마 이름을 지정하면 Intlayer는 빌드 중에 오류를 보고하고 해당 딕셔너리를 제외합니다.

</Question>
<Question title="모든 로케일이 검증되나요, 아니면 기본 로케일만 검증되나요?">

`internationalization.locales`에 나열된 모든 로케일이 검증됩니다. 리포트에 실패한 로케일이 표시되므로, 독일어에서만 너무 긴 번역도 쉽게 찾을 수 있습니다.

</Question>

</FAQ>

## 관련 문서

- [콘텐츠 선언 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)
- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
