---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite 플러그인 문서 | vite-intlayer
description: vite-intlayer 패키지에서 intlayer 플러그인을 사용하는 방법을 확인하세요
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 문서 초기화
---

# intlayer Vite 플러그인 문서

`intlayer` Vite 플러그인은 Intlayer 설정을 빌드 프로세스에 통합합니다. 이 플러그인은 사전 별칭을 처리하고, 개발 모드에서 사전 감시자를 시작하며, 빌드를 위해 사전 파일을 준비합니다.

## 사용법

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## 설명

이 플러그인은 다음 작업을 수행합니다:

1. **딕셔너리 준비(Prepare Dictionaries)**: 빌드 또는 개발(dev) 프로세스 시작 시 딕셔너리를 최적화된 파일로 컴파일합니다.
2. **감시 모드(Watch Mode)**: 개발 모드에서 딕셔너리 파일의 변경을 감시하여 자동으로 재컴파일합니다.
3. **별칭(Aliases)**: 애플리케이션에서 딕셔너리에 접근할 수 있도록 별칭을 제공합니다.
4. **트리-쉐이킹(Tree-shaking)**: `intlayerPrune` 플러그인을 통해 사용되지 않는 번역을 트리-쉐이킹으로 제거하는 것을 지원합니다.
