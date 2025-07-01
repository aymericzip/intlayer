---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: 로드맵
description: Intlayer의 로드맵을 확인하세요. Intlayer가 구현한 기능과 앞으로 구현할 계획인 기능들을 모두 볼 수 있습니다.
keywords:
  - 로드맵
  - Intlayer
  - 국제화
  - CMS
  - 콘텐츠 관리 시스템
  - 비주얼 에디터
slugs:
  - doc
  - roadmap
---

# Intlayer: 기능 개요 및 로드맵

Intlayer는 애플리케이션 전반에서 콘텐츠를 선언, 관리 및 업데이트하는 방식을 간소화하도록 설계된 콘텐츠 관리 및 국제화 솔루션입니다. 중앙 집중식 또는 분산식 콘텐츠 선언, 광범위한 국제화 옵션, Markdown 지원, 조건부 렌더링, TypeScript/JavaScript/JSON 통합 등 강력한 기능을 제공합니다. 아래는 Intlayer가 현재 제공하는 기능에 대한 종합적인 개요와 앞으로의 로드맵 기능입니다.

---

## 현재 기능

### 1. 콘텐츠 선언

#### 중앙 집중식 또는 분산식

- **중앙 집중식**: i18next와 유사하게 애플리케이션의 기본에 모든 콘텐츠를 하나의 큰 파일로 선언하여 모든 것을 한 곳에서 관리할 수 있습니다.
- **분산식**: 또는 콘텐츠를 컴포넌트 또는 기능 수준에서 별도의 파일로 분할하여 유지 관리를 용이하게 할 수 있습니다. 이렇게 하면 콘텐츠가 관련 코드(컴포넌트, 테스트, 스토리북 등)와 가까이 유지됩니다. 컴포넌트를 제거하면 관련된 콘텐츠도 함께 제거되어 코드베이스에 불필요한 데이터가 남지 않도록 합니다.

> 참고 자료:
>
> - [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)

### 2. 국제화

- **230개 언어 및 로케일** 지원 (프랑스어(프랑스), 영어(캐나다), 영어(영국), 포르투갈어(포르투갈) 등 지역 변형 포함).
- 한 곳에서 모든 로케일의 번역을 쉽게 관리할 수 있습니다.

> 참고 자료:
>
> - [국제화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)

### 3. 마크다운 지원

- **마크다운**을 사용하여 콘텐츠를 선언할 수 있으며, 이를 통해 단락, 제목, 링크 등 텍스트를 자동으로 포맷할 수 있습니다.
- 블로그 게시물, 기사, 문서 페이지 또는 리치 텍스트 포맷이 필요한 모든 시나리오에 이상적입니다.

> 자료:
>
> - [마크다운](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)

### 4. 외부 파일 지원

- TXT, HTML, JSON, YAML, CSV와 같은 텍스트 형식의 외부 파일에서 콘텐츠를 가져올 수 있습니다.
- Intlayer의 `file` 함수를 사용하여 외부 파일 콘텐츠를 사전에 임베드할 수 있으며, 이를 통해 Intlayer 비주얼 에디터와 CMS와 원활하게 통합할 수 있습니다.
- 동적 콘텐츠 업데이트를 지원하여, 소스 파일이 수정되면 Intlayer 내에서 콘텐츠가 자동으로 업데이트됩니다.
- 언어별 Markdown 파일을 동적으로 연결하여 다국어 콘텐츠 관리를 가능하게 합니다.

> 참고 자료:
>
> - [파일 콘텐츠 임베딩](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/file.md)

### 5. 동적 콘텐츠 및 함수 호출

Intlayer는 동적 콘텐츠 삽입 및 관리를 위한 다양한 방법을 제공하여 콘텐츠 전달의 유연성과 적응성을 보장합니다. 여기에는 동적 콘텐츠 삽입, 조건부 렌더링, 열거, 중첩, 함수 호출 기능이 포함됩니다.

1. 동적 콘텐츠 삽입

   insert 함수를 사용하여 플레이스홀더({{name}}, {{age}} 등)를 포함한 콘텐츠를 정의합니다.

사용자 입력, API 응답 또는 기타 동적 데이터 소스에 따라 적응하는 템플릿과 같은 콘텐츠를 활성화합니다.

TypeScript, ESM, CommonJS 및 JSON 구성과 원활하게 작동합니다.

useIntlayer를 사용하여 React Intlayer 및 Next Intlayer와 쉽게 통합됩니다.

2. 조건부 렌더링

언어 또는 인증 상태와 같은 사용자별 조건에 따라 적응하는 콘텐츠를 정의합니다.

여러 파일에 콘텐츠를 중복하지 않고 개인화된 경험을 맞춤화합니다.

3. 열거 및 복수형 처리

enu 함수를 사용하여 숫자 값, 범위 또는 사용자 정의 키에 따라 콘텐츠 변형을 정의합니다.

주어진 값에 따라 올바른 구문을 자동으로 선택하도록 보장합니다.

예측 가능한 동작을 위해 순서 규칙을 지원합니다.

4. 중첩 및 하위 콘텐츠 참조

   nest 함수를 사용하여 다른 사전의 콘텐츠를 참조하고 재사용하여 중복을 줄입니다.

   더 나은 유지 관리를 위해 구조적이고 계층적인 콘텐츠 관리를 지원합니다.

5. 함수 호출

   Intlayer는 콘텐츠를 함수로 선언할 수 있어 동기 및 비동기 콘텐츠 검색을 모두 가능하게 합니다.

   동기 함수: 콘텐츠가 빌드 시점에 동적으로 생성됩니다.

   비동기 함수: 외부 소스(예: API, 데이터베이스)에서 데이터를 동적으로 가져옵니다.

   통합: TypeScript, ESM, CommonJS와 함께 작동하지만 JSON 또는 원격 콘텐츠 파일에서는 지원되지 않습니다.

### 6. 콘텐츠 선언 형식

Intlayer는 콘텐츠 선언을 위해 **TypeScript**(및 JavaScript)와 **JSON**을 지원합니다.

- **TypeScript**:

  - 콘텐츠 구조가 올바르고 누락된 번역이 없도록 보장합니다.
  - 엄격하거나 더 유연한 검증 모드를 제공합니다.
  - 변수, 함수 또는 외부 API에서 동적으로 데이터를 가져올 수 있습니다.

- **JSON**:

  - 표준화된 형식 덕분에 외부 도구(예: 시각적 편집기)와 쉽게 통합할 수 있습니다.

  > 참고 자료:
  >
  > - [콘텐츠 선언 형식](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_extention_customization.md)

### 7. 정리, 번들 최적화 및 동적 임포트

- Intlayer는 `Babel`과 `SWC` 플러그인을 통합하여 번들을 최적화하고 성능을 향상시킵니다. 사용되는 사전만 번들에 임포트할 수 있도록 임포트를 대체합니다.
- 옵션을 활성화하면 Intlayer는 현재 로케일에 대해서만 사전 콘텐츠를 동적으로 가져올 수 있도록 허용합니다.

> 참고 자료:
>
> - [빌드 구성](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## 프레임워크 및 환경과의 통합

### 1. Next.js

#### a. 서버 및 클라이언트 컴포넌트

- 서버와 클라이언트 컴포넌트 모두에 대해 **통합된 콘텐츠 관리 접근법**을 제공합니다.
- 서버 컴포넌트용 내장 컨텍스트를 제공하여 다른 솔루션에 비해 구현을 단순화합니다.

#### b. 메타데이터, 사이트맵, robots.txt

- 메타데이터, 사이트맵 또는 `robots.txt` 파일을 생성하기 위해 콘텐츠를 동적으로 가져와 주입합니다.

#### c. 미들웨어

- 사용자의 선호 언어에 따라 콘텐츠로 **리디렉션하는 미들웨어**를 추가합니다.

#### d. Turbopack 및 Webpack 호환성

- 새로운 Next.js Turbopack과 기존 Webpack 모두와 완벽하게 호환됩니다.

> 자료:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

### 2. Vite

- Next.js와 유사하게, Intlayer를 Vite와 통합하고 **미들웨어**를 사용하여 사용자의 선호 언어에 따라 콘텐츠로 리디렉션할 수 있습니다.

> 자료:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)

### 3. Express

- Express 기반 백엔드 서비스를 관리하고 국제화할 수 있습니다.
- 이메일, 오류 메시지, 푸시 알림 등 다양한 텍스트를 현지화하여 개인화할 수 있습니다.

> 자료:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_express.md)

### 4. React Native

- Intlayer를 React Native와 통합하여 모바일 애플리케이션의 콘텐츠를 관리하고 국제화하세요.
- iOS 및 Android 플랫폼을 모두 지원합니다.

> 자료:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_native.md)

### 5. Lynx

- Intlayer를 Lynx와 통합하여 모바일 애플리케이션의 콘텐츠를 관리하고 국제화하세요.
- iOS 및 Android 플랫폼을 모두 지원합니다.

> 자료:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_lynx.md)

### 6. Vue

- Intlayer를 Vue와 통합하여 Vite / Vue.js 애플리케이션의 콘텐츠를 관리하고 국제화하세요.

> 자료:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vue.md)

### 7. Nuxt

- Intlayer를 Nuxt와 통합하여 Nuxt / Vue.js 애플리케이션의 콘텐츠를 관리하고 국제화합니다.
- 서버 및 클라이언트 컴포넌트를 모두 지원합니다.
- 사용자의 선호 언어에 따라 콘텐츠로 리디렉션하는 라우팅 및 미들웨어를 통합합니다.

> 리소스:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nuxt.md)

### 8. Preact

- Intlayer를 Preact와 통합하여 Preact 애플리케이션의 콘텐츠를 관리하고 국제화합니다.

> 리소스:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_preact.md)

---

## 비주얼 에디터 및 CMS

### 1. 로컬 비주얼 에디터

- 페이지에서 요소를 직접 선택하여 애플리케이션 콘텐츠를 편집할 수 있는 **무료 로컬 비주얼 에디터**입니다.
- 다음과 같은 AI 기능을 통합하여 지원합니다:
  - 번역 생성 또는 수정
  - 구문 및 맞춤법 검사
  - 개선 사항 제안
- 로컬에 호스팅하거나 원격 서버에 배포할 수 있습니다.

> 자료:
>
> - [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)

### 2. Intlayer CMS (원격)

- 코드베이스를 건드리지 않고 온라인에서 애플리케이션 콘텐츠를 관리할 수 있는 **호스팅 CMS** 솔루션입니다.
- 콘텐츠 선언, 번역 관리, 구문 및 맞춤법 오류 수정에 AI 지원 기능을 제공합니다.
- 라이브 애플리케이션 인터페이스를 통해 콘텐츠와 상호작용할 수 있습니다.

> 자료:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

---

## IDE 확장 기능

- 주요 IDE용 확장 기능으로, 로컬 및 원격 번역을 관리할 수 있는 **그래픽 인터페이스**를 제공합니다.
- 기능에는 컴포넌트용 콘텐츠 선언 파일 자동 생성, Intlayer CMS와의 직접 통합, 실시간 검증 등이 포함될 수 있습니다.

---

## MCP 서버

- IDE 내 통합 도구를 사용하여 콘텐츠와 번역을 관리할 수 있는 **MCP 서버**입니다.

---

## Intlayer CLI

- **번역 및 파일 생성**: 콘텐츠 파일에 대한 감사를 실행하여 누락된 번역을 생성하고 불일치를 검토합니다.
- **원격 상호작용**: 로컬 콘텐츠를 원격 CMS에 푸시하거나 원격 콘텐츠를 가져와 로컬 애플리케이션에 통합합니다.
- **문서 번역 및 검토**: 문서 / 파일 등을 번역하고 검토합니다.

> 자료:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)

---

## 환경

- **환경 변수**를 사용하여 프로덕션, 테스트, 로컬 환경에서 Intlayer를 다르게 구성합니다.
- 환경에 따라 대상 시각 편집기 또는 원격 CMS 프로젝트를 정의합니다.

---

## 핫 콘텐츠 업데이트

- 원격 사전과 Intlayer CMS를 사용할 때, **애플리케이션의 콘텐츠를 즉시 업데이트**할 수 있으며, 재배포가 필요 없습니다.

> 자료:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

---

## 향후 기능

### 1. A/B 테스트 및 개인화

- **다변량 테스트(Multivariate Testing)**: 주어진 콘텐츠의 여러 버전을 테스트하여 어떤 버전이 가장 좋은 성과(예: 높은 클릭률)를 내는지 확인합니다.
- **데이터 기반 개인화(Data-Driven Personalization)**: 사용자 인구통계(성별, 연령, 위치 등) 또는 기타 행동 패턴에 따라 다른 콘텐츠를 표시합니다.
- **자동 반복(Automated Iteration)**: AI가 여러 버전을 자동으로 테스트하고 최고 성과 버전을 선택하거나 관리자 승인을 위한 옵션을 추천하도록 합니다.

### 2. 버전 관리

- **콘텐츠 버전 관리(content versioning)**를 통해 이전 버전의 콘텐츠를 복원할 수 있습니다.
- 시간 경과에 따른 변경 사항을 추적하고 필요 시 이전 상태로 되돌릴 수 있습니다.

### 3. 자동 번역

- 원격 CMS 사용자를 위해 지원되는 모든 언어에 대해 **원클릭 번역 생성** 기능을 제공합니다.
- 시스템은 백그라운드에서 번역을 생성한 후 검증 또는 수정을 요청합니다.

### 4. SEO 향상

- 키워드, 사용자 검색 의도 및 최신 트렌드를 **분석하는 도구**.
- 더 나은 순위를 위한 개선된 콘텐츠를 제안하고 장기 성과를 추적합니다.

### 5. 더 많은 프레임워크와의 호환성

- **Solid, Svelte, Angular** 등 지원을 위한 노력이 진행 중입니다.
- Intlayer를 **모든 자바스크립트 기반 애플리케이션**과 호환되도록 하는 것이 목표입니다.

---

## 결론

Intlayer는 콘텐츠 관리 및 국제화를 위한 원스톱 솔루션이 되는 것을 목표로 합니다. 중앙 집중식 또는 분산식 파일 관리의 유연성, 광범위한 언어 지원, 최신 프레임워크 및 번들러와의 쉬운 통합, 그리고 강력한 AI 기반 기능에 중점을 둡니다. A/B 테스트, 버전 관리, 자동 번역과 같은 새로운 기능이 추가됨에 따라 Intlayer는 콘텐츠 워크플로우를 지속적으로 간소화하고 다양한 플랫폼에서 사용자 경험을 향상시킬 것입니다.

앞으로 출시될 업데이트를 기대해 주시고, 현재 제공되는 기능들을 자유롭게 탐색하여 Intlayer가 어떻게 콘텐츠 관리 프로세스를 중앙 집중화하고 최적화하는 데 도움을 줄 수 있는지 확인해 보세요!

---

## 문서 이력

- 5.5.10 - 2025-06-30: Preact 및 Nuxt 지원 추가, MCP 서버, CLI 업데이트
- 5.5.10 - 2025-06-29: 이력 초기화
