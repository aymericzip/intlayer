---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync 훅 문서 | react-intlayer
description: react-intlayer 패키지의 useIntlayerAsync 훅 사용법을 확인하세요
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
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayerAsync
---

# React 통합: `useIntlayerAsync` 훅 문서

`useIntlayerAsync` 훅은 `useIntlayer`의 기능을 확장하여, 미리 렌더링된 사전을 반환하는 것뿐만 아니라 업데이트를 비동기적으로 가져와 초기 렌더링 후에 현지화된 콘텐츠를 자주 업데이트하는 애플리케이션에 이상적입니다.

## 개요

- **비동기 사전 로딩:**  
  초기 마운트 시, `useIntlayerAsync`는 먼저 미리 가져오거나 정적으로 번들된 로케일 사전을 반환합니다(`useIntlayer`와 동일). 그 후 새로 사용 가능한 원격 사전을 비동기적으로 가져와 병합합니다.
- **진행 상태 관리:**  
  이 훅은 원격 사전을 가져오는 동안을 나타내는 `isLoading` 상태도 제공합니다. 이를 통해 개발자는 로딩 인디케이터나 스켈레톤 상태를 표시하여 사용자 경험을 부드럽게 만들 수 있습니다.

## 환경 설정

Intlayer는 비개발자도 애플리케이션 콘텐츠를 원활하게 관리하고 업데이트할 수 있도록 하는 헤드리스 콘텐츠 소스 관리(CSM) 시스템을 제공합니다. Intlayer의 직관적인 대시보드를 사용하면 팀이 코드 수정 없이도 현지화된 텍스트, 이미지 및 기타 리소스를 편집할 수 있습니다. 이는 콘텐츠 관리 프로세스를 간소화하고 협업을 촉진하며 업데이트를 빠르고 쉽게 수행할 수 있도록 보장합니다.

Intlayer를 시작하려면:

1. [https://intlayer.org/dashboard](https://intlayer.org/dashboard)에서 **등록하고 액세스 토큰을 받으세요**.
2. **구성 파일에 자격 증명을 추가하세요:**  
   React 프로젝트에서 자격 증명을 사용하여 Intlayer 클라이언트를 구성합니다:

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

3. **Intlayer에 새 로케일 사전 푸시하기:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   이 명령은 초기 콘텐츠 사전을 업로드하여 Intlayer 플랫폼을 통해 비동기적으로 가져오고 편집할 수 있도록 합니다.

## React에서 `useIntlayerAsync` 가져오기

React 컴포넌트에서 `useIntlayerAsync`를 다음과 같이 가져옵니다:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

React 컴포넌트에서 `useIntlayerAsync`를 가져옵니다:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## 매개변수

1. **`key`**:  
   **유형**: `DictionaryKeys`  
   지역화된 콘텐츠 블록을 식별하는 데 사용되는 사전 키입니다. 이 키는 콘텐츠 선언 파일에 정의되어 있어야 합니다.

2. **`locale`** (선택 사항):  
   **유형**: `Locales`  
   대상이 되는 특정 로케일입니다. 생략할 경우, 훅은 현재 Intlayer 컨텍스트의 로케일을 사용합니다.

3. **`isRenderEditor`** (선택 사항, 기본값은 `true`):  
   **유형**: `boolean`  
   콘텐츠가 Intlayer 편집기 오버레이와 함께 렌더링될 준비가 되었는지 여부를 결정합니다. `false`로 설정하면 반환된 사전 데이터에서 편집기 관련 기능이 제외됩니다.

## 반환 값

훅은 `key`와 `locale`을 키로 하는 지역화된 콘텐츠가 포함된 사전 객체를 반환합니다. 또한 원격 사전이 현재 로드 중인지 여부를 나타내는 `isLoading` 불리언도 포함합니다.

## React 컴포넌트에서의 사용 예시

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("콘텐츠가 로드 중입니다...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>로딩 중…</h1>
          <p>콘텐츠가 업데이트되는 동안 기다려 주세요.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("콘텐츠가 로딩 중입니다...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>로딩 중…</h1>
          <p>콘텐츠가 업데이트되는 동안 기다려 주세요.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("콘텐츠를 불러오는 중...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>로딩 중…</h1>
          <p>콘텐츠가 업데이트되는 동안 기다려 주세요.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**핵심 사항:**

- 초기 렌더링 시, `title`과 `description`은 미리 가져오거나 정적으로 포함된 로케일 사전에서 가져옵니다.
- `isLoading`이 `true`인 동안, 백그라운드 요청이 업데이트된 사전을 가져옵니다.
- 요청이 완료되면 `title`과 `description`이 최신 콘텐츠로 업데이트되고, `isLoading`은 `false`로 돌아갑니다.

## 속성 현지화 처리

다양한 HTML 속성(예: `alt`, `title`, `aria-label`)에 대해 현지화된 속성 값을 가져올 수도 있습니다:

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 사전 파일

모든 콘텐츠 키는 타입 안전성과 런타임 오류 방지를 위해 콘텐츠 선언 파일에 정의되어야 합니다. 이 파일들은 TypeScript 검증을 가능하게 하여 항상 존재하는 키와 로케일을 참조하도록 보장합니다.

콘텐츠 선언 파일 설정에 대한 지침은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)에서 확인할 수 있습니다.

## 추가 정보

- **Intlayer 비주얼 에디터:**  
  UI에서 직접 콘텐츠를 관리하고 편집할 수 있도록 Intlayer 비주얼 에디터와 통합하세요. 자세한 내용은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)에서 확인할 수 있습니다.

---

**요약하자면**, `useIntlayerAsync`는 사전 렌더링되거나 미리 가져온 사전과 비동기 사전 업데이트를 병합하여 사용자 경험을 향상시키고 콘텐츠 신선도를 유지하도록 설계된 강력한 React 훅입니다. `isLoading`과 TypeScript 기반 콘텐츠 선언을 활용하여 동적이고 현지화된 콘텐츠를 React 애플리케이션에 원활하게 통합할 수 있습니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
