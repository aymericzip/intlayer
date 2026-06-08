---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: IntlayerNode 타입. 무엇인가요?
description: IntlayerNode 타입은 무엇인가요? 왜 내 문자열이 IntlayerNode&lt;string&gt;으로 변환되나요?
keywords:
  - 소개
  - 시작하기
  - Intlayer
  - 애플리케이션
  - 패키지
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "문서 초기화"
---

# IntlayerNode 타입은 무엇인가요?

`IntlayerNode<T>` 타입은 `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` 및 `vanilla-intlayer`와 같은 intlayer 패키지에서 제공하는 특별한 타입입니다.

## 사용 예시

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // 타입 반환: IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo docs/docs/ko/dictionary/markdown.md처럼 다른 프레임워크를 탭으로 추가
</Tabs>

### 왜 Intlayer는 IntlayerNode를 삽입하나요?

Intlayer는 CMS / 비주얼 에디터의 컨텍스트에서 비주얼 에디터 셀렉터(Selectors)를 렌더링할 수 있도록 IntlayerNode를 삽입합니다.

![비주얼 에디터 데모](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

IntlayerNode는 강화된 React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla 노드이지만, 기본 원시 노드의 속성에도 접근할 수 있게 해줍니다.

예를 들어:

```js
const content = useIntlayer("app");

// 문자열의 경우
content.title; // IntlayerNode&lt;string&gt; 반환
content.title.value; // 기본 콘텐츠 반환, 여기서는 문자열

content.title.toString(); // 문자열 반환
content.title.toLowerCase(); // 문자열 반환
String(content.title); // 문자열 반환
content.title.toUpperCase(); // 대문자로 변환된 문자열 반환
content.title.replace("a", "b"); // 수정된 문자열 반환
// ...
```

> IntlayerNode의 속성에 접근하는 것은 작동하지만, 비주얼 에디터에서 셀렉터를 표시하는 기능을 손상시킵니다.

> IntlayerNode는 숫자나 `IntlayerNode<number>`와 같은 다른 타입도 감쌀 수 있습니다.
