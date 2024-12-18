# React 통합: `useIntlayerAsync` 훅 문서

`useIntlayerAsync` 훅은 `useIntlayer`의 기능을 확장하여 사전 렌더링된 사전만 반환하는 것이 아니라 비동기적으로 업데이트를 가져와 초기 렌더링 후 자주 로컬라이즈된 콘텐츠를 업데이트하는 애플리케이션에 이상적입니다.

## 개요

- **비동기 사전 로딩:**  
  초기 마운트 시, `useIntlayerAsync`는 먼저 프리패치되거나 정적으로 번들된 로케일 사전을 반환한 후 (마치 `useIntlayer`가 수행하는 것처럼) 비동기적으로 새로 사용 가능한 원격 사전을 가져와 병합합니다.
- **진행 상태 관리:**  
  이 훅은 원격 사전이 가져오고 있는 동안 표시할 수 있는 `isLoading` 상태도 제공합니다. 이는 개발자가 로딩 표시기 또는 스켈레톤 상태를 표시하여 보다 부드러운 사용자 경험을 제공할 수 있게 합니다.

## 환경 설정

Intlayer는 비개발자가 애플리케이션 콘텐츠를 원활하게 관리하고 업데이트할 수 있도록 지원하는 헤드리스 콘텐츠 소스 관리(CSM) 시스템을 제공합니다. Intlayer의 직관적인 대시보드를 사용하여 팀은 코드를 직접 수정하지 않고도 로컬라이즈된 텍스트, 이미지 및 기타 리소스를 편집할 수 있습니다. 이는 콘텐츠 관리 프로세스를 간소화하고 협업을 촉진하며, 업데이트를 빠르고 쉽게 수행할 수 있도록 보장합니다.

Intlayer를 시작하려면:

1. **[https://intlayer.org/dashboard](https://intlayer.org/dashboard)에서 등록하고 액세스 토큰을 받으세요.**
2. **구성 파일에 자격 증명 추가:**  
   React 프로젝트에서 Intlayer 클라이언트를 자격 증명으로 구성하십시오:

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **Intlayer에 새 로케일 사전 푸시하기:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   이 명령은 초기 콘텐츠 사전을 업로드하여 Intlayer 플랫폼을 통해 비동기적으로 가져오고 편집할 수 있도록 만듭니다.

## React에서 `useIntlayerAsync` 가져오기

React 컴포넌트에서 `useIntlayerAsync`를 가져옵니다:

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## 매개변수

1. **`key`**:  
   **타입**: `DictionaryKeys`  
   로컬라이즈된 콘텐츠 블록을 식별하는 데 사용되는 사전 키입니다. 이 키는 콘텐츠 선언 파일에 정의되어야 합니다.

2. **`locale`** (선택 사항):  
   **타입**: `Locales`  
   특정 로케일을 지정합니다. 생략하면 훅은 현재 Intlayer 컨텍스트의 로케일을 사용합니다.

3. **`isRenderEditor`** (선택 사항, 기본값 `true`):  
   **타입**: `boolean`  
   Intlayer 에디터 오버레이와 함께 렌더링을 위해 콘텐츠가 준비되어야 하는지를 결정합니다. `false`로 설정하면 반환된 사전 데이터는 에디터 전용 기능을 제외합니다.

## 반환 값

이 훅은 `key`와 `locale`을 키로 하는 로컬라이즈된 콘텐츠를 포함하는 사전 객체를 반환합니다. 또한 원격 사전이 현재 가져오고 있는지를 나타내는 `isLoading` 불리언을 포함합니다.

## React 컴포넌트에서의 사용 예

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
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
          <p>콘텐츠 업데이트 중입니다. 잠시 기다려 주세요.</p>
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

**주요 사항:**

- 초기 렌더링 시, `title`과 `description`은 프리패치되거나 정적으로 삽입된 로케일 사전에서 가져옵니다.
- `isLoading`이 `true`일 동안 배경 요청이 업데이트된 사전을 가져옵니다.
- 가져오기가 완료되면 `title`과 `description`이 최신 콘텐츠로 업데이트되며 `isLoading`은 `false`로 돌아갑니다.

## 속성 로컬라이제이션 처리

다양한 HTML 속성(예: `alt`, `title`, `aria-label`)에 대한 로컬라이즈된 속성 값을 검색할 수도 있습니다:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 콘텐츠 선언 파일

모든 콘텐츠 키는 유형 안전성과 런타임 오류 방지를 위해 콘텐츠 선언 파일에 정의되어야 합니다. 이러한 파일은 TypeScript 유효성 검사를 가능하게 하여 항상 기존 키와 로케일을 참조할 수 있도록 합니다.

콘텐츠 선언 파일 설정에 대한 지침은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)에서 확인할 수 있습니다.

## 추가 정보

- **Intlayer 비주얼 에디터:**  
  UI에서 콘텐츠를 관리하고 편집하기 위해 Intlayer 비주얼 에디터와 통합하십시오. 자세한 내용은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)에서 확인할 수 있습니다.

---

**요약하자면**, `useIntlayerAsync`는 사전 렌더링되거나 프리패치된 사전과 비동기 사전 업데이트를 병합하여 사용자 경험을 향상시키고 콘텐츠 신선도를 유지하도록 설계된 강력한 React 훅입니다. `isLoading`과 TypeScript 기반 콘텐츠 선언을 활용하여 React 애플리케이션에 동적 로컬라이즈된 콘텐츠를 원활하게 통합할 수 있습니다.
