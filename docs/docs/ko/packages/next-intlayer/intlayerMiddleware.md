---
createdAt: 2026-01-21
updatedAt: 2026-02-25
title: intlayerMiddleware 문서 | next-intlayer
description: next-intlayer 패키지를 위한 intlayerMiddleware 함수 사용 방법을 확인하세요
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: intlayerMiddleware를 intlayerProxy로 이름 변경
  - version: 8.0.0
    date: 2026-01-21
    changes: 문서 초기화
---

# intlayerProxy (intlayerMiddleware) 문서

`intlayerProxy` 함수(`nextjs < 16`의 경우 `intlayerMiddleware`)는 로케일 기반 라우팅과 리디렉션을 처리하는 Next.js 미들웨어입니다. 사용자의 선호 로케일을 자동으로 감지하고 필요한 경우 적절한 로컬라이즈된 경로로 리디렉션합니다.

## 사용법

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## 설명

이 미들웨어는 다음 작업을 수행합니다:

1. **로케일 감지**: URL 경로, 쿠키 및 `Accept-Language` 헤더를 확인하여 사용자의 로케일을 결정합니다.
2. **리다이렉션**: URL에 로케일 접두사가 없고 설정이 이를 요구하거나(또는 사용자의 선호도에 따라) 로케일화된 URL로 리다이렉트합니다.
3. **쿠키 관리**: 감지된 로케일을 쿠키에 저장하여 이후 요청에 사용할 수 있습니다.

## 매개변수

이 함수는 직접 사용될 때 표준 Next.js `NextRequest`를 매개변수로 받거나, 위와 같이 내보내져 사용할 수 있습니다.

## 설정

미들웨어를 설정하려면 `intlayer.config.ts` 파일에서 `routing` 옵션을 설정할 수 있습니다. 자세한 내용은 [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)을 참조하세요.
