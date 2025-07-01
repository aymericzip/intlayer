---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 쿠키 / 헤더에서 로케일을 가져오는 방법
description: 쿠키 / 헤더에서 로케일을 가져오는 방법을 알아보세요.
keywords:
  - 쿠키
  - 헤더
  - intlayer
  - 로케일
  - 훅
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - doc
  - faq
  - get-locale-cookie
---

# 쿠키 / 헤더에서 로케일을 가져오는 방법

## 훅 사용하기 (권장)

대부분의 사용 사례에서 현재 로케일을 가져올 때 `useLocale` 훅을 사용하는 것이 권장됩니다. 이 훅은 자동으로 해결되기 때문입니다. 이는 Vue.js의 `useLocale` 컴포저블과 유사하게 작동합니다.

```ts
import { useLocale } from "next-intlayer";
// 또는 import { useLocale } from "react-intlayer";
// 또는 import { useLocale } from "vue-intlayer";

ts;
// 클라이언트 측 사용법
const { locale } = useLocale();
```

서버 컴포넌트의 경우, 다음에서 가져올 수 있습니다:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

쿠키 값만 해결하는 `useLocaleCookie` 훅도 있습니다.

## 수동 쿠키 설정

사용자 정의 쿠키 이름을 다음과 같이 선언할 수 있습니다:

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // 기본값은 'intlayer-locale' 입니다
  },
};

export default config;
```

다음과 같이 가져올 수 있습니다

### 클라이언트 측

```ts
// 기본 쿠키 이름 사용
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// 사용자 정의 쿠키 이름 사용
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### 서버 측 (Next.js)

```ts
import { cookies } from "next/headers";

// 기본 쿠키 이름 사용
const locale = cookies().get("intlayer-locale")?.value;

// 사용자 정의 쿠키 이름 사용
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### 아직 locale이 설정되지 않은 경우

locale은 사용자가 명시적으로 locale을 선택할 때만 쿠키로 설정됩니다. 기본적으로 새 방문자의 경우 locale은 헤더 필드에서 해석됩니다.

사용자의 선호 locale은 요청 헤더에서 감지할 수 있습니다. 다음은 이를 처리하는 방법의 예입니다:

```ts
/**
 * 요청 헤더에서 locale을 감지합니다
 *
 * accept-language 헤더는 locale 감지에 가장 중요한 헤더입니다.
 * 이 헤더는 품질 값(q-value)과 함께 언어 코드 목록을 포함하며,
 * 사용자가 선호하는 언어를 우선순위에 따라 나타냅니다.
 *
 * 예시: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US는 기본 언어입니다 (q=1.0이 암시됨)
 * - en은 두 번째 선택입니다 (q=0.9)
 * - fr은 세 번째 선택입니다 (q=0.8)
 * - es는 네 번째 선택입니다 (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * 브라우저가 일반적으로 보내는 협상자(negotiator) 헤더 예시
 * 이 헤더들은 사용자의 선호 언어를 결정하는 데 도움을 줍니다
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// 사용 예시:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
