---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: MarkdownRenderer 컴포넌트 문서 | react-intlayer
description: react-intlayer 패키지의 MarkdownRenderer 컴포넌트 사용 방법을 확인하세요
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: 문서 초기화
---

# MarkdownRenderer 컴포넌트 문서

`MarkdownRenderer` 컴포넌트는 커스텀 컴포넌트를 사용하여 마크다운 콘텐츠를 렌더링합니다.

## 사용법

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Props (속성)

| 속성         | 타입              | 설명                                                    |
| ------------ | ----------------- | ------------------------------------------------------- |
| `children`   | `string`          | 렌더링할 마크다운 콘텐츠입니다.                         |
| `components` | `Overrides`       | 특정 마크다운 요소에 사용할 커스텀 컴포넌트의 맵입니다. |
| `options`    | `MarkdownOptions` | 마크다운 렌더러에 대한 추가 옵션입니다.                 |
