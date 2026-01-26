---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite 플러그인 문서 | vite-intlayer
description: vite-intlayer 패키지에서 intlayerPrune 플러그인을 사용하는 방법을 확인하세요
keywords:
  - intlayerPrune
  - vite
  - 플러그인
  - 트리 쉐이킹
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 문서 초기화
---

# intlayerPrune Vite 플러그인 문서

`intlayerPrune` Vite 플러그인은 애플리케이션 번들에서 사용되지 않는 사전(dictionary)을 트리 쉐이킹하고 제거(prune)하는 데 사용됩니다. 이를 통해 필요한 다국어 콘텐츠만 포함되어 최종 번들 크기를 줄일 수 있습니다.

## 사용

```ts
// vite.config.ts (Vite 설정 파일)
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## 설명

플러그인은 소스 코드를 분석하여 실제로 사용되는 사전 키를 식별합니다. 그런 다음 번들된 사전 파일에서 사용되지 않는 내용을 제거합니다. 이는 특정 페이지나 컴포넌트에서 일부만 사용되는 다수의 사전을 포함한 대형 프로젝트에서 특히 유용합니다.
