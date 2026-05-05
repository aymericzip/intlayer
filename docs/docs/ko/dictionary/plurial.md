---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: 복수형 (Plural)
description: 다국어 웹사이트에서 로케일에 맞는 복수형 콘텐츠(CLDR 기반)를 선언하고 사용하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 안에 프로젝트를 설정하십시오.
keywords:
  - 복수형
  - 복수화
  - CLDR
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
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# 복수형 콘텐츠 / Intlayer의 복수형

## 복수형 작동 방식

Intlayer에서 복수형 콘텐츠는 `plural` 함수를 통해 구현됩니다. 이 함수는 CLDR 복수형 범주(`zero`, `one`, `two`, `few`, `many`, `other`)를 해당 콘텐츠에 매핑합니다. 플랫폼에 내장된 [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) API를 사용하여 활성 로케일과 카운트 값을 기반으로 올바른 범주가 자동으로 선택됩니다.

직접 정의한 숫자 범위를 기반으로 콘텐츠를 선택하는 [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration.md)와 달리, `plural`은 선택을 CLDR 규칙에 위임합니다. 이로 인해 러시아어, 폴란드어, 아랍어 또는 웨일스어와 같이 복잡한 복수화 규칙이 있는 언어도 나머지 연산(modulo) 로직을 직접 작성하지 않고도 확장할 수 있습니다.

## `plural` vs `enu` 사용 시기

| 사용 사례                                                  | 헬퍼     |
| ---------------------------------------------------------- | -------- |
| 로케일 인식 문법적 복수형 (사과 1개 / 사과 2개 / 사과 5개) | `plural` |
| 사용자 정의 숫자 범위 (`<5`, `>=10`) 또는 CLDR 이외의 버킷 | `enu`    |

영어(`one` / `other`만 있음)만 타겟팅하는 경우 둘 다 작동합니다. `few` / `many` / `two` 구분이 있는 언어의 경우 `plural`을 권장합니다.

## 복수형 콘텐츠 설정

Intlayer 프로젝트에서 복수형 콘텐츠를 설정하려면 `plural` 헬퍼를 사용하는 콘텐츠 모듈을 생성하십시오. `other` 범주는 필수이며, 로케일에 더 구체적인 범주가 정의되지 않았을 때 폴백으로 사용됩니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ko: plural({
        other: "{{count}}개의 채용 공고",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "ko": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}}개의 채용 공고"
          }
        }
      }
    }
  }
}
```

> 지원되는 범주는 `zero`, `one`, `two`, `few`, `many`, `other`입니다. 타겟 언어가 사용하는 범주만 선언하면 되며, 특정 범주가 일치하지 않으면 Intlayer는 `other`로 폴백합니다.
>
> `{{count}}` 플레이스홀더는 런타임에 전달하는 카운트로 자동으로 대체됩니다. 다른 플레이스홀더를 포함할 수도 있습니다(아래 [사용자 정의 플레이스홀더](#custom-placeholders) 참조).

## React Intlayer와 함께 복수형 콘텐츠 사용하기

React 컴포넌트 내에서 복수형 콘텐츠를 사용하려면 `useIntlayer` 훅을 통해 가져와 카운트와 함께 호출하십시오. 활성 로케일과 카운트가 결합되어 일치하는 CLDR 범주를 선택합니다.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* 영어 기준:                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

반환된 함수를 두 가지 동등한 방식으로 호출할 수 있습니다.

```tsx
totalOpenings(21); // 약식: 카운트만 전달
totalOpenings({ count: 21 }); // 명시적 형태
```

## 사용자 정의 플레이스홀더

복수형 문자열에는 `{{count}}` 이외의 플레이스홀더를 포함할 수 있습니다. `count`와 함께 객체 형태로 전달하십시오.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      other: "{{name}}님, {{count}}개의 새 메시지가 있습니다",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice님, 1개의 새 메시지가 있습니다"

summary({ count: 7, name: "Alice" });
// → "Alice님, 7개의 새 메시지가 있습니다"
```

## CLDR 범주 요약

언어마다 사용하는 CLDR 범주의 하위 집합이 다릅니다. 몇 가지 일반적인 사례는 다음과 같습니다.

| 언어                     | 사용되는 범주                                |
| ------------------------ | -------------------------------------------- |
| 영어 (`en`)              | `one`, `other`                               |
| 프랑스어 (`fr`)          | `one`, `many`, `other`                       |
| 러시아어 (`ru`)          | `one`, `few`, `many`, `other`                |
| 폴란드어 (`pl`)          | `one`, `few`, `many`, `other`                |
| 아랍어 (`ar`)            | `zero`, `one`, `two`, `few`, `many`, `other` |
| 한국어 / 일본어 / 중국어 | `other` 만 사용                              |

이를 모두 외울 필요는 없습니다. 번역이 있는 범주를 선언하면 Intlayer가 필요할 때 `other`로 폴백합니다.

## 추가 리소스

설정 및 사용에 대한 자세한 내용은 다음 리소스를 참조하십시오.

- [Enumeration 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration.md)
- [Insertion 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md)
- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

이 리소스들은 다양한 환경과 프레임워크에서 Intlayer의 설정 및 사용에 대한 더 깊은 통찰력을 제공합니다.
