---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useIntlayer 훅 문서 | solid-intlayer
description: solid-intlayer 패키지에서 useIntlayer 훅을 사용하는 방법을 확인하세요
keywords:
  - useIntlayer
  - 사전
  - Intlayer
  - intlayer
  - 국제화
  - 문서
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 export에 대한 문서 통합
---

# useIntlayer 훅 문서

`useIntlayer` 훅은 키를 사용하여 dictionary에서 로컬라이즈된 콘텐츠를 조회할 수 있게 해줍니다. `Solid`에서는 이 훅이 로케일이 변경될 때마다 업데이트되는 반응형 **accessor** 함수를 반환합니다.

## 사용법

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## 설명

이 훅은 다음 작업을 수행합니다:

1. **로케일 감지**: `IntlayerProvider` 컨텍스트의 현재 로케일을 사용합니다.
2. **사전 주입**: Intlayer 컴파일러가 생성한 최적화된 선언을 사용해 제공된 키에 해당하는 사전의 내용을 자동으로 주입합니다.
3. **반응성**: 전역 로케일 상태가 변경될 때 자동으로 재평가되는 Solid accessor(`Accessor<T>`)를 반환합니다.
4. **번역 처리**: 감지된 로케일을 기반으로 콘텐츠를 결정하며, 딕셔너리 내에서 발견되는 `t()`, `enu()` 등 정의들을 처리합니다.

## 매개변수

- **key**: 딕셔너리의 고유 키(콘텐츠 선언 파일에 정의된 대로).
- **locale** (선택 사항): 현재 로케일을 오버라이드합니다.

## 반환값

지역화된 콘텐츠를 반환하는 accessor 함수 (`() => Content`).
