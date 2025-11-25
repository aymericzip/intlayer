---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: i18n 번들 크기 및 성능 최적화
description: 국제화(i18n) 콘텐츠를 최적화하여 애플리케이션 번들 크기를 줄이세요. Intlayer를 사용하여 사전의 트리 쉐이킹과 지연 로딩을 활용하는 방법을 알아보세요.
keywords:
  - 번들 최적화
  - 콘텐츠 자동화
  - 동적 콘텐츠
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 6.0.0
    date: 2025-11-25
    changes: 초기 기록
---

# i18n 번들 크기 및 성능 최적화

전통적인 JSON 파일 기반 i18n 솔루션에서 가장 흔한 문제 중 하나는 콘텐츠 크기 관리입니다. 개발자가 수동으로 콘텐츠를 네임스페이스로 분리하지 않으면, 사용자는 단일 페이지를 보기 위해서도 모든 페이지와 잠재적으로 모든 언어에 대한 번역을 다운로드하게 되는 경우가 많습니다.

예를 들어, 10개의 페이지가 10개 언어로 번역된 애플리케이션의 경우, 사용자는 실제로 필요한 **한 개**의 페이지(현재 언어의 현재 페이지)만 필요함에도 불구하고 100개의 페이지 콘텐츠를 다운로드하게 될 수 있습니다. 이는 대역폭 낭비와 느린 로드 시간으로 이어집니다.

> 이를 감지하기 위해 `rollup-plugin-visualizer`(vite), `@next/bundle-analyzer`(next.js), 또는 `webpack-bundle-analyzer`(React CRA / Angular 등)와 같은 번들 분석기를 사용할 수 있습니다.

**Intlayer는 빌드 타임 최적화를 통해 이 문제를 해결합니다.** Intlayer는 코드 분석을 통해 각 컴포넌트에서 실제로 사용되는 사전을 감지하고, 필요한 콘텐츠만 번들에 다시 주입합니다.

## 목차

<TOC />

## 작동 방식

Intlayer는 **컴포넌트별 접근 방식**을 사용합니다. 전역 JSON 파일과 달리, 콘텐츠가 컴포넌트 옆이나 내부에 정의됩니다. 빌드 과정에서 Intlayer는 다음을 수행합니다:

1.  코드에서 `useIntlayer` 호출을 **분석**합니다.
2.  해당 사전 콘텐츠를 **생성**합니다.
3.  구성에 따라 `useIntlayer` 호출을 최적화된 코드로 **대체**합니다.

이를 통해 다음을 보장합니다:

- 컴포넌트가 임포트되지 않으면, 해당 콘텐츠는 번들에 포함되지 않습니다 (Dead Code Elimination).
- 컴포넌트가 지연 로드(lazy-loaded)되면, 해당 콘텐츠도 지연 로드됩니다.

## 플랫폼별 설정

### Next.js

Next.js는 빌드에 SWC를 사용하기 때문에 변환을 처리하기 위해 `@intlayer/swc` 플러그인이 필요합니다.

> 이 플러그인은 SWC 플러그인이 Next.js에서 아직 실험적이기 때문에 기본적으로 설치되어 있습니다. 향후 변경될 수 있습니다.

### Vite

Vite는 `vite-intlayer`의 의존성으로 포함된 `@intlayer/babel` 플러그인을 사용합니다. 최적화는 기본적으로 활성화되어 있습니다.

### Webpack

Webpack에서 Intlayer를 사용한 번들 최적화를 활성화하려면 적절한 Babel(`@intlayer/babel`) 또는 SWC(`@intlayer/swc`) 플러그인을 설치하고 구성해야 합니다.

### Expo / Lynx

이 플랫폼에서는 번들 최적화가 **아직 지원되지 않습니다**. 향후 릴리스에서 지원이 추가될 예정입니다.

## 구성

Intlayer가 번들을 최적화하는 방식을 `intlayer.config.ts` 파일의 `build` 속성을 통해 제어할 수 있습니다.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // 또는 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> 대부분의 경우 기본값인 `optimize` 옵션을 유지하는 것이 권장됩니다.

> 자세한 내용은 문서 설정을 참조하세요: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

### 빌드 옵션

`build` 구성 객체 아래에서 다음 옵션들을 사용할 수 있습니다:

| 속성                  | 타입                                      | 기본값                          | 설명                                                                                                                                                                                                            |
| :-------------------- | :---------------------------------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                                 | `undefined`                     | 빌드 최적화가 활성화되는지 여부를 제어합니다. `true`인 경우, Intlayer는 사전 호출을 최적화된 인젝션으로 대체합니다. `false`인 경우 최적화가 비활성화됩니다. 프로덕션 환경에서는 이상적으로 `true`로 설정합니다. |
| **`importMode`**      | `'static' &#124; 'dynamic' &#124; 'live'` | `'static'`                      | 사전이 로드되는 방식을 결정합니다(아래 세부사항 참조).                                                                                                                                                          |
| **`traversePattern`** | `string[]`                                | `['**/*.{js,ts,jsx,tsx}', ...]` | Intlayer가 최적화를 위해 스캔할 파일을 정의하는 Glob 패턴입니다. 관련 없는 파일을 제외하고 빌드 속도를 높이는 데 사용하세요.                                                                                    |
| **`outputFormat`**    | `'esm' &#124; 'cjs'`                      | `'esm'`                         | 빌드된 사전의 출력 형식을 제어합니다.                                                                                                                                                                           |

## Import Modes

`importMode` 설정은 사전 콘텐츠가 컴포넌트에 어떻게 주입되는지를 결정합니다.

### 1. Static Mode (`default`)

정적 모드에서 Intlayer는 `useIntlayer`를 `useDictionary`로 대체하고 사전을 JavaScript 번들에 직접 주입합니다.

- **장점:** 즉각적인 렌더링(동기적), 하이드레이션 시 추가 네트워크 요청 없음.
- **단점:** 번들에 해당 컴포넌트에 사용 가능한 **모든** 언어의 번역이 포함됩니다.
- **적합한 경우:** 싱글 페이지 애플리케이션(SPA).

**변환된 코드 예시:**

```tsx
// 원본 코드
const content = useIntlayer("my-key");

// 최적화된 코드 (정적)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. 동적 모드

동적 모드에서 Intlayer는 `useIntlayer`를 `useDictionaryAsync`로 대체합니다. 이는 `import()` (Suspense와 유사한 메커니즘)를 사용하여 현재 로케일에 해당하는 JSON을 지연 로드합니다.

- **장점:** **로케일 단위 트리 쉐이킹.** 영어 버전을 보는 사용자는 영어 사전만 다운로드합니다. 프랑스어 사전은 절대 로드되지 않습니다.
- **단점:** 하이드레이션 시 컴포넌트별로 네트워크 요청(자산 페치)이 발생합니다.
- **적합한 경우:** 대용량 텍스트 블록, 기사, 또는 번들 크기가 중요한 다국어 지원 애플리케이션.

**변환된 코드 예시:**

```tsx
// Your code
const content = useIntlayer("my-key");

// Optimized code (Dynamic)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> `importMode: 'dynamic'`를 사용할 때, 한 페이지에 `useIntlayer`를 사용하는 컴포넌트가 100개라면 브라우저는 100개의 별도 요청을 시도합니다. 이러한 "워터폴" 요청을 피하기 위해, 콘텐츠를 각 원자 컴포넌트별로 나누기보다는 `.content` 파일 수를 줄여서(예: 페이지 섹션별 사전 하나) 그룹화하는 것이 좋습니다.

> 현재 `importMode: 'dynamic'`은 Vue와 Svelte에서 완전히 지원되지 않습니다. 이 프레임워크들에서는 추가 업데이트가 있을 때까지 `importMode: 'static'` 사용을 권장합니다.

### 3. 라이브 모드 (Live Mode)

동적 모드와 유사하게 동작하지만, 먼저 Intlayer Live Sync API에서 사전을 가져오려고 시도합니다. API 호출이 실패하거나 콘텐츠가 라이브 업데이트로 표시되지 않은 경우에는 동적 임포트로 대체됩니다.

> 자세한 내용은 CMS 문서를 참조하세요: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

## 요약: 정적 vs 동적

| 기능               | 정적 모드                              | 동적 모드                            |
| :----------------- | :------------------------------------- | :----------------------------------- |
| **JS 번들 크기**   | 더 큼 (컴포넌트에 대한 모든 언어 포함) | 가장 작음 (코드만 포함, 콘텐츠 없음) |
| **초기 로드**      | 즉시 (콘텐츠가 번들에 포함됨)          | 약간의 지연 (JSON을 가져옴)          |
| **네트워크 요청**  | 추가 요청 없음                         | 사전별로 1회 요청                    |
| **트리 쉐이킹**    | 컴포넌트 수준                          | 컴포넌트 수준 + 로케일 수준          |
| **최적 사용 사례** | UI 컴포넌트, 소규모 앱                 | 텍스트가 많은 페이지, 다국어 지원    |
