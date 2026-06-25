---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary 훅 - React Intlayer 문서
description: 시각적 편집기 없이 지역화된 콘텐츠를 효율적으로 처리하기 위한 React 애플리케이션에서 useDictionary 훅 사용에 대한 완벽한 가이드입니다.
keywords:
  - useDictionary
  - React
  - 훅
  - intlayer
  - 지역화
  - i18n
  - 사전
  - 번역
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "이력 초기화"
author: aymericzip
---

# React 통합: `useDictionary` 훅 문서

이 섹션에서는 시각적 편집기 없이 지역화된 콘텐츠를 효율적으로 처리할 수 있도록 React 애플리케이션 내에서 `useDictionary` 훅을 사용하는 방법에 대해 자세히 안내합니다.

## React에서의 사용 예제

아래는 React 컴포넌트에서 `useDictionary` 훅을 사용하는 예제입니다:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## 추가 팁

- **타입 안전성**: 항상 `Dictionary`를 사용하여 사전을 정의하여 타입 안전성을 보장하세요.
- **로컬라이제이션 업데이트**: 콘텐츠를 업데이트할 때 모든 로케일이 일관되도록 하여 번역 누락을 방지하세요.

이 문서는 `useDictionary` 훅의 통합에 중점을 두어, 비주얼 에디터 기능에 의존하지 않고 로컬라이즈된 콘텐츠를 관리하는 간소화된 접근법을 제공합니다.
