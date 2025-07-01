---
docName: package__next-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync 훅 문서 | next-intlayer
description: next-intlayer 패키지의 useIntlayerAsync 훅 사용법을 확인하세요
keywords:
  - useIntlayerAsync
  - dictionary
  - key
  - Intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# Next.js 통합: `useIntlayerAsync` 훅 문서

`useIntlayerAsync` 훅은 `useIntlayer`의 기능을 확장하여, 미리 렌더링된 사전을 반환할 뿐만 아니라 업데이트를 비동기적으로 가져옵니다. 이로 인해 초기 렌더링 후에 현지화된 콘텐츠를 자주 업데이트하는 애플리케이션에 이상적입니다.

## 개요

- **비동기 사전 로딩:**  
  클라이언트 측에서 `useIntlayerAsync`는 먼저 미리 렌더링된 로케일 사전을 반환합니다(`useIntlayer`와 동일). 그 후 새로 사용 가능한 원격 사전을 비동기적으로 가져와 병합합니다.
- **진행 상태 관리:**  
  이 훅은 원격 사전을 가져오는 동안 `isLoading` 상태도 제공합니다. 이를 통해 개발자는 로딩 인디케이터나 스켈레톤 상태를 표시하여 사용자 경험을 부드럽게 만들 수 있습니다.

## 환경 설정

Intlayer는 비개발자도 애플리케이션 콘텐츠를 원활하게 관리하고 업데이트할 수 있도록 하는 헤드리스 콘텐츠 소스 관리(CSM) 시스템을 제공합니다. Intlayer의 직관적인 대시보드를 사용하면 팀이 코드를 직접 수정하지 않고도 현지화된 텍스트, 이미지 및 기타 리소스를 편집할 수 있습니다. 이는 콘텐츠 관리 프로세스를 간소화하고 협업을 촉진하며 업데이트를 빠르고 쉽게 수행할 수 있도록 보장합니다.

Intlayer를 시작하려면 먼저 [대시보드](https://intlayer.org/dashboard)에서 등록하고 액세스 토큰을 받아야 합니다. 자격 증명을 받으면 아래와 같이 구성 파일에 추가하세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

자격 증명을 구성한 후에는 다음 명령어를 실행하여 Intlayer에 새 로케일 사전을 푸시할 수 있습니다:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

이 명령어는 초기 콘텐츠 사전을 업로드하여 Intlayer 플랫폼을 통해 비동기적으로 가져오고 편집할 수 있도록 만듭니다.

## Next.js에서 `useIntlayerAsync` 가져오기

`useIntlayerAsync`는 **클라이언트 사이드** 컴포넌트를 위해 설계되었으므로, `useIntlayer`와 동일한 클라이언트 진입점에서 가져옵니다:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Next.js App Router에서 서버와 클라이언트 컴포넌트가 분리되어 있을 경우, 해당 파일 상단에 `"use client"`가 명시되어 있는지 확인하세요.

## 매개변수

1. **`key`**:  
   **타입**: `DictionaryKeys`  
   지역화된 콘텐츠 블록을 식별하는 데 사용되는 사전 키입니다. 이 키는 콘텐츠 선언 파일에 정의되어 있어야 합니다.

2. **`locale`** (선택 사항):  
   **타입**: `Locales`  
   대상이 되는 특정 로케일입니다. 생략할 경우, 훅은 클라이언트 컨텍스트의 로케일을 사용합니다.

3. **`isRenderEditor`** (선택 사항, 기본값은 `true`):  
   **타입**: `boolean`  
   콘텐츠가 Intlayer 편집기 오버레이와 함께 렌더링 준비가 되어야 하는지 여부를 결정합니다. `false`로 설정하면 반환된 사전 데이터에 편집기 전용 기능이 제외됩니다.

## 반환 값

이 훅은 `key`와 `locale`을 키로 하는 현지화된 콘텐츠가 포함된 사전 객체를 반환합니다. 또한 원격 사전을 현재 가져오는 중인지 여부를 나타내는 `isLoading` 불리언도 포함합니다.

## Next.js에서의 사용 예시

### 클라이언트 사이드 컴포넌트 예시

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("콘텐츠를 불러오는 중입니다...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("콘텐츠를 불러오는 중입니다...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("콘텐츠가 로딩 중입니다...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**핵심 사항:**

- 초기 렌더링 시, `title`과 `description`은 미리 렌더링된 로케일 사전에서 가져옵니다.
- `isLoading`이 `true`인 동안, 백그라운드에서 원격 요청이 이루어져 업데이트된 사전을 가져옵니다.
- 요청이 완료되면 `title`과 `description`이 최신 콘텐츠로 업데이트되고, `isLoading`은 다시 `false`로 돌아갑니다.

## 속성 현지화 처리

`useIntlayer`와 마찬가지로, 다양한 HTML 속성(예: `alt`, `title`, `aria-label`)에 대한 현지화된 속성 값을 가져올 수 있습니다:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 사전 파일

모든 콘텐츠 키는 타입 안전성과 런타임 오류 방지를 위해 콘텐츠 선언 파일에 정의되어야 합니다. 이 파일들은 TypeScript 검증을 가능하게 하여 항상 존재하는 키와 로케일을 참조하도록 보장합니다.

/// `isLoading`이 `true`인 동안, 백그라운드에서 원격 요청이 이루어져 최신 사전을 가져옵니다.
/// 요청이 완료되면 `title`과 `description`이 최신 내용으로 업데이트되고, `isLoading`은 다시 `false`로 돌아갑니다.

## 속성 현지화 처리

`useIntlayer`와 마찬가지로, 다양한 HTML 속성(예: `alt`, `title`, `aria-label`)에 대해 현지화된 속성 값을 가져올 수 있습니다:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 사전 파일

모든 콘텐츠 키는 타입 안전성과 런타임 오류 방지를 위해 콘텐츠 선언 파일에 정의되어야 합니다. 이 파일들은 TypeScript 검증을 가능하게 하여 항상 존재하는 키와 로케일만 참조하도록 보장합니다.

콘텐츠 선언 파일 설정 방법은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)에서 확인할 수 있습니다.

## 추가 정보

- **Intlayer 비주얼 에디터:**  
  Intlayer 비주얼 에디터와 통합하여 UI에서 직접 콘텐츠를 관리하고 편집할 수 있습니다. 자세한 내용은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)에서 확인하세요.

---

**요약하자면**, `useIntlayerAsync`는 사전의 사전 렌더링과 비동기 사전 업데이트를 결합하여 사용자 경험을 향상시키고 콘텐츠 신선도를 유지하는 강력한 클라이언트 사이드 훅입니다. `isLoading`과 TypeScript 기반 콘텐츠 선언을 활용하여 Next.js 애플리케이션에 동적이고 현지화된 콘텐츠를 원활하게 통합할 수 있습니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 이력 초기화

---

**요약하면**, `useIntlayerAsync`는 사전 렌더링된 사전과 비동기 사전 업데이트를 결합하여 사용자 경험을 향상시키고 콘텐츠 신선도를 유지하도록 설계된 강력한 클라이언트 사이드 훅입니다. `isLoading`과 TypeScript 기반 콘텐츠 선언을 활용하여 Next.js 애플리케이션에 동적이고 지역화된 콘텐츠를 원활하게 통합할 수 있습니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
