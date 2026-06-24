---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "NGX-Translate에서 Intlayer로 마이그레이션"
description: "compat adapter를 사용하여 Angular 애플리케이션을 ngx-translate에서 Intlayer로 마이그레이션하는 방법을 알아보세요."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# NGX-Translate에서 Intlayer로 마이그레이션

compat adapter를 사용하면 Angular 애플리케이션을 `ngx-translate`에서 Intlayer로 쉽게 마이그레이션할 수 있으며 모든 template을 다시 작성할 필요가 없습니다.

## 해야 할 일

다음을 실행하여 시작하세요:

```bash
npx intlayer init
```

`intlayer.config.ts`를 설정합니다. `TranslateModule.forRoot()` setups를 바꾸고 import aliases를 적절하게 업데이트하여 `@intlayer/ngx-translate`를 가리키도록 합니다.

## 내부적으로 어떻게 작동하는지

`ngx-translate`는 `TranslateService` (`instant`, `get`, `stream`)와 `{{ 'KEY' | translate:params }}` pipe, `[translate]` directive를 사용합니다.

내부적으로:

- **Services:** `TranslateService`는 `getIntlayer`와 locale observable을 래핑하여 정확히 동일한 methods를 제공합니다.
- **Pipes & Directives:** Intlayer dictionaries에 대해 직접 resolve되도록 다시 구현됩니다.
- **Loaders:** `TranslateHttpLoader` setups은 warning stubs로 변환됩니다. 왜냐하면 Intlayer는 본래적으로 build time에 dictionaries를 resolve하고 bundle합니다 (또는 표준 dynamic imports를 통해), HTTP loaders의 필요성을 완전히 제거합니다.
