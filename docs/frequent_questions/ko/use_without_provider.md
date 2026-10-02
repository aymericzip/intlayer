---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: "전역 provider 없이 Intlayer를 사용할 수 있나요?"
description: "provider를 마운트하지 않고 Intlayer 콘텐츠를 읽는 방법, 서버와 브라우저에서 로케일이 해석되는 방식, provider와의 성능 차이."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - 로케일
  - 성능
  - 하이드레이션
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# 전역 provider 없이 Intlayer를 사용할 수 있나요?

네. `getIntlayer`와 `getDictionary`는 provider가 필요 없는 일반 함수이며, `useIntlayer`도 provider 밖에서 동작합니다.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // 로케일을 전달하지 않음
```

## 어떤 로케일이 사용되나요?

명시적으로 전달한 로케일이 항상 우선합니다. 그렇지 않으면 로케일은 다음 순서로 해석됩니다.

1. **현재 요청의 로케일**: 서버에서 Intlayer 통합이 요청을 처리할 때입니다. `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer`, `astro-intlayer`의 middleware 또는 React Server Components의 `IntlayerProvider`가 해당합니다.
2. **브라우저에 저장된 로케일**(cookie, `localStorage`, `sessionStorage`): 로케일 전환기가 저장하는 로케일입니다.
3. 설정의 **`defaultLocale`**.

각 요청은 자신의 cookies와 headers로 해석되고, 요청 전용 스코프에 보관됩니다. 서로 다른 로케일을 가진 동시 사용자끼리 로케일을 공유하는 일은 없습니다.

같은 해석이 `getDictionary`, [빌드 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)가 다시 작성한 호출, 그리고 provider 밖에서 렌더링되는 `useIntlayer`와 `useDictionaryDynamic`에도 적용됩니다.

- [빌드 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)

[포매터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md) (`number`, `date`, `list`…)와 해당 훅(`useNumber`, `useDate`, `useList`…)도 `locale`이 전달되지 않으면 같은 순서를 따릅니다.

- [포매터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)

### Next.js Server Components

Next.js에서는 요청의 로케일을 `headers()`와 `cookies()`를 통해 비동기로만 읽을 수 있습니다. `next-intlayer/server`의 `getLocale()`과 같은 방식으로 이를 기다리는 [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md)를 사용하세요.

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // 요청의 로케일

  return { title };
};
```

headers를 읽으면 라우트가 동적 렌더링으로 전환됩니다. `IntlayerProvider`가 이미 로케일을 제공하면 headers를 읽지 않으며 라우트는 정적으로 유지됩니다.

## 성능: provider가 있을 때와 없을 때

콘텐츠는 같습니다. 차이는 반응성과 렌더링 비용에 있습니다.

|             | provider 있음                                      | provider 없음                                                                                           |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 로케일 전환 | 새로고침 없이 컴포넌트가 그 자리에서 다시 렌더링됨 | 아무것도 다시 렌더링되지 않음. 새 로케일은 다음 호출에서 반영(내비게이션, 새로고침)                     |
| 읽기 비용   | context 조회와 로케일 구독                         | 메모이즈된 함수 호출. 같은 `key + locale`에는 같은 객체                                                 |
| 전환 비용   | 모든 consumer의 재렌더링                           | 없음                                                                                                    |
| 서버 렌더링 | 서버와 브라우저가 같은 로케일을 렌더링             | 요청 통합 밖에서는 서버가 `defaultLocale`, 브라우저가 저장된 로케일을 렌더링: hydration mismatch 가능성 |
| Bundle      | provider 코드                                      | 저장된 로케일을 읽는 데 약 100바이트(gzip). 다음 변경까지 캐시                                          |

로케일을 그 자리에서 바꾸거나 서버에서 렌더링하는 인터랙티브 앱에서는 provider를 유지하세요. 백엔드, 스크립트, URL에서 로케일을 얻는 정적 페이지(명시적으로 전달하세요), 콘텐츠를 한 번만 읽는 코드에서는 provider 없이 사용해도 됩니다.

자세한 내용은 [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayer.md)를 참고하세요.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayer.md)
