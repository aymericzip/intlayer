# Next.js 통합: `useIntlayerAsync` 훅 문서

`useIntlayerAsync` 훅은 `useIntlayer`의 기능을 확장하여 사전 렌더링된 사전을 반환할 뿐만 아니라 비동기적으로 업데이트를 가져와, 초기 렌더 후 자주 로컬화된 콘텐츠를 업데이트하는 응용 프로그램에 적합합니다.

## 개요

- **비동기 사전 로딩:**  
  클라이언트 측에서 `useIntlayerAsync`는 먼저 사전 렌더링된 로케일 사전을 반환한 후 (마치 `useIntlayer`처럼) 비동기적으로 사용 가능한 원격 사전을 가져오고 병합합니다.
- **진행 상태 관리:**  
  이 훅은 원격 사전이 가져오는 중인지 표시하는 `isLoading` 상태를 제공합니다. 이를 통해 개발자는 로딩 인디케이터나 스켈레톤 상태를 표시하여 보다 부드러운 사용자 경험을 제공할 수 있습니다.

## 환경 설정

Intlayer는 비개발자가 애플리케이션 콘텐츠를 매끄럽게 관리하고 업데이트할 수 있도록 하는 헤드리스 콘텐츠 소스 관리(CSM) 시스템을 제공합니다. Intlayer의 직관적인 대시보드를 사용하면 팀이 코드 수정 없이 로컬화된 텍스트, 이미지 및 기타 리소스를 편집할 수 있습니다. 이는 콘텐츠 관리 프로세스를 간소화하고, 협업을 촉진하며, 업데이트를 빠르고 쉽게 할 수 있도록 보장합니다.

Intlayer를 시작하려면 [https://intlayer.org/dashboard](https://intlayer.org/dashboard)에서 등록하고 액세스 토큰을 얻어야 합니다. 자격 증명을 얻은 후 아래와 같이 구성 파일에 추가하세요:

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

자격 증명 구성을 마친 후, 다음 명령어를 실행하여 Intlayer에 새로운 로케일 사전을 푸시할 수 있습니다:

```bash
npm intlayer push -d my-first-dictionary-key
```

이 명령어는 초기 콘텐츠 사전을 업로드하여 Intlayer 플랫폼을 통해 비동기적으로 가져오고 편집할 수 있도록 만듭니다.

## Next.js에서 `useIntlayerAsync` 가져오기

`useIntlayerAsync`는 **클라이언트 측** 구성 요소를 위해 설계되었으므로 `useIntlayer`와 같은 클라이언트 진입점에서 가져와야 합니다:

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

서버와 클라이언트 구성 요소가 분리된 Next.js App Router를 사용하고 있다면, 가져오는 파일의 맨 위에 `"use client"`로 주석 처리되어 있는지 확인하세요.

## 매개변수

1. **`key`**:  
   **유형**: `DictionaryKeys`  
   로컬화된 콘텐츠 블록을 식별하는 데 사용되는 사전 키입니다. 이 키는 콘텐츠 선언 파일에 정의되어야 합니다.

2. **`locale`** (선택 사항):  
   **유형**: `Locales`  
   목표로 하는 특정 로케일입니다. 생략할 경우, 훅은 클라이언트 컨텍스트의 로케일을 사용합니다.

3. **`isRenderEditor`** (선택 사항, 기본값 `true`):  
   **유형**: `boolean`  
   Intlayer 편집기 오버레이와 함께 렌더링할 콘텐츠가 준비되었는지 여부를 결정합니다. `false`로 설정하면 반환된 사전 데이터는 편집기 전용 기능이 제외됩니다.

## 반환 값

이 훅은 `key`와 `locale`로 키가 지정된 로컬화된 콘텐츠를 포함하는 사전 객체를 반환합니다. 또한 원격 사전이 현재 가져오는 중인지 여부를 나타내는 `isLoading` 불리언을 포함합니다.

## Next.js에서 사용 예

### 클라이언트 측 구성 요소 예

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("콘텐츠 로딩 중...");
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

**주요 사항:**

- 초기 렌더에서 `title`과 `description`은 사전 렌더링된 로케일 사전에서 가져옵니다.
- `isLoading`이 `true`인 동안에는 백그라운드에서 원격 요청이 이루어져 업데이트된 사전을 가져옵니다.
- 페치가 완료되면 `title`과 `description`은 최신 콘텐츠로 업데이트되고, `isLoading`은 `false`로 돌아옵니다.

## 속성 로컬화 처리

`useIntlayer`와 마찬가지로 다양한 HTML 속성에 대한 로컬화된 속성 값을 가져올 수 있습니다(예: `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 콘텐츠 선언 파일

모든 콘텐츠 키는 유형 안전성과 런타임 오류 예방을 위해 콘텐츠 선언 파일에 정의되어야 합니다. 이러한 파일은 TypeScript 검증을 가능하게 하여 항상 기존 키와 로케일을 참조하도록 보장합니다.

콘텐츠 선언 파일 설정에 대한 안내는 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)에서 확인할 수 있습니다.

## 추가 정보

- **Intlayer 비주얼 편집기:**  
  UI에서 콘텐츠를 직접 관리하고 편집할 수 있도록 Intlayer 비주얼 편집기와 통합하세요. 더 많은 세부정보는 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)에서 확인할 수 있습니다.

---

**요약하자면**, `useIntlayerAsync`는 사전 렌더링된 사전과 비동기 사전 업데이트를 결합하여 사용자 경험을 향상하고 콘텐츠의 신선함을 유지하기 위해 설계된 강력한 클라이언트 측 훅입니다. `isLoading`과 TypeScript 기반 콘텐츠 선언을 활용함으로써 Next.js 애플리케이션에 동적이며 로컬화된 콘텐츠를 원활하게 통합할 수 있습니다.
