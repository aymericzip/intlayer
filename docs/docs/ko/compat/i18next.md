---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/i18next: i18next 호환 어댑터"
description: "i18next 코드를 그대로 두고 Intlayer로 제공하세요. @intlayer/i18next를 설치하고 import에 별칭을 지정한 뒤, 어댑터가 내부적으로 무엇을 바꾸는지 확인하세요."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - 마이그레이션
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/i18next: i18next 호환 어댑터

상세한 단계별 튜토리얼은 [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)를 참고하세요.

- [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)

Intlayer는 `i18next`의 핵심 런타임 특성을 완벽하게 복제합니다. compat package를 활용하면 Vanilla 애플리케이션이나 내부 모듈에서 익숙한 구문을 계속 사용할 수 있습니다.

## 수행할 작업

먼저 프로젝트에서 Intlayer를 초기화하세요:

```bash
npx intlayer init --interactive
```

Vite를 사용 중인 경우 Intlayer plugin을 포함하여 import를 `@intlayer/i18next`로 라우팅하세요:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## 내부 동작 원리

`i18nextVitePlugin`은 `i18next` import를 `@intlayer/i18next`로 별칭 지정하여 JSON 파일 포함으로 인한 bundle 팽창을 방지합니다.

내부적으로:

- **Instance 구성:** `createInstance`는 namespace fallback을 올바르게 파싱하고 적용하며 dictionary 검색을 위해 Intlayer의 컴파일 파이프라인을 활용합니다.
- **Interpolation:** `{{name}}` 대체 및 `$t(key)` nesting 재귀에 대한 기본 지원.
- **Context & Plurals:** `key_male` 및 `key_one`/`key_other` 같은 접미사 형식을 식별하고 해결하며 표준 `Intl.PluralRules`에 대해 평가합니다.
- **Return objects:** `returnObjects: true` 모드는 Intlayer dictionary에서 트리를 안전하게 추출합니다.

> 이러한 라이브러리가 어디에서 왔는지 이해하려면 JavaScript i18n의 역사를 읽어보세요.

- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)
