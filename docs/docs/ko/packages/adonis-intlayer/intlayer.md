---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: intlayer AdonisJS 미들웨어 문서 | adonis-intlayer
description: adonis-intlayer 패키지의 intlayer 미들웨어 사용 방법을 알아보세요
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: 초기 문서
---

# intlayer AdonisJS 미들웨어 문서

AdonisJS용 `intlayer` 미들웨어는 사용자의 로케일을 감지하고 요청 컨텍스트를 통해 번역 기능을 제공합니다. 또한 요청 흐름 내에서 전역 번역 기능을 사용할 수 있게 합니다.

## 사용법

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## 설명

미들웨어는 다음 작업을 수행합니다:

1. **로케일 감지**: 요청(헤더, 쿠키 등)을 분석하여 사용자의 선호 로케일을 결정합니다.
2. **컨텍스트 설정**: 요청 컨텍스트에 로케일 정보를 채웁니다.
3. **Async Local Storage**: `cls-hooked`를 사용하여 비동기 컨텍스트를 관리하며, `t`, `getIntlayer`, `getDictionary`와 같은 전역 Intlayer 기능이 수동으로 전달하지 않고도 요청 관련 로케일에 액세스할 수 있도록 합니다.

> 참고: 로케일 감지에 쿠키를 사용하려면 애플리케이션에서 `@adonisjs/cookie`가 구성되고 사용되는지 확인하세요.
