---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "react-i18next에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 React 애플리케이션을 react-i18next에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - 마이그레이션
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# react-i18next에서 Intlayer로 마이그레이션

완전하고 상세한 단계별 튜토리얼은 [react-i18next 마이그레이션 가이드](../migration_from_react-i18next_to_intlayer.md)를 참고하세요.

Intlayer의 compat adapter를 사용하면 소스 코드 import에 변경 없이 `react-i18next`에서 마이그레이션할 수 있습니다.

## 수행할 작업

프로젝트를 초기화하려면 다음을 실행하세요:

```bash
npx intlayer init
```

초기화 중에 Intlayer는 `@intlayer/react-i18next`를 설치하고 `intlayer.config.ts`를 생성합니다. bundler(예: Vite)에서 Intlayer plugin을 적용하세요:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## 내부 동작 원리

`reactI18nextVitePlugin`은 핵심 `vite-intlayer` plugin을 래핑하고 `react-i18next` 및 `i18next`에 대한 resolve alias를 주입하여 `@intlayer/react-i18next` 및 `@intlayer/i18next`로 리디렉션합니다.

내부적으로:

- **`useTranslation` & `withTranslation`:** Intlayer의 기본 hook을 사용하도록 다시 작성되어 dictionary key에 대한 자동 TypeScript 자동 완성을 제공합니다. namespace(예: `t('namespace:key')`)를 원활하게 지원합니다.
- **복수형 & Context:** 네이티브 `Intl.PluralRules` 및 context 접미사(`key_male`)를 사용하여 i18next의 접미사 기반 복수화(`key_one`, `key_other`)를 처리합니다.
- **`<Trans>` Component:** `components` prop, 객체 및 배열 형식, 그리고 번호가 매겨진 태그 `<1>...</1>`를 React 노드에 직접 매핑하도록 지원하도록 다시 구현되었습니다.
- **`i18n` instance:** 대규모 JSON 파일을 가져오지 않고 Intlayer에서 직접 키를 해결하여 번들 크기를 훨씬 줄입니다.
